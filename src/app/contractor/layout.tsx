"use client";

import { useRouter } from "next/navigation";

export default function ContractorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/contractor/logout", { method: "POST" });
    router.push("/contractor/login");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f4f4", fontFamily: "system-ui, sans-serif" }}>
      <header
        style={{
          backgroundColor: "#000000",
          borderBottom: "2px solid #76b900",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          height: "48px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              backgroundColor: "#76b900",
              color: "#000",
              fontWeight: 800,
              fontSize: "0.8rem",
              padding: "2px 6px",
              borderRadius: "3px",
            }}
          >
            TPH
          </span>
          <span
            style={{
              color: "#888",
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Contractor Portal
          </span>
        </span>

        <span style={{ marginLeft: "auto" }}>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "1px solid #444",
              color: "#999",
              fontSize: "0.75rem",
              padding: "4px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </span>
      </header>

      <main style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}
