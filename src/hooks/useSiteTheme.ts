import { useCallback, useEffect, useState } from 'react'

export const SITE_THEME_KEY = 'adrender-site-theme'
export type SiteTheme = 'light' | 'dark'

const listeners = new Set<(theme: SiteTheme) => void>()

function readTheme(): SiteTheme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(next: SiteTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(next)
  try {
    localStorage.setItem(SITE_THEME_KEY, next)
  } catch {
    /* private mode */
  }
  listeners.forEach((listener) => listener(next))
}

/**
 * Light is the first render so it matches SSG (`class="light"`).
 * The no-flash script may already have set `dark` on <html>; we sync after mount.
 */
export function useSiteTheme() {
  const [theme, setThemeState] = useState<SiteTheme>('light')

  useEffect(() => {
    const sync = (next: SiteTheme) => setThemeState(next)
    listeners.add(sync)
    sync(readTheme())
    return () => {
      listeners.delete(sync)
    }
  }, [])

  const setTheme = useCallback((next: SiteTheme) => {
    applyTheme(next)
  }, [])

  const toggle = useCallback(() => {
    applyTheme(readTheme() === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, setTheme, toggle }
}
