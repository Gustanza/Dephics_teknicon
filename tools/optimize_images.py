"""Compress the curated photography.

The images were copied byte-for-byte out of the Word document, so several photographs
are sitting in PNG containers at 1.5-1.8 MB. This re-encodes photographic PNGs as JPEG,
caps the long edge, and rewrites every reference to the old filename across the repo.

    python tools/optimize_images.py --dry-run
    python tools/optimize_images.py

Skips the logo and the client logo strip (flat-colour art that belongs in PNG).
"""

import argparse
import pathlib
import re
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "public" / "img"
MAX_EDGE = 2000
JPEG_QUALITY = 82
# Flat-colour art stays PNG; only photography is re-encoded.
KEEP_PNG = {"logo-teknicon.png"}

# Files whose text may reference an image filename.
REFERENCE_GLOBS = ("src/**/*.js", "src/**/*.vue", "src/**/*.css", "docs/image-manifest.json",
                   "docs/*.md", "index.html")


def rewrite_references(renames, dry_run):
    """Replace every old filename with its new one across source, data and docs."""
    touched = []
    for pattern in REFERENCE_GLOBS:
        for path in ROOT.glob(pattern):
            if not path.is_file():
                continue
            original = path.read_text(encoding="utf-8")
            updated = original
            for old, new in renames.items():
                updated = re.sub(rf"\b{re.escape(old)}\b", new, updated)
            if updated != original:
                touched.append(path.relative_to(ROOT))
                if not dry_run:
                    path.write_text(updated, encoding="utf-8")
    return touched


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not IMG_DIR.is_dir():
        sys.exit(f"no image directory at {IMG_DIR}")

    renames = {}
    saved = 0

    for path in sorted(IMG_DIR.glob("*")):
        if not path.is_file() or path.name in KEEP_PNG:
            continue
        if path.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
            continue

        before = path.stat().st_size
        image = Image.open(path)
        image = image.convert("RGB")

        longest = max(image.size)
        if longest > MAX_EDGE:
            scale = MAX_EDGE / longest
            image = image.resize(
                (round(image.width * scale), round(image.height * scale)),
                Image.LANCZOS,
            )

        target = path.with_suffix(".jpg")
        if args.dry_run:
            print(f"{path.name:44} {before // 1024:5} KB -> {target.name}")
            continue

        image.save(target, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        if target != path:
            path.unlink()
            renames[path.name] = target.name

        after = target.stat().st_size
        saved += before - after
        print(f"{path.name:44} {before // 1024:5} KB -> {after // 1024:5} KB  {target.name}")

    if args.dry_run:
        return

    touched = rewrite_references(renames, args.dry_run)
    print(f"\nreclaimed {saved // 1024} KB across {len(renames)} renamed files")
    for path in touched:
        print(f"  updated {path}")


if __name__ == "__main__":
    main()
