import { SitePlaceholder } from './site/SitePlaceholder'

const BODY_PARAS = [
  'Twenty years of graphics and marketing. I knew every tool — Figma, Photoshop, the ad libraries, the swipe file apps, the AI image generators, ChatGPT and Claude for copy. I had the workflow dialed.',
  'And it still took me three hours to produce twenty decent ads.',
  'Three hours of switching between six tabs. Finding a proven layout in one tool. Rebuilding it in another. Generating a visual somewhere else. Writing copy in a fourth. Resizing everything by hand for every placement. Then doing it all again tomorrow.',
  "Video was worse. Foreplay for ad research, CapCut, Premiere Pro, an AI video generator for the motion I couldn't shoot myself, a separate app for voice and sound — and more, since half of them do the same thing and I'd still end up needing another one. Eight, nine tools running at once for a handful of finished clips, and video takes real hours per piece, not minutes.",
  "The tools weren't bad. The stitching was the problem. Every one of them solved a slice and handed you the rest.",
  "So I built the thing I actually wanted: proven ad structures, brand intelligence, and AI rendering in one place. Now hundreds of ads take under 10 minutes — and they don't look like a robot made them, because they're built on formats that are genuinely running and converting right now.",
  "That's AdRender. It's the tool I needed for twenty years and nobody built.",
]

type FounderStoryProps = {
  /** Extra paragraphs for /about (same core story). */
  extended?: boolean
  id?: string
  heading?: string
  paragraphs?: string[]
}

export function FounderStory({
  extended = false,
  id,
  heading = 'I spent 20 years in design. Then I got tired of my own workflow.',
  paragraphs = BODY_PARAS,
}: FounderStoryProps) {
  return (
    <section id={id} className="site-section site-anchor">
      <div className="site-column">
        <div className="site-feature-row is-flip">
          <div className="site-feature-copy">
            <blockquote className="site-quote">{heading}</blockquote>
            <div className="site-body">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {extended ? (
                <>
                  <p>
                    I also noticed that most people had to learn prompting and connecting AI tools (MCPs) before
                    they got anything useful out of AI. So I made AdRender super simple: a few clicks, and you
                    don&apos;t have to learn either.
                  </p>
                  <p>
                    This page walks through every piece of that system — templates, easy to use, brand intelligence,
                    batch rendering, sizes, library, Shopify sync, playground, and workspaces — so you can see
                    exactly what replaces the six-tab grind.
                  </p>
                </>
              ) : null}
            </div>
            <p className="site-meta">Marc Lawrence, Founder</p>
          </div>
          <StageImage />
        </div>
      </div>
    </section>
  )
}

function StageImage() {
  return (
    <div className="site-stage stage-fill site-stage-pad-md">
      <SitePlaceholder id="A1" />
    </div>
  )
}
