import { useState, type FormEvent } from 'react'
import { ArrowRight, Globe, Image as ImageIcon, Sparkle, Sparkles } from 'lucide-react'
import { FINAL_ADS } from '../../data/howItWorksMock'
import type { Brand, Template } from './types'

interface FinalAdsPreviewProps {
  selectedBrand: Brand | null
  selectedTemplate: Template | null
  onUserInteraction: () => void
  /** Real action: hand the visitor's URL off to signup / app onboarding. */
  onWebsiteSubmit: (url: string) => void
}

export function FinalAdsPreview({
  selectedBrand,
  selectedTemplate,
  onUserInteraction,
  onWebsiteSubmit,
}: FinalAdsPreviewProps) {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isNavigating, setIsNavigating] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onUserInteraction()
    if (!websiteUrl.trim()) return
    setIsNavigating(true)
    onWebsiteSubmit(websiteUrl.trim())
  }

  const brandName = selectedBrand?.name || 'Velocity Sports'
  const templateName = selectedTemplate?.name || 'Bold High-Conversion Static'
  const brandColors = selectedBrand?.swatches || ['#00e5ff', '#7b4fd4', '#00D2FF']

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 border-b border-white/10 pb-2 sm:flex-row sm:items-center">
        <div>
          <span className="rounded-full border border-[color:color-mix(in_srgb,var(--accent-cyan)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_10%,transparent)] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
            Step 3 — Rendered Ad Output
          </span>
          <h3 className="mt-2 text-sm font-bold text-white">
            Final High-Res Creatives for <span className="text-[var(--accent-cyan)]">{brandName}</span>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/40">
            Template: {templateName}
          </span>
        </div>
      </div>

      <div className="relative space-y-4 rounded-xl border border-white/10 bg-bg-elevated p-4 shadow-2xl sm:p-6">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[var(--accent-cyan)]" />
            <span className="font-mono text-xs font-bold text-white/90">Generated Ad Creative Images</span>
          </div>
          <span className="font-mono text-xs text-white/40">4 Production Images</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FINAL_ADS.map((ad) => (
            <div
              key={ad.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-bg-card transition-all duration-300 hover:border-[color:color-mix(in_srgb,var(--accent-cyan)_60%,transparent)] hover:shadow-2xl"
            >
              <div
                className={`relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden bg-gradient-to-br p-5 ${ad.bgGradient}`}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl"
                  style={{ backgroundColor: brandColors[0] || '#00e5ff' }}
                />

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 backdrop-blur-md">
                      {ad.resolution}
                    </span>
                    <span className="rounded border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-white/90 backdrop-blur-md">
                      {brandName}
                    </span>
                  </div>

                  <span className="rounded border border-[var(--accent-cyan)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_80%,transparent)] px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
                    {ad.adSize}
                  </span>
                </div>

                <div className="relative z-10 my-auto py-2">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-white/60">
                    {ad.title}
                  </span>
                  <h4 className="text-base font-black leading-tight text-white drop-shadow-md sm:text-lg">
                    &ldquo;{ad.headline}&rdquo;
                  </h4>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-2">
                  <div className="flex items-center gap-1 font-mono text-[11px] text-white/80">
                    <Sparkle className="h-3 w-3 text-[var(--accent-cyan)]" />
                    <span>{templateName.split(' ')[0]} Format</span>
                  </div>
                  <span className="rounded bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-md">
                    {ad.ctaText}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-bg-elevated p-3 text-xs">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50">
                  {ad.placeholderLabel}
                </span>
                <span className="font-mono text-[11px] text-white/60">Ready for export</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-[color:color-mix(in_srgb,var(--accent-cyan)_30%,transparent)] bg-bg-elevated p-5 shadow-2xl sm:p-6">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="max-w-md space-y-1">
            <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-cyan)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Instant AI Onboarding</span>
            </div>
            <h3 className="text-base font-bold text-white sm:text-lg">
              Enter your website to make these yours
            </h3>
            <p className="text-xs text-white/50">
              AdRender will crawl your landing page and automatically build your custom brand assets.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => {
                  setWebsiteUrl(e.target.value)
                  onUserInteraction()
                }}
                placeholder="yoursite.com"
                className="focus-ring-brand w-full rounded-lg border border-white/10 bg-bg-card py-2.5 pl-9 pr-3 font-mono text-sm text-white placeholder-white/30 transition-all focus:border-[var(--accent-cyan)]"
              />
            </div>

            <button
              type="submit"
              disabled={isNavigating}
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[var(--accent-cyan)] bg-[var(--accent-cyan)] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[color-mix(in_srgb,var(--accent-cyan)_20%,transparent)] transition-all hover:opacity-90 active:scale-95 disabled:opacity-70"
            >
              <span>{isNavigating ? 'Loading brand...' : 'Go'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
