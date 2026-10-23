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
  { text: 'Scale what works.', gradient: HERO_LINE_GRADIENTS[3] },
  { text: 'Beat ad fatigue.', gradient: HERO_LINE_GRADIENTS[4] },
  { text: 'Render image and video.', gradient: HERO_LINE_GRADIENTS[5] },
] as const

const LINE_1 = 'Create more ads.'
const SR_HEADLINE = 'Create more ads. Launch more tests. Find more winners.'

const DEFAULT_SUBHEAD =
  'Remix 100M+ real image and video ads into your brand. Hundreds of ads in under 10 minutes.'
const DEFAULT_CTA_NOTE = 'Free to start. No credit card needed'

type HeroProps = {
  /** Landing pages pass their own headline. Homepage uses the rotating headline. */
  headline?: string
  subhead?: string
  ctaNote?: string
  /** Pass a string to show an audience line. Homepage leaves this off. */
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
    <h1 className="hero-headline">
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
  audienceLine = null,
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
    <div className={showcase ? 'mt-7' : 'mt-10'}>
      <form onSubmit={handleSubmit} className={showcase ? 'w-full' : 'mx-auto w-full max-w-2xl'}>
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
        className={`mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg ${
          showcase ? '' : 'mx-auto max-w-3xl md:text-xl'
        }`}
      >
        {subhead}
      </p>
      {form}
      {audienceLine ? (
        <p
          className={`mt-6 text-sm leading-relaxed text-zinc-500 ${
            showcase ? 'max-w-xl' : 'mx-auto max-w-xl'
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
    <section className="hero-home">
      <div className="hero-dots" aria-hidden />
      <div className="hero-stage">
        <div className="hero-copy-shell">
          <div className="hero-copy">{copy}</div>
        </div>
        <div className="hero-showcase">
          <div className="hero-showcase-perspective">
            <div className="hero-showcase-tilt">
              <div className="hero-glow" aria-hidden>
                <span className="hero-glow-blob hero-glow-blob--cyan" />
                <span className="hero-glow-blob hero-glow-blob--blue" />
                <span className="hero-glow-blob hero-glow-blob--purple" />
                <span className="hero-glow-blob hero-glow-blob--orange" />
              </div>
              <div className="hero-showcase-frame">
                <AppPreviewSection embedded />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
