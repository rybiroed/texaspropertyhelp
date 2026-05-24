"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type MatchLabel = "Best Match" | "Area Match" | "Emergency Ready" | null;

export type ScoredContractor = {
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
  score: number;
  matchLabel: MatchLabel;
};

const LABEL_STYLE: Record<NonNullable<MatchLabel>, { bg: string; color: string }> = {
  "Best Match":      { bg: "#d1fae5", color: "#065f46" },
  "Area Match":      { bg: "#dbeafe", color: "#1e40af" },
  "Emergency Ready": { bg: "#ffedd5", color: "#9a3412" },
};

export default function ContractorPanel({
  leadId,
  contractors,
  initialSentIds,
}: {
  leadId: string;
  contractors: ScoredContractor[];
  initialSentIds: string[];
}) {
  const router = useRouter();
  const [sentIds, setSentIds] = useState<Set<string>>(new Set(initialSentIds));
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function sendLead(contractorId: string) {
    setLoadingId(contractorId);
    setErrors((prev) => { const n = { ...prev }; delete n[contractorId]; return n; });

    try {
      const res = await fetch(`/api/admin/leads/${leadId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractorId }),
      });
      const data = await res.json();

      if (res.ok) {
        setSentIds((prev) => new Set([...prev, contractorId]));
        router.refresh();
      } else {
        setErrors((prev) => ({ ...prev, [contractorId]: data.message ?? "Send failed." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [contractorId]: "Network error." }));
    } finally {
      setLoadingId(null);
    }
  }

  if (contractors.length === 0) {
    return (
      <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
        No contractors match this lead&apos;s trade types yet.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {contractors.map((c) => {
        const isSent    = sentIds.has(c.id);
        const isLoading = loadingId === c.id;
        const error     = errors[c.id];
        const label     = c.matchLabel;
        const labelStyle = label ? LABEL_STYLE[label] : null;

        const borderColor = isSent
          ? "#86efac"
          : label === "Best Match"
          ? "#93c5fd"
          : "#e5e7eb";
        const leftBorder  = isSent
          ? "3px solid #76b900"
          : label === "Best Match"
          ? "3px solid #2563eb"
          : "3px solid #e5e7eb";
        const bgColor     = isSent
          ? "#f0fdf4"
          : label === "Best Match"
          ? "#eff6ff"
          : "#fafafa";

        return (
          <div
            key={c.id}
            style={{
              padding: "14px",
              border: `1px solid ${borderColor}`,
              borderLeft: leftBorder,
              borderRadius: "6px",
              backgroundColor: bgColor,
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111" }}>
                {c.company_name}
              </span>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                {isSent && (
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#065f46", backgroundColor: "#d1fae5", padding: "1px 6px", borderRadius: "3px", whiteSpace: "nowrap" }}>
                    Sent
                  </span>
                )}
                {label && labelStyle && !isSent && (
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: labelStyle.color, backgroundColor: labelStyle.bg, padding: "1px 6px", borderRadius: "3px", whiteSpace: "nowrap" }}>
                    {label}
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div style={{ fontSize: "0.78rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "10px" }}>
              <div>{c.trade}</div>
              {c.zip_code && (
                <div>ZIP {c.zip_code} · {c.service_radius_miles} mi radius</div>
              )}
              {(c.service_area ?? []).length > 0 && (
                <div>{c.service_area.join(", ")}</div>
              )}
              {c.phone && (
                <div style={{ marginTop: "4px" }}>
                  <a href={`tel:${c.phone}`} style={{ color: "#76b900", fontWeight: 600 }}>
                    {c.phone}
                  </a>
                </div>
              )}
              {c.emergency_available && (
                <div style={{ color: "#9a3412", fontWeight: 600, marginTop: "2px", fontSize: "0.75rem" }}>
                  Emergency available
                </div>
              )}
              {!c.email && (
                <div style={{ color: "#f59e0b", fontSize: "0.72rem", marginTop: "2px" }}>
                  No email — cannot dispatch
                </div>
              )}
            </div>

            {/* Send button */}
            <button
              disabled={isSent || isLoading}
              onClick={() => sendLead(c.id)}
              style={{
                width: "100%",
                padding: "7px 0",
                borderRadius: "5px",
                border: "none",
                backgroundColor: isSent
                  ? "#d1fae5"
                  : isLoading
                  ? "#e5e7eb"
                  : "#76b900",
                color: isSent ? "#065f46" : isLoading ? "#9ca3af" : "#000",
                fontWeight: 700,
                fontSize: "0.78rem",
                cursor: isSent || isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Sending…" : isSent ? "✓ Lead Sent" : "Send Lead →"}
            </button>

            {error && (
              <p style={{ fontSize: "0.75rem", color: "#c53030", marginTop: "6px", marginBottom: 0 }}>
                {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
