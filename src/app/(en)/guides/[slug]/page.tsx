import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuideBySlug, getPublishedGuides } from "@/lib/guides";
import DisclaimerBox from "@/components/sections/DisclaimerBox";
import CTASection from "@/components/sections/CTASection";
import { pageAlternates, GUIDE_SLUG_EN_TO_ES } from "@/lib/metadata";

/**
 * Guide content registry.
 *
 * For v1, guide content is stored here inline.
 * As the guide library grows, migrate to:
 * - MDX files in /content/guides/[slug].mdx
 * - A headless CMS (Sanity, Payload, Contentful)
 *
 * Each guide must have a matching entry in src/lib/guides.ts to appear in listings.
 */
// ── Guide content defined in a function to keep it clean ──

function getGuideBody(slug: string) {
  const guides: Record<string, { disclaimer?: "insurance" | "legal" | "financing" | "general"; sections: { heading: string; content: string }[] }> = {
    "what-to-do-after-hail-damage-texas": {
      disclaimer: "insurance",
      sections: [
        {
          heading: "Step 1: Prioritize Safety",
          content:
            "After a hail storm, do not climb onto your roof to inspect damage. Wet or damaged roofing surfaces are slippery and dangerous. Look for visible damage from the ground — dented gutters, broken windows, damaged siding — and note anything you can see safely.",
        },
        {
          heading: "Step 2: Document Everything Before Touching Anything",
          content:
            "Use your phone to take photos and video of all visible damage — roof (from ground), siding, gutters, downspouts, windows, window screens, AC/HVAC unit, vehicles, and any interior water damage. Timestamp your photos. This documentation is critical for your insurance claim.",
        },
        {
          heading: "Step 3: Make Temporary Repairs to Prevent More Damage",
          content:
            "If there is an active roof leak or broken windows, make temporary repairs to prevent further water intrusion — tarps over roof areas, plastic over broken windows. Keep all receipts for these emergency repairs. Many policies cover reasonable emergency repair costs.",
        },
        {
          heading: "Step 4: Contact Your Homeowner's Insurance",
          content:
            "File a claim with your insurance company promptly. Texas law generally requires claims to be filed within one year of the event. Have your policy number ready. Write down your claim number, the adjuster's name, and all communication dates.",
        },
        {
          heading: "Step 5: Prepare for the Adjuster Inspection",
          content:
            "An insurance adjuster will schedule an inspection. You can have your own contractor or inspector present. Make sure all damage documented in your photos is visible and accessible. Walk the adjuster through everything you documented.",
        },
        {
          heading: "Step 6: Get Independent Estimates",
          content:
            "Before agreeing to any settlement, get written repair estimates from licensed contractors. This helps you understand whether the insurance estimate is appropriate. You are not required to accept the first settlement offer.",
        },
        {
          heading: "Important Reminders",
          content:
            "Do not sign any repair contracts before your insurance claim is reviewed. Be cautious of contractors who offer to 'handle your insurance' or waive your deductible — this is illegal in Texas. Always verify a contractor's license through the Texas Department of Licensing and Regulation.",
        },
      ],
    },
    "roof-insurance-claim-checklist": {
      disclaimer: "insurance",
      sections: [
        {
          heading: "Before You File",
          content:
            "☐ Locate your homeowner's insurance policy and declarations page\n☐ Note your deductible amount and coverage type (ACV vs RCV)\n☐ Check whether your policy has a separate wind/hail deductible\n☐ Record the storm date, time, and any public weather data or news coverage of the event",
        },
        {
          heading: "Documentation Checklist",
          content:
            "☐ Photos and video of all exterior damage (roof, gutters, siding, windows, AC unit)\n☐ Photos and video of interior damage (ceiling stains, wall damage, water intrusion)\n☐ Written description of when damage was discovered\n☐ Record of any previous roof repairs or maintenance\n☐ Receipts for any emergency temporary repairs (tarps, boarding)",
        },
        {
          heading: "Filing the Claim",
          content:
            "☐ Contact your insurer to open a claim (have policy number ready)\n☐ Record your claim number\n☐ Note the name of your assigned adjuster and their contact info\n☐ Confirm the scheduled inspection date and time in writing",
        },
        {
          heading: "Adjuster Visit",
          content:
            "☐ Have all your photos and documentation available\n☐ Walk the adjuster through all documented damage\n☐ Ask for the adjuster's scope of loss in writing after the visit\n☐ You may have a licensed contractor present — consider scheduling one",
        },
        {
          heading: "After the Estimate",
          content:
            "☐ Review the insurer's damage scope and estimate carefully\n☐ Compare with independent contractor estimates\n☐ If you disagree, document discrepancies in writing\n☐ Keep all communication records (emails, letters, call logs)\n☐ Consult a licensed public adjuster or attorney if needed for disputes",
        },
      ],
    },
    "emergency-roof-leak-steps": {
      disclaimer: "general",
      sections: [
        {
          heading: "Step 1: Protect People and Property Right Now",
          content:
            "Move furniture, electronics, and valuables away from active leaks. Place buckets, towels, or plastic sheeting to capture water. If there is any concern about electrical safety (water near outlets or panels), turn off power to affected areas and call an electrician.",
        },
        {
          heading: "Step 2: Find the Leak Source Safely",
          content:
            "Work from the inside — look at the ceiling for water stains or active drips. Water often travels along rafters before dripping, so the visible wet spot may not be directly under the leak. Do not go onto the roof during rain or if the roof is wet.",
        },
        {
          heading: "Step 3: Apply a Temporary Interior Fix",
          content:
            "If you can access the attic safely, placing a bucket under the leak and plastic sheeting over insulation can reduce interior damage. Do not attempt to patch the roof from inside — this is not a permanent solution.",
        },
        {
          heading: "Step 4: Tarp the Roof (When Safe to Do So)",
          content:
            "Once rain has stopped and it is safe to access the roof, a waterproof tarp secured over the leak area can prevent additional water intrusion. Use weighted boards or sandbags to secure the tarp edges. Keep all receipts for materials — many insurers cover emergency tarping.",
        },
        {
          heading: "Step 5: Document Everything",
          content:
            "Take dated photos and video of all interior and exterior damage before, during, and after temporary repairs. This documentation supports your insurance claim.",
        },
        {
          heading: "Step 6: Contact Your Insurance Company",
          content:
            "Notify your insurer of the damage. Even if you believe the cause is clear, an adjuster will need to assess the damage. Filing promptly is important — most policies have time requirements.",
        },
        {
          heading: "Step 7: Request a Professional Assessment",
          content:
            "A temporary fix is not a permanent repair. Contact a licensed roofing contractor for a professional assessment of the cause and full extent of the damage. Keep all estimates for your claim.",
        },
      ],
    },
    "hvac-replacement-financing-basics": {
      disclaimer: "financing",
      sections: [
        {
          heading: "Why HVAC Financing Matters in Texas",
          content:
            "HVAC system replacement is one of the most expensive home repairs — often $5,000 to $15,000 or more depending on the system type and home size. In Texas, a functioning HVAC isn't optional. Understanding your financing options before you're in crisis gives you better choices.",
        },
        {
          heading: "Option 1: Personal / Home Improvement Loans",
          content:
            "Unsecured personal loans are available from banks, credit unions, and online lenders specifically for home repairs. You do not need home equity. Interest rates vary based on credit score and lender. Loan amounts and terms vary. Compare multiple offers before deciding.",
        },
        {
          heading: "Option 2: Home Equity Line of Credit (HELOC)",
          content:
            "If you have equity in your home, a HELOC or home equity loan may offer lower interest rates. These loans use your home as collateral. The approval process can take several weeks — plan ahead if possible. Consult your bank or a HUD-approved housing counselor for guidance.",
        },
        {
          heading: "Option 3: Contractor or Manufacturer Financing",
          content:
            "Many HVAC contractors and manufacturers offer financing directly or through lending partners. Terms vary widely. 0% interest promotional periods are common but revert to high rates if not paid off in time. Read the full agreement carefully before signing.",
        },
        {
          heading: "Option 4: Utility Rebate and Program Financing",
          content:
            "Texas utility companies (AEP Texas, Oncor, CPS Energy, etc.) sometimes offer rebates or low-interest financing for energy-efficient HVAC upgrades. Programs change. Check directly with your utility provider for current offerings.",
        },
        {
          heading: "Option 5: Emergency Assistance Programs",
          content:
            "For low-income homeowners, Community Action Agencies, local nonprofits, and programs like LIHEAP (Low Income Home Energy Assistance Program) may provide assistance. Contact 211 Texas (dial 2-1-1) for local referrals in your area.",
        },
        {
          heading: "Before You Sign Any Financing Agreement",
          content:
            "Understand the interest rate (APR), total cost of financing, monthly payment amount, loan term length, and any prepayment penalties. Never sign under pressure. Get multiple quotes from contractors before committing to any specific financing offer.",
        },
      ],
    },
  };

  return guides[slug] || null;
}

