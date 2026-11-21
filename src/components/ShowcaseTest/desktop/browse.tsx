/* eslint-disable react-refresh/only-export-components */
import {
  ArrowLeft,
  BookmarkSimple,
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  DownloadSimple,
  FacebookLogo,
  FunnelSimple,
  Globe,
  InstagramLogo,
  Lightning,
  ListBullets,
  MagnifyingGlass,
  Play,
  Plus,
  SquaresFour,
  X,
} from '@phosphor-icons/react'
import type { SceneState } from '../engine/story'
import { EXTRA_IMAGE_TEMPLATES, IMAGE_TEMPLATES, VIDEO_TEMPLATES, type Media } from '../showcaseData'
import { cx } from '../../site/cx'
import { Clip } from './screens'
import { useRef } from 'react'
import { CardUse, Density, glowFor, PageNav, useFlip } from './chrome'

/* Browse Templates, as in the app (Nov 2026). */

export const NICHES = ['UGC', 'Beauty', 'Fashion', 'Health/Wellness', 'Sports/Fitness', 'Food/Drink', 'Home/Garden', 'Jewelry/Watches', 'Accessories', 'Pets']
export const RUN_TIMES = ['Any', '7+ days', '30+ days', '90+ days', '180+ days', '365+ days']
export const LANGUAGES = ['Any', 'English', 'Spanish', 'French', 'Portuguese', 'German', 'Italian', 'Dutch', 'Arabic', 'Indonesian']
export const RECENT = ['shoes', 'sports', 'glamour', 'serum', '+black +friday +beauty', 'monday +cyber']

export function browseItems(state: SceneState): Media[] {
  return state.mode === 'video' ? VIDEO_TEMPLATES : [...IMAGE_TEMPLATES, ...EXTRA_IMAGE_TEMPLATES]
}

const hay = (item: Media) => `${item.brand} ${item.niche} ${item.kw ?? ''}`.toLowerCase()
const runDays = (run: string | null) => (run ? Number.parseInt(run, 10) || 0 : 0)

/**
 * The grid after filters. Filter words must all match. Add words (+word) bring in more
 * templates that match any of them, mixed in between, and they ignore the filters.
 */
export function visibleBrowse(state: SceneState): Media[] {
  const { bt } = state
  const all = browseItems(state)
  if (bt.feed) return all.filter((item) => item.brand === bt.feed)
  const filters = bt.chips.filter((c) => !c.add).map((c) => c.w)
  const adds = bt.chips.filter((c) => c.add).map((c) => c.w)
  let list = all.filter((item) => filters.every((w) => hay(item).includes(w)))
  if (bt.niche) list = list.filter((item) => item.niche === bt.niche)
  if (bt.run) list = list.filter((item) => item.days >= runDays(bt.run))
  if (bt.active) list = list.filter((item) => item.days >= 30)
  if (bt.sort === 1) list = [...list].sort((a, b) => b.days - a.days)
  if (adds.length) {
    const extra = all.filter((item) => !list.includes(item) && adds.some((w) => hay(item).includes(w)))
    const mixed: Media[] = []
    const n = Math.max(list.length, extra.length)
    for (let i = 0; i < n; i += 1) {
      if (list[i]) mixed.push(list[i])
      if (extra[i]) mixed.push(extra[i])
    }
    list = mixed
  }
  return list
}

function Platforms({ count }: { count: number }) {
  const icons = [
    <FacebookLogo key="f" size={11} weight="fill" />,
    <InstagramLogo key="i" size={11} weight="bold" />,
    <Globe key="g1" size={11} weight="bold" />,
    <Globe key="g2" size={11} weight="bold" />,
    <Globe key="g3" size={11} weight="bold" />,
  ]
  return (
    <span className="scv2-platforms">
      {icons.slice(0, count).map((icon, index) => (
        <i key={index}>{icon}</i>
      ))}
    </span>
  )
}

