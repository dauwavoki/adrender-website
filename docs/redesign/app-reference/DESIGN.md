# AdRender — DESIGN.md (UI redesign)

Version 5.6 · Nov 7, 2026 · Status: foundation, sidebar, component recipes (section 8), Lucide→Phosphor map (6.1), v4 fixes (segmented contrast, card hover, color tiles, welcome quote, library card, playground bottom bar; v5: sidebar top row, sliding highlight, status tab bar, quote rotation, upscale-failed tag). Screens are added section by section.

This file is the single source of truth for the AdRender UI redesign. Every UI prompt follows it. When a screenshot and this file disagree, this file wins.

---

## 0. Hard rules (read first)

1. **UI only.** Change markup, classes, styles and icons. Never change data fetching, contexts, hooks' logic, API calls, Supabase code, billing/Stripe code, routing behavior, or what a button *does*. Moving a button is fine; changing its handler is not.
2. **Shopify app is off-limits.** Never edit anything under `src/shopify/`. These shared components are used by the Shopify app too — do not change their markup or props. Restyle only by wrapping them or by styling the container around them:
   `src/components/PersistentMuteVideo.tsx`, `src/components/GridSkeleton.tsx`, `src/components/SearchFilterPill.tsx`, `src/components/DismissableMenu.tsx`, `src/components/EndOfResults.tsx`, `src/components/RecentSearchesPanel.tsx`, `src/components/ReferenceImagesCounter.tsx`.
3. **Admin matches client.** Admin shell and admin-only pages use the same tokens, components and sidebar style.
4. **Use tokens, never raw hex in components.** All colors come from the tokens in section 1. If a value is missing, add a token here first.
5. **File ownership.** Each prompt lists the files it owns. Edit only those files; swap their icons to Phosphor in the same prompt (section 6 and 6.1). If something outside your files needs changing, report it instead of changing it.
6. **Both themes.** Every change must work in dark (default) and light (`html.light`).

---

## 1. Color tokens

Warm neutrals, sampled from the reference (Marketer). No cold blue-grays. Color appears only in small, meaningful spots.

Define these as CSS variables in `src/index.css` (`:root` / `html.dark` for dark, `html.light` for light) and expose them through Tailwind v4 `@theme` so classes like `bg-surface` and `text-secondary` work.

| Token | Dark | Light (first pass, tune on preview) | Use |
|---|---|---|---|
| `--bg-page` | `#161616` | `#FAFAF9` | Main content background |
| `--bg-sidebar` | `#191919` | `#F4F3F1` | Sidebar |
| `--bg-surface` | `#191919` | `#FFFFFF` | Cards, panels, secondary buttons |
| `--bg-raised` | `#1C1C1C` | `#FFFFFF` | Menus, drop-ups, popovers |
| `--bg-inset` | `#202020` | `#F4F3F1` | Card inside a menu (plan card), banners |
| `--bg-input` | `#212121` | `#F2F1EF` | Inputs, selects, textareas |
| `--bg-hover` | `#212121` | `#EFEEEC` | Hover on rows and ghost buttons |
| `--bg-selected` | `#262626` | `#E9E8E5` | Selected nav item, selected tab |
| `--bg-soft` | `#2A2928` | `#ECEBE8` | Soft buttons, segmented control track |
| `--border` | `#272727` | `#E6E4E1` | Default 1px border, dividers |
| `--border-strong` | `#353432` | `#D6D3CF` | Focused/hovered borders |
| `--text-primary` | `#DAD8D3` | `#1F1E1D` | Titles, values, selected items |
| `--text-secondary` | `#A39E98` | `#6B6763` | Nav items, labels, inactive tabs, helper text |
| `--text-muted` | `#807C78` | `#8E8A85` | Placeholders, timestamps, disabled |
| `--btn-primary-bg` | `#F6F5F4` | `#1F1E1D` | The one primary button per screen |
| `--btn-primary-text` | `#161616` | `#FAFAF9` | Text on primary button |
| `--success` | `#52AD50` | `#2F8A3B` | Ready, approved, credits bar |
| `--warning` | `#E5A33D` | `#B9770E` | Rendering dot, low tokens |
| `--danger` | `#E5484D` | `#C9353A` | Destructive confirm only |
| `--focus-ring` | `#A39E98` | `#6B6763` | 2px focus outline |
| `--accent` | `#8B6CF0` | `#6A48D6` | Subtle brand accent: toggle ON, focus glow, applied-filter dot, progress |
| `--accent-soft` | `rgba(139,108,240,0.14)` | `rgba(106,72,214,0.10)` | Soft accent fill (selected chip tint, accent badges) |
| `--success-soft` | `rgba(82,173,80,0.14)` | `rgba(47,138,59,0.10)` | Staged / approved badge fill |
| `--warning-soft` | `rgba(229,163,61,0.14)` | `rgba(185,119,14,0.10)` | Rendering / low badge fill |
| `--danger-soft` | `rgba(229,72,77,0.14)` | `rgba(201,53,58,0.10)` | Failed badge fill |

Brand gradient (logo colors) — use only for the AdRender icon and the Library "Ready" border:
- Dark: `#4F8DF7 → #9B6BF2 → #FF8A3D`
- Light: `#1F5FD6 → #7340D4 → #E8650F`

Color stays subtle: no saturated blue/purple/green **fills** on buttons or tabs. Allowed color: the `--accent` on toggle ON tracks and focus glows, colored **icons** inside neutral buttons/chips (e.g. a green check on Approve), and the `*-soft` status badges. AdRender keeps more color than Marketer, but always small and soft.

---

## 2. Typography

Font: **Inter** (already loaded). Mono: JetBrains Mono (only for codes/IDs).
Sentence case everywhere. **No uppercase labels and no wide letter-spacing** (e.g. "BRAND OR CAMPAIGN" becomes "Brand or campaign").

| Role | Size / line height | Weight | Color |
|---|---|---|---|
| Page title | 24 / 32 | 600 | primary |
| Section title | 16 / 24 | 600 | primary |
| Body, nav items, buttons, inputs | 14 / 20 | 400 (buttons 500) | primary or secondary |
| Labels, helper text, tabs | 13 / 18 | 400 (active tab 500) | secondary |
| Meta (dates, counts, badges) | 12 / 16 | 500 | secondary or muted |

