import { Link } from 'react-router-dom'
import { BrandLogoLink } from './BrandLogoLink'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#08080c]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <BrandLogoLink variant="footer" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
            AI-powered static and video ads for anyone running paid social — with optional Shopify sync when you want catalog in one click.
          </p>
        </div>
        <div className="flex flex-wrap gap-10 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-300">Product</span>
            <a href="/#features" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              Features
            </a>
            <a href="/#pricing" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              Pricing
            </a>
            <a href="/#faq" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              FAQ
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-300">Compare</span>
            <Link to="/vs-adcreative" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              vs AdCreative.ai
            </Link>
            <Link to="/vs-canva" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              vs Canva
            </Link>
            <Link to="/vs-predis" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              vs Predis
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-300">Company</span>
            <Link to="/about" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              About
            </Link>
            <Link to="/affiliates" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              Affiliates
            </Link>
            <Link to="/contact" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              Contact
            </Link>
            <Link to="/terms" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              Terms
            </Link>
            <Link to="/privacy" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              Privacy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-300">Blog</span>
            <Link to="/blog" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              All posts
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
