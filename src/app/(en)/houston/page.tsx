import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Houston Storm & Hail Damage Help | Free TX Guide",
  description:
    "Free help for Houston homeowners after hail, hurricane, or flood damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim. Bilingual EN/ES service.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/houston",
    languages: {
      "en-US": "https://texaspropertyhelp.com/houston",
      "x-default": "https://texaspropertyhelp.com/houston",
    },
  },
  openGraph: {
    title: "Houston Storm Damage Help — Free Roofing, HVAC & Insurance Claim Guidance",
    description:
      "Free help for Houston homeowners after hail, hurricane, or flood damage. Connect with TDLR-licensed contractors and get insurance claim guidance. EN/ES.",
    url: "https://texaspropertyhelp.com/houston",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://texaspropertyhelp.com/images/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Houston Storm Damage Help — Texas Property Help",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/houston#localbusiness",
  "name": "Texas Property Help — Houston",
  "url": "https://texaspropertyhelp.com/houston",
  "description":
    "Free homeowner assistance platform serving Houston, TX. Storm damage, roofing, HVAC, insurance claims. Bilingual English/Spanish service.",
  "areaServed": [
    { "@type": "City", "name": "Houston", "containedInPlace": { "@type": "State", "name": "Texas" } },
    { "@type": "City", "name": "Pasadena" },
    { "@type": "City", "name": "Pearland" },
    { "@type": "City", "name": "Sugar Land" },
    { "@type": "City", "name": "Katy" },
    { "@type": "City", "name": "The Woodlands" },
    { "@type": "City", "name": "League City" },
    { "@type": "City", "name": "Baytown" },
    { "@type": "City", "name": "Humble" },
    { "@type": "City", "name": "Conroe" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const houstonFaqs: FAQItem[] = [
  {
    question: "Does homeowners insurance cover hurricane and tropical storm damage in Houston?",
    answer:
      "Most standard homeowners policies cover wind damage from hurricanes — but flood damage from storm surge or rising water is NOT covered. You need a separate flood insurance policy through the NFIP (National Flood Insurance Program) or a private flood insurer. If you're near Galveston Bay or in a FEMA flood zone, this distinction is critical. Additionally, Houston-area homeowners near the coast may need separate windstorm coverage through TWIA (Texas Windstorm Insurance Association).",
  },
  {
    question: "What areas around Houston do you serve?",
    answer:
      "We serve the entire Greater Houston metro area including Harris County, Fort Bend County, Montgomery County, Galveston County, and Brazoria County — covering Pasadena, Pearland, Sugar Land, Katy, The Woodlands, Humble, Baytown, League City, Conroe, Galveston, and all surrounding communities.",
  },
  {
    question: "How do I know if my Houston roof damage is from hail or normal wear?",
    answer:
      "Hail damage on asphalt shingles appears as bruising — soft spots that feel like a thumbprint when pressed — along with granule loss (the sand-like coating), cracked or punctured shingles, and dents on gutters, flashing, or HVAC equipment. Normal wear shows as uniform aging, cracked caulk, or moss growth without impact marks. Have a licensed TDLR contractor inspect before your insurance adjuster visits — their independent documentation is your most important protection.",
  },
  {
    question: "Can I get help in Spanish in Houston?",
    answer:
      "Yes. Houston has one of the largest Spanish-speaking populations in Texas. We offer fully bilingual service — visit texaspropertyhelp.com/es or select Spanish when submitting your request, and we'll connect you with Spanish-speaking contractors and resources.",
  },
  {
    question: "My Houston insurance adjuster says the storm damage is under my deductible. What can I do?",
    answer:
      "First, get a written estimate from a licensed independent contractor — not the insurer's preferred vendor. If there's a significant gap, you can request a re-inspection with your contractor present, invoke the appraisal clause in your policy (a neutral umpire resolves disputes without litigation), hire a licensed public adjuster to negotiate on your behalf, or file a complaint with the Texas Department of Insurance at 800-252-3439. Don't accept a low settlement before exploring these options.",
  },
  {
    question: "Are there specific roofing requirements in Houston and Harris County?",
    answer:
      "Yes. Harris County and the City of Houston have specific building codes that affect roofing work, especially for replacements after storm damage. All roofing contractors must hold an active TDLR license — verify any contractor at license.tdlr.texas.gov. After major storms, unvetted 'storm chasers' from out of state flood the Houston area. Only work with locally licensed crews who can pull proper permits.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": houstonFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

export default function HoustonPage() {
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

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            📍 Houston, Texas
          </p>
          <h1
            style={{
              color: "white",
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Houston Storm Damage Help —<br />
            <span style={{ color: "var(--accent)" }}>Free, Fast, and Pressure-Free</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Houston homeowners face hail, hurricanes, flooding, and brutal HVAC demand year-round. Texas Property Help connects you with vetted, TDLR-licensed contractors and free insurance claim guidance — no commissions, no pressure. Bilingual English &amp; Spanish service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Houston →
            </Link>
            <Link href="/es" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)" }}>
              Ver en Español
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ backgroundColor: "#111827" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "#1", label: "Most storm-impacted major U.S. city by insurance losses" },
            { stat: "$125B", label: "Hurricane Harvey damage in the Houston area (2017)" },
            { stat: "40%+", label: "Houston residents who speak Spanish at home" },
            { stat: "Free", label: "To submit a homeowner request — no cost, no pressure" },
          ].map((item) => (
            <div key={item.stat}>
              <p style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 4px" }}>{item.stat}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Houston storm context */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>
            Why Houston Homeowners Face a Unique Storm Risk
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Houston sits at the intersection of Gulf Coast hurricane exposure and North Texas hail corridor — making it one of the most storm-damaged metro areas in the United States. The Greater Houston area averages more than 50 hail events per year. The Gulf Coast location means tropical storms and hurricanes arrive with little warning. And the city&apos;s bayou-laced geography means flooding can occur even miles from the coast.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            After Hurricane Harvey in 2017 — which dropped more than 60 inches of rain on the Houston area and caused over $125 billion in damage — tens of thousands of homeowners discovered gaps in their coverage they didn&apos;t know existed. Standard homeowners policies do not cover flood damage. TWIA windstorm coverage gaps left coastal homeowners without payouts. Unlicensed &quot;storm chaser&quot; contractors flooded the area and disappeared with deposits.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Texas Property Help was built to prevent exactly these situations — connecting Houston homeowners with accurate information, verified contractors, and claim guidance before costly mistakes happen.
          </p>
        </div>
      </section>

      {/* Houston storm types */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "8px" }}>
            Storm Damage Types in Houston — What&apos;s Covered and What Isn&apos;t
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "32px" }}>
            Understanding your coverage before a storm is the difference between a full payout and a denied claim.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🌪️",
                title: "Hurricane & Tropical Storm Damage",
                color: "#ef4444",
                body: "Wind damage from hurricanes is typically covered under standard homeowners policies — but storm surge flooding is not. If you're in a coastal Harris County or Galveston County area, you may need a separate TWIA windstorm policy. Verify your coverage now, not after the storm.",
              },
              {
                icon: "🌧️",
                title: "Flood Damage",
                color: "#3b82f6",
                body: "Houston's flat terrain and extensive bayou system make flooding a year-round risk, not just a hurricane risk. Standard homeowners insurance does NOT cover flood damage. You need a separate NFIP policy through FloodSmart.gov or a private flood insurer. This gap devastated thousands of Harvey victims.",
              },
              {
                icon: "⛈️",
                title: "Hail Damage",
                color: "#f59e0b",
                body: "Houston averages 50+ hail events per year. Hail damages roofs, gutters, siding, and HVAC condenser units — often without visible damage from the ground. Most standard policies cover hail, but your wind/hail deductible applies first (typically 1–3% of your home's insured value, or $3,000–$9,000 on a $300K home).",
              },
              {
                icon: "❄️",
                title: "HVAC Storm Damage",
                color: "#76b900",
                body: "Outdoor HVAC condenser units are frequently damaged by hail and storm debris — and frequently overlooked when filing claims. This damage is typically covered under your dwelling or other-structures coverage. Inspect your outdoor unit after every significant storm and document damage promptly.",
              },
            ].map((item) => (
              <div key={item.title} style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderTop: `4px solid ${item.color}`,
                borderRadius: "8px",
                padding: "24px",
              }}>
                <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "10px" }}>{item.icon}</span>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we help */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>
            How Texas Property Help Works for Houston Homeowners
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", marginBottom: "36px" }}>
            No pressure. No middlemen. No cost to you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "⛈️",
                title: "Hurricane & Storm Damage",
                body: "We help you document damage correctly before your insurer's adjuster arrives, connect you with licensed restoration contractors, and walk you through your coverage options — including TWIA and flood policy issues specific to Houston.",
                href: "/storm-damage",
              },
              {
                icon: "🏠",
                title: "Roofing Help",
                body: "From post-storm emergency tarping to full roof replacement — we connect you with TDLR-licensed roofing professionals who know Harris County permit requirements and can deliver written estimates before you sign anything.",
                href: "/roofing",
              },
              {
                icon: "❄️",
                title: "HVAC Help",
                body: "Houston summers demand reliable AC. Emergency repairs, storm-damaged condenser unit assessment, and system replacement options. We help you determine if damage is insurance-covered before you pay out of pocket.",
                href: "/hvac",
              },
              {
                icon: "📋",
                title: "Insurance Claim Help",
                body: "Step-by-step guidance from filing your claim to reviewing the settlement — including ACV vs. RCV policy differences, supplemental claims, and what to do if your adjuster underpays or denies your claim.",
                href: "/insurance-claims",
              },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                style={{
                  display: "block",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "24px",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "10px" }}>{s.icon}</span>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Houston contractor vetting */}
      <section style={{ backgroundColor: "#111827" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "12px" }}>
            Avoid Storm Chaser Contractors in Houston
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "24px" }}>
            After every major storm, Houston is flooded with out-of-town contractors — crews who arrive quickly, pressure homeowners into signing contracts, collect deposits, and disappear before the warranty work is needed. These &quot;storm chasers&quot; caused billions in unresolved claims and shoddy repairs after Hurricane Harvey.
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "24px" }}>
            Texas law requires roofing contractors to hold an active TDLR license. Verify any contractor at{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>license.tdlr.texas.gov</span>{" "}
            before signing anything.
          </p>
          <div style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "24px", marginBottom: "24px" }}>
            <h3 style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
              ⚠️ Red Flags — Walk Away From Any Contractor Who:
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Offers to waive or rebate your deductible — this is illegal under Texas law",
                "Asks you to sign an Assignment of Benefits (AOB) before your claim is filed",
                "Cannot provide a TDLR license number or local business address",
                "Uses high-pressure same-day tactics with no written estimate",
                "Cannot show proof of general liability insurance and workers' compensation",
                "Asks for a large cash deposit before any work is permitted or scheduled",
              ].map((flag) => (
                <li key={flag} style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", padding: "8px 0 8px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", lineHeight: 1.6 }}>
                  <span style={{ position: "absolute", left: 0, top: "10px", color: "#ef4444", fontWeight: 700 }}>✗</span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", lineHeight: 1.7 }}>
            Texas Property Help only connects Houston homeowners with pre-vetted, TDLR-licensed contractors with verified local presence, active insurance, and documented track records in the Houston metro area.
          </p>
        </div>
      </section>

      {/* Areas served */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>
            Houston Metro Areas We Serve
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", marginBottom: "28px" }}>
            Covering Harris County and all surrounding counties
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {[
              "Houston (all zip codes)", "Katy", "Sugar Land", "The Woodlands",
              "Pearland", "League City", "Baytown", "Pasadena",
              "Humble", "Conroe", "Spring", "Cypress",
              "Friendswood", "Missouri City", "Stafford", "Galveston",
              "Clear Lake", "Webster", "Deer Park", "La Porte",
              "Tomball", "Magnolia", "Kingwood", "Atascocita",
            ].map((area) => (
              <span
                key={area}
                style={{
                  backgroundColor: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: "100px",
                }}
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Guide CTA */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "28px 32px",
            display: "flex",
            gap: "24px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}>
            <div>
              <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "6px" }}>
                Houston Homeowner Resource
              </p>
              <h3 style={{ color: "#111827", fontWeight: 800, fontSize: "1.1rem", marginBottom: "6px" }}>
                Hail Damage in Houston, TX — What Homeowners Need to Know
              </h3>
              <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
                Step-by-step guide covering inspection, documentation, insurance filing, and contractor selection for Houston hail events.
              </p>
            </div>
            <Link
              href="/guides/hail-damage-houston-tx"
              style={{
                display: "inline-block",
                backgroundColor: "#111827",
                color: "white",
                fontWeight: 700,
                fontSize: "0.875rem",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Read the Guide →
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={houstonFaqs} heading="Houston Homeowner Questions — Answered" />

      <CTASection
        heading="Houston Homeowner? Get Help Now."
        subheading="Storm damage, roofing, HVAC, or insurance questions — submit your request and we'll connect you with vetted, TDLR-licensed contractors and free guidance in the Houston area. Takes 2 minutes. Always free."
        primaryLabel="Request Help in Houston"
        secondaryLabel="Read Houston Hail Damage Guide"
        secondaryHref="/guides/hail-damage-houston-tx"
      />
    </>
  );
}
