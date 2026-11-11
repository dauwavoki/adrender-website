import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Check } from '@phosphor-icons/react'
import type { Billing, Tier } from '../data/pricing'
import { tiers } from '../data/pricing'
import { getSignupUrl } from '../lib/appUrl'
import { TokenBuys } from './TokenBuys'
import { FAQ_TOKEN_ROLLOVER_ID } from '../data/faq'
import { SplitTitle } from './site/SplitTitle'
import { PrimaryLink, SecondaryLink, TextLink } from './site/Buttons'
import { cx } from './site/cx'

/** Landing pages still include the rollover FAQ. The homepage links to /faq. */
function tokenRolloverHref(pathname: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (path.startsWith('/lp/')) return `#${FAQ_TOKEN_ROLLOVER_ID}`
  return `/faq#${FAQ_TOKEN_ROLLOVER_ID}`
}

function PriceBlock({ billing, monthly, annual }: { billing: Billing; monthly: number; annual: number | null }) {
  const isMonthly = billing === 'monthly' || annual === null
  const display = isMonthly ? (monthly === 0 ? '$0' : `$${monthly}`) : `$${annual!.toLocaleString('en-US')}`
  const suffix = isMonthly ? '/mo' : '/yr'

  return (
    <p className="site-plan-price">
      <span className="num">{display}</span>
      <span className="site-plan-suffix">{suffix}</span>
    </p>
  )
}

function TierCard({ tier, billing, signupUrl }: { tier: Tier; billing: Billing; signupUrl: string }) {
  return (
    <article className={tier.popular ? 'site-plan is-popular' : 'site-plan'}>
      <div className="site-plan-head">
        <h3>{tier.name}</h3>
        {tier.popular ? <span className="site-badge">Most popular</span> : null}
      </div>
      {tier.tagline ? <p className="site-meta">{tier.tagline}</p> : null}
      {tier.id === 'free' ? (
        <p className="site-meta">No card required. Spin up ads and see if AdRender fits your workflow.</p>
      ) : null}
      <div className="site-plan-price-slot">
        {tier.annual === null && billing === 'annual' ? (
          <p className="site-plan-price">—</p>
        ) : (
          <PriceBlock billing={billing} monthly={tier.monthly} annual={tier.annual} />
        )}
      </div>
      <ul>
        {tier.outputLine ? (
          <li>
            <Check size={16} aria-hidden />
            <span>{tier.outputLine}</span>
          </li>
        ) : null}
        {tier.features.map((feature) => (
          <li key={feature}>
            <Check size={16} aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="site-plan-cta">
        {tier.popular ? (
          <PrimaryLink href={signupUrl} className="site-btn-block">
            Start free
          </PrimaryLink>
        ) : (
          <SecondaryLink href={signupUrl} className="site-btn-block">
            Start free
          </SecondaryLink>
        )}
      </div>
    </article>
  )
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const signupUrl = getSignupUrl()
  const { pathname } = useLocation()
  const rolloverHref = tokenRolloverHref(pathname)

  return (
    <section id="pricing" className="site-section scroll-mt-28">
      <div className="site-column">
        <SplitTitle as="h2" lead="Simple pricing." rest="Serious output." />
        <p className="site-lead" style={{ marginTop: 12 }}>
          Choose monthly or annual.
        </p>
        <div className="site-billing">
          <div className="site-segment is-inline" role="radiogroup" aria-label="Billing period">
            <span className={cx('site-segment-thumb', billing === 'annual' && 'is-annual')} aria-hidden="true" />
            <button
              type="button"
              role="radio"
              aria-checked={billing === 'monthly'}
              aria-pressed={billing === 'monthly'}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={billing === 'annual'}
              aria-pressed={billing === 'annual'}
              onClick={() => setBilling('annual')}
            >
              Annual
            </button>
          </div>
          <span className="site-badge">20% off</span>
          <TextLink href={rolloverHref}>+ 2 months token carry-over</TextLink>
        </div>
        <div className="site-plan-grid">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} billing={billing} signupUrl={signupUrl} />
          ))}
        </div>
        <TokenBuys />
      </div>
    </section>
  )
}
