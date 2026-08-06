import { useState, type FormEvent } from 'react'
import { ArrowRight, Globe, Sparkles } from 'lucide-react'
import { RESULT_PLACEHOLDERS } from '../../data/howItWorksMock'
import { TiltedCarousel } from './TiltedCarousel'

interface ResultsShowcaseProps {
  onWebsiteSubmit: (url: string) => void
}

/**
 * Card 3 — finished-ad carousel + the only functional URL input in the section.
 */
export function ResultsShowcase({ onWebsiteSubmit }: ResultsShowcaseProps) {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isNavigating, setIsNavigating] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!websiteUrl.trim()) return
    setIsNavigating(true)
    onWebsiteSubmit(websiteUrl.trim())
  }

  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-white/55">
        Your ads, ready to launch — brand colours, products, and winning formats applied.
      </p>

      <TiltedCarousel items={RESULT_PLACEHOLDERS} variant="results" />

      <div className="relative overflow-hidden rounded-xl border border-[color:color-mix(in_srgb,var(--accent-cyan)_28%,transparent)] bg-bg-elevated p-5 sm:p-6">
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-cyan)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Try it free</span>
            </div>
            <h3 className="text-base font-bold text-white sm:text-lg">
              Enter your brand URL — or try it live now, free.
            </h3>
            <p className="text-xs leading-relaxed text-white/50">
              Get your first 10 ads on us. No credit card required to start.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="yoursite.com"
                autoComplete="url"
                className="focus-ring-brand w-full rounded-lg border border-white/10 bg-bg-card py-2.5 pl-9 pr-3 font-mono text-sm text-white placeholder-white/30 transition-all focus:border-[var(--accent-cyan)]"
              />
            </div>

            <button
              type="submit"
              disabled={isNavigating}
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[var(--accent-cyan)] bg-[var(--accent-cyan)] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[color-mix(in_srgb,var(--accent-cyan)_20%,transparent)] transition-all hover:opacity-90 active:scale-95 disabled:opacity-70"
            >
              <span>{isNavigating ? 'Loading…' : 'Go'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
