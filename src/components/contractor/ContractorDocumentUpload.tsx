"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type ContractorDocSummary = {
  id: string;
  document_type: string;
  verification_status: string;
  original_filename: string | null;
  expires_at: string | null;
  rejection_reason: string | null;
};

const DOC_TYPES: { key: string; label: string; requiresExpiry: boolean }[] = [
  { key: "insurance", label: "Insurance Certificate", requiresExpiry: true },
  { key: "license",   label: "Contractor License",    requiresExpiry: false },
  { key: "id",        label: "Government ID",          requiresExpiry: false },
  { key: "w9",        label: "W-9",                    requiresExpiry: false },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  pending_review: { bg: "#fef3c7", color: "#92400e", label: "Pending Review" },
  verified:       { bg: "#d1fae5", color: "#065f46", label: "Verified"        },
  rejected:       { bg: "#fee2e2", color: "#991b1b", label: "Rejected"        },
  expired:        { bg: "#f3f4f6", color: "#374151", label: "Expired"         },
};

type UploadState = {
  progress:  number;
  uploading: boolean;
  error:     string | null;
  done:      boolean;
};

export default function ContractorDocumentUpload({
  docs: initialDocs,
}: {
  docs: ContractorDocSummary[];
}) {
  const router = useRouter();
  const [docs, setDocs] = useState(initialDocs);
  const [uploadState, setUploadState] = useState<Record<string, UploadState>>({});
  const [expiryDate, setExpiryDate]   = useState<Record<string, string>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Latest doc per type (most recently uploaded)
  const latestByType: Record<string, ContractorDocSummary> = {};
  for (const doc of docs) {
    const prev = latestByType[doc.document_type];
    if (!prev || doc.id > prev.id) {
      latestByType[doc.document_type] = doc;
    }
  }

  function startUpload(docType: string, file: File) {
    const form = new FormData();
    form.append("document_type", docType);
    form.append("file", file);
    if (docType === "insurance" && expiryDate[docType]) {
      form.append("expires_at", expiryDate[docType]);
    }

    setUploadState((prev) => ({
      ...prev,
      [docType]: { progress: 0, uploading: true, error: null, done: false },
    }));

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setUploadState((prev) => ({
          ...prev,
          [docType]: { ...prev[docType], progress: pct },
        }));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        setUploadState((prev) => ({
          ...prev,
          [docType]: { ...prev[docType], uploading: false, done: true, progress: 100 },
        }));
        // Optimistically add the new doc to local state
        const now = new Date().toISOString();
        setDocs((prev) => [
          ...prev,
          {
            id:                  now,
            document_type:       docType,
            verification_status: "pending_review",
            original_filename:   file.name,
            expires_at:          docType === "insurance" && expiryDate[docType] ? expiryDate[docType] : null,
            rejection_reason:    null,
          },
        ]);
        router.refresh();
      } else {
        let msg = "Upload failed.";
        try {
          const body = JSON.parse(xhr.responseText) as { message?: string };
          if (body.message) msg = body.message;
        } catch { /* ignore */ }
        setUploadState((prev) => ({
          ...prev,
          [docType]: { ...prev[docType], uploading: false, error: msg, progress: 0 },
        }));
      }
    };

    xhr.onerror = () => {
      setUploadState((prev) => ({
        ...prev,
        [docType]: { ...prev[docType], uploading: false, error: "Network error.", progress: 0 },
      }));
    };

    xhr.open("POST", "/api/contractor/upload-document");
    xhr.send(form);
  }

  function handleFileChange(docType: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    startUpload(docType, file);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {DOC_TYPES.map(({ key, label, requiresExpiry }) => {
        const latest  = latestByType[key];
        const st      = latest ? (STATUS_STYLE[latest.verification_status] ?? STATUS_STYLE.pending_review) : null;
        const state   = uploadState[key];
        const isExpired = latest?.expires_at && new Date(latest.expires_at) < new Date();

        return (
          <div
            key={key}
            style={{
              border: `1px solid ${latest?.verification_status === "verified" ? "#86efac" : latest?.verification_status === "rejected" ? "#fca5a5" : "#e5e7eb"}`,
              borderLeft: `3px solid ${latest?.verification_status === "verified" ? "#76b900" : latest?.verification_status === "rejected" ? "#dc2626" : "#d1d5db"}`,
              borderRadius: "6px",
              backgroundColor: latest?.verification_status === "verified" ? "#f0fdf4" : "#fff",
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#111" }}>{label}</span>
                {latest?.original_filename && (
                  <span style={{ marginLeft: "8px", fontSize: "0.76rem", color: "#6b7280" }}>
                    {latest.original_filename}
                  </span>
                )}
                {latest?.expires_at && (
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "0.75rem",
                      color: isExpired ? "#dc2626" : "#6b7280",
                      fontWeight: isExpired ? 700 : 400,
                    }}
                  >
                    Expires: {new Date(latest.expires_at).toLocaleDateString("en-US", { dateStyle: "medium" })}
                    {isExpired ? " — EXPIRED" : ""}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                {st && (
                  <span style={{ backgroundColor: st.bg, color: st.color, padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700 }}>
                    {st.label}
                  </span>
                )}

                {!latest && (
                  <span style={{ fontSize: "0.76rem", color: "#6b7280" }}>Not uploaded</span>
                )}

                {/* Upload / re-upload button */}
                <button
                  onClick={() => fileRefs.current[key]?.click()}
                  disabled={state?.uploading}
                  style={{
                    padding: "5px 12px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    cursor: state?.uploading ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {latest ? "Replace" : "Upload"}
                </button>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  ref={(el) => { fileRefs.current[key] = el; }}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(key, e)}
                />
              </div>
            </div>

            {/* Insurance expiry date input */}
            {requiresExpiry && !latest && (
              <div style={{ marginTop: "10px" }}>
                <label style={{ fontSize: "0.78rem", color: "#6b7280", display: "block", marginBottom: "4px" }}>
                  Policy expiration date (required for insurance)
                </label>
                <input
                  type="date"
                  value={expiryDate[key] ?? ""}
                  onChange={(e) => setExpiryDate((prev) => ({ ...prev, [key]: e.target.value }))}
                  style={{ padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: "4px", fontSize: "0.85rem" }}
                />
              </div>
            )}

            {/* Progress bar */}
            {state?.uploading && (
              <div style={{ marginTop: "10px" }}>
                <div style={{ height: "4px", backgroundColor: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${state.progress}%`,
                      backgroundColor: "#76b900",
                      transition: "width 0.2s",
                    }}
                  />
                </div>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: "4px 0 0" }}>
                  Uploading… {state.progress}%
                </p>
              </div>
            )}

            {state?.done && !state.uploading && (
              <p style={{ fontSize: "0.78rem", color: "#15803d", margin: "8px 0 0", fontWeight: 600 }}>
                Uploaded — pending admin review.
              </p>
            )}

            {state?.error && (
              <p style={{ fontSize: "0.78rem", color: "#dc2626", margin: "8px 0 0" }}>
                {state.error}
              </p>
            )}

            {latest?.verification_status === "rejected" && latest.rejection_reason && (
              <p style={{ fontSize: "0.78rem", color: "#991b1b", backgroundColor: "#fff1f2", border: "1px solid #fca5a5", borderRadius: "4px", padding: "6px 10px", margin: "8px 0 0" }}>
                Rejection reason: {latest.rejection_reason}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