export function BrowseCard({ item, state, list = false }: { item: Media; state: SceneState; list?: boolean }) {
  const video = state.mode === 'video'
  const hover = state.hover === item.id
  const plus = state.templates[state.mode] > 0
  const saved = state.bt.saved.includes(item.id)
  const tipBrand = state.hover === `brand-${item.id}`
  if (list) {
    return (
      <div className={cx('scv2-row', hover && 'is-hover')} style={{ ['--glow' as string]: glowFor(item.id) }} data-sc={`sc-card-${item.id}`} data-flip={item.id}>
        <span className="scv2-row-thumb">
          <img src={item.src} alt="" className="sc-cover" />
        </span>
        <span className="scv2-row-main">
          <span className="scv2-row-brand">
            <span className="scv2-avatar" style={{ background: item.tint }}>
              {item.brand.charAt(0)}
            </span>
            {item.brand}
          </span>
          <span className="scv2-chips">
            <i>{item.niche}</i>
            {video ? <i>{item.secs}s</i> : null}
          </span>
          <Platforms count={3 + (item.days % 3)} />
        </span>
        <span className="scv2-row-actions">
          <BookmarkSimple size={16} weight={saved ? 'fill' : 'regular'} />
          <span className="scv2-row-use" data-sc={`sc-use-${item.id}`}>
            <Lightning size={13} weight="fill" className="sc-text-accent" />
            {plus ? '+ Use' : 'Use'}
          </span>
        </span>
      </div>
    )
  }
  return (
    <div className={cx('sc-tpl scv2-tpl', hover && 'is-hover')} style={{ ['--glow' as string]: glowFor(item.id) }} data-sc={`sc-card-${item.id}`} data-flip={item.id}>
      <div className="sc-tpl-media" data-sc={`sc-media-${item.id}`}>
        <Clip src={item.src} video={video ? item.video : undefined} play={hover} />
        <Platforms count={2 + (item.days % 4)} />
        {video ? <span className="scv2-dur">{item.secs}s</span> : null}
        {video && !hover ? (
          <span className="scv2-play">
            <Play size={16} weight="fill" />
          </span>
        ) : null}
        <CardUse sc={`sc-use-${item.id}`} plus={plus} show={hover} save saved={saved} saveSc={`sc-save-${item.id}`} />
      </div>
      <div className="scv2-tpl-foot">
        <span className={cx('scv2-tpl-brand scv2-rel', tipBrand && 'is-link')} data-sc={`sc-brand-${item.id}`}>
          <span className="scv2-avatar" style={{ background: item.tint }}>
            {item.brand.charAt(0)}
          </span>
          <span className="sc-truncate">{item.brand}</span>
          {tipBrand ? <span className="scv2-tip is-below">See {item.brand}&apos;s ads</span> : null}
        </span>
        <span className="scv2-chips">
          <i>{item.niche}</i>
        </span>
      </div>
    </div>
  )
}

function Menu({ sc, rows, on, right = false }: { sc: string; rows: string[]; on: string | null; right?: boolean }) {
  return (
    <div className={cx('sc-sv-menu scv2-menu', right && 'is-right')} data-sc={sc}>
      {rows.map((row) => (
        <span key={row} className={cx('sc-sv-menu-row', (on ?? 'Any') === row && 'is-on')} data-sc={`${sc}-${row.replace(/[^a-z0-9]+/gi, '').toLowerCase()}`}>
          {row}
          {(on ?? 'Any') === row ? <Check size={14} /> : null}
        </span>
      ))}
    </div>
  )
}

function Drop({ sc, label, open, active = false, children }: { sc: string; label: string; open: boolean; active?: boolean; children?: React.ReactNode }) {
  return (
    <span className="sc-rel">
      <span className={cx('scv2-drop', (open || active) && 'is-on')} data-sc={sc}>
        {label}
        <CaretDown size={12} />
      </span>
      {open ? children : null}
    </span>
  )
}

function Duration() {
  return (
    <div className="sc-sv-menu scv2-menu is-right scv2-dur-menu" data-sc="sc-bt-dur-menu">
      <span className="scv2-dur-row">
        Min duration <b>4s</b>
      </span>
      <span className="scv2-slider">
        <i style={{ left: '0%' }} />
        <em style={{ left: 0, right: 0 }} />
      </span>
      <span className="scv2-dur-row">
        Max duration <b>30s</b>
      </span>
      <span className="scv2-slider">
        <em style={{ left: 0, right: 0 }} />
        <i style={{ left: '100%' }} />
      </span>
      <span className="scv2-dur-row is-muted">
        Working range: 4-30s <b>Reset</b>
      </span>
    </div>
  )
}

