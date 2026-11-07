import type { ReactNode } from 'react'
import { cx } from './cx'

export function SiteSection({
  id,
  children,
  rule = false,
  className,
  width = 'column',
}: {
  id?: string
  children: ReactNode
  rule?: boolean
  className?: string
  width?: 'column' | 'full'
}) {
  return (
    <section id={id} className={cx('site-section', rule && 'has-rule', className)}>
      {width === 'column' ? <div className="site-column">{children}</div> : children}
    </section>
  )
}