---

## 3. Spacing, radius, borders, shadows

- Spacing on a **4px grid**: 4, 8, 12, 16, 20, 24, 32, 40, 48.
- Radius: **6px** small chips/badges · **8px** buttons, inputs, nav items, tabs · **12px** cards, menus, drop-ups · **16px** large panels/modals · **full** only for avatars, toggles, status dots.
- Borders: 1px `--border`. Separate areas mainly by background shade, not lines.
- Shadows: none on cards. Menus/drop-ups only: `0 8px 24px rgba(0,0,0,0.35)` dark, `0 8px 24px rgba(0,0,0,0.10)` light.

---

## 4. Buttons

All buttons: radius 8px, 14px text weight 500, icon 16px with 6px gap, icon same color as text, sentence case.

| Size | Height | Side padding |
|---|---|---|
| Small | 28px | 10px |
| Default | 32px | 12px |
| Large (main action only, e.g. Render) | 40px | 16px |

| Variant | Fill | Border | Text | Hover |
|---|---|---|---|---|
| **Primary** (max one per screen) | `--btn-primary-bg` | none | `--btn-primary-text` | 90% opacity |
| **Secondary** (most buttons) | `--bg-surface` | 1px `--border` | `--text-primary` | border `--border-strong`, fill `--bg-hover` |
| **Soft** (chips/actions on cards) | `--bg-soft` | none | `--text-primary` | slightly lighter |
| **Ghost** (toolbar, icon-only) | none | none | `--text-secondary` | fill `--bg-hover`, text primary |
| **Danger** (only inside a confirm) | `--danger` | none | white | 90% opacity |

Icon-only buttons are square (28/32/40) and must have an `aria-label` and a tooltip. Trash/delete icons are ghost and only turn `--danger` on hover.

Segmented control (Image/Video, Light/Dark, Resolution, Model, etc.): track `--bg-soft`, radius 8, 2px inner padding. Selected segment (`--bg-segment`): dark `#3A3836` with 1px `--border-strong` (must be clearly lighter than the track); light white with 1px `--border`.
- **Dark mode:** selected segment text + icon `#F6F5F4` with a soft shine `text-shadow: 0 0 8px rgba(255,255,255,0.35)` (icon: `filter: drop-shadow(0 0 4px rgba(255,255,255,0.35))`); unselected text + icon `--text-muted`.
- **Light mode:** selected `--text-primary`, unselected `--text-secondary`, no shine.

---

## 5. Sidebar (client and admin)

- Width 256px expanded, 60px collapsed (keep the existing collapse toggle and its state logic).
- Background `--bg-sidebar`, 1px `--border` on the right edge. Padding 8px.
- Nav item: height 32px, padding 0 10px, gap 8px, radius 8px, 14px text, 16px icon.
  - Default: text `--text-secondary`, icon Regular.
  - Hover: fill `--bg-hover`.
  - Selected (current route): fill `--bg-selected`, text `--text-primary`, icon **Fill** weight.
- Section label (e.g. "Admin"): 12px, `--text-muted`, sentence case, 16px top margin, 8px bottom, 10px left padding.
- Collapsed: icons only, centered, tooltip with the label on hover. Never truncated labels.
- **Sliding highlight:** the selected background slides softly to the newly selected item (as on `main`, e.g. a shared `motion` `layoutId`, ~250ms spring/ease). Applies to sidebar nav and to every segmented control / tab bar.

### 5.1 Order, top to bottom
1. **Top row:** expanded = Image/Video segmented control (existing `ClientModeToggle` logic) filling the row, with the ghost icon-only collapse button `CaretDoubleLeft` ("Collapse sidebar") on the same row to its right. Collapsed = no expand arrow (see 5.8); the selected mode's icon in a color icon tile (8.19) is the top item: Image = blue, Video = green (clicking switches mode). Existing `NavShellContext` logic.
2. *(merged into row 1)*
3. **AdRender** → `/app/home` (admin: `/admin/home`, see 5.6). Icon: `AdRenderHomeIcon` (`selected` when on Home). Label weight 500.
4. **Library** → `/app/ads-library` (see 5.2). Replaces "My Ads Library" and the separate `AdsStatusBadge` box.
5. Browse Templates → `/app/templates`
6. Saved Templates → `/app/my-templates`
7. Ad Playground → `/app/ad-playground`
8. Brands & Campaigns → `/app/brands`
9. *(admin only)* **32px of space** (no line), then section label "Admin", then Tickets, Stuck Renders, Customers, Banking, Affiliates, Docs, Settings (existing grant checks unchanged; Affiliates uses the grant that Settings > Affiliates used). The gap keeps the admin group clearly apart from the client items above.
10. Flexible space.
11. **Workspace button** (client only, see 5.4). *(admin only)* **Preview as Client** sits here instead, as a nav item (`Eye`) directly above the Tokens row, with a 1px `--border` line above it — moved to the bottom so it isn't clicked by accident. Same handler as today.
12. **Tokens row:** Coins icon + "91 tokens" (existing count + `AnimatedTokenCount`) on the left, ghost "Top up" on the right (existing handler). Admin keeps "Test tokens" the same way.
13. **Profile button** (see 5.3).

Removed from the sidebar top: the logo image, the "AdRender" wordmark and the plan line.

### 5.2 Library item states
Uses the existing counts (`AdsLibraryCountsContext` / `VideoLibraryCountsContext`) and the existing click/reset behavior of `AdsStatusBadge`. Display only — no new data logic.

| State (priority order) | Shows | Border |
|---|---|---|
| 1. Unseen ready ads exist | `CheckCircle` + "Ready" + count | Animated brand-gradient border (5.7) |
| 2. Else, something rendering | Rendering dots (5.7) + "Rendering" + count | none |
| 3. Else | `Books` + "Library" | none |

Clicking while "Ready" opens the Ready tab and resets exactly as `AdsStatusBadge` does today. Collapsed sidebar: icon + small count badge; Ready keeps the animated border.

