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
  openGraph: {
    title: "Roofing Help in Texas | Texas Property Help",
    description: "Free roofing guidance for Texas homeowners. Get help with roof inspections, repairs, replacements, and insurance claims. Connect with TDLR-licensed roofing contractors.",
    url: "https://texaspropertyhelp.com/roofing",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630, alt: "Roofing help for Texas homeowners" }],
  },
  twitter: { card: "summary_large_image" },
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function RoofingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/roofing-hero.png" alt="Roofing Texas" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.60) 0%, rgba(0,15,0,0.45) 100%)" }} />
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

      {/* Roofing Materials */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Materials</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>Roofing Materials Common in Texas</h2>
            <p style={{ color: "#6b7280", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0" }}>Texas climate — extreme heat, hail, hurricane-force winds, and intense UV — puts specific demands on roofing materials. Understanding your options helps you make the right call after storm damage.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {[
              { name: "Asphalt Shingles", icon: "🏠", pros: "Most common in Texas. Low upfront cost, easy to replace, widely available. 3-tab shingles last 15–20 years; architectural shingles 25–30 years.", cons: "More vulnerable to hail and UV degradation than metal. Check if your policy covers like-for-like or if they'll upgrade after a storm." },
              { name: "Metal Roofing", icon: "⚙️", pros: "Standing seam and metal panels are increasingly popular in Texas. Highly hail-resistant, rated for 140+ mph winds, reflects heat, 40–70 year lifespan.", cons: "Higher upfront cost ($12–$25/sq ft installed). May qualify for insurance discounts. Some insurers require separate endorsement for full RCV on metal." },
              { name: "TPO / Flat Roofing", icon: "🏢", pros: "Common on low-slope roofs and additions. TPO membranes are UV-resistant and energy-efficient. Common in commercial and some Texas ranch-style homes.", cons: "Requires professional installation to avoid seam failures. Inspect annually for blistering or ponding water, especially after hail." },
              { name: "Tile & Concrete", icon: "🏛️", pros: "Clay and concrete tile are common in South Texas and San Antonio. Excellent longevity (50+ years), fire-resistant, handles heat well.", cons: "Heavy — requires engineered roof deck support. Hail can crack individual tiles. Replacement tiles can be hard to match on older roofs." },
            ].map((m) => (
              <div key={m.name} style={{ backgroundColor: "#f9fafb", borderRadius: "10px", padding: "22px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{m.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{m.name}</h3>
                <p style={{ color: "#374151", fontSize: "0.85rem", lineHeight: "1.65", marginBottom: "8px" }}><strong>Pros:</strong> {m.pros}</p>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: "1.65" }}><strong>Watch for:</strong> {m.cons}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TDLR Licensing */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ flex: "1", minWidth: "260px" }}>
              <span style={{ display: "inline-block", backgroundColor: "rgba(118,185,0,0.15)", color: "#a3e635", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Texas Law</span>
              <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800, lineHeight: 1.3, marginBottom: "16px" }}>TDLR Roofing Contractor Licensing in Texas</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "16px", fontSize: "0.95rem" }}>
                As of September 2019, Texas requires residential roofing contractors to be licensed through the <strong style={{ color: "white" }}>Texas Department of Licensing and Regulation (TDLR)</strong>. This law — Texas Occupations Code Chapter 1304 — was specifically created to protect homeowners from unqualified contractors flooding Texas after major storms.
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "16px", fontSize: "0.95rem" }}>
                A licensed roofer must carry general liability insurance and pass background checks. You can verify any contractor&apos;s TDLR license number at <strong style={{ color: "#76b900" }}>tdlr.texas.gov</strong> before signing any contract.
              </p>
              <Link href="/guides/storm-chaser-contractors-texas" style={{ display: "inline-block", backgroundColor: "#76b900", color: "#000", fontWeight: 700, padding: "12px 22px", borderRadius: "6px", textDecoration: "none", fontSize: "0.9rem" }}>
                Storm Chaser Guide →
              </Link>
            </div>
            <div style={{ flex: "1", minWidth: "260px" }}>
              <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <h3 style={{ color: "white", fontWeight: 700, fontSize: "1rem", marginBottom: "16px" }}>🚩 Red Flags — Walk Away If a Contractor:</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Cannot provide a TDLR license number",
                    "Shows up unsolicited right after a storm",
                    "Asks you to sign an Assignment of Benefits (AOB)",
                    "Demands full payment upfront",
                    "Has no verifiable local address or reviews",
                    "Pressures you to decide same day",
                    "Offers to waive your insurance deductible",
                    "Has only a P.O. box or out-of-state address",
                  ].map((flag) => (
                    <li key={flag} style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", marginBottom: "10px", lineHeight: 1.5 }}>
                      <span style={{ color: "#ef4444", flexShrink: 0, marginTop: "1px" }}>✕</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Claim Process */}
      <section style={{ backgroundColor: "#f3f4f6" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ color: "#76b900", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Insurance</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>How a Roofing Insurance Claim Works in Texas</h2>
            <p style={{ color: "#6b7280", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0" }}>Texas homeowners have specific rights under state law. The Texas Department of Insurance (TDI) sets timelines your insurer must follow.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {[
              { step: "1", title: "Document Before You Clean Up", body: "Take photos and video of all damage from every angle before removing debris or making temporary repairs. Date-stamp your photos. Courts and adjusters rely on this documentation if a claim is disputed." },
              { step: "2", title: "File Your Claim Promptly", body: "Texas law gives your insurer 15 days to acknowledge your claim and 15 additional business days to accept or reject it. Filing delays can give your insurer grounds to deny. File as soon as damage is confirmed." },
              { step: "3", title: "Get a Licensed Roofer's Assessment First", body: "Before your adjuster arrives, have a TDLR-licensed contractor inspect and document damage. Their scope can support your claim — adjusters sometimes miss items that a roofing professional will catch." },
              { step: "4", title: "Understand ACV vs RCV in Your Policy", body: "Actual Cash Value (ACV) policies pay depreciated value. Replacement Cost Value (RCV) policies pay to replace. On a 15-year-old roof, the difference can be thousands of dollars. Know which coverage you have before accepting a settlement." },
              { step: "5", title: "Review the Adjuster's Scope of Work", body: "Your insurer's estimate (scope) lists exactly what they will pay for. Review it with your contractor. If items are missing or pricing is too low, your contractor can submit a supplement — this is a normal part of the claims process." },
              { step: "6", title: "Do Not Sign Over Your Rights (AOB)", body: "Assignment of Benefits transfers your insurance claim rights to the contractor. This has led to fraud and inflated costs in Texas. Never sign an AOB — you can still hire any contractor you choose without giving up your rights." },
            ].map((s) => (
              <div key={s.step} style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "22px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", backgroundColor: "#76b900", color: "#000", fontWeight: 900, fontSize: "0.85rem", borderRadius: "50%", marginBottom: "12px" }}>{s.step}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.65", margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px" }}>
            <DisclaimerBox type="insurance" />
          </div>
        </div>
      </section>

      {/* Cost ranges */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 800, marginBottom: "24px", textAlign: "center" }}>Typical Roofing Costs in Texas (2025–2026)</h2>
          <p style={{ color: "#6b7280", textAlign: "center", marginBottom: "32px", fontSize: "0.9rem" }}>Prices vary significantly by city, roof size, material, and current demand after storms. These are rough ranges for planning purposes.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  {["Service", "Typical Range", "Notes"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: "#374151", fontWeight: 700, borderBottom: "2px solid #e5e7eb" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Roof Inspection", "$0–$250", "Many TDLR contractors offer free inspections after storms"],
                  ["Roof Repair (minor)", "$300–$1,500", "Missing shingles, small leaks, flashing"],
                  ["Roof Repair (major)", "$1,500–$6,000", "Multiple sections, storm damage patches"],
                  ["Full Replacement (asphalt)", "$8,000–$22,000", "Typical 1,500–2,500 sq ft home in Texas"],
                  ["Full Replacement (metal)", "$18,000–$50,000+", "Standing seam; higher longevity offsets cost"],
                  ["Emergency Tarp Service", "$300–$1,500", "Often partially covered by homeowner's policy"],
                ].map(([service, range, note]) => (
                  <tr key={service} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "12px 16px", color: "#111827", fontWeight: 600 }}>{service}</td>
                    <td style={{ padding: "12px 16px", color: "#76b900", fontWeight: 700 }}>{range}</td>
                    <td style={{ padding: "12px 16px", color: "#6b7280" }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "16px", textAlign: "center" }}>Estimates only. Get written quotes from at least two licensed contractors before committing.</p>
        </div>
      </section>

      <FAQ items={faqs} heading="Roofing FAQ" />
      <CTASection heading="Need a Roofer in Texas?" subheading="Submit a request and we will connect you with licensed local roofing professionals for inspection, repair, or replacement." primaryLabel="Get Roofing Help" secondaryLabel="View Roof Guide" secondaryHref="/guides/texas-storm-roof-repair-or-replace" />
    </>
  );
}

