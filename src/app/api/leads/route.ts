import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabaseClient } from "@/lib/supabase";
import { sendAdminNotification, sendHomeownerConfirmation } from "@/lib/email";
import type { LeadEmailData } from "@/lib/email";

// ─── Helpers ────────────────────────────────────────────────────────────────

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "tph-default-salt-change-in-prod";
  return createHash("sha256").update(salt + ip).digest("hex").slice(0, 32);
}

function getClientIp(req: NextRequest): string {
  // x-real-ip is set by Vercel's edge and is not user-controllable
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  // x-forwarded-for: Vercel prepends the real client IP as the first entry
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

/** Trim and truncate a string field from the raw body. Returns null if absent or empty. */
function clamp(raw: unknown, maxLen: number): string | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed.slice(0, maxLen) : null;
}

// ─── Request validation ──────────────────────────────────────────────────────

interface ValidatedBody {
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  city: string;
  propertyType: string;
  helpNeeded: string[];
  urgency: string;
  preferredLanguage: string;
  description: string | null;
  pageSource: string | null;
  // Lead intelligence — captured client-side from browser
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string | null;
}

function validateBody(raw: Record<string, unknown>): ValidatedBody | { validationError: string } {
  const requiredStrings: (keyof typeof raw)[] = [
    "fullName", "phone", "email", "zipCode", "city", "propertyType", "urgency",
  ];
  for (const field of requiredStrings) {
    if (!raw[field] || typeof raw[field] !== "string" || !(raw[field] as string).trim()) {
      return { validationError: `Missing required field: ${field}` };
    }
  }
  if (!Array.isArray(raw.helpNeeded) || (raw.helpNeeded as unknown[]).length === 0) {
    return { validationError: "Please select at least one type of help needed." };
  }
  if (!raw.consentGiven) {
    return { validationError: "Consent is required to submit this form." };
  }

  return {
    fullName: (raw.fullName as string).trim(),
    phone: (raw.phone as string).trim(),
    email: (raw.email as string).toLowerCase().trim(),
    zipCode: (raw.zipCode as string).trim(),
    city: (raw.city as string).trim(),
    propertyType: (raw.propertyType as string).trim(),
    helpNeeded: (raw.helpNeeded as unknown[]).map(String),
    urgency: (raw.urgency as string).trim(),
    preferredLanguage: clamp(raw.preferredLanguage, 10) ?? "en",
    description: clamp(raw.description, 2000),
    pageSource: clamp(raw.pageSource, 200),
    utm_source: clamp(raw.utm_source, 200),
    utm_medium: clamp(raw.utm_medium, 200),
    utm_campaign: clamp(raw.utm_campaign, 200),
    referrer: clamp(raw.referrer, 500),
    landing_page: clamp(raw.landing_page, 500),
  };
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; real users never see them
  if (raw._hp) {
    console.log("[leads/spam] honeypot triggered — discarding silently");
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const validated = validateBody(raw);
  if ("validationError" in validated) {
    return NextResponse.json({ message: validated.validationError }, { status: 400 });
  }

  const { email, helpNeeded } = validated;
  const ipHash = hashIp(getClientIp(req));
  // User-Agent from the request header is more reliable than any client-sent value
  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;
  const supabase = getSupabaseClient();

  // ── Rate limiting via Supabase ───────────────────────────────────────────
  if (supabase) {
    // Same email within 10 minutes → silent success (prevents double-submission)
    const { data: recentByEmail } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .gte("created_at", new Date(Date.now() - 10 * 60 * 1000).toISOString())
      .limit(1);

    if (recentByEmail && recentByEmail.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Same IP hash ≥ 3 submissions per 10 minutes → block
    const { count: ipCount } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", new Date(Date.now() - 10 * 60 * 1000).toISOString());

    if (ipCount !== null && ipCount >= 3) {
      return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
    }
  }

  // ── Build lead record ────────────────────────────────────────────────────
  const lead = {
    // Contact
    full_name: validated.fullName,
    email,
    phone: validated.phone,
    city: validated.city,
    zip_code: validated.zipCode,
    // Request details
    language: validated.preferredLanguage,
    property_type: validated.propertyType,
    issue_types: helpNeeded,
    insurance_claim_opened: helpNeeded.includes("insurance-claim-guidance"),
    urgency: validated.urgency,
    notes: validated.description,
    // Tracking — client-side context
    source_page: validated.pageSource,
    utm_source: validated.utm_source,
    utm_medium: validated.utm_medium,
    utm_campaign: validated.utm_campaign,
    referrer: validated.referrer,
    landing_page: validated.landing_page,
    // Server-side context
    user_agent: userAgent,
    ip_hash: ipHash,
    // Workflow
    status: "new",
  };

  // ── Persist to Supabase ──────────────────────────────────────────────────
  if (supabase) {
    const { error } = await supabase.from("leads").insert(lead);
    if (error) {
      console.error("[leads] Supabase insert error:", error.message);
      return NextResponse.json({ message: "Failed to save your request. Please try again." }, { status: 500 });
    }
  } else {
    console.log("[leads] Supabase not configured — lead data:");
    console.log(JSON.stringify(lead, null, 2));
  }

  // ── Send emails ──────────────────────────────────────────────────────────
  // Failures are logged but do not affect the 201 response.
  const emailData: LeadEmailData = {
    fullName: lead.full_name,
    email,
    phone: lead.phone,
    city: lead.city,
    zipCode: lead.zip_code,
    propertyType: lead.property_type,
    helpNeeded,
    urgency: lead.urgency,
    description: lead.notes ?? undefined,
    preferredLanguage: lead.language,
    sourcePage: lead.source_page ?? undefined,
    // Lead intelligence — for admin notification
    utmSource: validated.utm_source,
    utmMedium: validated.utm_medium,
    utmCampaign: validated.utm_campaign,
    referrer: validated.referrer,
    landingPage: validated.landing_page,
    userAgent,
    ipHash,
  };

  console.log("[leads/email] RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);
  console.log("[leads/email] RESEND_FROM_EMAIL:", process.env.RESEND_FROM_EMAIL ?? "(not set — using default)");
  console.log("[leads/email] ADMIN_NOTIFICATION_EMAIL:", process.env.ADMIN_NOTIFICATION_EMAIL ?? "(not set — using default)");

  const [adminResult, homeownerResult] = await Promise.allSettled([
    sendAdminNotification(emailData),
    sendHomeownerConfirmation(emailData),
  ]);

  if (adminResult.status === "fulfilled") {
    console.log("[leads/email] sendAdminNotification: ok");
  } else {
    console.error("[leads/email] sendAdminNotification error:", (adminResult.reason as Error)?.message ?? adminResult.reason);
  }

  if (homeownerResult.status === "fulfilled") {
    console.log("[leads/email] sendHomeownerConfirmation: ok");
  } else {
    console.error("[leads/email] sendHomeownerConfirmation error:", (homeownerResult.reason as Error)?.message ?? homeownerResult.reason);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
