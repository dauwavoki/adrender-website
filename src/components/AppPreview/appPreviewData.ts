/**
 * Copy, labels, and media for the homepage app-home showcase.
 *
 * Nothing here is wired to the real product. Every path the frame renders
 * is listed below so artwork can be swapped in one place.
 *
 * Replacing media
 * ---------------
 * Drop new files in `public/app-preview/` and point `still.src` / `videoSrc`
 * at them (for example `/app-preview/fitness.mp4`).
 *
 * Image cards reuse stills already in this repo (How It Works templates,
 * rendered ads, and product shots). The repo had no video files, so each
 * video card plays a short silent clip generated from one of those stills.
 * The clip and a matching poster frame both live in `public/app-preview/`.
 * Source stills are noted next to each clip. Reuse a clip by pointing two
 * cards at the same `videoSrc` if you add more cards than files.
 *
 * Use again shows 2 image templates. The product usually shows 4 there;
 * leave this row at 2 unless the frame layout is updated to fit 4.
 */

export const ACCENT = {
  blue: '#5B9FFF',
  green: '#3DDC97',
  yellow: '#F5C451',
  purple: '#C084FC',
  amber: '#F5B942',
  cyan: '#2EE9D0',
  orange: '#FF8A4C',
  pink: '#F472B6',
} as const

/** No YouTube channel URL is published in the site (footer, FAQ, or social links). */
export const YOUTUBE_CHANNEL_URL: string | null = null

export const APP_ADDRESS = 'app.adrender.app/app/home'

export type Quote = {
  text: string
  attribution: string
}

/** Original lines. Attributions are roles only — never a real person's name. */
export const QUOTES: Quote[] = [
  { text: 'Scale slowly. Celebrate quickly.', attribution: 'Mindful Leader' },
  { text: 'Ship the batch before the doubt grows.', attribution: 'Seasoned Marketer' },
  { text: 'Volume finds the winner. Taste keeps it.', attribution: 'Creative Director' },
  { text: 'Test the angle you almost skipped.', attribution: 'Growth Lead' },
  { text: 'A quiet brand can still run a loud test.', attribution: 'Brand Strategist' },
  { text: 'One workspace. A thousand ways to say it.', attribution: 'Campaign Manager' },
  { text: 'Proof first. Polish second.', attribution: 'Performance Lead' },
  { text: 'Make more. Spend less time deciding.', attribution: 'Studio Lead' },
  { text: 'The next winner is already in the library.', attribution: 'Catalog Editor' },
  { text: 'Consistency is a creative advantage.', attribution: 'Brand Operator' },
  { text: 'Templates remember what guessing forgets.', attribution: 'Ad Producer' },
  { text: 'Finished beats perfect. Publish the set.', attribution: 'Media Buyer' },
]

export const ACCOUNT = {
  product: 'AdRender',
  plan: 'Pro Plan',
  name: 'Jordan Lee',
  email: 'jordan@yourbrand.com',
  workspace: 'Personal',
  workspaceMeta: 'Workspace',
  signOut: 'Sign out',
  collapseLabel: 'Collapse sidebar',
}

export const RENDER_STATUS = {
  rendering: 0,
  ready: 0,
  label: 'rendering / ready',
}

export type NavId = 'home' | 'browse' | 'saved' | 'library' | 'playground' | 'brands'

export type NavItem = {
  id: NavId
  label: string
  active?: boolean
}

export const SIDEBAR_NAV: NavItem[] = [
  { id: 'home', label: 'Home', active: true },
  { id: 'browse', label: 'Browse Templates' },
  { id: 'saved', label: 'Saved Templates' },
  { id: 'library', label: 'My Ads Library' },
  { id: 'playground', label: 'Ad Playground' },
  { id: 'brands', label: 'Brands & Campaigns' },
]

export const SIDE_TOKENS = {
  label: 'Tokens',
  action: 'Top up',
}

export type WorkId = 'statics' | 'videos' | 'playground'

export type WorkCard = {
  id: WorkId
  title: string
  body: string
  accent: string
  highlighted?: boolean
}

export const WORK_TODAY: WorkCard[] = [
  {
    id: 'statics',
    title: 'Statics',
    body: 'Browse image templates',
    accent: ACCENT.blue,
  },
  {
    id: 'videos',
    title: 'Videos',
    body: 'Browse video templates',
    accent: ACCENT.green,
    highlighted: true,
  },
  {
    id: 'playground',
    title: 'Playground',
    body: 'Restyle your own reference',
    accent: ACCENT.yellow,
  },
]

export type PreviewStill = {
  src: string
  width: number
  height: number
}

type ImageTemplate = {
  id: string
  kind: 'image'
  label: string
  tag: 'IMAGE'
  accent: string
  still: PreviewStill
  highlighted?: boolean
}

