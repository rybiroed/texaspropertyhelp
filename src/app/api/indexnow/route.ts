import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

/**
 * POST /api/indexnow
 * Submits a list of URLs to IndexNow (Bing/AI search engines).
 *
 * Authorization: Bearer <INDEXNOW_SUBMIT_SECRET>
 * Body: { urls: string[] }
 *
 * Use this after publishing new guides or updating existing pages.
 * Example: curl -X POST /api/indexnow \
 *   -H "Authorization: Bearer <secret>" \
 *   -H "Content-Type: application/json" \
 *   -d '{"urls":["/guides/texas-hail-damage-homeowner-checklist"]}'
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "IndexNow not configured." }, { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let body: { urls?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(body.urls) || body.urls.length === 0) {
    return NextResponse.json({ message: "urls must be a non-empty array." }, { status: 400 });
  }

  const urls = (body.urls as unknown[]).filter((u): u is string => typeof u === "string");
  if (urls.length === 0) {
    return NextResponse.json({ message: "No valid string URLs provided." }, { status: 400 });
  }

  const result = await submitToIndexNow(urls);

  return NextResponse.json(result, { status: result.failed === 0 ? 200 : 207 });
}
