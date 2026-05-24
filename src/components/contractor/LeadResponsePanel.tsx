"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type LeadAssignment = {
  id: string;
  status: string;
  created_at: string;
  lead: {
    full_name: string;
    city: string;
    zip_code: string;
    property_type: string;
    issue_types: string[];
    urgency: string;
    notes: string | null;
    // Only populated for accepted assignments (gated server-side)
    email: string | null;
    phone: string | null;
  };
};

const URGENCY_LABELS: Record<string, string> = {
  emergency: "Emergency",
  urgent:    "Urgent",
  soon:      "Within 30 days",
  planning:  "Planning ahead",
};

const URGENCY_COLORS: Record<string, { bg: string; color: string }> = {
  emergency: { bg: "#c53030", color: "#fff" },
  urgent:    { bg: "#c05621", color: "#fff" },
  soon:      { bg: "#2d7a4f", color: "#fff" },
  planning:  { bg: "#2b6cb0", color: "#fff" },
};

const ISSUE_LABELS: Record<string, string> = {
  "storm-damage":             "Storm Damage",
  "roof-inspection":          "Roof Inspection",
  "roof-repair":              "Roof Repair",
  "roof-replacement":         "Roof Replacement",
  "hvac-repair":              "HVAC Repair",
  "hvac-replacement":         "HVAC Replacement",
  "insurance-claim-guidance": "Insurance Claim",
  "water-damage":             "Water Damage",
  "structural-assessment":    "Structural Assessment",
  "general-inspection":       "General Inspection",
  "electrical":               "Electrical",
  "plumbing":                 "Plumbing",
  "other":                    "Other",
};

export default function LeadResponsePanel({ assignments }: { assignments: LeadAssignment[] }) {
  const router                    = useRouter();
  const [loading, setLoading]     = useState<string | null>(null);
  const [localStatuses, setLocalStatuses] = useState<Record<string, string>>({});
  const [errors, setErrors]       = useState<Record<string, string>>({});

  async function handleRespond(assignmentId: string, action: "accept" | "decline") {
    setLoading(assignmentId);
    setErrors((prev) => { const n = { ...prev }; delete n[assignmentId]; return n; });

    try {
      const res = await fetch(`/api/contractor/assignments/${assignmentId}/respond`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ action }),
      });

      if (res.ok) {
        const newStatus = action === "accept" ? "accepted" : "declined";
        setLocalStatuses((prev) => ({ ...prev, [assignmentId]: newStatus }));
        router.refresh();
      } else {
        const d = await res.json() as { message?: string };
        setErrors((prev) => ({ ...prev, [assignmentId]: d.message ?? "Request failed." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [assignmentId]: "Network error." }));
    } finally {
      setLoading(null);
    }
  }

  if (assignments.length === 0) {
    return (
      <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>
        No lead assignments yet. Check back after your account is approved.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {assignments.map((a) => {
        const effectiveStatus = localStatuses[a.id] ?? a.status;
        const urgColor = URGENCY_COLORS[a.lead.urgency] ?? URGENCY_COLORS.planning;
        const isLoading = loading === a.id;

        return (
          <div
            key={a.id}
            style={{
              border: `1px solid ${effectiveStatus === "accepted" ? "#86efac" : effectiveStatus === "declined" ? "#e5e7eb" : "#e5e7eb"}`,
              borderLeft: `3px solid ${effectiveStatus === "accepted" ? "#76b900" : effectiveStatus === "declined" ? "#d1d5db" : "#f59e0b"}`,
              borderRadius: "6px",
              backgroundColor: effectiveStatus === "accepted" ? "#f0fdf4" : effectiveStatus === "declined" ? "#fafafa" : "#fff",
              padding: "16px",
              opacity: effectiveStatus === "declined" ? 0.65 : 1,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#111" }}>
                  {a.lead.city}, TX {a.lead.zip_code}
                </span>
                <span
                  style={{
                    marginLeft: "10px",
                    backgroundColor: urgColor.bg,
                    color: urgColor.color,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {URGENCY_LABELS[a.lead.urgency] ?? a.lead.urgency}
                </span>
              </div>

              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "4px",
                  backgroundColor:
                    effectiveStatus === "accepted" ? "#d1fae5" :
                    effectiveStatus === "declined" ? "#f3f4f6" :
                    "#fef3c7",
                  color:
                    effectiveStatus === "accepted" ? "#065f46" :
                    effectiveStatus === "declined" ? "#374151" :
                    "#92400e",
                }}
              >
                {effectiveStatus === "accepted" ? "Accepted" :
                 effectiveStatus === "declined" ? "Declined" :
                 effectiveStatus === "sent"     ? "Action Required" :
                 "Pending"}
              </span>
            </div>

            {/* Services requested */}
            <div style={{ marginBottom: "10px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {(a.lead.issue_types ?? []).map((h) => (
                <span
                  key={h}
                  style={{
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {ISSUE_LABELS[h] ?? h}
                </span>
              ))}
              {a.lead.property_type && (
                <span style={{ backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 500 }}>
                  {a.lead.property_type}
                </span>
              )}
            </div>

            {/* Notes */}
            {a.lead.notes && (
              <p style={{ fontSize: "0.85rem", color: "#374151", margin: "0 0 10px", lineHeight: 1.5 }}>
                {a.lead.notes}
              </p>
            )}

            {/* Contact details — only shown after accept */}
            {effectiveStatus === "accepted" && (a.lead.email || a.lead.phone) && (
              <div
                style={{
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  borderRadius: "6px",
                  padding: "12px 14px",
                  marginBottom: "12px",
                  fontSize: "0.875rem",
                }}
              >
                <p style={{ margin: "0 0 2px", fontWeight: 700, color: "#065f46", fontSize: "0.8rem" }}>
                  Customer Contact
                </p>
                <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#111" }}>{a.lead.full_name}</p>
                {a.lead.phone && (
                  <p style={{ margin: "0 0 2px", color: "#374151" }}>
                    <a href={`tel:${a.lead.phone}`} style={{ color: "#076332", textDecoration: "none" }}>
                      {a.lead.phone}
                    </a>
                  </p>
                )}
                {a.lead.email && (
                  <p style={{ margin: 0, color: "#374151" }}>
                    <a href={`mailto:${a.lead.email}`} style={{ color: "#076332", textDecoration: "none" }}>
                      {a.lead.email}
                    </a>
                  </p>
                )}
              </div>
            )}

            {/* Action buttons */}
            {effectiveStatus === "sent" && (
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleRespond(a.id, "accept")}
                  disabled={isLoading}
                  style={{
                    padding: "8px 18px",
                    backgroundColor: "#76b900",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    border: "none",
                    borderRadius: "5px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {isLoading ? "…" : "Accept"}
                </button>
                <button
                  onClick={() => handleRespond(a.id, "decline")}
                  disabled={isLoading}
                  style={{
                    padding: "8px 18px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "5px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  Decline
                </button>
              </div>
            )}

            {errors[a.id] && (
              <p style={{ fontSize: "0.8rem", color: "#dc2626", margin: "8px 0 0" }}>
                {errors[a.id]}
              </p>
            )}

            <p style={{ fontSize: "0.72rem", color: "#9ca3af", margin: "8px 0 0" }}>
              Sent: {new Date(a.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
        );
      })}
    </div>
  );
}
