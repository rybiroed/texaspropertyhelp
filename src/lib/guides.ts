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
