import { useRef } from 'react'
import { AdRenderLogo3D } from './site/AdRenderLogo3D'
import { ThemeToggle } from './site/ThemeToggle'

export function LegalHeader() {
  const linkRef = useRef<HTMLAnchorElement>(null)
  return (
    <header className="legal-header">
      <a href="/" className="site-logo" ref={linkRef}>
        <AdRenderLogo3D height={28} mode="site-header" hoverTarget={linkRef} />
        <span>AdRender</span>
      </a>
      <div className="legal-header-actions">
        <ThemeToggle />
        <a href="/">Back to AdRender</a>
      </div>
    </header>
  )
}
