import { CostTable } from '../components/CostTable'
import { FounderStory } from '../components/FounderStory'
import { PageMeta } from '../components/PageMeta'
import { SceneForAnchor } from '../components/scenes'
import { SplitHero } from '../components/site/SplitHero'
import { ClosingCta } from '../components/site/ClosingCta'
import { getSignupUrl } from '../lib/appUrl'

const TITLE = 'About AdRender — Features for Shipping Static and Video Ads Fast'
const DESCRIPTION =
  'Proven templates from 100M+ real ads, brand intelligence, batch generation, every size, Shopify sync, and team workspaces — replacing the six-tool stack.'

type FeatureSection = {
  id: string
  heading: string
  paragraphs: string[]
  imageLeft: boolean
  alt?: string
  siteImageId: string
}

const SECTIONS: FeatureSection[] = [
  {
    id: 'templates',
    heading: 'Proven templates',
    siteImageId: 'A2',
    imageLeft: false,
    paragraphs: [
      "Every template in AdRender is a real ad that ran in the wild. Search by keyword, filter by niche, platform, how long it's been running, and target market.",
      "Runtime matters: an ad that's been live for 90 days is still live because it's working. Browse by brand to see everything a specific company is running right now, or search across the whole index for a format or angle.",
      'Static and video templates live in the same library — filter to either, or browse both together.',
      'You can see what your competitors are running. Search real ads by niche and platform, and use what you find to inspire your own image and video ads.',
    ],
  },
  {
    id: 'easy-to-use',
    heading: 'Easy to use',
    siteImageId: 'A3',
    imageLeft: true,
    alt: 'AdRender made simple: a few clicks to render ads',
    paragraphs: [
      "You only need to know how to click. No prompting is required, and you don't need to learn design or connect other tools to start. There's nothing technical to set up. You can still write your own prompt whenever you want to.",
      "It's self-explanatory by design, and the same three steps cover images and video. Add your brand — scan your URL, upload assets, or connect your Shopify store. Choose winning templates — Browse what's working, then render at scale. See your ads — Finished creatives, ready to launch.",
      "Most AI tools ask you to learn prompting, or to connect other AI tools (MCPs), before they're useful. AdRender doesn't. A few clicks is all it takes.",
    ],
  },
  {
    id: 'brands',
    heading: 'Brand intelligence',
    siteImageId: 'A4',
    imageLeft: false,
    paragraphs: [
      'Point AdRender at your website and it extracts your palette, logo, product imagery, tone of voice, and target audience automatically. Or upload brand documents directly for a deeper read.',
      "Set up multiple brands and switch between them — useful if you run several stores or handle multiple clients. Every render inherits the active brand, so consistency isn't something you manage manually.",
    ],
  },
  {
    id: 'generation',
    heading: 'Batch rendering',
    siteImageId: 'A5',
    imageLeft: true,
    paragraphs: [
      "Choose a proven format, choose your brand, hit render. AdRender produces a batch of on-brand static and video ads from that template — images in every size you selected, video matched to your reference's exact aspect ratio and length. No prompt engineering — the structure comes from the template, the styling comes from your brand, and the AI fills the gap.",
      "Behind the scenes, rendering has automatic fallbacks: if one rendering route is down or slow, it moves to the next automatically. You don't see the failure, you just get your ads.",
    ],
  },
  {
    id: 'sizes',
    heading: 'Every size, automatically',
    siteImageId: 'A6',
    imageLeft: false,
    paragraphs: [
      'One render produces every format you need, correctly sized. For static ads: Square (1080×1080), Portrait (1080×1350), Story/Reel (1080×1920), Landscape (1200×675), Feed Banner (1200×628), Pinterest Pin (1000×1500), Medium Rectangle (300×250), Half Page (300×600), Leaderboard (728×90), Wide Skyscraper (160×600), and Mobile Banner (320×50).',
      'Video renders at every resolution up to 4K, at lengths up to 30 seconds — with longer videos coming soon. Filter by platform — Facebook, Instagram, LinkedIn, Google, TikTok — or select all. For images, choose 1K, 2K, or 4K resolution, and Standard or Pro rendering quality. No resizing, no re-exporting, no cropping by hand.',
    ],
  },
  {
    id: 'library',
    heading: 'Your template library',
    siteImageId: 'A7',
    imageLeft: true,
    paragraphs: [
      'Save any template to your library with one click and organize saved templates into collections. Any ad you render can also become a template — so your own winners feed back into your workflow instead of being one-offs.',
      'Over time your library becomes a private swipe file of formats proven to work for your brand specifically.',
    ],
  },
  {
    id: 'shopify',
    heading: 'Shopify sync',
    siteImageId: 'A10',
    imageLeft: false,
    paragraphs: [
      "Connect your Shopify store once and your entire product catalog is available inside AdRender — names, descriptions, images, variants, and pricing. Add a product to your store and it's there next time you render.",
      'AdRender also reads your storefront to pull brand colors and logo automatically during setup. Available on every plan, including Free. Connect your store from the AdRender web app or the Shopify app.',
    ],
  },
  {
    id: 'playground',
    heading: 'Ad playground',
    siteImageId: 'A8',
    imageLeft: true,
    paragraphs: [
      'Not everything fits a template. Ad Playground gives you a blank canvas: upload your own template or reference video, start from scratch, or take an existing ad and push it somewhere new.',
      'Full manual control for the times you know exactly what you want, with the same brand intelligence applied — multi-size output for images, exact-match output for video.',
    ],
  },
  {
    id: 'workspaces',
    heading: 'Team workspaces',
    siteImageId: 'A9',
    imageLeft: false,
    paragraphs: [
      'Create separate workspaces for each client, brand, or project. Each has its own ad library, saved templates, and brands, so nothing bleeds between them.',
      "Invite teammates or clients into a workspace, and set an optional monthly token limit per workspace so one project can't consume everything. Your subscription covers all of them — no per-seat pricing, no per-workspace billing.",
    ],
  },
]

const INDEX = [
  { id: 'founder-story', label: 'Founder story' },
  ...SECTIONS.map((section) => ({ id: section.id, label: section.heading })),
  { id: 'stack', label: 'The stack' },
]

function FeatureBlock({ section, number }: { section: FeatureSection; number: string }) {
  return (
    <section id={section.id} className="site-section site-anchor">
      <div className="site-column">
        <div className={section.imageLeft ? 'site-feature-row is-flip' : 'site-feature-row'}>
          <div className="site-feature-copy">
            <p className="site-kicker">{number}</p>
            <h2 className="site-h3">{section.heading}</h2>
            <div className="site-body">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <SceneForAnchor anchor={section.id} size="wide" />
        </div>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/about" />
      <SplitHero
        lead="The system behind hundreds of ads."
        rest="In under 10 minutes."
        aside={<p className="site-lead">How AdRender replaces the stitched stack — and what each piece does.</p>}
      />
      <nav className="about-jump" aria-label="On this page">
        <div className="about-jump-row">
          {INDEX.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      <FounderStory extended id="founder-story" />
      {SECTIONS.map((section, index) => (
        <FeatureBlock key={section.id} section={section} number={String(index + 1).padStart(2, '0')} />
      ))}
      <CostTable />
      <ClosingCta
        lead="Stop stitching tools together."
        sentence="Your brand goes in. Hundreds of ads come out. Free to start, no card required."
        href={getSignupUrl()}
        label="Start free"
      />
    </>
  )
}
