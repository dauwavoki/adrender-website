import type { CarouselItem, DemoBrand } from '../components/HowItWorks/types'

/** Single fixed example brand for the How It Works showcase. */
export const DEMO_BRAND: DemoBrand = {
  name: 'YourBrand',
  category: 'Athletic Wear',
  logoSrc: '/how-it-works/logo.png',
  brandVoice:
    'Bold, performance-driven, and motivational — short hooks that push athletes to move faster.',
  swatches: ['#00e5ff', '#7b4fd4', '#111827', '#F3F4F6', '#00D2FF'],
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

/**
 * The only mix control for How it Works cards 2 and 3.
 *
 * `order` is repeated across each card. If one side has more items, the extras
 * stay in the row and sit next to the same type, spaced through the strip,
 * instead of being dropped.
 *
 * Alternate one-by-one: `['image', 'video']`
 * Two pictures then two videos, repeated:
 *   order: ['image', 'image', 'video', 'video'],
 *
 * `maxImages` / `maxVideos` cap how many stills or clips are used in total.
 * A cap of 2 keeps only the first two of that type. `null` uses every item
 * in that card's list.
 */
export const MEDIA_PATTERN = {
  order: ['image', 'image', 'video', 'video'] as const,
  maxImages: null as number | null,
  maxVideos: null as number | null,
}

type PatternKind = (typeof MEDIA_PATTERN.order)[number]

function capItems<T>(items: readonly T[], max: number | null): T[] {
  if (max == null) return [...items]
  return items.slice(0, Math.max(0, max))
}

/** Indexes to keep when a pattern round produced more slots than items. */
function keptIndexes(total: number, keep: number): number[] {
  if (keep >= total) return Array.from({ length: total }, (_, index) => index)
  if (keep <= 0) return []
  return Array.from({ length: keep }, (_, index) => Math.floor((index * total) / keep))
}

function patternSlots(imageCount: number, videoCount: number, order: readonly PatternKind[]): PatternKind[] {
  const weight = {
    image: order.filter((kind) => kind === 'image').length,
    video: order.filter((kind) => kind === 'video').length,
  }
  const left = { image: imageCount, video: videoCount }

  if (weight.image === 0 || weight.video === 0 || imageCount === 0 || videoCount === 0) {
    const out: PatternKind[] = []
    let guard = 0
    while ((left.image > 0 || left.video > 0) && guard < imageCount + videoCount + 2) {
      guard += 1
      let placed = false
      for (const kind of order) {
        if (left[kind] <= 0) continue
        out.push(kind)
        left[kind] -= 1
        placed = true
      }
      if (placed) continue
      const rest = (['image', 'video'] as const).find((kind) => left[kind] > 0)
      if (!rest) break
      out.push(rest)
      left[rest] -= 1
    }
    return out
  }

  const cycles = Math.max(Math.ceil(imageCount / weight.image), Math.ceil(videoCount / weight.video))
  const raw: PatternKind[] = []
  for (let cycle = 0; cycle < cycles; cycle += 1) raw.push(...order)

  const keepOf = (kind: PatternKind, need: number) => {
    const indexes = raw.flatMap((slot, index) => (slot === kind ? [index] : []))
    return new Set(keptIndexes(indexes.length, need).map((nth) => indexes[nth]))
  }

  const keepImage = keepOf('image', imageCount)
  const keepVideo = keepOf('video', videoCount)
  return raw.filter((_, index) => keepImage.has(index) || keepVideo.has(index))
}

function mixByMediaPattern(images: readonly CarouselItem[], videos: readonly CarouselItem[]): CarouselItem[] {
  const stills = capItems(images, MEDIA_PATTERN.maxImages)
  const clips = capItems(videos, MEDIA_PATTERN.maxVideos)
  const slots = patternSlots(stills.length, clips.length, MEDIA_PATTERN.order)
  const pools: Record<PatternKind, CarouselItem[]> = {
    image: [...stills],
    video: [...clips],
  }
  return slots.map((kind) => {
    const next = pools[kind].shift()
    if (!next) throw new Error(`How it Works mix ran out of ${kind} items`)
    return next
  })
}

function numberedClip(
  idPrefix: string,
  publicDir: string,
  index: number,
  alt: string,
): CarouselItem {
  const n = String(index + 1).padStart(2, '0')
  return {
    id: `${idPrefix}-video-${n}`,
    kind: 'video',
    src: `${publicDir}/video-${n}.mp4`,
    poster: `${publicDir}/video-${n}.jpg`,
    alt,
  }
}

/** Card 2 stills. Clips reuse the compressed app-preview files — do not copy them. */
const TEMPLATE_STILLS: CarouselItem[] = Array.from({ length: 6 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    id: `tpl-${n}`,
    src: `/how-it-works/templates/template-${n}.png`,
    alt: `Winning ad template ${i + 1}`,
  }
})

const TEMPLATE_CLIPS: CarouselItem[] = Array.from({ length: 6 }, (_, i) =>
  numberedClip('tpl', '/app-preview', i, `Winning ad template clip ${i + 1}`),
)

/** 6 template stills interleaved with app-preview clips 01–06. */
export const TEMPLATE_ITEMS: CarouselItem[] = mixByMediaPattern(TEMPLATE_STILLS, TEMPLATE_CLIPS)

/** Card 3 stills, plus clips compressed into public/how-it-works/. */
const RESULT_STILLS: CarouselItem[] = Array.from({ length: 6 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    id: `ad-${n}`,
    src: `/how-it-works/ads/ad-${n}.png`,
    alt: `YourBrand rendered ad ${i + 1}`,
  }
})

const RESULT_CLIPS: CarouselItem[] = Array.from({ length: 6 }, (_, i) =>
  numberedClip('ad', '/how-it-works', i, `YourBrand rendered ad clip ${i + 1}`),
)

/** 6 rendered stills interleaved with the 6 distinct How it Works clips. */
export const RESULT_ITEMS: CarouselItem[] = mixByMediaPattern(RESULT_STILLS, RESULT_CLIPS)
