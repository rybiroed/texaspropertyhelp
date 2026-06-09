#!/usr/bin/env python3
"""
generate_image.py — Generate article hero images using ComfyUI + RealVisXL V5.

ComfyUI must be running: bash /home/rybiroed/start-comfyui-py312.sh
Default port: 8188 on 127.0.0.1

Usage:
  python generate_image.py --slug "2026-06-07-houston-roofing" --topic roofing --city Houston
  python generate_image.py --prompt "custom prompt here" --slug "my-slug"
  from generate_image import generate_article_image  # module import
"""

import json
import os
import sys
import time
import shutil
import argparse
import urllib.request
import urllib.error

# Fix encoding without re-wrapping
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

COMFYUI_HOST  = "127.0.0.1"
COMFYUI_PORT  = 8188
COMFYUI_URL   = f"http://{COMFYUI_HOST}:{COMFYUI_PORT}"

SCRIPT_DIR    = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT  = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR    = os.path.join(PROJECT_ROOT, "public", "images", "posts")
COMFYUI_OUT   = f"/home/rybiroed/comfyui-py312/output"  # ComfyUI saves images here

# ── Prompt templates per topic ────────────────────────────────────────────────
TOPIC_PROMPTS = {
    "roofing": (
        "Professional roofers replacing roof shingles on a Texas suburban home, "
        "{city_context}sunny day, construction crew working safely, "
        "real estate photography, 8K photorealistic, RAW photo, professional DSLR, "
        "wide 16:9, sharp focus, blue sky"
    ),
    "storm-damage": (
        "Texas suburban house with hail storm damage, damaged roof shingles, "
        "{city_context}storm clouds clearing, insurance adjuster inspecting, "
        "documentary photography, 8K photorealistic, RAW photo, wide 16:9"
    ),
    "hvac": (
        "HVAC technician servicing air conditioning unit outside Texas home, "
        "{city_context}summer heat, professional uniform, tools, "
        "real estate photography, 8K photorealistic, RAW photo, wide 16:9"
    ),
    "insurance-claims": (
        "Texas homeowner reviewing insurance documents at kitchen table, "
        "{city_context}insurance forms and calculator, serious focus, "
        "professional lifestyle photography, 8K photorealistic, RAW photo, wide 16:9"
    ),
    "financing": (
        "Texas homeowner shaking hands with contractor, new roof in background, "
        "{city_context}sunny day, professional agreement, "
        "real estate photography, 8K photorealistic, RAW photo, wide 16:9"
    ),
    "weather": (
        "Severe storm approaching Texas suburban neighborhood, dark dramatic storm clouds, "
        "{city_context}Texas landscape, weather warning atmosphere, "
        "documentary photography, 8K photorealistic, RAW photo, wide 16:9"
    ),
    "storm_damage": (
        "Texas house roof with visible hail damage, dents on shingles and gutters, "
        "{city_context}blue sky after storm, close-up damage details, "
        "documentary photography, 8K photorealistic, RAW photo, wide 16:9"
    ),
}

NEGATIVE_PROMPT = (
    "blurry, low quality, ugly, distorted, cartoon, painting, watermark, "
    "text, CGI, render, deformed, bad anatomy, people falling, violence, "
    "unrealistic, fake, photoshop artifacts"
)

# ── ComfyUI API prompt (API format, not workflow format) ──────────────────────
def build_api_prompt(positive: str, filename_prefix: str) -> dict:
    """Build ComfyUI API-format prompt using the RealVis workflow node structure."""
    return {
        "prompt": {
            "1": {
                "class_type": "CheckpointLoaderSimple",
                "inputs": {
                    "ckpt_name": "RealVisXL_V5.0_fp16.safetensors"
                }
            },
            "2": {
                "class_type": "CLIPTextEncode",
                "inputs": {
                    "text": positive,
                    "clip": ["1", 1]
                }
            },
            "3": {
                "class_type": "CLIPTextEncode",
                "inputs": {
                    "text": NEGATIVE_PROMPT,
                    "clip": ["1", 1]
                }
            },
            "4": {
                "class_type": "EmptyLatentImage",
                "inputs": {
                    "width": 1360,
                    "height": 768,
                    "batch_size": 1
                }
            },
            "5": {
                "class_type": "KSampler",
                "inputs": {
                    "model": ["1", 0],
                    "positive": ["2", 0],
                    "negative": ["3", 0],
                    "latent_image": ["4", 0],
                    "seed": int(time.time()) % 2**32,
                    "steps": 30,
                    "cfg": 7.0,
                    "sampler_name": "dpmpp_2m",
                    "scheduler": "karras",
                    "denoise": 1.0
                }
            },
            "6": {
                "class_type": "VAEDecode",
                "inputs": {
                    "samples": ["5", 0],
                    "vae": ["1", 2]
                }
            },
            "7": {
                "class_type": "SaveImage",
                "inputs": {
                    "images": ["6", 0],
                    "filename_prefix": filename_prefix
                }
            }
        }
    }


