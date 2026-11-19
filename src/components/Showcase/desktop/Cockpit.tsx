import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Books,
  Broom,
  CaretDown,
  CaretUp,
  CheckCircle,
  ClockCounterClockwise,
  Coins,
  Image as ImageIcon,
  Info,
  Lightning,
  Megaphone,
  BookmarkSimple,
  Plus,
  SlidersHorizontal,
  Sparkle,
  SquaresFour,
  TextT,
  UserCircleCheck,
  UsersFour,
  VideoCamera,
  X,
  CircleNotch,
} from '@phosphor-icons/react'
import { buildFrame, localTabPath, type FramePaths, type TabBox } from './flapShape'
import { ACCOUNT, BRAND, PICKED_IMAGE, PICKED_VIDEO } from '../showcaseData'
import type { LibState, Mode, SceneState } from '../engine/story'
import { balanceFor, offsetWithin, VIDEO_PRICE } from '../engine/layout'
import { WsDropdown } from './pages'
import { ThumbStrip, usedSrc } from './saved'
import { cx } from '../../site/cx'

const EMPTY: FramePaths = { leftFill: '', rightFill: '', selected: [], outline: '', silhouette: '', details: [] }

function readTabs(shell: HTMLElement, side: 'left' | 'right'): TabBox[] {
  const strip = shell.querySelector(`[data-strip="${side}"]`)
  if (!(strip instanceof HTMLElement)) return []
  return [...strip.querySelectorAll<HTMLElement>('[data-strip-tab]')].map((tab) => {
    const at = offsetWithin(tab, shell)
    return {
      x: at.x,
      y: at.y,
      w: tab.offsetWidth,
      h: tab.offsetHeight,
      kind: tab.dataset.tabKind === 'min' ? 'min' : 'tab',
      selected: tab.dataset.selected === 'true',
      ready: tab.dataset.ready === 'true',
    }
  })
}

/** The app's cockpit frame: strips, selected-tab fills and one stroke. Measured with offsets. */
function CockpitFrame({ signature }: { signature: string }) {
  const anchor = useRef<HTMLSpanElement>(null)
  const [paths, setPaths] = useState<FramePaths>(EMPTY)
  const [box, setBox] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const shell = anchor.current?.parentElement
    if (!shell) return
    const measure = () => {
      const prompt = shell.querySelector('.cockpit-prompt')
      const left = readTabs(shell, 'left')
      const right = readTabs(shell, 'right')
      const seam = prompt instanceof HTMLElement ? prompt.offsetTop : left[0]?.h ?? 40
      const w = shell.offsetWidth
      const h = shell.offsetHeight
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }))
      setPaths(buildFrame({ width: w, height: h, seam, left, right }))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(shell)
    for (const tab of shell.querySelectorAll('[data-strip-tab]')) observer.observe(tab)
    return () => observer.disconnect()
  }, [signature])

  const view = `0 0 ${box.w} ${box.h}`
  const ready = box.w > 0 && paths.outline
  return (
    <>
      <span ref={anchor} hidden />
      {ready ? (
        <>
          <svg className="cockpit-frame-shadow" width={box.w} height={box.h} viewBox={view} aria-hidden>
            <path d={paths.silhouette} className="cockpit-frame-shadow-shape" />
          </svg>
          <svg className="cockpit-frame-fill" width={box.w} height={box.h} viewBox={view} aria-hidden>
            {paths.leftFill ? <path d={paths.leftFill} className="cockpit-strip-fill" /> : null}
            {paths.rightFill ? <path d={paths.rightFill} className="cockpit-strip-fill" /> : null}
            {paths.selected.map((d) => (
              <path key={d} d={d} className="cockpit-tab-fill" />
            ))}
          </svg>
          <svg className="cockpit-frame-stroke" width={box.w} height={box.h} viewBox={view} aria-hidden>
            <path d={paths.outline} className="cockpit-frame-line" />
            {paths.details.map((d) => (
              <path key={d} d={d} className="cockpit-frame-line" />
            ))}
          </svg>
        </>
      ) : null}
    </>
  )
}

