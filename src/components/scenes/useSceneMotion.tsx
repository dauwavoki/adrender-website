import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'

export type ScenePhase = 'off' | 'play' | 'pause'

const listeners = new Map<Element, (inView: boolean) => void>()
let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) listeners.get(entry.target)?.(entry.isIntersecting)
    },
    { threshold: 0.28 },
  )
  return observer
}

/** One shared observer. Off = static final frame (also reduced motion). */
export function useSceneMotion(ref: RefObject<HTMLElement | null>): ScenePhase {
  const [phase, setPhase] = useState<ScenePhase>('off')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const onView = (inView: boolean) => {
      if (motion.matches) {
        setPhase('off')
        return
      }
      setPhase((current) => (inView ? 'play' : current === 'off' ? 'off' : 'pause'))
    }

    const onMotion = () => {
      if (motion.matches) setPhase('off')
    }

    listeners.set(el, onView)
    const obs = getObserver()
    obs.observe(el)
    motion.addEventListener('change', onMotion)
    if (motion.matches) setPhase('off')

    return () => {
      listeners.delete(el)
      obs.unobserve(el)
      motion.removeEventListener('change', onMotion)
    }
  }, [ref])

  return phase
}

const PhaseContext = createContext<ScenePhase>('off')

export function ScenePhaseProvider({ phase, children }: { phase: ScenePhase; children: ReactNode }) {
  return <PhaseContext.Provider value={phase}>{children}</PhaseContext.Provider>
}

export function useScenePhase() {
  return useContext(PhaseContext)
}

/**
 * Step index for a loop. The first render (and reduced motion) is the last
 * step, so static HTML is the finished scene. Pauses between views.
 */
export function useHoldStep(phase: ScenePhase, count: number, ms: number) {
  const finalIndex = Math.max(0, count - 1)
  const [step, setStep] = useState(finalIndex)
  const stepRef = useRef(finalIndex)
  const started = useRef(false)

  useEffect(() => {
    if (phase === 'off') {
      started.current = false
      stepRef.current = finalIndex
      setStep(finalIndex)
      return
    }
    if (phase !== 'play') return
    if (!started.current) {
      started.current = true
      stepRef.current = 0
      setStep(0)
    }
    const id = window.setInterval(() => {
      const next = (stepRef.current + 1) % count
      stepRef.current = next
      setStep(next)
    }, ms)
    return () => window.clearInterval(id)
  }, [phase, count, ms, finalIndex])

  return step
}
