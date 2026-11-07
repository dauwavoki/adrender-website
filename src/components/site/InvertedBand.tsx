import type { ReactNode } from 'react'
import { cx } from './cx'

export function InvertedBand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cx('site-band', className)}>
      <div className="site-column">{children}</div>
    </section>
  )
}
