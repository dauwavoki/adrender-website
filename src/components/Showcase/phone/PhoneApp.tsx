import { useContext, useEffect, useRef, type ReactNode } from 'react'
import {
  ArrowCounterClockwise,
  BookmarkSimple,
  Books,
  Broom,
  CaretDown,
  CheckCircle,
  CircleNotch,
  ClockCounterClockwise,
  Coins,
  Funnel,
  Image as ImageIcon,
  Info,
  Lightbulb,
  Lightning,
  MagnifyingGlass,
  Megaphone,
  Plus,
  Scan,
  SlidersHorizontal,
  Sparkle,
  SquaresFour,
  Storefront,
  FileArrowUp,
  TextT,
  UserCircle,
  UserCircleCheck,
  UsersFour,
  FolderSimple,
  VideoCamera,
  X,
  Check,
  Star,
} from '@phosphor-icons/react'
import type { LibState, SceneState } from '../engine/story'
import { PlayingCtx, VIDEO_PRICE, balanceFor } from '../engine/layout'
import { BrandScreen, BrandsScreen } from '../desktop/screens'
import { ModalLayer, NewCollectionDialog, PhoneWorkspaceMenu, ProfileScreen, Toast, WsDropdown } from '../desktop/pages'
import { COLLECTIONS, SAVED_NEW, collectionCount } from '../desktop/pagesData'
import {
  ACCOUNT,
  BRAND,
  IMAGE_RESULTS,
  IMAGE_TEMPLATES,
  INSPIRED_IMAGE,
  INSPIRED_VIDEO,
  KEEP_WORKING,
  PICKED_IMAGE,
  PICKED_VIDEO,
  QUOTE,
  USE_AGAIN_IMAGE,
  USE_AGAIN_VIDEO,
  VIDEO_RESULTS,
  VIDEO_TEMPLATES,
  type Media,
} from '../showcaseData'
import { cx } from '../../site/cx'

function Clip({ src, video, play }: { src: string; video?: string; play: boolean }) {
  const playing = useContext(PlayingCtx)
  const ref = useRef<HTMLVideoElement>(null)
  const loaded = useRef(false)
  const active = Boolean(video) && play && playing
  useEffect(() => {
    const el = ref.current
    if (!el || !video) return
    el.muted = true
    if (active) {
      if (!loaded.current) {
        loaded.current = true
        el.src = video
        el.load()
      }
      void el.play().catch(() => undefined)
    } else {
      el.pause()
    }
  }, [active, video])
  if (!video) return <img src={src} alt="" className="sc-cover" draggable={false} />
  return <video ref={ref} poster={src} muted loop playsInline preload="none" className="sc-cover" />
}

function Tile({ tone, children }: { tone: 'blue' | 'violet' | 'orange' | 'green' | 'amber'; children: ReactNode }) {
  return (
    <span className="color-icon-tile" data-tone={tone}>
      {children}
    </span>
  )
}

function RenderingDots({ small = false }: { small?: boolean }) {
  return (
    <span className={cx('rendering-dots', small && 'is-small')} aria-hidden>
      <span />
      <span />
      <span />
    </span>
  )
}

/* ── Chrome ─────────────────────────────────────────────────── */

function ModeToggle({ state }: { state: SceneState }) {
  const other = state.mode === 'image' ? 'video' : 'image'
  const lib = state.lib[other]
  const mark =
    lib.ready > 0 && !lib.seen ? (
      <span className="mode-alert-badge">
        <span className="mode-alert-success-dot" />
        {lib.ready}
      </span>
    ) : lib.rendering > 0 ? (
      <RenderingDots small />
    ) : null
  return (
    <span className="sc-segmented is-phone-mode">
      <span className={cx(state.mode === 'image' && 'is-on')} data-sc="sc-mode-image">
        <ImageIcon size={16} weight={state.mode === 'image' ? 'fill' : 'regular'} />
        {other === 'image' ? mark : null}
      </span>
      <span className={cx(state.mode === 'video' && 'is-on')} data-sc="sc-mode-video">
        <VideoCamera size={16} weight={state.mode === 'video' ? 'fill' : 'regular'} />
        {other === 'video' ? mark : null}
      </span>
    </span>
  )
}

