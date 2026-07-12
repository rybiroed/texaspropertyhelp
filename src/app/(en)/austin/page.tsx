import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Austin Storm Damage Help | Free TX Homeowner Guide",
  description:
    "Free help for Austin homeowners after hail, storm, or wind damage. Connect with vetted, TDLR-licensed contractors and navigate your insurance claim across Travis County and the Austin metro.",
  alternates: {
    canonical: "https://texaspropertyhelp.com/austin",
    languages: {
      "en-US": "https://texaspropertyhelp.com/austin",
      "x-default": "https://texaspropertyhelp.com/austin",
    },
  },
  openGraph: {
    title: "Austin Storm Damage Help — Free Hail, Roofing & Insurance Claim Guidance",
    description:
      "Free help for Austin homeowners after hail, storm, or wind damage. TDLR-licensed contractors, insurance claim guidance, fast and pressure-free.",
    url: "https://texaspropertyhelp.com/austin",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630, alt: "Austin Storm Damage Help" }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://texaspropertyhelp.com/austin#localbusiness",
  "name": "Texas Property Help — Austin",
  "url": "https://texaspropertyhelp.com/austin",
  "description": "Free homeowner assistance platform serving Austin, TX. Storm damage, roofing, HVAC, insurance claims.",
  "areaServed": [
    { "@type": "City", "name": "Austin", "containedInPlace": { "@type": "State", "name": "Texas" } },
    { "@type": "City", "name": "Round Rock" },
    { "@type": "City", "name": "Cedar Park" },
    { "@type": "City", "name": "Pflugerville" },
    { "@type": "City", "name": "Georgetown" },
    { "@type": "City", "name": "Kyle" },
    { "@type": "City", "name": "Buda" },
    { "@type": "City", "name": "Leander" },
    { "@type": "City", "name": "Hutto" },
    { "@type": "City", "name": "Bastrop" },
  ],
  "availableLanguage": ["English", "Spanish"],
  "priceRange": "Free",
};

