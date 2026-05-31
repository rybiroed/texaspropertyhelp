import type { MetadataRoute } from "next";
import { getPublishedGuides } from "@/lib/guides";
import { ES } from "@/lib/translations-es";

const BASE = "https://texaspropertyhelp.com";

const ES_SERVICE_PAGES = [
  "/es/storm-damage",
  "/es/roofing",
  "/es/hvac",
  "/es/insurance-claims",
  "/es/financing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getPublishedGuides();

  const staticEN: MetadataRoute.Sitemap = [
    { url: BASE,                                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/storm-damage`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/roofing`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/hvac`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/insurance-claims`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/financing`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/guides`,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/request-help`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/for-professionals`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`,                       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/privacy-policy`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms-of-service`,            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    // City landing pages
    { url: `${BASE}/houston`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/san-antonio`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/dallas`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/austin`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/fort-worth`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.80 },
  ];

  const staticES: MetadataRoute.Sitemap = [
    { url: `${BASE}/es`,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/es/guides`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/es/request-help`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/es/para-profesionales`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...ES_SERVICE_PAGES.map((p) => ({
      url: `${BASE}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const enGuides: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(g.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const esGuides: MetadataRoute.Sitemap = ES.guideCards.map((g) => ({
    url: `${BASE}/es/guides/${g.slug}`,
    lastModified: new Date(g.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEN, ...staticES, ...enGuides, ...esGuides];
}
