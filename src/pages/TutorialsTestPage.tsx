import { PageMeta } from '../components/PageMeta'
import { TutorialsBrowser } from '../components/ShowcaseTest/TutorialsBrowser'

const TITLE = 'Tutorials (test) — AdRender'
const DESCRIPTION = 'Test version of the AdRender tutorials, for review before they replace /tutorials.'

/** Review copy of /tutorials. Not linked, not in the sitemap, not indexed. */
export function TutorialsTestPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/tutorials-test" />
      <meta name="robots" content="noindex, nofollow" />
      <section className="site-section sc-tv-page">
        <div className="site-column">
          <h1 className="sr-only">Tutorials (test)</h1>
          <TutorialsBrowser />
        </div>
      </section>
    </>
  )
}
