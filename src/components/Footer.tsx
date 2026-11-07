import { Link } from 'react-router-dom'
import { blogIndexPath } from '../data/blog'
import { comparisonPath, comparisons } from '../data/comparisons'
import { solutionPath, solutions } from '../data/solutions'
import { BrandLogoLink } from './BrandLogoLink'
import { SplitTitle } from './site/SplitTitle'
import { ThemeToggle } from './site/ThemeToggle'

function BadgeSet({ clone = false }: { clone?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={clone || undefined} data-badge-clone={clone ? '' : undefined}>
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
        <img src="https://statics.startupbase.io/site/badges/launched-on-sb-dark.svg" alt="Launched on StartupBase" height={55} className="h-[54px] w-auto object-contain" />
      </a>
      <a href="https://easylaunch.dev/marketing/adrender" target="_blank" rel="noopener noreferrer" className="inline-block shrink-0">
        <img src="https://easylaunch.dev/badge/easylaunch-badge-light.svg" alt="Featured on EasyLaunch" width={188} height={56} className="h-[54px] w-auto object-contain" />
      </a>
      <a href="https://fazier.com/launches/adrender.app" target="_blank" rel="noopener noreferrer" className="inline-block shrink-0">
        <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark" width={120} alt="Fazier badge" className="h-[54px] w-auto object-contain" />
      </a>
      <a href="https://saascity.io" target="_blank" rel="noopener noreferrer" className="inline-block shrink-0">
        <img src="https://saascity.io/badges/featured-dark.svg" alt="Featured on SaaSCity" width={150} height={54} className="h-[54px] w-auto object-contain" />
      </a>
      <a href="https://smollaunch.com" target="_blank" rel="noopener noreferrer" className="inline-block shrink-0">
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

const BADGE_SET_COPIES = 6

export function Footer() {
  return (
    <>
      <section aria-label="As featured on" className="footer-badge-carousel">
        <div className="footer-badge-track" style={{ animationDuration: '94s' }}>
          {Array.from({ length: BADGE_SET_COPIES }, (_, index) => (
            <BadgeSet key={index} clone={index > 0} />
          ))}
        </div>
      </section>
      <footer className="site-footer">
        <div className="site-column">
          <div className="site-footer-grid">
            <div>
              <BrandLogoLink variant="footer" />
              <SplitTitle as="p" className="site-footer-tagline" lead="Create more ads." rest="Find more winners." />
              <p className="site-footer-blurb">
                AI-powered image and video ads for anyone running paid social — whether you spend $500 or $50K+ a month,
                and whether it&apos;s your whole budget or your testing budget. Also available as a{' '}
                <a
                  href="https://apps.shopify.com/search?q=AdRender"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-inline-link"
                >
                  native app on the Shopify App Store
                </a>
                , billed through Shopify.
              </p>
            </div>
            <div className="site-footer-cols">
              <div className="site-footer-col">
                <h2>Product</h2>
                <a href="/#how-it-works">How it works</a>
                <a href="/#features">Features</a>
                <a href="/#pricing">Pricing</a>
                <Link to="/faq">FAQ</Link>
                <Link to="/blog/adrender-shopify-app">Shopify app</Link>
              </div>
              <div className="site-footer-col">
                <h2>Solutions</h2>
                {solutions.slice(0, 5).map((item) => (
                  <Link key={item.slug} to={solutionPath(item.slug)}>
                    {item.navLabel}
                  </Link>
                ))}
                <Link to="/solutions">All solutions</Link>
              </div>
              <div className="site-footer-col">
                <h2>Compare</h2>
                {comparisons.map((item) => (
                  <Link key={item.slug} to={comparisonPath(item.slug)}>
                    {item.competitor}
                  </Link>
                ))}
                <Link to={blogIndexPath('comparisons')}>All comparisons</Link>
              </div>
              <div className="site-footer-col">
                <h2>Company</h2>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/affiliates">Affiliates</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
          </div>
          <div className="site-footer-bottom">
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} ADRENDER LLC. All rights reserved.</p>
            <div className="site-footer-legal">
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
