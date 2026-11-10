import type { ReactNode } from 'react'
import { cx } from '../../site/cx'

/** Brand-gradient border used by the Library Ready state. */
export function ReadyRing({ on, children, className }: { on: boolean; children: ReactNode; className?: string }) {
  return <span className={cx('scene-ready', on && 'is-on', className)}>{children}</span>
}
