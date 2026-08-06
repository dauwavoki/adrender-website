import { useEffect, useState } from 'react'
import { DEMO_BRAND, TEMPLATE_PLACEHOLDERS } from '../../data/howItWorksMock'
import { TiltedCarousel } from './TiltedCarousel'

interface TemplateShowcaseProps {
  /** True while Card 2 is the active step — drives counter + tile grid */
  isActive: boolean
}

const RENDER_TILE_COUNT = 16

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Card 2 — tilted template carousel + batch-render tile grid with HUD counter.
 */
export function TemplateShowcase({ isActive }: TemplateShowcaseProps) {
  const [renderCount, setRenderCount] = useState(0)
  const [visibleTiles, setVisibleTiles] = useState(0)
  const [countDone, setCountDone] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setRenderCount(0)
      setVisibleTiles(0)
      setCountDone(false)
      return
    }

    const duration = 1200
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setRenderCount(Math.round(easeOutCubic(t) * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setCountDone(true)
      }
    }

    raf = requestAnimationFrame(tick)

    // Progressive tile reveal — independent of counter timing
    setVisibleTiles(0)
    const tileTimers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < RENDER_TILE_COUNT; i++) {
      tileTimers.push(
        setTimeout(() => {
          setVisibleTiles((n) => Math.max(n, i + 1))
        }, 80 + i * 70),
      )
    }

    return () => {
      cancelAnimationFrame(raf)
      tileTimers.forEach(clearTimeout)
    }
  }, [isActive])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="max-w-2xl text-sm leading-relaxed text-white/55">
          Browse 100M+ real ads running right now — filter by longest-running, niche, platform, and
          more, to see exactly what&apos;s working for your competitors.
        </p>

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-bg-card font-mono text-[9px] font-bold text-[var(--accent-cyan)]"
          title={`${DEMO_BRAND.name} logo`}
        >
          {DEMO_BRAND.logoPlaceholder}
        </div>
      </div>

      <TiltedCarousel items={TEMPLATE_PLACEHOLDERS} variant="templates" />

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-bg-elevated p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
            Batch rendering
          </span>
          <div
            className={`rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tabular-nums transition-colors ${
              countDone
                ? 'border-[color:color-mix(in_srgb,var(--accent-cyan)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_10%,transparent)] text-[var(--accent-cyan)]'
                : 'border-white/10 bg-white/5 text-white/80'
            }`}
          >
            Rendering {renderCount} Ads
            {countDone ? ' — ready in under 45 seconds.' : '…'}
          </div>
        </div>

        <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-8">
          {Array.from({ length: RENDER_TILE_COUNT }, (_, i) => {
            const shown = i < visibleTiles
            return (
              <div
                key={i}
                className={`aspect-square rounded-md border transition-all duration-300 ${
                  shown
                    ? 'scale-100 border-[color:color-mix(in_srgb,var(--accent-cyan)_30%,transparent)] bg-gradient-to-br from-[color:color-mix(in_srgb,var(--accent-cyan)_18%,transparent)] to-white/5 opacity-100'
                    : 'scale-95 border-white/5 bg-white/[0.02] opacity-25'
                }`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
