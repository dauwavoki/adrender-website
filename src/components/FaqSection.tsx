import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

type FaqEntry = { q: string; a: string }
type Channel = 'Direct' | 'Shopify'

const LOGIN_EITHER: FaqEntry = {
  q: 'Can I use the same account on AdRender Direct and Shopify?',
  a: 'Yes. The same account and email work on both AdRender Direct and Shopify. Logging into either platform never changes which platform bills you.',
}

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

const FAQ_DIRECT: FaqEntry[] = [
  {
    q: 'What is AdRender?',
    a: 'We turn your brand and proven, real ad templates into on-brand static and video ads — hundreds of ads in under 10 minutes, no agency, no designer, no waiting.',
  },
  LOGIN_EITHER,
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
  DELETE_ACCOUNT,
  VIDEO_SUPPORT,
  VIDEO_LENGTH,
  VIDEO_ASPECT,
  VIDEO_COST,
]

const FAQ_SHOPIFY: FaqEntry[] = [
  {
    q: 'What is AdRender?',
    a: "This is AdRender installed via the Shopify App Store, for use on that merchant's store, embedded inside Shopify admin. Billing is set by the platform you subscribed from and never changes for that workspace. You can log into either AdRender Direct or Shopify with the same email. Logging into AdRender Direct with a Shopify-billed account keeps billing on Shopify — there is no separate charge. Plan changes, cancellation, and billing run through Shopify. You can upgrade, downgrade, or cancel from your Shopify admin or from within the embedded app. Charges appear on your Shopify invoice — there is no separate AdRender checkout.",
  },
  LOGIN_EITHER,
  {
    q: "What's a token, and what happens if I run out mid-render?",
    a: 'Tokens meter AI generation. The cost is calculated from what you pick before you generate, so you never run out mid-render. Top-up token packs are not available through the Shopify App Store. If you do not have enough tokens to start, generation pauses until your next billing cycle begins or you upgrade to a higher plan. You are never charged more than your plan price, and no additional usage charges apply.',
  },
  {
    q: 'Do unused tokens roll over?',
    a: 'Unused allotment tokens roll over on Shopify whether you bill monthly or annually, up to two times your monthly cap. Balances above that ceiling are forfeited at month end.',
  },
  {
    q: 'What happens if I uninstall AdRender from Shopify?',
    a: 'Uninstalling cancels future recurring charges. You may still be billed for the current cycle, and access continues until the end of that period. We delete the data derived from your store. Your AdRender account, brand profiles, and the ads you generated remain yours.',
  },
  {
    q: 'How do teams work on Shopify?',
    a: 'Shopify accounts use teams rather than workspaces, because Shopify structures access around the store. The person who installed AdRender and subscribed is the primary. They can add other people to the store through Shopify staff or collaborator access; those people get product access inside the Shopify-embedded app. Only the primary can manage billing or the subscription.',
  },
  {
    q: 'What are workspaces?',
    a: 'Each installed store is its own workspace. Only the account that completed the original installation and subscription (the primary) can manage billing, change plans, or disconnect the store.',
  },
  {
    q: 'What Shopify data does AdRender access?',
    a: "We receive your shop domain, store metadata, and product data (names, descriptions, images, variants, and pricing) via Shopify's API, used solely to generate advertising creative for your store. We also receive your subscription plan and usage records from Shopify so we can apply your plan limits. We do not access, request, or store your customers' personal data, order data, or payment information.",
  },
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

function FaqList({ items, channelKey }: { items: FaqEntry[]; channelKey: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mt-12 space-y-3">
      {items.map((item, i) => (
        <ScrollReveal key={`${channelKey}-${item.q}`}>
          <FaqItem
            q={item.q}
            a={item.a}
            open={openIndex === i}
            onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
          />
        </ScrollReveal>
      ))}
    </div>
  )
}

type FaqSectionProps = {
  items?: FaqEntry[]
  intro?: string
}

export function FaqSection({
  items,
  intro = "Tokens, canceling, and what's included — without the fine-print fog.",
}: FaqSectionProps) {
  const [channel, setChannel] = useState<Channel>('Direct')
  const showToggle = items == null
  const list = items ?? (channel === 'Direct' ? FAQ_DIRECT : FAQ_SHOPIFY)
  const tablistId = useId()

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

        {showToggle && (
          <div className="mt-10 flex justify-center">
            <div
              role="tablist"
              aria-label="FAQ by platform"
              id={tablistId}
              className="inline-flex rounded-full border border-white/[0.1] bg-[#12121a] p-1"
            >
              {(['Direct', 'Shopify'] as const).map((label) => {
                const selected = channel === label
                return (
                  <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`focus-ring-brand rounded-full px-5 py-2 text-sm font-semibold transition ${
                      selected ? 'bg-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    onClick={() => setChannel(label)}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <FaqList key={showToggle ? channel : 'custom'} items={list} channelKey={showToggle ? channel : 'custom'} />
      </div>
    </section>
  )
}
