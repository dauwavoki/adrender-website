import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import {
  ArrowUpRight,
  Bookmark,
  Briefcase,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  Circle,
  CircleCheck,
  CirclePlay,
  Coins,
  CreditCard,
  Hexagon,
  House,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Library,
  Lightbulb,
  LogOut,
  MessageCircle,
  Plus,
  RefreshCw,
  Sparkles,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { getSignupUrl } from '../../lib/appUrl'
import {
  ACCOUNT,
  APP_ADDRESS,
  GET_INSPIRED,
  KEEP_WORKING,
  MORE_DONE,
  PERSONAL,
  QUOTES,
  RENDER_STATUS,
  SIDEBAR_NAV,
  SIDE_TOKENS,
  TOKEN_SUMMARY,
  USE_AGAIN,
  WALKTHROUGH,
  WORK_TODAY,
  YOUR_PLAN,
  YOUTUBE_CHANNEL_URL,
  type NavId,
  type PreviewTemplate,
  type StatId,
  type WorkId,
} from './appPreviewData'
import './AppPreview.css'

const DESIGN_WIDTH = 1280
const WINDOW_HEIGHT = 768

const NAV_ICONS: Record<NavId, LucideIcon> = {
  home: House,
  browse: LayoutGrid,
  saved: Bookmark,
  library: Library,
  playground: Sparkles,
  brands: Briefcase,
}

const WORK_ICONS: Record<WorkId, LucideIcon> = {
  statics: ImageIcon,
  videos: Video,
  playground: Sparkles,
}

const STAT_ICONS: Record<StatId, LucideIcon> = {
  ads: Layers,
  saved: Bookmark,
  brands: Hexagon,
  progress: RefreshCw,
  workspaces: LayoutGrid,
}

type MediaState = {
  load: boolean
  play: boolean
}

const MediaCtx = createContext<MediaState>({ load: false, play: false })

function glow(accent: string): CSSProperties {
  return { '--ap-glow': accent } as CSSProperties
}

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

    apply(slot.getBoundingClientRect().width)
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) apply(width)
    })
    observer.observe(slot)
    return () => observer.disconnect()
  }, [slotRef, frameRef])
}

function usePreviewMedia(sectionRef: RefObject<HTMLElement | null>): MediaState {
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
    const viewObs = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0,
    })
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

  return {
    load: (near || inView) && !reduce,
    play: inView && !reduce,
  }
}

function PreviewVideo({
  src,
  poster,
  width,
  height,
}: {
  src: string
  poster: string
  width: number
  height: number
}) {
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
    if (play) {
      void el.play().catch(() => {
        /* Autoplay can be blocked; the poster stays visible. */
      })
    } else {
      el.pause()
    }
  }, [load, play, src])

  return (
    <video
      ref={ref}
      className="ap-media"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      width={width}
      height={height}
    />
  )
}

function TemplateCard({ item, href }: { item: PreviewTemplate; href: string }) {
  return (
    <a
      className={cx('ap-card', 'ap-template', item.highlighted && 'is-lit')}
      style={glow(item.accent)}
      href={href}
    >
      {item.kind === 'video' ? (
        <PreviewVideo src={item.videoSrc} poster={item.still.src} width={item.still.width} height={item.still.height} />
      ) : (
        <img
          src={item.still.src}
          alt=""
          width={item.still.width}
          height={item.still.height}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      )}
      <span className="ap-template-meta">
        <span>{item.label}</span>
        <span className="ap-template-tag">{item.tag}</span>
      </span>
    </a>
  )
}

function TemplateRows({
  images,
  videos,
  href,
  viewAll,
}: {
  images: readonly PreviewTemplate[]
  videos: readonly PreviewTemplate[]
  href: string
  viewAll?: string
}) {
  return (
    <>
      <TemplateRow label="Image" items={images} variant="pair" href={href} viewAll={viewAll} />
      <TemplateRow label="Video" items={videos} variant="grid" href={href} viewAll={viewAll} />
    </>
  )
}

