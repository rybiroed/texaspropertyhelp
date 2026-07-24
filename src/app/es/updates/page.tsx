import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, CATEGORY_META } from "@/lib/posts";
import { getPublishedGuides } from "@/lib/guides";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Actualizaciones de Propiedades en Texas | Texas Property Help",
  description: "Últimas actualizaciones de Texas Property Help — alertas de tormentas, guías para propietarios y recursos de ayuda para propietarios en más de 20 ciudades de Texas.",
  alternates: pageAlternates("/updates", "/es/updates", true),
  openGraph: {
    title: "Actualizaciones de Propiedades en Texas",
    description: "Alertas de tormentas, guías para propietarios y recursos actualizados diariamente para propietarios en Texas.",
    url: "https://texaspropertyhelp.com/es/updates",
    siteName: "Texas Property Help",
    locale: "es_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630 }],
  },
};

type FeedItem = {
  slug: string;
  href: string;
  title: string;
  date: string;
  category: string;
  readTime?: string;
  summary: string;
  city?: string | null;
  imageUrl?: string;
  type: "post" | "guide";
};

export default function UpdatesESPage() {
  const posts = getAllPosts();
  const guides = getPublishedGuides();

  const postItems: FeedItem[] = posts.map((p) => ({
    slug: p.slug,
    href: `/es/updates/${p.slug}`,
    title: p.titleEs || p.title,
    date: p.publishedAt,
    category: p.category,
    readTime: p.readTime,
    summary: p.summaryEs || p.summary,
    city: p.city,
    imageUrl: p.imageUrl || "",
    type: "post",
  }));

  const guideItems: FeedItem[] = guides.map((g) => ({
    slug: g.slug,
    href: `/es/guides/${g.slug}`,
    title: g.title,
    date: g.lastUpdated,
    category: g.category,
    readTime: g.readTime,
    summary: g.description,
    city: null,
    type: "guide",
  }));

  const allItems: FeedItem[] = [...postItems, ...guideItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const grouped: Record<string, FeedItem[]> = {};
  for (const item of allItems) {
    const month = new Date(item.date).toLocaleDateString("es-US", { month: "long", year: "numeric" });
    const key = month.charAt(0).toUpperCase() + month.slice(1);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }

  return (
    <>
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Novedades
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Actualizaciones para Propietarios en Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            Alertas de tormentas, guías para propietarios y consejos locales — actualizados diariamente para propietarios en Houston, Dallas, San Antonio, Austin y más.
          </p>
          <div style={{ display: "flex", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
            <div>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.5rem" }}>{postItems.length + guideItems.length}</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginLeft: "6px" }}>artículos y guías</span>
            </div>
            <div>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.5rem" }}>20+</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginLeft: "6px" }}>ciudades de Texas</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {allItems.length === 0 && (
            <div style={{ border: "1px dashed var(--content-border)", borderRadius: "8px", padding: "32px", textAlign: "center" }}>
              <p style={{ color: "var(--content-muted)", fontSize: "0.9375rem", margin: 0 }}>
                ⛈️ Los artículos se publican diariamente. Vuelva mañana para alertas de tormentas y guías.
              </p>
            </div>
          )}

          {Object.entries(grouped).map(([month, items]) => (
            <div key={month} style={{ marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <span style={{ color: "var(--content-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                  {month}
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "var(--content-border)" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {items.map((item) => {
                  const cat = CATEGORY_META[item.category as keyof typeof CATEGORY_META]
                    ?? { label: item.category, color: "#d6d3d1", bg: "#1c1917" };

                  return (
                    <Link
                      key={item.slug}
                      href={item.href}
                      style={{ display: "flex", gap: "16px", textDecoration: "none", alignItems: "flex-start" }}
                    >
                      <div style={{ textAlign: "center", minWidth: "44px", paddingTop: "3px" }}>
                        <span style={{ color: "var(--content-muted)", fontSize: "0.75rem", fontWeight: 600, display: "block" }}>
                          {new Date(item.date).toLocaleDateString("es-US", { month: "short" })}
                        </span>
                        <span style={{ color: "var(--content-primary)", fontSize: "1rem", fontWeight: 700, display: "block" }}>
                          {new Date(item.date).toLocaleDateString("es-US", { day: "2-digit" })}
                        </span>
                      </div>

                      <div style={{ flex: 1, borderLeft: "2px solid var(--content-border)", paddingLeft: "16px", paddingBottom: "4px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        {item.imageUrl && (
                          <div style={{ width: "90px", height: "64px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                            <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: "cover" }} sizes="90px" />
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                            <span style={{ backgroundColor: cat.bg, color: cat.color, fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              {cat.label}
                            </span>
                            {item.city && (
                              <span style={{ backgroundColor: "rgba(118,185,0,0.12)", color: "var(--accent)", fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: "3px" }}>
                                📍 {item.city}, TX
                              </span>
                            )}
                            {item.type === "guide" && (
                              <span style={{ backgroundColor: "#f0f9ff", color: "#0369a1", fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: "3px" }}>
                                Guía
                              </span>
                            )}
                            {item.readTime && (
                              <span style={{ color: "var(--content-muted)", fontSize: "0.75rem" }}>{item.readTime}</span>
                            )}
                          </div>
                          <h3 style={{ color: "var(--content-primary)", fontWeight: 700, fontSize: "0.9375rem", lineHeight: 1.4, margin: "0 0 4px" }}>
                            {item.title}
                          </h3>
                          <p style={{ color: "var(--content-secondary)", fontSize: "0.8125rem", lineHeight: 1.5, margin: 0 }}>
                            {item.summary.slice(0, 130)}{item.summary.length > 130 ? "…" : ""}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "var(--off-white)", borderTop: "1px solid var(--content-border)" }} className="py-10 px-4">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontWeight: 700, color: "var(--content-primary)", marginBottom: "4px" }}>¿Tiene un problema en su propiedad ahora?</p>
            <p style={{ color: "var(--content-secondary)", fontSize: "0.875rem", margin: 0 }}>Gratis enviar — sin compromiso. Atendemos más de 20 ciudades en Texas.</p>
          </div>
          <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--navy)", color: "white", fontWeight: 700, fontSize: "0.9375rem", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", whiteSpace: "nowrap" }}>
            Solicitar Ayuda →
          </Link>
        </div>
      </section>
    </>
  );
}
