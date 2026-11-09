import { TextLink } from './site/Buttons'
import { cx } from './site/cx'

const CARDS = [
  {
    n: '1',
    eyebrow: 'The problem',
    title: 'Finding a winner means testing losers.',
    body: "You won't know which ad wins until it's live. Finding it means testing many angles, hooks and formats, and every test needs a finished creative. Skip the volume and you're guessing.",
  },
  {
    n: '2',
    eyebrow: 'The bottleneck',
    title: 'Your creative budget is the real limit.',
    body: "Hiring means briefs, waiting and revisions. Doing it yourself means stitching six or more apps together for statics and video. Either way, by the time you have enough creative, the window's closing.",
  },
  {
    n: '3',
    eyebrow: 'The fix',
    title: 'Make testing cheap enough to actually do it.',
    body: 'AdRender drops the cost of a static or video creative to near nothing. Hundreds of on-brand ads in under 10 minutes, built on formats already proven to work. Test every angle.',
    fix: true,
  },
] as const

export function ProblemBottleneckFix() {
  return (
    <section className="site-section">
      <div className="site-column">
        <div className="pbf-grid">
          {CARDS.map((card) => {
            const highlight = 'fix' in card && card.fix
            return (
              <article key={card.n} className={cx('pbf-card', highlight && 'is-fix site-stage stage-fill')}>
                <span className="pbf-num" aria-hidden>
                  {card.n}
                </span>
                <p className="pbf-eyebrow">{card.eyebrow}</p>
                <h3 className="pbf-title">{card.title}</h3>
                <p className="pbf-body">{card.body}</p>
              </article>
            )
          })}
        </div>
        <div className="pbf-foot">
          <TextLink href="/about#founder-story">Why I built AdRender</TextLink>
        </div>
      </div>
    </section>
  )
}
