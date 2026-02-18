#!/usr/bin/env bash
# Generate WebP and AVIF versions of header and site icon for next-gen image delivery.
# Run from repo root. Requires ffmpeg with libwebp and libaom-av1.
# Commit the generated files in public/ so the site stays self-contained.

set -e
cd "$(dirname "$0")/.."
PUBLIC=public

# Header: JPEG -> WebP and AVIF (optionally resize for display size; here we keep dimensions, optimize format)
if [[ -f "$PUBLIC/header.jpg" ]]; then
  echo "Generating header.webp and header.avif..."
  ffmpeg -i "$PUBLIC/header.jpg" -frames:v 1 -quality 80 -y "$PUBLIC/header.webp" -hide_banner -loglevel error
  ffmpeg -i "$PUBLIC/header.jpg" -frames:v 1 -c:v libaom-av1 -crf 30 -b:v 0 -f avif -y "$PUBLIC/header.avif" -hide_banner -loglevel error
else
  echo "Skip header: $PUBLIC/header.jpg not found"
fi

# Site icon: PNG -> WebP and AVIF
if [[ -f "$PUBLIC/siteicon.png" ]]; then
  echo "Generating siteicon.webp and siteicon.avif..."
  ffmpeg -i "$PUBLIC/siteicon.png" -frames:v 1 -quality 80 -y "$PUBLIC/siteicon.webp" -hide_banner -loglevel error
  ffmpeg -i "$PUBLIC/siteicon.png" -frames:v 1 -c:v libaom-av1 -crf 30 -b:v 0 -f avif -y "$PUBLIC/siteicon.avif" -hide_banner -loglevel error
else
  echo "Skip siteicon: $PUBLIC/siteicon.png not found"
fi

echo "Done. Generated files in $PUBLIC/"
