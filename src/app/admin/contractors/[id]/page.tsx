import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase";
import ContractorStatusControls from "./ContractorStatusControls";

export const dynamic = "force-dynamic";

type Contractor = {
  id: string;
  created_at: string;
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
  website: string | null;
  years_in_business: number | null;
  status: string;
  approved_at: string | null;
  approved_by: string | null;
  rejected_at: string | null;
  rejected_reason: string | null;
  suspended_at: string | null;
  suspended_reason: string | null;
  blocked_at: string | null;
  blocked_reason: string | null;
  agreement_signed: boolean;
  agreement_signed_at: string | null;
  agreement_version: string | null;
  insurance_uploaded: boolean;
  insurance_expires_at: string | null;
};

type Assignment = {
  id: string;
  created_at: string;
  status: string;
  lead: { id: string; full_name: string; city: string; urgency: string } | null;
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

function BoolBadge({ value, trueLabel, falseLabel }: { value: boolean; trueLabel: string; falseLabel: string }) {
  return (
    <span style={{
      backgroundColor: value ? "#d1fae5" : "#f3f4f6",
      color: value ? "#065f46" : "#9ca3af",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "0.75rem",
      fontWeight: 700,
    }}>
      {value ? trueLabel : falseLabel}
    </span>
  );
}

export default async function ContractorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getSupabaseClient();

  if (!supabase) {
    return <div style={{ color: "#c53030" }}>Supabase not configured.</div>;
  }

  const [{ data: contractor, error }, { data: assignments }] = await Promise.all([
    supabase.from("contractors").select("*").eq("id", id).single(),
    supabase
      .from("lead_assignments")
      .select("id, created_at, status, lead:leads(id, full_name, city, urgency)")
      .eq("contractor_id", id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  if (error || !contractor) notFound();

  const c = contractor as Contractor;
  const typedAssignments = (assignments ?? []) as unknown as Assignment[];
  const stStyle = STATUS_STYLE[c.status] ?? { bg: "#f3f4f6", color: "#374151" };

  const reasonForStatus =
    c.status === "rejected"  ? c.rejected_reason :
    c.status === "suspended" ? c.suspended_reason :
    c.status === "blocked"   ? c.blocked_reason : null;

  return (
    <div style={{ maxWidth: "960px" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        <Link href="/admin/contractors" style={{ color: "#6b7280", fontSize: "0.8rem", textDecoration: "none" }}>
          ← Contractors
        </Link>
        <span style={{ color: "#d1d5db" }}>/</span>
        <span style={{ color: "#374151", fontSize: "0.8rem" }}>{c.company_name}</span>
        <span style={{ marginLeft: "8px", backgroundColor: stStyle.bg, color: stStyle.color, padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700 }}>
          {STATUS_LABELS[c.status] ?? c.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left: 2 columns */}
        <div style={{ gridColumn: "span 2" }} className="lg:col-span-2 space-y-4">

          <Card>
            <SectionTitle>Status</SectionTitle>
            <ContractorStatusControls id={c.id} currentStatus={c.status} />
            {reasonForStatus && (
              <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "10px", marginBottom: 0 }}>
                <strong>Reason:</strong> {reasonForStatus}
              </p>
            )}
          </Card>

          <Card>
            <SectionTitle>Profile</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8">
              <Field label="Company"      value={c.company_name} />
              <Field label="Contact"      value={c.contact_name} />
              <Field label="Phone"        value={<a href={`tel:${c.phone}`} style={{ color: "#76b900" }}>{c.phone}</a>} />
              <Field label="Email"        value={c.email ? <a href={`mailto:${c.email}`} style={{ color: "#76b900" }}>{c.email}</a> : null} />
              <Field label="Trade"        value={c.trade} />
              <Field label="ZIP / Radius" value={`${c.zip_code ?? "—"} · ${c.service_radius_miles} mi`} />
              <Field label="Service Area" value={(c.service_area ?? []).join(", ")} />
              <Field label="Languages"    value={(c.languages ?? []).join(", ")} />
              <Field label="Website"      value={c.website ? <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ color: "#76b900" }}>{c.website}</a> : null} />
              <Field label="Years in Business" value={c.years_in_business != null ? String(c.years_in_business) : null} />
              <Field label="Emergency"    value={c.emergency_available ? "Available" : "No"} />
            </div>
            {c.notes && (
              <Field label="Notes" value={c.notes} />
            )}
          </Card>

          <Card>
            <SectionTitle>Compliance</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8">
              <Field
                label="Agreement Signed"
                value={<BoolBadge value={c.agreement_signed} trueLabel="Signed" falseLabel="Not signed" />}
              />
              <Field label="Agreement Version" value={c.agreement_version} />
              <Field
                label="Agreement Date"
                value={c.agreement_signed_at
                  ? new Date(c.agreement_signed_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                  : null}
              />
              <div />
              <Field
                label="Insurance Uploaded"
                value={<BoolBadge value={c.insurance_uploaded} trueLabel="Uploaded" falseLabel="Not uploaded" />}
              />
              <Field
                label="Insurance Expires"
                value={c.insurance_expires_at
                  ? new Date(c.insurance_expires_at).toLocaleDateString("en-US", { dateStyle: "medium" })
                  : null}
              />
            </div>
          </Card>

          <Card>
            <SectionTitle>Admin History</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8">
              <Field
                label="Created"
                value={new Date(c.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
              />
              <Field
                label="Approved At"
                value={c.approved_at
                  ? `${new Date(c.approved_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}${c.approved_by ? ` by ${c.approved_by}` : ""}`
                  : null}
              />
              <Field
                label="Rejected At"
                value={c.rejected_at
                  ? new Date(c.rejected_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                  : null}
              />
              <Field label="Rejected Reason" value={c.rejected_reason} />
              <Field
                label="Suspended At"
                value={c.suspended_at
                  ? new Date(c.suspended_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                  : null}
              />
              <Field label="Suspended Reason" value={c.suspended_reason} />
              <Field
                label="Blocked At"
                value={c.blocked_at
                  ? new Date(c.blocked_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                  : null}
              />
              <Field label="Blocked Reason" value={c.blocked_reason} />
            </div>
          </Card>
        </div>

        {/* Right: dispatch summary */}
        <div>
          <Card>
            <SectionTitle>
              Leads Received ({typedAssignments.length})
            </SectionTitle>
            {typedAssignments.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>No leads dispatched yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {typedAssignments.map((a) => {
                  const lead = a.lead;
                  return (
                    <div key={a.id} style={{ padding: "10px 12px", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
                      {lead ? (
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          style={{ fontWeight: 700, fontSize: "0.83rem", color: "#111", textDecoration: "none" }}
                        >
                          {lead.full_name}
                        </Link>
                      ) : (
                        <span style={{ fontWeight: 700, fontSize: "0.83rem", color: "#6b7280" }}>Unknown Lead</span>
                      )}
                      {lead && (
                        <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "2px" }}>
                          {lead.city} · {lead.urgency}
                        </div>
                      )}
                      <div style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "4px" }}>
                        {new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        {" · "}
                        <span style={{ textTransform: "capitalize" }}>{a.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
