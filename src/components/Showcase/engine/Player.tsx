import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { PlayingCtx, offsetWithin } from './layout'
import { useReducedMotion } from './hooks'
import type { SceneState, Story, Target } from './story'
import { cx } from '../../site/cx'

const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'

type Box = { x: number; y: number; w: number; h: number }

/** Layout box of a target inside the app, using each scroller's final scroll. */
function boxOf(target: Target, app: HTMLElement): Box | null {
  if (typeof target !== 'string') return { x: target.x, y: target.y, w: 0, h: 0 }
  const el = app.querySelector<HTMLElement>(`[data-sc="${target}"]`)
  if (!el) return null
  const at = offsetWithin(el, app)
  let y = at.y
  const scroller = el.closest<HTMLElement>('[data-sc-scroll]')
  if (scroller) y -= Number(scroller.dataset.scrollY ?? 0)
  return { x: at.x, y, w: el.offsetWidth, h: el.offsetHeight }
}

function readQueryTime(duration: number): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('showcase-t')
  if (raw == null) return null
  const t = Number(raw)
  return Number.isFinite(t) ? Math.max(0, Math.min(duration, t)) : null
}

/** The story clock. Applies steps on time, pauses off screen, loops forever. Can pause and seek. */
function useStory(story: Story, active: boolean) {
  const [state, setState] = useState<SceneState>(story.initial)
  const [paused, setPaused] = useState(false)
  const [seekCount, setSeekCount] = useState(0)
  const elapsed = useRef(0)
  const startedAtRef = useRef(0)
  const index = useRef(0)
  const live = useRef(story.initial)
  const running = active && !paused

  useEffect(() => {
    if (!running) return
    let timer = 0
    startedAtRef.current = performance.now() - elapsed.current
    const { steps, duration, initial } = story

    const tick = () => {
      const now = performance.now() - startedAtRef.current
      if (now >= duration * 1000) {
        startedAtRef.current = performance.now()
        index.current = 0
        live.current = initial
        setState(initial)
        timer = window.setTimeout(tick, 0)
        return
      }
      let next = live.current
      while (index.current < steps.length && steps[index.current].at * 1000 <= now) {
        const step = steps[index.current]
        next = { ...next, ...(typeof step.patch === 'function' ? step.patch(next) : step.patch) }
        index.current += 1
      }
      if (next !== live.current) {
        live.current = next
        setState(next)
      }
      const due = index.current < steps.length ? steps[index.current].at * 1000 : duration * 1000
      timer = window.setTimeout(tick, Math.max(0, due - (performance.now() - startedAtRef.current)))
    }

    timer = window.setTimeout(tick, 0)
    return () => {
      window.clearTimeout(timer)
      elapsed.current = performance.now() - startedAtRef.current
    }
  }, [running, story, seekCount])

  /** Current position in seconds. */
  const getTime = () => (running ? (performance.now() - startedAtRef.current) / 1000 : elapsed.current / 1000)

  const seek = (seconds: number) => {
    const t = Math.max(0, Math.min(story.duration - 0.05, seconds))
    elapsed.current = t * 1000
    startedAtRef.current = performance.now() - t * 1000
    index.current = story.steps.filter((step) => step.at <= t).length
    const next = story.stateAt(t)
    live.current = next
    setState(next)
    setSeekCount((value) => value + 1)
  }

  return { state, paused, setPaused, getTime, seek }
}

function Caption({ index, captions, variant }: { index: number; captions: readonly string[]; variant: 'pill' | 'ad' }) {
  const [shown, setShown] = useState(index)
  if (index > 0 && index !== shown) setShown(index)
  const text = captions[shown - 1]
  if (!text) return null
  return (
    <div className={cx('sc-caption', variant === 'ad' && 'is-ad', index === 0 && 'is-out')} key={shown}>
      <span className="sc-caption-num">{shown}</span>
      <span>{text}</span>
    </div>
  )
}

