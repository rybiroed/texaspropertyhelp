import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "ACV vs RCV: What Texas Homeowners Need to Know Before Filing a Claim",
  description:
    "ACV (Actual Cash Value) vs RCV (Replacement Cost Value) is the most important policy detail in Texas roof claims. Learn the difference, how depreciation works, and how to get the most from your claim.",
  alternates: pageAlternates("/guides/acv-vs-rcv-texas", null),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ACV vs RCV: What Texas Homeowners Need to Know Before Filing a Claim",
  description:
    "ACV vs RCV is the most critical policy detail for Texas homeowners filing storm damage claims. Learn how depreciation works and how to maximize your payout.",
  datePublished: "2026-06-03",
  dateModified: "2026-06-03",
  author: { "@type": "Organization", name: "Texas Property Help" },
  publisher: {
    "@type": "Organization",
    name: "Texas Property Help",
    url: "https://texaspropertyhelp.com",
  },
  mainEntityOfPage: "https://texaspropertyhelp.com/guides/acv-vs-rcv-texas",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between ACV and RCV in Texas homeowners insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ACV (Actual Cash Value) pays you the current depreciated value of your damaged property — what a 10-year-old roof is worth today, not what it costs to replace. RCV (Replacement Cost Value) pays the full cost to replace your property with new materials at current prices, regardless of age. RCV policies typically cost more in premiums but pay significantly more after a major storm.",
      },
    },
    {
      "@type": "Question",
      name: "What is recoverable depreciation in a Texas insurance claim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With an RCV policy, your insurer first pays the ACV amount (minus your deductible). Once you complete the repairs and submit proof, they release the 'recoverable depreciation' — the difference between ACV and RCV. You must actually complete the repairs to receive this second payment. The window to claim recoverable depreciation is typically 12 months from the initial payment.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upgrade from ACV to RCV coverage in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, most Texas insurers offer an RCV endorsement you can add to an ACV policy. After a major hail event, some insurers in Texas temporarily suspend new RCV endorsements in affected counties — so the best time to upgrade is before storm season. Contact your agent to discuss the premium difference and whether your home qualifies.",
      },
    },
    {
      "@type": "Question",
      name: "How does depreciation affect my Texas roof claim payout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depreciation reduces your payout based on your roof's age and condition. A standard 30-year asphalt shingle roof depreciates roughly 2–3% per year. A 15-year-old roof might be depreciated 40–50% from its replacement value. On a $15,000 roof replacement, an ACV policy might only pay $7,000–$9,000 after depreciation — leaving you $6,000–$8,000 short if you can't recover the depreciation.",
      },
    },
  ],
};

