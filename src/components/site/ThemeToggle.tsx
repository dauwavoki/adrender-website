import { Moon, Sun } from '@phosphor-icons/react'
import { useSiteTheme } from '../../hooks/useSiteTheme'

export function ThemeToggle() {
  const { theme, toggle } = useSiteTheme()
  const toDark = theme !== 'dark'
  const label = toDark ? 'Switch to dark mode' : 'Switch to light mode'

  return (
    <button type="button" className="site-icon-btn" onClick={toggle} aria-label={label} data-tooltip={label}>
      {toDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}

export function ThemeSegment() {
  const { theme, setTheme } = useSiteTheme()

  return (
    <div className="site-segment" role="group" aria-label="Color theme">
      <button type="button" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>
        Light
      </button>
      <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
        Dark
      </button>
    </div>
  )
}
