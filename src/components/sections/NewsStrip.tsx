"use client";
import Link from "next/link";
import type { GuideCard } from "@/types";

interface NewsStripProps {
  guides: GuideCard[];
  stormAlert?: { text: string; level: "clear" | "marginal" | "slight" | "enhanced" } | null;
}

const levelColors = {
  clear: { bg: "#f0fdf4", border: "#86efac", text: "#166534", dot: "#22c55e", label: "All Clear" },
  marginal: { bg: "#fefce8", border: "#fde047", text: "#854d0e", dot: "#eab308", label: "Marginal Risk" },
  slight: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", dot: "#f97316", label: "Slight Risk" },
  enhanced: { bg: "#fef2f2", border: "#fca5a5", text: "#991b1b", dot: "#ef4444", label: "Enhanced Risk" },
};

const categoryColors: Record<string, string> = {
  "storm-damage": "#ef4444",
  roofing: "#76b900",
  hvac: "#0ea5e9",
  "insurance-claims": "#8b5cf6",
  financing: "#f59e0b",
};

export default function NewsStrip({ guides, stormAlert }: NewsStripProps) {
  const alert = stormAlert ?? { level: "clear" as const, text: "No severe weather threats in Texas today. Storm season active — monitor updates." };
  const colors = levelColors[alert.level];

  return (
    <section style={{ backgroundColor: "#111827" }} className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#76b900", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>⚡ Live Updates</span>
          </div>
          <Link href="/updates" style={{ color: "#76b900", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>View all →</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Storm monitor */}
          <div style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: colors.dot, display: "inline-block", boxShadow: `0 0 0 3px ${colors.dot}33` }} />
              <span style={{ color: colors.text, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                TX Storm Monitor · {colors.label}
              </span>
            </div>
            <p style={{ color: colors.text, fontSize: "0.85rem", lineHeight: 1.6, margin: "0 0 12px" }}>{alert.text}</p>
            <Link href="/updates" style={{ color: colors.text, fontSize: "0.78rem", fontWeight: 700, textDecoration: "underline", opacity: 0.8 }}>
              See full weather report →
            </Link>
          </div>

          {/* Recent guides */}
          {guides.slice(0, 2).map((guide) => {
            const catColor = categoryColors[guide.category] ?? "#76b900";
            return (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} style={{ backgroundColor: "#1f2937", borderRadius: "10px", padding: "18px 20px", textDecoration: "none", display: "block", border: "1px solid #374151", transition: "border-color 0.15s" }}
                className="hover:border-[var(--accent)]"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ backgroundColor: catColor, color: "#000", fontSize: "0.65rem", fontWeight: 800, padding: "2px 8px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {guide.category.replace("-", " ")}
                  </span>
                  <span style={{ color: "#6b7280", fontSize: "0.72rem" }}>
                    {new Date(guide.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <h3 style={{ color: "#f9fafb", fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.4, margin: "0 0 8px" }}>{guide.title}</h3>
                <p style={{ color: "#9ca3af", fontSize: "0.78rem", lineHeight: 1.5, margin: 0 }}>{guide.description.slice(0, 90)}…</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