function SearchBox({ state }: { state: SceneState }) {
  const { bt } = state
  const typing = bt.q.length > 0
  return (
    <span className="sc-rel scv2-search-wrap">
      <span className={cx('sc-search is-grow scv2-bt-search', (typing || bt.recent) && 'is-focus')} data-sc="sc-bt-search">
        <MagnifyingGlass size={16} />
        {bt.chips.map((chip, index) => (
          <span key={`${chip.w}-${index}`} className={cx('scv2-qchip', chip.add && 'is-add')} data-sc={`sc-bt-chip-${index}`}>
            {chip.add ? <Plus size={11} weight="bold" /> : <FunnelSimple size={11} weight="bold" />}
            {chip.w}
            <X size={10} />
          </span>
        ))}
        {typing ? (
          <span className="sc-input-text">
            {bt.q}
            <i className="sc-caret" />
          </span>
        ) : bt.chips.length ? null : (
          <span className="scv2-ph">Search ads · Enter to filter · Shift+Enter or +word to add more</span>
        )}
        <span className="sc-grow" />
        <FunnelSimple size={15} className="scv2-muted" />
        <span className="scv2-plus-btn" data-sc="sc-bt-plus">
          <Plus size={15} />
        </span>
      </span>
      {bt.recent ? (
        <div className="scv2-recent sc-fade-in" data-sc="sc-bt-recent">
          <p>Recent Searches</p>
          <span className="scv2-recent-row">
            {RECENT.map((word) => (
              <span key={word} className="scv2-recent-chip" data-sc={`sc-bt-recent-${word.replace(/[^a-z]+/gi, '')}`}>
                {word.includes('+') ? null : <FunnelSimple size={11} weight="bold" />}
                {word}
                <X size={10} />
              </span>
            ))}
          </span>
        </div>
      ) : null}
    </span>
  )
}

