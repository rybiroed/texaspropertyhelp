import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "What to Do After Hail Damage in Houston, TX",
  description:
    "Step-by-step guide for Houston homeowners after hail damage: how to document damage, file an insurance claim, choose a contractor, and avoid common mistakes in the Houston area.",
  alternates: pageAlternates("/guides/hail-damage-houston-tx", null),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What to Do After Hail Damage in Houston, TX",
  description: "Step-by-step guide for Houston homeowners after hail damage — documentation, insurance claims, contractor selection.",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  author: { "@type": "Organization", name: "Texas Property Help" },
  publisher: { "@type": "Organization", name: "Texas Property Help", url: "https://texaspropertyhelp.com" },
  mainEntityOfPage: "https://texaspropertyhelp.com/guides/hail-damage-houston-tx",
  about: { "@type": "City", name: "Houston", containedInPlace: { "@type": "State", name: "Texas" } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long do I have to file a hail damage insurance claim in Houston?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Texas homeowner policies require you to file within 1 year of the storm date, but some policies have shorter windows. File as soon as possible — the longer you wait, the harder it is to prove the storm caused the damage.",
      },
    },
    {
      "@type": "Question",
      name: "Does Houston's humidity affect roof damage after hail?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Houston's heat and humidity accelerate deterioration after hail damage. Cracked or bruised shingles absorb moisture faster in humid climates, making temporary repairs and quick professional inspection especially important.",
      },
    },
    {
      "@type": "Question",
      name: "What size hail causes roof damage in Houston?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hail 1 inch (quarter-size) or larger typically causes functional damage to asphalt shingles. Hail 3/4 inch can damage softer materials like aluminum gutters and AC units. Houston regularly sees hail up to 2–3 inches during severe storm season.",
      },
    },
  ],
};

