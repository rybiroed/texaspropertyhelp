import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Storm Chaser Contractors in Texas: How to Spot and Avoid Them",
  description:
    "After every major Texas hailstorm, unlicensed storm chasers flood neighborhoods. Learn the red flags, illegal practices, and how to verify any contractor before signing anything.",
  alternates: pageAlternates("/guides/storm-chaser-contractors-texas", null),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Storm Chaser Contractors in Texas: How to Spot and Avoid Them",
  description:
    "After every major Texas hailstorm, unlicensed storm chasers arrive. Learn the red flags, illegal practices under Texas law, and how to verify any contractor before signing.",
  datePublished: "2026-06-03",
  dateModified: "2026-06-03",
  author: { "@type": "Organization", name: "Texas Property Help" },
  publisher: {
    "@type": "Organization",
    name: "Texas Property Help",
    url: "https://texaspropertyhelp.com",
  },
  mainEntityOfPage: "https://texaspropertyhelp.com/guides/storm-chaser-contractors-texas",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I verify a roofing contractor is licensed in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Texas requires roofing contractors to hold an active TDLR (Texas Department of Licensing and Regulation) license. Verify any contractor at license.tdlr.texas.gov before signing anything. Search by name or license number. An unlicensed contractor cannot legally perform roofing work in Texas.",
      },
    },
    {
      "@type": "Question",
      name: "Is it illegal for storm chasers to waive insurance deductibles in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Under Texas Insurance Code Section 707.002, it is illegal for a contractor to waive, absorb, or pay a homeowner's insurance deductible. This constitutes insurance fraud. Any contractor who offers to waive your deductible — or who says 'your insurance will cover everything including your deductible' — is offering you an illegal arrangement that could expose both parties to criminal liability.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if I already signed a contract with a storm chaser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Texas law gives homeowners a 3-business-day right of rescission on most home improvement contracts. You can cancel in writing within 3 business days with no penalty. Send a written cancellation notice by certified mail immediately. If the 3-day window has passed, contact the Texas Attorney General's office or consult a licensed attorney about your options.",
      },
    },
    {
      "@type": "Question",
      name: "How can storm chasers still operate if their practices are illegal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Storm chasers rely on speed and information asymmetry. They arrive within hours of a storm, before homeowners have time to research alternatives. They use high-pressure tactics to get signatures before homeowners verify credentials. By the time problems emerge — poor workmanship, abandoned jobs, failed inspections — they've moved to the next market. Verification before signing any document is your only protection.",
      },
    },
  ],
};

