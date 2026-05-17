import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import CTASection from "@/components/sections/CTASection";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Texas Hail Damage Homeowner Checklist: What to Do From Hour 1 to Claim Settled",
  description:
    "Step-by-step guide for Texas homeowners after a hail storm. Covers immediate documentation, temporary repairs, insurance filing deadlines, adjuster visits, contractor selection, and how to avoid common scams.",
  alternates: pageAlternates("/guides/texas-hail-damage-homeowner-checklist", null),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Texas Hail Damage Homeowner Checklist: What to Do From Hour 1 to Claim Settled",
  description:
    "Step-by-step guide for Texas homeowners after a hail storm. Covers immediate documentation, temporary repairs, insurance filing deadlines, adjuster visits, contractor selection, and how to avoid common scams.",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  author: { "@type": "Organization", name: "Texas Property Help", url: "https://texaspropertyhelp.com" },
  publisher: { "@type": "Organization", name: "Texas Property Help", url: "https://texaspropertyhelp.com" },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://texaspropertyhelp.com/guides/texas-hail-damage-homeowner-checklist",
  },
};

const faqs: FAQItem[] = [
  {
    question: "How long do I have to file a hail damage insurance claim in Texas?",
    answer:
      "Texas law generally allows homeowners one year from the date of loss to file a property insurance claim (Texas Insurance Code §542A). However, your specific policy may impose stricter notice requirements — some require you to notify your insurer within 30 to 60 days of the storm. Review your policy immediately after a storm and file as soon as you have documented the damage. The clock starts on the storm date, not when you notice the damage.",
  },
  {
    question: "Can I file a hail damage claim years after the storm?",
    answer:
      "Generally, no. Texas law sets a one-year deadline for most property damage claims. After that window closes, your insurer can deny the claim on timeliness grounds alone. If you discover hail damage long after a storm, review your policy for the notice requirement and consult a licensed Texas public adjuster before deciding whether to file. Do not delay — late claims are routinely denied.",
  },
  {
    question: "Is it worth filing a hail damage claim if the damage seems minor?",
    answer:
      "It depends on your deductible and the extent of damage. If the repair cost is close to or less than your deductible, filing may not benefit you financially and could affect your claim history. However, minor-looking hail damage can mask significant granule loss that shortens roof life. Get an independent inspection from a licensed roofer before deciding. If you do not file but later experience leaks from unaddressed damage, your insurer may deny those future claims for lack of timely reporting.",
  },
  {
    question: "What is a hail deductible and how is it different from a regular deductible?",
    answer:
      "A hail deductible (also called a wind and hail deductible) is common on Texas homeowner policies in high-risk areas. Unlike a flat-dollar deductible, a hail deductible is typically calculated as a percentage of your home's insured value — often 1% to 2%, sometimes higher. On a home insured for $300,000 with a 2% hail deductible, you would pay the first $6,000 out of pocket. Check your declarations page for the specific deductible type — it directly affects whether a claim is financially worthwhile.",
  },
  {
    question: "How many bids should I get before choosing a roofing contractor?",
    answer:
      "Get at least two to three written estimates from licensed, local contractors. Do not rely solely on the estimate your insurer provides — the scope of loss may undercount damage. A detailed written estimate from an independent contractor is your strongest tool for disputing or supplementing an insurance estimate. Be cautious of contractors who submit a bid before inspecting your roof, or who pressure you to sign a contract before your claim is settled.",
  },
  {
    question: "Can a contractor file my insurance claim for me?",
    answer:
      "A licensed roofing contractor can assist you in preparing documentation and can communicate with your insurer about the scope of repairs. However, only a licensed Texas public adjuster can legally represent your interests in negotiating a claim settlement. Contractors who claim they will 'handle your whole claim' or ask you to sign an Assignment of Benefits (AOB) may be overstepping their legal role. For disputed or complex claims, consult a licensed public adjuster.",
  },
  {
    question: "What is an Assignment of Benefits (AOB) and should I sign one?",
    answer:
      "An Assignment of Benefits (AOB) is a document that transfers some or all of your insurance claim rights to a third party — typically a contractor. Under Texas SB 1060 (effective 2023), AOBs for residential property claims are significantly restricted. You are generally not required to sign one. Contractors who pressure you to sign an AOB before or during a claim should be viewed with caution. Consult your insurer or a licensed public adjuster before signing any document that transfers your claim rights.",
  },
  {
    question: "What if the insurance adjuster's estimate is too low?",
    answer:
      "You have the right to dispute a low estimate. Start by getting written estimates from two to three licensed contractors that document the full scope of damage. Submit these in writing to your insurer with a request for a supplemental claim or re-inspection. If the insurer refuses to adjust the estimate for legitimate damage, you may invoke the appraisal clause in your policy, consult a licensed public adjuster (who negotiates on your behalf), or file a complaint with the Texas Department of Insurance at tdi.texas.gov.",
  },
  {
    question: "Is it illegal for a contractor to offer to waive my deductible?",
    answer:
      "Yes. Under Texas Insurance Code §1811.155, it is illegal for a contractor to waive, absorb, rebate, or offer to pay a homeowner's insurance deductible. Any contractor who says 'we'll work with your insurance so you pay nothing' or 'we'll cover your deductible' is committing insurance fraud. This benefits neither you nor your contractor legally — and it can void your policy. Report such offers to the Texas Department of Insurance at tdi.texas.gov or 1-800-252-3439.",
  },
  {
    question: "After repairs are done, how do I get the RCV depreciation payment released?",
    answer:
      "If your policy provides Replacement Cost Value (RCV) coverage, your insurer initially pays the Actual Cash Value (ACV) — the depreciated amount. Once repairs are completed, submit proof of completion to your insurer: a final invoice from your licensed contractor and before/after photos. Your insurer then releases the held-back depreciation (the 'recoverable depreciation'). This step is time-limited — most policies require you to submit proof of completion within 6 to 24 months of the original payment. Check your policy for the exact deadline.",
  },
];

