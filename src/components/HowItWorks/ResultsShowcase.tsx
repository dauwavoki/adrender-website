import { RESULT_ITEMS } from '../../data/howItWorksMock'
import { TiltedCarousel } from './TiltedCarousel'

/**
 * Card 3 — finished-ad carousel. Scrolls opposite Card 2 by default.
 */
export function ResultsShowcase() {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-white/80">
        Your ads, ready to launch — brand colors, products, and winning formats applied.
      </p>

      <TiltedCarousel items={RESULT_ITEMS} reverse />
    </div>
  )
}
