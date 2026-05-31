import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Texas Storm Season: Do You Need a New Roof or Just Repairs?",
  description:
    "After a Texas storm, homeowners often wonder: does insurance cover a full roof replacement or just repairs? Learn how adjusters decide, what supplements mean, and how to protect yourself.",
  alternates: pageAlternates(
    "/guides/texas-storm-roof-repair-or-replace",
    null
  ),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Texas Storm Season: Do You Need a New Roof or Just Repairs?",
  description: "After a Texas storm, homeowners often wonder if insurance covers full replacement or just repairs. Learn how adjusters decide and how to protect your claim.",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  author: { "@type": "Organization", name: "Texas Property Help" },
  publisher: {
    "@type": "Organization",
    name: "Texas Property Help",
    url: "https://texaspropertyhelp.com",
  },
  mainEntityOfPage: "https://texaspropertyhelp.com/guides/texas-storm-roof-repair-or-replace",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Texas homeowner insurance cover full roof replacement after a storm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your policy and the damage. If the storm caused damage beyond a certain threshold (typically 25-30% of the roof), most insurers will approve replacement. Cosmetic damage alone often doesn't qualify. Your adjuster makes the initial determination, but you have the right to dispute it.",
      },
    },
    {
      "@type": "Question",
      name: "What is a roof supplement claim in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A supplement is when your contractor finds additional damage or costs after the initial insurance estimate and submits documentation to increase the approved payout. This is a legitimate and common process — not fraud — when the original estimate didn't cover all necessary work.",
      },
    },
    {
      "@type": "Question",
      name: "Is it fraud to file a roof insurance claim after a Texas storm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — filing a claim for legitimate storm damage is exactly what insurance is for. Fraud occurs when damage is fabricated or exaggerated. Filing a claim for real hail, wind, or storm damage is your right as a policyholder.",
      },
    },
  ],
};

