import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import {
  ArrowRight,
  BookmarkSimple,
  CaretDoubleLeft,
  CaretUpDown,
  Check,
  CheckCircle,
  Coins,
  CreditCard,
  House,
  Image as ImageIcon,
  Lightbulb,
  MagicWand,
  Megaphone,
  Rocket,
  SquaresFour,
  UserCircleCheck,
  VideoCamera,
} from '@phosphor-icons/react'
import { getSignupUrl } from '../../lib/appUrl'
import { IconTile, type TileTone } from '../site/IconTile'
import {
  ACCOUNT,
  GET_INSPIRED,
  KEEP_WORKING,
  MORE_DONE,
  PERSONAL,
  QUOTES,
  SIDE_TOKENS,
  TOKEN_SUMMARY,
  USE_AGAIN,
  WALKTHROUGH,
  WORK_TODAY,
  YOUR_PLAN,
  type PreviewTemplate,
} from './appPreviewData'
import './AppPreview.css'

const DESIGN_WIDTH = 1280
const WINDOW_HEIGHT = 800

type ViewId = 'home' | 'library' | 'browse' | 'saved' | 'playground' | 'brands'
type Mode = 'image' | 'video'
type LibraryPhase = 'rendering' | 'ready'

const MediaCtx = createContext({ load: false, play: false })

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function useFrameScale(slotRef: RefObject<HTMLDivElement | null>, frameRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const slot = slotRef.current
    const frame = frameRef.current
    if (!slot || !frame) return

    const apply = (width: number) => {
      if (width < 8) return
      const scale = width / DESIGN_WIDTH
      frame.style.transform = `scale(${scale})`
      slot.style.height = `${WINDOW_HEIGHT * scale}px`
    }

    apply(slot.clientWidth)
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) apply(width)
    })
    observer.observe(slot)
    return () => observer.disconnect()
  }, [slotRef, frameRef])
}

function usePreviewMedia(sectionRef: RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false)
  const [inView, setInView] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const nearObs = new IntersectionObserver(([entry]) => setNear(Boolean(entry?.isIntersecting)), {
      rootMargin: '480px 0px',
      threshold: 0,
    })
    const viewObs = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0 })
    nearObs.observe(el)
    viewObs.observe(el)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduce(motion.matches)
    syncMotion()
    motion.addEventListener('change', syncMotion)
    return () => {
      nearObs.disconnect()
      viewObs.disconnect()
      motion.removeEventListener('change', syncMotion)
    }
  }, [sectionRef])

  return { load: (near || inView) && !reduce, play: inView && !reduce }
}

function PreviewVideo({ src, poster, width, height }: { src: string; poster: string; width: number; height: number }) {
  const { load, play } = useContext(MediaCtx)
  const ref = useRef<HTMLVideoElement>(null)
  const loadedSrc = useRef<string | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true
    if (!load) {
      el.pause()
      return
    }
    if (loadedSrc.current !== src) {
      loadedSrc.current = src
      el.preload = 'auto'
      el.src = src
      el.load()
    }
    if (play) void el.play().catch(() => undefined)
    else el.pause()
  }, [load, play, src])

  return <video ref={ref} poster={poster} muted loop playsInline preload="none" width={width} height={height} />
}

function HomeIcon({ selected }: { selected: boolean }) {
  return (
    <span className={cx('ap-home-icon', selected && 'is-selected')} aria-hidden>
      <img className="for-light for-line" src="/brand/adrender-home-line-light.svg" alt="" width={16} height={16} />
      <img className="for-dark for-line" src="/brand/adrender-home-line-dark.svg" alt="" width={16} height={16} />
      <img className="for-light for-fill" src="/brand/adrender-home-fill-light.svg" alt="" width={16} height={16} />
      <img className="for-dark for-fill" src="/brand/adrender-home-fill-dark.svg" alt="" width={16} height={16} />
    </span>
  )
}

function QuoteBlock() {
  const [index, setIndex] = useState(0)
  const [swapping, setSwapping] = useState(false)
  const timer = useRef<number | null>(null)
  const quote = QUOTES[index] ?? QUOTES[0]

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  const advance = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndex((current) => (current + 1) % QUOTES.length)
      return
    }
    if (timer.current !== null) return
    setSwapping(true)
    timer.current = window.setTimeout(() => {
      setIndex((current) => (current + 1) % QUOTES.length)
      setSwapping(false)
      timer.current = null
    }, 300)
  }

  return (
    <div className={swapping ? 'ap-quote is-swapping' : 'ap-quote'} onMouseLeave={advance}>
      <p className="ap-quote-text">“{quote.text}”</p>
      <p className="ap-quote-by">— {quote.attribution}</p>
    </div>
  )
}

