import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Storm Damage Help in Texas | Texas Property Help",
  description: "Learn what to do after hail, wind, or storm damage to your Texas property. Texas Property Help connects homeowners with resources for damage assessment, insurance documentation, and emergency repair referrals.",
  alternates: pageAlternates("/storm-damage", "/es/storm-damage"),
  openGraph: {
    title: "Storm Damage Help in Texas | Texas Property Help",
    description: "Free guidance for Texas homeowners after hail, wind, or storm damage. Learn how to document damage, file an insurance claim, and find TDLR-licensed contractors.",
    url: "https://texaspropertyhelp.com/storm-damage",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630, alt: "Storm damage help for Texas homeowners" }],
  },
  twitter: { card: "summary_large_image" },
};

const damageTypes = [
  { icon: "🌨️", title: "Hail Damage", body: "Hail can damage roofing, gutters, siding, windows, HVAC units. Damage may not be visible from the ground.", color: "#3b82f6" },
  { icon: "💨", title: "Wind Damage", body: "High winds can lift shingles, damage fascia boards, break windows, and knock down trees onto structures.", color: "#8b5cf6" },
  { icon: "💧", title: "Roof Leaks", body: "Storm-related roof leaks need prompt attention to prevent mold, structural damage, and interior damage.", color: "#06b6d4" },
  { icon: "🌊", title: "Water Intrusion", body: "Flooding and water intrusion from storms can damage flooring, walls, and electrical systems.", color: "#10b981" },
  { icon: "🌩️", title: "Emergency Tarping", body: "Temporary weatherproofing after storm damage can prevent additional loss and is often covered by your policy.", color: "#f59e0b" },
  { icon: "📋", title: "Insurance Documentation", body: "Gathering photos, inspection reports, and repair estimates is essential for a smooth claim process.", color: "#ef4444" },
];

const steps = [
  { step: "01", title: "Ensure Safety First", body: "Before inspecting damage, confirm there are no structural hazards, downed power lines, or gas leaks. Call 911 if there is immediate danger.", icon: "🚨" },
  { step: "02", title: "Document Everything", body: "Take photos and video of all visible damage — roof, siding, windows, interior water damage — before any cleanup or temporary repairs.", icon: "📸" },
  { step: "03", title: "Make Temporary Repairs", body: "Cover broken windows and active roof leaks with tarps or boards to prevent additional water intrusion. Keep all receipts.", icon: "🛠️" },
  { step: "04", title: "Contact Your Insurance", body: "File a claim promptly. Most policies have deadlines. Note your claim number and adjuster's contact information.", icon: "📞" },
  { step: "05", title: "Get a Professional Assessment", body: "Request a referral for a professional damage assessment to support your insurance documentation.", icon: "🔍" },
];

