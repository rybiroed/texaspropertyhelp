import { NextRequest, NextResponse } from "next/server";

/**
 * PLACEHOLDER LEAD API ROUTE
 *
 * This route exists so the form doesn't 404 during development
 * before the real backend is connected.
 *
 * TO CONNECT YOUR REAL BACKEND:
 * Option A — External API:
 *   Set NEXT_PUBLIC_LEAD_API_URL=https://yourbackend.com/lead in .env.local
 *   Delete or keep this file (it will be bypassed).
 *
 * Option B — Route handler with CRM forwarding:
 *   Rename this file to route.ts and replace the body below with
 *   real CRM/webhook/email integration logic.
 *   E.g. forward to HubSpot, GoHighLevel, Zapier webhook, etc.
 *
 * Payload shape: see src/types/index.ts → LeadFormData
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  // ── DEV ONLY: Log the submitted lead ──────────────────────────
  console.log("[PLACEHOLDER LEAD API] Received lead submission:");
  console.log(JSON.stringify(body, null, 2));
  // ──────────────────────────────────────────────────────────────

  // In production, this block should:
  // 1. Validate the payload
  // 2. Forward to your CRM / database / email system
  // 3. Return a 200/201 on success, 4xx/5xx on failure

  return NextResponse.json(
    {
      success: true,
      message: "Lead received (placeholder — not stored in production)",
    },
    { status: 200 }
  );
}
