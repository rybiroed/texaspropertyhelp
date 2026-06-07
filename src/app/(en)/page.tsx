import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServiceCard from "@/components/sections/ServiceCard";
import TrustSection from "@/components/sections/TrustSection";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import GuideCard from "@/components/sections/GuideCard";
import NewsStrip from "@/components/sections/NewsStrip";
import { SITE_CONFIG } from "@/lib/config";
import { pageAlternates } from "@/lib/metadata";
import { getPublishedGuides } from "@/lib/guides";
import { getRecentPosts, CATEGORY_META } from "@/lib/posts";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Texas Storm Damage Help — Free Contractors & Claims Guidance",
  description:
    "Connect with vetted Texas contractors, navigate your insurance claim, and find repair financing — free, fast, and pressure-free. Serving all of Texas.",
  alternates: pageAlternates("/", "/es"),
  openGraph: {
    title: "Texas Storm Damage Help — Free Contractors & Claims Guidance",
    description:
      "Connect with vetted Texas contractors, navigate your insurance claim, and find repair financing — free, fast, and pressure-free. Serving all of Texas.",
    url: "https://texaspropertyhelp.com",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://texaspropertyhelp.com/images/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Texas Property Help — Storm Damage Assistance for Texas Homeowners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Texas Storm Damage Help — Free Contractors & Claims Guidance",
    description:
      "Connect with vetted Texas contractors, navigate your insurance claim, and find repair financing — free and pressure-free.",
    images: ["https://texaspropertyhelp.com/images/home-hero.jpg"],
  },
};

const services = [
  {
    title: "Storm Damage",
    description: "Hail, wind, and water damage hit fast. We help Texas homeowners document storm damage, get a licensed contractor inspection, and navigate the insurance claim process — before your claim deadline.",
    href: "/storm-damage",
    icon: "⛈️",
    image: "/images/storm-damage-hero.jpg",
    accentColor: "#ef4444",
  },
  {
    title: "Roofing Help",
    description: "From free roof inspections to full replacement, get connected with TDLR-licensed roofing professionals across Texas. Know your rights before signing any contract.",
    href: "/roofing",
    icon: "🏠",
    image: "/images/roofing-hero.png",
    accentColor: "#76b900",
  },
  {
    title: "HVAC Help",
    description: "Emergency HVAC repair, system replacement guidance, and financing options for heating and cooling issues.",
    href: "/hvac",
    icon: "🌡️",
    image: "/images/hvac-hero.jpg",
    accentColor: "#0ea5e9",
  },
  {
    title: "Insurance Claim Help",
    description: "Understand your homeowner insurance claim from start to finish — documentation, adjuster visits, ACV vs. RCV, and what to do if your claim is denied or underpaid.",
    href: "/insurance-claims",
    icon: "📄",
    image: "/images/insurance-hero.jpg",
    accentColor: "#8b5cf6",
  },
  {
    title: "Repair Financing",
    description: "Explore financing options for emergency and planned home repairs when out-of-pocket costs are a barrier.",
    href: "/financing",
    icon: "💳",
    image: "/images/financing-hero.jpg",
    accentColor: "#f59e0b",
  },
  {
    title: "Property Repair Guides",
    description: "Step-by-step homeowner guides for storm response, insurance claims, and repair planning.",
    href: "/guides",
    icon: "📚",
    image: "/images/guides-hero.jpg",
    accentColor: "#10b981",
  },
];

