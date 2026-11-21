/* eslint-disable react-refresh/only-export-components */
import {
  ArrowsClockwise,
  Books,
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  CircleNotch,
  Copy,
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
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import type { SceneState } from '../engine/story'
import { BRAND } from '../showcaseData'
import { cx } from '../../site/cx'
import { useRef } from 'react'
import { CardTools, CardUse, Density, glowFor, HeaderSelBar, PageNav, ResetView, useFlip } from './chrome'

/** Finished ads shown in the My Ads Library tutorial. */
export type LibAd = {
  id: string
  src: string
  ratio: '4:5' | '1:1'
  product: string
  copy: string
  body?: string
  cta?: string
  coll: number
  ready: boolean
  kw: string
  res: '1K' | '4K'
  tier: 'Standard' | 'Pro'
  date: string
}

const SRC = ['ad-04', 'ad-06', 'ad-02', 'ad-05', 'ad-01', 'ad-03', 'ad-07', 'ad-08']
/** The words actually on each ad image: headline, body, button. */
const WORDS: Record<string, { product: string; head: string; body?: string; cta?: string }> = {
  'ad-01': { product: 'Recovery Slides', head: 'Your Post-Workout Essential.', body: 'Get Comfortable' },
  'ad-02': { product: 'Compression Vest', head: 'Train With Purpose', body: 'Compression Vest / YourBrand Athletics', cta: 'Gear Up Now' },
  'ad-03': { product: 'Compression Vest', head: 'Maximum Support, Zero Distraction.', body: 'Ready to train? Support + Style.', cta: 'Gear Up' },
  'ad-04': { product: 'Ultra Light Runner', head: 'Run Hard. Look Sharp.', cta: 'Shop The Trainers' },
  'ad-05': { product: 'Ultra Light Runner', head: 'Retro Style, Modern Speed.', body: 'YourBrand Elite Runners. New season, same energy.', cta: 'Shop The Trainers' },
  'ad-06': { product: 'Ultra Light Runner', head: 'Run Hard. Look Sharp.', cta: 'GET YOUR PAIR' },
  'ad-07': { product: 'Ultra Light Runner', head: 'Run Hard. Look Sharp.', cta: 'Get Your Pair' },
  'ad-08': { product: 'Ultra Light Runner', head: 'Retro Style, Modern Speed.', body: 'Retro design meets modern comfort for your daily miles and weekend hangouts.', cta: 'Get Your Pair' },
}
const COPY = SRC.map((file) => WORDS[file].head)
const RATIO = ['4:5', '4:5', '1:1', '1:1', '4:5', '1:1', '4:5', '1:1'] as const
const COLL = [1, 2, 1, 2, 1, 2, 0, 0]
const DATES = ['Nov 18, 2026', 'Nov 17, 2026', 'Nov 15, 2026', 'Nov 14, 2026', 'Nov 12, 2026', 'Nov 10, 2026', 'Nov 21, 2026', 'Nov 21, 2026']

export const LIB_ADS: LibAd[] = SRC.map((file, index) => {
  const product = WORDS[file].product
  return {
    id: `a${index + 1}`,
    src: `/showcase/${file}.webp`,
    ratio: RATIO[index],
    product,
    copy: COPY[index],
    body: WORDS[file].body,
    cta: WORDS[file].cta,
    coll: COLL[index],
    ready: index >= 6,
    kw: `${product} ${COPY[index]} ${BRAND.name}`.toLowerCase(),
    res: index % 3 === 1 ? '4K' : '1K',
    tier: index % 4 === 2 ? 'Pro' : 'Standard',
    date: DATES[index],
  }
})

export const LIB_COLLECTIONS = ['Spring launch', 'Retargeting']

const RENDERING = [
  { id: 'r1', product: BRAND.products[0].name },
  { id: 'r2', product: BRAND.products[1].name },
]
const FAILED = [
  { id: 'f1', product: BRAND.products[2].name, size: '1080×1350', when: '11/21/2026, 4:28:37 AM', until: 'Nov 28, 4:28 AM', model: 'Standard', res: '1K', kept: true },
  { id: 'f2', product: BRAND.products[3].name, size: '300×600', when: '11/20/2026, 9:12:05 PM', until: 'Nov 27, 9:12 PM', model: 'Standard', res: '1K', kept: false },
]

export function libCounts(state: SceneState) {
  const { lt } = state
  return {
    library: LIB_ADS.filter((ad) => !ad.ready || lt.approved.includes(ad.id)).length,
    ready: LIB_ADS.filter((ad) => ad.ready && !lt.approved.includes(ad.id)).length,
    rendering: RENDERING.length,
    failed: lt.cleared ? 0 : FAILED.length,
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
    const first = list.find((ad) => ad.id === 'a4')
    if (first) list = [first, ...list.filter((ad) => ad !== first)]
  }
  return list
}

const sizeText = (ad: LibAd) => (ad.ratio === '4:5' ? '4:5-1080' : '1:1-1080')

function AdCard({ ad, state, phone }: { ad: LibAd; state: SceneState; phone: boolean }) {
  const { lt } = state
  const hover = state.hover === ad.id
  const on = lt.sel.includes(ad.id)
  const staged = lt.tab === 'ready'
  const starred = lt.starred && ad.id === 'a4'
  return (
    <div className={cx('sc-sv-card scv2-sv-card', on && 'is-picked', hover && 'is-hover')} style={{ ['--glow' as string]: glowFor(ad.id) }} data-sc={`sc-lb-card-${ad.id}`} data-flip={ad.id}>
      <div className="sc-sv-media" data-sc={`sc-lb-media-${ad.id}`}>
        <img src={ad.src} alt="" className="sc-cover" />
        {staged ? <span className="scv2-staged">Staged</span> : null}
        <CardTools prefix="sc-lb" id={ad.id} on={on} show={phone || hover || on || lt.sel.length > 0} />
        <CardUse sc={`sc-lb-use-${ad.id}`} plus={state.templates.image > 0} show={hover || phone} share />
      </div>
      <div className="scv2-card-foot">
        <span className="scv2-card-row">
          <span className="scv2-card-title sc-truncate">{ad.product}</span>
          <span className={cx('sc-sv-star', starred && 'is-on')} data-sc={`sc-lb-star-${ad.id}`}>
            <Star size={16} weight={starred ? 'fill' : 'regular'} />
          </span>
        </span>
        <span className="scv2-card-meta-row">
          <span className="sc-truncate">{BRAND.name}</span>
          <span>{ad.date}</span>
        </span>
        <span className="scv2-chips">
          <i>{ad.res}</i>
          <i>{ad.tier}</i>
          <i>{sizeText(ad)}</i>
        </span>
        <span className="scv2-card-label-row">
          <Tag size={13} />
          <span className="scv2-label is-empty">Add label</span>
          {staged ? (
            <span className="scv2-approve" data-sc={`sc-lb-approve-${ad.id}`}>
              <Check size={13} weight="bold" />
              Approve
            </span>
          ) : null}
          <span className="scv2-trash">
            <Trash size={14} />
          </span>
        </span>
      </div>
    </div>
  )
}

function RenderingCard({ product }: { product: string }) {
  return (
    <div className="sc-sv-card scv2-sv-card scv2-busy-card">
      <div className="sc-sv-media scv2-busy-media">
        <CircleNotch size={26} className="sc-spin" />
      </div>
      <div className="scv2-card-foot">
        <span className="scv2-card-title sc-truncate">{product}</span>
        <span className="scv2-card-meta-row">
          <span>{BRAND.name}</span>
        </span>
        <span className="scv2-chips">
          <i className="is-warn">Rendering</i>
        </span>
      </div>
    </div>
  )
}

function FailedCard({ item, open }: { item: (typeof FAILED)[number]; open: boolean }) {
  return (
    <div className="scv2-fail" data-sc={`sc-lb-fail-${item.id}`}>
      <div className="scv2-fail-head">
        <span className="scv2-fail-badge">
          <WarningCircle size={13} weight="fill" />
          Failed
        </span>
        <b>{item.product}</b>
        <span className="sc-grow" />
        <span className="scv2-trash" data-sc={`sc-lb-fail-del-${item.id}`}>
          <Trash size={15} />
        </span>
      </div>
      <p className="scv2-fail-sub">{BRAND.name}</p>
      <p>This render couldn&apos;t be completed.</p>
      <p className="scv2-fail-meta">
        {item.size} · {item.when}
      </p>
      <p className="scv2-fail-meta">Auto-removes on {item.until}</p>
      <p className="scv2-fail-ok">
        <Check size={13} weight="bold" />
        Tokens refunded
      </p>
      <div className={cx('scv2-collapse', open && 'is-open')} data-sc={`sc-lb-made-${item.id}`}>
        <span className="scv2-collapse-head">
          What was being made?
          <CaretDown size={14} />
        </span>
        {open ? (
          <dl className="scv2-dl sc-fade-in">
            <div>
              <dt>Template</dt>
              <dd>tpl_8f3a21c9</dd>
            </div>
            <div>
              <dt>Brand or campaign</dt>
              <dd>{BRAND.name}</dd>
            </div>
            <div>
              <dt>Product</dt>
              <dd>{item.product}</dd>
            </div>
            <div>
              <dt>Model</dt>
              <dd>{item.model}</dd>
            </div>
            <div>
              <dt>Resolution</dt>
              <dd>{item.res}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{item.size}</dd>
            </div>
            {item.kept ? null : <p className="scv2-fail-warn">This generation can&apos;t be retried automatically — its original settings weren&apos;t saved.</p>}
          </dl>
        ) : null}
      </div>
    </div>
  )
}

function CollectionsMenu({ state }: { state: SceneState }) {
  if (!state.lt.menu) return null
  const count = libCounts(state).library
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
        {state.lt.coll === 0 ? <Check size={14} /> : null}
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

function StatusTabs({ state, phone }: { state: SceneState; phone: boolean }) {
  const counts = libCounts(state)
  const tabs = [
    ['library', 'Library', counts.library, ''],
    ['ready', 'Ready', counts.ready, 'is-ok'],
    ['rendering', 'Rendering', counts.rendering, ''],
    ['failed', 'Failed', counts.failed, 'is-bad'],
  ] as const
  return (
    <span className={cx('scv2-status', phone && 'is-phone')} data-sc="sc-lb-tabs">
      {tabs.map(([key, label, n, tone]) => (
        <span key={key} className={cx('scv2-status-tab', state.lt.tab === key && 'is-on')} data-sc={`sc-lb-tab-${key}`}>
          {label}
          <b className={cx(n > 0 && tone)}>{n}</b>
        </span>
      ))}
      {phone ? null : (
        <span className="scv2-icon-btn">
          <ArrowsClockwise size={15} />
        </span>
      )}
    </span>
  )
}

export function AdsLibScreen({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const { lt } = state
  const items = visibleLib(state)
  const gridRef = useRef<HTMLDivElement>(null)
  useFlip(gridRef, items.map((ad) => ad.id).join(','))
  const counts = libCounts(state)
  const folder = lt.coll === 0 ? 'All ads' : LIB_COLLECTIONS[lt.coll - 1]
  const approveAll =
    lt.tab === 'ready' && counts.ready > 0 ? (
      <span className="sc-btn is-secondary is-sm scv2-approve-all" data-sc="sc-lb-approve-all">
        <Check size={14} weight="bold" />
        Approve all
      </span>
    ) : null
  return (
    <div className={cx('sc-browse sc-sv sc-lb', phone && 'is-phone')}>
      <header className="sc-page-header">
        <div className="sc-page-row">
          <span className="sc-rel scv2-title-wrap">
            <p className="cockpit-page-title sc-sv-title" data-sc="sc-lb-title">
              <Books size={16} />
              {phone ? (
                <span className="cockpit-page-title-name">{lt.coll === 0 ? 'My Ads Library' : folder}</span>
              ) : (
                <>
                  <span className="cockpit-page-title-name">My Image Ads Library</span>
                  <span className="scv2-title-slash">/</span>
                  <span className="scv2-title-folder">{folder}</span>
                </>
              )}
              <CaretDown size={12} />
            </p>
            <CollectionsMenu state={state} />
          </span>
          {phone ? approveAll : <HeaderSelBar n={lt.sel.length} prefix="sc-lb" approve={lt.tab === 'ready'} moveLabel="Move to folder" />}
          {phone || lt.sel.length ? null : <PageNav state={state} current="library" extra={approveAll} />}
        </div>
        <div className="sc-page-tools">
          <StatusTabs state={state} phone={phone} />
          {phone ? null : (
            <>
              <span className="sc-search scv2-search-md" data-sc="sc-lb-search">
                <MagnifyingGlass size={16} />
                {lt.q ? <span className="sc-sv-q">{lt.q}</span> : <span className="scv2-ph">Search brand or campaign, product, copy</span>}
              </span>
              <span className="scv2-drop" data-sc="sc-lb-res">
                All resolutions
                <CaretDown size={12} />
              </span>
              <span className={cx('scv2-drop', lt.size !== 0 && 'is-on')} data-sc="sc-lb-size">
                {lt.size === 1 ? 'Portrait 4:5' : 'All sizes'}
                <CaretDown size={12} />
              </span>
              <Density value={lt.cols} prefix="sc-lb" />
              <ResetView sc="sc-lb-reset" />
            </>
          )}
        </div>
        {phone ? (
          <div className="sc-page-tools">
            <span className="sc-search is-grow" data-sc="sc-lb-search">
              <MagnifyingGlass size={16} />
              {lt.q ? <span className="sc-sv-q">{lt.q}</span> : 'Search your ads'}
            </span>
          </div>
        ) : null}
      </header>
      {phone && lt.sel.length ? (
        <div className="sc-sv-selbar scv2-ph-selbar sc-rise-in">
          <HeaderSelBar n={lt.sel.length} prefix="sc-lb" approve={lt.tab === 'ready'} moveLabel="Move to folder" />
        </div>
      ) : null}
      {lt.tab === 'failed' ? (
        <div className="scv2-fail-wrap">
          <div className="scv2-fail-banner" data-sc="sc-lb-banner">
            <WarningCircle size={16} />
            <span>Failed generation alerts stay visible for 7 days, then they are removed automatically. You can dismiss any alert early with the remove button.</span>
            {counts.failed ? (
              <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-del-failed">
                <Trash size={14} />
                Delete all failed
              </span>
            ) : null}
          </div>
          {counts.failed ? (
            <div className={cx('scv2-fail-grid', phone && 'is-phone')} data-sc="sc-lb-fail-grid">
              {FAILED.map((item) => (
                <FailedCard key={item.id} item={item} open={lt.made === item.id} />
              ))}
            </div>
          ) : (
            <p className="scv2-empty" data-sc="sc-lb-empty">
              No failed renders.
            </p>
          )}
        </div>
      ) : lt.tab === 'rendering' ? (
        <div className={cx('sc-sv-grid', lt.cols === 4 && 'is-four', phone && 'is-phone')} data-sc="sc-lb-grid">
          {RENDERING.map((item) => (
            <RenderingCard key={item.id} product={item.product} />
          ))}
        </div>
      ) : (
        <div ref={gridRef} className={cx('sc-sv-grid', lt.cols === 4 && 'is-four', lt.cols === 5 && 'is-four scv2-five', phone && 'is-phone')} data-sc="sc-lb-grid" key={`${lt.tab}-${lt.coll}`}>
          {items.length === 0 ? <p className="scv2-empty">Nothing waiting. New renders land here first.</p> : null}
          {items.map((ad) => (
            <AdCard key={ad.id} ad={ad} state={state} phone={phone} />
          ))}
        </div>
      )}
    </div>
  )
}

function MoveDialog({ state }: { state: SceneState }) {
  if (!state.lt.move) return null
  const n = Math.max(1, state.lt.sel.length)
  return (
    <div className="sc-modal-scrim">
      <div className="sc-modal is-small scv2-modal" data-sc="sc-lb-move-dialog">
        <div className="sc-modal-head">
          <span>
            Move {n} {n === 1 ? 'ad' : 'ads'} to folder
          </span>
          <X size={16} />
        </div>
        <div className="sc-modal-body">
          <p className="scv2-modal-sub">Choose which collection the ads should go in.</p>
          <p className="scv2-modal-label">Folder</p>
          <span className="scv2-select">
            <FolderSimple size={15} />
            Spring launch
            <CaretDown size={12} />
          </span>
          <div className="sc-modal-foot">
            <span className="sc-btn is-secondary" data-sc="sc-lb-move-cancel">
              Cancel
            </span>
            <span className="sc-btn is-primary" data-sc="sc-lb-move-go">
              Move
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Full-window ad details: the settings this ad was made with and the copy it used. */
export function LibOverlays({ state }: { state: SceneState }) {
  return (
    <>
      <LibDetail state={state} />
      <MoveDialog state={state} />
    </>
  )
}

function LibDetail({ state }: { state: SceneState }) {
  const ad = LIB_ADS.find((entry) => entry.id === state.lt.detail)
  if (!ad) return null
  const picked = state.lt.sel.includes(ad.id)
  return (
    <div className="scv2-detail sc-fade-in" data-sc="sc-lb-detail-wrap">
      <div className="scv2-detail-stage">
        <span className="scv2-detail-arrow is-left">
          <CaretLeft size={16} />
        </span>
        <img src={ad.src} alt="" />
        <span className="scv2-detail-arrow is-right">
          <CaretRight size={16} />
        </span>
      </div>
      <aside className="scv2-detail-panel" data-sc="sc-lb-detail">
        <div className="scv2-detail-head">
          <span>Ad details</span>
          <span className="scv2-icon-btn" data-sc="sc-lb-d-close">
            <X size={16} />
          </span>
        </div>
        <div className="scv2-detail-brand">
          <span className="scv2-pills">
            <span className="is-on">
              <Books size={13} />
              In library
            </span>
            <span className={cx(picked && 'is-on')}>{picked ? 'Selected' : 'Select'}</span>
          </span>
          <span className="sc-grow" />
          <span className="sc-sv-star">
            <Star size={17} />
          </span>
          <span className="scv2-trash">
            <Trash size={16} />
          </span>
        </div>
        <span className="scv2-label is-block is-empty">Add label</span>
        <div className={cx('scv2-collapse', state.lt.dOpen && 'is-open')} data-sc="sc-lb-d-toggle">
          <span className="scv2-collapse-head">
            Ad details
            <CaretDown size={14} />
          </span>
          {state.lt.dOpen ? (
            <dl className="scv2-dl sc-fade-in" data-sc="sc-lb-d-list">
              <div>
                <dt>Brand or campaign</dt>
                <dd>{BRAND.name}</dd>
              </div>
              <div>
                <dt>Product</dt>
                <dd>{ad.product}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{ad.date}</dd>
              </div>
              <div>
                <dt>Resolution</dt>
                <dd>{ad.res}</dd>
              </div>
              <div>
                <dt>Model tier</dt>
                <dd>{ad.tier}</dd>
              </div>
              <div>
                <dt>Colors</dt>
                <dd>On</dd>
              </div>
              <div>
                <dt>Logo</dt>
                <dd>Included</dd>
              </div>
              <div>
                <dt>Product image</dt>
                <dd>Included</dd>
              </div>
              <div>
                <dt>{ad.ratio === '4:5' ? '4:5 — 1080×1350' : '1:1 — 1080×1080'}</dt>
                <dd>Facebook Feed, Instagram Feed</dd>
              </div>
            </dl>
          ) : null}
        </div>
        <div className="scv2-box" data-sc="sc-lb-d-copy">
          <span className="scv2-box-title">
            Ad copy
            <Copy size={14} />
          </span>
          <p>{ad.copy}</p>
          {ad.body ? <p>{ad.body}</p> : null}
          {ad.cta ? <p>{ad.cta}</p> : null}
        </div>
        <span className="sc-grow" />
        <div className="scv2-detail-foot">
          <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-d-dl">
            <DownloadSimple size={15} />
            Download
          </span>
          <span className="scv2-icon-btn is-boxed">
            <ShareNetwork size={16} />
          </span>
          <span className="sc-btn is-secondary is-sm" data-sc="sc-lb-d-save">
            Save as template
          </span>
          <span className="sc-btn is-primary is-sm" data-sc="sc-lb-d-use">
            <Lightning size={15} />
            {state.templates.image > 0 ? '+ Use' : 'Use'}
          </span>
        </div>
      </aside>
    </div>
  )
}
