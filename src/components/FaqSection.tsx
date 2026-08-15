import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is AdRender?',
    a: 'We turn your brand and proven, real ad templates into on-brand static and video ads — hundreds of ads in under 10 minutes, no agency, no designer, no waiting.',
  },
  {
    q: "What's a token, and what happens if I run out mid-render?",
    a: "You can't run out mid-render — the cost is calculated from what you pick before you generate, so there's never a surprise mid-way.",
  },
  {
    q: 'Do unused tokens roll over?',
    a: "Monthly plan tokens don't roll over and reset each cycle. Top-up tokens never expire and stay on your account until used — we always use your monthly tokens first, so your top-ups are the last thing spent.",
  },
  {
    q: 'What happens if I cancel?',
    a: "You drop to the Free plan and keep every ad and brand library you've built, forever. You can top up anytime for exactly the tokens you need — those top-ups never expire.",
  },
  {
    q: 'What if I delete my account?',
    a: "You have 30 days to recover it. Need it gone immediately? Email info@adrender.app from your account's email after deleting.",
  },
  {
    q: 'Do you support video ads?',
    a: 'Yes. AdRender generates both static and video ads from real winning templates, converted into your brand — included from the entry tier, no $249 video gate.',
  },
]

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const panelId = useId()
  const buttonId = useId()

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#12121a]">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-ring-brand rounded-2xl sm:px-6"
        >
          <span className="font-heading text-base font-semibold text-white sm:text-lg">{q}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[var(--accent-cyan)] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      </h3>
      {open && (
        <div id={panelId} role="region" aria-labelledby={buttonId}>
          <p className="border-t border-white/[0.06] px-5 pb-5 pt-4 text-sm leading-relaxed text-zinc-400 sm:px-6 sm:text-base">
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-28 px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-section-label text-center text-xs font-semibold uppercase tracking-[0.2em]">FAQ</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Questions, answered
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-zinc-500">
            Tokens, canceling, and what&apos;s included — without the fine-print fog.
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-3">
          {FAQ.map((item, i) => (
            <ScrollReveal key={item.q}>
              <FaqItem
                q={item.q}
                a={item.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
