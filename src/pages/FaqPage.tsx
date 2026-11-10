import { PageMeta } from '../components/PageMeta'
import { FAQ_GROUPS, faqPageJsonLd } from '../data/faq'
import { SplitHero } from '../components/site/SplitHero'
import { FaqTwoColumn } from '../components/site/FaqTwoColumn'
import { ClosingCta } from '../components/site/ClosingCta'
import { getSignupUrl } from '../lib/appUrl'

const TITLE = 'AdRender FAQ — Tokens, Pricing, Video Ads & Shopify'
const DESCRIPTION =
  'Answers about AdRender tokens, pricing, video ads, Shopify, and getting started. Monthly tokens, top-ups, refunds, and what every plan includes.'

export function FaqPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/faq" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqPageJsonLd() }} />
      <SplitHero
        lead="Questions, answered."
        aside={
          <p className="site-lead">Tokens, canceling, and what&apos;s included — without the fine-print fog.</p>
        }
      />
      {FAQ_GROUPS.map((group) => (
        <section key={group.label} className="site-section">
          <div className="site-column">
            <FaqTwoColumn items={group.items} title={group.label} />
          </div>
        </section>
      ))}
      <ClosingCta
        lead="Stop stitching tools together."
        sentence="Your brand goes in. Hundreds of ads come out. Free to start, no card required."
        href={getSignupUrl()}
        label="Start free"
      />
    </>
  )
}
