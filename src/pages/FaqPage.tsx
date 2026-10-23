import { FaqSection } from '../components/FaqSection'
import { PageMeta } from '../components/PageMeta'
import { faqPageJsonLd } from '../data/faq'

const TITLE = 'AdRender FAQ — Tokens, Pricing, Video Ads & Shopify'
const DESCRIPTION =
  'Answers about AdRender tokens, pricing, video ads, Shopify, and getting started. Monthly tokens, top-ups, refunds, and what every plan includes.'

export function FaqPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/faq" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqPageJsonLd() }} />
      <FaqSection headingAs="h1" />
    </>
  )
}