function TemplateRow({
  label,
  items,
  variant,
  href,
  viewAll,
}: {
  label: string
  items: readonly PreviewTemplate[]
  variant: 'pair' | 'grid'
  href: string
  viewAll?: string
}) {
  return (
    <div className="ap-row">
      <div className="ap-row-head">
        <span>{label}</span>
        {viewAll ? (
          <a className="ap-view-all" href={href}>
            {viewAll}
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
          </a>
        ) : null}
      </div>
      <div className={variant === 'pair' ? 'ap-use-images' : 'ap-template-grid'}>
        {items.map((item) => (
          <TemplateCard key={item.id} item={item} href={href} />
        ))}
      </div>
    </div>
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

  const onEnter = () => {
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
    }, 150)
  }

  return (
    <div className={swapping ? 'ap-quote is-swapping' : 'ap-quote'} onMouseEnter={onEnter}>
      <p className="ap-quote-text">“{quote.text}”</p>
      <p className="ap-quote-by">— {quote.attribution}</p>
    </div>
  )
}

function Sidebar({ href }: { href: string }) {
  return (
    <aside className="ap-sidebar">
      <div className="ap-brand-row">
        <a className="ap-brand" href={href}>
          <img src="/WebApp_Main_Logo.png" alt="" width={146} height={128} loading="lazy" decoding="async" />
          <span>
            <span className="ap-brand-name">{ACCOUNT.product}</span>
            <span className="ap-brand-plan">
              <CreditCard size={12} strokeWidth={1.75} aria-hidden />
              {ACCOUNT.plan}
            </span>
          </span>
        </a>
        <a className="ap-collapse" href={href} aria-label={ACCOUNT.collapseLabel}>
          <ChevronsLeft size={16} strokeWidth={1.75} aria-hidden />
        </a>
      </div>

      <div className="ap-toggle" role="group" aria-label="Image or video">
        <a className="ap-toggle-btn is-selected" href={href}>
          <ImageIcon size={13} strokeWidth={1.75} aria-hidden />
          Image
        </a>
        <a className="ap-toggle-btn" href={href}>
          <Video size={13} strokeWidth={1.75} aria-hidden />
          Video
        </a>
      </div>

      <p className="ap-status">
        <span className="ap-pip ap-pip-amber" aria-hidden />
        <b>{RENDER_STATUS.rendering}</b>
        <span aria-hidden>/</span>
        <span className="ap-pip ap-pip-green" aria-hidden />
        <b>{RENDER_STATUS.ready}</b>
        <span>{RENDER_STATUS.label}</span>
      </p>

      <nav className="ap-nav" aria-label="Workspace">
        {SIDEBAR_NAV.map((item) => {
          const Icon = NAV_ICONS[item.id]
          return (
            <a
              key={item.id}
              className={cx('ap-nav-link', item.active && 'is-active')}
              href={href}
              aria-current={item.active ? 'page' : undefined}
            >
              <span className="ap-nav-icon">
                <Icon size={16} strokeWidth={1.75} aria-hidden />
              </span>
              <span className="ap-nav-label">{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="ap-side-bottom">
        <a className="ap-workspace" href={href}>
          <span className="ap-avatar" aria-hidden>
            JL
          </span>
          <span>
            <span className="ap-workspace-name">{ACCOUNT.workspace}</span>
            <span className="ap-workspace-sub">{ACCOUNT.workspaceMeta}</span>
          </span>
          <ChevronDown className="ap-workspace-chevron" size={14} strokeWidth={1.75} aria-hidden />
        </a>
        <a className="ap-token-box" href={href}>
          <span className="ap-token-left">
            <Coins size={16} strokeWidth={1.75} aria-hidden />
            <span>
              <span className="ap-token-label">{SIDE_TOKENS.label}</span>
              <span className="ap-token-count">{TOKEN_SUMMARY.available}</span>
            </span>
          </span>
          <span className="ap-token-action">{SIDE_TOKENS.action} →</span>
        </a>
        <a className="ap-user" href={href}>
          <img src="/WebApp_Main_Logo.png" alt="" width={146} height={128} loading="lazy" decoding="async" />
          <span className="ap-user-copy">
            <span className="ap-user-name">{ACCOUNT.name}</span>
            <span className="ap-user-email">{ACCOUNT.email}</span>
          </span>
        </a>
        <a className="ap-signout" href={href}>
          <LogOut size={13} strokeWidth={1.75} aria-hidden />
          {ACCOUNT.signOut}
        </a>
      </div>
    </aside>
  )
}

function HomeColumn({ href, youtubeHref, youtubeExternal }: { href: string; youtubeHref: string; youtubeExternal: boolean }) {
  return (
    <div className="ap-home">
      <QuoteBlock />

      <div className="ap-top-grid">
        <div className="ap-panel ap-work-panel">
          <p className="ap-kicker">Work today</p>
          <div className="ap-work-grid">
            {WORK_TODAY.map((card) => {
              const Icon = WORK_ICONS[card.id]
              return (
                <a
                  key={card.id}
                  className={cx('ap-card', 'ap-work-card', card.highlighted && 'is-lit')}
                  style={glow(card.accent)}
                  href={href}
                >
                  <span className="ap-work-icon">
                    <Icon size={16} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="ap-work-title">{card.title}</span>
                  <span className="ap-work-sub">{card.body}</span>
                </a>
              )
            })}
          </div>
        </div>

        <a className="ap-card ap-keep" style={glow(KEEP_WORKING.accent)} href={href}>
          <p className="ap-kicker">{KEEP_WORKING.kicker}</p>
          <span className="ap-thumb">
            <img
              src={KEEP_WORKING.still.src}
              alt=""
              width={KEEP_WORKING.still.width}
              height={KEEP_WORKING.still.height}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </span>
          <span className="ap-keep-row">
            <span>
              <span className="ap-keep-title">{KEEP_WORKING.title}</span>
              <span className="ap-keep-when">{KEEP_WORKING.when}</span>
            </span>
            <span className="ap-keep-arrow">
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </span>
          </span>
        </a>

        <a className="ap-card ap-your-plan" style={glow(YOUR_PLAN.accent)} href={href}>
          <span className="ap-kicker-row">
            <span className="ap-mini-icon">
              <CreditCard size={13} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="ap-kicker">{YOUR_PLAN.kicker}</span>
          </span>
          <span className="ap-plan-title">{YOUR_PLAN.name}</span>
          <span className="ap-plan-status">{YOUR_PLAN.status}</span>
          <span className="ap-plan-renew">{YOUR_PLAN.renews}</span>
          <span className="ap-output">{YOUR_PLAN.output}</span>
        </a>
      </div>

      <div className="ap-mid-grid">
        <a className="ap-card ap-tokens" style={glow(TOKEN_SUMMARY.accent)} href={href}>
          <span className="ap-tokens-head">
            <span className="ap-kicker-row">
              <span className="ap-mini-icon">
                <Coins size={13} strokeWidth={1.75} aria-hidden />
              </span>
              <span className="ap-kicker">{TOKEN_SUMMARY.kicker}</span>
            </span>
            <span className="ap-tokens-scope">{TOKEN_SUMMARY.scope}</span>
          </span>
          <span className="ap-tokens-num">{TOKEN_SUMMARY.available}</span>
          <span className="ap-tokens-hint">{TOKEN_SUMMARY.availableLabel}</span>
          <span className="ap-token-split">
            <span className="ap-token-cell">
              <span className="ap-token-cell-label">{TOKEN_SUMMARY.planLabel}</span>
              <span className="ap-token-cell-num">{TOKEN_SUMMARY.plan}</span>
              <span className="ap-token-cell-note">{TOKEN_SUMMARY.planNote}</span>
            </span>
            <span className="ap-token-cell">
              <span className="ap-token-cell-label">{TOKEN_SUMMARY.topUpLabel}</span>
              <span className="ap-token-cell-num">{TOKEN_SUMMARY.topUp}</span>
              <span className="ap-token-cell-note">{TOKEN_SUMMARY.topUpNote}</span>
            </span>
          </span>
          <span className="ap-token-actions">
            <span className="ap-btn">
              <Plus size={14} strokeWidth={2} aria-hidden />
              {TOKEN_SUMMARY.add}
            </span>
            <span className="ap-text-link">
              {TOKEN_SUMMARY.billing}
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </span>
          </span>
        </a>

        <div className="ap-card ap-walk" style={glow(WALKTHROUGH.accent)}>
          <div className="ap-kicker-row">
            <span className="ap-mini-icon">
              <CirclePlay size={13} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="ap-card-title">{WALKTHROUGH.title}</span>
          </div>
          <div className="ap-subhead">
            <span>{WALKTHROUGH.section}</span>
            <a className="ap-walk-hide" href={href}>
              {WALKTHROUGH.hide}
              <ChevronUp size={14} strokeWidth={1.75} aria-hidden />
            </a>
          </div>
          <div className="ap-steps">
            {WALKTHROUGH.steps.map((step) => (
              <a key={step.id} className={cx('ap-step', step.done ? 'is-done' : 'is-todo')} href={href}>
                <span className="ap-step-icon">
                  {step.done ? (
                    <CircleCheck size={16} strokeWidth={2} aria-hidden />
                  ) : (
                    <Circle size={16} strokeWidth={1.75} aria-hidden />
                  )}
                </span>
                <span>{step.label}</span>
                <ChevronRight className="ap-step-chevron" size={14} strokeWidth={1.75} aria-hidden />
              </a>
            ))}
          </div>
          <div className="ap-tutorial">
            <div>
              <p className="ap-tutorial-kicker">{WALKTHROUGH.tutorial}</p>
              <p className="ap-tutorial-body">{WALKTHROUGH.body}</p>
            </div>
            <a
              className="ap-btn ap-btn-sm"
              href={youtubeHref}
              target={youtubeExternal ? '_blank' : undefined}
              rel={youtubeExternal ? 'noopener noreferrer' : undefined}
            >
              {WALKTHROUGH.youtube}
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="ap-personal">
        <p className="ap-kicker">{PERSONAL.kicker}</p>
        <div className="ap-stats">
          {PERSONAL.stats.map((stat) => {
            const Icon = STAT_ICONS[stat.id]
            return (
              <a key={stat.id} className="ap-card ap-stat" style={glow(stat.accent)} href={href}>
                <span className="ap-stat-top">
                  <Icon size={14} strokeWidth={1.75} aria-hidden />
                  <span className="ap-stat-label">{stat.label}</span>
                  {stat.chevron ? <ChevronDown className="ap-stat-chevron" size={14} strokeWidth={1.75} aria-hidden /> : null}
                </span>
                <span className={stat.compact ? 'ap-stat-detail' : 'ap-stat-value'}>{stat.value}</span>
              </a>
            )
          })}
        </div>
      </div>

      <div className="ap-lower">
        <section className="ap-panel" style={glow(MORE_DONE.accent)}>
          <div className="ap-panel-head">
            <div className="ap-panel-title-wrap">
              <span className="ap-panel-icon">
                <Sparkles size={15} strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="ap-panel-title">{MORE_DONE.title}</p>
                <p className="ap-panel-sub">{MORE_DONE.subtitle}</p>
              </div>
            </div>
            <a className="ap-btn ap-btn-sm" href={href}>
              {MORE_DONE.billing}
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </a>
          </div>
          <div className="ap-plans">
            {MORE_DONE.plans.map((plan) => (
              <a
                key={plan.id}
                className={cx('ap-card', 'ap-plan', plan.yours && 'is-current')}
                style={glow(plan.accent)}
                href={href}
              >
                <span className="ap-plan-kicker-slot">{plan.yours ? <span className="ap-you-pill">{MORE_DONE.yours}</span> : null}</span>
                <span className="ap-plan-top">
                  <span className="ap-plan-name">{plan.name}</span>
                  <span className="ap-plan-price">
                    {`$${plan.price}`}
                    <span>/mo</span>
                  </span>
                </span>
                <span className="ap-output">{plan.output}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="ap-panel" style={glow(USE_AGAIN.accent)}>
          <div className="ap-panel-title-wrap">
            <span className="ap-panel-icon">
              <RefreshCw size={15} strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="ap-panel-title">{USE_AGAIN.title}</p>
              <p className="ap-panel-sub">{USE_AGAIN.subtitle}</p>
            </div>
          </div>
          <div className="ap-lower" style={{ marginTop: 14 }}>
            <TemplateRows images={USE_AGAIN.images} videos={USE_AGAIN.videos} href={href} />
          </div>
        </section>

        <section className="ap-panel" style={glow(GET_INSPIRED.accent)}>
          <div className="ap-panel-title-wrap">
            <span className="ap-panel-icon">
              <Lightbulb size={15} strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="ap-panel-title">{GET_INSPIRED.title}</p>
              <p className="ap-panel-sub">{GET_INSPIRED.subtitle}</p>
            </div>
          </div>
          <div className="ap-lower" style={{ marginTop: 14 }}>
            <TemplateRows
              images={GET_INSPIRED.images}
              videos={GET_INSPIRED.videos}
              href={href}
              viewAll={GET_INSPIRED.viewAll}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

function Chrome() {
  return (
    <div className="ap-chrome">
      <span className="ap-traffic" aria-hidden>
        <span className="ap-traffic-r" />
        <span className="ap-traffic-y" />
        <span className="ap-traffic-g" />
      </span>
      <span className="ap-url">{APP_ADDRESS}</span>
    </div>
  )
}

export function AppPreviewSection() {
  const signupHref = getSignupUrl()
  const youtubeExternal = Boolean(YOUTUBE_CHANNEL_URL)
  const youtubeHref = YOUTUBE_CHANNEL_URL ?? signupHref
  const sectionRef = useRef<HTMLElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const media = usePreviewMedia(sectionRef)
  useFrameScale(slotRef, frameRef)

  const frameVars = {
    '--ap-design-w': `${DESIGN_WIDTH}px`,
    '--ap-window-h': `${WINDOW_HEIGHT}px`,
  } as CSSProperties

  return (
    <section ref={sectionRef} className="ap-section" style={frameVars} aria-labelledby="take-a-look-inside-heading">
      <div className="ap-inner">
        <h2 id="take-a-look-inside-heading" className="ap-title">
          Take a look inside
        </h2>
        <p className="ap-lead">Your brand, thousands of proven templates, one workspace.</p>
        <div className="ap-scaler">
          <div className="ap-slot" ref={slotRef}>
            <div className="ap-frame" ref={frameRef}>
              <div className="ap-window" role="region" aria-label="AdRender app home screen">
                <Chrome />
                <div className="ap-body">
                  <Sidebar href={signupHref} />
                  <div className="ap-main">
                    <MediaCtx.Provider value={media}>
                      <div className="ap-main-scroll">
                        <HomeColumn href={signupHref} youtubeHref={youtubeHref} youtubeExternal={youtubeExternal} />
                      </div>
                    </MediaCtx.Provider>
                    <div className="ap-fade" aria-hidden />
                    <a className="ap-chat" href={signupHref} aria-label="Chat">
                      <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
