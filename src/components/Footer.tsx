import { Link } from 'react-router-dom'
import { BrandLogoLink } from './BrandLogoLink'
import { blogIndexPath } from '../data/blog'
import { solutions, solutionPath } from '../data/solutions'

function LaunchNestBadge() {
  return (
    <a
      href="https://launch-nest-ai.base44.app/products/YOUR_PRODUCT_ID?ref=badge&from=adrender.app"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 2,
        padding: '8px 14px',
        borderRadius: 10,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        background: '#5B5CFF',
        boxShadow: '0 4px 14px rgba(91,92,255,0.35)',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path d="M13.5 1.5L4.5 10.5L1.5 12L4.5 13.5L13.5 22.5L16.5 19.5L9 12L16.5 4.5L13.5 1.5Z" fill="white" />
          <circle cx="12" cy="8" r="2" fill="white" opacity={0.9} />
        </svg>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '1.2px',
            color: 'white',
            opacity: 0.85,
          }}
        >
          LAUNCHED ON
        </span>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.02em',
          }}
        >
          LaunchNest
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            background: 'rgba(255,255,255,0.22)',
            color: 'white',
            padding: '2px 5px',
            borderRadius: 4,
            lineHeight: 1,
            letterSpacing: '0.5px',
          }}
        >
          LN
        </span>
      </span>
    </a>
  )
}

export function Footer() {
  return (
    <>
      <div className="flex justify-center px-4 py-6">
        <LaunchNestBadge />
      </div>
      <footer className="border-t border-white/[0.06] bg-[#08080c]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <BrandLogoLink variant="footer" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
            AI-powered static and video ads for anyone running paid social — with optional Shopify sync when you want catalog in one click.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://fazier.com/launches/adrender.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark"
                width={120}
                alt="Fazier badge"
              />
            </a>
            <a
              href="https://saascity.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://saascity.io/badges/featured-dark.svg"
                alt="Featured on SaaSCity"
                width={150}
                height={54}
              />
            </a>
            <a
              href="https://startupbase.io/products/adrender?utm_source=startupbase&utm_medium=badge&utm_campaign=launch-badge-dark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://statics.startupbase.io/site/badges/launched-on-sb-dark.svg"
                alt="Launched on StartupBase"
                height={55}
                className="h-[55px] w-auto"
              />
            </a>
            <a
              href="https://easylaunch.dev/marketing/adrender"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://easylaunch.dev/badge/easylaunch-badge-light.svg"
                alt="Featured on EasyLaunch"
                width={188}
                height={56}
              />
            </a>
            <a
              href="https://www.productlaunchify.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Featured on Product Launchify"
              aria-label="Featured on Product Launchify"
              className="inline-block"
            >
              <img
                src="https://www.productlaunchify.com/images/badges/powered-by-light.svg"
                alt="Featured on Product Launchify"
                width={231}
                height={55}
              />
            </a>
            <a
              href="https://smollaunch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://smollaunch.com/badges/featured.svg"
                alt="AdRender — Featured on Smol Launch"
                loading="lazy"
                width={250}
                height={60}
              />
            </a>
          </div>
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
            <span className="font-medium text-zinc-300">Solutions</span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {solutions.map((s) => (
                <Link
                  key={s.slug}
                  to={solutionPath(s.slug)}
                  className="text-zinc-500 transition hover:text-[var(--accent-cyan)]"
                >
                  {s.navLabel}
                </Link>
              ))}
            </div>
            <Link to="/solutions" className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              All solutions
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-300">Compare</span>
            <Link to={blogIndexPath('comparisons')} className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              Compare
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
            <Link to={blogIndexPath('notes')} className="text-zinc-500 transition hover:text-[var(--accent-cyan)]">
              Blog
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04] py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} ADRENDER LLC. All rights reserved.
      </div>
    </footer>
    </>
  )
}
