/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import type { ReactNode } from 'react'
import {
  BookmarkSimple,
  Books,
  Broom,
  Check,
  DownloadSimple,
  FolderSimple,
  FolderSimplePlus,
  Image as ImageIcon,
  Lightning,
  ListChecks,
  Megaphone,
  Plus,
  ShareNetwork,
  SquaresFour,
  Trash,
  VideoCamera,
  X,
} from '@phosphor-icons/react'
import type { SceneState } from '../engine/story'
import { ACCOUNT } from '../showcaseData'
import { cx } from '../../site/cx'

/* Shared pieces of the app's desktop pages (Nov 2026 UI). */

export type NavPage = 'browse' | 'brands' | 'saved' | 'library' | 'home' | 'profile' | null

export function HomeGlyph({ selected }: { selected: boolean }) {
  return (
    <span className={cx('sc-home-glyph', selected && 'is-selected')} aria-hidden>
      <img className="for-light for-line" src="/brand/adrender-home-line-light.svg" alt="" width={20} height={20} />
      <img className="for-dark for-line" src="/brand/adrender-home-line-dark.svg" alt="" width={20} height={20} />
      <img className="for-light for-fill" src="/brand/adrender-home-fill-light.svg" alt="" width={20} height={20} />
      <img className="for-dark for-fill" src="/brand/adrender-home-fill-dark.svg" alt="" width={20} height={20} />
    </span>
  )
}

/** The small icon row at the top right of every page: mode, pages, home, profile. */
export function PageNav({ state, current, extra }: { state: SceneState; current: NavPage; extra?: ReactNode }) {
  const item = (id: Exclude<NavPage, null>, icon: (on: boolean) => ReactNode, after: ReactNode = null) => (
    <span className={cx('scv2-nav-btn scv2-rel', current === id && 'is-on')} data-sc={`sc-nav-${id}`}>
      {icon(current === id)}
      {after}
    </span>
  )
  const w = (on: boolean) => (on ? 'fill' : 'regular')
  // Render news: a dot over the other mode's icon, and over the library icon for this mode.
  const dot = (lib: SceneState['lib']['image']) => (lib.ready > 0 && !lib.seen ? 'is-ready' : lib.rendering > 0 ? 'is-busy' : null)
  const other = state.mode === 'image' ? 'video' : 'image'
  const otherDot = dot(state.lib[other])
  const libDot = dot(state.lib[state.mode])
  const tip = state.hover?.startsWith('nav-') ? state.hover.slice(4) : null
  const TIPS: Record<string, string> = { image: 'Image', video: 'Video', browse: 'Browse Templates', brands: 'Brands & Campaigns', saved: 'Saved Templates', library: 'My Ads Library', home: 'Home', profile: 'Profile' }
  const tipEl = (id: string) => (tip === id ? <span className="scv2-tip is-below">{TIPS[id]}</span> : null)
  return (
    <span className="scv2-nav">
      {extra}
      <span className={cx('scv2-nav-btn scv2-rel', state.mode === 'image' && 'is-on')} data-sc="sc-nav-image">
        <ImageIcon size={18} weight={w(state.mode === 'image')} />
        {other === 'image' && otherDot ? <i className={cx('scv2-nav-dot', otherDot)} /> : null}
        {tipEl('image')}
      </span>
      <span className={cx('scv2-nav-btn scv2-rel', state.mode === 'video' && 'is-on')} data-sc="sc-nav-video">
        <VideoCamera size={18} weight={w(state.mode === 'video')} />
        {other === 'video' && otherDot ? <i className={cx('scv2-nav-dot', otherDot)} /> : null}
        {tipEl('video')}
      </span>
      <i className="scv2-nav-sep" />
      {item('browse', (on) => <SquaresFour size={18} weight={w(on)} />, tipEl('browse'))}
      {item('brands', (on) => <Megaphone size={18} weight={w(on)} />, tipEl('brands'))}
      {item('saved', (on) => <BookmarkSimple size={18} weight={w(on)} />, tipEl('saved'))}
      {item('library', (on) => <Books size={18} weight={w(on)} />, <>{libDot ? <i className={cx('scv2-nav-dot', libDot)} /> : null}{tipEl('library')}</>)}
      {item('home', (on) => <HomeGlyph selected={on} />)}
      <span className={cx('scv2-nav-btn is-avatar', current === 'profile' && 'is-on')} data-sc="sc-nav-profile">
        <span className="cockpit-avatar-fallback">{ACCOUNT.initial}</span>
      </span>
    </span>
  )
}

/** Cards per row: fewer, default, more. */
export function Density({ value, prefix, options = [3, 4, 5] }: { value: number; prefix: string; options?: number[] }) {
  const glyph = (index: number) =>
    index === 0 ? (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <path d="M1.5 8h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="7" y="2" width="6" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <rect x="7" y="9" width="6" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ) : index === 1 ? (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <rect x="2" y="2" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="2" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="9" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="9" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <rect x="2" y="2" width="6" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="9" width="6" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10.5 8h4M12.5 6v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  return (
    <span className="scv2-density" data-sc={`${prefix}-cols`}>
      {options.map((cols, index) => (
        <span key={cols} className={cx(value === cols && 'is-on')} data-sc={`${prefix}-cols-${cols}`}>
          {glyph(index)}
        </span>
      ))}
    </span>
  )
}