### 5.3 Profile button and drop-up
- Button: 40px tall, radius 8, avatar 24px, display name 14/500 primary, email 12 secondary (truncate email only), `CaretUpDown` on the right. Hover `--bg-hover`.
- Drop-up opens **above** the button, same width as the sidebar minus 16px, `--bg-raised`, 1px `--border`, radius 12, menu shadow, 6px padding. Closes on outside click and Escape.
- Contents, top to bottom (dividers = 1px `--border`):
  1. Avatar + name + email
  2. `UserCircle` Profile & account → `/app/profile`
  3. `CreditCard` Plans & billing → `/app/profile?tab=billing`
  4. `Sun`/`Moon` Appearance — inline segmented **Light | Dark** using the existing `ThemeProvider` setter (same as `AppearanceSetting`)
  5. — divider —
  6. Plan card (`--bg-inset`, radius 8, 12px padding): plan name, tokens count, "Top up" secondary small button (existing handler)
  7. — divider —
  8. `SignOut` Sign out (existing `onSignOut`)
- Menu row: 32px, radius 6, 14px, icon 16 `--text-secondary`, hover `--bg-hover`.
- Collapsed sidebar: profile button shows the avatar only; menus open to the **right** of the sidebar instead of upward.

### 5.4 Workspace button and drop-up (client only)
- Sits directly above the Tokens row. Same shape and behavior as the profile button (40px, radius 8, hover `--bg-hover`, `CaretUpDown` on the right).
- Left: workspace icon, 16px, `--text-secondary` — Phosphor `UserCircleCheck` for the Personal workspace (fixed, never changeable), the team workspace's chosen icon, or `UsersFour` when that icon is null or unknown (5.4.1). Then the workspace name (14/500 primary) and the existing second line ("Workspace", "Member", "Owner") in 12px secondary.
- Drop-up (same style as 5.3, opens upward): list of workspaces from the existing `WorkspaceSwitcher` data, each with its icon, name and role line; current one has `Check`; selecting uses the existing switch handler (including the deleted-workspace toast). Divider. `Plus` "Create workspace" → existing `CreateWorkspaceModal`.
- Collapsed sidebar: icon only; menu opens to the right.

#### 5.4.1 Workspace icon
- Team workspaces can pick an icon; **only the owner** sees the picker. **Personal cannot change its name or icon** (always `UserCircleCheck`). `UserCircleCheck` and `UsersFour` are never offered in the picker. Default for team workspaces: `UsersFour` (stored as null). A Default control in the picker clears a custom icon back to that.
- Picker lives next to the name field when creating or renaming a team workspace: a 32px square button showing the current icon; click opens a grid popover (`--bg-raised`, radius 12) of 32px icon tiles (Regular weight, selected tile `--bg-selected`). Below 768px the same grid opens as a bottom sheet.
- **No search.** Filter chips only (small soft buttons): All, People, Users, Smileys, Sports, Games, Travel, Social, Logos. Icon list per chip: `docs/design/workspace-icons.json` (318 unique icons; chips overlap).
- The picker and its icon map load lazily (only when opened or when a custom icon must render) so the app's main bundle doesn't grow.
- The chosen icon shows on the workspace button (expanded and collapsed), in the workspace drop-up, and in the phone More sheet's workspace list.

### 5.5 Quiet warnings (no colored blocks)
- **Low tokens:** when the existing low-token condition is true, the Tokens row's Coins icon and number use `--warning`. Nothing else changes.
- **Failed renders:** when the existing "failed unseen" condition is true, show a 6px `--danger` dot at the right end of the Library item (and on its icon when collapsed). It does not replace the Ready/Rendering/Library state.
- **Admin counts:** Tickets and Stuck Renders show their existing counts as a small badge at the right: 12px/500, `--bg-soft` fill, radius 6, 0 6px padding, `--text-secondary` (Stuck Renders count uses `--warning` text when above zero). Collapsed: 6px dot on the icon.

### 5.6 Admin Home (route exception)
Admin had no Home page. Add route `/admin/home` rendering the same Home view clients use (`src/views/DirectHomeView.tsx`), and point admin's AdRender item there. Admin's existing default/landing route stays the same. Second allowed routing change (Nov 6): Affiliates moves out of Settings to its own page `/admin/affiliates` (sidebar item, `Handshake` icon); the old Settings > Affiliates link redirects there.

### 5.7 Motion
- Hovers/transitions: 150ms ease-out.
- **Ready border:** 1.5px border drawn with a rotating conic gradient of the brand colors (dark/light set by theme), one rotation per 3s, linear, infinite while in Ready state.
- **Rendering dots:** 3 dots 3px wide, `--warning`, each fading 30%→100% opacity, 1.2s loop, staggered 0.2s.
- `prefers-reduced-motion`: no rotation or pulsing — static brand border and static dots.

### 5.8 Hover-peek sidebar
- **Shape:** the sidebar is a floating panel in every state: 8px gap from the window's top, bottom and left edges, radius 16, `--bg-sidebar`, 1px `--border`; when peeking it also gets the menu shadow.
- **Keep sidebar open** (setting): a toggle row (8.3) in the profile drop-up, directly under Appearance, client and admin. On (default, same as today) = pinned open. Off = collapsed icon rail with hover-peek. Saved per device in `localStorage` key `adrender-sidebar-pinned` (wrapped in try/catch; falls back to On). The `CaretDoubleLeft` button shown when pinned open turns the setting Off (same state).
- **Collapsed:** icon rail only (60px), **no expand arrow** (the colored mode icon is the top item). The moment the mouse crosses the rail's edge (anywhere on the rail, not just on an icon), the full panel **pops out over the page** (overlay — the page does not shift). Animation: 200ms ease-out, width grows from the rail while labels fade in; closing 150ms. Reduced motion: instant.
- **Closing:** when the mouse leaves the panel, close after 300ms (cancel if it comes back). Never close while a drop-up/menu inside it is open. Also closes on Escape and after clicking a nav item.
- **Touch devices (no hover):** tapping the rail opens the panel; tapping outside closes it.

