import type { ReactNode } from 'react'
import { cx } from './cx'

export type TileTone = 'blue' | 'violet' | 'orange' | 'green' | 'amber'

const TONES: TileTone[] = ['blue', 'violet', 'orange', 'green', 'amber']

export function toneAt(index: number): TileTone {
  return TONES[index % TONES.length]
}

export function IconTile({
  tone,
  children,
  size = 32,
}: {
  tone: TileTone
  children: ReactNode
  size?: 32 | 36
}) {
  return <span className={cx('site-tile', `site-tile-${size}`, `site-tile-${tone}`)}>{children}</span>
}
