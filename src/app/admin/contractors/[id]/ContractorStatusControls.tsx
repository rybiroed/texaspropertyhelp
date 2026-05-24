"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type ComplianceState = {
  agreementSigned: boolean;
  insuranceUploaded: boolean;
  yearsInBusiness: boolean;
  hasOnlinePresence: boolean;
};

const ACTIONS = [
  { status: "approved",       label: "Approve",        bg: "#76b900", color: "#000", confirm: false },
  { status: "rejected",       label: "Reject",         bg: "#dc2626", color: "#fff", confirm: true  },
  { status: "suspended",      label: "Suspend",        bg: "#f59e0b", color: "#000", confirm: true  },
  { status: "blocked",        label: "Block",          bg: "#111",    color: "#fff", confirm: true  },
  { status: "pending_review", label: "Reset to Pending", bg: "#e5e7eb", color: "#374151", confirm: false },
] as const;

function getMissingLabels(c: ComplianceState): string[] {
  const missing: string[] = [];
  if (!c.agreementSigned)    missing.push("Agreement not signed");
  if (!c.insuranceUploaded)  missing.push("Insurance not uploaded");
  if (!c.yearsInBusiness)    missing.push("Years in business missing");
  if (!c.hasOnlinePresence)  missing.push("Website or social profile missing");
  return missing;
}

export default function ContractorStatusControls({
  id,
  currentStatus,
  compliance,
}: {
  id: string;
  currentStatus: string;
  compliance: ComplianceState;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reasonFor, setReasonFor] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const missingRequirements = getMissingLabels(compliance);
  const approvalBlocked = missingRequirements.length > 0;

  async function apply(status: string, resolvedReason?: string) {
    setLoading(status);
    setError(null);
    try {
      const res = await fetch(`/api/admin/contractors/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reason: resolvedReason ?? null }),
      });
      const d = await res.json();
      if (res.ok) {
        setReasonFor(null);
        setReason("");
        router.refresh();
      } else {
        setError(d.message ?? d.error ?? "Update failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div>
      {/* Compliance block warning */}
      {approvalBlocked && (
        <div
          style={{
            backgroundColor: "#fff1f2",
            border: "1px solid #fca5a5",
            borderRadius: "6px",
            padding: "12px 14px",
            marginBottom: "14px",
          }}
        >
          <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#991b1b", margin: "0 0 8px 0" }}>
            Contractor cannot be approved until all compliance requirements are completed.
          </p>
          <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.8rem", color: "#b91c1c", lineHeight: 1.7 }}>
            {missingRequirements.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {ACTIONS.map((a) => {
          const isCurrent   = currentStatus === a.status;
          const isLoading   = loading === a.status;
          const isApprove   = a.status === "approved";
          const isDisabled  = isCurrent || !!loading || (isApprove && approvalBlocked);

          return (
            <div key={a.status} style={{ position: "relative" }}>
              <button
                disabled={isDisabled}
                onClick={() => {
                  if (a.confirm) {
                    setReasonFor(a.status);
                    setReason("");
                  } else {
                    apply(a.status);
                  }
                }}
                title={isApprove && approvalBlocked ? "Compliance requirements incomplete" : undefined}
                style={{
                  padding: "7px 14px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: isDisabled ? "#e5e7eb" : a.bg,
                  color: isDisabled ? "#9ca3af" : a.color,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  opacity: isApprove && approvalBlocked ? 0.5 : isCurrent ? 0.6 : 1,
                }}
              >
                {isLoading ? "Saving…" : isCurrent ? `✓ ${a.label}` : a.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* Reason prompt for destructive actions */}
      {reasonFor && (
        <div style={{ marginTop: "12px", padding: "14px", backgroundColor: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "6px" }}>
          <p style={{ fontSize: "0.83rem", fontWeight: 600, color: "#92400e", marginBottom: "8px", marginTop: 0 }}>
            Reason for {ACTIONS.find((a) => a.status === reasonFor)?.label.toLowerCase()} (optional):
          </p>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason…"
            style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: "4px", fontSize: "0.83rem", resize: "vertical", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <button
              onClick={() => apply(reasonFor, reason.trim() || undefined)}
              disabled={!!loading}
              style={{ padding: "6px 14px", backgroundColor: "#111", color: "#fff", fontWeight: 700, fontSize: "0.8rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Confirm
            </button>
            <button
              onClick={() => { setReasonFor(null); setReason(""); }}
              style={{ padding: "6px 14px", backgroundColor: "#e5e7eb", color: "#374151", fontWeight: 600, fontSize: "0.8rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p style={{ fontSize: "0.8rem", color: "#dc2626", marginTop: "8px", marginBottom: 0 }}>{error}</p>
      )}
    </div>
  );
}
