#!/usr/bin/env python3
"""
generate_article.py — Generate a full website article using Ollama and append to posts.json.

Usage:
  python generate_article.py                    # use scheduled topic
  python generate_article.py --topic roofing    # override topic
  python generate_article.py --city Houston     # target a specific city
  python generate_article.py --dry-run          # print article, don't save

Output: appends one entry to src/data/posts.json
"""

import json
import os
import sys
import re
import io
import argparse
import datetime
import urllib.request
import urllib.error
import unicodedata

# Optional image generation (requires ComfyUI running)
try:
    from generate_image import generate_article_image
    IMAGE_GEN_AVAILABLE = True
except ImportError:
    IMAGE_GEN_AVAILABLE = False

# Fix encoding for Windows/WSL
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
POSTS_JSON   = os.path.join(PROJECT_ROOT, "src", "data", "posts.json")
SCHEDULE     = os.path.join(SCRIPT_DIR, "schedule.json")
OLLAMA_URL   = "http://localhost:11434/api/generate"
MODEL        = "llama3.1:8b"

sys.path.insert(0, SCRIPT_DIR)
from fetch_weather import get_texas_alerts
from fetch_news    import get_texas_storm_news


# ── City rotation (14-day cycle across 20 cities) ────────────────────────────
CITY_ROTATION = [
    "Houston", "Dallas", "San Antonio", "Austin", "Fort Worth",
    "Corpus Christi", "El Paso", "Lubbock", "Amarillo", "Laredo",
    "Waco", "McAllen", "Beaumont", "Galveston", "Midland",
    "Abilene", "Tyler", "Brownsville", "Odessa", "Killeen",
]

# ── Topic → category mapping ──────────────────────────────────────────────────
TOPIC_CATEGORY = {
    "storm_damage":  "storm-damage",
    "roofing":       "roofing",
    "insurance":     "insurance-claims",
    "hvac":          "hvac",
    "financing":     "financing",
    "weather_alert": "weather",
    "community_qa":  "storm-damage",
}

# ── Read time estimate (~200 words/min) ──────────────────────────────────────
def estimate_read_time(html: str) -> str:
    text = re.sub(r"<[^>]+>", " ", html)
    words = len(text.split())
    mins = max(3, round(words / 200))
    return f"{mins} min read"


# ── Slugify ──────────────────────────────────────────────────────────────────
def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    text = re.sub(r"[\s_-]+", "-", text)
    return text[:80]


