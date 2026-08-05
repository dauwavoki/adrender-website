import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { BRANDS, TEMPLATES } from '../../data/howItWorksMock'
import { getAppUrl } from '../../lib/appUrl'
import { BrandSelector } from './BrandSelector'
import { FinalAdsPreview } from './FinalAdsPreview'
import { TemplateSelector } from './TemplateSelector'
import type { Brand, StepNumber, Template } from './types'

/**
 * Interactive How It Works demo — replaces the static app-screenshot preview
 * below the homepage hero.
 */
export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<StepNumber>(1)

  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false)
  const [isAutoPlayDisabled, setIsAutoPlayDisabled] = useState(false)

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(BRANDS[0])
  const [scanStepText, setScanStepText] = useState('Scanning brand assets...')
  const [brandLoading, setBrandLoading] = useState(false)
  const [brandRevealed, setBrandRevealed] = useState(false)

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(TEMPLATES[0])
  const [templateLoading, setTemplateLoading] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAutoPlayTimers = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }

  const handleUserInteraction = () => {
    clearAutoPlayTimers()
    setIsAutoPlayDisabled(true)
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

    return () => {
      observer.disconnect()
    }
  }, [hasScrolledIntoView])

  // Depends only on scroll + disable flags so React Strict Mode remounts
  // can restart cleanly (gating on a phase enum would strand the sequence
  // after the first effect's cleanup cleared the timers).
  useEffect(() => {
    if (!hasScrolledIntoView || isAutoPlayDisabled) {
      return
    }

    let cancelled = false

    setActiveStep(1)
    setSelectedBrand(BRANDS[0])
    setScanStepText(`Scanning ${BRANDS[0].url}...`)
    setBrandLoading(true)
    setBrandRevealed(false)

    autoPlayTimerRef.current = setTimeout(() => {
      if (cancelled) return
      setBrandLoading(false)
      setBrandRevealed(true)

      autoPlayTimerRef.current = setTimeout(() => {
        if (cancelled) return
        setActiveStep(2)
        setSelectedTemplate(TEMPLATES[0])
        setTemplateLoading(true)

        autoPlayTimerRef.current = setTimeout(() => {
          if (cancelled) return
          setTemplateLoading(false)

          autoPlayTimerRef.current = setTimeout(() => {
            if (cancelled) return
            setActiveStep(3)
          }, 1500)
        }, 2000)
      }, 1500)
    }, 2000)

    return () => {
      cancelled = true
      clearAutoPlayTimers()
    }
  }, [hasScrolledIntoView, isAutoPlayDisabled])

  const handleSelectBrand = (brand: Brand) => {
    handleUserInteraction()
    setSelectedBrand(brand)
    setScanStepText(`Scanning ${brand.url}...`)
    setBrandLoading(true)

    setTimeout(() => {
      setScanStepText(`Processing ${brand.name} brand assets & ad copies...`)
      setTimeout(() => {
        setBrandLoading(false)
        setBrandRevealed(true)
        setActiveStep(2)
      }, 1000)
    }, 1000)
  }

  const handleSelectTemplate = (template: Template) => {
    handleUserInteraction()
    setSelectedTemplate(template)
    setTemplateLoading(true)

    setTimeout(() => {
      setTemplateLoading(false)
      setActiveStep(3)
    }, 2000)
  }

  const handleCardTitleClick = (stepNum: StepNumber) => {
    handleUserInteraction()
    setActiveStep(stepNum)

    if (stepNum === 1 && !brandRevealed && !brandLoading) {
      handleSelectBrand(selectedBrand || BRANDS[0])
    }
  }

  const handleWebsiteSubmit = (url: string) => {
    // No /signup route on this marketing site — all CTAs go to app.adrender.app.
    // Attach ?url= for the planned prefill/auto-scan flow; the app does not
    // consume this param yet.
    const dest = new URL(getAppUrl())
    dest.searchParams.set('url', url)
    window.location.href = dest.toString()
  }

  const stepsInfo = [
    {
      num: 1 as StepNumber,
      title: 'Pick a brand',
      description: 'See how it works with a demo brand',
    },
    {
      num: 2 as StepNumber,
      title: 'Choose a template',
      description: 'Pick from real, high-performing ad formats',
    },
    {
      num: 3 as StepNumber,
      title: 'See your ads',
      description: 'Then make it yours in seconds',
    },
  ]

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

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            How It Works — Demo
          </h2>
        </div>

        <div className="space-y-4">
          {stepsInfo.map((step) => {
            const isExpanded = activeStep === step.num

            return (
              <div
                key={step.num}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isExpanded
                    ? 'border-white/10 bg-[#0a0a0f] shadow-2xl ring-1 ring-white/5'
                    : 'border-white/5 bg-[#08080c] opacity-70 hover:opacity-100'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleCardTitleClick(step.num)}
                  className={`group flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left sm:p-6 ${
                    isExpanded ? 'border-b border-white/5 bg-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                        isExpanded
                          ? 'bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white shadow-lg shadow-[color-mix(in_srgb,var(--accent-cyan)_20%,transparent)]'
                          : 'border border-white/20 text-white/40 group-hover:border-[var(--accent-cyan)] group-hover:text-[var(--accent-cyan)]'
                      }`}
                    >
                      {step.num}
                    </div>

                    <div>
                      <h3
                        className={`text-lg font-medium transition-colors sm:text-xl ${
                          isExpanded ? 'text-white' : 'text-white/60 group-hover:text-white'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-0.5 text-xs transition-colors sm:text-sm ${
                          isExpanded ? 'text-white/50' : 'text-white/30'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden text-xs uppercase tracking-widest text-white/40 sm:inline">
                      Step {step.num} of 3
                    </span>
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-[var(--accent-cyan)]' : 'group-hover:text-white/60'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${step.num}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 sm:p-8">
                        {step.num === 1 && (
                          <BrandSelector
                            brands={BRANDS}
                            selectedBrand={selectedBrand}
                            isLoading={brandLoading}
                            isRevealed={brandRevealed}
                            onSelectBrand={handleSelectBrand}
                            scanStepText={scanStepText}
                          />
                        )}

                        {step.num === 2 && (
                          <TemplateSelector
                            templates={TEMPLATES}
                            selectedTemplate={selectedTemplate}
                            isLoading={templateLoading}
                            onSelectTemplate={handleSelectTemplate}
                          />
                        )}

                        {step.num === 3 && (
                          <FinalAdsPreview
                            selectedBrand={selectedBrand}
                            selectedTemplate={selectedTemplate}
                            onUserInteraction={handleUserInteraction}
                            onWebsiteSubmit={handleWebsiteSubmit}
                          />
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
