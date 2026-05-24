import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Contractor routes that are always reachable without a session
const CONTRACTOR_PUBLIC = new Set([
  "/contractor/login",
  "/api/contractor/request-login",
  "/api/contractor/verify-token",
  "/api/contractor/logout",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin routes ──────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login" || pathname === "/api/admin/login") {
      return NextResponse.next();
    }
    const adminCookie = request.cookies.get("admin_auth");
    if (adminCookie?.value !== "1") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // ── Contractor routes ─────────────────────────────────────────────────────
  if (CONTRACTOR_PUBLIC.has(pathname)) {
    return NextResponse.next();
  }
  const contractorSession = request.cookies.get("contractor_session");
  if (!contractorSession?.value) {
    return NextResponse.redirect(new URL("/contractor/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/contractor/:path*", "/api/contractor/:path*"],
};
