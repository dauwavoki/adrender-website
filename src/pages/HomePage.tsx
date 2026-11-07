import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { ProblemBottleneckFix } from '../components/ProblemBottleneckFix'
import { FeatureCards } from '../components/FeatureCards'
import { AdGallery } from '../components/AdGallery'
import { ShopifyBand } from '../components/ShopifyBand'
import { CostTable } from '../components/CostTable'
import { ProofRow } from '../components/ProofRow'
import { Pricing } from '../components/Pricing'
import { PageMeta } from '../components/PageMeta'
import { SectionErrorBoundary } from '../components/SectionErrorBoundary'
import { HOME_FAQ_ITEMS } from '../data/faq'
import { FaqTwoColumn } from '../components/site/FaqTwoColumn'
import { ClosingCta } from '../components/site/ClosingCta'
import { SecondaryLink, TextLink } from '../components/site/Buttons'
import { getSignupUrl } from '../lib/appUrl'

const TITLE = 'AdRender — AI Ad Generator | 100M+ Real Ad Templates'
const DESCRIPTION =
  'Generate hundreds of on-brand static and video ads in minutes from 100M+ real templates. Free to start, no card required.'

export function HomePage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/" />
      <SectionErrorBoundary>
        <Hero showcase />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ProofRow clearStage />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <HowItWorks />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ProblemBottleneckFix />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <FeatureCards />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <AdGallery />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ShopifyBand />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <CostTable variant="compact" />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Pricing />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <section className="site-section" id="faq">
          <div className="site-column">
            <FaqTwoColumn
              items={HOME_FAQ_ITEMS}
              lead="Questions,"
              rest="answered."
            />
            <div className="site-hero-actions">
              <TextLink href="/faq">See all FAQs</TextLink>
              <SecondaryLink href="https://app.adrender.app/signup">Chat with our in-app support</SecondaryLink>
            </div>
          </div>
        </section>
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ClosingCta
          lead="Stop stitching tools together."
          sentence="Your brand goes in. Hundreds of ads come out. Free to start, no card required."
          href={getSignupUrl()}
          label="Start free"
        />
      </SectionErrorBoundary>
    </>
  )
}
