import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Cockpit } from './Cockpit'
import { BrandScreen, BrowseScreen, HomeScreen, LibraryScreen } from './screens'
import { DURATION, INITIAL, STEPS, stateAt, type SceneState, type Target } from './script'
import { ALL_STILLS, CAPTIONS } from './showcaseData'
import { PlayingCtx, offsetWithin } from './layout'
import { cx } from '../site/cx'
import './Showcase.css'

const W = 1280
const H = 800
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'

/** Frame shown to visitors who prefer reduced motion: Library, image ads ready. */
const STILL_AT = (() => {
  const library = STEPS.find((step) => stateAt(step.at).screen === 'library')
  return library ? library.at + 1.5 : 0
})()

type Box = { x: number; y: number; w: number; h: number }

/** Layout box of a target inside the app, using each scroller's final scroll. */
function boxOf(target: Target, app: HTMLElement): Box | null {
  if (typeof target !== 'string') return { x: target.x, y: target.y, w: 0, h: 0 }
  const el = app.querySelector<HTMLElement>(`[data-sc="${target}"]`)
  if (!el) return null
  const at = offsetWithin(el, app)
  const scroller = el.closest<HTMLElement>('[data-sc-scroll]')
  const scrolled = scroller ? Number(scroller.dataset.scrollY ?? 0) : 0
  return { x: at.x, y: at.y - scrolled, w: el.offsetWidth, h: el.offsetHeight }
}

function readQueryTime(): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('showcase-t')
  if (raw == null) return null
  const t = Number(raw)
  return Number.isFinite(t) ? Math.max(0, Math.min(DURATION, t)) : null
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduce(query.matches)
    query.addEventListener('change', sync)
    const timer = window.setTimeout(sync, 0)
    return () => {
      window.clearTimeout(timer)
      query.removeEventListener('change', sync)
    }
  }, [])
  return reduce
}

/** The story clock. Applies steps on time, pauses off screen, loops forever. */
function useStory(active: boolean) {
  const [state, setState] = useState<SceneState>(INITIAL)
  const elapsed = useRef(0)
  const index = useRef(0)
  const live = useRef(INITIAL)

  useEffect(() => {
    if (!active) return
    let timer = 0
    let startedAt = performance.now() - elapsed.current

    const tick = () => {
      const now = performance.now() - startedAt
      if (now >= DURATION * 1000) {
        startedAt = performance.now()
        index.current = 0
        live.current = INITIAL
        setState(INITIAL)
        timer = window.setTimeout(tick, 0)
        return
      }
      let next = live.current
      while (index.current < STEPS.length && STEPS[index.current].at * 1000 <= now) {
        const step = STEPS[index.current]
        next = { ...next, ...(typeof step.patch === 'function' ? step.patch(next) : step.patch) }
        index.current += 1
      }
      if (next !== live.current) {
        live.current = next
        setState(next)
      }
      const due = index.current < STEPS.length ? STEPS[index.current].at * 1000 : DURATION * 1000
      timer = window.setTimeout(tick, Math.max(0, due - (performance.now() - startedAt)))
    }

    timer = window.setTimeout(tick, 0)
    return () => {
      window.clearTimeout(timer)
      elapsed.current = performance.now() - startedAt
    }
  }, [active])

  return state
}

function Caption({ index }: { index: number }) {
  const [shown, setShown] = useState(index)
  if (index > 0 && index !== shown) setShown(index)
  const text = CAPTIONS[shown - 1]
  if (!text) return null
  return (
    <div className={cx('sc-caption', index === 0 && 'is-out')} key={shown}>
      <span className="sc-caption-num">{shown}</span>
      <span>{text}</span>
    </div>
  )
}

type Ring = { id: number; x: number; y: number }

/** Cursor and click rings. Position is written straight to the DOM; rings are state. */
function Cursor({ state, instant }: { state: SceneState; instant: boolean }) {
  const cursorRef = useRef<HTMLSpanElement>(null)
  const pos = useRef({ x: 980, y: 560 })
  const [rings, setRings] = useState<Ring[]>([])
  const lastClick = useRef(state.click)
  const zoom = state.camera.target ? state.camera.zoom : 1
  const scale = 1 / Math.sqrt(zoom)

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
    cursor.style.transition = ms ? `transform ${ms}ms ${EASE}` : 'none'
    cursor.style.transform = `translate(${next.x}px, ${next.y}px)`
  }, [instant, state.cursor.target, state.cursor.ms, state.screen, state.cockpitOpen, state.pop, state.mode])

  useEffect(() => {
    if (state.click === lastClick.current || instant) return
    lastClick.current = state.click
    const ring = { id: state.click, ...pos.current }
    const add = window.setTimeout(() => setRings((current) => [...current, ring]), 0)
    const remove = window.setTimeout(() => setRings((current) => current.filter((item) => item.id !== ring.id)), 900)
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
      <span ref={cursorRef} className={cx('sc-cursor', state.cursor.down && 'is-down')} aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ transform: `scale(${scale})` }}>
          <path
            d="M5.2 2.6 19.4 13.1c.6.4.3 1.4-.5 1.4h-6.1c-.4 0-.7.2-.9.5l-3.4 5.6c-.4.7-1.5.5-1.6-.3L4.1 3.4c-.1-.8.7-1.3 1.1-.8Z"
            fill="#fff"
            stroke="#111"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  )
}

