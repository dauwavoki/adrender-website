import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { solutions, solutionPath } from '../data/solutions'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-[var(--accent-cyan)]' : 'text-zinc-400 hover:text-[var(--accent-cyan)]'
  }`

type SolutionsNavProps = {
  variant: 'desktop' | 'mobile'
  onNavigate?: () => void
}

export function SolutionsNav({ variant, onNavigate }: SolutionsNavProps) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const wrapRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const onSolutions = location.pathname.startsWith('/solutions')

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open || variant !== 'desktop') return
    const onPointer = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, variant])

  if (variant === 'mobile') {
    return (
      <div>
        <div className="flex items-center justify-between">
          <NavLink to="/solutions" className={navLinkClass} onClick={onNavigate}>
            Solutions
          </NavLink>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition hover:text-[var(--accent-cyan)]"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Hide solutions' : 'Show solutions'}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div id={menuId} hidden={!open} className={`mt-1 flex flex-col gap-1 border-l border-white/[0.08] pl-3 ${open ? '' : 'hidden'}`}>
          {solutions.map((s) => (
            <NavLink
              key={s.slug}
              to={solutionPath(s.slug)}
              className={navLinkClass}
              onClick={onNavigate}
            >
              {s.navLabel}
            </NavLink>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to="/solutions"
        className={({ isActive }) =>
          `inline-flex items-center gap-1 ${navLinkClass({ isActive: isActive || onSolutions })}`
        }
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen(false)}
      >
        Solutions
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </NavLink>
      <div
        id={menuId}
        role="menu"
        hidden={!open}
        className={`absolute left-1/2 top-full z-50 w-[36rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-3 ${open ? '' : 'hidden'}`}
      >
        <div className="max-h-[min(70vh,32rem)] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#12121a] py-2 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-2">
            {solutions.map((s) => (
              <NavLink
                key={s.slug}
                to={solutionPath(s.slug)}
                role="menuitem"
                className={({ isActive }) =>
                  `block px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-[var(--accent-cyan)]' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                  }`
                }
              >
                {s.navLabel}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
