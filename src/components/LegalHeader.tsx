import { ThemeToggle } from './site/ThemeToggle'

export function LegalHeader() {
  return (
    <header className="legal-header">
      <a href="/" className="site-logo">
        <img src="/WebApp_Main_Logo.png" alt="" width={146} height={128} />
        <span>AdRender</span>
      </a>
      <div className="legal-header-actions">
        <ThemeToggle />
        <a href="/">Back to AdRender</a>
      </div>
    </header>
  )
}
