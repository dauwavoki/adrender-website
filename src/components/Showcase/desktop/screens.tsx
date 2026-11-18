import { useContext, useEffect, useRef, type ReactNode } from 'react'
import {
  ArrowCounterClockwise,
  ArrowRight,
  BookmarkSimple,
  Books,
  CaretDown,
  CaretLeft,
  ChartBar,
  Check,
  CheckCircle,
  CircleNotch,
  ClockCounterClockwise,
  Coins,
  CreditCard,
  DeviceMobile,
  Download,
  FileArrowUp,
  Globe,
  Lightbulb,
  Lightning,
  ListBullets,
  MagnifyingGlass,
  Megaphone,
  MetaLogo,
  Package,
  Plus,
  Scan,
  SquaresFour,
  Star,
  Storefront,
  Trash,
  UserCircle,
  UserCircleCheck,
  TiktokLogo,
  InstagramLogo,
} from '@phosphor-icons/react'
import {
  ACCOUNT,
  BRAND,
  IMAGE_RESULTS,
  IMAGE_TEMPLATES,
  INSPIRED_IMAGE,
  INSPIRED_VIDEO,
  KEEP_WORKING,
  QUOTE,
  USE_AGAIN_IMAGE,
  USE_AGAIN_VIDEO,
  VIDEO_RESULTS,
  VIDEO_TEMPLATES,
  type Media,
} from '../showcaseData'
import type { SceneState } from '../engine/story'
import { balanceFor, PlayingCtx } from '../engine/layout'
import { cx } from '../../site/cx'


type Tone = 'blue' | 'violet' | 'orange' | 'green' | 'amber'

function IconTile({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className="color-icon-tile" data-tone={tone}>
      {children}
    </span>
  )
}

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

function Button({
  variant = 'secondary',
  icon,
  children,
  sc,
  className,
}: {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  children: ReactNode
  sc?: string
  className?: string
}) {
  return (
    <span data-sc={sc} className={cx('sc-btn', variant === 'primary' ? 'is-primary' : 'is-secondary', className)}>
      {icon}
      {children}
    </span>
  )
}

function Badge({ children, tone }: { children: ReactNode; tone?: 'success' }) {
  return <span className={cx('sc-badge', tone === 'success' && 'is-success')}>{children}</span>
}

/* ── Home ───────────────────────────────────────────────────── */

