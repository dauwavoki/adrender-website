import { ScrollReveal } from './ScrollReveal'
import { PageMeta } from './PageMeta'
import { Hero } from './Hero'
import { ProofRow } from './ProofRow'
import { HowItWorks } from './HowItWorks'
import { FounderStory } from './FounderStory'
import { Pricing } from './Pricing'
import { FaqSection } from './FaqSection'
import { ClosingCta } from './ClosingCta'
import { landingPath, CTA_NOTE, type LandingPageConfig } from '../data/landingPages'

type LandingPageProps = {
  config: LandingPageConfig
}

export function LandingPage({ config }: LandingPageProps) {
  const path = landingPath(config.slug)
  const cols =
    config.features.length === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2 lg:grid-cols-4'

  return (
    <>
      <PageMeta title={config.documentTitle} description={config.metaDescription} path={path} />
      <Hero
        headline={config.headline}
        subhead={config.subhead}
        ctaNote={CTA_NOTE}
        audienceLine={null}
      />
      <ProofRow stats={config.stats} />
      <HowItWorks />

      <section id="features" className="scroll-mt-28 border-t border-white/[0.06] px-4 py-24 md:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="text-section-label text-center text-xs font-semibold uppercase tracking-[0.2em]">
              Why AdRender
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              {config.featuresHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-zinc-500">{config.featuresSub}</p>
          </ScrollReveal>

          <div className={`mt-14 grid gap-5 ${cols}`}>
            {config.features.map((f) => {
              const Icon = f.icon
              return (
                <ScrollReveal key={f.heading}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#14141c] p-6">
                    <div className={`flex items-center gap-2 ${f.accent}`}>
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      <h3 className="font-heading text-base font-bold tracking-tight text-white">{f.heading}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{f.body}</p>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <FounderStory heading={config.founderHeading} paragraphs={config.founderParagraphs} />
      <Pricing />
      <FaqSection items={config.faq} intro={config.faqIntro} />
      <ClosingCta
        heading={config.ctaHeading}
        sub={config.ctaSub}
        ctaNote={CTA_NOTE}
      />
    </>
  )
}
