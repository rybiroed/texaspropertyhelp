import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Fort Worth Storm Damage Help — Free Hail, Roofing & Insurance Claim Guidance",
  description:
    "Free help for Fort Worth and Tarrant County homeowners after hail, tornado, or wind damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/fort-worth",
    languages: {
      "en-US": "https://texaspropertyhelp.com/fort-worth",
      "x-default": "https://texaspropertyhelp.com/fort-worth",
    },
  },
  openGraph: {
    title: "Fort Worth Storm Damage Help — Free Hail, Roofing & Insurance Claim Guidance",
    description:
      "Free help for Fort Worth and Tarrant County homeowners after hail, tornado, or wind damage. TDLR-licensed contractors and insurance claim guidance.",
    url: "https://texaspropertyhelp.com/fort-worth",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630, alt: "Fort Worth Storm Damage Help" }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/fort-worth#localbusiness",
  "name": "Texas Property Help — Fort Worth",
  "url": "https://texaspropertyhelp.com/fort-worth",
  "description": "Free homeowner assistance platform serving Fort Worth and Tarrant County, TX. Storm damage, roofing, HVAC, insurance claims.",
  "areaServed": [
    { "@type": "City", "name": "Fort Worth", "containedInPlace": { "@type": "State", "name": "Texas" } },
    { "@type": "City", "name": "Arlington" },
    { "@type": "City", "name": "Mansfield" },
    { "@type": "City", "name": "Burleson" },
    { "@type": "City", "name": "Haltom City" },
    { "@type": "City", "name": "North Richland Hills" },
    { "@type": "City", "name": "Euless" },
    { "@type": "City", "name": "Bedford" },
    { "@type": "City", "name": "Grapevine" },
    { "@type": "City", "name": "Keller" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const fwFaqs: FAQItem[] = [
  {
    question: "How is storm damage different in Fort Worth compared to Dallas?",
    answer:
      "Fort Worth and Tarrant County fall under the same hail corridor as Dallas, but the western location means more exposure to dry-line thunderstorms that produce large hail. Fort Worth also has higher tornado frequency than eastern DFW. From a claims perspective, Tarrant County has its own permit and inspection requirements for roofing work — all contractors must be licensed through TDLR and must pull proper permits for any replacement work.",
  },
  {
    question: "Does my Fort Worth homeowners insurance cover tornado damage?",
    answer:
      "Yes. Wind damage from tornadoes is covered under standard Texas homeowners policies. Your wind/hail deductible applies (typically 1–3% of insured value). After any tornado event in Tarrant County, document all exterior damage immediately with photos and video before making any repairs — including temporary emergency repairs like tarping, which are required by your policy and are reimbursable.",
  },
  {
    question: "What should I do first after hail damage in Fort Worth?",
    answer:
      "Don't call your insurance company first — call a licensed TDLR contractor for an independent inspection. Their written documentation of the damage, created before the insurer's adjuster visits, is your strongest protection against a low settlement. Also: inspect your outdoor HVAC condenser unit and photograph any dents or damage — this is commonly missed and commonly covered.",
  },
  {
    question: "How do I verify a Fort Worth contractor's license?",
    answer:
      "Texas requires roofing contractors to hold an active TDLR (Texas Department of Licensing and Regulation) license. Verify any contractor at license.tdlr.texas.gov before signing. After DFW hail events, Tarrant County neighborhoods fill with unlicensed out-of-state crews — verification is the single most important step before hiring anyone.",
  },
  {
    question: "What Tarrant County areas do you serve?",
    answer:
      "We serve all of Tarrant County including Fort Worth, Arlington, Mansfield, Burleson, Haltom City, North Richland Hills, Euless, Bedford, Grapevine, Keller, Southlake, Colleyville, Hurst, Richland Hills, White Settlement, Lake Worth, Crowley, Kennedale, and all surrounding communities.",
  },
  {
    question: "Can I get help if my Fort Worth insurer denies my hail claim?",
    answer:
      "Yes. A claim denial is not the end of the process. You have several options: request a re-inspection with your contractor present to challenge the denial; invoke the appraisal clause in your policy — a neutral umpire resolves the dispute without litigation; hire a licensed public adjuster to negotiate on your behalf; or file a complaint with the Texas Department of Insurance at 800-252-3439. Don't accept a denial without exploring these options first.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": fwFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
};

export default function FortWorthPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            📍 Fort Worth — Tarrant County, Texas
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Fort Worth Storm Damage Help —<br />
            <span style={{ color: "var(--accent)" }}>Fast, Free, and Pressure-Free</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Fort Worth and Tarrant County sit at the western edge of DFW&apos;s storm corridor — facing some of Texas&apos;s most severe hail and tornado activity. Texas Property Help connects Fort Worth homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance — no commissions, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Fort Worth →
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
            { stat: "Top 5", label: "Tarrant County ranks among the highest hail claim counties in the U.S." },
            { stat: "70+", label: "Annual hail days across the DFW / Tarrant County area" },
            { stat: "1–3%", label: "Wind/hail deductible — up to $12,000+ on a $400K home" },
            { stat: "Free", label: "To submit a homeowner request — no cost, no pressure" },
          ].map((item) => (
            <div key={item.stat}>
              <p style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 4px" }}>{item.stat}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FW storm context */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>
            Why Fort Worth Homeowners Face Serious Storm Risk
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Fort Worth and Tarrant County occupy the western portion of the DFW Metroplex — which places them at the front edge of the dry line, the boundary between dry western air masses and moist Gulf air that fuels the most intense Texas thunderstorms. This positioning means Fort Worth frequently receives severe hail before storms weaken as they push east toward Dallas.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Tarrant County also has higher tornado frequency than the eastern DFW counties, making wind damage a recurring reality for homeowners in Fort Worth, Arlington, and surrounding communities. Multiple multi-billion dollar hail events have struck Tarrant County in recent years, driving insurance premium increases and — in some zip codes — insurer non-renewals.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8 }}>
            After every major storm, Fort Worth neighborhoods are targeted by out-of-state storm chaser contractors. Texas law requires roofing contractors to be TDLR-licensed, but enforcement is inconsistent — leaving homeowners responsible for verifying credentials before signing anything.
          </p>
        </div>
      </section>

      {/* Storm types */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "8px" }}>
            Fort Worth Storm Damage Types — What&apos;s Covered
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "32px" }}>Tarrant County claims have specific nuances — know them before you file.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail Damage", color: "#f59e0b", body: "Fort Worth hail can be softball-sized in major events. Standard policies cover hail, but wind/hail deductibles (1–3% of insured value) mean thousands out-of-pocket before insurers pay. Many Tarrant County policies now contain cosmetic damage exclusions — your contractor's documentation of functional damage is critical." },
              { icon: "🌪️", title: "Tornado & Wind Damage", color: "#ef4444", body: "Tarrant County has one of the highest tornado frequencies in DFW. Wind damage from tornadoes and straight-line winds is covered under standard homeowners policies — but you must document before repairs. Emergency tarping is required by your policy and is reimbursable." },
              { icon: "🌧️", title: "Water Intrusion", color: "#3b82f6", body: "Rain entering through storm-damaged roofing, windows, or siding is typically covered — the storm created the entry point. Standing water or sewer backup requires separate coverage. Document the point of entry clearly in photos to support the claim." },
              { icon: "❄️", title: "HVAC Storm Damage", color: "#76b900", body: "Hail-damaged HVAC condensers are one of the most under-claimed items after Fort Worth storms. Check your outdoor unit after every significant hail event. Damage to fins, coils, or the refrigerant system is typically covered under dwelling or other-structures coverage." },
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
            How We Help Fort Worth Homeowners
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", marginBottom: "36px" }}>No pressure. No middlemen. No cost to you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Storm & Hail Damage", body: "We help document damage before the adjuster visits, connect you with licensed Tarrant County contractors fast, and guide you through your coverage options including cosmetic exclusion disputes.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed Fort Worth roofers who know Tarrant County permit requirements. Written estimates before signing. Verification that your contractor can legally pull permits in your municipality.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Emergency HVAC repair referrals for Fort Worth's brutal summers. Storm-damaged condenser unit assessments. Help determining if your damage is insurance-covered before paying out of pocket.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "From first report to final settlement — handling low adjuster estimates, cosmetic exclusion clauses, supplemental claims, and the appraisal clause option for underpaid Tarrant County claims.", href: "/insurance-claims" },
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
            Tarrant County Areas We Serve
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", textAlign: "center", marginBottom: "28px" }}>
            All of Tarrant County and surrounding communities
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {[
              "Fort Worth", "Arlington", "Mansfield", "Burleson", "Haltom City",
              "North Richland Hills", "Euless", "Bedford", "Grapevine", "Keller",
              "Southlake", "Colleyville", "Hurst", "Richland Hills", "White Settlement",
              "Lake Worth", "Crowley", "Kennedale", "Saginaw", "Watauga",
              "Forest Hill", "Benbrook", "Westover Hills", "Sansom Park",
            ].map((area) => (
              <span key={area} style={{ backgroundColor: "rgba(118,185,0,0.1)", color: "#76b900", border: "1px solid rgba(118,185,0,0.3)", fontSize: "0.82rem", fontWeight: 600, padding: "6px 14px", borderRadius: "100px" }}>
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={fwFaqs} heading="Fort Worth Homeowner Questions — Answered" />

      <CTASection
        heading="Fort Worth Homeowner? We Can Help."
        subheading="Storm damage, roofing, HVAC, or insurance questions — submit your request and we'll connect you with vetted, TDLR-licensed Tarrant County contractors and free guidance. Takes 2 minutes. Always free."
        primaryLabel="Request Help in Fort Worth"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
