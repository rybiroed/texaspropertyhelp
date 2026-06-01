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

export default function HVACPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/hvac-hero.jpg" alt="HVAC Texas" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,10,30,0.92) 0%, rgba(0,20,40,0.75) 100%)" }} />
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

      <FAQ items={faqs} heading="HVAC Help FAQ" />
      <CTASection heading="HVAC Problem in Texas?" subheading="Submit a request and we will help connect you with HVAC repair, replacement, and financing resources in your area." primaryLabel="Request HVAC Help" secondaryLabel="Explore Financing Options" secondaryHref="/financing" />
    </>
  );
}
