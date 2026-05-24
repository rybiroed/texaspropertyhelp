import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";
import ContractorDocumentUpload from "@/components/contractor/ContractorDocumentUpload";
import type { ContractorDocSummary } from "@/components/contractor/ContractorDocumentUpload";
import LeadResponsePanel from "@/components/contractor/LeadResponsePanel";
import type { LeadAssignment } from "@/components/contractor/LeadResponsePanel";

export const dynamic = "force-dynamic";

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

export default async function ContractorDashboardPage() {
  const cookieStore = await cookies();
  const contractorId = cookieStore.get("contractor_session")?.value;

  if (!contractorId) {
    redirect("/contractor/login");
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return (
      <div style={{ padding: "24px", fontSize: "0.875rem", color: "#dc2626" }}>
        Service temporarily unavailable.
      </div>
    );
  }

  // Fetch contractor, documents, and assignments in parallel
  const [contractorRes, docsRes, assignmentsRes] = await Promise.all([
    supabase
      .from("contractors")
      .select(
        "id, company_name, contact_name, email, phone, trade, zip_code, service_radius_miles, status, agreement_signed, years_in_business, website, social_profile",
      )
      .eq("id", contractorId)
      .single(),

    supabase
      .from("contractor_documents")
      .select("id, document_type, verification_status, original_filename, expires_at, rejection_reason")
      .eq("contractor_id", contractorId)
      .order("created_at", { ascending: false }),

    supabase
      .from("lead_assignments")
      .select(
        `id, status, sent_at, responded_at,
         lead:leads(full_name, city, zip_code, help_needed, urgency, description, email, phone)`,
      )
      .eq("contractor_id", contractorId)
      .order("sent_at", { ascending: false }),
  ]);

  if (contractorRes.error || !contractorRes.data) {
    redirect("/contractor/login");
  }

  const contractor = contractorRes.data;
  const rawDocs    = (docsRes.data ?? []) as ContractorDocSummary[];
  const rawAssignments = (assignmentsRes.data ?? []) as unknown as Array<{
    id: string;
    status: string;
    sent_at: string;
    responded_at: string | null;
    lead: {
      full_name: string;
      city: string;
      zip_code: string;
      help_needed: string[];
      urgency: string;
      description: string | null;
      email: string | null;
      phone: string | null;
    } | null;
  }>;

  // Gate contact details: only expose email/phone for accepted assignments
  const assignments: LeadAssignment[] = rawAssignments
    .filter((a) => a.lead !== null)
    .map((a) => ({
      id:           a.id,
      status:       a.status,
      sent_at:      a.sent_at,
      responded_at: a.responded_at,
      lead: {
        full_name:   a.lead!.full_name,
        city:        a.lead!.city,
        zip_code:    a.lead!.zip_code,
        help_needed: a.lead!.help_needed ?? [],
        urgency:     a.lead!.urgency,
        description: a.lead!.description,
        email:       a.status === "accepted" ? a.lead!.email : null,
        phone:       a.status === "accepted" ? a.lead!.phone : null,
      },
    }));

  const st = STATUS_STYLE[contractor.status] ?? STATUS_STYLE.pending_review;
  const statusLabel = STATUS_LABELS[contractor.status] ?? contractor.status;

  const isApproved = contractor.status === "approved";

  // Compliance summary
  const hasVerifiedInsurance = rawDocs.some(
    (d) => d.document_type === "insurance" &&
           d.verification_status === "verified" &&
           (!d.expires_at || new Date(d.expires_at) >= new Date()),
  );
  const hasVerifiedId = rawDocs.some(
    (d) => d.document_type === "id" && d.verification_status === "verified",
  );
  const hasAgreement   = contractor.agreement_signed;
  const hasYears       = (contractor.years_in_business ?? 0) > 0;
  const hasOnlinePresence = !!(contractor.website || contractor.social_profile);

  const complianceItems = [
    { label: "Agreement signed",          done: hasAgreement },
    { label: "Years in business provided", done: hasYears },
    { label: "Online presence (website / social)", done: hasOnlinePresence },
    { label: "Insurance verified",         done: hasVerifiedInsurance },
    { label: "Government ID verified",     done: hasVerifiedId },
  ];
  const complianceComplete = complianceItems.every((c) => c.done);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Account header */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "20px 24px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 4px", fontSize: "1.25rem", fontWeight: 700, color: "#111" }}>
            {contractor.company_name}
          </h1>
          {contractor.contact_name && (
            <p style={{ margin: "0 0 2px", fontSize: "0.875rem", color: "#6b7280" }}>
              {contractor.contact_name}
            </p>
          )}
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#9ca3af" }}>
            {contractor.trade} · {contractor.zip_code}
          </p>
        </div>
        <span
          style={{
            backgroundColor: st.bg,
            color: st.color,
            padding: "4px 12px",
            borderRadius: "20px",
            fontWeight: 700,
            fontSize: "0.8rem",
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Compliance card */}
      {!isApproved && (
        <div
          style={{
            backgroundColor: "#fff",
            border: `1px solid ${complianceComplete ? "#86efac" : "#e5e7eb"}`,
            borderRadius: "8px",
            padding: "20px 24px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: "0 0 14px", fontSize: "1rem", fontWeight: 700, color: "#111" }}>
            Compliance Checklist
          </h2>
          <p style={{ margin: "0 0 16px", fontSize: "0.85rem", color: "#6b7280" }}>
            Your account will be reviewed for approval once all items below are complete.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {complianceItems.map(({ label, done }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem" }}
              >
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: done ? "#76b900" : "#e5e7eb",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    color: done ? "#000" : "#9ca3af",
                  }}
                >
                  {done ? "✓" : ""}
                </span>
                <span style={{ color: done ? "#111" : "#6b7280" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "20px 24px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 700, color: "#111" }}>
          Documents
        </h2>
        <p style={{ margin: "0 0 16px", fontSize: "0.85rem", color: "#6b7280" }}>
          Upload your insurance certificate and ID for verification. All files are stored securely.
        </p>
        <ContractorDocumentUpload docs={rawDocs} />
      </div>

      {/* Lead assignments */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "20px 24px",
        }}
      >
        <h2 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 700, color: "#111" }}>
          Lead Assignments
        </h2>
        {!isApproved && (
          <p style={{ margin: "0 0 16px", fontSize: "0.85rem", color: "#6b7280" }}>
            Lead assignments are sent once your account is approved and fully compliant.
          </p>
        )}
        <LeadResponsePanel assignments={assignments} />
      </div>
    </div>
  );
}
