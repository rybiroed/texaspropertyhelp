#!/usr/bin/env python3
"""
daily_run.py — Master automation pipeline for Texas Property Help.

Pipeline (article-first):
  1. Fetch live NWS weather alerts for Texas
  2. Fetch latest Texas storm/property news from RSS
  3. Determine today's scheduled topic + city rotation
  4. Generate full article (EN + ES) via Ollama → save to posts.json
  5. Git commit + push posts.json → Vercel auto-deploys
  6. Generate Facebook post text referencing the article URL
  7. Save daily output JSON
  8. Optionally post to Facebook (link post, not raw text)

Cron setup (run once in WSL):
  crontab -e
  Add: 0 13 * * * cd /home/rybiroed/projects/texaspropertyhelp && python3 automation/daily_run.py >> automation/logs/cron.log 2>&1
  (13:00 UTC = 8:00 AM CDT)

Manual run:
  python3 automation/daily_run.py
  python3 automation/daily_run.py --no-post        # generate + publish, skip FB
  python3 automation/daily_run.py --dry-run        # full pipeline, don't save or push
  python3 automation/daily_run.py --lang both      # post EN and ES to FB
  python3 automation/daily_run.py --topic roofing  # override today's topic
  python3 automation/daily_run.py --city Houston   # override city
"""

import json
import datetime
import argparse
import os
import sys
import subprocess

# Fix encoding without re-wrapping
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR   = os.path.join(SCRIPT_DIR, "output")
LOGS_DIR     = os.path.join(SCRIPT_DIR, "logs")
SCHEDULE     = os.path.join(SCRIPT_DIR, "schedule.json")
POSTS_JSON   = os.path.join(PROJECT_ROOT, "src", "data", "posts.json")
SITE_URL     = "https://texaspropertyhelp.com"
OLLAMA_URL   = "http://localhost:11434/api/generate"
MODEL        = "llama3.1:8b"


def load_env_files():
    """Load .env.local / .env into os.environ.

    cron runs with a bare environment, so anything set only in .env.local
    (FB_PAGE_ID, FB_ACCESS_TOKEN, ...) is invisible to the pipeline without this.
    Real environment variables always win over file values.
    """
    for name in (".env.local", ".env"):
        path = os.path.join(PROJECT_ROOT, name)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip().lstrip("\\")  # line 1 of .env.local is "\#..."
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key and key not in os.environ:
                    os.environ[key] = val


load_env_files()

sys.path.insert(0, SCRIPT_DIR)
from fetch_weather      import get_texas_alerts
from fetch_news         import get_texas_storm_news
from generate_article   import (
    call_ollama, build_article_prompt, build_es_translate_prompt,
    build_title_prompt, build_es_title_prompt, build_summary_prompt,
    build_es_summary_prompt, build_fb_post_prompt,
    slugify, estimate_read_time, TOPIC_CATEGORY, CITY_ROTATION,
    load_posts, save_posts, generate_image
)

import urllib.request
import urllib.error


# ── Logging ───────────────────────────────────────────────────────────────────
def setup_log():
    os.makedirs(LOGS_DIR, exist_ok=True)
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    log_path = os.path.join(LOGS_DIR, f"{date_str}.log")
    return open(log_path, "a", encoding="utf-8")

def log(msg: str, logfile=None):
    ts   = datetime.datetime.now().strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    if logfile:
        logfile.write(line + "\n")
        logfile.flush()


# ── Schedule ──────────────────────────────────────────────────────────────────
def load_schedule():
    with open(SCHEDULE, "r", encoding="utf-8") as f:
        return json.load(f)

def get_today_topic(schedule):
    day_index = str(datetime.datetime.now().weekday())
    return schedule["weekly_schedule"][day_index]

def get_city_for_today():
    day_of_year = datetime.datetime.now().timetuple().tm_yday
    return CITY_ROTATION[day_of_year % len(CITY_ROTATION)]


# ── Git publish ───────────────────────────────────────────────────────────────
def git_push(today: str, logfile=None) -> bool:
    """Commit posts.json and push to GitHub. Returns True on success."""
    try:
        os.chdir(PROJECT_ROOT)
        # Check if there are changes (posts.json modified OR new/changed post images)
        result = subprocess.run(
            ["git", "status", "--porcelain", "--", "src/data/posts.json", "public/images/posts"],
            capture_output=True, text=True
        )
        if not result.stdout.strip():
            log("   ℹ️  No changes in posts.json or images — skipping git push", logfile)
            return True  # not an error

        subprocess.run(["git", "add", "src/data/posts.json", "public/images/posts"], check=True)
        subprocess.run(
            ["git", "commit", "-m", f"content: auto-publish article {today}\n\nGenerated by daily_run.py via Ollama llama3.1:8b\nTopics: roofing, HVAC, storm damage, insurance, financing, weather\nCity rotation: 20 Texas cities"],
            check=True
        )
        subprocess.run(["git", "push", "origin", "HEAD"], check=True, timeout=60)
        return True
    except subprocess.CalledProcessError as e:
        log(f"   ❌ Git error: {e}", logfile)
        return False