export default function TexasHailDamageChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/guides" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }} className="hover:text-white">
              ← Guides
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Storm Damage
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.35rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "14px" }}>
            Texas Hail Damage Homeowner Checklist: What to Do From Hour 1 to Claim Settled
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", marginBottom: "20px" }}>
            18 min read · Updated May 2026
          </p>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.0625rem", lineHeight: 1.75, borderLeft: "3px solid var(--accent)", paddingLeft: "16px" }}>
            Texas ranks among the most hail-prone states in the country, with spring storms capable of generating golf ball-sized hailstones. Knowing exactly what to do — and what to avoid — in the hours and weeks after a hail event is the difference between a smooth insurance claim and a costly dispute. This checklist covers every step from the moment the storm passes to the day your depreciation payment arrives.
          </p>
          <DisclaimerBox type="insurance" />
          <div style={{ marginTop: "24px" }}>
            <Link
              href="/request-help"
              style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000000", fontWeight: 700, fontSize: "1rem", padding: "13px 26px", borderRadius: "4px" }}
              className="hover:opacity-90"
            >
              Get Help With Your Claim →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <article className="article-body" style={{ maxWidth: "760px", margin: "0 auto" }}>

          {/* ── Quick Reference Checklist ── */}
          <h2>The Complete Hail Damage Checklist at a Glance</h2>
          <p>
            Use this table as your quick reference. Each phase is covered in detail below. The order matters — do not skip ahead to contractor negotiations before you have your documentation complete.
          </p>

          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  <th style={{ width: "26%" }}>When</th>
                  <th>What to Do</th>
                  <th style={{ width: "20%" }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hour 1", "Stay safe, do not climb the roof, observe from the ground", "Critical"],
                  ["Hours 1–6", "Photograph all exterior and interior damage extensively", "Critical"],
                  ["Hours 6–48", "Make temporary repairs (tarps, board-ups) and keep receipts", "High"],
                  ["Day 1–3", "Review your policy — deductible type, ACV vs. RCV, notice deadline", "High"],
                  ["Day 1–7", "File your claim with your insurance company", "High"],
                  ["Week 1–3", "Get 2–3 independent contractor estimates", "High"],
                  ["Week 2–4", "Adjuster inspection — be present, have your documentation ready", "High"],
                  ["Week 3–6", "Review scope of loss; dispute discrepancies in writing if needed", "Medium"],
                  ["Month 1–3", "Select a licensed contractor; permit pulled before work begins", "High"],
                  ["After repair", "Submit proof of completion to collect RCV holdback", "Medium"],
                ].map(([when, action, priority]) => (
                  <tr key={when}>
                    <td><strong>{when}</strong></td>
                    <td>{action}</td>
                    <td>
                      <span style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        backgroundColor: priority === "Critical" ? "#fee2e2" : priority === "High" ? "#fef3c7" : "#f0fdf4",
                        color: priority === "Critical" ? "#991b1b" : priority === "High" ? "#92400e" : "#166534",
                      }}>
                        {priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Step 1: Safety ── */}
          <h2>Step 1: Stay Safe in the First Hour</h2>
          <p>
            A hail storm serious enough to cause roof damage also leaves behind wet, debris-covered surfaces and potentially compromised structural elements. The first hour is not for inspection — it is for safety assessment from the ground.
          </p>

          <h3>Immediate checks (ground level only)</h3>
          <ul>
            <li>Look for downed power lines near or on your home. Do not approach them. Call your utility provider and 911 immediately.</li>
            <li>Smell for gas. If you detect a gas odor, evacuate all occupants, leave the door open as you exit, and call your gas provider from a safe distance.</li>
            <li>Check for visible structural damage — a sagging roofline, collapsed eaves, or significant water intrusion visible from the ground.</li>
            <li>Do not enter a structure that shows signs of serious structural compromise until it has been evaluated by a professional.</li>
          </ul>

          <p>
            Once you have confirmed the structure is safe, you can begin the documentation phase. Do not climb onto a wet, hail-damaged roof. If you need roof-level photos, hire a professional inspector or wait until conditions are safe.
          </p>

          {/* ── Step 2: Documentation ── */}
          <h2>Step 2: Document Everything Before Touching Anything</h2>
          <p>
            Thorough documentation is the foundation of a successful hail damage claim. Photograph damage before making any repairs, before cleaning up debris, and before a contractor or adjuster visits the property. Metadata embedded in smartphone photos — including timestamps and GPS coordinates — can be important evidence.
          </p>

          <h3>Exterior documentation</h3>
          <p>
            Start outside. Walk the full perimeter of your property and photograph the following from multiple angles:
          </p>
          <ul>
            <li><strong>Roof:</strong> Missing shingles, impact dents, cracked tiles, damaged ridge caps, and granule displacement (look for dark bare spots or significant granule accumulation in gutters)</li>
            <li><strong>Gutters and downspouts:</strong> Dents, separation from fascia, or granule buildup inside gutters</li>
            <li><strong>Siding:</strong> Dents, cracks, or chipped paint on wood, vinyl, fiber cement, or stucco</li>
            <li><strong>Window screens and frames:</strong> Torn screens, bent frames, cracked glass</li>
            <li><strong>Skylights:</strong> Cracked or shattered glass, damaged frames</li>
            <li><strong>Outdoor HVAC unit:</strong> Dented fins, damaged refrigerant lines, compressor housing</li>
            <li><strong>Fencing, deck, patio furniture:</strong> Visible impact damage</li>
            <li><strong>Vehicles:</strong> Document car damage separately for your auto insurer; keep home and auto claims separate</li>
          </ul>

          <h3>Interior documentation</h3>
          <p>
            After the storm, check your home&apos;s interior for signs of water intrusion, which may take hours or days to appear:
          </p>
          <ul>
            <li>Ceiling stains, bubbling paint, or soft spots in the ceiling drywall</li>
            <li>Wet insulation in the attic (use a flashlight and do not walk on joists — step only on structural members)</li>
            <li>Water around chimney bases, skylights, or plumbing vents</li>
            <li>Wall staining near windows or exterior walls</li>
          </ul>

          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderLeft: "4px solid #16a34a", borderRadius: "6px", padding: "18px 20px", margin: "24px 0" }}>
            <p style={{ fontWeight: 700, color: "#166534", fontSize: "0.875rem", marginBottom: "10px" }}>Documentation best practices</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Do not delete or crop any photos before submitting them to your insurer",
                "Take wide-angle establishing shots, then close-up detail shots of each damage area",
                "Include a reference object (coin, ruler) next to damage for scale",
                "Record a slow video walkthrough in addition to photos",
                "Note the storm date and any official weather records (NWS storm reports, local news)",
                "Back up all photos to cloud storage immediately",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: "10px", color: "#166534", fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Step 3: Temporary Repairs ── */}
          <h2>Step 3: Make Temporary Repairs to Prevent Further Damage</h2>
          <p>
            Your insurance policy almost certainly includes a provision requiring you to take reasonable steps to prevent additional damage after a loss. Failing to act — and then suffering water damage that could have been prevented — may give your insurer grounds to deny or reduce the additional claim.
          </p>
          <p>
            Common temporary measures after hail damage include:
          </p>
          <ul>
            <li><strong>Tarping exposed areas:</strong> A waterproof polyethylene tarp secured over any opening in the roof surface. Photograph the tarp installation before and after.</li>
            <li><strong>Boarding broken windows:</strong> Plywood or polycarbonate sheeting to prevent rain from entering through broken glass or screens.</li>
            <li><strong>Placing buckets:</strong> Contain any active drips until permanent repairs can be made.</li>
            <li><strong>Removing standing water:</strong> Use a wet-vac or towels to remove standing water from floors to prevent mold.</li>
          </ul>
          <p>
            <strong>Keep every receipt.</strong> Materials, emergency labor, and equipment rentals used for temporary repairs are typically reimbursable under your dwelling coverage. Photograph receipts in case paper copies fade.
          </p>

          {/* ── Step 4: Policy Review ── */}
          <h2>Step 4: Review Your Policy Before Filing</h2>
          <p>
            Thirty minutes spent reading your policy before you call your insurer can prevent weeks of confusion later. Find your declarations page — the one or two-page summary at the front of your policy — and confirm the following.
          </p>

          <h3>Key policy terms for hail claims</h3>
          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  <th>Term</th>
                  <th>What It Means for Your Claim</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["ACV — Actual Cash Value", "You receive the depreciated value of damaged materials. A 15-year-old roof pays out as a 15-year-old roof — not replacement cost."],
                  ["RCV — Replacement Cost Value", "You receive the current cost to replace materials with like kind and quality. Initial payment is ACV; depreciation holdback is released after repairs are complete."],
                  ["All-perils deductible", "A flat dollar amount (e.g., $1,000 or $2,500) you pay before insurance covers the rest."],
                  ["Wind and hail deductible", "A percentage of your home's insured value (often 1%–2%). On a $300,000 home, a 2% hail deductible = $6,000 out of pocket."],
                  ["Named perils vs. open perils", "Named perils policies only cover damage types explicitly listed. Open perils cover all losses except those excluded. Most homeowner policies are open perils."],
                  ["Matching provision", "Some policies require the insurer to match undamaged materials for aesthetic consistency. Not all Texas policies include this — check the policy language."],
                ].map(([term, meaning]) => (
                  <tr key={term}>
                    <td><strong>{term}</strong></td>
                    <td>{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            If you cannot locate your policy or do not understand a provision, call your insurer or your independent agent before filing. Understanding your deductible type is especially important — a percentage-based hail deductible can significantly change the math on whether filing makes financial sense.
          </p>

          {/* ── Step 5: Filing the Claim ── */}
          <h2>Step 5: File Your Claim and Know the Texas Deadlines</h2>
          <p>
            Once you have documented the damage and reviewed your policy, file your claim promptly. Most insurers allow online or app-based filing. You will need:
          </p>
          <ul>
            <li>Your policy number</li>
            <li>The date of the storm (look up official storm reports if uncertain)</li>
            <li>A description of the damage</li>
            <li>Your contact information and preferred method of communication</li>
          </ul>

          <h3>Texas prompt payment deadlines (Texas Insurance Code Ch. 542)</h3>
          <p>
            Texas law gives homeowners enforceable deadlines for insurer response. If your insurer misses these deadlines, they may owe you an 18% annual interest penalty on the unpaid amount plus attorney&apos;s fees.
          </p>

          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  <th>Insurer Must…</th>
                  <th>Deadline</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Acknowledge your claim", "Within 15 calendar days of receipt", "Clock starts when claim is received, not when filed"],
                  ["Request additional information", "Within 15 calendar days of receipt", "Insurer must tell you what they need to process the claim"],
                  ["Accept or deny the claim", "Within 15 business days of receiving all required information", "Can be extended to 45 days with written notice and reason"],
                  ["Pay an accepted claim", "Within 5 business days of acceptance", "Or 5 days from agreement on settlement amount"],
                ].map(([action, deadline, notes]) => (
                  <tr key={action}>
                    <td><strong>{action}</strong></td>
                    <td>{deadline}</td>
                    <td style={{ fontSize: "0.825rem", color: "var(--content-muted)" }}>{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Keep a written log of every contact with your insurer: date, time, representative name, and summary of the conversation. Follow up verbal conversations with an email confirming what was discussed.
          </p>

          {/* ── Step 6: Get Independent Estimates ── */}
          <h2>Step 6: Get Independent Contractor Estimates Before the Adjuster Visits</h2>
          <p>
            Many homeowners wait until after the adjuster visit to contact contractors. This is a mistake. Having two or three independent written estimates in hand before the adjuster arrives gives you a basis for comparison when you receive the insurer&apos;s scope of loss. If the adjuster&apos;s estimate is significantly lower than independent estimates for the same work, you have documentation to support a dispute.
          </p>
          <p>
            When getting estimates, ask contractors to itemize the scope of work — material quantities, unit prices, and labor — rather than providing a single total. An itemized estimate is far more useful for claim negotiation than a lump-sum number.
          </p>
          <p>
            See <Link href="/guides/roof-insurance-claim-checklist" style={{ color: "var(--accent)", fontWeight: 600 }}>our Roof Insurance Claim Checklist</Link> for a detailed list of what to have ready for the adjuster visit.
          </p>

          {/* ── Step 7: Adjuster Visit ── */}
          <h2>Step 7: The Adjuster Inspection — What to Expect and How to Prepare</h2>
          <p>
            Your insurer will send a claims adjuster to inspect the damage. This may be a staff adjuster employed by the insurer, or an independent adjuster contracted to handle claims. Be present for this inspection — do not allow access to your property without you or a trusted representative present.
          </p>

          <h3>What to have ready for the adjuster</h3>
          <ul>
            <li>Your complete photo documentation, organized by area (roof, gutters, siding, interior)</li>
            <li>Any official weather records confirming the storm event (NWS data, local news coverage)</li>
            <li>Receipts for temporary repairs already made</li>
            <li>Written estimates from independent contractors</li>
            <li>Your policy declarations page</li>
          </ul>

          <h3>During the inspection</h3>
          <ul>
            <li>Walk the property with the adjuster. Do not sit inside while they inspect alone.</li>
            <li>Point out damage areas you documented — do not assume they will find everything.</li>
            <li>Ask the adjuster to note all damage items in writing before they leave.</li>
            <li>Do not sign anything at the inspection that waives your right to future claims or supplements.</li>
            <li>If you hired a public adjuster, they should attend in your place or alongside you.</li>
          </ul>

          {/* ── Step 8: Scope of Loss ── */}
          <h2>Step 8: Review the Scope of Loss Document Carefully</h2>
          <p>
            After the inspection, your insurer will send a &quot;scope of loss&quot; — their written breakdown of what damage they found, what they will pay to repair it, and at what unit prices. This document determines your initial settlement amount.
          </p>
          <p>
            Do not assume the scope of loss is complete or accurate. Compare it line-by-line against:
          </p>
          <ul>
            <li>Your photo documentation</li>
            <li>Your independent contractor estimates</li>
            <li>A checklist of every damage area you identified</li>
          </ul>
          <p>
            Common items that are missed or undercounted in initial scopes of loss include: granule loss on shingles (which shortens roof life even without visible punctures), damaged soffits and fascia, HVAC coil fin damage, and secondary damage inside the attic from wind-driven rain.
          </p>
          <p>
            If you identify discrepancies, respond in writing within the timeframe specified in your policy. State specifically what damage was not included, provide supporting photos and contractor documentation, and request a supplemental review. Keep copies of all correspondence.
          </p>

          {/* ── Step 9: Contractor Selection ── */}
          <h2>Step 9: Choosing the Right Contractor</h2>
          <p>
            After major hail events, out-of-state and unlicensed contractors flood Texas markets. These &quot;storm chasers&quot; often do poor work, may not pull proper permits, and disappear before warranty issues arise. Choosing the right contractor is as important as any part of the claims process.
          </p>

          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  <th>Vetting Criteria</th>
                  <th>How to Verify</th>
                  <th>Red Flag</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Texas business registration", "Texas Secretary of State entity search (sos.texas.gov)", "No TX registration, PO box only, out-of-state address"],
                  ["Active license (if required)", "TDLR license lookup (tdlr.texas.gov)", "Refuses to provide license number or says 'license not required'"],
                  ["General liability insurance", "Request certificate of insurance naming you as additional insured", "Verbal assurance only, unwilling to provide written proof"],
                  ["Workers' compensation or waiver", "Request written proof", "No documentation — you may be liable for worker injuries"],
                  ["Physical local presence", "Verify local address or office (not a UPS store)", "Arrives only after the storm; no established local business"],
                  ["Written contract with full scope", "Review before signing — materials, quantities, timeline", "Pressure to sign immediately; verbal agreements only"],
                  ["Permit compliance", "Ask if they will pull required permits", "Suggests skipping permits to 'save money'"],
                  ["Manufacturer certification", "Ask for factory-certified installer status if relevant", "Cannot confirm certification for premium materials"],
                ].map(([criteria, verify, redFlag]) => (
                  <tr key={criteria}>
                    <td><strong>{criteria}</strong></td>
                    <td>{verify}</td>
                    <td style={{ fontSize: "0.825rem", color: "#b91c1c" }}>{redFlag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Do not sign a contract that includes an Assignment of Benefits (AOB) clause or language waiving your right to manage your own claim. Do not make more than a small deposit before work begins — never pay in full before the job is complete and inspected.
          </p>

          {/* ── Scam Warning ── */}
          <h2>Step 10: Recognizing and Reporting Hail Damage Scams</h2>
          <p>
            Texas homeowners are targeted by fraud after every major hail event. Recognizing these patterns can protect you from financial loss and legal liability.
          </p>

          <div style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", borderLeft: "4px solid #ea580c", borderRadius: "6px", padding: "20px", margin: "24px 0" }}>
            <p style={{ fontWeight: 700, color: "#9a3412", fontSize: "0.9rem", marginBottom: "12px" }}>Common hail damage scams in Texas</p>
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {[
                { title: "Deductible waiver offers", body: "Illegal under Texas Insurance Code §1811.155. Any contractor offering to waive or 'cover' your deductible is committing insurance fraud. This can also result in your policy being canceled." },
                { title: "Free inspection with pressure to sign immediately", body: "A legitimate inspection requires no commitment. If a contractor will only provide a free inspection if you sign a contract first, walk away." },
                { title: "Door-to-door solicitation right after a storm", body: "Storm chasers follow hail reports and show up within hours. Some are legitimate; many are not. Verify any unsolicited contractor thoroughly before engaging." },
                { title: "Assignment of Benefits (AOB) pressure", body: "Texas law restricts AOBs. Be cautious of any contractor who frames signing an AOB as routine or necessary. It transfers your claim rights to them." },
                { title: "Payment demanded before job start", body: "A large upfront payment gives a fraudulent contractor everything they need to disappear. Limit deposits to a small percentage; pay the balance only after satisfactory completion." },
              ].map(({ title, body }) => (
                <li key={title} style={{ marginBottom: "14px" }}>
                  <strong style={{ color: "#9a3412", fontSize: "0.875rem" }}>{title}</strong>
                  <p style={{ color: "#7c2d12", fontSize: "0.875rem", lineHeight: "1.6", margin: "4px 0 0 0" }}>{body}</p>
                </li>
              ))}
            </ul>
            <p style={{ color: "#9a3412", fontSize: "0.825rem", marginTop: "16px", marginBottom: 0 }}>
              Report suspected contractor fraud to the <strong>Texas Department of Insurance</strong> at tdi.texas.gov or 1-800-252-3439.
            </p>
          </div>

          {/* ── Completing the Claim ── */}
          <h2>Step 11: Completing Repairs and Collecting Your Full Payment</h2>
          <p>
            If your policy provides Replacement Cost Value (RCV) coverage, you will receive two payments. The first payment — issued after the claim is approved — is the Actual Cash Value (ACV): the depreciated value of the damaged materials. The second payment, called the &quot;recoverable depreciation,&quot; is released only after you have completed repairs and submitted proof.
          </p>

          <h3>How to collect the recoverable depreciation</h3>
          <ol>
            <li>Complete all repairs using a licensed contractor who provided a written contract.</li>
            <li>Obtain a final itemized invoice from the contractor.</li>
            <li>Take &quot;after&quot; photos showing completed repairs.</li>
            <li>Submit the invoice and photos to your insurer with a written request to release the held depreciation.</li>
            <li>Keep records of everything — your insurer may require this documentation if there is any question about the work scope or completion.</li>
          </ol>

          <p>
            Most policies require you to submit proof of completion within 6 to 24 months of the initial payment. Missing this deadline means forfeiting the recoverable depreciation. Check your policy for the specific timeframe.
          </p>

          <DisclaimerBox type="insurance" />

          <div style={{ marginTop: "36px" }}>
            <h2>Related Resources</h2>
            <ul>
              <li><Link href="/guides/what-to-do-after-hail-damage-texas" style={{ color: "var(--accent)", fontWeight: 600 }}>What to Do After Hail Damage in Texas</Link> — first-response guide</li>
              <li><Link href="/guides/roof-insurance-claim-checklist" style={{ color: "var(--accent)", fontWeight: 600 }}>Roof Insurance Claim Checklist</Link> — adjuster preparation guide</li>
              <li><Link href="/guides/texas-roof-insurance-claim-timeline" style={{ color: "var(--accent)", fontWeight: 600 }}>Complete Texas Roof Insurance Claim Timeline</Link> — phase-by-phase walkthrough</li>
              <li><Link href="/insurance-claims" style={{ color: "var(--accent)", fontWeight: 600 }}>Insurance Claims Help</Link> — TPH service overview</li>
            </ul>
          </div>

        </article>
      </section>

      <FAQ
        items={faqs}
        heading="Texas Hail Damage FAQ"
        includeSchema={true}
      />

      <CTASection
        heading="Need Help Navigating a Hail Damage Claim?"
        subheading="Submit a request and we'll connect you with the right resources — documentation guidance, contractor referrals, and claim support for your Texas property."
        primaryLabel="Submit a Request"
        secondaryLabel="View Insurance Claims Guide"
        secondaryHref="/insurance-claims"
      />
    </>
  );
}
