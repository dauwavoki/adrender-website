/* eslint-disable react-refresh/only-export-components */
import {
  BookmarkSimple,
  CaretDown,
  Check,
  DownloadSimple,
  FolderSimple,
  FolderSimplePlus,
  GridFour,
  Lightning,
  MagnifyingGlass,
  Rows,
  SquaresFour,
  Star,
  Trash,
  X,
  PencilSimple,
  InstagramLogo,
  MetaLogo,
} from '@phosphor-icons/react'
import { IMAGE_TEMPLATES, type Media } from '../showcaseData'
import type { SceneState } from '../engine/story'
import { cx } from '../../site/cx'
import { LIB_ADS } from './adslib'

/** Saved templates shown in the tutorial. `kw` feeds the search box. */
export type SavedItem = { id: string; media: Media; coll: number; ratio: '4:5' | '1:1' | '9:16'; kw: string }

const ratioOf = ['4:5', '1:1', '4:5', '9:16', '4:5', '1:1', '4:5', '1:1'] as const
const collOf = [1, 2, 1, 2, 1, 2, 1, 2]
const kwOf = ['beauty skincare serum', 'fitness gym', 'skincare glow', 'fashion', 'footwear shoes', 'food drink', 'wellness', 'home']

export const SAVED_ITEMS: SavedItem[] = IMAGE_TEMPLATES.map((media, index) => ({
  id: media.id,
  media,
  coll: collOf[index],
  ratio: ratioOf[index],
  kw: `${media.niche} ${kwOf[index]}`.toLowerCase(),
}))

/** Picture for any id sent to the cockpit: a saved template or a library ad. */
export function usedSrc(id: string): string | undefined {
  return SAVED_ITEMS.find((entry) => entry.id === id)?.media.src ?? LIB_ADS.find((entry) => entry.id === id)?.src
}

export const SAVED_COLLECTIONS = ['Winning hooks', 'Summer promos']

/** The grid, after search, size, collection and star. */
export function visibleSaved(state: SceneState): SavedItem[] {
  const { sv } = state
  let list = SAVED_ITEMS.filter((item) => (sv.coll === 0 ? true : item.coll === sv.coll))
  const q = sv.q.trim().toLowerCase()
  if (q) list = list.filter((item) => item.kw.includes(q) || (sv.labels[item.id] ?? '').toLowerCase().includes(q))
  if (sv.size === 1) list = list.filter((item) => item.ratio === '4:5')
  if (sv.starred) {
    const first = list.find((item) => item.id === 'i2')
    if (first) list = [first, ...list.filter((item) => item !== first)]
  }
  return list
}

function SelectCircle({ on }: { on: boolean }) {
  return <span className={cx('sc-sv-circle', on && 'is-on')}>{on ? <Check size={12} weight="bold" /> : null}</span>
}

function Card({ item, state, phone }: { item: SavedItem; state: SceneState; phone: boolean }) {
  const { sv } = state
  const hover = state.hover === item.id
  const on = sv.sel.includes(item.id)
  const showTools = phone || hover || on || sv.sel.length > 0
  const label = sv.labels[item.id] ?? ''
  const editing = sv.editId === item.id && sv.editIn === 'card'
  const starred = sv.starred && item.id === 'i2'
  return (
    <div className={cx('sc-sv-card', on && 'is-picked', hover && 'is-hover')} data-sc={`sc-sv-card-${item.id}`}>
      <div className="sc-sv-media" data-sc={`sc-sv-media-${item.id}`}>
        <img src={item.media.src} alt="" className="sc-cover" />
        <div className={cx('sc-sv-tools', showTools && 'is-on')}>
          <span data-sc={`sc-sv-sel-${item.id}`} className="sc-sv-tool is-select">
            <SelectCircle on={on} />
          </span>
          <span data-sc={`sc-sv-dl-${item.id}`} className="sc-sv-tool">
            <DownloadSimple size={13} />
          </span>
          <span data-sc={`sc-sv-mv-${item.id}`} className="sc-sv-tool">
            <FolderSimplePlus size={13} />
          </span>
        </div>
        <div className={cx('sc-sv-actions', (hover || phone) && 'is-on')}>
          <span className="sc-btn is-ghost is-icon">
            <Trash size={16} />
          </span>
          <span className="sc-btn is-secondary is-sm" data-sc={`sc-sv-use-${item.id}`}>
            <Lightning size={16} className="sc-text-accent" />
            Use
          </span>
        </div>
      </div>
      <div className="sc-sv-foot">
        <span className="sc-tpl-brand">
          <span className="sc-letter" style={{ background: item.media.tint }}>
            {item.media.niche.charAt(0)}
          </span>
          <span className="sc-truncate">{item.media.niche}</span>
        </span>
        <span className="sc-sv-foot-row">
          {editing ? (
            <span className="sc-sv-label is-edit" data-sc={`sc-sv-label-${item.id}`}>
              {sv.draft}
              <i className="sc-caret" />
            </span>
          ) : (
            <span className={cx('sc-sv-label', !label && 'is-empty')} data-sc={`sc-sv-label-${item.id}`}>
              {label || 'Add label'}
            </span>
          )}
          <span className={cx('sc-sv-star', starred && 'is-on')} data-sc={`sc-sv-star-${item.id}`}>
            <Star size={16} weight={starred ? 'fill' : 'regular'} />
          </span>
        </span>
      </div>
    </div>
  )
}

