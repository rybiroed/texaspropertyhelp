#!/usr/bin/env python3
"""Backfill missing images for posts that have imageUrl = ''"""
import json, os, sys, urllib.request, urllib.parse, shutil

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
POSTS_JSON   = os.path.join(PROJECT_ROOT, "src", "data", "posts.json")
OLLAMA_URL   = "http://localhost:11434/api/generate"
MODEL        = "llama3.1:8b"
OUT_DIR      = os.path.join(PROJECT_ROOT, "public", "images", "posts")

CATEGORY_PROMPTS = {
    "roofing": "professional roofers replacing shingles on Texas suburban house, sunny day, 8k photorealistic, wide shot",
    "storm-damage": "Texas house with hail storm damage on roof, dramatic sky clearing, insurance inspection, documentary photo",
    "hvac": "HVAC technician servicing air conditioner outside Texas home, summer heat, professional uniform, photorealistic",
    "insurance-claims": "Texas homeowner reviewing insurance papers at table, serious focus, bright kitchen, lifestyle photography",
    "financing": "Texas homeowner signing home improvement loan documents, banker helping, professional office, photorealistic",
    "weather": "severe thunderstorm approaching Texas suburb, dark clouds, lightning distant, dramatic wide angle photo",
}

def ollama_prompt(title, category, city):
    base = CATEGORY_PROMPTS.get(category, CATEGORY_PROMPTS["storm-damage"])
    city_ctx = f"{city}, Texas" if city else "Texas"
    system = "You are a professional photographer. Write ONE photorealistic image prompt for an AI image generator, max 2 sentences. Output ONLY the prompt, no preamble, no quotes."
    user = f"Article: \"{title}\" in {city_ctx}. Category: {category}. Style hint: {base}. Write the image prompt now."
    payload = json.dumps({
        "model": MODEL,
        "prompt": f"{system}\n\n{user}\n\nPhotographic prompt:",
        "stream": False,
        "options": {"temperature": 0.7, "num_predict": 100},
    }).encode()
    try:
        req = urllib.request.Request(OLLAMA_URL, data=payload, headers={"Content-Type": "application/json"}, method="POST")
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read())
            prompt = result.get("response", "").strip().strip('"').strip("'")
            for prefix in ["Here is the photorealistic image prompt:", "Here is the image prompt:", "Prompt:", "Image prompt:"]:
                if prompt.lower().startswith(prefix.lower()):
                    prompt = prompt[len(prefix):].strip()
            if len(prompt) > 20:
                return prompt
    except Exception as e:
        print(f"   Ollama failed: {e}")
    city_prefix = f"{city}, Texas, " if city else "Texas, "
    return city_prefix + CATEGORY_PROMPTS.get(category, CATEGORY_PROMPTS["storm-damage"])

def fetch_image(slug, prompt):
    os.makedirs(OUT_DIR, exist_ok=True)
    local_path = os.path.join(OUT_DIR, f"{slug}.jpg")
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?model=flux&width=1440&height=600&nologo=true&seed={abs(hash(slug)) % 99999}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as resp, open(local_path, "wb") as f:
            shutil.copyfileobj(resp, f)
        size_kb = os.path.getsize(local_path) // 1024
        if size_kb < 5:
            os.remove(local_path)
            return ""
        print(f"   Saved: {slug}.jpg ({size_kb}KB)")
        return f"/images/posts/{slug}.jpg"
    except Exception as e:
        print(f"   Fetch failed: {e}")
        return ""

with open(POSTS_JSON) as f:
    posts = json.load(f)

missing = [p for p in posts if not p.get("imageUrl")]
print(f"Posts missing images: {len(missing)}")

changed = 0
for p in missing:
    slug = p["slug"]
    title = p.get("title", slug)
    category = p.get("category", "storm-damage")
    city = p.get("city", "")
    print(f"\nGenerating: {slug[:70]}")
    print(f"   Asking Ollama for prompt...")
    prompt = ollama_prompt(title, category, city)
    print(f"   Prompt: {prompt[:100]}...")
    image_url = fetch_image(slug, prompt)
    if image_url:
        p["imageUrl"] = image_url
        changed += 1

if changed:
    with open(POSTS_JSON, "w") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
    print(f"\nUpdated {changed} posts with images")
else:
    print("\nNo changes made")
