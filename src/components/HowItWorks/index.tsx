import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { getAppUrl } from '../../lib/appUrl'
import { BrandScan } from './BrandScan'
import { ResultsShowcase } from './ResultsShowcase'
import { TemplateShowcase } from './TemplateShowcase'
import type { StepNumber } from './types'

const STEPS: { num: StepNumber; title: string; description: string; surface: string }[] = [
  {
    num: 1,
    title: 'Add your brand',
    description: 'URL scan or campaign documents',
    surface: 'bg-[#12121a]',
  },
  {
    num: 2,
    title: 'Find your winners',
    description: "Browse what's working, then render at scale",
    surface: 'bg-[#141018]',
  },
  {
    num: 3,
    title: 'See your ads',
    description: 'Finished creatives, ready to launch',
    surface: 'bg-[#0f1412]',
  },
]

/**
 * How It Works — fixed, non-interactive showcase.
 * Auto-plays Card 1 → 2 → 3 on scroll-into-view.
 * Only manual control: click a card title to jump.
 */
export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<StepNumber>(1)
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false)
  const [isAutoPlayDisabled, setIsAutoPlayDisabled] = useState(false)

  const [isScanning, setIsScanning] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const autoPlayTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAutoPlayTimers = () => {
    autoPlayTimersRef.current.forEach(clearTimeout)
    autoPlayTimersRef.current = []
  }

  const scheduleAutoPlay = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    autoPlayTimersRef.current.push(id)
    return id
  }

  const clearInteractionTimer = () => {
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current)
      interactionTimerRef.current = null
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasScrolledIntoView) {
          setHasScrolledIntoView(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasScrolledIntoView])

  // Scripted autoplay: scan → reveal → card 2 → card 3
  useEffect(() => {
    if (!hasScrolledIntoView || isAutoPlayDisabled) return

    let cancelled = false
    clearAutoPlayTimers()

    setActiveStep(1)
    setIsScanning(true)
    setIsRevealed(false)

    scheduleAutoPlay(() => {
      if (cancelled) return
      setIsScanning(false)
      setIsRevealed(true)

      scheduleAutoPlay(() => {
        if (cancelled) return
        setActiveStep(2)

        scheduleAutoPlay(() => {
          if (cancelled) return
          setActiveStep(3)
        }, 4000)
      }, 2400)
    }, 2200)

    return () => {
      cancelled = true
      clearAutoPlayTimers()
    }
  }, [hasScrolledIntoView, isAutoPlayDisabled])

  useEffect(() => () => clearInteractionTimer(), [])

  const handleCardTitleClick = (stepNum: StepNumber) => {
    // Stopping autoplay remounts the effect cleanup — keep title-click
    // timers on a separate ref so that cleanup cannot cancel the reveal.
    clearAutoPlayTimers()
    clearInteractionTimer()
    setIsAutoPlayDisabled(true)
    setActiveStep(stepNum)

    if (stepNum === 1) {
      setIsScanning(true)
      setIsRevealed(false)
      interactionTimerRef.current = setTimeout(() => {
        setIsScanning(false)
        setIsRevealed(true)
        interactionTimerRef.current = null
      }, 1800)
    } else {
      setIsScanning(false)
      setIsRevealed(true)
    }
  }

  const handleWebsiteSubmit = (url: string) => {
    // Marketing site has no /signup route — hand off to the app with ?url=
    // for the planned prefill/auto-scan flow.
    const dest = new URL(getAppUrl('/signup'))
    dest.searchParams.set('url', url)
    window.location.href = dest.toString()
  }

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative scroll-mt-28 px-4 py-24 text-zinc-100 md:px-6 md:py-28"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[color:color-mix(in_srgb,var(--accent-cyan)_10%,transparent)] via-[color:color-mix(in_srgb,var(--accent-purple)_10%,transparent)] to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            How It Works
          </h2>
        </div>

        {/* Stacked overlapping cards — inactive steps peek as header bands */}
        <div className="hiw-stack relative">
          {STEPS.map((step, index) => {
            const isExpanded = activeStep === step.num
            const z = isExpanded ? 30 : 10 + index

            return (
              <div
                key={step.num}
                style={{ zIndex: z }}
                className={`hiw-stack-card relative overflow-hidden rounded-2xl border shadow-2xl transition-[opacity,transform] duration-300 ${
                  step.surface
                } ${
                  isExpanded
                    ? 'border-white/12 opacity-100'
                    : 'border-white/[0.08] opacity-90 hover:opacity-100'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleCardTitleClick(step.num)}
                  className={`group flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 ${
                    isExpanded ? 'border-b border-white/6' : ''
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      isExpanded
                        ? 'bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white shadow-lg shadow-[color-mix(in_srgb,var(--accent-cyan)_20%,transparent)]'
                        : 'border border-white/20 text-white/40 group-hover:border-[var(--accent-cyan)] group-hover:text-[var(--accent-cyan)]'
                    }`}
                  >
                    {step.num}
                  </div>

                  <div className="min-w-0">
                    <h3
                      className={`text-lg font-medium transition-colors sm:text-xl ${
                        isExpanded ? 'text-white' : 'text-white/65 group-hover:text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-0.5 text-xs transition-colors sm:text-sm ${
                        isExpanded ? 'text-white/45' : 'text-white/30'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${step.num}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-8">
                        {step.num === 1 && (
                          <BrandScan isScanning={isScanning} isRevealed={isRevealed} />
                        )}
                        {step.num === 2 && <TemplateShowcase isActive={activeStep === 2} />}
                        {step.num === 3 && (
                          <ResultsShowcase onWebsiteSubmit={handleWebsiteSubmit} />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
