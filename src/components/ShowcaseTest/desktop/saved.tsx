/* eslint-disable react-refresh/only-export-components */
import {
  BookmarkSimple,
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  DownloadSimple,
  FolderSimple,
  FolderSimplePlus,
  Lightning,
  MagnifyingGlass,
  PencilSimple,
  ShareNetwork,
  SquaresFour,
  Star,
  Tag,
  Trash,
  X,
} from '@phosphor-icons/react'
import { IMAGE_TEMPLATES, type Media } from '../showcaseData'
import type { SceneState } from '../engine/story'
import { cx } from '../../site/cx'
import { LIB_ADS } from './adslib'
import { useRef } from 'react'
import { CardTools, CardUse, Density, glowFor, HeaderSelBar, PageNav, ResetView, useFlip } from './chrome'

/** Saved templates shown in the tutorial. `kw` feeds the search box. */
export type SavedItem = { id: string; media: Media; coll: number; ratio: '4:5' | '1:1' | '9:16'; kw: string; savedOn: string }

const ratioOf = ['4:5', '1:1', '4:5', '9:16', '4:5', '1:1', '4:5', '1:1'] as const
const collOf = [1, 2, 1, 2, 1, 2, 1, 2]
const kwOf = ['beauty skincare serum', 'fitness gym', 'skincare glow', 'fashion', 'footwear shoes', 'food drink', 'wellness', 'home']
const savedOf = ['11/19/2026', '11/18/2026', '11/16/2026', '11/14/2026', '11/12/2026', '11/10/2026', '11/7/2026', '11/3/2026']

export const SAVED_ITEMS: SavedItem[] = IMAGE_TEMPLATES.map((media, index) => ({
  id: media.id,
  media,
  coll: collOf[index],
  ratio: ratioOf[index],
  kw: `${media.brand} ${media.niche} ${kwOf[index]}`.toLowerCase(),
  savedOn: savedOf[index],
}))

/** Picture for any id sent to the cockpit: a saved template or a library ad. */
export function usedSrc(id: string): string | undefined {
  return SAVED_ITEMS.find((entry) => entry.id === id)?.media.src ?? LIB_ADS.find((entry) => entry.id === id)?.src
}

export const SAVED_COLLECTIONS = ['Winning hooks', 'Summer promos']

/** The template starred in the tutorial: far enough back that the jump to the front is easy to see. */
export const STARRED = 'i4'

/** The grid, after search, size, collection and star. Starred templates come first. */
export function visibleSaved(state: SceneState): SavedItem[] {
  const { sv } = state
  let list = SAVED_ITEMS.filter((item) => (sv.coll === 0 ? true : item.coll === sv.coll))
  const q = sv.q.trim().toLowerCase()
  if (q) list = list.filter((item) => item.kw.includes(q) || (sv.labels[item.id] ?? '').toLowerCase().includes(q))
  if (sv.size === 1) list = list.filter((item) => item.ratio === '4:5')
  if (sv.starred) {
    const first = list.find((item) => item.id === STARRED)
    if (first) list = [first, ...list.filter((item) => item !== first)]
  }
  return list
}

