import type { CarouselItem } from './types'

interface TiltedCarouselProps {
  items: CarouselItem[]
  /** Pause the continuous scroll (e.g. reduced motion) */
  paused?: boolean
}

/**
 * Slow, continuous, tilted portrait-card strip.
 * Items are duplicated so the CSS loop can translate -50% seamlessly.
 * Edge fade uses a soft mask (no dark overlay bars).
 */
export function TiltedCarousel({ items, paused = false }: TiltedCarouselProps) {
  const loop = [...items, ...items]

  return (
    <div className="hiw-tilted-carousel relative overflow-hidden py-4" aria-hidden>
      <div className="hiw-tilted-stage">
        <div className={`hiw-tilted-track ${paused ? 'hiw-tilted-track--paused' : ''}`}>
          {loop.map((item, index) => (
            <div key={`${item.id}-${index}`} className="hiw-tilted-card overflow-hidden bg-zinc-900">
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
