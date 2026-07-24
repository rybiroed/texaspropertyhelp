import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";

const TITLE = "Will Insurance Pay for a Roof Replacement in Texas?";
const URL = "https://texaspropertyhelp.com/guides/will-insurance-pay-roof-replacement-texas";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Whether your Texas insurance pays for a roof replacement comes down to cause of damage, roof age, and your wind/hail deductible. Real payout math, 2026 replacement costs, and what to do when the adjuster says no.",
  alternates: pageAlternates("/guides/will-insurance-pay-roof-replacement-texas", null),
  openGraph: {
    title: TITLE,
    description:
      "How much does insurance pay for roof replacement in Texas? See the real math on deductibles, depreciation, and denials — plus what to do if your claim is underpaid.",
    url: URL,
    siteName: "Texas Property Help",
    locale: "en_US",
    type: "article",
    images: [{ url: "https://texaspropertyhelp.com/images/roofing-hero.webp", width: 1200, height: 630, alt: "Texas roof replacement insurance guide" }],
  },
  twitter: { card: "summary_large_image" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description:
    "A Texas homeowner's guide to whether insurance covers roof replacement: what's covered, how payouts are calculated, why claims get denied, and how to dispute an underpayment.",
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  image: "https://texaspropertyhelp.com/images/roofing-hero.webp",
  author: { "@type": "Organization", name: "Texas Property Help", url: "https://texaspropertyhelp.com" },
  publisher: {
    "@type": "Organization",
    name: "Texas Property Help",
    url: "https://texaspropertyhelp.com",
    logo: { "@type": "ImageObject", url: "https://texaspropertyhelp.com/images/logo.png" },
  },
  mainEntityOfPage: URL,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://texaspropertyhelp.com" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://texaspropertyhelp.com/guides" },
    { "@type": "ListItem", position: 3, name: TITLE, item: URL },
  ],
};

