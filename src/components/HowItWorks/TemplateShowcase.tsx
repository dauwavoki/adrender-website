import { useEffect, useState } from 'react'
import { Sparkle } from 'lucide-react'
import { TEMPLATE_ITEMS } from '../../data/howItWorksMock'
import { TiltedCarousel } from './TiltedCarousel'

interface TemplateShowcaseProps {
  /** True while Card 2 is the active step — drives counter + tile grid */
  isActive: boolean
}

/** Half prior tile size → 16 across × 2 rows */
const RENDER_COLS = 16
const RENDER_TILE_COUNT = RENDER_COLS * 2

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function RenderTile({ active }: { active: boolean }) {
  return (
    <div
      className={`hiw-render-tile flex aspect-square items-center justify-center rounded-md border transition-all duration-300 ${
        active
          ? 'scale-100 border-[color:color-mix(in_srgb,var(--accent-cyan)_35%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_6%,#0a0a0f)] opacity-100'
          : 'scale-95 border-white/5 bg-white/[0.02] opacity-30'
      }`}
    >
      {active && (
        <div className="relative flex h-[58%] w-[58%] items-center justify-center">
          <svg
            className="hiw-render-arc absolute inset-0 h-full w-full text-[var(--accent-cyan)]"
            viewBox="0 0 36 36"
            aria-hidden
          >
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="opacity-15"
            />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="24 70"
            />
          </svg>
          <Sparkle className="relative h-[40%] w-[40%] text-[var(--accent-cyan)]" strokeWidth={2} />
        </div>
      )}
    </div>
  )
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

    // ~30% of prior count-up speed (was 1200ms)
    const duration = 4000
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

    setVisibleTiles(0)
    const tileTimers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < RENDER_TILE_COUNT; i++) {
      tileTimers.push(
        setTimeout(() => {
          setVisibleTiles((n) => Math.max(n, i + 1))
        }, 60 + i * 45),
      )
    }

    return () => {
      cancelAnimationFrame(raf)
      tileTimers.forEach(clearTimeout)
    }
  }, [isActive])

  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-white/80">
        Browse 100M+ real ads running right now — filter by longest-running, niche, platform, and
        more, to see exactly what&apos;s working for your competitors.
      </p>

      <TiltedCarousel items={TEMPLATE_ITEMS} />

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

        <div className="grid grid-cols-[repeat(8,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(16,minmax(0,1fr))] sm:gap-1.5">
          {Array.from({ length: RENDER_TILE_COUNT }, (_, i) => (
            <RenderTile key={i} active={i < visibleTiles} />
          ))}
        </div>
      </div>
    </div>
  )
}
