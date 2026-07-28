const APP_BASE = 'https://app.adrender.app'

/**
 * Start Free / app deep links. Forwards `?ref=` from the current page when present
 * so affiliate codes stay in the URL only — never rendered as visible text.
 */
export function getAppUrl(path = ''): string {
  const url = new URL(path || '/', APP_BASE)
  if (typeof window !== 'undefined') {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref) url.searchParams.set('ref', ref)
  }
  const href = url.toString()
  // Avoid trailing slash-only path noise for the root app URL
  return href.endsWith('/') && url.pathname === '/' && !url.search ? APP_BASE : href
}
