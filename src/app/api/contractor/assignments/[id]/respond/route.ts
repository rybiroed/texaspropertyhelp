import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseClient } from "@/lib/supabase";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id: assignmentId } = await params;

  // Auth: read contractor_id from session cookie
  const cookieStore = await cookies();
  const contractorId = cookieStore.get("contractor_session")?.value;
  if (!contractorId) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const action = body.action;
  if (action !== "accept" && action !== "decline") {
    return NextResponse.json({ message: "action must be 'accept' or 'decline'." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ message: "Service unavailable." }, { status: 503 });
  }

  // Verify assignment belongs to this contractor and is awaiting a response
  const { data: assignment, error: fetchError } = await supabase
    .from("lead_assignments")
    .select("id, status, contractor_id")
    .eq("id", assignmentId)
    .eq("contractor_id", contractorId)
    .single();

  if (fetchError || !assignment) {
    console.error(`[assignment/respond] fetch failed assignment=${assignmentId} contractor=${contractorId}:`, fetchError?.message ?? "not found");
    return NextResponse.json({ message: "Assignment not found." }, { status: 404 });
  }

  if (assignment.status !== "sent") {
    console.log(`[assignment/respond] assignment=${assignmentId} already responded status=${assignment.status}`);
    return NextResponse.json(
      { message: "Assignment is no longer awaiting a response." },
      { status: 409 },
    );
  }

  const newStatus = action === "accept" ? "accepted" : "declined";

  const { error: updateError } = await supabase
    .from("lead_assignments")
    .update({ status: newStatus })
    .eq("id", assignmentId);

  if (updateError) {
    console.error(`[assignment/respond] update failed assignment=${assignmentId} contractor=${contractorId} prev=sent next=${newStatus}:`, updateError.message);
    return NextResponse.json({ message: "Failed to update assignment." }, { status: 500 });
  }

  console.log(`[assignment/respond] assignment=${assignmentId} contractor=${contractorId} prev=sent next=${newStatus}`);
  return NextResponse.json({ success: true, status: newStatus });
}
