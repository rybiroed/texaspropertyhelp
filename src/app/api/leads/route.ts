import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabaseClient } from "@/lib/supabase";
import { sendAdminNotification, sendHomeownerConfirmation } from "@/lib/email";
import type { LeadEmailData } from "@/lib/email";

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "tph-default-salt-change-in-prod";
  return createHash("sha256").update(salt + ip).digest("hex").slice(0, 32);
}

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; real users never see them
  if (body._hp) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Required field validation
  const requiredFields = ["fullName", "phone", "email", "zipCode", "city", "propertyType", "urgency", "consentGiven"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
    }
  }
  if (!Array.isArray(body.helpNeeded) || (body.helpNeeded as string[]).length === 0) {
    return NextResponse.json({ message: "Please select at least one type of help needed." }, { status: 400 });
  }
  if (!body.consentGiven) {
    return NextResponse.json({ message: "Consent is required to submit this form." }, { status: 400 });
  }

  const email = String(body.email).toLowerCase().trim();
  const ipHash = hashIp(getClientIp(req));
  const supabase = getSupabaseClient();

  // Rate limiting via Supabase
  if (supabase) {
    // Duplicate email within 10 minutes → silent success (no double-sending)
    const { data: recentByEmail } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .gte("created_at", new Date(Date.now() - 10 * 60 * 1000).toISOString())
      .limit(1);

    if (recentByEmail && recentByEmail.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Same IP > 5 submissions per hour → block
    const { count: ipCount } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString());

    if (ipCount !== null && ipCount >= 5) {
      return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
    }
  }

  const helpNeeded = body.helpNeeded as string[];

  const lead = {
    language: String(body.preferredLanguage || "en"),
    full_name: String(body.fullName),
    email,
    phone: String(body.phone),
    city: String(body.city),
    zip_code: String(body.zipCode),
    property_type: String(body.propertyType),
    issue_types: helpNeeded,
    insurance_claim_opened: helpNeeded.includes("insurance-claim-guidance"),
    urgency: String(body.urgency),
    notes: body.description ? String(body.description) : null,
    source_page: body.pageSource ? String(body.pageSource) : null,
    ip_hash: ipHash,
    status: "new",
  };

  // Persist to Supabase (or log if not configured)
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

  // Send emails — failures are logged but do not affect the 201 response
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
  };

  await Promise.allSettled([
    sendAdminNotification(emailData).catch((e) =>
      console.error("[leads] Admin notification error:", (e as Error).message)
    ),
    sendHomeownerConfirmation(emailData).catch((e) =>
      console.error("[leads] Homeowner confirmation error:", (e as Error).message)
    ),
  ]);

  return NextResponse.json({ success: true }, { status: 201 });
}
