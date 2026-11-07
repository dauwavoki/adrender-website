import { Link } from 'react-router-dom'

type BrandLogoLinkProps = {
  variant: 'nav' | 'footer'
}

export function BrandLogoLink({ variant }: BrandLogoLinkProps) {
  return (
    <Link to="/" className="site-logo" aria-label="AdRender">
      <img src="/WebApp_Main_Logo.png" alt="" width={146} height={128} style={variant === 'footer' ? { height: 24 } : undefined} />
      <span>AdRender</span>
    </Link>
  )
}
