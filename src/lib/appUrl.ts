export const APP_BASE = 'https://app.adrender.app'

const ATTR_PARAMS = ['src', 'utm_source', 'utm_medium', 'utm_campaign'] as const
const ATTR_STORAGE_KEY = 'adrender.attribution'

type AttrKey = (typeof ATTR_PARAMS)[number]
type AttrBag = Partial<Record<AttrKey, string>>

function readStoredAttribution(): AttrBag {
  try {
    const raw = sessionStorage.getItem(ATTR_STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    const bag: AttrBag = {}
    for (const key of ATTR_PARAMS) {
      const value = (parsed as Record<string, unknown>)[key]
      if (typeof value === 'string' && value) bag[key] = value
    }
    return bag
  } catch {
    return {}
  }
}

function writeStoredAttribution(bag: AttrBag) {
  try {
    sessionStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(bag))
  } catch {
    // Private mode / quota — forwarding from the current URL still works.
  }
}

/** Implicit src from comparison / landing / solutions paths when none is set. */
function defaultSrcFromPath(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (/^\/vs-/.test(path) || /^\/lp\//.test(path) || /^\/solutions\//.test(path)) {
    return path.slice(1)
  }
  return null
}

/**
 * Start Free / app deep links. Forwards `?ref=` from the current page when present
 * so affiliate codes stay in the URL only — never rendered as visible text.
 *
 * Also forwards marketing attribution (`src`, `utm_source`, `utm_medium`, `utm_campaign`)
 * from the current query string, falling back to values persisted in sessionStorage so
 * SPA navigation does not drop them. When no src is set, comparison / landing / solutions
 * pages default src from the path (e.g. `/vs-adcreative` → `src=vs-adcreative`).
 */
export function getAppUrl(path = ''): string {
  const url = new URL(path || '/', APP_BASE)
  if (typeof window !== 'undefined') {
    const search = new URLSearchParams(window.location.search)
    const next: AttrBag = { ...readStoredAttribution() }

    for (const key of ATTR_PARAMS) {
      const value = search.get(key)
      if (value) next[key] = value
    }

    if (!next.src) {
      const fromPath = defaultSrcFromPath(window.location.pathname)
      if (fromPath) next.src = fromPath
    }

    writeStoredAttribution(next)

    for (const key of ATTR_PARAMS) {
      const value = next[key]
      if (value) url.searchParams.set(key, value)
    }

    const ref = search.get('ref')
    if (ref) url.searchParams.set('ref', ref)
  }
  const href = url.toString()
  // Avoid trailing slash-only path noise for the root app URL
  return href.endsWith('/') && url.pathname === '/' && !url.search ? APP_BASE : href
}