function Header({ state }: { state: SceneState }) {
  const showMode = state.screen === 'browse' || state.screen === 'library'
  return (
    <header className="sc-ph-header">
      <span className="sc-ph-workspace" data-sc="sc-ph-workspace">
        {state.wsCur >= 1 ? <UsersFour size={16} /> : <UserCircleCheck size={16} />}
        <span>{state.wsCur >= 1 ? 'Studio Team' : ACCOUNT.workspace}</span>
        <CaretDown size={14} />
      </span>
      {showMode ? <ModeToggle state={state} /> : null}
      {state.screen === 'brands' ? (
        <span className="sc-btn is-primary sc-ph-control" data-sc="sc-ph-add">
          <Plus size={16} />+ Add
        </span>
      ) : (
        <span className="sc-ph-tokens" data-sc="sc-ph-tokens">
          <Coins size={16} />
          <span className="tabular-nums">{balanceFor(state)}</span>
        </span>
      )}
    </header>
  )
}

function libraryDot(lib: LibState) {
  if (lib.ready > 0 && !lib.seen) return 'ready'
  if (lib.rendering > 0) return 'rendering'
  return null
}

function TabBar({ state }: { state: SceneState }) {
  const tab =
    state.screen === 'library' ? 'library' : state.screen === 'saved' ? 'saved' : state.screen === 'profile' ? 'profile' : state.screen === 'browse' ? 'browse' : state.screen === 'brands' || state.screen === 'brand' ? 'brands' : null
  const dot = libraryDot(state.lib.image) ?? libraryDot(state.lib.video)
  const item = (id: string, label: string, icon: ReactNode, extra?: ReactNode) => (
    <span className={cx('sc-ph-tab', tab === id && 'is-on')} data-sc={`sc-tab-${id}`}>
      <span className="sc-ph-tab-icon">
        {icon}
        {extra}
      </span>
      <span>{label}</span>
    </span>
  )
  return (
    <nav className="sc-ph-tabbar">
      {item('library', 'Library', <Books size={22} weight={tab === 'library' ? 'fill' : 'regular'} />, dot ? <i className={cx('sc-ph-dot', `is-${dot}`)} /> : null)}
      {item('saved', 'Saved', <BookmarkSimple size={22} />)}
      <span className={cx('sc-ph-tab', tab === 'browse' && 'is-on')} data-sc="sc-tab-browse">
        <span className={cx('sc-ph-browse-mark', tab === 'browse' && 'is-on')}>
          <SquaresFour size={22} weight={tab === 'browse' ? 'fill' : 'regular'} />
        </span>
        <span>Browse</span>
      </span>
      {item('brands', 'Brands', <Megaphone size={22} weight={tab === 'brands' ? 'fill' : 'regular'} />)}
      {item('profile', 'Profile', <UserCircle size={22} />)}
    </nav>
  )
}

function quote(state: SceneState) {
  const count = state.templates[state.mode]
  if (state.mode === 'video') return { ads: count, price: count > 0 ? VIDEO_PRICE : 0 }
  return { ads: count * state.sizes, price: count * state.sizes }
}

function summary(state: SceneState) {
  const { ads } = quote(state)
  if (state.mode === 'video') return `Standard · 720p · ${ads} ${ads === 1 ? 'ad' : 'ads'}`
  const size = state.sizes === 0 ? 'Size' : state.sizes === 1 ? '4:5' : '2 sizes'
  return `Standard · 1K · ${size} · ${ads} ${ads === 1 ? 'ad' : 'ads'}`
}

function lit(state: SceneState) {
  const count = state.templates[state.mode]
  return count > 0 && (state.mode === 'video' || state.sizes > 0)
}

function picked(state: SceneState) {
  return (state.mode === 'video' ? PICKED_VIDEO : PICKED_IMAGE).slice(0, state.templates[state.mode])
}

