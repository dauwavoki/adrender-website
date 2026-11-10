# Image Manifest — AdRender Landing Redesign

## Redesign — Nov 2026

Save real files under `/public/site/`. Until a file exists, the site shows a labeled placeholder (`SitePlaceholder`). Sizes are the slot, not a crop of an old screenshot.

F1–F8, A2–A10, and H1 are drawn in the page. They do not need image files. A1, C1, and OG stay image slots. H1 is the static Home view from `src/components/AppPreview`, scaled into the product menu. The feature scenes live in `src/components/scenes`.

No solution page references an image, so there are no S-* slots. `/about#shopify` is drawn in code (A10). Previous slot 21 is no longer used.

| ID | Filename to save as | Page + section | Size | Aspect | Theme note |
|---|---|---|---|---|---|
| H1 | Built in code (src/components/scenes) — no image needed | Product menu featured card | 2560×1600 | 16:10 | Static Home view from `src/components/AppPreview` |
| F1 | Built in code (src/components/scenes) — no image needed | Homepage features — proven templates | 1200×1500 | 4:5 | |
| F2 | Built in code (src/components/scenes) — no image needed | Homepage features — easy to use | 1200×1500 | 4:5 | |
| F3 | Built in code (src/components/scenes) — no image needed | Homepage features — brand intelligence | 1200×1500 | 4:5 | |
| F4 | Built in code (src/components/scenes) — no image needed | Homepage features — batch rendering | 1200×1500 | 4:5 | |
| F5 | Built in code (src/components/scenes) — no image needed | Homepage features — every size | 1200×1500 | 4:5 | |
| F6 | Built in code (src/components/scenes) — no image needed | Homepage features — template library | 1200×1500 | 4:5 | |
| F7 | Built in code (src/components/scenes) — no image needed | Homepage features — ad playground | 1200×1500 | 4:5 | |
| F8 | Built in code (src/components/scenes) — no image needed | Homepage features — team workspaces | 1200×1500 | 4:5 | |
| A1 | `/site/a1-founder.webp` | `/about#founder-story` | 1600×1200 | 4:3 | |
| A2 | Built in code (src/components/scenes) — no image needed | `/about#templates` | 1600×1200 | 4:3 | |
| A3 | Built in code (src/components/scenes) — no image needed | `/about#easy-to-use` | 1600×1200 | 4:3 | |
| A4 | Built in code (src/components/scenes) — no image needed | `/about#brands` | 1600×1200 | 4:3 | |
| A5 | Built in code (src/components/scenes) — no image needed | `/about#generation` | 1600×1200 | 4:3 | |
| A6 | Built in code (src/components/scenes) — no image needed | `/about#sizes` | 1600×1200 | 4:3 | |
| A7 | Built in code (src/components/scenes) — no image needed | `/about#library` | 1600×1200 | 4:3 | |
| A8 | Built in code (src/components/scenes) — no image needed | `/about#playground` | 1600×1200 | 4:3 | |
| A9 | Built in code (src/components/scenes) — no image needed | `/about#workspaces` | 1600×1200 | 4:3 | |
| A10 | Built in code (src/components/scenes) — no image needed | `/about#shopify` | 1600×1200 | 4:3 | |
| B-adrender-shopify-app | `/site/b-adrender-shopify-app.webp` | Blog index card for `/blog/adrender-shopify-app` | 1600×900 | 16:9 | No cover in the post yet |
| B-ai-ad-generators-shopify-comparison | `/site/b-ai-ad-generators-shopify-comparison.webp` | Blog index card for `/blog/ai-ad-generators-shopify-comparison` | 1600×900 | 16:9 | No cover in the post yet |
| B-ai-ad-management-platforms-shopify | `/site/b-ai-ad-management-platforms-shopify.webp` | Blog index card for `/blog/ai-ad-management-platforms-shopify` | 1600×900 | 16:9 | No cover in the post yet |
| B-ai-product-photography-tools-comparison | `/site/b-ai-product-photography-tools-comparison.webp` | Blog index card for `/blog/ai-product-photography-tools-comparison` | 1600×900 | 16:9 | No cover in the post yet |
| B-ai-ugc-ads-creator-scaling | `/site/b-ai-ugc-ads-creator-scaling.webp` | Blog index card for `/blog/ai-ugc-ads-creator-scaling` | 1600×900 | 16:9 | No cover in the post yet |
| B-canva-enough-for-shopify-ads | `/site/b-canva-enough-for-shopify-ads.webp` | Blog index card for `/blog/canva-enough-for-shopify-ads` | 1600×900 | 16:9 | No cover in the post yet |
| B-creative-volume-agency-testing | `/site/b-creative-volume-agency-testing.webp` | Blog index card for `/blog/creative-volume-agency-testing` | 1600×900 | 16:9 | No cover in the post yet |
| B-freelance-ad-designer-scale-clients | `/site/b-freelance-ad-designer-scale-clients.webp` | Blog index card for `/blog/freelance-ad-designer-scale-clients` | 1600×900 | 16:9 | No cover in the post yet |
| B-hiring-a-freelancer-or-agency-adrender-fits-in | `/site/b-hiring-a-freelancer-or-agency-adrender-fits-in.webp` | Blog index card for `/blog/hiring-a-freelancer-or-agency-adrender-fits-in` | 1600×900 | 16:9 | No cover in the post yet |
| B-how-much-does-adrender-actually-save-you | `/site/b-how-much-does-adrender-actually-save-you.webp` | Blog index card for `/blog/how-much-does-adrender-actually-save-you` | 1600×900 | 16:9 | No cover in the post yet |
| B-prompting-optional-90-percent-no-prompt | `/site/b-prompting-optional-90-percent-no-prompt.webp` | Blog index card for `/blog/prompting-optional-90-percent-no-prompt` | 1600×900 | 16:9 | No cover in the post yet |
| B-static-vs-video-ads-what-actually-wins | `/site/b-static-vs-video-ads-what-actually-wins.webp` | Blog index card for `/blog/static-vs-video-ads-what-actually-wins` | 1600×900 | 16:9 | No cover in the post yet |
| B-ui-ux-of-adrender | `/site/b-ui-ux-of-adrender.webp` | Blog index card for `/blog/ui-ux-of-adrender` | 1600×900 | 16:9 | No cover in the post yet |
| B-who-needs-an-ai-ad-generator | `/site/b-who-needs-an-ai-ad-generator.webp` | Blog index card for `/blog/who-needs-an-ai-ad-generator` | 1600×900 | 16:9 | No cover in the post yet |
| B-why-adrender-doesnt-feel-like-figma | `/site/b-why-adrender-doesnt-feel-like-figma.webp` | Blog index card for `/blog/why-adrender-doesnt-feel-like-figma` | 1600×900 | 16:9 | No cover in the post yet |
| B-why-i-created-adrender | `/site/b-why-i-created-adrender.webp` | Blog index card for `/blog/why-i-created-adrender` | 1600×900 | 16:9 | No cover in the post yet |
| C1 | `/site/c1-contact.webp` | `/contact` side image | 1200×1500 | 4:5 | Reserved. Not placed on the page yet |
| OG | `/site/og-share.webp` | Social share image | 1200×630 | 1.91:1 | Reserved. Not wired into meta tags yet |