def is_comfyui_running() -> bool:
    try:
        req = urllib.request.Request(f"{COMFYUI_URL}/queue")
        with urllib.request.urlopen(req, timeout=5):
            return True
    except Exception:
        return False


def queue_prompt(api_payload: dict) -> str | None:
    """Send prompt to ComfyUI. Returns prompt_id or None."""
    data = json.dumps(api_payload).encode("utf-8")
    req  = urllib.request.Request(
        f"{COMFYUI_URL}/prompt",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            return result.get("prompt_id")
    except Exception as e:
        print(f"❌ ComfyUI queue error: {e}", file=sys.stderr)
        return None


def wait_for_image(prompt_id: str, timeout: int = 300) -> str | None:
    """Poll ComfyUI history until image is ready. Returns output filename or None."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            req = urllib.request.Request(f"{COMFYUI_URL}/history/{prompt_id}")
            with urllib.request.urlopen(req, timeout=10) as resp:
                history = json.loads(resp.read().decode("utf-8"))

            if prompt_id in history:
                outputs = history[prompt_id].get("outputs", {})
                for node_id, node_out in outputs.items():
                    images = node_out.get("images", [])
                    if images:
                        return images[0]["filename"]  # e.g. "TexasProperty_00001_.png"
        except Exception:
            pass

        time.sleep(3)
        print("   ⏳ waiting for ComfyUI...", end="\r")

    return None


def copy_image_to_public(comfyui_filename: str, dest_filename: str) -> str | None:
    """Copy generated image from ComfyUI output dir to public/images/posts/."""
    src = os.path.join(COMFYUI_OUT, comfyui_filename)
    if not os.path.exists(src):
        # Try with subdirectories
        for root, dirs, files in os.walk(COMFYUI_OUT):
            for f in files:
                if f == comfyui_filename:
                    src = os.path.join(root, f)
                    break

    if not os.path.exists(src):
        print(f"❌ Image not found at {src}", file=sys.stderr)
        return None

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    dest = os.path.join(OUTPUT_DIR, dest_filename)
    shutil.copy2(src, dest)
    return f"/images/posts/{dest_filename}"


def build_prompt_for_article(topic: str, city: str | None) -> str:
    """Build a photorealistic prompt for the given topic + city."""
    template = TOPIC_PROMPTS.get(topic, TOPIC_PROMPTS["storm-damage"])
    city_context = f"{city}, Texas, " if city else "Texas, "
    return template.format(city_context=city_context)


def generate_article_image(
    slug: str,
    topic: str = "storm-damage",
    city: str | None = None,
    custom_prompt: str | None = None,
) -> str | None:
    """
    Main function: generate image for an article.
    Returns public URL path like '/images/posts/slug.jpg' or None if failed.
    """
    if not is_comfyui_running():
        print("⚠️  ComfyUI not running — skipping image generation", file=sys.stderr)
        print("   Start it with: bash /home/rybiroed/start-comfyui-py312.sh", file=sys.stderr)
        return None

    positive = custom_prompt or build_prompt_for_article(topic, city)
    filename_prefix = f"TPH_{slug[:40]}"
    dest_filename   = f"{slug[:80]}.png"

    print(f"🎨 Generating image with ComfyUI...")
    print(f"   Prompt: {positive[:80]}...")

    payload    = build_api_prompt(positive, filename_prefix)
    prompt_id  = queue_prompt(payload)

    if not prompt_id:
        print("❌ Failed to queue prompt", file=sys.stderr)
        return None

    print(f"   Queued: {prompt_id}")
    comfyui_filename = wait_for_image(prompt_id)

    if not comfyui_filename:
        print("❌ Image generation timed out", file=sys.stderr)
        return None

    print(f"   ✓ Generated: {comfyui_filename}")
    public_path = copy_image_to_public(comfyui_filename, dest_filename)

    if public_path:
        print(f"   ✅ Saved to: public{public_path}")
    return public_path


# ── CLI ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug",   required=True, help="Article slug (used as filename)")
    parser.add_argument("--topic",  default="storm-damage")
    parser.add_argument("--city",   default=None)
    parser.add_argument("--prompt", default=None, help="Custom positive prompt")
    args = parser.parse_args()

    result = generate_article_image(
        slug=args.slug,
        topic=args.topic,
        city=args.city,
        custom_prompt=args.prompt,
    )

    if result:
        print(f"\n✅ Image ready: {result}")
    else:
        print("\n⚠️  No image generated (ComfyUI may not be running)")
        sys.exit(1)
