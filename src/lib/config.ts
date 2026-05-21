/**
 * Site Configuration
 * All environment-specific values live here.
 * Update this file (or use .env.local) before going to production.
 */

export const SITE_CONFIG = {
  name: "Texas Property Help",
  tagline: "Connecting Texas Homeowners With the Right Help",
  domain: "texaspropertyhelp.com",
  url: "https://texaspropertyhelp.com",
  email: "help@texaspropertyhelp.com", // Replace with real email
  phone: "", // Add real phone number when ready

  // ─────────────────────────────────────────────
  // LEAD API — Connect your backend here.
  // Set NEXT_PUBLIC_LEAD_API_URL in .env.local for local dev
  // Set it in your hosting provider's env vars for production.
  // The form handler in src/components/sections/LeadForm.tsx
  // calls this endpoint with a POST request.
  // ─────────────────────────────────────────────
  leadApiUrl: process.env.NEXT_PUBLIC_LEAD_API_URL || "/api/leads",

  // Social / OG
  ogImage: "/images/og-default.png", // Add this image to public/images/

  // Service areas
  serviceAreas: [
    "Austin",
    "Houston",
    "Dallas-Fort Worth",
    "San Antonio",
    "Killeen",
    "Waco",
    "Temple",
    "Lubbock",
    "Amarillo",
    "Abilene",
  ],

  // Supported languages (for future i18n)
  languages: [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ],
};

export const NAV_LINKS = [
  { label: "Storm Damage", href: "/storm-damage" },
  { label: "Roofing", href: "/roofing" },
  { label: "HVAC", href: "/hvac" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Financing", href: "/financing" },
  { label: "Guides", href: "/guides" },
  { label: "For Professionals", href: "/for-professionals" },
  { label: "Get Help", href: "/request-help", cta: true },
];
