/**
 * POST /api/publish
 *
 * External agent endpoint — allows any authorized agent (Telegram bot,
 * Grymman_AI_BOT, Claude sessions, etc.) to publish articles directly
 * to posts.json without touching the local filesystem.
 *
 * Auth: Bearer token in Authorization header matching AGENT_PUBLISH_KEY env var.
 *
 * Body (JSON):
 *   title        string   required — EN title
 *   titleEs      string   optional — ES title (auto-skipped if missing)
 *   contentHtml  string   required — EN article HTML
 *   contentHtmlEs string  optional — ES article HTML
 *   summary      string   optional — EN summary (≤160 chars)
 *   summaryEs    string   optional — ES summary (≤160 chars)
 *   category     string   optional — storm-damage|roofing|insurance-claims|hvac|financing|weather
 *   city         string   optional — Texas city name
 *   publishedAt  string   optional — YYYY-MM-DD (defaults to today)
 *   postEn       string   optional — Facebook post EN
 *   postEs       string   optional — Facebook post ES
 *   imageUrl     string   optional — hero image URL
 *
 * Response:
 *   { success: true, slug: "...", url: "https://..." }
 */

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const POSTS_JSON = path.join(process.cwd(), "src", "data", "posts.json");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 80);
}

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.round(words / 200))} min read`;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Auth check ────────────────────────────────────────────────────────────
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  const expectedKey = process.env.AGENT_PUBLISH_KEY;

  if (!expectedKey || token !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = (body.title as string | undefined)?.trim();
  const contentHtml = (body.contentHtml as string | undefined)?.trim();

  if (!title || !contentHtml) {
    return NextResponse.json({ error: "title and contentHtml are required" }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const city = (body.city as string | undefined)?.trim() || null;
  const publishedAt = (body.publishedAt as string | undefined)?.trim() || today;

  const slugBase = city ? slugify(`${city} ${title}`) : slugify(title);
  const slug = `${publishedAt}-${slugBase}`.slice(0, 100);

  const VALID_CATEGORIES = ["storm-damage", "roofing", "insurance-claims", "hvac", "financing", "weather"];
  const category = VALID_CATEGORIES.includes(body.category as string)
    ? (body.category as string)
    : "storm-damage";

  const entry = {
    slug,
    title,
    titleEs: (body.titleEs as string | undefined)?.trim() || "",
    category,
    city,
    publishedAt,
    summary: ((body.summary as string | undefined)?.trim() || title).slice(0, 160),
    summaryEs: ((body.summaryEs as string | undefined)?.trim() || "").slice(0, 160),
    readTime: estimateReadTime(contentHtml),
    imageUrl: (body.imageUrl as string | undefined)?.trim() || "",
    contentHtml,
    contentHtmlEs: (body.contentHtmlEs as string | undefined)?.trim() || "",
    postEn: (body.postEn as string | undefined)?.trim() || "",
    postEs: (body.postEs as string | undefined)?.trim() || "",
    weatherCtx: "",
    newsCtx: "",
  };

  // ── Read → prepend → write posts.json ────────────────────────────────────
  try {
    const raw = await fs.readFile(POSTS_JSON, "utf-8");
    const posts: typeof entry[] = JSON.parse(raw);

    // Deduplicate by slug
    const filtered = posts.filter((p) => p.slug !== slug);
    filtered.unshift(entry);

    await fs.writeFile(POSTS_JSON, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (err) {
    console.error("[publish] file error:", err);
    return NextResponse.json({ error: "Failed to save article" }, { status: 500 });
  }

  const url = `https://texaspropertyhelp.com/updates/${slug}`;
  console.log(`[publish] ✅ agent published: ${slug}`);

  return NextResponse.json({ success: true, slug, url }, { status: 201 });
}