export function BrowseScreen({ state }: { state: SceneState }) {
  const { bt } = state
  const video = state.mode === 'video'
  const items = visibleBrowse(state)
  const gridRef = useRef<HTMLDivElement>(null)
  useFlip(gridRef, items.map((item) => item.id).join(','), 900)
  const title = video ? 'Browse Video Templates' : 'Browse Image Templates'
  const brandsTab = bt.tab === 'brands' && !bt.feed
  return (
    <div className="sc-browse scv2-browse">
      <header className="sc-page-header">
        <div className="sc-page-row">
          <p className="cockpit-page-title">
            <SquaresFour size={16} />
            <span className="cockpit-page-title-name">{title}</span>
          </p>
          <PageNav state={state} current="browse" />
        </div>
        <div className="sc-page-tools">
          {brandsTab ? null : (
            <>
              <span className="sc-segmented scv2-seg" data-sc="sc-bt-sort">
                {['Newest', 'Longest running', 'Most relevant'].map((label, index) => (
                  <span key={label} className={cx(bt.sort === index && 'is-on', index === 2 && bt.chips.length === 0 && 'is-dim')} data-sc={`sc-bt-sort-${index}`}>
                    {label}
                  </span>
                ))}
              </span>
              <span className={cx('scv2-drop', bt.active && 'is-on')} data-sc="sc-bt-active">
                Active only
              </span>
            </>
          )}
          <SearchBox state={state} />
          <span className="sc-segmented scv2-seg is-icons" data-sc="sc-bt-view">
            <span className={cx(!bt.list && 'is-on')} data-sc="sc-bt-grid">
              <SquaresFour size={15} />
            </span>
            <span className={cx(bt.list && 'is-on')} data-sc="sc-bt-list">
              <ListBullets size={15} />
            </span>
          </span>
          <span className="sc-segmented scv2-seg" data-sc="sc-bt-tabs">
            <span className={cx(bt.tab === 'community' && 'is-on')} data-sc="sc-bt-community">
              Community
            </span>
            <span className={cx(bt.tab === 'brands' && 'is-on')} data-sc="sc-bt-brands-tab">
              Brands
            </span>
          </span>
        </div>
        <div className="sc-page-tools scv2-filters">
          <Drop sc="sc-bt-brands" label="Brands & campaigns" open={bt.drop === 'brands'} />
          <Drop sc="sc-bt-niche" label={bt.niche ?? 'Niche'} open={bt.drop === 'niche'} active={Boolean(bt.niche)}>
            <Menu sc="sc-bt-niche-menu" rows={NICHES} on={bt.niche} />
          </Drop>
          <Drop sc="sc-bt-platforms" label="All platforms" open={false} />
          <Drop sc="sc-bt-run" label={bt.run ?? 'Run time'} open={bt.drop === 'run'} active={Boolean(bt.run)}>
            <Menu sc="sc-bt-run-menu" rows={RUN_TIMES} on={bt.run} />
          </Drop>
          <Drop sc="sc-bt-lang" label={bt.lang ?? 'Language'} open={bt.drop === 'lang'} active={Boolean(bt.lang)}>
            <Menu sc="sc-bt-lang-menu" rows={LANGUAGES} on={bt.lang} />
          </Drop>
          {brandsTab ? null : (
            <span className="sc-segmented scv2-seg" data-sc="sc-bt-market">
              {['All', 'B2B', 'B2C'].map((label, index) => (
                <span key={label} className={cx(bt.market === index && 'is-on')}>
                  {label}
                </span>
              ))}
            </span>
          )}
          <Drop sc="sc-bt-sizes" label="All sizes" open={false} />
          <span className="scv2-rel">
            <Density value={bt.cols} prefix="sc-bt" options={[4, 5, 6]} />
            {bt.tip ? <span className="scv2-tip is-below">{bt.tip} cards per row</span> : null}
          </span>
          {video && !brandsTab ? (
            <Drop sc="sc-bt-dur" label="Duration" open={bt.drop === 'dur'}>
              <Duration />
            </Drop>
          ) : null}
        </div>
      </header>
      {bt.feed ? (
        <div className="scv2-feed-head" data-sc="sc-bt-feed">
          <span className="scv2-back" data-sc="sc-bt-back">
            <ArrowLeft size={14} />
            Back to brands
          </span>
          <b>
            {bt.feed} — {video ? 'video' : 'image'} ads
          </b>
        </div>
      ) : null}
      {brandsTab ? (
        <BrandsDirectory state={state} />
      ) : bt.list ? (
        <div ref={gridRef} className="scv2-rows" data-sc="sc-bt-grid-area">
          {items.map((item) => (
            <BrowseCard key={item.id} item={item} state={state} list />
          ))}
        </div>
      ) : (
        <div ref={gridRef} className="sc-tpl-grid scv2-tpl-grid" style={{ gridTemplateColumns: `repeat(${bt.cols}, minmax(0, 1fr))` }} data-sc="sc-bt-grid-area" key={`${state.mode}-${bt.cols}`}>
          {items.length === 0 ? <p className="scv2-empty">No templates match. Try fewer words or clear a filter.</p> : null}
          {items.map((item) => (
            <BrowseCard key={item.id} item={item} state={state} />
          ))}
        </div>
      )}
    </div>
  )
}

const DIRECTORY = [
  ['Iron Form', 95, 'Sporting goods'],
  ['Island Oils', 65, ''],
  ['Trail Hut', 64, ''],
  ['Stride Co', 59, 'Shopping & retail'],
  ['Peak Athletics', 57, ''],
  ['Morning Root', 55, 'Product/service'],
  ['Dew Skin', 55, ''],
  ['Fin & Brush', 44, ''],
  ['Sole Theory', 38, 'Shopping & retail'],
  ['Pixel Forge', 37, ''],
  ['Court Kings', 35, 'Sportswear shop'],
  ['Glow Lab', 33, ''],
] as const

