import { SceneForAnchor } from './scenes'
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
    sub: '100M+ real ads, searchable by niche, platform and runtime.',
    body: "Not stock layouts — actual ads running right now. Filter by niche, platform, runtime and market, and search static and video ads in one library. See what's working before you render.",
    imageId: 'F1',
  },
  {
    anchor: 'easy-to-use',
    heading: 'Easy to use',
    sub: 'No setup and no prompting. Three steps from brand to ads.',
    body: "No design skills and nothing technical to connect. Add your brand, choose a template and render. The same three clicks make image and video ads. It's self-explanatory from the first visit.",
    imageId: 'F2',
  },
  {
    anchor: 'brands',
    heading: 'Brand intelligence',
    sub: 'Learns your brand once and applies it to every ad.',
    body: 'Drop in your URL or upload brand documents. AdRender pulls your colors, logo, voice and audience, then applies them to every ad, so it sounds like you, not like a template.',
    imageId: 'F3',
  },
  {
    anchor: 'generation',
    heading: 'Batch rendering',
    sub: 'Hundreds of on-brand ads from one template, in one click.',
    body: 'Pick a proven format, choose your brand and hit render. On-brand ads ready to run, with no prompt engineering. What used to take three hours now ships hundreds of ads in under 10 minutes.',
    imageId: 'F4',
  },
  {
    anchor: 'sizes',
    heading: 'Every size, ready.',
    sub: '11 image formats and video up to 30 seconds, in one render.',
    body: 'Choose 1K, 2K or 4K and Standard or Pro quality for images. Video renders at up to 30 seconds, with longer coming soon. No resizing, no re-exporting and no cropping by hand.',
    imageId: 'F5',
  },
  {
    anchor: 'library',
    heading: 'Your template library',
    sub: 'Save the ads that work and reuse them as templates forever.',
    body: 'Bookmark any template you like and organize it into collections. Turn your own best-performing ads into templates too, so your winning formats become a library you build on.',
    imageId: 'F6',
  },
  {
    anchor: 'playground',
    heading: 'Ad playground',
    sub: "Your own canvas for the times a template isn't the answer.",
    body: 'Upload your own template or reference video, start from a blank slate, or riff on an existing ad. Full creative control for static and video, with your brand applied throughout.',
    imageId: 'F7',
  },
  {
    anchor: 'workspaces',
    heading: 'Team workspaces',
    sub: 'Separate workspaces for every client, brand or project.',
    body: 'Each workspace has its own library, saved templates and brands. Invite teammates or clients, set an optional monthly token limit per workspace, and one subscription covers them all.',
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
              media={<SceneForAnchor anchor={feature.anchor} size="card" />}
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