function CollectionsMenu({ state }: { state: SceneState }) {
  if (!state.sv.menu) return null
  const count = SAVED_ITEMS.length
  return (
    <div className="sc-sv-menu" data-sc="sc-sv-menu">
      <span className="sc-sv-menu-search">
        <MagnifyingGlass size={14} />
        Search collections
      </span>
      <span className="sc-sv-menu-row is-new" data-sc="sc-sv-new">
        <FolderSimplePlus size={16} />
        New collection
      </span>
      <span className={cx('sc-sv-menu-row', state.sv.coll === 0 && 'is-on')} data-sc="sc-sv-coll-0">
        <SquaresFour size={16} />
        All templates
        <b>{count}</b>
      </span>
      {SAVED_COLLECTIONS.map((name, index) => (
        <span key={name} className={cx('sc-sv-menu-row', state.sv.coll === index + 1 && 'is-on')} data-sc={`sc-sv-coll-${index + 1}`}>
          <FolderSimple size={16} />
          {name}
          <b>{SAVED_ITEMS.filter((item) => item.coll === index + 1).length}</b>
          <span className="sc-sv-menu-edit">
            <PencilSimple size={13} />
            <Trash size={13} />
          </span>
        </span>
      ))}
    </div>
  )
}

function SizeMenu({ state }: { state: SceneState }) {
  if (!state.sv.sizeOpen) return null
  const rows = [
    ['All sizes', 0],
    ['Square 1:1', -1],
    ['Portrait 4:5', 1],
    ['Story 9:16', -2],
  ] as const
  return (
    <div className="sc-sv-menu is-size" data-sc="sc-sv-size-menu">
      {rows.map(([name, key]) => (
        <span key={name} className={cx('sc-sv-menu-row', key === state.sv.size && 'is-on')} data-sc={key === 1 ? 'sc-sv-size-45' : key === 0 ? 'sc-sv-size-all' : undefined}>
          {name}
          {key === state.sv.size ? <Check size={14} /> : null}
        </span>
      ))}
    </div>
  )
}

export function SelectionPill({ state }: { state: SceneState }) {
  const n = state.sv.sel.length
  if (n === 0) return null
  return (
    <div className="sc-sv-selbar sc-rise-in" data-sc="sc-sv-selbar">
      <b>{n} selected</b>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-sv-bar-move">
        <FolderSimple size={14} />
        Move to collection
      </span>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-sv-bar-new">
        <FolderSimplePlus size={14} />
        New collection
      </span>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-sv-bar-dl">
        <DownloadSimple size={14} />
        Download ({n})
      </span>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-sv-bar-all">
        Select all
      </span>
      <span className="sc-btn is-ghost is-icon" data-sc="sc-sv-bar-x">
        <X size={14} />
      </span>
    </div>
  )
}