function StripTab({
  side,
  selected = false,
  ready = false,
  outer = false,
  sc,
  wiggle = false,
  children,
}: {
  side: 'left' | 'right'
  selected?: boolean
  ready?: boolean
  outer?: boolean
  sc?: string
  wiggle?: boolean
  children: ReactNode
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [box, setBox] = useState({ w: 0, h: 40 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setBox((prev) => (prev.w === el.offsetWidth ? prev : { w: el.offsetWidth, h: el.offsetHeight || 40 }))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const ringPath = selected && ready && box.w > 0 ? localTabPath(box.w, box.h, side, outer) : ''
  const ringStyle = useMemo(() => {
    if (!ringPath) return undefined
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box.w} ${box.h}"><path d="${ringPath}" fill="none" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>`
    const mask = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
    return { WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' } as CSSProperties
  }, [ringPath, box.w, box.h])
  return (
    <span
      ref={ref}
      data-strip-tab=""
      data-selected={selected ? 'true' : 'false'}
      data-ready={ready ? 'true' : 'false'}
      data-tab-kind="tab"
      data-sc={sc}
      className={cx('cockpit-tab', outer && 'is-outer', selected && 'is-selected', ready && 'is-ready', wiggle && 'mode-alert-wiggle')}
    >
      {ringStyle ? <span className="cockpit-tab-ready-ring" style={ringStyle} aria-hidden /> : null}
      <span className="cockpit-tab-content">{children}</span>
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

function ModeMark({ lib }: { lib: LibState }) {
  if (lib.ready > 0 && !lib.seen) {
    return (
      <span className="mode-alert-badge">
        <span className="mode-alert-success-dot" />
        <span className="tabular-nums">{lib.ready}</span>
      </span>
    )
  }
  if (lib.rendering > 0) return <RenderingDots small />
  return null
}

function LibraryFlap({ lib, selected }: { lib: LibState; selected: boolean }) {
  const unseenReady = lib.ready > 0 && !lib.seen
  const rendering = !unseenReady && lib.rendering > 0
  const label = unseenReady ? 'Ready' : rendering ? 'Rendering' : 'My Ads Library'
  const count = unseenReady ? lib.ready : rendering ? lib.rendering : null
  return (
    <StripTab side="right" selected={selected} ready={unseenReady} sc="sc-flap-library">
      {unseenReady ? (
        <CheckCircle size={16} weight="fill" className="sc-text-success" aria-hidden />
      ) : rendering ? (
        <RenderingDots />
      ) : (
        <Books size={16} weight={selected ? 'fill' : 'regular'} aria-hidden />
      )}
      <span className={cx('cockpit-tab-text', !selected && unseenReady && 'is-ready-pill')}>
        {label}
        {count != null ? <span className="tabular-nums">{count}</span> : null}
      </span>
    </StripTab>
  )
}

function Switch({
  sc,
  placeholder,
  disabled,
  open,
  children,
}: {
  sc?: string
  placeholder?: boolean
  disabled?: boolean
  open?: boolean
  children: ReactNode
}) {
  return (
    <span
      data-sc={sc}
      aria-expanded={open || undefined}
      className={cx('cockpit-switch', placeholder && 'is-placeholder', disabled && 'is-disabled')}
    >
      {children}
      <CaretDown size={12} aria-hidden />
    </span>
  )
}

function Action({
  sc,
  icon,
  label,
  suffix,
  need,
  open,
}: {
  sc?: string
  icon: ReactNode
  label: string
  suffix?: string
  need?: boolean
  open?: boolean
}) {
  return (
    <span data-sc={sc} aria-expanded={open || undefined} className={cx('cockpit-action', need && 'cockpit-need-ring')}>
      {icon}
      <span className="cockpit-action-label">
        <span className="sc-truncate">{label}</span>
        {suffix ? <span className="sc-truncate">{suffix}</span> : null}
      </span>
      <CaretDown size={12} aria-hidden />
    </span>
  )
}

function Pill({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="cockpit-choice sc-pop-in" style={{ animationDelay: `${delay}ms` }}>
      {children}
      <span className="cockpit-choice-x">
        <X size={12} />
      </span>
    </span>
  )
}

function Stack({ items }: { items: { id: string; src: string }[] }) {
  if (items.length === 0) return null
  const width = 80 + (items.length - 1) * 12
  return (
    <div className="cockpit-stack" style={{ width }}>
      {items.map((item, index) => (
        <div key={item.id} className="cockpit-stack-card sc-drop-in" style={{ left: index * 12, zIndex: index + 1 }}>
          <img src={item.src} alt="" className="sc-cover" />
          {index === items.length - 1 ? (
            <span className="sc-stack-x" aria-hidden>
              <X size={10} weight="bold" />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}

const SIZE_TILES = [
  { id: 'sq', ratio: '1:1', name: 'Square' },
  { id: '45', ratio: '4:5', name: 'Portrait' },
  { id: '916', ratio: '9:16', name: 'Story / Reel' },
  { id: '169', ratio: '16:9', name: 'Landscape' },
  { id: '191', ratio: '1.91:1', name: 'Feed Banner' },
  { id: '23', ratio: '2:3', name: 'Pinterest Pin' },
]

function RatioIcon({ ratio }: { ratio: string }) {
  const [rawW, rawH] = ratio.split(':').map(Number)
  const scale = Math.min(22 / rawW, 16 / rawH)
  return (
    <span className="sc-ratio" aria-hidden>
      <span style={{ width: Math.max(4, Math.round(rawW * scale)), height: Math.max(4, Math.round(rawH * scale)) }} />
    </span>
  )
}

function SettingsPanel({ sizes }: { sizes: number }) {
  const chosen = new Set(sizes >= 1 ? (sizes >= 2 ? ['45', 'sq'] : ['45']) : [])
  return (
    <div className="cockpit-panel sc-settings sc-pop-up">
      <p className="cockpit-pop-title">Settings</p>
      <div className="sc-settings-body">
        <div>
          <p className="cockpit-group-label">Quality</p>
          <div className="sc-seg">
            <span className="is-on">Standard</span>
            <span>Pro</span>
          </div>
        </div>
        <div>
          <p className="cockpit-group-label">Resolution</p>
          <div className="sc-seg">
            <span className="is-on">
              1K<small>1 token</small>
            </span>
            <span>
              2K<small>2 tokens</small>
            </span>
            <span>
              4K<small>4 tokens</small>
            </span>
          </div>
        </div>
        <div>
          <p className="cockpit-group-label">Size</p>
          <div className="sc-size-grid">
            {SIZE_TILES.map((tile) => (
              <span
                key={tile.id}
                data-sc={`sc-size-${tile.id}`}
                className={cx('cockpit-size-tile', chosen.has(tile.id) && 'is-selected')}
              >
                <RatioIcon ratio={tile.ratio} />
                <span className="sc-size-label">{tile.ratio}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BrandDrop() {
  return (
    <div className="cockpit-pop sc-brand-pop sc-pop-up">
      <p className="cockpit-pop-title">Brand or campaign</p>
      <div className="sc-search">Search brands</div>
      <span className="cockpit-row">No brand</span>
      <span className="cockpit-row" data-sc="sc-brand-row">
        <img src={BRAND.logo} alt="" className="sc-brand-mark" />
        <span>{BRAND.name}</span>
      </span>
      <span className="cockpit-row">
        <span className="sc-letter" style={{ background: '#e5a33d' }}>S</span>
        <span>Summer Sale</span>
      </span>
    </div>
  )
}

function tokensFor(state: SceneState) {
  if (state.mode === 'video') return state.templates.video > 0 ? VIDEO_PRICE : 0
  return state.templates.image * state.sizes
}

export function Cockpit({ state }: { state: SceneState }) {
  const { mode } = state
  const other: Mode = mode === 'image' ? 'video' : 'image'
  const count = state.templates[mode]
  const usedItems = state.sv.used.flatMap((id) => { const src = usedSrc(id); return src ? [{ id, src }] : [] })
  const picked = mode === 'image' && usedItems.length > 0 ? usedItems : (mode === 'video' ? PICKED_VIDEO : PICKED_IMAGE).slice(0, count)
  const ads = mode === 'video' ? count : count * state.sizes
  const sizeLabel = state.sizes === 0 ? 'Size' : state.sizes === 1 ? '4:5' : '2 sizes'
  const summary =
    mode === 'video'
      ? `Standard · 720p · ${ads} ${ads === 1 ? 'ad' : 'ads'}`
      : `Standard · 1K · ${sizeLabel} · ${ads} ${ads === 1 ? 'ad' : 'ads'}`
  const lit = count > 0 && (mode === 'video' || state.sizes > 0)
  const price = tokensFor(state)
  const collapsedLabel = `${ACCOUNT.workspace} / ${mode === 'video' ? 'Video' : 'Image'} / Clone`
  const balance = balanceFor(state)
  const signature = [mode, state.route, state.lib.image.ready, state.lib.image.rendering, state.lib.image.seen, state.lib.video.ready, state.lib.video.rendering, state.lib.video.seen, state.cockpitOpen].join('|')

  return (
    <div className="cockpit sc-dock" data-sc="sc-dock">
      <div className="sc-dock-main">
        <div className={cx('sc-dock-open', !state.cockpitOpen && 'is-hidden')}>
          <div className="cockpit-shell" data-sc="sc-cockpit">
            <CockpitFrame signature={signature} />
            <div className="cockpit-strip-row">
              <div className="cockpit-strip is-left" data-strip="left">
                <div className="cockpit-strip-tabs">
                  <StripTab side="left" outer selected={mode === 'image'} sc="sc-flap-image" wiggle={state.wiggle === 'image'}>
                    <ImageIcon size={16} weight={mode === 'image' ? 'fill' : 'regular'} aria-hidden />
                    <span className="cockpit-tab-text">Image</span>
                    {other === 'image' ? <ModeMark lib={state.lib.image} /> : null}
                  </StripTab>
                  <StripTab side="left" selected={mode === 'video'} sc="sc-flap-video" wiggle={state.wiggle === 'video'}>
                    <VideoCamera size={16} weight={mode === 'video' ? 'fill' : 'regular'} aria-hidden />
                    <span className="cockpit-tab-text">Video</span>
                    {other === 'video' ? <ModeMark lib={state.lib.video} /> : null}
                  </StripTab>
                </div>
              </div>
              <div className="cockpit-strip is-right" data-strip="right">
                <div className="cockpit-strip-tabs">
                  <StripTab side="right" selected={state.route === 'browse'} sc="sc-flap-browse">
                    <SquaresFour size={16} weight={state.route === 'browse' ? 'fill' : 'regular'} aria-hidden />
                    <span className="cockpit-tab-text">Browse Templates</span>
                  </StripTab>
                  <StripTab side="right">
                    <Megaphone size={16} aria-hidden />
                    <span className="cockpit-tab-text">Brands &amp; Campaigns</span>
                  </StripTab>
                  <StripTab side="right" selected={state.route === 'saved'} sc="sc-flap-saved">
                    <BookmarkSimple size={16} weight={state.route === 'saved' ? 'fill' : 'regular'} aria-hidden />
                    <span className="cockpit-tab-text">Saved Templates</span>
                  </StripTab>
                  <LibraryFlap lib={state.lib[mode]} selected={state.route === 'library'} />
                  <span data-strip-tab="" data-tab-kind="min" data-selected="false" className="cockpit-tab cockpit-tab-min">
                    <CaretDown size={16} aria-hidden />
                  </span>
                </div>
              </div>
            </div>

            <div className="cockpit-prompt">
              <div className="cockpit-body">
                <div className="cockpit-topline">
                  <div className="cockpit-topline-main">
                    <span className="sc-rel">
                      <Switch sc="sc-cockpit-ws" open={state.wsPick === 'cockpit'}>
                        {state.wsCur >= 1 ? <UsersFour size={16} aria-hidden /> : <UserCircleCheck size={16} aria-hidden />}
                        <span>{state.wsCur >= 1 ? 'Studio Team' : ACCOUNT.workspace}</span>
                      </Switch>
                      <WsDropdown state={state} where="cockpit" />
                    </span>
                    <span className="sc-rel">
                      <Switch sc="sc-brand-switch" placeholder={!state.brand} open={state.pop === 'brand'}>
                        {state.brand ? (
                          <img src={BRAND.logo} alt="" className="sc-brand-mark is-16" />
                        ) : (
                          <Megaphone size={16} aria-hidden />
                        )}
                        <span>{state.brand ? BRAND.name : 'Brand or campaign'}</span>
                      </Switch>
                      {state.pop === 'brand' ? <BrandDrop /> : null}
                    </span>
                    <Switch disabled={!state.brand}>
                      <ImageIcon size={16} aria-hidden />
                      <span>{state.brand ? 'Choose product' : 'Product'}</span>
                    </Switch>
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
                        <TextT size={15} aria-hidden />
                        <span>{BRAND.adCopies} ad copies</span>
                      </Pill>
                    ) : null}
                    {state.pills >= 4 ? (
                      <Pill>
                        <span>{BRAND.audience[0]}</span>
                      </Pill>
                    ) : null}
                    {state.pills >= 5 ? (
                      <Pill>
                        <span>{BRAND.audience[1]}</span>
                      </Pill>
                    ) : null}
                  </div>
                  <div className="cockpit-topline-side">
                    <div className="cockpit-prompt-tools">
                      <span className="cockpit-prompt-tool">
                        <ClockCounterClockwise size={16} aria-hidden />
                      </span>
                      <span className="cockpit-prompt-tool is-idle">
                        <Sparkle size={16} aria-hidden />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sc-prompt-row">
                  <div className="sc-prompt-assets">
                    <span className={cx('cockpit-add-tile', count === 0 && 'is-empty cockpit-need-ring')}>
                      <Plus size={22} aria-hidden />
                    </span>
                    <div className="cockpit-bundles">
                      <span className="sc-rel" data-sc="sc-stack">
                        <Stack items={picked} />
                        <ThumbStrip state={state} />
                      </span>
                      {state.added && state.added.text.length > 0 && count > 0 ? (
                        <span key={state.added.key} className="cockpit-added sc-added">
                          {state.added.text}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="cockpit-prompt-input sc-placeholder">
                    No prompt needed. Pick your options below and press Render. Add notes here if you want.
                    {state.brand ? null : (
                      <>
                        <br />
                        Brand is off. Your ad will show &lsquo;Your brand&rsquo; with the template&rsquo;s product changed.
                      </>
                    )}
                  </div>
                </div>

                <div className="sc-bottom-row">
                  <Action icon={<Sparkle size={16} aria-hidden />} label="Skills" suffix="· Clone" />
                  <span className="cockpit-skill-info">
                    <Info size={16} aria-hidden />
                  </span>
                  <span className="sc-rel">
                    <Action
                      sc="sc-settings"
                      icon={<SlidersHorizontal size={16} aria-hidden />}
                      label={summary}
                      need={mode === 'image' && count > 0 && state.sizes === 0}
                      open={state.pop === 'settings'}
                    />
                    {state.pop === 'settings' ? <SettingsPanel sizes={state.sizes} /> : null}
                  </span>
                  <Action
                    icon={<FolderDownIcon />}
                    label={state.brand ? BRAND.name : 'Save to'}
                    need={!state.brand}
                  />
                  <span className="cockpit-reset">
                    <Broom size={16} aria-hidden />
                  </span>
                  <span className="sc-grow" />
                  {mode === 'video' ? <span className="cockpit-ratio-note">Output keeps the template&apos;s original aspect ratio.</span> : null}
                  <span className="cockpit-price">
                    <Coins size={14} aria-hidden />
                    <span className="tabular-nums">
                      {price} {price === 1 ? 'token' : 'tokens'}
                    </span>
                  </span>
                  <span
                    data-sc="sc-render"
                    className={cx('cockpit-render', lit || state.busy ? 'cockpit-render-lit' : 'cockpit-render-idle')}
                  >
                    {state.busy ? <CircleNotch size={16} className="sc-spin" aria-hidden /> : <Lightning size={16} aria-hidden />}
                    Render
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx('cockpit-prompt is-collapsed sc-dock-bar', state.cockpitOpen && 'is-hidden')} data-sc="sc-dock-bar">
          <span className="sc-dock-bar-label">
            <UserCircleCheck size={16} aria-hidden />
            <span className="cockpit-summary">{collapsedLabel}</span>
          </span>
          <span className="cockpit-icon-btn">
            <CaretUp size={16} aria-hidden />
          </span>
          <span className="cockpit-price">
            <Coins size={14} aria-hidden />
            <span className="tabular-nums">{price} tokens</span>
          </span>
          <span className={cx('cockpit-render', lit ? 'cockpit-render-lit' : 'cockpit-render-idle')}>
            <Lightning size={16} aria-hidden />
            Render
          </span>
        </div>
      </div>

      {state.cockpitOpen ? (
        <div className="cockpit-mini sc-mini">
          <div className="sc-mini-top">
            <span className="sc-mini-tokens tabular-nums" data-sc="sc-mini-tokens">
              <Coins size={16} aria-hidden />
              {balance}
            </span>
            <span className="sc-mini-model">
              Model <Info size={12} aria-hidden />
            </span>
          </div>
          <div className="sc-mini-orbs">
            <span className="cockpit-orb" data-sc="sc-home-orb">
              <HomeGlyph selected={state.screen === 'home'} />
            </span>
            <span className="cockpit-orb" data-sc="sc-profile-orb">
              <span className="cockpit-avatar-fallback">{ACCOUNT.initial}</span>
            </span>
            <span className="cockpit-orb">
              <HelpBubble />
            </span>
          </div>
        </div>
      ) : (
        <span className="cockpit-orb sc-help-solo">
          <HelpBubble />
        </span>
      )}
    </div>
  )
}

/** Lucide "folder-down" (ISC), the app's Save to icon. */
function FolderDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      <path d="M12 10v6" />
      <path d="m15 13-3 3-3-3" />
    </svg>
  )
}

function HomeGlyph({ selected }: { selected: boolean }) {
  return (
    <span className={cx('sc-home-glyph', selected && 'is-selected')} aria-hidden>
      <img className="for-light for-line" src="/brand/adrender-home-line-light.svg" alt="" width={20} height={20} />
      <img className="for-dark for-line" src="/brand/adrender-home-line-dark.svg" alt="" width={20} height={20} />
      <img className="for-light for-fill" src="/brand/adrender-home-fill-light.svg" alt="" width={20} height={20} />
      <img className="for-dark for-fill" src="/brand/adrender-home-fill-dark.svg" alt="" width={20} height={20} />
    </span>
  )
}

function HelpBubble() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" aria-hidden>
      <defs>
        <linearGradient id="sc-help-grad" x1="28" y1="28" x2="228" y2="228" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--brand-from)" />
          <stop offset="50%" stopColor="var(--brand-via)" />
          <stop offset="100%" stopColor="var(--brand-to)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sc-help-grad)"
        d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"
      />
    </svg>
  )
}
