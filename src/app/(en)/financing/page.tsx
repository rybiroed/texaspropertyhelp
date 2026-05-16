import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Home Repair Financing Help in Texas",
  description:
    "Explore repair financing options for Texas homeowners facing storm damage, roofing, HVAC, and emergency repair costs. Texas Property Help does not guarantee approval or financing terms.",
  alternates: pageAlternates("/financing", "/es/financing"),
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

export default function FinancingPage() {
  return (
    <>
      <section style={{ backgroundColor: "#000000" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Repair Financing
          </p>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Home Repair Financing Options for Texas Homeowners
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.7, marginBottom: "16px" }}>
            When insurance doesn't cover everything — or you need repair funding fast — there may be financing options available. We help homeowners understand what's out there.
          </p>
          <DisclaimerBox type="financing" />
          <div style={{ marginTop: "24px" }}>
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }} className="hover:opacity-90">
              Explore Financing Help →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#0a0a0a" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "32px" }}>
            Types of Repair Financing to Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {optionTypes.map((item) => (
              <div key={item.title} style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "4px", padding: "24px" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "var(--content-on-dark)", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Important notice */}
          <div style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333", borderLeft: "4px solid var(--accent)", borderRadius: "4px", padding: "20px", marginTop: "32px" }}>
            <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "10px" }}>
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
                <li key={tip} style={{ display: "flex", gap: "10px", fontSize: "0.875rem", color: "var(--content-on-dark)", marginBottom: "8px" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <DisclaimerBox type="financing" />
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