/** Darkens everything but one named element, so a click on it is easy to spot. */
function Spotlight({ state, instant }: { state: SceneState; instant: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const last = useRef<Box | null>(null)
  useLayoutEffect(() => {
    const el = ref.current
    const app = el?.closest<HTMLElement>('.sc-app')
    if (!el || !app) return
    const box = state.focus ? boxOf(state.focus, app) : null
    if (box) last.current = box
    const use = box ?? last.current
    if (!use) return
    const pad = 10
    el.style.transition = instant ? 'none' : 'all 380ms ease'
    el.style.transform = `translate(${use.x - pad}px, ${use.y - pad}px)`
    el.style.width = `${use.w + pad * 2}px`
    el.style.height = `${use.h + pad * 2}px`
    el.style.opacity = box ? '1' : '0'
  }, [state.focus, instant, state.screen, state.menu, state.modal, state.ptab, state.ws, state.team, state.cockpitOpen])
  return <div ref={ref} className="sc-spotlight" aria-hidden />
}

/** A big bright label beside whatever is being shown. */
function TagLabel({ state, instant }: { state: SceneState; instant: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const tag = state.tag
  useLayoutEffect(() => {
    const el = ref.current
    const app = el?.closest<HTMLElement>('.sc-app')
    if (!el || !app || !tag) return
    const box = boxOf(tag.anchor, app)
    if (!box) return
    const w = el.offsetWidth
    const h = el.offsetHeight
    const gap = 22
    let x = box.x + box.w / 2 - w / 2
    let y = box.y + box.h / 2 - h / 2
    if (tag.side === 'right') x = box.x + box.w + gap
    else if (tag.side === 'left') x = box.x - w - gap
    else if (tag.side === 'bottom') y = box.y + box.h + gap
    else y = box.y - h - gap
    x = Math.max(12, Math.min(app.offsetWidth - w - 12, x))
    y = Math.max(12, Math.min(app.offsetHeight - h - 12, y))
    el.style.transform = `translate(${x}px, ${y}px)`
  }, [tag, instant, state.screen, state.sv, state.cockpitOpen, state.templates])
  if (!tag) return null
  return (
    <div ref={ref} key={tag.key} className={`sc-tag is-${tag.side}`} data-sc="sc-tag">
      <span className="sc-tag-text">{tag.text}</span>
    </div>
  )
}

type Ring = { id: number; x: number; y: number }

/** Cursor and click rings. Position is written straight to the DOM; rings are state. */
function Cursor({ state, instant, scale, touch }: { state: SceneState; instant: boolean; scale: number; touch: boolean }) {
  const cursorRef = useRef<HTMLSpanElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const [rings, setRings] = useState<Ring[]>([])
  const lastClick = useRef(state.click)

  useLayoutEffect(() => {
    // The parent's ref is not attached yet when a child's layout effect runs, so walk up.
    const cursor = cursorRef.current
    const app = cursor?.closest<HTMLElement>('.sc-app')
    if (!app || !cursor) return
    const box = boxOf(state.cursor.target, app)
    if (!box) return
    const next = { x: Math.round(box.x + box.w / 2), y: Math.round(box.y + box.h / 2) }
    pos.current = next
    const ms = instant ? 0 : state.cursor.ms
    cursor.style.transition = ms ? `transform ${ms}ms ${EASE}, opacity 200ms ease` : 'opacity 200ms ease'
    cursor.style.transform = `translate(${next.x}px, ${next.y}px)`
  }, [instant, state.cursor.target, state.cursor.ms, state.screen, state.cockpitOpen, state.pop, state.mode, state.sheet, state.createOpen])

  useEffect(() => {
    if (state.click === lastClick.current || instant) return
    lastClick.current = state.click
    const ring = { id: state.click, ...pos.current }
    const add = window.setTimeout(() => setRings((current) => [...current, ring]), 0)
    const remove = window.setTimeout(() => setRings((current) => current.filter((item) => item.id !== ring.id)), 1300)
    return () => {
      window.clearTimeout(add)
      window.clearTimeout(remove)
    }
  }, [state.click, instant])

  return (
    <>
      {rings.map((ring) => (
        <span key={ring.id} className="sc-rings" style={{ transform: `translate(${ring.x}px, ${ring.y}px) scale(${scale})` }} aria-hidden>
          <span />
          <span />
          <span />
          <i />
        </span>
      ))}
      <span
        ref={cursorRef}
        className={cx('sc-cursor', state.cursor.down && 'is-down', touch && 'is-touch', state.cursor.hidden && 'is-hidden')}
        aria-hidden
      >
        {touch ? (
          <span className="sc-touch" style={{ transform: `scale(${scale})` }} />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ transform: `scale(${scale})` }}>
            <path
              d="M5.2 2.6 19.4 13.1c.6.4.3 1.4-.5 1.4h-6.1c-.4 0-.7.2-.9.5l-3.4 5.6c-.4.7-1.5.5-1.6-.3L4.1 3.4c-.1-.8.7-1.3 1.1-.8Z"
              fill="#fff"
              stroke="#111"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </>
  )
}

function mmss(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds))
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}

