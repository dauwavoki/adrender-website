import type { ReactNode } from 'react'
import { cx } from '../../site/cx'
import { Still } from './Still'

export function MiniCard({
  src,
  width,
  height,
  title,
  meta,
  className,
  corner,
}: {
  src: string
  width: number
  height: number
  title?: string
  meta?: ReactNode
  className?: string
  corner?: ReactNode
}) {
  return (
    <div className={cx('mini-card', className)}>
      <div className="mini-media">
        <Still src={src} width={width} height={height} />
        {corner}
      </div>
      {title ? <div className="mini-title">{title}</div> : null}
      {meta}
    </div>
  )
}
