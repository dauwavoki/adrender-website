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

function hasMediaSrc(el: HTMLVideoElement) {
  return Boolean(el.getAttribute('src') || el.currentSrc)
}

/** The file URL lives on the element, so a new node can never reuse a stale one. */
function ensureVideoSrc(el: HTMLVideoElement) {
  const wanted = el.dataset.hiwSrc
  if (!wanted) return false
  if (el.getAttribute('src') !== wanted) {
    el.preload = 'none'
    el.src = wanted
  }
  return hasMediaSrc(el)
}

/**
 * play() is only called once this element has a src. A rejection is not
 * "started": log it, retry once when a frame is ready, and let the next
 * time the row comes on screen call play() again.
 */
function playCarouselVideo(el: HTMLVideoElement, isCancelled: () => boolean) {
  if (!ensureVideoSrc(el)) return () => {}

  let didRetry = false
  let removeReady = () => {}

  const attempt = (reason: 'start' | 'retry') => {
    if (isCancelled() || !hasMediaSrc(el)) return
    let pending: Promise<void>
    try {
      pending = el.play()
    } catch (error) {
      console.debug(
        'How it Works carousel video play() threw',
        reason,
        el.currentSrc || el.getAttribute('src'),
        error,
      )
      return
    }
    void pending.catch((error: unknown) => {
      console.debug(
        'How it Works carousel video play() rejected',
        reason,
        el.currentSrc || el.getAttribute('src'),
        error,
      )
      if (isCancelled() || didRetry || reason === 'retry') return
      const retry = () => {
        if (didRetry || isCancelled()) return
        didRetry = true
        removeReady()
        attempt('retry')
      }
      removeReady = () => {
        el.removeEventListener('loadeddata', retry)
        el.removeEventListener('canplay', retry)
      }
      if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        retry()
        return
      }
      el.addEventListener('loadeddata', retry)
      el.addEventListener('canplay', retry)
    })
  }

  el.muted = true
  attempt('start')
  return () => removeReady()
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
 * Poster stays in the tile until the clip is actually playing.
 * The <video> mounts the first time the row is near the viewport and then
 * stays mounted. Leaving the row only pauses it. Reduced motion never
 * mounts the clip, so the poster stays put.
 * The row attaches src before play(). It is also on the element so a remount
 * can never come back empty.
 */
function CarouselVideo({
  item,
  mounted,
}: {
  item: Extract<CarouselItem, { kind: 'video' }>
  mounted: boolean
}) {
  return (
    <div className="relative h-full w-full">
      <img
        src={item.poster}
        alt={mounted ? '' : item.alt}
        aria-hidden={mounted ? true : undefined}
        className="h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />
      {mounted ? (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          data-hiw-src={item.src}
          src={item.src}
          poster={item.poster}
          muted
          loop
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

function CarouselMedia({ item, mounted }: { item: CarouselItem; mounted: boolean }) {
  if (item.kind === 'video') return <CarouselVideo item={item} mounted={mounted} />
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
  const [videosSticky, setVideosSticky] = useState(false)
  const [durationSec, setDurationSec] = useState<number | null>(null)
  const nearRef = useRef(false)
  const loop = [...items, ...items]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      const reduce = mq.matches
      setReduceMotion(reduce)
      if (!reduce && nearRef.current) setVideosSticky(true)
    }
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
        const isNear = Boolean(entry?.isIntersecting)
        nearRef.current = isNear
        setNear(isNear)
        if (isNear && !prefersReducedMotion()) setVideosSticky(true)
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
  const mountVideos = videosSticky && !reduceMotion
  const playVideos = mountVideos && near && !paused

  useEffect(() => {
    const track = trackRef.current
    if (!track || !mountVideos) return

    const videos = Array.from(track.querySelectorAll('video'))
    let cancelled = false
    const removeReady: Array<() => void> = []

    for (const el of videos) {
      el.muted = true
      if (!ensureVideoSrc(el)) continue
      if (!playVideos) {
        safePause(el)
        continue
      }
      removeReady.push(playCarouselVideo(el, () => cancelled))
    }

    return () => {
      cancelled = true
      for (const remove of removeReady) remove()
    }
  }, [mountVideos, playVideos, items])

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
              <CarouselMedia item={item} mounted={mountVideos} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
