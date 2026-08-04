import {
  ShieldCheck,
  Video,
  ShoppingBag,
  Wand2,
  Clock,
  LayoutTemplate,
  Megaphone,
  MousePointerClick,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'
import type { ComparisonRow } from '../components/ComparisonPage'

export type ComparisonCardData = {
  icon: LucideIcon
  title: string
  body: string
}

export type ComparisonConfig = {
  /** URL segment after `vs-`, e.g. `adcreative` → `/vs-adcreative` */
  slug: string
  competitor: string
  competitorUrl: string
  subheadline: string
  documentTitle: string
  /** Unique meta description (~160 chars) for this comparison */
  metaDescription: string
  rows: ComparisonRow[]
  cards: ComparisonCardData[]
}

export const comparisons: ComparisonConfig[] = [
  {
    slug: 'adcreative',
    competitor: 'AdCreative.ai',
    competitorUrl: 'https://www.adcreative.ai',
    subheadline: 'Half the price. No billing traps. Built for Shopify.',
    documentTitle: 'AdRender vs AdCreative.ai — AI Ad Generator Comparison',
    metaDescription:
      'Compare AdRender vs AdCreative.ai: half the price, no billing traps, Shopify-native sync, and ads from 100M+ real templates. Free to start, no watermarks.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '$39/mo (10 credits only)' },
      { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: 'Trial only — card required' },
      { label: 'Watermarks on free', adrender: '❌ Never — no watermarks on any plan', competitor: '✅ Yes' },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
      { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: 'Library only — no live ad data' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Basic brand kit (manual)' },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: 'Basic' },
      { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
      { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌' },
      { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: 'Limited' },
      { label: 'Variation limits', adrender: 'Up to 999 on Scale (token-limited only)', competitor: 'Credits consumed per download' },
      { label: 'Prompt required?', adrender: '❌ Brand info applies automatically', competitor: '✅ Yes' },
      { label: 'Complexity', adrender: 'Simple — ready in 2 minutes', competitor: 'Complex — reported as overwhelming' },
    ],
    cards: [
      {
        icon: ShieldCheck,
        title: 'No billing traps',
        body: 'AdCreative.ai is notorious for surprise auto-renewals and confusing credit systems. AdRender shows you the exact token cost before every generation. No surprises.',
      },
      {
        icon: Video,
        title: 'Video shouldn\u2019t cost $249/month',
        body: 'AdCreative.ai locks video behind a $249/month paywall — 6x their base price. AdRender focuses on doing static ads better than anyone. No upsell wall between you and what you need today.',
      },
      {
        icon: ShoppingBag,
        title: 'Shopify-native. Nothing else comes close.',
        body: 'AdCreative.ai has no Shopify integration. AdRender syncs your entire product catalog automatically — names, images, variants — so every ad is built from your real products.',
      },
    ],
  },
  {
    slug: 'canva',
    competitor: 'Canva',
    competitorUrl: 'https://www.canva.com',
    subheadline: 'AI that actually generates. Not just a template editor.',
    documentTitle: 'AdRender vs Canva — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Canva: AI generates on-brand ads from real winning templates—not a design editor. Shopify sync, auto copy, ready in minutes. Free to start.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '$15/mo (Canva Pro)' },
      { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: '✅ Limited' },
      { label: 'Watermarks on free', adrender: '❌ Never — no watermarks on any plan', competitor: '✅ Yes' },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
      { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: 'Generic design templates — no ad performance data' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: '❌ Manual only' },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '❌ Manual copywriting' },
      { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
      { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌ Manual upload' },
      { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: '❌ One at a time' },
      { label: 'Variation limits', adrender: 'Up to 999 on Scale (token-limited only)', competitor: 'Manual — one design at a time' },
      { label: 'Prompt required?', adrender: '❌ Brand info applies automatically', competitor: '✅ Everything is manual' },
      { label: 'Complexity', adrender: 'Simple — ready in 2 minutes', competitor: 'Design skills required' },
    ],
    cards: [
      {
        icon: Wand2,
        title: 'AI generates. You approve.',
        body: 'Canva is a design tool. AdRender is a generation engine. You don\u2019t drag and drop — you scan your brand, pick a template that\u2019s working in your niche, and get 50 ads while you grab coffee.',
      },
      {
        icon: Clock,
        title: '8 hours vs 8 minutes',
        body: 'Building 10 ad variants manually in Canva takes most people half a day. AdRender generates them in minutes, with your brand colors, your logo, your product images, and AI-written copy — automatically.',
      },
      {
        icon: LayoutTemplate,
        title: 'Real ads. Not design templates.',
        body: 'Canva templates are designed to look pretty. AdRender templates are real ads currently running and converting across Facebook, Instagram, and Google. You start from what\u2019s already working.',
      },
    ],
  },
  {
    slug: 'predis',
    competitor: 'Predis',
    competitorUrl: 'https://predis.ai',
    subheadline: 'Built for ads. Not social posts.',
    documentTitle: 'AdRender vs Predis — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Predis: built for paid ads, not social posts. Real ad templates, Shopify sync, brand auto-setup, no prompt required. Free to start, no watermarks.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '$32/mo' },
      { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: '✅ Limited' },
      { label: 'Watermarks on free', adrender: '❌ Never — no watermarks on any plan', competitor: '✅ Yes' },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: 'Manual import only' },
      { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: '❌ Social post templates only' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Basic' },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '✅ Social captions' },
      { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
      { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌ Manual' },
      { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: 'Limited' },
      { label: 'Variation limits', adrender: 'Up to 999 on Scale (token-limited only)', competitor: 'Credits per post' },
      { label: 'Prompt required?', adrender: '❌ Brand info applies automatically', competitor: '✅ Text prompt required' },
      { label: 'Complexity', adrender: 'Simple — ready in 2 minutes', competitor: 'Moderate' },
    ],
    cards: [
      {
        icon: Megaphone,
        title: 'Ad creation vs content scheduling',
        body: 'Predis is a social media content tool. It schedules posts and generates captions. AdRender is purpose-built for paid advertising — static ad creative from real winning templates, built around your brand.',
      },
      {
        icon: MousePointerClick,
        title: 'No prompt needed',
        body: 'Predis requires a text prompt for every piece of content. AdRender auto-generates from your brand profile — your voice, colors, product images, and ad copies are applied automatically.',
      },
      {
        icon: BarChart3,
        title: 'Real ad benchmarks vs generic templates',
        body: 'Predis uses social post templates. AdRender uses 100M+ real ads that are currently running and converting across platforms — so every creative starts from proven performance data.',
      },
    ],
  },
]

export function getComparisonBySlug(slug: string): ComparisonConfig | undefined {
  return comparisons.find((c) => c.slug === slug)
}

export function comparisonPath(slug: string): string {
  return `/vs-${slug}`
}