---

# Previous (July 2026)

Final assets live in `/public/placeholders/img-XX.png`. Sourced from
`Adrender Marketing/Website Images/image N.png` (N = 1–22).

Component: `src/components/PlaceholderImage.tsx` (`id` prop = number below).
Hero tabs: `src/components/AppPreview.tsx` via `placeholderSrc()`.

---

## Homepage

| # | Filename | Source | Where it appears | Size | Aspect |
|---|----------|--------|------------------|------|--------|
| 01 | `img-01.png` | `image 1.png` | Hero interactive preview — **Templates** tab | 1440×900 | 16:10 |
| 02 | `img-02.png` | `image 2.png` | Hero interactive preview — **Saved Templates** tab | 1440×900 | 16:10 |
| 03 | `img-03.png` | `image 3.png` | Hero interactive preview — **My Ads Library** tab | 1440×900 | 16:10 |
| 04 | `img-04.png` | `image 4.png` | Hero interactive preview — **Ad Playground** tab | 1440×900 | 16:10 |
| 05 | `img-05.png` | `image 5.png` | Hero interactive preview — **Brands** tab | 1440×900 | 16:10 |
| 06 | `img-06.png` | `image 6.png` | Founder story card (homepage §4 + `/about` intro) | **1000×1000** (manifest listed 960×720) | 1:1 |
| 07 | `img-07.png` | `image 7.png` | Feature card — Proven templates | 800×560 | 10:7 |
| 08 | `img-08.png` | `image 8.png` | Feature card — Your template library | 800×560 | 10:7 |
| 09 | `img-09.png` | `image 9.png` | Feature card — Brand intelligence | 800×560 | 10:7 |
| 10 | `img-10.png` | `image 10.png` | Feature card — Batch generation | 800×560 | 10:7 |
| 11 | `img-11.png` | `image 11.png` | Feature card — Ad Playground | 800×560 | 10:7 |
| 12 | `img-12.png` | `image 12.png` | Feature card — Every size, automatically | 800×560 | 10:7 |
| 13 | `img-13.png` | `image 13.png` | Feature card — Shopify sync | 800×560 | 10:7 |
| 14 | `img-14.png` | `image 14.png` | Feature card — Team workspaces | 800×560 | 10:7 |

