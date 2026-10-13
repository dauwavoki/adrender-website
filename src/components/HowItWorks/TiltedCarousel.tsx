import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { CarouselItem } from './types'

interface TiltedCarouselProps {
  items: CarouselItem[]
  /** Pause the continuous scroll */
  paused?: boolean
  /** Default direction. Card 3 passes true so it runs opposite Card 2. */
  reverse?: boolean
}

/**
 * Previous loop was a 48s CSS animation across a 12-item track of ~116px steps
 * (148px tiles, −32px overlap) ≈ 58px/s. This is a little faster, still linear.
 * Duration is derived from the measured track so larger tiles do not race.
 */
const SCROLL_PX_PER_SEC = 76
const REVERSE_MS = 420

const KEYFRAMES = [
  { transform: 'translate3d(0, 0, 0)' },
  { transform: 'translate3d(-50%, 0, 0)' },
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function allowsHoverReverse() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function CarouselStill({ item }: { item: CarouselItem }) {
  return (
    <img
      src={item.src}
      alt={item.alt}
      className="h-full w-full object-cover"
      loading="lazy"
      draggable={false}
    />
  )
}

/**
 * Poster is always in the tile. The file is attached only once this tile is
 * near the viewport, and playback stops again when it leaves.
 * Reduced motion never mounts the clip, so the poster stays put.
 */
function CarouselVideo({
  item,
  enabled,
}: {
  item: Extract<CarouselItem, { kind: 'video' }>
  enabled: boolean
}) {
  const boxRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const loadedSrc = useRef<string | null>(null)
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const box = boxRef.current
    if (!box) return
    const obs = new IntersectionObserver(([entry]) => setOnScreen(Boolean(entry?.isIntersecting)), {
      rootMargin: '240px 160px',
      threshold: 0,
    })
    obs.observe(box)
    return () => obs.disconnect()
  }, [enabled])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    if (!enabled || !onScreen) {
      el.pause()
      return
    }
    if (loadedSrc.current !== item.src) {
      loadedSrc.current = item.src
      el.preload = 'auto'
      el.src = item.src
      el.load()
    }
    void el.play().catch(() => {
      /* Poster stays visible if autoplay is blocked. */
    })
  }, [enabled, onScreen, item.src])

  return (
    <div ref={boxRef} className="relative h-full w-full">
      <img
        src={item.poster}
        alt={enabled ? '' : item.alt}
        aria-hidden={enabled ? true : undefined}
        className="h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />
      {enabled ? (
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          poster={item.poster}
          muted
          loop
          autoPlay
          playsInline
          preload="none"
          controls={false}
          disablePictureInPicture
          tabIndex={-1}
          aria-label={item.alt}
        />
      ) : null}
    </div>
  )
}

function CarouselMedia({ item, enabled }: { item: CarouselItem; enabled: boolean }) {
  if (item.kind === 'video') return <CarouselVideo item={item} enabled={enabled} />
  return <CarouselStill item={item} />
}

/**
 * Continuous flat portrait strip.
 * Items are duplicated so a -50% translate loops seamlessly.
 * Direction flips by tweening playbackRate, so the strip never jumps.
 */
export function TiltedCarousel({ items, paused = false, reverse = false }: TiltedCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<Animation | null>(null)
  const tweenRef = useRef(0)
  const rateTargetRef = useRef<number | null>(null)
  const pausedRef = useRef(paused)
  const inViewRef = useRef(false)
  const [inView, setInView] = useState(false)
  const [near, setNear] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const loop = [...items, ...items]

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    inViewRef.current = inView
  }, [inView])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const viewObs = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting))
      },
      { threshold: 0, rootMargin: '120px 0px' },
    )
    const nearObs = new IntersectionObserver(
      ([entry]) => {
        setNear(Boolean(entry?.isIntersecting))
      },
      { threshold: 0, rootMargin: '480px 0px' },
    )
    viewObs.observe(root)
    nearObs.observe(root)
    return () => {
      viewObs.disconnect()
      nearObs.disconnect()
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || reduceMotion || prefersReducedMotion()) {
      animRef.current?.cancel()
      animRef.current = null
      return
    }

    let anim: Animation | null = null
    let rebuildRaf = 0

    const applyHold = () => {
      if (!anim) return
      if (pausedRef.current || !inViewRef.current) anim.pause()
      else anim.play()
    }

    const build = () => {
      const distance = track.scrollWidth / 2
      if (distance < 1) return

      const duration = (distance / SCROLL_PX_PER_SEC) * 1000
      const prev = anim
      let fraction = reverse ? 0.5 : 0
      let rate = reverse ? -1 : 1
      if (prev) {
        const prevDur = Number(prev.effect?.getComputedTiming().duration ?? 0)
        const prevTime = Number(prev.currentTime ?? 0)
        if (prevDur > 0) {
          fraction = (((prevTime % prevDur) + prevDur) % prevDur) / prevDur
        }
        if (Number.isFinite(prev.playbackRate)) rate = prev.playbackRate
      }

      prev?.cancel()
      anim = track.animate(KEYFRAMES, { duration, iterations: Infinity, easing: 'linear' })
      anim.currentTime = fraction * duration
      anim.playbackRate = rate
      animRef.current = anim
      applyHold()
    }

    build()
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rebuildRaf)
      rebuildRaf = requestAnimationFrame(build)
    })
    ro.observe(track)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rebuildRaf)
      cancelAnimationFrame(tweenRef.current)
      tweenRef.current = 0
      rateTargetRef.current = null
      anim?.cancel()
      if (animRef.current === anim) animRef.current = null
    }
  }, [reduceMotion, reverse, items])

  useEffect(() => {
    const anim = animRef.current
    if (!anim) return
    if (paused || !inView || reduceMotion) anim.pause()
    else anim.play()
  }, [paused, inView, reduceMotion])

  const tweenRate = (target: number) => {
    const anim = animRef.current
    if (!anim || reduceMotion || prefersReducedMotion()) return
    if (rateTargetRef.current === target && tweenRef.current) return
    rateTargetRef.current = target
    cancelAnimationFrame(tweenRef.current)
    const startRate = anim.playbackRate
    if (Math.abs(startRate - target) < 0.02) {
      anim.playbackRate = target
      tweenRef.current = 0
      return
    }
    const t0 = performance.now()
    const step = (now: number) => {
      if (animRef.current !== anim) return
      const t = Math.min(1, (now - t0) / REVERSE_MS)
      const eased = t * t * (3 - 2 * t)
      anim.playbackRate = startRate + (target - startRate) * eased
      if (t < 1) tweenRef.current = requestAnimationFrame(step)
      else tweenRef.current = 0
    }
    tweenRef.current = requestAnimationFrame(step)
  }

  const onPointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !allowsHoverReverse()) return
    tweenRate(reverse ? 1 : -1)
  }

  const onPointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !allowsHoverReverse()) return
    tweenRate(reverse ? -1 : 1)
  }

  const videosOn = near && !paused && !reduceMotion

  return (
    <div
      ref={rootRef}
      className="hiw-tilted-carousel relative py-3"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="hiw-tilted-stage">
        <div ref={trackRef} className="hiw-tilted-track">
          {loop.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="hiw-tilted-card overflow-hidden bg-zinc-900"
              aria-hidden={index >= items.length ? true : undefined}
            >
              <CarouselMedia item={item} enabled={videosOn} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
