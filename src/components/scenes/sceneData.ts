import { ACCOUNT, TOKEN_SUMMARY } from '../AppPreview/appPreviewData'
import { BRAND_OPTIONS } from '../HowItWorks/BrandScan'
import { DEMO_BRAND } from '../../data/howItWorksMock'
import { IMAGE_AD_RATES, IMAGE_QUALITY_LABELS, TOKEN_TOP_UPS } from '../TokenBuys'

export type SceneSize = 'card' | 'wide'

export type Still = {
  src: string
  width: number
  height: number
}

/** YourBrand sample from the How it works brand scan. */
export const BRAND = DEMO_BRAND

/** Same three setup actions as How it works step 1. */
export const BRAND_SOURCES = BRAND_OPTIONS

export const SCENE_USER = {
  name: ACCOUNT.name,
  email: ACCOUNT.email,
  initials: 'JL',
  workspace: ACCOUNT.workspace,
  workspaceMeta: ACCOUNT.workspaceMeta,
  tokens: TOKEN_SUMMARY.available,
}

const capPack = TOKEN_TOP_UPS.find((pack) => pack.tokens === 300)
if (!capPack) throw new Error('Token top-up pack of 300 is missing from TokenBuys')

/** Monthly cap line uses the 300-token top-up pack in TokenBuys. */
export const WORKSPACE_TOKEN_CAP = capPack.tokens

export const QUALITY = IMAGE_QUALITY_LABELS

export const RESOLUTIONS = IMAGE_AD_RATES.map((row) => ({
  id: row.resolution,
  standard: row.standard,
  pro: row.pro,
}))

export function formatTokens(count: number) {
  return count === 1 ? '1 token' : `${count} tokens`
}

const oneK = IMAGE_AD_RATES[0]
if (!oneK) throw new Error('Image token rates are missing from TokenBuys')

/** Standard 1K cost, the default render line. */
export const RENDER_COST = `${formatTokens(oneK.standard)} · ${oneK.resolution}`

/** Headlines already printed on the YourBrand sample ads. */
export const BRAND_AD_COPY = [
  'Run hard. Look sharp.',
  'Retro style, modern speed.',
  'Train with purpose.',
] as const

/**
 * Static sizes named in AboutPage #sizes.
 * Only the four ratios the sizes scene compares.
 */
export const AD_SIZES = [
  { id: 'square', name: 'Square', width: 1080, height: 1080, ratio: '1 / 1' },
  { id: 'portrait', name: 'Portrait', width: 1080, height: 1350, ratio: '4 / 5' },
  { id: 'story', name: 'Story/Reel', width: 1080, height: 1920, ratio: '9 / 16' },
  { id: 'landscape', name: 'Landscape', width: 1200, height: 675, ratio: '16 / 9' },
] as const

/** Smallest sharp ad still. One image, cropped per frame. */
export const SIZE_AD: Still = { src: '/how-it-works/ads/ad-02.png', width: 824, height: 1024 }

type TemplateCard = Still & {
  id: string
  label: string
  days: number
}

/**
 * Same stills and category lines as the hero Use again / Get inspired rows.
 * The day counts are sample UI only.
 */
export const TEMPLATE_CARDS: TemplateCard[] = [
  { id: 'beauty', label: 'Beauty', days: 214, src: '/how-it-works/templates/template-01.png', width: 576, height: 1024 },
  { id: 'fitness', label: 'Fitness', days: 186, src: '/how-it-works/templates/template-04.png', width: 571, height: 1024 },
  { id: 'skincare', label: 'Skincare', days: 142, src: '/how-it-works/templates/template-03.png', width: 576, height: 1024 },
  { id: 'fashion', label: 'Fashion', days: 97, src: '/how-it-works/templates/template-02.png', width: 576, height: 1024 },
  { id: 'footwear', label: 'Footwear', days: 63, src: '/how-it-works/templates/template-06.png', width: 1024, height: 1024 },
  { id: 'food', label: 'Food and drink', days: 41, src: '/how-it-works/templates/template-07.png', width: 768, height: 1024 },
]

/** Ads, smallest files first. Card uses 9, wide uses 12. */
export const AD_STILLS: Still[] = [
  { src: '/how-it-works/ads/ad-02.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-06.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-01.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-09.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-10.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-12.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-11.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-05.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-07.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-03.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-04.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-08.png', width: 824, height: 1024 },
]

/** Playground results are YourBrand ads only. Four distinct stills from /how-it-works/ads/. */
export const RESULT_STILLS: Still[] = [
  { src: '/how-it-works/ads/ad-04.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-06.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-02.png', width: 824, height: 1024 },
  { src: '/how-it-works/ads/ad-05.png', width: 824, height: 1024 },
]

export const LIBRARY_FOLDERS = [
  { id: 'all', label: 'All templates', icon: 'stack' as const },
  { id: 'summer', label: 'Summer drop', icon: 'folder' as const },
  { id: 'hooks', label: 'Best hooks', icon: 'folder' as const },
  { id: 'retarget', label: 'Retargeting', icon: 'folder' as const },
]

export const LIBRARY_SELECTED = 'hooks'

export const BATCH_TOTAL = 50
export const BATCH_READY = 48
