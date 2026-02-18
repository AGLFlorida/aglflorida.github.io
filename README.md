# aglflorida.github.io

Public website for my (very small) business.

Find us on the web at:
* https://aglflorida.com
* https://github.com/AGLFlorida
* https://play.google.com/store/apps/dev?id=5851403031328766349
* https://www.linkedin.com/company/agl-consulting-llc/

## Next-gen images (WebP/AVIF)

After adding or changing `public/header.jpg` or `public/siteicon.png`, run the image generation script (requires ffmpeg with libwebp and libaom-av1):

```bash
./scripts/generate-nextgen-images.sh
```

Commit the generated `public/*.webp` and `public/*.avif` files so the site stays self-contained.