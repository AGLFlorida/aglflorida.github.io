# aglflorida.github.io

Public website for my (very small) business.

Find us on the web at [https://aglflorida.com](https://aglflorida.com), or here:

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AGLFlorida)
[![Google Play](https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/dev?id=5851403031328766349)
[![App Store](https://img.shields.io/badge/App_Store-0D96F6?style=for-the-badge&logo=app-store&logoColor=white)](https://apps.apple.com/us/developer/agl-consulting-llc/id1801519023)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/agl-consulting-llc/)

## Next-gen images (WebP/AVIF)

After adding or changing `public/header.jpg` or `public/siteicon.png`, run the image generation script (requires ffmpeg with libwebp and libaom-av1):

```bash
./scripts/generate-nextgen-images.sh
```

Commit the generated `public/*.webp` and `public/*.avif` files so the site stays self-contained.

## Blog post images

Put image files in `public/assets/` (or `public/blog/` for post-specific assets). In markdown use:

```markdown
![Alt text](/assets/your-image.png)
```

Optional caption/credit (styled smaller and italic):

```markdown
<p class="photo-credit">Photo credit: Your source or prompt.</p>
```