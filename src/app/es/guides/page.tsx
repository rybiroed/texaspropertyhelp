import type { Metadata } from "next";
import Link from "next/link";
import { ES } from "@/lib/translations-es";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Guías para Propietarios de Texas",
  description:
    "Guías paso a paso para propietarios de Texas sobre daños por tormenta, reclamaciones de seguro, reparaciones de emergencia y financiamiento de HVAC.",
  alternates: pageAlternates("/guides", "/es/guides", true),
};

const categoryLabels: Record<string, string> = {
  "storm-damage": "Daños por Tormenta",
  roofing: "Techado",
  hvac: "HVAC",
  "insurance-claims": "Seguro",
  financing: "Financiamiento",
  "emergency-repair": "Emergencia",
  general: "General",
};

export default function GuidesESPage() {
  const guides = ES.guideCards;

  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            {ES.guides.badge}
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            {ES.guides.h1}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            {ES.guides.subheading}
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--off-white)" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/es/guides/${guide.slug}`}
                style={{ display: "flex", flexDirection: "column", backgroundColor: "white", border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden", textDecoration: "none" }}
                className="group hover:shadow-md transition-all"
              >
                <div style={{ backgroundColor: "var(--navy)", padding: "8px 20px" }}>
                  <span style={{ color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {categoryLabels[guide.category] ?? guide.category}
                  </span>
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "1rem", lineHeight: "1.4", fontFamily: "Georgia, serif", marginBottom: "10px" }} className="group-hover:text-[var(--accent)]">
                    {guide.title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6", flex: 1 }}>
                    {guide.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
                    {guide.readTime && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>📖 {guide.readTime}</span>}
                    <span style={{ marginLeft: "auto", color: "var(--accent)", fontWeight: 600, fontSize: "0.875rem" }}>Leer →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ backgroundColor: "white", border: "1px dashed var(--border)", borderRadius: "10px", padding: "32px", textAlign: "center", marginTop: "24px" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              {ES.guides.moreComingSoon}
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "16px" }}>
            {ES.guides.ctaHeading}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "28px" }}>
            {ES.guides.ctaSub}
          </p>
          <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "white", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "8px" }} className="hover:opacity-90">
            {ES.guides.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}