function CockpitBar({ state }: { state: SceneState }) {
  const items = picked(state)
  const empty = items.length === 0
  const lib = state.lib[state.mode]
  const added = state.added && state.added.text && !empty ? state.added.text : null
  const title = added ?? (empty ? 'Clone' : `Clone · ${items.length} ${items.length === 1 ? 'template' : 'templates'}`)
  const sub = empty ? 'Add a template to start' : !lit(state) ? 'Pick a size in Settings' : summary(state)
  return (
    <div className="cockpit sc-ph-bar" data-sc="sc-pbar">
      {empty ? (
        <span className="sc-ph-plus cockpit-need-ring">
          <Plus size={18} />
        </span>
      ) : (
        <span className="sc-ph-thumbs">
          {items.map((item, index) => (
            <span key={item.id} className="sc-ph-thumb sc-drop-in" style={{ marginLeft: index === 0 ? 0 : -12, zIndex: 3 - index }}>
              <img src={item.src} alt="" className="sc-cover" />
            </span>
          ))}
        </span>
      )}
      <span className="sc-ph-bar-text">
        <span className={cx('sc-ph-bar-title', added && 'cockpit-added')} key={added ?? title}>
          {title}
        </span>
        <span className="sc-ph-bar-sub">{sub}</span>
      </span>
      {lib.ready > 0 && !lib.seen ? (
        <CheckCircle size={20} weight="fill" className="sc-text-success" />
      ) : lib.rendering > 0 ? (
        <RenderingDots />
      ) : null}
      {empty ? null : <span className="sc-ph-price tabular-nums">{quote(state).price} tokens</span>}
      <span className={cx('sc-ph-render', lit(state) ? 'cockpit-render-lit' : 'cockpit-render-idle')}>
        <Lightning size={18} />
      </span>
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="cockpit-choice sc-pop-in">
      {children}
      <span className="cockpit-choice-x">
        <X size={12} />
      </span>
    </span>
  )
}

function CockpitSheet({ state }: { state: SceneState }) {
  const items = picked(state)
  return (
    <div className="cockpit sc-ph-sheet sc-ph-cockpit" data-sc="sc-psheet">
      <span className="sc-ph-grabber" />
      <div className="sc-ph-sheet-head">
        <span className="cockpit-action">
          <Sparkle size={16} />
          <span className="cockpit-action-label">Skills · Clone</span>
          <CaretDown size={12} />
        </span>
        <span className="cockpit-skill-info">
          <Info size={16} />
        </span>
        <span className="sc-grow" />
        <span className="cockpit-prompt-tool">
          <ClockCounterClockwise size={18} />
        </span>
        <span className="cockpit-prompt-tool is-idle">
          <Sparkle size={18} />
        </span>
        <span className="cockpit-prompt-tool">
          <CaretDown size={18} />
        </span>
      </div>
      <div className="sc-ph-pickers">
        <span className="sc-ph-add">
          <Plus size={18} />
        </span>
        <span className={cx('cockpit-switch', !state.brand && 'is-placeholder')} data-sc="sc-pbrand">
          {state.brand ? <img src={BRAND.logo} alt="" className="sc-brand-mark is-16" /> : <Megaphone size={16} />}
          <span>{state.brand ? BRAND.name : 'Brand or campaign'}</span>
          <CaretDown size={12} />
        </span>
        <span className={cx('cockpit-switch', !state.brand && 'is-disabled')}>
          <ImageIcon size={16} />
          <span>{state.brand ? 'Choose product' : 'Product'}</span>
          <CaretDown size={12} />
        </span>
      </div>
      {state.pills > 0 ? (
        <div className="sc-ph-pills">
          {state.pills >= 1 ? (
            <Pill>
              {BRAND.colors.map((color) => (
                <span key={color} className="sc-swatch-dot" style={{ background: color }} />
              ))}
            </Pill>
          ) : null}
          {state.pills >= 2 ? (
            <Pill>
              <img src={BRAND.logo} alt="" className="sc-brand-mark is-18" />
              <span>Logo</span>
            </Pill>
          ) : null}
          {state.pills >= 3 ? (
            <Pill>
              <TextT size={15} />
              <span>{BRAND.adCopies} ad copies</span>
            </Pill>
          ) : null}
          {state.pills >= 4 ? (
            <Pill>
              <span>{BRAND.audience[0]}</span>
            </Pill>
          ) : null}
        </div>
      ) : null}
      <div className="sc-ph-template-row">
        {items.map((item) => (
          <span key={item.id} className="sc-ph-template">
            <img src={item.src} alt="" className="sc-cover" />
            <span className="sc-ph-template-badge">{state.mode === 'video' ? 'Video' : 'Image'}</span>
          </span>
        ))}
      </div>
      <p className="sc-ph-prompt">No prompt needed. Pick your options below and press Render. Add notes here if you want.</p>
      <p className="sc-ph-info">
        <span>{summary(state)}</span>
        <span>Save to {state.brand ? BRAND.name : '…'}</span>
      </p>
      <div className="sc-ph-sheet-foot">
        <span className={cx('sc-ph-icon-btn', state.mode === 'image' && state.sizes === 0 && 'cockpit-need-ring')} data-sc="sc-psettings">
          <SlidersHorizontal size={18} />
        </span>
        <span className={cx('sc-ph-icon-btn', !state.brand && 'cockpit-need-ring')}>
          <FolderDown />
        </span>
        <span className="sc-ph-icon-btn">
          <Broom size={18} />
        </span>
        <span className="sc-grow sc-ph-foot-price">
          <span className="tabular-nums">{quote(state).price} tokens</span>
          <small>{lit(state) ? 'Ready to render' : 'Pick a size'}</small>
        </span>
        <span className={cx('cockpit-render', lit(state) || state.busy ? 'cockpit-render-lit' : 'cockpit-render-idle')} data-sc="sc-prender">
          {state.busy ? <CircleNotch size={16} className="sc-spin" /> : <Lightning size={16} />}
          Render
        </span>
      </div>
    </div>
  )
}

function FolderDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      <path d="M12 10v6" />
      <path d="m15 13-3 3-3-3" />
    </svg>
  )
}

function BrandSheet() {
  return (
    <div className="cockpit sc-ph-sheet sc-ph-small">
      <span className="sc-ph-grabber" />
      <p className="sc-ph-sheet-title">Brand or campaign</p>
      <span className="sc-search">
        <MagnifyingGlass size={16} />
        Search brands
      </span>
      <span className="cockpit-row sc-ph-row">No brand</span>
      <span className="cockpit-row sc-ph-row" data-sc="sc-brand-row">
        <img src={BRAND.logo} alt="" className="sc-brand-mark" />
        {BRAND.name}
      </span>
      <span className="cockpit-row sc-ph-row">
        <span className="sc-letter" style={{ background: '#e5a33d' }}>
          S
        </span>
        Summer Sale
      </span>
    </div>
  )
}

function SettingsSheet({ state }: { state: SceneState }) {
  const chosen = new Set(state.sizes >= 1 ? (state.sizes >= 2 ? ['45', 'sq'] : ['45']) : [])
  const tiles = [
    { id: 'sq', ratio: '1:1', w: 16, h: 16 },
    { id: '45', ratio: '4:5', w: 13, h: 16 },
    { id: '916', ratio: '9:16', w: 9, h: 16 },
    { id: '169', ratio: '16:9', w: 22, h: 12 },
  ]
  return (
    <div className="cockpit sc-ph-sheet sc-ph-small">
      <span className="sc-ph-grabber" />
      <p className="sc-ph-sheet-title">Settings</p>
      <p className="cockpit-group-label">Quality</p>
      <div className="sc-seg">
        <span className="is-on">Standard</span>
        <span>Pro</span>
      </div>
      <p className="cockpit-group-label sc-mt">Size</p>
      <div className="sc-ph-sizes">
        {tiles.map((tile) => (
          <span key={tile.id} className={cx('cockpit-size-tile', chosen.has(tile.id) && 'is-selected')} data-sc={`sc-psize-${tile.id}`}>
            <span className="sc-ratio">
              <span style={{ width: tile.w, height: tile.h }} />
            </span>
            <span className="sc-size-label">{tile.ratio}</span>
          </span>
        ))}
      </div>
      <span className="sc-btn is-primary sc-ph-done" data-sc="sc-psettings-done">
        Done
      </span>
    </div>
  )
}

/* ── Screens ────────────────────────────────────────────────── */

function HomeCard({ item, kind, play = false }: { item: Media; kind: 'image' | 'video'; play?: boolean }) {
  return (
    <div className="sc-home-card sc-ph-home-card">
      <div className="sc-home-card-media">
        <Clip src={item.src} video={kind === 'video' ? item.video : undefined} play={play} />
      </div>
      <div className="sc-home-card-foot">
        <span className="sc-truncate">{item.title}</span>
        <span>{kind === 'video' ? 'Video' : 'Image'}</span>
      </div>
    </div>
  )
}

function Row({ items, kind, play }: { items: Media[]; kind: 'image' | 'video'; play: boolean }) {
  return (
    <div className="sc-ph-row-scroll">
      {items.map((item, index) => (
        <HomeCard key={item.id} item={item} kind={kind} play={play && index === 0} />
      ))}
    </div>
  )
}

