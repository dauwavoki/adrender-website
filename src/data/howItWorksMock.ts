import type { CarouselPlaceholder, DemoBrand } from '../components/HowItWorks/types'

/** Single fixed example brand for the How It Works showcase. */
export const DEMO_BRAND: DemoBrand = {
  name: 'Velocity Sports',
  url: 'velocitysports.com',
  category: 'Athletic Wear',
  logoPlaceholder: '[LOGO]',
  swatches: ['#00e5ff', '#7b4fd4', '#111827', '#F3F4F6', '#00D2FF'],
  documentCount: 3,
  products: [
    { id: 'p1', name: 'Ultra Light Runner', placeholderLabel: '[PRODUCT_1]' },
    { id: 'p2', name: 'Compression Vest', placeholderLabel: '[PRODUCT_2]' },
    { id: 'p3', name: 'Speed Elite Shorts', placeholderLabel: '[PRODUCT_3]' },
    { id: 'p4', name: 'Recovery Slides', placeholderLabel: '[PRODUCT_4]' },
  ],
}

const TEMPLATE_TONES = [
  'from-zinc-800 via-zinc-900 to-black',
  'from-cyan-950 via-zinc-900 to-black',
  'from-purple-950 via-zinc-900 to-black',
  'from-emerald-950 via-zinc-900 to-black',
  'from-orange-950 via-zinc-900 to-black',
  'from-sky-950 via-zinc-900 to-black',
]

const RESULT_TONES = [
  'from-cyan-900/50 via-purple-950/40 to-zinc-950',
  'from-purple-900/50 via-indigo-950/40 to-zinc-950',
  'from-emerald-900/40 via-zinc-900 to-zinc-950',
  'from-orange-900/40 via-zinc-900 to-zinc-950',
  'from-sky-900/40 via-purple-950/30 to-zinc-950',
  'from-zinc-800 via-zinc-900 to-zinc-950',
]

/** 12 portrait template placeholders for the Card 2 tilted carousel. */
export const TEMPLATE_PLACEHOLDERS: CarouselPlaceholder[] = Array.from({ length: 12 }, (_, i) => ({
  id: `tpl-${i + 1}`,
  label: `[TEMPLATE_${i + 1}]`,
  tone: TEMPLATE_TONES[i % TEMPLATE_TONES.length],
}))

/** 12 portrait ad-result placeholders for the Card 3 tilted carousel. */
export const RESULT_PLACEHOLDERS: CarouselPlaceholder[] = Array.from({ length: 12 }, (_, i) => ({
  id: `ad-${i + 1}`,
  label: `[AD_RESULT_${i + 1}]`,
  tone: RESULT_TONES[i % RESULT_TONES.length],
}))
