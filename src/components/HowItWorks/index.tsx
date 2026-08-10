import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { getAppUrl } from '../../lib/appUrl'
import { BrandScan } from './BrandScan'
import { ResultsShowcase } from './ResultsShowcase'
import { TemplateShowcase } from './TemplateShowcase'
import type { StepNumber } from './types'

const STEPS: { num: StepNumber; title: string; description: string; tone: string }[] = [
  {
    num: 1,
    title: 'Add your brand',
    description: 'URL scan or campaign documents',
    tone: 'hiw-card-tone-1',
  },
  {
    num: 2,
    title: 'Choose winning templates',
    description: "Browse what's working, then render at scale",
    tone: 'hiw-card-tone-2',
  },
  {
    num: 3,
    title: 'See your ads',
    description: 'Finished creatives, ready to launch',
    tone: 'hiw-card-tone-3',
  },
]

/** Matches Tailwind `md` — below this, all cards stay open for free scroll */
const MOBILE_MQ = '(max-width: 767px)'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MQ).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ)
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

/** Active on top; among peeking cards below, nearer ones sit above farther ones (2 over 3). */
function stackZ(stepNum: StepNumber, active: StepNumber) {
  if (stepNum === active) return 30
  if (stepNum > active) return 20 - (stepNum - active)
  return 10 + stepNum
}

/**
 * How It Works — fixed showcase.
 * Desktop: Card 1 starts open; click a card to open it and center it.
 * Mobile: all cards open with spacing for free scroll.
 */
export function HowItWorks() {
  const isMobile = useIsMobile()
  const [activeStep, setActiveStep] = useState<StepNumber>(1)

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeStepRef = useRef<StepNumber>(activeStep)
  const shouldCenterRef = useRef(false)

  activeStepRef.current = activeStep

  const getCenteredScrollTop = (step: StepNumber) => {
    const el = cardRefs.current[step - 1]
    if (!el) return null
    const rect = el.getBoundingClientRect()
    return Math.max(0, window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2)
  }

  const scrollActiveToCenter = (behavior: ScrollBehavior = 'smooth') => {
    const top = getCenteredScrollTop(activeStepRef.current)
    if (top == null) return
    window.scrollTo({ top, behavior })
  }

  const goToStep = (step: StepNumber) => {
    if (step === activeStepRef.current) {
      shouldCenterRef.current = true
      scrollActiveToCenter('smooth')
      return
    }
    shouldCenterRef.current = true
    setActiveStep(step)
  }

  // Center after a user-driven step change (card click)
  useEffect(() => {
    if (isMobile || !shouldCenterRef.current) return

    scrollActiveToCenter('smooth')
    const t = setTimeout(() => scrollActiveToCenter('smooth'), 420)
    return () => clearTimeout(t)
  }, [activeStep, isMobile])

  const handleCardClick = (stepNum: StepNumber) => {
    if (isMobile) return
    goToStep(stepNum)
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

        <div className="hiw-stack relative">
          {STEPS.map((step, index) => {
            const isExpanded = isMobile || activeStep === step.num
            const z = isMobile ? 1 : stackZ(step.num, activeStep)

            return (
              <div
                key={step.num}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                style={{ zIndex: z }}
                className={`hiw-stack-card relative overflow-hidden rounded-2xl border shadow-2xl transition-[opacity,transform,border-color] duration-300 ${
                  step.tone
                } ${
                  isExpanded
                    ? 'border-white/14 opacity-100'
                    : 'border-white/[0.08] opacity-90 hover:opacity-100'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleCardClick(step.num)}
                  className={`group flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 ${
                    isMobile ? 'cursor-default' : 'cursor-pointer'
                  } ${isExpanded ? 'border-b border-white/6' : ''}`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      isExpanded
                        ? 'bg-gradient-to-br from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-orange)] text-white shadow-lg shadow-[color-mix(in_srgb,var(--accent-cyan)_20%,transparent)]'
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
                      initial={isMobile ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-8">
                        {step.num === 1 && <BrandScan />}
                        {step.num === 2 && (
                          <TemplateShowcase isActive={isMobile || activeStep === 2} />
                        )}
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
