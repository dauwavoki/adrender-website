import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import type { Billing, Tier } from '../data/pricing'
import { tiers } from '../data/pricing'
import { getSignupUrl } from '../lib/appUrl'
import { TokenBuys } from './TokenBuys'

const TIER_ACCENTS: Record<string, { from: string; to: string }> = {
  free: { from: '#34d399', to: '#00e5ff' },
  solo: { from: '#00e5ff', to: '#2f80ff' },
  growth: { from: '#7b4fd4', to: '#e23d9b' },
  pro: { from: '#f5b031', to: '#ff6b2b' },
  scale: { from: '#e23d9b', to: '#f5b031' },
}

function accentStyle(accent: { from: string; to: string }): CSSProperties {
  return {
    '--accent-from': accent.from,
    '--accent-to': accent.to,
  } as CSSProperties
}

function splitAllowance(features: string[]) {
  const [first, ...rest] = features
  const match = first?.match(/^([\d,]+) tokens\/mo$/)
  if (!match) return { allowance: null as string | null, features }
  return { allowance: match[1], features: rest }
}

function PriceBlock({ billing, monthly, annual }: { billing: Billing; monthly: number; annual: number | null }) {
  const isMonthly = billing === 'monthly' || annual === null
  const display = isMonthly ? (monthly === 0 ? '$0' : `$${monthly}`) : `$${annual!.toLocaleString('en-US')}`
  const suffix = isMonthly ? '/mo' : '/yr'

  return (
    <div className="flex items-baseline gap-1">
      <span
        key={`${billing}-${display}`}
        className="price-pop accent-card-gradient font-heading text-4xl font-bold tracking-tight tabular-nums"
      >
        {display}
      </span>
      <span key={`${billing}-suf`} className="price-pop text-sm text-zinc-500">
        {suffix}
      </span>
    </div>
  )
}

function FeatureList({ features, outputLine }: { features: string[]; outputLine?: string }) {
  const rows = [
    ...(outputLine ? [{ text: outputLine, accent: true }] : []),
    ...features.map((text) => ({ text, accent: false })),
  ]

  return (
    <ul className="mt-6 flex flex-col">
      {rows.map((row) => (
        <li
          key={row.text}
          className="relative border-b border-white/[0.06] py-3 pl-6 text-sm font-medium text-zinc-200 last:border-b-0"
        >
          <Check
            className="absolute top-3.5 left-0 h-4 w-4 text-[var(--accent-from)]"
            aria-hidden="true"
          />
          <span className={row.accent ? 'text-[var(--accent-from)]' : undefined}>{row.text}</span>
        </li>
      ))}
    </ul>
  )
}

function TierCard({ tier, billing, signupUrl }: { tier: Tier; billing: Billing; signupUrl: string }) {
  const accent = TIER_ACCENTS[tier.id] ?? TIER_ACCENTS.solo
  const { allowance, features } = splitAllowance(tier.features)

  return (
    <article
      className={`accent-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.06] ${
        tier.popular ? 'plan-card--popular' : ''
      }`}
      style={accentStyle(accent)}
    >
      <span className="accent-card-edge" aria-hidden="true" />
      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <a
          href={signupUrl}
          className="accent-card-link flex min-h-0 flex-1 flex-col"
          aria-label={`${tier.name}: Start Free`}
        >
          <div className="accent-card-copy flex flex-1 flex-col">
          <h3 className="font-heading text-2xl font-bold tracking-tight">
            <span className="accent-card-gradient">{tier.name}</span>
          </h3>
          {tier.id === 'free' ? (
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-from)]">
              <span>Free plan</span>
            </p>
          ) : null}
          {tier.tagline ? (
            <p className="mt-1 text-sm text-zinc-500">
              <span>{tier.tagline}</span>
            </p>
          ) : null}
          {tier.id === 'free' ? (
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              <span>No card required. Spin up ads and see if AdRender fits your workflow.</span>
            </p>
          ) : null}

          <div className="mt-4 flex min-h-6 items-center">
            {tier.popular ? <span className="plan-popular-badge">Most Popular</span> : null}
          </div>

          <div className="min-h-[3.25rem]">
            {tier.annual === null && billing === 'annual' ? (
              <p className="font-heading text-4xl font-bold text-zinc-500">
                <span>—</span>
              </p>
            ) : (
              <PriceBlock billing={billing} monthly={tier.monthly} annual={tier.annual} />
            )}
          </div>

          {allowance ? (
            <div className="mt-5">
              <p className="font-heading text-4xl font-bold leading-none tracking-tight sm:text-5xl">
                <span className="accent-card-gradient tabular-nums">{allowance}</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                <span>tokens / month</span>
              </p>
            </div>
          ) : null}

            <FeatureList features={features} outputLine={tier.outputLine} />
          </div>
          <span
            className={`accent-card-link-label mt-6 block rounded-xl py-3 text-center text-sm font-semibold ${
              tier.popular ? 'btn-cta' : 'btn-outline-accent'
            }`}
          >
            Start Free
          </span>
        </a>
      </div>
    </article>
  )
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const signupUrl = getSignupUrl()

  return (
    <section id="pricing" className="scroll-mt-28 px-4 py-24 md:py-28">
      <div className="pricing-shell">
        <ScrollReveal>
          <p className="text-section-label text-center text-xs font-semibold uppercase tracking-[0.2em]">Pricing</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Simple pricing. Serious output.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-zinc-500">Choose monthly or annual.</p>

          <div className="mx-auto mt-10 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={billing === 'annual'}
              onClick={() => setBilling((b) => (b === 'monthly' ? 'annual' : 'monthly'))}
              className="relative h-9 w-16 rounded-full border border-white/[0.1] bg-[#12121a] transition motion-reduce:transition-none hover:border-[color:color-mix(in_srgb,var(--accent-cyan)_35%,transparent)]"
            >
              <span
                className={`toggle-thumb-gradient absolute top-1 left-1 h-7 w-7 rounded-full shadow transition-transform duration-300 ease-out motion-reduce:transition-none ${
                  billing === 'annual' ? 'translate-x-7' : ''
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billing === 'annual' ? 'text-white' : 'text-zinc-500'}`}>
              Annual{' '}
              <span className="text-gradient-accent font-semibold">(20% off)</span>
            </span>
          </div>
        </ScrollReveal>

        <div className="plan-grid mt-14">
          {tiers.map((tier) => (
            <ScrollReveal key={tier.id} className="h-full min-w-0">
              <TierCard tier={tier} billing={billing} signupUrl={signupUrl} />
            </ScrollReveal>
          ))}
        </div>

        <TokenBuys />
      </div>
    </section>
  )
}
