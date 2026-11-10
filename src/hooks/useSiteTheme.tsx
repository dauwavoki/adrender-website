import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export const SITE_THEME_KEY = 'adrender-site-theme'
export type SiteTheme = 'light' | 'dark'

type FadeKind = 'toggle' | 'device'

const TOGGLE_MS = 600
const DEVICE_MS = 1200

const listeners = new Set<(theme: SiteTheme) => void>()
let fadeToken = 0

function deviceTheme(): SiteTheme {
  if (typeof window === 'undefined') return 'light'
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function readSaved(): SiteTheme | null {
  if (typeof window === 'undefined') return null
  try {
    const value = localStorage.getItem(SITE_THEME_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function readTheme(): SiteTheme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/** Keep the icon button label in sync before React paints, so the fade snapshot matches. */
function syncControls(next: SiteTheme) {
  const label = next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  document.querySelectorAll<HTMLButtonElement>('.site-theme-toggle').forEach((btn) => {
    btn.setAttribute('aria-label', label)
    btn.setAttribute('data-tooltip', label)
  })
  document.querySelectorAll<HTMLButtonElement>('.site-segment button[data-theme]').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.theme === next ? 'true' : 'false')
  })
}

function commitClass(next: SiteTheme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(next)
  syncControls(next)
  listeners.forEach((listener) => listener(next))
}

function clearFadeState() {
  const root = document.documentElement
  root.classList.remove('theme-vt', 'theme-color-transition')
  delete root.dataset.themeFade
  root.style.removeProperty('--theme-fade')
}

function paintTheme(next: SiteTheme, fade: FadeKind | 'none') {
  if (typeof document === 'undefined') return
  const current = readTheme()
  const reduced = prefersReducedMotion()
  if (current === next || fade === 'none' || reduced) {
    fadeToken += 1
    clearFadeState()
    if (current !== next) commitClass(next)
    else listeners.forEach((listener) => listener(next))
    return
  }

  const ms = fade === 'device' ? DEVICE_MS : TOGGLE_MS
  const token = ++fadeToken
  const root = document.documentElement
  root.dataset.themeFade = fade
  root.style.setProperty('--theme-fade', `${ms}ms`)

  const finish = () => {
    if (fadeToken !== token) return
    clearFadeState()
  }

  const start = (
    document as Document & {
      startViewTransition?: (update: () => void) => { finished: Promise<void> }
    }
  ).startViewTransition

  if (typeof start === 'function') {
    root.classList.add('theme-vt')
    try {
      const transition = start.call(document, () => {
        commitClass(next)
      })
      transition.finished.then(finish, finish)
      return
    } catch {
      root.classList.remove('theme-vt')
    }
  }

  root.classList.add('theme-color-transition')
  // The transition property has to be applied before the color change, or the browser skips the fade.
  void root.offsetWidth
  commitClass(next)
  window.setTimeout(finish, ms + 50)
}

/**
 * A choice that matches the device is not stored, so the site keeps following the device.
 * If storage throws, the visible theme stays on the device setting.
 */
function persistChoice(next: SiteTheme): SiteTheme {
  const device = deviceTheme()
  try {
    if (next === device) localStorage.removeItem(SITE_THEME_KEY)
    else localStorage.setItem(SITE_THEME_KEY, next)
    return next
  } catch {
    return device
  }
}

function chooseTheme(next: SiteTheme) {
  paintTheme(persistChoice(next), 'toggle')
}

function watchDevice() {
  if (typeof window === 'undefined') return () => {}
  let media: MediaQueryList
  try {
    media = window.matchMedia('(prefers-color-scheme: dark)')
  } catch {
    return () => {}
  }
  const onChange = () => {
    if (readSaved() !== null) return
    paintTheme(deviceTheme(), 'device')
  }
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

type SiteThemeContextValue = {
  theme: SiteTheme
  setTheme: (next: SiteTheme) => void
  toggle: () => void
}

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null)

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  // Light matches the SSG `class="light"`. The no-flash script may already have corrected <html>.
  const [theme, setThemeState] = useState<SiteTheme>('light')

  useEffect(() => {
    const sync = (next: SiteTheme) => setThemeState(next)
    listeners.add(sync)
    sync(readTheme())
    const detach = watchDevice()
    return () => {
      listeners.delete(sync)
      detach()
    }
  }, [])

  const setTheme = useCallback((next: SiteTheme) => {
    chooseTheme(next)
  }, [])

  const toggle = useCallback(() => {
    chooseTheme(readTheme() === 'dark' ? 'light' : 'dark')
  }, [])

  return <SiteThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</SiteThemeContext.Provider>
}

export function useSiteTheme() {
  const value = useContext(SiteThemeContext)
  if (!value) throw new Error('useSiteTheme must be used within SiteThemeProvider')
  return value
}
