import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-[var(--accent-cyan)]' : 'text-zinc-400 hover:text-[var(--accent-cyan)]'
  }`

const MORE_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/affiliates', label: 'Affiliates' },
  { to: '/contact', label: 'Contact' },
] as const

const MORE_PATHS: Set<string> = new Set(MORE_LINKS.map((l) => l.to))

/**
 * Desktop "More" dropdown — same pattern as SolutionsNav:
 * child <a href> links are always in the DOM (CSS-collapsed when closed),
 * never injected after click. Mobile hamburger still lists these links
 * at the top level.
 */
export function MoreNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const wrapRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const onMore = MORE_PATHS.has(location.pathname)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
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
  }, [open])

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 ${navLinkClass({ isActive: onMore })}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        More
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      <div
        id={menuId}
        role="menu"
        hidden={!open}
        className={`absolute left-1/2 top-full z-50 w-48 max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-3 ${open ? '' : 'hidden'}`}
      >
        <div className="overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#12121a] py-2 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]">
          {MORE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              role="menuitem"
              className={({ isActive }) =>
                `block px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'text-[var(--accent-cyan)]' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
