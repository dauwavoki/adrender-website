/* eslint-disable react-refresh/only-export-components */
import {
  ArrowsClockwise,
  Books,
  CaretDown,
  Check,
  CircleNotch,
  DownloadSimple,
  FolderSimple,
  FolderSimplePlus,
  GridFour,
  Lightning,
  MagnifyingGlass,
  Rows,
  SquaresFour,
  Star,
  Tag,
  Trash,
  WarningCircle,
  X,
  PencilSimple,
} from '@phosphor-icons/react'
import type { SceneState } from '../engine/story'
import { BRAND } from '../showcaseData'
import { cx } from '../../site/cx'

/** Finished ads shown in the Ads Library tutorial. */
export type LibAd = { id: string; src: string; ratio: '4:5' | '1:1'; product: string; copy: string; coll: number; ready: boolean; kw: string }

const COPY = ['Run faster today', 'Built for race day', 'Light. Fast. Yours.', 'Recover like a pro', 'Your pace, upgraded', 'New season, new PB', 'Go further', 'Feel the speed']
const SRC = ['ad-04', 'ad-06', 'ad-02', 'ad-05', 'ad-01', 'ad-03', 'ad-07', 'ad-08']
const RATIO = ['4:5', '4:5', '1:1', '1:1', '4:5', '1:1', '4:5', '1:1'] as const
const COLL = [1, 2, 1, 2, 1, 2, 0, 0]

export const LIB_ADS: LibAd[] = SRC.map((file, index) => {
  const product = BRAND.products[index % BRAND.products.length].name
  return {
    id: `a${index + 1}`,
    src: `/showcase/${file}.webp`,
    ratio: RATIO[index],
    product,
    copy: COPY[index],
    coll: COLL[index],
    ready: index >= 6,
    kw: `${product} ${COPY[index]} ${BRAND.name}`.toLowerCase(),
  }
})

export const LIB_COLLECTIONS = ['Spring launch', 'Retargeting']

export function libCounts(state: SceneState) {
  const { lt } = state
  return {
    library: LIB_ADS.filter((ad) => !ad.ready || lt.approved.includes(ad.id)).length,
    ready: LIB_ADS.filter((ad) => ad.ready && !lt.approved.includes(ad.id)).length,
    rendering: lt.retried ? 4 : 2,
    failed: lt.retried ? 0 : 2,
  }
}

export function visibleLib(state: SceneState): LibAd[] {
  const { lt } = state
  if (lt.tab === 'rendering' || lt.tab === 'failed') return []
  let list =
    lt.tab === 'ready'
      ? LIB_ADS.filter((ad) => ad.ready && !lt.approved.includes(ad.id))
      : LIB_ADS.filter((ad) => (!ad.ready || lt.approved.includes(ad.id)) && (lt.coll === 0 ? true : ad.coll === lt.coll))
  const q = lt.q.trim().toLowerCase()
  if (q) list = list.filter((ad) => ad.kw.includes(q))
  if (lt.size === 1) list = list.filter((ad) => ad.ratio === '4:5')
  if (lt.starred && lt.tab === 'library') {
    const first = list.find((ad) => ad.id === 'a2')
    if (first) list = [first, ...list.filter((ad) => ad !== first)]
  }
  return list
}

function SelectCircle({ on }: { on: boolean }) {
  return <span className={cx('sc-sv-circle', on && 'is-on')}>{on ? <Check size={12} weight="bold" /> : null}</span>
}

function AdCard({ ad, state, phone }: { ad: LibAd; state: SceneState; phone: boolean }) {
  const { lt } = state
  const hover = state.hover === ad.id
  const on = lt.sel.includes(ad.id)
  const showTools = phone || hover || on || lt.sel.length > 0
  const starred = lt.starred && ad.id === 'a2'
  const ready = lt.tab === 'ready'
  return (
    <div className={cx('sc-sv-card', on && 'is-picked', hover && 'is-hover')} data-sc={`sc-lb-card-${ad.id}`}>
      <div className={cx('sc-sv-media is-square', ad.ratio === '4:5' && 'is-portrait')} data-sc={`sc-lb-media-${ad.id}`}>
        <img src={ad.src} alt="" className="sc-cover" />
        <div className={cx('sc-sv-tools', showTools && 'is-on')}>
          <span data-sc={`sc-lb-sel-${ad.id}`} className="sc-sv-tool is-select">
            <SelectCircle on={on} />
          </span>
          <span data-sc={`sc-lb-dl-${ad.id}`} className="sc-sv-tool">
            <DownloadSimple size={13} />
          </span>
          <span data-sc={`sc-lb-mv-${ad.id}`} className="sc-sv-tool">
            <FolderSimplePlus size={13} />
          </span>
        </div>
      </div>
      <div className="sc-lb-body">
        <span className="sc-lb-title">
          <span className="sc-truncate">{ad.product}</span>
          <span className={cx('sc-sv-star', starred && 'is-on')} data-sc={`sc-lb-star-${ad.id}`}>
            <Star size={16} weight={starred ? 'fill' : 'regular'} />
          </span>
        </span>
        <span className="sc-lb-brand sc-truncate">{BRAND.name}</span>
        <span className="sc-lb-copy sc-truncate">
          <Tag size={12} />
          {ad.copy}
        </span>
        <span className="sc-lb-badges">
          <i>{ad.ratio}</i>
          <i>1K</i>
          <i>Clone</i>
        </span>
        <span className="sc-lb-foot">
          <span className="sc-muted-xs">11/19/2026</span>
          {ready ? (
            <span className="sc-btn is-secondary is-xs" data-sc={`sc-lb-approve-${ad.id}`}>
              <Check size={14} className="sc-text-success" />
              Approve
            </span>
          ) : (
            <span className="sc-btn is-ghost is-icon">
              <Trash size={15} />
            </span>
          )}
        </span>
      </div>
    </div>
  )
}

