"use client";

import { useState, useRef, useCallback } from "react";

type DocType = "insurance" | "license" | "id";

type DocState = {
  status: "idle" | "uploading" | "done" | "error";
  progress: number;
  errorMessage: string | null;
  expiresAt: string;
  file: File | null;
  dragging: boolean;
};

const DOC_CONFIG: { type: DocType; label: string; description: string; hasExpiry: boolean }[] = [
  {
    type: "insurance",
    label: "Insurance Certificate (COI)",
    description: "General liability insurance certificate showing active coverage.",
    hasExpiry: true,
  },
  {
    type: "license",
    label: "Contractor License",
    description: "State or local contractor license or registration.",
    hasExpiry: false,
  },
  {
    type: "id",
    label: "Government-Issued Photo ID",
    description: "Driver's license, state ID, or passport.",
    hasExpiry: false,
  },
];

const EMPTY_DOC_STATE: DocState = {
  status: "idle",
  progress: 0,
  errorMessage: null,
  expiresAt: "",
  file: null,
  dragging: false,
};

const ACCEPTED_MIME = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_BYTES = 10 * 1024 * 1024;

function uploadWithProgress(
  formData: FormData,
  onProgress: (pct: number) => void,
): Promise<{ ok: boolean; message?: string }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/contractors/upload-document");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText) as { success?: boolean; message?: string };
        resolve({ ok: xhr.status >= 200 && xhr.status < 300, message: data.message });
      } catch {
        resolve({ ok: false, message: "Unexpected server response." });
      }
    };
    xhr.onerror = () => resolve({ ok: false, message: "Network error. Please try again." });
    xhr.send(formData);
  });
}

function validateFile(file: File): string | null {
  if (!ACCEPTED_MIME.includes(file.type)) {
    return "Only PDF, JPG, and PNG files are accepted.";
  }
  if (file.size > MAX_BYTES) {
    return "File must be 10 MB or smaller.";
  }
  return null;
}