# ── Ollama call ───────────────────────────────────────────────────────────────
def call_ollama(prompt: str, max_tokens: int = 1200) -> str:
    payload = json.dumps({
        "model":  MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.72, "top_p": 0.9, "num_predict": max_tokens}
    }).encode("utf-8")
    req = urllib.request.Request(
        OLLAMA_URL, data=payload,
        headers={"Content-Type": "application/json"}, method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            return result.get("response", "").strip()
    except urllib.error.URLError as e:
        raise RuntimeError(f"Ollama error: {e}. Is 'ollama serve' running?")


# ── Prompts ───────────────────────────────────────────────────────────────────
def build_article_prompt(topic: dict, city: str | None, weather_ctx: str, news_ctx: str) -> str:
    city_line = f"Target city/area: {city}, Texas" if city else "Target audience: Texas homeowners statewide"
    ctx_parts = []
    if weather_ctx:
        ctx_parts.append(f"Active NWS alerts: {weather_ctx[:300]}")
    if news_ctx:
        ctx_parts.append(f"Recent Texas news: {news_ctx[:300]}")
    ctx_block = ("\n\nLive context (weave in naturally if relevant):\n" + "\n".join(ctx_parts)) if ctx_parts else ""

    return f"""You are a content writer for Texas Property Help — a free homeowner assistance service.

Write a helpful article for Texas homeowners. Output ONLY valid HTML (no markdown, no code block fences).

Topic: {topic['angle']}
Section: {topic['section']}
{city_line}
Keywords to include naturally: {', '.join(topic['keywords'])}{ctx_block}

HTML structure to follow (use these exact tags):
<h2>Compelling subtitle about the main point</h2>
<p>Opening paragraph — hook the reader with a relatable scenario or surprising fact. 2-3 sentences.</p>

<h3>First key point</h3>
<p>Explanation paragraph. Include specific Texas details (law, climate, insurers). 2-3 sentences.</p>
<ul><li>Specific tip 1</li><li>Specific tip 2</li><li>Specific tip 3</li></ul>

<h3>Second key point</h3>
<p>Explanation paragraph with real numbers or timeframes.</p>

<h3>Third key point</h3>
<p>Explanation — include something about documentation, contractor vetting, or claim filing.</p>

<h3>What to Do Right Now</h3>
<p>3-step action checklist as a numbered list:</p>
<ol><li>Step 1 — specific action</li><li>Step 2 — specific action</li><li>Step 3 — specific action</li></ol>

<p><strong>Bottom line:</strong> One-sentence takeaway.</p>

Rules:
- 700-900 words total
- Texas-specific: mention TDI, TDLR, Texas law, specific Texas cities/counties where natural
- No generic content — every paragraph should feel written for a Texas homeowner
- No hashtags, no "texaspropertyhelp.com" in article body (it's in the CTA block)
- Professional but approachable tone — helpful neighbor, not lawyer or salesperson
- Output ONLY the HTML fragment. Nothing before <h2>, nothing after </p>."""


def build_summary_prompt(article_html: str, title: str) -> str:
    return f"""Write a 1-2 sentence meta description (120-155 characters) for this article titled "{title}".
It should clearly describe the article's value for Texas homeowners.
Output ONLY the description text, no quotes, no explanation.

Article excerpt:
{re.sub(r'<[^>]+>', ' ', article_html)[:500]}"""


def build_title_prompt(topic: dict, city: str | None) -> str:
    city_phrase = f" in {city}" if city else " in Texas"
    return f"""Write a compelling article title (max 70 characters) for a homeowner advice article.

Topic: {topic['angle']}
Location: {city_phrase}

Rules:
- Make it specific and helpful (not clickbait)
- Include the city name if provided
- Sound like a homeowner resource, not a sales pitch
- Examples of good format: "Houston Homeowners: 5 Steps After Hail Damage" or "ACV vs RCV: What Texas Homeowners Must Know Before Filing"

Output ONLY the title. No quotes, no explanation."""


def build_es_translate_prompt(en_html: str) -> str:
    return f"""Translate this HTML article from English to Spanish (Latin American Spanish for Texas Mexican-American readers).

Rules:
- Preserve ALL HTML tags exactly as-is
- Keep proper nouns: TDI, TDLR, TWIA, NFIP, ACV, RCV, BBB, SOS
- Keep URLs, dollar amounts, percentages as-is
- Keep city/county names in English
- Translate naturally — not word-for-word
- Same warm, helpful tone as original

HTML to translate:
{en_html}

Output ONLY the translated HTML. Nothing else."""


def build_es_title_prompt(en_title: str) -> str:
    return f"""Translate this article title to Spanish (for Texas Mexican-American readers):
"{en_title}"

Output ONLY the translation. No quotes, no explanation."""


def build_es_summary_prompt(en_summary: str) -> str:
    return f"""Translate this meta description to Spanish:
"{en_summary}"

Output ONLY the translation. No quotes."""


def build_fb_post_prompt(title: str, article_html: str, city: str | None) -> str:
    city_line = f" in {city}, Texas" if city else " in Texas"
    excerpt = re.sub(r"<[^>]+>", " ", article_html).strip()[:400]
    return f"""Write a Facebook post sharing this article from Texas Property Help.

Article title: {title}
Article excerpt: {excerpt}
Location focus: {city_line}

Rules:
- 120-200 words
- Start with a hook — question or bold statement
- 2-3 key takeaways from the article
- End with: "Read the full guide → texaspropertyhelp.com/updates/"
- 2-3 emojis (not at start of every line)
- No hashtags
- Friendly helpful tone

Output ONLY the post text."""


# ── Schedule helpers ──────────────────────────────────────────────────────────
def load_schedule() -> dict:
    with open(SCHEDULE, "r", encoding="utf-8") as f:
        return json.load(f)

def get_today_topic(schedule: dict) -> dict:
    day_index = str(datetime.datetime.now().weekday())
    return schedule["weekly_schedule"][day_index]

def get_city_for_today() -> str:
    day_of_year = datetime.datetime.now().timetuple().tm_yday
    return CITY_ROTATION[day_of_year % len(CITY_ROTATION)]


# ── posts.json helpers ────────────────────────────────────────────────────────
def load_posts() -> list:
    if not os.path.exists(POSTS_JSON):
        return []
    with open(POSTS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)

def save_posts(posts: list):
    with open(POSTS_JSON, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic",    help="Topic override: storm_damage|roofing|insurance|hvac|financing|weather_alert")
    parser.add_argument("--city",     help="City override (e.g. Houston, Dallas)")
    parser.add_argument("--no-city",  action="store_true", help="Generate statewide article (no city)")
    parser.add_argument("--dry-run",  action="store_true", help="Generate and print but don't save to posts.json")
    parser.add_argument("--no-image", action="store_true", help="Skip ComfyUI image generation")
    args = parser.parse_args()

    today = datetime.datetime.now().strftime("%Y-%m-%d")
    print(f"\n📝 Article Generator — {today}\n")

    # ── Weather + news context
    print("📡 Fetching weather alerts...")
    try:
        alerts, weather_ctx = get_texas_alerts()
        print(f"   {len(alerts)} alert(s)")
    except Exception as e:
        print(f"   ⚠️ {e}")
        alerts, weather_ctx = [], ""

    print("📰 Fetching news...")
    try:
        _, news_ctx = get_texas_storm_news(max_results=3)
    except Exception as e:
        print(f"   ⚠️ {e}")
        news_ctx = ""

    # ── Topic
    schedule = load_schedule()
    if args.topic:
        topic = next(
            (d for d in schedule["weekly_schedule"].values() if d["topic"] == args.topic),
            None
        )
        if not topic:
            print(f"❌ Unknown topic: {args.topic}")
            sys.exit(1)
    else:
        if alerts:
            topic = next(
                (d for d in schedule["weekly_schedule"].values() if d["topic"] == "weather_alert"),
                get_today_topic(schedule)
            )
            print(f"⚡ Active alerts → weather_alert topic")
        else:
            topic = get_today_topic(schedule)

    # ── City
    if args.no_city:
        city = None
    elif args.city:
        city = args.city
    else:
        city = get_city_for_today()

    print(f"📌 Topic: {topic['section']} — {topic['angle'][:60]}...")
    print(f"📍 City: {city or 'statewide'}\n")

    # ── Generate title
    print("🤖 Generating title...")
    title_en = call_ollama(build_title_prompt(topic, city), max_tokens=80)
    # Strip quotes if model added them
    title_en = title_en.strip('"').strip("'").strip()
    print(f"   EN: {title_en}")

    title_es = call_ollama(build_es_title_prompt(title_en), max_tokens=80)
    title_es = title_es.strip('"').strip("'").strip()
    print(f"   ES: {title_es}")

    # ── Generate article body
    print("\n🤖 Generating EN article...")
    content_html = call_ollama(build_article_prompt(topic, city, weather_ctx, news_ctx))
    # Ensure it starts with an HTML tag
    if not content_html.startswith("<"):
        content_html = "<p>" + content_html

    print(f"   {len(content_html)} chars | ~{estimate_read_time(content_html)}")

    print("🤖 Translating to Spanish...")
    content_html_es = call_ollama(build_es_translate_prompt(content_html), max_tokens=1400)
    print(f"   {len(content_html_es)} chars")

    # ── Summary
    print("\n🤖 Generating summaries...")
    summary_en = call_ollama(build_summary_prompt(content_html, title_en), max_tokens=100)
    summary_en = summary_en.strip('"').strip("'").strip()
    summary_es = call_ollama(build_es_summary_prompt(summary_en), max_tokens=100)
    summary_es = summary_es.strip('"').strip("'").strip()

    # ── FB posts
    print("🤖 Generating Facebook posts...")
    post_en = call_ollama(build_fb_post_prompt(title_en, content_html, city), max_tokens=350)
    post_es = call_ollama(build_es_translate_prompt(post_en), max_tokens=400)

    # ── Build slug
    slug_base = slugify(title_en)
    if city:
        slug_base = slugify(f"{city} {title_en}")
    slug = f"{today}-{slug_base}"[:100]

    # ── Assemble post entry
    category = TOPIC_CATEGORY.get(topic["topic"], "storm-damage")
    read_time = estimate_read_time(content_html)

    # ── Generate image with ComfyUI (optional)
    image_url = None
    if not args.no_image and not args.dry_run and IMAGE_GEN_AVAILABLE:
        print("\n🎨 Generating hero image with ComfyUI...")
        image_url = generate_article_image(slug=slug, topic=category, city=city)
    elif args.no_image:
        print("\n⏭️  Image generation skipped (--no-image)")
    elif not IMAGE_GEN_AVAILABLE:
        print("\n⚠️  generate_image.py not importable — no image")

    post_entry = {
        "slug":          slug,
        "title":         title_en,
        "titleEs":       title_es,
        "category":      category,
        "city":          city,
        "publishedAt":   today,
        "summary":       summary_en[:160],
        "summaryEs":     summary_es[:160],
        "readTime":      read_time,
        "imageUrl":      image_url or "",
        "contentHtml":   content_html,
        "contentHtmlEs": content_html_es,
        "postEn":        post_en,
        "postEs":        post_es,
        "weatherCtx":    weather_ctx[:400] if weather_ctx else "",
        "newsCtx":       news_ctx[:400] if news_ctx else "",
    }

    # ── Print preview
    print("\n" + "═" * 60)
    print(f"TITLE:    {title_en}")
    print(f"SLUG:     {slug}")
    print(f"CITY:     {city or 'statewide'}")
    print(f"CATEGORY: {category}")
    print(f"READ:     {read_time}")
    print("─" * 60)
    print("FB POST (EN):")
    print(post_en[:300] + ("..." if len(post_en) > 300 else ""))
    print("═" * 60)

    # ── Save
    if args.dry_run:
        print("\n⚡ DRY RUN — not saved to posts.json")
    else:
        posts = load_posts()
        # Avoid duplicate slugs
        posts = [p for p in posts if p.get("slug") != slug]
        posts.insert(0, post_entry)  # newest first
        save_posts(posts)
        print(f"\n✅ Saved to posts.json ({len(posts)} total articles)")
        print(f"   URL: https://texaspropertyhelp.com/updates/{slug}")

    return post_entry, slug


if __name__ == "__main__":
    entry, slug = main()
