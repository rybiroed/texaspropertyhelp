import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import { getSupabaseClient } from "@/lib/supabase";
import { sendContractorMagicLink } from "@/lib/email";

const TOKEN_TTL_MINUTES = 15;

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;
  if (!email) {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ message: "Service unavailable." }, { status: 503 });
  }

  // Look up contractor by email — return generic success to avoid email enumeration
  const { data: contractor } = await supabase
    .from("contractors")
    .select("id, company_name, email")
    .eq("email", email)
    .single();

  if (contractor) {
    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000).toISOString();

    const { error: insertError } = await supabase.from("contractor_access_tokens").insert({
      contractor_id: contractor.id,
      token_hash:    tokenHash,
      expires_at:    expiresAt,
    });

    if (!insertError) {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://texaspropertyhelp.com";
      const loginUrl = `${baseUrl}/api/contractor/verify-token?token=${rawToken}`;

      try {
        await sendContractorMagicLink(
          { company_name: contractor.company_name, login_url: loginUrl, expires_minutes: TOKEN_TTL_MINUTES },
          contractor.email,
        );
      } catch (err) {
        console.error("[request-login] email send error:", (err as Error)?.message ?? err);
      }
    } else {
      console.error("[request-login] token insert error:", insertError.message);
    }
  }

  // Always return 200 to avoid email enumeration
  return NextResponse.json({ success: true });
}
