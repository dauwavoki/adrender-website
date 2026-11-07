import { PageMeta } from './PageMeta'
import { getSignupUrl } from '../lib/appUrl'
import type { SolutionConfig } from '../data/solutions'
import { solutionPath, solutions } from '../data/solutions'
import { SplitHero } from './site/SplitHero'
import { NumberedStory } from './site/NumberedStory'
import { LinkTable } from './site/LinkTable'
import { ClosingCta } from './site/ClosingCta'
import { PrimaryLink } from './site/Buttons'

type SolutionPageProps = {
  config: SolutionConfig
}

/** Render *emphasis* spans from the source copy without a markdown parser. */
function EmphasizedText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

export function SolutionPage({ config }: SolutionPageProps) {
  const signupUrl = getSignupUrl()
  const path = solutionPath(config.slug)
  const related = solutions
    .filter((item) => item.slug !== config.slug)
    .map((item) => ({
      title: item.navLabel,
      description: item.indexBlurb,
      to: solutionPath(item.slug),
    }))

  return (
    <>
      <PageMeta title={config.documentTitle} description={config.metaDescription} path={path} />
      <SplitHero
        breadcrumb={[
          { label: 'Solutions', to: '/solutions' },
          { label: config.navLabel },
        ]}
        lead={config.headline}
        aside={<p className="site-lead">{config.subheadline}</p>}
        actions={<PrimaryLink href={signupUrl}>Start free</PrimaryLink>}
      />

      <section className="site-section">
        <div className="site-column site-narrow">
          <h2 className="site-h3">The problem</h2>
          <p className="site-body" style={{ marginTop: 12 }}>
            <EmphasizedText text={config.problem} />
          </p>
        </div>
      </section>

      <section className="site-section">
        <div className="site-column">
          <h2 className="site-h2">How AdRender solves it</h2>
          <p className="site-lead" style={{ marginTop: 12, maxWidth: 720 }}>
            {config.solution}
          </p>
          <div style={{ marginTop: 28 }}>
            <NumberedStory
              sticky={false}
              steps={config.steps.map((step, index) => ({
                id: `${config.slug}-step-${index + 1}`,
                indexLabel: step.title,
                title: step.title,
                body: step.body,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-column site-narrow">
          <h2 className="site-h3">Why this works</h2>
          <p className="site-body" style={{ marginTop: 12 }}>
            {config.proof}
          </p>
        </div>
      </section>

      <section className="site-section">
        <div className="site-column">
          <h2 className="site-h3">Other solutions</h2>
          <div style={{ marginTop: 16 }}>
            <LinkTable rows={related} label="Other solutions" />
          </div>
        </div>
      </section>

      <ClosingCta
        lead="Ready to switch?"
        sentence="No credit card required. No watermarks. Ever."
        href={signupUrl}
        label="Start free"
      />
    </>
  )
}
