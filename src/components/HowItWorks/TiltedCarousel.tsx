import type { CarouselPlaceholder } from './types'

interface TiltedCarouselProps {
  items: CarouselPlaceholder[]
  /** Slightly vary the label styling for templates vs results */
  variant?: 'templates' | 'results'
  /** Pause the continuous scroll (e.g. reduced motion) */
  paused?: boolean
}

/**
 * Slow, continuous, tilted portrait-card strip.
 * Items are duplicated so the CSS loop can translate -50% seamlessly.
 */
export function TiltedCarousel({ items, variant = 'templates', paused = false }: TiltedCarouselProps) {
  const loop = [...items, ...items]

  return (
    <div className="hiw-tilted-carousel relative overflow-hidden py-4" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0c0c12] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0c0c12] to-transparent sm:w-20" />

      <div className="hiw-tilted-stage">
        <div className={`hiw-tilted-track ${paused ? 'hiw-tilted-track--paused' : ''}`}>
          {loop.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`hiw-tilted-card bg-gradient-to-br ${item.tone}`}
            >
              <div className="flex h-full flex-col justify-between p-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                  {variant === 'templates' ? 'Template' : 'Ad'}
                </span>
                <div className="flex flex-1 items-center justify-center">
                  <span className="rounded border border-white/15 bg-black/40 px-2 py-1 font-mono text-[10px] font-semibold text-[var(--accent-cyan)] backdrop-blur-sm">
                    {item.label}
                  </span>
                </div>
                <div className="h-1 w-8 rounded-full bg-white/15" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