function MoveDialog({ state }: { state: SceneState }) {
  if (!state.sv.move) return null
  return (
    <div className="sc-modal-scrim">
      <div className="sc-modal is-small" data-sc="sc-sv-move-dialog">
        <div className="sc-modal-head">
          <span>Move template to collection</span>
          <X size={16} />
        </div>
        <div className="sc-modal-body">
          <span className="sc-sv-menu-row is-on">
            <FolderSimple size={16} />
            Winning hooks
            <Check size={14} />
          </span>
          <span className="sc-sv-menu-row">
            <FolderSimple size={16} />
            Summer promos
          </span>
          <div className="sc-modal-foot">
            <span className="sc-btn is-secondary" data-sc="sc-sv-move-cancel">
              Cancel
            </span>
            <span className="sc-btn is-primary">Move</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailPanel({ state }: { state: SceneState }) {
  const id = state.sv.detail
  const item = SAVED_ITEMS.find((entry) => entry.id === id)
  if (!item) return null
  const editing = state.sv.editId === item.id && state.sv.editIn === 'detail'
  const label = state.sv.labels[item.id] ?? ''
  return (
    <aside className="sc-sv-detail sc-rise-in" data-sc="sc-sv-detail">
      <div className="sc-sv-detail-head">
        <span>Template details</span>
        <span className="sc-btn is-ghost is-icon" data-sc="sc-sv-d-close">
          <X size={16} />
        </span>
      </div>
      <div className="sc-sv-detail-img">
        <img src={item.media.src} alt="" className="sc-cover" />
      </div>
      <dl className="sc-sv-detail-list">
        <div>
          <dt>Brand</dt>
          <dd>{item.media.niche}</dd>
        </div>
        <div>
          <dt>Label</dt>
          <dd>
            {editing ? (
              <span className="sc-sv-label is-edit" data-sc="sc-sv-d-label">
                {state.sv.draft}
                <i className="sc-caret" />
              </span>
            ) : (
              <span className="sc-sv-label" data-sc="sc-sv-d-label">
                {label || 'No label'}
              </span>
            )}
            <span className="sc-btn is-ghost is-sm" data-sc="sc-sv-d-change">
              <PencilSimple size={14} />
              Change label
            </span>
          </dd>
        </div>
        <div>
          <dt>Platforms</dt>
          <dd className="sc-sv-platforms">
            <MetaLogo size={14} weight="bold" />
            <InstagramLogo size={14} weight="bold" />
          </dd>
        </div>
        <div>
          <dt>Running</dt>
          <dd>{item.media.days} days · Active</dd>
        </div>
      </dl>
      <div className="sc-sv-detail-foot">
        <span className="sc-btn is-primary" data-sc="sc-sv-d-use">
          <Lightning size={16} />
          Use
        </span>
        <span className="sc-btn is-secondary" data-sc="sc-sv-d-dl">
          <DownloadSimple size={16} />
          Download
        </span>
      </div>
    </aside>
  )
}

export function SavedScreen({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const { sv } = state
  const items = visibleSaved(state)
  const title = sv.coll === 0 ? 'My Saved Image Templates' : SAVED_COLLECTIONS[sv.coll - 1]
  return (
    <div className={cx('sc-browse sc-sv', phone && 'is-phone')}>
      <header className="sc-page-header">
        <div className="sc-page-row">
          <span className="sc-rel">
            <p className="cockpit-page-title sc-sv-title" data-sc="sc-sv-title">
              <BookmarkSimple size={16} />
              <span className="cockpit-page-title-name">{title}</span>
              <CaretDown size={12} />
            </p>
            <CollectionsMenu state={state} />
          </span>
        </div>
        <div className="sc-page-tools">
          <span className="sc-search is-grow sc-sv-search" data-sc="sc-sv-search">
            <MagnifyingGlass size={16} />
            {sv.q ? <span className="sc-sv-q">{sv.q}</span> : 'Search saved templates'}
          </span>
          <span className="sc-rel">
            <span className="sc-chip sc-sv-size" data-sc="sc-sv-size">
              {sv.size === 1 ? 'Portrait 4:5' : 'All sizes'}
              <CaretDown size={12} />
            </span>
            <SizeMenu state={state} />
          </span>
          {phone ? null : (
            <span className="sc-segmented sc-sv-cols" data-sc="sc-sv-cols">
              <span className={cx(sv.cols === 3 && 'is-on')} data-sc="sc-sv-cols-3">
                <SquaresFour size={16} />
              </span>
              <span className={cx(sv.cols === 4 && 'is-on')} data-sc="sc-sv-cols-4">
                <GridFour size={16} />
              </span>
              <span>
                <Rows size={16} />
              </span>
            </span>
          )}
        </div>
      </header>
      {phone ? <SelectionPill state={state} /> : null}
      <div className={cx('sc-sv-grid', sv.cols === 4 && 'is-four', phone && 'is-phone')} data-sc="sc-sv-grid">
        {items.map((item) => (
          <Card key={item.id} item={item} state={state} phone={phone} />
        ))}
      </div>
      {phone ? null : <SelectionPill state={state} />}
      <DetailPanel state={state} />
      <MoveDialog state={state} />
    </div>
  )
}

/** Cockpit thumbnails spread side by side (hover), and the large preview (click). */
export function ThumbStrip({ state }: { state: SceneState }) {
  const used = state.sv.used
  if (!state.sv.stack || used.length === 0) return null
  return (
    <div className="sc-thumbstrip sc-rise-in" data-sc="sc-thumbstrip">
      {used.map((id) => {
        const src = usedSrc(id)
        if (!src) return null
        return (
          <span key={id} className="sc-thumb" data-sc={`sc-thumb-${id}`}>
            <img src={src} alt="" className="sc-cover" />
          </span>
        )
      })}
    </div>
  )
}

export function ThumbPreview({ state }: { state: SceneState }) {
  const src = state.sv.preview ? usedSrc(state.sv.preview) : undefined
  if (!src) return null
  return (
    <div className="sc-preview" data-sc="sc-preview">
      <div className="sc-preview-card sc-rise-in">
        <img src={src} alt="" />
        <span className="sc-btn is-ghost is-icon sc-preview-x">
          <X size={16} />
        </span>
      </div>
    </div>
  )
}
