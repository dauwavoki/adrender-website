import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { ProblemBottleneckFix } from '../components/ProblemBottleneckFix'
import { FeatureCards } from '../components/FeatureCards'
import { CostTable } from '../components/CostTable'
import { ProofRow } from '../components/ProofRow'
import { Pricing } from '../components/Pricing'
import { FaqSection } from '../components/FaqSection'
import { ClosingCta } from '../components/ClosingCta'
import { PageMeta } from '../components/PageMeta'
import { SectionErrorBoundary } from '../components/SectionErrorBoundary'
import { HOME_FAQ_ITEMS } from '../data/faq'

function HomeFaqFooter() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-3">
        <Link
          to="/faq"
          className="btn-cta inline-flex w-full items-center justify-center rounded-xl px-8 py-3.5 text-base font-semibold sm:w-auto"
        >
          See all FAQs →
        </Link>
        <a
          href="https://app.adrender.app/signup"
          className="btn-outline-accent inline-flex w-full items-center justify-center rounded-xl px-8 py-3.5 text-base font-semibold sm:w-auto"
        >
          Chat with our in-app support
        </a>
      </div>
      <Link
        to="/about#founder-story"
        className="mt-6 text-center text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]"
      >
        Why I built AdRender →
      </Link>
    </div>
  )
}

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
        <HowItWorks />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ProblemBottleneckFix />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <FeatureCards />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <CostTable variant="compact" />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ProofRow />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Pricing />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <FaqSection leadingItems={HOME_FAQ_ITEMS} groups={[]} after={<HomeFaqFooter />} />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ClosingCta plain />
      </SectionErrorBoundary>
    </>
  )
}
