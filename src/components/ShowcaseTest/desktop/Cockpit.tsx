import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Books,
  Broom,
  CaretDown,
  CaretUp,
  Check,
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
  FacebookLogo,
  GoogleLogo,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
} from '@phosphor-icons/react'
import { buildFrame, localTabPath, type FramePaths, type TabBox } from './flapShape'
import { ACCOUNT, BRAND, PICKED_IMAGE, PICKED_VIDEO } from '../showcaseData'
import type { LibState, Mode, SceneState } from '../engine/story'
import { balanceFor, offsetWithin, VIDEO_PRICE } from '../engine/layout'
import { WsDropdown } from './pages'
import { HomeGlyph } from './chrome'
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
  { id: '65', ratio: '6:5', name: 'Wide' },
  { id: '12', ratio: '1:2', name: 'Tall' },
  { id: '809', ratio: '8.09:1', name: 'Leaderboard' },
  { id: '0267', ratio: '0.267:1', name: 'Skyscraper' },
  { id: '64', ratio: '6.4:1', name: 'Banner' },
]

function RatioIcon({ ratio }: { ratio: string }) {
  const [rawW, rawH] = ratio.split(':').map(Number)
  const scale = Math.min(22 / rawW, 18 / rawH)
  return (
    <span className="sc-ratio" aria-hidden>
      <span style={{ width: Math.max(4, Math.round(rawW * scale)), height: Math.max(4, Math.round(rawH * scale)) }} />
    </span>
  )
}

const PRESETS = [1, 2, 3, 5, 8, 10, 15, 20, 30, 50, 80, 100, 150, 200]

