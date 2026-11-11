import { useSyncExternalStore } from 'react'
import { banner, isBannerActive } from '../data/banner'

function subscribe() {
  return () => {}
}

/** Live clock. Used after hydration, and for client-only renders. */
function getSnapshot() {
  return isBannerActive()
}

/**
 * Prerender decision. On the server this is the build-time clock, so an expired
 * banner is omitted from the HTML. In the browser it matches that HTML, then
 * `getSnapshot` hides it if this build is older than `banner.endsAt`.
 */
function getServerSnapshot() {
  if (typeof document === 'undefined') return isBannerActive()
  const root = document.getElementById('root')
  if (!root?.hasChildNodes()) return isBannerActive()
  return root.querySelector('.site-banner') != null
}

export function BetaBanner() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (!visible) return null

  return (
    <div className="site-banner">
      <a href={banner.href}>
        <span aria-hidden>🎨 </span>
        Render on-brand ads in minutes — 20% off your first month. <span className="site-inline-link">Start free</span>
      </a>
    </div>
  )
}