export default function StormChaserGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Contractor Vetting
            </span>
            <span style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px" }}>
              8 min read
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "16px" }}>
            Storm Chaser Contractors in Texas: How to Spot and Avoid Them
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
            Within hours of a major Texas hailstorm, out-of-state contractors flood neighborhoods. Some are legitimate. Many are not. Here's exactly how to tell the difference — before you sign anything.
          </p>
        </div>
      </section>

      {/* Article body */}
      <article style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--content-primary)" }}>

          <p style={{ marginBottom: "24px" }}>
            Texas produces more billion-dollar hail events than any other state. And for every storm that rolls through a Texas city, a predictable second wave follows within 24–48 hours: out-of-state roofing contractors in unmarked vans, going door to door in damaged neighborhoods, offering free inspections and promising to handle everything with your insurance.
          </p>
          <p style={{ marginBottom: "40px" }}>
            Some of these contractors do legitimate work. But a significant number — commonly called "storm chasers" — use illegal practices, deliver substandard work, and disappear before problems surface. This guide explains how to identify them, what Texas law says about their tactics, and how to verify any contractor before signing a single document.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            1. What Is a Storm Chaser Contractor?
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Storm chasers are roofing contractors — often from other states — who follow severe weather events to capitalize on post-storm demand. They typically:
          </p>
          <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
            <li style={{ marginBottom: "8px" }}>Arrive within 24–48 hours of a hail event</li>
            <li style={{ marginBottom: "8px" }}>Canvass damaged neighborhoods door-to-door</li>
            <li style={{ marginBottom: "8px" }}>Claim to specialize in "insurance claims" or "storm restoration"</li>
            <li style={{ marginBottom: "8px" }}>Offer to handle all paperwork with your insurance company</li>
            <li style={{ marginBottom: "8px" }}>Create urgency to get a signature on the spot</li>
            <li style={{ marginBottom: "8px" }}>Disappear or become unresponsive once paid</li>
          </ul>
          <p style={{ marginBottom: "40px" }}>
            Not every out-of-state contractor is a problem — Texas regularly experiences more storm work than local contractors can handle. But the pressure tactics, unlicensed status, and illegal practices that define true storm chasers are specific red flags you can identify.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            2. The 7 Red Flags of Storm Chaser Contractors
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {[
              {
                flag: "🚩 They offer to waive your deductible",
                detail: "This is illegal in Texas. Under Texas Insurance Code §707.002, waiving a homeowner's deductible is insurance fraud — for both the contractor and potentially for you. If a contractor says 'we'll cover your deductible' or 'your deductible is no problem,' walk away immediately."
              },
              {
                flag: "🚩 They can't provide a TDLR license number",
                detail: "Texas law requires roofing contractors to hold an active TDLR license. Ask for the license number. If they hesitate, can't provide one, or give you a number that doesn't verify at license.tdlr.texas.gov — they cannot legally work on your home."
              },
              {
                flag: "🚩 They pressure you to sign before inspecting yourself",
                detail: "Legitimate contractors give you time to review documents. Storm chasers create artificial urgency: 'We only have two more days in the area,' 'Your neighbor already signed,' 'Prices go up next week.' Any contractor who needs your signature before the sun goes down is using manipulation."
              },
              {
                flag: "🚩 They ask you to sign an Assignment of Benefits (AOB)",
                detail: "An AOB transfers control of your insurance claim to the contractor. Once signed, you lose the ability to negotiate your claim directly with your insurer. Texas law limits the scope of AOBs, but many homeowners don't understand what they're signing. Read every document before signing."
              },
              {
                flag: "🚩 They have no local address or permanent business",
                detail: "Search the contractor's business name at the Texas Secretary of State (sos.state.tx.us) and the Better Business Bureau. A truck, a phone number, and a business card are not credentials. Legitimate contractors have a verifiable Texas business presence."
              },
              {
                flag: "🚩 They can't provide references from the local area",
                detail: "Ask for three local references from jobs completed in the past 12 months — in this city, not another state. Storm chasers can't provide local references because they just arrived. Legitimate local contractors can."
              },
              {
                flag: "🚩 Their quote seems unusually high or uses insurance terminology to inflate scope",
                detail: "Some storm chasers inflate quotes knowing the insurance company will pay. They add line items for 'code upgrades,' 'supplemental materials,' and other charges that push the total up. Get at least two independent estimates from licensed local contractors before accepting any quote."
              },
            ].map((item) => (
              <div key={item.flag} style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "18px 20px" }}>
                <p style={{ fontWeight: 700, marginBottom: "8px", fontSize: "0.975rem" }}>{item.flag}</p>
                <p style={{ color: "#4b5563", margin: 0, fontSize: "0.925rem", lineHeight: 1.7 }}>{item.detail}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            3. What Texas Law Says: Illegal Contractor Practices
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Texas has some of the strongest contractor protection laws in the country. Here's what is explicitly illegal:
          </p>
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderLeft: "4px solid #dc2626", borderRadius: "8px", padding: "20px 24px", marginBottom: "24px" }}>
            <p style={{ fontWeight: 700, color: "#991b1b", marginBottom: "12px" }}>Illegal under Texas law:</p>
            <ul style={{ paddingLeft: "20px", margin: 0, color: "#7f1d1d" }}>
              <li style={{ marginBottom: "8px" }}><strong>Waiving the deductible</strong> — Texas Insurance Code §707.002. This is insurance fraud.</li>
              <li style={{ marginBottom: "8px" }}><strong>Performing roofing work without a TDLR license</strong> — Class A misdemeanor for the contractor</li>
              <li style={{ marginBottom: "8px" }}><strong>Soliciting insurance claims work within 72 hours of a disaster</strong> — some municipalities have 72-hour post-disaster solicitation bans</li>
              <li style={{ marginBottom: "8px" }}><strong>Misrepresenting contractor credentials or insurance coverage</strong> — Texas Deceptive Trade Practices Act violations</li>
              <li style={{ marginBottom: "8px" }}><strong>Failing to provide a written contract with required disclosures</strong> — Texas Business & Commerce Code §53.001 requires specific written contract terms for residential work</li>
            </ul>
          </div>
          <p style={{ marginBottom: "40px" }}>
            To report an unlicensed contractor, contact TDLR at 1-800-803-9202 or file a complaint at tdlr.texas.gov. To report contractor fraud, contact the Texas Attorney General's Consumer Protection Division at 1-800-621-0508.
          </p>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            4. How to Verify Any Contractor in 5 Minutes
          </h2>
          <ol style={{ paddingLeft: "20px", marginBottom: "40px" }}>
            <li style={{ marginBottom: "14px" }}>
              <strong>TDLR License Lookup:</strong> Go to <strong>license.tdlr.texas.gov</strong> and search by contractor name or license number. Verify the license is active and the name matches the person/company at your door.
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>Insurance verification:</strong> Ask for a Certificate of Insurance showing general liability and workers' compensation coverage. Call the insurer directly to verify the policy is active — don't just accept a document at face value.
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>Texas business registration:</strong> Verify they have an active Texas business entity at <strong>sos.state.tx.us</strong>. A registered Texas LLC or corporation means there's a legal entity to hold accountable.
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>BBB and Google reviews:</strong> Search the business name on the Better Business Bureau (bbb.org) and Google. Look for reviews specifically mentioning post-storm work, completion quality, and responsiveness after payment.
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>Local references:</strong> Ask for three references from jobs completed in your city within the past 12 months. Call them. Ask: "Did they complete the work on time? Were there any warranty issues? Would you hire them again?"
            </li>
          </ol>

          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--heading-primary)", marginBottom: "12px", marginTop: "40px" }}>
            5. If You Already Signed Something
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Texas law protects homeowners with a <strong>3-business-day right of rescission</strong> on most residential home improvement contracts signed at your home. This is a federal right under the FTC Cooling-Off Rule as well.
          </p>
          <p style={{ marginBottom: "16px" }}>
            To exercise it:
          </p>
          <ol style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}>Write a clear cancellation notice: "I am cancelling contract [number] dated [date] per my right of rescission."</li>
            <li style={{ marginBottom: "8px" }}>Send it by <strong>certified mail, return receipt requested</strong> — you need proof of delivery and the postmark date matters, not delivery date.</li>
            <li style={{ marginBottom: "8px" }}>Keep a copy of everything.</li>
          </ol>
          <p style={{ marginBottom: "40px" }}>
            If the 3-day window has passed and you have concerns about the contract or work quality, contact the <strong>Texas Attorney General's office</strong> at oag.texas.gov/consumer or call 1-800-621-0508.
          </p>

          {/* CTA */}
          <div style={{ backgroundColor: "var(--navy)", borderRadius: "12px", padding: "32px", marginTop: "48px", textAlign: "center" }}>
            <h3 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
              Need a Vetted, Licensed Contractor?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Texas Property Help only works with TDLR-licensed contractors. Submit your request and we'll connect you with verified professionals in your area — no pressure, no obligation.
            </p>
            <Link
              href="/request-help"
              style={{ display: "inline-block", backgroundColor: "var(--accent)", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 28px", borderRadius: "4px", textDecoration: "none" }}
            >
              Request a Verified Contractor →
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
              { href: "/guides/texas-hail-damage-homeowner-checklist", label: "Texas Hail Damage Homeowner Checklist" },
              { href: "/guides/acv-vs-rcv-texas", label: "ACV vs. RCV: What Texas Homeowners Need to Know" },
              { href: "/guides/texas-roof-insurance-claim-timeline", label: "Complete Texas Roof Insurance Claim Timeline" },
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
