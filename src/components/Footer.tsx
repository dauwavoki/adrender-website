import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#08080c]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <Link to="/" className="font-heading text-lg font-bold tracking-tight text-white">
            Ad<span className="text-[#6366f1]">Render</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
            AI-powered static ads for Shopify merchants and solo marketers.
          </p>
        </div>
        <div className="flex flex-wrap gap-10 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-300">Product</span>
            <a href="/#features" className="text-zinc-500 transition hover:text-white">
              Features
            </a>
            <a href="/#pricing" className="text-zinc-500 transition hover:text-white">
              Pricing
            </a>
            <a href="/#waitlist" className="text-zinc-500 transition hover:text-white">
              Waitlist
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-300">Company</span>
            <a href="/#about" className="text-zinc-500 transition hover:text-white">
              About
            </a>
            <Link to="/contact" className="text-zinc-500 transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04] py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} ADRENDER LLC. All rights reserved.
      </div>
    </footer>
  )
}