// Generate static params for all published guides
export async function generateStaticParams() {
  const guides = getPublishedGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };
  const esSlug = GUIDE_SLUG_EN_TO_ES[slug];
  return {
    title: guide.title,
    description: guide.description,
    alternates: pageAlternates(
      `/guides/${slug}`,
      esSlug ? `/es/guides/${esSlug}` : null,
    ),
  };
}

const categoryLabels: Record<string, string> = {
  "storm-damage": "Storm Damage",
  roofing: "Roofing",
  hvac: "HVAC",
  "insurance-claims": "Insurance",
  financing: "Financing",
  "emergency-repair": "Emergency",
  general: "General",
};

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const content = getGuideBody(slug);
  if (!content) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.lastUpdated,
    publisher: {
      "@type": "Organization",
      name: "Texas Property Help",
      url: "https://texaspropertyhelp.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/guides" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }} className="hover:text-white">
              ← Guides
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {categoryLabels[guide.category] ?? guide.category}
            </span>
          </div>
          <h1 style={{ color: "white", fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "12px" }}>
            {guide.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
            {guide.readTime && `${guide.readTime} · `}
            Updated {new Date(guide.lastUpdated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: "white" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.8", marginBottom: "32px", borderLeft: "3px solid var(--accent)", paddingLeft: "16px" }}>
            {guide.description}
          </p>

          <div className="space-y-10">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h2
                  style={{
                    color: "var(--navy)",
                    fontFamily: "Georgia, serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  {section.heading}
                </h2>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: "1.8" }}>
                  {section.content.split("\n").map((line, i) => (
                    <p key={i} style={{ marginBottom: "8px" }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {content.disclaimer && (
            <DisclaimerBox type={content.disclaimer} />
          )}

          {/* Share / Next steps */}
          <div
            style={{
              backgroundColor: "var(--off-white)",
              borderRadius: "10px",
              padding: "24px",
              marginTop: "40px",
            }}
          >
            <h3 style={{ color: "var(--navy)", fontWeight: 700, fontSize: "1rem", marginBottom: "12px" }}>
              Need personalized help with your property?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "16px" }}>
              Submit a request and we&apos;ll connect you with appropriate resources for your specific situation.
            </p>
            <Link
              href="/request-help"
              style={{
                display: "inline-block",
                backgroundColor: "var(--navy)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.9rem",
                padding: "12px 24px",
                borderRadius: "6px",
              }}
              className="hover:opacity-90"
            >
              Request Help →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        heading="More Questions About Your Property?"
        subheading="Browse more guides or submit a request for personalized assistance."
        primaryLabel="Browse All Guides"
        primaryHref="/guides"
        secondaryLabel="Request Help"
        secondaryHref="/request-help"
      />
    </>
  );
}


