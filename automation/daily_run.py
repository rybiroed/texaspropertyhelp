#!/usr/bin/env python3
"""
daily_run.py — Master automation script for Texas Property Help.

Runs automatically via WSL cron every morning at 8:00 AM CT.
Pipeline:
  1. Fetch live NWS weather alerts for Texas
  2. Fetch latest Texas storm/property news from RSS
  3. Determine today's scheduled topic
  4. Generate EN + ES Facebook post with weather/news context (via Ollama)
  5. Save to automation/output/YYYY-MM-DD_topic.json
  6. Optionally auto-post to Facebook Page (if FB credentials are set)
  7. Log everything to automation/logs/YYYY-MM-DD.log

Cron setup (run once in WSL):
  crontab -e
  Add: 0 8 * * * cd /home/rybiroed/projects/texaspropertyhelp && python3 automation/daily_run.py >> automation/logs/cron.log 2>&1

Manual run:
  python3 automation/daily_run.py
  python3 automation/daily_run.py --no-post        # generate only, don't post to FB
  python3 automation/daily_run.py --lang both      # post both EN and ES
  python3 automation/daily_run.py --dry-run        # full pipeline but don't post
"""

import json
import datetime
import argparse
import os
import sys
import io
import subprocess

# Fix encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR  = os.path.join(SCRIPT_DIR, "output")
LOGS_DIR    = os.path.join(SCRIPT_DIR, "logs")
SCHEDULE    = os.path.join(SCRIPT_DIR, "schedule.json")
OLLAMA_URL  = "http://localhost:11434/api/generate"
MODEL       = "llama3.1:8b"

# Add automation dir to path for local imports
sys.path.insert(0, SCRIPT_DIR)
from fetch_weather import get_texas_alerts, summarize_alerts
from fetch_news    import get_texas_storm_news

import urllib.request
import urllib.error


# ── Logging ──────────────────────────────────────────────────────────────────

def setup_log() -> io.TextIOWrapper:
    os.makedirs(LOGS_DIR, exist_ok=True)
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    log_path = os.path.join(LOGS_DIR, f"{date_str}.log")
    return open(log_path, "a", encoding="utf-8")

def log(msg: str, logfile=None):
    ts = datetime.datetime.now().strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    if logfile:
        logfile.write(line + "\n")
        logfile.flush()


# ── Schedule ─────────────────────────────────────────────────────────────────

def load_schedule() -> dict:
    with open(SCHEDULE, "r", encoding="utf-8") as f:
        return json.load(f)

def get_today_topic(schedule: dict) -> dict:
    day_index = str(datetime.datetime.now().weekday())
    return schedule["weekly_schedule"][day_index]


# ── Ollama ───────────────────────────────────────────────────────────────────

