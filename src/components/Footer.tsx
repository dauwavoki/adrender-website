import { Link } from 'react-router-dom'
import { blogIndexPath } from '../data/blog'
import { comparisonPath, comparisons } from '../data/comparisons'
import { solutionPath, solutions } from '../data/solutions'
import { BrandLogoLink } from './BrandLogoLink'
import { SplitTitle } from './site/SplitTitle'
import { ThemeToggle } from './site/ThemeToggle'

const FOOTER_COMPARE = ['AdCreative.ai', 'Canva', 'Predis', 'Madgicx', 'Creatify', 'InVideo'] as const

const footerComparisons = FOOTER_COMPARE.map((name) => {
  const match = comparisons.find((item) => item.competitor === name)
  if (!match) {
    throw new Error(`Missing comparison for footer: ${name}`)
  }
  return match
})

export function Footer() {
  return (
    <>
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
                {footerComparisons.map((item) => (
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
          <div className="site-footer-badges">
            <a
              href="https://startupbase.io/products/adrender?utm_source=startupbase&utm_medium=badge&utm_campaign=launch-badge-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://statics.startupbase.io/site/badges/launched-on-sb-dark.svg" alt="Launched on StartupBase" height={55} />
            </a>
            <a href="https://easylaunch.dev/marketing/adrender" target="_blank" rel="noopener noreferrer">
              <img src="https://easylaunch.dev/badge/easylaunch-badge-light.svg" alt="Featured on EasyLaunch" width={188} height={56} />
            </a>
            <a href="https://fazier.com/launches/adrender.app" target="_blank" rel="noopener noreferrer">
              <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark" width={120} alt="Fazier badge" />
            </a>
            <a href="https://saascity.io" target="_blank" rel="noopener noreferrer">
              <img src="https://saascity.io/badges/featured-dark.svg" alt="Featured on SaaSCity" width={150} height={54} />
            </a>
            <a href="https://smollaunch.com" target="_blank" rel="noopener noreferrer">
              <img src="https://smollaunch.com/badges/featured.svg" alt="AdRender — Featured on Smol Launch" width={250} height={60} />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
