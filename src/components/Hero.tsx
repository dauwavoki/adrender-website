import { useEffect, useState, type FormEvent } from 'react'
import { Globe } from 'lucide-react'
import { AppPreviewSection } from './AppPreview/AppPreviewSection'
import { HERO_LINE_GRADIENTS } from './HowItWorks/titleGradients'
import { getSignupUrl } from '../lib/appUrl'

/** How long each rotating headline line stays on screen. */
const HEADLINE_ROTATE_MS = 2500

const LINE_2 = [
  { text: 'Launch more tests.', gradient: HERO_LINE_GRADIENTS[0] },
  { text: 'Find more winners.', gradient: HERO_LINE_GRADIENTS[1] },
  { text: 'Test every angle.', gradient: HERO_LINE_GRADIENTS[2] },
  { text: "Scale what's working.", gradient: HERO_LINE_GRADIENTS[3] },
  { text: 'Beat creative fatigue.', gradient: HERO_LINE_GRADIENTS[4] },
  { text: 'Images and video, on-brand.', gradient: HERO_LINE_GRADIENTS[5] },
] as const

const LINE_1 = 'Create more ads.'
const SR_HEADLINE = 'Create more ads. Launch more tests. Find more winners.'

const DEFAULT_SUBHEAD =
  'AdRender pulls from 100M+ real image and video ads running right now and remixes the winners into your brand. Hundreds of ads in under 10 minutes.'
const DEFAULT_CTA_NOTE = 'No credit card. No demo call. No sales rep.'
const DEFAULT_AUDIENCE =
  "Built for anyone spending $500 to $50K+ a month on ads — whether that's your whole budget or your testing budget."

type HeroProps = {
  /** Landing pages pass their own headline. Homepage uses the rotating headline. */
  headline?: string
  subhead?: string
  ctaNote?: string
  /** Pass `null` to hide the audience line (landing pages). */
  audienceLine?: string | null
  /** Homepage: text left, tilted app showcase on the right. */
  showcase?: boolean
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return reduced
}

function RotatingHeadline() {
  const reduced = usePrefersReducedMotion()
  const [rot, setRot] = useState({ index: 0, prev: null as number | null, animate: false })

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setRot((state) => ({
        index: (state.index + 1) % LINE_2.length,
        prev: state.index,
        animate: true,
      }))
    }, HEADLINE_ROTATE_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  const index = reduced ? 0 : rot.index
  const prev = reduced ? null : rot.prev
  const animate = !reduced && rot.animate

  return (
    <h1 className="font-heading text-[2.15rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.15rem] lg:leading-[1.02] xl:text-[3.35rem]">
      <span className="sr-only">{SR_HEADLINE}</span>
      <span aria-hidden="true" className="block">
        <span className="hero-line1 block">{LINE_1}</span>
        <span className="hero-line2 mt-1 block">
          {LINE_2.map((line, i) => {
            const active = i === index
            const state = active
              ? animate
                ? 'is-current'
                : 'is-shown'
              : i === prev
                ? 'is-outgoing'
                : 'is-idle'
            return (
              <span key={line.text} className={`${state} ${line.gradient}${active ? ' hero-line-shine' : ''}`}>
                {line.text}
              </span>
            )
          })}
        </span>
      </span>
    </h1>
  )
}

export function Hero({
  headline,
  subhead = DEFAULT_SUBHEAD,
  ctaNote = DEFAULT_CTA_NOTE,
  audienceLine = DEFAULT_AUDIENCE,
  showcase = false,
}: HeroProps) {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isNavigating, setIsNavigating] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isNavigating) return
    setIsNavigating(true)
    window.location.assign(getSignupUrl(websiteUrl))
  }

  const form = (
    <div className={showcase ? 'mt-8' : 'mt-10'}>
      <form onSubmit={handleSubmit} className={showcase ? 'w-full max-w-xl' : 'mx-auto w-full max-w-2xl'}>
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          <div className="relative min-w-0 flex-1">
            <label htmlFor="hero-brand-url" className="sr-only">
              Add your URL (optional)
            </label>
            <Globe
              className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
                showcase ? 'text-zinc-500' : 'text-white/40'
              }`}
              aria-hidden
            />
            <input
              id="hero-brand-url"
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="Add your URL (optional)"
              autoComplete="url"
              className={
                showcase
                  ? 'focus-ring-brand w-full rounded-xl border border-zinc-300 bg-white py-3.5 pl-12 pr-4 font-mono text-base text-bg-base shadow-sm placeholder:text-zinc-500 transition-all focus:border-[var(--accent-cyan)]'
                  : 'focus-ring-brand w-full rounded-xl border border-white/10 bg-bg-card py-3.5 pl-12 pr-4 font-mono text-base text-white placeholder-white/30 transition-all focus:border-[var(--accent-cyan)]'
              }
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
      <p className={`mt-4 text-sm ${showcase ? 'text-zinc-600' : 'text-zinc-500'}`}>{ctaNote}</p>
    </div>
  )

  const copy = (
    <>
      {showcase ? (
        <RotatingHeadline />
      ) : (
        <h1 className="font-heading text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.02] lg:text-[4.25rem]">
          {headline}
        </h1>
      )}
      <p
        className={`mt-6 text-base leading-relaxed sm:text-lg md:text-xl ${
          showcase ? 'max-w-xl text-zinc-700' : 'mx-auto max-w-3xl text-zinc-400'
        }`}
      >
        {subhead}
      </p>
      {form}
      {audienceLine ? (
        <p
          className={`mt-6 text-sm leading-relaxed ${
            showcase ? 'max-w-xl text-zinc-600' : 'mx-auto max-w-xl text-zinc-600'
          }`}
        >
          {audienceLine}
        </p>
      ) : null}
    </>
  )

  if (!showcase) {
    return (
      <section className="relative px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-24">
        <div className="relative z-10 mx-auto max-w-5xl text-center">{copy}</div>
      </section>
    )
  }

  return (
    <section className="hero-home relative pt-12 md:pt-14 lg:pt-12">
      <div className="hero-dots" aria-hidden />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0 text-left">{copy}</div>
        <div className="hero-showcase-perspective min-w-0">
          <div className="hero-showcase-tilt">
            <AppPreviewSection embedded />
          </div>
        </div>
      </div>
    </section>
  )
}
