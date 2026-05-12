import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import type { Billing } from '../data/pricing'
import { formatTokens, tiers } from '../data/pricing'

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

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <section id="pricing" className="scroll-mt-28 px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#6366f1]">Pricing</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Simple pricing. Serious output.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-zinc-500">Switch billing anytime. Beta pricing honored for your first six months.</p>

          <div className="mx-auto mt-10 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={billing === 'annual'}
              onClick={() => setBilling((b) => (b === 'monthly' ? 'annual' : 'monthly'))}
              className="relative h-9 w-16 rounded-full border border-white/[0.1] bg-[#12121a] transition hover:border-[#6366f1]/30"
            >
              <span
                className={`absolute top-1 left-1 h-7 w-7 rounded-full bg-[#6366f1] shadow transition-transform duration-300 ease-out ${
                  billing === 'annual' ? 'translate-x-7' : ''
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billing === 'annual' ? 'text-white' : 'text-zinc-500'}`}>
              Annual <span className="text-[#6366f1]">(20% off)</span>
            </span>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tiers.map((tier) => (
            <ScrollReveal key={tier.id}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                  tier.popular
                    ? 'border-[#6366f1]/50 bg-[#14141f] shadow-[0_0_0_1px_rgba(99,102,241,0.2)]'
                    : 'border-white/[0.06] bg-[#12121a]'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#6366f1] px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-bold text-white">{tier.name}</h3>
                <div className="mt-4 min-h-[3.5rem]">
                  {tier.annual === null && billing === 'annual' ? (
                    <p className="font-heading text-3xl font-bold text-zinc-500">—</p>
                  ) : (
                    <PriceBlock billing={billing} monthly={tier.monthly} annual={tier.annual} />
                  )}
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-white/[0.06] pt-6 text-sm text-zinc-400">
                  <li className="flex justify-between gap-2">
                    <span>Tokens</span>
                    <span className="font-medium text-zinc-200">{formatTokens(tier.tokens)}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Brands</span>
                    <span className="font-medium text-zinc-200">{tier.brands}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Seats</span>
                    <span className="font-medium text-zinc-200">{tier.seats}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Concurrent</span>
                    <span className="font-medium text-zinc-200">{tier.concurrent}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span>Shopify sync</span>
                    <span className="font-medium text-zinc-200">{tier.shopify ? 'Yes' : 'No'}</span>
                  </li>
                </ul>
                <a
                  href="/#waitlist"
                  className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition ${
                    tier.popular
                      ? 'bg-[#6366f1] text-white hover:bg-[#818cf8]'
                      : 'border border-white/[0.1] text-white hover:border-[#6366f1]/40 hover:bg-white/[0.03]'
                  }`}
                >
                  Get Early Access
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
