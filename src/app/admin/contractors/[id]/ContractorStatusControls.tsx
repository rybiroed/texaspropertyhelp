"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ACTIONS = [
  { status: "approved",       label: "Approve",  bg: "#76b900", color: "#000", confirm: false },
  { status: "rejected",       label: "Reject",   bg: "#dc2626", color: "#fff", confirm: true },
  { status: "suspended",      label: "Suspend",  bg: "#f59e0b", color: "#000", confirm: true },
  { status: "blocked",        label: "Block",    bg: "#111",    color: "#fff", confirm: true },
  { status: "pending_review", label: "Reset to Pending", bg: "#e5e7eb", color: "#374151", confirm: false },
] as const;

export default function ContractorStatusControls({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reasonFor, setReasonFor] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  async function apply(status: string, resolvedReason?: string) {
    setLoading(status);
    setError(null);
    try {
      const res = await fetch(`/api/admin/contractors/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reason: resolvedReason ?? null }),
      });
      if (res.ok) {
        setReasonFor(null);
        setReason("");
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.message ?? "Update failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {ACTIONS.map((a) => {
          const isCurrent = currentStatus === a.status;
          const isLoading = loading === a.status;
          return (
            <button
              key={a.status}
              disabled={isCurrent || !!loading}
              onClick={() => {
                if (a.confirm) {
                  setReasonFor(a.status);
                  setReason("");
                } else {
                  apply(a.status);
                }
              }}
              style={{
                padding: "7px 14px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: isCurrent ? "#e5e7eb" : isLoading ? "#e5e7eb" : a.bg,
                color: isCurrent ? "#9ca3af" : isLoading ? "#9ca3af" : a.color,
                fontWeight: 700,
                fontSize: "0.8rem",
                cursor: isCurrent || !!loading ? "not-allowed" : "pointer",
                opacity: isCurrent ? 0.6 : 1,
              }}
            >
              {isLoading ? "Saving…" : isCurrent ? `✓ ${a.label}` : a.label}
            </button>
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
