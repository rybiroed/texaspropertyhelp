import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "HVAC Help in Texas",
  description:
    "Texas Property Help connects homeowners with HVAC repair and replacement resources. Get guidance on emergency AC repair, system replacement, and financing options across Texas.",
};

const faqs: FAQItem[] = [
  {
    question: "Is HVAC failure covered by homeowner's insurance?",
    answer:
      "Standard homeowner policies generally do not cover HVAC failure due to normal wear and aging. However, storm damage to an HVAC unit — such as hail striking a condenser — may be covered. Review your policy or contact your agent.",
  },
  {
    question: "What should I do if my AC stops working during a Texas summer?",
    answer:
      "For immediate relief: close blinds and curtains, use fans to circulate air, minimize heat-generating appliance use, and consider temporary accommodations if you have vulnerable household members (elderly, infants, pets). Then request emergency HVAC assistance.",
  },
  {
    question: "How long do HVAC systems typically last in Texas?",
    answer:
      "Texas HVAC systems often work harder due to extreme heat. Air conditioners in Texas may last 10–15 years, sometimes less, depending on maintenance and usage. A professional HVAC assessment can give you specific information about your system.",
  },
  {
    question: "Are there financing options for HVAC replacement?",
    answer:
      "Yes — several financing options may be available for HVAC replacement, including manufacturer financing, home improvement loans, and some utility rebate programs. Our financing page provides more information about exploring these options.",
  },
  {
    question: "Can storm damage cause HVAC problems?",
    answer:
      "Yes. Hail can dent and damage condenser fins and coils. Flooding can damage electrical components and the unit base. If you have storm damage and HVAC issues together, document both when filing your insurance claim.",
  },
];

export default function HVACPage() {
  return (
    <>
      <section style={{ backgroundColor: "#000000" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            HVAC Help
          </p>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            HVAC Repair & Replacement Help in Texas
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.7, marginBottom: "28px" }}>
            In Texas heat, a failed HVAC system is more than uncomfortable — it can be a health risk. Whether you need emergency repair or are evaluating replacement options, we can help connect you with the right resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }} className="hover:opacity-90">
              Request HVAC Help →
            </Link>
            <Link href="/financing" style={{ display: "inline-block", backgroundColor: "transparent", color: "var(--accent)", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid var(--accent)" }} className="hover:opacity-80">
              Explore Financing Options
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#0a0a0a" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "32px" }}>
            How We Help With HVAC Issues
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🚨", title: "Emergency HVAC Repair", body: "For urgent situations — especially during extreme Texas heat — we can help connect you with emergency HVAC service resources." },
              { icon: "🔧", title: "HVAC Repair Referrals", body: "We help connect homeowners with qualified HVAC technicians for diagnosis and repair of cooling, heating, and ventilation systems." },
              { icon: "🏗️", title: "System Replacement Help", body: "When repair is not cost-effective, we can help you understand the replacement process, what questions to ask, and how to evaluate quotes." },
              { icon: "⛈️", title: "Storm-Related HVAC Damage", body: "Hail and storms can damage outdoor HVAC units. We help you understand how storm damage to HVAC may relate to your insurance claim." },
              { icon: "💳", title: "HVAC Financing", body: "HVAC replacement is a significant cost. We can help you explore financing options that may reduce the upfront financial burden." },
              { icon: "📋", title: "Insurance Documentation", body: "If storm damage is involved, proper documentation of HVAC damage is important for a complete and accurate insurance claim." },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "4px", padding: "24px" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#c0c0c0", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Heat safety notice */}
          <div style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333", borderLeft: "4px solid var(--danger)", borderRadius: "4px", padding: "16px 20px", marginTop: "32px" }}>
            <p style={{ fontSize: "0.875rem", color: "#ffffff", fontWeight: 600, marginBottom: "6px" }}>
              ⚠️ Heat Safety Notice
            </p>
            <p style={{ fontSize: "0.8rem", color: "#c0c0c0", lineHeight: "1.6", margin: 0 }}>
              Extreme heat can be dangerous, especially for elderly individuals, young children, and those with medical conditions. If your HVAC has failed during a heat advisory, consider cooling centers, friends or family, or temporary accommodations while arranging repairs.
            </p>
          </div>

          <DisclaimerBox type="general" />
        </div>
      </section>

      <FAQ items={faqs} heading="HVAC Help FAQ" />
      <CTASection heading="HVAC Problem in Texas?" subheading="Submit a request and we'll help connect you with HVAC repair, replacement, and financing resources in your area." primaryLabel="Request HVAC Help" secondaryLabel="Explore Financing Options" secondaryHref="/financing" />
    </>
  );
}