### 5.9 Content card
Everything that isn't the sidebar sits inside ONE large floating card to the right of the sidebar: 8px gap from the sidebar and from the window's top, right and bottom edges, radius 16, `--bg-page`, 1px `--border`, `overflow: hidden` (content scrolls inside it). Sub-panels (Library / Saved Templates collections), the Playground and Duplicator left panels and the results areas live inside this card, separated by 1px `--border` lines — no separate floating blocks. Full-page overlays inside the page area (Ad Duplicator) fill this card exactly. Hover-peek still floats above it.

---

## 6. Icons

Library: **Phosphor** (`@phosphor-icons/react`). Default **Regular**, 16px in nav/buttons/menus, 20px for standalone toolbar icons. Selected nav items use **Fill**. Color inherits text color. Lucide is removed screen by screen; the last prompt removes `lucide-react`.

| Spot | Icon |
|---|---|
| AdRender (Home) | `AdRenderHomeIcon` (custom) |
| Library (idle / rendering / ready) | `Books` / rendering dots / `CheckCircle` |
| Browse Templates | `SquaresFour` |
| Saved Templates | `BookmarkSimple` |
| Ad Playground | `MagicWand` |
| Brands & Campaigns | `Megaphone` |
| Image / Video switch | `Image` / `VideoCamera` |
| Collapse sidebar (pinned mode only) | `CaretDoubleLeft` |
| Tokens | `Coins` |
| Admin: Tickets, Stuck Renders, Customers, Banking, Affiliates, Docs, Settings | `Ticket`, `WarningCircle`, `Users`, `Bank`, `Handshake`, `BookOpenText`, `Gear` |
| Profile drop-up: Profile & account, Plans & billing, Appearance, Top up, Sign out | `UserCircle`, `CreditCard`, `Sun`/`Moon`, `Plus`, `SignOut` |
| Workspace button + drop-up: Personal, team default, selected, Create workspace | `UserCircleCheck`, `UsersFour`, `Check`, `Plus` |
| Profile / workspace button arrow | `CaretUpDown` |

### 6.1 Lucide → Phosphor replacement map

Use these when swapping a screen's icons. Regular weight by default; Fill only for selected/active states. If an icon is not in this list, pick the closest Phosphor icon and list it in your report.

| Lucide | Phosphor | | Lucide | Phosphor |
|---|---|---|---|---|
| Loader2 | CircleNotch (add `animate-spin`) | | Lock | Lock |
| X | X | | Star | Star |
| Plus / Minus | Plus / Minus | | ExternalLink | ArrowSquareOut |
| Search | MagnifyingGlass | | PanelLeftOpen / PanelLeftClose | SidebarSimple |
| Trash2 | Trash | | GripVertical | DotsSixVertical |
| Check / CheckCircle2 | Check / CheckCircle | | Library | Books |
| ChevronDown/Up/Left/Right | CaretDown/Up/Left/Right | | ListChecks | ListChecks |
| ArrowRight / ArrowLeft / ArrowUpRight | ArrowRight / ArrowLeft / ArrowUpRight | | Pencil | PencilSimple |
| Download / Upload | DownloadSimple / UploadSimple | | ZoomIn | MagnifyingGlassPlus |
| Zap | Lightning | | Volume2 / VolumeX | SpeakerHigh / SpeakerSlash |
| Sparkles | Sparkle | | Palette | Palette |
| Wand2 | MagicWand | | ListFilter | FunnelSimple |
| Image / Images | Image / Images | | Facebook / Instagram / Youtube / Linkedin | FacebookLogo / InstagramLogo / YoutubeLogo / LinkedinLogo |
| Video / Play | VideoCamera / Play | | Globe | Globe (use TiktokLogo where it currently stands for TikTok) |
| Clock | Clock | | Lightbulb / Rocket / Package | Lightbulb / Rocket / Package |
| AlertCircle / AlertTriangle | WarningCircle / Warning | | Layers | Stack |
| Info | Info | | BarChart3 | ChartBar |
| RefreshCw / RotateCcw | ArrowsClockwise / ArrowCounterClockwise | | Bookmark | BookmarkSimple |
| Tag | Tag | | Coins / CreditCard | Coins / CreditCard |
| Folder / FolderHeart / FolderCheck / FolderOpenDot / FolderInput | Folder / FolderSimpleStar / FolderSimple / FolderOpen / FolderSimplePlus | | FileText / ShoppingBag / Link / Link2 | FileText / ShoppingBag / Link / LinkSimple |
| LayoutGrid / List / Layout | SquaresFour / ListBullets / Layout | | UserCircle / Users / UserMinus | UserCircle / Users / UserMinus |
| ShieldCheck / Shield / Crown / Copy | ShieldCheck / Shield / Crown / Copy | | LogOut | SignOut |
| Handshake / TrendingUp / XCircle | Handshake / TrendUp / XCircle | | CalendarClock | CalendarDots |
| Megaphone / Split / Ticket | Megaphone / ArrowsSplit / Ticket | | Award / Banknote / Landmark | Medal / Money / Bank |
| MessageCircle / Send | ChatCircle / PaperPlaneRight | | Building2 / LifeBuoy | Buildings / Lifebuoy |
| History / Mail | ClockCounterClockwise / Envelope | | MoreHorizontal | DotsThree (phone More) |

---

## 7. Phone layout (decided with Mark, Nov 7)

**Breakpoint:** phone layout below 768px wide. 768px and up keeps the desktop layout (the sidebar uses its collapsed rail + hover-peek / tap-to-open on tablets). Every CLIENT screen must work on a phone. Admin is desktop-only (7.6).

### 7.1 App frame on phone
- No sidebar, no floating content card. Content fills the screen edge to edge with 16px side padding.
- **Top header (56px):** left = page title (16/600); right = Image | Video segmented control (compact, icon + short label) and the tokens chip (Coins + count; tap opens Top up). The header stays fixed at the top; content scrolls under it.
- **Bottom bar (64px + safe-area inset, fixed):** five items, icon (22px) over label (11px): **Library · Browse · Playground · Saved · More**. Selected = Fill icon + `--text-primary`; others `--text-secondary`. Library keeps its states (Ready gradient ring / rendering dots / failed dot) as a badge on its icon. Playground opens the Image or Video Playground matching the current mode.
- Respect `env(safe-area-inset-bottom)` / top for notched phones.