export default function AcvVsRcvGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Insurance Claims
            </span>
            <span style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px" }}>
              10 min read
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "16px" }}>
            ACV vs. RCV: The Policy Detail That Determines How Much Texas Homeowners Actually Get Paid
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            Two Texas homeowners get identical hail damage. One gets a check for $15,000. The other gets $7,200. The difference isn't the damage — it's four letters buried in their declarations page.
          </p>
        </div>
      </section>

      {/* Article body */}
      <article style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--content-primary)" }}>

          <p style={{ marginBottom: "24px" }}>
            When a Texas hailstorm damages your roof, the single most important factor in how much your insurance company pays you isn't the size of the hail or the extent of the damage. It's whether your policy pays <strong>Actual Cash Value (ACV)</strong> or <strong>Replacement Cost Value (RCV)</strong>.
          </p>
          <p style={{ marginBottom: "40px" }}>
            This distinction can mean a difference of thousands — sometimes tens of thousands — of dollars on a single claim. Yet most Texas homeowners have never looked at which type they have. Here's everything you need to know.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            1. Actual Cash Value (ACV): What Your Old Roof Is Worth Today
          </h2>
          <p style={{ marginBottom: "16px" }}>
            An ACV policy pays you the current market value of the damaged property — what it's actually worth right now, accounting for age and depreciation. Not what it costs to replace it. What it's worth.
          </p>
          <p style={{ marginBottom: "16px" }}>
            Think of it like car insurance for a 10-year-old vehicle. If someone totals your 2014 Honda, insurance doesn't pay you the cost of a 2024 Honda — it pays you what your 2014 was worth the day before the accident.
          </p>
          <p style={{ marginBottom: "16px" }}>
            The same logic applies to your roof. A standard 30-year asphalt shingle roof depreciates approximately <strong>2–3% per year</strong>. After 15 years, your roof may be considered 50% depreciated. If a full replacement costs $18,000, your ACV check (after your deductible) might be $8,000–$9,000.
          </p>
          <div style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", borderLeft: "4px solid #ea580c", borderRadius: "8px", padding: "20px 24px", marginBottom: "24px" }}>
            <p style={{ fontWeight: 700, color: "#9a3412", marginBottom: "8px" }}>⚠️ The ACV Gap Problem in Texas</p>
            <p style={{ color: "#7c2d12", margin: 0, fontSize: "0.925rem", lineHeight: 1.7 }}>
              Texas has one of the most active hail markets in the U.S. After major storm events, many homeowners discover their ACV payout doesn't cover their contractor's minimum bid — leaving them to pay thousands out of pocket or defer repairs on a compromised roof. This is especially common in established neighborhoods where homes and roofs are 15–25 years old.
            </p>
          </div>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            2. Replacement Cost Value (RCV): What It Actually Costs to Fix
          </h2>
          <p style={{ marginBottom: "16px" }}>
            An RCV policy pays the full cost to replace your damaged property with new materials at current prices — regardless of how old the damaged materials were. A 20-year-old roof gets replaced at the cost of a brand-new roof.
          </p>
          <p style={{ marginBottom: "16px" }}>
            This is the policy type most Texas homeowners want. But RCV policies work in two stages:
          </p>
          <ol style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "12px" }}>
              <strong>Initial payment (ACV amount):</strong> Your insurer first cuts you a check for the ACV amount — the depreciated value minus your deductible. This is meant to get work started.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Recoverable depreciation payment:</strong> Once you complete the repairs and submit proof (contractor invoice, photos), your insurer releases the remaining "recoverable depreciation" — bringing your total payment up to full replacement cost.
            </li>
          </ol>
          <p style={{ marginBottom: "40px" }}>
            <strong>Critical detail:</strong> you must actually complete the repairs to receive the recoverable depreciation. If you pocket the ACV check and don't fix the roof, you don't receive the second payment. And most policies give you a window of <strong>12 months</strong> from the initial payment to claim it.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            3. Real Dollar Example: ACV vs. RCV on a Texas Roof Claim
          </h2>
          <div style={{ overflowX: "auto", marginBottom: "40px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ textAlign: "left", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>Scenario</th>
                  <th style={{ textAlign: "right", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>ACV Policy</th>
                  <th style={{ textAlign: "right", padding: "10px 14px", border: "1px solid #e5e7eb", fontWeight: 700 }}>RCV Policy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Full replacement cost", "$18,000", "$18,000"],
                  ["Roof age", "15 years", "15 years"],
                  ["Depreciation (50%)", "−$9,000", "−$9,000 (recoverable)"],
                  ["Wind/hail deductible (2%)", "−$6,000", "−$6,000"],
                  ["Initial check from insurer", "$3,000", "$3,000"],
                  ["After completing repairs", "N/A", "+$9,000 depreciation released"],
                  ["Total you receive", "$3,000", "$12,000"],
                  ["Out of pocket", "$15,000", "$6,000"],
                ].map(([label, acv, rcv], i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "white" : "#f9fafb" }}>
                    <td style={{ padding: "10px 14px", border: "1px solid #e5e7eb" }}>{label}</td>
                    <td style={{ padding: "10px 14px", border: "1px solid #e5e7eb", textAlign: "right" }}>{acv}</td>
                    <td style={{ padding: "10px 14px", border: "1px solid #e5e7eb", textAlign: "right", fontWeight: label === "Total you receive" ? 700 : 400 }}>{rcv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "8px" }}>
              *Example uses a $300,000 home with a 2% wind/hail deductible. Actual amounts vary by policy and insurer.
            </p>
          </div>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            4. How to Find Out Which Policy You Have
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Pull out your homeowners insurance declarations page — the one-page summary at the front of your policy packet. Look for:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>"Replacement Cost Coverage"</strong> or <strong>"RCV"</strong> listed under dwelling coverage → you have RCV</li>
            <li style={{ marginBottom: "8px" }}><strong>"Actual Cash Value"</strong> or <strong>"ACV"</strong> → you have ACV and will face depreciation deductions</li>
            <li style={{ marginBottom: "8px" }}><strong>Nothing clear?</strong> Call your agent and ask directly: "If my 15-year-old roof is totaled by hail, do I receive full replacement cost or actual cash value?"</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            Also check for a <strong>cosmetic exclusion endorsement</strong> — increasingly common in Texas after the DFW hail events. This exclusion eliminates coverage for hail damage that's only cosmetic (dents, marks) without functional impairment. If your policy has this, minor hail damage may not be covered at all.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            5. Can You Switch From ACV to RCV?
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Yes — most Texas insurers allow you to upgrade an ACV policy to RCV by adding an endorsement. The premium difference varies but is typically $200–$600 per year depending on your home's value and location.
          </p>
          <p style={{ marginBottom: "16px" }}>
            <strong>Important timing note:</strong> After a major hail event in Texas, many insurers temporarily suspend new RCV endorsements in affected counties (sometimes for 30–90 days). This is legal under Texas insurance regulations. The practical implication: you can't decide to upgrade after you've already got hail damage.
          </p>
          <p style={{ marginBottom: "40px" }}>
            The best time to review and upgrade your coverage is <strong>before storm season</strong> — February through April in Texas. Call your agent now if you're not sure what you have.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            6. Non-Recoverable Depreciation: When You Can't Get It Back
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Some Texas policies — even labeled as "RCV" — contain a provision for <strong>non-recoverable depreciation</strong> on certain components. Common examples:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Gutters (often depreciated separately from the roof)</li>
            <li style={{ marginBottom: "8px" }}>Skylights or flashing</li>
            <li style={{ marginBottom: "8px" }}>HVAC equipment (separate from dwelling coverage)</li>
            <li style={{ marginBottom: "8px" }}>Fencing and detached structures</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            Read the depreciation schedule in your policy carefully. Some components are treated as ACV even within an otherwise RCV policy. Your contractor should itemize everything that was damaged so you can verify each line item against your policy.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            7. What to Do If Your ACV Check Doesn't Cover Repairs
          </h2>
          <p style={{ marginBottom: "16px" }}>
            If you have an ACV policy and the check doesn't cover the work:
          </p>
          <ol style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "10px" }}><strong>Get a licensed contractor's written estimate</strong> — this gives you documentation of the actual gap between your payout and repair costs.</li>
            <li style={{ marginBottom: "10px" }}><strong>Request a re-inspection</strong> — if your adjuster missed damage, an independent contractor can document it and submit a supplement.</li>
            <li style={{ marginBottom: "10px" }}><strong>Invoke the appraisal clause</strong> — if you believe the valuation is wrong, Texas policies typically allow you to dispute it through an appraisal process.</li>
            <li style={{ marginBottom: "10px" }}><strong>File a TDI complaint</strong> — if your insurer acted in bad faith or violated Texas claims handling rules, the Texas Department of Insurance at 1-800-252-3439 handles complaints.</li>
            <li style={{ marginBottom: "10px" }}><strong>Consult a public adjuster</strong> — a licensed public adjuster works for you and can negotiate with your insurer to increase your settlement.</li>
          </ol>

          {/* CTA */}
          <div style={{ backgroundColor: "var(--navy)", borderRadius: "12px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
            <h3 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
              Not Sure What Your Policy Covers?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Texas Property Help connects homeowners with licensed contractors who can assess your damage, document it properly, and help you understand your claim before you sign anything.
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
              { href: "/guides/texas-storm-roof-repair-or-replace", label: "Texas Storm Season: Do You Need a New Roof or Just Repairs?" },
              { href: "/guides/texas-roof-insurance-claim-timeline", label: "Complete Texas Roof Insurance Claim Timeline" },
              { href: "/guides/texas-hail-damage-homeowner-checklist", label: "Texas Hail Damage Homeowner Checklist" },
              { href: "/guides/storm-chaser-contractors-texas", label: "Storm Chaser Contractors in Texas: How to Spot and Avoid Them" },
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
