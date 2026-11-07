import { useCallback, useEffect, useRef, useState } from 'react'
import { List } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import { useAppUrl } from '../hooks/useAppUrl'
import { getSignupUrl } from '../lib/appUrl'
import { BrandLogoLink } from './BrandLogoLink'
import { SolutionsNav } from './SolutionsNav'
import { PrimaryLink } from './site/Buttons'
import { cx } from './site/cx'
import { PhoneSheet } from './site/PhoneSheet'
import { ProductMenu } from './site/ProductMenu'
import { ThemeToggle } from './site/ThemeToggle'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const appUrl = useAppUrl()
  const signupUrl = getSignupUrl()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeSheet = useCallback(() => {
    setOpen(false)
    menuBtnRef.current?.focus()
  }, [])

  return (
    <header className={cx('site-header', scrolled && 'is-scrolled')}>
      <div className="site-column site-header-inner">
        <BrandLogoLink variant="nav" />
        <nav className="site-header-nav" aria-label="Primary">
          <ProductMenu />
          <SolutionsNav />
          <a className="site-nav-link" href="/#pricing">
            Pricing
          </a>
          <NavLink className="site-nav-link" to="/blog">
            Blog
          </NavLink>
          <NavLink className="site-nav-link" to="/faq">
            FAQ
          </NavLink>
        </nav>
        <div className="site-header-actions">
          <ThemeToggle />
          <a className="site-signin" href={appUrl}>
            Sign in
          </a>
          <PrimaryLink href={signupUrl} size="header">
            Start free
          </PrimaryLink>
        </div>
        <div className="site-header-phone">
          <PrimaryLink href={signupUrl} arrow={false} size="sm">
            Start free
          </PrimaryLink>
          <button
            ref={menuBtnRef}
            type="button"
            className="site-icon-btn site-menu-btn"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen(true)}
          >
            <List size={20} />
          </button>
        </div>
      </div>
      {open ? <PhoneSheet onClose={closeSheet} signInHref={appUrl} signupHref={signupUrl} /> : null}
    </header>
  )
}
