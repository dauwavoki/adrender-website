# Image Manifest — AdRender Landing Redesign

Replace each SVG in `/public/placeholders/` with the final asset using the **same filename** (`img-01.svg` → prefer `img-01.png` and update `placeholderSrc` in `src/data/imageManifest.ts` if the extension changes).

Component: `src/components/PlaceholderImage.tsx` (`id` prop = number below).

---

## Homepage

| # | Filename | Where it appears | Recommended size | Aspect |
|---|----------|------------------|------------------|--------|
| 01 | `img-01.svg` | Hero interactive preview — **Templates** tab | 1440×900 (2x @ ~720×450) | 16:10 |
| 02 | `img-02.svg` | Hero interactive preview — **Saved Templates** tab | 1440×900 | 16:10 |
| 03 | `img-03.svg` | Hero interactive preview — **My Ads Library** tab | 1440×900 | 16:10 |
| 04 | `img-04.svg` | Hero interactive preview — **Ad Playground** tab | 1440×900 | 16:10 |
| 05 | `img-05.svg` | Hero interactive preview — **Brands** tab | 1440×900 | 16:10 |
| 06 | `img-06.svg` | Founder story card (homepage §4 + `/about` intro) | 960×720 | 4:3 |
| 07 | `img-07.svg` | Feature card — Proven templates | 800×560 | 10:7 |
| 08 | `img-08.svg` | Feature card — Your template library | 800×560 | 10:7 |
| 09 | `img-09.svg` | Feature card — Brand intelligence | 800×560 | 10:7 |
| 10 | `img-10.svg` | Feature card — Batch generation | 800×560 | 10:7 |
| 11 | `img-11.svg` | Feature card — Ad Playground | 800×560 | 10:7 |
| 12 | `img-12.svg` | Feature card — Every size, automatically | 800×560 | 10:7 |
| 13 | `img-13.svg` | Feature card — Shopify sync | 800×560 | 10:7 |
| 14 | `img-14.svg` | Feature card — Team workspaces | 800×560 | 10:7 |

### Hero shot notes (01–05)
- Capture the **main content pane only** (right of sidebar) or a full app frame that matches the preview window.
- Prefer retina PNG/WebP at 1440×900 or larger.
- Templates (01) is the SSG default — must look complete without JS.

### Feature card notes (07–14)
- Crop so the UI “bleeds” toward the bottom of the card (Cuttable-style).
- Card 12 should reflect the real **sizes panel** (resolution / model / size grid).

---

## `/about` expanded sections

| # | Filename | Anchor | Recommended size | Aspect |
|---|----------|--------|------------------|--------|
| 15 | `img-15.svg` | `/about#templates` | 1280×800 | 8:5 |
| 16 | `img-16.svg` | `/about#library` | 1280×800 | 8:5 |
| 17 | `img-17.svg` | `/about#brands` | 1280×800 | 8:5 |
| 18 | `img-18.svg` | `/about#generation` | 1280×800 | 8:5 |
| 19 | `img-19.svg` | `/about#playground` | 1280×800 | 8:5 |
| 20 | `img-20.svg` | `/about#sizes` | 1280×800 | 8:5 |
| 21 | `img-21.svg` | `/about#shopify` | 1280×800 | 8:5 |
| 22 | `img-22.svg` | `/about#workspaces` | 1280×800 | 8:5 |

---

## Checklist

- [ ] 01 Templates hero
- [ ] 02 Saved Templates hero
- [ ] 03 My Ads Library hero
- [ ] 04 Ad Playground hero
- [ ] 05 Brands hero
- [ ] 06 Founder story
- [ ] 07 Feature: Templates
- [ ] 08 Feature: Library
- [ ] 09 Feature: Brands
- [ ] 10 Feature: Generation
- [ ] 11 Feature: Playground
- [ ] 12 Feature: Sizes
- [ ] 13 Feature: Shopify
- [ ] 14 Feature: Workspaces
- [ ] 15 About: Templates
- [ ] 16 About: Library
- [ ] 17 About: Brands
- [ ] 18 About: Generation
- [ ] 19 About: Playground
- [ ] 20 About: Sizes
- [ ] 21 About: Shopify
- [ ] 22 About: Workspaces

## Swap procedure

1. Drop final files into `public/placeholders/` (e.g. `img-01.png`).
2. If extension is not `.svg`, update `placeholderSrc()` in `src/data/imageManifest.ts`.
3. Rebuild — no component prop changes needed if filenames stay `img-XX.*`.
