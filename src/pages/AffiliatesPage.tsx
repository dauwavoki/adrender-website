import {
  ArrowRight,
  BarChart3,
  Check,
  Gift,
  Infinity,
  Link2,
  MessageCircle,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { PageMeta } from '../components/PageMeta'

const APP_URL = 'https://app.adrender.app'
const SITE_URL = 'https://adrender.app'

const TITLE = 'AdRender Affiliate Program — Earn 50% Commission'
const DESCRIPTION =
  'Join the AdRender affiliate program. Sign up before August 31, 2026 for 50% of profit on every referred subscriber. Real-time dashboard, biweekly payouts, and no earnings cap.'

const PERKS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Infinity,
    title: 'No earnings cap',
    body: 'No limit on referrals or how much you can earn.',
  },
  {
    icon: BarChart3,
    title: 'Real-time dashboard',
    body: 'Track clicks, signups, and earnings as they happen.',
  },
  {
    icon: MessageCircle,
    title: 'Private Discord',
    body: 'Access a private community built for AdRender affiliates.',
  },
  {
    icon: Gift,
    title: 'Leaderboard prizes',
    body: 'Top performers earn prizes on top of standard commission.',
  },
  {
    icon: Link2,
    title: 'Simple tracking',
    body: 'Share your unique referral code or link — that’s it.',
  },
  {
    icon: Video,
    title: 'Make your promos with AdRender',
    body: 'Use the platform itself to generate UGC-style videos promoting your link — no separate video tool, no extra cost.',
  },
]

const STEPS = [
  {
    title: 'Create an account',
    body: (
      <>
        Go to{' '}
        <a href={APP_URL} className="font-medium text-[var(--accent-cyan)] underline-offset-2 hover:underline">
          {APP_URL}
        </a>{' '}
        (or{' '}
        <a href={SITE_URL} className="font-medium text-[var(--accent-cyan)] underline-offset-2 hover:underline">
          {SITE_URL}
        </a>
        ) and create an account.
      </>
    ),
  },
  {
    title: 'Apply in your profile',
    body: 'Go to Profile → Affiliates and submit your application.',
  },
  {
    title: 'Get approved and start sharing',
    body: (
      <>
        Approval usually takes less than a day. Once approved, your affiliate dashboard is available inside{' '}
        <a href={APP_URL} className="font-medium text-[var(--accent-cyan)] underline-offset-2 hover:underline">
          app.adrender.app
        </a>
        . Check your spam folder for the approval email, or just log back in to confirm.
      </>
    ),
  },
]

const FAQ: { q: string; a: string }[] = [
  {
    q: 'How is commission calculated?',
    a: 'Commission is calculated on the profit from each payment the referred subscriber makes — not on the full list price.',
  },
  {
    q: 'How long do I earn on a referral?',
    a: 'For monthly subscribers, commission is paid every billing cycle for up to 12 months per referral. For yearly subscribers, commission is paid once on that single yearly payment, since it already covers 12 months.',
  },
  {
    q: 'When do payouts start?',
    a: 'Payouts run every 2 weeks. Your first payout begins after the subscriber’s first month is complete.',
  },
  {
    q: 'What happens after August 31, 2026?',
    a: 'New campaigns will vary after that date, but no standard campaign will ever pay less than 20% commission. You can also negotiate a custom rate through our Split-Share program.',
  },
]