function Card({ item, state, phone }: { item: SavedItem; state: SceneState; phone: boolean }) {
  const { sv } = state
  const hover = state.hover === item.id
  const on = sv.sel.includes(item.id)
  const showTools = phone || hover || on || sv.sel.length > 0
  const label = sv.labels[item.id] ?? ''
  const editing = sv.editId === item.id && sv.editIn === 'card'
  const starred = sv.starred && item.id === STARRED
  const plus = state.templates.image > 0
  return (
    <div
      className={cx('sc-sv-card scv2-sv-card', on && 'is-picked', hover && 'is-hover')}
      style={{ ['--glow' as string]: glowFor(item.id) }}
      data-sc={`sc-sv-card-${item.id}`}
      data-flip={item.id}
    >
      <div className="sc-sv-media" data-sc={`sc-sv-media-${item.id}`}>
        <img src={item.media.src} alt="" className="sc-cover" />
        <CardTools prefix="sc-sv" id={item.id} on={on} show={showTools} />
        <CardUse sc={`sc-sv-use-${item.id}`} plus={plus} show={hover || phone} />
      </div>
      <div className="scv2-card-foot">
        <span className="scv2-card-row">
          <span className="scv2-avatar" style={{ background: item.media.tint }}>
            {item.media.brand.charAt(0)}
          </span>
          <span className="scv2-card-title sc-truncate">{item.media.brand}</span>
          <span className={cx('sc-sv-star', starred && 'is-on')} data-sc={`sc-sv-star-${item.id}`}>
            <Star size={16} weight={starred ? 'fill' : 'regular'} />
          </span>
        </span>
        <span className="scv2-chips">
          <i>{item.media.niche}</i>
          <i>{item.media.days} days</i>
        </span>
        <span className="scv2-card-meta">Saved on {item.savedOn}</span>
        <span className="scv2-card-label-row">
          <Tag size={13} />
          {editing ? (
            <span className="scv2-label is-edit" data-sc={`sc-sv-label-${item.id}`}>
              {sv.draft}
              <i className="sc-caret" />
            </span>
          ) : (
            <span className={cx('scv2-label', !label && 'is-empty')} data-sc={`sc-sv-label-${item.id}`}>
              {label || 'Add label'}
            </span>
          )}
          <span className="scv2-trash">
            <Trash size={14} />
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
        {state.sv.coll === 0 ? <Check size={14} /> : null}
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

/** Phone: the selection bar sits above the grid. Desktop: it replaces the header row actions. */
export function SelectionPill({ state }: { state: SceneState }) {
  const n = state.sv.sel.length
  if (n === 0) return null
  return (
    <div className="sc-sv-selbar scv2-ph-selbar sc-rise-in">
      <HeaderSelBar n={n} prefix="sc-sv" />
    </div>
  )
}

function MoveDialog({ state }: { state: SceneState }) {
  if (!state.sv.move) return null
  const n = Math.max(1, state.sv.sel.length)
  return (
    <div className="sc-modal-scrim">
      <div className="sc-modal is-small scv2-modal" data-sc="sc-sv-move-dialog">
        <div className="sc-modal-head">
          <span>
            Move {n} {n === 1 ? 'template' : 'templates'} to collection
          </span>
          <X size={16} />
        </div>
        <div className="sc-modal-body">
          <p className="scv2-modal-sub">Choose which collection the saved templates should go in.</p>
          <p className="scv2-modal-label">Folder</p>
          <span className="scv2-select">
            <FolderSimple size={15} />
            Winning hooks
            <CaretDown size={12} />
          </span>
          <div className="sc-modal-foot">
            <span className="sc-btn is-secondary" data-sc="sc-sv-move-cancel">
              Cancel
            </span>
            <span className="sc-btn is-primary" data-sc="sc-sv-move-go">
              Move
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewCollection({ state }: { state: SceneState }) {
  if (!state.sv.newDlg) return null
  return (
    <div className="sc-modal-scrim">
      <div className="sc-modal is-small scv2-modal" data-sc="sc-sv-new-dialog">
        <div className="sc-modal-head">
          <span>New collection</span>
          <X size={16} />
        </div>
        <div className="sc-modal-body">
          <p className="scv2-modal-label">Name</p>
          <span className="sc-input is-focus">
            {state.sv.collName ? <span className="sc-input-text">{state.sv.collName}</span> : <span className="sc-input-ph">e.g. Holiday promos</span>}
            <span className="sc-caret" />
          </span>
          <div className="sc-modal-foot">
            <span className="sc-btn is-secondary">Cancel</span>
            <span className="sc-btn is-primary" data-sc="sc-sv-new-go">
              Create
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Full-window details: the template large on the left, Ad details on the right. */
/** Details and dialogs sit above the whole app window, so they are seen on phone too. */
export function SavedOverlays({ state }: { state: SceneState }) {
  return (
    <>
      <SavedDetail state={state} />
      <MoveDialog state={state} />
      <NewCollection state={state} />
    </>
  )
}

function SavedDetail({ state }: { state: SceneState }) {
  const id = state.sv.detail
  const item = SAVED_ITEMS.find((entry) => entry.id === id)
  if (!item) return null
  const editing = state.sv.editId === item.id && state.sv.editIn === 'detail'
  const label = state.sv.labels[item.id] ?? ''
  const starred = state.sv.starred && item.id === STARRED
  return (
    <div className="scv2-detail sc-fade-in" data-sc="sc-sv-detail-wrap">
      <div className="scv2-detail-stage">
        <span className="scv2-detail-arrow is-left">
          <CaretLeft size={16} />
        </span>
        <img src={item.media.src} alt="" />
        <span className="scv2-detail-arrow is-right">
          <CaretRight size={16} />
        </span>
      </div>
      <aside className="scv2-detail-panel" data-sc="sc-sv-detail">
        <div className="scv2-detail-head">
          <span>Ad details</span>
          <span className="scv2-icon-btn" data-sc="sc-sv-d-close">
            <X size={16} />
          </span>
        </div>
        <div className="scv2-detail-brand">
          <span className="scv2-avatar is-lg" style={{ background: item.media.tint }}>
            {item.media.brand.charAt(0)}
          </span>
          <span className="sc-grow">
            <b>{item.media.brand}</b>
            <small>Saved on {item.savedOn}</small>
          </span>
          <span className={cx('sc-sv-star', starred && 'is-on')} data-sc="sc-sv-d-star">
            <Star size={17} weight={starred ? 'fill' : 'regular'} />
          </span>
          <span className="scv2-trash">
            <Trash size={16} />
          </span>
        </div>
        {editing ? (
          <span className="scv2-label is-edit is-block" data-sc="sc-sv-d-label">
            {state.sv.draft}
            <i className="sc-caret" />
          </span>
        ) : (
          <span className={cx('scv2-label is-block', !label && 'is-empty')} data-sc="sc-sv-d-label">
            {label || 'Add label'}
          </span>
        )}
        <div className={cx('scv2-collapse', state.sv.dOpen && 'is-open')} data-sc="sc-sv-d-toggle">
          <span className="scv2-collapse-head">
            Template details
            <CaretDown size={14} />
          </span>
          {state.sv.dOpen ? (
            <dl className="scv2-dl sc-fade-in" data-sc="sc-sv-d-list">
              <div>
                <dt>Status</dt>
                <dd>Active</dd>
              </div>
              <div>
                <dt>Days running</dt>
                <dd>{item.media.days}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Image</dd>
              </div>
              <div>
                <dt>Niche</dt>
                <dd>{item.media.niche}</dd>
              </div>
              <div>
                <dt>Target market</dt>
                <dd>B2C</dd>
              </div>
              <div>
                <dt>Platforms</dt>
                <dd>Facebook, Instagram</dd>
              </div>
              <div>
                <dt>Output size</dt>
                <dd>{item.ratio}</dd>
              </div>
            </dl>
          ) : null}
        </div>
        <span className="sc-grow" />
        <div className="scv2-detail-foot">
          <span className="scv2-icon-btn is-boxed" data-sc="sc-sv-d-dl">
            <DownloadSimple size={16} />
          </span>
          <span className="scv2-icon-btn is-boxed" data-sc="sc-sv-d-share">
            <ShareNetwork size={16} />
          </span>
          <span className="sc-btn is-primary is-sm" data-sc="sc-sv-d-use">
            <Lightning size={15} />
            {state.templates.image > 0 ? '+ Use template' : 'Use template'}
          </span>
        </div>
      </aside>
    </div>
  )
}

export function SavedScreen({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const { sv } = state
  const items = visibleSaved(state)
  const gridRef = useRef<HTMLDivElement>(null)
  useFlip(gridRef, items.map((item) => item.id).join(','))
  const folder = sv.coll === 0 ? 'All templates' : SAVED_COLLECTIONS[sv.coll - 1]
  return (
    <div className={cx('sc-browse sc-sv', phone && 'is-phone')}>
      <header className="sc-page-header">
        <div className="sc-page-row">
          <span className="sc-rel scv2-title-wrap">
            <p className="cockpit-page-title sc-sv-title" data-sc="sc-sv-title">
              <BookmarkSimple size={16} />
              {phone ? null : (
                <>
                  <span className="cockpit-page-title-name">My Saved Image Templates</span>
                  <span className="scv2-title-slash">/</span>
                </>
              )}
              <span className={cx(phone ? 'cockpit-page-title-name' : 'scv2-title-folder')}>{phone ? (sv.coll === 0 ? 'Saved Templates' : folder) : folder}</span>
              <CaretDown size={12} />
            </p>
            <CollectionsMenu state={state} />
          </span>
          {phone ? null : <HeaderSelBar n={sv.sel.length} prefix="sc-sv" />}
          {phone || sv.sel.length ? null : <PageNav state={state} current="saved" />}
        </div>
        <div className="sc-page-tools">
          <span className={cx('sc-search sc-sv-search', phone ? 'is-grow' : 'scv2-search-md')} data-sc="sc-sv-search">
            <MagnifyingGlass size={16} />
            {sv.q ? <span className="sc-sv-q">{sv.q}</span> : 'Search saved templates'}
          </span>
          {phone ? null : (
            <span className="scv2-drop" data-sc="sc-sv-niche">
              Niche
              <CaretDown size={12} />
            </span>
          )}
          <span className="sc-rel">
            <span className={cx('scv2-drop sc-sv-size', sv.size !== 0 && 'is-on')} data-sc="sc-sv-size">
              {sv.size === 1 ? 'Portrait 4:5' : 'All sizes'}
              <CaretDown size={12} />
            </span>
            <SizeMenu state={state} />
          </span>
          {phone ? null : (
            <>
              <Density value={sv.cols} prefix="sc-sv" />
              <ResetView sc="sc-sv-reset" tip={state.hover === 'reset'} />
            </>
          )}
        </div>
      </header>
      {phone ? <SelectionPill state={state} /> : null}
      <div ref={gridRef} className={cx('sc-sv-grid', sv.cols === 4 && 'is-four', sv.cols === 5 && 'is-four scv2-five', phone && 'is-phone')} data-sc="sc-sv-grid">
        {items.map((item) => (
          <Card key={item.id} item={item} state={state} phone={phone} />
        ))}
      </div>
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
