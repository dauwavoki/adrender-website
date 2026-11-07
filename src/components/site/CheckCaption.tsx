import { Check } from '@phosphor-icons/react'

export function CheckCaption({ lead, rest }: { lead: string; rest?: string }) {
  return (
    <p className="site-check">
      <Check size={16} weight="bold" aria-hidden />
      <span>
        <strong>{lead}</strong>
        {rest ? <> {rest}</> : null}
      </span>
    </p>
  )
}
