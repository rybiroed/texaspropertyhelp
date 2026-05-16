import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/sections/FAQ";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import CTASection from "@/components/sections/CTASection";
import { pageAlternates } from "@/lib/metadata";
import type { FAQItem } from "@/types";

export const metadata: Metadata = {
  title: "Complete Texas Roof Insurance Claim Timeline for Homeowners",
  description:
    "A detailed step-by-step guide for Texas homeowners covering every phase of a roof insurance claim — emergency response, documentation, adjuster inspection, ACV vs. RCV payments, contractor selection, and dispute resolution.",
  alternates: pageAlternates("/guides/texas-roof-insurance-claim-timeline", null),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Complete Texas Roof Insurance Claim Timeline for Homeowners",
  description:
    "A detailed step-by-step guide for Texas homeowners covering every phase of a roof insurance claim — emergency response, documentation, adjuster inspection, ACV vs. RCV payments, contractor selection, and dispute resolution.",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  publisher: {
    "@type": "Organization",
    name: "Texas Property Help",
    url: "https://texaspropertyhelp.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://texaspropertyhelp.com/guides/texas-roof-insurance-claim-timeline",
  },
};

const faqs: FAQItem[] = [
  {
    question: "How long do I have to file a roof damage claim in Texas?",
    answer:
      "Texas law generally requires homeowners to file a claim within one year of the date of loss. However, your specific policy may have stricter deadlines — some require notice within 30 to 90 days. File as soon as practical. The clock starts on the date of the storm or incident, not when you discover damage.",
  },
  {
    question: "What is a 'scope of loss' document and why does it matter?",
    answer:
      "The scope of loss is the insurance company's written breakdown of what damage they found, what they will pay to repair it, and at what unit prices. This document determines your initial payment. Review it line by line against your own documentation and independent contractor estimates. Discrepancies should be raised in writing.",
  },
  {
    question: "What is the difference between ACV and RCV?",
    answer:
      "ACV (Actual Cash Value) pays the depreciated value of damaged materials — what your aging roof is worth today, not what it costs to replace. RCV (Replacement Cost Value) pays the actual cost to repair or replace with like materials at current prices. Most RCV policies issue an initial ACV payment and hold back recoverable depreciation until repairs are completed. Check your declarations page to confirm your coverage type.",
  },
  {
    question: "Can my roofer negotiate directly with my insurance company?",
    answer:
      "A licensed roofing contractor may communicate with your insurer about the scope of repairs, but they cannot legally represent your interests in a claim the way a licensed public adjuster can. Be cautious of contractors who ask you to sign an Assignment of Benefits (AOB) — this transfers your claim rights to them and can create significant legal and financial complications. For formal claim representation, consult a licensed Texas public adjuster.",
  },
  {
    question: "What if the adjuster misses damage?",
    answer:
      "This is common. An initial inspection may not catch all storm-related damage, particularly granule loss, damaged flashings, or early moisture intrusion. You have the right to request a re-inspection and to file a supplemental claim for missed damage. Document everything with photos and a written description. An independent contractor inspection report can support the supplemental claim.",
  },
  {
    question: "Is it legal for a contractor to waive my deductible in Texas?",
    answer:
      "No. Texas Insurance Code §1811.155 makes it illegal for a contractor to waive, absorb, or rebate a homeowner's insurance deductible. Any contractor who offers to 'cover your deductible' or 'work with your insurance so you pay nothing' is committing insurance fraud. Report such offers to the Texas Department of Insurance at tdi.texas.gov or 1-800-252-3439.",
  },
  {
    question: "Do I need a building permit for roof replacement in Texas?",
    answer:
      "In most Texas jurisdictions, a permit is required for full roof replacement. Requirements vary by city and county. Your contractor should obtain the permit before work begins — a contractor who suggests skipping this is a warning sign. Unpermitted work can affect insurance coverage and complicate future home sales.",
  },
  {
    question: "What happens if repair costs exceed the insurance estimate?",
    answer:
      "You have the right to file a supplemental claim when your contractor identifies covered damage not in the original estimate. Document all additional damage with photos and a detailed estimate. If the insurer refuses to cover legitimate additional damage, you may invoke the appraisal clause in your policy, consult a licensed public adjuster, or contact the Texas Department of Insurance.",
  },
];

