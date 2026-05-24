import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Contractor = {
  id: string;
  created_at: string;
  company_name: string;
  trade: string;
  zip_code: string | null;
  service_radius_miles: number;
  status: string;
  agreement_signed: boolean;
  insurance_uploaded: boolean;
  years_in_business: number | null;
  email: string | null;
  phone: string;
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending_review: { bg: "#fef3c7", color: "#92400e" },
  approved:       { bg: "#d1fae5", color: "#065f46" },
  rejected:       { bg: "#fee2e2", color: "#991b1b" },
  suspended:      { bg: "#ffedd5", color: "#9a3412" },
  blocked:        { bg: "#f3f4f6", color: "#374151" },
};

const STATUS_LABELS: Record<string, string> = {
  pending_review: "Pending Review",
  approved:       "Approved",
  rejected:       "Rejected",
  suspended:      "Suspended",
  blocked:        "Blocked",
};

const ALL_STATUSES = ["pending_review", "approved", "suspended", "blocked", "rejected"];

export default async function ContractorsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus } = await searchParams;
  const supabase = getSupabaseClient();

  if (!supabase) {
    return <div style={{ color: "#c53030" }}>Supabase not configured.</div>;
  }

  let query = supabase
    .from("contractors")
    .select("id, created_at, company_name, trade, zip_code, service_radius_miles, status, agreement_signed, insurance_uploaded, years_in_business, email, phone")
    .order("created_at", { ascending: false })
    .limit(200);

  if (filterStatus && ALL_STATUSES.includes(filterStatus)) {
    query = query.eq("status", filterStatus);
  }

  const { data: contractors } = await query;
  const rows = (contractors ?? []) as Contractor[];

  return (
    <div style={{ maxWidth: "1100px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111", margin: 0 }}>
          Contractors
          <span style={{ marginLeft: "10px", fontSize: "0.85rem", fontWeight: 400, color: "#6b7280" }}>
            ({rows.length}{filterStatus ? ` · ${STATUS_LABELS[filterStatus] ?? filterStatus}` : ""})
          </span>
        </h1>
      </div>

      {/* Status filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        <Link
          href="/admin/contractors"
          style={{
            padding: "5px 12px",
            borderRadius: "4px",
            fontSize: "0.8rem",
            fontWeight: 600,
            textDecoration: "none",
            backgroundColor: !filterStatus ? "#111" : "#f3f4f6",
            color: !filterStatus ? "#fff" : "#374151",
          }}
        >
          All
        </Link>
        {ALL_STATUSES.map((s) => {
          const st = STATUS_STYLE[s] ?? { bg: "#f3f4f6", color: "#374151" };
          const active = filterStatus === s;
          return (
            <Link
              key={s}
              href={`/admin/contractors?status=${s}`}
              style={{
                padding: "5px 12px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
                backgroundColor: active ? "#111" : st.bg,
                color: active ? "#fff" : st.color,
              }}
            >
              {STATUS_LABELS[s]}
            </Link>
          );
        })}
      </div>

      {/* Table */}
      {rows.length === 0 ? (
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>No contractors found.</p>
      ) : (
        <div style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
                {["Company", "Trade", "ZIP / Radius", "Status", "Agreement", "Insurance", "Yrs", "Created"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#6b7280", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => {
                const st = STATUS_STYLE[c.status] ?? { bg: "#f3f4f6", color: "#374151" };
                return (
                  <tr
                    key={c.id}
                    style={{ borderBottom: i < rows.length - 1 ? "1px solid #f3f4f6" : "none" }}
                  >
                    <td style={{ padding: "11px 14px" }}>
                      <Link
                        href={`/admin/contractors/${c.id}`}
                        style={{ fontWeight: 700, color: "#111", textDecoration: "none" }}
                      >
                        {c.company_name}
                      </Link>
                      {c.email && (
                        <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "2px" }}>{c.email}</div>
                      )}
                    </td>
                    <td style={{ padding: "11px 14px", color: "#374151", whiteSpace: "nowrap" }}>
                      {c.trade}
                    </td>
                    <td style={{ padding: "11px 14px", color: "#6b7280", whiteSpace: "nowrap" }}>
                      {c.zip_code ?? "—"} · {c.service_radius_miles} mi
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <span style={{ backgroundColor: st.bg, color: st.color, padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                        {STATUS_LABELS[c.status] ?? c.status}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center" }}>
                      <span style={{ color: c.agreement_signed ? "#065f46" : "#9ca3af", fontWeight: 700, fontSize: "0.85rem" }}>
                        {c.agreement_signed ? "✓" : "—"}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center" }}>
                      <span style={{ color: c.insurance_uploaded ? "#065f46" : "#9ca3af", fontWeight: 700, fontSize: "0.85rem" }}>
                        {c.insurance_uploaded ? "✓" : "—"}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px", color: "#374151", textAlign: "center" }}>
                      {c.years_in_business ?? "—"}
                    </td>
                    <td style={{ padding: "11px 14px", color: "#6b7280", whiteSpace: "nowrap" }}>
                      {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