export default function DocumentUpload({ contractorId }: { contractorId: string }) {
  const [docs, setDocs] = useState<Record<DocType, DocState>>({
    insurance: { ...EMPTY_DOC_STATE },
    license:   { ...EMPTY_DOC_STATE },
    id:        { ...EMPTY_DOC_STATE },
  });

  const fileInputRefs: Record<DocType, React.RefObject<HTMLInputElement | null>> = {
    insurance: useRef<HTMLInputElement>(null),
    license:   useRef<HTMLInputElement>(null),
    id:        useRef<HTMLInputElement>(null),
  };

  const setDoc = useCallback((type: DocType, patch: Partial<DocState>) => {
    setDocs((prev) => ({ ...prev, [type]: { ...prev[type], ...patch } }));
  }, []);

  function handleFileSelect(type: DocType, file: File) {
    const err = validateFile(file);
    if (err) {
      setDoc(type, { errorMessage: err, file: null });
      return;
    }
    setDoc(type, { file, errorMessage: null, status: "idle" });
  }

  function handleInputChange(type: DocType, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(type, file);
  }

  function handleDrop(type: DocType, e: React.DragEvent) {
    e.preventDefault();
    setDoc(type, { dragging: false });
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(type, file);
  }

  async function handleUpload(type: DocType) {
    const doc = docs[type];
    if (!doc.file || doc.status === "uploading" || doc.status === "done") return;

    if (type === "insurance" && !doc.expiresAt) {
      setDoc(type, { errorMessage: "Expiration date is required for insurance certificates." });
      return;
    }

    setDoc(type, { status: "uploading", progress: 0, errorMessage: null });

    const fd = new FormData();
    fd.append("contractor_id",  contractorId);
    fd.append("document_type",  type);
    fd.append("file",           doc.file);
    if (type === "insurance" && doc.expiresAt) {
      fd.append("expires_at", doc.expiresAt);
    }

    const result = await uploadWithProgress(fd, (pct) => {
      setDoc(type, { progress: pct });
    });

    if (result.ok) {
      setDoc(type, { status: "done", progress: 100 });
    } else {
      setDoc(type, { status: "error", errorMessage: result.message ?? "Upload failed. Please try again." });
    }
  }

  const allDone = (["insurance", "license", "id"] as DocType[]).every(
    (t) => docs[t].status === "done",
  );

  return (
    <div>
      {/* Lead access warning */}
      <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "8px", padding: "14px 18px", marginBottom: "24px" }}>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#92400e", fontWeight: 600, lineHeight: 1.5 }}>
          Lead access is disabled until compliance verification is completed.
        </p>
        <p style={{ margin: "6px 0 0", fontSize: "0.82rem", color: "#78350f", lineHeight: 1.5 }}>
          Upload all three required documents. Our team will review and verify them before activating your account.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {DOC_CONFIG.map(({ type, label, description, hasExpiry }) => {
          const doc = docs[type];
          const isDone = doc.status === "done";
          const isUploading = doc.status === "uploading";

          return (
            <div
              key={type}
              style={{
                border: `1px solid ${isDone ? "#86efac" : doc.status === "error" ? "#fca5a5" : "#e5e7eb"}`,
                borderRadius: "8px",
                padding: "16px 18px",
                backgroundColor: isDone ? "#f0fdf4" : "white",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem", color: isDone ? "#065f46" : "#111" }}>
                    {isDone ? "✓ " : ""}{label}
                  </p>
                  <p style={{ margin: "3px 0 0", fontSize: "0.8rem", color: "#6b7280" }}>{description}</p>
                </div>
                {isDone && (
                  <span style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                    Uploaded
                  </span>
                )}
              </div>

              {!isDone && (
                <>
                  {/* Drop zone */}
                  <div
                    onClick={() => fileInputRefs[type].current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDoc(type, { dragging: true }); }}
                    onDragLeave={() => setDoc(type, { dragging: false })}
                    onDrop={(e) => handleDrop(type, e)}
                    style={{
                      border: `2px dashed ${doc.dragging ? "#76b900" : doc.file ? "#86efac" : "#d1d5db"}`,
                      borderRadius: "6px",
                      padding: "18px 12px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: doc.dragging ? "#f7fee7" : doc.file ? "#f0fdf4" : "#f9fafb",
                      transition: "all 0.15s",
                      userSelect: "none",
                    }}
                  >
                    <input
                      ref={fileInputRefs[type]}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      onChange={(e) => handleInputChange(type, e)}
                    />
                    {doc.file ? (
                      <p style={{ margin: 0, fontSize: "0.83rem", color: "#065f46", fontWeight: 600 }}>
                        {doc.file.name}{" "}
                        <span style={{ color: "#6b7280", fontWeight: 400 }}>
                          ({(doc.file.size / 1024).toFixed(0)} KB)
                        </span>
                      </p>
                    ) : (
                      <>
                        <p style={{ margin: "0 0 4px", fontSize: "0.83rem", color: "#374151", fontWeight: 600 }}>
                          Drag & drop or click to browse
                        </p>
                        <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
                          PDF, JPG, PNG — max 10 MB
                        </p>
                      </>
                    )}
                  </div>

                  {/* Insurance expiry date */}
                  {hasExpiry && (
                    <div style={{ marginTop: "10px" }}>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                        Policy Expiration Date <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="date"
                        value={doc.expiresAt}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDoc(type, { expiresAt: e.target.value })}
                        style={{ padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: "5px", fontSize: "0.875rem", width: "180px" }}
                      />
                    </div>
                  )}

                  {/* Progress bar */}
                  {isUploading && (
                    <div style={{ marginTop: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6b7280", marginBottom: "4px" }}>
                        <span>Uploading…</span>
                        <span>{doc.progress}%</span>
                      </div>
                      <div style={{ height: "6px", backgroundColor: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            backgroundColor: "#76b900",
                            borderRadius: "3px",
                            width: `${doc.progress}%`,
                            transition: "width 0.2s",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {doc.errorMessage && (
                    <p style={{ fontSize: "0.8rem", color: "#dc2626", marginTop: "8px", marginBottom: 0 }}>
                      {doc.errorMessage}
                    </p>
                  )}

                  {/* Upload button */}
                  {doc.file && !isUploading && (
                    <button
                      onClick={() => handleUpload(type)}
                      style={{
                        marginTop: "10px",
                        padding: "8px 18px",
                        backgroundColor: "#76b900",
                        color: "#000",
                        fontWeight: 700,
                        fontSize: "0.83rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Upload {label.split(" ")[0]}
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* All done state */}
      {allDone && (
        <div style={{ marginTop: "20px", backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "16px 18px", textAlign: "center" }}>
          <p style={{ margin: 0, fontWeight: 700, color: "#065f46", fontSize: "0.9rem" }}>
            All documents uploaded successfully.
          </p>
          <p style={{ margin: "6px 0 0", fontSize: "0.82rem", color: "#6b7280" }}>
            Our team will review your documents and contact you when your account is verified.
          </p>
        </div>
      )}
    </div>
  );
}
