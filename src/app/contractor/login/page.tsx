"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  missing:  "No login token was found in the link.",
  invalid:  "This login link is invalid.",
  used:     "This login link has already been used.",
  expired:  "This login link has expired. Please request a new one.",
  service:  "Service temporarily unavailable. Please try again.",
};

export default function ContractorLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const errorKey = searchParams.get("error");
  const errorMessage = errorKey ? (ERROR_MESSAGES[errorKey] ?? "Something went wrong.") : null;

  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contractor/request-login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError((data as { message?: string }).message || "Request failed. Please try again.");
      } else {
        setSent(true);
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          padding: "40px 36px",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#76b900",
              color: "#000",
              fontWeight: 800,
              fontSize: "0.75rem",
              padding: "2px 6px",
              borderRadius: "3px",
              marginBottom: "12px",
            }}
          >
            TPH
          </span>
          <h1 style={{ margin: "0 0 4px", fontSize: "1.25rem", fontWeight: 700, color: "#111" }}>
            Contractor Portal
          </h1>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
            Enter your email to receive a login link.
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "6px",
              padding: "12px 14px",
              marginBottom: "20px",
              fontSize: "0.875rem",
              color: "#b91c1c",
            }}
          >
            {errorMessage}
          </div>
        )}

        {sent ? (
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "6px",
              padding: "16px",
              fontSize: "0.875rem",
              color: "#15803d",
              lineHeight: 1.5,
            }}
          >
            <strong>Check your email.</strong> If an account exists for{" "}
            <strong>{email}</strong>, a login link has been sent. The link expires in 15 minutes.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "0.9375rem",
                  color: "#111",
                  outline: "none",
                }}
              />
            </div>

            {submitError && (
              <p style={{ marginBottom: "12px", fontSize: "0.8125rem", color: "#b91c1c" }}>
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: loading ? "#93c13e" : "#76b900",
                color: "#000",
                fontWeight: 700,
                fontSize: "0.9375rem",
                padding: "11px",
                border: "none",
                borderRadius: "6px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending…" : "Send Login Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
