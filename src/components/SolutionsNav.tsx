import { useEffect, useId, useRef } from 'react'
import { CaretDown, ArrowRight } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import { blogIndexPath } from '../data/blog'
import { comparisonPath, comparisons } from '../data/comparisons'
import { solutionPath, solutions } from '../data/solutions'
import { cx } from './site/cx'
import { useMegaMenu } from './site/useMegaMenu'

const mid = Math.ceil(solutions.length / 2)
const solutionCols = [solutions.slice(0, mid), solutions.slice(mid)]

/**
 * Desktop Solutions mega menu. Phone uses the sheet in Header.
 * Links stay in the HTML when the panel is closed.
 */
export function SolutionsNav() {
  const { open, close, containerProps } = useMegaMenu()
  const wrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    const panel = panelRef.current
    const wrap = wrapRef.current
    if (!panel || !wrap || !open) return
    panel.style.marginLeft = '0px'
    const rect = panel.getBoundingClientRect()
    const pad = 16
    if (rect.right > window.innerWidth - pad) {
      panel.style.marginLeft = `${window.innerWidth - pad - rect.right}px`
    } else if (rect.left < pad) {
      panel.style.marginLeft = `${pad - rect.left}px`
    }
  }, [open])

  return (
    <div
      ref={wrapRef}
      className={cx('site-mega', open && 'is-open')}
      {...containerProps}
    >
      <NavLink
        to="/solutions"
        className="site-nav-link"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={close}
      >
        Solutions
        <CaretDown size={14} aria-hidden />
      </NavLink>
      <div ref={panelRef} id={menuId} className="site-mega-panel">
        <div className="site-mega-card">
          <div className="site-solutions-grid">
            {solutionCols.map((col, index) => (
              <div key={index}>
                {index === 0 ? <p className="site-menu-label">Solutions</p> : <p className="site-menu-label" aria-hidden>&nbsp;</p>}
                {col.map((item) => (
                  <NavLink key={item.slug} to={solutionPath(item.slug)} className="site-menu-simple" onClick={close}>
                    {item.navLabel}
                    <ArrowRight size={14} aria-hidden />
                  </NavLink>
                ))}
              </div>
            ))}
            <div>
              <p className="site-menu-label">Compare</p>
              <div className="site-menu-scroll">
                {comparisons.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={comparisonPath(item.slug)}
                    className="site-menu-simple"
                    onClick={close}
                  >
                    {item.competitor}
                    <ArrowRight size={14} aria-hidden />
                  </NavLink>
                ))}
                <NavLink to={blogIndexPath('comparisons')} className="site-menu-simple" onClick={close}>
                  All comparisons
                  <ArrowRight size={14} aria-hidden />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
