import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { ProblemBottleneckFix } from '../components/ProblemBottleneckFix'
import { FounderStory } from '../components/FounderStory'
import { FeatureCards } from '../components/FeatureCards'
import { AppPreviewSection } from '../components/AppPreview/AppPreviewSection'
import { CostTable } from '../components/CostTable'
import { ProofRow } from '../components/ProofRow'
import { Pricing } from '../components/Pricing'
import { FaqSection } from '../components/FaqSection'
import { ClosingCta } from '../components/ClosingCta'
import { PageMeta } from '../components/PageMeta'
import { SectionErrorBoundary } from '../components/SectionErrorBoundary'

const TITLE = 'AdRender — AI Ad Generator | 100M+ Real Ad Templates'
const DESCRIPTION =
  'Generate hundreds of on-brand static and video ads in minutes from 100M+ real templates. Free to start, no card required.'

export function HomePage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/" />
      <SectionErrorBoundary>
        <Hero />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <HowItWorks />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ProblemBottleneckFix />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <FounderStory />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <FeatureCards />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <AppPreviewSection />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <CostTable />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ProofRow />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Pricing />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <FaqSection />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <ClosingCta />
      </SectionErrorBoundary>
    </>
  )
}