function BrandsDirectory({ state }: { state: SceneState }) {
  const tints = ['#4f8df7', '#e5a33d', '#52ad50', '#e5484d', '#3db8a5', '#f08a3d', '#00b8d9', '#9b6bf2', '#d9778f', '#7b4fd4', '#d6409f', '#a39e98']
  return (
    <div className="scv2-directory" data-sc="sc-bt-directory">
      {DIRECTORY.map(([name, ads, kind], index) => (
        <div key={name} className={cx('scv2-dir-card', state.hover === `dir-${index}` && 'is-hover')} data-sc={`sc-bt-dir-${index}`}>
          <span className="scv2-avatar is-xl" style={{ background: tints[index] }}>
            {name.charAt(0)}
          </span>
          <span className="scv2-dir-text">
            <b>{name}</b>
            <small>{ads} ads</small>
            {kind ? <i>{kind}</i> : null}
          </span>
        </div>
      ))}
      <span className="scv2-load-more">Load more brands</span>
    </div>
  )
}

/** Full-window template details (opened by clicking a card). */
export function BrowseDetail({ state }: { state: SceneState }) {
  const id = state.bt.detail
  const item = browseItems(state).find((entry) => entry.id === id)
  if (!item) return null
  const video = state.mode === 'video'
  const saved = state.bt.saved.includes(item.id)
  return (
    <div className="scv2-detail sc-fade-in" data-sc="sc-bt-detail-wrap">
      <div className="scv2-detail-stage">
        <span className="scv2-detail-arrow is-left">
          <CaretLeft size={16} />
        </span>
        {video ? (
          <span className="scv2-detail-video">
            <Clip src={item.src} video={item.video} play />
          </span>
        ) : (
          <img src={item.src} alt="" />
        )}
        <span className="scv2-detail-arrow is-right">
          <CaretRight size={16} />
        </span>
      </div>
      <aside className="scv2-detail-panel" data-sc="sc-bt-detail">
        <div className="scv2-detail-head">
          <span>{video ? 'Video details' : 'Ad details'}</span>
          <span className="scv2-icon-btn" data-sc="sc-bt-d-close">
            <X size={16} />
          </span>
        </div>
        <div className="scv2-detail-brand">
          <span className="scv2-avatar is-lg" style={{ background: item.tint }}>
            {item.brand.charAt(0)}
          </span>
          <span className="sc-grow">
            <b>{item.brand}</b>
          </span>
        </div>
        <div className={cx('scv2-collapse', state.bt.dOpen && 'is-open')} data-sc="sc-bt-d-toggle">
          <span className="scv2-collapse-head">
            Template details
            <CaretDown size={14} />
          </span>
          {state.bt.dOpen ? (
            <dl className="scv2-dl sc-fade-in" data-sc="sc-bt-d-list">
              <div>
                <dt>Status</dt>
                <dd>Active</dd>
              </div>
              <div>
                <dt>{video ? 'Duration' : 'Days running'}</dt>
                <dd>{video ? `${item.secs}s` : `${item.days} days`}</dd>
              </div>
              <div>
                <dt>Niche</dt>
                <dd>{item.niche}</dd>
              </div>
              {video ? null : (
                <div>
                  <dt>Target market</dt>
                  <dd>B2C</dd>
                </div>
              )}
              <div>
                <dt>Platforms</dt>
                <dd>Facebook, Instagram, Audience_network, Whatsapp, Threads</dd>
              </div>
              <div>
                <dt>Output size</dt>
                <dd>{video ? '9:16' : '4:5'}</dd>
              </div>
            </dl>
          ) : null}
        </div>
        <span className="sc-grow" />
        <div className="scv2-detail-foot">
          <span className="sc-btn is-secondary is-sm" data-sc="sc-bt-d-dl">
            <DownloadSimple size={15} />
            Download
          </span>
          <span className="sc-btn is-secondary is-sm" data-sc="sc-bt-d-save">
            <BookmarkSimple size={15} weight={saved ? 'fill' : 'regular'} />
            Save
          </span>
          <span className="sc-btn is-primary is-sm" data-sc="sc-bt-d-use">
            <Lightning size={15} />
            {state.templates[state.mode] > 0 ? '+ Use template' : 'Use template'}
          </span>
        </div>
      </aside>
    </div>
  )
}
