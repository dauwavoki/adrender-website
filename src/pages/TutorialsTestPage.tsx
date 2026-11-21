import { BrandLogoLink } from '../components/BrandLogoLink'
import { Footer } from '../components/Footer'
import { PageMeta } from '../components/PageMeta'
import { TutorialsBrowser } from '../components/ShowcaseTest/TutorialsBrowser'

const TITLE = 'Admin Test Page — AdRender'
const DESCRIPTION = 'Admin test page for new and reworked AdRender tutorials before they move to /tutorials.'

/**
 * Admin test page (permanent). Shows only tutorials marked `test` in ShowcaseTest/tutorials.ts.
 * Header is just the logo and name. Not linked, not in the sitemap, not indexed.
 */
export function TutorialsTestPage() {
  return (
    <div className="site-root">
      <div className="site-rail site-rail-left" aria-hidden />
      <div className="site-rail site-rail-right" aria-hidden />
      <PageMeta title={TITLE} description={DESCRIPTION} path="/tutorials-test" />
      <meta name="robots" content="noindex, nofollow" />
      <header className="site-header">
        <div className="site-column site-header-inner">
          <BrandLogoLink variant="nav" />
        </div>
      </header>
      <main className="site-main">
        <section className="site-section sc-tv-page">
          <div className="site-column">
            <h1 className="scv2-admin-title">Admin Test Page</h1>
            <TutorialsBrowser test />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
