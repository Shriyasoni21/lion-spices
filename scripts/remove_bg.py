#!/usr/bin/env python3
"""
Remove backgrounds from product images using rembg and output transparent PNGs
into public/images/products/clean/ without touching the originals.

Requires: pip install rembg pillow
Run: python scripts/remove_bg.py
"""
import os
from pathlib import Path
from io import BytesIO

from PIL import Image

try:
    from rembg import remove
except Exception as e:
    raise SystemExit("rembg is required. Install with: pip install rembg pillow")

# Config
PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / 'public' / 'images' / 'products'
OUT_DIR = SRC_DIR / 'clean'
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Target square size to prepare highest-res master (we will create 220x220 masters)
TARGET_SIZE = 220
# Visual occupancy (scale object to this proportion of TARGET_SIZE)
OCCUPANCY = 0.88

ALLOWED_EXT = {'.jpg', '.jpeg', '.png'}

PRODUCT_FILES = [p for p in SRC_DIR.iterdir() if p.suffix.lower() in ALLOWED_EXT and p.is_file()]

if not PRODUCT_FILES:
    print('No product files found in', SRC_DIR)
    raise SystemExit(1)

print(f'Found {len(PRODUCT_FILES)} images. Processing to {OUT_DIR}...')

for src in PRODUCT_FILES:
    print('Processing', src.name)
    with open(src, 'rb') as f:
        input_bytes = f.read()

    try:
        result_bytes = remove(input_bytes)
    except Exception as e:
        print('rembg failed for', src.name, '— skipping:', e)
        continue

    img = Image.open(BytesIO(result_bytes)).convert('RGBA')

    # Determine scale to achieve OCCUPANCY of TARGET_SIZE
    w, h = img.size
    max_dim = max(w, h)
    if max_dim == 0:
        print('Empty image', src.name, '— skipping')
        continue

    scale = (TARGET_SIZE * OCCUPANCY) / max_dim
    new_w = max(1, int(round(w * scale)))
    new_h = max(1, int(round(h * scale)))

    img_resized = img.resize((new_w, new_h), Image.LANCZOS)

    # Create transparent square and paste centered
    canvas = Image.new('RGBA', (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    offset_x = (TARGET_SIZE - new_w) // 2
    offset_y = (TARGET_SIZE - new_h) // 2
    canvas.paste(img_resized, (offset_x, offset_y), img_resized)

    out_name = src.stem + '.png'
    out_path = OUT_DIR / out_name
    canvas.save(out_path, format='PNG')
    print('Saved', out_path.relative_to(PROJECT_ROOT))

print('Done. Generated transparent PNGs in', OUT_DIR)
