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
import argparse
import datetime
import urllib.request
import urllib.error
import unicodedata

# Fix encoding without re-wrapping (reconfigure avoids double-close crash)
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# Optional image generation (requires ComfyUI running)
try:
    from generate_image import generate_article_image
    IMAGE_GEN_AVAILABLE = True
except ImportError:
    IMAGE_GEN_AVAILABLE = False

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
# ── Pollinations.ai image prompts per category ───────────────────────────────
POLLINATIONS_PROMPTS = {
    "roofing": "professional roofers replacing shingles on Texas suburban house, sunny day, 8k photorealistic, wide shot",
    "storm-damage": "Texas house with hail storm damage on roof, dramatic sky clearing, insurance inspection, documentary photo",
    "hvac": "HVAC technician servicing air conditioner outside Texas home, summer heat, professional uniform, photorealistic",
    "insurance-claims": "Texas homeowner reviewing insurance papers at table, serious focus, bright kitchen, lifestyle photography",
    "financing": "Texas homeowner signing home improvement loan documents, banker helping, professional office, photorealistic",
    "weather": "severe thunderstorm approaching Texas suburb, dark clouds, lightning distant, dramatic wide angle photo",
}

def generate_image_prompt_via_ollama(title: str, category: str, city: str = None) -> str:
    """Use local Ollama model to create a detailed, article-specific image prompt."""
    import json as _json
    city_ctx = f"{city}, Texas" if city else "Texas"
    base_style = POLLINATIONS_PROMPTS.get(category, POLLINATIONS_PROMPTS["storm-damage"])
    system_msg = (
        "You are a professional photographer. Write ONE photorealistic image prompt "
        "for an AI image generator, max 2 sentences. Output ONLY the prompt, no preamble, no quotes."
    )
    user_msg = (
        f"Article: \"{title}\" in {city_ctx}. "
        f"Category: {category}. Style hint: {base_style}. "
        f"Write the image prompt now."
    )
    payload = _json.dumps({
        "model": MODEL,
        "prompt": f"{system_msg}\n\n{user_msg}\n\nPhotographic prompt:",
        "stream": False,
        "options": {"temperature": 0.7, "num_predict": 100},
    }).encode()
    try:
        req = urllib.request.Request(
            OLLAMA_URL,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = _json.loads(resp.read())
            prompt = result.get("response", "").strip()
            # Strip any preamble like "Here is the prompt:" or quotes
            for prefix in ["Here is the photorealistic image prompt:", "Here is the image prompt:", "Prompt:", "Image prompt:"]:
                if prompt.lower().startswith(prefix.lower()):
                    prompt = prompt[len(prefix):].strip()
            prompt = prompt.strip('"').strip("'").strip()
            if prompt and len(prompt) > 20:
                print(f"   Ollama image prompt: {prompt[:120]}...")
                return prompt
    except Exception as e:
        print(f"   Ollama prompt generation failed: {e} — using default")
    # Fallback to static category prompt with city context
    city_prefix = f"{city}, Texas, " if city else "Texas, "
    return city_prefix + POLLINATIONS_PROMPTS.get(category, POLLINATIONS_PROMPTS["storm-damage"])


def generate_image(slug: str, title: str, category: str, city: str = None) -> str:
    """Generate hero image: Ollama writes the prompt, Pollinations renders it."""
    import urllib.parse, shutil
    print(f"\n🎨 Generating hero image via internal model (Ollama → Pollinations)...")
    prompt = generate_image_prompt_via_ollama(title=title, category=category, city=city)
    encoded = urllib.parse.quote(prompt)
    url = (
        f"https://image.pollinations.ai/prompt/{encoded}"
        f"?model=flux&width=1440&height=600&nologo=true&seed={abs(hash(slug)) % 99999}"
    )
    out_dir = os.path.join(PROJECT_ROOT, "public", "images", "posts")
    os.makedirs(out_dir, exist_ok=True)
    local_path = os.path.join(out_dir, f"{slug}.jpg")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as resp, open(local_path, "wb") as f:
            shutil.copyfileobj(resp, f)
        size_kb = os.path.getsize(local_path) // 1024
        if size_kb < 5:
            print(f"   Image too small ({size_kb}KB) — skipping")
            os.remove(local_path)
            return ""
        print(f"   Image saved: {slug}.jpg ({size_kb}KB)")
        return f"/images/posts/{slug}.jpg"
    except Exception as e:
        print(f"   Image generation failed: {e}")
        return ""



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
    city_ref = city if city else "Texas"
    ctx_parts = []
    if weather_ctx:
        ctx_parts.append(f"Active NWS alerts: {weather_ctx[:300]}")
    if news_ctx:
        ctx_parts.append(f"Recent Texas news: {news_ctx[:300]}")
    ctx_block = ("\n\nLive context (weave in naturally if relevant):\n" + "\n".join(ctx_parts)) if ctx_parts else ""

    # Rotate structure so every article has a different format
    variant = datetime.datetime.now().timetuple().tm_yday % 3

    if variant == 0:
        structure = f"""Use this article structure:
<h2>Subtitle — state the main problem or mistake homeowners make</h2>
<p>Opening: Describe a specific scenario a {city_ref} homeowner is dealing with. Use second person ("you") or describe a real situation. Do NOT start with "As a homeowner in {city_ref}..." Give a surprising or little-known fact in sentence 2. 3-4 sentences.</p>

<h3>Why this keeps happening — and what it costs you</h3>
<p>Explain the root cause with Texas-specific context. Reference a specific Texas law, insurer behavior, or climate fact. 3-4 sentences.</p>
<p>Follow-up paragraph with a concrete number or timeframe: e.g., "In Texas, you have exactly 2 years from the storm date to file a claim..." or "State Farm and Allstate handle depreciation very differently..." 2-3 sentences.</p>

<h3>What the insurance company doesn't volunteer</h3>
<p>A key insight or lesser-known fact that costs homeowners money when they don't know it. 2-3 sentences.</p>
<ul><li>Specific actionable tip 1 with detail</li><li>Specific actionable tip 2 with detail</li><li>Specific actionable tip 3 with detail</li><li>Specific actionable tip 4 with detail</li></ul>

<h3>Exactly what to do — step by step</h3>
<ol><li>First action — specific about who to contact or what to look for</li><li>Second action — name a specific resource (license.tdlr.texas.gov, tdi.texas.gov, storms.noaa.gov)</li><li>Third action — documentation or evidence to gather</li><li>Fourth action — what to do if the first steps don't work</li></ol>

<h3>Mistakes that kill {city_ref} claims</h3>
<p>Describe 2-3 specific mistakes homeowners make — written as flowing text, not a list. Be concrete about why each one matters and what it costs. 4-5 sentences.</p>

<p>Closing paragraph: What a homeowner who follows these steps can realistically expect as an outcome. Honest — no hype, no promises. Do NOT write "Bottom line:" — just write a natural closing paragraph. 2-3 sentences.</p>"""

    elif variant == 1:
        structure = f"""Use this article structure:
<h2>Subtitle — frame it as a question or a surprising fact about Texas</h2>
<p>Opening: Lead with a counterintuitive fact or a number that will surprise a {city_ref} homeowner. Do NOT start with "As a homeowner..." Give the reader a reason to keep reading in the first sentence. 2-3 sentences.</p>

<h3>The Texas difference: why this state has unique rules</h3>
<p>Explain what makes Texas law, climate, or insurance market create this specific challenge. Be specific — cite the Texas Insurance Code, TDI regulations, or actual climate data for {city_ref} or the surrounding region. 3-4 sentences.</p>
<p>Second paragraph: what changed recently (new policy exclusions, carrier exits, updated building codes). Give a year or timeframe. 2-3 sentences.</p>

<h3>What you're actually owed — the real numbers</h3>
<p>Break down the realistic dollar amounts. Not vague — give a specific range: "A typical {city_ref} homeowner on a 1,800 sq ft house insured at $320k faces a 1% hail deductible, meaning $3,200 out of pocket before insurance pays anything." 3-4 sentences.</p>

<h3>How to get the most from your claim or contractor</h3>
<p>Practical steps — 2-sentence intro, then a list:</p>
<ul><li>Step or tip with specific detail and why it matters</li><li>Step or tip with specific detail</li><li>Step or tip referencing a Texas-specific resource</li><li>Step or tip about documentation or timing</li></ul>

<h3>Red flags: when the contractor or insurer is acting in bad faith</h3>
<p>3-4 specific warning signs with examples of exact language a bad actor uses. E.g., "If a contractor says 'we'll cover your deductible,' that's insurance fraud under Texas Insurance Code 27.02 — walk away." 4-5 sentences.</p>

<p>Closing: One concrete action the reader should take this week — specific to their situation in {city_ref}. Do NOT write "Bottom line:" — end naturally. 2 sentences.</p>"""

    else:
        structure = f"""Use this article structure:
<h2>Subtitle — state a specific benefit or action, not a vague topic</h2>
<p>Opening: Ask the reader a direct question about their exact situation, then immediately answer it. 3 sentences max. Do NOT start with "As a homeowner in {city_ref}..."</p>

<h3>What you're actually dealing with (and why Texas makes it harder)</h3>
<p>Define the core issue in plain English — no jargon without explanation. Explain what makes this different in Texas versus other states. 3-4 sentences.</p>
<p>Second paragraph: the financial stakes. Give real numbers for {city_ref} or this region of Texas. 2-3 sentences.</p>

<h3>The numbers: what to expect in {city_ref}</h3>
<p>Specific dollar figures, timeframes, or percentages that are realistic for this market. Example: "Roofing contractors in the {city_ref} area charged $380-560 per square for architectural shingle replacement in 2025 — a 22% increase from 2022 driven by material costs and demand after back-to-back hail seasons." 3-4 sentences.</p>
<p>What drives these numbers and what homeowners can push back on. 2-3 sentences.</p>

<h3>How to verify who you're working with</h3>
<p>Specific steps to verify a contractor or adjuster — name exact resources: license.tdlr.texas.gov, tdi.texas.gov, the NRCA, Haag Engineering. 3-4 sentences.</p>
<ul><li>Verification step 1 — specific tool or website to use</li><li>Verification step 2 — what to look for in the result</li><li>Verification step 3 — what to do if they don't pass</li></ul>

<h3>Your Texas rights if things go wrong</h3>
<p>Specific legal protections: Texas prompt payment law (15/15/15 rule), appraisal clause, TDI complaint process, bad faith statute penalties. Give the actual numbers and timeframes. 4-5 sentences.</p>

<p>Closing paragraph: Realistic expectation for a homeowner who takes these steps. How long does this usually take? What should they expect? Do NOT write "Bottom line:" — end with a natural, encouraging paragraph. 2-3 sentences.</p>"""

    return f"""You are an expert homeowner advocate writing for Texas Property Help — a free homeowner assistance site in Texas.

Write a detailed, genuinely useful article for Texas homeowners. Output ONLY valid HTML (no markdown, no code block fences, no text before or after the HTML).

Topic: {topic['angle']}
Section: {topic['section']}
{city_line}
Keywords to include naturally: {', '.join(topic['keywords'])}{ctx_block}

{structure}

STRICT writing rules — violating these makes the article unusable:
1. Target 1200-1600 words of actual content
2. NEVER start any paragraph with "As a homeowner in {city_ref}, Texas, you're no stranger to..."
3. NEVER end the article with "Bottom line:" — close with a natural paragraph
4. NEVER write vague statistics: "studies show..." or "many homeowners..." — always give a specific number, source, or example
5. EVERY section must have at least one Texas-specific detail: a law number, an insurer name, a city/county, a dollar amount, or a specific timeframe
6. Vary sentence length — mix short punchy sentences (5-8 words) with longer explanatory ones (20-30 words)
7. No corporate buzzwords: avoid "navigating," "solutions," "leverage," "seamless" — write like a knowledgeable neighbor
8. Do NOT mention texaspropertyhelp.com in the article body
9. HTML must be valid — every <ul> or <ol> must have proper <li> tags, every opened tag must be closed
10. Write ALL sections completely — do not stop mid-section or mid-sentence
11. Output ONLY the HTML fragment. Nothing before <h2>, nothing after the last </p>."""


def build_article_expand_prompt(part1_html: str, topic: dict, city: str | None) -> str:
    city_ref = city if city else "Texas"
    # Extract H3 headings already written to avoid repetition
    written_sections = re.findall(r"<h3>(.*?)</h3>", part1_html)
    written_list = ", ".join(f'"{s}"' for s in written_sections) if written_sections else "none yet"
    # Get last paragraph to help continuation
    last_para = part1_html[-500:] if len(part1_html) > 500 else part1_html

    return f"""You are expanding a Texas homeowner article for Texas Property Help. The article already has these sections: {written_list}.

Add 2-3 NEW sections with additional practical depth. Output ONLY valid HTML. Do NOT repeat any section already written.

Topic: {topic['angle']} — {city_ref}, Texas

Sections already written (DO NOT repeat these headings):
{written_list}

The article so far ends with:
...{last_para}

Now continue with 2-3 NEW <h3> sections that add more practical value. Good additional sections include:
- How to read your Explanation of Loss document
- When to hire a public adjuster vs. an attorney in Texas
- Texas-specific resources and phone numbers (TDI, TDLR, TWIA)
- What happens during an appraisal process
- Realistic timelines: how long claims actually take in Texas
- City-specific contractor red flags or local context for {city_ref}

Rules:
- Each new section: 1-2 paragraphs of 3-4 sentences each, or a list
- Include at least one specific dollar amount, law, or resource per section
- Do NOT start with "As a homeowner in {city_ref}..."
- Do NOT use "Bottom line:" anywhere
- End with a natural closing <p> paragraph (no section heading needed)
- Output ONLY the HTML fragment starting with <h3>. No preamble, no explanation."""


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


def build_humanize_prompt(html: str, city: str | None) -> str:
    city_ref = city if city else "Texas"
    return f"""Rewrite this HTML article so it reads like it was written by a real person — a Texas homeowner advocate with 10+ years of experience helping people navigate insurance claims and storm repairs.

The current draft is too polished and formulaic. Rewrite it to sound genuinely human.

PERSONA: You are writing in the voice of someone who has personally helped hundreds of Texas homeowners. You've sat across from adjusters, argued over scope-of-loss documents, and watched people get shortchanged. You're direct, occasionally blunt, and you actually care.

TECHNIQUES to use (apply all of them):
1. Contractions everywhere: "don't", "won't", "you'll", "they're", "it's", "there's", "that's"
2. Vary sentence length DRAMATICALLY. Mix 4-word sentences with 25-word ones. Back to back.
3. Start some sentences with "And", "But", "Look,", "Here's the thing —", "Honestly,", "The truth is,"
4. Add ONE brief personal observation per section: "I've seen this happen...", "In my experience...", "The homeowners who get the best outcomes..."
5. Use casual Texas phrasing: "worth knowing", "real quick", "heads up", "the short version is"
6. Break up long paragraphs — a paragraph can be 1-2 sentences if the point is made
7. Ask the reader a direct question in at least one section
8. Use em dashes for asides — like this — instead of parentheses
9. Occasionally acknowledge complexity: "It's more nuanced than that, but...", "Every situation is different, but generally..."
10. Remove ALL of these AI tells if present:
    - "It's important to note that"
    - "It's worth mentioning"
    - "In conclusion" / "To summarize"
    - "Additionally," starting a paragraph
    - "Furthermore,"
    - "navigating" as a buzzword
    - Three-part parallel lists that all start the same way
    - Any sentence starting with "This means that"

HTML to rewrite:
{html}

Rules:
- Keep ALL HTML tags exactly as they are (<h2>, <h3>, <p>, <ul>, <li>, <ol>, <strong>, etc.)
- Keep all facts, numbers, laws, and specific details — just change the VOICE
- Keep the same structure and sections
- Do NOT add texaspropertyhelp.com mentions
- Target: someone who reads this should think "this was written by a real person who knows their stuff"
- Output ONLY the rewritten HTML. No explanation, no preamble."""


def build_es_translate_prompt(en_html: str) -> str:
    return f"""Translate this HTML article from English to Spanish (Latin American Spanish for Texas Mexican-American readers).

Rules:
- Preserve ALL HTML tags exactly as-is
- Keep proper nouns: TDI, TDLR, TWIA, NFIP, ACV, RCV, BBB, SOS
- Keep URLs, dollar amounts, percentages as-is
- Keep city/county names in English
- Translate naturally — not word-for-word
- Same warm, helpful tone as original

CRITICAL terminology (use these translations ONLY — wrong terms disqualify the translation):
- "hail" = "granizo" (NEVER "hielo" which means ice/frost)
- "hail storm" = "tormenta de granizo"
- "deductible" = "deducible" (NEVER "prima" or "franco")
- "claim" = "reclamo" or "reclamación" (NEVER "queja")
- "insurance adjuster" = "ajustador de seguros"
- "roof" = "techo" (general) or "tejado" (tile roof)
- "coverage" = "cobertura"
- "homeowner" = "propietario" or "dueño de casa"
- "contractor" = "contratista"
- "licensed" = "con licencia" or "licenciado"
- "storm damage" = "daños por tormenta"
- "wind damage" = "daños por viento"
- "wear and tear" = "desgaste normal" or "deterioro por uso"
- "replacement cost" = "costo de reemplazo"
- "actual cash value" = "valor en efectivo real"
- "appraisal clause" = "cláusula de tasación"

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
    print("\n🤖 Generating EN article (pass 1/2)...")
    part1 = call_ollama(build_article_prompt(topic, city, weather_ctx, news_ctx), max_tokens=2200)
    if not part1.startswith("<"):
        part1 = "<p>" + part1

    print(f"   Pass 1: {len(part1)} chars | ~{estimate_read_time(part1)}")

    print("🤖 Generating EN article (pass 2/2 — expanding)...")
    part2 = call_ollama(build_article_expand_prompt(part1, topic, city), max_tokens=2000)
    # Strip any intro text that duplicates part1 headers
    if part2.startswith("<h2>"):
        # Model repeated the title — skip to first non-duplicate section
        part2_lines = part2.split("\n")
        skip = 0
        for i, line in enumerate(part2_lines):
            if line.startswith("<h3>") and line not in part1:
                skip = i
                break
        part2 = "\n".join(part2_lines[skip:])
    # Remove duplicate closing </p> if part1 already ends with one
    content_html = part1.rstrip() + "\n\n" + part2.lstrip()
    print(f"   Pass 2: {len(part2)} chars")
    print(f"   Total: {len(content_html)} chars | ~{estimate_read_time(content_html)}")

    print("🤖 Humanizing (anti-AI-detection pass)...")
    content_html = call_ollama(build_humanize_prompt(content_html, city), max_tokens=3500)
    if not content_html.startswith("<"):
        content_html = "<p>" + content_html
    print(f"   Humanized: {len(content_html)} chars | ~{estimate_read_time(content_html)}")

    print("🤖 Translating to Spanish...")
    content_html_es = call_ollama(build_es_translate_prompt(content_html), max_tokens=4000)
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

    # ── Generate image (Ollama prompt → Pollinations render)
    image_url = None
    if not args.no_image and not args.dry_run:
        image_url = generate_image(slug=slug, title=title_en, category=category, city=city)
    elif args.no_image:
        print("\n⏭️  Image generation skipped (--no-image)")

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
        # Ping IndexNow so Bing/Yandex index the new article immediately
        _ping_indexnow(slug)

    return post_entry, slug


def _ping_indexnow(slug: str) -> None:
    """Notify Bing/Yandex of new article via IndexNow protocol."""
    INDEXNOW_KEY = "c5c6208b3fd9d754a77fcc6e2eb54d9e"
    urls = [
        f"https://texaspropertyhelp.com/updates/{slug}",
        f"https://texaspropertyhelp.com/es/updates/{slug}",
        f"https://texaspropertyhelp.com/updates",
    ]
    payload = json.dumps({
        "host": "texaspropertyhelp.com",
        "key": INDEXNOW_KEY,
        "keyLocation": f"https://texaspropertyhelp.com/{INDEXNOW_KEY}.txt",
        "urlList": urls,
    }).encode()
    try:
        req = urllib.request.Request(
            "https://api.indexnow.org/IndexNow",
            data=payload,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            print(f"   IndexNow ping: HTTP {resp.status} — Bing notified of {len(urls)} URLs")
    except Exception as e:
        print(f"   IndexNow ping failed (non-critical): {e}")


if __name__ == "__main__":
    entry, slug = main()
