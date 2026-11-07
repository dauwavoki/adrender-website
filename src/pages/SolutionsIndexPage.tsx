import { PageMeta } from '../components/PageMeta'
import { solutions, solutionPath } from '../data/solutions'
import { SplitHero } from '../components/site/SplitHero'
import { LinkTable } from '../components/site/LinkTable'

const TITLE = 'Solutions — AI Ads for Fatigue, Catalogs, TikTok & More | AdRender'
const DESCRIPTION =
  'Problem-first pages for the reasons ads stall: creative fatigue, catalog scale, agencies, TikTok, Instagram, and more. See how AdRender fixes each.'

export function SolutionsIndexPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/solutions" />
      <SplitHero
        lead="The problem you have,"
        rest="not the tool you're comparing."
        aside={
          <p className="site-lead">
            Creative fatigue, a 500-SKU catalog, six client brands, a platform that needs its own format. Each of
            these is a page — pick the one that sounds like your week.
          </p>
        }
      />
      <section className="site-section">
        <div className="site-column">
          <LinkTable
            label="Solutions"
            rows={solutions.map((solution) => ({
              title: solution.navLabel,
              description: solution.indexBlurb,
              to: solutionPath(solution.slug),
            }))}
          />
        </div>
      </section>
    </>
  )
}
