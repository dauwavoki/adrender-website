import { RESULT_ITEMS } from '../../data/howItWorksMock'
import { TiltedCarousel } from './TiltedCarousel'

/**
 * Card 3 — finished-ad carousel. Scrolls opposite Card 2 by default.
 */
export function ResultsShowcase() {
  return (
    <TiltedCarousel items={RESULT_ITEMS} reverse />
  )
}