function PhoneHome({ state }: { state: SceneState }) {
  const scrolled = state.scroll !== 0
  return (
    <div className="sc-ph-home">
      <div className="sc-quote-row is-phone">
        <img src="/brand/icons/icon-color.svg" alt="" className="sc-quote-logo" />
        <div>
          <p className="sc-quote-text">“{QUOTE.text}”</p>
          <p className="sc-quote-by">— {QUOTE.by}</p>
        </div>
      </div>
      <span className="sc-rel">
        <p className="cockpit-page-title home-workspace-title sc-ph-title" data-sc="sc-home-ws">
          {state.wsCur >= 1 ? <UsersFour size={16} /> : <UserCircleCheck size={16} />}
          <span className="cockpit-page-title-name">AdRender Workspace</span>
          <span className="sc-slash">/</span>
          <span className="cockpit-page-title-folder">{state.wsCur >= 1 ? 'Studio Team' : ACCOUNT.workspace}</span>
          <CaretDown size={12} />
        </p>
        <WsDropdown state={state} where="home" />
      </span>
      <div className="sc-ph-stats">
        {[
          ['Ads generated', ACCOUNT.stats.ads],
          ['Templates saved', ACCOUNT.stats.saved],
          ['Brands', ACCOUNT.stats.brands],
          ['In progress', 0],
        ].map(([label, value]) => (
          <div key={label}>
            <p>{label}</p>
            <b className="tabular-nums">{Number(value).toLocaleString('en-US')}</b>
          </div>
        ))}
      </div>
      <section className="sc-card sc-continue sc-ph-continue">
        <div className="sc-card-title-row">
          <Tile tone="blue">
            <ClockCounterClockwise size={18} />
          </Tile>
          <p className="sc-card-title">Keep working on</p>
        </div>
        <div className="sc-continue-media">
          <img src={KEEP_WORKING.src} alt="" className="sc-cover" />
        </div>
      </section>
      <section className={cx('sc-card sc-ph-create', state.scanBusy && 'cockpit-need-ring')} data-sc="sc-create">
        <div className="sc-card-title-row" data-sc="sc-create-toggle">
          <Tile tone="amber">
            <Megaphone size={18} />
          </Tile>
          <p className="sc-card-title sc-grow">Create a brand or campaign</p>
          <CaretDown size={16} className={cx('sc-caret-turn', state.createOpen && 'is-open')} />
        </div>
        {state.createOpen ? (
          <div className="sc-ph-create-fields sc-rise-in">
            <span className={cx('sc-input', state.urlFocus && 'is-focus')} data-sc="sc-url">
              {state.url ? <span className="sc-input-text">{state.url}</span> : <span className="sc-input-ph">https://</span>}
              {state.urlFocus && !state.scanBusy ? <span className="sc-caret" /> : null}
            </span>
            <span className="sc-btn is-secondary" data-sc="sc-scan">
              {state.scanBusy ? <CircleNotch size={16} className="sc-spin" /> : <Scan size={16} />}
              {state.scanBusy ? 'Scanning…' : 'Scan URL'}
            </span>
            <span className="sc-input">
              <span className="sc-input-ph">store.myshopify.com</span>
            </span>
            <span className="sc-btn is-secondary">
              <Storefront size={16} />
              Connect Shopify
            </span>
            <span className="sc-btn is-secondary sc-span-2">
              <FileArrowUp size={16} />
              Upload docs
            </span>
          </div>
        ) : null}
      </section>
      <section className="sc-ph-section" data-sc="sc-use-again">
        <div className="sc-section-heading">
          <Tile tone="blue">
            <ArrowCounterClockwise size={18} />
          </Tile>
          <div>
            <h3>Use again</h3>
            <p>Templates you rendered recently — one click back into Clone.</p>
          </div>
        </div>
        <Row items={USE_AGAIN_IMAGE} kind="image" play={false} />
        <Row items={USE_AGAIN_VIDEO} kind="video" play={scrolled} />
      </section>
      <section className="sc-ph-section" data-sc="sc-inspired">
        <div className="sc-section-heading">
          <Tile tone="violet">
            <Lightbulb size={18} />
          </Tile>
          <div>
            <h3>Get inspired</h3>
            <p>Fresh ads from brands that are winning right now.</p>
          </div>
        </div>
        <Row items={INSPIRED_IMAGE} kind="image" play={false} />
        <Row items={INSPIRED_VIDEO} kind="video" play={scrolled} />
      </section>
      <section className="sc-card sc-tokens">
        <div className="sc-card-title-row">
          <Tile tone="violet">
            <Coins size={18} />
          </Tile>
          <p className="sc-card-title">Tokens</p>
        </div>
        <p className="sc-big">{balanceFor(state).toLocaleString('en-US')}</p>
        <p className="sc-muted-sm">Available to spend right now</p>
      </section>
    </div>
  )
}

function PhoneBrowse({ state }: { state: SceneState }) {
  const video = state.mode === 'video'
  const items = video ? VIDEO_TEMPLATES : IMAGE_TEMPLATES
  return (
    <div className="sc-ph-browse">
      <div className="sc-ph-browse-tools">
        <span className="sc-search is-grow">
          <MagnifyingGlass size={16} />
          Describe the ads you want
        </span>
        <span className="sc-ph-icon-btn is-boxed">
          <Funnel size={18} />
        </span>
      </div>
      <div className="sc-ph-quick">
        <span className="sc-chip is-on">Longest running</span>
        <span className="sc-chip">Newest</span>
        <span className="sc-chip">Active only</span>
        <span className="sc-chip">Community</span>
      </div>
      <div className="sc-ph-grid" key={state.mode}>
        {items.map((item) => (
          <div key={item.id} className="sc-tpl sc-ph-tpl" data-sc={`sc-card-${item.id}`}>
            <div className="sc-tpl-media">
              <Clip src={item.src} video={video ? item.video : undefined} play={false} />
              <div className="sc-ph-tpl-actions">
                <span className="sc-btn is-ghost is-icon">
                  <BookmarkSimple size={16} />
                </span>
                <span className="sc-btn is-secondary is-sm" data-sc={`sc-use-${item.id}`}>
                  <Lightning size={16} className="sc-text-accent" />
                  {state.templates[state.mode] > 0 ? '+ Use' : 'Use'}
                </span>
              </div>
            </div>
            <div className="sc-ph-tpl-foot">
              <span className="sc-letter" style={{ background: item.tint }}>
                {item.niche.charAt(0)}
              </span>
              <span className="sc-truncate">{item.niche}</span>
              <span className="sc-badge">{item.days}d</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PhoneLibrary({ state }: { state: SceneState }) {
  const video = state.mode === 'video'
  const all = video ? VIDEO_RESULTS : IMAGE_RESULTS
  const results = state.folder === 2 ? all.slice(0, 2) : state.folder === 1 && state.shelf >= 3 ? all.slice(2) : all
  const names = COLLECTIONS.slice(0, state.shelf >= 2 ? 3 : 2)
  return (
    <div className="sc-ph-library">
      <div className="sc-ph-quick">
        <span className="sc-chip">Library</span>
        <span className="sc-chip is-on">
          Ready <b className="sc-count is-ready">{all.length}</b>
        </span>
        <span className="sc-chip">Rendering</span>
        <span className="sc-chip">Failed</span>
      </div>
      <div className="sc-ph-quick sc-ph-colls" data-sc="sc-collections">
        {names.map((name, index) => (
          <span key={name} className={cx('sc-chip', state.folder === index && 'is-on', index === 2 && 'sc-rise-in')} data-sc={`sc-coll-${index}`}>
            {index > 0 ? <FolderSimple size={14} /> : null}
            {name} <b className="sc-count">{collectionCount(state, index, all.length)}</b>
          </span>
        ))}
        <span className="sc-chip is-new" data-sc="sc-new-collection">
          <Plus size={14} />
          New
        </span>
      </div>
      {state.picks > 0 && state.shelf < 3 ? (
        <div className="sc-ph-selbar sc-rise-in" data-sc="sc-selbar">
          <b>{state.picks} selected</b>
          <span className="sc-btn is-secondary is-sm" data-sc="sc-save-to">
            <FolderSimple size={14} />
            Save to collection
          </span>
        </div>
      ) : null}
      <div className="sc-ph-grid" key={`${state.mode}-${state.folder}`}>
        {results.map((item, index) => (
          <div key={item.id} className={cx('sc-ready-card sc-rise-in', state.picks > index && state.shelf < 3 && 'is-picked')} style={{ animationDelay: `${index * 90}ms` }} data-sc={`sc-ad-${index}`}>
            <div className={cx('sc-ready-media', video && 'is-tall', !video && 'ratio' in item && item.ratio === '1:1' && 'is-square')}>
              {'video' in item ? <Clip src={item.src} video={item.video} play /> : <img src={item.src} alt="" className="sc-cover" />}
              {state.picks > index && state.shelf < 3 ? (
                <span className="sc-ready-pick">
                  <Check size={12} weight="bold" />
                </span>
              ) : (
                <span className="sc-ready-star">
                  <Star size={14} />
                </span>
              )}
            </div>
            <div className="sc-ph-ready-foot">
              <span className="sc-btn is-secondary is-xs" data-sc={`sc-use-ad-${index}`}>
                <Lightning size={14} className="sc-text-accent" />
                Use
              </span>
              <span className="sc-btn is-ghost is-icon" data-sc={`sc-save-tpl-${index}`}>
                <BookmarkSimple size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PhoneSaved({ state }: { state: SceneState }) {
  const items = [...(state.saved >= 1 ? [SAVED_NEW] : []), IMAGE_TEMPLATES[0], IMAGE_TEMPLATES[2], IMAGE_TEMPLATES[1], IMAGE_TEMPLATES[3]]
  return (
    <div className="sc-ph-browse">
      <div className="sc-ph-quick">
        <span className="sc-chip is-on">All templates</span>
        <span className="sc-chip">Winning hooks</span>
      </div>
      <div className="sc-ph-grid">
        {items.map((item) => (
          <div key={item.id} className={cx('sc-tpl sc-ph-tpl', item.id === 'saved-new' && 'sc-rise-in')} data-sc={`sc-card-${item.id}`}>
            <div className="sc-tpl-media">
              <Clip src={item.src} play={false} />
              <div className="sc-ph-tpl-actions">
                <span className="sc-btn is-ghost is-icon">
                  <BookmarkSimple size={16} weight="fill" />
                </span>
                <span className="sc-btn is-secondary is-sm" data-sc={`sc-use-${item.id}`}>
                  <Lightning size={16} className="sc-text-accent" />
                  {state.templates[state.mode] > 0 ? '+ Use' : 'Use'}
                </span>
              </div>
            </div>
            <div className="sc-ph-tpl-foot">
              <span className="sc-letter" style={{ background: item.tint }}>
                {item.niche.charAt(0)}
              </span>
              <span className="sc-truncate">{item.niche}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** The phone web app: header, one page, folded cockpit bar, tab bar and sheets. */
export function PhoneApp({ state }: { state: SceneState }) {
  const cockpit = state.screen !== 'brands' && state.screen !== 'brand' && state.screen !== 'profile'
  return (
    <div className={cx('sc-ph', cockpit && 'has-cockpit')}>
      <div className="sc-ph-viewport">
        <div className="sc-scroller" data-sc-scroll="" key={`${state.screen}-${state.mode}`}>
          {state.screen === 'home' ? <PhoneHome state={state} /> : null}
          {state.screen === 'brands' ? <BrandsScreen state={state} phone /> : null}
          {state.screen === 'brand' ? <BrandScreen state={state} phone /> : null}
          {state.screen === 'browse' ? <PhoneBrowse state={state} /> : null}
          {state.screen === 'library' ? <PhoneLibrary state={state} /> : null}
          {state.screen === 'saved' ? <PhoneSaved state={state} /> : null}
          {state.screen === 'profile' ? <ProfileScreen state={state} phone /> : null}
        </div>
      </div>
      <Header state={state} />
      {state.menu ? <PhoneWorkspaceMenu state={state} /> : null}
      {cockpit ? <CockpitBar state={state} /> : null}
      <TabBar state={state} />
      <div className={cx('sc-ph-scrim', state.sheet && 'is-on')} />
      {state.sheet === 'cockpit' || state.sheet === 'brand' || state.sheet === 'settings' ? <CockpitSheet state={state} /> : null}
      {state.sheet === 'brand' ? <BrandSheet /> : null}
      {state.sheet === 'settings' ? <SettingsSheet state={state} /> : null}
      <NewCollectionDialog state={state} />
      <Toast state={state} />
      <ModalLayer state={state} />
    </div>
  )
}
