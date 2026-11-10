import { getSignupUrl } from '../lib/appUrl'

export function BetaBanner() {
  const signupUrl = getSignupUrl()

  return (
    <div className="site-banner">
      <a href={signupUrl}>
        <span aria-hidden>🎨 </span>
        Render on-brand ads in minutes — 20% off your first month. <span className="site-inline-link">Start free</span>
      </a>
    </div>
  )
}
