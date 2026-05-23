import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login page and its API route are always accessible — skip the guard.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("admin_auth");
  if (cookie?.value !== "1") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all /admin/* paths (including /admin itself).
  // /api/admin/login is not matched here so it is always reachable.
  matcher: ["/admin/:path*"],
};
