import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "TWIA Windstorm Insurance: The Complete Guide for Coastal Texas Homeowners",
  description:
    "If you own a home in coastal Texas, TWIA windstorm insurance may be required — and it's separate from your homeowners policy. Learn what it covers, how to file a claim, and how to avoid the wind-vs-flood dispute trap.",
  alternates: pageAlternates("/guides/twia-guide-coastal-texas", null),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "TWIA Windstorm Insurance: The Complete Guide for Coastal Texas Homeowners",
  description:
    "Texas Windstorm Insurance Association (TWIA) coverage is essential for coastal homeowners. Learn what it covers, how claims work, and how to handle the wind-vs-flood dispute.",
  datePublished: "2026-06-03",
  dateModified: "2026-06-03",
  author: { "@type": "Organization", name: "Texas Property Help" },
  publisher: {
    "@type": "Organization",
    name: "Texas Property Help",
    url: "https://texaspropertyhelp.com",
  },
  mainEntityOfPage: "https://texaspropertyhelp.com/guides/twia-guide-coastal-texas",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What counties in Texas are TWIA-eligible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TWIA covers 14 coastal counties and parts of Harris County. The TWIA-eligible counties are: Aransas, Brazoria, Calhoun, Cameron, Chambers, Galveston, Jefferson, Kenedy, Kleberg, Matagorda, Nueces, Refugio, San Patricio, and Willacy. Parts of Harris County in the seacoast territory are also eligible. Homeowners in these counties typically cannot get wind and hail coverage through a standard homeowners policy and must obtain a separate TWIA policy.",
      },
    },
    {
      "@type": "Question",
      name: "Does my regular homeowners insurance cover wind damage in coastal Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — standard homeowners policies in TWIA-eligible counties typically exclude wind and hail coverage. Your homeowners policy covers fire, theft, liability, and other perils, but wind damage from hurricanes and tropical storms requires a separate TWIA windstorm policy. If you don't have TWIA coverage and your home is damaged by hurricane winds, your regular homeowners policy will not pay the wind damage claim.",
      },
    },
    {
      "@type": "Question",
      name: "How does the wind-vs-flood dispute work in Texas hurricane claims?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In a hurricane, your home may suffer both wind damage (TWIA) and flood damage (NFIP flood insurance). These are covered by separate policies and separate insurers. Both will try to attribute as much damage as possible to the other — wind insurer says it's flood damage, flood insurer says it's wind damage. Thorough documentation immediately after a storm — especially watermarks showing exactly how high water rose vs. where wind damage stops — is your primary tool to resolve this dispute in your favor.",
      },
    },
    {
      "@type": "Question",
      name: "What is the TWIA deductible for hurricane damage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TWIA policies typically have a separate hurricane deductible that is higher than the regular policy deductible. The hurricane deductible is usually 2–5% of the dwelling's insured value and applies specifically to hurricane-designated storms. On a $300,000 home, a 2% hurricane deductible means $6,000 out of pocket before TWIA pays. Check your TWIA declarations page for your specific deductible percentage.",
      },
    },
  ],
};

