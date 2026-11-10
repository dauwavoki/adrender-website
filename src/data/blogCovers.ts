import {
  Camera,
  ChartBar,
  CurrencyCircleDollar,
  CursorText,
  FrameCorners,
  Handshake,
  Layout,
  Newspaper,
  Palette,
  PenNib,
  Scales,
  Storefront,
  TestTube,
  User,
  Users,
  UsersThree,
  VideoCamera,
  type Icon,
} from '@phosphor-icons/react'

/** Brand / icon-tile hues. The cover paints them as a soft two-stop mist. */
export type CoverTone = 'blue' | 'violet' | 'orange' | 'green' | 'amber'

export type BlogCoverSpec = {
  /** 1–2 words from the post's subject. Not the title. */
  label: string
  toneA: CoverTone
  toneB: CoverTone
  icon: Icon
  /** Large icon sits on this side. The label sits on the other. */
  side: 'left' | 'right'
}

/**
 * One cover per post in src/content/blog. A slug with no entry uses
 * DEFAULT_BLOG_COVER so a new post still renders.
 */
export const BLOG_COVERS: Record<string, BlogCoverSpec> = {
  'adrender-shopify-app': { label: 'Shopify', toneA: 'green', toneB: 'blue', icon: Storefront, side: 'right' },
  'ai-ugc-ads-creator-scaling': { label: 'Creators', toneA: 'violet', toneB: 'orange', icon: UsersThree, side: 'left' },
  'creative-volume-agency-testing': { label: 'Testing', toneA: 'amber', toneB: 'blue', icon: TestTube, side: 'right' },
  'freelance-ad-designer-scale-clients': { label: 'Designers', toneA: 'orange', toneB: 'violet', icon: PenNib, side: 'left' },
  'hiring-a-freelancer-or-agency-adrender-fits-in': { label: 'Hiring', toneA: 'blue', toneB: 'amber', icon: Handshake, side: 'right' },
  'prompting-optional-90-percent-no-prompt': { label: 'Prompts', toneA: 'violet', toneB: 'green', icon: CursorText, side: 'left' },
  'who-needs-an-ai-ad-generator': { label: 'Audience', toneA: 'orange', toneB: 'green', icon: Users, side: 'right' },
  'ui-ux-of-adrender': { label: 'Interface', toneA: 'blue', toneB: 'violet', icon: Layout, side: 'left' },
  'why-i-created-adrender': { label: 'Founder story', toneA: 'amber', toneB: 'orange', icon: User, side: 'right' },
  'why-adrender-doesnt-feel-like-figma': { label: 'Workflow', toneA: 'green', toneB: 'violet', icon: FrameCorners, side: 'left' },
  'ai-ad-generators-shopify-comparison': { label: 'Comparison', toneA: 'violet', toneB: 'amber', icon: Scales, side: 'right' },
  'ai-ad-management-platforms-shopify': { label: 'Platforms', toneA: 'orange', toneB: 'blue', icon: ChartBar, side: 'left' },
  'ai-product-photography-tools-comparison': { label: 'Photography', toneA: 'blue', toneB: 'green', icon: Camera, side: 'right' },
  'canva-enough-for-shopify-ads': { label: 'Design', toneA: 'amber', toneB: 'violet', icon: Palette, side: 'left' },
  'how-much-does-adrender-actually-save-you': { label: 'Savings', toneA: 'green', toneB: 'amber', icon: CurrencyCircleDollar, side: 'right' },
  'static-vs-video-ads-what-actually-wins': { label: 'Video', toneA: 'violet', toneB: 'blue', icon: VideoCamera, side: 'left' },
}

export const DEFAULT_BLOG_COVER: BlogCoverSpec = {
  label: 'Notes',
  toneA: 'blue',
  toneB: 'orange',
  icon: Newspaper,
  side: 'right',
}

const seenIcons = new Set<Icon>()
const seenPairs = new Set<string>()
for (const cover of Object.values(BLOG_COVERS)) {
  if (seenIcons.has(cover.icon)) throw new Error('Two blog covers share an icon')
  seenIcons.add(cover.icon)
  const pair = `${cover.toneA}/${cover.toneB}`
  if (cover.toneA === cover.toneB || seenPairs.has(pair)) throw new Error(`Blog cover colors are not unique: ${pair}`)
  seenPairs.add(pair)
}

export function getBlogCover(slug: string): BlogCoverSpec {
  return BLOG_COVERS[slug] ?? DEFAULT_BLOG_COVER
}