function RenderingDots() {
  return (
    <span className="rendering-dots" aria-hidden>
      <span />
      <span />
      <span />
    </span>
  )
}

function Sidebar({
  view,
  mode,
  libraryPhase,
  href,
  onView,
  onMode,
  onCollapse,
}: {
  view: ViewId
  mode: Mode
  libraryPhase: LibraryPhase
  href: string
  onView: (id: ViewId) => void
  onMode: (mode: Mode) => void
  onCollapse: () => void
}) {
  const librarySelected = view === 'library'
  const libraryReady = libraryPhase === 'ready'

  return (
    <aside className="ap-sidebar" aria-label="App sidebar">
      <div className="ap-top">
        <div className="ap-segment" role="group" aria-label="Image or video">
          <button type="button" aria-pressed={mode === 'image'} onClick={() => onMode('image')}>
            <ImageIcon size={14} weight={mode === 'image' ? 'fill' : 'regular'} aria-hidden />
            <span>Image</span>
          </button>
          <button type="button" aria-pressed={mode === 'video'} onClick={() => onMode('video')}>
            <VideoCamera size={14} weight={mode === 'video' ? 'fill' : 'regular'} aria-hidden />
            <span>Video</span>
          </button>
        </div>
        <button type="button" className="ap-icon-btn" aria-label={ACCOUNT.collapseLabel} onClick={onCollapse}>
          <CaretDoubleLeft size={16} aria-hidden />
        </button>
      </div>

      <nav className="ap-nav" aria-label="Workspace">
        <button type="button" className={cx('ap-nav-btn', view === 'home' && 'is-selected')} aria-current={view === 'home' ? 'page' : undefined} onClick={() => onView('home')}>
          <HomeIcon selected={view === 'home'} />
          <b className="ap-hide">AdRender</b>
        </button>
        <button
          type="button"
          className={cx('ap-nav-btn', librarySelected && 'is-selected', libraryReady && 'library-ready')}
          aria-current={librarySelected ? 'page' : undefined}
          onClick={() => onView('library')}
        >
          {libraryReady ? (
            <CheckCircle size={16} weight={librarySelected ? 'fill' : 'regular'} aria-hidden />
          ) : (
            <RenderingDots />
          )}
          <span className="ap-hide">{libraryReady ? 'Ready' : 'Rendering'}</span>
          {libraryReady ? <span className="ap-nav-count">2</span> : null}
        </button>
        <NavButton id="browse" label="Browse Templates" selected={view === 'browse'} onView={onView} icon={<SquaresFour size={16} weight={view === 'browse' ? 'fill' : 'regular'} />} />
        <NavButton id="saved" label="Saved Templates" selected={view === 'saved'} onView={onView} icon={<BookmarkSimple size={16} weight={view === 'saved' ? 'fill' : 'regular'} />} />
        <NavButton id="playground" label="Ad Playground" selected={view === 'playground'} onView={onView} icon={<MagicWand size={16} weight={view === 'playground' ? 'fill' : 'regular'} />} />
        <NavButton id="brands" label="Brands & Campaigns" selected={view === 'brands'} onView={onView} icon={<Megaphone size={16} weight={view === 'brands' ? 'fill' : 'regular'} />} />
      </nav>

      <div className="ap-side-bottom">
        <a className="ap-side-btn" href={href}>
          <UserCircleCheck size={16} aria-hidden />
          <span className="ap-side-copy">
            <strong>{ACCOUNT.workspace}</strong>
            <small>{ACCOUNT.workspaceMeta}</small>
          </span>
          <CaretUpDown className="ap-caret" size={14} aria-hidden />
        </a>
        <div className="ap-tokens">
          <Coins size={16} aria-hidden />
          <span className="ap-hide">{TOKEN_SUMMARY.available} tokens</span>
          <a href={href}>{SIDE_TOKENS.action}</a>
        </div>
        <a className="ap-side-btn ap-profile" href={href}>
          <span className="ap-avatar" aria-hidden>
            JL
          </span>
          <span className="ap-side-copy">
            <strong>{ACCOUNT.name}</strong>
            <small>{ACCOUNT.email}</small>
          </span>
          <CaretUpDown className="ap-caret" size={14} aria-hidden />
        </a>
      </div>
    </aside>
  )
}

