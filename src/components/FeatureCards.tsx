import { SitePlaceholder } from './site/SitePlaceholder'
import { ImageCard } from './site/ImageCard'
import { SplitTitle } from './site/SplitTitle'

type FeatureCard = {
  anchor: string
  heading: string
  sub: string
  body: string
  imageId: string
}

function withStop(text: string) {
  const trimmed = text.trim()
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

const FEATURES: FeatureCard[] = [
  {
    anchor: 'templates',
    heading: 'Proven templates',
    sub: '100M+ real ads. Searchable.',
    body: 'Not stock layouts — actual ads running right now, filterable by niche, platform, runtime, and market. Static and video, all searchable in one library.',
    imageId: 'F1',
  },
  {
    anchor: 'easy-to-use',
    heading: 'Easy to use',
    sub: 'No setup. Just three steps.',
    body: "No prompting and no design skills needed. Nothing technical to set up and nothing to connect. It's self-explanatory — you click through three steps and render images and video.",
    imageId: 'F2',
  },
  {
    anchor: 'brands',
    heading: 'Brand intelligence',
    sub: 'Learns your brand once. Applies it to everything.',
    body: 'Drop in your URL or upload brand docs. AdRender pulls your colors, logo, voice, and audience — then every ad sounds like you, not like a template.',
    imageId: 'F3',
  },
  {
    anchor: 'generation',
    heading: 'Batch rendering',
    sub: 'Hundreds of ads. One click.',
    body: 'Pick a proven format, hit render, get a batch. On-brand, ready to run, no prompt engineering required. The step that used to take three hours now ships hundreds of ads in under 10 minutes.',
    imageId: 'F4',
  },
  {
    anchor: 'sizes',
    heading: 'Every size, automatically',
    sub: '11 formats. Every platform. Every video length up to 30 seconds. One render.',
    body: 'For images, choose 1K, 2K, or 4K resolution, and Standard or Pro rendering quality. Video renders up to 30 seconds today, with longer coming soon. No resizing, no re-exporting, no cropping by hand.',
    imageId: 'F5',
  },
  {
    anchor: 'library',
    heading: 'Your template library',
    sub: 'Save what works. Reuse it forever.',
    body: 'Bookmark any template you like, and turn your own best-performing ads into reusable templates. Your winning formats become a library you build on instead of rebuilding.',
    imageId: 'F6',
  },
  {
    anchor: 'playground',
    heading: 'Ad playground',
    sub: 'Your canvas, not a template.',
    body: "Upload your own templates or reference video, start from a blank slate, or riff on something halfway. Full creative control when you want it — for static or video, for the times a template isn't the answer.",
    imageId: 'F7',
  },
  {
    anchor: 'workspaces',
    heading: 'Team workspaces',
    sub: 'Built for agencies and teams.',
    body: 'Separate workspaces per client or project, shared libraries, per-workspace limits. One subscription covers all of them.',
    imageId: 'F8',
  },
]

export function FeatureCards() {
  return (
    <section id="features" className="site-section scroll-mt-28">
      <div className="site-column">
        <SplitTitle
          as="h2"
          lead="A creative production system."
          rest="Not a collection of tools."
        />
        <div className="site-image-grid cols-4" style={{ marginTop: 36 }}>
          {FEATURES.map((feature) => (
            <ImageCard
              key={feature.anchor}
              media={<SitePlaceholder id={feature.imageId} />}
              title={feature.heading}
              sub={withStop(feature.sub)}
              body={withStop(feature.body)}
              href={`/about#${feature.anchor}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
