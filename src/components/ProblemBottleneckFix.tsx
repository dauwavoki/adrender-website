import { Link } from 'react-router-dom'
import { ScrollReveal } from './ScrollReveal'

const CARDS = [
  {
    n: '1',
    eyebrow: 'The Problem',
    heading: 'Finding a winner means testing losers.',
    body: "You won't know which ad wins until it's live. Finding it means testing many angles, hooks and formats, and every test needs a finished creative. Skip the volume and you're guessing.",
    tone: 'hiw-card--1',
  },
  {
    n: '2',
    eyebrow: 'The Bottleneck',
    heading: 'Your creative budget is the real limit.',
    body: "Hiring means briefs, waiting and revisions. Doing it yourself means stitching six or more apps together for statics and video. Either way, by the time you have enough creative, the window's closing.",
    tone: 'hiw-card--2',
  },
  {
    n: '3',
    eyebrow: 'The Fix',
    heading: 'Make testing cheap enough to actually do it.',
    body: 'AdRender drops the cost of a static or video creative to near nothing. Hundreds of on-brand ads in under 10 minutes, built on formats already proven to work. Test every angle.',
    tone: 'hiw-card--3',
  },
] as const

export function ProblemBottleneckFix() {
  return (
    <section className="relative border-t border-white/[0.06] px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid auto-rows-fr items-stretch gap-4 md:grid-cols-3 md:gap-5">
            {CARDS.map((card) => (
              <Link
                key={card.n}
                to="/about#founder-story"
                aria-label={`Read why I built AdRender — ${card.heading}`}
                className={`hiw-card ${card.tone} pbf-card`}
              >
                <span className="pbf-num" aria-hidden>
                  {card.n}
                </span>
                <p className="pbf-eyebrow">{card.eyebrow}</p>
                <h3 className="hiw-card-title">{card.heading}</h3>
                <p className="pbf-body">{card.body}</p>
              </Link>
            ))}
          </div>
        </ScrollReveal>
        <p className="mt-8 text-center">
          <Link
            to="/about#founder-story"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent-cyan)]"
          >
            Why I built AdRender →
          </Link>
        </p>
      </div>
    </section>
  )
}