function NavButton({
  id,
  label,
  selected,
  icon,
  onView,
}: {
  id: ViewId
  label: string
  selected: boolean
  icon: ReactNode
  onView: (id: ViewId) => void
}) {
  return (
    <button type="button" className={cx('ap-nav-btn', selected && 'is-selected')} aria-current={selected ? 'page' : undefined} onClick={() => onView(id)}>
      {icon}
      <span className="ap-hide">{label}</span>
    </button>
  )
}

function TemplateTiles({ items, href, priorityFirst = false }: { items: readonly PreviewTemplate[]; href: string; priorityFirst?: boolean }) {
  return (
    <div className="ap-tiles">
      {items.map((item, index) => (
        <a key={item.id} className="ap-tile" href={href}>
          <span className="ap-tile-media">
            {item.kind === 'video' ? (
              <PreviewVideo src={item.videoSrc} poster={item.still.src} width={item.still.width} height={item.still.height} />
            ) : (
              <img
                src={item.still.src}
                alt=""
                width={item.still.width}
                height={item.still.height}
                loading={priorityFirst && index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={priorityFirst && index === 0 ? 'high' : undefined}
                draggable={false}
              />
            )}
          </span>
          <span className="ap-tile-meta">
            <span>{item.label}</span>
            <span className={cx('ap-badge', item.kind === 'video' ? 'is-warning' : 'is-success')}>{item.kind === 'video' ? 'Video' : 'Image'}</span>
          </span>
        </a>
      ))}
    </div>
  )
}

function HomeView({ href, mode }: { href: string; mode: Mode }) {
  const stats = PERSONAL.stats.filter((stat) => stat.id !== 'workspaces')
  const tones: TileTone[] = ['blue', 'violet', 'amber', 'green']
  const workTones: Record<string, TileTone> = { statics: 'blue', videos: 'green', playground: 'amber' }

  return (
    <div className="ap-stack">
      <QuoteBlock />
      <div className="ap-page-head">
        <IconTile tone="blue" size={36}>
          <House size={18} />
        </IconTile>
        <div>
          <h2>Home</h2>
          <p>{ACCOUNT.workspace}</p>
        </div>
        <a href={href}>
          <SquaresFour size={16} aria-hidden />
          Browse templates
        </a>
      </div>

      <div className="ap-stats">
        {stats.map((stat, index) => (
          <div key={stat.id} className="ap-stat">
            <IconTile tone={tones[index] ?? 'blue'} size={36}>
              <StatIcon id={stat.id} />
            </IconTile>
            <span>{stat.label}</span>
            <b>{stat.value}</b>
          </div>
        ))}
      </div>

      <div className="ap-work">
        <section className="ap-panel">
          <h3>Work today</h3>
          <div className="ap-work-grid">
            {WORK_TODAY.map((card) => (
              <a key={card.id} className="ap-mini" href={href} aria-current={mode === 'image' && card.id === 'statics' ? 'true' : undefined}>
                <IconTile tone={workTones[card.id] ?? 'blue'} size={36}>
                  <WorkIcon id={card.id} />
                </IconTile>
                <strong>{card.title}</strong>
                <span>{card.body}</span>
              </a>
            ))}
          </div>
        </section>
        <a className="ap-panel ap-keep" href={href}>
          <p className="ap-muted">{KEEP_WORKING.kicker}</p>
          <img
            src={KEEP_WORKING.still.src}
            alt=""
            width={KEEP_WORKING.still.width}
            height={KEEP_WORKING.still.height}
            fetchPriority="high"
            decoding="async"
          />
          <span className="ap-keep-foot">
            <span>
              <b>{KEEP_WORKING.title}</b>
              <span>{KEEP_WORKING.when}</span>
            </span>
            <ArrowRight size={16} aria-hidden />
          </span>
        </a>
        <a className="ap-panel" href={href}>
          <span className="ap-section-label">
            <IconTile tone="green" size={32}>
              <CreditCard size={16} />
            </IconTile>
            <span className="ap-muted">{YOUR_PLAN.kicker}</span>
          </span>
          <p className="ap-plan-name">{YOUR_PLAN.name}</p>
          <p className="ap-muted">
            {YOUR_PLAN.status} · {YOUR_PLAN.renews}
          </p>
          <p className="ap-muted">{YOUR_PLAN.output}</p>
        </a>
      </div>

      <div className="ap-split">
        <section className="ap-panel">
          <span className="ap-section-label">
            <IconTile tone="violet" size={32}>
              <Coins size={16} />
            </IconTile>
            <span className="ap-muted">{TOKEN_SUMMARY.kicker}</span>
            <span className="ap-muted" style={{ marginLeft: 'auto' }}>
              {TOKEN_SUMMARY.scope}
            </span>
          </span>
          <p className="ap-token-num">{TOKEN_SUMMARY.available}</p>
          <p className="ap-muted">{TOKEN_SUMMARY.availableLabel}</p>
          <div className="ap-token-pills">
            <div>
              <span className="ap-muted">{TOKEN_SUMMARY.planLabel}</span>
              <b>{TOKEN_SUMMARY.plan}</b>
              <span className="ap-muted">{TOKEN_SUMMARY.planNote}</span>
            </div>
            <div>
              <span className="ap-muted">{TOKEN_SUMMARY.topUpLabel}</span>
              <b>{TOKEN_SUMMARY.topUp}</b>
              <span className="ap-muted">{TOKEN_SUMMARY.topUpNote}</span>
            </div>
          </div>
        </section>
        <section className="ap-panel">
          <h3>{WALKTHROUGH.title}</h3>
          <p className="ap-muted">{WALKTHROUGH.body}</p>
          <div className="ap-steps">
            {WALKTHROUGH.steps.map((step) => (
              <a key={step.id} className="ap-step" href={href}>
                <Check size={16} weight="bold" aria-hidden />
                {step.label}
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="ap-panel">
        <span className="ap-section-label">
          <IconTile tone="orange" size={32}>
            <Rocket size={16} />
          </IconTile>
          <span>
            <h3>{MORE_DONE.title}</h3>
            <p className="ap-muted">{MORE_DONE.subtitle}</p>
          </span>
        </span>
        <div className="ap-plans">
          {MORE_DONE.plans.map((plan) => (
            <a key={plan.id} className="ap-plan" href={href}>
              <span className="ap-plan-top">
                <span>{plan.name}</span>
                <span>${plan.price}/mo</span>
              </span>
              <span style={{ minHeight: 22, marginTop: 8 }}>
                {plan.yours ? <span className="ap-badge is-success">{MORE_DONE.yours}</span> : null}
              </span>
              <p>{plan.output}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="ap-panel">
        <span className="ap-section-label">
          <IconTile tone="blue" size={32}>
            <ArrowRight size={16} />
          </IconTile>
          <span>
            <h3>{USE_AGAIN.title}</h3>
            <p className="ap-muted">{USE_AGAIN.subtitle}</p>
          </span>
        </span>
        <Row label="Image" items={USE_AGAIN.images} href={href} priority />
        <Row label="Video" items={USE_AGAIN.videos} href={href} />
      </section>

      <section className="ap-panel">
        <span className="ap-section-label">
          <IconTile tone="violet" size={32}>
            <Lightbulb size={16} />
          </IconTile>
          <span>
            <h3>{GET_INSPIRED.title}</h3>
            <p className="ap-muted">{GET_INSPIRED.subtitle}</p>
          </span>
        </span>
        <Row label="Image" items={GET_INSPIRED.images} href={href} viewAll={GET_INSPIRED.viewAll} />
        <Row label="Video" items={GET_INSPIRED.videos} href={href} viewAll={GET_INSPIRED.viewAll} />
      </section>
    </div>
  )
}

function Row({
  label,
  items,
  href,
  viewAll,
  priority = false,
}: {
  label: string
  items: readonly PreviewTemplate[]
  href: string
  viewAll?: string
  priority?: boolean
}) {
  return (
    <div>
      <div className="ap-row-head">
        <span>{label}</span>
        {viewAll ? (
          <a href={href}>
            {viewAll}
            <ArrowRight size={14} aria-hidden />
          </a>
        ) : null}
      </div>
      <TemplateTiles items={items} href={href} priorityFirst={priority && label === 'Image'} />
    </div>
  )
}

function StatIcon({ id }: { id: string }) {
  if (id === 'saved') return <BookmarkSimple size={18} />
  if (id === 'brands') return <Megaphone size={18} />
  if (id === 'progress') return <Rocket size={18} />
  return <SquaresFour size={18} />
}

function WorkIcon({ id }: { id: string }) {
  if (id === 'videos') return <VideoCamera size={18} />
  if (id === 'playground') return <MagicWand size={18} />
  return <ImageIcon size={18} />
}

function SimpleView({
  title,
  body,
  items,
  href,
}: {
  title: string
  body: string
  items: readonly PreviewTemplate[]
  href: string
}) {
  return (
    <div className="ap-stack">
      <h2 className="ap-view-title">{title}</h2>
      <p className="ap-muted">{body}</p>
      <TemplateTiles items={items} href={href} />
    </div>
  )
}

type AppPreviewSectionProps = {
  embedded?: boolean
}

export function AppPreviewSection({ embedded = false }: AppPreviewSectionProps) {
  const signupHref = getSignupUrl()
  const sectionRef = useRef<HTMLElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const media = usePreviewMedia(sectionRef)
  useFrameScale(slotRef, frameRef)
  const [view, setView] = useState<ViewId>('home')
  const [mode, setMode] = useState<Mode>('image')
  const [collapsed, setCollapsed] = useState(false)
  const [libraryPhase, setLibraryPhase] = useState<LibraryPhase>('rendering')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setLibraryPhase('ready')
      return
    }
    const timer = window.setTimeout(() => setLibraryPhase('ready'), 3000)
    return () => window.clearTimeout(timer)
  }, [])

  const frameVars = {
    '--ap-design-w': `${DESIGN_WIDTH}px`,
    '--ap-window-h': `${WINDOW_HEIGHT}px`,
  } as CSSProperties

  const frame = (
    <div className="ap-scaler">
      <div className="ap-slot" ref={slotRef}>
        <div className="ap-frame" ref={frameRef}>
          <div className={cx('ap-window', collapsed && 'is-collapsed')} role="region" aria-label="AdRender app home">
            <Sidebar
              view={view}
              mode={mode}
              libraryPhase={libraryPhase}
              href={signupHref}
              onView={setView}
              onMode={setMode}
              onCollapse={() => setCollapsed((value) => !value)}
            />
            <div className="ap-content">
              <MediaCtx.Provider value={media}>
                <div className="ap-scroll">
                  <div hidden={view !== 'home'}>
                    <HomeView href={signupHref} mode={mode} />
                  </div>
                  {view === 'library' ? (
                    <SimpleView
                      title={libraryPhase === 'ready' ? 'Library' : 'Library'}
                      body={libraryPhase === 'ready' ? 'Ready 2' : 'Rendering'}
                      items={[...USE_AGAIN.images.slice(0, 2), ...USE_AGAIN.videos.slice(0, 2)]}
                      href={signupHref}
                    />
                  ) : null}
                  {view === 'browse' ? (
                    <SimpleView title="Browse templates" body={GET_INSPIRED.subtitle} items={mode === 'video' ? GET_INSPIRED.videos : GET_INSPIRED.images} href={signupHref} />
                  ) : null}
                  {view === 'saved' ? (
                    <SimpleView title="Saved templates" body={USE_AGAIN.subtitle} items={mode === 'video' ? USE_AGAIN.videos : USE_AGAIN.images} href={signupHref} />
                  ) : null}
                  {view === 'playground' ? (
                    <SimpleView title="Ad Playground" body={WORK_TODAY[2]?.body ?? 'Restyle your own reference'} items={GET_INSPIRED.images.slice(0, 4)} href={signupHref} />
                  ) : null}
                  {view === 'brands' ? (
                    <SimpleView title="Brands & Campaigns" body="Learns your brand once. Applies it to everything." items={USE_AGAIN.images} href={signupHref} />
                  ) : null}
                </div>
              </MediaCtx.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (embedded) {
    return (
      <div
        ref={(node) => {
          sectionRef.current = node
        }}
        className="ap-section ap-section--embed"
        style={frameVars}
      >
        {frame}
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="ap-section" style={frameVars} aria-labelledby="take-a-look-inside-heading">
      <div className="ap-inner">
        <h2 id="take-a-look-inside-heading" className="ap-title">
          Take a look inside
        </h2>
        <p className="ap-lead">Your brand, thousands of proven templates, one workspace.</p>
        {frame}
      </div>
    </section>
  )
}