export function AffiliatesPage() {
  return (
    <div className="px-4 py-20 md:px-6 md:py-28">
      <PageMeta title={TITLE} description={DESCRIPTION} path="/affiliates" />

      {/* 1. HERO */}
      <section className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">Affiliate Program</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl">
            Earn with AdRender
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Refer subscribers and earn a share of the profit — up to 50% when you join before August 31, 2026.
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-cyan)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_6%,#12121a)] px-5 py-4 text-left md:px-6 md:py-5">
            <p className="text-base leading-relaxed text-zinc-300">
              You&apos;re not just earning commission — you&apos;re getting the tool. Use AdRender itself to generate
              on-brand UGC-style videos and ads promoting your link, in minutes, with the exact same generator
              you&apos;re recommending to everyone else.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={APP_URL}
              className="btn-cta inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
            >
              Sign up to become an affiliate
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Already have an account? Apply under Profile → Affiliates in the app.
          </p>
        </ScrollReveal>
      </section>

      {/* 2. COMMISSION STRUCTURE */}
      <section className="mx-auto mt-20 max-w-5xl md:mt-28">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">Commission</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Clear rates. No fine print surprises.
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <article className="h-full rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-cyan)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_6%,#12121a)] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-cyan)]">
                Early enrollment
              </p>
              <p className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-white">50%</p>
              <p className="mt-2 text-lg font-medium text-zinc-200">of profit on every referred subscriber</p>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Sign up before <span className="font-medium text-zinc-200">August 31, 2026</span> to lock in the 50%
                rate for your referrals.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal>
            <article className="h-full rounded-2xl border border-white/[0.06] bg-[#12121a] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">After August 31, 2026</p>
              <p className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-white">20%+</p>
              <p className="mt-2 text-lg font-medium text-zinc-200">minimum on standard campaigns</p>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                New campaigns will vary, but no standard campaign will ever pay less than 20% commission. Prefer a
                custom arrangement? Negotiate a rate through our Split-Share program.
              </p>
            </article>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#12121a] p-6 md:p-8">
            <h3 className="font-heading text-lg font-semibold text-white">Payout terms</h3>
            <ul className="mt-5 space-y-3">
              {[
                'Commission is calculated on the profit from each payment the referred subscriber makes.',
                'Monthly subscribers: commission paid every billing cycle, for up to 12 months per referral.',
                'Yearly subscribers: commission paid once, on that single yearly payment (it already covers 12 months).',
                'Payouts run every 2 weeks.',
                'First payout begins after the subscriber’s first month is complete.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-zinc-400">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. PERKS */}
      <section className="mx-auto mt-20 max-w-6xl md:mt-28">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">Perks</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Built for serious affiliates
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, body }, i) => {
            const surfaces = [
              'border-[#00E5FF]/22 bg-[#00E5FF]/08 text-[#00E5FF]',
              'border-[#7B4FD4]/25 bg-[#7B4FD4]/10 text-[#B894F0]',
              'border-[#FF6B2B]/22 bg-[#FF6B2B]/08 text-[#FF8F5C]',
            ]
            return (
              <ScrollReveal key={title}>
                <article className="h-full rounded-2xl border border-white/[0.06] bg-[#12121a] p-8 transition hover:border-white/[0.1] hover:shadow-[0_0_36px_-14px_rgba(0,229,255,0.12)]">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${surfaces[i % 3]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-500">{body}</p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* 4. HOW TO JOIN */}
      <section className="mx-auto mt-20 max-w-3xl md:mt-28">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">How to join</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Three steps to get started
            </h2>
          </div>
        </ScrollReveal>

        <ol className="mt-12 space-y-6">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.title}>
              <li className="flex gap-5 rounded-2xl border border-white/[0.06] bg-[#12121a] p-6 md:p-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[color:color-mix(in_srgb,var(--accent-cyan)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_8%,transparent)] font-heading text-sm font-bold text-[var(--accent-cyan)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-zinc-400">{step.body}</p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal>
          <div className="mt-10 flex justify-center">
            <a
              href={APP_URL}
              className="btn-cta inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
            >
              Create your account
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. FAQ */}
      <section className="mx-auto mt-20 max-w-3xl md:mt-28">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">FAQ</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Common questions
            </h2>
          </div>
        </ScrollReveal>

        <dl className="mt-12 space-y-4">
          {FAQ.map(({ q, a }) => (
            <ScrollReveal key={q}>
              <div className="rounded-2xl border border-white/[0.06] bg-[#12121a] p-6 md:p-8">
                <dt className="font-heading text-lg font-semibold text-white">{q}</dt>
                <dd className="mt-3 text-base leading-relaxed text-zinc-400">{a}</dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </section>

      {/* 6. CLOSING CTA */}
      <section className="mx-auto mt-20 max-w-3xl md:mt-28">
        <ScrollReveal>
          <div className="rounded-2xl border border-white/[0.08] bg-[#08080c] px-6 py-16 text-center md:px-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to start earning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
              Create an account at{' '}
              <a href={APP_URL} className="font-medium text-[var(--accent-cyan)] underline-offset-2 hover:underline">
                app.adrender.app
              </a>
              , then apply under Profile → Affiliates. Early enrollment for 50% commission closes August 31, 2026.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={APP_URL}
                className="btn-cta inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
              >
                Sign up at app.adrender.app
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Prefer the marketing site first? Visit{' '}
              <a href={SITE_URL} className="text-zinc-400 underline-offset-2 hover:text-[var(--accent-cyan)] hover:underline">
                adrender.app
              </a>
              .
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
