import { Link } from 'react-router-dom'
import {
  Briefcase,
  FolderHeart,
  LayoutGrid,
  Maximize2,
  ShoppingBag,
  Sparkles,
  Users,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import { PlaceholderImage } from './PlaceholderImage'
import { ScrollReveal } from './ScrollReveal'
import type { PlaceholderId } from '../data/imageManifest'

type FeatureCard = {
  anchor: string
  heading: string
  sub: string
  body: string
  imageId: PlaceholderId
  icon: LucideIcon
  accent: string
}

const FEATURES: FeatureCard[] = [
  {
    anchor: 'templates',
    heading: 'Proven templates',
    sub: '100M+ real ads. Searchable.',
    body: "Not stock layouts — actual ads running right now, filterable by niche, platform, runtime, and market. See what's working before you build anything.",
    imageId: '07',
    icon: LayoutGrid,
    accent: 'text-[#B894F0]',
  },
  {
    anchor: 'library',
    heading: 'Your template library',
    sub: 'Save what works. Reuse it forever.',
    body: 'Bookmark any template you like, and turn your own best-performing ads into reusable templates. Your winning formats become a library you build on instead of rebuilding.',
    imageId: '08',
    icon: FolderHeart,
    accent: 'text-[#5B9FFF]',
  },
  {
    anchor: 'brands',
    heading: 'Brand intelligence',
    sub: 'Learns your brand once. Applies it to everything.',
    body: 'Drop in your URL or upload brand docs. AdRender pulls your colors, logo, voice, and audience — then every ad sounds like you, not like a template.',
    imageId: '09',
    icon: Briefcase,
    accent: 'text-[#FF8F5C]',
  },
  {
    anchor: 'generation',
    heading: 'Batch generation',
    sub: 'Hundreds of ads. One click.',
    body: 'Pick a proven format, hit generate, get a batch. On-brand, ready to run, no prompt engineering required. The step that used to take three hours now ships hundreds of ads in under 10 minutes.',
    imageId: '10',
    icon: Sparkles,
    accent: 'text-[#00E5FF]',
  },
  {
    anchor: 'playground',
    heading: 'Ad Playground',
    sub: 'Your canvas, not a template.',
    body: "Upload your own templates, start from a blank slate, or riff on something halfway. Full creative control when you want it — for the times a template isn't the answer.",
    imageId: '11',
    icon: Wand2,
    accent: 'text-[#B894F0]',
  },
  {
    anchor: 'sizes',
    heading: 'Every size, automatically',
    sub: '11 formats. Every platform. One generation.',
    body: 'Square, Portrait, Story/Reel, Landscape, Feed Banner, Pinterest Pin, Medium Rectangle, Half Page, Leaderboard, Wide Skyscraper, Mobile Banner. Facebook, Instagram, LinkedIn, Google, TikTok — sized correctly, no manual resizing. 1K, 2K, or 4K resolution. Video uses the ratios and durations paid social actually runs — square, portrait/story, and landscape — not the display-ad pixel grid.',
    imageId: '12',
    icon: Maximize2,
    accent: 'text-[#5B9FFF]',
  },
  {
    anchor: 'shopify',
    heading: 'Shopify sync',
    sub: 'Your catalog, already in the tool.',
    body: 'Connect your store once. Every product, image, and price flows in automatically — no manual uploads, no re-exporting when you add a SKU.',
    imageId: '13',
    icon: ShoppingBag,
    accent: 'text-[#96F07A]',
  },
  {
    anchor: 'workspaces',
    heading: 'Team workspaces',
    sub: 'Built for agencies and teams.',
    body: 'Separate workspaces per client or project, shared libraries, per-workspace limits. One subscription covers all of them.',
    imageId: '14',
    icon: Users,
    accent: 'text-[#FF8F5C]',
  },
]

export function FeatureCards() {
  return (
    <section id="features" className="scroll-mt-28 border-t border-white/[0.06] px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mx-auto max-w-3xl text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            A creative production system, not a collection of tools.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <ScrollReveal key={f.anchor}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#14141c]">
                  <div className="flex flex-1 flex-col p-6 pb-4">
                    <div className={`flex items-center gap-2 ${f.accent}`}>
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      <Link
                        to={`/about#${f.anchor}`}
                        className="font-heading text-base font-bold tracking-tight hover:underline hover:underline-offset-4"
                      >
                        {f.heading}
                      </Link>
                    </div>
                    <p className="mt-2 text-sm font-medium text-zinc-300">{f.sub}</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{f.body}</p>
                    <Link
                      to={`/about#${f.anchor}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
                    >
                      Learn more
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#96F07A] text-black">
                        →
                      </span>
                    </Link>
                  </div>
                  <PlaceholderImage
                    id={f.imageId}
                    className="mt-auto aspect-[10/7] border-t border-white/[0.04]"
                    imgClassName="h-full w-full object-cover object-top"
                  />
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
