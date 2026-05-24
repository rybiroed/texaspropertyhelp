import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id: contractorId } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const docId  = body.docId;
  const action = body.action;
  const reason = typeof body.reason === "string" ? body.reason.trim() || null : null;

  if (!docId || typeof docId !== "string") {
    return NextResponse.json({ message: "docId is required." }, { status: 400 });
  }
  if (action !== "verify" && action !== "reject") {
    return NextResponse.json({ message: "action must be 'verify' or 'reject'." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ message: "Database not configured." }, { status: 503 });
  }

  // Verify document belongs to this contractor
  const { data: doc, error: fetchError } = await supabase
    .from("contractor_documents")
    .select("id, document_type, verification_status")
    .eq("id", docId)
    .eq("contractor_id", contractorId)
    .single();

  if (fetchError || !doc) {
    return NextResponse.json({ message: "Document not found." }, { status: 404 });
  }

  const now = new Date().toISOString();
  const update: Record<string, unknown> =
    action === "verify"
      ? { verification_status: "verified", verified_at: now, verified_by: "admin", rejection_reason: null }
      : { verification_status: "rejected", rejection_reason: reason };

  const { error: updateError } = await supabase
    .from("contractor_documents")
    .update(update)
    .eq("id", docId);

  if (updateError) {
    console.error("[document-action] update error:", updateError.message);
    return NextResponse.json({ message: "Failed to update document." }, { status: 500 });
  }

  // Audit event
  try {
    await supabase.from("contractor_events").insert({
      contractor_id: contractorId,
      event_type:    action === "verify" ? "document_verified" : "document_rejected",
      performed_by:  "admin",
      metadata:      { document_id: docId, document_type: doc.document_type, ...(reason ? { reason } : {}) },
    });
  } catch (err) {
    console.error("[document-action] event log error:", (err as Error)?.message ?? err);
  }

  return NextResponse.json({ success: true });
}