export default function TexasStormRoofGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Storm Damage
            </span>
            <span style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px" }}>
              8 min read
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "16px" }}>
            Texas Storm Season: Do You Need a New Roof or Just Repairs?
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            After hail or high winds, Texas homeowners face the same question: will insurance pay for a full replacement — or just patches? Here's how it actually works.
          </p>
        </div>
      </section>

      {/* Article body */}
      <article style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--content-primary)" }}>

          {/* Intro */}
          <p style={{ marginBottom: "24px" }}>
            Texas sees more hail storms than almost any other state. After a storm rolls through your neighborhood, you may notice missing shingles, dents on vents, or water spots on your ceiling — and immediately wonder: <strong>is this a repair or a full replacement?</strong> And more importantly: <strong>what will my insurance actually cover?</strong>
          </p>
          <p style={{ marginBottom: "40px" }}>
            The answer depends on several factors — your policy type, the extent of damage, and how you document and present your claim. This guide breaks down how insurance companies evaluate storm roof claims in Texas, what "supplements" mean, and how to protect yourself through the process.
          </p>

          {/* Section 1 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            1. How Adjusters Decide: Repair vs. Replacement
          </h2>
          <p style={{ marginBottom: "16px" }}>
            When you file a roof claim after a storm, your insurance company sends an adjuster to inspect the damage. Their job is to determine whether the storm caused enough damage to warrant repair or full replacement.
          </p>
          <p style={{ marginBottom: "16px" }}>
            In Texas, most adjusters use a threshold approach: if a certain percentage of the roof area shows storm damage — typically <strong>25–30% or more</strong> — they approve full replacement. Below that threshold, they approve repairs only.
          </p>
          <p style={{ marginBottom: "16px" }}>
            The adjuster will look for:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Hail hits per 10 sq ft</strong> — a standard measurement of impact density</li>
            <li style={{ marginBottom: "8px" }}><strong>Bruising on shingles</strong> — soft spots that indicate structural damage (not just surface cosmetics)</li>
            <li style={{ marginBottom: "8px" }}><strong>Granule loss</strong> — protective coating removed by hail impact</li>
            <li style={{ marginBottom: "8px" }}><strong>Missing shingles or flashing</strong> — from high winds</li>
            <li style={{ marginBottom: "8px" }}><strong>Interior water damage</strong> — signs that the roof has already failed</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            <strong>Key point:</strong> adjusters are not infallible. Their initial estimate may miss damage that a roofing contractor can identify. This is where the supplement process becomes important.
          </p>

          {/* Section 2 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            2. ACV vs. RCV: The Policy Detail That Changes Everything
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Before you even file a claim, your policy type determines your maximum payout:
          </p>
          <div style={{ backgroundColor: "var(--content-bg-subtle)", border: "1px solid var(--content-border)", borderRadius: "10px", padding: "20px 24px", marginBottom: "24px" }}>
            <p style={{ marginBottom: "12px" }}><strong>ACV (Actual Cash Value)</strong> — pays for the current value of your roof, accounting for age and depreciation. A 15-year-old roof in poor condition may only be worth a fraction of replacement cost. Many homeowners are shocked by how little ACV covers.</p>
            <p style={{ margin: 0 }}><strong>RCV (Replacement Cost Value)</strong> — pays to replace your roof at today's prices, regardless of age. This is what most Texas homeowners want. You typically receive an initial ACV payment, then a second payment (the "recoverable depreciation") once the work is completed.</p>
          </div>
          <p style={{ marginBottom: "40px" }}>
            Check your policy declarations page right now — before a storm — to confirm which type you have.
          </p>

          {/* Section 3 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            3. What Is a Supplement Claim — and Is It Legitimate?
          </h2>
          <p style={{ marginBottom: "16px" }}>
            After your adjuster's estimate, your roofing contractor may find additional damage or costs not included in the original approval. When a contractor submits documentation to your insurer asking for additional payment, this is called a <strong>supplement</strong>.
          </p>
          <p style={{ marginBottom: "16px" }}>
            Supplements are completely legitimate when:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}>The adjuster missed damage (common with complex rooflines or limited inspection access)</li>
            <li style={{ marginBottom: "8px" }}>Material prices have increased since the estimate was written</li>
            <li style={{ marginBottom: "8px" }}>Code upgrades are required (local codes may require improvements to bring the roof up to current standards)</li>
            <li style={{ marginBottom: "8px" }}>Additional labor or disposal costs weren't included</li>
          </ul>
          <p style={{ marginBottom: "16px" }}>
            <strong>Be cautious when</strong> a contractor asks you to sign "right to represent" or "assignment of benefits" documents before you understand what they mean. This transfers control of your claim to the contractor and can complicate disputes later. Always read before signing.
          </p>
          <p style={{ marginBottom: "40px" }}>
            A legitimate contractor will explain the supplement process clearly, show you documentation of additional damage, and not pressure you into signing over claim rights upfront.
          </p>

          {/* Section 4 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            4. Is Filing a Storm Damage Claim "Fraud"?
          </h2>
          <p style={{ marginBottom: "16px" }}>
            No. Filing a claim for legitimate storm damage is your legal right as a policyholder. That is exactly what insurance is for. This misconception causes many Texas homeowners to avoid filing valid claims — and lose money they're entitled to.
          </p>
          <p style={{ marginBottom: "16px" }}>
            Insurance fraud involves: fabricating damage that didn't occur, exaggerating the extent of real damage, or deliberately damaging your own property. None of those apply to a homeowner documenting real hail damage after a Texas storm.
          </p>
          <p style={{ marginBottom: "40px" }}>
            Texas law also prohibits insurance companies from raising your rates solely because you filed one storm damage claim. Filing a legitimate claim does not automatically make you a high-risk policyholder.
          </p>

          {/* Section 5 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            5. How to Document Damage Before the Adjuster Arrives
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Strong documentation is the single most effective thing a homeowner can do to support their claim. Before the adjuster visits:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "40px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Photograph everything</strong> — roof surface, gutters, downspouts, vents, skylights, AC units, fences, and vehicles (hail damage to cars confirms the storm date and intensity)</li>
            <li style={{ marginBottom: "8px" }}><strong>Note the storm date</strong> — cross-reference with NWS storm reports (weather.gov) for your zip code</li>
            <li style={{ marginBottom: "8px" }}><strong>Do not make permanent repairs</strong> before the adjuster inspects — it can void coverage</li>
            <li style={{ marginBottom: "8px" }}><strong>Temporary repairs are fine</strong> — tarping an active leak is expected and covered; keep receipts</li>
            <li style={{ marginBottom: "8px" }}><strong>Get an independent inspection</strong> — a licensed roofer's written assessment before the adjuster visit gives you a comparison baseline</li>
          </ul>

          {/* Section 6 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            6. When to Dispute the Adjuster's Decision
          </h2>
          <p style={{ marginBottom: "16px" }}>
            If your claim is denied or underpaid, you have options:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Request a re-inspection</strong> — bring your contractor's written damage assessment and ask the insurer to reconsider</li>
            <li style={{ marginBottom: "8px" }}><strong>File a complaint with TDI</strong> — the Texas Department of Insurance (tdi.texas.gov) handles homeowner complaints against insurers</li>
            <li style={{ marginBottom: "8px" }}><strong>Invoke the appraisal clause</strong> — most Texas policies include an appraisal process for disputed claims; each party selects an appraiser and they agree on an umpire</li>
            <li style={{ marginBottom: "8px" }}><strong>Consult a public adjuster</strong> — a licensed public adjuster works for you (not the insurer) and can negotiate on your behalf</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            Texas has strict deadlines: insurers must acknowledge a claim within 15 days and accept or deny it within 15 business days of receiving documentation. Know your rights.
          </p>

          {/* CTA */}
          <div style={{ backgroundColor: "var(--navy)", borderRadius: "12px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
            <h3 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
              Dealing With Storm Damage Right Now?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Texas Property Help connects homeowners with qualified contractors and insurance claim guidance — free to submit, no obligation.
            </p>
            <Link
              href="/request-help"
              style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", textDecoration: "none" }}
            >
              Request Help Now →
            </Link>
          </div>
        </div>
      </article>

      {/* Related guides */}
      <section style={{ backgroundColor: "var(--off-white)" }} className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h3 style={{ color: "var(--heading-primary)", fontWeight: 700, fontSize: "1rem", marginBottom: "16px" }}>Related Guides</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "/guides/what-to-do-after-hail-damage-texas", label: "What to Do After Hail Damage in Texas" },
              { href: "/guides/texas-roof-insurance-claim-timeline", label: "Complete Texas Roof Insurance Claim Timeline" },
              { href: "/guides/texas-hail-damage-homeowner-checklist", label: "Texas Hail Damage Homeowner Checklist" },
            ].map((g) => (
              <Link key={g.href} href={g.href} style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none" }}>
                → {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
