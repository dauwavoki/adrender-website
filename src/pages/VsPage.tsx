import { Navigate } from 'react-router-dom'
import { ComparisonPage } from '../components/ComparisonPage'
import { comparisonPath, getComparisonBySlug } from '../data/comparisons'

type VsPageProps = {
  /** Passed from the explicit `vs-${slug}` route registered in App.tsx */
  slug: string
}

/** Single comparison route component; config comes from `src/data/comparisons`. */
export function VsPage({ slug }: VsPageProps) {
  const config = getComparisonBySlug(slug)

  if (!config) {
    return <Navigate to="/" replace />
  }

  return (
    <ComparisonPage
      competitor={config.competitor}
      competitorUrl={config.competitorUrl}
      subheadline={config.subheadline}
      documentTitle={config.documentTitle}
      metaDescription={config.metaDescription}
      path={comparisonPath(config.slug)}
      rows={config.rows}
      cards={config.cards}
    />
  )
}
