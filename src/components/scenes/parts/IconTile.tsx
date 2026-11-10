import type { ReactNode } from 'react'
import { IconTile as SiteIconTile, type TileTone } from '../../site/IconTile'

export function IconTile({ tone, children }: { tone: TileTone; children: ReactNode }) {
  return (
    <SiteIconTile tone={tone} size={36}>
      {children}
    </SiteIconTile>
  )
}