### 7.2 More (bottom sheet)
Tapping More opens a bottom sheet (`--bg-raised`, radius 16 top corners, drag handle, closes on swipe down / backdrop tap). List, top to bottom:
1. Home (AdRender icon)
2. Brands & Campaigns
3. Affiliate (approved affiliates only, with the new-announcement dot)
4. — divider —
5. Workspace (current workspace row; tap opens the workspace list sheet, same data/handlers as 5.4)
6. Profile & account
7. Plans & billing
8. Tokens + Top up
9. Appearance (Light | Dark)
10. — divider —
11. Sign out
Rows 48px, icon 20px, label 15px.

### 7.3 Tool screens: CapCut style (Image/Video Playground, Image/Video Duplicator)
- **Top area (fills the space above the tools):** the results grid (2 columns) with the newest render first; rendering cards show progress. Empty state: a short hint + sample.
- **Prompt bar:** directly above the tool row — a one-line prompt field showing the current prompt (tap to expand into a full-height editor sheet with Improve / History).
- **Tool row:** horizontally scrollable icons (24px) with 11px labels. Playground: Brand · Photos · Model · Resolution · Size (+ Variation toggle in Brand sheet). Duplicator: Template · Brand · Photos · Model · Resolution · Size. A tool with a value set shows a small dot/summary under its label.
- **Each tool opens a bottom sheet** with exactly the controls that section has on desktop (same components, same handlers), sheet height to content (max 85%), "Done" closes it.
- **Render button:** full width, 48px, primary, with the cost line ("1 token · 1K") inside or right above it. Always visible above the bottom bar.
- Tapping a result opens the same details view as desktop (full-screen sheet on phone).

### 7.4 Grid and list screens (Library, Browse, Saved Templates, Brands)
- Cards in a 2-column grid (gap 8px); media keeps its aspect; card text trimmed to title + one line.
- Status bars / tabs (Library Ready/Rendering/Failed, Saved collections) become a horizontally scrollable pill row under the header.
- Filters and search: a search field + a "Filters" button that opens a bottom sheet with all filter chips; applied filters show as a count on the button.
- Sub-panels (collections) become a sheet opened from a "Collections" button.
- Selection mode: the bottom bar is replaced by an action bar (Move, Delete, etc.) while items are selected.

### 7.5 Forms and profile screens
- Single column; inputs full width; input+button pairs stack (button full width under the input) when the row is narrower than 360px.
- Tabs (Profile tabs, etc.) become a horizontally scrollable pill row.
- Tables become stacked cards (label/value rows) on phone.
- Modals become bottom sheets (full height for long forms).

### 7.6 Admin on phone
Desktop only. Below 768px, any /admin route shows a centered message card: AdRender icon, "Admin works on a bigger screen", one line "Open admin.adrender.app on a laptop or desktop.", and a "Go to the app" button (client home). No admin functionality on phone.

### 7.7 Touch rules
- Tap targets at least 44×44px. No hover-only actions: anything shown on hover on desktop (card actions, glow) is reachable by tap (e.g. a ⋯ button on cards).
- Bottom sheets for menus/dropdowns instead of small popovers.
- No horizontal page scrolling, ever (only intentional scroll rows: tool row, pill rows).

## 8. Component recipes

Exact looks for common pieces. Use the shared components in `src/components/ui/` when they exist on your branch; otherwise build the look locally with these exact rules. Sizes in px.

**8.1 Section label** (replaces every UPPERCASE label such as "BRAND OR CAMPAIGN", "PROMPT", "RESOLUTION", "SAVE TO", "REFERENCE IMAGE"): 13px, weight 500, `--text-secondary`, sentence case ("Brand or campaign"), no letter-spacing, 6px gap below.

**8.2 Input / textarea / select trigger:** `--bg-input`, 1px `--border`, radius 8, height 36 (textarea min 96, padding 10/12), 14px `--text-primary`, placeholder `--text-muted`. Hover: `--border-strong`. Focus: `--border-strong` + `0 0 0 3px var(--accent-soft)`. Select trigger adds `CaretDown` 14px `--text-secondary` on the right. Search inputs get `MagnifyingGlass` 16px `--text-muted` on the left.

**8.3 Toggle switch:** track 32×18, radius full; off `--bg-soft`; on `--accent`; knob 14px circle `#F6F5F4` (light mode on-knob white, off-knob white with 1px `--border`), 2px inset, 150ms slide. Disabled 50% opacity. Rows of toggles sit together in ONE card (8.6) as rows: label 14 primary, optional description 12 secondary, toggle on the right, rows 44px tall, 1px `--border` between rows. No separate box per toggle.

**8.4 Tabs**
- *Underline tabs* (page sections, e.g. Profile tabs, Brand detail tabs): 13px, inactive `--text-secondary`, active `--text-primary` weight 500 with a 2px `--text-primary` underline; optional 16px icon; 20px gap; the row sits on a 1px `--border` bottom line.
- *Pill tabs* (status or view switches, e.g. Ready / Rendering / Failed, Community / Brands): items 28px tall, padding 0 10, radius 8, inactive `--text-secondary` (hover `--bg-hover`), active `--bg-selected` + `--text-primary`. Count = 12px badge (8.7). Ready count uses `--success` text when > 0; Failed count uses `--danger` text when > 0. Sentence case ("Ready", not "READY").
- *Segmented* (2–4 mutually exclusive options like Image/Video, 1K/2K/4K, grid/list view, Newest/Longest running/Most relevant): section 4 segmented control, including the dark-mode shine.

**8.5 Filter chip** (dropdown filters like Brands & campaigns, Niche, All platforms, Run time, Language, All sizes): height 32, padding 0 12, radius 8, `--bg-surface`, 1px `--border`, 13px `--text-primary`, `CaretDown` 14 `--text-secondary`. Hover `--border-strong` + `--bg-hover`. Open: `--bg-selected`. When a filter is applied: label shows the value ("Niche: Beauty") and a 6px `--accent` dot before the label. Toggle-type chips (e.g. "Active only") use the same shape; on = `--accent-soft` fill + `--text-primary`.

