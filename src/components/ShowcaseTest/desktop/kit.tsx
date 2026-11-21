/* eslint-disable react-refresh/only-export-components */
import {
  ArrowsClockwise,
  CaretDown,
  CaretLeft,
  Check,
  CheckCircle,
  CircleNotch,
  DownloadSimple,
  FilePdf,
  Globe,
  Link as LinkIcon,
  Flag,
  Megaphone,
  MagnifyingGlass,
  Plus,
  Scan,
  ShoppingBag,
  Sparkle,
  UploadSimple,
  X,
} from '@phosphor-icons/react'
import { BRAND } from '../showcaseData'
import type { SceneState } from '../engine/story'
import { cx } from '../../site/cx'
import { Badge, Button } from './screens'
import { PageNav } from './chrome'

/* ── Data ───────────────────────────────────────────────────── */

type Cat = 'hooks' | 'headlines' | 'ctas' | 'subjectLines'
type Line = { id: string; cat: Cat; text: string; score: number; word?: string; from?: 'document' }

const CATS: { key: Cat; label: string }[] = [
  { key: 'hooks', label: 'Hooks' },
  { key: 'headlines', label: 'Headlines' },
  { key: 'ctas', label: 'CTAs' },
  { key: 'subjectLines', label: 'Subject Lines' },
]

/** Lines made when a product arrives (p1: 6, p4: 10), and four more for p1 when a document is scanned. */
const LINES: Record<string, Line[]> = {
  p1: [
    { id: 'h1', cat: 'hooks', text: 'Your fastest mile starts with the lightest shoe.', score: 92 },
    { id: 'h2', cat: 'hooks', text: 'Guaranteed faster miles from day one.', score: 58, word: 'guaranteed' },
    { id: 'l1', cat: 'headlines', text: 'Light enough to forget. Fast enough to remember.', score: 90 },
    { id: 'c1', cat: 'ctas', text: 'Shop the Runner', score: 86 },
    { id: 'c2', cat: 'ctas', text: 'Find your pace', score: 79 },
    { id: 's1', cat: 'subjectLines', text: 'The lightest run of your week', score: 81 },
  ],
  p4: [
    { id: 'h1', cat: 'hooks', text: 'Recover like you train.', score: 91 },
    { id: 'h2', cat: 'hooks', text: 'The best part of the run is the recovery.', score: 87 },
    { id: 'h3', cat: 'hooks', text: 'Your feet carried you. Return the favor.', score: 84 },
    { id: 'l1', cat: 'headlines', text: 'Soft landing for tired feet.', score: 89 },
    { id: 'l2', cat: 'headlines', text: 'Recovery Slides: the cool-down you deserve.', score: 82 },
    { id: 'c1', cat: 'ctas', text: 'Shop Recovery Slides', score: 85 },
    { id: 'c2', cat: 'ctas', text: 'Treat your feet', score: 80 },
    { id: 'c3', cat: 'ctas', text: 'Get your pair', score: 76 },
    { id: 's1', cat: 'subjectLines', text: 'Your feet earned this', score: 83 },
    { id: 's2', cat: 'subjectLines', text: 'The post-run ritual, upgraded', score: 78 },
  ],
}
const DOC_LINES: Line[] = [
  { id: 'dh', cat: 'hooks', text: 'Every mile is yours to win.', score: 90, from: 'document' },
  { id: 'dl', cat: 'headlines', text: 'Made for runners who never stop.', score: 87, from: 'document' },
  { id: 'dc', cat: 'ctas', text: 'Start your next mile', score: 83, from: 'document' },
  { id: 'ds', cat: 'subjectLines', text: 'Your next personal best is waiting', score: 85, from: 'document' },
]

export const DOC_NAME = 'YourBrand brand guide.pdf'
export const SHOP_DOMAIN = 'your-store.myshopify.com'

const GENDER = ['Women', 'Men', 'Non-binary', 'All genders']
const AGE = ['Young adults (18–34)', 'Middle age (35–54)', 'Seniors (55+)']
const ETHNICITY = ['East Asian', 'South Asian', 'Black / African', 'Hispanic / Latino', 'White / European', 'Mixed / Multiracial']

