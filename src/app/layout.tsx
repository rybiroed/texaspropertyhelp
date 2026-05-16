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
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: "Texas Property Help is a homeowner assistance and contractor referral platform serving Texas homeowners.",
  areaServed: { "@type": "State", name: "Texas" },
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
