import { useEffect, useId, useRef, useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { cx } from './cx'
import { IconTile } from './IconTile'
import { PRODUCT_BRAND, PRODUCT_MAKE, type ProductLink } from './navData'
import { SitePlaceholder } from './SitePlaceholder'

function ProductLinks({ items, onNavigate }: { items: ProductLink[]; onNavigate: () => void }) {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon
        const inner = (
          <>
            <IconTile tone={item.tone}>
              <Icon size={16} />
            </IconTile>
            <span>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </span>
          </>
        )
        if (item.to.startsWith('/#')) {
          return (
            <a key={item.to} href={item.to} className="site-menu-link" onClick={onNavigate}>
              {inner}
            </a>
          )
        }
        return (
          <Link key={item.to} to={item.to} className="site-menu-link" onClick={onNavigate}>
            {inner}
          </Link>
        )
      })}
    </>
  )
}

export function ProductMenu() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !open) return
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
      className={cx('site-mega', open && 'is-open')}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false)
      }}
    >
      <button
        type="button"
        className="site-nav-link"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        Product
        <CaretDown size={14} aria-hidden />
      </button>
      <div ref={panelRef} id={menuId} className="site-mega-panel">
        <div className="site-mega-card">
          <div className="site-product-grid">
            <div>
              <p className="site-menu-label">Make ads</p>
              <ProductLinks items={PRODUCT_MAKE} onNavigate={() => setOpen(false)} />
            </div>
            <div>
              <p className="site-menu-label">Your brand</p>
              <ProductLinks items={PRODUCT_BRAND} onNavigate={() => setOpen(false)} />
            </div>
            <Link to="/about" className="site-featured" onClick={() => setOpen(false)}>
              <SitePlaceholder id="H1" />
              <strong>See the full feature tour</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
