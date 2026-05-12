import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { SocialProof } from '../components/SocialProof'
import { Pricing } from '../components/Pricing'
import { AboutSection } from '../components/AboutSection'
import { WaitlistCTA } from '../components/WaitlistCTA'

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <AboutSection />
      <WaitlistCTA />
    </>
  )
}
