import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedGuides } from "@/lib/guides";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Texas Property Updates — Storm Alerts & New Guides",
  description:
    "Latest updates from Texas Property Help — storm alerts, new homeowner guides, and property help resources for Texas homeowners.",
  alternates: pageAlternates("/updates", null),
};

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  "storm-damage": { bg: "#7c2d12", text: "#fed7aa", label: "Storm Damage" },
  roofing:        { bg: "#1e3a5f", text: "#bfdbfe", label: "Roofing" },
  hvac:           { bg: "#14532d", text: "#bbf7d0", label: "HVAC" },
  "insurance-claims": { bg: "#4a1d96", text: "#ddd6fe", label: "Insurance" },
  financing:      { bg: "#1c1917", text: "#d6d3d1", label: "Financing" },
};

export default function UpdatesPage() {
  const guides = getPublishedGuides()
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  // Group by month
  const grouped: Record<string, typeof guides> = {};
  for (const guide of guides) {
    const month = new Date(guide.lastUpdated).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(guide);
  }

  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            What&apos;s New
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Texas Property Updates
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            New homeowner guides, storm alerts, and resources — updated regularly for Texas homeowners.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto">

          {Object.entries(grouped).map(([month, monthGuides]) => (
            <div key={month} style={{ marginBottom: "48px" }}>
              {/* Month header */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ color: "var(--content-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                  {month}
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "var(--content-border)" }} />
              </div>

              {/* Guide entries */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {monthGuides.map((guide) => {
                  const cat = categoryColors[guide.category] ?? { bg: "#1c1917", text: "#d6d3d1", label: guide.category };
                  return (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      style={{ display: "flex", gap: "16px", textDecoration: "none", alignItems: "flex-start" }}
                    >
                      {/* Date pill */}
                      <div style={{ textAlign: "center", minWidth: "44px", paddingTop: "2px" }}>
                        <span style={{ color: "var(--content-muted)", fontSize: "0.75rem", fontWeight: 600 }}>
                          {new Date(guide.lastUpdated).toLocaleDateString("en-US", { day: "2-digit" })}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, borderLeft: "2px solid var(--content-border)", paddingLeft: "16px" }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span style={{ backgroundColor: cat.bg, color: cat.text, fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {cat.label}
                          </span>
                          {guide.readTime && (
                            <span style={{ color: "var(--content-muted)", fontSize: "0.75rem" }}>
                              {guide.readTime}
                            </span>
                          )}
                        </div>
                        <h3 style={{ color: "var(--content-primary)", fontWeight: 700, fontSize: "0.9375rem", lineHeight: 1.4, margin: "0 0 4px" }}>
                          {guide.title}
                        </h3>
                        <p style={{ color: "var(--content-secondary)", fontSize: "0.8125rem", lineHeight: 1.5, margin: 0 }}>
                          {guide.description.slice(0, 120)}…
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Storm alert placeholder — DeeBot will trigger these */}
          <div style={{ border: "1px dashed var(--content-border)", borderRadius: "8px", padding: "20px 24px", textAlign: "center", marginTop: "8px" }}>
            <p style={{ color: "var(--content-muted)", fontSize: "0.875rem", margin: 0 }}>
              ⛈️ Storm alerts for Texas homeowners will appear here when active severe weather is detected.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--off-white)", borderTop: "1px solid var(--content-border)" }} className="py-10 px-4">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontWeight: 700, color: "var(--content-primary)", marginBottom: "4px" }}>Have a property issue right now?</p>
            <p style={{ color: "var(--content-secondary)", fontSize: "0.875rem", margin: 0 }}>Free to submit — no obligation.</p>
          </div>
          <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--navy)", color: "white", fontWeight: 700, fontSize: "0.9375rem", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", whiteSpace: "nowrap" }}>
            Request Help →
          </Link>
        </div>
      </section>
    </>
  );
}
