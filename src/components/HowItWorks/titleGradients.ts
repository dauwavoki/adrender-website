/**
 * Rotating hero line-2 gradients, in rotation order.
 * 1–3 are the How It Works card hue pairs (cyan→blue, purple→magenta, amber→orange).
 * 4–6 are extra bright brand mixes. Stops live in CSS on `.hero-line-grad-*`.
 * The moving white sheen reuses `hiw-title-glaze` and `--hiw-shine-image`.
 */
export const HERO_LINE_GRADIENTS = [
  'hero-line-grad-1',
  'hero-line-grad-2',
  'hero-line-grad-3',
  'hero-line-grad-4',
  'hero-line-grad-5',
  'hero-line-grad-6',
] as const
