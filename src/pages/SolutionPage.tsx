import { Navigate } from 'react-router-dom'
import { SolutionPage as SolutionLanding } from '../components/SolutionPage'
import { getSolutionBySlug } from '../data/solutions'

type SolutionRoutePageProps = {
  /** Passed from the explicit `solutions/${slug}` route registered in App.tsx */
  slug: string
}

/** Single solution route component; config comes from `src/data/solutions`. */
export function SolutionRoutePage({ slug }: SolutionRoutePageProps) {
  const config = getSolutionBySlug(slug)

  if (!config) {
    return <Navigate to="/solutions" replace />
  }

  return <SolutionLanding config={config} />
}