function RenderingCards({ state }: { state: SceneState }) {
  const n = state.lt.retried ? 4 : 2
  return (
    <>
      {Array.from({ length: n }).map((_, index) => (
        <div key={index} className="sc-sv-card sc-lb-wait" data-sc={`sc-lb-render-${index}`}>
          <div className="sc-sv-media is-square sc-lb-spin">
            <CircleNotch size={30} className="sc-lb-spinner" />
          </div>
          <div className="sc-lb-body">
            <span className="sc-lb-title">
              <span className="sc-truncate">{BRAND.products[index % 4].name}</span>
            </span>
            <span className="sc-lb-brand sc-truncate">{BRAND.name}</span>
            <span className="sc-lb-badges">
              <i className="is-warn">Rendering</i>
            </span>
            <span className="sc-btn is-secondary is-xs" data-sc={`sc-lb-cancel-${index}`}>
              Cancel &amp; refund
            </span>
          </div>
        </div>
      ))}
    </>
  )
}

function FailedPanel({ state }: { state: SceneState }) {
  const retried = state.lt.retried
  return (
    <div className="sc-lb-failed">
      <div className="sc-lb-banner" data-sc="sc-lb-banner">
        <span>Failed generation alerts stay visible for 7 days, then they are removed automatically.</span>
        {retried ? null : (
          <span className="sc-lb-banner-actions">
            <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-retry-all">
              <ArrowsClockwise size={14} />
              Retry all (2)
            </span>
            <span className="sc-btn is-ghost is-sm">
              <Trash size={14} />
              Delete all failed
            </span>
          </span>
        )}
      </div>
      {retried ? (
        <div className="sc-lb-empty">
          <WarningCircle size={26} />
          <b>No failed generations</b>
          <span>Renders that don't finish will show up here.</span>
        </div>
      ) : (
        <div className="sc-sv-grid is-failed">
          {[0, 1].map((index) => (
            <div key={index} className="sc-sv-card sc-lb-wait" data-sc={`sc-lb-fail-${index}`}>
              <div className="sc-sv-media is-square sc-lb-bad">
                <WarningCircle size={30} />
              </div>
              <div className="sc-lb-body">
                <span className="sc-lb-title">
                  <span className="sc-truncate">{BRAND.products[index + 1].name}</span>
                </span>
                <span className="sc-lb-brand sc-truncate">The render didn't finish. No tokens were kept.</span>
                <span className="sc-btn is-secondary is-xs" data-sc={`sc-lb-retry-${index}`}>
                  <ArrowsClockwise size={14} />
                  Retry
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CollectionsMenu({ state }: { state: SceneState }) {
  if (!state.lt.menu) return null
  const count = LIB_ADS.filter((ad) => !ad.ready || state.lt.approved.includes(ad.id)).length
  return (
    <div className="sc-sv-menu" data-sc="sc-lb-menu">
      <span className="sc-sv-menu-search">
        <MagnifyingGlass size={14} />
        Search collections
      </span>
      <span className="sc-sv-menu-row is-new" data-sc="sc-lb-new">
        <FolderSimplePlus size={16} />
        New collection
      </span>
      <span className={cx('sc-sv-menu-row', state.lt.coll === 0 && 'is-on')} data-sc="sc-lb-coll-0">
        <SquaresFour size={16} />
        All ads
        <b>{count}</b>
      </span>
      {LIB_COLLECTIONS.map((name, index) => (
        <span key={name} className={cx('sc-sv-menu-row', state.lt.coll === index + 1 && 'is-on')} data-sc={`sc-lb-coll-${index + 1}`}>
          <FolderSimple size={16} />
          {name}
          <b>{LIB_ADS.filter((ad) => ad.coll === index + 1).length}</b>
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
  if (!state.lt.sizeOpen) return null
  const rows = [
    ['All sizes', 0],
    ['Square 1:1', -1],
    ['Portrait 4:5', 1],
    ['Story 9:16', -2],
  ] as const
  return (
    <div className="sc-sv-menu is-size" data-sc="sc-lb-size-menu">
      {rows.map(([name, key]) => (
        <span key={name} className={cx('sc-sv-menu-row', key === state.lt.size && 'is-on')} data-sc={key === 1 ? 'sc-lb-size-45' : key === 0 ? 'sc-lb-size-all' : undefined}>
          {name}
          {key === state.lt.size ? <Check size={14} /> : null}
        </span>
      ))}
    </div>
  )
}

export function LibSelectionPill({ state }: { state: SceneState }) {
  const n = state.lt.sel.length
  if (n === 0) return null
  return (
    <div className="sc-sv-selbar sc-rise-in" data-sc="sc-lb-selbar">
      <b>{n} selected</b>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-bar-move">
        <FolderSimple size={14} />
        Move to collection
      </span>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-bar-new">
        <FolderSimplePlus size={14} />
        New collection
      </span>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-bar-dl">
        <DownloadSimple size={14} />
        Download ({n})
      </span>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-bar-all">
        Select all
      </span>
      <span className="sc-btn is-ghost is-icon" data-sc="sc-lb-bar-x">
        <X size={14} />
      </span>
    </div>
  )
}

function MoveDialog({ state }: { state: SceneState }) {
  if (!state.lt.move) return null
  return (
    <div className="sc-modal-scrim">
      <div className="sc-modal is-small" data-sc="sc-lb-move-dialog">
        <div className="sc-modal-head">
          <span>Move ad to collection</span>
          <X size={16} />
        </div>
        <div className="sc-modal-body">
          {LIB_COLLECTIONS.map((name, index) => (
            <span key={name} className={cx('sc-sv-menu-row', index === 0 && 'is-on')}>
              <FolderSimple size={16} />
              {name}
              {index === 0 ? <Check size={14} /> : null}
            </span>
          ))}
          <div className="sc-modal-foot">
            <span className="sc-btn is-secondary" data-sc="sc-lb-move-cancel">
              Cancel
            </span>
            <span className="sc-btn is-primary">Move</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SaveDialog({ state }: { state: SceneState }) {
  if (!state.lt.saveDlg) return null
  return (
    <div className="sc-modal-scrim">
      <div className="sc-modal is-small" data-sc="sc-lb-save-dialog">
        <div className="sc-modal-head">
          <span>Save as template</span>
          <X size={16} />
        </div>
        <div className="sc-modal-body">
          {['Winning hooks', 'Summer promos'].map((name, index) => (
            <span key={name} className={cx('sc-sv-menu-row', state.lt.saveColl === index + 1 && 'is-on')} data-sc={`sc-lb-save-coll-${index + 1}`}>
              <FolderSimple size={16} />
              {name}
              {state.lt.saveColl === index + 1 ? <Check size={14} /> : null}
            </span>
          ))}
          <span className="sc-input">
            <span className="sc-input-ph">…or type a new collection name</span>
          </span>
          <div className="sc-modal-foot">
            <span className="sc-btn is-secondary">Cancel</span>
            <span className={cx('sc-btn is-primary', state.lt.saveColl === 0 && 'is-disabled')} data-sc="sc-lb-save-go">
              Save
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailPanel({ state }: { state: SceneState }) {
  const ad = LIB_ADS.find((entry) => entry.id === state.lt.detail)
  if (!ad) return null
  const starred = state.lt.starred && ad.id === 'a2'
  return (
    <aside className="sc-sv-detail sc-rise-in" data-sc="sc-lb-detail">
      <div className="sc-sv-detail-head">
        <span>Ad details</span>
        <span className="sc-btn is-ghost is-icon" data-sc="sc-lb-d-close">
          <X size={16} />
        </span>
      </div>
      <div className="sc-sv-detail-img">
        <img src={ad.src} alt="" className="sc-cover" />
      </div>
      <dl className="sc-sv-detail-list">
        <div>
          <dt>Status</dt>
          <dd>
            In library
            <span className={cx('sc-sv-star', starred && 'is-on')}>
              <Star size={16} weight={starred ? 'fill' : 'regular'} />
            </span>
          </dd>
        </div>
        <div>
          <dt>Brand</dt>
          <dd>{BRAND.name}</dd>
        </div>
        <div>
          <dt>Product</dt>
          <dd>{ad.product}</dd>
        </div>
        <div>
          <dt>Size</dt>
          <dd>
            {ad.ratio} · 1K
          </dd>
        </div>
      </dl>
      <div className="sc-sv-detail-foot is-wrap">
        <span className="sc-btn is-secondary" data-sc="sc-lb-d-dl">
          <DownloadSimple size={16} />
          Download
        </span>
        <span className="sc-btn is-secondary" data-sc="sc-lb-d-save">
          Save as template
        </span>
        <span className="sc-btn is-primary" data-sc="sc-lb-d-use">
          <Lightning size={16} />
          Use
        </span>
      </div>
    </aside>
  )
}

const TABS = [
  ['library', 'Library'],
  ['ready', 'Ready'],
  ['rendering', 'Rendering'],
  ['failed', 'Failed'],
] as const

export function LibraryTutScreen({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const { lt } = state
  const counts = libCounts(state)
  const items = visibleLib(state)
  const title = lt.coll === 0 || lt.tab !== 'library' ? 'My Image Ads Library' : LIB_COLLECTIONS[lt.coll - 1]
  return (
    <div className={cx('sc-browse sc-sv sc-lb', phone && 'is-phone')}>
      <header className="sc-page-header">
        <div className="sc-page-row">
          <span className="sc-rel">
            <p className="cockpit-page-title sc-sv-title" data-sc="sc-lb-title">
              <Books size={16} />
              <span className="cockpit-page-title-name">{title}</span>
              <CaretDown size={12} />
            </p>
            <CollectionsMenu state={state} />
          </span>
          {lt.tab === 'ready' && counts.ready > 0 ? (
            <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-approve-all">
              <Check size={15} className="sc-text-success" />
              Approve all ({counts.ready})
            </span>
          ) : null}
        </div>
        <div className="sc-page-tools">
          <span className="sc-segmented is-status sc-lb-tabs" data-sc="sc-lb-tabs">
            {TABS.map(([id, label]) => (
              <span key={id} className={cx(lt.tab === id && 'is-on')} data-sc={`sc-lb-tab-${id}`}>
                {label} <b className={cx('sc-count', id === 'ready' && 'is-ready')}>{counts[id]}</b>
              </span>
            ))}
          </span>
          {phone ? null : (
            <>
              <span className="sc-search is-grow sc-sv-search" data-sc="sc-lb-search">
                <MagnifyingGlass size={16} />
                {lt.q ? <span className="sc-sv-q">{lt.q}</span> : 'Search brand, product, copy…'}
              </span>
              <span className="sc-rel">
                <span className="sc-chip sc-sv-size" data-sc="sc-lb-size">
                  {lt.size === 1 ? 'Portrait 4:5' : 'All sizes'}
                  <CaretDown size={12} />
                </span>
                <SizeMenu state={state} />
              </span>
              <span className="sc-segmented sc-sv-cols" data-sc="sc-lb-cols">
                <span className={cx(lt.cols === 3 && 'is-on')} data-sc="sc-lb-cols-3">
                  <SquaresFour size={16} />
                </span>
                <span className={cx(lt.cols === 4 && 'is-on')} data-sc="sc-lb-cols-4">
                  <GridFour size={16} />
                </span>
                <span>
                  <Rows size={16} />
                </span>
              </span>
            </>
          )}
        </div>
        {phone ? (
          <div className="sc-page-tools">
            <span className="sc-search is-grow sc-sv-search" data-sc="sc-lb-search">
              <MagnifyingGlass size={16} />
              {lt.q ? <span className="sc-sv-q">{lt.q}</span> : 'Search brand, product, copy…'}
            </span>
            <span className="sc-rel">
              <span className="sc-chip sc-sv-size" data-sc="sc-lb-size">
                {lt.size === 1 ? 'Portrait 4:5' : 'All sizes'}
                <CaretDown size={12} />
              </span>
              <SizeMenu state={state} />
            </span>
          </div>
        ) : null}
      </header>
      {phone ? <LibSelectionPill state={state} /> : null}
      {lt.tab === 'failed' ? (
        <FailedPanel state={state} />
      ) : (
        <div className={cx('sc-sv-grid sc-lb-grid', lt.cols === 4 && 'is-four', phone && 'is-phone')} data-sc="sc-lb-grid">
          {lt.tab === 'rendering' ? <RenderingCards state={state} /> : items.map((ad) => <AdCard key={ad.id} ad={ad} state={state} phone={phone} />)}
        </div>
      )}
      {phone ? null : <LibSelectionPill state={state} />}
      <DetailPanel state={state} />
      <MoveDialog state={state} />
      <SaveDialog state={state} />
    </div>
  )
}
