#!/usr/bin/env python3
"""
fetch_news.py — Pull latest Texas storm/insurance news from RSS feeds.

Sources: KHOU (Houston), KSAT (San Antonio), KXAN (Austin),
         Dallas Morning News, Corpus Christi Caller-Times,
         Texas Tribune, Weather Underground Texas.

No API key needed — pure RSS.

Usage:
  python fetch_news.py                          # print top stories
  from fetch_news import get_texas_storm_news  # import as module
"""

import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
import html
import sys
import re
from datetime import datetime, timezone

# ── RSS feeds — Texas local news with storm/property damage coverage ─────────
RSS_FEEDS = [
    {
        "name": "KHOU Houston",
        "url": "https://www.khou.com/feeds/syndication/rss/news/",
        "city": "Houston",
    },
    {
        "name": "KSAT San Antonio",
        "url": "https://www.ksat.com/news/local/rss.xml",
        "city": "San Antonio",
    },
    {
        "name": "KXAN Austin",
        "url": "https://www.kxan.com/feed/",
        "city": "Austin",
    },
    {
        "name": "KVUE Austin",
        "url": "https://www.kvue.com/feeds/syndication/rss/news/",
        "city": "Austin",
    },
    {
        "name": "KRIS Corpus Christi",
        "url": "https://www.kristv.com/news/local-news/feed/",
        "city": "Corpus Christi",
    },
    {
        "name": "Texas Tribune",
        "url": "https://www.texastribune.org/feed/",
        "city": "Texas",
    },
    {
        "name": "WFAA Dallas",
        "url": "https://www.wfaa.com/feeds/syndication/rss/news/",
        "city": "Dallas",
    },
]

# ── Keywords that make a story relevant to property damage ──────────────────
STORM_KEYWORDS = [
    "hail", "hailstorm", "tornado", "hurricane", "tropical storm", "storm damage",
    "flood", "flooding", "flash flood", "roof damage", "wind damage",
    "insurance claim", "homeowner", "TWIA", "TDI", "property damage",
    "severe weather", "severe thunderstorm",
    "deductible", "roof", "contractor",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; texaspropertyhelp.com/news-bot)",
}


def clean_html(text: str) -> str:
    """Strip HTML tags and decode entities."""
    text = re.sub(r"<[^>]+>", "", text)
    return html.unescape(text).strip()


def fetch_feed(feed: dict) -> list[dict]:
    """Fetch and parse one RSS feed. Returns list of items."""
    try:
        req = urllib.request.Request(feed["url"], headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read()
        root = ET.fromstring(content)
    except Exception as e:
        print(f"  ⚠️  {feed['name']}: {e}", file=sys.stderr)
        return []

    items = []
    # Handle both RSS and Atom
    channel = root.find("channel")
    entries = channel.findall("item") if channel else root.findall(".//{http://www.w3.org/2005/Atom}entry")

    for entry in entries[:20]:  # check last 20 items per feed
        # RSS
        title_el   = entry.find("title")
        desc_el    = entry.find("description")
        link_el    = entry.find("link")
        pubdate_el = entry.find("pubDate")

        title   = clean_html(title_el.text or "") if title_el is not None else ""
        desc    = clean_html(desc_el.text or "")[:200] if desc_el is not None else ""
        link    = link_el.text or "" if link_el is not None else ""
        pubdate = pubdate_el.text or "" if pubdate_el is not None else ""

        if not title:
            continue

        items.append({
            "source": feed["name"],
            "city":   feed["city"],
            "title":  title,
            "desc":   desc,
            "link":   link,
            "date":   pubdate,
        })

    return items


def is_relevant(item: dict) -> bool:
    """Check if story is relevant to storm/property damage."""
    text = (item["title"] + " " + item["desc"]).lower()
    return any(kw.lower() in text for kw in STORM_KEYWORDS)


def get_texas_storm_news(max_results: int = 5) -> tuple[list[dict], str]:
    """
    Main entry point for importing as module.
    Returns (stories_list, formatted_string_for_llm)
    """
    all_items = []
    for feed in RSS_FEEDS:
        items = fetch_feed(feed)
        relevant = [i for i in items if is_relevant(i)]
        all_items.extend(relevant)

    # Deduplicate by title similarity
    seen_titles = set()
    unique = []
    for item in all_items:
        title_key = item["title"].lower()[:60]
        if title_key not in seen_titles:
            seen_titles.add(title_key)
            unique.append(item)

    top = unique[:max_results]

    # Format for LLM
    if not top:
        formatted = ""
    else:
        lines = []
        for s in top:
            lines.append(f"[{s['source']} / {s['city']}] {s['title']}. {s['desc']}")
        formatted = " || ".join(lines)

    return top, formatted


def print_stories(stories: list[dict]):
    if not stories:
        print("📰 No relevant Texas storm/property news found right now.")
        return
    print(f"📰 {len(stories)} relevant Texas story/stories:\n")
    for s in stories:
        print(f"  📍 {s['source']} ({s['city']})")
        print(f"     {s['title']}")
        if s["desc"]:
            print(f"     {s['desc'][:120]}...")
        print()


if __name__ == "__main__":
    print("🔍 Fetching Texas storm/property news...\n")
    stories, formatted = get_texas_storm_news()
    print_stories(stories)
    if formatted:
        print("\n📝 Formatted for LLM prompt:")
        print(formatted[:400] + "..." if len(formatted) > 400 else formatted)
