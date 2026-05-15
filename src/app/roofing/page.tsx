import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Roofing Help in Texas",
  description:
    "Texas Property Help connects homeowners with roofing inspection, repair, and replacement resources. Learn what to expect and how to navigate insurance-related roof claims.",
};

const roofServices = [
  { icon: "🔍", title: "Roof Inspection", body: "A professional inspection can identify damage, assess remaining lifespan, and document issues for insurance claims." },
  { icon: "🔧", title: "Roof Repair", body: "Partial repairs for specific damage areas — missing shingles, flashing issues, small leaks — when full replacement is not needed." },
  { icon: "🏗️", title: "Roof Replacement", body: "Full re-roofing when damage is extensive, the roof is at end of life, or an insurer requires replacement after a covered loss." },
  { icon: "📋", title: "Insurance Claim Support", body: "Understanding what roofing documentation your insurer needs and how to communicate effectively throughout the claim process." },
  { icon: "💧", title: "Emergency Leak Response", body: "Active roof leaks need immediate attention. We can connect you with emergency response resources." },
  { icon: "💳", title: "Financing Options", body: "Roofing costs can be significant. Explore financing options that may help when insurance does not cover the full cost." },
];

const faqs: FAQItem[] = [
  {
    question: "How do I know if I need a roof repair or full replacement?",
    answer:
      "The decision depends on the extent and type of damage, the age of your roof, and your insurance policy terms. A professional inspection can give you factual information to help make an informed decision. We can connect you with an inspector.",
  },
  {
    question: "Will my insurance pay for a new roof?",
    answer:
      "Whether insurance covers roof work depends on your specific policy, the cause of damage, the age of the roof, and whether the damage meets your deductible threshold. Insurance companies make this determination based on their assessment — it is not guaranteed.",
  },
  {
    question: "What is the difference between roof repair and roof replacement?",
    answer:
      "Roof repair addresses specific damaged sections while leaving the rest of the roof intact. Replacement involves removing the existing roofing material and re-roofing the entire structure. Your insurer, contractor, and roof inspection results will inform which is appropriate.",
  },
  {
    question: "How long does a roof replacement typically take in Texas?",
    answer:
      "Most residential roof replacements take one to three days, depending on the size of the home, the roofing material, weather conditions, and the contractor's schedule. This timeline should be confirmed with whichever contractor you hire.",
  },
  {
    question: "Can I choose my own roofing contractor for an insurance claim?",
    answer:
      "In Texas, homeowners generally have the right to choose their own licensed contractor. However, you should confirm with your insurer what documentation and estimates they require. Contractors you hire should be willing to provide detailed written estimates.",
  },
];

export default function RoofingPage() {
  return (
    <>
      <section style={{ backgroundColor: "#000000" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Roofing Help
          </p>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Roofing Help for Texas Homeowners
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.7, marginBottom: "28px" }}>
            From routine inspections to storm-related replacements, roofing issues require careful documentation and informed decisions. We help you understand your options and connect with the right professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }} className="hover:opacity-90">
              Request Roofing Help →
            </Link>
            <Link href="/guides/roof-insurance-claim-checklist" style={{ display: "inline-block", backgroundColor: "transparent", color: "var(--accent)", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid var(--accent)" }} className="hover:opacity-80">
              Roof Claim Checklist
            </Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#0a0a0a" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "32px" }}>
            Roofing Services We Help With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roofServices.map((item) => (
              <div key={item.title} style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "4px", padding: "24px" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#c0c0c0", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>
          <DisclaimerBox type="insurance" />
        </div>
      </section>

      <FAQ items={faqs} heading="Roofing Questions" />
      <CTASection heading="Need Help With a Roofing Issue?" subheading="Submit a request to connect with roofing inspection, repair, replacement, and insurance documentation resources." primaryLabel="Request Roofing Help" secondaryLabel="Browse Roofing Guides" secondaryHref="/guides" />
    </>
  );
}
