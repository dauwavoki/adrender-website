import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
  }`

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/85 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-4 py-4 md:px-6">
        <div className="flex items-center">
          <div className="flex min-w-0 flex-1 items-center">
            <Link to="/" className="font-heading text-lg font-bold tracking-tight text-white">
              Ad<span className="text-[#6366f1]">Render</span>
            </Link>
          </div>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-row items-center gap-8 md:flex"
            aria-label="Primary"
          >
            <a href="/#features" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Features
            </a>
            <a href="/#pricing" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Pricing
            </a>
            <a href="/#about" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              About
            </a>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <a
              href="/#waitlist"
              className="hidden rounded-lg bg-[#6366f1] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-[#818cf8] md:inline-flex"
            >
              Get Early Access
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-300 md:hidden"
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
          className={`mt-3 flex flex-col gap-1 border-t border-white/[0.06] pt-3 md:hidden ${open ? 'flex' : 'hidden'}`}
          aria-label="Mobile primary"
        >
          <a
            href="/#features"
            className="py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            onClick={() => setOpen(false)}
          >
            Features
          </a>
          <a
            href="/#pricing"
            className="py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            onClick={() => setOpen(false)}
          >
            Pricing
          </a>
          <a
            href="/#about"
            className="py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            onClick={() => setOpen(false)}
          >
            About
          </a>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <a
            href="/#waitlist"
            className="mt-2 rounded-lg bg-[#6366f1] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#818cf8]"
            onClick={() => setOpen(false)}
          >
            Get Early Access
          </a>
        </nav>
      </div>
    </header>
  )
}
