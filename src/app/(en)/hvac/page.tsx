import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "HVAC Help in Texas | Emergency AC Repair & Replacement",
  description: "Texas Property Help connects homeowners with HVAC repair and replacement resources. Get guidance on emergency AC repair, system replacement, and financing options across Texas.",
  alternates: pageAlternates("/hvac", "/es/hvac"),
  openGraph: {
    title: "HVAC Help in Texas | Emergency AC Repair & Replacement",
    description: "Free HVAC guidance for Texas homeowners. Get help with emergency AC repair, system replacement, and financing options. Texas heat can't wait.",
    url: "https://texaspropertyhelp.com/hvac",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630, alt: "HVAC repair help for Texas homeowners" }],
  },
  twitter: { card: "summary_large_image" },
};

const hvacServices = [
  { icon: "🚨", title: "Emergency AC Repair", body: "For urgent situations — especially during extreme Texas heat — we help connect you with emergency HVAC service resources.", color: "#ef4444" },
  { icon: "🔧", title: "HVAC Repair Referrals", body: "Qualified HVAC technicians for diagnosis and repair of cooling, heating, and ventilation systems.", color: "#3b82f6" },
  { icon: "🏗️", title: "System Replacement", body: "When repair is not cost-effective, we help you understand the replacement process and how to evaluate quotes.", color: "#76b900" },
  { icon: "⛈️", title: "Storm-Related Damage", body: "Hail and storms can damage outdoor HVAC units. We help you document storm damage for your insurance claim.", color: "#8b5cf6" },
  { icon: "💳", title: "HVAC Financing", body: "HVAC replacement is a significant cost. We help you explore financing options that reduce the upfront financial burden.", color: "#f59e0b" },
  { icon: "📋", title: "Insurance Documentation", body: "If storm damage is involved, proper HVAC documentation is critical for a complete and accurate insurance claim.", color: "#10b981" },
];

