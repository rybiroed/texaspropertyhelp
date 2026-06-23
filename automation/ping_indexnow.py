#!/usr/bin/env python3
"""Submit all site URLs to Bing/Yandex via IndexNow (one-time batch ping)."""
import json, urllib.request, urllib.error

INDEXNOW_KEY = "c5c6208b3fd9d754a77fcc6e2eb54d9e"
BASE = "https://texaspropertyhelp.com"

# Load posts
import os, sys
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
with open(os.path.join(PROJECT_ROOT, "src", "data", "posts.json")) as f:
    posts = json.load(f)

urls = [
    BASE, f"{BASE}/updates", f"{BASE}/guides",
    f"{BASE}/storm-damage", f"{BASE}/roofing", f"{BASE}/hvac",
    f"{BASE}/insurance-claims", f"{BASE}/financing",
    f"{BASE}/es", f"{BASE}/es/updates", f"{BASE}/es/guides",
    f"{BASE}/es/storm-damage", f"{BASE}/es/roofing", f"{BASE}/es/hvac",
    f"{BASE}/es/insurance-claims", f"{BASE}/es/financing",
]
for p in posts:
    urls.append(f"{BASE}/updates/{p['slug']}")
    urls.append(f"{BASE}/es/updates/{p['slug']}")

print(f"Submitting {len(urls)} URLs to IndexNow (Bing/Yandex)...")

# IndexNow allows max 10,000 URLs per request
payload = json.dumps({
    "host": "texaspropertyhelp.com",
    "key": INDEXNOW_KEY,
    "keyLocation": f"{BASE}/{INDEXNOW_KEY}.txt",
    "urlList": urls,
}).encode()

req = urllib.request.Request(
    "https://api.indexnow.org/IndexNow",
    data=payload,
    headers={"Content-Type": "application/json; charset=utf-8"},
    method="POST",
)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        print(f"✅ IndexNow HTTP {resp.status} — {len(urls)} URLs submitted to Bing & Yandex")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"❌ HTTP {e.code}: {body}")
except Exception as e:
    print(f"❌ Error: {e}")
