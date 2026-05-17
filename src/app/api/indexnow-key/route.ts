import { NextResponse } from "next/server";

/**
 * GET /api/indexnow-key
 * Serves the IndexNow key file so search engines can verify domain ownership.
 * The key value must match the INDEXNOW_KEY env var.
 */
export async function GET(): Promise<NextResponse> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return new NextResponse("Not configured", { status: 404 });
  }
  return new NextResponse(key, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
