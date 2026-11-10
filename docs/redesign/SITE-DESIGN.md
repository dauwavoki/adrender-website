# AdRender website — SITE-DESIGN.md (redesign spec)

Version 1.0 · Nov 8, 2026 · Branch `site-redesign` · Single source of truth for the website redesign.
When anything else (old CSS, old components, a reference) disagrees with this file, this file wins.

Files next to this one:
- `REFERENCES.md` — the Phase 1 research: Marketer.com page-by-page style guide (main style reference) plus other sites. Read sections 2.1–2.4 before building.
- `app-reference/DESIGN.md` — the AdRender **app** design spec (v5.6). The site reuses its tokens, icons and component looks.
- `app-reference/src/**.txt` — real source files from the redesigned app (`index.css` tokens, `ClientShell`, sidebar, `DirectHomeView`, `ui/*` components, `AdRenderHomeIcon`). **Reference only**: read them to copy looks into the site. They are `.txt` so they are never compiled. Do not import them.
- `app-reference/icons/*.svg` — the AdRender Home icon (line/fill × dark/light).

---

## 0. Hard rules

1. **Never touch `main`.** Work only on `site-redesign`. No merges.
2. **Keep every route and URL working**: `/`, `/about` (and its anchors `#founder-story #templates #easy-to-use #brands #generation #sizes #library #playground #workspaces #stack`), `/faq` (and `#faq-token-rollover`), `/affiliates`, `/contact`, `/blog`, `/blog/:slug`, `/blog#comparisons`, every `/vs-*`, `/solutions`, every `/solutions/*`, every `/lp/*`, `/terms`, `/privacy`, and the `/#how-it-works`, `/#features`, `/#pricing` anchors.
3. **Keep SEO intact**: `PageMeta` on every page (same titles/descriptions unless a heading change forces a tiny edit), `scripts/ssg.mjs`, `scripts/postbuild.mjs`, sitemap scripts, `public/robots.txt`, `public/llms.txt`, structured data, canonical URLs. Every page must still render fully as static HTML without JavaScript (the SSG output).
4. **Don't change what things do**: links, sign-up/app URLs (`useAppUrl`, `lib/appUrl`), the contact form submit (Supabase), analytics tags, `vercel.json` (including its Content-Security-Policy). Restyle and re-layout only.
5. **Keep the content/data files as the source of copy**: `src/data/*.ts(x)`, `src/content/blog/*`. You may split a heading into a two-part headline (section 3.3) and change Title Case to sentence case. Do not invent new claims, numbers, testimonials, customer names or logos.
6. **Public copy rules** (any text you add or edit):
   - Never name AI models, AI providers or the template data vendor. Say "100M+ real ads" or "proven ad structures".
   - No hype words ("revolutionary", "game-changing", "unlock", "supercharge"), no exclamation marks, no guaranteed results.
   - AdRender makes both images and video — never imply images only.
   - The founder's public name is "Marc Lawrence".
   - Support wording: "Talk to us through the customer service chat or send us an email at info@adrender.app".
   - Do not name competitors outside the existing `/vs-*` comparison pages.
7. **CSP**: fonts only from Google Fonts or self-hosted; images and media only from the site itself or `data:` URIs. No new third-party scripts, CDNs or image hosts.
8. **Both themes**: every page and component must look right in light and dark.

---

## 1. Decisions (made by Mark, Nov 8, 2026)

| Decision | Value |
|---|---|
| Theme | **Follows the device** until the visitor picks a mode (section 2). Light when the device has no dark preference. Toggle in the header, footer, phone menu, and legal pages. |
| Headline font | **Serif** for display headlines (section 3). Inter for everything else. |
| Main style reference | Marketer.com — copy its patterns (REFERENCES.md §2.2), built with AdRender's app tokens and colors. |
| Icons | Phosphor (`@phosphor-icons/react`), same as the app. Remove `lucide-react` at the end. |
| App preview | Must show the **new** app (floating sidebar, content card, Phosphor icons, warm neutrals). It follows the site theme (light app in light mode, dark app in dark mode). |
| Feature images | Mark makes them later. Use clear placeholders + an updated `IMAGE_MANIFEST.md`. |

Why light when the device has no preference: there is no general rule that dark converts better; reading tests favour dark text on light backgrounds, the buyers (Shopify and small-business owners) live in light tools, and the main reference (Marketer, same buyer) is light. The toggle is still one click away, and a dark device opens dark.

