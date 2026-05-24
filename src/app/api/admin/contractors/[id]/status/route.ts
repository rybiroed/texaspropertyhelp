import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

const ALLOWED_STATUSES = new Set(["pending_review", "approved", "rejected", "suspended", "blocked"]);

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

  const { error } = await supabase.from("contractors").update(update).eq("id", id);
  if (error) {
    console.error("[contractors/status] update error:", error.message);
    return NextResponse.json({ message: "Failed to update status." }, { status: 500 });
  }

  // Log to contractor_events (non-blocking)
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
