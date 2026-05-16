import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Insurance Claim Help for Texas Homeowners",
  description:
    "Understand the homeowner insurance claim process in Texas. Texas Property Help provides general guidance on documentation, claim communication, and what to expect — not legal advice.",
  alternates: pageAlternates("/insurance-claims", "/es/insurance-claims"),
};

const processSteps = [
  { step: "1", title: "Review Your Policy", body: "Before filing, locate your homeowner's policy declarations page. Note your deductible, coverage type (ACV vs RCV), and any exclusions relevant to your damage type." },
  { step: "2", title: "Document the Damage", body: "Take thorough photos and video before any cleanup. Document the date, time, and cause of damage. Include interior and exterior damage, and any personal property affected." },
  { step: "3", title: "Make Temporary Repairs", body: "Prevent additional damage with temporary measures (tarps, board-ups). Keep all receipts — many policies cover reasonable emergency repair costs." },
  { step: "4", title: "File Your Claim", body: "Contact your insurance company to file the claim. You'll receive a claim number and be assigned an adjuster. Document all communication." },
  { step: "5", title: "Prepare for the Adjuster Visit", body: "The adjuster will inspect the property. Have your documentation ready. You are permitted to have your own contractor present to point out damage." },
  { step: "6", title: "Review the Settlement Offer", body: "Your insurer will provide a claim estimate. Review it carefully. If you disagree, you have the right to dispute the amount — consult a licensed public adjuster or attorney if needed." },
];

const faqs: FAQItem[] = [
  {
    question: "What is a public adjuster and do I need one?",
    answer:
      "A public adjuster is a licensed professional who represents your interests — not the insurer's — in a property damage claim. They may help maximize your settlement but typically charge a percentage of the claim. This is a personal decision. Texas Property Help does not recommend or endorse specific adjusters.",
  },
  {
    question: "What is a deductible and when do I pay it?",
    answer:
      "Your deductible is the portion of a covered loss you pay out of pocket before insurance pays. For example, if your deductible is $2,500 and the covered damage is $10,000, insurance would pay $7,500. Note: many Texas policies have separate, higher deductibles for named storms or hail.",
  },
  {
    question: "Can a contractor 'work with my insurance' to cover my deductible?",
    answer:
      "In Texas, it is illegal for a contractor to waive, absorb, or otherwise pay a homeowner's insurance deductible. This is insurance fraud. Be cautious of any contractor who suggests they can make your deductible 'disappear.'",
  },
  {
    question: "What happens if my claim is denied?",
    answer:
      "You have the right to dispute a denied claim. Options include requesting a re-inspection, filing a complaint with the Texas Department of Insurance, or consulting a licensed attorney or public adjuster.",
  },
  {
    question: "How long does a homeowner insurance claim take?",
    answer:
      "Texas law requires insurers to acknowledge claims within 15 days, accept or reject within 15 business days of receiving documentation, and pay within 5 business days of acceptance. Timelines can extend for complex claims.",
  },
  {
    question: "What is supplemental claim and when does it apply?",
    answer:
      "A supplement is an additional request for payment when new damage is discovered during repair that was not included in the original estimate. Document thoroughly and communicate changes to your insurer promptly.",
  },
];

export default function InsuranceClaimsPage() {
  return (
    <>
      <section style={{ backgroundColor: "#000000" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Insurance Claim Help
          </p>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Understanding the Homeowner Insurance Claim Process
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.7, marginBottom: "28px" }}>
            Filing a homeowner insurance claim can feel overwhelming. We provide general homeowner guidance on the process — not legal or insurance advice — to help you navigate with more confidence.
          </p>
          <DisclaimerBox type="legal" />
          <div style={{ marginTop: "24px" }}>
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px" }} className="hover:opacity-90">
              Get Help With Your Claim →
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #333" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "32px" }}>
            The General Claims Process
          </h2>
          <div className="space-y-4">
            {processSteps.map((s) => (
              <div key={s.step} style={{ display: "flex", gap: "20px", backgroundColor: "#1a1a1a", borderRadius: "4px", padding: "24px", border: "1px solid #333333" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ color: "var(--content-on-dark)", fontSize: "0.875rem", lineHeight: "1.6", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "4px", padding: "24px", marginTop: "32px" }}>
            <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", marginBottom: "16px" }}>📎 Key Documents to Keep</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Your insurance policy declarations page",
                "Claim number and adjuster contact information",
                "All written and email communication with your insurer",
                "Photos and video of all damage (dated)",
                "Contractor estimates and invoices",
                "Receipts for temporary repairs",
                "A damage log with dates and descriptions",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: "10px", fontSize: "0.875rem", color: "var(--content-on-dark)", paddingBottom: "8px", marginBottom: "8px", borderBottom: "1px solid #333333" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <DisclaimerBox type="insurance" />
        </div>
      </section>

      <FAQ items={faqs} heading="Insurance Claim FAQ" />

      <CTASection
        heading="Need Help Navigating a Property Insurance Claim?"
        subheading="Submit a request and we'll connect you with resources to help document your damage and understand the general claim process."
        primaryLabel="Get Help With Your Claim"
        secondaryLabel="View Claim Checklist Guide"
        secondaryHref="/guides/roof-insurance-claim-checklist"
      />
    </>
  );
}