export default function TwiaGuide() {
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
            <span style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Coastal Texas
            </span>
            <span style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px" }}>
              12 min read
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "16px" }}>
            TWIA Windstorm Insurance: The Complete Guide for Coastal Texas Homeowners
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            If you live in Galveston, Corpus Christi, or anywhere in coastal Texas, your standard homeowners policy almost certainly does not cover wind damage. TWIA is not optional — it's the coverage that determines whether a hurricane leaves you whole or financially devastated.
          </p>
        </div>
      </section>

      {/* Article body */}
      <article style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--content-primary)" }}>

          <p style={{ marginBottom: "24px" }}>
            The Texas Windstorm Insurance Association (TWIA) is the insurer of last resort for wind and hail coverage in Texas's coastal counties. It exists because private insurers largely refuse to offer windstorm coverage in areas exposed to Gulf hurricane risk — leaving coastal homeowners with no market alternative.
          </p>
          <p style={{ marginBottom: "40px" }}>
            Understanding TWIA — what it covers, how it works, how claims are filed, and especially how to handle the wind-versus-flood dispute that defines every major Gulf Coast hurricane claim — is essential for any homeowner in the 14 eligible coastal counties. This guide covers everything.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            1. What Is TWIA and Why Does It Exist?
          </h2>
          <p style={{ marginBottom: "16px" }}>
            TWIA (Texas Windstorm Insurance Association) was created by the Texas Legislature in 1971 after Hurricane Celia devastated Corpus Christi and private insurers began withdrawing wind coverage from coastal Texas. It is a state-created insurer of last resort — not a government agency, but an association of all insurers doing business in Texas who are required to participate.
          </p>
          <p style={{ marginBottom: "16px" }}>
            TWIA provides coverage for wind and hail damage specifically. It does not cover:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Flood or storm surge damage (covered by NFIP)</li>
            <li style={{ marginBottom: "8px" }}>Fire, theft, or liability (covered by your homeowners policy)</li>
            <li style={{ marginBottom: "8px" }}>Personal property (unless added via endorsement)</li>
          </ul>
          <div style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", borderLeft: "4px solid #ea580c", borderRadius: "8px", padding: "20px 24px", marginBottom: "40px" }}>
            <p style={{ fontWeight: 700, color: "#9a3412", marginBottom: "8px" }}>⚠️ The Coverage Gap Most Coastal Homeowners Don't Know About</p>
            <p style={{ color: "#7c2d12", margin: 0, fontSize: "0.925rem", lineHeight: 1.7 }}>
              After Hurricane Harvey (2017), thousands of Texas homeowners discovered they had a homeowners policy and flood insurance — but no TWIA windstorm policy. Their wind damage claims were denied because their homeowners policy excluded wind in TWIA-eligible counties. Check your declarations page right now to confirm you have all three layers of coverage where applicable.
            </p>
          </div>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            2. Which Texas Counties Require TWIA Coverage
          </h2>
          <p style={{ marginBottom: "16px" }}>
            TWIA coverage is available (and standard homeowners policies typically exclude wind) in 14 coastal counties and parts of Harris County:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "24px" }}>
            {[
              "Aransas County", "Brazoria County", "Calhoun County", "Cameron County",
              "Chambers County", "Galveston County", "Jefferson County", "Kenedy County",
              "Kleberg County", "Matagorda County", "Nueces County", "Refugio County",
              "San Patricio County", "Willacy County", "Parts of Harris County (seacoast territory)"
            ].map((county) => (
              <div key={county} style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "6px", padding: "8px 12px", fontSize: "0.875rem", color: "#166534", fontWeight: 500 }}>
                📍 {county}
              </div>
            ))}
          </div>
          <p style={{ marginBottom: "40px" }}>
            If your home is in one of these counties and you don't have a separate TWIA policy, contact your agent immediately. You cannot obtain TWIA coverage after a storm has been named or a watch has been issued for your area.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            3. What TWIA Covers
          </h2>
          <p style={{ marginBottom: "16px" }}>
            A standard TWIA windstorm policy covers:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Dwelling coverage</strong> — the structure of your home, including roof, walls, windows, and attached structures</li>
            <li style={{ marginBottom: "8px" }}><strong>Other structures</strong> — detached garages, fences, outbuildings (subject to limits)</li>
            <li style={{ marginBottom: "8px" }}><strong>Personal property</strong> — if you add the contents coverage endorsement (not included by default)</li>
            <li style={{ marginBottom: "8px" }}><strong>Additional living expenses (ALE)</strong> — if the home becomes uninhabitable due to covered wind damage</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            Coverage limits vary. The maximum TWIA dwelling coverage limit is $1.77 million for residential properties. If your home's replacement cost exceeds this, you'll need a separate excess windstorm policy through the private market.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            4. TWIA Deductibles: What You'll Pay Out of Pocket
          </h2>
          <p style={{ marginBottom: "16px" }}>
            TWIA policies have two deductibles:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
            <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "18px 20px" }}>
              <p style={{ fontWeight: 700, marginBottom: "6px" }}>Standard Deductible</p>
              <p style={{ color: "#4b5563", margin: 0, fontSize: "0.925rem" }}>Applies to non-hurricane wind and hail events. Typically a flat dollar amount ($500–$2,500) or 1% of insured value. This is the deductible for hail damage or wind damage from a regular storm (not a named hurricane).</p>
            </div>
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "18px 20px" }}>
              <p style={{ fontWeight: 700, marginBottom: "6px", color: "#991b1b" }}>Hurricane Deductible</p>
              <p style={{ color: "#7f1d1d", margin: 0, fontSize: "0.925rem" }}>Applies when damage occurs during a named hurricane. Typically <strong>2–5% of the insured dwelling value</strong>. On a $350,000 home: that's $7,000–$17,500 out of pocket before TWIA pays anything. This deductible triggers automatically when the National Hurricane Center issues a hurricane watch or warning for your county.</p>
            </div>
          </div>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            5. The Wind-vs-Flood Problem: The Most Contested Issue in Gulf Coast Claims
          </h2>
          <p style={{ marginBottom: "16px" }}>
            After a hurricane, your home may suffer both wind damage (TWIA) and flood damage (NFIP flood insurance). These are covered by two different policies, two different insurers, and subject to two different claims processes. Both insurers have financial incentive to attribute damage to the other's policy.
          </p>
          <p style={{ marginBottom: "16px" }}>
            This is called the wind-versus-flood dispute, and it was the defining controversy of Hurricane Harvey (2017), Hurricane Ike (2008), and Hurricane Rita (2005). The legal and financial battles from these disputes lasted years in Texas courts.
          </p>
          <p style={{ marginBottom: "16px" }}>
            How it plays out in practice:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "10px" }}><strong>TWIA adjuster:</strong> "The interior damage was caused by rising floodwater, not wind. We cover only the exterior roof and structural damage from wind."</li>
            <li style={{ marginBottom: "10px" }}><strong>NFIP adjuster:</strong> "The water intrusion came through the storm-damaged roof opening, not from ground flooding. That's a wind claim."</li>
            <li style={{ marginBottom: "10px" }}><strong>Result:</strong> Both deny significant portions of the claim. The homeowner is caught in the middle.</li>
          </ul>
          <div style={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd", borderLeft: "4px solid #0284c7", borderRadius: "8px", padding: "20px 24px", marginBottom: "40px" }}>
            <p style={{ fontWeight: 700, color: "#0c4a6e", marginBottom: "12px" }}>How to Protect Yourself: Documentation Strategy</p>
            <ul style={{ paddingLeft: "20px", margin: 0, color: "#0369a1" }}>
              <li style={{ marginBottom: "8px" }}><strong>Before the storm:</strong> Photograph the entire exterior and interior. Document the current condition of your roof, windows, doors, and foundation.</li>
              <li style={{ marginBottom: "8px" }}><strong>During the storm (if safe):</strong> Note the time sequence — when wind damage occurred vs. when water appeared.</li>
              <li style={{ marginBottom: "8px" }}><strong>Immediately after:</strong> Photograph watermarks on walls (showing maximum flood height), debris patterns, and where wind vs. water damage stops. Time-stamp everything.</li>
              <li style={{ marginBottom: "8px" }}><strong>Before anything is cleaned:</strong> Have a licensed contractor inspect and write separate reports for wind damage and water intrusion sources.</li>
              <li style={{ marginBottom: "8px" }}><strong>File both claims simultaneously</strong> — don't wait for one insurer's determination before filing with the other.</li>
            </ul>
          </div>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            6. How to File a TWIA Claim
          </h2>
          <ol style={{ paddingLeft: "20px", marginBottom: "40px" }}>
            <li style={{ marginBottom: "12px" }}>
              <strong>File immediately after damage:</strong> Call TWIA at 1-800-788-8247 or file online at twia.org. Document the exact date and time of filing.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Make temporary repairs to prevent further damage:</strong> Tarp your roof, board windows. Keep all receipts — TWIA reimburses reasonable emergency repair costs.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Get an independent contractor inspection first:</strong> Before TWIA's adjuster visits, have a licensed TDLR contractor inspect and document all damage in writing. This gives you a comparison baseline.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Cooperate with TWIA's adjuster — but document everything:</strong> Be present during the inspection. Take your own photos. Note what the adjuster does and doesn't look at.
            </li>
            <li style={{ marginBottom: "12px" }}>
              <strong>Review the estimate carefully:</strong> If the adjuster's estimate doesn't match your contractor's assessment, don't immediately accept it. You have options.
            </li>
          </ol>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            7. If You Disagree With Your TWIA Settlement
          </h2>
          <p style={{ marginBottom: "16px" }}>
            TWIA claims disputes follow specific procedures under Texas law:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "40px" }}>
            <li style={{ marginBottom: "10px" }}><strong>Request a re-inspection:</strong> Submit additional documentation from your contractor and formally request TWIA reconsider. Do this in writing.</li>
            <li style={{ marginBottom: "10px" }}><strong>Invoke the appraisal process:</strong> Your TWIA policy includes an appraisal clause — each party selects an appraiser and they agree on an umpire to resolve disputes. This is a formal process but often faster than litigation.</li>
            <li style={{ marginBottom: "10px" }}><strong>File a TDI complaint:</strong> The Texas Department of Insurance regulates TWIA. File a complaint at tdi.texas.gov or call 1-800-252-3439.</li>
            <li style={{ marginBottom: "10px" }}><strong>Consult a public adjuster:</strong> A licensed public adjuster can review your settlement, document additional damage, and negotiate with TWIA on your behalf. They work on contingency (a percentage of any additional settlement).</li>
          </ul>

          {/* CTA */}
          <div style={{ backgroundColor: "var(--navy)", borderRadius: "12px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
            <h3 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
              Dealing With Hurricane or TWIA Damage on the Texas Coast?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Texas Property Help connects coastal homeowners with licensed contractors experienced in TWIA claims and wind-vs-flood documentation — free to submit, no obligation.
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
              { href: "/guides/acv-vs-rcv-texas", label: "ACV vs. RCV: What Texas Homeowners Need to Know" },
              { href: "/guides/texas-roof-insurance-claim-timeline", label: "Complete Texas Roof Insurance Claim Timeline" },
              { href: "/guides/storm-chaser-contractors-texas", label: "Storm Chaser Contractors in Texas: How to Spot and Avoid Them" },
              { href: "/corpus-christi", label: "Corpus Christi Storm Damage Help" },
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
