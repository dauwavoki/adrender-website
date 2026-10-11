import { TEMPLATE_ITEMS } from '../../data/howItWorksMock'
import { TiltedCarousel } from './TiltedCarousel'

/**
 * Card 2 — template carousel. Scrolls forward by default.
 */
export function TemplateShowcase() {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-white/80">
        Browse 100M+ real ads running right now — filter by longest-running, niche, platform, and
        more, to see exactly what&apos;s working for your competitors.
      </p>

      <TiltedCarousel items={TEMPLATE_ITEMS} />
    </div>
  )
}
