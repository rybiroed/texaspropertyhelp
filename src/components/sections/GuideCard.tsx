import Link from "next/link";
import type { GuideCard as GuideCardType } from "@/types";

const categoryLabels: Record<string, string> = {
  "storm-damage": "Storm Damage",
  roofing: "Roofing",
  hvac: "HVAC",
  "insurance-claims": "Insurance",
  financing: "Financing",
  "emergency-repair": "Emergency",
  general: "General",
};

export default function GuideCard({ title, slug, description, category, readTime, lastUpdated }: GuideCardType) {
  return (
    <Link
      href={`/guides/${slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--navy-light)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        overflow: "hidden",
        textDecoration: "none",
      }}
      className="group hover:shadow-lg transition-all"
    >
      {/* Category stripe */}
      <div style={{ backgroundColor: "var(--accent)", padding: "8px 20px" }}>
        <span style={{ color: "#000000", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          {categoryLabels[category] ?? category}
        </span>
      </div>

      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: "1.4",
            marginBottom: "10px",
          }}
          className="group-hover:text-[var(--accent)]"
        >
          {title}
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6", flex: 1 }}>
          {description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "16px",
            paddingTop: "14px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {readTime && (
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              📖 {readTime}
            </span>
          )}
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Updated {new Date(lastUpdated).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </span>
          <span
            style={{
              marginLeft: "auto",
              color: "var(--accent)",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
