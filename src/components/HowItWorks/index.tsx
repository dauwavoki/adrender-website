import { getSignupUrl } from '../../lib/appUrl'
import { BrandScan } from './BrandScan'
import { ResultsShowcase } from './ResultsShowcase'
import { TemplateShowcase } from './TemplateShowcase'

const STEPS = [
  {
    num: '01' as const,
    title: 'Add your brand',
    tone: 'hiw-card--1',
  },
  {
    num: '02' as const,
    title: 'Choose winning templates',
    subtitle: "Browse what's working, then render at scale",
    tone: 'hiw-card--2',
  },
  {
    num: '03' as const,
    title: 'See your ads',
    subtitle: 'Finished creatives, ready to launch',
    tone: 'hiw-card--3',
  },
]

function ClosingStartCard() {
  const signupUrl = getSignupUrl()

  return (
    <div className="hiw-closing px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl text-left">
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-zinc-300">
            NOTHING TO SET UP
          </p>
          <h3 className="mt-5 font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
            Sign up free. Choose a template. Get your ads.
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            You don&apos;t need a website, photos or any design skills to start. Create a free account,
            pick a template and render your first ads.
          </p>
        </div>
        <a
          href={signupUrl}
          className="btn-cta inline-flex w-full shrink-0 items-center justify-center whitespace-nowrap rounded-xl px-8 py-3.5 text-base font-semibold md:w-auto"
        >
          Start free →
        </a>
      </div>
    </div>
  )
}

/**
 * How It Works — three always-visible cards, then a closing start-free card.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-28 overflow-x-clip px-4 py-24 text-zinc-100 md:px-6 md:py-28"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[color:color-mix(in_srgb,var(--accent-cyan)_10%,transparent)] via-[color:color-mix(in_srgb,var(--accent-purple)_10%,transparent)] to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            How It Works
          </h2>
        </div>

        {/*
          PLACEHOLDER: intro video — insert the explainer video here when ready.
          This slot is shared across the homepage and all /lp/ landing pages.
        */}
        <div
          aria-hidden
          dangerouslySetInnerHTML={{
            __html:
              '<!-- PLACEHOLDER: intro video — insert the explainer video here when ready. Shared across homepage and all /lp/ landing pages. -->',
          }}
        />

        <div className="flex flex-col gap-10 md:gap-14">
          {STEPS.map((step) => (
            <article key={step.num} className={`hiw-card ${step.tone} px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12`}>
              <p className="hiw-card-num">{step.num}</p>
              <h3 className="hiw-card-title">{step.title}</h3>
              {step.num === '01' ? null : (
                <p className="mt-3 text-sm text-white/50 sm:text-base">{step.subtitle}</p>
              )}
              <div className={step.num === '01' ? 'mt-3' : 'mt-6'}>
                {step.num === '01' && <BrandScan />}
                {step.num === '02' && <TemplateShowcase />}
                {step.num === '03' && <ResultsShowcase />}
              </div>
            </article>
          ))}
          <ClosingStartCard />
        </div>
      </div>
    </section>
  )
}
