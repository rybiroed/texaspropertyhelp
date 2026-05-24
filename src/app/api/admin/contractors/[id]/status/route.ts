import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

const ALLOWED_STATUSES = new Set(["pending_review", "approved", "rejected", "suspended", "blocked"]);

type ContractorRow = {
  agreement_signed: boolean;
  years_in_business: number | null;
  website: string | null;
  social_profile: string | null;
};

type DocRow = {
  document_type: string;
  verification_status: string;
  expires_at: string | null;
};

function getMissingRequirements(
  c: ContractorRow,
  docs: DocRow[],
  now: string,
): string[] {
  const missing: string[] = [];

  if (!c.agreement_signed) missing.push("agreement_signed");
  if (!c.years_in_business || c.years_in_business <= 0) missing.push("years_in_business");
  const hasPresence = !!(c.website?.trim()) || !!(c.social_profile?.trim());
  if (!hasPresence) missing.push("website_or_social_profile");

  // Verified insurance that hasn't expired
  const hasVerifiedInsurance = docs.some(
    (d) =>
      d.document_type === "insurance" &&
      d.verification_status === "verified" &&
      (!d.expires_at || d.expires_at > now),
  );
  if (!hasVerifiedInsurance) missing.push("verified_insurance_document");

  // Verified government ID
  const hasVerifiedId = docs.some(
    (d) => d.document_type === "id" && d.verification_status === "verified",
  );
  if (!hasVerifiedId) missing.push("verified_government_id");

  return missing;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const status = body.status;
  const reason = typeof body.reason === "string" ? body.reason.trim() || null : null;

  if (!status || typeof status !== "string" || !ALLOWED_STATUSES.has(status)) {
    return NextResponse.json({ message: "Invalid status." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ message: "Database not configured." }, { status: 503 });
  }

  // ── Fetch contractor + documents in parallel ──────────────────────────────
  const [{ data: contractor, error: fetchError }, { data: docs }] = await Promise.all([
    supabase
      .from("contractors")
      .select("agreement_signed, years_in_business, website, social_profile")
      .eq("id", id)
      .single(),
    supabase
      .from("contractor_documents")
      .select("document_type, verification_status, expires_at")
      .eq("contractor_id", id),
  ]);

  if (fetchError || !contractor) {
    return NextResponse.json({ message: "Contractor not found." }, { status: 404 });
  }

  // ── Compliance gate (approval only) ──────────────────────────────────────
  if (status === "approved") {
    const now     = new Date().toISOString();
    const missing = getMissingRequirements(
      contractor as ContractorRow,
      (docs ?? []) as DocRow[],
      now,
    );

    if (missing.length > 0) {
      try {
        await supabase.from("contractor_events").insert({
          contractor_id: id,
          event_type:    "approval_failed",
          performed_by:  "admin",
          metadata:      { missing },
        });
      } catch (err) {
        console.error("[contractors/status] approval_failed event log error:", (err as Error)?.message ?? err);
      }
      return NextResponse.json(
        { error: "Compliance requirements incomplete", missing },
        { status: 400 },
      );
    }
  }

  // ── Apply status update ───────────────────────────────────────────────────
  const now = new Date().toISOString();
  const update: Record<string, unknown> = { status };

  if (status === "approved") {
    update.approved_at  = now;
    update.approved_by  = "admin";
  } else if (status === "rejected") {
    update.rejected_at     = now;
    update.rejected_reason = reason;
  } else if (status === "suspended") {
    update.suspended_at     = now;
    update.suspended_reason = reason;
  } else if (status === "blocked") {
    update.blocked_at     = now;
    update.blocked_reason = reason;
  }

  const { error: updateError } = await supabase.from("contractors").update(update).eq("id", id);
  if (updateError) {
    console.error("[contractors/status] update error:", updateError.message);
    return NextResponse.json({ message: "Failed to update status." }, { status: 500 });
  }

  // ── Audit log ────────────────────────────────────────────────────────────
  try {
    await supabase.from("contractor_events").insert({
      contractor_id: id,
      event_type:    status,
      performed_by:  "admin",
      metadata:      reason ? { reason } : {},
    });
  } catch (err) {
    console.error("[contractors/status] event log error:", (err as Error)?.message ?? err);
  }

  return NextResponse.json({ success: true });
}