const homeFaqs: FAQItem[] = [
  {
    question: "What is Texas Property Help?",
    answer:
      "Texas Property Help is a free homeowner assistance and referral platform. We help Texas homeowners understand their options after property damage, navigate insurance claims, and connect with vetted, TDLR-licensed contractors and service providers. We are not a contractor, insurance company, or law firm.",
  },
  {
    question: "Is Texas Property Help free for homeowners?",
    answer:
      "Submitting a request and receiving information through our platform is free for homeowners. If you are connected with a service provider, their individual fees and terms apply and vary.",
  },
  {
    question: "What is the difference between ACV and RCV homeowners insurance?",
    answer:
      "ACV (Actual Cash Value) pays you the current depreciated value of damaged materials — a 10-year-old roof is worth a fraction of a new one, so your payout is significantly reduced. RCV (Replacement Cost Value) pays what it actually costs to replace the damaged materials with new ones of like kind, minus only your deductible. RCV policies pay out more but typically have higher premiums. Check your declarations page — this difference can mean thousands of dollars on a hail damage claim.",
  },
  {
    question: "What is a wind and hail deductible in Texas?",
    answer:
      "Most Texas homeowners policies have a separate wind and hail deductible — typically 1%–3% of your home's insured replacement value — rather than a flat dollar amount. On a $300,000 home, that's $3,000–$9,000 out of pocket before your insurer pays anything. This deductible applies specifically to wind and hail claims and is separate from your all-other-perils deductible. Review your declarations page to find your exact deductible type and amount.",
  },
  {
    question: "How do I verify a Texas roofing contractor's license?",
    answer:
      "Texas requires roofing contractors to hold an active TDLR (Texas Department of Licensing and Regulation) license. You can verify any contractor at license.tdlr.texas.gov — search by company name or license number. Always verify before signing any contract. After major storms, unlicensed out-of-state contractors flood Texas neighborhoods — verifying TDLR licensure is the most important step you can take before hiring anyone.",
  },
  {
    question: "Does homeowners insurance cover flood damage in Texas?",
    answer:
      "No. Standard Texas homeowners insurance does NOT cover flood damage from rising water — including hurricane storm surge and flash flooding. Flood damage requires a separate policy through the National Flood Insurance Program (NFIP) at FloodSmart.gov or a private flood insurer. The one exception: rainwater entering your home through a storm-damaged roof or broken window is typically covered under your homeowners policy because the wind or hail damage came first.",
  },
  {
    question: "What is TWIA and do I need it?",
    answer:
      "TWIA (Texas Windstorm Insurance Association) provides windstorm and hail coverage for homeowners in 14 Gulf Coast counties and parts of Harris County who cannot get windstorm coverage through the private market. If you live near the Texas coast — Galveston, Corpus Christi, South Padre Island, or coastal areas of Houston — your standard homeowners policy may exclude wind coverage entirely. Check your policy's covered perils section. If wind is excluded, you likely need a TWIA policy.",
  },
  {
    question: "My insurance adjuster's estimate is too low. What can I do?",
    answer:
      "Get a written estimate from a licensed independent contractor and compare it line-by-line with the adjuster's scope of loss. If there's a significant gap, you have three options: (1) request a re-inspection with your contractor present, (2) invoke the appraisal clause in your policy — a neutral umpire resolves the dispute without litigation, (3) hire a licensed public adjuster to negotiate on your behalf. You can also file a complaint with the Texas Department of Insurance at tdi.texas.gov or 800-252-3439.",
  },
  {
    question: "Which Texas cities and areas do you cover?",
    answer:
      `We assist homeowners across all of Texas, including ${SITE_CONFIG.serviceAreas.slice(0, 6).join(", ")}, and 40+ additional cities statewide. Whether you have hail damage in Houston, storm damage in Dallas, or need HVAC help after a storm in San Antonio — we can connect you with licensed local contractors and free guidance.`,
  },
  {
    question: "Can I get help in Spanish?",
    answer:
      "Yes. We offer full bilingual service in English and Spanish. Visit texaspropertyhelp.com/es or select Spanish as your preferred language when submitting your request, and we will connect you with Spanish-speaking contractors and resources.",
  },
];

