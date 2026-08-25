import { FounderStory } from '../components/FounderStory'
import { ClosingCta } from '../components/ClosingCta'
import { PageMeta } from '../components/PageMeta'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { ScrollReveal } from '../components/ScrollReveal'
import type { PlaceholderId } from '../data/imageManifest'

const TITLE = 'About AdRender — Features for Shipping Static and Video Ads Fast'
const DESCRIPTION =
  'Proven templates from 100M+ real ads, brand intelligence, batch generation, every size, Shopify sync, and team workspaces — replacing the six-tool stack.'

type FeatureSection = {
  id: string
  heading: string
  paragraphs: string[]
  imageId: PlaceholderId
  imageLeft: boolean
}

const SECTIONS: FeatureSection[] = [
  {
    id: 'templates',
    heading: 'Proven templates',
    imageId: '15',
    imageLeft: false,
    paragraphs: [
      'Every template in AdRender is a real ad that ran in the wild. Search by keyword, filter by niche, platform, how long it\'s been running, and target market.',
      'Runtime matters: an ad that\'s been live for 90 days is still live because it\'s working. Browse by brand to see everything a specific company is running right now, or search across the whole index for a format or angle.',
      'Static and video templates live in the same library — filter to either, or browse both together.',
    ],
  },
  {
    id: 'library',
    heading: 'Your template library',
    imageId: '16',
    imageLeft: true,
    paragraphs: [
      'Save any template to your library with one click and organize saved templates into collections. Any ad you generate can also become a template — so your own winners feed back into your workflow instead of being one-offs.',
      'Over time your library becomes a private swipe file of formats proven to work for your brand specifically.',
    ],
  },
  {
    id: 'brands',
    heading: 'Brand intelligence',
    imageId: '17',
    imageLeft: false,
    paragraphs: [
      'Point AdRender at your website and it extracts your palette, logo, product imagery, tone of voice, and target audience automatically. Or upload brand documents directly for a deeper read.',
      'Set up multiple brands and switch between them — useful if you run several stores or handle multiple clients. Every generation inherits the active brand, so consistency isn\'t something you manage manually.',
    ],
  },
  {
    id: 'generation',
    heading: 'Batch generation',
    imageId: '18',
    imageLeft: true,
    paragraphs: [
      'Choose a proven format, choose your brand, hit generate. AdRender produces a batch of on-brand static and video ads from that template — images in every size you selected, video matched to your reference\'s exact aspect ratio and length. No prompt engineering — the structure comes from the template, the styling comes from your brand, and the AI fills the gap.',
      'Behind the scenes, generation runs through a multi-provider fallback: if one AI provider is down or slow, it moves to the next automatically. You don\'t see the failure, you just get your ads.',
    ],
  },
  {
    id: 'playground',
    heading: 'Ad Playground',
    imageId: '19',
    imageLeft: false,
    paragraphs: [
      'Not everything fits a template. Ad Playground gives you a blank canvas: upload your own template or reference video, start from scratch, or take an existing ad and push it somewhere new.',
      'Full manual control for the times you know exactly what you want, with the same brand intelligence applied — multi-size output for images, exact-match output for video.',
    ],
  },
  {
    id: 'sizes',
    heading: 'Every size, automatically',
    imageId: '20',
    imageLeft: true,
    paragraphs: [
      'One generation produces every format you need, correctly sized. For static ads: Square (1080×1080), Portrait (1080×1350), Story/Reel (1080×1920), Landscape (1200×675), Feed Banner (1200×628), Pinterest Pin (1000×1500), Medium Rectangle (300×250), Half Page (300×600), Leaderboard (728×90), Wide Skyscraper (160×600), and Mobile Banner (320×50).',
      'Video renders at every resolution up to 4K, at lengths up to 30 seconds — with longer videos coming soon. Filter by platform — Facebook, Instagram, LinkedIn, Google, TikTok — or select all. For images, choose 1K, 2K, or 4K resolution, and Standard or Pro generation quality. No resizing, no re-exporting, no cropping by hand.',
    ],
  },
  {
    id: 'shopify',
    heading: 'Shopify sync',
    imageId: '21',
    imageLeft: false,
    paragraphs: [
      'Connect your Shopify store once and your entire product catalog is available inside AdRender — names, descriptions, images, variants, and pricing. Add a product to your store and it\'s there next time you generate.',
      'AdRender also reads your storefront to pull brand colors and logo automatically during setup. Available on Growth and above.',
    ],
  },
  {
    id: 'workspaces',
    heading: 'Team workspaces',
    imageId: '22',
    imageLeft: true,
    paragraphs: [
      'Create separate workspaces for each client, brand, or project. Each has its own ad library, saved templates, and brands, so nothing bleeds between them.',
      'Invite teammates or clients into a workspace, and set an optional monthly token limit per workspace so one project can\'t consume everything. Your subscription covers all of them — no per-seat pricing, no per-workspace billing.',
    ],
  },
]

function FeatureBlock({ section }: { section: FeatureSection }) {
  const text = (
    <div className="flex flex-col justify-center">
      <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">{section.heading}</h2>
      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-zinc-400 md:text-base">
        {section.paragraphs.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </div>
    </div>
  )

  const image = (
    <PlaceholderImage
      id={section.imageId}
      className="aspect-[8/5] rounded-2xl border border-white/[0.08]"
      imgClassName="h-full w-full object-cover"
    />
  )

  return (
    <section id={section.id} className="scroll-mt-28 border-t border-white/[0.06] px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            {section.imageLeft ? (
              <>
                {image}
                {text}
              </>
            ) : (
              <>
                {text}
                {image}
              </>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/about" />
      <div className="border-b border-white/[0.06] px-4 pb-4 pt-12 md:px-6 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">About</p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            The system behind hundreds of ads in under 10 minutes
          </h1>
          <p className="mt-4 text-base text-zinc-400 md:text-lg">
            How AdRender replaces the stitched stack — and what each piece does.
          </p>
        </div>
      </div>
      <FounderStory extended />
      {SECTIONS.map((section) => (
        <FeatureBlock key={section.id} section={section} />
      ))}
      <ClosingCta />
    </>
  )
}
