import Link from "next/link";

// TODO: Add auth protection before making this public-facing.
// Currently accessible to anyone who knows the /admin URL.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f4f4", fontFamily: "system-ui, sans-serif" }}>
      <header
        style={{
          backgroundColor: "#000000",
          borderBottom: "2px solid #76b900",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
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
          <span style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Admin
          </span>
        </span>
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link
            href="/admin/leads"
            style={{ color: "#c0c0c0", fontSize: "0.85rem", textDecoration: "none" }}
          >
            Leads
          </Link>
        </nav>
        <span style={{ marginLeft: "auto" }}>
          <Link
            href="/"
            style={{ color: "#555", fontSize: "0.75rem", textDecoration: "none" }}
          >
            ← Public site
          </Link>
        </span>
      </header>
      <main style={{ padding: "24px" }}>{children}</main>
    </div>
  );
}