function HomeCard({ item, kind, play = false }: { item: Media; kind: 'image' | 'video'; play?: boolean }) {
  return (
    <div className="sc-home-card">
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

function SubRow({ label, action, children }: { label: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="sc-subrow">
      <div className="sc-subrow-head">
        <p>{label}</p>
        {action}
      </div>
      <div className="sc-grid-4">{children}</div>
    </div>
  )
}

function SectionHeading({ tone, icon, title, subtitle }: { tone: Tone; icon: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="sc-section-heading">
      <IconTile tone={tone}>{icon}</IconTile>
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

const viewAll = (
  <span className="sc-link">
    View all <ArrowRight size={16} />
  </span>
)

export function HomeScreen({ state }: { state: SceneState }) {
  const scrolled = state.scroll !== 0
  const busy = state.scanBusy
  return (
    <div className="sc-home">
      <div className="sc-quote-row">
        <img src="/brand/icons/icon-color.svg" alt="" className="sc-quote-logo" />
        <div>
          <p className="sc-quote-text">“{QUOTE.text}”</p>
          <p className="sc-quote-by">— {QUOTE.by}</p>
        </div>
      </div>

      <div className="sc-home-header">
        <p className="cockpit-page-title home-workspace-title">
          <UserCircleCheck size={16} aria-hidden />
          <span className="cockpit-page-title-name">AdRender Workspace</span>
          <span className="sc-slash">/</span>
          <span className="cockpit-page-title-folder">{ACCOUNT.workspace}</span>
          <CaretDown size={12} aria-hidden />
        </p>
        <div className="sc-home-actions">
          <Button variant="primary" icon={<SquaresFour size={14} />}>
            Browse templates
          </Button>
          <Button icon={<DeviceMobile size={14} />}>Get the phone app</Button>
          <Button icon={<Books size={14} />}>My Ads Library</Button>
          <Button icon={<BookmarkSimple size={14} />}>Saved templates</Button>
          <Button icon={<Megaphone size={14} />}>Brands &amp; Campaigns</Button>
          <Button icon={<UserCircle size={14} />}>Profile</Button>
        </div>
      </div>

      <div className="sc-stats">
        {[
          { label: 'Ads generated', value: ACCOUNT.stats.ads, tone: 'blue' as Tone, icon: <ChartBar size={18} /> },
          { label: 'Templates saved', value: ACCOUNT.stats.saved, tone: 'violet' as Tone, icon: <BookmarkSimple size={18} /> },
          { label: 'Brands', value: ACCOUNT.stats.brands, tone: 'amber' as Tone, icon: <Package size={18} /> },
          { label: 'In progress', value: 0, tone: 'green' as Tone, icon: <CircleNotch size={18} /> },
        ].map((stat) => (
          <div key={stat.label} className="sc-stat">
            <IconTile tone={stat.tone}>{stat.icon}</IconTile>
            <p className="sc-stat-label">{stat.label}</p>
            <p className="sc-stat-value">{stat.value.toLocaleString('en-US')}</p>
          </div>
        ))}
      </div>

      <div className="sc-grid-3">
        <section className="sc-card sc-continue">
          <div className="sc-card-title-row">
            <IconTile tone="blue">
              <ClockCounterClockwise size={18} />
            </IconTile>
            <p className="sc-card-title">Keep working on</p>
          </div>
          <div className="sc-continue-media">
            <img src={KEEP_WORKING.src} alt="" className="sc-cover" />
          </div>
          <div className="sc-continue-foot">
            <div>
              <p className="sc-strong">{KEEP_WORKING.title}</p>
              <p className="sc-muted-xs">{KEEP_WORKING.when}</p>
            </div>
            <ArrowRight size={16} className="sc-up-right" />
          </div>
        </section>

        <section className={cx('sc-card sc-create', busy && 'cockpit-need-ring')} data-sc="sc-create">
          <div className="sc-card-title-row">
            <IconTile tone="amber">
              <Megaphone size={18} />
            </IconTile>
            <p className="sc-card-title">Create a brand or campaign</p>
          </div>
          <div className="sc-create-fields">
            <span className={cx('sc-input', state.urlFocus && 'is-focus')} data-sc="sc-url">
              {state.url ? <span className="sc-input-text">{state.url}</span> : <span className="sc-input-ph">https://</span>}
              {state.urlFocus && !busy ? <span className="sc-caret" /> : null}
            </span>
            <Button icon={busy ? <CircleNotch size={16} className="sc-spin" /> : <Scan size={16} />} sc="sc-scan" className={cx(busy && 'is-active')}>
              {busy ? 'Scanning…' : 'Scan URL'}
            </Button>
            <span className="sc-input">
              <span className="sc-input-ph">store.myshopify.com</span>
            </span>
            <Button icon={<Storefront size={16} />}>Connect Shopify</Button>
            <Button icon={<FileArrowUp size={16} />} className="sc-span-2">
              Upload docs
            </Button>
          </div>
        </section>

        <section className="sc-card sc-tokens">
          <div className="sc-card-title-row">
            <IconTile tone="violet">
              <Coins size={18} />
            </IconTile>
            <p className="sc-card-title">Tokens</p>
            <span className="sc-muted-xs sc-ml-auto">Personal workspace</span>
          </div>
          <p className="sc-big">{balanceFor(state).toLocaleString('en-US')}</p>
          <p className="sc-muted-sm">Available to spend right now</p>
          <div className="sc-token-split">
            <div>
              <p className="sc-muted-sm">Plan tokens</p>
              <p className="sc-strong-lg">{ACCOUNT.plan.tokens}</p>
              <p className="sc-muted-xs">Refills monthly</p>
            </div>
            <div>
              <p className="sc-muted-sm">Top-up tokens</p>
              <p className="sc-strong-lg">{ACCOUNT.plan.topUp}</p>
              <p className="sc-muted-xs">Never expire</p>
            </div>
          </div>
          <div className="sc-token-actions">
            <Button icon={<Plus size={16} />}>Add tokens</Button>
            <span className="sc-link is-underline">Plans and billing</span>
          </div>
        </section>
      </div>

      <section className="sc-card sc-section" data-sc="sc-use-again">
        <SectionHeading
          tone="blue"
          icon={<ArrowCounterClockwise size={18} />}
          title="Use again"
          subtitle="Templates you rendered recently — one click back into Clone."
        />
        <SubRow label="Image">
          {USE_AGAIN_IMAGE.map((item) => (
            <HomeCard key={item.id} item={item} kind="image" />
          ))}
        </SubRow>
        <SubRow label="Video">
          {USE_AGAIN_VIDEO.map((item, index) => (
            <HomeCard key={item.id} item={item} kind="video" play={scrolled && index === 0} />
          ))}
        </SubRow>
      </section>

      <section className="sc-card sc-section" data-sc="sc-inspired">
        <SectionHeading
          tone="violet"
          icon={<Lightbulb size={18} />}
          title="Get inspired"
          subtitle="Fresh ads from brands that are winning right now."
        />
        <SubRow label="Image" action={viewAll}>
          {INSPIRED_IMAGE.map((item) => (
            <HomeCard key={item.id} item={item} kind="image" />
          ))}
        </SubRow>
        <SubRow label="Video" action={viewAll}>
          {INSPIRED_VIDEO.map((item, index) => (
            <HomeCard key={item.id} item={item} kind="video" play={scrolled && index === 0} />
          ))}
        </SubRow>
      </section>

      <section className="sc-card sc-plan">
        <div className="sc-card-title-row">
          <IconTile tone="green">
            <CreditCard size={18} />
          </IconTile>
          <div>
            <p className="sc-card-title">Your plan</p>
            <p className="sc-strong-lg">{ACCOUNT.plan.name}</p>
            <p className="sc-muted-sm">{ACCOUNT.plan.meta}</p>
          </div>
        </div>
        <p className="sc-muted-sm sc-grow">Up to 1,000 image ads, or at least 50 video ads every month</p>
        <Button>Plans and billing</Button>
        <Button icon={<Plus size={16} />}>Top up</Button>
      </section>
    </div>
  )
}

/* ── Brand page ─────────────────────────────────────────────── */

export function BrandScreen({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const stage = state.brandStage
  const scanning = stage >= 1
  const named = stage >= 2
  const colors = Math.max(0, Math.min(BRAND.colors.length, stage - 2))
  const done = stage >= 13
  const typed = state.url
  return (
    <div className={cx('sc-brand', phone && 'is-phone')}>
      <header className="sc-brand-header" data-sc="sc-brand-top">
        <div className="sc-brand-header-left">
          <span className="sc-icon-btn">
            <CaretLeft size={16} />
          </span>
          {named ? (
            <img src={BRAND.logo} alt="" className="sc-brand-head-logo sc-fade-in" />
          ) : (
            <span className="sc-brand-head-logo is-letter">N</span>
          )}
          <h2 className="sc-truncate">{named ? BRAND.name : 'New brand or campaign'}</h2>
        </div>
        {phone ? null : <p className="sc-muted-sm">Changes save automatically</p>}
      </header>

      <div className="sc-brand-body">
        {scanning ? (
          <div className={cx('sc-banner sc-rise-in', done && 'is-done')} data-sc="sc-banner">
            {done ? <CheckCircle size={18} weight="fill" className="sc-text-success" /> : <CircleNotch size={18} className="sc-spin" />}
            <div>
              <p className="sc-strong">
                {done
                  ? `Brand ready — ${BRAND.products.length} products and ${BRAND.adCopies} ad copies found`
                  : 'Reading your website — building your brand or campaign profile now'}
              </p>
              <p className="sc-muted-sm">
                {done
                  ? 'Review anything you like. It is ready to use in the cockpit.'
                  : 'Brain AI is scanning the site you shared and filling in name, voice, colors, and logo.'}
              </p>
            </div>
          </div>
        ) : null}

        <section className="sc-brand-section">
          <div className="sc-brand-section-head">
            <h3>Brand or campaign setup</h3>
            <Badge>Start here</Badge>
          </div>
          <div className="sc-card sc-setup" data-sc="sc-setup">
            <div className="sc-setup-row">
              <span className="sc-soft-icon" data-sc="sc-scan-icon">
                <Globe size={16} />
              </span>
              <div className="sc-grow">
                <p className="sc-strong">Scan your website</p>
                <p className="sc-muted-xs">Brain AI reads the site and fills in voice, colors, logo, tagline, and more.</p>
              </div>
              <span className="sc-muted-xs">{scanning ? '1/3' : '0/3'}</span>
            </div>
            <div className="sc-setup-url">
              <span className={cx('sc-input is-wide', state.urlFocus && 'is-focus')} data-sc="sc-brand-url">
                {scanning ? (
                  <span className="sc-input-text">https://{BRAND.url}</span>
                ) : typed ? (
                  <span className="sc-input-text">{typed}</span>
                ) : (
                  <span className="sc-input-ph">https://yourwebsite.com</span>
                )}
                {state.urlFocus && !scanning ? <span className="sc-caret" /> : null}
              </span>
              <Button
                sc="sc-brand-scan"
                icon={done ? <Check size={16} /> : scanning ? <CircleNotch size={16} className="sc-spin" /> : <Scan size={16} />}
              >
                {done ? 'Scanned' : scanning ? 'Scanning…' : 'Scan'}
              </Button>
            </div>

            <div className="sc-field-grid">
              <div className="sc-field" data-sc="sc-name">
                <p className="sc-label">Brand or Campaign Name</p>
                <div className={cx('sc-field-box', scanning && !named && 'is-skeleton')}>{named ? <span className="sc-fade-in">{BRAND.name}</span> : null}</div>
              </div>
              <div className="sc-field">
                <p className="sc-label">Logo</p>
                <div className="sc-logo-box">
                  {named ? <img src={BRAND.logo} alt="" className="sc-fade-in" /> : scanning ? <span className="is-skeleton" /> : null}
                </div>
              </div>
              <div className="sc-field sc-span-2" data-sc="sc-voice">
                <p className="sc-label">Brand or Campaign voice</p>
                <div className={cx('sc-field-box is-tall', scanning && stage < 8 && 'is-skeleton')}>
                  {stage >= 8 ? <span className="sc-type-in">{BRAND.voice}</span> : null}
                </div>
              </div>
              <div className="sc-field sc-span-2">
                <p className="sc-label">Target audience</p>
                <div className="sc-audience">
                  {stage >= 8 ? (
                    BRAND.audience.map((item, index) => (
                      <span key={item} className="sc-badge is-chip sc-pop-in" style={{ animationDelay: `${index * 120}ms` }}>
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className={cx('sc-skel-chip', scanning && 'is-skeleton')} />
                  )}
                </div>
              </div>
              <div className="sc-field sc-span-2" data-sc="sc-colors">
                <p className="sc-label">Colors</p>
                <div className="sc-swatches">
                  {BRAND.colors.map((color, index) => (
                    <span
                      key={color}
                      className={cx('sc-swatch', index < colors ? 'sc-pop-in' : 'is-empty')}
                      style={index < colors ? { background: color } : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sc-brand-section" data-sc="sc-products">
          <div className="sc-brand-section-head">
            <h3>Products</h3>
            <span className="sc-muted-xs">{Math.max(0, Math.min(4, stage - 8))} items</span>
          </div>
          <div className="sc-product-grid">
            {BRAND.products.map((product, index) =>
              stage >= 9 + index ? (
                <div key={product.id} className="sc-card sc-product sc-pop-in">
                  <div className="sc-product-media">
                    <img src={product.src} alt="" className="sc-cover" />
                  </div>
                  <p className="sc-strong sc-truncate">{product.name}</p>
                  <p className="sc-mono">{product.copies} ad copies created</p>
                </div>
              ) : (
                <div key={product.id} className="sc-card sc-product is-skeleton-card">
                  <div className={cx('sc-product-media', scanning && 'is-skeleton')} />
                  <span className={cx('sc-skel-line', !scanning && 'is-idle')} />
                  <span className={cx('sc-skel-line is-short', !scanning && 'is-idle')} />
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ── Brands & Campaigns ─────────────────────────────────────── */

const OTHER_BRANDS = [
  { id: 'b1', name: 'Summer Sale', kind: 'Campaign', products: 3, tint: '#e5a33d' },
  { id: 'b2', name: 'Trail Collection', kind: 'Campaign', products: 6, tint: '#52ad50' },
  { id: 'b3', name: 'Studio Line', kind: 'Brand', products: 9, tint: '#9b6bf2' },
]

export function BrandsScreen({ phone = false }: { state: SceneState; phone?: boolean }) {
  return (
    <div className={cx('sc-brands', phone && 'is-phone')}>
      {phone ? (
        <div className="sc-brands-phone-tools">
          <span className="sc-search is-grow">
            <MagnifyingGlass size={16} />
            Search brands or campaigns…
          </span>
          <span className="sc-segmented is-icons">
            <span className="is-on">All</span>
            <span>
              <Megaphone size={14} />
            </span>
          </span>
        </div>
      ) : (
        <header className="sc-page-header">
          <div className="sc-page-row">
            <p className="cockpit-page-title">
              <Megaphone size={16} />
              <span className="cockpit-page-title-name">Brands &amp; Campaigns</span>
            </p>
          </div>
          <div className="sc-page-tools">
            <span className="sc-search" style={{ width: 300 }}>
              <MagnifyingGlass size={16} />
              Search brands or campaigns…
            </span>
            <Segmented options={['All', 'Brands', 'Campaigns']} value={0} />
            <span className="sc-grow" />
            <Button variant="primary" icon={<Plus size={16} />} sc="sc-add-brand">
              Add brand or campaign
            </Button>
          </div>
        </header>
      )}
      <div className="sc-brand-grid">
        {OTHER_BRANDS.map((item) => (
          <div key={item.id} className="sc-card sc-brand-card">
            <span className="sc-brand-card-mark" style={{ background: item.tint }}>
              {item.name.charAt(0)}
            </span>
            <div className="sc-grow">
              <p className="sc-strong sc-truncate">{item.name}</p>
              <div className="sc-brand-card-meta">
                <Badge>{item.kind}</Badge>
                <span className="sc-muted-sm">{item.products} products</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Browse ─────────────────────────────────────────────────── */

function TemplateCard({ item, kind, hover }: { item: Media; kind: 'image' | 'video'; hover: boolean }) {
  return (
    <div className={cx('sc-tpl', hover && 'is-hover')} data-sc={`sc-card-${item.id}`}>
      <div className="sc-tpl-media">
        <Clip src={item.src} video={kind === 'video' ? item.video : undefined} play={hover} />
        <div className="sc-tpl-overlay">
          <span className="sc-btn is-ghost is-icon">
            <BookmarkSimple size={16} />
          </span>
          <span className="sc-btn is-secondary is-sm" data-sc={`sc-use-${item.id}`}>
            <Lightning size={16} className="sc-text-accent" />
            Use
          </span>
        </div>
        <span className="sc-platforms">
          <MetaLogo size={12} weight="bold" />
          <InstagramLogo size={12} weight="bold" />
          {kind === 'video' ? <TiktokLogo size={12} weight="bold" /> : null}
        </span>
      </div>
      <div className="sc-tpl-foot">
        <span className="sc-tpl-brand">
          <span className="sc-letter" style={{ background: item.tint }}>
            {item.niche.charAt(0)}
          </span>
          <span className="sc-truncate">{item.niche}</span>
        </span>
        <span className="sc-tpl-badges">
          <Badge>{item.days} days</Badge>
          <Badge tone="success">Active</Badge>
        </span>
      </div>
    </div>
  )
}

function Segmented({ options, value }: { options: ReactNode[]; value: number }) {
  return (
    <span className="sc-segmented">
      {options.map((option, index) => (
        <span key={index} className={cx(index === value && 'is-on')}>
          {option}
        </span>
      ))}
    </span>
  )
}

export function BrowseScreen({ state }: { state: SceneState }) {
  const video = state.mode === 'video'
  const items = video ? VIDEO_TEMPLATES : IMAGE_TEMPLATES
  return (
    <div className="sc-browse">
      <header className="sc-page-header">
        <div className="sc-page-row">
          <p className="cockpit-page-title">
            <SquaresFour size={16} />
            <span className="cockpit-page-title-name">{video ? 'Browse Video Templates' : 'Browse Image Templates'}</span>
          </p>
        </div>
        <div className="sc-page-tools">
          <Segmented options={['Newest', 'Longest running', 'Most relevant']} value={1} />
          <span className="sc-chip">Active only</span>
          <span className="sc-search is-grow">
            <MagnifyingGlass size={16} />
            Describe the ads you want — “skincare UGC with a hook in the first second”
          </span>
          <Segmented options={[<SquaresFour key="g" size={16} />, <ListBullets key="l" size={16} />]} value={0} />
          <Segmented options={['Community', 'Brands']} value={0} />
        </div>
      </header>
      <div className="sc-tpl-grid" key={state.mode}>
        {items.map((item) => (
          <TemplateCard key={item.id} item={item} kind={video ? 'video' : 'image'} hover={state.hover === item.id} />
        ))}
      </div>
    </div>
  )
}

/* ── Library ────────────────────────────────────────────────── */

function StatusTabs({ ready }: { ready: number }) {
  return (
    <span className="sc-segmented is-status">
      <span>Library</span>
      <span className="is-on">
        Ready <b className="sc-count is-ready">{ready}</b>
      </span>
      <span>
        Rendering <b className="sc-count">0</b>
      </span>
      <span>
        Failed <b className="sc-count">0</b>
      </span>
    </span>
  )
}

export function LibraryScreen({ state }: { state: SceneState }) {
  const video = state.mode === 'video'
  const results = video ? VIDEO_RESULTS : IMAGE_RESULTS
  return (
    <div className="sc-library">
      <header className="sc-page-header">
        <div className="sc-page-row">
          <p className="cockpit-page-title">
            <span className="cockpit-page-title-name">My Ads Library</span>
          </p>
          <Button icon={<Check size={16} />}>Approve all</Button>
        </div>
        <div className="sc-page-tools">
          <StatusTabs ready={results.length} />
          <span className="sc-grow" />
          <Button icon={<Download size={16} />}>Download</Button>
        </div>
      </header>
      <div className={cx('sc-ready-grid', video && 'is-video')} key={state.mode}>
        {results.map((item, index) => (
          <div key={item.id} className="sc-ready-card sc-rise-in" style={{ animationDelay: `${index * 90}ms` }}>
            <div className={cx('sc-ready-media', !video && 'ratio' in item && item.ratio === '1:1' && 'is-square')}>
              {'video' in item ? <Clip src={item.src} video={item.video} play /> : <img src={item.src} alt="" className="sc-cover" />}
              <span className="sc-ready-star">
                <Star size={16} />
              </span>
            </div>
            <div className="sc-ready-body">
              <p className="sc-strong sc-truncate">
                {BRAND.name} · {video ? 'Video ad' : 'Image ad'}
              </p>
              <span className="sc-tpl-badges">
                {video ? (
                  <>
                    <Badge>720p</Badge>
                    <Badge>Clone</Badge>
                  </>
                ) : (
                  <>
                    <Badge>{'ratio' in item ? item.ratio : '4:5'}</Badge>
                    <Badge>1K</Badge>
                    <Badge>Clone</Badge>
                  </>
                )}
              </span>
              <div className="sc-ready-foot">
                <span className="sc-muted-xs">Just now</span>
                <span className="sc-ready-actions">
                  <span className="sc-btn is-secondary is-xs">
                    <Check size={14} className="sc-text-success" />
                    Approve
                  </span>
                  <span className="sc-btn is-ghost is-icon">
                    <Trash size={16} />
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

