import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedGuides } from "@/lib/guides";
import { getAllPosts, CATEGORY_META } from "@/lib/posts";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Texas Property Updates — Storm Alerts & Homeowner Guides | Texas Property Help",
  description:
    "Latest updates from Texas Property Help — storm alerts, new homeowner guides, and property help resources for Texas homeowners across 20+ Texas cities.",
  alternates: pageAlternates("/updates", "/es/updates"),
  openGraph: {
    title: "Texas Property Updates — Storm Alerts & Homeowner Guides",
    description: "Stay up to date with storm alerts, homeowner guides, and property help resources for Texas homeowners. New articles published daily.",
    url: "https://texaspropertyhelp.com/updates",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630, alt: "Texas property updates and homeowner guides" }],
  },
  twitter: { card: "summary_large_image" },
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

export default function UpdatesPage() {
  // Auto-generated articles from posts.json
  const posts = getAllPosts();
  const postItems: FeedItem[] = posts.map((p) => ({
    slug:     p.slug,
    href:     `/updates/${p.slug}`,
    title:    p.title,
    date:     p.publishedAt,
    category: p.category,
    readTime: p.readTime,
    summary:  p.summary,
    city:     p.city,
    imageUrl: p.imageUrl || "",
    type:     "post",
  }));

  // Manually authored guides from guides.ts
  const guides = getPublishedGuides();

  // ItemList schema for Google
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Texas Property Help — Articles & Guides",
    url: "https://texaspropertyhelp.com/updates",
    numberOfItems: posts.length + guides.length,
    itemListElement: [
      ...posts.slice(0, 10).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://texaspropertyhelp.com/updates/${p.slug}`,
        name: p.title,
      })),
      ...guides.slice(0, 5).map((g, i) => ({
        "@type": "ListItem",
        position: Math.min(posts.length, 10) + i + 1,
        url: `https://texaspropertyhelp.com/guides/${g.slug}`,
        name: g.title,
      })),
    ],
  };
  const guideItems: FeedItem[] = guides.map((g) => ({
    slug:     g.slug,
    href:     `/guides/${g.slug}`,
    title:    g.title,
    date:     g.lastUpdated,
    category: g.category,
    readTime: g.readTime,
    summary:  g.description,
    city:     null,
    type:     "guide",
  }));

  // Merge and sort newest first
  const allItems: FeedItem[] = [...postItems, ...guideItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by month
  const grouped: Record<string, FeedItem[]> = {};
  for (const item of allItems) {
    const month = new Date(item.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(item);
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            What&apos;s New
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Texas Property Updates
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            Storm alerts, homeowner guides, and local tips — updated daily for Texas homeowners across Houston, Dallas, San Antonio, Austin, and beyond.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
            <div>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.5rem" }}>{postItems.length + guideItems.length}</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginLeft: "6px" }}>articles &amp; guides</span>
            </div>
            <div>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.5rem" }}>20+</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginLeft: "6px" }}>Texas cities covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto">

          {Object.keys(grouped).length === 0 && (
            <div style={{ border: "1px dashed var(--content-border)", borderRadius: "8px", padding: "32px", textAlign: "center" }}>
              <p style={{ color: "var(--content-muted)", fontSize: "0.9375rem", margin: 0 }}>
                ⛈️ Articles are published daily. Check back tomorrow for storm alerts and homeowner guides.
              </p>
            </div>
          )}

          {Object.entries(grouped).map(([month, items]) => (
            <div key={month} style={{ marginBottom: "48px" }}>
              {/* Month header */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <span style={{ color: "var(--content-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                  {month}
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "var(--content-border)" }} />
              </div>

              {/* Items */}
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
                      {/* Date pill */}
                      <div style={{ textAlign: "center", minWidth: "44px", paddingTop: "3px" }}>
                        <span style={{ color: "var(--content-muted)", fontSize: "0.75rem", fontWeight: 600, display: "block" }}>
                          {new Date(item.date).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span style={{ color: "var(--content-primary)", fontSize: "1rem", fontWeight: 700, display: "block" }}>
                          {new Date(item.date).toLocaleDateString("en-US", { day: "2-digit" })}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, borderLeft: "2px solid var(--content-border)", paddingLeft: "16px", paddingBottom: "4px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      {/* Thumbnail if available */}
                      {item.imageUrl && (
                        <div style={{ width: "90px", height: "64px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                          <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: "cover" }} sizes="90px" />
                        </div>
                      )}
                      <div style={{ flex: 1 }}>
                        {/* Badges */}
                        <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span style={{ backgroundColor: cat.bg, color: cat.color, fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {cat.label}
                          </span>
                          {item.city && (
                            <span style={{ backgroundColor: "rgba(118,185,0,0.12)", color: "var(--accent)", fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: "3px" }}>
                              📍 {item.city}
                            </span>
                          )}
                          {item.type === "guide" && (
                            <span style={{ backgroundColor: "#f0f9ff", color: "#0369a1", fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: "3px" }}>
                              Guide
                            </span>
                          )}
                          {item.readTime && (
                            <span style={{ color: "var(--content-muted)", fontSize: "0.75rem" }}>
                              {item.readTime}
                            </span>
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

      {/* CTA */}
      <section style={{ backgroundColor: "var(--off-white)", borderTop: "1px solid var(--content-border)" }} className="py-10 px-4">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontWeight: 700, color: "var(--content-primary)", marginBottom: "4px" }}>Have a property issue right now?</p>
            <p style={{ color: "var(--content-secondary)", fontSize: "0.875rem", margin: 0 }}>Free to submit — no obligation. Serving 20+ Texas cities.</p>
          </div>
          <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--navy)", color: "white", fontWeight: 700, fontSize: "0.9375rem", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", whiteSpace: "nowrap" }}>
            Request Help →
          </Link>
        </div>
      </section>
    </>
  );
}
