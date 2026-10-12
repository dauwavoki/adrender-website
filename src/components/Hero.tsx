import { useState, type FormEvent } from 'react'
import { Globe } from 'lucide-react'
import { getSignupUrl } from '../lib/appUrl'

const DEFAULT_HEADLINE = 'Create more ads. Launch more tests. Find more winners.'
const DEFAULT_SUBHEAD =
  'AdRender pulls from 100M+ real image and video ads running right now and remixes the winners into your brand. Hundreds of ads in under 10 minutes.'
const DEFAULT_CTA_NOTE = 'No credit card. No demo call. No sales rep.'
const DEFAULT_AUDIENCE =
  "Built for anyone spending $500 to $50K+ a month on ads — whether that's your whole budget or your testing budget."

type HeroProps = {
  headline?: string
  subhead?: string
  ctaNote?: string
  /** Pass `null` to hide the audience line (landing pages). */
  audienceLine?: string | null
}

export function Hero({
  headline = DEFAULT_HEADLINE,
  subhead = DEFAULT_SUBHEAD,
  ctaNote = DEFAULT_CTA_NOTE,
  audienceLine = DEFAULT_AUDIENCE,
}: HeroProps) {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isNavigating, setIsNavigating] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isNavigating) return
    setIsNavigating(true)
    window.location.assign(getSignupUrl(websiteUrl))
  }

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(123, 79, 212, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 20%, black 15%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] [animation:drift_22s_ease-in-out_infinite]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(123, 79, 212, 0.22), transparent 45%),
            radial-gradient(circle at 20% 30%, rgba(0, 229, 255, 0.08), transparent 40%),
            radial-gradient(circle at 80% 25%, rgba(255, 107, 43, 0.06), transparent 35%)`,
        }}
      />
      <div className="grain-overlay" aria-hidden />

      <div className="relative mx-auto max-w-5xl text-center">
        <h1 className="font-heading text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.02] lg:text-[4.25rem]">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
          {subhead}
        </p>
        <div className="mt-10">
          <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
              <div className="relative min-w-0 flex-1">
                <label htmlFor="hero-brand-url" className="sr-only">
                  Add your URL (optional)
                </label>
                <Globe
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
                  aria-hidden
                />
                <input
                  id="hero-brand-url"
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="Add your URL (optional)"
                  autoComplete="url"
                  className="focus-ring-brand w-full rounded-xl border border-white/10 bg-bg-card py-3.5 pl-12 pr-4 font-mono text-base text-white placeholder-white/30 transition-all focus:border-[var(--accent-cyan)]"
                />
              </div>
              <button
                type="submit"
                disabled={isNavigating}
                className="btn-cta inline-flex w-full shrink-0 items-center justify-center rounded-xl px-8 py-3.5 text-base font-semibold whitespace-nowrap disabled:opacity-70 md:w-auto"
              >
                Render my ads
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-zinc-500">{ctaNote}</p>
        </div>
        {audienceLine ? (
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-600">{audienceLine}</p>
        ) : null}
      </div>
    </section>
  )
}
