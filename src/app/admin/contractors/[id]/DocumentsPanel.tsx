"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type ContractorDocument = {
  id: string;
  created_at: string;
  document_type: string;
  original_filename: string | null;
  mime_type: string | null;
  verification_status: string;
  verified_at: string | null;
  verified_by: string | null;
  rejection_reason: string | null;
  expires_at: string | null;
};

const DOC_TYPE_LABELS: Record<string, string> = {
  insurance: "Insurance Certificate",
  license:   "Contractor License",
  id:        "Government ID",
  w9:        "W-9",
  agreement: "Agreement",
};

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  pending_review: { bg: "#fef3c7", color: "#92400e", label: "Pending Review" },
  verified:       { bg: "#d1fae5", color: "#065f46", label: "Verified"        },
  rejected:       { bg: "#fee2e2", color: "#991b1b", label: "Rejected"        },
  expired:        { bg: "#f3f4f6", color: "#374151", label: "Expired"         },
};

export default function DocumentsPanel({
  contractorId,
  initialDocs,
}: {
  contractorId: string;
  initialDocs: ContractorDocument[];
}) {
  const router = useRouter();
  const [docs, setDocs]               = useState(initialDocs);
  const [loadingId, setLoadingId]     = useState<string | null>(null);
  const [rejectDocId, setRejectDocId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [errors, setErrors]           = useState<Record<string, string>>({});

  async function handleAction(docId: string, action: "verify" | "reject", reason?: string) {
    setLoadingId(docId);
    setErrors((prev) => { const n = { ...prev }; delete n[docId]; return n; });
    try {
      const res = await fetch(`/api/admin/contractors/${contractorId}/document-action`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId, action, reason: reason ?? null }),
      });
      if (res.ok) {
        setDocs((prev) =>
          prev.map((d) =>
            d.id === docId
              ? {
                  ...d,
                  verification_status: action === "verify" ? "verified" : "rejected",
                  rejection_reason: action === "reject" ? (reason ?? null) : d.rejection_reason,
                  verified_at: action === "verify" ? new Date().toISOString() : d.verified_at,
                  verified_by: action === "verify" ? "admin" : d.verified_by,
                }
              : d,
          ),
        );
        setRejectDocId(null);
        setRejectReason("");
        router.refresh();
      } else {
        const d = await res.json();
        setErrors((prev) => ({ ...prev, [docId]: d.message ?? "Action failed." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [docId]: "Network error." }));
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDownload(docId: string) {
    setLoadingId(docId);
    try {
      const res = await fetch(`/api/admin/contractors/${contractorId}/document-download?docId=${docId}`);
      if (res.ok) {
        const { url } = await res.json() as { url: string };
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const d = await res.json() as { message?: string };
        setErrors((prev) => ({ ...prev, [docId]: d.message ?? "Download failed." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [docId]: "Network error." }));
    } finally {
      setLoadingId(null);
    }
  }

  if (docs.length === 0) {
    return (
      <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>
        No documents uploaded yet.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {docs.map((doc) => {
        const st = STATUS_STYLE[doc.verification_status] ?? STATUS_STYLE.pending_review;
        const isLoading = loadingId === doc.id;
        const isExpired = doc.expires_at && new Date(doc.expires_at) < new Date();

        return (
          <div
            key={doc.id}
            style={{
              padding: "14px 16px",
              border: `1px solid ${doc.verification_status === "verified" ? "#86efac" : doc.verification_status === "rejected" ? "#fca5a5" : "#e5e7eb"}`,
              borderLeft: `3px solid ${doc.verification_status === "verified" ? "#76b900" : doc.verification_status === "rejected" ? "#dc2626" : "#d1d5db"}`,
              borderRadius: "6px",
              backgroundColor: doc.verification_status === "verified" ? "#f0fdf4" : "white",
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#111" }}>
                  {DOC_TYPE_LABELS[doc.document_type] ?? doc.document_type}
                </span>
                {doc.original_filename && (
                  <span style={{ marginLeft: "8px", fontSize: "0.78rem", color: "#6b7280" }}>
                    {doc.original_filename}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                <span style={{ backgroundColor: st.bg, color: st.color, padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                  {st.label}
                </span>
                {isExpired && doc.verification_status !== "expired" && (
                  <span style={{ backgroundColor: "#f3f4f6", color: "#374151", padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700 }}>
                    Expired
                  </span>
                )}
              </div>
            </div>

            {/* Meta */}
            <div style={{ fontSize: "0.76rem", color: "#6b7280", lineHeight: 1.8, marginBottom: "10px" }}>
              <span>Uploaded: {new Date(doc.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</span>
              {doc.expires_at && (
                <span style={{ marginLeft: "16px", color: isExpired ? "#dc2626" : "#6b7280", fontWeight: isExpired ? 700 : 400 }}>
                  Expires: {new Date(doc.expires_at).toLocaleDateString("en-US", { dateStyle: "medium" })}
                  {isExpired ? " — EXPIRED" : ""}
                </span>
              )}
              {doc.verified_at && (
                <span style={{ marginLeft: "16px" }}>
                  Verified: {new Date(doc.verified_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                </span>
              )}
            </div>

            {doc.rejection_reason && (
              <p style={{ fontSize: "0.78rem", color: "#991b1b", backgroundColor: "#fff1f2", border: "1px solid #fca5a5", borderRadius: "4px", padding: "6px 10px", margin: "0 0 10px" }}>
                Reason: {doc.rejection_reason}
              </p>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={() => handleDownload(doc.id)}
                disabled={isLoading}
                style={{ padding: "5px 12px", backgroundColor: "#f3f4f6", color: "#374151", fontWeight: 600, fontSize: "0.78rem", border: "1px solid #d1d5db", borderRadius: "4px", cursor: isLoading ? "not-allowed" : "pointer" }}
              >
                {isLoading && loadingId === doc.id ? "Loading…" : "Download"}
              </button>

              {doc.verification_status !== "verified" && (
                <button
                  onClick={() => handleAction(doc.id, "verify")}
                  disabled={isLoading}
                  style={{ padding: "5px 12px", backgroundColor: "#76b900", color: "#000", fontWeight: 700, fontSize: "0.78rem", border: "none", borderRadius: "4px", cursor: isLoading ? "not-allowed" : "pointer" }}
                >
                  Verify
                </button>
              )}

              {doc.verification_status !== "rejected" && (
                <button
                  onClick={() => { setRejectDocId(doc.id); setRejectReason(""); }}
                  disabled={isLoading}
                  style={{ padding: "5px 12px", backgroundColor: "#dc2626", color: "#fff", fontWeight: 700, fontSize: "0.78rem", border: "none", borderRadius: "4px", cursor: isLoading ? "not-allowed" : "pointer" }}
                >
                  Reject
                </button>
              )}
            </div>

            {/* Reject reason prompt */}
            {rejectDocId === doc.id && (
              <div style={{ marginTop: "10px", padding: "12px", backgroundColor: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "5px" }}>
                <p style={{ margin: "0 0 6px", fontSize: "0.8rem", fontWeight: 600, color: "#92400e" }}>
                  Reason for rejection (optional):
                </p>
                <textarea
                  rows={2}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Describe the issue…"
                  style={{ width: "100%", padding: "7px 9px", border: "1px solid #d1d5db", borderRadius: "4px", fontSize: "0.82rem", resize: "vertical", boxSizing: "border-box" }}
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button
                    onClick={() => handleAction(doc.id, "reject", rejectReason.trim() || undefined)}
                    disabled={isLoading}
                    style={{ padding: "6px 14px", backgroundColor: "#dc2626", color: "#fff", fontWeight: 700, fontSize: "0.78rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Confirm Reject
                  </button>
                  <button
                    onClick={() => { setRejectDocId(null); setRejectReason(""); }}
                    style={{ padding: "6px 14px", backgroundColor: "#e5e7eb", color: "#374151", fontWeight: 600, fontSize: "0.78rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {errors[doc.id] && (
              <p style={{ fontSize: "0.78rem", color: "#dc2626", marginTop: "6px", marginBottom: 0 }}>
                {errors[doc.id]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
