import { useState, type FormEvent } from 'react'
import { Globe } from '@phosphor-icons/react'
import { AppPreviewSection } from './AppPreview/AppPreviewSection'
import { getSignupUrl } from '../lib/appUrl'
import { PrimaryLink, SecondaryLink } from './site/Buttons'
import { SplitTitle } from './site/SplitTitle'
import { Stage } from './site/Stage'

const LINE_1 = 'Create more ads.'
const LINE_2 = 'Find more winners.'

const DEFAULT_SUBHEAD =
  'Remix 100M+ real image and video ads into your brand. Hundreds of ads in under 10 minutes.'
const DEFAULT_CTA_NOTE = 'Free to start. No credit card needed.'

type HeroProps = {
  /** Landing pages pass their own headline. Homepage uses the two-part headline. */
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

export function Hero({
  headline,
  subhead = DEFAULT_SUBHEAD,
  ctaNote = DEFAULT_CTA_NOTE,
  audienceLine = null,
  showcase = false,
}: HeroProps) {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isNavigating, setIsNavigating] = useState(false)
  const title = headline ? splitHeadline(headline) : { lead: LINE_1, rest: LINE_2 }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isNavigating) return
    setIsNavigating(true)
    window.location.assign(getSignupUrl(websiteUrl))
  }

  return (
    <section className="site-section site-hero">
      <div className="site-column">
        <div className="site-split-hero-top">
          <SplitTitle as="h1" lead={title.lead} rest={title.rest} />
          <div className="site-hero-aside">
            <p className="site-lead">{subhead}</p>
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
        <div className="site-column site-hero-stage is-overlap">
          <Stage>
            <AppPreviewSection embedded />
          </Stage>
        </div>
      ) : null}
    </section>
  )
}
