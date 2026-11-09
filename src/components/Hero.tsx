import { useEffect, useState, type FormEvent } from 'react'
import { Globe } from '@phosphor-icons/react'
import { AppPreviewSection } from './AppPreview/AppPreviewSection'
import { getSignupUrl } from '../lib/appUrl'
import { PrimaryLink, SecondaryLink } from './site/Buttons'
import { SplitTitle } from './site/SplitTitle'
import { Stage } from './site/Stage'
import { cx } from './site/cx'

/** How long each rotating headline line stays on screen. The crossfade is 300ms in CSS. */
const HEADLINE_ROTATE_MS = 2500

const LINE_1 = 'Create more ads.'
const LINE_2 = ['Launch more tests.', 'Find more winners.'] as const
const FIND_INDEX = 1
const SR_HEADLINE = 'Create more ads. Launch more tests. Find more winners.'

const DEFAULT_SUBHEAD =
  'Remix 100M+ real image and video ads into your brand. Hundreds of ads in under 10 minutes.'
const DEFAULT_CTA_NOTE = 'Free to start. No credit card needed.'

type HeroProps = {
  /** Landing pages pass their own headline. Homepage uses the rotating headline. */
  headline?: string
  subhead?: string
  ctaNote?: string
  /** Pass a string to show an audience line. Homepage leaves this off. */
  audienceLine?: string | null
  /** Homepage mounts the app preview on a stage. */
  showcase?: boolean
}

function splitHeadline(headline: string): { lead: string; rest?: string } {
  const match = headline.match(/^(.+?[.!?])\s+(.+)$/)
  if (!match) return { lead: headline }
  return { lead: match[1], rest: match[2] }
}

function RotatingHeadline() {
  const [rot, setRot] = useState({ index: FIND_INDEX, prev: null as number | null, animate: false })
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer: number | null = null

    const stop = () => {
      if (timer !== null) {
        window.clearInterval(timer)
        timer = null
      }
    }

    const sync = () => {
      stop()
      if (motion.matches) {
        setReduced(true)
        return
      }
      setReduced(false)
      timer = window.setInterval(() => {
        setRot((state) => ({
          index: (state.index + 1) % LINE_2.length,
          prev: state.index,
          animate: true,
        }))
      }, HEADLINE_ROTATE_MS)
    }

    sync()
    motion.addEventListener('change', sync)
    return () => {
      stop()
      motion.removeEventListener('change', sync)
    }
  }, [])

  const index = reduced ? FIND_INDEX : rot.index
  const prev = reduced ? null : rot.prev
  const animate = !reduced && rot.animate

  return (
    <h1 className="site-split-title is-h1 hero-rotator" aria-live="off">
      <span className="sr-only">{SR_HEADLINE}</span>
      <span aria-hidden="true">
        <span className="site-split-lead">{LINE_1}</span>
        <span className="hero-line2">
          {LINE_2.map((text, i) => {
            const active = i === index
            const state = active ? (animate ? 'is-current' : 'is-shown') : i === prev ? 'is-outgoing' : 'is-idle'
            return (
              <span key={text} className={state}>
                {text}
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
  const home = !headline
  const title = headline ? splitHeadline(headline) : null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isNavigating) return
    setIsNavigating(true)
    window.location.assign(getSignupUrl(websiteUrl))
  }

  return (
    <section className={cx('site-section site-hero', home && 'is-home')}>
      <div className="site-column">
        <div className="site-split-hero-top">
          {home ? (
            <RotatingHeadline />
          ) : (
            <SplitTitle as="h1" lead={title?.lead ?? ''} rest={title?.rest} />
          )}
          <div className="site-hero-aside">
            {home ? (
              <p className="site-lead site-hero-lead">
                <span className="site-hero-lead-line">Remix 100M+ real image and video ads into your brand.</span>{' '}
                <span className="site-hero-lead-line">Hundreds of ads in under 10 minutes.</span>
              </p>
            ) : (
              <p className="site-lead">{subhead}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="site-url-form">
          <div className="site-url-field">
            <label htmlFor="hero-brand-url" className="sr-only">
              Add your URL (optional)
            </label>
            <Globe size={20} aria-hidden />
            <input
              id="hero-brand-url"
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="Add your URL (optional)"
              autoComplete="url"
            />
          </div>
          <button type="submit" className="site-btn site-btn-primary" disabled={isNavigating}>
            Render my ads
          </button>
        </form>
        <p className="site-meta site-hero-note">{ctaNote}</p>

        <div className="site-hero-rule" />
        <div className="site-hero-actions">
          <PrimaryLink href={getSignupUrl()}>Start free</PrimaryLink>
          <SecondaryLink href="#how-it-works">See how it works</SecondaryLink>
        </div>
        {audienceLine ? <p className="site-meta site-hero-note">{audienceLine}</p> : null}
      </div>

      {showcase ? (
        <div className="site-hero-stage is-overlap">
          <Stage className="site-stage-hero">
            <AppPreviewSection embedded />
          </Stage>
        </div>
      ) : null}
    </section>
  )
}
