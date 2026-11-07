import { useEffect, useState, type ReactNode } from 'react'
import { TextLink } from './Buttons'
import { CheckCaption } from './CheckCaption'
import { cx } from './cx'

export type StoryStep = {
  id: string
  indexLabel: string
  title: string
  body: ReactNode
  link?: { href: string; label: string }
  visual?: ReactNode
  checks?: { lead: string; rest?: string }[]
}

export function NumberedStory({ steps, sticky = true }: { steps: StoryStep[]; sticky?: boolean }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!sticky) return
    const nodes = steps
      .map((step) => document.getElementById(step.id))
      .filter((node): node is HTMLElement => Boolean(node))
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = nodes.indexOf(visible.target as HTMLElement)
        if (index >= 0) setActive(index)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [sticky, steps])

  return (
    <div className={cx('site-story', sticky && 'is-sticky')}>
      {sticky ? (
        <ol className="site-story-index">
          {steps.map((step, index) => (
            <li key={step.id}>
              <a href={`#${step.id}`} className={index === active ? 'is-active' : ''} aria-current={index === active ? 'true' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{step.indexLabel}</span>
              </a>
            </li>
          ))}
        </ol>
      ) : null}
      <div>
        {steps.map((step, index) => (
          <article key={step.id} id={step.id} className="site-step site-anchor">
            <p className="site-step-num">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="site-h3">{step.title}</h3>
            <div className="site-body">{step.body}</div>
            {step.link ? (
              <div className="site-step-link">
                <TextLink href={step.link.href}>{step.link.label}</TextLink>
              </div>
            ) : null}
            {step.visual ? <div style={{ marginTop: 20 }}>{step.visual}</div> : null}
            {step.checks && step.checks.length > 0 ? (
              <div className={cx('site-checks', step.checks.length > 1 && 'cols-2')}>
                {step.checks.map((check) => (
                  <CheckCaption key={check.lead} lead={check.lead} rest={check.rest} />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