---

## 2. Theme system

- Classes on `<html>`: `light` or `dark` (same as the app). The SSG HTML is written with `class="light"`. A no-flash script corrects the class before first paint.
- Saved per visitor in `localStorage` key `adrender-site-theme` (`"light"` | `"dark"`). Every read and write is in `try/catch`. If storage throws, follow the device setting.
- **First visit** (no saved key): follow the device with `matchMedia('(prefers-color-scheme: dark)')`. Dark → `html.dark`. Light, or no preference, → `html.light`.
- **No flash**: the inline script at the top of `<head>` in `index.html` applies the same rule before paint: saved choice, then the device setting, then light. (Inline scripts are allowed by the current CSP — `'unsafe-inline'` is present.)
- **Live follow**: while the key is absent, the open page listens for device setting changes and matches them. A saved choice stops that following.
- **Toggle** (header, footer, phone menu, legal header): clicking saves the choice. If the chosen mode equals the current device setting, remove the key instead of storing it, so the site keeps following the device.
- Header, footer, and legal toggles: ghost icon-only button, 36px, `Sun` icon shown in dark mode / `Moon` in light mode, `aria-label="Switch to dark mode"` / `"Switch to light mode"`, tooltip. The phone menu uses a "Light | Dark" segmented control. The icon shown follows the class on `<html>`, so it is correct before React paints.
- **Theme change fades.** It does not fade on the first load.
  - Toggle click: 600ms ease-in-out.
  - Device setting change while following: 1200ms ease-in-out.
  - `prefers-reduced-motion: reduce`: instant, no fade.
  - Where `document.startViewTransition` exists, the whole page crossfades. `::view-transition-old(root)` and `::view-transition-new(root)` use that case's duration. The blend is `normal` (the default plus-lighter blend flashes gradients and grain). Scene and hero motion is paused for the capture, and color transitions are suspended so the new snapshot is the settled theme. The header (and the about jump bar, and the legal header) is its own view-transition group with a solid page background for the capture, because a `backdrop-filter` bar snapshots as empty glass and flashes.
  - Where view transitions are missing: a temporary class on `<html>` sets `transition: background-color, color, border-color, fill, stroke, box-shadow` at the same duration on every element (and `::before` / `::after`), then the class is removed when the transition ends.

---

## 3. Design tokens

### 3.1 Colors

Copy the **app tokens exactly** from `app-reference/DESIGN.md` §1 / `app-reference/src/index.css.txt` (`--bg-page`, `--bg-sidebar`, `--bg-surface`, `--bg-raised`, `--bg-inset`, `--bg-input`, `--bg-hover`, `--bg-selected`, `--bg-soft`, `--border`, `--border-strong`, `--text-primary`, `--text-secondary`, `--text-muted`, `--btn-primary-bg`, `--btn-primary-text`, `--success`, `--warning`, `--danger`, `--info`, `--accent` and all `*-soft` versions, brand gradient light/dark, color icon tiles 8.19). Put them in `src/index.css` under `html.light` and `html.dark` (and `:root` = light), and expose them through Tailwind v4 `@theme` so classes like `bg-surface`, `text-secondary`, `border-border` work.

Site-only tokens (add next to them):

| Token | Light | Dark | Use |
|---|---|---|---|
| `--site-bg` | `#FBFAF7` (warm cream, a touch warmer than app `--bg-page`) | `#141413` | Page background |
| `--text-faded` | `rgba(31,30,29,0.45)` | `rgba(218,216,211,0.42)` | Second half of two-part headlines |
| `--hairline` | `rgba(93,88,76,0.14)` | `rgba(255,255,255,0.07)` | Page rails, section rules, table/FAQ rows |
| `--band-bg` | `#1B1A18` | `#1E1D1B` | Inverted band (one per page max) |
| `--band-text` / `--band-text-secondary` | `#F2F0EC` / `#A39E98` | same | Text on the band |
| `--band-tint` | `#F3F1EC` | `#1A1918` | Quote band, soft section fill |
| `--stage-shadow` | `0 24px 64px rgba(31,30,29,0.14)` | `0 24px 64px rgba(0,0,0,0.55)` | Product frame on a stage |

