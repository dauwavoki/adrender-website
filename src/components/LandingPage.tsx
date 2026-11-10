import { PageMeta } from './PageMeta'
import { Hero } from './Hero'
import { ProofRow } from './ProofRow'
import { HowItWorks } from './HowItWorks'
import { FounderStory } from './FounderStory'
import { Pricing } from './Pricing'
import { landingPath, CTA_NOTE, type LandingPageConfig } from '../data/landingPages'
import { landingSharedFaqGroups } from '../data/faq'
import { SplitTitle } from './site/SplitTitle'
import { FaqTwoColumn } from './site/FaqTwoColumn'
import { ClosingCta } from './site/ClosingCta'
import { IconTile, toneAt } from './site/IconTile'
import { getSignupUrl } from '../lib/appUrl'

type LandingPageProps = {
  config: LandingPageConfig
}

export function LandingPage({ config }: LandingPageProps) {
  const path = landingPath(config.slug)
  const groups = landingSharedFaqGroups(new Set(config.faq.map((item) => item.q)))

  return (
    <>
      <PageMeta title={config.documentTitle} description={config.metaDescription} path={path} />
      <Hero headline={config.headline} subhead={config.subhead} ctaNote={CTA_NOTE} showcase />
      <ProofRow stats={config.stats} clearStage />
      <HowItWorks />

      <section id="features" className="site-section scroll-mt-28">
        <div className="site-column">
          <SplitTitle as="h2" lead={config.featuresHeading} />
          <p className="site-lead" style={{ marginTop: 12, maxWidth: 640 }}>
            {config.featuresSub}
          </p>
          <div className="site-card-grid cols-3" style={{ marginTop: 28 }}>
            {config.features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <article key={feature.heading} className="site-plan">
                  <IconTile tone={toneAt(index)} size={32}>
                    <Icon className="h-4 w-4" />
                  </IconTile>
                  <h3>{feature.heading}</h3>
                  <p className="site-body">{feature.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <FounderStory heading={config.founderHeading} paragraphs={config.founderParagraphs} />
      <Pricing />

      <section className="site-section" id="faq">
        <div className="site-column">
          <FaqTwoColumn items={config.faq} title="Questions" />
          {config.faqIntro ? <p className="site-meta" style={{ marginTop: 16 }}>{config.faqIntro}</p> : null}
          {groups.map((group) => (
            <div key={group.label} style={{ marginTop: 48 }}>
              <FaqTwoColumn items={group.items} title={group.label} />
            </div>
          ))}
        </div>
      </section>

      <ClosingCta
        lead={config.ctaHeading}
        sentence={config.ctaSub}
        note={CTA_NOTE}
        href={getSignupUrl()}
        label="Start free"
      />
    </>
  )
}
