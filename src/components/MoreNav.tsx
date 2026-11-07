import { NavLink } from 'react-router-dom'
import { COMPANY_LINKS } from './site/navData'

/** Company links that used to live in the desktop More menu. Footer and the phone sheet use the same list. */
export function MoreNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div>
      {COMPANY_LINKS.map((link) => (
        <NavLink key={link.to} to={link.to} className="site-sheet-link" onClick={onNavigate}>
          {link.label}
        </NavLink>
      ))}
    </div>
  )
}
