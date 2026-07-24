import type { GuideCard } from "@/types";

/**
 * Guide Registry
 *
 * This file is the single source of truth for all published guides.
 * To add a new guide:
 * 1. Add a new entry here with status: "published"
 * 2. Create the corresponding page at src/app/guides/[slug]/page.tsx
 *    OR add a content file to /content/guides/[slug].mdx
 *
 * Status flow: draft → review → published
 * Only "published" guides appear on the /guides listing page.
 *
 * See: src/types/index.ts for the full ContentMeta shape.
 */
export const GUIDES: GuideCard[] = [
  {
    title: "Will Insurance Pay for a Roof Replacement in Texas?",
    slug: "will-insurance-pay-roof-replacement-texas",
    description:
      "Whether your insurer pays for a new roof comes down to cause of damage, roof age, and your wind/hail deductible. Real payout math, 2026 Texas replacement costs, why claims get denied as wear and tear, and the four ways to dispute an underpayment.",
    category: "insurance-claims",
    readTime: "11 min read",
    lastUpdated: "2026-07-23",
    standalonePageExists: true,
  },
  {
    title: "What to Do After Hail Damage in Texas",
    slug: "what-to-do-after-hail-damage-texas",
    description:
      "A step-by-step guide for Texas homeowners covering immediate safety steps, damage documentation, temporary repairs, and insurance claim filing after hail storms.",
    category: "storm-damage",
    readTime: "5 min read",
    lastUpdated: "2025-01-15",
  },
  {
    title: "Roof Insurance Claim Checklist",
    slug: "roof-insurance-claim-checklist",
    description:
      "A practical checklist to help Texas homeowners document roof damage, prepare for the adjuster visit, and track all communications throughout the insurance claim process.",
    category: "insurance-claims",
    readTime: "4 min read",
    lastUpdated: "2025-01-15",
  },
  {
    title: "Emergency Roof Leak: Steps to Take Right Now",
    slug: "emergency-roof-leak-steps",
    description:
      "If your roof is actively leaking, here is what to do immediately to minimize damage, protect your belongings, and start the documentation process.",
    category: "roofing",
    readTime: "3 min read",
    lastUpdated: "2025-01-15",
  },
  {
    title: "HVAC Replacement Financing: What Texas Homeowners Should Know",
    slug: "hvac-replacement-financing-basics",
    description:
      "An overview of the financing options available for HVAC replacement in Texas, including what to consider before signing any financing agreement.",
    category: "hvac",
    readTime: "5 min read",
    lastUpdated: "2025-01-15",
  },
  {
    title: "Complete Texas Roof Insurance Claim Timeline",
    slug: "texas-roof-insurance-claim-timeline",
    description:
      "A detailed step-by-step guide for Texas homeowners covering every phase of a roof insurance claim — from emergency response and documentation through adjuster inspection, ACV/RCV payments, contractor selection, and dispute resolution.",
    category: "insurance-claims",
    readTime: "15 min read",
    lastUpdated: "2026-05-16",
    standalonePageExists: true,
  },
  {
    title: "Texas Hail Damage Homeowner Checklist",
    slug: "texas-hail-damage-homeowner-checklist",
    description:
      "A comprehensive step-by-step checklist for Texas homeowners after a hail storm — covering immediate safety, documentation, temporary repairs, insurance filing deadlines, adjuster visits, contractor vetting, and scam avoidance.",
    category: "storm-damage",
    readTime: "18 min read",
    lastUpdated: "2026-05-16",
    standalonePageExists: true,
  },
  {
    title: "Texas Storm Season: Do You Need a New Roof or Just Repairs?",
    slug: "texas-storm-roof-repair-or-replace",
    description:
      "After a Texas storm, homeowners wonder: does insurance cover full roof replacement or just repairs? Learn how adjusters decide, what supplements mean, ACV vs RCV, and how to protect your claim.",
    category: "storm-damage",
    readTime: "8 min read",
    lastUpdated: "2026-05-30",
    standalonePageExists: true,
  },
  {
    title: "What to Do After Hail Damage in Houston, TX",
    slug: "hail-damage-houston-tx",
    description:
      "Step-by-step guide for Houston homeowners after hail damage — how to document damage, file an insurance claim, choose a licensed contractor, and avoid common mistakes in the Houston area.",
    category: "storm-damage",
    readTime: "7 min read",
    lastUpdated: "2026-05-30",
    standalonePageExists: true,
  },
  {
    title: "How to Check Your Roof After a Storm in Texas",
    slug: "how-to-check-roof-after-storm-texas",
    description:
      "Step-by-step guide for Texas homeowners: inspect your roof after hail, document damage, decide whether to file an insurance claim, and find a licensed contractor. Also available in Spanish.",
    category: "storm-damage",
    readTime: "6 min read",
    lastUpdated: "2026-05-31",
    standalonePageExists: true,
  },
  {
    title: "ACV vs. RCV: What Texas Homeowners Need to Know Before Filing a Claim",
    slug: "acv-vs-rcv-texas",
    description:
      "ACV vs RCV is the most important policy detail in Texas roof claims. Learn the difference, how depreciation works, how recoverable depreciation is paid, and how to maximize your storm damage payout.",
    category: "insurance-claims",
    readTime: "10 min read",
    lastUpdated: "2026-06-03",
    standalonePageExists: true,
  },
  {
    title: "Storm Chaser Contractors in Texas: How to Spot and Avoid Them",
    slug: "storm-chaser-contractors-texas",
    description:
      "After every major Texas hailstorm, unlicensed storm chasers flood neighborhoods. Learn the 7 red flags, illegal practices under Texas Insurance Code §707.002, and how to verify any contractor in 5 minutes before signing anything.",
    category: "storm-damage",
    readTime: "8 min read",
    lastUpdated: "2026-06-03",
    standalonePageExists: true,
  },
  {
    title: "TWIA Windstorm Insurance: The Complete Guide for Coastal Texas Homeowners",
    slug: "twia-guide-coastal-texas",
    description:
      "If you own a home in coastal Texas, TWIA windstorm insurance is essential — and separate from your homeowners policy. Learn which 14 counties require it, what it covers, how to file a claim, and how to navigate the wind-vs-flood dispute after a hurricane.",
    category: "insurance-claims",
    readTime: "12 min read",
    lastUpdated: "2026-06-03",
    standalonePageExists: true,
  },
];

/**
 * Helper: get published guides only
 */
export function getPublishedGuides(): GuideCard[] {
  // All guides in this registry are considered published for v1.
  // Add a status field and filter here when you add draft/review guides.
  return GUIDES;
}

/**
 * Helper: get a single guide by slug
 */
export function getGuideBySlug(slug: string): GuideCard | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
