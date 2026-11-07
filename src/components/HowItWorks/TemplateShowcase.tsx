import { TEMPLATE_ITEMS } from '../../data/howItWorksMock'
import { TiltedCarousel } from './TiltedCarousel'

/**
 * Card 2 — template carousel. Scrolls forward by default.
 */
export function TemplateShowcase() {
  return (
    <TiltedCarousel items={TEMPLATE_ITEMS} />
  )
}
