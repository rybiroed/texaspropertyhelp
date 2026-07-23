#!/usr/bin/env python3
"""
setup_facebook.py — one-time helper to wire up Facebook autoposting.

You paste a User Access Token once; this script does the rest:
  1. Verifies the token and reports how long it lives
  2. Fetches the Pages you administer (GET /me/accounts)
  3. Lets you pick the page
  4. Writes FB_PAGE_ID + FB_ACCESS_TOKEN into .env.local (gitignored)

Why this exists: a Page token derived from a LONG-LIVED user token never
expires, while the token Graph API Explorer hands you by default dies in
1-2 hours. Getting that wrong is the usual reason autoposting silently
stops working the next day. This script checks expiry and warns you.

Usage:
  python3 automation/setup_facebook.py

The token is read from a hidden prompt — it is not passed as an argument,
so it never lands in your shell history.
"""

import getpass
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

GRAPH = "https://graph.facebook.com/v19.0"
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_FILE = os.path.join(PROJECT_ROOT, ".env.local")


def api(path: str, token: str, **params) -> dict:
    params["access_token"] = token
    url = f"{GRAPH}/{path}?{urllib.parse.urlencode(params)}"
    try:
        with urllib.request.urlopen(url, timeout=25) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        try:
            msg = json.loads(body)["error"]["message"]
        except Exception:
            msg = body[:300]
        raise RuntimeError(msg)


def describe_expiry(token: str) -> str:
    """Report token lifetime via the debug_token endpoint."""
    try:
        info = api("debug_token", token, input_token=token).get("data", {})
    except RuntimeError:
        return "unknown"
    expires = info.get("expires_at", 0)
    if expires == 0:
        return "never"
    import datetime
    left = expires - int(datetime.datetime.now().timestamp())
    hours = left / 3600
    return f"{hours:.1f} hours" if hours < 48 else f"{hours / 24:.0f} days"


def upsert_env(pairs: dict) -> None:
    """Write keys into .env.local, replacing any existing values."""
    lines = []
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, "r", encoding="utf-8") as f:
            lines = f.read().splitlines()

    for key, value in pairs.items():
        replaced = False
        for i, line in enumerate(lines):
            if line.strip().lstrip("\\").startswith(f"{key}="):
                lines[i] = f"{key}={value}"
                replaced = True
                break
        if not replaced:
            lines.append(f"{key}={value}")

    with open(ENV_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines).rstrip() + "\n")


def main():
    print("\n  Facebook autoposting setup")
    print("  " + "-" * 48)
    print("  Get a User Access Token at:")
    print("    https://developers.facebook.com/tools/explorer/")
    print("  App: TPH Autoposter | Token type: User")
    print("  Permissions: pages_show_list, pages_manage_posts, pages_read_engagement")
    print("  " + "-" * 48)

    token = getpass.getpass("\n  Paste the User Access Token (input hidden): ").strip()
    if not token:
        print("  No token entered. Nothing changed.")
        sys.exit(1)

    print("\n  Checking token...")
    try:
        me = api("me", token, fields="name")
    except RuntimeError as e:
        print(f"  Token rejected: {e}")
        sys.exit(1)
    print(f"  Token belongs to: {me.get('name', '?')}")
    print(f"  Token lifetime:   {describe_expiry(token)}")

    print("\n  Fetching your Pages...")
    try:
        accounts = api("me/accounts", token, fields="name,id,access_token").get("data", [])
    except RuntimeError as e:
        print(f"  Could not list pages: {e}")
        print("  Most likely the pages_show_list permission was not granted.")
        sys.exit(1)

    if not accounts:
        print("  No Pages found. Make sure you granted pages_show_list and")
        print("  that this account administers the Texas Property Help page.")
        sys.exit(1)

    for i, page in enumerate(accounts, 1):
        print(f"    {i}. {page.get('name')}  (ID {page.get('id')})")

    if len(accounts) == 1:
        choice = 1
        print(f"\n  Only one page — selecting it.")
    else:
        raw = input("\n  Which page? Enter the number: ").strip()
        if not raw.isdigit() or not 1 <= int(raw) <= len(accounts):
            print("  Invalid choice. Nothing changed.")
            sys.exit(1)
        choice = int(raw)

    page = accounts[choice - 1]
    page_token = page.get("access_token", "")
    if not page_token:
        print("  Facebook returned no page token — check pages_manage_posts.")
        sys.exit(1)

    life = describe_expiry(page_token)
    print(f"\n  Page: {page.get('name')}")
    print(f"  Page token lifetime: {life}")
    if life != "never":
        print("\n  WARNING: this page token will EXPIRE.")
        print("  Autoposting will break when it does. To get a permanent one,")
        print("  extend your USER token first at:")
        print("    https://developers.facebook.com/tools/debug/accesstoken")
        print("  (paste it, click 'Extend Access Token'), then re-run this script")
        print("  with the extended token.")
        if input("\n  Save this temporary token anyway? [y/N]: ").strip().lower() != "y":
            print("  Nothing changed.")
            sys.exit(1)

    upsert_env({"FB_PAGE_ID": page["id"], "FB_ACCESS_TOKEN": page_token})
    print(f"\n  Saved to {ENV_FILE} (gitignored)")
    print("\n  Verify with:")
    print("    python3 automation/post_to_facebook.py --check")
    print()


if __name__ == "__main__":
    main()