def call_ollama(prompt: str) -> str:
    import json as _json
    payload = _json.dumps({
        "model":  MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.75, "top_p": 0.9, "num_predict": 600}
    }).encode("utf-8")
    req = urllib.request.Request(
        OLLAMA_URL, data=payload,
        headers={"Content-Type": "application/json"}, method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = _json.loads(resp.read().decode("utf-8"))
            return result.get("response", "").strip()
    except urllib.error.URLError as e:
        raise RuntimeError(f"Ollama connection error: {e}\nMake sure Ollama is running: ollama serve")


def build_en_prompt(topic: dict, weather_ctx: str, news_ctx: str) -> str:
    ctx_lines = []
    if weather_ctx:
        ctx_lines.append(f"Active Texas weather alerts: {weather_ctx[:300]}")
    if news_ctx:
        ctx_lines.append(f"Recent Texas storm/property news: {news_ctx[:300]}")
    ctx_block = ("\n\nLive context to reference naturally:\n" + "\n".join(ctx_lines)) if ctx_lines else ""

    return f"""You are a social media writer for Texas Property Help — a free homeowner assistance platform.

Write a Facebook post about: {topic['angle']}
Section: {topic['section']}
Keywords to naturally include: {', '.join(topic['keywords'])}{ctx_block}

Rules:
- 150-250 words maximum
- Start with a hook (question or surprising fact)
- Simple, friendly language — not legal jargon
- Include 2-3 practical tips homeowners can act on TODAY
- End with: "Get free guidance → texaspropertyhelp.com"
- Use 2-3 relevant emojis naturally placed (not at start of every line)
- Do NOT use hashtags
- Tone: helpful neighbor, not salesperson
- Must be specific to TEXAS (mention Texas law, TDI, TDLR where relevant)
- If live weather or news context is provided, weave it in naturally (1-2 sentences)

Write ONLY the post text. No title, no explanation."""


def build_es_prompt(en_post: str) -> str:
    return f"""Translate the following Facebook post from English to Spanish (Latin American Spanish, for Texas Mexican-American community).

Keep the same tone — friendly, helpful, practical.
Keep "texaspropertyhelp.com" as-is.
Keep technical terms (TDI, TDLR, ACV, RCV, TWIA, NFIP) as-is.
Keep numbers and dollar amounts as-is.

English post:
{en_post}

Write ONLY the Spanish translation. No explanation."""


# ── Output ───────────────────────────────────────────────────────────────────

def save_output(data: dict) -> str:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    topic_slug = data["topic"].replace(" ", "_").replace("/", "-")
    filepath = os.path.join(OUTPUT_DIR, f"{date_str}_{topic_slug}.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return filepath


# ── Facebook posting ─────────────────────────────────────────────────────────

def post_to_facebook(text: str, lang: str) -> bool:
    """Try to post to Facebook. Returns True on success."""
    page_id = os.environ.get("FB_PAGE_ID", "")
    token   = os.environ.get("FB_ACCESS_TOKEN", "")

    if not page_id or not token:
        return False  # credentials not set, skip silently

    import urllib.parse
    url  = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    data = urllib.parse.urlencode({"message": text, "access_token": token}).encode("utf-8")
    req  = urllib.request.Request(url, data=data, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            post_id = result.get("id", "unknown")
            return post_id
    except Exception as e:
        return False


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Daily automation run for Texas Property Help")
    parser.add_argument("--no-post",  action="store_true", help="Generate posts but don't publish to Facebook")
    parser.add_argument("--dry-run",  action="store_true", help="Full pipeline, print results, don't save or post")
    parser.add_argument("--lang",     default="en", choices=["en", "es", "both"], help="Language to post to Facebook (default: en)")
    parser.add_argument("--topic",    help="Override today's scheduled topic")
    args = parser.parse_args()

    logfile = None if args.dry_run else setup_log()
    now     = datetime.datetime.now()

    log("=" * 60, logfile)
    log(f"🚀 Texas Property Help — Daily Automation Run", logfile)
    log(f"   {now.strftime('%A, %B %d, %Y at %H:%M CT')}", logfile)
    log("=" * 60, logfile)

    # ── Step 1: Weather ──────────────────────────────────────────────────────
    log("\n📡 Step 1: Fetching NWS weather alerts...", logfile)
    try:
        alerts, weather_ctx = get_texas_alerts()
        log(f"   Found {len(alerts)} relevant alert(s)", logfile)
        if alerts:
            for a in alerts[:3]:
                log(f"   🔴 {a['event']} — {a['area'][:80]}", logfile)
    except Exception as e:
        log(f"   ⚠️ Weather fetch failed: {e}", logfile)
        alerts, weather_ctx = [], ""

    # ── Step 2: News ─────────────────────────────────────────────────────────
    log("\n📰 Step 2: Fetching Texas storm news from RSS...", logfile)
    try:
        stories, news_ctx = get_texas_storm_news(max_results=3)
        log(f"   Found {len(stories)} relevant story/stories", logfile)
        for s in stories[:2]:
            log(f"   📍 {s['source']}: {s['title'][:80]}", logfile)
    except Exception as e:
        log(f"   ⚠️ News fetch failed: {e}", logfile)
        stories, news_ctx = [], ""

    # ── Step 3: Topic ────────────────────────────────────────────────────────
    log("\n📅 Step 3: Determining today's topic...", logfile)
    schedule = load_schedule()
    if args.topic:
        topic = next(
            (d for d in schedule["weekly_schedule"].values() if d["topic"] == args.topic),
            None
        )
        if not topic:
            log(f"   ❌ Topic '{args.topic}' not found", logfile)
            sys.exit(1)
    else:
        # If there are active alerts, override to weather_alert topic (highest urgency)
        if alerts and not args.topic:
            topic = next(
                (d for d in schedule["weekly_schedule"].values() if d["topic"] == "weather_alert"),
                get_today_topic(schedule)
            )
            log(f"   ⚡ Active weather alerts → switching to weather_alert topic", logfile)
        else:
            topic = get_today_topic(schedule)

    log(f"   Topic: {topic['section']} — {topic['angle'][:60]}...", logfile)

    # ── Step 4: Generate posts ───────────────────────────────────────────────
    log("\n🤖 Step 4: Generating posts with Ollama...", logfile)
    try:
        log("   ⏳ English post...", logfile)
        en_prompt = build_en_prompt(topic, weather_ctx, news_ctx)
        post_en   = call_ollama(en_prompt)
        log(f"   ✓ EN post: {len(post_en)} chars", logfile)

        log("   ⏳ Spanish translation...", logfile)
        post_es = call_ollama(build_es_prompt(post_en))
        log(f"   ✓ ES post: {len(post_es)} chars", logfile)
    except RuntimeError as e:
        log(f"   ❌ Generation failed: {e}", logfile)
        sys.exit(1)

    # ── Step 5: Save ─────────────────────────────────────────────────────────
    data = {
        "date":         now.strftime("%Y-%m-%d"),
        "time":         now.strftime("%H:%M"),
        "day":          topic["day"],
        "topic":        topic["topic"],
        "section":      topic["section"],
        "angle":        topic["angle"],
        "model":        MODEL,
        "weather_ctx":  weather_ctx,
        "news_ctx":     news_ctx,
        "alerts_count": len(alerts),
        "stories_count": len(stories),
        "post_en":      post_en,
        "post_es":      post_es,
        "char_en":      len(post_en),
        "char_es":      len(post_es),
        "posted_en":    False,
        "posted_es":    False,
        "ready_to_post": True,
    }

    if not args.dry_run:
        filepath = save_output(data)
        log(f"\n💾 Step 5: Saved → {filepath}", logfile)
    else:
        filepath = "(dry run — not saved)"
        log(f"\n💾 Step 5: DRY RUN — output not saved", logfile)

    # ── Print posts ──────────────────────────────────────────────────────────
    print("\n" + "═" * 60)
    print("🇺🇸  ENGLISH POST")
    print("─" * 60)
    print(post_en)
    print("\n🇲🇽  SPANISH POST")
    print("─" * 60)
    print(post_es)
    print("═" * 60)

    # ── Step 6: Facebook posting ──────────────────────────────────────────────
    if args.dry_run or args.no_post:
        log(f"\n📤 Step 6: Facebook posting {'skipped (dry run)' if args.dry_run else 'skipped (--no-post)'}", logfile)
    else:
        log(f"\n📤 Step 6: Posting to Facebook...", logfile)
        fb_page_id = os.environ.get("FB_PAGE_ID", "")
        fb_token   = os.environ.get("FB_ACCESS_TOKEN", "")

        if not fb_page_id or not fb_token:
            log("   ⚠️  FB credentials not set — skipping auto-post", logfile)
            log("   To enable: export FB_PAGE_ID=xxx FB_ACCESS_TOKEN=yyy", logfile)
        else:
            # Post EN
            if args.lang in ("en", "both"):
                result = post_to_facebook(post_en, "en")
                if result:
                    data["posted_en"] = True
                    log(f"   ✅ EN post published (ID: {result})", logfile)
                else:
                    log("   ❌ EN post failed", logfile)

            # Post ES (separately, 10 min later in a real setup)
            if args.lang in ("es", "both"):
                result = post_to_facebook(post_es, "es")
                if result:
                    data["posted_es"] = True
                    log(f"   ✅ ES post published (ID: {result})", logfile)
                else:
                    log("   ❌ ES post failed", logfile)

            # Update saved file with post status
            if not args.dry_run:
                save_output(data)

    log("\n✅ Daily run complete.", logfile)
    if logfile:
        logfile.close()


if __name__ == "__main__":
    main()
