import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to hash targets after client navigation (e.g. /about#templates). */
export function HashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace(/^#/, '')
    const el = document.getElementById(id)
    if (!el) return
    // Defer so layout/SSG hydrate settles before measuring.
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [pathname, hash])

  return null
}
