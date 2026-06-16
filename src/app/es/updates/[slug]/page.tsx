import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, CATEGORY_META } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const title = post.titleEs || post.title;
  const summary = post.summaryEs || post.summary;
  return {
    title,
    description: summary,
    alternates: { canonical: `https://texaspropertyhelp.com/es/updates/${post.slug}` },
    openGraph: {
      title,
      description: summary,
      url: `https://texaspropertyhelp.com/es/updates/${post.slug}`,
      siteName: "Texas Property Help",
      locale: "es_US",
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.imageUrl || "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PostESPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = CATEGORY_META[post.category as keyof typeof CATEGORY_META]
    ?? { label: post.category, color: "#d6d3d1", bg: "#1c1917" };

  const title = post.titleEs || post.title;
  const contentHtml = post.contentHtmlEs || post.contentHtml;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: post.summaryEs || post.summary,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "Texas Property Help" },
    publisher: { "@type": "Organization", name: "Texas Property Help", url: "https://texaspropertyhelp.com" },
    mainEntityOfPage: `https://texaspropertyhelp.com/es/updates/${post.slug}`,
    ...(post.city ? { about: { "@type": "Place", name: `${post.city}, Texas` } } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://texaspropertyhelp.com/es" },
      { "@type": "ListItem", position: 2, name: "Actualizaciones", item: "https://texaspropertyhelp.com/es/updates" },
      { "@type": "ListItem", position: 3, name: title, item: `https://texaspropertyhelp.com/es/updates/${post.slug}` },
    ],
  };

  const date = new Date(post.publishedAt).toLocaleDateString("es-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  const pageUrl = `https://texaspropertyhelp.com/es/updates/${post.slug}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {post.imageUrl && (
        <div style={{ position: "relative", width: "100%", height: "420px", overflow: "hidden" }}>
          <Image src={post.imageUrl} alt={title} fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)" }} />
        </div>
      )}

      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ backgroundColor: cat.bg, color: cat.color, fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {cat.label}
            </span>
            {post.city && (
              <span style={{ backgroundColor: "rgba(118,185,0,0.15)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px" }}>
                📍 {post.city}, TX
              </span>
            )}
            {post.readTime && (
              <span style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px" }}>
                {post.readTime}
              </span>
            )}
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2.3rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "16px" }}>
            {title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
            Publicado el {date} · Texas Property Help
          </p>
        </div>
      </section>

      <article style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div
          className="max-w-2xl mx-auto prose-article"
          style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--content-primary)" }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Share buttons */}
        <div className="max-w-2xl mx-auto" style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--content-border)" }}>
          <p style={{ color: "var(--content-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Compartir este artículo</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1877f2", color: "white", fontWeight: 700, fontSize: "0.875rem", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(title + " — " + pageUrl)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#25d366", color: "white", fontWeight: 700, fontSize: "0.875rem", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#000", color: "white", fontWeight: 700, fontSize: "0.875rem", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X (Twitter)
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto" style={{ marginTop: "40px" }}>
          <div style={{ backgroundColor: "var(--navy)", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
            <h3 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>
              {post.city ? `¿Propietario en ${post.city}? Obtenga Ayuda Gratuita.` : "¿Necesita Ayuda con Daños o una Reclamación?"}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Texas Property Help conecta a propietarios con contratistas certificados y orientación gratuita sobre reclamaciones de seguro — sin presión, sin compromiso.
            </p>
            <Link href="/es/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", textDecoration: "none" }}>
              Solicitar Ayuda →
            </Link>
          </div>
        </div>
      </article>

      <section style={{ backgroundColor: "var(--off-white)" }} className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/es/updates" style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none" }}>
            ← Volver a todas las actualizaciones
          </Link>
        </div>
      </section>
    </>
  );
}
