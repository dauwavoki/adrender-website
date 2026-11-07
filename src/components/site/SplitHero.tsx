import type { ReactNode } from 'react'
import { cx } from './cx'
import { SplitTitle } from './SplitTitle'

type Crumb = { label: string; to?: string }

type SplitHeroProps = {
  lead: string
  rest?: string
  aside?: ReactNode
  actions?: ReactNode
  note?: ReactNode
  breadcrumb?: Crumb[]
  stage?: ReactNode
  overlap?: boolean
  id?: string
  className?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="site-breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 ? <span aria-hidden> / </span> : null}
          {item.to ? <a href={item.to}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export function SplitHero({
  lead,
  rest,
  aside,
  actions,
  note,
  breadcrumb,
  stage,
  overlap = false,
  id,
  className,
}: SplitHeroProps) {
  return (
    <section id={id} className={cx('site-section site-hero', className)}>
      <div className="site-column">
        {breadcrumb && breadcrumb.length > 0 ? <Breadcrumb items={breadcrumb} /> : null}
        <div className="site-split-hero-top">
          <SplitTitle as="h1" lead={lead} rest={rest} />
          {aside ? <div className="site-hero-aside">{aside}</div> : <div />}
        </div>
        {actions || note ? (
          <>
            <div className="site-hero-rule" />
            {actions ? <div className="site-hero-actions">{actions}</div> : null}
            {note ? <div className="site-hero-note">{note}</div> : null}
          </>
        ) : null}
      </div>
      {stage ? <div className={cx('site-column site-hero-stage', overlap && 'is-overlap')}>{stage}</div> : null}
    </section>
  )
}
