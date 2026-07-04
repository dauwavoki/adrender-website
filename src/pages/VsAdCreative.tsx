import { ShieldCheck, Video, ShoppingBag } from 'lucide-react'
import { ComparisonPage, type ComparisonRow, type ComparisonCard } from '../components/ComparisonPage'

const rows: ComparisonRow[] = [
  { label: 'Starting price', adrender: '$0 free / $15 paid', competitor: '$39/mo (10 credits only)' },
  { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: 'Trial only — card required' },
  { label: 'Watermarks on free', adrender: '❌ Never — no watermarks on any plan', competitor: '✅ Yes' },
  { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
  { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: 'Library only — no live ad data' },
  { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Basic brand kit (manual)' },
  { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: 'Basic' },
  { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
  { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌' },
  { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: 'Limited' },
  { label: 'Variation limits', adrender: 'Up to 999 on Agency (token-limited only)', competitor: 'Credits consumed per download' },
  { label: 'Prompt required?', adrender: '❌ Brand info applies automatically', competitor: '✅ Yes' },
  { label: 'Complexity', adrender: 'Simple — ready in 2 minutes', competitor: 'Complex — reported as overwhelming' },
]

const cards: ComparisonCard[] = [
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
]

export function VsAdCreative() {
  return (
    <ComparisonPage
      competitor="AdCreative.ai"
      competitorUrl="https://www.adcreative.ai"
      subheadline="Half the price. No billing traps. Built for Shopify."
      documentTitle="AdRender vs AdCreative.ai — AI Ad Generator Comparison"
      rows={rows}
      cards={cards}
    />
  )
}
