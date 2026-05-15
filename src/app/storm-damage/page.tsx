import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Storm Damage Help in Texas",
  description:
    "Learn what to do after hail, wind, or storm damage to your Texas property. Texas Property Help connects homeowners with resources for damage assessment, insurance documentation, and emergency repair referrals.",
};

const steps = [
  { step: "1", title: "Ensure Safety First", body: "Before inspecting damage, confirm there are no structural hazards, downed power lines, or gas leaks. Contact 911 if there is immediate danger." },
  { step: "2", title: "Document Everything", body: "Take photos and video of all visible damage — roof, siding, windows, interior water damage — before any cleanup or temporary repairs." },
  { step: "3", title: "Make Temporary Repairs", body: "Cover broken windows and active roof leaks with tarps or boards to prevent additional water intrusion. Keep all receipts." },
  { step: "4", title: "Contact Your Insurance Company", body: "File a claim promptly. Most policies have deadlines. Note your claim number and adjuster's contact information." },
  { step: "5", title: "Request a Property Assessment", body: "Use Texas Property Help to request a referral for a professional damage assessment to support your insurance documentation." },
];

const faqs: FAQItem[] = [
  {
    question: "How long do I have to file a storm damage insurance claim in Texas?",
    answer:
      "Texas law generally requires homeowners to file a claim within one year of the date of the storm event, but your specific policy may have different deadlines. Contact your insurer immediately after storm damage.",
  },
  {
    question: "Does my homeowner's insurance cover hail damage?",
    answer:
      "Most standard Texas homeowner policies include coverage for hail and wind damage, but coverage amounts, deductibles, and exclusions vary. Review your policy's declarations page or contact your agent.",
  },
  {
    question: "What is an ACV vs RCV roof settlement?",
    answer:
      "ACV (Actual Cash Value) pays the depreciated value of your roof. RCV (Replacement Cost Value) pays what it costs to replace the damaged material. The difference matters significantly for older roofs. Review your policy type carefully.",
  },
  {
    question: "Can I get help if the storm happened weeks ago?",
    answer:
      "Yes — as long as you are still within your policy's claim window and damage is documented, you may still have options. We recommend acting quickly to avoid missing deadlines.",
  },
  {
    question: "What is a hail damage assessment and do I need one?",
    answer:
      "A hail damage assessment is a professional inspection of your roof and property for storm-related damage. It is often helpful for documenting damage for an insurance claim.",
  },
];

export default function StormDamagePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#000000" }} className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Storm Damage
          </p>
          <h1
            style={{
              color: "white",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Storm Damage Help for Texas Homeowners
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.7, marginBottom: "28px" }}>
            Hail, high winds, and severe weather can cause serious damage to your home. Knowing what steps to take — quickly and in the right order — can protect your property and your insurance claim.
          </p>
          <Link
            href="/request-help"
            style={{
              display: "inline-block",
              backgroundColor: "var(--accent)",
              color: "#000000",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 28px",
              borderRadius: "4px",
            }}
            className="hover:opacity-90"
          >
            Request Storm Damage Help →
          </Link>
        </div>
      </section>

      {/* What we help with */}
      <section style={{ backgroundColor: "#0a0a0a" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "32px" }}>
            Types of Storm Damage We Help With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🌨️", title: "Hail Damage", body: "Hail can damage roofing, gutters, siding, windows, HVAC units, and vehicles. Damage may not be visible from the ground." },
              { icon: "💨", title: "Wind Damage", body: "High winds can lift shingles, damage fascia boards, break windows, and knock down trees or fencing onto structures." },
              { icon: "💧", title: "Roof Leaks", body: "Storm-related roof leaks need prompt attention to prevent mold, structural damage, and additional interior damage." },
              { icon: "🌊", title: "Water Intrusion", body: "Flooding and water intrusion from storms can damage flooring, walls, and electrical systems. Documentation is critical." },
              { icon: "🌩️", title: "Emergency Tarping", body: "Temporary weatherproofing after storm damage can prevent additional loss and is often a covered service under your policy." },
              { icon: "📋", title: "Insurance Documentation", body: "Gathering the right documentation — photos, inspection reports, repair estimates — is essential for a smooth claim process." },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: "4px", padding: "24px" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{item.icon}</div>
                <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#c0c0c0", fontSize: "0.875rem", lineHeight: "1.6" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ backgroundColor: "#000000", borderTop: "1px solid #333" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "32px" }}>
            What to Do After Storm Damage
          </h2>
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.step} style={{ display: "flex", gap: "20px", backgroundColor: "#1a1a1a", borderRadius: "4px", padding: "24px", border: "1px solid #333333" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent)",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {s.step}
                </div>
                <div>
                  <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ color: "#c0c0c0", fontSize: "0.875rem", lineHeight: "1.6", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <DisclaimerBox type="insurance" />
        </div>
      </section>

      <FAQ items={faqs} heading="Storm Damage FAQ" />

      <CTASection
        heading="Storm Damage? Let Us Help You Get Started."
        subheading="Submit a request and we'll connect you with local resources for damage assessment, insurance claim support, and emergency repairs."
        primaryLabel="Request Help Now"
        secondaryLabel="View Storm Damage Guide"
        secondaryHref="/guides/what-to-do-after-hail-damage-texas"
      />
    </>
  );
}
