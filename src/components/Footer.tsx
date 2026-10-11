import { Link } from 'react-router-dom'
import { BrandLogoLink } from './BrandLogoLink'
import { blogIndexPath } from '../data/blog'
import { solutions, solutionPath } from '../data/solutions'

function BadgeSet({ clone = false }: { clone?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={clone || undefined}
      data-badge-clone={clone ? '' : undefined}
    >
      <a
        href="https://www.producthunt.com/products/adrender?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-adrender"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block max-w-full shrink-0"
      >
        <img
          alt="AdRender - Hundreds of real, on-brand ads in minutes — not AI slop | Product Hunt"
          width={250}
          height={54}
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1185138&theme=light&t=1791703582287"
          loading="lazy"
          className="h-auto w-[250px] max-w-full object-contain"
        />
      </a>
      <a
        href="https://startupbase.io/products/adrender?utm_source=startupbase&utm_medium=badge&utm_campaign=launch-badge-dark"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0"
      >
        <img
          src="https://statics.startupbase.io/site/badges/launched-on-sb-dark.svg"
          alt="Launched on StartupBase"
          height={55}
          className="h-[54px] w-auto object-contain"
        />
      </a>
      <a
        href="https://easylaunch.dev/marketing/adrender"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0"
      >
        <img
          src="https://easylaunch.dev/badge/easylaunch-badge-light.svg"
          alt="Featured on EasyLaunch"
          width={188}
          height={56}
          className="h-[54px] w-auto object-contain"
        />
      </a>
      <a
        href="https://fazier.com/launches/adrender.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0"
      >
        <img
          src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark"
          width={120}
          alt="Fazier badge"
          className="h-[54px] w-auto object-contain"
        />
      </a>
      <a
        href="https://saascity.io"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0"
      >
        <img
          src="https://saascity.io/badges/featured-dark.svg"
          alt="Featured on SaaSCity"
          width={150}
          height={54}
          className="h-[54px] w-auto object-contain"
        />
      </a>
      <a
        href="https://smollaunch.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0"
      >
        <img
          src="https://smollaunch.com/badges/featured.svg"
          alt="AdRender — Featured on Smol Launch"
          loading="lazy"
          width={250}
          height={60}
          className="h-[54px] w-auto object-contain"
        />
      </a>
    </div>
  )
}

/** Copies of one badge set. The scroll moves -50%, so half the track must stay at least as wide as a 2560px viewport. */
const BADGE_SET_COPIES = 6

function FooterBadgeCarousel() {
  return (
    <section aria-label="As featured on" className="footer-badge-carousel">
      <div className="footer-badge-track" style={{ animationDuration: '94s' }}>
        {Array.from({ length: BADGE_SET_COPIES }, (_, index) => (
          <BadgeSet key={index} clone={index > 0} />
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <>
      <FooterBadgeCarousel />
      <footer className="border-t border-white/[0.06] bg-[#08080c]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:flex-row md:items-start md:justify-between md:px-6">
          <div>
            <BrandLogoLink variant="footer" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              AI-powered static and video ads for anyone running paid social. Also available as a{' '}
              <a
                href="https://apps.shopify.com/search?q=AdRender"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 underline decoration-white/20 underline-offset-2 transition hover:text-[var(--accent-cyan)]"
              >
                native app on the Shopify App Store
              </a>
              , billed through Shopify.
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
