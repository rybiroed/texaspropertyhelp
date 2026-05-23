import { getSupabaseClient } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Leads — TPH Admin" };

type LeadRow = {
  id: string;
  created_at: string;
  full_name: string;
  city: string;
  zip_code: string;
  issue_types: string[];
  urgency: string;
  status: string;
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  new:       { bg: "#dbeafe", color: "#1d4ed8" },
  reviewing: { bg: "#fef3c7", color: "#92400e" },
  matched:   { bg: "#d1fae5", color: "#065f46" },
  closed:    { bg: "#f3f4f6", color: "#374151" },
  spam:      { bg: "#fee2e2", color: "#991b1b" },
};

const URGENCY_STYLE: Record<string, { bg: string; color: string }> = {
  emergency: { bg: "#fee2e2", color: "#991b1b" },
  urgent:    { bg: "#ffedd5", color: "#9a3412" },
  soon:      { bg: "#d1fae5", color: "#065f46" },
  planning:  { bg: "#dbeafe", color: "#1d4ed8" },
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

function badge(text: string, style: { bg: string; color: string }) {
  return { backgroundColor: style.bg, color: style.color };
}

export default async function AdminLeadsPage() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return (
      <div style={{ color: "#c53030", padding: "24px" }}>
        Supabase is not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
      </div>
    );
  }

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, created_at, full_name, city, zip_code, issue_types, urgency, status")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return (
      <div style={{ color: "#c53030", padding: "24px" }}>
        Failed to load leads: {error.message}
      </div>
    );
  }

  const rows = (leads ?? []) as LeadRow[];

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111", margin: 0 }}>
          Leads
        </h1>
        <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
          {rows.length} shown (newest first)
        </span>
      </div>

      {rows.length === 0 ? (
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>No leads yet.</p>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: "white" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                {["Date", "Name", "City / ZIP", "Issues", "Urgency", "Status", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#374151",
                      whiteSpace: "nowrap",
                      fontSize: "0.8rem",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((lead, i) => {
                const urgStyle = URGENCY_STYLE[lead.urgency] ?? { bg: "#f3f4f6", color: "#374151" };
                const stStyle  = STATUS_STYLE[lead.status]  ?? { bg: "#f3f4f6", color: "#374151" };
                const issueStr = (lead.issue_types ?? [])
                  .map((t) => ISSUE_LABELS[t] ?? t)
                  .join(", ");

                return (
                  <tr
                    key={lead.id}
                    style={{
                      borderBottom: i < rows.length - 1 ? "1px solid #f3f4f6" : "none",
                    }}
                  >
                    <td style={{ padding: "10px 14px", color: "#6b7280", whiteSpace: "nowrap" }}>
                      {new Date(lead.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: "#111" }}>
                      {lead.full_name}
                    </td>
                    <td style={{ padding: "10px 14px", color: "#374151", whiteSpace: "nowrap" }}>
                      {lead.city}{lead.zip_code ? `, ${lead.zip_code}` : ""}
                    </td>
                    <td style={{ padding: "10px 14px", color: "#374151", maxWidth: "220px" }}>
                      {issueStr || "—"}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          ...badge(lead.urgency, urgStyle),
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {lead.urgency}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          ...badge(lead.status, stStyle),
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        style={{
                          color: "#76b900",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
