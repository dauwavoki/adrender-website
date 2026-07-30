# Image Manifest — AdRender Landing Redesign

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
| 21 | `img-21.png` | `image 21.png` | `/about#shopify` | 1280×800 | 8:5 |
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