/** Settings, as in the app: quality, resolution (live token rates), size (images), variations, total. */
function SettingsPanel({ state, ads, price }: { state: SceneState; ads: number; price: number }) {
  const video = state.mode === 'video'
  const chosen = new Set(state.sizes >= 1 ? (state.sizes >= 2 ? ['45', 'sq'] : ['45']) : [])
  const balance = balanceFor(state)
  const low = price > 0 && price >= balance
  const rows = video
    ? [
        ['480p', '5 tokens/s'],
        ['720p', '8 tokens/s'],
        ['1080p', '10 tokens/s'],
        ['4K', '11 tokens/s'],
      ]
    : [
        ['1K', '1 token'],
        ['2K', '2 tokens'],
        ['4K', '4 tokens'],
      ]
  const on = video ? '720p' : '1K'
  return (
    <div className={cx('cockpit-panel sc-settings scv2-settings sc-pop-up', video && 'is-video')} data-sc="sc-settings-panel">
      <p className="cockpit-pop-title">Settings</p>
      <div className="scv2-set-sub">
        <span>Quality</span>
        {video ? <span>Standard up to 15s · Pro up to 30s</span> : null}
      </div>
      <div className="scv2-set-seg is-two" data-sc="sc-set-quality">
        <span className="is-on">Standard</span>
        <span>Pro</span>
      </div>
      <p className="scv2-set-label">Resolution</p>
      <div className="scv2-set-seg" data-sc="sc-set-res">
        {rows.map(([name, rate]) => (
          <span key={name} className={cx(name === on && 'is-on')}>
            {name}
            <small>{rate}</small>
          </span>
        ))}
      </div>
      {video ? null : (
        <>
          <p className="scv2-set-label">Size</p>
          <div className="scv2-set-platforms" data-sc="sc-set-platforms">
            <span className="is-on">All</span>
            <span><FacebookLogo size={15} /></span>
            <span><InstagramLogo size={15} /></span>
            <span><LinkedinLogo size={15} /></span>
            <span><GoogleLogo size={15} /></span>
            <span><TiktokLogo size={15} /></span>
          </div>
          <div className="sc-size-grid scv2-size-grid" data-sc="sc-set-sizes">
            {SIZE_TILES.map((tile) => (
              <span key={tile.id} data-sc={`sc-size-${tile.id}`} className={cx('cockpit-size-tile', chosen.has(tile.id) && 'is-selected')}>
                <RatioIcon ratio={tile.ratio} />
                <span className="sc-size-label">{tile.ratio}</span>
              </span>
            ))}
          </div>
        </>
      )}
      <p className="scv2-set-label">Variations</p>
      <div className="scv2-var" data-sc="sc-set-var">
        <span className="scv2-var-track">
          <span className="scv2-var-fill" style={{ width: '0%' }} />
          <span className="scv2-var-knob" style={{ left: '0%' }} />
          {video && low ? null : (
            <span className="scv2-var-marks">
              {[1, 6, 11, 16, 20, 25, 30].map((n) => (
                <i key={n}>{n}</i>
              ))}
            </span>
          )}
        </span>
        <span className="scv2-var-step">
          1
          <span>
            <CaretUp size={10} />
            <CaretDown size={10} />
          </span>
        </span>
      </div>
      <div className={cx('scv2-set-seg is-presets', low && 'is-capped')}>
        {PRESETS.map((n) => (
          <span key={n} className={cx(n === 1 && 'is-on')}>
            {n}
          </span>
        ))}
      </div>
      {low ? <p className="scv2-set-note">Max 1 with {balance} tokens</p> : null}
      <div className="scv2-set-foot">
        <span>
          {ads} {ads === 1 ? 'ad' : 'ads'} · {price} tokens
        </span>
        <span className={cx('scv2-topup', low && 'is-lit')} data-sc="sc-set-topup">
          <Coins size={15} />
          Top up
        </span>
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

const IMPROVED =
  'A fast, authentic reaction video. Open on a close-up as the person sees the product for the first time: a genuine smile, then surprise. Natural light, handheld feel, quick cuts that match the beat. Keep the brand colors in the frame and end on the product with the headline on screen.'

function HistoryDrop() {
  const rows = [
    'A bright summer version with the product in hand, outdoors',
    'Bold sale banner, 30% off, keep the layout of the template',
    'UGC style, person talking to camera about how it feels',
  ]
  return (
    <div className="cockpit-pop scv2-pop is-right sc-pop-up" data-sc="sc-history-pop">
      <p className="cockpit-pop-title">Prompt history</p>
      {rows.map((row) => (
        <span key={row} className="cockpit-row scv2-row-1">
          <ClockCounterClockwise size={14} aria-hidden />
          <span className="sc-truncate">{row}</span>
        </span>
      ))}
    </div>
  )
}

function SkillsDrop() {
  return (
    <div className="cockpit-pop scv2-pop sc-pop-up" data-sc="sc-skills-pop">
      <p className="cockpit-pop-title">Skills</p>
      <span className="cockpit-row is-on" data-sc="sc-skill-clone">
        <Sparkle size={15} aria-hidden />
        <span className="sc-grow">Clone</span>
        <Check size={14} aria-hidden />
      </span>
    </div>
  )
}

function SkillInfo() {
  return (
    <span className="scv2-skill-tip sc-pop-up" data-sc="sc-skill-tip">
      Takes a template ad (from Browse Templates, Saved Templates or My Ads Library) and rebuilds it for your brand, with your logo, colours, product and ad copy. It keeps the template&apos;s layout and style, and for video, its motion, size and length.
    </span>
  )
}

function SaveToDrop() {
  return (
    <div className="cockpit-pop scv2-pop sc-pop-up" data-sc="sc-saveto-pop">
      <p className="cockpit-pop-title">Save to</p>
      <span className="cockpit-row">
        <Plus size={15} aria-hidden />
        <span>New collection</span>
      </span>
      {[BRAND.name, 'Summer Sale', 'Trail Collection', 'Studio Line'].map((name, index) => (
        <span key={name} className={cx('cockpit-row', index === 0 && 'is-on')}>
          <FolderDownIcon />
          <span className="sc-grow">{name}</span>
          {index === 0 ? <Check size={14} aria-hidden /> : null}
        </span>
      ))}
    </div>
  )
}

function ProductDrop() {
  return (
    <div className="cockpit-pop scv2-pop sc-pop-up" data-sc="sc-product-pop">
      <p className="cockpit-pop-title">Product</p>
      <span className="cockpit-row">No product</span>
      {BRAND.products.map((item, index) => (
        <span key={item.name} className="cockpit-row" data-sc={index === 0 ? 'sc-product-row' : undefined}>
          <img src={item.src} alt="" className="sc-brand-mark" />
          <span>{item.name}</span>
        </span>
      ))}
    </div>
  )
}

function AddDrop() {
  return (
    <div className="cockpit-pop scv2-pop is-up sc-pop-up" data-sc="sc-add-pop">
      <p className="cockpit-pop-title">Add template</p>
      <span className="cockpit-row">
        <VideoCamera size={15} aria-hidden />
        Upload video
      </span>
      <span className="cockpit-row">
        <Books size={15} aria-hidden />
        My Ads Library
      </span>
      <span className="cockpit-row">
        <BookmarkSimple size={15} aria-hidden />
        Saved Templates
      </span>
      <p className="cockpit-pop-title scv2-pop-sub">Add reference · up to 5</p>
      <span className="cockpit-row">
        <ImageIcon size={15} aria-hidden />
        Upload image
      </span>
      <span className="cockpit-row">
        <Books size={15} aria-hidden />
        My Ads Library
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
  // Render news shows in the folded bar too, so it is seen from any page or mode.
  const news = (['image', 'video'] as Mode[]).map((m) => ({ m, lib: state.lib[m] }))
  const readyNews = news.find(({ lib }) => lib.ready > 0 && !lib.seen)
  const busyNews = news.find(({ lib }) => lib.rendering > 0)
  const status = readyNews
    ? { ready: true, text: `${readyNews.lib.ready} ${readyNews.m} ${readyNews.lib.ready === 1 ? 'ad' : 'ads'} ready` }
    : busyNews
      ? { ready: false, text: `Rendering ${busyNews.lib.rendering} ${busyNews.m} ${busyNews.lib.rendering === 1 ? 'ad' : 'ads'}` }
      : null
  const readyPill = readyNews && readyNews.m === mode ? readyNews.lib.ready : 0
  const signature = [mode, state.route, state.lib.image.ready, state.lib.image.rendering, state.lib.image.seen, state.lib.video.ready, state.lib.video.rendering, state.lib.video.seen, state.cockpitOpen].join('|')

  return (
    <div className="cockpit sc-dock" data-sc="sc-dock">
      {state.added ? (
        <span key={state.added.key} className="scv2-added-toast" data-sc="sc-added-toast">
          Template added
        </span>
      ) : null}
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
                    <span className="sc-rel">
                      <Switch sc="sc-product-switch" disabled={!state.brand} placeholder={state.brand && !state.product} open={state.pop === 'product'}>
                        {state.product ? <img src={BRAND.products[0].src} alt="" className="sc-brand-mark is-16" /> : <ImageIcon size={16} aria-hidden />}
                        <span>{state.product ? BRAND.products[0].name : state.brand ? 'Choose product' : 'Product'}</span>
                      </Switch>
                      {state.pop === 'product' ? <ProductDrop /> : null}
                    </span>
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
                      <span className="sc-rel">
                        <span className="cockpit-prompt-tool" data-sc="sc-history">
                          <ClockCounterClockwise size={16} aria-hidden />
                        </span>
                        {state.pop === 'history' ? <HistoryDrop /> : null}
                      </span>
                      <span className={cx('cockpit-prompt-tool', !state.note && 'is-idle')} data-sc="sc-improve">
                        {state.improve === 1 ? <CircleNotch size={16} className="sc-spin" aria-hidden /> : <Sparkle size={16} aria-hidden />}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sc-prompt-row">
                  <div className="sc-prompt-assets">
                    <span className="sc-rel">
                      <span className={cx('cockpit-add-tile', count === 0 && 'is-empty cockpit-need-ring')} data-sc="sc-add-tile">
                        <Plus size={22} aria-hidden />
                      </span>
                      {state.pop === 'add' ? <AddDrop /> : null}
                    </span>
                    <div className="cockpit-bundles">
                      <span className="sc-rel" data-sc="sc-stack">
                        <Stack items={picked} />
                        <ThumbStrip state={state} />
                      </span>
                    </div>
                  </div>
                  {state.improve === 1 ? (
                    <div className="cockpit-prompt-input scv2-shimmer" data-sc="sc-note">
                      Rewriting your prompt...
                    </div>
                  ) : state.improve === 2 ? (
                    <div className="cockpit-prompt-input scv2-note is-long" data-sc="sc-note">
                      {IMPROVED}
                      <span className="scv2-note-reset" data-sc="sc-note-reset">
                        Reset
                      </span>
                    </div>
                  ) : state.note ? (
                    <div className="cockpit-prompt-input scv2-note" data-sc="sc-note">
                      {state.note}
                      <i className="sc-caret" />
                    </div>
                  ) : (
                    <div className="cockpit-prompt-input sc-placeholder" data-sc="sc-note">
                      No prompt needed. Pick your options below and press Render. Add notes here if you want.
                      {state.brand ? null : (
                        <>
                          <br />
                          Brand is off. Your ad will show &lsquo;Your brand&rsquo; with the template&rsquo;s product changed.
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="sc-bottom-row">
                  <span className="sc-rel">
                    <Action sc="sc-skills" icon={<Sparkle size={16} aria-hidden />} label="Skills" suffix="· Clone" open={state.pop === 'skills'} />
                    {state.pop === 'skills' ? <SkillsDrop /> : null}
                  </span>
                  <span className="cockpit-skill-info sc-rel" data-sc="sc-skill-info">
                    <Info size={16} aria-hidden />
                    {state.pop === 'info' ? <SkillInfo /> : null}
                  </span>
                  <span className="sc-rel">
                    <Action
                      sc="sc-settings"
                      icon={<SlidersHorizontal size={16} aria-hidden />}
                      label={summary}
                      need={mode === 'image' && count > 0 && state.sizes === 0}
                      open={state.pop === 'settings'}
                    />
                    {state.pop === 'settings' ? <SettingsPanel state={state} ads={ads} price={price} /> : null}
                  </span>
                  <span className="sc-rel">
                    <Action
                      sc="sc-saveto"
                      icon={<FolderDownIcon />}
                      label={state.brand ? BRAND.name : 'Save to'}
                      need={!state.brand}
                      open={state.pop === 'saveto'}
                    />
                    {state.pop === 'saveto' ? <SaveToDrop /> : null}
                  </span>
                  <span className="cockpit-reset scv2-rel" data-sc="sc-reset">
                    <Broom size={16} aria-hidden />
                    {state.hover === 'reset' ? <span className="scv2-tip is-above">Reset view</span> : null}
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
            {status ? <span key={status.text} className={cx('scv2-bar-status', status.ready ? 'is-ready' : 'is-busy')} data-sc="sc-bar-status">{status.text}</span> : null}
          </span>
          {readyPill ? (
            <span className="scv2-bar-ready" data-sc="sc-bar-ready">
              <CheckCircle size={14} weight="fill" aria-hidden />
              Ready {readyPill}
            </span>
          ) : null}
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