type VideoTemplate = {
  id: string
  kind: 'video'
  label: string
  tag: 'VIDEO'
  accent: string
  still: PreviewStill
  videoSrc: string
  highlighted?: boolean
}

export type PreviewTemplate = ImageTemplate | VideoTemplate

/**
 * Landscape crop of a rendered ad.
 * Source still: public/how-it-works/ads/ad-08.png
 */
export const KEEP_WORKING = {
  kicker: 'Keep working on',
  title: 'Image ad',
  when: '11m ago',
  accent: ACCENT.cyan,
  still: {
    src: '/how-it-works/ads/ad-08.png',
    width: 824,
    height: 1024,
  } satisfies PreviewStill,
}

/** Same output line as the Pro tier in src/data/pricing.ts. */
export const YOUR_PLAN = {
  kicker: 'Your plan',
  name: 'Pro',
  status: 'Active',
  renews: 'Renews Nov 12',
  output: 'Up to 1,000 image ads, or at least 50 video ads every month',
  accent: ACCENT.green,
}

export const TOKEN_SUMMARY = {
  kicker: 'Tokens',
  scope: 'Personal workspace',
  available: 760,
  availableLabel: 'Available to spend right now',
  planLabel: 'Plan tokens',
  plan: 640,
  planNote: 'Resets Nov 12',
  topUpLabel: 'Top-up tokens',
  topUp: 120,
  topUpNote: 'Never expire',
  add: 'Add tokens',
  billing: 'Plans & Billing',
  accent: ACCENT.amber,
}

export const WALKTHROUGH = {
  title: 'Walkthrough & Tutorials',
  section: 'Walkthrough',
  hide: 'Hide',
  tutorial: 'Tutorial',
  body: 'Guides and walkthroughs for generating ads in AdRender.',
  youtube: 'Open YouTube channel',
  accent: ACCENT.blue,
  steps: [
    { id: 'brand', label: 'Connect a brand', done: true },
    { id: 'templates', label: 'Browse templates', done: true },
    { id: 'ads', label: 'Create winning ads', done: false },
  ],
}

export type StatId = 'ads' | 'saved' | 'brands' | 'progress' | 'workspaces'

export type StatItem = {
  id: StatId
  label: string
  value: string
  accent: string
  /** Smaller value line, used for the workspaces card. */
  compact?: boolean
  chevron?: boolean
}

export const PERSONAL = {
  kicker: 'Personal',
  stats: [
    { id: 'ads', label: 'Ads generated', value: '47', accent: ACCENT.blue },
    { id: 'saved', label: 'Templates saved', value: '12', accent: ACCENT.purple },
    { id: 'brands', label: 'Brands', value: '3', accent: ACCENT.yellow },
    { id: 'progress', label: 'In progress', value: '2', accent: ACCENT.green },
    {
      id: 'workspaces',
      label: 'Other workspaces',
      value: '1 more workspace',
      accent: ACCENT.purple,
      compact: true,
      chevron: true,
    },
  ] satisfies StatItem[],
}

export type PlanTile = {
  id: 'solo' | 'growth' | 'pro' | 'scale'
  name: string
  price: number
  /** Same sentence as that tier's outputLine in src/data/pricing.ts. */
  output: string
  accent: string
  yours?: boolean
}

export const MORE_DONE = {
  title: 'Get More Done',
  subtitle: 'More renders every month, the moment you need them.',
  billing: 'Open Billing',
  yours: 'Your plan',
  accent: ACCENT.purple,
  plans: [
    {
      id: 'solo',
      name: 'Solo',
      price: 19,
      output: 'Up to 150 image ads, or at least 7 video ads every month',
      accent: ACCENT.blue,
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 49,
      output: 'Up to 400 image ads, or at least 20 video ads every month',
      accent: ACCENT.cyan,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 99,
      output: 'Up to 1,000 image ads, or at least 50 video ads every month',
      accent: ACCENT.green,
      yours: true,
    },
    {
      id: 'scale',
      name: 'Scale',
      price: 299,
      output: 'Up to 3,500 image ads, or at least 175 video ads every month',
      accent: ACCENT.purple,
    },
  ] satisfies PlanTile[],
}

const POSTER = { width: 480, height: 854 } as const