export default function HailDamageHoustonGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Storm Damage · Houston
            </span>
            <span style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px" }}>
              7 min read
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "16px" }}>
            What to Do After Hail Damage in Houston, TX
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            Houston sees some of the most severe hail in the country. Here's exactly what to do in the first 48 hours — and the weeks after — to protect your home and your insurance claim.
          </p>
        </div>
      </section>

      {/* Article */}
      <article style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--content-primary)" }}>

          <p style={{ marginBottom: "24px" }}>
            The Houston metro area is one of the most hail-prone regions in the United States. A storm that drops quarter-size hail across Harris County can damage thousands of roofs in a single afternoon — and the aftermath is where most homeowners make costly mistakes.
          </p>
          <p style={{ marginBottom: "40px" }}>
            This guide walks you through what to do after hail damage in Houston, TX — from the moment the storm passes to the day your roof is repaired or replaced.
          </p>

          {/* Step 1 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            1. Wait for the Storm to Pass — Then Do a Safe Walk-Around
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Don't go on your roof during or immediately after a hail storm. Wait until the weather clears and it's safe to walk outside. Then do a ground-level inspection:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Check your <strong>vehicles</strong> — dents on cars confirm hail size and that the storm actually hit your property (critical for insurance)</li>
            <li style={{ marginBottom: "8px" }}>Look at <strong>AC condenser units</strong> — fins bent or dented = hail hit hard enough to damage roofing</li>
            <li style={{ marginBottom: "8px" }}>Inspect <strong>gutters and downspouts</strong> — dings and dents are easy to photograph and document</li>
            <li style={{ marginBottom: "8px" }}>Check <strong>window screens, wood trim, and fencing</strong> — hail marks on soft surfaces document storm intensity</li>
            <li style={{ marginBottom: "8px" }}>Look for <strong>granules in gutters</strong> — if your downspouts are draining dark, sandy material, your shingles took a hit</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            <strong>Houston-specific tip:</strong> In Houston's humidity, damaged shingles absorb moisture within days. Don't delay your inspection — what looks like surface damage can become interior water damage within weeks.
          </p>

          {/* Step 2 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            2. Document Everything Before Touching Anything
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Your documentation is your evidence. Before making any repairs — even temporary ones — photograph and video everything:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}>Date and timestamp every photo (your phone does this automatically)</li>
            <li style={{ marginBottom: "8px" }}>Photograph damage from multiple angles — close-up and wide shot</li>
            <li style={{ marginBottom: "8px" }}>Include street-level context shots showing your address</li>
            <li style={{ marginBottom: "8px" }}>Record video walking the perimeter</li>
            <li style={{ marginBottom: "8px" }}>Screenshot the NWS storm report for your zip code at <strong>weather.gov</strong> — this officially documents the storm date and intensity</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            Save everything to cloud storage (Google Photos, iCloud) immediately. Insurance adjusters have seen claims where all photos were on a lost or damaged phone.
          </p>

          {/* Step 3 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            3. Make Temporary Repairs — But Keep All Receipts
          </h2>
          <p style={{ marginBottom: "16px" }}>
            If your roof has an active leak, you're expected to prevent additional damage. Tarp the affected area or cover broken windows. Your insurance policy covers "reasonable temporary repairs" — but only if you document them properly:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Keep all receipts for materials (tarps, boards, sealant)</li>
            <li style={{ marginBottom: "8px" }}>Take photos before and after the temporary repair</li>
            <li style={{ marginBottom: "8px" }}>Do <strong>not</strong> make permanent repairs before the adjuster inspects — this can void your coverage</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            If a contractor tries to immediately tear off your roof before your claim is approved, decline. You need the adjuster to see the original damage.
          </p>

          {/* Step 4 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            4. File Your Insurance Claim — Promptly
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Contact your insurance company as soon as possible after documenting the damage. Most Texas policies require claims to be filed within <strong>1 year</strong> of the storm, but filing quickly matters for several reasons:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}>After major Houston storms, adjusters are booked weeks out — earlier claims get earlier inspections</li>
            <li style={{ marginBottom: "8px" }}>Contractors in Houston fill up fast after widespread hail events</li>
            <li style={{ marginBottom: "8px" }}>Waiting allows secondary damage (moisture, mold) that can complicate your claim</li>
          </ul>
          <p style={{ marginBottom: "16px" }}>
            When you call, have ready: your policy number, the storm date, a description of visible damage, and your documentation photos.
          </p>
          <p style={{ marginBottom: "40px" }}>
            Write down your <strong>claim number</strong> and the adjuster's name and contact info. Texas law requires your insurer to acknowledge your claim within 15 days and decide within 15 business days of receiving all documentation.
          </p>

          {/* Step 5 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            5. Get an Independent Roof Inspection Before the Adjuster Visits
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Request an inspection from a licensed Houston roofer before — or immediately after — the insurance adjuster visits. Here's why this matters:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Adjusters work for the insurance company. An independent roofer works for you.</li>
            <li style={{ marginBottom: "8px" }}>A written contractor assessment gives you a comparison baseline if the adjuster's estimate seems low</li>
            <li style={{ marginBottom: "8px" }}>Licensed contractors often identify damage adjusters miss — especially on complex rooflines or behind attic insulation</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            <strong>Houston scam warning:</strong> After major storms, unlicensed contractors flood Houston neighborhoods. Verify any roofer's Texas license at <strong>tdlr.texas.gov</strong> before signing anything.
          </p>

          {/* Step 6 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            6. Review the Adjuster's Estimate — Don't Just Accept It
          </h2>
          <p style={{ marginBottom: "16px" }}>
            When you receive the insurance estimate, compare it to your contractor's assessment. If there's a significant gap:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}>Request a <strong>re-inspection</strong> and bring the contractor's written report</li>
            <li style={{ marginBottom: "8px" }}>Ask the adjuster to explain any line items you don't understand</li>
            <li style={{ marginBottom: "8px" }}>Ask if your policy includes <strong>code upgrade coverage</strong> — Houston building codes may require upgrades when replacing a roof</li>
            <li style={{ marginBottom: "8px" }}>If the dispute is significant, consider a licensed <strong>public adjuster</strong> — they negotiate on your behalf for a percentage of the final settlement</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            Check your policy for the <strong>appraisal clause</strong> — most Texas policies include a dispute resolution process if you and your insurer can't agree on the damage amount.
          </p>

          {/* Step 7 */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            7. Choose Your Contractor — Carefully
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Once your claim is approved, select your contractor. In Houston, this step requires extra care:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}><strong>Verify Texas license</strong> — tdlr.texas.gov</li>
            <li style={{ marginBottom: "8px" }}><strong>Check insurance</strong> — ask for a certificate of liability naming you as additionally insured</li>
            <li style={{ marginBottom: "8px" }}><strong>Get everything in writing</strong> — scope of work, materials spec, timeline, payment terms</li>
            <li style={{ marginBottom: "8px" }}><strong>Avoid paying full cost upfront</strong> — standard practice is a deposit, then final payment after completion</li>
            <li style={{ marginBottom: "8px" }}><strong>Check Houston BBB reviews</strong> and Google ratings — look for contractors with history in Harris County specifically</li>
          </ul>

          {/* CTA */}
          <div style={{ backgroundColor: "var(--navy)", borderRadius: "12px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
            <h3 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
              Hail Hit Your Houston Home?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Texas Property Help connects Houston homeowners with licensed contractors and insurance claim guidance — free to submit, no obligation. Bilingual English & Spanish service.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/request-help" style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", textDecoration: "none" }}>
                Request Help in Houston →
              </Link>
              <Link href="/houston" style={{ display: "inline-block", backgroundColor: "transparent", color: "white", fontWeight: 600, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.4)", textDecoration: "none" }}>
                Houston Resources
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section style={{ backgroundColor: "var(--off-white)" }} className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h3 style={{ color: "var(--heading-primary)", fontWeight: 700, fontSize: "1rem", marginBottom: "16px" }}>Related Guides</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "/guides/texas-hail-damage-homeowner-checklist", label: "Texas Hail Damage Homeowner Checklist" },
              { href: "/guides/texas-storm-roof-repair-or-replace", label: "Do You Need a New Roof or Just Repairs?" },
              { href: "/guides/texas-roof-insurance-claim-timeline", label: "Texas Roof Insurance Claim Timeline" },
              { href: "/houston", label: "Houston Property Help — Full Resource Page" },
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
