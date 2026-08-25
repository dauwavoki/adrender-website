import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BrandLogoLink } from './BrandLogoLink'
import { MoreNav } from './MoreNav'
import { SolutionsNav } from './SolutionsNav'
import { useAppUrl } from '../hooks/useAppUrl'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-[var(--accent-cyan)]' : 'text-zinc-400 hover:text-[var(--accent-cyan)]'
  }`

export function Header() {
  const [open, setOpen] = useState(false)
  const appUrl = useAppUrl()

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/85 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-4 py-4 md:px-6">
        <div className="flex items-center">
          <div className="flex min-w-0 flex-1 items-center">
            <BrandLogoLink variant="nav" />
          </div>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-row items-center gap-5 lg:flex xl:gap-8"
            aria-label="Primary"
          >
            <a href="/#how-it-works" className="text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]">
              How It Works
            </a>
            <a href="/#features" className="text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]">
              Features
            </a>
            <a href="/#pricing" className="text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]">
              Pricing
            </a>
            <SolutionsNav variant="desktop" />
            <NavLink to="/blog" className={navLinkClass}>
              Blog
            </NavLink>
            <MoreNav />
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <a
              href={appUrl}
              className="hidden text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)] lg:inline-flex"
            >
              Sign In
            </a>
            <a
              href={appUrl}
              className="btn-cta hidden rounded-lg px-4 py-2 text-sm font-semibold lg:inline-flex"
            >
              Start Free
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-300 transition hover:border-[color:color-mix(in_srgb,var(--accent-cyan)_25%,transparent)] lg:hidden"
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        <nav
          className={`mt-3 flex flex-col gap-1 border-t border-white/[0.06] pt-3 lg:hidden ${open ? 'flex' : 'hidden'}`}
          aria-label="Mobile primary"
        >
          <a
            href="/#how-it-works"
            className="py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]"
            onClick={() => setOpen(false)}
          >
            How It Works
          </a>
          <a
            href="/#features"
            className="py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]"
            onClick={() => setOpen(false)}
          >
            Features
          </a>
          <a
            href="/#pricing"
            className="py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]"
            onClick={() => setOpen(false)}
          >
            Pricing
          </a>
          <div className="py-2">
            <SolutionsNav variant="mobile" onNavigate={() => setOpen(false)} />
          </div>
          <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/blog" className={navLinkClass} onClick={() => setOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/affiliates" className={navLinkClass} onClick={() => setOpen(false)}>
            Affiliates
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <a
            href={appUrl}
            className="py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]"
            onClick={() => setOpen(false)}
          >
            Sign In
          </a>
          <a
            href={appUrl}
            className="btn-cta mt-2 rounded-lg px-4 py-2.5 text-center text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            Start Free
          </a>
        </nav>
      </div>
    </header>
  )
}
