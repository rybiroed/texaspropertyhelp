import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase";
import LeadStatusControls from "./LeadStatusControls";

export const dynamic = "force-dynamic";

// ─── Issue type → contractor trade mapping ────────────────────────────────────

const ISSUE_TO_TRADES: Record<string, string[]> = {
  "storm-damage":             ["Storm Damage / Restoration", "Roofing", "General Contractor"],
  "roof-inspection":          ["Roofing"],
  "roof-repair":              ["Roofing"],
  "roof-replacement":         ["Roofing"],
  "hvac-repair":              ["HVAC"],
  "hvac-replacement":         ["HVAC"],
  "insurance-claim-guidance": ["Insurance Claim Specialist"],
  "repair-financing":         [],
  "emergency-repair":         ["General Contractor"],
  "general-repair":           ["General Contractor"],
  "other":                    ["General Contractor", "Other"],
};

const ISSUE_LABELS: Record<string, string> = {
  "storm-damage":             "Storm Damage",
  "roof-inspection":          "Roof Inspection",
  "roof-repair":              "Roof Repair",
  "roof-replacement":         "Roof Replacement",
  "hvac-repair":              "HVAC Repair",
  "hvac-replacement":         "HVAC Replacement",
  "insurance-claim-guidance": "Insurance Claim",
  "repair-financing":         "Financing",
  "emergency-repair":         "Emergency Repair",
  "general-repair":           "General Repair",
  "other":                    "Other",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Lead = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  zip_code: string;
  language: string;
  property_type: string;
  issue_types: string[];
  insurance_claim_opened: boolean;
  urgency: string;
  notes: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string | null;
  status: string;
};

type Contractor = {
  id: string;
  company_name: string;
  contact_name: string | null;
  phone: string;
  email: string | null;
  trade: string;
  zip_code: string | null;
  service_radius_miles: number;
  service_area: string[];
  languages: string[];
  emergency_available: boolean;
  notes: string | null;
  status: string;
};

// ─── Matching ─────────────────────────────────────────────────────────────────

function matchContractors(
  lead: Lead,
  contractors: Contractor[],
): Array<Contractor & { locationMatch: boolean }> {
  const relevantTrades = new Set<string>();
  for (const issue of lead.issue_types ?? []) {
    for (const trade of ISSUE_TO_TRADES[issue] ?? []) {
      relevantTrades.add(trade);
    }
  }

  if (relevantTrades.size === 0) return [];

  return contractors
    .filter((c) => relevantTrades.has(c.trade))
    .map((c) => {
      const zipMatch = !!(lead.zip_code && c.zip_code && lead.zip_code === c.zip_code);
      const cityMatch = (c.service_area ?? []).some(
        (area) => area.toLowerCase() === lead.city?.toLowerCase(),
      );
      return { ...c, locationMatch: zipMatch || cityMatch };
    })
    .sort((a, b) => Number(b.locationMatch) - Number(a.locationMatch));
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "0", flexDirection: "column", marginBottom: "12px" }}>
      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>
        {label}
      </span>
      <span style={{ fontSize: "0.875rem", color: "#111827" }}>{value || "—"}</span>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "20px 24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "0.75rem",
        fontWeight: 700,
        color: "#76b900",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: "16px",
        marginTop: 0,
      }}
    >
      {children}
    </h2>
  );
}