export const KIT_LIST = [
  { id: 'k1', name: 'YourBrand', kind: 'Brand', products: 4, tint: '#4f8df7' },
  { id: 'k2', name: 'Summer Sale', kind: 'Campaign', products: 3, tint: '#e5a33d' },
  { id: 'k3', name: 'Trail Collection', kind: 'Campaign', products: 6, tint: '#52ad50' },
  { id: 'k4', name: 'Studio Line', kind: 'Brand', products: 9, tint: '#9b6bf2' },
] as const

export const MADE_CAMPAIGNS = [
  { id: 'm1', name: 'Recovery Slides', kind: 'Campaign', products: 1, tint: '#ff8a3d' },
  { id: 'm2', name: 'Compression Vest', kind: 'Campaign', products: 1, tint: '#3db8a5' },
  { id: 'm3', name: 'Speed Elite Shorts', kind: 'Campaign', products: 1, tint: '#d9778f' },
] as const

/* ── Derived state ──────────────────────────────────────────── */

export function kitInfo(state: SceneState) {
  const { bk } = state
  const filled = bk.scan >= 2 || bk.shop >= 4
  const voiceReady = bk.scan >= 3 || bk.shop >= 4
  const named = filled || bk.name !== ''
  const productsShown = bk.only
    ? bk.imp >= 5
      ? 1
      : 0
    : bk.scan >= 4
      ? Math.min(4, bk.scan - 3)
      : bk.shop >= 4 || bk.shop === 3
        ? bk.shop >= 4
          ? 4
          : 0
        : 0
  const copiesReady = bk.scan >= 8 || bk.shop >= 5 || bk.imp >= 6
  const busy = (bk.scan >= 1 && bk.scan < 8) || (bk.shop >= 1 && bk.shop < 5 && bk.shop !== 2) || bk.docScan === 1
  return { filled, voiceReady, named, productsShown, copiesReady, busy }
}

function productLines(state: SceneState, pid: string, cat: Cat): Line[] {
  const own = LINES[pid] ?? LINES.p1
  const lines = [...own, ...(pid === 'p1' && state.bk.docScan >= 2 ? DOC_LINES : [])].filter((line) => line.cat === cat)
  return lines.sort((a, b) => b.score - a.score)
}

function flagged(state: SceneState, line: Line) {
  return Boolean(line.word && state.bk.neg.some((word) => word.toLowerCase() === line.word))
}

export function copyCount(state: SceneState, base: number, id: string) {
  return base + (id === 'p1' && state.bk.docScan >= 2 ? DOC_LINES.length : 0)
}

/** Total ad copies for the products on the page. */
function copyTotal(state: SceneState, products: { id: string; copies: number }[]) {
  return products.reduce((sum, item) => sum + copyCount(state, item.copies, item.id), 0)
}

/** Visible cards in the brands list. */
export function visibleKit(state: SceneState) {
  const { bk } = state
  const list: { id: string; name: string; kind: string; products: number; tint: string }[] = [
    ...KIT_LIST,
    ...MADE_CAMPAIGNS.slice(0, bk.made),
  ]
  const q = bk.q.trim().toLowerCase()
  return list.filter((item) => {
    if (bk.filter === 1 && item.kind !== 'Brand') return false
    if (bk.filter === 2 && item.kind !== 'Campaign') return false
    if (q && !item.name.toLowerCase().includes(q)) return false
    return true
  })
}

/* ── Brands list ────────────────────────────────────────────── */

