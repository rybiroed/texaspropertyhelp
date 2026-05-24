import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendContractorDispatch } from "@/lib/email";
import type { ContractorDispatchEmailData } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id: leadId } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const contractorId = body.contractorId;
  const notes = typeof body.notes === "string" ? body.notes.trim() || null : null;

  if (!contractorId || typeof contractorId !== "string") {
    return NextResponse.json({ message: "contractorId is required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ message: "Database not configured." }, { status: 503 });
  }

  // ── 1. Fetch lead and contractor in parallel ─────────────────────────────
  const [{ data: lead, error: leadError }, { data: contractor, error: contractorError }] =
    await Promise.all([
      supabase.from("leads").select("*").eq("id", leadId).single(),
      supabase.from("contractors").select("*").eq("id", contractorId).single(),
    ]);

  if (leadError || !lead) {
    return NextResponse.json({ message: "Lead not found." }, { status: 404 });
  }
  if (contractorError || !contractor) {
    return NextResponse.json({ message: "Contractor not found." }, { status: 404 });
  }
  if (contractor.status !== "approved") {
    return NextResponse.json({ message: "Contractor is not approved to receive leads." }, { status: 403 });
  }

  // ── 1b. Verify non-expired insurance document ────────────────────────────
  const now = new Date().toISOString();
  const { data: insuranceDocs } = await supabase
    .from("contractor_documents")
    .select("id, expires_at")
    .eq("contractor_id", contractorId)
    .eq("document_type", "insurance")
    .eq("verification_status", "verified");

  const hasValidInsurance = (insuranceDocs ?? []).some(
    (d: { expires_at: string | null }) => !d.expires_at || d.expires_at > now,
  );

  if (!hasValidInsurance) {
    return NextResponse.json(
      { message: "Contractor insurance has expired or is not verified. Cannot dispatch lead." },
      { status: 403 },
    );
  }

  // ── 2. Insert assignment record ──────────────────────────────────────────
  const { data: assignment, error: assignError } = await supabase
    .from("lead_assignments")
    .insert({
      lead_id:       leadId,
      contractor_id: contractorId,
      assigned_by:   "admin",
      status:        "sent",
      notes,
    })
    .select("id, created_at")
    .single();

  if (assignError || !assignment) {
    console.error("[send] lead_assignments insert error:", assignError?.message);
    return NextResponse.json({ message: "Failed to record assignment." }, { status: 500 });
  }

  // ── 3. Update lead status to matched ────────────────────────────────────
  await supabase.from("leads").update({ status: "matched" }).eq("id", leadId);

  // ── 4. Log dispatch event + contractor audit event ──────────────────────
  await Promise.all([
    supabase.from("dispatch_events").insert({
      lead_id:       leadId,
      contractor_id: contractorId,
      event_type:    "lead_sent",
      metadata:      { assignment_id: assignment.id },
    }),
    supabase.from("contractor_events").insert({
      contractor_id: contractorId,
      event_type:    "lead_sent",
      performed_by:  "admin",
      metadata:      { lead_id: leadId, assignment_id: assignment.id },
    }),
  ]);

  // ── 5. Send contractor email (non-blocking on failure) ───────────────────
  const contractorEmail: string | null = contractor.email ?? null;

  if (contractorEmail) {
    const emailData: ContractorDispatchEmailData = {
      homeowner_name:        lead.full_name,
      homeowner_phone:       lead.phone,
      homeowner_email:       lead.email,
      city:                  lead.city,
      zip_code:              lead.zip_code ?? "",
      issue_types:           lead.issue_types ?? [],
      urgency:               lead.urgency,
      insurance_claim_opened: lead.insurance_claim_opened ?? false,
      notes:                 lead.notes ?? null,
      contractor_company_name: contractor.company_name,
      assigned_at:           assignment.created_at,
      lead_id:               leadId,
    };

    try {
      await sendContractorDispatch(emailData, contractorEmail);
      console.log("[send] contractor email sent to:", contractorEmail);
      await supabase.from("dispatch_events").insert({
        lead_id:       leadId,
        contractor_id: contractorId,
        event_type:    "email_sent",
        metadata:      { assignment_id: assignment.id, to: contractorEmail },
      });
    } catch (err) {
      const msg = (err as Error)?.message ?? String(err);
      console.error("[send] contractor email failed:", msg);
      await supabase.from("dispatch_events").insert({
        lead_id:       leadId,
        contractor_id: contractorId,
        event_type:    "send_failed",
        metadata:      { assignment_id: assignment.id, error: msg },
      });
    }
  } else {
    console.log("[send] contractor has no email — skipping email dispatch");
    await supabase.from("dispatch_events").insert({
      lead_id:       leadId,
      contractor_id: contractorId,
      event_type:    "send_failed",
      metadata:      { assignment_id: assignment.id, error: "contractor has no email" },
    });
  }

  return NextResponse.json({
    success: true,
    assignmentId: assignment.id,
    emailSent: !!contractorEmail,
  }, { status: 201 });
}
