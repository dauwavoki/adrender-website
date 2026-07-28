import { useMemo, useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import type { Billing, Tier } from '../data/pricing'
import { tiers } from '../data/pricing'
import { getAppUrl } from '../lib/appUrl'

function PriceBlock({ billing, monthly, annual }: { billing: Billing; monthly: number; annual: number | null }) {
  const isMonthly = billing === 'monthly' || annual === null
  const display = isMonthly ? (monthly === 0 ? '$0' : `$${monthly}`) : `$${annual!.toLocaleString('en-US')}`
  const suffix = isMonthly ? '/mo' : '/yr'

  return (
    <div className="flex items-baseline gap-1">
      <span key={`${billing}-${display}`} className="price-pop font-heading text-4xl font-bold tracking-tight text-white">
        {display}
      </span>
      <span key={`${billing}-suf`} className="price-pop text-sm text-zinc-500">
        {suffix}
      </span>
    </div>
  )
}

function FeatureList({ tier }: { tier: Tier }) {
  return (
    <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-white/[0.06] pt-6 text-sm text-zinc-400">
      {tier.features.map((feature) => (
        <li key={feature} className="font-medium text-zinc-200">
          {feature}
        </li>
      ))}
    </ul>
  )
}

function TierCard({ tier, billing, appUrl }: { tier: Tier; billing: Billing; appUrl: string }) {
  const inner = (
    <>
      {tier.popular && (
        <span className="badge-gradient absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
          Most Popular
        </span>
      )}
      <h3 className="font-heading text-lg font-bold text-white">{tier.name}</h3>
      {tier.tagline && <p className="mt-1 text-sm text-zinc-500">{tier.tagline}</p>}
      <div className="mt-4 min-h-[3.5rem]">
        {tier.annual === null && billing === 'annual' ? (
          <p className="font-heading text-3xl font-bold text-zinc-500">—</p>
        ) : (
          <PriceBlock billing={billing} monthly={tier.monthly} annual={tier.annual} />
        )}
      </div>
      <FeatureList tier={tier} />
      <a
        href={appUrl}
        className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold ${
          tier.popular ? 'btn-cta' : 'btn-outline-accent'
        }`}
      >
        Start Free
      </a>
    </>
  )

  if (tier.popular) {
    return (
      <div className="pricing-popular-ring h-full">
        <article className="relative flex h-full flex-col rounded-[15px] bg-[#14141f] p-6 pt-8">{inner}</article>
      </div>
    )
  }

  return <article className="relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[#12121a] p-6">{inner}</article>
}

function FreeTierBanner({ tier, billing, appUrl }: { tier: Tier; billing: Billing; appUrl: string }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-dashed border-[color:color-mix(in_srgb,var(--accent-cyan)_35%,transparent)] bg-gradient-to-br from-[#0e1a22] via-[#12121a] to-[#16121f] px-6 py-8 sm:px-10">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.18), transparent 70%)' }}
        aria-hidden
      />
      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-cyan)]">Free plan</p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {tier.tagline ?? 'Try it out for free'}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            No card required. Spin up ads and see if AdRender fits your workflow.
          </p>
          <div className="mt-5">
            {billing === 'annual' ? (
              <p className="font-heading text-3xl font-bold text-zinc-500">—</p>
            ) : (
              <PriceBlock billing={billing} monthly={tier.monthly} annual={tier.annual} />
            )}
          </div>
          <a
            href={appUrl}
            className="btn-cta mt-6 inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold"
          >
            Start Free
          </a>
        </div>
        <ul className="grid w-full max-w-sm grid-cols-1 gap-y-3 text-sm sm:grid-cols-2 sm:gap-x-8">
          {tier.features.map((feature) => (
            <li key={feature} className="border-b border-white/[0.06] pb-2 font-medium text-zinc-200">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const appUrl = useMemo(() => getAppUrl(), [])
  const freeTier = tiers.filter((t) => t.id === 'free')
  const paidTiers = tiers.filter((t) => t.id !== 'free')

  return (
    <section id="pricing" className="scroll-mt-28 px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-section-label text-center text-xs font-semibold uppercase tracking-[0.2em]">Pricing</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Simple pricing. Serious output.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-zinc-500">Switch billing anytime.</p>

          <div className="mx-auto mt-10 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={billing === 'annual'}
              onClick={() => setBilling((b) => (b === 'monthly' ? 'annual' : 'monthly'))}
              className="relative h-9 w-16 rounded-full border border-white/[0.1] bg-[#12121a] transition hover:border-[color:color-mix(in_srgb,var(--accent-cyan)_35%,transparent)]"
            >
              <span
                className={`toggle-thumb-gradient absolute top-1 left-1 h-7 w-7 rounded-full shadow transition-transform duration-300 ease-out ${
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

        <div className="mt-14 space-y-6">
          {freeTier.map((tier) => (
            <ScrollReveal key={tier.id}>
              <FreeTierBanner tier={tier} billing={billing} appUrl={appUrl} />
            </ScrollReveal>
          ))}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {paidTiers.map((tier) => (
              <ScrollReveal key={tier.id}>
                <TierCard tier={tier} billing={billing} appUrl={appUrl} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