/**
 * Homepage hero: a looping, code-drawn walkthrough of the app. No controls.
 * It plays only while on screen. Add ?showcase-t=12.5 to freeze one moment.
 */
export function HomeShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const reduce = useReducedMotion()
  const [queryT] = useState(readQueryTime)
  const frozenAt = queryT ?? (reduce ? STILL_AT : null)
  const instant = frozenAt != null
  const playing = inView && pageVisible && !instant
  const live = useStory(playing)
  const state = frozenAt != null ? stateAt(frozenAt) : live

  // Scale the 1280×800 window to the slot.
  useLayoutEffect(() => {
    const slot = slotRef.current
    const frame = frameRef.current
    if (!slot || !frame) return
    const apply = () => {
      const width = slot.clientWidth
      if (width < 8) return
      const scale = Math.min(1, width / W)
      frame.style.transform = `scale(${scale})`
      frame.style.left = `${Math.max(0, (width - W * scale) / 2)}px`
      slot.style.height = `${H * scale}px`
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(slot)
    return () => observer.disconnect()
  }, [])

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

  // Warm every still once the showcase is on screen, so scene changes never pop in.
  useEffect(() => {
    if (!inView) return
    const timer = window.setTimeout(() => {
      for (const src of ALL_STILLS) {
        const img = new Image()
        img.decoding = 'async'
        img.src = src
      }
    }, 1200)
    return () => window.clearTimeout(timer)
  }, [inView])

  // Scroll the current page to its target.
  useLayoutEffect(() => {
    const root = appRef.current
    const scroller = root?.querySelector<HTMLElement>('[data-sc-scroll]')
    if (!root || !scroller) return
    const max = Math.max(0, scroller.offsetHeight - H)
    let y = 0
    if (typeof state.scroll === 'string') {
      const target = root.querySelector<HTMLElement>(`[data-sc="${state.scroll}"]`)
      if (target) y = Math.max(0, Math.min(max, offsetWithin(target, scroller).y - 24))
    } else if (typeof state.scroll === 'object') {
      y = Math.max(0, Math.min(max, state.scroll.y))
    }
    scroller.dataset.scrollY = String(y)
    const ms = instant ? 0 : state.scrollMs
    scroller.style.transition = ms ? `transform ${ms}ms ${EASE}` : 'none'
    scroller.style.transform = `translate3d(0, ${-y}px, 0)`
  }, [state.scroll, state.scrollMs, state.screen, instant])

  // Point the camera.
  useLayoutEffect(() => {
    const root = appRef.current
    const camera = cameraRef.current
    if (!root || !camera) return
    const { target, zoom, ms } = state.camera
    let x = 0
    let y = 0
    let z = 1
    if (target && zoom > 1) {
      const box = boxOf(target, root)
      if (box) {
        z = zoom
        x = Math.min(0, Math.max(W - W * z, W / 2 - z * (box.x + box.w / 2)))
        y = Math.min(0, Math.max(H - H * z, H / 2 - z * (box.y + box.h / 2)))
      }
    }
    const duration = instant ? 0 : ms
    camera.style.transition = duration ? `transform ${duration}ms ${EASE}` : 'none'
    camera.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${z})`
  }, [state.camera, state.screen, instant])

  return (
    <div
      ref={sectionRef}
      className="sc"
      role="img"
      aria-label="AdRender walkthrough: create a brand from a website, add templates in the cockpit, render, and open the finished image and video ads."
    >
      <div ref={slotRef} className="sc-slot" aria-hidden>
        <div ref={frameRef} className="sc-window">
          <PlayingCtx.Provider value={playing}>
            <div ref={cameraRef} className="sc-camera">
              <div ref={appRef} className="sc-app" data-screen={state.screen}>
                <div className="sc-viewport">
                  <div className="sc-scroller" data-sc-scroll="" key={state.screen}>
                    {state.screen === 'home' ? <HomeScreen state={state} /> : null}
                    {state.screen === 'brand' ? <BrandScreen state={state} /> : null}
                    {state.screen === 'browse' ? <BrowseScreen state={state} /> : null}
                    {state.screen === 'library' ? <LibraryScreen state={state} /> : null}
                  </div>
                </div>
                <Cockpit state={state} />
                <Cursor state={state} instant={instant} />
              </div>
            </div>
          </PlayingCtx.Provider>
          <Caption index={state.caption} />
          <div className={cx('sc-dim', state.dim && 'is-on')} />
        </div>
      </div>
    </div>
  )
}
