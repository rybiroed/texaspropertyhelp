import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendContractorAdminNotification } from "@/lib/email";
import type { ContractorEmailData } from "@/lib/email";

const CONTRACTOR_ADMIN_EMAIL =
  process.env.CONTRACTOR_NOTIFICATION_EMAIL || "Viktor@grymman.com";

const ALLOWED_RADII = new Set([10, 25, 50, 75, 100, 150, 250, 500]);

function clamp(raw: unknown, maxLen: number): string | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed.slice(0, maxLen) : null;
}

function toStringArray(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map((v) => String(v).trim()).filter(Boolean);
  }
  if (!raw || typeof raw !== "string") return [];
  return raw.split(",").map((v) => v.trim()).filter(Boolean);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const companyName = clamp(raw.company_name, 200);
  const phone       = clamp(raw.phone, 50);
  const trade       = clamp(raw.trade, 100);
  const zipCode     = clamp(raw.zip_code, 20);

  if (!companyName) return NextResponse.json({ message: "Company name is required." }, { status: 400 });
  if (!phone)       return NextResponse.json({ message: "Phone number is required." }, { status: 400 });
  if (!trade)       return NextResponse.json({ message: "Trade is required." }, { status: 400 });
  if (!zipCode)     return NextResponse.json({ message: "ZIP code is required." }, { status: 400 });

  const agreementAccepted = raw.agreement_accepted === true || raw.agreement_accepted === "true";
  if (!agreementAccepted) {
    return NextResponse.json({ message: "You must agree to the Contractor Network Agreement." }, { status: 400 });
  }

  const radiusRaw = Number(raw.service_radius_miles);
  const serviceRadiusMiles = ALLOWED_RADII.has(radiusRaw) ? radiusRaw : 50;

  const yearsRaw = Number(raw.years_in_business);
  const yearsInBusiness = Number.isInteger(yearsRaw) && yearsRaw >= 0 && yearsRaw <= 100 ? yearsRaw : null;

  const record = {
    company_name:         companyName,
    contact_name:         clamp(raw.contact_name, 200),
    phone,
    email:                clamp(raw.email, 200),
    trade,
    zip_code:             zipCode,
    service_radius_miles: serviceRadiusMiles,
    service_area:         toStringArray(raw.service_area),
    languages:            toStringArray(raw.languages),
    emergency_available:  raw.emergency_available === true || raw.emergency_available === "true",
    notes:                clamp(raw.notes, 2000),
    website:              clamp(raw.website, 500),
    years_in_business:    yearsInBusiness,
    status:               "pending_review",
    agreement_signed:     true,
    agreement_signed_at:  new Date().toISOString(),
    agreement_version:    "v1",
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    const { data: inserted, error } = await supabase.from("contractors").insert(record).select("id").single();
    if (error || !inserted) {
      console.error("[contractors] Supabase insert error:", error?.message);
      return NextResponse.json(
        { message: "Failed to save your application. Please try again." },
        { status: 500 }
      );
    }
    // Log contractor_created event (non-blocking)
    try {
      await supabase.from("contractor_events").insert({
        contractor_id: inserted.id,
        event_type:    "contractor_created",
        performed_by:  "applicant",
        metadata:      { trade: record.trade, zip_code: record.zip_code },
      });
    } catch (err) {
      console.error("[contractors] event log error:", (err as Error)?.message ?? err);
    }
  } else {
    console.log("[contractors] Supabase not configured — contractor data:");
    console.log(JSON.stringify(record, null, 2));
  }

  // Send admin notification — failure does not affect the 201 response.
  const emailData: ContractorEmailData = {
    company_name:         record.company_name,
    contact_name:         record.contact_name,
    phone:                record.phone,
    email:                record.email,
    trade:                record.trade,
    zip_code:             record.zip_code,
    service_radius_miles: record.service_radius_miles,
    service_area:         record.service_area,
    languages:            record.languages,
    emergency_available:  record.emergency_available,
    notes:                record.notes,
    status:               record.status,
  };

  try {
    await sendContractorAdminNotification(emailData, CONTRACTOR_ADMIN_EMAIL);
    console.log("[contractors/email] admin notification sent");
  } catch (err) {
    console.error("[contractors/email] failed to send admin notification:", (err as Error)?.message ?? err);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
