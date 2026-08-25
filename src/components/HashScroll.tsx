import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Global route-change scroll behavior (mounted once at the router):
 * - Hash present → scroll to that in-page target (e.g. /#how-it-works, /about#templates).
 * - No hash → jump to the top of the new page.
 *
 * `html { scroll-behavior: smooth }` is left intact for in-page anchors; it is
 * temporarily disabled so route changes do not animate from the prior page's
 * scroll position.
 */
export function HashScroll() {
  const { pathname, hash, search } = useLocation()

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '')
      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(frame)
    }

    const html = document.documentElement
    html.style.setProperty('scroll-behavior', 'auto', 'important')
    html.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)

    const frame = requestAnimationFrame(() => {
      html.style.removeProperty('scroll-behavior')
    })
    return () => {
      cancelAnimationFrame(frame)
      html.style.removeProperty('scroll-behavior')
    }
  }, [pathname, hash, search])

  return null
}
