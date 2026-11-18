import { PageMeta } from '../components/PageMeta'
import { TutorialsBrowser } from '../components/Showcase/TutorialsBrowser'

const TITLE = 'Tutorials — AdRender'
const DESCRIPTION = 'Short walkthroughs of AdRender, from adding your brand to downloading finished image and video ads.'

export function TutorialsPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/tutorials" />
      <section className="site-section sc-tv-page">
        <div className="site-column">
          <h1 className="sr-only">Tutorials</h1>
          <TutorialsBrowser />
        </div>
      </section>
    </>
  )
}
