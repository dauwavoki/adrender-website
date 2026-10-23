/**
 * Rotating hero line-2 gradients, in rotation order.
 * 1–3 follow the How It Works card hue pairs (cyan→blue, purple→magenta, amber→orange)
 * with deeper stops so they read on the white hero. 4–6 are extra brand mixes.
 * Stops live in CSS on `.hero-line-grad-*`. The moving sheen reuses `hiw-title-glaze`.
 */
export const HERO_LINE_GRADIENTS = [
  'hero-line-grad-1',
  'hero-line-grad-2',
  'hero-line-grad-3',
  'hero-line-grad-4',
  'hero-line-grad-5',
  'hero-line-grad-6',
] as const
