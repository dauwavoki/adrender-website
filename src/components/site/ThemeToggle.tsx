import { Moon, Sun } from '@phosphor-icons/react'
import { useSiteTheme } from '../../hooks/useSiteTheme'

export function ThemeToggle() {
  const { theme, toggle } = useSiteTheme()
  const toDark = theme !== 'dark'
  const label = toDark ? 'Switch to dark mode' : 'Switch to light mode'

  return (
    <button type="button" className="site-icon-btn site-theme-toggle" onClick={toggle} aria-label={label} data-tooltip={label}>
      <Moon size={18} className="site-theme-icon site-theme-icon-moon" aria-hidden />
      <Sun size={18} className="site-theme-icon site-theme-icon-sun" aria-hidden />
    </button>
  )
}

export function ThemeSegment() {
  const { theme, setTheme } = useSiteTheme()

  return (
    <div className="site-segment" role="group" aria-label="Color theme">
      <button type="button" data-theme="light" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>
        Light
      </button>
      <button type="button" data-theme="dark" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
        Dark
      </button>
    </div>
  )
}

/** Compact light/dark pill with sun and moon icons (phone menu). */
export function ThemePill() {
  const { theme, setTheme } = useSiteTheme()

  return (
    <div className="site-theme-pill" role="group" aria-label="Color theme">
      <button type="button" aria-pressed={theme === 'light'} aria-label="Light mode" onClick={() => setTheme('light')}>
        <Sun size={16} aria-hidden />
      </button>
      <button type="button" aria-pressed={theme === 'dark'} aria-label="Dark mode" onClick={() => setTheme('dark')}>
        <Moon size={16} aria-hidden />
      </button>
    </div>
  )
}
