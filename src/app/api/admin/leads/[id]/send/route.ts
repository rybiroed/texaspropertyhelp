import { NextRequest, NextResponse } from "next/server";

// TODO: Implement real lead dispatch (email, SMS, or contractor notification).
// For now this is a placeholder that logs and confirms the action.

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  console.log("[admin/leads/send] Send Lead triggered — lead id:", id);

  return NextResponse.json({
    success: true,
    message: "Send Lead is not yet implemented. Lead ID logged to console.",
    leadId: id,
  });
}
