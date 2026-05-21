import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

function clamp(raw: unknown, maxLen: number): string | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed.slice(0, maxLen) : null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const companyName = clamp(raw.company_name, 200);
  const phone = clamp(raw.phone, 50);
  const trade = clamp(raw.trade, 100);

  if (!companyName) {
    return NextResponse.json({ message: "Company name is required." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ message: "Phone number is required." }, { status: 400 });
  }
  if (!trade) {
    return NextResponse.json({ message: "Trade is required." }, { status: 400 });
  }

  const record = {
    company_name:        companyName,
    contact_name:        clamp(raw.contact_name, 200),
    phone,
    email:               clamp(raw.email, 200),
    trade,
    service_area:        clamp(raw.service_area, 500),
    languages:           clamp(raw.languages, 200),
    emergency_available: raw.emergency_available === true || raw.emergency_available === "true",
    notes:               clamp(raw.notes, 2000),
    status:              "pending",
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("contractors").insert(record);
    if (error) {
      console.error("[contractors] Supabase insert error:", error.message);
      return NextResponse.json(
        { message: "Failed to save your application. Please try again." },
        { status: 500 }
      );
    }
  } else {
    console.log("[contractors] Supabase not configured — contractor data:");
    console.log(JSON.stringify(record, null, 2));
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
