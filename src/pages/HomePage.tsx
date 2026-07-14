import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { SocialProof } from '../components/SocialProof'
import { Pricing } from '../components/Pricing'
import { AboutSection } from '../components/AboutSection'
import { WaitlistCTA } from '../components/WaitlistCTA'
import { PageMeta } from '../components/PageMeta'

const TITLE = 'AdRender — AI Ad Generator for Shopify | 100M+ Real Templates'
const DESCRIPTION =
  'Generate hundreds of on-brand static ads in minutes. Connect your Shopify store, browse real winning ad templates, and let AI build your ads automatically. No designer needed. Free to start.'

export function HomePage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/" />
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <AboutSection />
      <WaitlistCTA />
    </>
  )
}