export function KitListScreen({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const { bk } = state
  const items = visibleKit(state)
  return (
    <div className={cx('sc-brands sc-kitlist', phone && 'is-phone')}>
      <header className="sc-page-header">
        <div className="sc-page-row">
          <p className="cockpit-page-title">
            <Megaphone size={16} />
            <span className="cockpit-page-title-name">Brands &amp; Campaigns</span>
          </p>
          {phone ? (
            <span className="sc-btn is-primary is-sm" data-sc="kit-add">
              <Plus size={15} />
              Add
            </span>
          ) : (
            <PageNav state={state} current="brands" />
          )}
        </div>
        <div className="sc-page-tools">
          <span className={cx('sc-search', phone ? 'is-grow' : 'sc-kit-search')} data-sc="kit-search">
            <MagnifyingGlass size={16} />
            {bk.q ? <span className="sc-kit-q">{bk.q}</span> : 'Search brands or campaigns…'}
          </span>
          <span className="sc-segmented" data-sc="kit-filter">
            {[<span key="a">All</span>, <Flag key="b" size={15} />, <Megaphone key="c" size={15} />].map((label, index) => (
              <span key={index} className={cx(bk.filter === index && 'is-on')} data-sc={`kit-filter-${index}`}>
                {label}
              </span>
            ))}
          </span>
          {phone ? null : (
            <>
              <span className="sc-grow" />
              <Button variant="primary" icon={<Plus size={16} />} sc="kit-add">
                Add brand or campaign
              </Button>
            </>
          )}
        </div>
      </header>
      <div className="sc-brand-grid" key={`${bk.filter}-${bk.made}`}>
        {items.length === 0 ? <p className="sc-muted-sm">No brands or campaigns match that search.</p> : null}
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cx('sc-card sc-brand-card sc-rise-in', item.id.startsWith('m') && 'is-new')}
            style={{ animationDelay: `${index * 40}ms` }}
            data-sc={`kit-card-${item.id}`}
          >
            <span className="sc-brand-card-mark" style={{ background: item.tint }}>
              {item.name.charAt(0)}
            </span>
            <div className="sc-grow">
              <p className="sc-strong sc-truncate">{item.name}</p>
              <div className="sc-brand-card-meta">
                <Badge>{item.kind}</Badge>
                <span className="sc-muted-sm">
                  {item.products} {item.products === 1 ? 'product' : 'products'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Brand page ─────────────────────────────────────────────── */

function Chip({ on, children, sc }: { on: boolean; children: string; sc?: string }) {
  return (
    <span className={cx('sc-kit-opt', on && 'is-on')} data-sc={sc}>
      {on ? <Check size={12} weight="bold" /> : null}
      {children}
    </span>
  )
}

function AdCopyPanel({ state, pid, phone }: { state: SceneState; pid: string; phone: boolean }) {
  return (
    <div className={cx('sc-kit-copy', phone && 'is-phone')} data-sc="kit-copy-panel">
      {CATS.map(({ key, label }) => {
        const lines = productLines(state, pid, key)
        return (
          <div key={key} className="sc-kit-cat" data-sc={`kit-cat-${key}`}>
            <div className="sc-kit-cat-head">
              <span>{label}</span>
              <span className="sc-kit-plus" data-sc={`kit-plus-${key}`}>
                <Plus size={14} />
              </span>
            </div>
            <ul>
              {lines.map((line, index) => {
                const bad = flagged(state, line)
                const safety = bad ? 'flag' : line.word ? 'review' : 'pass'
                return (
                  <li
                    key={line.id}
                    className={cx('sc-kit-line', line.from && 'sc-rise-in', bad && 'is-flag')}
                    style={line.from ? { animationDelay: `${index * 60}ms` } : undefined}
                    data-sc={`kit-line-${line.id}`}
                  >
                    <p>{line.text}</p>
                    <div className="sc-kit-line-meta">
                      <span>
                        Performance score <b>{line.score}</b>/100
                      </span>
                      <span className={cx('sc-kit-safe', `is-${safety}`)} data-sc={`kit-safe-${line.id}`}>
                        Safety: {safety}
                        {bad ? ' · negative word' : ''}
                      </span>
                      {line.from ? <span className="sc-kit-from">From document</span> : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export function KitScreen({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const { bk } = state
  const info = kitInfo(state)
  const connected = bk.shop >= 4
  const shown = BRAND.products.slice(0, info.productsShown)
  const showProducts = !bk.only ? shown : bk.imp >= 5 ? BRAND.products.filter((item) => item.id === bk.only) : []
  const scanning = bk.scan >= 1
  const title = bk.name || (info.named && !bk.only ? BRAND.name : 'New brand or campaign')

  let banner: { done: boolean; title: string; sub: string } | null = null
  if (bk.docScan === 1) banner = { done: false, title: 'Scanning documents for assets…', sub: 'Additive merge — existing lines are kept.' }
  else if (bk.docScan === 2) banner = { done: true, title: `Documents scanned — ${DOC_LINES.length} new ad copy lines added`, sub: 'Your existing lines were kept.' }
  else if (bk.shop === 3) banner = { done: false, title: 'Importing products from your store…', sub: 'Names, images and variants come straight from Shopify.' }
  else if (bk.shop === 4) banner = { done: false, title: 'Products imported — writing ad copy for each one', sub: 'Missing brand details are filled in. Existing values are never overwritten.' }
  else if (bk.shop >= 5) banner = { done: true, title: `Brand ready — ${BRAND.products.length} products and ${BRAND.adCopies} ad copies`, sub: 'Review anything you like. It is ready to use in the cockpit.' }
  else if (bk.scan >= 8) banner = { done: true, title: `Brand ready — ${BRAND.products.length} products and ${BRAND.adCopies} ad copies found`, sub: 'Review anything you like. It is ready to use in the cockpit.' }
  else if (bk.scan >= 1) banner = { done: false, title: 'Reading your website — building your brand or campaign profile now', sub: 'Brain AI is scanning the site you shared and filling in name, voice, colors, and logo.' }

  return (
    <div className={cx('sc-brand sc-kit', phone && 'is-phone')}>
      <header className="sc-brand-header" data-sc="sc-brand-top">
        <div className="sc-brand-header-left">
          <span className="sc-icon-btn">
            <CaretLeft size={16} />
          </span>
          {info.named && !bk.only ? (
            <img src={BRAND.logo} alt="" className="sc-brand-head-logo sc-fade-in" />
          ) : (
            <span className="sc-brand-head-logo is-letter">{bk.name ? bk.name.charAt(0) : 'N'}</span>
          )}
          <h2 className="sc-truncate">{title}</h2>
        </div>
        {connected && !phone ? <Badge tone="success">Connected to {SHOP_DOMAIN}</Badge> : phone ? null : <p className="sc-muted-sm">Changes save automatically</p>}
      </header>

      <div className="sc-brand-body">
        {banner ? (
          <div className={cx('sc-banner sc-rise-in', banner.done && 'is-done')} data-sc="kit-banner" key={banner.title}>
            {banner.done ? <CheckCircle size={18} weight="fill" className="sc-text-success" /> : <CircleNotch size={18} className="sc-spin" />}
            <div>
              <p className="sc-strong">{banner.title}</p>
              <p className="sc-muted-sm">{banner.sub}</p>
            </div>
          </div>
        ) : null}

        <section className="sc-brand-section">
          <div className="sc-brand-section-head">
            <h3>Brand or campaign setup</h3>
            <Badge>Start here</Badge>
          </div>
          <div className="sc-card sc-setup" data-sc="kit-setup">
            {/* Source 1: website */}
            <div className="sc-kit-source" data-sc="kit-web">
              <div className="sc-setup-row">
                <span className="sc-soft-icon">
                  <Globe size={16} />
                </span>
                <div className="sc-grow">
                  <p className="sc-strong">Scan your website</p>
                  <p className="sc-muted-xs">Brain AI reads the site and fills in voice, colors, logo, tagline, and more. You review and confirm before anything is saved.</p>
                </div>
                <span className="sc-muted-xs">{scanning ? '1/3' : '0/3'}</span>
              </div>
              <div className="sc-setup-url">
                <span className={cx('sc-input is-wide', bk.web && !scanning && 'is-focus')} data-sc="kit-web-url">
                  {bk.web ? <span className="sc-input-text">{scanning ? `https://${BRAND.url}` : bk.web}</span> : <span className="sc-input-ph">https://brand.com</span>}
                </span>
                <Button
                  sc="kit-web-scan"
                  icon={bk.scan >= 8 ? <Check size={16} /> : scanning ? <CircleNotch size={16} className="sc-spin" /> : <Scan size={16} />}
                >
                  {bk.scan >= 8 ? 'Scanned' : scanning ? 'Scanning…' : 'Scan'}
                </Button>
              </div>
            </div>

            {/* Source 2: Shopify */}
            <div className="sc-kit-source" data-sc="kit-shopify">
              {!connected ? (
                <>
                  <div className="sc-setup-row">
                    <span className="sc-soft-icon">
                      <ShoppingBag size={16} />
                    </span>
                    <div className="sc-grow">
                      <p className="sc-strong">Connect your Shopify store</p>
                      <p className="sc-muted-xs">
                        Imports your real product catalog (names, images, variants) and fills in any missing brand details from your store. Existing values are never overwritten.
                      </p>
                    </div>
                  </div>
                  <div className="sc-setup-url">
                    <span className={cx('sc-input is-wide', bk.shopDraft && bk.shop === 0 && 'is-focus')} data-sc="kit-shop-url">
                      {bk.shopDraft ? <span className="sc-input-text">{bk.shopDraft}</span> : <span className="sc-input-ph">your-store.myshopify.com</span>}
                    </span>
                    <Button
                      sc="kit-shop-connect"
                      icon={bk.shop === 1 || bk.shop === 3 ? <CircleNotch size={16} className="sc-spin" /> : <LinkIcon size={16} />}
                      className={cx(!bk.shopDraft && 'is-disabled')}
                    >
                      Connect Shopify Store
                    </Button>
                  </div>
                  <p className="sc-muted-xs">You will be redirected to Shopify to approve read_products access.</p>
                </>
              ) : (
                <>
                  <div className="sc-setup-row">
                    <span className="sc-soft-icon">
                      <ShoppingBag size={16} />
                    </span>
                    <div className="sc-kit-sync">
                      <div>
                        <p className="sc-label">Last synced</p>
                        <p className="sc-strong">Just now</p>
                      </div>
                      <div>
                        <p className="sc-label">Sync status</p>
                        <Badge tone="success">Healthy</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="sc-kit-actions">
                    <Button icon={<ArrowsClockwise size={16} />} sc="kit-resync">
                      Resync
                    </Button>
                    <Button>Open Shopify admin</Button>
                    <span className="sc-kit-disconnect">Disconnect</span>
                  </div>
                </>
              )}
            </div>

            {/* Documents */}
            <div className="sc-kit-source" data-sc="kit-docs">
              <p className="sc-strong">Documents</p>
              <p className="sc-muted-xs">
                Upload a document (voice, colours, audience, products, banned words), then click Scan documents. Brain AI fills empty fields and generates ad copy. You review and confirm before anything is saved.
              </p>
              <div className={cx('sc-kit-scanbtn', bk.docs > 0 && bk.docScan !== 1 && 'is-ready')} data-sc="kit-docs-scan">
                <span className="sc-kit-scanbtn-l">
                  {bk.docScan === 1 ? <CircleNotch size={16} className="sc-spin" /> : <Sparkle size={16} />}
                  Scan documents
                </span>
                <span className="sc-muted-sm">{bk.docs === 0 ? 'None yet' : `${bk.docs} file${bk.docs === 1 ? '' : 's'}`}</span>
              </div>
              <div className={cx('sc-kit-drop', bk.drag && 'is-over', bk.docScan === 1 && 'is-busy')} data-sc="kit-drop">
                <span className="sc-soft-icon">{bk.docScan === 1 ? <CircleNotch size={20} className="sc-spin" /> : <UploadSimple size={20} />}</span>
                <p className="sc-strong">{bk.docScan === 1 ? 'Scanning documents for assets…' : 'Drop PDFs, DOCX, or TXT — or click anywhere here'}</p>
                <p className="sc-muted-xs">{bk.docScan === 1 ? 'Additive merge — existing lines are kept.' : 'Upload files, then use Scan documents — max 10MB per file'}</p>
                {bk.drag ? (
                  <span className="sc-kit-ghost">
                    <FilePdf size={16} />
                    {DOC_NAME}
                  </span>
                ) : null}
              </div>
              {bk.docs > 0 ? (
                <ul className="sc-kit-files sc-rise-in" data-sc="kit-files">
                  <li>
                    <FilePdf size={16} className="sc-text-accent" />
                    <span className="sc-truncate">{DOC_NAME}</span>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </section>

        <section className="sc-brand-section">
          <span className="sc-segmented sc-kit-kind" data-sc="kit-kind">
            <span className={cx(bk.kind === 'brand' && 'is-on')} data-sc="kit-kind-brand">
              Brand info
            </span>
            <span className={cx(bk.kind === 'campaign' && 'is-on')} data-sc="kit-kind-campaign">
              Campaign info
            </span>
          </span>

          <div className="sc-card sc-setup sc-kit-fields" data-sc="kit-fields">
            <div className="sc-field-grid">
              <div className="sc-field" data-sc="kit-name">
                <p className="sc-label">{bk.kind === 'campaign' ? 'Campaign Name' : 'Brand Name'}</p>
                <div className={cx('sc-field-box', scanning && !info.filled && 'is-skeleton')}>
                  {bk.nameDraft ? (
                    <span className="sc-input-text">{bk.nameDraft}</span>
                  ) : info.filled ? (
                    <span className="sc-fade-in">{BRAND.name}</span>
                  ) : bk.name ? (
                    <span className="sc-fade-in">{bk.name}</span>
                  ) : (
                    <span className="sc-input-ph">{bk.kind === 'campaign' ? 'Campaign name' : 'Brand name'}</span>
                  )}
                </div>
              </div>
              <div className="sc-field">
                <p className="sc-label">Logo</p>
                <div className="sc-logo-box">{info.filled ? <img src={BRAND.logo} alt="" className="sc-fade-in" /> : scanning ? <span className="is-skeleton" /> : null}</div>
              </div>
              <div className="sc-field sc-span-2" data-sc="kit-voice">
                <p className="sc-label">{bk.kind === 'campaign' ? 'Campaign voice' : 'Brand voice'}</p>
                <div className={cx('sc-field-box is-tall', scanning && !info.voiceReady && 'is-skeleton')}>
                  {info.voiceReady ? <span className="sc-type-in">{BRAND.voice}</span> : <span className="sc-input-ph">Describe how this {bk.kind} sounds</span>}
                </div>
              </div>
              <div className="sc-field sc-span-2" data-sc="kit-audience">
                <p className="sc-label">Target audience gender</p>
                <div className="sc-audience">
                  {GENDER.map((item) => (
                    <Chip key={item} on={bk.aud.includes(item) || (info.voiceReady && !bk.aud.length && item === 'All genders')} sc={`kit-aud-${item}`}>
                      {item}
                    </Chip>
                  ))}
                </div>
                <p className="sc-label sc-kit-gap">Target audience age group</p>
                <div className="sc-audience">
                  {AGE.map((item) => (
                    <Chip key={item} on={bk.aud.includes(item) || (info.voiceReady && !bk.aud.length && item === AGE[0])} sc={`kit-aud-${item}`}>
                      {item}
                    </Chip>
                  ))}
                </div>
                <p className="sc-label sc-kit-gap">Target audience ethnicity</p>
                <p className="sc-muted-xs">Added to image prompts for this {bk.kind}. “Not specified” or no selection is skipped.</p>
                <div className="sc-audience">
                  {ETHNICITY.map((item) => (
                    <Chip key={item} on={bk.aud.includes(item)} sc={`kit-aud-${item}`}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="sc-field sc-span-2" data-sc="kit-colors">
                <p className="sc-label">Colors</p>
                <div className="sc-swatches">
                  {BRAND.colors.map((color, index) => (
                    <span key={color} className={cx('sc-swatch', info.voiceReady ? 'sc-pop-in' : 'is-empty')} style={info.voiceReady ? { background: color, animationDelay: `${index * 60}ms` } : undefined} />
                  ))}
                </div>
              </div>
              <div className="sc-field sc-span-2" data-sc="kit-keywords">
                <p className="sc-label">General template matching keywords</p>
                <p className="sc-muted-xs">Selectable from the brands and campaign template filter. Fewer words give more results. Three or fewer keywords per search works best.</p>
                <div className="sc-setup-url sc-kit-gap">
                  <span className={cx('sc-input is-wide', bk.kwDraft && 'is-focus')} data-sc="kit-kw-input">
                    {bk.kwDraft ? <span className="sc-input-text">{bk.kwDraft}</span> : <span className="sc-input-ph">Add a keyword (one word works best)…</span>}
                  </span>
                  <Button>Add</Button>
                </div>
                {bk.kw.length ? (
                  <div className="sc-audience sc-kit-gap">
                    {bk.kw.map((word) => (
                      <span key={word} className="sc-badge is-chip sc-pop-in">
                        {word}
                        <X size={12} />
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="sc-field sc-span-2" data-sc="kit-negatives">
                <p className="sc-label">Negative words</p>
                <p className="sc-muted-xs">Words or phrases Brain AI must never use in hooks, headlines, CTAs, or subject lines. Anything that slips through is flagged by the safety check.</p>
                <div className="sc-setup-url sc-kit-gap">
                  <span className={cx('sc-input is-wide', bk.negDraft && 'is-focus')} data-sc="kit-neg-input">
                    {bk.negDraft ? <span className="sc-input-text">{bk.negDraft}</span> : <span className="sc-input-ph">Add a banned word or phrase…</span>}
                  </span>
                  <Button sc="kit-neg-add">Add</Button>
                </div>
                <div className="sc-audience sc-kit-gap" data-sc="kit-neg-list">
                  {bk.neg.length ? (
                    bk.neg.map((word) => (
                      <span key={word} className="sc-badge is-chip is-danger sc-pop-in">
                        {word}
                        <X size={12} />
                      </span>
                    ))
                  ) : (
                    <span className="sc-muted-xs">No negative words yet. Add brand-off-limits language like cheap, guaranteed, or a competitor name.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sc-brand-section" data-sc="sc-products">
          <div className="sc-brand-section-head">
            <h3>Products</h3>
            <span className="sc-muted-xs">{showProducts.length} items</span>
            <Button icon={<DownloadSimple size={16} />} sc="kit-import">
              Import from URL
            </Button>
            <Button icon={<Plus size={16} />}>Add product</Button>
          </div>
          <div className="sc-kit-products">
            {showProducts.length === 0 ? <p className="sc-muted-sm sc-kit-empty">No products yet. Scan a website, connect Shopify, or import a product from its link.</p> : null}
            {showProducts.map((product) => {
              const open = bk.open === product.id
              const count = copyCount(state, product.copies, product.id)
              return (
                <div key={product.id} className="sc-card sc-kit-product sc-pop-in" data-sc={`kit-product-${product.id}`}>
                  <div className="sc-kit-product-top">
                    <div className="sc-kit-thumb">
                      <img src={product.src} alt="" className="sc-cover" />
                    </div>
                    <div className="sc-grow">
                      <p className="sc-strong sc-truncate">{product.name}</p>
                      {info.copiesReady ? <p className="sc-mono">{count} ad copies created</p> : <span className="sc-skel-line is-skeleton sc-kit-skel" />}
                    </div>
                  </div>
                  <div className="sc-kit-copyrow" data-sc={`kit-copy-${product.id}`}>
                    <span>
                      <CaretDown size={14} className={cx('sc-kit-caret', open && 'is-open')} />
                      Ad copy
                      <span className="sc-badge">{info.copiesReady ? count : 0}</span>
                    </span>
                  </div>
                  {open ? <AdCopyPanel state={state} pid={product.id} phone={phone} /> : null}
                </div>
              )
            })}
          </div>
          <p className="sc-muted-xs sc-kit-total">{info.copiesReady ? `${copyTotal(state, showProducts)} ad copies across your products` : ''}</p>
        </section>
      </div>
    </div>
  )
}

/* ── Overlays: toast, Shopify approval, import dialog ───────── */

export function KitOverlay({ state }: { state: SceneState }) {
  const { bk } = state
  return (
    <>
      {bk.toast ? (
        <div className="sc-kit-toast" key={bk.toast.key} data-sc="kit-toast">
          {bk.toast.busy ? <CircleNotch size={16} className="sc-spin" /> : <CheckCircle size={16} weight="fill" className="sc-text-success" />}
          <span>{bk.toast.text}</span>
        </div>
      ) : null}
      {bk.shop === 2 ? (
        <div className="sc-modal-scrim">
          <div className="sc-modal is-small" data-sc="kit-approve-dlg">
            <div className="sc-modal-head">
              <span className="sc-modal-title">
                <ShoppingBag size={18} />
                Shopify · Approve access
              </span>
            </div>
            <div className="sc-modal-body">
              <p className="sc-modal-label">{SHOP_DOMAIN}</p>
              <p className="sc-modal-note">AdRender is asking to view your products. It cannot change anything in your store.</p>
              <p className="sc-kit-scope">
                <Check size={14} weight="bold" className="sc-text-success" />
                View products (read_products)
              </p>
              <div className="sc-modal-foot">
                <span className="sc-btn is-secondary">Cancel</span>
                <span className="sc-btn is-primary" data-sc="kit-approve">
                  Install app
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {bk.imp >= 1 && bk.imp <= 4 ? <ImportDialog state={state} /> : null}
    </>
  )
}

function ImportDialog({ state }: { state: SceneState }) {
  const { bk } = state
  const ready = bk.imp >= 3
  return (
    <div className="sc-modal-scrim">
      <div className="sc-modal" data-sc="kit-import-dlg">
        <div className="sc-modal-head">
          <span className="sc-modal-title">Import product from URL</span>
          <X size={16} />
        </div>
        <div className="sc-modal-body">
          <p className="sc-modal-note">Paste a product page link to pick from its images, or a direct image link to add just that image.</p>
          <p className="sc-modal-label">Product page or image URL</p>
          <div className="sc-modal-row">
            <span className={cx('sc-input is-grow', bk.impUrl && bk.imp === 1 && 'is-focus')} data-sc="kit-imp-url">
              {bk.impUrl ? <span className="sc-input-text">{bk.impUrl}</span> : <span className="sc-input-ph">https://store.com/products/example</span>}
            </span>
            <Button sc="kit-fetch" icon={bk.imp === 2 ? <CircleNotch size={16} className="sc-spin" /> : undefined} className={cx(!bk.impUrl && 'is-disabled')}>
              Fetch images
            </Button>
          </div>
          {ready ? (
            <div className="sc-rise-in sc-kit-imp-body">
              <p className="sc-modal-label">Product name</p>
              <span className="sc-input is-wide">
                <span className="sc-input-text">Recovery Slides</span>
              </span>
              <p className="sc-modal-label sc-kit-gap">Choose images to import</p>
              <div className="sc-kit-imgs" data-sc="kit-imgs">
                {['/showcase/recovery-slides.webp', '/showcase/shoe-product.webp', '/showcase/ultra-light-runner.webp'].map((src, index) => (
                  <span key={src} className={cx('sc-kit-img', index < 2 && 'is-on')}>
                    <img src={src} alt="" className="sc-cover" />
                    {index < 2 ? (
                      <span className="sc-kit-img-check">
                        <Check size={11} weight="bold" />
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          <div className="sc-modal-foot">
            <span className="sc-btn is-secondary">Cancel</span>
            <span className={cx('sc-btn is-primary', !ready && 'is-disabled')} data-sc="kit-import-go">
              {bk.imp === 4 ? <CircleNotch size={16} className="sc-spin" /> : null}
              {bk.imp === 4 ? 'Importing…' : 'Import 2 images'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
