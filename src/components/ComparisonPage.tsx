import { Check, X } from '@phosphor-icons/react'
import { PageMeta } from './PageMeta'
import { getSignupUrl } from '../lib/appUrl'
import { comparisonPath, comparisons } from '../data/comparisons'
import { SplitHero } from './site/SplitHero'
import { CheckCaption } from './site/CheckCaption'
import { LinkTable } from './site/LinkTable'
import { ClosingCta } from './site/ClosingCta'
import { PrimaryLink, SecondaryLink } from './site/Buttons'
import type { LucideIcon } from 'lucide-react'

export type ComparisonRow = {
  label: string
  adrender: string
  competitor: string
}

export type ComparisonCard = {
  icon: LucideIcon
  title: string
  body: string
}

export type ComparisonPageProps = {
  competitor: string
  competitorUrl: string
  subheadline: string
  rows: ComparisonRow[]
  cards: ComparisonCard[]
  /** Browser / OG title */
  documentTitle: string
  metaDescription: string
  /** Canonical path, e.g. `/vs-adcreative` */
  path: string
}

/** Render a ✅ / ❌ / plain-text cell value. The words after the mark stay exactly as written. */
function CellValue({ value }: { value: string }) {
  if (value === '✅' || value.startsWith('✅ ')) {
    const rest = value === '✅' ? '' : value.slice(2)
    return (
      <span className="site-cell">
        <Check size={16} weight="bold" color="var(--success)" aria-hidden />
        {rest ? <span>{rest}</span> : null}
      </span>
    )
  }
  if (value === '❌' || value.startsWith('❌ ')) {
    const rest = value === '❌' ? '' : value.slice(2)
    return (
      <span className="site-cell">
        <X size={16} color="var(--text-muted)" aria-hidden />
        {rest ? <span>{rest}</span> : null}
      </span>
    )
  }
  return <span>{value}</span>
}

export function ComparisonPage({
  competitor,
  competitorUrl,
  subheadline,
  rows,
  cards,
  documentTitle,
  metaDescription,
  path,
}: ComparisonPageProps) {
  const signupUrl = getSignupUrl()
  const others = comparisons
    .filter((item) => comparisonPath(item.slug) !== path)
    .map((item) => ({
      title: `AdRender vs ${item.competitor}`,
      description: item.subheadline,
      to: comparisonPath(item.slug),
    }))

  return (
    <>
      <PageMeta title={documentTitle} description={metaDescription} path={path} />
      <SplitHero
        breadcrumb={[{ label: 'Compare', to: '/blog#comparisons' }, { label: `AdRender vs ${competitor}` }]}
        lead="AdRender"
        rest={`vs ${competitor}`}
        aside={<p className="site-lead">{subheadline}</p>}
        actions={
          <>
            <PrimaryLink href={signupUrl}>Start free on AdRender</PrimaryLink>
            <SecondaryLink href={competitorUrl} newTab>
              {competitor} website
            </SecondaryLink>
          </>
        }
      />

      <section className="site-section">
        <div className="site-column">
          <div className="site-table-wrap">
            <table className="site-table site-table-stack">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">AdRender</th>
                  <th scope="col">{competitor}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td className="is-us" data-label="AdRender">
                      <CellValue value={row.adrender} />
                    </td>
                    <td data-label={competitor}>
                      <CellValue value={row.competitor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-column">
          <div className="site-checks cols-2">
            {cards.map((card) => (
              <CheckCaption key={card.title} lead={card.title} rest={card.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-column">
          <h2 className="site-h3">Other comparisons</h2>
          <div style={{ marginTop: 16 }}>
            <LinkTable rows={others} label="Other comparisons" />
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
