# AdRender logo (Nov 2026): the 3D beam A

The logo is a single beam with a triangular cross-section, bent into an A:
it runs from the right foot up to the top, down the left leg, turns at the
elbow and crosses as the crossbar into the right leg. The right foot is the
beam's triangular end, and the elbow is cut flat through the point where the
edges meet, so it also shows a triangle. It is a real 3D model, so it can be
rotated and animated later from the same source.

- **Colours:** gradient `#4F8DF7` (blue) → `#9B6BF2` (purple) → `#FF8A3D` (orange), top-left to bottom-right, with the sides shaded by a light from the upper left. Edge lines are white at 65%.
- **Reference view:** "A": straight on, seen from slightly below (camera yaw 0°, pitch −20°). See `logo-view-A-reference.png`.
- **App background:** `#111113`.

All files are served from `public/brand/` (so `/brand/...` on the site).

## What to use where

| Use | File |
|---|---|
| Main logo, any size (dark or light background) | `logo/adrender-logo.svg` (PNG: `logo/adrender-logo-{256..4096}.png`) |
| Logo without edge lines (small sizes) | `logo/adrender-logo-no-lines.svg` |
| One-colour logo on dark / light | `logo/adrender-logo-mono-white.svg` / `logo/adrender-logo-mono-black.svg` (+ PNGs) |
| Flat silhouette (single colour) | `logo/adrender-logo-silhouette.svg` |
| In-app icons (transparent, square) | `icons/icon-color-*.png`, `icons/icon-mono-white-*.png`, `icons/icon-mono-black-*.png`, + SVGs. 24–48 px have no edge lines. |
| Browser tab | `favicon/favicon.ico` (16/32/48), `favicon/favicon.svg`, `favicon/favicon-{16..512}.png` |
| Safari pinned tab | `favicon/safari-pinned-tab.svg` |
| iPhone Home Screen | `app-icon/apple-touch-icon.png` (180, dark background) |
| Android / installed web app | `app-icon/app-icon-{192,512}.png` + `app-icon/maskable-{192,512}.png`; manifest entries in `favicon/manifest-icons.json` |
| App store / large app icon | `app-icon/app-icon-1024.png` (dark), `app-icon/app-icon-light-1024.png` |
| Shopify App Store listing icon | `social/shopify-app-icon-1200.png` |
| Social profile pictures | `social/profile-avatar-400.png` |
| Link previews (Open Graph / X) | `social/og-image-1200x630.png` |
| Emails | `email/email-logo-192.png` (shown at 96 px; `email-logo-96.png` for 1x) |
| **In-app Home button / UI icon** (flat 2D, Phosphor grid: 256 viewBox, 16 stroke) | `ui-icon/adrender-icon-line-{dark,light}.svg` (colour, default) → `ui-icon/adrender-icon-fill-{dark,light}.svg` on hover / press / selected. One-colour versions use `currentColor`: `ui-icon/adrender-icon-line-mono.svg`, `ui-icon/adrender-icon-fill-mono.svg`. Use 20 px or larger. Preview: `ui-icon-preview.png`. |

The UI icon is drawn from the same 3D model with a slightly thinner beam and fewer edges (no leg ridges or top seam), so it stays readable at 16–24 px next to Phosphor icons. Decision (Nov 17): the new icon replaces the old flat A everywhere; the Home button uses the colour version.

## Animated logo (approved Nov 17)

Sequence: the logo **tilts back** to show the triangle ends (0.7 s), then makes **one slow full turn** (3.0 s) and ends exactly on the still logo (view A). 112 frames at 30 fps, 3.7 s. Files in `animation/`:

| File | Use |
|---|---|
| `adrender-logo-still-{96,192}.png` | The still logo on the same square canvas as the animation (show this normally; swap to the animation and back with no jump). |
| `adrender-logo-spin-{96,192}.webp` | Animated WebP, plays once (loop=1). Restart by re-setting `src` (add `?t=<timestamp>`). |
| `adrender-logo-spin-sprite-{96,192}.webp` + `adrender-logo-spin.json` | Same frames as a sprite sheet (12 columns × 10 rows) for frame-exact control with JS (step `background-position` with requestAnimationFrame). |

Use 192 for logos shown at 64–96 px (sign-in), 96 for 32–48 px (website header). Load the animation file lazily (after the page has loaded, or on first hover), keep the still PNG until it has loaded.

**Shimmer** (CSS only, between spins): a soft diagonal light band sweeping across the logo once (~0.9 s), clipped to the logo's shape, e.g. a `::after` with `linear-gradient(105deg, transparent 40%, rgba(255,255,255,.45) 50%, transparent 60%)`, `mask-image` = the still logo, animating `background-position` from -150% to 150%.

**Rules:** pause when the tab is hidden (`document.visibilityState`); with `prefers-reduced-motion: reduce` show the still logo only (no spin, no shimmer).

**Timing (Mark, Nov 17):**
- **Sign-in / sign-up pages:** tilt + slow spin every 8 s (first one ~2.5 s after load), shimmer about 3 s after each spin ends.
- **Website, top-left logo:** first spin 10 s after every page load — including each in-site link click / route change, which restarts the 10 s — then only on hover (once per hover, not again until the pointer leaves and returns). No shimmer loop in the header.

## Regenerating

`source/` holds the model and the build script (Python 3, numpy, shapely, scipy, Pillow, `rsvg-convert`):

```
cd docs/brand/source
python3 build_pack.py     # writes ./pack/brand (copy into public/brand)
```

Camera, beam thickness, colours and line weight are settings in `vector3d.py` (`CAM`, `VIEW`, `PAL`) and `beam3d.py` (`build_A`).
