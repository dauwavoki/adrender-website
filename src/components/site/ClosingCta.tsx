import type { ReactNode } from 'react'
import { PrimaryLink } from './Buttons'
import { SplitTitle } from './SplitTitle'
import { Stage } from './Stage'

type ClosingCtaProps = {
  lead: string
  rest?: string
  sentence?: ReactNode
  href: string
  label: string
  note?: string
}

export function ClosingCta({ lead, rest, sentence, href, label, note }: ClosingCtaProps) {
  return (
    <Stage variant="band" padding="lg">
      <div className="site-column site-closing">
        <SplitTitle as="h2" lead={lead} rest={rest} />
        {sentence ? <p className="site-lead">{sentence}</p> : null}
        <div className="site-hero-actions">
          <PrimaryLink href={href}>{label}</PrimaryLink>
        </div>
        {note ? <p className="site-meta site-hero-note">{note}</p> : null}
      </div>
    </Stage>
  )
}
