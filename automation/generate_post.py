#!/usr/bin/env python3
"""
Texas Property Help — Automated Content Generator
Generates daily EN + ES social media posts using Ollama (local model)
Usage:
  python generate_post.py                          # today's scheduled topic
  python generate_post.py --topic roofing          # specific topic
  python generate_post.py --weather "Flash Flood Warning in Corpus Christi through June 5"
  python generate_post.py --topic weather_alert --weather "..."
"""

import json
import datetime
import argparse
import urllib.request
import urllib.error
import os
import sys
import io

# Fix Windows console encoding for emoji
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# ── Config ──────────────────────────────────────────────────────────────────
OLLAMA_URL  = "http://localhost:11434/api/generate"
MODEL       = "llama3.1:8b"         # fast + good Spanish; available on WSL Ollama
SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
SCHEDULE    = os.path.join(SCRIPT_DIR, "schedule.json")
OUTPUT_DIR  = os.path.join(SCRIPT_DIR, "output")
# ────────────────────────────────────────────────────────────────────────────


def load_schedule():
    with open(SCHEDULE, "r", encoding="utf-8") as f:
        return json.load(f)


def get_today_topic(schedule: dict) -> dict:
    day_index = str(datetime.datetime.now().weekday())  # 0=Mon … 6=Sun
    return schedule["weekly_schedule"][day_index]


def call_ollama(prompt: str) -> str:
    payload = json.dumps({
        "model":  MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.75,
            "top_p": 0.9,
            "num_predict": 600
        }
    }).encode("utf-8")

    req = urllib.request.Request(
        OLLAMA_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            return result.get("response", "").strip()
    except urllib.error.URLError as e:
        print(f"❌ Ollama connection error: {e}")
        print("   Make sure Ollama is running:  ollama serve")
        sys.exit(1)


def build_en_prompt(topic: dict, weather: str, site: dict) -> str:
    weather_line = f"\nCurrent Texas weather context: {weather}" if weather else ""
    return f"""You are a social media content writer for Texas Property Help, a free homeowner assistance platform in Texas.

Write a Facebook post about: {topic['angle']}
Section: {topic['section']}
Keywords to naturally include: {', '.join(topic['keywords'])}{weather_line}

Rules:
- 150-250 words maximum
- Start with a hook (question or surprising fact)
- Use simple, friendly language — not legal jargon
- Include 2-3 practical tips homeowners can act on TODAY
- End with: "Get free guidance → texaspropertyhelp.com"
- Use 2-3 relevant emojis naturally placed (not at start of every line)
- Do NOT use hashtags
- Tone: helpful neighbor, not salesperson
- Content must be specific to TEXAS (mention Texas law, TDI, TDLR where relevant)

Write ONLY the post text. No title, no explanation, no quotes around it."""


def build_es_prompt(en_post: str, site: dict) -> str:
    return f"""Translate the following Facebook post from English to Spanish (Latin American Spanish, appropriate for Texas Mexican-American community).

Keep the same tone — friendly, helpful, practical. Keep "texaspropertyhelp.com" as-is. Keep any numbers and proper nouns (TDI, TDLR, ACV, RCV) as-is.

English post:
{en_post}

Write ONLY the Spanish translation. No explanation, no quotes around it."""


def save_output(data: dict) -> str:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    topic_slug = data["topic"].replace(" ", "_").replace("/", "-")
    filename = f"{date_str}_{topic_slug}.json"
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return filepath


def print_post(data: dict):
    print("\n" + "═" * 60)
    print(f"📅  {data['date']}  |  {data['day']}  |  {data['section']}")
    print("═" * 60)

    print("\n🇺🇸  ENGLISH POST\n" + "─" * 40)
    print(data["post_en"])

    print("\n🇲🇽  SPANISH POST\n" + "─" * 40)
    print(data["post_es"])

    print("\n" + "═" * 60)
    print(f"💾  Saved to: {data['saved_to']}")
    print("═" * 60 + "\n")


def main():
    global MODEL
    parser = argparse.ArgumentParser(description="Generate daily social media posts for Texas Property Help")
    parser.add_argument("--topic",   help="Override topic (storm_damage|roofing|insurance|hvac|financing|weather_alert|community_qa)")
    parser.add_argument("--weather", help="Current weather/storm alert text from DeeBot", default="")
    parser.add_argument("--model",   help="Ollama model to use (default: qwen2.5:7b)", default=MODEL)
    args = parser.parse_args()
    MODEL = args.model

    # Load schedule
    schedule = load_schedule()
    site     = schedule["site_info"]

    # Determine topic
    if args.topic:
        # Find topic by key
        topic = None
        for day_data in schedule["weekly_schedule"].values():
            if day_data["topic"] == args.topic:
                topic = day_data
                break
        if not topic:
            print(f"❌ Topic '{args.topic}' not found in schedule.json")
            print("   Valid topics:", [d["topic"] for d in schedule["weekly_schedule"].values()])
            sys.exit(1)
    else:
        topic = get_today_topic(schedule)

    now = datetime.datetime.now()
    print(f"\n🚀 Generating post for: {topic['section']} ({topic['angle'][:60]}...)")
    print(f"   Model: {MODEL}")
    if args.weather:
        print(f"   Weather context: {args.weather[:80]}...")
    print()

    # Generate EN post
    print("⏳ Generating English post...", end="", flush=True)
    en_prompt = build_en_prompt(topic, args.weather, site)
    post_en   = call_ollama(en_prompt)
    print(" ✓")

    # Generate ES post
    print("⏳ Translating to Spanish...", end="", flush=True)
    es_prompt = build_es_prompt(post_en, site)
    post_es   = call_ollama(es_prompt)
    print(" ✓")

    # Build output
    data = {
        "date":       now.strftime("%Y-%m-%d"),
        "time":       now.strftime("%H:%M"),
        "day":        topic["day"],
        "topic":      topic["topic"],
        "section":    topic["section"],
        "angle":      topic["angle"],
        "weather":    args.weather,
        "model":      MODEL,
        "post_en":    post_en,
        "post_es":    post_es,
        "char_en":    len(post_en),
        "char_es":    len(post_es),
        "ready_to_post": True
    }

    filepath     = save_output(data)
    data["saved_to"] = filepath

    print_post(data)


if __name__ == "__main__":
    main()