### Hero shot notes (01–05)
- Templates (01) is the SSG default — must look complete without JS.
- All five preload on mount for cross-fade without flash.

---

## `/about` expanded sections

| # | Filename | Source | Anchor | Size | Aspect |
|---|----------|--------|--------|------|--------|
| 15 | `img-15.png` | `image 15.png` | `/about#templates` | 1280×800 | 8:5 |
| 16 | `img-16.png` | `image 16.png` | `/about#library` | 1280×800 | 8:5 |
| 17 | `img-17.png` | `image 17.png` | `/about#brands` | 1280×800 | 8:5 |
| 18 | `img-18.png` | `image 18.png` | `/about#generation` | 1280×800 | 8:5 |
| 19 | `img-19.png` | `image 19.png` | `/about#playground` | 1280×800 | 8:5 |
| 20 | `img-20.png` | `image 20.png` | `/about#sizes` | 1280×800 | 8:5 |
| 21 | `img-21.png` | `image 21.png` | Retired. `/about#shopify` is drawn in code | 1280×800 | 8:5 |
| 22 | `img-22.png` | `image 22.png` | `/about#workspaces` | 1280×800 | 8:5 |

---

## Checklist

- [x] 01 Templates hero
- [x] 02 Saved Templates hero
- [x] 03 My Ads Library hero
- [x] 04 Ad Playground hero
- [x] 05 Brands hero
- [x] 06 Founder story
- [x] 07 Feature: Templates
- [x] 08 Feature: Library
- [x] 09 Feature: Brands
- [x] 10 Feature: Generation
- [x] 11 Feature: Playground
- [x] 12 Feature: Sizes
- [x] 13 Feature: Shopify
- [x] 14 Feature: Workspaces
- [x] 15 About: Templates
- [x] 16 About: Library
- [x] 17 About: Brands
- [x] 18 About: Generation
- [x] 19 About: Playground
- [x] 20 About: Sizes
- [x] 21 About: Shopify
- [x] 22 About: Workspaces

## Flags / mismatches

1. **Slot 06 dimensions:** file is **1000×1000**; manifest originally recommended **960×720**. Used as-is (no resize). HTML `width`/`height` attrs still report 960×720 from `imageManifest.ts` — update those if you want attrs to match intrinsic size.
2. **Unmapped file:** `8d771e4e57024779b128676382ede0ce.png` (2880×2880) in the source folder was **not** used — no slot mapping.
