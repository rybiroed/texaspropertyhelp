import type { Metadata } from "next";
import postsData from "@/data/posts.json";

export type Post = {
  slug: string;
  title: string;
  titleEs: string;
  category: "storm-damage" | "roofing" | "hvac" | "insurance-claims" | "financing" | "weather";
  city: string | null;        // "Houston", "Dallas", null = statewide
  publishedAt: string;        // "2026-06-07"
  summary: string;
  summaryEs: string;
  readTime: string;
  imageUrl: string;           // "/images/posts/slug.png" or ""
  contentHtml: string;        // full article HTML body
  contentHtmlEs: string;
  postEn: string;             // FB post text
  postEs: string;
  weatherCtx: string;
  newsCtx: string;
};

export const CATEGORY_META: Record<Post["category"], { label: string; labelEs: string; color: string; bg: string }> = {
  "storm-damage":     { label: "Storm Damage",  labelEs: "Daños por Tormenta", color: "#fed7aa", bg: "#7c2d12" },
  roofing:            { label: "Roofing",        labelEs: "Techos",             color: "#bfdbfe", bg: "#1e3a5f" },
  hvac:               { label: "HVAC",           labelEs: "HVAC",               color: "#bbf7d0", bg: "#14532d" },
  "insurance-claims": { label: "Insurance",      labelEs: "Seguros",            color: "#ddd6fe", bg: "#4a1d96" },
  financing:          { label: "Financing",      labelEs: "Financiamiento",     color: "#fef08a", bg: "#713f12" },
  weather:            { label: "Weather Alert",  labelEs: "Alerta Climática",   color: "#fecaca", bg: "#7f1d1d" },
};

export function getAllPosts(): Post[] {
  return (postsData as Post[]).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return (postsData as Post[]).find((p) => p.slug === slug);
}

export function getRecentPosts(limit = 5): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getPostsByCategory(category: Post["category"]): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByCity(city: string): Post[] {
  return getAllPosts().filter((p) => p.city?.toLowerCase() === city.toLowerCase());
}
