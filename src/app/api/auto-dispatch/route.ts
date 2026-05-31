/**
 * AUTO-DISPATCH API — Texas Property Help
 *
 * Called by n8n every 15 minutes.
 * Finds NEW leads → matches approved contractors by zip/trade → sends lead automatically.
 *
 * POST /api/auto-dispatch
 * Headers: x-dispatch-secret: <AUTO_DISPATCH_SECRET env var>
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendContractorDispatch } from "@/lib/email";
import type { ContractorDispatchEmailData } from "@/lib/email";

const SECRET = process.env.AUTO_DISPATCH_SECRET ?? "";

// Trade mapping: lead issue_type → contractor.trade
const ISSUE_TO_TRADE: Record<string, string[]> = {
  "roof-inspection":          ["roofing"],
  "roof-repair":              ["roofing"],
  "roof-replacement":         ["roofing"],
  "storm-damage":             ["roofing", "restoration"],
  "hvac-repair":              ["hvac"],
  "hvac-replacement":         ["hvac"],
  "insurance-claim-guidance": ["roofing", "restoration"],
  "emergency-repair":         ["roofing", "restoration", "hvac"],
  "general-repair":           ["general"],
  "repair-financing":         ["general"],
};

function getTrades(issueTypes: string[]): string[] {
  const trades = new Set<string>();
  for (const issue of issueTypes) {
    const mapped = ISSUE_TO_TRADE[issue] ?? ["general"];
    mapped.forEach((t) => trades.add(t));
  }
  return [...trades];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Auth check
  const secret = req.headers.get("x-dispatch-secret");
  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ message: "Database not configured." }, { status: 503 });
  }

  // ── 1. Fetch NEW leads (not yet matched, not older than 48h) ─────────────
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select("id, full_name, phone, email, city, zip_code, issue_types, urgency, notes, insurance_claim_opened, language")
    .eq("status", "new")
    .gte("created_at", cutoff)
    .order("created_at", { ascending: true })
    .limit(20);

  if (leadsError) {
    console.error("[auto-dispatch] leads fetch error:", leadsError.message);
    return NextResponse.json({ message: "DB error." }, { status: 500 });
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({ dispatched: 0, message: "No new leads to dispatch." });
  }

  const results: Array<{ leadId: string; status: string; contractorId?: string }> = [];

  for (const lead of leads) {
    const issueTypes: string[] = lead.issue_types ?? [];
    const trades = getTrades(issueTypes);

    // ── 2. Find best matching approved contractor ──────────────────────────
    // Priority: same zip → same city → same state, then by emergency_available if urgent
    const isUrgent = lead.urgency === "emergency" || lead.urgency === "urgent";

    let contractorQuery = supabase
      .from("contractors")
      .select("id, company_name, email, trade, service_area, zip_code, service_radius_miles, languages, emergency_available")
      .eq("status", "approved")
      .in("trade", trades);

    if (isUrgent) {
      contractorQuery = contractorQuery.eq("emergency_available", true);
    }

    const { data: candidates } = await contractorQuery.limit(20);

    if (!candidates || candidates.length === 0) {
      results.push({ leadId: lead.id, status: "no_contractor" });
      console.log(`[auto-dispatch] lead=${lead.id} — no approved contractors for trades: ${trades.join(",")}`);
      continue;
    }

    // Score candidates: same zip = +3, same city = +2, speaks lead language = +2, emergency = +1
    const scored = candidates.map((c) => {
      let score = 0;
      if (c.zip_code === lead.zip_code) score += 3;
      if ((c.service_area ?? "").toLowerCase().includes((lead.city ?? "").toLowerCase())) score += 2;
      if (lead.language === "es" && (c.languages ?? []).includes("es")) score += 2;
      if (isUrgent && c.emergency_available) score += 1;
      return { ...c, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    if (!best?.email) {
      results.push({ leadId: lead.id, status: "no_email" });
      continue;
    }

    // ── 3. Check not already assigned to this contractor ──────────────────
    const { data: existing } = await supabase
      .from("lead_assignments")
      .select("id")
      .eq("lead_id", lead.id)
      .eq("contractor_id", best.id)
      .limit(1);

    if (existing && existing.length > 0) {
      results.push({ leadId: lead.id, status: "already_assigned", contractorId: best.id });
      continue;
    }

    // ── 4. Create assignment ───────────────────────────────────────────────
    const { data: assignment, error: assignError } = await supabase
      .from("lead_assignments")
      .insert({
        lead_id:       lead.id,
        contractor_id: best.id,
        assigned_by:   "auto",
        status:        "sent",
        notes:         "Auto-dispatched by system",
      })
      .select("id, created_at")
      .single();

    if (assignError || !assignment) {
      console.error("[auto-dispatch] assignment insert error:", assignError?.message);
      results.push({ leadId: lead.id, status: "assign_error" });
      continue;
    }

    // ── 5. Update lead status ──────────────────────────────────────────────
    await supabase.from("leads").update({ status: "matched" }).eq("id", lead.id);

    // ── 6. Log events ──────────────────────────────────────────────────────
    await Promise.all([
      supabase.from("dispatch_events").insert({
        lead_id:       lead.id,
        contractor_id: best.id,
        event_type:    "lead_sent",
        metadata:      { assignment_id: assignment.id, method: "auto" },
      }),
      supabase.from("contractor_events").insert({
        contractor_id: best.id,
        event_type:    "lead_sent",
        performed_by:  "auto-dispatch",
        metadata:      { lead_id: lead.id, assignment_id: assignment.id },
      }),
    ]);

    // ── 7. Send email to contractor ────────────────────────────────────────
    const emailData: ContractorDispatchEmailData = {
      homeowner_name:          lead.full_name,
      homeowner_phone:         lead.phone,
      homeowner_email:         lead.email,
      city:                    lead.city,
      zip_code:                lead.zip_code ?? "",
      issue_types:             issueTypes,
      urgency:                 lead.urgency,
      insurance_claim_opened:  lead.insurance_claim_opened ?? false,
      notes:                   lead.notes ?? null,
      contractor_company_name: best.company_name,
      assigned_at:             assignment.created_at,
      lead_id:                 lead.id,
    };

    try {
      await sendContractorDispatch(emailData, best.email);
      await supabase.from("dispatch_events").insert({
        lead_id:       lead.id,
        contractor_id: best.id,
        event_type:    "email_sent",
        metadata:      { assignment_id: assignment.id, to: best.email },
      });
      results.push({ leadId: lead.id, status: "dispatched", contractorId: best.id });
      console.log(`[auto-dispatch] lead=${lead.id} → contractor=${best.id} (${best.company_name})`);
    } catch (err) {
      const msg = (err as Error)?.message ?? String(err);
      console.error("[auto-dispatch] email error:", msg);
      await supabase.from("dispatch_events").insert({
        lead_id:       lead.id,
        contractor_id: best.id,
        event_type:    "send_failed",
        metadata:      { assignment_id: assignment.id, error: msg },
      });
      results.push({ leadId: lead.id, status: "email_failed", contractorId: best.id });
    }
  }

  const dispatched = results.filter((r) => r.status === "dispatched").length;
  const noContractor = results.filter((r) => r.status === "no_contractor").length;

  console.log(`[auto-dispatch] done — dispatched=${dispatched} no_contractor=${noContractor} total=${leads.length}`);

  return NextResponse.json({
    dispatched,
    total: leads.length,
    noContractor,
    results,
  });
}
