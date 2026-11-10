# AdRender — Website Redesign: Phase 1 Research (Nov 8, 2026)

Follows the brief "AdRender - Website Redesign Brief (Nov 2026)". Phase 1 only — no plan decisions and no build prompts yet. Main reference: **Marketer.com** (https://www.marketer.com/), studied page by page. All measurements below were read from the live sites on Nov 8, 2026 at a 1440px-wide desktop window.

---

## 1. Short summary

- **Marketer.com is a light site.** Cream background, dark-green text, a serif display font for headlines, a clean sans for everything else, thin hairline lines framing the page, and product UI shown on soft, grainy sky-blue "stages". Only one page (Creative Team) uses a black hero.
- **Its power comes from a small set of repeated patterns**, not from decoration: a two-tone headline, a split hero, product UI on a gradient stage, a sticky numbered story, pill buttons, hairline-ruled sections, and a big calm footer. These can all be rebuilt with the AdRender app tokens (DESIGN.md v5.6).
- **Two things in Marketer's look don't match the AdRender app:** it is light (our app defaults to dark) and it uses a serif headline font (our app is Inter only). These are the two biggest decisions for Phase 2 (section 7).
- **The other references split into two groups:** warm/neutral dark sites (Claude, Cursor, Linear, DM Pro, Konvert's hero) and light editorial sites (Marketer, Granola). Both groups share the same rules: product UI is the hero, color is rare, typography does the work.
- **The current adrender.app** is the opposite of this style: cold blue-black, neon gradient borders on every card, gradient buttons, a different headline font (Plus Jakarta Sans), Title Case headings and an app preview of the old app.

---

## 2. Marketer.com — style guide

### 2.1 Measured design tokens

| Thing | Value on marketer.com | Notes |
|---|---|---|
| Page background | `#FFFEFB` (warm cream) | Header uses the same color, no blur |
| Headline color | `#0D2C21` (very dark green) | Body text near-black |
| Second half of headlines | black at 50% opacity | The "two-tone headline" (2.2 #1) |
| Secondary text / small labels | black at 60% | |
| Primary button fill | `#071812` (near-black green), white text | |
| Hairline lines | `rgba(93, 88, 76, 0.10)` (warm grey, 10%) | Page rails, section dividers, FAQ rows |
| Dark band | `#0D2C21` (dark green), white text | Used once per page at most |
| Tinted bands | pale mint and pale warm grey (approx. `#EEF3F0`, `#EAE9E6`) | Quotes, final call to action |
| Display font | **STK Bureau Serif**, weight 400 | Headline 1: 62/68px, tracking -1.24px · Section titles: 48/53 · Story titles: 38/42 · Big stats: 48 |
| Text font | **Roobert** (custom "Marketer Roobert") | Body 16/25.6 · Lead paragraph 20/29 · Nav 15/500 · FAQ questions 20/500 |
| Buttons | Pill (fully round), 15–16px, weight 500 | Primary has a white circle with an arrow inside on the left |
| Product UI frames | White cards, ~12px radius, thin border, soft shadow | Always sitting on a gradient "stage" |
| Content width | ~1100px column with 1px hairline rails on both sides | Gives a "ruled notebook" feel |

### 2.2 Signature patterns (the reusable parts)

1. **Two-tone headline.** Every section title is two short sentences: the first in full color, the second in 50% grey. Example: "Never off the clock." + "Every campaign watched. Your next move, ready to approve." Calm, confident, very readable.
2. **Split hero.** Headline on the left (2 lines), one paragraph on the right aligned to the bottom of the headline, a hairline rule under both, then two buttons (primary pill + secondary pill), then a huge product image.
3. **Product UI on a gradient "stage".** The app UI is never shown bare. It sits on a wide rounded panel filled with a soft, grainy sky-blue gradient (noise texture), so the white UI card glows. Used for the hero and for every feature visual.
4. **Sticky numbered story ("How it works").** Left column: a sticky list "01 Find buyers / 02 Make ads / 03 Run campaigns / 04 Measure revenue / 05 Learn and improve" with the active item highlighted by a vertical bar. Right column: each step has number, serif title, one sentence, a product visual on a stage, then two check-mark captions ("✓ **Bold lead.** short explanation") under it.
5. **Dark green band.** One full-width dark section per page ("Easy to start. Nothing to rebuild.") with an orbit of integration logos around the brand mark, then a 4-step row (Connect, Learn, Approve, Autopilot) separated by thin vertical lines.
6. **Stats row in the serif font.** Three big numbers ("10+", "$500M+", "2,000+") with one small label each, then three customer cards (photo, logo, big number, one line, "See the story ↗").
7. **Tabbed image gallery.** "Distinctive brands. Work made for them." — tabs (Fashion, Beauty, CPG, Home, Wellness) above a masonry of ad images with one large tile in the middle.
8. **Four "ways to work" cards.** Tall image cards with a small label, a two-line serif title, a short paragraph and a text link with an arrow. Some cards are animated (a checklist ticking through steps, ad images rotating).
9. **Fan / arc carousel of ads.** "More ideas to test. More brand in every ad." — ad images laid out in a curved arc around a short centered message.
10. **Tabbed "where you work" demo.** Tabs (Slack / Claude / Codex) switch a mock chat window that shows the product being asked a question.
11. **Integrations strip.** One line of small logos with names, with "All integrations ↗" on the right.
12. **FAQ, two columns.** Two-tone title on the left ("A few good questions. Clear answers."), accordion on the right: 20px questions, + / × icons, hairline rows. First item open.
13. **Full-bleed closing call to action.** Soft blue-grey gradient band, centered two-tone serif headline, one sentence, one pill button.
14. **Footer.** Logo + two-tone serif tagline ("Good judgment. Better marketing.") on the left, then 4 link columns with small grey headers, a hairline, then a small bottom row (copyright left, Privacy / Terms right).
15. **Mega menu.** Opens on hover: 3 columns of links (icon + title + one grey line each, grouped under small grey headers) plus a featured card on the right (image + title + one line).
16. **Arrows everywhere.** Text links end in "↗" (leaves the page) or "→" (goes deeper). Buttons with an arrow-in-circle icon.

### 2.3 Page by page

**Home** — https://www.marketer.com/ (about 13,600px tall)
Order: split hero → product UI on stage (their app: sidebar, tabs, "What we should work on" prompt box, recent projects) bleeding to the next section → customer logo strip → two-tone intro "Never off the clock…" → sticky numbered story (5 steps, each with a stage visual: audiences table, ad cards with metrics, campaigns table, revenue chart, learnings chart) → dark green "Easy to start" band with logo orbit + 4 steps → "Real brands. Measured results." stats + 3 customer cards → "Distinctive brands" tabbed image gallery → "The extension to your growth team" 4 cards → "More ideas to test" ad arc → "Good questions. Closer to the work." tabbed chat demo → "Connected to your next move" integrations strip → "Intelligence behind the work" link row → FAQ → gradient closing call to action → footer.

**Platform** — https://www.marketer.com/platform
Split hero ("Turn your marketing into software.") → a numbered tab row (01 Connect, 02 Understand, 03 Launch, 04 Improve) that switches a text-left / stage-right panel → logo strip → "The future of marketing is software." 3 numbered columns → "Finally, your business in one place." diagram: data sources on the left as small pill cards, dotted lines into a central stage card, tools on the right → "Data and agents, working as one." a 2-column link list (icon, title, grey one-liner, arrow) + a one-line row of use cases → "Start with the software…" 4 columns (one highlighted with a top line) → "Trusted with the accounts…" 4 security points with small icons → customer cards → FAQ → closing call to action.

**Platform feature page (template)** — https://www.marketer.com/platform/intelligence
Breadcrumb ("Platform / Intelligence") → split hero → numbered tab row (01 Performance, 02 Customers, 03 Market) switching text-left / stage-right panels with check-mark bullet lists → mint quote band (large serif quote + name + "Trustpilot review") → two-column FAQ → "Where Intelligence fits." a 3-row link table (title, grey description, arrow) → grey closing call to action. This is the template the other 7 platform pages use.

**Use cases (index)** — https://www.marketer.com/use-cases
Split hero → one wide stage holding five small "work item" cards side by side (Brief, Creative, Campaign, Report, Fix), each with a status chip and an action button → "On the platform." link table (5 rows: name, one-line description, arrow) → "With our teams." link table → closing call to action.

**Use case page (closest to AdRender)** — https://www.marketer.com/use-cases/creative-production
Breadcrumb → split hero ("More ads worth testing. Without the bottleneck.") → an animated 4-step storyboard on a stage (Request → Sources → Angles → Creative), filling in step by step → "See what's working in your creative." a full creative-library UI (ad cards with Winner / Live / In test chips, metrics, tags) with a progress row of 6 numbered steps underneath → **"Gut feel and long queues. Or briefs that learn." — a Without / With comparison: two rows of 3 small illustrated cards (grey row = without, blue-stage row = with)** → "How it works." accordion (01, 02, 03) on the left with a stage visual on the right that changes per step → ad arc ("Different brands. Unmistakably their own.") → mint band with ad images + "50+ finished ads a week" stat → grey closing call to action.

**Apps and integrations** — https://www.marketer.com/apps
Split hero → stage with an orbit of app icons around the Marketer mark → "Connect once. Use it everywhere." with a category tab row (Advertising, Commerce and email, Analytics and data, AI assistants, Workspace and creative) → 3-column grid per category: logo, name, a small green "Native integration" or grey "Custom source" badge, one-line description.

**Creative Team (the dark page)** — https://www.marketer.com/creatives
**Black hero** with a slowly appearing wall of vertical ad thumbnails (each with a tiny "Static" / "Video" label) fading out toward the edges; headline bottom-left in the serif ("Scale your 8-9 figure brand profitably with data-backed creatives"), white primary pill. The header switches to dark on this page. Below: mint band "Full creative suite" with 4 tall image cards (Ad creatives, Video ads, Product shots, Web creative) → "Ads we've made. Pick your industry." tab row + large ad images → "The Marketer effect." a horizontal carousel of brand logo + huge green number + one line, with "01 / 10" and arrow buttons.
*This is the most relevant page for AdRender: a dark hero built from a wall of real ad creatives.*

**Pricing** — https://www.marketer.com/services (footer "Pricing" links here)
Split hero ("Built around what you need.") → 4 tall image cards (Platform, + Creative Team, + Growth Team, Custom deployment) → 4 columns with title, paragraph, check list, link → "What shapes the scope." photo left + numbered accordion right → "The work, in numbers." stats → mint quote band → "Pricing, answered." FAQ → grey closing call to action. No price table (they sell by scope; AdRender's public price table stays).

**Customer stories** — https://www.marketer.com/case-studies
Split hero → a row of 5 image cards (photo, brand, big serif number, one line, ↗) → logo strip → more stories.

**Case study** — https://www.marketer.com/case-studies/trip
Breadcrumb → split hero ("350+ assets. Still unmistakably TRIP.") → full-width row of 4 large ad/product images → story sections.

**Company** — https://www.marketer.com/company
Split hero ("Good people. Serious about growth.") → one huge editorial photo in a rounded frame.

**News (blog)** — https://www.marketer.com/news
Split hero ("What's next. What works.") → framed panel "Find your next read." with category pills (selected pill = black fill) → article list (currently empty on their site).

**Book a demo** — https://www.marketer.com/demo
No nav, just the logo. Left: serif headline, 3 small icon bullet points, "Trusted by 2,000+ businesses" + logos, a short quote, 3 ad images. Right: form on a gradient stage (grey filled inputs, small labels, black full-width "Pick a time" pill).

Not visited: Growth Team, Custom deployment, Careers, Partners, the other platform / use case sub-pages. From the menus and footer they use the same templates as the pages above.

### 2.4 Motion seen on Marketer
- Hero and section visuals fade/slide in on scroll; the sticky story highlights the active step as you scroll.
- Status animations inside product cards (a checklist ticking "Research → Creative → Launch", "Waiting for you" → "Done").
- Rotating ad images inside cards; the Creative page's ad wall appears tile by tile.
- Storyboard steps fill in one after another (creative-production hero).
- Mega menu opens on hover with a soft fade. Nothing bounces; everything is slow and quiet.

---

## 3. Other reference sites

| # | Site | Look | Borrow | Avoid |
|---|---|---|---|---|
| 1 | **Marketer** — https://www.marketer.com/ | Light cream, serif + sans, hairline rails, product on grainy gradient stages | Everything in 2.2; the creative-production page structure; the dark ad-wall hero from /creatives | Serif + light as-is if we stay dark/Inter (section 7) |
| 2 | **Claude** — https://claude.com/ | Warm near-black `#141413` (in dark mode), serif display + sans text, very few elements | Warmth of the dark (proof that dark can feel calm, not "techy"); centered pricing cards with tiny illustrations; centered serif FAQ | Photo-led hero — AdRender's hero should be the product |
| 3 | **DM Pro** — https://www.dmpro.ai/ | Neutral dark `#161616`, **Inter**, centered 96px hero, real app UI below with a soft fade | Closest match to our app's type (Inter, sentence case, small caps-free labels); app shown full-width as a "browser window"; bento grid of feature cards, each with a small live UI piece; "Get started ↗" + "Book a demo" pair | Uppercase tracked labels ("/ FEATURES") — our DESIGN.md bans them |
| 4 | **Konvert** — https://usekonvert.com/ | Black hero with a purple glow, then white below | Hero = **their template gallery inside the app frame** (almost exactly AdRender's Browse Templates); product frame overlapping the next section | Purple glow and the black→white switch; Satoshi font |
| 5 | **Cuttable** — https://www.cuttable.com/ | Light grey, purple accents | **Scrolling row of real ads with a "Recreate this ad ↗" chip on each** — a direct fit for "Browse templates → render your version"; proof chip above the headline ("200,000+ ads created with AI") | Saturated purple buttons and two-color headline; busy decorative shapes |
| 6 | **Statiq** — https://www.statiq.club/ | Navy, very loud | Clear audience line under the headline; 1-2-3 Problem cards with large ghosted numbers (as used in July) | Script fonts, floating stickers, saturated card colors — far from "calm and premium" |
| 7 | **AdCreative** — https://www.adcreative.ai/ | Light lavender, many floating cards | Nothing visual beyond the wide text-left / visual-right card already used | Clutter: floating screenshots, badges, overclaims ("#1 most used"), pink gradient buttons |
| 8 | **Linear** — https://linear.app/ | Near-black, Inter-style sans, white + grey two-tone sentences | Two-tone sentence intro (same idea as Marketer, in a dark sans version); real app UI with sidebar as hero; numbered 3-column principles with thin line illustrations | Cold black; very small, low-contrast grey body text |
| 9 | **Cursor** — https://cursor.com/ | **Warm dark `#14120B`**, product windows on painted landscape backdrops | Dark-mode version of Marketer's "stage": product UI on a soft image backdrop; alternating text-left / product-right feature rows in rounded panels | Painting backdrops are their brand — use our own gradient instead |
| 10 | **Granola** — https://www.granola.ai/ | White, editorial serif, hand-drawn icons, dashed grid lines | Dashed/hairline grid framing; big type; product window beside the headline | Very large serif headlines (only if we choose a serif) |
| — | **ClimbX** | Not found | — | Could not find the official site (searches return climbing apps). Please send the link or a screenshot. |

---

## 4. Common patterns that make this style work

1. **The product is the hero.** Real app UI, large, high fidelity, usually right under the headline and often bleeding into the next section. No stock illustrations.
2. **The product sits on a "stage".** A soft gradient or image panel behind the UI so it looks premium instead of like a flat screenshot (Marketer: grainy sky gradient; Cursor: paintings; DM Pro / Konvert: soft glow).
3. **Very little color.** Neutrals do 95% of the work; one accent appears in tiny places (a chip, a check mark, a chart line).
4. **Typography carries the hierarchy.** Big, tight headlines (negative letter-spacing), one short paragraph, lots of space. Two-tone headlines add rhythm without color.
5. **Short, plain copy.** Two short sentences per headline; one sentence per card; check-mark captions with a bold lead.
6. **Repeated, predictable sections.** Every page reuses the same 6–8 blocks (split hero, logo strip, numbered story, link table, stats, FAQ, closing call to action), so the site feels like one product.
7. **Hairlines and background shades instead of boxes.** Few borders, no heavy shadows, no colored outlines.
8. **Pill buttons, max two per area.** One primary (solid), one secondary (outline or ghost), often with an arrow.
9. **Quiet motion.** Fade/slide on scroll, small status animations inside the product, slow carousels. Nothing flashy.
10. **Proof close to the claim.** Logos under the hero, a stat next to the feature it proves, a quote band between sections.

---

## 5. Current adrender.app — what's off-style today

Seen on Nov 8, 2026 (homepage, about 11,100px tall):
- **Colors:** cold blue-black background `#0A0A0F`; neon gradient borders on cards (cyan, purple, orange, green); cyan→purple gradient buttons; colored numbers in the pricing tables; dot-grid backdrop behind the hero.
- **Fonts:** headings in **Plus Jakarta Sans**, body in Inter — the app is Inter only.
- **Case:** Title Case headings ("How It Works", "Proven templates", "Batch rendering").
- **Hero app preview:** shows the **old app** (logo + plan block top-left, "Image | Video" pills, old Lucide icons, "My Ads Library", bright teal plan card).
- **How it works:** three big boxes with large colored "01/02/03", each in a different neon border color.
- **Feature cards:** 4 dark cards with colored icon + colored title + "Learn more ●" green button.
- Elements that can stay as content: announcement bar, URL field + "Render my ads" in the hero, "What 1 token buys" tables, stack-cost comparison, FAQ, founder story.

Current routes (keep all of them for SEO): `/`, `/faq`, `/solutions` + 16 solution pages (creative-fatigue, too-many-tools, no-design-skills, not-ai-slop, no-prompt-engineering, no-filming, replace-an-agency, fast-brand-setup, solo-founder, transparent-pricing, multi-client-agencies, photo-to-full-ad, full-catalog-scale, test-before-spending, tiktok-ad-maker, instagram-ad-maker), `/blog` (+ comparisons and posts like `/blog/adrender-shopify-app`), `/about` (with anchors #founder-story, #templates, #easy-to-use, #brands, #generation, #sizes, #library, #playground, #workspaces, #stack), `/affiliates`, `/contact`, `/terms`, `/privacy`.

---

## 6. Screenshot list (image examples to keep)

The screenshots taken during this research could only be viewed inside the chat; the browser did not save them as files that can be handed over. This list says exactly what to capture (about 10 minutes with Cmd+Shift+4 at a 1440px-wide window). Suggested folder: "AdRender Redesign/Website references".

| # | Page | What to capture | Use later for |
|---|---|---|---|
| M1 | marketer.com/ | Top of page: split hero + buttons + top of the product stage | Hero layout |
| M2 | marketer.com/ | Full product stage (their app on the blue grainy gradient) | Hero app preview framing |
| M3 | marketer.com/ (scroll ~2,000px) | Sticky numbered story: "02 Makes the ads" with ad cards on a stage + check captions | How it works section |
| M4 | marketer.com/ (scroll ~5,500px) | Dark green "Easy to start" band with the logo orbit and 4 steps | Integrations / Shopify band |
| M5 | marketer.com/ (scroll ~6,300px) | "Real brands. Measured results." stats + customer cards | Proof section |
| M6 | marketer.com/ (scroll ~9,500px) | "The extension to your growth team" 4 cards | Feature cards |
| M7 | marketer.com/ (scroll ~10,300px) | Ad arc "More ideas to test" | Templates / ad gallery section |
| M8 | marketer.com/ (bottom) | FAQ + closing call to action + footer | FAQ, call to action, footer |
| M9 | marketer.com/ | Platform mega menu open (hover "Platform") | Nav menus |
| M10 | marketer.com/creatives | Dark hero with the wall of ads (wait 4 seconds for it to fill) | Dark hero option |
| M11 | marketer.com/use-cases/creative-production | Hero storyboard + "Without / With" comparison | How it works / comparison pages |
| M12 | marketer.com/use-cases/creative-production | "See what's working in your creative" library UI | Library feature visual |
| M13 | marketer.com/platform/intelligence | Numbered tab row + text-left / stage-right panel | /about feature sections |
| M14 | marketer.com/apps | Category tabs + 3-column integration grid with badges | Integrations / Shopify page |
| M15 | marketer.com/services | 4 cards + columns with check lists | Pricing page header |
| M16 | marketer.com/demo | Form on a gradient stage | Contact page |
| R1 | dmpro.ai | Hero with Inter headline + app below | Dark Inter hero |
| R2 | dmpro.ai (scroll ~1,900px) | Bento feature grid | Feature grid |
| R3 | usekonvert.com | Hero with template gallery in the app frame | Hero content idea |
| R4 | cuttable.com (scroll ~1,000px) | Ad row with "Recreate this ad" chips | Templates section |
| R5 | cursor.com | Warm dark page with product on a backdrop | Dark stage idea |
| R6 | linear.app (scroll ~1,500px) | Two-tone sentence intro + 3 numbered columns | Dark two-tone headline |
| R7 | claude.com (pricing area) | Warm dark pricing cards + FAQ | Pricing / FAQ in dark |

---

## 7. Open questions for the Phase 2 discussion

1. **Light or dark site?** Marketer is light; the app defaults to dark with a light mode. Options: (a) dark by default using the app's dark tokens, with the same light toggle the app has; (b) light by default like Marketer; (c) mostly light pages with one dark band per page (Marketer's own approach), using the app's dark tokens for the band and the product stage.
2. **Headline font.** Marketer's look depends on its serif. Options: (a) Inter only, like the app (Linear / DM Pro prove it works); (b) add one serif for big headlines on the site only.
3. **The product "stage" color.** Marketer uses a grainy sky-blue gradient. Ours could be a grainy version of the brand gradient (blue → violet → orange) kept very soft, or warm neutral grain.
4. **Ad wall / ad row content.** A wall or row of ads (Marketer /creatives, Cuttable) fits "100M+ real ads", but template thumbnails are other brands' ads. Using AdRender renders made for demo brands avoids showing other brands' work.
5. **ClimbX:** please send the link or a screenshot.
