import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { getSupabaseClient } from "@/lib/supabase";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export async function GET(req: NextRequest): Promise<NextResponse> {
  const rawToken = req.nextUrl.searchParams.get("token");
  if (!rawToken) {
    return NextResponse.redirect(new URL("/contractor/login?error=missing", req.url));
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.redirect(new URL("/contractor/login?error=service", req.url));
  }

  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  const now = new Date().toISOString();

  const { data: token, error } = await supabase
    .from("contractor_access_tokens")
    .select("id, contractor_id, expires_at, used_at")
    .eq("token_hash", tokenHash)
    .single();

  if (error || !token) {
    return NextResponse.redirect(new URL("/contractor/login?error=invalid", req.url));
  }

  if (token.used_at) {
    return NextResponse.redirect(new URL("/contractor/login?error=used", req.url));
  }

  if (token.expires_at < now) {
    return NextResponse.redirect(new URL("/contractor/login?error=expired", req.url));
  }

  // Mark token as used
  await supabase
    .from("contractor_access_tokens")
    .update({ used_at: now })
    .eq("id", token.id);

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("contractor_session", token.contractor_id, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
    maxAge:   SESSION_MAX_AGE,
  });

  return NextResponse.redirect(new URL("/contractor/dashboard", req.url));
}