const austinFaqs: FAQItem[] = [
  {
    question: "Does Austin get enough hail to warrant a roof inspection after storms?",
    answer:
      "Yes. Central Texas including Austin and Travis County averages 40–60 hail-producing storm days per year, peaking in spring. Hail as small as 1 inch can damage asphalt shingles by stripping the protective granule layer — reducing roof life significantly without obvious visible signs from the ground. After any storm where hail is reported in your area, a licensed TDLR contractor inspection is worth doing before deciding whether to file a claim.",
  },
  {
    question: "Austin's housing market is expensive — does that affect my insurance claim payout?",
    answer:
      "Your claim payout is based on your policy's insured replacement value, not your home's market value. If your home has appreciated significantly (as Austin properties have), your insured value may lag behind actual replacement cost — meaning you could be underinsured. Check your declarations page. If your coverage limit hasn't been updated in 3+ years, you may want to ask your insurer about inflation guard or extended replacement cost coverage.",
  },
  {
    question: "My Austin contractor says the damage isn't covered — my insurer says it is. What do I do?",
    answer:
      "Get everything in writing from both sides. If your insurer is denying coverage your contractor says exists, request a re-inspection with your contractor present. You can also invoke the appraisal clause in your policy — a neutral umpire resolves the dispute without going to court. If the insurer is simply delaying or stonewalling, file a complaint with the Texas Department of Insurance at 800-252-3439.",
  },
  {
    question: "Can Austin homeowners get help with HVAC emergencies during heat waves?",
    answer:
      "Yes. We prioritize HVAC emergency requests, especially during summer heat events. Submit your request marked as Emergency and we route it to contractors with emergency availability. If your HVAC damage is storm-related (hail-damaged condenser unit, for example), we can also help you determine whether an insurance claim is appropriate before you pay out of pocket.",
  },
  {
    question: "What Austin-area zip codes and suburbs do you serve?",
    answer:
      "We serve all of Travis County plus Williamson County, Hays County, and Bastrop County — covering Austin (all zip codes), Round Rock, Cedar Park, Pflugerville, Georgetown, Kyle, Buda, Leander, Hutto, Bastrop, Manor, Elgin, Lockhart, and all surrounding communities.",
  },
  {
    question: "How do I avoid contractor scams in Austin after a storm?",
    answer:
      "After major Austin area storms, unlicensed out-of-state contractors flood the area. Key protections: verify TDLR license at license.tdlr.texas.gov before signing anything; never sign an Assignment of Benefits (AOB) before your claim is filed; walk away from anyone who offers to waive or rebate your deductible (illegal under Texas law); and always get a written estimate before agreeing to any work.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": austinFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
};

export default function AustinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            📍 Austin, Texas
          </p>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Austin Storm Damage Help —<br />
            <span style={{ color: "var(--accent)" }}>Fast, Free, and Pressure-Free</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: "0 auto 32px" }}>
            Central Texas hail hits fast and hard. Texas Property Help connects Austin homeowners with vetted, TDLR-licensed contractors and free insurance claim guidance across Travis County and the Austin metro — no commissions, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }}>
              Request Help in Austin →
            </Link>
            <Link href="/guides" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)" }}>
              Free Homeowner Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: "#111827" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: "40–60", label: "Hail-producing storm days per year in Central Texas" },
            { stat: "60%+", label: "Austin homes built before 2000 — roofs due for inspection" },
            { stat: "110°F", label: "Austin heat extremes — HVAC failure is an emergency" },
            { stat: "Free", label: "To submit a homeowner request — no cost, no pressure" },
          ].map((item) => (
            <div key={item.stat}>
              <p style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 4px" }}>{item.stat}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Austin storm context */}
      <section style={{ backgroundColor: "white" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "16px" }}>
            Austin Homeowners and Storm Season — What You Need to Know
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Austin and Central Texas sit in an active hail corridor, with storm season running from March through June and a secondary window in October and November. The city&apos;s rapid growth over the past decade has added hundreds of thousands of homes — many of them in areas with no prior storm history — and homeowners in newer subdivisions often discover their coverage gaps only after a significant event.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "16px" }}>
            Austin&apos;s booming real estate market also creates a specific insurance challenge: home values have risen dramatically, but insured replacement values on older policies haven&apos;t kept pace. A home insured for $350,000 three years ago may now cost $500,000+ to rebuild — leaving homeowners underinsured when they need it most.
          </p>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.8 }}>
            The extreme summer heat creates a separate category of urgency: HVAC system failures during Austin heat waves are a health risk, and storm-damaged condenser units that go unnoticed or unclaimed can mean weeks of disruption. Texas Property Help helps Austin homeowners navigate both the claim process and the contractor market — before and after a storm.
          </p>
        </div>
      </section>

      {/* Storm types */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 800, marginBottom: "8px" }}>
            Austin Storm Damage — What&apos;s Covered and What to Document
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "32px" }}>Central Texas claims move faster when homeowners are prepared.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Hail Damage", color: "#f59e0b", body: "Central Texas hail causes roof granule loss, cracked shingles, dented gutters, and HVAC damage — often without obvious ground-level signs. Most Austin policies cover hail, but your wind/hail deductible (1–3% of insured value) applies before the insurer pays. Document everything with a licensed contractor before the adjuster visits." },
              { icon: "🌪️", title: "Wind & Thunderstorm Damage", color: "#ef4444", body: "Severe thunderstorms regularly produce 70+ mph winds across Travis County. Wind damage is covered under standard Austin homeowners policies. After a significant event, document damage to roofing, fencing, outbuildings, and exterior structures before making any repairs — even emergency temporary ones." },
              { icon: "🌧️", title: "Water Intrusion", color: "#3b82f6", body: "Rainwater entering through storm-damaged areas is typically covered — the key is proving that wind or hail created the entry point. Flooding from rising water (flash floods in dry creek beds and low-lying areas common in Austin) requires a separate NFIP flood policy and is NOT covered by standard homeowners insurance." },
              { icon: "❄️", title: "HVAC Storm Damage", color: "#76b900", body: "Outdoor HVAC condenser units are frequently damaged by hail and often missed in insurance claims. In Austin&apos;s heat, a damaged condenser is an emergency. Inspect after every hail event, photograph any dents or damage, and check whether your insurer covers condenser replacement before paying out of pocket." },
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
            How We Help Austin Homeowners
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", marginBottom: "36px" }}>No pressure. No middlemen. No cost to you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⛈️", title: "Storm & Hail Damage", body: "We help you document damage correctly before the adjuster arrives, connect you with licensed Austin contractors, and walk you through coverage options — including what to do if your claim comes back low.", href: "/storm-damage" },
              { icon: "🏠", title: "Roofing Help", body: "TDLR-licensed Austin-area roofers for inspection, repair, and full replacement. Get written estimates before signing anything — and verify every contractor's license before work begins.", href: "/roofing" },
              { icon: "❄️", title: "HVAC Help", body: "Emergency HVAC repair referrals prioritized for heat-season urgency. Storm-damaged condenser assessments. Financing options for unexpected system replacements.", href: "/hvac" },
              { icon: "📋", title: "Insurance Claim Help", body: "From filing to final settlement — understanding ACV vs. RCV, handling adjuster disputes, filing supplemental claims, and invoking the appraisal clause if you're underpaid.", href: "/insurance-claims" },
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
            Austin Metro Areas We Serve
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", textAlign: "center", marginBottom: "28px" }}>
            Travis, Williamson, Hays, and Bastrop Counties
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {[
              "Austin (all zip codes)", "Round Rock", "Cedar Park", "Pflugerville", "Georgetown",
              "Kyle", "Buda", "Leander", "Hutto", "Bastrop",
              "Manor", "Elgin", "Lockhart", "San Marcos", "Wimberley",
              "Liberty Hill", "Lakeway", "Bee Cave", "West Lake Hills", "Rollingwood",
              "Del Valle", "Manchaca", "Sunset Valley", "Jonestown",
            ].map((area) => (
              <span key={area} style={{ backgroundColor: "rgba(118,185,0,0.1)", color: "#76b900", border: "1px solid rgba(118,185,0,0.3)", fontSize: "0.82rem", fontWeight: 600, padding: "6px 14px", borderRadius: "100px" }}>
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={austinFaqs} heading="Austin Homeowner Questions — Answered" />

      <CTASection
        heading="Austin Homeowner? Get the Right Help."
        subheading="Storm damage, roofing, HVAC, or insurance questions — submit your request and we'll connect you with vetted, TDLR-licensed Austin-area contractors and free guidance. Takes 2 minutes. Always free."
        primaryLabel="Request Help in Austin"
        secondaryLabel="Browse Homeowner Guides"
        secondaryHref="/guides"
      />
    </>
  );
}
