import type { CarouselItem, DemoBrand } from '../components/HowItWorks/types'

/** Single fixed example brand for the How It Works showcase. */
export const DEMO_BRAND: DemoBrand = {
  name: 'YourBrand',
  url: 'yourbrand.com',
  category: 'Athletic Wear',
  logoSrc: '/how-it-works/logo.png',
  brandVoice:
    'Bold, performance-driven, and motivational — short hooks that push athletes to move faster.',
  swatches: ['#00e5ff', '#7b4fd4', '#111827', '#F3F4F6', '#00D2FF'],
  documentCount: 3,
  products: [
    {
      id: 'p1',
      name: 'Ultra Light Runner',
      imageSrc: '/how-it-works/products/ultra-light-runner.png',
      adCopyCount: 6,
    },
    {
      id: 'p2',
      name: 'Compression Vest',
      imageSrc: '/how-it-works/products/compression-vest.png',
      adCopyCount: 12,
    },
    {
      id: 'p3',
      name: 'Speed Elite Shorts',
      imageSrc: '/how-it-works/products/speed-elite-shorts.png',
      adCopyCount: 8,
    },
    {
      id: 'p4',
      name: 'Recovery Slides',
      imageSrc: '/how-it-works/products/recovery-slides.png',
      adCopyCount: 10,
    },
  ],
}

/** 12 portrait templates for the Card 2 tilted carousel. */
export const TEMPLATE_ITEMS: CarouselItem[] = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    id: `tpl-${n}`,
    src: `/how-it-works/templates/template-${n}.png`,
    alt: `Winning ad template ${i + 1}`,
  }
})

/** 12 portrait YourBrand ad results for the Card 3 tilted carousel. */
export const RESULT_ITEMS: CarouselItem[] = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    id: `ad-${n}`,
    src: `/how-it-works/ads/ad-${n}.png`,
    alt: `YourBrand rendered ad ${i + 1}`,
  }
})
