"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_BUTTONS = [
  { label: "Mark Reviewing", status: "reviewing", color: "#92400e", bg: "#fef3c7" },
  { label: "Mark Matched",   status: "matched",   color: "#065f46", bg: "#d1fae5" },
  { label: "Mark Closed",    status: "closed",    color: "#374151", bg: "#f3f4f6" },
  { label: "Mark Spam",      status: "spam",      color: "#991b1b", bg: "#fee2e2" },
];

export default function LeadStatusControls({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function setStatus(status: string) {
    setBusy(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        setFeedback(data.message ?? "Update failed.");
      } else {
        router.refresh();
      }
    } catch {
      setFeedback("Network error.");
    } finally {
      setBusy(false);
    }
  }

  function sendLead() {
    console.log("[admin] Send Lead — lead id:", id);
    setFeedback("Send Lead is not yet implemented. See console.");
  }

  const visible = STATUS_BUTTONS.filter((b) => b.status !== currentStatus);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        {visible.map((btn) => (
          <button
            key={btn.status}
            disabled={busy}
            onClick={() => setStatus(btn.status)}
            style={{
              padding: "7px 14px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: busy ? "#e5e7eb" : btn.bg,
              color: busy ? "#9ca3af" : btn.color,
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            {btn.label}
          </button>
        ))}
        <button
          disabled={busy}
          onClick={sendLead}
          style={{
            padding: "7px 14px",
            borderRadius: "5px",
            border: "1px solid #76b900",
            backgroundColor: "white",
            color: "#3d6300",
            fontWeight: 700,
            fontSize: "0.8rem",
            cursor: busy ? "not-allowed" : "pointer",
          }}
        >
          Send Lead →
        </button>
      </div>
      {feedback && (
        <p style={{ marginTop: "8px", fontSize: "0.8rem", color: "#6b7280" }}>{feedback}</p>
      )}
    </div>
  );
}