Rules: no neon, no glow outlines, no gradient buttons, no colored card borders. Color appears only in small meaningful spots: the logo, the brand-gradient "Ready" border inside the app preview, color icon tiles (8.19), status badges, check marks, chart lines, `--accent` on toggles/focus. Links: `--text-primary` with underline (app 8.13).

### 3.2 The "stage" (product backdrop)

Every product visual (hero app preview, how-it-works visuals, feature visuals, placeholders) sits on a **stage**: a rounded panel (radius 20px desktop, 14px phone) with a soft gradient and film grain, inner padding 40–64px desktop / 12–16px phone, product frame centered on it with `--stage-shadow`.

- Light stage: `radial-gradient(60% 80% at 15% 20%, #DCE7FB 0%, transparent 70%), radial-gradient(55% 70% at 85% 30%, #E8E0FA 0%, transparent 70%), radial-gradient(60% 70% at 60% 100%, #FBE5D6 0%, transparent 70%), #EEF0F5` — a pale blue / violet / peach mist taken from the brand gradient.
- Dark stage: same layout with `#1D2433`, `#251F33`, `#2E2219` on `#191919`.
- Grain: an inline SVG `feTurbulence` noise as a `data:` URI background layer on a `::after`, `opacity: 0.10` light / `0.14` dark, `mix-blend-mode: overlay` (soft-light if overlay looks dirty in dark). Must stay subtle.
- Build once as `<Stage>` (`src/components/site/Stage.tsx`) with props `variant?: 'default' | 'band'`, `padding?: 'lg' | 'md'`.

### 3.3 Typography

- **Display serif: Newsreader** (Google Fonts, `opsz` + `wght` axes, 400 and 500, plus 400 italic). Load via the existing Google Fonts `<link>` in `index.html` — replace Plus Jakarta Sans and Caveat with Newsreader; keep Inter 400/500/600. Tailwind token `--font-display: 'Newsreader', Georgia, serif`. Remove `--font-heading` and `--font-hand` usages (map old `font-heading` uses to `font-display` or Inter per the table).
- **Text: Inter** for body, nav, buttons, labels, tables, forms, the app preview.
- Sentence case everywhere. No uppercase labels, no wide letter-spacing, no "/ FEATURES" style eyebrows. Optional small eyebrow = 14px Inter 500 `--text-secondary`.

| Role | Font | Desktop | Phone (<768) | Notes |
|---|---|---|---|---|
| H1 (hero) | Newsreader 400 | 64 / 68, tracking -0.02em | 40 / 44 | `--text-primary` |
| H2 (section title) | Newsreader 400 | 46 / 52, -0.02em | 32 / 38 | Usually a two-part headline |
| H3 (story/card title) | Newsreader 400 | 30 / 36, -0.015em | 24 / 30 | |
| Big stat | Newsreader 400 | 48 / 52 | 36 / 40 | `tabular-nums` |
| Card title (small cards, tables) | Inter 600 | 16 / 24 | 16 / 24 | |
| Lead paragraph | Inter 400 | 19 / 30 | 17 / 26 | `--text-secondary` |
| Body | Inter 400 | 16 / 26 | 16 / 25 | |
| Small / labels / tabs | Inter 400–500 | 14 / 20 | 14 / 20 | |
| Meta | Inter 500 | 13 / 18 | 13 / 18 | `--text-muted` |
| FAQ question | Inter 500 | 18 / 26 | 16 / 24 | |

