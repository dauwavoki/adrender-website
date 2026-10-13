import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { CarouselItem } from './types'

interface TiltedCarouselProps {
  items: CarouselItem[]
  /** Pause the continuous scroll. Resume only — never a direction change. */
  paused?: boolean
  /** Card 3 passes true so it runs opposite Card 2. Fixed for the lifetime of the row. */
  reverse?: boolean
}

/**
 * Previous loop was a 48s CSS animation across a 12-item track of ~116px steps
 * (148px tiles, −32px overlap) ≈ 58px/s. This is a little faster, still linear.
 * Duration is derived from the measured track so larger tiles do not race.
 */
const SCROLL_PX_PER_SEC = 76

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Media play/pause must not become an uncaught exception. */
function safePause(el: HTMLMediaElement) {
  try {
    el.pause()
  } catch {
    /* Ignore a media element that cannot pause. */
  }
}

function safePlay(el: HTMLMediaElement) {
  try {
    void el.play().catch(() => {
      /* Poster stays visible if autoplay is blocked. */
    })
  } catch {
    /* Ignore a media element that cannot play. */
  }
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
      safePause(el)
      return
    }
    if (loadedSrc.current !== item.src) {
      loadedSrc.current = item.src
      el.preload = 'auto'
      el.src = item.src
      el.load()
    }
    safePlay(el)
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
 *
 * Direction is fixed in CSS (animation-direction: normal on both rows).
 * Card 2 uses a leftward keyframe. Card 3 uses a mirrored rightward keyframe.
 * Scroll, hover, and visibility never reverse it. Off-screen and the paused
 * prop only set animation-play-state.
 */
export function TiltedCarousel({ items, paused = false, reverse = false }: TiltedCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [near, setNear] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [durationSec, setDurationSec] = useState<number | null>(null)
  const loop = [...items, ...items]

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
      return
    }

    let raf = 0
    const measure = () => {
      const distance = track.scrollWidth / 2
      if (distance < 1) return
      const next = distance / SCROLL_PX_PER_SEC
      setDurationSec((prev) => (prev != null && Math.abs(prev - next) < 0.05 ? prev : next))
    }

    measure()
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    })
    ro.observe(track)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduceMotion, items])

  const scrolling = durationSec != null && !reduceMotion
  const held = paused || !inView
  const videosOn = near && !paused && !reduceMotion
  const trackStyle: CSSProperties | undefined = scrolling
    ? ({ '--hiw-scroll-duration': `${durationSec}s` } as CSSProperties)
    : undefined

  return (
    <div ref={rootRef} className="hiw-tilted-carousel relative py-3">
      <div className="hiw-tilted-stage">
        <div
          ref={trackRef}
          className={`hiw-tilted-track${scrolling ? ' is-scrolling' : ''}${scrolling && held ? ' is-held' : ''}`}
          data-direction={reverse ? 'reverse' : 'forward'}
          style={trackStyle}
        >
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
