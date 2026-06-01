import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Roofing & Storm Damage FAQ | Texas Homeowner Questions Answered",
  description:
    "Answers to the most common questions Texas homeowners ask about roof damage, hail claims, insurance adjusters, storm chasers, and repair financing. Practical, no-fluff answers.",
  alternates: pageAlternates("/faq", "/es/faq"),
};

const faqs = [
  {
    q: "After hail — call the insurance company or the roofer first?",
    a: "Call a roofer first. Have an experienced local contractor inspect and document the damage before you file a claim. If you call the insurance company first, their adjuster may come out without you and write a minimum estimate. A roofer can be your witness during the adjuster visit and point out damage that might otherwise be missed.",
  },
  {
    q: "How long do I have to file a claim after a hail storm in Texas?",
    a: "Most Texas homeowner policies give you 365 days from the date of the storm to file a claim. However, the sooner the better — contractors get booked up quickly after major storms, and weather data confirming the hail event is freshest right after it happens. Don't wait months.",
  },
  {
    q: "Should I file a claim if the damage looks minor?",
    a: "Not always. Every claim goes into the CLUE database and can raise your premium by 20–40% for 3–5 years. Only file if there is real structural damage — broken shingles, visible impacts, or interior leaks. Cosmetic damage on an aging roof may not be worth a claim. Get a contractor's opinion first.",
  },
  {
    q: "The insurance company approved only part of my claim. What can I do?",
    a: "Ask your contractor to submit a supplement. This is a standard process where your roofer documents items the adjuster missed — flashing, ventilation, gutters, chimney work — and submits them to the insurer for additional payment. Most reputable contractors handle this routinely. Only consider a public adjuster for large disputes.",
  },
  {
    q: "My roof is over 15 years old — will insurance still cover it?",
    a: "It depends on your policy. Many Texas policies now pay ACV (Actual Cash Value) on roofs older than 10–15 years, which means they deduct for depreciation. Look for a 'Roof Payment Schedule' section in your policy. If it says ACV, be prepared to cover a significant portion out of pocket. Newer or upgraded policies may still pay RCV (Replacement Cost Value).",
  },
  {
    q: "What are storm chasers and should I work with them?",
    a: "Storm chasers are out-of-town crews that follow hail events, knock on doors, and promise to 'work with your insurance.' Quality is often poor and they may disappear after the job. Look for local contractors who have been operating in your area for 5–10+ years, are licensed by the state of Texas, and have verifiable reviews. Ask for their Texas contractor license number.",
  },
  {
    q: "My insurer says the damage is from wear and tear, not hail. What do I do?",
    a: "Request a re-inspection. Adjusters sometimes default to wear and tear. Have your contractor present at the re-inspection to point out fresh hail impacts. If the insurer still disagrees, check your policy for an appraisal clause — this lets you and the insurer each hire an independent appraiser, who together choose a neutral umpire to settle the dispute without going to court.",
  },
  {
    q: "My insurance company dropped me after a claim (non-renewed). What now?",
    a: "This is legal in Texas. After one or two claims, insurers can choose not to renew your policy — they must give 30–60 days notice. Your options include the Texas FAIR Plan (last-resort state coverage) or working with an independent insurance agent who can shop multiple carriers. Expect higher premiums, but coverage is better than none.",
  },
  {
    q: "Are Class 4 impact-resistant shingles worth the extra cost in Texas?",
    a: "Yes, in most cases. Many Texas insurers offer discounts of 15–30% on your premium for Class 4 impact-resistant shingles. The upgrade typically costs 15–25% more upfront. If you plan to stay in the home for 10+ years and your insurer offers the discount, the math often works in your favor. Confirm the discount amount with your insurer before committing.",
  },
  {
    q: "Should I sign an Assignment of Benefits (AOB) agreement?",
    a: "No — not without consulting an attorney first. An AOB transfers control of your insurance claim to the contractor. Reputable roofers do not require AOBs — they work under a standard repair contract and insurance checks come to you. If a contractor insists on an AOB as a condition of work, that is a red flag. Texas has seen significant fraud involving AOB abuse.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "340px", display: "flex", alignItems: "center" }} className="px-4 py-16">
        <Image src="/images/guides-hero.jpg" alt="Texas homeowner FAQ" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,20,10,0.50) 100%)" }} />
        <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(118,185,0,0.15)", color: "#76b900", border: "1px solid rgba(118,185,0,0.4)", fontSize: "0.8rem", fontWeight: 700, padding: "6px 16px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
            ❓ Homeowner FAQ
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(1.75rem, 4vw, 2.6rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "16px", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Roofing & Storm Damage:<br />Questions Texas Homeowners Ask
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Practical answers to the most common questions about hail damage, insurance claims, contractors, and repair financing in Texas.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section style={{ backgroundColor: "#f9fafb" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderLeft: "4px solid #76b900",
                  borderRadius: "4px",
                  padding: "28px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                <h2 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "12px", lineHeight: 1.4 }}>
                  <span style={{ color: "#76b900", fontWeight: 800, marginRight: "8px" }}>Q{i + 1}.</span>
                  {item.q}
                </h2>
                <p style={{ color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Related links */}
          <div style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "4px", padding: "28px", marginTop: "32px" }}>
            <h3 style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", marginBottom: "16px" }}>📚 Related Guides</h3>
            <ul className="space-y-3">
              {[
                { label: "How to Check Your Roof After a Storm in Texas", href: "/guides/how-to-check-roof-after-storm-texas" },
                { label: "Texas Hail Damage Homeowner Checklist", href: "/guides/texas-hail-damage-homeowner-checklist" },
                { label: "Complete Texas Roof Insurance Claim Timeline", href: "/guides/texas-roof-insurance-claim-timeline" },
                { label: "Texas Storm Season: Repair or Replace Your Roof?", href: "/guides/texas-storm-roof-repair-or-replace" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: "#76b900", fontWeight: 600, fontSize: "0.9rem" }} className="hover:underline">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        heading="Still Have Questions?"
        subheading="Submit your situation and we'll help connect you with the right guidance for your Texas property issue."
      />
    </>
  );
}
