import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";
// 8-hour session; refresh on each successful login.
const MAX_AGE = 60 * 60 * 8;

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("[admin/login] ADMIN_PASSWORD env var is not set.");
    return NextResponse.json({ message: "Admin login is not configured." }, { status: 503 });
  }

  if (!body.password || typeof body.password !== "string") {
    return NextResponse.json({ message: "Password is required." }, { status: 400 });
  }

  if (body.password !== adminPassword) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  const isProduction = process.env.NODE_ENV === "production";

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE,
  });

  return res;
}