export default function HomePage() {
  const recentGuides = getPublishedGuides()
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);

  const recentPosts = getRecentPosts(6);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://texaspropertyhelp.com/#organization",
    "name": "Texas Property Help",
    "url": "https://texaspropertyhelp.com",
    "logo": "https://texaspropertyhelp.com/images/logo.png",
    "description": "Free homeowner assistance platform connecting Texas homeowners with vetted contractors, insurance claim guidance, and repair financing after storm damage.",
    "areaServed": {
      "@type": "State",
      "name": "Texas"
    },
    "serviceType": [
      "Storm Damage Help",
      "Roofing Contractor Referral",
      "HVAC Repair Referral",
      "Insurance Claim Guidance",
      "Home Repair Financing"
    ],
    "priceRange": "Free",
    "sameAs": [
      "https://texaspropertyhelp.com"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero with background photo */}
      <section style={{ position: "relative", minHeight: "560px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        {/* Background image */}
        <Image
          src="/images/home-hero.jpg"
          alt="Texas home"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.45) 50%, rgba(0,20,0,0.55) 100%)" }} />

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            backgroundColor: "rgba(118,185,0,0.15)",
            color: "#76b900",
            border: "1px solid rgba(118,185,0,0.4)",
            fontSize: "0.8rem",
            fontWeight: 700,
            padding: "6px 16px",
            borderRadius: "100px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}>
            ⛈️ Texas Storm Season 2026 — Get Help Now
          </div>
          <h1 style={{
            color: "white",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "20px",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}>
            Storm Damage Help for Texas Homeowners —<br />
            <span style={{ color: "#76b900" }}>Fast, Free, and Pressure-Free</span>
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            maxWidth: "580px",
            margin: "0 auto 36px",
            lineHeight: 1.75,
          }}>
            After hail, wind, or water damage, Texas homeowners need fast, reliable help — not another runaround. Texas Property Help connects you with vetted, licensed contractors, insurance claim guidance, and repair financing across Texas. Free to use. No pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{
              display: "inline-block",
              backgroundColor: "#76b900",
              color: "#000000",
              fontWeight: 800,
              fontSize: "1rem",
              padding: "16px 36px",
              borderRadius: "6px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(118,185,0,0.4)",
            }} className="hover:opacity-90">
              Request Help Now →
            </Link>
            <Link href="/guides" style={{
              display: "inline-block",
              backgroundColor: "transparent",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "16px 32px",
              borderRadius: "6px",
              border: "2px solid rgba(255,255,255,0.35)",
              textDecoration: "none",
            }} className="hover:border-white hover:bg-white/10">
              Free Homeowner Guides
            </Link>
          </div>

          {/* City badges */}
          <div style={{ marginTop: "36px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {["Houston", "Dallas", "San Antonio", "Austin", "Fort Worth"].map((city) => (
              <Link key={city} href={`/${city.toLowerCase().replace(" ", "-")}`} style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.78rem",
                padding: "5px 12px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.2)",
                textDecoration: "none",
                backgroundColor: "rgba(255,255,255,0.05)",
              }} className="hover:text-white hover:border-white/50">
                📍 {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
              What We Cover
            </p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "12px" }}>
              How We Help Texas Homeowners After Storm Damage
            </h2>
            <p style={{ color: "#6b7280", maxWidth: "520px", margin: "0 auto", fontSize: "0.95rem" }}>
              From emergency storm response to long-term repair planning — explore the areas where we can connect you with guidance and resources.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Live News Strip */}
      <NewsStrip
        guides={recentGuides}
        stormAlert={{
          level: "slight",
          text: "⚠️ Active Flood Warning — Corpus Christi area through June 5. Flash Flood Warning in Midland/Odessa (winding down). No severe threats to Dallas, Houston, San Antonio, or Austin today.",
        }}
      />

      <TrustSection />

      {/* Service Areas */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
              Where We Serve
            </p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800, marginBottom: "10px" }}>
              Serving Texas Homeowners Statewide
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", maxWidth: "560px", margin: "0 auto" }}>
              Whether you&apos;ve had hail damage in Houston, wind damage in Dallas, or need HVAC repair after a storm in San Antonio — Texas Property Help connects you with licensed, vetted contractors and free guidance, no matter where in Texas you live.
            </p>
          </div>

          {/* Major Cities */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Major Cities</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                { name: "Houston", href: "/houston" },
                { name: "Dallas", href: "/dallas" },
                { name: "Fort Worth", href: "/fort-worth" },
                { name: "San Antonio", href: "/san-antonio" },
                { name: "Austin", href: "/austin" },
                { name: "El Paso", href: "/el-paso" },
                { name: "Corpus Christi", href: "/corpus-christi" },
                { name: "Lubbock", href: "/lubbock" },
                { name: "Amarillo", href: "/amarillo" },
                { name: "Laredo", href: "/laredo" },
              ].map((city) => (
                <Link key={city.href} href={city.href} style={{
                  backgroundColor: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  padding: "7px 16px",
                  borderRadius: "100px",
                  textDecoration: "none",
                }}>
                  📍 {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mid-size Cities */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Mid-Size Cities</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                "Killeen", "Waco", "Temple", "Abilene", "Midland", "Odessa",
                "Tyler", "Beaumont", "McAllen", "Wichita Falls", "Round Rock",
                "Georgetown", "Cedar Park", "Leander", "New Braunfels", "Kyle",
                "Conroe", "League City", "Pearland", "Sugar Land", "Katy",
              ].map((city) => (
                <span key={city} style={{
                  backgroundColor: "#f9fafb",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  fontSize: "0.82rem",
                  padding: "5px 13px",
                  borderRadius: "100px",
                }}>
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Small Towns & Military */}
          <div>
            <p style={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Small Towns & Military Communities</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                "Waxahachie", "Weatherford", "Granbury", "Stephenville", "Kerrville",
                "Seguin", "Pflugerville", "Baytown", "Pasadena", "Harlingen",
                "Edinburg", "Mission", "Copperas Cove", "Harker Heights", "Belton",
                "Buda", "Pflugerville", "Hutto", "Bastrop", "Lockhart",
                "Fort Cavazos", "Fort Sam Houston", "Fort Bliss",
              ].map((city) => (
                <span key={city} style={{
                  backgroundColor: "#f9fafb",
                  color: "#6b7280",
                  border: "1px solid #e5e7eb",
                  fontSize: "0.78rem",
                  padding: "4px 11px",
                  borderRadius: "100px",
                }}>
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles — auto-generated daily */}
      {recentPosts.length > 0 && (
        <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                  Updated Daily
                </p>
                <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800, margin: 0 }}>
                  Latest Texas Property News &amp; Tips
                </h2>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "8px", margin: "8px 0 0" }}>
                  Daily articles on storm damage, roofing, insurance, HVAC &amp; financing — for Texas homeowners across 20+ cities.
                </p>
              </div>
              <Link href="/updates" style={{ color: "#76b900", fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none", whiteSpace: "nowrap" }}>
                All articles →
              </Link>
            </div>

            {/* Featured article (first, large) */}
            {recentPosts[0] && (() => {
              const p = recentPosts[0];
              const cat = CATEGORY_META[p.category];
              const date = new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              return (
                <Link
                  href={`/updates/${p.slug}`}
                  style={{ display: "block", textDecoration: "none", marginBottom: "24px" }}
                >
                  <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e5e7eb", display: "flex", flexDirection: "row", minHeight: "220px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    {/* Image or color block */}
                    <div style={{ width: "340px", flexShrink: 0, position: "relative", backgroundColor: cat.bg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "220px" }}>
                      {p.imageUrl ? (
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="340px"
                        />
                      ) : (
                        <span style={{ fontSize: "4rem", opacity: 0.4 }}>
                          {p.category === "roofing" ? "🏠" : p.category === "weather" ? "⛈️" : p.category === "hvac" ? "🌡️" : p.category === "financing" ? "💳" : p.category === "insurance-claims" ? "📄" : "🔧"}
                        </span>
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ backgroundColor: cat.bg, color: cat.color, fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {cat.label}
                        </span>
                        {p.city && (
                          <span style={{ color: "#76b900", fontSize: "0.8rem", fontWeight: 600 }}>
                            📍 {p.city}, TX
                          </span>
                        )}
                        <span style={{ color: "#9ca3af", fontSize: "0.78rem" }}>{date} · {p.readTime}</span>
                      </div>
                      <h3 style={{ color: "#111827", fontSize: "1.15rem", fontWeight: 800, lineHeight: 1.35, margin: "0 0 10px" }}>
                        {p.title}
                      </h3>
                      <p style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 16px" }}>
                        {p.summary.slice(0, 150)}{p.summary.length > 150 ? "…" : ""}
                      </p>
                      <span style={{ color: "#76b900", fontWeight: 700, fontSize: "0.875rem" }}>
                        Read article →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })()}

            {/* Grid: remaining 5 articles */}
            {recentPosts.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {recentPosts.slice(1, 6).map((p) => {
                  const cat  = CATEGORY_META[p.category];
                  const date = new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  return (
                    <Link
                      key={p.slug}
                      href={`/updates/${p.slug}`}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div style={{ borderRadius: "10px", border: "1px solid #e5e7eb", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "box-shadow .15s" }}>
                        {/* Image / color banner */}
                        <div style={{ height: "140px", backgroundColor: cat.bg, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {p.imageUrl ? (
                            <Image
                              src={p.imageUrl}
                              alt={p.title}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          ) : (
                            <span style={{ fontSize: "2.5rem", opacity: 0.35 }}>
                              {p.category === "roofing" ? "🏠" : p.category === "weather" ? "⛈️" : p.category === "hvac" ? "🌡️" : p.category === "financing" ? "💳" : p.category === "insurance-claims" ? "📄" : "🔧"}
                            </span>
                          )}
                          {/* Category badge over image */}
                          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                            <span style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.04em", backdropFilter: "blur(4px)" }}>
                              {cat.label}
                            </span>
                          </div>
                        </div>
                        {/* Text */}
                        <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", gap: "6px", marginBottom: "8px", alignItems: "center", flexWrap: "wrap" }}>
                            {p.city && <span style={{ color: "#76b900", fontSize: "0.72rem", fontWeight: 700 }}>📍 {p.city}</span>}
                            <span style={{ color: "#9ca3af", fontSize: "0.72rem" }}>{date} · {p.readTime}</span>
                          </div>
                          <h3 style={{ color: "#111827", fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 8px", flex: 1 }}>
                            {p.title}
                          </h3>
                          <span style={{ color: "#76b900", fontSize: "0.8rem", fontWeight: 600, marginTop: "auto" }}>
                            Read →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recent Guides */}
      <section style={{ backgroundColor: "#111827" }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                Latest Resources
              </p>
              <h2 style={{ color: "#ffffff", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800, margin: 0 }}>
                Recent Homeowner Guides
              </h2>
            </div>
            <Link href="/guides" style={{ color: "#76b900", fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none" }}>
              All guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGuides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Q&A */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                Texas Homeowners Ask
              </p>
              <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800, margin: 0 }}>
                Real Storm Damage &amp; Insurance Questions
              </h2>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "8px" }}>
                Real questions from Texas homeowners navigating hail damage, adjuster disputes, and contractor decisions — answered by our team.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                topic: "Insurance Claim",
                location: "Texas Homeowner",
                source: "r/Insurance",
                question: "My Allstate claim has been going 14 rounds — adjuster showed up in khakis with no gear, claim got closed below deductible, now I have open plywood on my roof. What do I do?",
                answer: "File a complaint with the Texas Department of Insurance (TDI) — free, takes 15 minutes, and insurers are required to respond. Document every call with date, time, and rep name. Get your contractor to write a damage assessment on letterhead showing original vs. deteriorated damage. This is textbook bad faith handling.",
                color: "#ef4444",
              },
              {
                topic: "Storm Damage",
                location: "Houston Area",
                source: "r/homeowners",
                question: "After hail — should I call my insurance company or the roofer first?",
                answer: "Call a roofer first. Have a local contractor inspect and document the damage before you file a claim. If the adjuster visits without your documentation, they'll write the minimum estimate. Also: every claim goes into your CLUE report and can raise your premium 20–40% for 3–5 years.",
                color: "#76b900",
              },
              {
                topic: "Hail Damage",
                location: "DFW Homeowner",
                source: "r/homeowners",
                question: "Insurance says my roof damage is wear and tear, not hail. My roofer says otherwise. What now?",
                answer: "Request a re-inspection and have your contractor present. Ask the adjuster specifically about 'mechanical damage' vs 'cosmetic damage' — that distinction is key for hail claims. If they still disagree, check your policy for an appraisal clause — it lets both sides hire independent appraisers without going to court.",
                color: "#f59e0b",
              },
              {
                topic: "Insurance Claim",
                location: "San Antonio Homeowner",
                source: "r/Insurance",
                question: "My insurer is demanding an engineering report before paying my storm claim — quoted $900+. Is this normal?",
                answer: "This is a known delay tactic. Ask them in writing: what exactly qualifies as the report, who can write it, and will they reimburse the cost. File a TDI complaint if they've been stalling over 30 days — Texas law requires claims to be resolved within specific timeframes.",
                color: "#3b82f6",
              },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderTop: `4px solid ${item.color}`,
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}40`, fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "100px" }}>
                    {item.topic}
                  </span>
                  <span style={{ backgroundColor: "#f3f4f6", color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, padding: "3px 10px", borderRadius: "100px" }}>
                    📍 {item.location}
                  </span>
                  <span style={{ backgroundColor: "#fff7ed", color: "#c2410c", fontSize: "0.75rem", fontWeight: 600, padding: "3px 10px", borderRadius: "100px" }}>
                    {item.source}
                  </span>
                </div>
                <p style={{ color: "#111827", fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "14px" }}>
                  ❓ {item.question}
                </p>
                <div style={{ borderLeft: `3px solid ${item.color}`, paddingLeft: "14px" }}>
                  <p style={{ color: "#4b5563", fontSize: "0.85rem", lineHeight: 1.75, margin: 0 }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/faq" style={{
              display: "inline-block",
              backgroundColor: "white",
              color: "#111827",
              border: "1px solid #e5e7eb",
              fontWeight: 600,
              fontSize: "0.875rem",
              padding: "12px 28px",
              borderRadius: "6px",
              textDecoration: "none",
            }}>
              See All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={homeFaqs} heading="Common Questions About Texas Property Help" />

      <CTASection
        heading="Have Storm Damage? Get Texas-Specific Help Now."
        subheading="Submit a quick request and we'll match you with vetted, TDLR-licensed Texas contractors and free guidance — storm damage, roofing, HVAC, insurance claims, or repair financing. Takes 2 minutes. Always free."
        primaryLabel="Request Help Now"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}