**Two-part headline** (Marketer's signature): component `<SplitTitle as="h2" lead="Hundreds of ads." rest="Built on what already works." />` — `lead` in `--text-primary`, `rest` in `--text-faded`, same size, `rest` on a new line on desktop (inline on phone if short). Use it for most H1/H2s. Build it from existing headings: split at the first sentence or clause; if a heading is one short sentence, add a short second line only from existing nearby copy (subtitle/lead) — never invent claims.

### 3.4 Spacing, layout, radius

- Content column: max-width **1280px**, side gutter 24px (16px phone).
- **Hairline rails** (desktop ≥1024px): the content column has 1px `--hairline` vertical lines on both sides running the full page height (Marketer's "ruled" look). Sections are separated by 1px `--hairline` horizontal rules that span the column. Full-bleed bands (stage CTA, inverted band) break through the rails.
- Section vertical padding: 112px desktop, 72px phone. Title → content gap 48px (32 phone).
- Radius: buttons full pill; inputs 12; small cards 12; large cards/frames 16; stages 20; badges 6.
- Shadows only on product frames on stages and on menus (`0 12px 32px rgba(0,0,0,0.12)` light / `0.5` dark).

### 3.5 Buttons and links

| Variant | Look |
|---|---|
| Primary (one per area) | Pill, 44px tall (40 in header), padding 0 20px 0 6px when it has the arrow dot, else 0 20px. Fill `--btn-primary-bg`, text `--btn-primary-text`, Inter 15/500. Left "arrow dot": 32px circle in `--btn-primary-text` color with a 16px `ArrowRight` in `--btn-primary-bg`. Hover: opacity 0.9, arrow nudges 2px right. |
| Secondary | Same pill, transparent fill, 1px `--border-strong`, text `--text-primary`. Hover `--bg-hover`. |
| Ghost / text link with arrow | Inter 15/500 `--text-primary`, trailing `ArrowUpRight` (goes to another page/app) or `ArrowRight` (goes deeper on the site), underline on hover. |
| Icon button | 36px circle/rounded square, ghost, tooltip + `aria-label`. |

Focus: 2px `--focus-ring` outline, offset 2px. Hit targets ≥44px on phone.

### 3.6 Icons

Phosphor, Regular weight by default (Fill for selected states), 16–20px, color inherits. Use the app's Lucide→Phosphor map (`app-reference/DESIGN.md` §6.1). Add `@phosphor-icons/react`; when every file is converted, remove `lucide-react` from `package.json`. Brand/platform logos: Phosphor `ShopifyLogo`, `MetaLogo`, `InstagramLogo`, `FacebookLogo`, `TiktokLogo`, `GoogleLogo`, `LinkedinLogo`, `PinterestLogo`, `YoutubeLogo`.

### 3.7 Motion

- Scroll reveal: fade + 12px rise, 400ms ease-out, once (reuse `ScrollReveal` / `useInViewReveal`).
- Hovers 150ms; card hover = app 8.18 (lift 2px, `--border-strong`, soft glow, media zoom 1.04).
- Sticky story: active step highlight moves as the reader scrolls (IntersectionObserver).
- Small "alive" moments inside product visuals only (status chip ticking Rendering → Ready, ad thumbnails cross-fading). Nothing bounces.
- `prefers-reduced-motion`: no movement, only instant state changes.

---

## 4. Shared components (build in `src/components/site/`)

1. **`Stage`** — 3.2.
2. **`SplitTitle`** — 3.3.
3. **`SplitHero`** — Marketer split hero: grid 7/5 columns; left = `SplitTitle as="h1"`; right = lead paragraph aligned to the bottom of the headline (+ optional extra: hero URL field); below both a 1px hairline rule, then the button row (primary + secondary), then (optional) a stage with the product, which overlaps into the next section. Breadcrumb (14px `--text-secondary`, "Solutions / Creative fatigue") above the title on sub-pages. Phone: single column.
4. **`NumberedStory`** — sticky left index (`01 Add your brand` … active item `--text-primary` with a 2px `--text-primary` bar on its left, others `--text-muted`) + right column of steps: `01` meta number, H3, one paragraph, optional link, a `Stage` visual, then a row of two **check captions** (`Check` 16px `--success` + **bold lead.** rest in `--text-secondary`). Phone: no sticky index; steps stack.
5. **`CheckCaption`** — as above.
6. **`LinkTable`** — rows: title (Inter 500 16) · description (`--text-secondary`) · `ArrowRight`; hairline between rows; whole row clickable; hover `--bg-hover`. Used for solutions, comparisons, blog lists, "where this fits".
7. **`TabbedPanel`** — numbered tab row (`01 Templates  02 Brands  03 Render`, active = `--text-primary` + 2px underline, others `--text-secondary`), switches a text-left / stage-right panel. Keyboard accessible (roving tabindex, arrow keys). All panels rendered in SSG HTML (inactive ones hidden), so content is indexable.
8. **`StatRow`** — 3 or 4 columns: big serif number + 14px label; hairline between columns.
9. **`ImageCard`** — tall card (4:5), media fills, label bottom-left over a soft dark gradient, card radius 16, app 8.18 hover. Below the card: small label (14 `--text-secondary`), serif H3 (2 lines max), paragraph, ghost link.
10. **`InvertedBand`** — full-bleed `--band-bg` section with band text tokens; in dark mode it is a slightly lighter warm surface so it still reads as a band.
11. **`QuoteBand`** — `--band-tint` full-bleed, serif quote 30/38, attribution line 14px. Only use real quotes that already exist in the repo; if none exist, don't use it.
12. **`FaqTwoColumn`** — left: `SplitTitle` (sticky on desktop); right: accordion (hairline rows, 18px Inter 500 question, `Plus` / `X` 20px icon, answer 16/26 `--text-secondary`). First item open. Keep existing FAQ data and the `#faq-…` anchor ids.
13. **`ClosingCta`** — full-bleed `Stage` band, centered `SplitTitle`, one sentence, primary button (+ small "Free to start. No credit card needed." under it if the existing copy has it).
14. **`Placeholder`** — for every image Mark will supply: a `Stage`-styled box at the exact aspect ratio with a centered label (Inter 13/500 `--text-secondary`): `Image F1 · Feature: proven templates · 1200×900`. Rendered via one component `<SitePlaceholder id="F1" />` reading from `src/data/imageManifest.ts` so swapping in a real file later is one line (`src` set → real `<img>` with width/height and `loading="lazy"`).

---

## 5. Header, menus, footer

**Header** (sticky, height 64, `--site-bg` at 92% + `backdrop-filter: blur(12px)`, hairline bottom border appears after scrolling 8px):
- Left: AdRender logo (existing logo mark) + "AdRender" wordmark, Inter 600 17px `--text-primary`.
- Center nav (Inter 15/500 `--text-primary`, hover `--bg-hover` pill): **Product ▾** · **Solutions ▾** · **Pricing** (`/#pricing`) · **Blog** · **FAQ**.
- Right: theme toggle · "Sign in" (text, `--text-secondary`, same href as today) · primary pill "Start free" (same signup URL as today).
- **Product mega menu** (hover/focus/click, 120ms fade, `--bg-raised`, radius 16, menu shadow, padding 20): column 1 "Make ads" (How it works `/#how-it-works`, Features `/#features`, Browse templates `/about#templates`, Ad Playground `/about#playground`, Sizes and formats `/about#sizes`); column 2 "Your brand" (Brands `/about#brands`, Library `/about#library`, Workspaces `/about#workspaces`, Shopify app `/blog/adrender-shopify-app`); each row = 32px icon tile (8.19 colors, sparingly) + title + one grey line taken from existing feature copy. Column 3 = featured card (`--bg-inset`, radius 12): small app-preview thumbnail placeholder + "See the full feature tour" → `/about`.
- **Solutions mega menu**: two columns of the existing solution pages (from `src/data/solutions.ts`, title only + `ArrowRight` on hover) and a third column "Compare" listing the `/vs-*` pages + "All comparisons" → `/blog#comparisons`. Keep `SolutionsNav` / `MoreNav` data, restyle.
- "More" items that exist today (About, Affiliates, Contact) move to the footer and the phone menu (and About into the Product menu featured card).
- **Phone (<768)**: logo left; right = "Start free" small pill + menu button (`List` icon). Menu = full-height sheet (`--bg-raised`), large rows 48px, sections Product / Solutions / Compare / Company, Light | Dark segmented control, Sign in, Start free. Closes on Escape, backdrop, link click.
- Keep the existing announcement/Beta banner component if it is currently shown, restyled as a slim 36px `--bg-inset` strip, 13px text, no gradient.

**Footer** (hairline top border, padding 72/48):
- Left: logo + two-part serif tagline built from existing copy (e.g. "Create more ads." / "Find more winners.") in 24px Newsreader.
- 4 link columns, 14px, headers 13px `--text-muted`: Product (How it works, Features, Pricing, FAQ, Shopify app), Solutions (top 5 + All solutions), Compare (`/vs-*` + All comparisons), Company (About, Blog, Affiliates, Contact).
- Bottom row after a hairline: the current copyright line on the left; Terms, Privacy, theme toggle on the right. Keep every link and line the current footer has.
- Below the copyright line, one quiet row of launch badges (StartupBase, EasyLaunch, Fazier, SaaSCity, Smol Launch): 24px tall, 16px gap, grayscale at rest, full color on hover or focus. No Product Hunt badges. No full-width strip above the footer.

---

## 6. Hero app preview (the most important component)

Rebuild `src/components/AppPreview/*` (keep its file names and its data file `appPreviewData.ts` as the content source) so it looks like the **new app** at `app-reference/src/layouts/ClientShell.tsx.txt` + `app-reference/src/views/DirectHomeView.tsx.txt` + `app-reference/DESIGN.md` §5 and §8.

- Fixed design size 1280×800, scaled to fill the hero stage's inner width (keep the current scaling approach). On phones show it scaled (min scale 0.5, left crop, right-edge fade) inside the stage; never horizontally scroll.
- The hero stage is the window: full width of the content column (1280px max, not a wider breakout), radius 20, padding 10px, the same gradient and grain, `--stage-shadow`, no border inside it. No separate app-window frame. The gradient shows in the 10px gaps around and between the sidebar and the content card.
- **Floating sidebar** (DESIGN.md 5.1–5.8 & 5.9): 10px gap from the stage edge, radius 16, `--bg-sidebar`, 1px `--border`, width 256. Top row: Image | Video segmented control (sliding highlight, dark-mode shine) + ghost `CaretDoubleLeft`. Then "AdRender" item with the Home icon (`app-reference/icons/*`, Fill when selected), Library (`Books`), Browse Templates (`SquaresFour`), Saved Templates (`BookmarkSimple`), Ad Playground (`MagicWand`), Brands & Campaigns (`Megaphone`). Bottom: workspace button (`UserCircleCheck` + "Personal" + "Workspace" + `CaretUpDown`), tokens row (`Coins` + "760 tokens" + ghost "Top up"), profile button (avatar, name, email, `CaretUpDown`). Selected item = `--bg-selected`, `--text-primary`, Fill icon.
- **Content card** to the right (10px gap, radius 16, `--bg-page`, 1px `--border`) showing the new **Home** view: the gradient welcome quote (8.20, cross-fading through `QUOTES`), "Keep working on" / "Use again" / "Get inspired" rows of ad tiles (4 equal columns, aspect 4:5, gap 12px, cover, media top corners rounded, 8.27; category label bottom-left on a soft dark gradient when the data has one), color icon tiles (8.19), badges (8.7). Reuse the existing media (`public/app-preview/*`, `public/how-it-works/*`).
- Keep it interactive the way it is today (clicking nav items switches the content view; reuse whatever views the current preview has, restyled). Library item demonstrates its state: shows "Rendering" with the 3 amber dots for ~3s, then "Ready 2" with the rotating brand-gradient border (5.7). Reduced motion → static.
- Uses app tokens from the **current site theme** (light app in light mode, dark app in dark mode). Phosphor icons only.
- SSG: the Home view must be in the static HTML and look complete without JavaScript.
- Sits on a `Stage` under the hero, overlapping the next section by ~120px on desktop.

---

## 7. Page-by-page plan

### 7.1 Home `/`
1. **Split hero** — H1 from the current hero ("Create more ads." / "Find more winners." — keep the current wording, as a two-part headline). Right column: current lead paragraph, the existing **URL field + "Render my ads" button** (same behavior), "Free to start. No credit card needed." Below the rule: primary "Start free" + secondary "See how it works" (`#how-it-works`). Then the app preview on a stage (section 6).
2. **Proof row** — the three `ProofRow` stats as a `StatRow`-style hairline row (Inter 15/500, no big serif) + existing launch badges if they exist today.
3. **How it works** (`id="how-it-works"`) — `SplitTitle` intro + `NumberedStory` with the 3 existing steps (Add your brand / Choose winning templates / See your ads). Each step's visual = the existing `BrandScan`, `TemplateShowcase`, `ResultsShowcase` content restyled with app tokens inside a `Stage` (keep their logic, data and media; remove neon borders and gradient titles). Check captions from existing step copy. Then the existing "Sign up free. Choose a template. Get your ads." strip as a plain hairline row with one primary button, and the "Using Shopify? Get the native app" link row.
4. **Problem → fix** — the 3 `ProblemBottleneckFix` cards become Marketer's **Without / With** layout: `SplitTitle` from card 1 + 3; two rows labelled "Without AdRender" and "With AdRender", each with 3 small illustrated tiles (simple Phosphor-icon compositions on `--bg-inset` for "without", on a `Stage` for "with") and one-line captions taken from the existing card copy. Keep the "Why I built AdRender" link.
5. **Features** (`id="features"`) — `SplitTitle` ("A creative production system." / "Not a collection of tools.") + the 8 `FeatureCards` as a 4-column grid of `ImageCard`s (2 rows; 2 columns on tablet, 1 on phone), each with a placeholder image (manifest F1–F8), title, body, "Learn more →" to its `/about#anchor`.
6. **Ad gallery** — Marketer's arc/fan of ads: 9–12 images from `public/how-it-works/ads/*` arranged on a gentle arc (CSS transforms), centered serif line ("Your brand, in every format." / "Static and video.") — use existing copy if a better line exists. On phone: horizontal scroll-snap row.
7. **Inverted band — Shopify** — "Using Shopify?" / "Get the native app." from existing copy, a short paragraph from the Shopify blog post intro, link to `/blog/adrender-shopify-app`, and an orbit of platform logos (Shopify in the center tile, Meta, Instagram, Facebook, TikTok, Google, LinkedIn, Pinterest around it on two faint rings).
8. **Cost table** — `CostTable variant="compact"`: hairline table (no colored boxes), serif title from existing heading, the "AdRender — from $19/mo. One tool." line as a quiet `--bg-inset` row, "See the full breakdown →" link.
9. **Pricing** (`id="pricing"`) — keep `Pricing.tsx` data and logic (monthly/annual switch, plans, links). Look: app segmented control for Monthly | Annual; 5 plan cards (`--bg-surface`, radius 16, hairline border; the recommended plan gets a 1px `--text-primary` border and a small neutral "Most popular" badge if that label exists today); price in serif 40px; features with `Check` icons; primary button on the recommended card, secondary on others. `TokenBuys` / "What 1 token buys" tables: hairline tables, neutral numbers (`--text-primary`, `tabular-nums`) — no rainbow numbers; column header icons may use the 8.19 icon-tile colors.
10. **FAQ** — `FaqTwoColumn` with `HOME_FAQ_ITEMS` + "See all FAQs →" ghost link and "Chat with our in-app support" secondary button (same hrefs).
11. **Closing CTA** — `ClosingCta` stage band.

### 7.2 About `/about` (features tour)
`SplitHero` ("Everything AdRender does." style headline built from existing about copy) + a `TabbedPanel`-style sticky in-page index of the anchors. Founder story (`#founder-story`) as a two-column block: portrait/placeholder left, serif pull-quote + text right. Each feature section (`#templates`, `#easy-to-use`, `#brands`, `#generation`, `#sizes`, `#library`, `#playground`, `#workspaces`, `#stack`) = alternating text-left / stage-right rows (Marketer platform-feature template): eyebrow number, H3 serif, body, check captions or bullet list from existing copy, placeholder image (manifest A1–A9 or reuse existing `img-15…22` paths if present). End with `ClosingCta`.

### 7.3 FAQ `/faq`
`SplitHero` without stage ("Questions, answered." style from existing title) → groups from `src/data/faq.ts` as `FaqTwoColumn` blocks, one per group (group name as the left title). Keep every anchor id. Closing CTA.

### 7.4 Solutions index `/solutions` and solution pages `/solutions/*`
Index: `SplitHero` + `LinkTable` of all solutions (title · one-line summary · arrow), grouped as today if grouped.
Solution page template (`SolutionPage.tsx`): breadcrumb → `SplitHero` from the page's title/subtitle → content sections from its data in order: problem / how AdRender helps / steps / proof → use `NumberedStory` (no sticky) or `TabbedPanel` where the data has steps, `CheckCaption` lists for bullet points, a placeholder stage where an image is referenced → related solutions `LinkTable` → `ClosingCta`. Keep each page's `PageMeta`.

### 7.5 Comparison pages `/vs-*` (`ComparisonPage.tsx`)
Breadcrumb ("Compare / AdRender vs X") → `SplitHero` → comparison table: hairline table, AdRender column with `--bg-inset` fill, `Check` (`--success`) / `X` (`--text-muted`) icons, text cells `--text-secondary` → Marketer-style "Without / With" is not needed here → differences as `CheckCaption` pairs → FAQ if present → other comparisons `LinkTable` → `ClosingCta`. Keep all existing claims exactly as written in `comparisons.tsx`.

### 7.6 Landing pages `/lp/*` (`LandingPage.tsx`)
Same as the homepage hero + proof row + how it works + features + pricing + FAQ + closing CTA order, with the page's own copy. No mega menu changes needed beyond the shared header.

### 7.7 Blog `/blog`, `/blog/:slug`
Index: `SplitHero` without stage → category pills (selected = `--btn-primary-bg` fill) if categories exist → posts as a 3-column grid of cards (placeholder or existing cover, date 13px muted, serif title 22/28, 2-line excerpt) → `#comparisons` section as a `LinkTable`.
Post: max text width 680px centered, breadcrumb, serif H1 48/54, meta line, body Inter 18/30 `--text-primary`, H2 serif 30/36, H3 Inter 600 20/28, links 8.13, blockquote with 2px `--border-strong` left edge, code `--bg-inset`, tables hairline. Related posts `LinkTable` + `ClosingCta`.

### 7.8 Affiliates `/affiliates`, Contact `/contact`
Affiliates: `SplitHero` → existing sections restyled (steps as `NumberedStory` without sticky, commission info as `StatRow` using existing numbers only, FAQ as `FaqTwoColumn`) → CTA. Contact: Marketer demo-page layout — left: serif headline, 3 icon bullets from existing copy, support wording (rule 0.6); right: the existing form on a `Stage` (inputs app 8.2 at 44px height, labels 14/500, primary full-width pill submit). Same form logic.

### 7.9 Terms `/terms`, Privacy `/privacy`
Standalone (no Layout today — keep that). Typography only: blog post text styles, `--site-bg`, theme from localStorage, a small header with logo + "Back to AdRender".

---

## 8. Images and placeholders

- Every image Mark will make gets a placeholder (component 4.14) and a row in `IMAGE_MANIFEST.md` under a new top section "Redesign — Nov 2026": **ID · filename to save as (`/public/site/<id>-<slug>.webp`) · page + section · size in px · aspect ratio · theme note** (if separate light/dark versions are wanted, list `-light` / `-dark`). Keep the old manifest content below it under "Previous (July 2026)".
- Planned IDs: H1 (hero app preview poster for no-JS / social share, 2560×1600), F1–F8 (feature cards, 1200×1500, 4:5), A1–A9 (about sections, 1600×1200, 4:3), S-* (solution pages, 1600×1000 where a page has an image), B-* (blog covers that are missing, 1600×900), C1 (contact side image, optional), OG (social share image 1200×630).
- Existing real assets that stay in use: `public/app-preview/*`, `public/how-it-works/*`, `public/placeholders/img-*.png` (wherever they are still the right content), logos.

---

## 9. Phone and tablet

- <768: single column everywhere; rails hidden; hero H1 40px; stages 12–16px padding; `NumberedStory` without sticky index; card grids 1 column (features 1, blog 1, pricing cards horizontal scroll-snap with peeking next card OR stacked — stacked preferred); tables become stacked label/value cards; mega menus become the phone sheet; tap targets ≥44px; no horizontal page scroll ever.
- 768–1023: two columns where it fits; rails hidden; header keeps the full nav if it fits at 900px+, otherwise the phone sheet.

---

## 10. Accessibility and performance

- Contrast: text ≥4.5:1 on its background in both themes (check `--text-faded` headlines are only used at ≥30px).
- Every interactive element reachable by keyboard with a visible focus ring; menus close on Escape; accordions use `button` + `aria-expanded`.
- Images: width/height set, `loading="lazy"` below the fold, `decoding="async"`; hero preview media `fetchpriority="high"` only for the first visible image.
- Fonts: `display=swap`; preconnect stays.
- No layout shift from the theme script or fonts (use `size-adjust`-friendly fallbacks: Georgia for Newsreader).

---

## 11. Done means

- `npm run build` passes with zero errors (TypeScript + Vite + postbuild/SSG).
- Every route in rule 0.2 builds to static HTML with its meta tags present in the built file.
- Light is the default with no flash; the toggle switches and remembers; both themes checked on every page template.
- No `lucide-react` imports remain and the package is removed; no neon/gradient buttons, no colored card borders, no Plus Jakarta Sans/Caveat left.
- App preview shows the new app in both themes.
- `IMAGE_MANIFEST.md` updated; every placeholder has an ID that matches it.
- Nothing pushed to `main`.
