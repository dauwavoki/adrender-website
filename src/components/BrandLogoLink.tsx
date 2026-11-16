import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AdRenderLogo3D } from './site/AdRenderLogo3D'

type BrandLogoLinkProps = {
  variant: 'nav' | 'footer'
}

export function BrandLogoLink({ variant }: BrandLogoLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  return (
    <Link to="/" className="site-logo" aria-label="AdRender" ref={linkRef}>
      {variant === 'nav' ? (
        <AdRenderLogo3D height={28} mode="site-header" hoverTarget={linkRef} />
      ) : (
        <img src="/brand/logo/adrender-logo.svg" alt="" width={25} height={24} style={{ height: 24, width: 'auto' }} />
      )}
      <span>AdRender</span>
    </Link>
  )
}