const URGENCY_STYLE: Record<string, { bg: string; color: string }> = {
  emergency: { bg: "#fee2e2", color: "#991b1b" },
  urgent:    { bg: "#ffedd5", color: "#9a3412" },
  soon:      { bg: "#d1fae5", color: "#065f46" },
  planning:  { bg: "#dbeafe", color: "#1d4ed8" },
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  new:       { bg: "#dbeafe", color: "#1d4ed8" },
  reviewing: { bg: "#fef3c7", color: "#92400e" },
  matched:   { bg: "#d1fae5", color: "#065f46" },
  closed:    { bg: "#f3f4f6", color: "#374151" },
  spam:      { bg: "#fee2e2", color: "#991b1b" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getSupabaseClient();

  if (!supabase) {
    return <div style={{ color: "#c53030" }}>Supabase not configured.</div>;
  }

  const [{ data: lead, error: leadError }, { data: contractors }] = await Promise.all([
    supabase.from("leads").select("*").eq("id", id).single(),
    supabase
      .from("contractors")
      .select("id, company_name, contact_name, phone, email, trade, zip_code, service_radius_miles, service_area, languages, emergency_available, notes, status")
      .in("status", ["pending", "approved"])
      .order("company_name"),
  ]);

  if (leadError || !lead) notFound();

  const typedLead = lead as Lead;
  const matched = matchContractors(typedLead, (contractors ?? []) as Contractor[]);

  const urgStyle = URGENCY_STYLE[typedLead.urgency] ?? { bg: "#f3f4f6", color: "#374151" };
  const stStyle  = STATUS_STYLE[typedLead.status]  ?? { bg: "#f3f4f6", color: "#374151" };

  return (
    <div style={{ maxWidth: "960px" }}>

      {/* Breadcrumb + meta */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <Link href="/admin/leads" style={{ color: "#6b7280", fontSize: "0.8rem", textDecoration: "none" }}>
          ← Leads
        </Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <span style={{ color: "#374151", fontSize: "0.8rem" }}>{typedLead.full_name}</span>
        <span
          style={{
            marginLeft: "8px",
            backgroundColor: stStyle.bg,
            color: stStyle.color,
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          {typedLead.status}
        </span>
        <span
          style={{
            backgroundColor: urgStyle.bg,
            color: urgStyle.color,
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          {typedLead.urgency}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left: lead details */}
        <div style={{ gridColumn: "span 2" }} className="lg:col-span-2 space-y-4">

          {/* Status controls */}
          <Card>
            <SectionTitle>Status</SectionTitle>
            <LeadStatusControls id={typedLead.id} currentStatus={typedLead.status} />
          </Card>

          {/* Contact */}
          <Card>
            <SectionTitle>Contact</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8">
              <Field label="Name"     value={typedLead.full_name} />
              <Field label="Phone"    value={<a href={`tel:${typedLead.phone}`} style={{ color: "#76b900" }}>{typedLead.phone}</a>} />
              <Field label="Email"    value={<a href={`mailto:${typedLead.email}`} style={{ color: "#76b900" }}>{typedLead.email}</a>} />
              <Field label="Language" value={typedLead.language === "es" ? "Spanish / Español" : "English"} />
              <Field label="City"     value={typedLead.city} />
              <Field label="ZIP"      value={typedLead.zip_code} />
            </div>
          </Card>

          {/* Request */}
          <Card>
            <SectionTitle>Request</SectionTitle>
            <Field
              label="Issues"
              value={(typedLead.issue_types ?? [])
                .map((t) => ISSUE_LABELS[t] ?? t)
                .join(", ")}
            />
            <Field label="Property Type"    value={typedLead.property_type} />
            <Field label="Insurance Claim"  value={typedLead.insurance_claim_opened ? "Yes" : "No"} />
            <Field label="Notes"            value={typedLead.notes} />
          </Card>

          {/* Tracking */}
          <Card>
            <SectionTitle>Tracking</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8">
              <Field label="Source Page"  value={typedLead.source_page} />
              <Field label="UTM Source"   value={typedLead.utm_source} />
              <Field label="UTM Medium"   value={typedLead.utm_medium} />
              <Field label="UTM Campaign" value={typedLead.utm_campaign} />
              <Field label="Referrer"     value={typedLead.referrer} />
              <Field label="Landing Page" value={typedLead.landing_page} />
            </div>
            <Field
              label="Created"
              value={new Date(typedLead.created_at).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            />
          </Card>
        </div>

        {/* Right: matched contractors */}
        <div>
          <Card>
            <SectionTitle>
              Suggested Contractors ({matched.length})
            </SectionTitle>

            {matched.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                No contractors match this lead&apos;s trade types yet.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {matched.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: "14px",
                      border: c.locationMatch
                        ? "1px solid #86efac"
                        : "1px solid #e5e7eb",
                      borderLeft: c.locationMatch ? "3px solid #76b900" : "3px solid #e5e7eb",
                      borderRadius: "6px",
                      backgroundColor: c.locationMatch ? "#f0fdf4" : "#fafafa",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111" }}>
                        {c.company_name}
                      </span>
                      {c.locationMatch && (
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#065f46", backgroundColor: "#d1fae5", padding: "1px 6px", borderRadius: "3px", whiteSpace: "nowrap" }}>
                          Area match
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#6b7280", lineHeight: 1.6 }}>
                      <div>{c.trade}</div>
                      {c.zip_code && (
                        <div>ZIP {c.zip_code} · {c.service_radius_miles} mi radius</div>
                      )}
                      {(c.service_area ?? []).length > 0 && (
                        <div>{c.service_area.join(", ")}</div>
                      )}
                      {c.phone && (
                        <div style={{ marginTop: "6px" }}>
                          <a href={`tel:${c.phone}`} style={{ color: "#76b900", fontWeight: 600, fontSize: "0.8rem" }}>
                            {c.phone}
                          </a>
                        </div>
                      )}
                      {c.emergency_available && (
                        <div style={{ color: "#9a3412", fontWeight: 600, marginTop: "2px", fontSize: "0.75rem" }}>
                          Emergency available
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
