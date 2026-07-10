Background removal script

This script generates transparent PNGs from the existing product images in `public/images/products`.
It will NOT overwrite original image files. Outputs are written to `public/images/products/clean/`.

Prereqs:
- Python 3.8+
- Install packages:

pip install rembg pillow

Run:

python scripts/remove_bg.py

Notes:
- `rembg` uses a neural model (U2Net) to remove backgrounds — it works well for product photos but may not be perfect for every image.
- The script creates 220x220 transparent PNG masters; you can resize/downscale later for specific breakpoints.
- If you want me to run the script here, confirm and I'll install the Python dependency and execute it.