const faqs = [
  {
    q: "Will homeowners insurance pay for a full roof replacement in Texas?",
    a: "It depends on the cause of damage, not the age of the roof. If a covered peril — hail, windstorm, a fallen tree — damaged enough of the roof that it cannot be repaired to match, most Texas policies pay for full replacement. If the adjuster determines the roof failed from age, wear, or poor maintenance, insurance pays nothing, because deterioration is excluded under every standard homeowners policy sold in Texas.",
  },
  {
    q: "How much does insurance pay for roof replacement in Texas?",
    a: "Your payout equals the covered repair cost, minus your wind and hail deductible, minus any non-recoverable depreciation. Texas wind/hail deductibles are usually a percentage of your dwelling coverage — commonly 1% to 5% — not a flat dollar amount. On a home insured for $350,000 with a 2% wind/hail deductible, the first $7,000 of any hail claim is yours to pay. If the replacement costs $18,000, the insurer's share is $11,000 on a replacement-cost policy.",
  },
  {
    q: "How much does a roof replacement cost in Texas in 2026?",
    a: "Most single-family asphalt shingle replacements in Texas fall between $9,000 and $22,000, driven mainly by square footage, pitch, and the number of layers being torn off. Metal roofing typically runs two to three times that. Prices spike in the weeks after a major hail event in a given metro, when demand outstrips local crews — one reason getting an estimate before storm season is worth doing.",
  },
  {
    q: "Can a Texas roofing contractor waive or cover my deductible?",
    a: "No. Under Texas Insurance Code § 707.002 it is illegal for a contractor to pay, waive, rebate, or absorb any part of your insurance deductible, and it is illegal for them to advertise that they will. A contractor offering to 'eat the deductible' or bill your insurer for an inflated amount to cover it is proposing insurance fraud, and the homeowner who agrees is exposed too. Walk away.",
  },
  {
    q: "What if my Texas insurance company underpays or denies my roof claim?",
    a: "Get a written, itemized estimate from a licensed independent contractor and compare it line by line against the adjuster's scope of loss. If the gap is significant, you can request a re-inspection with your contractor present, invoke the appraisal clause in your policy so a neutral umpire decides the amount, hire a licensed public adjuster, or file a complaint with the Texas Department of Insurance at 800-252-3439 or tdi.texas.gov.",
  },
  {
    q: "Does filing a roof claim in Texas raise my premium?",
    a: "It can. Claims are reported to the CLUE database and stay visible to insurers for about five to seven years. A single weather-related claim in a region where everyone filed after the same storm usually carries less penalty than repeated claims. Where homeowners get hurt is filing a small claim that barely exceeds the deductible — the payout is minor and the record follows the property.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const H2: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "1.35rem",
  fontWeight: 800,
  color: "var(--heading-primary)",
  marginBottom: "12px",
  marginTop: "44px",
};

const P: React.CSSProperties = { marginBottom: "16px" };

export default function WillInsurancePayRoofReplacementTexas() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Insurance Claims
            </span>
            <span style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px" }}>
              11 min read
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "16px" }}>
            Will Insurance Pay for a Roof Replacement in Texas?
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            The answer turns on one question the adjuster is trained to ask: did a storm break this roof, or did time? Everything about your payout follows from how that gets decided.
          </p>
        </div>
      </section>

      <article style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--content-primary)" }}>

          {/* Direct answer up top */}
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderLeft: "4px solid #16a34a", borderRadius: "8px", padding: "20px 24px", marginBottom: "36px" }}>
            <p style={{ fontWeight: 700, color: "#166534", marginBottom: "8px" }}>The short answer</p>
            <p style={{ color: "#14532d", margin: 0, fontSize: "0.95rem", lineHeight: 1.75 }}>
              Texas homeowners insurance pays for roof replacement when a <strong>covered peril</strong> — hail, windstorm, fallen tree, fire — causes damage severe enough that repair isn&apos;t practical. It pays nothing when the roof simply wore out. Your actual check equals the repair cost minus your wind/hail deductible, minus any depreciation you can&apos;t recover. On a typical Texas claim, that deductible alone is <strong>$3,500 to $17,500</strong>, because it&apos;s a percentage of your home&apos;s insured value rather than a flat amount.
            </p>
          </div>

          <p style={P}>
            Every spring, the same conversation plays out across Texas. A storm rolls through, a neighbor gets a new roof paid for by their insurer, and the homeowner two doors down files a nearly identical claim and gets denied. Same street. Same hail. Different outcome.
          </p>
          <p style={{ marginBottom: "40px" }}>
            The difference is almost never luck. It comes down to what the policy covers, how old the roof was, what the deductible is, and — more often than homeowners realize — how well the damage was documented before the adjuster arrived. This guide walks through all four.
          </p>

          {/* 1 */}
          <h2 style={H2}>1. What roof insurance actually covers in Texas</h2>
          <p style={P}>
            There is no such thing as a standalone roof policy here. Texas roof insurance is simply part of your dwelling coverage — the roof is the dwelling, and the same Coverage A limit and exclusions apply to it. Policies are written as <strong>named peril</strong> or <strong>open peril</strong> contracts, and what matters is the list of exclusions. Nearly every policy sold in this state covers roof damage caused by:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Hail impact — the single most common Texas roof claim</li>
            <li style={{ marginBottom: "8px" }}>Windstorm, including shingles lifted or torn off</li>
            <li style={{ marginBottom: "8px" }}>Falling objects, most often trees and limbs</li>
            <li style={{ marginBottom: "8px" }}>Fire, lightning, and explosion</li>
            <li style={{ marginBottom: "8px" }}>Weight of ice or snow, which does happen here — February 2021 proved it</li>
          </ul>
          <p style={P}>And what they exclude, in almost every case:</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Wear, tear, and age-related deterioration</li>
            <li style={{ marginBottom: "8px" }}>Manufacturing defects in the shingles themselves</li>
            <li style={{ marginBottom: "8px" }}>Poor workmanship from a previous installation</li>
            <li style={{ marginBottom: "8px" }}>Neglected maintenance — rot, unaddressed leaks, clogged drainage</li>
            <li style={{ marginBottom: "8px" }}>Cosmetic-only damage, if your policy carries a cosmetic damage exclusion</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            That last one deserves attention. Some Texas insurers now attach a <strong>cosmetic damage endorsement</strong> that excludes dents and marks which don&apos;t affect how the roof sheds water. On a metal roof, hail can leave a field of dimples that look terrible and change nothing functionally — and under that endorsement, you get nothing. Check your declarations page for the words &quot;cosmetic&quot; before you assume you&apos;re covered.
          </p>

          {/* 2 */}
          <h2 style={H2}>2. How much does insurance pay for roof replacement?</h2>
          <p style={P}>
            Three numbers determine your check: the covered cost of the work, your deductible, and depreciation. Here is how they interact on a realistic Texas claim.
          </p>
          <div style={{ overflowX: "auto", marginBottom: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ textAlign: "left", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>Line item</th>
                  <th style={{ textAlign: "right", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Home insured for (Coverage A)", "$350,000"],
                  ["Wind/hail deductible at 2%", "−$7,000"],
                  ["Contractor estimate, full replacement", "$18,400"],
                  ["Roof age at time of loss", "14 years"],
                  ["Depreciation withheld initially", "−$6,900"],
                  ["First check from insurer", "$4,500"],
                  ["Released after repairs are completed", "+$6,900"],
                  ["Total paid by insurer (RCV policy)", "$11,400"],
                  ["Your out-of-pocket", "$7,000"],
                ].map(([label, amount], i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "white" : "#f9fafb" }}>
                    <td style={{ padding: "10px 14px", border: "1px solid #e5e7eb" }}>{label}</td>
                    <td style={{ padding: "10px 14px", border: "1px solid #e5e7eb", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={P}>
            Notice the first check: <strong>$4,500 against an $18,400 job</strong>. Homeowners open that envelope and conclude they&apos;ve been cheated. Usually they haven&apos;t — that&apos;s how replacement-cost policies are structured. The withheld $6,900 comes back once the work is finished and the invoice is submitted.
          </p>
          <p style={{ marginBottom: "40px" }}>
            But it only comes back if you actually do the work, and most policies give you roughly <strong>12 months</strong> to claim it. Take the first check, skip the repairs, and that second payment is gone. If you have an actual cash value policy instead, there is no second payment at all — the depreciation is simply yours to absorb. Which type you hold is spelled out on your declarations page, and the difference is covered in detail in our{" "}
            <Link href="/guides/acv-vs-rcv-texas" style={{ color: "var(--accent)", fontWeight: 600 }}>ACV vs. RCV guide</Link>.
          </p>

          {/* 3 */}
          <h2 style={H2}>3. Texas wind and hail deductibles work differently than you expect</h2>
          <p style={P}>
            In most states, a homeowner thinks of their deductible as a flat number — $1,000, maybe $2,500. In Texas, wind and hail claims almost always carry a <strong>separate percentage deductible</strong> calculated against Coverage A, your dwelling limit. It is not calculated against the size of the claim.
          </p>
          <div style={{ overflowX: "auto", marginBottom: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ textAlign: "left", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>Home insured for</th>
                  <th style={{ textAlign: "right", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>1%</th>
                  <th style={{ textAlign: "right", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>2%</th>
                  <th style={{ textAlign: "right", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>5%</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["$250,000", "$2,500", "$5,000", "$12,500"],
                  ["$350,000", "$3,500", "$7,000", "$17,500"],
                  ["$500,000", "$5,000", "$10,000", "$25,000"],
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "white" : "#f9fafb" }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "10px 14px", border: "1px solid #e5e7eb", textAlign: j === 0 ? "left" : "right", fontVariantNumeric: "tabular-nums" }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginBottom: "40px" }}>
            This is why so many Texas hail claims quietly die. A homeowner with a 5% deductible on a $500,000 home needs more than <strong>$25,000</strong> of damage before the insurer pays a single dollar. A $14,000 roof replacement isn&apos;t a claim at that point — it&apos;s an out-of-pocket expense. Find your percentage on the declarations page before you file, and do the multiplication first.
          </p>

          {/* 4 */}
          <h2 style={H2}>4. How much does a roof replacement cost in Texas?</h2>
          <p style={P}>
            Knowing the market rate protects you twice: it tells you whether a claim is even worth filing, and it tells you whether the adjuster&apos;s scope is realistic.
          </p>
          <div style={{ overflowX: "auto", marginBottom: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ textAlign: "left", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>Roof type</th>
                  <th style={{ textAlign: "right", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>Typical Texas range</th>
                  <th style={{ textAlign: "right", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>Expected life</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["3-tab asphalt shingle", "$9,000 – $14,000", "15–20 yrs"],
                  ["Architectural shingle", "$12,000 – $22,000", "25–30 yrs"],
                  ["Impact-resistant (Class 4)", "$16,000 – $28,000", "30+ yrs"],
                  ["Standing seam metal", "$25,000 – $50,000", "40–50 yrs"],
                  ["Concrete or clay tile", "$30,000 – $60,000", "50+ yrs"],
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "white" : "#f9fafb" }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "10px 14px", border: "1px solid #e5e7eb", textAlign: j === 0 ? "left" : "right" }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginBottom: "40px" }}>
            Ranges assume a typical 1,800–2,600 sq ft single-story home. Steep pitch, multiple stories, and tearing off two existing layers all push toward the top of the range. One planning note worth knowing: many Texas insurers discount premiums for <strong>Class 4 impact-resistant shingles</strong>, and in a state that leads the country in hail losses, that discount can offset a meaningful share of the upgrade over the life of the roof.
          </p>

          {/* 5 */}
          <h2 style={H2}>5. Why Texas roof claims get denied — and what to do about it</h2>
          <p style={P}>
            The overwhelming majority of denials come down to one finding in the adjuster&apos;s report: <strong>the damage is wear and tear, not storm damage</strong>. Because deterioration is excluded, that single sentence closes the file.
          </p>
          <p style={P}>
            Sometimes it&apos;s correct. A 22-year-old roof at the end of its service life genuinely may have failed on its own. But the determination is a judgment call made during a visit that often lasts under an hour, and judgment calls can be wrong. Real hail damage on asphalt shingles looks specific:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Bruising</strong> — a soft spot that gives slightly under a thumb, like a bruise on fruit</li>
            <li style={{ marginBottom: "8px" }}><strong>Granule loss</strong> exposing the black mat underneath, in random scattered strikes rather than uniform wear</li>
            <li style={{ marginBottom: "8px" }}><strong>Collateral evidence</strong> — dents on gutters, downspouts, vents, window screens, and the AC condenser fins</li>
          </ul>
          <p style={{ marginBottom: "24px" }}>
            That third point is the one homeowners underuse. Shingle damage is arguable. A dented condenser and pocked window screens are not — they establish that hail of a damaging size struck the property, which makes the roof finding much harder to dismiss. Photograph all of it, from the ground, before anyone touches anything.
          </p>
          <div style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", borderLeft: "4px solid #ea580c", borderRadius: "8px", padding: "20px 24px", marginBottom: "24px" }}>
            <p style={{ fontWeight: 700, color: "#9a3412", marginBottom: "8px" }}>⚠️ Never let a contractor waive your deductible</p>
            <p style={{ color: "#7c2d12", margin: 0, fontSize: "0.925rem", lineHeight: 1.7 }}>
              Under <strong>Texas Insurance Code § 707.002</strong>, it is illegal for a contractor to pay, rebate, or absorb any part of your insurance deductible — and illegal to advertise that they will. When a roofer offers to &quot;take care of the deductible,&quot; the money comes from somewhere: inflating the invoice to your insurer. That is fraud, and as the policyholder who signed it, you are exposed alongside them. It is also the clearest single signal that you are talking to a storm chaser rather than an established local business.
            </p>
          </div>
          <p style={P}>If you believe the denial or the estimate is wrong, you have four escalating options:</p>
          <ol style={{ paddingLeft: "20px", marginBottom: "40px" }}>
            <li style={{ marginBottom: "12px" }}>
              <strong>Request a re-inspection with your contractor present.</strong> Free, and it resolves a surprising share of disputes — two professionals looking at the same slope often reach agreement that one alone would not.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Invoke the appraisal clause.</strong> Nearly every Texas policy contains one. Each side names an appraiser, the two select a neutral umpire, and the umpire&apos;s decision on the <em>amount</em> is binding. It resolves valuation disputes without litigation, and it&apos;s far faster.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Hire a licensed public adjuster.</strong> They work for you, not the insurer, and typically charge a percentage of the settlement. Verify the license through the Texas Department of Insurance before signing anything.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>File a TDI complaint.</strong> Free, takes about fifteen minutes, and insurers are required to respond. Call <strong>800-252-3439</strong> or file at <strong>tdi.texas.gov</strong>. Texas prompt-payment rules also impose deadlines on insurers for acknowledging, investigating, and paying claims — a pattern of unexplained delay is itself worth reporting.
            </li>
          </ol>

          {/* 6 */}
          <h2 style={H2}>6. Before you file: five things worth doing first</h2>
          <ol style={{ paddingLeft: "20px", marginBottom: "40px" }}>
            <li style={{ marginBottom: "12px" }}>
              <strong>Find your wind/hail deductible and multiply it out.</strong> If the number exceeds a realistic replacement cost, filing gains you nothing and puts a claim on your CLUE record.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Get an independent inspection before you call the insurer.</strong> A licensed contractor&apos;s written assessment, dated before the adjuster&apos;s visit, is the strongest documentation you can have. Verify any Texas roofer&apos;s licensing and insurance before letting them on your property.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Photograph everything, including the collateral damage.</strong> Gutters, screens, the AC unit, the fence, the mailbox. Timestamped, from the ground. Do not climb onto a storm-damaged roof.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Record the storm date and pull the public weather data.</strong> NOAA hail reports for your ZIP code on that date convert &quot;I think it hailed&quot; into evidence.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Keep a written log of every contact.</strong> Date, time, name, what was said, what was promised. If this ever becomes a dispute, that log is what turns your account into a record.
            </li>
          </ol>

          {/* FAQ */}
          <h2 style={H2}>Frequently asked questions</h2>
          <div style={{ marginBottom: "40px" }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ borderBottom: "1px solid var(--content-border)", padding: "18px 0" }}>
                <p style={{ fontWeight: 700, color: "var(--content-primary)", marginBottom: "8px" }}>{f.q}</p>
                <p style={{ color: "var(--content-secondary)", margin: 0, fontSize: "0.95rem", lineHeight: 1.75 }}>{f.a}</p>
              </div>
            ))}
          </div>

          {/* Related */}
          <div style={{ backgroundColor: "var(--off-white)", borderRadius: "10px", padding: "24px", marginBottom: "32px" }}>
            <p style={{ fontWeight: 700, color: "var(--content-primary)", marginBottom: "12px" }}>Related guides</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { href: "/guides/acv-vs-rcv-texas", label: "ACV vs. RCV — which policy type you have, and what it costs you" },
                { href: "/guides/texas-roof-insurance-claim-timeline", label: "The complete Texas roof claim timeline, step by step" },
                { href: "/guides/storm-chaser-contractors-texas", label: "How to spot a storm chaser before you sign" },
                { href: "/guides/texas-hail-damage-homeowner-checklist", label: "Texas hail damage checklist" },
              ].map((l) => (
                <li key={l.href} style={{ marginBottom: "8px" }}>
                  <Link href={l.href} style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.9375rem" }}>
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ borderTop: "1px solid var(--content-border)", paddingTop: "20px", marginBottom: "32px" }}>
            <p style={{ color: "var(--content-muted)", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
              This guide is general information for Texas homeowners, not legal or insurance advice. Policy language varies by carrier and by endorsement — your declarations page governs. For questions about a specific claim, contact the Texas Department of Insurance at 800-252-3439 or consult a licensed public adjuster or attorney.
            </p>
          </div>

          {/* CTA */}
          <div style={{ backgroundColor: "var(--navy)", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
            <h3 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>
              Not sure whether your roof damage is worth a claim?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "24px" }}>
              Tell us what happened and we&apos;ll connect you with a licensed Texas contractor for an independent assessment — before the adjuster sets the number. Free, and there&apos;s no obligation.
            </p>
            <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", textDecoration: "none" }}>
              Get a Free Assessment →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
