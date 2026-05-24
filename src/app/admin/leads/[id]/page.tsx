import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase";
import LeadStatusControls from "./LeadStatusControls";
import ContractorPanel from "./ContractorPanel";
import type { ScoredContractor, MatchLabel } from "./ContractorPanel";

export const dynamic = "force-dynamic";

// ─── Mappings ─────────────────────────────────────────────────────────────────

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

type RawContractor = {
  id: string;
  company_name: string;
  contact_name: string | null;
  phone: string;
  email: string | null;
  trade: string;
  zip_code: string | null;
  service_radius_miles: number;
  service_area: string[];
  emergency_available: boolean;
  status: string;
};

type Assignment = {
  id: string;
  created_at: string;
  contractor_id: string;
  status: string;
  notes: string | null;
  contractor: { company_name: string; phone: string; email: string | null } | null;
};

// ─── Scoring & matching ───────────────────────────────────────────────────────

function scoreContractors(lead: Lead, contractors: RawContractor[]): ScoredContractor[] {
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
        (area) => area.toLowerCase() === (lead.city ?? "").toLowerCase(),
      );

      let score = 0;
      if (zipMatch)               score += 4;
      if (cityMatch)              score += 2;
      if (c.emergency_available)  score += 1;

      let matchLabel: MatchLabel = null;
      if (zipMatch)              matchLabel = "Best Match";
      else if (cityMatch)        matchLabel = "Area Match";
      else if (c.emergency_available) matchLabel = "Emergency Ready";

      return {
        id:                   c.id,
        company_name:         c.company_name,
        contact_name:         c.contact_name,
        phone:                c.phone,
        email:                c.email,
        trade:                c.trade,
        zip_code:             c.zip_code,
        service_radius_miles: c.service_radius_miles,
        service_area:         c.service_area,
        emergency_available:  c.emergency_available,
        score,
        matchLabel,
      } satisfies ScoredContractor;
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.service_radius_miles - b.service_radius_miles;
    });
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "12px" }}>
      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>
        {label}
      </span>
      <span style={{ fontSize: "0.875rem", color: "#111827" }}>{value || "—"}</span>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "20px 24px", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#76b900", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px", marginTop: 0 }}>
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

const ASSIGNMENT_STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  sent:     { bg: "#dbeafe", color: "#1d4ed8" },
  accepted: { bg: "#d1fae5", color: "#065f46" },
  declined: { bg: "#fee2e2", color: "#991b1b" },
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

  const [
    { data: lead, error: leadError },
    { data: contractors },
    { data: assignments },
  ] = await Promise.all([
    supabase.from("leads").select("*").eq("id", id).single(),
    supabase
      .from("contractors")
      .select("id, company_name, contact_name, phone, email, trade, zip_code, service_radius_miles, service_area, emergency_available, status")
      .eq("status", "approved")
      .order("company_name"),
    supabase
      .from("lead_assignments")
      .select("id, created_at, contractor_id, status, notes, contractor:contractors(company_name, phone, email)")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (leadError || !lead) notFound();

  const typedLead = lead as Lead;
  const scored = scoreContractors(typedLead, (contractors ?? []) as RawContractor[]);
  const typedAssignments = (assignments ?? []) as unknown as Assignment[];
  const sentContractorIds = typedAssignments.map((a) => a.contractor_id);

  const urgStyle = URGENCY_STYLE[typedLead.urgency] ?? { bg: "#f3f4f6", color: "#374151" };
  const stStyle  = STATUS_STYLE[typedLead.status]  ?? { bg: "#f3f4f6", color: "#374151" };

  return (
    <div style={{ maxWidth: "960px" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <Link href="/admin/leads" style={{ color: "#6b7280", fontSize: "0.8rem", textDecoration: "none" }}>
          ← Leads
        </Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <span style={{ color: "#374151", fontSize: "0.8rem" }}>{typedLead.full_name}</span>
        <span style={{ marginLeft: "8px", backgroundColor: stStyle.bg, color: stStyle.color, padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>
          {typedLead.status}
        </span>
        <span style={{ backgroundColor: urgStyle.bg, color: urgStyle.color, padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>
          {typedLead.urgency}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left column */}
        <div style={{ gridColumn: "span 2" }} className="lg:col-span-2 space-y-4">

          <Card>
            <SectionTitle>Status</SectionTitle>
            <LeadStatusControls id={typedLead.id} currentStatus={typedLead.status} />
          </Card>

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

          <Card>
            <SectionTitle>Request</SectionTitle>
            <Field
              label="Issues"
              value={(typedLead.issue_types ?? []).map((t) => ISSUE_LABELS[t] ?? t).join(", ")}
            />
            <Field label="Property Type"    value={typedLead.property_type} />
            <Field label="Insurance Claim"  value={typedLead.insurance_claim_opened ? "Yes" : "No"} />
            <Field label="Notes"            value={typedLead.notes} />
          </Card>

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
              value={new Date(typedLead.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
            />
          </Card>
        </div>

        {/* Right column */}
        <div>
          <Card>
            <SectionTitle>
              Suggested Contractors ({scored.length})
            </SectionTitle>
            <ContractorPanel
              leadId={typedLead.id}
              contractors={scored}
              initialSentIds={sentContractorIds}
            />
          </Card>
        </div>
      </div>

      {/* Assignment History — full width below the grid */}
      <div style={{ marginTop: "16px" }}>
        <Card>
          <SectionTitle>
            Assignment History ({typedAssignments.length})
          </SectionTitle>

          {typedAssignments.length === 0 ? (
            <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>
              No leads have been sent yet.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                    {["Contractor", "Phone", "Sent At", "Status", "Notes"].map((h) => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#6b7280", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {typedAssignments.map((a, i) => {
                    const aStyle = ASSIGNMENT_STATUS_STYLE[a.status] ?? { bg: "#f3f4f6", color: "#374151" };
                    const contractorName = a.contractor?.company_name ?? "Unknown";
                    const contractorPhone = a.contractor?.phone ?? "—";

                    return (
                      <tr key={a.id} style={{ borderBottom: i < typedAssignments.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                        <td style={{ padding: "10px 12px", fontWeight: 600, color: "#111" }}>
                          {contractorName}
                        </td>
                        <td style={{ padding: "10px 12px", color: "#374151" }}>
                          {contractorPhone !== "—"
                            ? <a href={`tel:${contractorPhone}`} style={{ color: "#76b900" }}>{contractorPhone}</a>
                            : "—"}
                        </td>
                        <td style={{ padding: "10px 12px", color: "#6b7280", whiteSpace: "nowrap" }}>
                          {new Date(a.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ backgroundColor: aStyle.bg, color: aStyle.color, padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>
                            {a.status}
                          </span>
                        </td>
                        <td style={{ padding: "10px 12px", color: "#6b7280" }}>
                          {a.notes ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
