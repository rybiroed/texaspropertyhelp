import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Home Repair Financing Help in Texas | Texas Property Help",
  description:
    "Explore repair financing options for Texas homeowners facing storm damage, roofing, HVAC, and emergency repair costs. Texas Property Help does not guarantee approval or financing terms.",
  alternates: pageAlternates("/financing", "/es/financing"),
  openGraph: {
    title: "Home Repair Financing Help in Texas | Texas Property Help",
    description: "Explore repair financing options for Texas homeowners. Get guidance on roofing loans, HVAC financing, and emergency repair funding when insurance doesn't cover everything.",
    url: "https://texaspropertyhelp.com/financing",
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://texaspropertyhelp.com/images/home-hero.jpg", width: 1200, height: 630, alt: "Home repair financing help in Texas" }],
  },
  twitter: { card: "summary_large_image" },
};

const optionTypes = [
  {
    icon: "🏠",
    title: "Home Improvement Loans",
    body: "Unsecured personal loans specifically for home repairs. No home equity required. Terms, rates, and approval vary by lender and applicant.",
  },
  {
    icon: "🏦",
    title: "Home Equity Options",
    body: "Homeowners with equity may access HELOCs or home equity loans. These use your home as collateral and typically offer lower interest rates.",
  },
  {
    icon: "🔧",
    title: "Contractor Financing",
    body: "Some contractors partner with financing companies to offer payment plans. Terms vary widely — review all agreements carefully before signing.",
  },
  {
    icon: "⚡",
    title: "Utility Rebate Programs",
    body: "Texas utility companies occasionally offer rebate or financing programs for HVAC upgrades. Check with your utility provider for current offerings.",
  },
  {
    icon: "🏛️",
    title: "Government Assistance Programs",
    body: "Following declared disasters, FEMA and other programs may provide assistance. Eligibility requirements apply. Visit disasterassistance.gov for current programs.",
  },
  {
    icon: "💳",
    title: "Credit Options",
    body: "0% intro APR credit cards may work for smaller repairs. Understand the terms fully — high interest rates apply if balances aren't paid within the promotional period.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "Can I finance roof replacement after a storm?",
    answer:
      "Yes, financing options may be available for roof replacement — whether or not you have an active insurance claim. The right option depends on your credit profile, equity, and the scope of work needed.",
  },
  {
    question: "Do I need good credit to get repair financing?",
    answer:
      "It depends on the financing type. Some programs are credit-score sensitive (personal loans, HELOCs), while others may have more flexible requirements. Texas Property Help does not make financing decisions — we help connect you with relevant resources to explore.",
  },
  {
    question: "How quickly can emergency repair financing be arranged?",
    answer:
      "Some personal loan products offer same-day or next-day funding. Others, like HELOCs, may take weeks. For emergency situations, ask specifically about processing timelines when exploring options.",
  },
  {
    question: "Is financing through a contractor safe?",
    answer:
      "Contractor financing can be legitimate, but read all terms carefully. Understand the lender, interest rate, loan term, and any penalties before agreeing. Never sign a financing agreement under pressure.",
  },
  {
    question: "Are there assistance programs for low-income Texas homeowners?",
    answer:
      "Yes — local nonprofit housing organizations, Community Action Agencies, and disaster relief funds may provide assistance. Eligibility and availability vary by location and program. Contact 211 Texas for local referrals.",
  },
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

export default function FinancingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center" }} className="px-4 py-20">
        <Image src="/images/financing-hero.jpg" alt="Home repair financing Texas" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(20,15,0,0.65) 0%, rgba(30,20,0,0.50) 100%)" }} />
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(118,185,0,0.15)", color: "#76b900", border: "1px solid rgba(118,185,0,0.4)", fontSize: "0.8rem", fontWeight: 700, padding: "6px 16px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            💳 Repair Financing
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Home Repair Financing Options<br />for Texas Homeowners
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.7, marginBottom: "16px" }}>
            When insurance doesn&apos;t cover everything — or you need repair funding fast — there may be financing options available. We help homeowners understand what&apos;s out there.
          </p>
          <DisclaimerBox type="financing" />
          <div style={{ marginTop: "24px" }}>
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }} className="hover:opacity-90">
              Explore Financing Help →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "1.6rem", fontWeight: 800, marginBottom: "32px" }}>
            Types of Repair Financing to Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {optionTypes.map((item) => (
              <div key={item.title} style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "4px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Important notice */}
          <div style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderLeft: "4px solid var(--accent)", borderRadius: "4px", padding: "20px", marginTop: "32px" }}>
            <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem", marginBottom: "10px" }}>
              📌 Before You Finance Any Repair
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Get multiple written estimates from licensed contractors",
                "Verify that insurance is not covering the work before financing it",
                "Read all loan or financing terms fully before signing",
                "Understand the interest rate, monthly payment, and total cost",
                "Never make payment decisions under pressure from a contractor",
              ].map((tip) => (
                <li key={tip} style={{ display: "flex", gap: "10px", fontSize: "0.875rem", color: "#4b5563", marginBottom: "8px" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <DisclaimerBox type="financing" />
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ display: "inline-block", background: "rgba(118,185,0,0.15)", color: "#a3e635", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Compare Options</span>
            <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>Financing Options Side-by-Side</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "10px auto 0" }}>Every situation is different — credit score, home equity, and urgency all affect which option fits best.</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr>
                  {["Option", "Typical Rate", "Speed", "Requires Equity", "Best For"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "11px 14px", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Personal Loan", "7–36% APR", "1–5 days", "No", "Fast funding, no equity needed"],
                  ["HELOC", "Prime + margin", "2–6 weeks", "Yes", "Large projects, ongoing repairs"],
                  ["Home Equity Loan", "6–10% APR", "2–4 weeks", "Yes", "Fixed large amount, predictable payment"],
                  ["Contractor Financing", "0–18%+ APR", "Same day", "No", "Quick, but read terms carefully"],
                  ["Credit Card (0% intro)", "0% then 20%+", "Instant", "No", "Small repairs under $5K"],
                  ["PACE Loan (Texas)", "Varies", "1–2 weeks", "Yes (via property tax)", "Energy-efficient HVAC, solar, roofing"],
                  ["FEMA / SBA (disaster)", "~4% (SBA)", "Weeks–months", "No", "After declared disaster only"],
                ].map(([opt, rate, speed, equity, best]) => (
                  <tr key={opt} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "12px 14px", color: "white", fontWeight: 600 }}>{opt}</td>
                    <td style={{ padding: "12px 14px", color: "#a3e635" }}>{rate}</td>
                    <td style={{ padding: "12px 14px", color: "rgba(255,255,255,0.7)" }}>{speed}</td>
                    <td style={{ padding: "12px 14px", color: equity === "No" ? "#4ade80" : "#fca5a5" }}>{equity}</td>
                    <td style={{ padding: "12px 14px", color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: "14px", textAlign: "center" }}>Rates are illustrative ranges. Actual terms depend on your credit profile and lender. Texas Property Help does not offer financing directly.</p>
        </div>
      </section>

      {/* PACE & Disaster Programs */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 800 }}>Texas-Specific Programs Worth Knowing</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "18px" }}>
            {[
              {
                icon: "⚡",
                title: "PACE Financing (Texas)",
                body: "Property Assessed Clean Energy loans let homeowners finance energy-efficient upgrades — HVAC, roofing, insulation, solar — repaid through property tax assessments. Available in many Texas counties. No credit check required in most programs. Repayment stays with the property if you sell.",
                tag: "Energy upgrades",
                tagColor: "#16a34a",
              },
              {
                icon: "🏛️",
                title: "FEMA Individual Assistance",
                body: "After a federally declared disaster, FEMA's Individual Assistance program may cover emergency home repairs not covered by insurance. Grants do not need to be repaid. Apply at disasterassistance.gov within the application window after a disaster declaration.",
                tag: "Disaster only",
                tagColor: "#dc2626",
              },
              {
                icon: "🏦",
                title: "SBA Home Disaster Loans",
                body: "The Small Business Administration offers low-interest disaster loans (around 4% APR) for homeowners after a declared disaster — even if you're not a business. Up to $200,000 for home repair, up to $40,000 for personal property. Better terms than most personal loans.",
                tag: "Disaster only",
                tagColor: "#dc2626",
              },
              {
                icon: "📞",
                title: "211 Texas",
                body: "Call or text 211 to connect with local Community Action Agencies, nonprofit housing organizations, and emergency assistance funds. Programs vary by county and funding availability. Often the fastest way to find local low-income assistance for urgent repairs.",
                tag: "Low-income help",
                tagColor: "#7c3aed",
              },
              {
                icon: "🌞",
                title: "Utility Rebate Programs",
                body: "CPS Energy, Oncor, AEP Texas, and other Texas utilities offer rebates for high-efficiency HVAC systems. Rebates range from $200–$1,500+ depending on the utility and unit SEER rating. Check your utility's website before purchasing a replacement unit.",
                tag: "HVAC & efficiency",
                tagColor: "#0369a1",
              },
              {
                icon: "🏠",
                title: "Texas GLO Homeowner Assistance",
                body: "The Texas General Land Office administers federal Community Development Block Grant (CDBG) funds after major storms. These programs help low-to-moderate income homeowners repair or rebuild. Availability depends on disaster declarations and funding cycles.",
                tag: "Post-disaster",
                tagColor: "#b45309",
              },
            ].map(p => (
              <div key={p.title} style={{ background: "white", borderRadius: "12px", padding: "22px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "8px" }}>{p.icon}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                  <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem" }}>{p.title}</h3>
                  <span style={{ background: `${p.tagColor}18`, color: p.tagColor, border: `1px solid ${p.tagColor}40`, fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>{p.tag}</span>
                </div>
                <p style={{ color: "#6b7280", fontSize: "0.84rem", lineHeight: 1.7, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#111827", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, marginBottom: "28px", textAlign: "center" }}>How to Approach Repair Financing — Step by Step</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { n: "1", t: "Confirm what insurance will (and won't) cover", b: "Never finance work that insurance should cover. Get the insurer's written scope first, then identify the gap you need to fund." },
              { n: "2", t: "Get two or three contractor quotes", b: "Written estimates let you compare financing amounts. Some lenders require a signed contract before funding — have this ready." },
              { n: "3", t: "Check your credit score before applying", b: "Knowing your score helps you target lenders with realistic approval odds. Multiple hard inquiries in a short window have minimal impact on your score." },
              { n: "4", t: "Compare total cost, not just monthly payment", b: "A lower monthly payment on a 10-year loan can cost far more total than a higher payment on a 3-year loan. Calculate total interest paid." },
              { n: "5", t: "Read every line before signing", b: "Check for prepayment penalties, automatic renewals, and rate adjustment clauses. Never sign under pressure from a contractor." },
            ].map(s => (
              <div key={s.n} style={{ display: "flex", gap: "16px", background: "#f9fafb", borderRadius: "10px", padding: "16px 20px", border: "1px solid #e5e7eb" }}>
                <div style={{ width: "30px", height: "30px", background: "#76b900", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.85rem", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ color: "#111827", fontWeight: 700, fontSize: "0.9rem", marginBottom: "4px" }}>{s.t}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.6 }}>{s.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} heading="Repair Financing FAQ" />

      <CTASection
        heading="Need Help Exploring Repair Financing?"
        subheading="Submit a request and we'll connect you with resources to help evaluate your options for funding emergency and planned home repairs."
        primaryLabel="Request Financing Help"
        secondaryLabel="View HVAC Financing Basics Guide"
        secondaryHref="/guides/hvac-replacement-financing-basics"
      />
    </>
  );
}
