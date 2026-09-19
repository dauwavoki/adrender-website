import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

type FaqEntry = { q: string; a: string }

const DELETE_ACCOUNT: FaqEntry = {
  q: 'What if I delete my account?',
  a: "You have 30 days to recover it. Need it gone immediately? Email info@adrender.app from your account's email after deleting.",
}

const VIDEO_SUPPORT: FaqEntry = {
  q: 'Do you support video ads?',
  a: 'Yes. AdRender generates static and video ads from real winning templates, converted into your brand — included on every tier, right from Free.',
}

const VIDEO_LENGTH: FaqEntry = {
  q: 'How long can my video ads be?',
  a: "Video renders up to 30 seconds today, matched exactly to your reference clip's length — longer videos are coming soon.",
}

const VIDEO_ASPECT: FaqEntry = {
  q: 'What aspect ratio do my videos come out in?',
  a: "Whatever you upload. Output always matches your reference video's exact aspect ratio — no cropping, no distortion, no guessing what the frame will look like.",
}

const VIDEO_COST: FaqEntry = {
  q: 'Do videos cost more tokens than images?',
  a: "Yes — video is priced per second and genuinely costs more to produce than a still, so it draws tokens down faster. Exact costs by resolution are shown before you generate, so there's no surprise mid-render.",
}

const CONNECT_SHOPIFY: FaqEntry = {
  q: 'Can I connect my Shopify store if I have a Direct account?',
  a: 'Yes. From Brands & Campaigns you can connect your Shopify store and sync the catalog — product names, descriptions, images, variants, and pricing. That is the native catalog sync inside AdRender, not an App Store install.',
}

const SHOPIFY_APP: FaqEntry = {
  q: 'Is there a Shopify app?',
  a: 'Yes. AdRender is also available as a native app on the Shopify App Store — install directly from your Shopify admin, billed through Shopify. Search AdRender in the Shopify App Store.',
}

const FAQ: FaqEntry[] = [
  {
    q: 'What is AdRender?',
    a: 'We turn your brand and proven, real ad templates into on-brand static and video ads — hundreds of ads in under 10 minutes, no agency, no designer, no waiting.',
  },
  {
    q: "What's a token, and what happens if I run out mid-render?",
    a: "Tokens meter AI generation. The cost is calculated from what you pick before you generate, so you never run out mid-render. If you do not have enough tokens to start, you are prompted to buy a top-up pack.",
  },
  {
    q: 'Do unused tokens roll over?',
    a: 'Monthly plan tokens do not roll over and reset each cycle. Annual subscribers may carry unused allotment tokens forward up to two times their monthly cap; balances above that ceiling are forfeited at month end. Top-up tokens never expire and stay on your account until used — we always use your monthly tokens first, so your top-ups are the last thing spent.',
  },
  {
    q: 'What happens if I cancel?',
    a: "You drop to the Free plan and keep every ad and brand library you've built, forever. You can top up anytime for exactly the tokens you need — those top-ups never expire.",
  },
  {
    q: 'What are workspaces?',
    a: 'Subscribed accounts can create multiple workspaces and invite other users into them by email. Where your plan includes team seats, the account owner may invite members and assign role-based permissions.',
  },
  CONNECT_SHOPIFY,
  SHOPIFY_APP,
  DELETE_ACCOUNT,
  VIDEO_SUPPORT,
  VIDEO_LENGTH,
  VIDEO_ASPECT,
  VIDEO_COST,
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

type FaqSectionProps = {
  items?: FaqEntry[]
  intro?: string
}

export function FaqSection({
  items = FAQ,
  intro = "Tokens, canceling, and what's included — without the fine-print fog.",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-28 px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-section-label text-center text-xs font-semibold uppercase tracking-[0.2em]">FAQ</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Questions, answered
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-zinc-500">{intro}</p>
        </ScrollReveal>

        <div className="mt-12 space-y-3">
          {items.map((item, i) => (
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
