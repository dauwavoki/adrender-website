/**
 * Copy and media for the homepage tutorial showcase.
 *
 * Nothing here is wired to the real product. Media are small WebP copies of
 * the How it works artwork in public/showcase/ (made from public/how-it-works/
 * and public/app-preview/). Video clips reuse the existing compressed files.
 *
 * Templates reuse the How it works artwork. YourBrand is the same demo brand as How it works.
 */

export type Media = {
  id: string
  /** Poster or still. */
  src: string
  /** Silent clip. Omitted on stills. */
  video?: string
  /** Shown on cards. */
  title: string
  niche: string
  days: number
  /** Letter-mark tint. */
  tint: string
}

const still = (n: string) => `/showcase/tpl-${n}.webp`
const videoPoster = (n: string) => `/showcase/vtpl-${n}.webp`
const videoClip = (n: string) => `/app-preview/video-${n}.mp4`

export const IMAGE_TEMPLATES: Media[] = [
  { id: 'i1', src: still('01'), title: 'Beauty', niche: 'Beauty', days: 214, tint: '#d9778f' },
  { id: 'i2', src: still('04'), title: 'Fitness', niche: 'Fitness', days: 186, tint: '#4f8df7' },
  { id: 'i3', src: still('03'), title: 'Skincare', niche: 'Skincare', days: 142, tint: '#3db8a5' },
  { id: 'i4', src: still('02'), title: 'Fashion', niche: 'Fashion', days: 97, tint: '#9b6bf2' },
  { id: 'i5', src: still('06'), title: 'Footwear', niche: 'Footwear', days: 63, tint: '#ff8a3d' },
  { id: 'i6', src: still('07'), title: 'Food and drink', niche: 'Food and drink', days: 41, tint: '#e5a33d' },
  { id: 'i7', src: still('10'), title: 'Wellness', niche: 'Wellness', days: 128, tint: '#52ad50' },
  { id: 'i8', src: still('11'), title: 'Home', niche: 'Home', days: 76, tint: '#a39e98' },
]

export const VIDEO_TEMPLATES: Media[] = [
  { id: 'v1', src: videoPoster('01'), video: videoClip('01'), title: 'Skincare', niche: 'Skincare', days: 158, tint: '#3db8a5' },
  { id: 'v2', src: videoPoster('02'), video: videoClip('02'), title: 'Fitness', niche: 'Fitness', days: 131, tint: '#4f8df7' },
  { id: 'v3', src: videoPoster('03'), video: videoClip('03'), title: 'Beauty', niche: 'Beauty', days: 120, tint: '#d9778f' },
  { id: 'v4', src: videoPoster('04'), video: videoClip('04'), title: 'Fashion', niche: 'Fashion', days: 96, tint: '#9b6bf2' },
  { id: 'v5', src: videoPoster('06'), video: videoClip('06'), title: 'Food and drink', niche: 'Food and drink', days: 88, tint: '#e5a33d' },
  { id: 'v6', src: videoPoster('07'), video: videoClip('07'), title: 'Footwear', niche: 'Footwear', days: 71, tint: '#ff8a3d' },
  { id: 'v7', src: videoPoster('08'), video: videoClip('08'), title: 'Wellness', niche: 'Wellness', days: 54, tint: '#52ad50' },
  { id: 'v8', src: videoPoster('05'), video: videoClip('05'), title: 'Home', niche: 'Home', days: 39, tint: '#a39e98' },
]

/** Home rows. Use again = templates rendered before. Get inspired = fresh winners. */
export const USE_AGAIN_IMAGE = [IMAGE_TEMPLATES[0], IMAGE_TEMPLATES[2], IMAGE_TEMPLATES[3], IMAGE_TEMPLATES[1]]
export const USE_AGAIN_VIDEO = [VIDEO_TEMPLATES[3], VIDEO_TEMPLATES[0], VIDEO_TEMPLATES[2], VIDEO_TEMPLATES[5]]
export const INSPIRED_IMAGE = [IMAGE_TEMPLATES[4], IMAGE_TEMPLATES[5], IMAGE_TEMPLATES[6], IMAGE_TEMPLATES[7]]
export const INSPIRED_VIDEO = [VIDEO_TEMPLATES[7], VIDEO_TEMPLATES[6], VIDEO_TEMPLATES[4], VIDEO_TEMPLATES[1]]

/** The two templates the story adds in each mode. */
export const PICKED_VIDEO = [VIDEO_TEMPLATES[0], VIDEO_TEMPLATES[1]]
export const PICKED_IMAGE = [IMAGE_TEMPLATES[0], IMAGE_TEMPLATES[1]]

/** YourBrand renders. Image: 2 templates × 2 sizes (4:5 and 1:1). Video: 2 templates. */
export const IMAGE_RESULTS = [
  { id: 'r1', src: '/showcase/ad-04.webp', ratio: '4:5' },
  { id: 'r2', src: '/showcase/ad-06.webp', ratio: '4:5' },
  { id: 'r3', src: '/showcase/ad-02.webp', ratio: '1:1' },
  { id: 'r4', src: '/showcase/ad-05.webp', ratio: '1:1' },
]

export const VIDEO_RESULTS = [
  { id: 'rv1', src: '/showcase/vad-01.webp', video: '/how-it-works/video-01.mp4' },
  { id: 'rv2', src: '/showcase/vad-03.webp', video: '/how-it-works/video-03.mp4' },
]

export const KEEP_WORKING = {
  title: 'Image ad',
  when: '13h ago',
  src: '/showcase/ad-08.webp',
}

export const BRAND = {
  name: 'YourBrand',
  url: 'yourbrand.com',
  logo: '/showcase/yourbrand-logo.webp',
  voice: 'Bold, performance-driven, and motivational — short hooks that push athletes to move faster.',
  colors: ['#00e5ff', '#7b4fd4', '#111827', '#F3F4F6', '#00D2FF'],
  audience: ['All genders', 'Adults (25–34)'],
  products: [
    { id: 'p1', name: 'Ultra Light Runner', src: '/showcase/ultra-light-runner.webp', copies: 6 },
    { id: 'p2', name: 'Compression Vest', src: '/showcase/compression-vest.webp', copies: 12 },
    { id: 'p3', name: 'Speed Elite Shorts', src: '/showcase/speed-elite-shorts.webp', copies: 8 },
    { id: 'p4', name: 'Recovery Slides', src: '/showcase/recovery-slides.webp', copies: 10 },
  ],
  /** Sum of the products' ad copies. */
  adCopies: 36,
}

export const ACCOUNT = {
  workspace: 'Personal',
  initial: 'J',
  tokens: 760,
  stats: { ads: 2847, saved: 186, brands: 14 },
  plan: { name: 'Pro', meta: 'Active · Monthly · Renews Dec 12', tokens: 640, topUp: 120 },
}

export const QUOTE = {
  text: 'Volume finds the winner. Taste keeps it.',
  by: 'Creative Director',
}

export const CAPTIONS = ['Create your brand or campaign', 'Find templates', 'Get your ads'] as const

/** Every file the story shows, so it can warm the cache before each scene. */
export const ALL_STILLS: string[] = [
  ...IMAGE_TEMPLATES.map((item) => item.src),
  ...VIDEO_TEMPLATES.map((item) => item.src),
  ...IMAGE_RESULTS.map((item) => item.src),
  ...VIDEO_RESULTS.map((item) => item.src),
  ...BRAND.products.map((item) => item.src),
  BRAND.logo,
  KEEP_WORKING.src,
]