const faqs: FAQItem[] = [
  { question: "Is HVAC failure covered by homeowner's insurance?", answer: "Standard homeowner policies generally do not cover HVAC failure due to normal wear and aging. However, storm damage to an HVAC unit — such as hail striking a condenser — may be covered. Review your policy or contact your agent." },
  { question: "What should I do if my AC stops working during a Texas summer?", answer: "For immediate relief: close blinds and curtains, use fans to circulate air, minimize heat-generating appliance use, and consider temporary accommodations if you have vulnerable household members (elderly, infants, pets). Then request emergency HVAC assistance." },
  { question: "How long do HVAC systems typically last in Texas?", answer: "Texas HVAC systems often work harder due to extreme heat. Air conditioners in Texas may last 10-15 years, sometimes less, depending on maintenance and usage. A professional HVAC assessment can give you specific information about your system." },
  { question: "Are there financing options for HVAC replacement?", answer: "Yes — several financing options may be available for HVAC replacement, including manufacturer financing, home improvement loans, and some utility rebate programs. Our financing page provides more information." },
  { question: "Can storm damage cause HVAC problems?", answer: "Yes. Hail can dent and damage condenser fins and coils. Flooding can damage electrical components and the unit base. If you have storm damage and HVAC issues together, document both when filing your insurance claim." },
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

export default function HVACPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/hvac-hero.jpg" alt="HVAC Texas" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,10,30,0.60) 0%, rgba(0,20,40,0.45) 100%)" }} />
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.4)", color: "#38bdf8", fontSize: "0.78rem", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            🌡️ Texas Heat Emergency Services
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.9rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            HVAC Repair & Replacement<br /><span style={{ color: "#76b900" }}>Help in Texas</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.75, marginBottom: "28px" }}>
            In Texas heat, a failed HVAC system is more than uncomfortable — it can be a health risk. Whether you need emergency repair or are evaluating replacement options, we connect you with the right resources.
          </p>

          {/* Heat warning */}
          <div style={{ backgroundColor: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: "8px", padding: "12px 18px", marginBottom: "24px", maxWidth: "480px" }}>
            <p style={{ color: "#fca5a5", fontSize: "0.85rem", fontWeight: 600, margin: 0 }}>
              ⚠️ Heat Safety: If AC fails during a heat advisory, prioritize safety — consider cooling centers or temporary accommodations for vulnerable family members.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 28px", borderRadius: "6px", textDecoration: "none", boxShadow: "0 4px 16px rgba(118,185,0,0.4)" }}>
              Get HVAC Help Now →
            </Link>
            <Link href="/financing" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 24px", borderRadius: "6px", border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none" }}>
              Explore Financing
            </Link>
          </div>
        </div>
      </section>

      {/* Services - white */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>How We Help</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>HVAC Services We Connect You With</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hvacServices.map((item) => (
              <div key={item.title} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", borderLeft: `4px solid ${item.color}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Texas heat facts - gray */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>Why HVAC Matters More in Texas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { stat: "100°F+", label: "Summer temperatures in many Texas cities", icon: "🌡️" },
              { stat: "10-15 yr", label: "Average AC lifespan under Texas heat stress", icon: "⏱️" },
              { stat: "$8K-14K", label: "Typical HVAC replacement cost in Texas", icon: "💰" },
            ].map((item) => (
              <div key={item.stat} style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "24px", textAlign: "center", boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0ea5e9", marginBottom: "6px" }}>{item.stat}</div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <DisclaimerBox type="general" />
        </div>
      </section>

      {/* Repair vs Replace */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#0ea5e9", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Decision Guide</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>Repair or Replace? How to Decide</h2>
            <p style={{ color: "#6b7280", maxWidth: "580px", margin: "12px auto 0" }}>Texas homeowners face this question more often than most — extreme heat accelerates wear. Here&apos;s how professionals evaluate the decision.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "22px" }}>
              <div style={{ color: "#16a34a", fontWeight: 800, fontSize: "1rem", marginBottom: "12px" }}>✅ Repair Makes Sense When...</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["System is under 8 years old","Repair cost is less than 50% of replacement","Issue is isolated (capacitor, refrigerant, fan motor)","System has been well-maintained","Manufacturer warranty still covers parts"].map(i => (
                  <li key={i} style={{ fontSize: "0.875rem", color: "#374151", padding: "5px 0", borderBottom: "1px solid #dcfce7", display: "flex", gap: "8px" }}><span style={{ color: "#16a34a" }}>→</span>{i}</li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "12px", padding: "22px" }}>
              <div style={{ color: "#c2410c", fontWeight: 800, fontSize: "1rem", marginBottom: "12px" }}>🔄 Replace Makes Sense When...</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["System is 12+ years old","Repair cost exceeds 50% of new unit","R-22 refrigerant system (phased out, expensive)","Frequent breakdowns in past 2 years","Energy bills spiking despite maintenance"].map(i => (
                  <li key={i} style={{ fontSize: "0.875rem", color: "#374151", padding: "5px 0", borderBottom: "1px solid #ffedd5", display: "flex", gap: "8px" }}><span style={{ color: "#c2410c" }}>→</span>{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "10px", padding: "18px 22px" }}>
            <p style={{ color: "#0369a1", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
              <strong>The 5,000 Rule:</strong> Multiply the age of your unit by the estimated repair cost. If the result exceeds $5,000, replacement is typically the smarter investment. Example: a 12-year-old unit needing a $500 repair = $6,000 → consider replacement.
            </p>
          </div>
        </div>
      </section>

      {/* SEER & Energy Efficiency */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ display: "inline-block", background: "rgba(14,165,233,0.15)", color: "#38bdf8", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Energy Efficiency</span>
            <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>SEER Ratings — What Texas Homeowners Need to Know</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "12px auto 0", lineHeight: 1.8 }}>SEER (Seasonal Energy Efficiency Ratio) measures how efficiently an AC unit cools your home. Higher = cheaper to run. Texas has federally mandated minimums.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
            {[
              { seer: "SEER 14", label: "Federal minimum for Texas (South)", note: "Required since 2023 for new installs in the South region" },
              { seer: "SEER 16–18", label: "Good efficiency range", note: "Balances upfront cost vs. monthly savings — most popular in TX" },
              { seer: "SEER 20+", label: "High efficiency", note: "Best for larger homes, long TX summers. May qualify for federal tax credits" },
              { seer: "SEER2", label: "New standard (2023+)", note: "Replaces old SEER — all new equipment uses SEER2 ratings" },
            ].map(s => (
              <div key={s.seer} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "20px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <div style={{ color: "#38bdf8", fontWeight: 900, fontSize: "1.1rem", marginBottom: "6px" }}>{s.seer}</div>
                <div style={{ color: "white", fontWeight: 600, fontSize: "0.85rem", marginBottom: "6px" }}>{s.label}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", lineHeight: 1.5 }}>{s.note}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "18px 22px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>
              <strong style={{ color: "white" }}>Federal Tax Credit (2024–2025):</strong> The Inflation Reduction Act allows homeowners to claim up to <strong style={{ color: "#38bdf8" }}>30% of HVAC replacement cost</strong> (max $600 for AC, $2,000 for heat pumps) if the new unit meets efficiency thresholds. Consult a tax professional to verify eligibility for your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Warning signs */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 800 }}>Warning Signs Your Texas AC Needs Attention</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {[
              { icon: "💨", sign: "Weak or warm airflow", detail: "Could indicate low refrigerant, failing compressor, or clogged filter/ducts" },
              { icon: "💧", sign: "Ice on the unit or lines", detail: "Refrigerant leak or airflow restriction — turn off immediately to prevent compressor damage" },
              { icon: "📈", sign: "Spiking electricity bills", detail: "An inefficient system working harder than normal to maintain temperature" },
              { icon: "🔊", sign: "Grinding or squealing noises", detail: "Failing motor bearings or loose components — needs prompt inspection" },
              { icon: "💦", sign: "Water pooling around unit", detail: "Clogged condensate drain — can cause water damage to walls and flooring" },
              { icon: "🌡️", sign: "Uneven temps room to room", detail: "Duct leaks, zoning issues, or undersized unit for your home's square footage" },
            ].map(w => (
              <div key={w.sign} style={{ background: "white", borderRadius: "10px", padding: "18px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{w.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.9rem", marginBottom: "6px" }}>{w.sign}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.83rem", lineHeight: 1.6, margin: 0 }}>{w.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storm damage HVAC */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 800, marginBottom: "20px", textAlign: "center" }}>Storm Damage & Your HVAC System</h2>
          <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "28px", fontSize: "0.9rem" }}>Hail and severe storms frequently damage outdoor condenser units in Texas. Here&apos;s what to document for your insurance claim.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { n: "1", t: "Photograph before touching anything", b: "Take photos of dented condenser fins, bent fan blades, cracked coil covers, and debris impact marks. Date-stamp everything." },
              { n: "2", t: "Do not run a damaged unit", b: "Operating an HVAC with bent condenser fins or refrigerant leaks can destroy the compressor. Turn it off and document first." },
              { n: "3", t: "Get an HVAC technician's written assessment", b: "An HVAC tech's written damage report carries significant weight with insurance adjusters. Get it before your adjuster visits." },
              { n: "4", t: "Include HVAC in your overall storm damage claim", b: "Many Texas homeowners forget to include HVAC in their initial claim. If you have roof damage + HVAC damage, document both together." },
              { n: "5", t: "Know your policy's equipment coverage", b: "Some policies cover equipment breakdown separately from storm damage. Check both sections of your policy, or ask your agent." },
            ].map(s => (
              <div key={s.n} style={{ display: "flex", gap: "16px", background: "#f9fafb", borderRadius: "10px", padding: "16px 20px", border: "1px solid #e5e7eb" }}>
                <div style={{ width: "28px", height: "28px", background: "#0ea5e9", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.8rem", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ color: "#111827", fontWeight: 700, fontSize: "0.9rem", marginBottom: "4px" }}>{s.t}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.6 }}>{s.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} heading="HVAC Help FAQ" />
      <CTASection heading="HVAC Problem in Texas?" subheading="Submit a request and we will help connect you with HVAC repair, replacement, and financing resources in your area." primaryLabel="Request HVAC Help" secondaryLabel="Explore Financing Options" secondaryHref="/financing" />
    </>
  );
}
