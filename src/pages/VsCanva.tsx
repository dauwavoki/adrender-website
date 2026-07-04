import { Wand2, Clock, LayoutTemplate } from 'lucide-react'
import { ComparisonPage, type ComparisonRow, type ComparisonCard } from '../components/ComparisonPage'

const rows: ComparisonRow[] = [
  { label: 'Starting price', adrender: '$0 free / $15 paid', competitor: '$15/mo (Canva Pro)' },
  { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: '✅ Limited' },
  { label: 'Watermarks on free', adrender: '❌ Never — no watermarks on any plan', competitor: '✅ Yes' },
  { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
  { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: 'Generic design templates — no ad performance data' },
  { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: '❌ Manual only' },
  { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '❌ Manual copywriting' },
  { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
  { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌ Manual upload' },
  { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: '❌ One at a time' },
  { label: 'Variation limits', adrender: 'Up to 999 on Agency (token-limited only)', competitor: 'Manual — one design at a time' },
  { label: 'Prompt required?', adrender: '❌ Brand info applies automatically', competitor: '✅ Everything is manual' },
  { label: 'Complexity', adrender: 'Simple — ready in 2 minutes', competitor: 'Design skills required' },
]

const cards: ComparisonCard[] = [
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
]

export function VsCanva() {
  return (
    <ComparisonPage
      competitor="Canva"
      competitorUrl="https://www.canva.com"
      subheadline="AI that actually generates. Not just a template editor."
      documentTitle="AdRender vs Canva — AI Ad Generator Comparison"
      rows={rows}
      cards={cards}
    />
  )
}