**8.6 Card / panel:** `--bg-surface`, 1px `--border`, radius 12, padding 16 (dense) or 20, no shadow. Card title 14/500 primary; description 13 secondary.

**8.7 Badge / tag** (1K, Standard, Staged, niche labels like Beauty, counts): height 20, padding 0 6, radius 6, 12px weight 500, sentence case. Neutral: `--bg-soft` + `--text-secondary`. Status: Staged/Approved/Ready = `--success-soft` + `--success`; Rendering = `--warning-soft` + `--warning`; Failed = `--danger-soft` + `--danger`.

**8.8 Menu / popover / dropdown list:** `--bg-raised`, 1px `--border`, radius 12, menu shadow (section 3), padding 6. Rows 32px, radius 6, 14px primary, 16px icon secondary, hover `--bg-hover`, selected row shows `Check` on the right. Group labels 12px `--text-muted`, sentence case. Dividers 1px `--border`. A search box inside a menu uses 8.2 at height 32.

**8.9 Modal / dialog:** overlay `rgba(0,0,0,0.6)` dark / `rgba(0,0,0,0.3)` light. Panel `--bg-raised`, 1px `--border`, radius 16, menu shadow. Header: title 16/600 primary + optional 13 secondary subtitle, ghost icon-only close (`X`) top right. Body padding 20–24. Footer: right-aligned buttons, secondary then primary, 8px gap; destructive confirms use Danger.

**8.10 Empty state:** dashed 1px `--border` box, radius 12, centered: 40px tile (`--bg-soft`, radius 10) with a 20px `--text-secondary` icon, title 16/500 primary, one sentence 13 secondary, then one button (primary if it's the screen's main action, else secondary).

**8.11 Banner / info strip:** `--bg-inset`, radius 12, padding 10/16, 13px secondary text, optional 16px icon, action button (sm) on the right, optional ghost `X`.

**8.12 Page header:** optional 20px icon (`--text-secondary`) + title 20/600 primary; optional subtitle 13 secondary below; actions on the right (secondary buttons, at most one primary). 24px below the header.

**8.13 Links:** `--text-primary`, underline, `text-underline-offset: 3px`, underline color `--border-strong`; hover underline `--text-secondary`. No blue links.

**8.14 Tooltips:** `--bg-raised`, 1px `--border`, radius 6, padding 4/8, 12px primary, 300ms delay.

**8.15 Media overlays on image/video cards** (platform marks, play buttons): 20px circles, `rgba(0,0,0,0.55)` with `backdrop-filter: blur(6px)`, 12px white icons. Keep existing hover effects (including the template card glow).

**8.16 "Available" action buttons** (e.g. Scan in Brands): when the action is available, Secondary button with a static 1px brand-gradient border (section 1) and the icon in `--accent`; when unavailable/disabled, Ghost with `--text-muted` at 60% opacity. Same enabled/disabled logic as today.

**8.17 Loading:** spinners use Phosphor `CircleNotch` with `animate-spin`, 16px, `--text-secondary`. Skeletons use `--bg-soft` with a subtle pulse.

**8.18 Card hover (all clickable cards: templates, library ads, saved templates, home cards, brand tiles):** rest state as specified. Hover: lift `translateY(-2px)`, border `--border-strong`, glow `0 0 0 1px var(--accent-soft), 0 10px 28px rgba(0,0,0,0.35)` (light: `0 10px 28px rgba(0,0,0,0.08)`), media inside zooms to `scale(1.04)` (container `overflow: hidden`), 250ms ease-out. **Template cards keep their original hover glow and zoom from `main` exactly** — that wins over this rule. `prefers-reduced-motion`: no lift or zoom, glow only.

**8.19 Color icon tiles** (Home and feature cards): 36px rounded square, radius 10, background = color at 14% opacity, 1px border = color at 24%, icon 18px Regular in the color. Colors (dark / light): blue `#4F8DF7`/`#1F5FD6`, violet `#9B6BF2`/`#7340D4`, orange `#FF8A3D`/`#E8650F`, green `#52AD50`/`#2F8A3B`, amber `#E5A33D`/`#B9770E`. On card hover the tile's background goes to 22%.

**8.20 Welcome quote (Home):** centered, max-width 960, **28px / 1.2 desktop, 22px under 768px wide**, weight 600, letter-spacing -0.015em. Text filled with the brand gradient (theme-aware), `background-size: 200% 100%`, plus a slow shine: a lighter highlight band sweeps across once every 10s (`background-position` animation, ease-in-out, infinite) — the same technique as the old `.brand-wordmark` shine, slowed down. The gradient must be seamless: many soft stops and the same color at 0% and 100%, so there is never a hard edge or visible seam while it moves. **On mouse leave, the quote crossfades (300ms) to the next quote from the existing quote list**, like the website hero card. Soft glow `filter: drop-shadow(0 0 28px rgba(139,108,240,0.28))`. Author line below: 14px `--text-secondary`. Reduced motion: static gradient, no sweep.

**8.21 Library ad card (staged image/video):** fixed rows so every card lines up: (1) title 14/500 primary, one line, truncate; (2) brand 13 secondary, one line; (3) ad-copy row ALWAYS present: `Tag` 12px + copy 12px secondary one line truncated, or `— none` in `--text-muted` when there is no copy; (4) badges row: resolution, model and image size (existing size value, e.g. `9:16-1080`) as neutral badges; (5) footer: date 12 muted on the left, Approve (small: 28px, 13px text, `Check` in success) + ghost `Trash` on the right. Nothing may be hidden or truncated behind the buttons.

**8.22 Playground bottom bar:** two columns aligned on the same baseline. Left: section label "Save to" above the select (select height 40). Right: cost line (`0 tokens · 1K`, 12px secondary, right-aligned) above the Render button (large, 40px). Labels sit directly above their controls; the select and the button share the same top and bottom edges.

