import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

const BUCKET        = "contractor-documents";
const SIGNED_URL_TTL = 120; // seconds — short-lived, admin-only

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id: contractorId } = await params;

  const docId = req.nextUrl.searchParams.get("docId");
  if (!docId) {
    return NextResponse.json({ message: "docId query parameter is required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ message: "Storage not configured." }, { status: 503 });
  }

  // Verify document belongs to this contractor and fetch file_path
  const { data: doc, error: fetchError } = await supabase
    .from("contractor_documents")
    .select("id, file_path, original_filename, mime_type")
    .eq("id", docId)
    .eq("contractor_id", contractorId)
    .single();

  if (fetchError || !doc) {
    return NextResponse.json({ message: "Document not found." }, { status: 404 });
  }

  // Generate short-lived signed URL from private bucket
  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(doc.file_path, SIGNED_URL_TTL);

  if (signError || !signed?.signedUrl) {
    console.error("[document-download] signed URL error:", signError?.message);
    return NextResponse.json({ message: "Could not generate download link." }, { status: 500 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
