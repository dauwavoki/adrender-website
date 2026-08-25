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
  Globe,
  CircleDollarSign,
  RefreshCw,
  Layers,
  Users,
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
      { label: 'No watermarks, ever', adrender: '✅ All plans, including Free', competitor: '❌ Yes, on Free' },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
      { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: 'Library only — no live ad data' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Basic brand kit (manual)' },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: 'Basic' },
      { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
      { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌' },
      { label: 'Video generation', adrender: '✅ Included from the entry tier — real video from winning templates', competitor: 'Locked behind $249/mo' },
      { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: 'Limited' },
      { label: 'Variation limits', adrender: 'Up to 999 on Scale (token-limited only)', competitor: 'Credits consumed per download' },
      { label: 'No prompt needed', adrender: '✅ Brand info applies automatically', competitor: '❌ Yes, prompt required' },
      { label: 'Complexity', adrender: 'Simple — hundreds of ads in under 10 minutes', competitor: 'Complex — reported as overwhelming' },
    ],
    cards: [
      {
        icon: ShieldCheck,
        title: 'No billing traps',
        body: 'AdCreative.ai is notorious for surprise auto-renewals and confusing credit systems. AdRender shows you the exact token cost before every generation. No surprises.',
      },
      {
        icon: Video,
        title: 'Video included. No $249 gate.',
        body: 'AdCreative.ai locks video behind a $249/month paywall — 6x their base price. AdRender includes real video generation from the entry tier: winning ad templates, converted into your brand. No upsell wall between you and video.',
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
      { label: 'No watermarks, ever', adrender: '✅ All plans, including Free', competitor: '❌ Yes, on Free' },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
      { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: 'Generic design templates — no ad performance data' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: '❌ Manual only' },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '❌ Manual copywriting' },
      { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
      { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌ Manual upload' },
      { label: 'Video generation', adrender: '✅ Included from the entry tier — real video from winning templates', competitor: 'Video editing in a design tool — not ad generation from winning templates' },
      { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: '❌ One at a time' },
      { label: 'Variation limits', adrender: 'Up to 999 on Scale (token-limited only)', competitor: 'Manual — one design at a time' },
      { label: 'No prompt needed', adrender: '✅ Brand info applies automatically', competitor: '❌ Everything is manual' },
      { label: 'Complexity', adrender: 'Simple — hundreds of ads in under 10 minutes', competitor: 'Design skills required' },
    ],
    cards: [
      {
        icon: Wand2,
        title: 'AI generates. You approve.',
        body: 'Canva is a design tool. AdRender is a generation engine. You don\u2019t drag and drop — you scan your brand, pick a template that\u2019s working in your niche, and get hundreds of ads in under 10 minutes.',
      },
      {
        icon: Clock,
        title: 'Half a day vs under 10 minutes',
        body: 'Building 10 ad variants manually in Canva takes most people half a day. AdRender generates hundreds of ads in under 10 minutes, with your brand colors, your logo, your product images, and AI-written copy — automatically.',
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
      { label: 'No watermarks, ever', adrender: '✅ All plans, including Free', competitor: '❌ Yes, on Free' },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: 'Manual import only' },
      { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: '❌ Social post templates only' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Basic' },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '✅ Social captions' },
      { label: 'Brand documents upload', adrender: '✅ Upload docs, AI builds richer ad copy', competitor: '❌' },
      { label: 'Product image auto-import', adrender: '✅ Pulled from URL or Shopify catalog', competitor: '❌ Manual' },
      { label: 'Video generation', adrender: '✅ Included from the entry tier — real video from winning templates', competitor: 'Social video posts — not paid-ad video from winning templates' },
      { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: 'Limited' },
      { label: 'Variation limits', adrender: 'Up to 999 on Scale (token-limited only)', competitor: 'Credits per post' },
      { label: 'No prompt needed', adrender: '✅ Brand info applies automatically', competitor: '❌ Text prompt required' },
      { label: 'Complexity', adrender: 'Simple — hundreds of ads in under 10 minutes', competitor: 'Moderate' },
    ],
    cards: [
      {
        icon: Megaphone,
        title: 'Ad creation vs content scheduling',
        body: 'Predis is a social media content tool. It schedules posts and generates captions. AdRender is purpose-built for paid advertising — static and video creative from real winning templates, built around your brand.',
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
  {
    slug: 'adscale',
    competitor: 'AdScale',
    competitorUrl: 'https://adscale.com',
    subheadline: 'Creative-first. Not gated to your ad spend.',
    documentTitle: 'AdRender vs AdScale — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs AdScale: creative-first, not ad-spend-gated. Real ad templates, Shopify sync, no ad spend commitment required. Free to start, no watermarks.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '$149/mo (Basic, up to $1,000 ad spend)' },
      { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: '14-day trial only' },
      { label: 'Pricing model', adrender: 'Flat token pricing', competitor: 'Scales with your monthly ad spend tier' },
      { label: 'No watermarks, ever', adrender: '✅ All plans, including Free', competitor: 'N/A' },
      {
        label: 'What it actually does',
        adrender: 'AI ad creative generation — static and video',
        competitor: 'Full media buying + optimization across Google/Meta, plus creative',
      },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: 'Auto-imports store data for ad targeting' },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'No template library — generates from your own store data',
      },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Basic, focused on product feed' },
      { label: 'Video generation', adrender: '✅ Included from the entry tier', competitor: 'Included, tied to spend tier' },
      {
        label: 'Use your own media buyer/agency',
        adrender: '✅ Yes — AdRender is creative-only, plug into any workflow',
        competitor: '❌ No — AdScale manages the media buying itself',
      },
      { label: 'Complexity', adrender: 'Simple — hundreds of ads in under 10 minutes', competitor: 'Higher — full campaign management platform' },
    ],
    cards: [
      {
        icon: Wand2,
        title: 'Creative tool vs. media-buying platform',
        body: 'AdScale is built to run your Google and Meta campaigns for you — it manages bids, budgets, and targeting, and its pricing scales with how much you spend on ads. AdRender is purpose-built for creative: you get the ad, you decide where and how to run it. If you already have a media buyer, an agency, or just want to run ads yourself, AdRender gives you the creative without committing to a spend-tiered platform.',
      },
      {
        icon: CircleDollarSign,
        title: 'No ad-spend commitment required',
        body: 'AdScale\u2019s pricing is directly tied to your monthly ad spend tier — the more you spend, the more you pay AdScale. AdRender\u2019s pricing has nothing to do with your ad spend. You pay for creative generation, full stop.',
      },
      {
        icon: BarChart3,
        title: 'Real ad benchmarks vs. your own store data',
        body: 'AdScale generates ad content from your product feed. AdRender starts every creative from 100M+ real ads that are currently running and converting — so you\u2019re working from proven performance data, not just your own catalog.',
      },
    ],
  },
  {
    slug: 'madgicx',
    competitor: 'Madgicx',
    competitorUrl: 'https://madgicx.com',
    subheadline: 'Every platform. Not just Meta.',
    documentTitle: 'AdRender vs Madgicx — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Madgicx: creative built for every platform, not just Meta. Real ad templates, Shopify sync, flat pricing not tied to ad spend. Free to start.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '~$45–99/mo, scales with your Meta ad spend' },
      { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: '7-day trial only' },
      { label: 'Platform coverage', adrender: 'Every platform — static and video for any ad channel', competitor: 'Meta (Facebook/Instagram) only' },
      { label: 'No watermarks, ever', adrender: '✅ All plans, including Free', competitor: 'N/A' },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: 'Reporting/attribution only, not creative generation' },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'Generates from your existing ads/product pages',
      },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Manual upload to platform required first' },
      { label: 'Video generation', adrender: '✅ Included from the entry tier', competitor: '❌ Static images and image edits — no native video generation' },
      { label: 'Creative-first tool', adrender: '✅ Yes — this is the whole product', competitor: 'Creative is bolted onto a media-buying/optimization tool' },
      {
        label: 'Complexity',
        adrender: 'Simple — hundreds of ads in under 10 minutes',
        competitor: 'Steep learning curve, built for active Meta spend management',
      },
    ],
    cards: [
      {
        icon: Globe,
        title: 'Meta-only vs. every platform',
        body: 'Madgicx is a Meta advertising super-app — its creative tools exist to feed campaigns it\u2019s also managing and optimizing on Facebook and Instagram. If any part of your ad strategy touches Google, TikTok, or anywhere else, Madgicx can\u2019t help with the creative there. AdRender generates ads for any platform you\u2019re running on.',
      },
      {
        icon: CircleDollarSign,
        title: 'Flat pricing vs. ad-spend tiers',
        body: 'Madgicx pricing scales with your monthly Meta ad spend — the more you spend, the more the platform costs. AdRender\u2019s pricing has nothing to do with what you spend on ads.',
      },
      {
        icon: Megaphone,
        title: 'Creative-first vs. optimization-first',
        body: 'Madgicx\u2019s core product is bid/budget automation and account optimization; creative generation is a feature within that. AdRender\u2019s core product is the creative itself — built from 100M+ real, currently-running ads, not just remixes of your own existing assets.',
      },
    ],
  },
  {
    slug: 'quickads',
    competitor: 'Quickads',
    competitorUrl: 'https://quickads.ai',
    subheadline: 'Real winning templates. Transparent pricing.',
    documentTitle: 'AdRender vs Quickads — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Quickads: real winning ad templates, native Shopify sync, transparent flat pricing. Free to start, no watermarks, no surprise billing.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: 'Varies by tier, up to $99/mo for full access' },
      { label: 'Free tier', adrender: '✅ 10 tokens, no card required', competitor: 'Trial only' },
      { label: 'Pricing clarity', adrender: 'One flat price per tier, always visible', competitor: 'Pricing varies significantly across sources/tiers' },
      { label: 'No watermarks, ever', adrender: '✅ All plans, including Free', competitor: 'Varies by plan' },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: 'Manual product entry / URL-based' },
      { label: 'Real ad templates (source)', adrender: '✅ 100M+ real ads currently running', competitor: '5–20M ad swipe library (varies by source)' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: 'Basic, per-product' },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: 'AI copywriter, 35+ languages' },
      {
        label: 'Video generation',
        adrender: '✅ Included from the entry tier — real video from winning templates',
        competitor: 'Template-assembled video, not generative video',
      },
      { label: 'Concurrent rendering', adrender: '✅ Unlimited — all tiers', competitor: 'Limited by plan' },
      { label: 'Complexity', adrender: 'Simple — hundreds of ads in under 10 minutes', competitor: 'Moderate' },
    ],
    cards: [
      {
        icon: ShieldCheck,
        title: 'One price, always visible',
        body: 'Quickads pricing is genuinely hard to pin down — published figures range from $9/mo to $99/mo depending on the source and plan, and user reviews report billing surprises around trial-end dates. AdRender has one flat price per tier, shown upfront, with no ad-spend or usage surprises.',
      },
      {
        icon: LayoutTemplate,
        title: 'Real ad benchmarks, always current',
        body: 'Quickads pulls from a historical ad swipe library. AdRender\u2019s templates are sourced from 100M+ ads currently running and converting, so every creative starts from what\u2019s actually working right now — not what worked at some point in the past.',
      },
      {
        icon: ShoppingBag,
        title: 'Native Shopify sync',
        body: 'Quickads relies on manual product entry or URL pulls per ad. AdRender syncs your full Shopify catalog automatically — products, images, and variants update without manual re-entry.',
      },
    ],
  },
  {
    slug: 'flair',
    competitor: 'Flair',
    competitorUrl: 'https://flair.ai',
    subheadline: 'Full ads. Not just product photos.',
    documentTitle: 'AdRender vs Flair — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Flair: full ad creative, not just product photos. Real ad templates, Shopify sync, ad copy included. Free to start, no watermarks.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '$0 free / $8–10/mo paid' },
      {
        label: 'What it actually does',
        adrender: 'Complete ad creative — layout, copy, and product imagery',
        competitor: 'Product photo scene composition only',
      },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '❌ None — visual tool only' },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: '❌ None — you compose scenes manually from a prop library',
      },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ Manual upload' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: '❌ Manual brand kit / moodboard setup' },
      {
        label: 'Video generation',
        adrender: '✅ Included from the entry tier — real video from winning templates',
        competitor: '❌ No video generation',
      },
      { label: 'No prompt needed', adrender: '✅ Brand info applies automatically', competitor: '❌ Manual drag-and-drop scene composition required' },
      { label: 'Complexity', adrender: 'Simple — hundreds of ads in under 10 minutes', competitor: 'Moderate — hands-on scene design per image' },
    ],
    cards: [
      {
        icon: Layers,
        title: 'Ad creative vs. product photography',
        body: 'Flair is a product photography and scene-composition tool — it helps you place your product into a nicely lit background. That\u2019s a piece of what goes into an ad, not the ad itself. AdRender generates the complete ad: layout, copy, hooks, and CTAs, sourced from real templates that are actually running as ads.',
      },
      {
        icon: MousePointerClick,
        title: 'No manual scene-building required',
        body: 'Flair requires you to drag and drop your product into a scene by hand for every image. AdRender applies your brand automatically — no manual composition per creative.',
      },
      {
        icon: Clock,
        title: 'Built for volume',
        body: 'Flair is designed around one image at a time. AdRender is built to generate hundreds of complete, ready-to-run ads in minutes.',
      },
    ],
  },
  {
    slug: 'pebblely',
    competitor: 'Pebblely',
    competitorUrl: 'https://pebblely.com',
    subheadline: 'Complete ads. Not background swaps.',
    documentTitle: 'AdRender vs Pebblely — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Pebblely: complete ad creative, not just background swaps. Real winning templates, Shopify sync, always-free tier. No watermarks.',
    rows: [
      {
        label: 'Starting price',
        adrender: '$0 free / $19 paid',
        competitor: '$0 free (40 images total, one-time, not recurring) / $15–32/mo paid',
      },
      { label: 'Free tier', adrender: '✅ 10 tokens every month, no card required', competitor: '40 images total — once used, you\u2019re on a paid plan' },
      {
        label: 'What it actually does',
        adrender: 'Complete ad creative — layout, copy, and product imagery',
        competitor: 'Background swap for product photos, from a shared theme library',
      },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '❌ None — visual tool only' },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'Shared library of 40+ generic background themes',
      },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ Manual upload' },
      { label: 'Brand auto-setup from URL', adrender: '✅ Scans site, pulls colors/logo/voice/products', competitor: '❌ None' },
      { label: 'Video generation', adrender: '✅ Included from the entry tier', competitor: '❌ No video generation' },
      { label: 'Complexity', adrender: 'Simple — hundreds of ads in under 10 minutes', competitor: 'Simple, but limited to single background swaps' },
    ],
    cards: [
      {
        icon: Layers,
        title: 'Ad creative vs. background swap',
        body: 'Pebblely replaces the background behind your product photo using a shared library of themes — the same themes are available to every other Pebblely user, so results can look generic across sellers. AdRender generates the complete ad — layout, copy, and imagery — from real templates sourced from actual running ads.',
      },
      {
        icon: RefreshCw,
        title: 'A free tier that\u2019s actually free, every month',
        body: 'Pebblely\u2019s \u201cfree\u201d tier is 40 images total, one time — not a monthly allowance. Once they\u2019re used, you\u2019re on a paid plan. AdRender\u2019s free tier renews every month: 10 tokens, no card required, ongoing.',
      },
      {
        icon: LayoutTemplate,
        title: 'Real ad templates vs. generic themes',
        body: 'Pebblely\u2019s 40+ background themes are shared across its entire user base. AdRender sources templates from 100M+ ads that are actually running and converting right now.',
      },
    ],
  },
  {
    slug: 'holo',
    competitor: 'Holo',
    competitorUrl: 'https://tryholo.ai',
    subheadline: 'Real running ads. Not just brand-trained AI.',
    documentTitle: 'AdRender vs Holo — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Holo: real ad templates from ads running now, native Shopify sync, and a free tier that renews monthly. Holo has no free tier at all.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '$12–20/mo (sale pricing), no free tier' },
      {
        label: 'Free tier',
        adrender: '✅ 10 tokens every month, no card required, renews monthly',
        competitor: '❌ None — only a 7-day refund window on unused credits',
      },
      {
        label: 'Monthly output limit',
        adrender: 'Scales with tier, unlimited concurrent on top tiers',
        competitor: '120–350 creatives/month depending on plan',
      },
      { label: 'Concurrent generations', adrender: 'Higher limits across tiers', competitor: 'Capped at 2–6 depending on plan' },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'Trained on a fixed set of ~10M assets / 19K past ads',
      },
      {
        label: 'Shopify native sync',
        adrender: '✅ Auto-imports products, images, variants',
        competitor: '❌ None — generic URL scan only, no catalog integration',
      },
      {
        label: 'Brand auto-setup from URL',
        adrender: '✅ Scans site, pulls colors/logo/voice/products',
        competitor: 'Scans site for brand tone, no product catalog sync',
      },
      {
        label: 'Scope',
        adrender: 'Focused: static and video ad creative',
        competitor: 'Broader: ads, social posts, and email sequences',
      },
      { label: 'Video generation', adrender: '✅ Included from the entry tier', competitor: 'Included, static and video creatives' },
      {
        label: 'Multi-brand support',
        adrender: 'Available per tier, unlimited on top tier',
        competitor: 'Up to 5 brands per account',
      },
    ],
    cards: [
      {
        icon: LayoutTemplate,
        title: 'Real running ads vs. a fixed training set',
        body: 'Holo generates from what its AI learned during training — a fixed snapshot of roughly 10 million assets and 19,000 past ads. AdRender\u2019s template library is a live index of over 100 million ads that are actually running right now, so what you start from reflects current performance, not a training cutoff.',
      },
      {
        icon: RefreshCw,
        title: 'A free tier that actually renews',
        body: 'Holo doesn\u2019t offer a free tier at all — only a 7-day refund window if you don\u2019t use your credits. AdRender\u2019s free tier renews every month: 10 tokens, no card required, ongoing for as long as you want to use it.',
      },
      {
        icon: ShoppingBag,
        title: 'Built for e-commerce catalogs',
        body: 'Holo works from a general website scan with no product catalog integration. If you\u2019re on Shopify, AdRender syncs your full catalog directly — every product, image, and variant — so ads are generated against your actual live inventory, not just brand tone pulled from your homepage.',
      },
      {
        icon: Layers,
        title: 'Broader scope vs. deeper focus',
        body: 'Holo covers more ground — ads, social posts, and email sequences in one subscription. If you need all three, that breadth may be worth it. AdRender is built specifically for ad creative, with the Shopify integration and real-running-ad template library that a broader, do-everything tool doesn\u2019t have room to prioritize.',
      },
    ],
  },
  {
    slug: 'simplified',
    competitor: 'Simplified',
    competitorUrl: 'https://simplified.com',
    subheadline: 'Built for ads. Not everything at once.',
    documentTitle: 'AdRender vs Simplified — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Simplified: real ad templates from ads running now, not a generalist design/copy/scheduling bundle. Shopify sync included. Free to start.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: 'Free tier (limited) / ~$18/mo paid' },
      {
        label: 'Scope',
        adrender: 'Focused: ad creative, static and video',
        competitor: 'Broad: design, video, copy, social scheduling all in one',
      },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'Generic template library, not sourced from running ads',
      },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
      {
        label: 'Brand auto-setup from URL',
        adrender: '✅ Scans site, pulls colors/logo/voice/products',
        competitor: 'Manual brand kit setup',
      },
      {
        label: 'Video generation',
        adrender: '✅ Included from the entry tier',
        competitor: 'Included as one of many tools in the bundle',
      },
      {
        label: 'Complexity',
        adrender: 'Simple — hundreds of ads in under 10 minutes',
        competitor: 'Broader toolset means more surface area to learn',
      },
    ],
    cards: [
      {
        icon: Layers,
        title: 'A generalist vs a specialist',
        body: 'Simplified bundles design, video, copywriting, and social scheduling into one low-cost subscription — genuinely useful if you need all four and want to consolidate tool spend. But breadth means it doesn\u2019t go deep on any one category, including ad creative specifically. AdRender does one thing: generate ad creative from real, currently-running templates, synced to your actual brand and catalog.',
      },
      {
        icon: LayoutTemplate,
        title: 'Real running ads vs a generic template library',
        body: 'Simplified\u2019s templates are general-purpose design templates, not sourced from ads that are actually running and converting. AdRender\u2019s library is pulled from 100M+ real ads live right now, filterable by niche and platform.',
      },
    ],
  },
  {
    slug: 'invideo',
    competitor: 'InVideo',
    competitorUrl: 'https://invideo.io',
    subheadline: 'Ad-specific templates. Not a general video editor.',
    documentTitle: 'AdRender vs InVideo — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs InVideo: real ad templates, native Shopify sync, credits that don\u2019t expire mid-cycle. Built for ads specifically, not general video editing.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: 'Free (watermarked) / $17-20/mo paid' },
      {
        label: 'Free tier',
        adrender: '✅ 10 tokens/month, no watermark on paid, renews monthly',
        competitor: 'Limited AI minutes, watermarked exports',
      },
      {
        label: 'Credits/tokens',
        adrender: 'Simple monthly allotment',
        competitor: 'Credit system varies by model, doesn\u2019t roll over',
      },
      {
        label: 'Scope',
        adrender: 'Ad creative specifically — static and video',
        competitor: 'General video creation: explainers, social clips, YouTube content',
      },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'Stock footage and general video templates, not ad-specific',
      },
      {
        label: 'Brand auto-setup from URL',
        adrender: '✅ Scans site, pulls colors/logo/voice/products',
        competitor: 'Manual setup',
      },
      { label: 'Static ad generation', adrender: '✅ Included', competitor: 'Not the focus — video-first tool' },
    ],
    cards: [
      {
        icon: Video,
        title: 'General video tool vs ad-specific generator',
        body: 'InVideo is built for video content broadly — explainers, YouTube videos, social clips — with ad creative as one use case among many. AdRender is built specifically for ad creative, both static and video, generated from templates sourced from real running ads rather than general stock footage.',
      },
      {
        icon: CircleDollarSign,
        title: 'Predictable monthly access vs shifting credit costs',
        body: 'InVideo\u2019s credit system varies by which AI model you use and doesn\u2019t roll over between billing periods, which can make costs unpredictable. AdRender\u2019s free and paid tiers are straightforward monthly allotments.',
      },
    ],
  },
  {
    slug: 'creatify',
    competitor: 'Creatify',
    competitorUrl: 'https://creatify.ai',
    subheadline: 'Static and video. With an actual free tier.',
    documentTitle: 'AdRender vs Creatify — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Creatify: static and video ads from real running templates, plus a free tier that renews monthly. Creatify is video-only with no permanent free plan.',
    rows: [
      {
        label: 'Starting price',
        adrender: '$0 free / $19 paid',
        competitor: '$39/mo, no permanent free plan (trial credits only)',
      },
      {
        label: 'Free tier',
        adrender: '✅ 10 tokens every month, renews monthly',
        competitor: '❌ None — trial credits only',
      },
      { label: 'Output format', adrender: 'Static and video', competitor: 'Video only (AI avatar/UGC-style)' },
      { label: 'Credit expiration', adrender: 'N/A — monthly allotment', competitor: 'Credits expire every 2 months' },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'Templates for avatar scripts, not sourced from a live ad index',
      },
      {
        label: 'Shopify native sync',
        adrender: '✅ Auto-imports products, images, variants',
        competitor: 'Product URL import, not full catalog sync',
      },
      {
        label: 'Brand auto-setup from URL',
        adrender: '✅ Scans site, pulls colors/logo/voice/products',
        competitor: 'Pulls from product URL only',
      },
    ],
    cards: [
      {
        icon: Layers,
        title: 'Static and video vs video-only',
        body: 'Creatify specializes in AI avatar/UGC-style video ads generated from a product URL. If you only need that specific format, it\u2019s a focused tool. AdRender generates both static and video ads from the same brand setup and template library — you\u2019re not locked into one format.',
      },
      {
        icon: RefreshCw,
        title: 'A free tier that renews vs credits that expire',
        body: 'Creatify has no permanent free plan, and paid-tier credits expire every two months whether you use them or not. AdRender\u2019s free tier renews every month with no expiration pressure.',
      },
    ],
  },
  {
    slug: 'adespresso',
    competitor: 'AdEspresso',
    competitorUrl: 'https://adespresso.com',
    subheadline: 'Creative generation. Not spend-gated campaign management.',
    documentTitle: 'AdRender vs AdEspresso — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs AdEspresso: AI-generated ad creative, not spend-tiered campaign management. Real ad templates, Shopify sync, flat pricing.',
    rows: [
      {
        label: 'Starting price',
        adrender: '$0 free / $19 paid',
        competitor: '$49/mo (tied to a $1,000 ad spend limit)',
      },
      {
        label: 'Pricing model',
        adrender: 'Flat, unrelated to ad spend',
        competitor: 'Scales with your monthly ad spend limit',
      },
      {
        label: 'What it actually does',
        adrender: 'AI ad creative generation — static and video',
        competitor: 'Meta/Google campaign management and A/B testing',
      },
      {
        label: 'Creative generation',
        adrender: '✅ Core product, from real running ad templates',
        competitor: '❌ Not a creative generator — you bring your own creative',
      },
      { label: 'Shopify native sync', adrender: '✅ Auto-imports products, images, variants', competitor: '❌ None' },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: '❌ No template library',
      },
      { label: 'Free tier', adrender: '✅ 10 tokens/month, no card required', competitor: 'Trial only' },
    ],
    cards: [
      {
        icon: Wand2,
        title: 'Campaign manager vs creative generator',
        body: 'AdEspresso is a campaign management and split-testing tool for Meta and Google ads — it doesn\u2019t generate the creative itself, you still need to supply that separately. AdRender generates the actual ad creative from real, currently-running templates, with nothing to do with managing your ad account.',
      },
      {
        icon: CircleDollarSign,
        title: 'Flat pricing vs spend-tiered pricing',
        body: 'AdEspresso\u2019s plans are gated by how much you spend on ads monthly, starting at a $1,000 limit on the entry plan. AdRender\u2019s pricing has nothing to do with your ad spend.',
      },
    ],
  },
  {
    slug: 'creatopy',
    competitor: 'Creatopy',
    competitorUrl: 'https://www.creatopy.com',
    subheadline: 'AI generates the ad. You don\u2019t design it by hand.',
    documentTitle: 'AdRender vs Creatopy — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Creatopy: AI-generated ads from real running templates, not a manual banner design tool. Shopify sync, video included, free to start.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '~$36/mo per user, no free tier for real use' },
      {
        label: 'What it actually does',
        adrender: 'AI generates complete ads from real templates',
        competitor: 'Design automation tool — you build/animate banners manually',
      },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'Generic template library, not sourced from live ads',
      },
      {
        label: 'Shopify native sync',
        adrender: '✅ Auto-imports products, images, variants',
        competitor: 'Product feed integration, not full catalog sync',
      },
      {
        label: 'Brand auto-setup from URL',
        adrender: '✅ Scans site, pulls colors/logo/voice/products',
        competitor: 'Manual brand kit setup',
      },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '❌ Manual copywriting' },
      {
        label: 'Video generation',
        adrender: '✅ Included from the entry tier',
        competitor: 'Animation tools, not AI video generation',
      },
    ],
    cards: [
      {
        icon: Wand2,
        title: 'Design automation vs AI generation',
        body: 'Creatopy is a genuinely strong tool for teams that want to manually design banner ads and then automate resizing/animation across formats. It\u2019s still a design tool — a person builds each creative. AdRender generates the ad directly from a real running-ad template and your brand data, with no manual design step.',
      },
      {
        icon: LayoutTemplate,
        title: 'Real running ads vs a static template library',
        body: 'Creatopy\u2019s templates aren\u2019t sourced from live ad performance data. AdRender\u2019s library reflects over 100 million ads that are actually running and converting right now.',
      },
    ],
  },
  {
    slug: 'abyssale',
    competitor: 'Abyssale',
    competitorUrl: 'https://www.abyssale.com',
    subheadline: 'AI creates the ad. Not just resizes it.',
    documentTitle: 'AdRender vs Abyssale — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Abyssale: AI generates the ad creative itself, not just resizes and bulk-produces designs you already made. Real templates, Shopify sync.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '$15/seat/mo (Start), $45/seat/mo (Pro)' },
      {
        label: 'What it actually does',
        adrender: 'AI generates complete ads from real templates',
        competitor: 'Creative automation — bulk resizing/variation of designs you provide',
      },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'You supply the base design; Abyssale scales it',
      },
      {
        label: 'Shopify native sync',
        adrender: '✅ Auto-imports products, images, variants',
        competitor: 'Spreadsheet/API-driven data feeds, not native Shopify sync',
      },
      {
        label: 'Brand auto-setup from URL',
        adrender: '✅ Scans site, pulls colors/logo/voice/products',
        competitor: 'Manual setup',
      },
      { label: 'Ad copy auto-generation', adrender: '✅ Hooks, headlines, CTAs per product', competitor: '❌ Not a copy generator' },
      { label: 'Pricing structure', adrender: 'Flat per tier', competitor: 'Per-seat, scales with team size' },
    ],
    cards: [
      {
        icon: Layers,
        title: 'Bulk production vs original generation',
        body: 'Abyssale is excellent at taking a design you\u2019ve already made and producing dozens of size/format variations automatically — a real time-saver for teams with an existing creative to scale. It doesn\u2019t generate the original creative concept. AdRender generates the ad itself, starting from a real running-ad template, not from a design you have to supply first.',
      },
      {
        icon: Users,
        title: 'Per-seat vs flat pricing',
        body: 'Abyssale charges per seat, which adds up for any team beyond one person. AdRender\u2019s pricing is flat per tier regardless of team size up to your plan\u2019s seat limit.',
      },
    ],
  },
  {
    slug: 'blaze',
    competitor: 'Blaze',
    competitorUrl: 'https://www.blaze.ai',
    subheadline: 'Focused on ads. Not a full marketing department replacement.',
    documentTitle: 'AdRender vs Blaze — AI Ad Generator Comparison',
    metaDescription:
      'AdRender vs Blaze: focused AI ad creative from real running templates, not a broad all-in-one marketing platform. Shopify sync, free to start.',
    rows: [
      { label: 'Starting price', adrender: '$0 free / $19 paid', competitor: '$79/mo+, credit-based' },
      {
        label: 'Scope',
        adrender: 'Focused: ad creative, static and video',
        competitor: 'Broad: social, ads, landing pages, reviews, AI phone answering',
      },
      {
        label: 'Real ad templates (source)',
        adrender: '✅ 100M+ real ads currently running',
        competitor: 'Generates from your organic content performance, not a live ad index',
      },
      {
        label: 'Shopify native sync',
        adrender: '✅ Auto-imports products, images, variants',
        competitor: '❌ None specifically for Shopify',
      },
      {
        label: 'Brand auto-setup from URL',
        adrender: '✅ Scans site, pulls colors/logo/voice/products',
        competitor: 'Brand voice training, broader marketing focus',
      },
      {
        label: 'Multi-brand support',
        adrender: 'Available per tier',
        competitor: 'One brand per workspace — separate workspace needed per brand',
      },
      { label: 'Free tier', adrender: '✅ 10 tokens/month, no card required', competitor: '❌ None at this price point' },
    ],
    cards: [
      {
        icon: Megaphone,
        title: 'Full marketing platform vs focused ad generator',
        body: 'Blaze covers a lot of ground — social posts, ads, landing pages, review management, even AI phone answering — starting at $79/month. That breadth is genuinely useful if you want one platform for everything. AdRender is narrower by design: it generates ad creative specifically, from a much larger and more current library of real running ads.',
      },
      {
        icon: Users,
        title: 'One brand per workspace vs built-in multi-brand support',
        body: 'Blaze requires a separate workspace (and separate cost, for 5+ brands) per brand you manage. AdRender supports multiple brands within a single account depending on tier.',
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