# ── Facebook token health ─────────────────────────────────────────────────────
def warn_if_token_expiring(logfile=None) -> None:
    """Warn while there is still time to act.

    A page token never expires, but Meta's 90-day data-access window does.
    When it lapses the API starts refusing posts, which would otherwise look
    like autoposting silently stopping again. Re-run setup_facebook.py to reset it.
    """
    token = os.environ.get("FB_ACCESS_TOKEN", "")
    if not token:
        return
    import urllib.parse
    url = "https://graph.facebook.com/v19.0/debug_token?" + urllib.parse.urlencode(
        {"input_token": token, "access_token": token}
    )
    try:
        with urllib.request.urlopen(url, timeout=20) as resp:
            info = json.loads(resp.read().decode("utf-8")).get("data", {})
    except Exception:
        return  # never let a health check break the pipeline

    if not info.get("is_valid", True):
        log("   ⚠️  FB token is NO LONGER VALID — re-run automation/setup_facebook.py", logfile)
        return

    expiry = info.get("data_access_expires_at") or 0
    if not expiry:
        return
    days_left = (expiry - datetime.datetime.now().timestamp()) / 86400
    if days_left < 14:
        log(f"   ⚠️  FB data access expires in {days_left:.0f} day(s) — "
            "re-run automation/setup_facebook.py to avoid posting failures", logfile)


# ── Facebook link post ────────────────────────────────────────────────────────
def post_link_to_facebook(message: str, article_url: str) -> str | bool:
    """Post a link post to Facebook. Returns post ID or False."""
    page_id = os.environ.get("FB_PAGE_ID", "")
    token   = os.environ.get("FB_ACCESS_TOKEN", "")
    if not page_id or not token:
        return False

    import urllib.parse
    url  = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    data = urllib.parse.urlencode({
        "message":      message,
        "link":         article_url,
        "access_token": token,
    }).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            return result.get("id", False)
    except Exception as e:
        return False


