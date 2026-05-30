import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Help for Texas Homeowners`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Texas Property Help connects homeowners with resources for storm damage, roofing, HVAC, insurance claims, and repair financing across Texas.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://texaspropertyhelp.com/#organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: "https://texaspropertyhelp.com/logo.png",
      description: "Texas Property Help is a homeowner assistance and contractor referral platform serving Texas homeowners.",
      areaServed: { "@type": "State", name: "Texas" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English", "Spanish"],
        areaServed: "US-TX",
      },
      sameAs: [
        "https://www.facebook.com/texaspropertyhelp",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://texaspropertyhelp.com/#localbusiness",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: "Homeowner assistance and contractor referral platform for storm damage, roofing, HVAC, and insurance claims in Texas.",
      areaServed: [
        { "@type": "State", name: "Texas", "@id": "https://www.wikidata.org/wiki/Q1439" },
      ],
      serviceType: ["Storm Damage Assessment", "Roofing Contractor Referral", "HVAC Contractor Referral", "Insurance Claim Guidance", "Repair Financing Guidance"],
      priceRange: "Free",
      availableLanguage: ["English", "Spanish"],
    },
    {
      "@type": "WebSite",
      "@id": "https://texaspropertyhelp.com/#website",
      url: "https://texaspropertyhelp.com",
      name: SITE_CONFIG.name,
      inLanguage: ["en-US", "es-US"],
      potentialAction: {
        "@type": "SearchAction",
        target: "https://texaspropertyhelp.com/guides?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
