#!/usr/bin/env python3
"""
fetch_weather.py — Pull live NWS weather alerts for Texas.

Uses the free api.weather.gov (no API key needed).
Returns a formatted string summarizing active alerts for Texas cities
that are relevant to texaspropertyhelp.com (hail, tornado, hurricane, flood).

Usage:
  python fetch_weather.py             # print current alerts
  from fetch_weather import get_texas_alerts   # import as module
"""

import urllib.request
import urllib.error
import json
import sys

NWS_URL = "https://api.weather.gov/alerts/active?area=TX"

# Severity/event types we care about for property damage content
RELEVANT_EVENTS = {
    "Tornado Warning", "Tornado Watch",
    "Severe Thunderstorm Warning", "Severe Thunderstorm Watch",
    "Flash Flood Warning", "Flash Flood Watch", "Flash Flood Statement",
    "Hurricane Warning", "Hurricane Watch",
    "Tropical Storm Warning", "Tropical Storm Watch",
    "High Wind Warning", "High Wind Watch",
    "Winter Storm Warning", "Winter Storm Watch",
    "Ice Storm Warning",
    "Hail Warning",
    "Hurricane Local Statement",
}

# Texas cities we focus on (highest priority first)
TARGET_AREAS = [
    "Houston", "Harris", "Dallas", "DFW", "Tarrant", "San Antonio", "Bexar",
    "Austin", "Travis", "Fort Worth", "Corpus Christi", "Nueces",
    "Galveston", "Brazoria", "Jefferson", "El Paso", "Lubbock",
    "Amarillo", "Potter", "Laredo", "Webb", "Waco", "McLennan",
    "McAllen", "Hidalgo", "Cameron", "Aransas", "Matagorda",
    "San Patricio", "Willacy", "Kenedy", "Kleberg", "Refugio",
    "Calhoun", "Chambers",
]

HEADERS = {
    "User-Agent": "(texaspropertyhelp.com, contact@texaspropertyhelp.com)",
    "Accept": "application/geo+json",
}


def fetch_alerts_raw() -> list[dict]:
    """Fetch all active TX alerts from NWS API."""
    req = urllib.request.Request(NWS_URL, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("features", [])
    except urllib.error.URLError as e:
        print(f"⚠️  NWS API error: {e}", file=sys.stderr)
        return []


def filter_relevant(features: list[dict]) -> list[dict]:
    """Keep only alerts relevant to property damage and our target areas."""
    results = []
    for feature in features:
        props = feature.get("properties", {})
        event = props.get("event", "")
        if event not in RELEVANT_EVENTS:
            continue
        area_desc = props.get("areaDesc", "")
        # Check if any target city/county is mentioned
        hit = any(area.lower() in area_desc.lower() for area in TARGET_AREAS)
        if hit:
            results.append({
                "event": event,
                "severity": props.get("severity", "Unknown"),
                "urgency": props.get("urgency", "Unknown"),
                "headline": props.get("headline", ""),
                "description": (props.get("description", "")[:300] + "...") if len(props.get("description", "")) > 300 else props.get("description", ""),
                "area": area_desc,
                "sent": props.get("sent", ""),
                "expires": props.get("expires", ""),
            })
    return results


def format_for_post(alerts: list[dict]) -> str:
    """Format alerts into a concise string for LLM weather context."""
    if not alerts:
        return ""

    lines = []
    for a in alerts[:5]:  # max 5 alerts
        lines.append(
            f"{a['event']} — {a['area'][:120]}. {a['headline']}"
        )

    return " | ".join(lines)


def get_texas_alerts() -> tuple[list[dict], str]:
    """
    Main entry point for importing as module.
    Returns (alerts_list, formatted_string_for_llm)
    """
    raw = fetch_alerts_raw()
    alerts = filter_relevant(raw)
    formatted = format_for_post(alerts)
    return alerts, formatted


def summarize_alerts(alerts: list[dict]) -> str:
    """Human-readable summary for terminal output."""
    if not alerts:
        return "✅ No relevant active weather alerts for Texas right now."

    lines = [f"⚠️  {len(alerts)} active alert(s) for Texas:\n"]
    for a in alerts:
        lines.append(f"  🔴 {a['event']}")
        lines.append(f"     Area: {a['area'][:100]}")
        lines.append(f"     {a['headline']}")
        lines.append("")
    return "\n".join(lines)


if __name__ == "__main__":
    print("🔍 Fetching live NWS weather alerts for Texas...\n")
    alerts, formatted = get_texas_alerts()
    print(summarize_alerts(alerts))

    if formatted:
        print("\n📝 Formatted for LLM prompt:")
        print(formatted)