/** The broom: puts search, filters and the grid back to how they started. */
export function ResetView({ sc, tip = false }: { sc?: string; tip?: boolean }) {
  return (
    <span className="scv2-icon-btn scv2-rel" data-sc={sc}>
      <Broom size={17} />
      {tip ? <span className="scv2-tip is-below">Reset view</span> : null}
    </span>
  )
}

export function SelectCircle({ on }: { on: boolean }) {
  return <span className={cx('sc-sv-circle', on && 'is-on')}>{on ? <Check size={12} weight="bold" /> : null}</span>
}

/** Top-left of a card on hover: select, download, move to a folder. */
export function CardTools({ prefix, id, on, show }: { prefix: string; id: string; on: boolean; show: boolean }) {
  return (
    <div className={cx('sc-sv-tools', show && 'is-on')}>
      <span data-sc={`${prefix}-sel-${id}`} className="sc-sv-tool is-select">
        <SelectCircle on={on} />
      </span>
      <span data-sc={`${prefix}-dl-${id}`} className="sc-sv-tool">
        <DownloadSimple size={13} />
      </span>
      <span data-sc={`${prefix}-mv-${id}`} className="sc-sv-tool">
        <FolderSimple size={13} />
      </span>
    </div>
  )
}

/** Bottom-right of a card on hover: share (ads only), bookmark (templates), and Use. */
export function CardUse({
  sc,
  plus,
  show,
  share = false,
  save = false,
  saveSc,
  saved = false,
}: {
  sc: string
  plus: boolean
  show: boolean
  share?: boolean
  save?: boolean
  saveSc?: string
  saved?: boolean
}) {
  return (
    <div className={cx('scv2-card-use', show && 'is-on')}>
      {share ? (
        <span className="scv2-card-mini">
          <ShareNetwork size={14} />
        </span>
      ) : null}
      {save ? (
        <span className={cx('scv2-card-mini is-bare', saved && 'is-saved')} data-sc={saveSc}>
          <BookmarkSimple size={16} weight={saved ? 'fill' : 'regular'} />
        </span>
      ) : null}
      <span className="scv2-use" data-sc={sc}>
        <Lightning size={14} weight="fill" className="sc-text-accent" />
        {plus ? '+ Use' : 'Use'}
      </span>
    </div>
  )
}

/** Each card glows in its own color on hover. */
const GLOWS = ['#3db8a5', '#f08a3d', '#7b4fd4', '#d6409f', '#4f8df7', '#52ad50', '#e5a33d', '#00b8d9']
export function glowFor(id: string) {
  let n = 0
  for (const ch of id) n = (n * 31 + ch.charCodeAt(0)) % 997
  return GLOWS[n % GLOWS.length]
}

/** Selection bar that replaces the header actions when cards are picked. */
export function HeaderSelBar({
  n,
  prefix,
  approve = false,
  moveLabel = 'Move to collection',
}: {
  n: number
  prefix: string
  approve?: boolean
  moveLabel?: string
}) {
  if (n === 0) return null
  return (
    <span className="scv2-selbar sc-fade-in" data-sc={`${prefix}-selbar`}>
      <b>{n} selected</b>
      <span className="scv2-sel-btn" data-sc={`${prefix}-bar-use`}>
        <Plus size={14} />
        Use
      </span>
      {approve ? (
        <span className="scv2-sel-btn" data-sc={`${prefix}-bar-approve`}>
          <Check size={14} />
          Approve ({n})
        </span>
      ) : null}
      <span className="scv2-sel-btn" data-sc={`${prefix}-bar-move`}>
        <FolderSimple size={14} />
        {moveLabel}
      </span>
      <span className="scv2-sel-btn" data-sc={`${prefix}-bar-new`}>
        <FolderSimplePlus size={14} />
        New collection
      </span>
      <span className="scv2-sel-btn" data-sc={`${prefix}-bar-dl`}>
        <DownloadSimple size={14} />
        Download ({n})
      </span>
      <span className="scv2-sel-btn" data-sc={`${prefix}-bar-all`}>
        <ListChecks size={14} />
        Select all
      </span>
      <span className="scv2-sel-btn is-plain" data-sc={`${prefix}-bar-del`}>
        <Trash size={14} />
        Delete
      </span>
      <span className="scv2-sel-btn is-x" data-sc={`${prefix}-bar-x`}>
        <X size={14} />
      </span>
    </span>
  )
}

/** Small label tag that sits on a control (hover tooltips in the app). */
export function Tip({ text, below = true }: { text: string; below?: boolean }) {
  return <span className={cx('scv2-tip', below ? 'is-below' : 'is-above')}>{text}</span>
}

/**
 * Slide cards to their new place when the grid reorders (starring, sorting).
 * Pass the order of ids; cards need data-flip={id}.
 */
export function useFlip(ref: React.RefObject<HTMLElement | null>, order: string, ms = 1100) {
  const last = React.useRef<Map<string, DOMRect>>(new Map())
  const lastOrder = React.useRef(order)
  React.useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-flip]'))
    const now = new Map(items.map((el) => [el.dataset.flip as string, el.getBoundingClientRect()]))
    if (lastOrder.current !== order) {
      const scale = root.getBoundingClientRect().width / (root.offsetWidth || 1)
      for (const el of items) {
        const before = last.current.get(el.dataset.flip as string)
        const after = now.get(el.dataset.flip as string)
        if (!before || !after) continue
        const dx = (before.left - after.left) / scale
        const dy = (before.top - after.top) / scale
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }], { duration: ms, easing: 'cubic-bezier(0.45, 0, 0.2, 1)' })
      }
    }
    last.current = now
    lastOrder.current = order
  })
}