export const USE_AGAIN = {
  title: 'Use again',
  subtitle: 'Templates you rendered recently — one click back into the duplicator.',
  accent: ACCENT.blue,
  images: [
    {
      id: 'use-beauty',
      kind: 'image',
      label: 'Beauty',
      tag: 'IMAGE',
      accent: ACCENT.orange,
      still: { src: '/how-it-works/templates/template-01.png', width: 576, height: 1024 },
    },
    {
      id: 'use-skincare',
      kind: 'image',
      label: 'Skincare',
      tag: 'IMAGE',
      accent: ACCENT.blue,
      highlighted: true,
      still: { src: '/how-it-works/templates/template-03.png', width: 576, height: 1024 },
    },
  ] satisfies ImageTemplate[],
  videos: [
    // Source still: public/how-it-works/ads/ad-01.png
    {
      id: 'use-fitness',
      kind: 'video',
      label: 'Fitness',
      tag: 'VIDEO',
      accent: ACCENT.green,
      still: { src: '/app-preview/fitness.jpg', ...POSTER },
      videoSrc: '/app-preview/fitness.mp4',
    },
    // Source still: public/how-it-works/ads/ad-03.png
    {
      id: 'use-fashion',
      kind: 'video',
      label: 'Fashion',
      tag: 'VIDEO',
      accent: ACCENT.orange,
      highlighted: true,
      still: { src: '/app-preview/fashion.jpg', ...POSTER },
      videoSrc: '/app-preview/fashion.mp4',
    },
    // Source still: public/how-it-works/ads/ad-06.png
    {
      id: 'use-food',
      kind: 'video',
      label: 'Food and drink',
      tag: 'VIDEO',
      accent: ACCENT.amber,
      still: { src: '/app-preview/food-and-drink.jpg', ...POSTER },
      videoSrc: '/app-preview/food-and-drink.mp4',
    },
    // Source still: public/how-it-works/products/speed-elite-shorts.png
    {
      id: 'use-footwear',
      kind: 'video',
      label: 'Footwear',
      tag: 'VIDEO',
      accent: ACCENT.cyan,
      still: { src: '/app-preview/footwear.jpg', ...POSTER },
      videoSrc: '/app-preview/footwear.mp4',
    },
  ] satisfies VideoTemplate[],
}

export const GET_INSPIRED = {
  title: 'Get inspired',
  subtitle: 'Fresh ads from brands that are winning right now.',
  viewAll: 'View all',
  accent: ACCENT.yellow,
  images: [
    {
      id: 'in-footwear',
      kind: 'image',
      label: 'Footwear',
      tag: 'IMAGE',
      accent: ACCENT.cyan,
      still: { src: '/how-it-works/products/ultra-light-runner.png', width: 571, height: 1024 },
    },
    {
      id: 'in-skincare',
      kind: 'image',
      label: 'Skincare',
      tag: 'IMAGE',
      accent: ACCENT.blue,
      highlighted: true,
      still: { src: '/how-it-works/templates/template-05.png', width: 819, height: 1024 },
    },
    {
      id: 'in-food',
      kind: 'image',
      label: 'Food and drink',
      tag: 'IMAGE',
      accent: ACCENT.orange,
      still: { src: '/how-it-works/templates/template-07.png', width: 768, height: 1024 },
    },
    {
      id: 'in-fitness',
      kind: 'image',
      label: 'Fitness',
      tag: 'IMAGE',
      accent: ACCENT.green,
      still: { src: '/how-it-works/templates/template-10.png', width: 576, height: 1024 },
    },
  ] satisfies ImageTemplate[],
  videos: [
    // Source still: public/how-it-works/templates/template-02.png
    {
      id: 'in-beauty-video',
      kind: 'video',
      label: 'Beauty',
      tag: 'VIDEO',
      accent: ACCENT.pink,
      still: { src: '/app-preview/beauty.jpg', ...POSTER },
      videoSrc: '/app-preview/beauty.mp4',
    },
    // Source still: public/how-it-works/templates/template-04.png
    {
      id: 'in-skincare-video',
      kind: 'video',
      label: 'Skincare',
      tag: 'VIDEO',
      accent: ACCENT.purple,
      highlighted: true,
      still: { src: '/app-preview/skincare.jpg', ...POSTER },
      videoSrc: '/app-preview/skincare.mp4',
    },
    // Source still: public/how-it-works/products/compression-vest.png
    {
      id: 'in-training-video',
      kind: 'video',
      label: 'Fitness',
      tag: 'VIDEO',
      accent: ACCENT.green,
      still: { src: '/app-preview/training.jpg', ...POSTER },
      videoSrc: '/app-preview/training.mp4',
    },
    // Source still: public/how-it-works/ads/ad-11.png
    {
      id: 'in-lookbook-video',
      kind: 'video',
      label: 'Fashion',
      tag: 'VIDEO',
      accent: ACCENT.yellow,
      still: { src: '/app-preview/lookbook.jpg', ...POSTER },
      videoSrc: '/app-preview/lookbook.mp4',
    },
  ] satisfies VideoTemplate[],
}
