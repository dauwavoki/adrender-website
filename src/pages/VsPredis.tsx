import { Megaphone, MousePointerClick, BarChart3 } from 'lucide-react'
import { ComparisonPage, type ComparisonRow, type ComparisonCard } from '../components/ComparisonPage'

const rows: ComparisonRow[] = [
  { label: 'Starting price', adrender: '$0 free / $15 paid', competitor: '$32/mo' },
  { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: '✅ Limited' },
  { label: 'Watermarks on free', adrender: '❌ Never — no watermarks on any plan', competitor: '✅ Yes' },
  { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: 'Manual import only' },
  { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: '❌ Social post templates only' },
  { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Basic' },
  { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '✅ Social captions' },
  { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
  { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌ Manual' },
  { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: 'Limited' },
  { label: 'Variation limits', adrender: 'Up to 999 on Agency (token-limited only)', competitor: 'Credits per post' },
  { label: 'Prompt required?', adrender: '❌ Brand info applies automatically', competitor: '✅ Text prompt required' },
  { label: 'Complexity', adrender: 'Simple — ready in 2 minutes', competitor: 'Moderate' },
]

const cards: ComparisonCard[] = [
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
]

export function VsPredis() {
  return (
    <ComparisonPage
      competitor="Predis"
      competitorUrl="https://predis.ai"
      subheadline="Built for ads. Not social posts."
      documentTitle="AdRender vs Predis — AI Ad Generator Comparison"
      rows={rows}
      cards={cards}
    />
  )
}
