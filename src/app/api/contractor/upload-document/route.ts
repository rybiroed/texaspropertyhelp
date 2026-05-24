import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseClient } from "@/lib/supabase";

const BUCKET = "contractor-documents";

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
]);

const ALLOWED_DOCUMENT_TYPES = new Set([
  "insurance",
  "license",
  "id",
  "w9",
]);

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-{2,}/g, "-")
    .slice(0, 120);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Auth: read contractor_id from session cookie
  const cookieStore = await cookies();
  const contractorId = cookieStore.get("contractor_session")?.value;
  if (!contractorId) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const documentType = formData.get("document_type");
  const expiresAtRaw = formData.get("expires_at");
  const file         = formData.get("file");

  if (!documentType || typeof documentType !== "string" || !ALLOWED_DOCUMENT_TYPES.has(documentType)) {
    return NextResponse.json({ message: "Invalid document_type." }, { status: 400 });
  }

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: "File is required." }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ message: "Only PDF, JPG, and PNG files are accepted." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ message: "File must be 10 MB or smaller." }, { status: 400 });
  }

  let expiresAt: string | null = null;
  if (documentType === "insurance" && typeof expiresAtRaw === "string" && expiresAtRaw.trim()) {
    const parsed = new Date(expiresAtRaw);
    if (!isNaN(parsed.getTime())) {
      expiresAt = parsed.toISOString();
    }
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ message: "Storage not configured." }, { status: 503 });
  }

  // Verify contractor exists and session is valid
  const { data: contractor, error: contractorError } = await supabase
    .from("contractors")
    .select("id, status")
    .eq("id", contractorId)
    .single();

  if (contractorError || !contractor) {
    return NextResponse.json({ message: "Contractor not found." }, { status: 404 });
  }

  if (!["pending_review", "approved", "suspended"].includes(contractor.status)) {
    return NextResponse.json({ message: "Account is not eligible for uploads." }, { status: 403 });
  }

  const sanitized   = sanitizeFilename(file.name || "document");
  const timestamp   = Date.now();
  const storagePath = `${contractorId}/${documentType}/${timestamp}-${sanitized}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, arrayBuffer, {
      contentType: file.type,
      upsert:      false,
    });

  if (uploadError) {
    console.error("[contractor/upload-document] storage error:", uploadError.message);
    return NextResponse.json({ message: "File upload failed. Please try again." }, { status: 500 });
  }

  const { data: doc, error: insertError } = await supabase
    .from("contractor_documents")
    .insert({
      contractor_id:       contractorId,
      document_type:       documentType,
      file_path:           storagePath,
      original_filename:   file.name?.slice(0, 500) || null,
      mime_type:           file.type,
      verification_status: "pending_review",
      expires_at:          expiresAt,
    })
    .select("id")
    .single();

  if (insertError || !doc) {
    console.error("[contractor/upload-document] db insert error:", insertError?.message);
    supabase.storage.from(BUCKET).remove([storagePath]).catch(() => null);
    return NextResponse.json({ message: "Failed to record document." }, { status: 500 });
  }

  try {
    await supabase.from("contractor_events").insert({
      contractor_id: contractorId,
      event_type:    "document_uploaded",
      performed_by:  "contractor",
      metadata:      { document_type: documentType, document_id: doc.id },
    });
  } catch (err) {
    console.error("[contractor/upload-document] event log error:", (err as Error)?.message ?? err);
  }

  return NextResponse.json({ success: true, documentId: doc.id }, { status: 201 });
}