# ── Output save ───────────────────────────────────────────────────────────────
def save_output(data: dict) -> str:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    date_str   = data["date"]
    topic_slug = data["topic"].replace(" ", "_").replace("/", "-")
    filepath   = os.path.join(OUTPUT_DIR, f"{date_str}_{topic_slug}.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return filepath


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Daily automation pipeline for Texas Property Help")
    parser.add_argument("--no-post",  action="store_true", help="Generate + publish to site, skip Facebook")
    parser.add_argument("--dry-run",  action="store_true", help="Full pipeline, print results, don't save or push")
    parser.add_argument("--lang",     default="en", choices=["en", "es", "both"])
    parser.add_argument("--topic",    help="Override today's scheduled topic")
    parser.add_argument("--city",     help="Override city for today's article")
    parser.add_argument("--no-city",  action="store_true", help="Generate statewide article")
    args = parser.parse_args()

    logfile = None if args.dry_run else setup_log()
    now     = datetime.datetime.now()
    today   = now.strftime("%Y-%m-%d")

    log("=" * 62, logfile)
    log("🚀  Texas Property Help — Daily Automation Pipeline", logfile)
    log(f"    {now.strftime('%A, %B %d, %Y at %H:%M CT')}", logfile)
    log("=" * 62, logfile)

    # ── Step 1: Weather ──────────────────────────────────────────────────────
    log("\n📡 Step 1: Fetching NWS weather alerts...", logfile)
    try:
        alerts, weather_ctx = get_texas_alerts()
        log(f"   Found {len(alerts)} relevant alert(s)", logfile)
        for a in alerts[:3]:
            log(f"   🔴 {a['event']} — {a['area'][:70]}", logfile)
    except Exception as e:
        log(f"   ⚠️  Weather fetch failed: {e}", logfile)
        alerts, weather_ctx = [], ""

    # ── Step 2: News ─────────────────────────────────────────────────────────
    log("\n📰 Step 2: Fetching Texas storm/property news...", logfile)
    try:
        stories, news_ctx = get_texas_storm_news(max_results=3)
        log(f"   Found {len(stories)} relevant story/stories", logfile)
        for s in stories[:2]:
            log(f"   📍 {s['source']}: {s['title'][:70]}", logfile)
    except Exception as e:
        log(f"   ⚠️  News fetch failed: {e}", logfile)
        stories, news_ctx = [], ""

    # ── Step 3: Topic + City ─────────────────────────────────────────────────
    log("\n📅 Step 3: Selecting topic and city...", logfile)
    schedule = load_schedule()
    if args.topic:
        topic = next(
            (d for d in schedule["weekly_schedule"].values() if d["topic"] == args.topic),
            None
        )
        if not topic:
            log(f"   ❌ Unknown topic: {args.topic}", logfile)
            sys.exit(1)
    else:
        if alerts and not args.topic:
            topic = next(
                (d for d in schedule["weekly_schedule"].values() if d["topic"] == "weather_alert"),
                get_today_topic(schedule)
            )
            log("   ⚡ Active NWS alerts → switching to weather_alert topic", logfile)
        else:
            topic = get_today_topic(schedule)

    if args.no_city:
        city = None
    elif args.city:
        city = args.city
    else:
        city = get_city_for_today()

    log(f"   Topic: {topic['section']} — {topic['angle'][:55]}...", logfile)
    log(f"   City:  {city or 'statewide'}", logfile)

    # ── Step 4: Generate article ──────────────────────────────────────────────
    log("\n🤖 Step 4: Generating article with Ollama...", logfile)
    try:
        log("   ⏳ Title (EN)...", logfile)
        title_en = call_ollama(build_title_prompt(topic, city), max_tokens=80).strip('"').strip("'").strip()

        log("   ⏳ Title (ES)...", logfile)
        title_es = call_ollama(build_es_title_prompt(title_en), max_tokens=80).strip('"').strip("'").strip()

        log(f"   ✓ Title: {title_en}", logfile)

        log("   ⏳ Article body (EN)...", logfile)
        content_html = call_ollama(build_article_prompt(topic, city, weather_ctx, news_ctx))
        if not content_html.startswith("<"):
            content_html = "<p>" + content_html
        log(f"   ✓ EN: {len(content_html)} chars", logfile)

        log("   ⏳ Article body (ES)...", logfile)
        content_html_es = call_ollama(build_es_translate_prompt(content_html), max_tokens=1400)
        log(f"   ✓ ES: {len(content_html_es)} chars", logfile)

        log("   ⏳ Summaries...", logfile)
        summary_en = call_ollama(build_summary_prompt(content_html, title_en), max_tokens=100).strip('"').strip().strip("'")
        summary_es = call_ollama(build_es_summary_prompt(summary_en), max_tokens=100).strip('"').strip().strip("'")

        log("   ⏳ Facebook post text...", logfile)
        post_en = call_ollama(build_fb_post_prompt(title_en, content_html, city), max_tokens=350)
        post_es = call_ollama(build_es_translate_prompt(post_en), max_tokens=400)

    except RuntimeError as e:
        log(f"   ❌ Ollama generation failed: {e}", logfile)
        sys.exit(1)

    # ── Build slug + post entry ───────────────────────────────────────────────
    slug_base = slugify(f"{city} {title_en}" if city else title_en)
    slug      = f"{today}-{slug_base}"[:100]
    category  = TOPIC_CATEGORY.get(topic["topic"], "storm-damage")
    read_time = estimate_read_time(content_html)
    article_url = f"{SITE_URL}/updates/{slug}"

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
        "contentHtml":   content_html,
        "contentHtmlEs": content_html_es,
        "postEn":        post_en,
        "postEs":        post_es,
        "weatherCtx":    weather_ctx[:400],
        "newsCtx":       news_ctx[:400],
    }

    log(f"   📎 Slug: {slug}", logfile)
    log(f"   🔗 URL: {article_url}", logfile)

    # ── Step 4.5: Generate hero image (Pollinations, 4-seed retry) ────────────
    if args.dry_run:
        log("\n🖼️  Step 4.5: DRY RUN — skipping image generation", logfile)
        post_entry["imageUrl"] = ""
    else:
        log("\n🖼️  Step 4.5: Generating hero image...", logfile)
        try:
            image_url = generate_image(slug, title_en, category, city)
        except Exception as e:
            log(f"   ⚠️  Image generation crashed: {e}", logfile)
            image_url = ""
        post_entry["imageUrl"] = image_url
        if image_url:
            log(f"   ✅ Image: {image_url}", logfile)
        else:
            log("   ⚠️  No image — will retry on next daily run (backfill step)", logfile)

    # ── Step 5: Save to posts.json ────────────────────────────────────────────
    if args.dry_run:
        log("\n💾 Step 5: DRY RUN — not saved to posts.json", logfile)
    else:
        posts = load_posts()
        posts = [p for p in posts if p.get("slug") != slug]  # dedup
        posts.insert(0, post_entry)

        # Backfill: retry images for older posts that failed on previous runs (max 5/run)
        missing = [p for p in posts[1:] if not p.get("imageUrl")]
        if missing:
            log(f"\n🔧 Backfill: {len(missing)} older post(s) missing images, retrying up to 5...", logfile)
            for p in missing[:5]:
                try:
                    url = generate_image(
                        p["slug"], p.get("title", p["slug"]),
                        p.get("category", "storm-damage"), p.get("city"),
                    )
                except Exception as e:
                    log(f"   ⚠️  Backfill crashed for {p['slug'][:50]}: {e}", logfile)
                    url = ""
                if url:
                    p["imageUrl"] = url
                    log(f"   ✅ Backfilled: {p['slug'][:60]}", logfile)
                else:
                    log(f"   ⚠️  Still failing: {p['slug'][:60]}", logfile)

        save_posts(posts)
        log(f"\n💾 Step 5: Saved to posts.json ({len(posts)} total)", logfile)

    # ── Step 6: Git push → Vercel deploy ──────────────────────────────────────
    if args.dry_run:
        log("\n🚀 Step 6: DRY RUN — skipping git push", logfile)
    else:
        log("\n🚀 Step 6: Publishing to website (git push → Vercel)...", logfile)
        ok = git_push(today, logfile)
        if ok:
            log(f"   ✅ Pushed — Vercel deploying...", logfile)
            log(f"   🔗 Will be live at: {article_url}", logfile)
        else:
            log("   ⚠️  Git push failed — article saved locally but not deployed", logfile)

    # ── Print posts ───────────────────────────────────────────────────────────
    print("\n" + "═" * 62)
    print(f"📄  ARTICLE: {title_en}")
    print(f"🔗  URL: {article_url}")
    print("─" * 62)
    print("🇺🇸  FACEBOOK POST (EN)")
    print(post_en)
    print("\n🇲🇽  FACEBOOK POST (ES)")
    print(post_es)
    print("═" * 62)

    # ── Step 7: Save daily output JSON ────────────────────────────────────────
    daily_data = {
        "date":          today,
        "time":          now.strftime("%H:%M"),
        "topic":         topic["topic"],
        "section":       topic["section"],
        "city":          city,
        "slug":          slug,
        "article_url":   article_url,
        "title_en":      title_en,
        "model":         MODEL,
        "weather_ctx":   weather_ctx,
        "news_ctx":      news_ctx,
        "alerts_count":  len(alerts),
        "stories_count": len(stories),
        "post_en":       post_en,
        "post_es":       post_es,
        "posted_en":     False,
        "posted_es":     False,
    }

    if not args.dry_run:
        filepath = save_output(daily_data)
        log(f"\n📁 Step 7: Daily output → {filepath}", logfile)

    # ── Step 8: Facebook posting ──────────────────────────────────────────────
    if args.dry_run or args.no_post:
        log(f"\n📤 Step 8: Facebook posting {'skipped (dry run)' if args.dry_run else 'skipped (--no-post)'}", logfile)
    else:
        log("\n📤 Step 8: Posting to Facebook...", logfile)
        fb_page_id = os.environ.get("FB_PAGE_ID", "")
        fb_token   = os.environ.get("FB_ACCESS_TOKEN", "")

        if not fb_page_id or not fb_token:
            log("   ⚠️  FB credentials not set — skipping", logfile)
            log("   Add FB_PAGE_ID and FB_ACCESS_TOKEN to .env.local (gitignored)", logfile)
            log("   Verify with: python3 automation/post_to_facebook.py --check", logfile)
        else:
            warn_if_token_expiring(logfile)
            if args.lang in ("en", "both"):
                result = post_link_to_facebook(post_en, article_url)
                if result:
                    daily_data["posted_en"] = True
                    log(f"   ✅ EN post published (ID: {result})", logfile)
                else:
                    log("   ❌ EN post failed", logfile)

            if args.lang in ("es", "both"):
                result = post_link_to_facebook(post_es, article_url)
                if result:
                    daily_data["posted_es"] = True
                    log(f"   ✅ ES post published (ID: {result})", logfile)
                else:
                    log("   ❌ ES post failed", logfile)

            if not args.dry_run:
                save_output(daily_data)

    log("\n✅ Daily pipeline complete.", logfile)
    if logfile:
        logfile.close()


if __name__ == "__main__":
    main()
