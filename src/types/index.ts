/**
 * Content Metadata
 * Used by all content items: guides, news, procedures, service pages.
 * Designed to be CMS-agnostic — works with local MDX files now,
 * and can map to a Sanity/Contentful/Payload schema later.
 */
export interface ContentMeta {
  title: string;
  slug: string;
  description: string;
  category: ContentCategory;
  language: "en" | "es";
  region?: string; // e.g. "Texas" | "Austin" | "Houston"
  lastUpdated: string; // ISO date string
  reviewedBy?: string; // Human reviewer name/ID
  status: "draft" | "review" | "published";
  sourceNotes?: string; // Where facts came from
  disclaimerRequired?: boolean;
  tags?: string[];
  ogImage?: string;
}

export type ContentCategory =
  | "storm-damage"
  | "roofing"
  | "hvac"
  | "insurance-claims"
  | "financing"
  | "emergency-repair"
  | "general";

/**
 * Lead Form Data
 * Matches the expected POST /lead payload.
 * See: src/components/sections/LeadForm.tsx
 */
export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  city: string;
  propertyType: PropertyType;
  helpNeeded: HelpType[];
  urgency: UrgencyLevel;
  description: string;
  preferredLanguage: "en" | "es";
  consentGiven: boolean;
  // Added server-side / client-side
  submittedAt?: string;
  pageSource?: string;
}

export type PropertyType =
  | "single-family"
  | "townhouse"
  | "condo"
  | "duplex-multiplex"
  | "mobile-manufactured"
  | "commercial"
  | "other";

export type HelpType =
  | "storm-damage"
  | "roof-inspection"
  | "roof-repair"
  | "roof-replacement"
  | "hvac-repair"
  | "hvac-replacement"
  | "insurance-claim-guidance"
  | "repair-financing"
  | "emergency-repair"
  | "general-repair"
  | "other";

export type UrgencyLevel =
  | "emergency" // Active leak / damage right now
  | "urgent" // Within 48 hours
  | "soon" // Within 1–2 weeks
  | "planning"; // No rush, gathering info

/**
 * Guide card data (used on /guides listing page)
 */
export interface GuideCard {
  title: string;
  slug: string;
  description: string;
  category: ContentCategory;
  readTime?: string;
  lastUpdated: string;
  /** True when a standalone page exists at guides/[slug]/page.tsx.
   *  Prevents the dynamic [slug] route from trying to pre-render this slug. */
  standalonePageExists?: boolean;
}

/**
 * Service card data
 */
export interface ServiceCard {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

/**
 * FAQ item
 */
export interface FAQItem {
  question: string;
  answer: string;
}
