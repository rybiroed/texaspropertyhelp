import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Dallas Storm Damage Help — Free Hail, Roofing & Insurance Claim Guidance",
  description:
    "Free help for Dallas-Fort Worth homeowners after hail, tornado, or wind damage. Connect with vetted, TDLR-licensed DFW contractors and navigate your insurance claim. Fast, no pressure.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/dallas",
    languages: {
      "en-US": "https://texaspropertyhelp.com/dallas",
      "x-default": "https://texaspropertyhelp.com/dallas",
    },
  },
  openGraph: {
    title: "Dallas Storm Damage Help — Free Hail, Roofing & Insurance Claim Guidance",
    description:
      "Free help for Dallas-Fort Worth homeowners after hail, tornado, or wind damage. Connect with TDLR-licensed DFW contractors and get insurance claim guidance.",
    url: "https://texaspropertyhelp.com/dallas",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://texaspropertyhelp.com/images/home-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Dallas Storm Damage Help — Texas Property Help",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/dallas#localbusiness",
  "name": "Texas Property Help — Dallas",
  "url": "https://texaspropertyhelp.com/dallas",
  "description":
    "Free homeowner assistance platform serving Dallas-Fort Worth, TX. Storm damage, roofing, HVAC, insurance claims.",
  "areaServed": [
    { "@type": "City", "name": "Dallas", "containedInPlace": { "@type": "State", "name": "Texas" } },
    { "@type": "City", "name": "Fort Worth" },
    { "@type": "City", "name": "Arlington" },
    { "@type": "City", "name": "Plano" },
    { "@type": "City", "name": "Irving" },
    { "@type": "City", "name": "Garland" },
    { "@type": "City", "name": "Frisco" },
    { "@type": "City", "name": "McKinney" },
    { "@type": "City", "name": "Denton" },
    { "@type": "City", "name": "Allen" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const dallasFaqs: FAQItem[] = [
  {
    question: "How do I know if my DFW roof has hail damage worth filing a claim for?",
    answer:
      "Hail damage on asphalt shingles shows as bruising — soft spots that feel like a thumbprint, granule loss (the sandy coating), cracked or missing shingles, and impact dents on gutters, flashing, or HVAC equipment. Even if your roof looks fine from the ground, a licensed contractor inspection can reveal hidden damage. Have a TDLR-licensed contractor document damage before your insurance adjuster visits — their written estimate is your strongest protection against a low settlement.",
  },
  {
    question: "My DFW insurance company is calling hail damage 'cosmetic' — what does that mean?",
    answer:
      "Many Texas insurers have added cosmetic damage exclusions to newer policies, particularly in DFW. These clauses limit or eliminate coverage for hail damage that affects appearance but not function — like dented metal roofing or gutters. However, if hail damage compromises the waterproofing layer of your shingles or leads to accelerated aging, it's functional damage and should be covered. Have your contractor document the functional impact specifically. If the insurer disputes it, you can invoke the appraisal clause or file a complaint with TDI.",
  },
  {
    question: "DFW gets tornado warnings regularly — does homeowners insurance cover tornado damage?",
    answer:
      "Yes. Wind damage from tornadoes is covered under standard Texas homeowners policies. However, your wind/hail deductible applies (typically 1–3% of your home's insured value). After a tornado, document all damage immediately with photos and video before making any temporary repairs. Emergency temporary repairs — tarping, boarding — are required by your policy to prevent further damage and are reimbursable.",
  },
  {
    question: "What is the typical wind/hail deductible for Dallas area homes?",
    answer:
      "Most Dallas-area homeowners carry a separate wind and hail deductible of 1–3% of the home's insured replacement cost. On a $400,000 home (close to the DFW median), that means a $4,000–$12,000 out-of-pocket cost before your insurer pays anything. Review your declarations page to find your exact deductible — it's separate from your all-other-perils deductible.",
  },
  {
    question: "What areas in the DFW metroplex do you serve?",
    answer:
      "We serve the entire Dallas-Fort Worth Metroplex across Dallas County, Tarrant County, Collin County, Denton County, and surrounding areas — including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Allen, Richardson, Carrollton, Grand Prairie, Mesquite, Denton, Mansfield, Euless, Bedford, Grapevine, Southlake, Flower Mound, and Lewisville.",
  },
  {
    question: "How do I verify a Dallas-area roofing contractor's license?",
    answer:
      "Texas requires roofing contractors to hold an active TDLR (Texas Department of Licensing and Regulation) license. Verify any contractor at license.tdlr.texas.gov before signing anything. After major DFW hail events, the area fills with unlicensed storm chasers from out of state — verifying licensure is the single most important step before hiring. Also confirm the contractor carries general liability insurance and workers' compensation.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": dallasFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

export default function DallasPage() {
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
            📍 Dallas – Fort Worth, Texas
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
            Dallas Hail &amp; Storm Damage Help —<br />
            <span style={{ color: "var(--accent)" }}>Free, Fast, and Pressure-Free</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            The DFW Metroplex leads Texas in hail insurance claims. After hail, tornadoes, or wind damage, Texas Property Help connects Dallas-Fort Worth homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance — no commissions, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Dallas →
            </Link>
            <Link href="/guides" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)" }}>
              Free Homeowner Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ backgroundColor: "#111827" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "#1", label: "DFW ranks as the most hail-impacted metro in the U.S. by claim volume" },
            { stat: "$2B+", label: "Estimated damage from April 2021 DFW hailstorm alone" },
            { stat: "1–3%", label: "Typical wind/hail deductible — up to $12,000+ on a $400K home" },
            { stat: "Free", label: "To submit a homeowner request — no cost, no pressure" },
          ].map((item) => (
            <div key={item.stat}>
              <p style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 4px" }}>{item.stat}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DFW storm context */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>
            Why Dallas-Fort Worth Leads Texas in Hail Claims
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            The Dallas-Fort Worth Metroplex sits squarely in the heart of Tornado Alley and the Texas hail corridor — a geographic reality that makes DFW homeowners among the most storm-exposed in the nation. The region averages more than 70 hail days per year, and several of the costliest hailstorms in U.S. history have hit the DFW area, including the April 2021 event that produced softball-sized hail across Tarrant and Dallas counties and caused an estimated $2 billion in damage.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Unlike Houston, DFW homeowners don&apos;t face hurricane or coastal flooding risks — but tornadoes, straight-line winds exceeding 100 mph, and large hail create severe and recurring damage to roofs, HVAC systems, siding, fencing, and vehicles across the entire metro.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8 }}>
            After every major storm, DFW is flooded with unlicensed &quot;storm chaser&quot; contractors who pressure homeowners into signing contracts before damage is properly assessed. Understanding your coverage — and your rights — before a storm hits is the most important step any DFW homeowner can take.
          </p>
        </div>
      </section>

      {/* Dallas storm types */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "8px" }}>
            DFW Storm Damage Types — What&apos;s Covered and What to Watch For
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "32px" }}>
            North Texas storm damage is predictable — but insurance coverage has traps that catch unprepared homeowners.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "⛈️",
                title: "Hail Damage",
                color: "#f59e0b",
                body: "DFW hail can range from pea-sized to softball-sized in the same storm. Even smaller hail — 1 inch or more — damages asphalt shingles by knocking off the protective granule coating, reducing the roof's expected lifespan by years. Most DFW policies cover hail, but watch for cosmetic damage exclusions in newer policies that limit payouts for dents and dings without functional compromise.",
              },
              {
                icon: "🌪️",
                title: "Tornado & Wind Damage",
                color: "#ef4444",
                body: "DFW averages more tornado watches and warnings than any other major U.S. metro. Wind damage from tornadoes, microbursts, and straight-line winds is covered under standard homeowners insurance — but your wind/hail deductible applies first. After any tornado event, document all exterior damage before making temporary repairs, even if the house appears structurally sound.",
              },
              {
                icon: "🌧️",
                title: "Water Intrusion from Storm Damage",
                color: "#3b82f6",
                body: "Rainwater entering your home through a storm-damaged roof, broken window, or wind-torn siding is typically covered under your homeowners policy — because the wind or hail damage came first. However, backup from sewer or drain overflows requires separate coverage. And rising water from heavy rain or creek flooding requires a separate flood insurance policy.",
              },
              {
                icon: "❄️",
                title: "HVAC Storm Damage",
                color: "#76b900",
                body: "Hail damage to outdoor HVAC condenser units is one of the most commonly overlooked insurance claims in DFW. Dents and damage to fins, coils, and refrigerant lines are often covered under dwelling or other-structures coverage. Inspect your outdoor AC unit after every significant hail event and photograph any visible damage before it's repaired.",
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
            How Texas Property Help Works for DFW Homeowners
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", marginBottom: "36px" }}>
            No pressure. No middlemen. No cost to you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "⛈️",
                title: "Hail & Storm Damage",
                body: "We help you document damage correctly — before your insurer's adjuster visits. Contractor inspections before adjuster visits are the single biggest factor in claim outcome. We connect you with licensed DFW contractors fast.",
                href: "/storm-damage",
              },
              {
                icon: "🏠",
                title: "Roofing Help",
                body: "From emergency tarping to full replacement — connect with TDLR-licensed roofers who know Dallas and Tarrant County permit requirements and can provide written estimates before you sign anything.",
                href: "/roofing",
              },
              {
                icon: "❄️",
                title: "HVAC Help",
                body: "DFW summers are brutal. Emergency repair referrals, storm-damaged condenser unit assessments, and replacement options. We help determine if your damage is insurance-covered before you pay out of pocket.",
                href: "/hvac",
              },
              {
                icon: "📋",
                title: "Insurance Claim Help",
                body: "Step-by-step claim guidance from filing to settlement — ACV vs. RCV policy differences, the appraisal clause, supplemental claims, and what to do if your DFW adjuster underpays or adds a cosmetic exclusion.",
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

      {/* DFW Insurance tips */}
      <section style={{ backgroundColor: "#111827" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "12px" }}>
            DFW Hail Claims — What Homeowners Need to Know
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "28px" }}>
            The Dallas-Fort Worth insurance market has evolved significantly after years of high claim volume. Here&apos;s what experienced DFW homeowners know before filing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: "Get a contractor estimate FIRST",
                body: "Have a licensed TDLR contractor document and photograph damage before your insurance adjuster visits. Adjusters who arrive without contractor documentation on file tend to produce lower estimates — especially for gutters, siding, fascia, and HVAC.",
              },
              {
                title: "Know your wind/hail deductible",
                body: "Most DFW policies have a separate wind and hail deductible of 1–3% of insured value. On a $400K home, that's $4,000–$12,000. Review your declarations page now so you're not surprised after a storm.",
              },
              {
                title: "Understand ACV vs. RCV",
                body: "ACV (Actual Cash Value) policies subtract depreciation — an aging DFW roof may get a fraction of replacement cost. RCV (Replacement Cost Value) pays what it actually costs to replace with new materials. Your settlement outcome depends heavily on which you have.",
              },
              {
                title: "Watch for cosmetic exclusion clauses",
                body: "Many new DFW homeowners policies contain cosmetic damage exclusions that limit payouts for hail dents that affect appearance but not structure. Have your contractor specifically document functional damage — compromised granules, cracked shingles, damaged waterproofing layers.",
              },
            ].map((item) => (
              <div key={item.title} style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "20px 24px",
              }}>
                <h3 style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "8px" }}>✓ {item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>
            DFW Communities We Serve
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", marginBottom: "28px" }}>
            Covering Dallas, Tarrant, Collin, Denton, and surrounding counties
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {[
              "Dallas", "Fort Worth", "Arlington", "Plano", "Irving",
              "Garland", "Frisco", "McKinney", "Allen", "Richardson",
              "Carrollton", "Grand Prairie", "Mesquite", "Denton", "Mansfield",
              "Euless", "Bedford", "Grapevine", "Southlake", "Flower Mound",
              "Lewisville", "Rowlett", "Rockwall", "Duncanville", "Cedar Hill",
              "Wylie", "Sachse", "Murphy", "Burleson", "Keller",
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

      <FAQ items={dallasFaqs} heading="Dallas-Fort Worth Homeowner Questions — Answered" />

      <CTASection
        heading="DFW Homeowner? Get the Right Help."
        subheading="Storm damage, roofing, HVAC, or insurance questions — submit your request and we'll connect you with vetted, TDLR-licensed DFW contractors and free guidance. Takes 2 minutes. Always free."
        primaryLabel="Request Help in Dallas"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