**8.23 Platform size filters (Playground, Duplicator):** "All" stays text; Facebook, Instagram, LinkedIn, Google, TikTok become icon-only chips (Phosphor `FacebookLogo`, `InstagramLogo`, `LinkedinLogo`, `GoogleLogo`, `TiktokLogo`, 18px) with tooltip and `aria-label`. Chip 32px tall, radius 8. Unselected: `--bg-surface`, 1px `--border`, icon `--text-secondary`. Selected: `--accent-soft` fill, 1px `--accent` border, icon `--text-primary`. Size cards (Square 1080×1080, etc.) use the same selected treatment.

**8.24 Status tab bar (Library, Playground):** Library / Ready / Rendering / Failed sit inside ONE bar using the same segmented control as Browse Templates' Newest / Longest running / Most relevant (track, selected segment, sliding highlight). Each segment has its count badge (8.7; Ready count success text when > 0, Failed count danger text when > 0).

**8.25 Sub-panel collapse (Library collections, Saved Templates collections):** ghost icon-only button `CaretLineLeft` ("Collapse panel") when open, `CaretLineRight` ("Expand panel") when collapsed. Same logic as today.

**8.26 Upscale failed (video cards):** instead of a separate notice row, the badges row gets a warning badge "Upscale failed" followed by a small soft button "Retry" (`ArrowsClockwise` 14px). Hovering either shows a tooltip with the existing notice text (e.g. "Upscale failed — delivered in 720p · 16 tokens refunded" — values from the data, never hardcoded). Retry calls the existing retry-upscale handler and must look clearly clickable (pointer, hover fill). Cards stay the same height. Video cards have no ad-copy row (no "— none").

**8.27 Media corners:** media inside a card always has rounded top corners matching the card radius (card `overflow: hidden`), including Home ad tiles (Keep working on, Use again, Get inspired).

**8.28 Collection icons (Library collections, Saved Templates collections, image and video):** the "All" row (All ads / All templates) uses Phosphor `Stack`. Every collection/folder row uses Phosphor `Folder` (no open-folder icon). Selected row: the same icon in **Fill** weight (the "All" row: `Stack` Fill). No color: icons `--text-secondary`, selected row icon and text `--text-primary` on the selected row background.

**8.29 Brand name link on template cards (Browse + Saved, image + video):** rest: 14/500 `--text-primary`, no underline. Hover: text brightens to `#F6F5F4` (light mode `#000000`), underline 1.5px solid in the same bright color, `text-underline-offset: 3px`, 150ms transition. Keyboard focus shows the same.

**8.30 Starred templates:** Saved Templates (image and video) show the same star toggle (ghost icon `Star`, Fill + `--warning` color when starred). Starred templates sort first, then the normal order.

**8.32 Page top row:** every screen's top row (page title, Collections header, Playground/Duplicator title, status bar, search, filters' first row) has the same fixed height, 64px, with items vertically centered, so titles, sub-panel headers and tab bars line up across columns. No subtitle lines under page titles in tool screens (Playground, Duplicator, Library, Saved Templates).

**8.33 Tool screens (Image/Video Playground, Image/Video Duplicator) — one uniform layout:**
- **Work panel (left):** the focus. Width `clamp(460px, 36%, 600px)` of the content card; identical in all four screens. Same header (8.32 + tokens + close where applicable), same section order, same spacing, same bottom bar (8.22).
- **Section order:** toggles (image only) → Brand or campaign + Product → Reference template / Reference video (duplicator / video) → Reference images → Prompt → **Model → Resolution** → Sizes (image only). Helper notes sit directly under the control they explain, 12px `--text-muted`.
- **Resolution picker (image and video):** segmented control with **two-line segments** — line 1 the resolution (14/500, e.g. "720p", "1K"), line 2 the cost (12px, `--text-secondary`, e.g. "32 tokens"). Segment height 48px. All options always readable; never overlapping or truncated. If the panel is too narrow for all options in one row, wrap into a 2×2 grid of the same segments.
- **Results area (right):** identical grid in all four screens: 4 columns when the results area is at least 880px wide, 3 at 660–879px, 2 below 660px; gap 16px. Cards may be smaller than in Library; the results area scrolls.

**8.34 Admin pages (Tickets, Stuck Renders, Customers, Banking, Docs, Settings):** same tokens, components and content card as client screens.
- **Top row:** 8.32 (64px) with the page header (8.12): icon + title, actions on the right. No subtitle line.
- **Tables / lists:** one card (8.6) with 0 padding and `overflow: hidden`. Header row 36px, `--bg-inset`, 12px/500 `--text-muted`, sentence case. Body rows min 44px, 13px `--text-primary` (secondary columns such as dates, IDs, emails in `--text-secondary`), 1px `--border` between rows, hover `--bg-hover`, `cursor: pointer` only where a row is clickable today. Numbers, money and counts right-aligned with `tabular-nums`. IDs in 12px mono, `--text-secondary`, with a ghost `Copy` button where copying exists today.
- **Statuses** use badges (8.7): open / pending / processing = warning; resolved / paid / active / succeeded = success; failed / stuck / suspended / refunded-with-error = danger; closed / other = neutral. Text stays exactly as today except sentence case.
- **Stat tiles** (totals, counts, balances): card 8.6, label 12px `--text-secondary`, value 24/600 `--text-primary` `tabular-nums`, optional 12px muted sub-line. Tiles sit in an even row (wrap on narrow widths).
- **Search and filters:** 8.2 search input + 8.5 filter chips / segmented controls on one row under the top row.
- **Detail views** (a ticket, a customer, a stuck render): keep today's layout and content; sections become cards (8.6) with 8.1 labels; key–value rows as 13px secondary label left / primary value right. Ticket messages: each message a card; the customer's and the team's messages told apart by a 2px left edge (`--border-strong` for customer, `--accent` for team), not by colored fills.
- **Forms (Settings):** SettingsList / ToggleRow (8.3) in section cards; inputs 8.2; one primary Save per section, same handlers.
- **Docs (reading view):** full width (8.35). Contents list as a sticky left column (240px); document text fills the rest, line length capped at 1000px. Body 15px / 1.6 `--text-primary`, headings 20/600 and 16/600, links 8.13, code blocks `--bg-inset` radius 8 13px mono, tables as above.
- **Dangerous admin actions** (refund, delete, suspend, force-fail, retry charge, etc.): Danger buttons (section 4) with the confirm step they have today; if an action has no confirm today, don't add or remove one — list it in the report.
- Empty states 8.10; loading = 8.17 skeleton rows (5 rows of 44px).

