"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/leads");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? "Incorrect password.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#111111",
          border: "1px solid #333",
          borderRadius: "10px",
          padding: "36px 32px",
          width: "100%",
          maxWidth: "380px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span
            style={{
              backgroundColor: "#76b900",
              color: "#000",
              fontWeight: 800,
              fontSize: "0.9rem",
              padding: "3px 8px",
              borderRadius: "3px",
            }}
          >
            TPH
          </span>
          <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "10px", marginBottom: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Admin Access
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="password"
            style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#ccc", marginBottom: "6px" }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              backgroundColor: "#1a1a1a",
              border: error ? "1px solid #c53030" : "1px solid #333",
              borderRadius: "6px",
              color: "white",
              fontSize: "0.9375rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p style={{ color: "#fc8181", fontSize: "0.8rem", marginTop: "8px", marginBottom: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !password}
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "11px",
              backgroundColor: busy || !password ? "#333" : "#76b900",
              color: busy || !password ? "#666" : "#000",
              fontWeight: 700,
              fontSize: "0.9rem",
              borderRadius: "6px",
              border: "none",
              cursor: busy || !password ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