/** Play/pause, time and a seek slider, drawn over the bottom of the video. */
function ControlBar({ story, clock }: { story: Story; clock: ReturnType<typeof useStory> }) {
  const [time, setTime] = useState(0)
  const [dragging, setDragging] = useState(false)
  const getTime = clock.getTime
  useEffect(() => {
    let frame = 0
    const loop = () => {
      if (!dragging) setTime(getTime())
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [getTime, dragging])
  const pct = Math.min(100, (time / story.duration) * 100)
  return (
    <div className="sc-controls" onClick={(event) => event.stopPropagation()}>
      <button type="button" className="sc-ctl-btn" aria-label={clock.paused ? 'Play' : 'Pause'} onClick={() => clock.setPaused((value) => !value)}>
        {clock.paused ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        )}
      </button>
      <span className="sc-ctl-time tabular-nums">
        {mmss(time)} / {mmss(story.duration)}
      </span>
      <input
        type="range"
        className="sc-ctl-range"
        min={0}
        max={story.duration}
        step={0.05}
        value={time}
        style={{ ['--pct' as string]: `${pct}%` }}
        aria-label="Seek"
        onPointerDown={() => setDragging(true)}
        onPointerUp={() => setDragging(false)}
        onChange={(event) => {
          const t = Number(event.target.value)
          setTime(t)
          clock.seek(t)
        }}
      />
    </div>
  )
}

export type PlayerProps = {
  story: Story
  /** The app's own design size. */
  app: { w: number; h: number }
  /** The visible window. Defaults to the app size. */
  view?: { w: number; h: number }
  renderApp: (state: SceneState) => ReactNode
  /** Drawn above the camera, in window coordinates (ad hooks, end cards). */
  overlay?: (state: SceneState) => ReactNode
  captions: readonly string[]
  captionVariant?: 'pill' | 'ad'
  /** Camera follows the cursor at this zoom when the story sets no target. */
  follow?: number
  /** Touch dot instead of an arrow (phone). */
  touch?: boolean
  /** Fill the slot's height too (full screen). Default fits the width only. */
  contain?: boolean
  /** Scale up past the design size to fill the slot's width (theater mode). */
  upscale?: boolean
  /** Show play/pause and a seek slider (tutorials page). */
  controls?: boolean
  /** Always play while mounted, even off screen (full screen). */
  ariaLabel: string
  className?: string
}

/**
 * A code-drawn, looping walkthrough. No controls. Plays only while on screen.
 * Add ?showcase-t=12.5 to the URL to freeze every player at 12.5s.
 */
export function Player({
  story,
  app,
  view = app,
  renderApp,
  overlay,
  captions,
  captionVariant = 'pill',
  follow,
  touch = false,
  contain = false,
  upscale = false,
  controls = false,
  ariaLabel,
  className,
}: PlayerProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const reduce = useReducedMotion()
  const [queryT] = useState(() => readQueryTime(story.duration))
  const frozenAt = queryT ?? (reduce ? story.stillAt : null)
  const instant = frozenAt != null
  const playing = inView && pageVisible && !instant
  const clock = useStory(story, playing)
  const state = frozenAt != null ? story.stateAt(frozenAt) : clock.state
  const base = Math.min(view.w / app.w, view.h / app.h)
  const [zoom, setZoom] = useState(base)
  /** Follow mode keeps its last framing when a target is not on screen yet. */
  const lastFocus = useRef<Box | null>(null)

  // Scale the window to the slot.
  useLayoutEffect(() => {
    const slot = slotRef.current
    const frame = frameRef.current
    if (!slot || !frame) return
    const apply = () => {
      const width = slot.clientWidth
      if (width < 8) return
      const height = contain ? slot.clientHeight : Infinity
      const scale = Math.min(width / view.w, height / view.h, contain || upscale ? Infinity : 1)
      frame.style.transform = `scale(${scale})`
      frame.style.left = `${Math.max(0, (width - view.w * scale) / 2)}px`
      frame.style.top = contain ? `${Math.max(0, (slot.clientHeight - view.h * scale) / 2)}px` : '0px'
      if (!contain) slot.style.height = `${view.h * scale}px`
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(slot)
    return () => observer.disconnect()
  }, [view.w, view.h, contain, upscale])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.2 })
    observer.observe(el)
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Scroll the current page to its target.
  useLayoutEffect(() => {
    const root = appRef.current
    const scroller = root?.querySelector<HTMLElement>('[data-sc-scroll]')
    if (!root || !scroller) return
    const viewport = scroller.parentElement
    const max = Math.max(0, scroller.offsetHeight - (viewport?.offsetHeight ?? app.h))
    let y = 0
    if (typeof state.scroll === 'string') {
      const target = root.querySelector<HTMLElement>(`[data-sc="${state.scroll}"]`)
      if (target) y = Math.max(0, Math.min(max, offsetWithin(target, scroller).y - 16))
    } else if (typeof state.scroll === 'object') {
      y = Math.max(0, Math.min(max, state.scroll.y))
    }
    scroller.dataset.scrollY = String(y)
    const ms = instant ? 0 : state.scrollMs
    scroller.style.transition = ms ? `transform ${ms}ms ${EASE}` : 'none'
    scroller.style.transform = `translate3d(0, ${-y}px, 0)`
  }, [state.scroll, state.scrollMs, state.screen, state.mode, instant, app.h])

  // Point the camera: at the story's target, else follow the cursor, else show the whole app.
  useLayoutEffect(() => {
    const root = appRef.current
    const camera = cameraRef.current
    if (!root || !camera) return
    const { target, zoom: wanted, ms } = state.camera
    let focus: Box | null = null
    let z = base
    let duration = ms
    if (target && wanted * base > base) {
      focus = boxOf(target, root)
      z = Math.max(wanted * base, follow ?? 0)
    } else if (follow) {
      focus = boxOf(state.cursor.target, root)
      z = follow
      duration = Math.max(state.cursor.ms, 700)
    }
    if (follow) {
      if (focus) lastFocus.current = focus
      else focus = lastFocus.current
      z = Math.max(z, follow)
    }
    let x = (view.w - app.w * base) / 2
    let y = (view.h - app.h * base) / 2
    if (focus) {
      const fit = (span: number, size: number, start: number, length: number) => {
        const scaled = size * z
        if (scaled <= span) return (span - scaled) / 2
        // Wider than the view: keep the element's start in frame (text starts there).
        const center = start + Math.min(length / 2, span / (2 * z) - 24)
        return Math.min(0, Math.max(span - scaled, span / 2 - z * center))
      }
      x = fit(view.w, app.w, focus.x, focus.w)
      y = fit(view.h, app.h, focus.y, focus.h)
    } else {
      z = base
    }
    const time = instant ? 0 : duration
    camera.style.transition = time ? `transform ${time}ms ${EASE}` : 'none'
    camera.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${z})`
    setZoom((prev) => (Math.abs(prev - z) < 0.001 ? prev : z))
  }, [state.camera, state.screen, state.cursor.target, state.cursor.ms, state.sheet, instant, base, follow, view.w, view.h, app.w, app.h])

  // Controls (and the mouse pointer) fade out after a few seconds without movement.
  const [active, setActive] = useState(false)
  const idleTimer = useRef<number | undefined>(undefined)
  const wake = () => {
    setActive(true)
    window.clearTimeout(idleTimer.current)
    idleTimer.current = window.setTimeout(() => setActive(false), 2500)
  }
  useEffect(() => () => window.clearTimeout(idleTimer.current), [])

  const cursorScale = 1 / Math.sqrt(Math.max(1, zoom / base))

  return (
    <div
      ref={sectionRef}
      className={cx('sc', className, controls && !instant && 'has-controls', clock.paused && 'is-paused', active && 'is-active')}
      onPointerMove={controls ? wake : undefined}
      onPointerDown={controls ? wake : undefined}
      onPointerLeave={controls ? () => { window.clearTimeout(idleTimer.current); setActive(false) } : undefined}
      role={controls ? 'group' : 'img'}
      aria-label={ariaLabel}
      tabIndex={controls ? 0 : undefined}
      onClick={controls ? () => clock.setPaused((value) => !value) : undefined}
      onKeyDown={
        controls
          ? (event) => {
              wake()
              if (event.key === 'k' || event.key === ' ') {
                event.preventDefault()
                clock.setPaused((value) => !value)
              } else if (event.key === 'ArrowRight') clock.seek(clock.getTime() + 5)
              else if (event.key === 'ArrowLeft') clock.seek(clock.getTime() - 5)
            }
          : undefined
      }
    >
      <div ref={slotRef} className={cx('sc-slot', contain && 'is-contain')} aria-hidden>
        <div ref={frameRef} className="sc-window" style={{ width: view.w, height: view.h }}>
          <PlayingCtx.Provider value={playing}>
            <div ref={cameraRef} className="sc-camera">
              <div ref={appRef} className="sc-app" style={{ width: app.w, height: app.h }} data-screen={state.screen}>
                {renderApp(state)}
                <Spotlight state={state} instant={instant} />
                <TagLabel state={state} instant={instant} />
                <Cursor state={state} instant={instant} scale={cursorScale} touch={touch} />
              </div>
            </div>
          </PlayingCtx.Provider>
          {overlay ? overlay(state) : null}
          <Caption index={state.caption} captions={captions} variant={captionVariant} />
          <div className={cx('sc-dim', state.dim && 'is-on')} />
        </div>
      </div>
      {controls && !instant ? <ControlBar story={story} clock={clock} /> : null}
    </div>
  )
}
