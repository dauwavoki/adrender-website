import { useEffect, useRef, useState } from 'react'
import type { CarouselItem } from './types'

interface TiltedCarouselProps {
  items: CarouselItem[]
  /** Pause the continuous scroll (e.g. reduced motion) */
  paused?: boolean
}

function CarouselMedia({ item, paused }: { item: CarouselItem; paused: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (paused) {
      el.pause()
      return
    }
    void el.play().catch(() => {
      /* muted + playsInline should allow autoplay; ignore policy blocks */
    })
  }, [paused])

  if (item.kind === 'video') {
    return (
      <video
        ref={videoRef}
        src={item.src}
        className="h-full w-full object-cover"
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        draggable={false}
      />
    )
  }

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
 * Slow, continuous, tilted portrait-card strip.
 * Items are duplicated so the CSS loop can translate -50% seamlessly.
 * Edge fade uses a soft mask (no dark overlay bars).
 */
export function TiltedCarousel({ items, paused = false }: TiltedCarouselProps) {
  const loop = [...items, ...items]
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const halt = paused || reduceMotion

  return (
    <div className="hiw-tilted-carousel relative overflow-hidden py-4" aria-hidden>
      <div className="hiw-tilted-stage">
        <div className={`hiw-tilted-track ${halt ? 'hiw-tilted-track--paused' : ''}`}>
          {loop.map((item, index) => (
            <div key={`${item.id}-${index}`} className="hiw-tilted-card overflow-hidden bg-zinc-900">
              <CarouselMedia item={item} paused={halt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
