import { Navigate } from 'react-router-dom'
import { LandingPage } from '../components/LandingPage'
import { getLandingPageBySlug } from '../data/landingPages'

type LpPageProps = {
  /** Passed from the explicit `lp/${slug}` route registered in App.tsx */
  slug: string
}

export function LpPage({ slug }: LpPageProps) {
  const config = getLandingPageBySlug(slug)

  if (!config) {
    return <Navigate to="/" replace />
  }

  return <LandingPage config={config} />
}