const faqs: FAQItem[] = [
  { question: "How long do I have to file a storm damage insurance claim in Texas?", answer: "Texas law generally requires homeowners to file a claim within one year of the storm event, but your specific policy may have different deadlines. Contact your insurer immediately after storm damage." },
  { question: "Does my homeowner's insurance cover hail damage?", answer: "Most standard Texas homeowner policies include coverage for hail and wind damage, but coverage amounts, deductibles, and exclusions vary. Review your policy's declarations page or contact your agent." },
  { question: "What is an ACV vs RCV roof settlement?", answer: "ACV (Actual Cash Value) pays the depreciated value of your roof. RCV (Replacement Cost Value) pays what it costs to replace the damaged material. The difference matters significantly for older roofs." },
  { question: "Can I get help if the storm happened weeks ago?", answer: "Yes — as long as you are still within your policy's claim window and damage is documented, you may still have options. We recommend acting quickly to avoid missing deadlines." },
  { question: "What is a hail damage assessment and do I need one?", answer: "A hail damage assessment is a professional inspection of your roof and property for storm-related damage. It is often helpful for documenting damage for an insurance claim." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function StormDamagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Hero with photo */}
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/storm-damage-hero.jpg" alt="Texas storm damage" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(20,0,0,0.50) 100%)" }} />
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171", fontSize: "0.78rem", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            ⛈️ Texas Storm Season Active
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.9rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Storm Damage Help for<br /><span style={{ color: "#76b900" }}>Texas Homeowners</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.75, marginBottom: "28px" }}>
            Hail, high winds, and severe weather can cause serious damage to your home. Knowing what steps to take — quickly and in the right order — protects your property and your insurance claim.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 28px", borderRadius: "6px", textDecoration: "none", boxShadow: "0 4px 16px rgba(118,185,0,0.4)" }} className="hover:opacity-90">
              Get Storm Help Now →
            </Link>
            <Link href="/guides/how-to-check-roof-after-storm-texas" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 24px", borderRadius: "6px", border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none" }} className="hover:border-white">
              Free Inspection Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Damage types - white bg */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>What We Cover</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>Types of Storm Damage We Help With</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {damageTypes.map((item) => (
              <div key={item.title} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", borderLeft: `4px solid ${item.color}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps - light gray */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Step by Step</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>What to Do After Storm Damage</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {steps.map((s, i) => (
              <div key={s.step} style={{ display: "flex", gap: "20px", backgroundColor: "#ffffff", borderRadius: "10px", padding: "22px 24px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", borderLeft: "4px solid #76b900" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "10px", backgroundColor: "#76b90018", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ color: "#76b900", fontWeight: 900, fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "4px" }}>STEP {s.step}</div>
                  <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px" }}>
            <DisclaimerBox type="insurance" />
          </div>
        </div>
      </section>

      {/* Texas Storm Stats */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Texas Storm Facts</span>
            <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800, lineHeight: 1.3 }}>Why Texas Homeowners Face Unique Storm Risk</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "600px", margin: "12px auto 0", lineHeight: 1.8 }}>Texas leads the nation in insured catastrophe losses. Understanding the risk helps you prepare before the next storm hits.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "40px" }}>
            {[
              { val: "#1", label: "State for Hail Claims", sub: "in the US by volume" },
              { val: "~$20B", label: "Annual Storm Losses", sub: "avg. insured losses in TX" },
              { val: "15 days", label: "TDI Claim Deadline", sub: "insurer must acknowledge" },
              { val: "1 year", label: "Claim Filing Window", sub: "typical TX policy deadline" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ color: "#ef4444", fontSize: "1.6rem", fontWeight: 900, marginBottom: "6px" }}>{s.val}</div>
                <div style={{ color: "white", fontWeight: 700, fontSize: "0.85rem" }}>{s.label}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", marginTop: "4px" }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { city: "Houston", risk: "Hurricanes, tropical storms, flooding, hail. Harris County consistently tops the nation for catastrophic hail claims. Coastal proximity means wind deductibles can apply separately from regular deductibles." },
              { city: "Dallas / Fort Worth", risk: "The DFW Metroplex sits in one of the most active hail corridors in North America. Large-diameter hail (2+ inches) is common in spring. Tornado risk is elevated in the spring months." },
              { city: "San Antonio / Central TX", risk: "Flash flooding risk is high in the Hill Country region. Hail and severe thunderstorms in spring. Corpus Christi and the Coastal Bend see hurricane and tropical storm impacts." },
              { city: "West Texas (Lubbock, Amarillo)", risk: "High plains experience severe hail and tornadoes. Wind damage from plains-level storms can affect roofing, fencing, and outbuildings. Drought-related foundation movement also common." },
            ].map((r) => (
              <div key={r.city} style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>📍 {r.city}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{r.risk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TDI Rights */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Your Rights</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>Texas Homeowner Rights After Storm Damage</h2>
            <p style={{ color: "#6b7280", maxWidth: "600px", margin: "12px auto 0" }}>The Texas Department of Insurance (TDI) enforces deadlines that protect policyholders. Know these before you file.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {[
              { icon: "⏱️", title: "15-Day Acknowledgement Rule", body: "Your insurer must acknowledge your claim within 15 days of receiving it. If they don't, they may be liable for additional damages under Texas law." },
              { icon: "📋", title: "15 Business Days to Accept or Deny", body: "After receiving all requested items, your insurer has 15 business days to accept or deny your claim — or provide a reason for needing more time (max 45 days total)." },
              { icon: "💰", title: "5 Business Days to Pay After Acceptance", body: "Once your claim is accepted, payment must be issued within 5 business days. Delays beyond this deadline may trigger penalty interest of 18% per year." },
              { icon: "⚖️", title: "Right to an Appraisal", body: "If you disagree with your insurer's valuation, most Texas homeowner policies include an appraisal clause. You and the insurer each hire an appraiser; a neutral umpire resolves disputes." },
              { icon: "📝", title: "Right to a Written Denial", body: "If your claim is denied, your insurer must provide the specific policy reasons in writing. This is your starting point for appeal or legal action." },
              { icon: "🏛️", title: "TDI Complaint Process", body: "If your insurer violates these rules, file a complaint at tdi.texas.gov. TDI has authority to investigate and penalize insurers. This is free and does not require an attorney." },
            ].map((r) => (
              <div key={r.title} style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "22px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{r.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.9rem", marginBottom: "8px" }}>{r.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: "1.65", margin: 0 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities served */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, marginBottom: "12px" }}>Texas Cities We Help With Storm Damage</h2>
          <p style={{ color: "#6b7280", marginBottom: "28px", fontSize: "0.9rem" }}>We connect homeowners in these cities with local licensed contractors after storms:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {["Houston", "Dallas", "San Antonio", "Austin", "Fort Worth", "Corpus Christi", "Lubbock", "Amarillo", "Waco", "McAllen", "Laredo", "El Paso", "Beaumont", "Galveston", "Midland"].map((city) => (
              <span key={city} style={{ backgroundColor: "#f3f4f6", color: "#374151", padding: "7px 16px", borderRadius: "100px", fontSize: "0.875rem", fontWeight: 600, border: "1px solid #e5e7eb" }}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} heading="Storm Damage FAQ" />
      <CTASection heading="Storm Damage? Let Us Help You Get Started." subheading="Submit a request and we'll connect you with local resources for damage assessment, insurance claim support, and emergency repairs." primaryLabel="Request Help Now" secondaryLabel="View Storm Damage Guide" secondaryHref="/guides/how-to-check-roof-after-storm-texas" />
    </>
  );
}
