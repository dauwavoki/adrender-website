import { PageMeta } from '../components/PageMeta'
import { SplitHero } from '../components/site/SplitHero'
import { IntroShowcase } from '../components/Showcase/IntroShowcase'

const TITLE = 'Tutorials — AdRender'
const DESCRIPTION = 'Short walkthroughs of AdRender, from adding your brand to downloading finished image and video ads.'

export function TutorialsPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/tutorials" />
      <SplitHero lead="Tutorials" aside={<p className="site-lead">{DESCRIPTION}</p>} />
      <section className="site-section">
        <div className="site-column">
          <h2 className="site-h3">Intro: from your website to finished ads</h2>
          <p className="site-lead mt-2 mb-6 max-w-2xl">
            Add your brand by scanning its website and watch its colors, logo, voice, audience and products fill in. Then
            pick winning templates in the cockpit, render, and open your image and video ads in My Ads Library.
          </p>
          <IntroShowcase />
        </div>
      </section>
    </>
  )
}
