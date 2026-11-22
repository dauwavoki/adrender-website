import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import { blogIndexPath } from '../../data/blog'
import { comparisonPath, comparisons } from '../../data/comparisons'
import { solutionPath, solutions } from '../../data/solutions'
import { MoreNav } from '../MoreNav'
import { PRODUCT_BRAND, PRODUCT_MAKE } from './navData'
import { ThemePill } from './ThemeToggle'

type PhoneSheetProps = {
  onClose: () => void
  signInHref: string
  /** Kept for the caller; Start free stays in the phone header. */
  signupHref: string
}

export function PhoneSheet({ onClose, signInHref }: PhoneSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Portal to <body>: the header's backdrop blur would otherwise trap this fixed panel inside the 64px bar.
  return createPortal(
    <div className="site-sheet" role="dialog" aria-modal="true" aria-label="Menu">
      <button type="button" className="site-sheet-backdrop" aria-label="Close menu" onClick={onClose} />
      <div className="site-sheet-panel">
        <div className="site-sheet-head">
          <span className="site-logo">Menu</span>
          <span className="site-sheet-head-actions">
            <ThemePill />
            <button ref={closeRef} type="button" className="site-icon-btn" aria-label="Close menu" onClick={onClose}>
              <X size={18} />
            </button>
          </span>
        </div>
        <div className="site-sheet-body">
          <p className="site-sheet-label">Product</p>
          <a className="site-sheet-link" href="/#how-it-works" onClick={onClose}>
            How it works
          </a>
          <a className="site-sheet-link" href="/#features" onClick={onClose}>
            Features
          </a>
          <a className="site-sheet-link" href="/#pricing" onClick={onClose}>
            Pricing
          </a>
          {PRODUCT_MAKE.slice(2).concat(PRODUCT_BRAND).map((item) =>
            item.to.startsWith('/#') ? (
              <a key={item.to} className="site-sheet-link" href={item.to} onClick={onClose}>
                {item.title}
              </a>
            ) : (
              <NavLink key={item.to} className="site-sheet-link" to={item.to} onClick={onClose}>
                {item.title}
              </NavLink>
            ),
          )}
          <NavLink className="site-sheet-link" to="/about" onClick={onClose}>
            Feature tour
          </NavLink>
          <NavLink className="site-sheet-link" to="/faq" onClick={onClose}>
            FAQ
          </NavLink>
          <NavLink className="site-sheet-link" to="/tutorials" onClick={onClose}>
            Tutorials
          </NavLink>

          <p className="site-sheet-label">Solutions</p>
          <NavLink className="site-sheet-link" to="/solutions" onClick={onClose}>
            All solutions
          </NavLink>
          {solutions.map((item) => (
            <NavLink key={item.slug} className="site-sheet-link" to={solutionPath(item.slug)} onClick={onClose}>
              {item.navLabel}
            </NavLink>
          ))}

          <p className="site-sheet-label">Compare</p>
          <NavLink className="site-sheet-link" to={blogIndexPath('comparisons')} onClick={onClose}>
            All comparisons
          </NavLink>
          {comparisons.map((item) => (
            <NavLink key={item.slug} className="site-sheet-link" to={comparisonPath(item.slug)} onClick={onClose}>
              {item.competitor}
            </NavLink>
          ))}

          <p className="site-sheet-label">Company</p>
          <MoreNav onNavigate={onClose} />
          <a className="site-sheet-link" href={signInHref} onClick={onClose}>
            Sign in
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
