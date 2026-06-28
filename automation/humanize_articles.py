#!/usr/bin/env python3
"""
humanize_articles.py — Rewrite all existing articles to sound human, bypassing AI detectors.

Usage:
  python humanize_articles.py               # rewrite all posts
  python humanize_articles.py --slug foo    # rewrite one post by slug
  python humanize_articles.py --dry-run     # print result, don't save
"""

import json, os, sys, re, argparse, time

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
POSTS_JSON   = os.path.join(PROJECT_ROOT, "src", "data", "posts.json")
sys.path.insert(0, SCRIPT_DIR)

from generate_article import call_ollama, build_humanize_prompt, build_es_translate_prompt, estimate_read_time


def word_count(html: str) -> int:
    return len(re.sub(r"<[^>]+>", " ", html).split())


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug",    help="Rewrite only this slug")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--skip-es", action="store_true", help="Skip Spanish re-translation")
    args = parser.parse_args()

    with open(POSTS_JSON, "r", encoding="utf-8") as f:
        posts = json.load(f)

    if args.slug:
        targets = [p for p in posts if args.slug in p["slug"]]
        if not targets:
            print(f"❌ No post matching slug: {args.slug}")
            sys.exit(1)
    else:
        targets = posts

    print(f"\n🤖 Humanizing {len(targets)} article(s)...\n")

    changed = 0
    for i, post in enumerate(targets):
        slug  = post["slug"]
        city  = post.get("city")
        title = post["title"]
        html  = post.get("contentHtml", "")

        if not html:
            print(f"[{i+1}/{len(targets)}] SKIP (no content): {slug[:55]}")
            continue

        print(f"[{i+1}/{len(targets)}] {title[:60]}")
        print(f"   Words before: {word_count(html)}")

        # ── Humanize EN
        try:
            new_html = call_ollama(build_humanize_prompt(html, city), max_tokens=3500)
        except Exception as e:
            print(f"   ❌ Ollama error: {e} — skipping")
            continue

        if not new_html.strip().startswith("<"):
            new_html = "<p>" + new_html
        print(f"   Words after:  {word_count(new_html)} | {estimate_read_time(new_html)}")

        # ── Re-translate ES (unless skipped)
        new_html_es = post.get("contentHtmlEs", "")
        if not args.skip_es:
            try:
                new_html_es = call_ollama(build_es_translate_prompt(new_html), max_tokens=4000)
                print(f"   ES translated: {len(new_html_es)} chars")
            except Exception as e:
                print(f"   ⚠️ ES translation failed: {e} — keeping old ES")

        if args.dry_run:
            print("   [DRY RUN] Not saved.")
            print("   --- Preview (first 600 chars) ---")
            print(new_html[:600])
            print()
            continue

        # Update post in place
        idx = next(j for j, p in enumerate(posts) if p["slug"] == slug)
        posts[idx]["contentHtml"]   = new_html
        posts[idx]["contentHtmlEs"] = new_html_es
        posts[idx]["readTime"]      = estimate_read_time(new_html)
        changed += 1

        # Save after each article so progress isn't lost on crash
        with open(POSTS_JSON, "w", encoding="utf-8") as f:
            json.dump(posts, f, ensure_ascii=False, indent=2)
        print(f"   ✅ Saved ({changed} updated so far)\n")

        # Small pause between Ollama calls to avoid overheating
        if i < len(targets) - 1:
            time.sleep(2)

    print(f"\n✅ Done — {changed} article(s) humanized.")
    if changed > 0 and not args.dry_run:
        print("   → Commit posts.json and push to deploy:\n")
        print("   git add src/data/posts.json && git commit -m 'humanize all articles' && git push")


if __name__ == "__main__":
    main()
