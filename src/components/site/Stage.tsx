import type { ReactNode } from 'react'
import { cx } from './cx'

type StageProps = {
  children?: ReactNode
  variant?: 'default' | 'band'
  padding?: 'lg' | 'md'
  className?: string
}

export function Stage({ children, variant = 'default', padding = 'lg', className }: StageProps) {
  return (
    <div className={cx('site-stage stage-fill', variant === 'band' && 'is-band', `site-stage-pad-${padding}`, className)}>
      {children}
    </div>
  )
}
