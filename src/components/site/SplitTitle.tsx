import { cx } from './cx'

type SplitTitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  lead: string
  rest?: string
  tone?: 'default' | 'band'
  className?: string
  id?: string
}

export function SplitTitle({ as = 'h2', lead, rest, tone = 'default', className, id }: SplitTitleProps) {
  const Tag = as
  return (
    <Tag id={id} className={cx('site-split-title', `is-${as}`, tone === 'band' && 'is-band', className)}>
      <span className="site-split-lead">{lead}</span>
      {rest ? <span className="site-split-rest">{rest}</span> : null}
    </Tag>
  )
}
