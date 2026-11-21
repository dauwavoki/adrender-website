import { useEffect, useState, useSyncExternalStore } from 'react'
import { ALL_STILLS } from '../showcaseData'

const PHONE_QUERY = '(max-width: 767px)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(PHONE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/** True on phone-width screens. The server renders desktop, then phones swap after hydration. */
export function usePhoneWidth() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false,
  )
}

/** Warm every still once, a moment after load, so scene changes never pop in. */
export function useWarmStills() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      for (const src of ALL_STILLS) {
        const img = new Image()
        img.decoding = 'async'
        img.src = src
      }
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [])
}

export function useReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduce(query.matches)
    query.addEventListener('change', sync)
    const timer = window.setTimeout(sync, 0)
    return () => {
      window.clearTimeout(timer)
      query.removeEventListener('change', sync)
    }
  }, [])
  return reduce
}

/** Design sizes of the two apps. */
export const DESKTOP_APP = { w: 1280, h: 800 }
export const PHONE_APP = { w: 390, h: 844 }
