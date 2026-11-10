import type { ReactNode } from 'react'
import { cx } from '../../site/cx'

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' }) {
  return <span className={cx('scene-badge', tone !== 'neutral' && `is-${tone}`)}>{children}</span>
}
