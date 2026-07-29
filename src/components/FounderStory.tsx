import { PlaceholderImage } from './PlaceholderImage'
import { ScrollReveal } from './ScrollReveal'

const BODY_PARAS = [
  'Twenty years of graphics and marketing. I knew every tool — Figma, Photoshop, the ad libraries, the swipe file apps, the AI image generators, ChatGPT and Claude for copy. I had the workflow dialed.',
  'And it still took me three hours to produce twenty decent ads.',
  'Three hours of switching between six tabs. Finding a proven layout in one tool. Rebuilding it in another. Generating a visual somewhere else. Writing copy in a fourth. Resizing everything by hand for every placement. Then doing it all again tomorrow.',
  "The tools weren't bad. The stitching was the problem. Every one of them solved a slice and handed you the rest.",
  "So I built the thing I actually wanted: proven ad structures, brand intelligence, and AI generation in one place. Now 200 ads takes three minutes — and they don't look like a robot made them, because they're built on formats that are genuinely running and converting right now.",
  "That's AdRender. It's the tool I needed for twenty years and nobody built.",
]

type FounderStoryProps = {
  /** Extra paragraphs for /about (same core story). */
  extended?: boolean
  id?: string
}

export function FounderStory({ extended = false, id }: FounderStoryProps) {
  return (
    <section id={id} className="scroll-mt-28 px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <article className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#12121a] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)]">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-[2rem] lg:leading-tight">
                  I spent 20 years in design. Then I got tired of my own workflow.
                </h2>
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-400">
                  {BODY_PARAS.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {extended && (
                    <p>
                      This page walks through every piece of that system — templates, library, brand intelligence,
                      generation, playground, sizes, Shopify sync, and workspaces — so you can see exactly what
                      replaces the six-tab grind.
                    </p>
                  )}
                </div>
                <p className="mt-8 text-sm font-medium text-zinc-300">— Marc Lawrence, Founder</p>
              </div>
              <PlaceholderImage
                id="06"
                className="min-h-[16rem] border-t border-white/[0.06] md:min-h-full md:border-l md:border-t-0"
                priority
              />
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  )
}
