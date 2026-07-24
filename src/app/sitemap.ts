import type { MetadataRoute } from "next";
import { getPublishedGuides } from "@/lib/guides";
import { ES } from "@/lib/translations-es";
import { getAllPosts } from "@/lib/posts";

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
    { url: BASE,                                  lastModified: new Date("2026-06-03"), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/storm-damage`,                lastModified: new Date("2026-05-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/roofing`,                     lastModified: new Date("2026-05-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/hvac`,                        lastModified: new Date("2026-05-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/insurance-claims`,            lastModified: new Date("2026-05-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/financing`,                   lastModified: new Date("2026-05-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/guides`,                      lastModified: new Date("2026-06-03"), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/request-help`,                lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/for-professionals`,           lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/updates`,                     lastModified: new Date("2026-06-03"), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/about`,                       lastModified: new Date("2026-05-01"), changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/privacy-policy`,              lastModified: new Date("2026-04-01"), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms-of-service`,            lastModified: new Date("2026-04-01"), changeFrequency: "yearly",  priority: 0.3 },
    // City landing pages
    { url: `${BASE}/houston`,                     lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/san-antonio`,                 lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/dallas`,                      lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/austin`,                      lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/fort-worth`,                  lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/corpus-christi`,              lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/el-paso`,                     lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/lubbock`,                     lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/amarillo`,                    lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/laredo`,                      lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/waco`,                        lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/mcallen`,                     lastModified: new Date("2026-06-03"), changeFrequency: "monthly", priority: 0.75 },
    // Standalone guides are NOT listed here — enGuides below already emits every
    // published guide. Listing them twice put duplicate <loc> entries in the XML.
  ];

  const staticES: MetadataRoute.Sitemap = [
    { url: `${BASE}/es`,                      lastModified: new Date("2026-06-03"), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/es/guides`,               lastModified: new Date("2026-06-03"), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/es/updates`,              lastModified: new Date(),             changeFrequency: "daily",   priority: 0.75 },
    { url: `${BASE}/es/request-help`,         lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/es/para-profesionales`,   lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.8 },
    ...ES_SERVICE_PAGES.map((p) => ({
      url: `${BASE}${p}`,
      lastModified: new Date("2026-05-20"),
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

  const posts = getAllPosts();
  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/updates/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const esPostUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/es/updates/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.60,
  }));

  const all = [...staticEN, ...staticES, ...enGuides, ...esGuides, ...postUrls, ...esPostUrls];

  // Safety net: a URL listed twice is a crawl-budget waste and a validation
  // warning in Search Console. First occurrence wins.
  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
