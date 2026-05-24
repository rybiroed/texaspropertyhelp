import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(): Promise<NextResponse> {
  const cookieStore = await cookies();
  cookieStore.set("contractor_session", "", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
    maxAge:   0,
  });
  return NextResponse.json({ success: true });
}
