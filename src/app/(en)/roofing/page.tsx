import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Roofing Help in Texas | Texas Property Help",
  description: "Texas Property Help connects homeowners with roofing inspection, repair, and replacement resources. Learn what to expect and how to navigate insurance-related roof claims.",
  alternates: pageAlternates("/roofing", "/es/roofing"),
};

const roofServices = [
  { icon: "🔍", title: "Roof Inspection", body: "A professional inspection can identify damage, assess remaining lifespan, and document issues for insurance claims.", color: "#76b900" },
  { icon: "🔧", title: "Roof Repair", body: "Partial repairs for specific damage areas — missing shingles, flashing issues, small leaks — when full replacement is not needed.", color: "#3b82f6" },
  { icon: "🏗️", title: "Roof Replacement", body: "Full re-roofing when damage is extensive, the roof is at end of life, or an insurer requires replacement after a covered loss.", color: "#f59e0b" },
  { icon: "📋", title: "Insurance Claim Support", body: "Understanding what roofing documentation your insurer needs and how to communicate effectively throughout the claim process.", color: "#8b5cf6" },
  { icon: "💧", title: "Emergency Leak Response", body: "Active roof leaks need immediate attention. We can connect you with emergency response resources.", color: "#ef4444" },
  { icon: "💳", title: "Financing Options", body: "Roofing costs can be significant. Explore financing options that may help when insurance does not cover the full cost.", color: "#10b981" },
];

const faqs: FAQItem[] = [
  { question: "How do I know if I need a roof repair or full replacement?", answer: "The decision depends on the extent and type of damage, the age of your roof, and your insurance policy terms. A professional inspection can give you factual information to help make an informed decision. We can connect you with an inspector." },
  { question: "Will my insurance pay for a new roof?", answer: "Whether insurance covers roof work depends on your specific policy, the cause of damage, the age of the roof, and whether the damage meets your deductible threshold. Insurance companies make this determination based on their assessment — it is not guaranteed." },
  { question: "What is the difference between roof repair and roof replacement?", answer: "Roof repair addresses specific damaged sections while leaving the rest of the roof intact. Replacement involves removing the existing roofing material and re-roofing the entire structure. Your insurer, contractor, and roof inspection results will inform which is appropriate." },
  { question: "How do I avoid roofing scams after a storm?", answer: "Work with licensed, local contractors with verifiable reviews and a physical address. Avoid door-to-door solicitors who show up immediately after storms. Never pay the full cost upfront, and do not sign an Assignment of Benefits without understanding what you are agreeing to." },
  { question: "How long does a roof replacement take in Texas?", answer: "Most residential roof replacements in Texas take 1–3 days depending on roof size, complexity, and weather conditions. Your contractor should give you a written timeline estimate before work begins." },
];

export default function RoofingPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/roofing-hero.png" alt="Roofing Texas" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.90) 0%, rgba(0,15,0,0.72) 100%)" }} />
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(118,185,0,0.15)", border: "1px solid rgba(118,185,0,0.4)", color: "#a3e635", fontSize: "0.78rem", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            🏠 Texas Roofing Services
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.9rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Roofing Help for<br /><span style={{ color: "#76b900" }}>Texas Homeowners</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.75, marginBottom: "28px" }}>
            From inspection to full replacement — get connected with licensed Texas roofing professionals who know insurance claims, local codes, and storm damage.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 800, fontSize: "1rem", padding: "14px 28px", borderRadius: "6px", textDecoration: "none", boxShadow: "0 4px 16px rgba(118,185,0,0.4)" }}>
              Get Roofing Help →
            </Link>
            <Link href="/guides/texas-storm-roof-repair-or-replace" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 24px", borderRadius: "6px", border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none" }}>
              Repair vs Replace Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Services - white */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Services</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800 }}>How We Can Help With Your Roof</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roofServices.map((item) => (
              <div key={item.title} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "24px", borderTop: `4px solid ${item.color}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect - gray */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 800, marginBottom: "32px", textAlign: "center" }}>What to Expect When Getting Roofing Help</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "📞", title: "Free Initial Consultation", body: "We review your request and match you with local licensed roofers who can inspect your property at no cost." },
              { icon: "🔍", title: "Professional Roof Inspection", body: "A licensed roofer documents damage with photos and gives you an honest assessment — repair or replace, and what the insurance scope might look like." },
              { icon: "📄", title: "Written Estimate", body: "You receive a written estimate before any work begins. Never agree to work without a written contract." },
              { icon: "🏦", title: "Insurance Coordination", body: "Your roofer communicates with your adjuster and can submit supplements for missed items in the scope of work." },
              { icon: "✅", title: "Completed Work & Warranty", body: "Reputable Texas roofers provide workmanship warranties. Keep your paperwork for future insurance and resale purposes." },
            ].map((s) => (
              <div key={s.title} style={{ display: "flex", gap: "18px", backgroundColor: "#ffffff", borderRadius: "10px", padding: "20px 24px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "1.5rem", width: "44px", height: "44px", backgroundColor: "#76b90015", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem", marginBottom: "4px" }}>{s.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px" }}><DisclaimerBox type="insurance" /></div>
        </div>
      </section>

      <FAQ items={faqs} heading="Roofing FAQ" />
      <CTASection heading="Need a Roofer in Texas?" subheading="Submit a request and we will connect you with licensed local roofing professionals for inspection, repair, or replacement." primaryLabel="Get Roofing Help" secondaryLabel="View Roof Guide" secondaryHref="/guides/texas-storm-roof-repair-or-replace" />
    </>
  );
}

