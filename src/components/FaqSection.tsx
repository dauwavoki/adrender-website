import type { ReactNode } from 'react'
import { ScrollReveal } from './ScrollReveal'
import {
  FAQ_GROUPS,
  faqAnchorId,
  type FaqEntry,
  type FaqGroup,
} from '../data/faq'

export { FAQ_TOKEN_ROLLOVER_ID, landingSharedFaqGroups } from '../data/faq'

function FaqItem({ q, a, id }: FaqEntry) {
  return (
    <div
      id={faqAnchorId({ q, id })}
      className="scroll-mt-28 rounded-2xl border border-white/[0.06] bg-[#12121a] px-5 py-4 sm:px-6 sm:py-5"
    >
      <h3 className="font-heading text-base font-semibold text-white sm:text-lg">{q}</h3>
      <p className="mt-3 border-t border-white/[0.06] pt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
        {a}
      </p>
    </div>
  )
}

function FaqItems({ items }: { items: FaqEntry[] }) {
  return (
    <div className="space-y-3">
      {items.map((entry) => (
        <ScrollReveal key={entry.q}>
          <FaqItem {...entry} />
        </ScrollReveal>
      ))}
    </div>
  )
}

type FaqSectionProps = {
  /** Page-specific questions shown first, with no group label. */
  leadingItems?: FaqEntry[]
  /** Grouped questions. Defaults to the full FAQ. Pass `[]` for a flat list only. */
  groups?: FaqGroup[]
  intro?: string
  /** Homepage uses h2; the dedicated /faq page uses h1. */
  headingAs?: 'h1' | 'h2'
  /** Buttons and links rendered directly under the questions. */
  after?: ReactNode
}

export function FaqSection({
  leadingItems = [],
  groups = FAQ_GROUPS,
  intro = "Tokens, canceling, and what's included — without the fine-print fog.",
  headingAs = 'h2',
  after,
}: FaqSectionProps) {
  const Heading = headingAs

  return (
    <section id="faq" className="scroll-mt-28 px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-section-label text-center text-xs font-semibold uppercase tracking-[0.2em]">FAQ</p>
          <Heading className="mt-3 text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Questions, answered
          </Heading>
          <p className="mx-auto mt-4 max-w-xl text-center text-zinc-500">{intro}</p>
        </ScrollReveal>

        <div className="mt-12 space-y-10">
          {leadingItems.length > 0 && <FaqItems items={leadingItems} />}
          {groups.map((group) => (
            <div key={group.label}>
              <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">{group.label}</p>
              <div className="mt-3">
                <FaqItems items={group.items} />
              </div>
            </div>
          ))}
        </div>
        {after ? <div className="mt-10">{after}</div> : null}
      </div>
    </section>
  )
}
