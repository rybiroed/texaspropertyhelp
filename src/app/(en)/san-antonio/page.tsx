import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "San Antonio Storm Damage Help | Free TX Guide",
  description:
    "Free help for San Antonio homeowners after hail, storm, or wind damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim. Bilingual EN/ES service.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/san-antonio",
    languages: {
      "en-US": "https://texaspropertyhelp.com/san-antonio",
      "x-default": "https://texaspropertyhelp.com/san-antonio",
    },
  },
  openGraph: {
    title: "San Antonio Storm Damage Help — Free Roofing, HVAC & Insurance Claim Guidance",
    description:
      "Free help for San Antonio homeowners after hail, storm, or wind damage. Connect with TDLR-licensed contractors and get insurance claim guidance. EN/ES.",
    url: "https://texaspropertyhelp.com/san-antonio",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630, alt: "San Antonio Storm Damage Help" }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/san-antonio#localbusiness",
  "name": "Texas Property Help — San Antonio",
  "url": "https://texaspropertyhelp.com/san-antonio",
  "description": "Free homeowner assistance platform serving San Antonio, TX. Storm damage, roofing, HVAC, insurance claims. Bilingual EN/ES.",
  "areaServed": [
    { "@type": "City", "name": "San Antonio", "containedInPlace": { "@type": "State", "name": "Texas" } },
    { "@type": "City", "name": "New Braunfels" },
    { "@type": "City", "name": "Schertz" },
    { "@type": "City", "name": "Converse" },
    { "@type": "City", "name": "Boerne" },
    { "@type": "City", "name": "Universal City" },
    { "@type": "City", "name": "Seguin" },
    { "@type": "City", "name": "Cibolo" },
    { "@type": "City", "name": "Helotes" },
    { "@type": "City", "name": "Leon Valley" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const saFaqs: FAQItem[] = [
  {
    question: "What types of storm damage are most common for San Antonio homeowners?",
    answer:
      "San Antonio experiences hail storms, severe thunderstorms, and flash flooding — particularly during spring storm season. Hail damage to roofing and HVAC condenser units is the most frequent claim we see from the SA area. The city also sits along flash flood corridors, and heavy rainfall events can cause water intrusion through storm-damaged roofs. Unlike the Gulf Coast, San Antonio is not a TWIA zone, so most homeowners are covered under standard policies for wind and hail.",
  },
  {
    question: "Can San Antonio homeowners get help in Spanish?",
    answer:
      "Yes. Over 60% of San Antonio residents are Hispanic or Latino, and we offer full bilingual service. Visit texaspropertyhelp.com/es or select Spanish when submitting your request and we'll connect you with Spanish-speaking contractors and resources.",
  },
  {
    question: "How do I know if my San Antonio roof has hail damage?",
    answer:
      "Hail damage shows as bruised or cracked shingles, granule loss in gutters, and impact dents on metal flashing, gutters, or AC condenser units. Many SA homeowners miss HVAC damage entirely. Have a TDLR-licensed contractor inspect before your insurance adjuster visits — their written estimate is critical to getting a fair settlement.",
  },
  {
    question: "My insurance adjuster gave a low estimate after a San Antonio hail storm. What are my options?",
    answer:
      "Get a written estimate from a licensed independent contractor and compare it against the adjuster's line-by-line. If the gap is significant, you can request a re-inspection with your contractor present, invoke the appraisal clause in your policy (a neutral umpire resolves the dispute without litigation), hire a public adjuster to negotiate on your behalf, or file a complaint with the Texas Department of Insurance at 800-252-3439.",
  },
  {
    question: "What areas around San Antonio do you serve?",
    answer:
      "We serve the entire Greater San Antonio metro area across Bexar County and surrounding counties — including New Braunfels, Schertz, Converse, Boerne, Universal City, Seguin, Cibolo, Helotes, Leon Valley, Alamo Heights, Windcrest, Kirby, Live Oak, and surrounding communities.",
  },
  {
    question: "Are there contractor scams to watch for after San Antonio storms?",
    answer:
      "Yes. After major hail events, unlicensed storm chasers target San Antonio neighborhoods door-to-door. Red flags: offering to waive your deductible (illegal under Texas law), asking you to sign an Assignment of Benefits before your claim is filed, and no TDLR license number or local address. Verify any contractor at license.tdlr.texas.gov before signing anything.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": saFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
};

export default function SanAntonioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            📍 San Antonio, Texas
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            San Antonio Storm Damage Help —<br />
            <span style={{ color: "var(--accent)" }}>Free, Fast, and Bilingual</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Hail damage, roof leaks, HVAC failures in extreme Texas heat — Texas Property Help connects San Antonio homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance. Full bilingual English &amp; Spanish service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in San Antonio →
            </Link>
            <Link href="/es" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)" }}>
              Ver en Español
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: "#111827" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "60%+", label: "SA residents who speak Spanish — fully bilingual service available" },
            { stat: "7th", label: "Largest city in the U.S. — 1.4M+ homeowner households" },
            { stat: "50+", label: "Annual hail events in the San Antonio / Bexar County area" },
            { stat: "Free", label: "To submit a homeowner request — no cost, no pressure" },
          ].map((item) => (
            <div key={item.stat}>
              <p style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 4px" }}>{item.stat}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SA storm context */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>
            San Antonio Storm Season — What Homeowners Need to Know
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            San Antonio sits at the edge of two major weather patterns — the Gulf moisture that drives spring thunderstorm activity and the dry line that produces severe hail across Central and South Texas. Bexar County averages more than 50 hail-producing storm days per year, with the highest frequency in spring (March–June).
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Unlike Houston, San Antonio homeowners are not in a TWIA windstorm zone — most standard homeowners policies cover both wind and hail, which simplifies the claim process. But SA homeowners still face the same challenges as everywhere else in Texas: wind/hail deductibles that can reach thousands of dollars, ACV vs. RCV disputes, underpaid adjuster estimates, and an influx of unlicensed storm chasers after every major event.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8 }}>
            San Antonio is also one of the most Spanish-speaking cities in the United States, and many homeowners navigating insurance claims and contractor decisions face an additional barrier when services are only available in English. Texas Property Help provides full bilingual support — in the process, in the paperwork, and in contractor matching.
          </p>
        </div>
      </section>

      {/* Storm types */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "8px" }}>
            Common Storm Damage in San Antonio — Coverage Basics
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "32px" }}>Know what your policy covers before a claim — and before a contractor shows up at your door.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail Damage", color: "#f59e0b", body: "The most common SA homeowner claim. Hail damages shingles, gutters, siding, and outdoor HVAC units — often without visible ground-level signs. Standard SA policies cover hail, but your wind/hail deductible (1–3% of insured value) applies before your insurer pays anything. Document every claim with a licensed contractor before the adjuster visits." },
              { icon: "🌧️", title: "Flash Flooding & Water Intrusion", color: "#3b82f6", body: "SA sits along flash flood corridors and receives intense rainfall during storm season. Rising floodwater is NOT covered by homeowners insurance — you need a separate NFIP flood policy. However, rainwater entering through a storm-damaged roof or broken window is covered because wind or hail damage came first." },
              { icon: "🌪️", title: "Wind & Thunderstorm Damage", color: "#ef4444", body: "Severe thunderstorms produce straight-line winds that damage roofs, fences, and outbuildings. Wind damage is covered under standard SA homeowners policies — but document everything before repairs. Emergency temporary tarping and board-ups are required by your policy and are reimbursable." },
              { icon: "❄️", title: "HVAC Storm Damage", color: "#76b900", body: "San Antonio summers are among the most intense in Texas. Outdoor condenser units damaged by hail are frequently overlooked at claim time — and in extreme heat, this can mean weeks without AC. Inspect your AC unit after every significant hail event and photograph any damage before it's repaired." },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderTop: `4px solid ${item.color}`, borderRadius: "8px", padding: "24px" }}>
                <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "10px" }}>{item.icon}</span>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>
            How We Help San Antonio Homeowners
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", marginBottom: "36px" }}>No pressure. No middlemen. No cost to you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Storm & Hail Damage", body: "Document damage correctly before the adjuster arrives, connect with licensed SA contractors fast, and understand your coverage options — including what to do if your claim is underpaid.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed San Antonio roofers for inspection, repair, and full replacement. Get written estimates before signing any contract — and know how to verify a contractor's license.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "SA summers demand reliable AC. Emergency repair referrals, storm-damaged condenser assessments, and financing options. We help determine if damage is insurance-covered before you pay out of pocket.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "Step-by-step guidance in English and Spanish — from filing to settlement. ACV vs. RCV, supplemental claims, and how to respond if your SA adjuster underpays your claim.", href: "/insurance-claims" },
            ].map((s) => (
              <Link key={s.href} href={s.href} style={{ display: "block", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "24px", textDecoration: "none" }}>
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "10px" }}>{s.icon}</span>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section style={{ backgroundColor: "#111827" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "white", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>
            San Antonio Metro Areas We Serve
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", textAlign: "center", marginBottom: "28px" }}>
            Bexar County and surrounding communities
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {[
              "San Antonio (all zip codes)", "New Braunfels", "Schertz", "Converse", "Boerne",
              "Universal City", "Seguin", "Cibolo", "Helotes", "Leon Valley",
              "Alamo Heights", "Windcrest", "Kirby", "Live Oak", "Selma",
              "Garden Ridge", "Bulverde", "Spring Branch", "Canyon Lake", "Floresville",
            ].map((area) => (
              <span key={area} style={{ backgroundColor: "rgba(118,185,0,0.1)", color: "#76b900", border: "1px solid rgba(118,185,0,0.3)", fontSize: "0.82rem", fontWeight: 600, padding: "6px 14px", borderRadius: "100px" }}>
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={saFaqs} heading="San Antonio Homeowner Questions — Answered" />

      <CTASection
        heading="San Antonio Homeowner? Get Help Now."
        subheading="Storm damage, roofing, HVAC, or insurance questions — submit your request and we'll connect you with vetted, TDLR-licensed contractors and free guidance in the San Antonio area. Bilingual EN/ES. Takes 2 minutes. Always free."
        primaryLabel="Request Help in San Antonio"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