export default function TexasRoofClaimTimelinePage() {
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
              Insurance Claims
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.35rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "14px" }}>
            Complete Texas Roof Insurance Claim Timeline for Homeowners
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", marginBottom: "20px" }}>
            15 min read · Updated May 2026
          </p>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.0625rem", lineHeight: 1.75, borderLeft: "3px solid var(--accent)", paddingLeft: "16px" }}>
            When a storm damages your roof, the steps you take in the first 72 hours — and every week after — directly affect whether your insurance claim succeeds. This guide walks you through every phase in the order things actually happen, with the definitions, checklists, and warnings that matter most.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <article className="article-body" style={{ maxWidth: "760px", margin: "0 auto" }}>

          {/* ── Timeline at a Glance ── */}
          <h2>The Full Timeline at a Glance</h2>
          <p>
            Every claim is different, but the sequence below applies to most Texas homeowner roof insurance claims. Use this as a reference point — print it or bookmark it.
          </p>

          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  <th style={{ width: "22%" }}>Timeframe</th>
                  <th>What to Do</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hours 1–72", "Ensure safety, photograph all damage, make temporary repairs to prevent further loss"],
                  ["Days 1–7", "Review your policy (ACV vs. RCV, deductible type), open a claim with your insurer"],
                  ["Week 1–3", "Insurance adjuster inspection; have your documentation and a contractor available"],
                  ["Week 2–4", "Receive insurer's scope of loss; compare to your photos and get independent estimates"],
                  ["Week 3–6", "Dispute any discrepancies in writing; negotiate scope if needed with documentation"],
                  ["Month 1–3", "Select a licensed contractor, pull permits, complete repairs"],
                  ["After completion", "Submit proof of repairs to insurer; request release of RCV depreciation holdback (if applicable)"],
                  ["Ongoing", "Keep all records — invoices, photos, correspondence — for at least three years"],
                ].map(([time, label]) => (
                  <tr key={time}>
                    <td><strong>{time}</strong></td>
                    <td>{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Phase 1 ── */}
          <h2>Phase 1: Emergency Actions (Hours 1–72)</h2>
          <p>
            The actions you take immediately after a storm are as important as any paperwork you file later. Your insurer will ask when you discovered the damage, what you did to prevent further loss, and whether you documented the condition before making changes.
          </p>

          <h3>1. Prioritize safety before inspecting damage</h3>
          <p>
            Do not climb onto your roof immediately after a storm. Wet or damaged surfaces are dangerous. Look for structural damage, downed power lines, gas odors, or water near electrical panels from the ground. Call 911 if there is immediate danger. Contact your utility provider if you suspect a gas issue and evacuate the property.
          </p>

          <h3>2. Photograph everything before touching anything</h3>
          <p>
            This is the most important step of the entire process. Use your smartphone to document all visible damage — from the ground looking up at the roof, gutters, downspouts, siding, window screens, and the outdoor HVAC unit. Then go inside and photograph ceiling stains, wall damage, and wet insulation in the attic if safely accessible. The date and time embedded in photo metadata matters; do not edit or repost photos before submitting them.
          </p>

          <h3>3. Make temporary repairs to prevent further loss</h3>
          <p>
            Your policy typically requires you to take reasonable steps to prevent additional damage. Cover exposed roof areas with a waterproof tarp, board broken windows, and place buckets under active leaks. Keep every receipt for materials and any hired emergency labor — most policies reimburse these costs. Photograph the temporary repairs as well.
          </p>

          <div style={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd", borderLeft: "4px solid #0ea5e9", borderRadius: "6px", padding: "18px 20px", marginTop: "24px", marginBottom: "8px" }}>
            <p style={{ fontWeight: 700, color: "#0c4a6e", fontSize: "0.875rem", marginBottom: "10px" }}>Emergency documentation checklist</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Storm date, time, and any official weather records or news coverage",
                "All exterior damage visible from the ground (roof, gutters, siding, AC unit, windows, screens)",
                "Interior water damage (ceiling stains, wet drywall, attic insulation)",
                "Damage to personal property (furniture, electronics, stored items)",
                "Photos of temporary repairs made, plus receipts for all materials",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: "10px", color: "#0c4a6e", fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "6px" }}>
                  <span style={{ color: "#0ea5e9", fontWeight: 700, flexShrink: 0 }}>☑</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Phase 2: Policy ── */}
          <h2>Phase 2: Understanding Your Policy Before You File</h2>
          <p>
            Before calling your insurer, spend 30 minutes reviewing your policy. This prevents surprises and helps you ask the right questions. Locate your <strong>declarations page</strong> — the one-to-two page summary listing your coverage amounts, deductibles, and policy type.
          </p>

          <h3>What to look for on your declarations page</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
            {[
              "Total dwelling coverage (Coverage A) — the maximum the policy pays to rebuild your home",
              "Your deductible amount and type (see the deductible table below)",
              "Whether your policy pays ACV or RCV — this determines how much you receive",
              "The policy period — confirm it was in force on the date of the storm",
              "Any exclusions relevant to your damage type (e.g., flood, wear-and-tear, improper maintenance)",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: "10px", color: "#374151", fontSize: "0.9375rem", lineHeight: "1.7", marginBottom: "8px" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>→</span>{item}
              </li>
            ))}
          </ul>

          {/* ── ACV vs RCV ── */}
          <h2>ACV vs. RCV: The Payment Difference That Matters Most</h2>

          <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid var(--accent)", borderRadius: "6px", padding: "16px 20px", marginBottom: "20px" }}>
            <p style={{ fontWeight: 700, color: "#111827", fontSize: "0.875rem", marginBottom: "8px" }}>Definitions</p>
            <p style={{ color: "#374151", fontSize: "0.9rem", lineHeight: "1.7", margin: 0 }}>
              <strong>ACV (Actual Cash Value)</strong> — the depreciated market value of your damaged property at the time of loss; what it was worth just before the storm, accounting for age and wear.<br />
              <strong>RCV (Replacement Cost Value)</strong> — the full current cost to repair or replace damaged property with like materials at today&apos;s prices, regardless of the age of what was damaged.
            </p>
          </div>

          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  <th style={{ width: "26%" }}>Feature</th>
                  <th style={{ width: "37%" }}>ACV — Actual Cash Value</th>
                  <th style={{ width: "37%" }}>RCV — Replacement Cost Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>What it pays</strong></td>
                  <td>Depreciated value — what your property was worth before the loss</td>
                  <td>Full cost to repair or replace with like materials at current market prices</td>
                </tr>
                <tr>
                  <td><strong>Depreciation</strong></td>
                  <td>Subtracted from payout; older roofs receive less</td>
                  <td>Not deducted; you receive the current replacement cost</td>
                </tr>
                <tr>
                  <td><strong>Example<br />(roof costs $18,000 to replace)</strong></td>
                  <td>$18,000 − $7,200 depreciation = $10,800 gross, minus deductible</td>
                  <td>$18,000 minus deductible; depreciation holdback released after repairs complete</td>
                </tr>
                <tr>
                  <td><strong>Number of payments</strong></td>
                  <td>Single payment after approval</td>
                  <td>Initial ACV advance, then holdback released after you submit proof of completion</td>
                </tr>
                <tr>
                  <td><strong>Premium impact</strong></td>
                  <td>Lower annual premium</td>
                  <td>Higher annual premium</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>The RCV two-payment process</h3>
          <p>
            If you have RCV coverage, your insurer typically issues two payments. The first is the ACV amount — the depreciated value. After you complete repairs and submit documentation (invoices, contractor receipts, photos), the insurer releases the held-back depreciation. This second payment brings you to the full RCV amount. Most policies require you to complete repairs within 180 days to one year to claim recoverable depreciation — check your specific policy.
          </p>

          {/* ── Deductible ── */}
          <h2>Understanding Your Deductible</h2>
          <p>
            Your <strong>deductible</strong> is the amount you pay out of pocket before insurance coverage begins. In Texas, many homeowner policies carry a <em>separate and higher</em> wind/hail deductible than the standard deductible — and many homeowners do not realize this until they file a claim.
          </p>

          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  <th>Deductible Type</th>
                  <th>How It Works</th>
                  <th>When It Applies</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Standard deductible</strong></td>
                  <td>Fixed dollar amount (e.g., $1,000–$5,000)</td>
                  <td>Most covered losses not involving wind or hail</td>
                </tr>
                <tr>
                  <td><strong>Wind/hail deductible</strong></td>
                  <td>Percentage of insured dwelling value (e.g., 1–2%); on a $300k home this can be $3,000–$6,000+</td>
                  <td>Damage specifically caused by wind or hail — very common in Texas</td>
                </tr>
                <tr>
                  <td><strong>Named storm deductible</strong></td>
                  <td>Higher percentage (e.g., 2–5%), triggered only by declared named storms</td>
                  <td>Named tropical storms or hurricanes that affect your policy area</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ color: "#374151", fontSize: "0.875rem" }}>
            Source: Texas Department of Insurance — <a href="https://www.tdi.texas.gov/consumer/windstorm.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600 }}>tdi.texas.gov</a>
          </p>

          {/* ── Phase 3: Filing ── */}
          <h2>Phase 3: Filing Your Claim (Days 3–10)</h2>
          <p>
            Contact your insurer to open a claim by phone, online, or through their app. Have your policy number, photos, and a written description of damage ready. Texas law (Insurance Code §542) requires insurers to acknowledge receipt of your claim within <strong>15 calendar days</strong>, accept or reject within <strong>15 business days</strong> of receiving complete documentation, and pay within <strong>5 business days</strong> of acceptance.
          </p>

          <h3>What to record when you call</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
            {[
              "Claim number",
              "Name of the person you spoke with, and the date and time of the call",
              "Name and direct contact information for your assigned adjuster",
              "Any instructions given and their deadlines",
              "Confirmation of the scheduled adjuster inspection date",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: "10px", color: "#374151", fontSize: "0.9375rem", lineHeight: "1.7", marginBottom: "8px" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>☑</span>{item}
              </li>
            ))}
          </ul>
          <p>
            From the moment you open the claim, document every communication in writing. Follow up phone calls with a brief email summarizing what was discussed and keep a copy.
          </p>

          {/* ── Phase 4: Adjuster ── */}
          <h2>Phase 4: The Adjuster Inspection (Weeks 1–3)</h2>
          <p>
            An insurance adjuster will inspect your property to assess the damage. This inspection is the insurer&apos;s primary basis for determining payment. The adjuster works for your insurer — not for you. How you prepare for this inspection directly affects your outcome.
          </p>

          <h3>Your rights during the inspection</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
            {[
              "You have the right to have a licensed contractor or independent inspector present to point out damage",
              "You are not required to have the adjuster inspect alone",
              "You have the right to take your own photos and notes throughout the inspection",
              "You are not required to agree to the adjuster's findings on the spot",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: "10px", color: "#374151", fontSize: "0.9375rem", lineHeight: "1.7", marginBottom: "8px" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>{item}
              </li>
            ))}
          </ul>
          <p>
            Consider scheduling an independent roofing contractor inspection before or around the same time as the adjuster visit. Having a professional assessment from your own contractor gives you documentation to compare against the insurer&apos;s scope of loss. See the <Link href="/roofing" style={{ color: "var(--accent)", fontWeight: 600 }}>Roofing Help page</Link> and the <Link href="/guides/roof-insurance-claim-checklist" style={{ color: "var(--accent)", fontWeight: 600 }}>Roof Insurance Claim Checklist</Link> for more on adjuster preparation.
          </p>

          <h3>What the adjuster looks for</h3>
          <p>
            Hail strikes leave circular impact marks or granule loss in defined patterns. Wind damage tends to produce lifted, creased, or missing shingles. The adjuster will also examine gutters, flashing, the HVAC condenser unit, skylights, and other exterior components. Walk them through every area of documented damage — do not assume they will find everything.
          </p>

          {/* ── Phase 5: Estimate ── */}
          <h2>Phase 5: Reviewing the Insurance Estimate</h2>
          <p>
            After the inspection, your insurer produces a written estimate called the <strong>scope of loss</strong>. This document lists every item of damage they identified, the quantities, the unit prices, and the total payout. Review it line by line.
          </p>

          <h3>What to check in the scope of loss</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
            {[
              "Are all documented areas of damage included? Compare to your photos.",
              "Are quantities correct — roof square footage, linear feet of gutters, etc.?",
              "Are Texas building code upgrade costs (e.g., new underlayment requirements) included?",
              "Is overhead and profit (O&P) included? Insurers sometimes omit this, but contractors factor it in.",
              "Are unit prices consistent with current market rates in your area?",
              "Is the depreciation calculation and holdback amount clearly explained?",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: "10px", color: "#374151", fontSize: "0.9375rem", lineHeight: "1.7", marginBottom: "8px" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>{item}
              </li>
            ))}
          </ul>
          <p>
            You are not required to accept the first estimate. If damage was missed or undervalued, you may request a re-inspection or file a supplemental claim with supporting documentation. Visit the <Link href="/insurance-claims" style={{ color: "var(--accent)", fontWeight: 600 }}>Insurance Claims page</Link> for a full overview of the claims process.
          </p>

          {/* ── Phase 6: Contractors ── */}
          <h2>Phase 6: Contractor Estimates and Selection</h2>
          <p>
            Get at least two to three written estimates from licensed roofing contractors before selecting one. This helps you understand what the work should cost and provides documentation to support a supplemental claim if the insurer&apos;s estimate is insufficient.
          </p>

          <h3>What a contractor estimate must include</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
            {[
              "Contractor name, license number, and contact information",
              "Detailed scope of work — materials, quantities, and installation method",
              "Brand and grade of materials (should match or exceed insurer's specification)",
              "Labor and material costs itemized separately",
              "Who is responsible for pulling the required permit",
              "Project timeline and payment schedule",
              "Both manufacturer warranty (materials) and workmanship warranty terms",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: "10px", color: "#374151", fontSize: "0.9375rem", lineHeight: "1.7", marginBottom: "8px" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>☑</span>{item}
              </li>
            ))}
          </ul>
          <p>
            Verify every contractor&apos;s license before signing anything. The <a href="https://www.tdlr.texas.gov/verify.asp" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600 }}>Texas Department of Licensing and Regulation (TDLR) license lookup</a> is free and takes under a minute.
          </p>

          {/* ── Scam Warning ── */}
          <div style={{ backgroundColor: "#fff5f5", border: "1px solid #fecaca", borderLeft: "4px solid #dc2626", borderRadius: "8px", padding: "20px 22px", marginTop: "40px", marginBottom: "8px" }}>
            <h2 style={{ color: "#7f1d1d", fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 800, marginBottom: "12px", marginTop: 0 }}>
              ⚠️ Contractor Fraud Warning — Read Before Signing Anything
            </h2>
            <p style={{ color: "#7f1d1d", fontSize: "0.9rem", lineHeight: "1.75", marginBottom: "14px" }}>
              After major Texas storms, fraudulent contractor activity increases significantly. These are the most common tactics homeowners encounter:
            </p>

            <div className="article-table-wrap" style={{ marginTop: "4px" }}>
              <table className="article-table">
                <thead>
                  <tr>
                    <th style={{ background: "#7f1d1d", width: "40%" }}>Red flag</th>
                    <th style={{ background: "#7f1d1d" }}>Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Offering to waive or cover your deductible", "Illegal under Texas Insurance Code §1811.155 — this is insurance fraud regardless of how it's framed"],
                    ["Asking you to sign an Assignment of Benefits (AOB)", "Transfers your legal claim rights to the contractor; limits your control over the process"],
                    ["Requesting large upfront payment before work starts", "Legitimate Texas contractors typically collect 10–15% maximum upfront; full payment before work is a red flag"],
                    ["Pressuring you to sign before reviewing your insurance estimate", "You need the insurer's scope of loss before committing to a contractor's scope"],
                    ["'Storm chasers' from out of state", "May complete work quickly then become unreachable for warranty claims or defect corrections"],
                    ["Claiming they'll 'handle everything with your insurance'", "Contractors can assist with documentation; only a licensed public adjuster can legally negotiate your claim"],
                  ].map(([flag, why]) => (
                    <tr key={flag}>
                      <td style={{ color: "#7f1d1d", fontWeight: 600 }}>{flag}</td>
                      <td style={{ color: "#7f1d1d" }}>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ color: "#7f1d1d", fontSize: "0.85rem", marginTop: "14px", marginBottom: 0, lineHeight: "1.6" }}>
              Report contractor fraud to the <strong>Texas Department of Insurance</strong>: <a href="https://www.tdi.texas.gov/consumer/complain.html" target="_blank" rel="noopener noreferrer" style={{ color: "#dc2626", fontWeight: 600 }}>tdi.texas.gov</a> or call 1-800-252-3439.
            </p>
          </div>

          {/* ── What Not to Say ── */}
          <h2>What Not to Say to Your Insurance Company</h2>
          <p>
            Your words in claim communications become part of the record. The goal is accuracy — not strategy. These are common statements that inadvertently damage claims:
          </p>

          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  <th style={{ width: "42%" }}>Statement to avoid</th>
                  <th>Why it can hurt your claim</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["\"I think the damage might be from...\"", "Speculating about cause can give the insurer grounds to apply an exclusion or different coverage rule — state what you observed, not what you think caused it"],
                  ["\"The roof was old anyway...\"", "Volunteering information about pre-existing condition justifies additional depreciation beyond what the insurer might have applied"],
                  ["\"I'm not sure if this is covered...\"", "Coverage determination is the insurer's job — your job is to report what happened accurately"],
                  ["\"Just send me whatever you think is fair...\"", "You have the right to a full evaluation; an off-hand remark can be interpreted as acceptance of whatever is offered"],
                  ["\"I had this repaired before by...\"", "Prior repairs without permits or by unlicensed contractors can introduce coverage complications — answer direct questions honestly but don't over-volunteer"],
                ].map(([stmt, why]) => (
                  <tr key={stmt}>
                    <td style={{ fontStyle: "italic", color: "#374151", fontWeight: 500 }}>{stmt}</td>
                    <td>{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Phase 7: Completion ── */}
          <h2>Phase 7: Repairs, Completion, and Final Payment</h2>

          <h3>6. Begin repairs with permits in place</h3>
          <p>
            Once you have selected a licensed contractor and agreed to written terms, confirm that all required permits are pulled before any work begins. Do not allow work to start without a permit — unpermitted roof work can affect your insurance coverage and create complications when selling the home.
          </p>

          <h3>7. Document completed repairs</h3>
          <p>
            Take thorough before-and-after photos of the completed work. Collect the final invoice, warranty documentation, and any permit inspection records from your contractor. You will need these to claim recoverable depreciation from your insurer if you have RCV coverage.
          </p>

          <h3>8. Request RCV holdback release</h3>
          <p>
            Submit your final invoice and proof of completed repairs to your insurer to request the release of held-back depreciation. This is done through the claims portal or by mailing documentation to your adjuster. Allow 5–15 business days for processing. Follow up in writing if you do not receive a response within the timeframe stated in your policy.
          </p>

          {/* ── When Claims Go Wrong ── */}
          <h2>When Your Claim Goes Wrong</h2>

          <h3>If damage was missed or underpaid</h3>
          <p>
            Request a re-inspection in writing and submit a supplemental claim with your contractor&apos;s estimate and supporting photos. Be specific about what was missed and cite the storm as the cause. Your insurer must respond to supplemental claims within the same statutory timeframes as the original claim.
          </p>

          <h3>If your claim is denied</h3>
          <p>
            Request the denial in writing with the specific policy basis cited. Review the exact policy language. Options: request a formal reconsideration with additional documentation; invoke the <strong>appraisal clause</strong> in your policy (both parties hire appraisers and an umpire resolves the dispute); file a complaint with the <a href="https://www.tdi.texas.gov/consumer/complain.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600 }}>Texas Department of Insurance</a>; or consult a licensed public adjuster or Texas attorney.
          </p>

          <h3>If the insurer misses statutory response deadlines</h3>
          <p>
            Document the delay in writing. Under Texas Insurance Code §542, insurers that fail to meet response deadlines may owe statutory interest on the claim amount. Contact the Texas Department of Insurance and consider consulting an attorney who handles insurance disputes.
          </p>

          {/* ── Professional Help ── */}
          <h2>When to Ask for Professional Help</h2>
          <p>Most homeowners handle straightforward claims without outside assistance. Consider consulting a professional in these situations:</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
            {[
              "Claim involves damage over $25,000 and you are uncertain whether the estimate is fair",
              "Your claim was partially or fully denied and you believe the denial is incorrect",
              "Your insurer is not responding within the statutory timeframes",
              "There is a significant gap between the insurer's estimate and your contractor's estimate",
              "You are being pressured to accept a settlement quickly",
              "Your property suffered damage in a declared federal or state disaster area",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: "10px", color: "#374151", fontSize: "0.9375rem", lineHeight: "1.7", marginBottom: "8px" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>{item}
              </li>
            ))}
          </ul>
          <p>
            A <strong>licensed Texas public adjuster</strong> can represent your interests in the claim process — this is a distinct licensed profession separate from a contractor. If you believe your legal rights are being violated, consult a <strong>licensed Texas attorney</strong> who handles insurance disputes. Texas Property Help provides information and referrals only — see the disclaimer below.
          </p>

          {/* ── Related Resources ── */}
          <h2>Related Resources on Texas Property Help</h2>
          <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "20px 24px" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { href: "/storm-damage", label: "Storm Damage Help", desc: "Immediate steps for any type of storm damage" },
                { href: "/roofing", label: "Roofing Help", desc: "Inspections, repairs, replacements, and what to ask contractors" },
                { href: "/insurance-claims", label: "Insurance Claims Overview", desc: "The general claims process and your rights as a Texas homeowner" },
                { href: "/guides/roof-insurance-claim-checklist", label: "Roof Insurance Claim Checklist", desc: "A printable checklist covering every stage of the claim" },
                { href: "/request-help", label: "Request Help", desc: "Submit your situation — we'll connect you with appropriate resources" },
              ].map(({ href, label, desc }) => (
                <li key={href} style={{ display: "flex", gap: "12px", marginBottom: "12px", fontSize: "0.9375rem" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>→</span>
                  <span>
                    <Link href={href} style={{ color: "var(--accent)", fontWeight: 700 }}>{label}</Link>
                    {" — "}<span style={{ color: "#374151" }}>{desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Disclaimer ── */}
          <DisclaimerBox
            type="insurance"
            customText="Texas Property Help is a homeowner information and referral platform. We are not an insurance company, insurance agent, public adjuster, contractor, law firm, or lender. Nothing in this guide constitutes legal, insurance, or financial advice. All insurance coverage decisions are made solely by your insurance company. For formal claims representation, consult a licensed Texas public adjuster. For legal questions about your policy or a dispute, consult a licensed Texas attorney. Verify all contractor licenses at tdlr.texas.gov."
          />

          {/* ── CTA box ── */}
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "28px", marginTop: "40px" }}>
            <h3 style={{ color: "#14532d", fontWeight: 700, fontSize: "1.1rem", marginBottom: "10px", marginTop: 0 }}>
              Need help navigating your specific situation?
            </h3>
            <p style={{ color: "#166534", fontSize: "0.9375rem", marginBottom: "20px", lineHeight: "1.7" }}>
              Every claim is different. Submit a request through Texas Property Help and we will connect you with the resources that fit your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-help"
                style={{ display: "inline-block", backgroundColor: "#14532d", color: "white", fontWeight: 700, fontSize: "0.95rem", padding: "13px 26px", borderRadius: "6px" }}
                className="hover:opacity-90"
              >
                Request Help →
              </Link>
              <Link
                href="/guides"
                style={{ display: "inline-block", backgroundColor: "transparent", color: "#14532d", fontWeight: 600, fontSize: "0.95rem", padding: "13px 26px", borderRadius: "6px", border: "2px solid #14532d" }}
                className="hover:opacity-80"
              >
                Browse All Guides
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* FAQ */}
      <FAQ items={faqs} heading="Roof Insurance Claim FAQ" />

      {/* Final CTA */}
      <CTASection
        heading="Ready to Get Help With Your Roof Claim?"
        subheading="Submit a request and we'll connect you with resources for documentation, contractor referrals, and guidance on next steps."
        primaryLabel="Request Help Now"
        primaryHref="/request-help"
        secondaryLabel="View Claim Checklist"
        secondaryHref="/guides/roof-insurance-claim-checklist"
      />
    </>
  );
}