**8.35 Workspace width (all admin pages + client Profile / Billing / Team / Affiliate / settings screens):** these are working dashboards, not reading pages.
- **Width:** content fills the content card. Side padding 24px (16px under 768px). No centered narrow column, no `max-width` on the page body (only cap at 1920px on very wide screens). Every block on a page shares the same left and right edges.
- **No horizontal scrolling** of the page at 1024px wide and up. Tables fit: tighter column padding (12px), long text truncates with a tooltip, secondary info moves under the main cell as a 12px second line. Only as a last resort may a single table scroll sideways inside its own card.
- **Less vertical scrolling:** put things side by side. Forms use a 2–3 column grid (one column under 768px); short fields (amounts, dates, toggles) share a row; a section's buttons sit on its title row, right side; stat tiles sit in one even row (wrap only when needed).
- **Compact sizes:** stat tile 72px tall (label 12px secondary, value 20/600, optional 12px sub-line), 12px padding. Key–value info is a grid inside ONE card — 3–4 columns of rows (label 12px secondary above value 14px primary), not one card per value.
- **Page nav bar** (the Banking pattern): directly under the 64px top row, a full-width row with 1px `--border` below, padding 8px 24px: pill tabs (8.4) with 16px icon + label, **one line each — never wrapped, never clipped**. If the tabs don't fit, the row wraps into a second row of tabs. Sub-tabs (second level, e.g. Service chat / Home page) are the same pills at 28px height in a row below, same left edge.
- **Side panels / drawers** (e.g. Customer details): width `min(1100px, 92%)` of the content card. Header: title + badges + close on one row, email/ID line below, then 16px space, then the tab row (UnderlineTabs) with its own full row — never squeezed against the header. Goal: the Overview tab fits without scrolling on a 900px-tall window.

**8.36 Color + spacing pass (admin and client settings) — Nov 7:** the dashboard screens were too grey and cramped. Bring color back to badges, buttons and links; fix text spacing and alignment.
- **New token:** `--info` (dark `#4F8DF7`, light `#1F5FD6`) and `--info-soft` (same color at ~14% alpha), next to success / warning / danger / accent.
- **Links** (incl. "View profile →", table links, "Open Stripe Dashboard"): `--accent` text (light mode `#6B4FD8`), no underline at rest, underline on hover. Replaces 8.13 inside dashboards.
- **Badges always carry meaning in color:** soft fill + colored text. success = active / approved / paid / complete / resolved; warning = pending / processing / past due; danger = failed / suspended / escalated / cancelled-with-error; info = AI agent / live / trialing / Shopify-pending; accent = Direct / Affiliate / plan tier. Neutral grey only for "No tier", "—", "Not started". Badges are content-width (`inline-flex`, never stretched), 22px tall.
- **Tinted buttons (new variant):** soft fill + colored text/icon of a semantic color, 1px border in the same color at ~30%. Use for: AI actions (AI draft, AI Agent) = accent/info; status actions (Pending = warning, Escalated = danger, Resolve = success); Grant / Refund tokens = success; Flag refund = warning. Primary (`#F6F5F4`) stays for the one main action per area (Send, Save, Add). Danger stays for destructive.
- **Section icons:** the 16px icon before a section title uses `--accent`.
- **Chat bubbles (Tickets):** team / AI messages = `--accent-soft` fill, primary text; customer messages = `--bg-raised`. Bubble padding 12/14, radius 14.
- **Text spacing:** stat tile = label 12/16 secondary → 6px → value 22/28 weight 600 → 4px → sub-line 12/16 muted; padding 16. Section header = title 16/24 weight 600 → 4px → description 13/20 secondary → 16px before content. Table rows min 44px with 12px vertical cell padding; two-line cells = 14/20 primary + 12/16 secondary with 2px gap. Never let a big number touch its label.
- **Narrow panels (< 480px wide, e.g. Tickets client profile):** key–value info is a 2-column grid of small cards with FULL labels (never truncated to "S…", "A…"). Compact multi-column tile rows are only for wide areas.
- **Alignment:** items on one row are vertically centered and share a height (controls 36px, small buttons 32px). A status badge and its row's buttons sit on the same line.

**8.37 Form rows + confirms — Nov 7:**
- **Input + button on one row** (Save name, Join, Save cap, Add, Apply code, etc.): the button sits directly right of its input, 8px gap, both 36px tall, vertically centered. Never a short button next to a tall input, never a button floating at the far edge away from its input.
- **Space after controls:** at least 16px between a button/control row and the next element; 24px between sections inside a card; 32px between cards.
- **Theme lives in one place:** the profile drop-up (5.3). No Appearance card on the Profile page.
- **Confirm dialogs** (Modal 8.9, not `window.confirm`): title = the action, one sentence naming who/what/how much, buttons "Cancel" (secondary) + the action (Danger when it takes something away). Cancel and backdrop click do nothing.

**8.38 Input widths, button gap, section titles, tile rows — Nov 7 (tightens 8.37):**
- **Inputs are sized to their content, never full-row by default:** short text / names ~360px; email, URL, search ~480px; numbers, money, percentages ~160px; dates ~180px; long free text (notes, prompts, terms) may span the card. On narrow screens they go full width.
- **Input + button:** 12px gap; the button is EXACTLY the input's height (both 36px — use the same size token; measure in the browser). The pair stays together on the left, not stretched apart.
- **Section titles (big groups inside a page)** use the Home page's section-title style (same component/class): ~20px/28 weight 600, optional 18px accent icon, 32px space above, 12px below. Card titles stay 14–16px. Two different groups must never look like the same small label.
- **No dead space:** cards side by side share the same height; a form beside another card uses columns inside it so it fills its width — never a single narrow column next to empty space.
- **Tile rows:** tiles in one row share the same height and top/bottom edges. Long explanations go in a hover tooltip (Info icon); the visible sub-line is 2–4 words.

