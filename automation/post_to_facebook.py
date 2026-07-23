#!/usr/bin/env python3
"""
post_to_facebook.py — Publish a post to a Facebook Page via Graph API.

Requires:
  - A Facebook Page (business page, not personal profile)
  - A Page Access Token with pages_manage_posts permission
  - PAGE_ID of your Facebook Page

Setup:
  1. Create a Facebook App at developers.facebook.com (free)
  2. Add "Facebook Login for Business" product
  3. Generate a Page Access Token for your page
  4. Set PAGE_ID and PAGE_ACCESS_TOKEN below (or use env vars)

Usage:
  python post_to_facebook.py --file output/2026-06-06_storm_damage.json
  python post_to_facebook.py --file output/2026-06-06_storm_damage.json --lang es
  python post_to_facebook.py --text "Your post text here"

Environment variables (safer than hardcoding):
  FB_PAGE_ID=your_page_id
  FB_ACCESS_TOKEN=your_page_access_token
"""

import json
import os
import sys
import argparse
import urllib.request
import urllib.parse
import urllib.error
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# ── Config — read from .env.local (gitignored) or the environment ───────────
def _load_env_files():
    """Load .env.local / .env so credentials need not be exported by hand."""
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    for name in (".env.local", ".env"):
        path = os.path.join(project_root, name)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip().lstrip("\\")
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key and key not in os.environ:
                    os.environ[key] = val


_load_env_files()

PAGE_ID      = os.environ.get("FB_PAGE_ID", "")           # Your Facebook Page ID
ACCESS_TOKEN = os.environ.get("FB_ACCESS_TOKEN", "")      # Page Access Token
GRAPH_API    = "https://graph.facebook.com/v19.0"
# ─────────────────────────────────────────────────────────────────────────────


def post_to_page(text: str, page_id: str = PAGE_ID, token: str = ACCESS_TOKEN) -> dict:
    """
    Post text to a Facebook Page.
    Returns API response dict.
    """
    if not page_id or not token:
        raise ValueError(
            "FB_PAGE_ID and FB_ACCESS_TOKEN must be set.\n"
            "Run: export FB_PAGE_ID=your_id FB_ACCESS_TOKEN=your_token"
        )

    url = f"{GRAPH_API}/{page_id}/feed"
    data = urllib.parse.urlencode({
        "message":      text,
        "access_token": token,
    }).encode("utf-8")

    req = urllib.request.Request(url, data=data, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            err = json.loads(body)
            raise RuntimeError(f"Facebook API error: {err.get('error', {}).get('message', body)}")
        except json.JSONDecodeError:
            raise RuntimeError(f"Facebook API HTTP {e.code}: {body[:300]}")


def load_post_file(filepath: str, lang: str = "en") -> str:
    """Load a generated post JSON and return the text for the given language."""
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    key = f"post_{lang}"
    if key not in data:
        raise KeyError(f"Key '{key}' not found in {filepath}. Available: {list(data.keys())}")
    return data[key]


def check_credentials() -> bool:
    """Verify credentials are set."""
    if not PAGE_ID:
        print("❌ FB_PAGE_ID not set.")
        print("   Run: export FB_PAGE_ID=your_facebook_page_id")
        print("   Find it: facebook.com/your-page → About → Page ID")
        return False
    if not ACCESS_TOKEN:
        print("❌ FB_ACCESS_TOKEN not set.")
        print("   Run: export FB_ACCESS_TOKEN=your_page_access_token")
        print("   Get it: developers.facebook.com → Graph API Explorer → Generate Token")
        return False
    return True


def verify_token() -> bool:
    """Read-only check: confirm the token works and can post to the page.

    Publishes nothing. Prints the page name and whether pages_manage_posts
    is granted, so a freshly pasted token can be validated safely.
    """
    if not check_credentials():
        return False

    url = f"{GRAPH_API}/{PAGE_ID}?fields=name,id&access_token={urllib.parse.quote(ACCESS_TOKEN)}"
    try:
        with urllib.request.urlopen(url, timeout=20) as resp:
            page = json.loads(resp.read().decode("utf-8"))
        print(f"✅ Token valid — page: {page.get('name', '?')} (ID {page.get('id', '?')})")
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        print(f"❌ Token rejected by Facebook: {err[:300]}")
        return False
    except Exception as e:
        print(f"❌ Could not reach Facebook: {e}")
        return False

    perm_url = f"{GRAPH_API}/me/permissions?access_token={urllib.parse.quote(ACCESS_TOKEN)}"
    try:
        with urllib.request.urlopen(perm_url, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        granted = {p["permission"] for p in data.get("data", []) if p.get("status") == "granted"}
        if "pages_manage_posts" in granted:
            print("✅ pages_manage_posts granted — autoposting will work")
        else:
            print("⚠️  pages_manage_posts NOT granted — posting will fail")
            print(f"   Granted: {', '.join(sorted(granted)) or 'none'}")
            return False
    except Exception:
        print("ℹ️  Could not read permissions (page tokens often hide this) — try a --dry-run post")
    return True


def main():
    parser = argparse.ArgumentParser(description="Post to Facebook Page via Graph API")
    parser.add_argument("--file",    help="Path to generated post JSON file")
    parser.add_argument("--text",    help="Post text directly")
    parser.add_argument("--lang",    default="en", choices=["en", "es"], help="Language to post (en or es)")
    parser.add_argument("--dry-run", action="store_true", help="Print post text without publishing")
    parser.add_argument("--check",   action="store_true", help="Verify credentials only — publishes nothing")
    args = parser.parse_args()

    if args.check:
        sys.exit(0 if verify_token() else 1)

    if not args.file and not args.text:
        parser.print_help()
        sys.exit(1)

    # Get post text
    if args.file:
        try:
            text = load_post_file(args.file, args.lang)
        except (FileNotFoundError, KeyError) as e:
            print(f"❌ {e}")
            sys.exit(1)
    else:
        text = args.text

    print(f"\n📝 Post to publish ({args.lang.upper()}, {len(text)} chars):")
    print("─" * 50)
    print(text)
    print("─" * 50)

    if args.dry_run:
        print("\n✅ DRY RUN — not published. Remove --dry-run to post.")
        return

    if not check_credentials():
        sys.exit(1)

    print(f"\n📤 Publishing to Facebook Page {PAGE_ID}...")
    try:
        result = post_to_page(text)
        post_id = result.get("id", "unknown")
        print(f"✅ Published! Post ID: {post_id}")
        print(f"   View at: https://www.facebook.com/{post_id.replace('_', '/posts/')}")
    except RuntimeError as e:
        print(f"❌ Publish failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
