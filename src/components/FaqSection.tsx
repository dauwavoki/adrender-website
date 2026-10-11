import { ScrollReveal } from './ScrollReveal'

type FaqEntry = { q: string; a: string }

type FaqGroup = { label: string; items: FaqEntry[] }

const DELETE_ACCOUNT: FaqEntry = {
  q: 'What if I delete my account?',
  a: "You have 30 days to recover it. Need it gone immediately? Email info@adrender.app from your account's email after deleting.",
}

const VIDEO_SUPPORT: FaqEntry = {
  q: 'Do you support video ads?',
  a: 'Yes. AdRender renders static and video ads from real winning templates, converted into your brand — included on every tier, right from Free.',
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
  a: "Yes — video is priced per second and genuinely costs more to produce than a still, so it draws tokens down faster. Exact costs by resolution are shown before you render, so there's no surprise mid-render.",
}

const CONNECT_SHOPIFY: FaqEntry = {
  q: 'Can I connect my Shopify store if I have a Direct account?',
  a: 'Yes — from Brands & Campaigns, enter your store domain (your-store.myshopify.com), click Connect Shopify Store, and approve read_products access on Shopify. Your catalog syncs into that brand. This is separate from installing AdRender through the Shopify App Store — billing stays on your Direct account.',
}

const SHOPIFY_APP: FaqEntry = {
  q: 'Is there a Shopify app?',
  a: 'Yes. AdRender is also available as a native app on the Shopify App Store — install directly from your Shopify admin, billed through Shopify. Search AdRender in the Shopify App Store.',
}

const MONTHLY_TOKENS_ROLLOVER: FaqEntry = {
  q: 'Do my monthly tokens roll over?',
  a: 'No. Monthly plan tokens reset every billing cycle. Annual subscribers can carry unused plan tokens forward, up to two times their monthly amount. Anything above that is forfeited at month end.',
}

const TOPUP_TOKENS_EXPIRE: FaqEntry = {
  q: 'Do top-up tokens expire?',
  a: 'No. Top-up tokens stay on your account until you use them. Your monthly plan tokens are always spent first, so your top-ups are used last.',
}

const WHAT_IS_ADRENDER: FaqEntry = {
  q: 'What is AdRender?',
  a: 'We turn your brand and proven, real ad templates into on-brand static and video ads — hundreds of ads in under 10 minutes, no agency, no designer, no waiting.',
}

const TOKEN_METER: FaqEntry = {
  q: "What's a token, and what happens if I run out mid-render?",
  a: "Tokens meter AI rendering. The cost is calculated from what you pick before you render, so you never run out mid-render. If you do not have enough tokens to start, you are prompted to buy a top-up pack.",
}

const CANCEL: FaqEntry = {
  q: 'What happens if I cancel?',
  a: "You drop to the Free plan and keep every ad and brand library you've built, forever. You can top up anytime for exactly the tokens you need — those top-ups never expire.",
}

const WORKSPACES: FaqEntry = {
  q: 'What are workspaces?',
  a: 'Subscribed accounts can create multiple workspaces and invite other users into them by email. Where your plan includes team seats, the account owner may invite members and assign role-based permissions.',
}

const FAILED_RENDERS: FaqEntry = {
  q: 'Are failed renders refunded?',
  a: 'Yes, always. If a render fails, the tokens are returned to your account.',
}

const WATERMARK: FaqEntry = {
  q: 'Is there a watermark?',
  a: 'No. All outputs are clean, with no watermarks, on every plan including Free.',
}

const CREDIT_CARD: FaqEntry = {
  q: 'Do I need a credit card to start?',
  a: 'No. You can start for free with no credit card. You get 10 free tokens each month to test AdRender with, so you can try it for yourself before choosing a plan.',
}

const SIZES: FaqEntry = {
  q: 'What sizes can I create?',
  a: 'AdRender offers 11 ad sizes covering Facebook, Instagram, LinkedIn, Google, TikTok and more. You pick the size and your ad comes out at that size.',
}

const STORE_TO_START: FaqEntry = {
  q: 'Do I need a Shopify store or website to start?',
  a: "No. A store or website URL works and lets AdRender pull in your brand automatically, but you don't need any assets to start. You can begin with neither.",
}

const UPLOADS: FaqEntry = {
  q: 'Can I upload my own product images and marketing documents?',
  a: 'Yes. Upload your own product photos, reference images and marketing documents. AdRender can pull ready-written ad copy from your documents and write new ad copy based on your content.',
}

const DESIGN_SKILLS: FaqEntry = {
  q: 'Do I need design or prompting skills?',
  a: 'No. You only need to know how to click. You can still write your own prompt whenever you want to.',
}

const LEARNING_CURVE: FaqEntry = {
  q: 'How hard is it to learn AdRender?',
  a: "It's simple by design. It takes three easy steps: Add your brand — URL scan or campaign documents. Choose winning templates — Browse what's working, then render at scale. See your ads — Finished creatives, ready to launch. It's self-explanatory, so there is nothing to learn up front and nothing technical to set up.",
}

const COMPETITORS: FaqEntry = {
  q: 'Can I see what my competitors are advertising?',
  a: 'Yes. Search through 100M+ real ads by niche and platform to see what competitors are running.',
}

/** Questions already appended to every /lp page, in addition to that page's own FAQ. */
const SHARED_WITH_LANDING = new Set<FaqEntry>([
  MONTHLY_TOKENS_ROLLOVER,
  TOPUP_TOKENS_EXPIRE,
  FAILED_RENDERS,
  WATERMARK,
  CREDIT_CARD,
  SIZES,
  STORE_TO_START,
  UPLOADS,
  DESIGN_SKILLS,
  LEARNING_CURVE,
  COMPETITORS,
])

const FAQ_GROUPS: FaqGroup[] = [
  {
    label: 'Getting started',
    items: [WHAT_IS_ADRENDER, CREDIT_CARD, LEARNING_CURVE, DESIGN_SKILLS, STORE_TO_START, UPLOADS],
  },
  {
    label: 'What you can make',
    items: [COMPETITORS, SIZES, WATERMARK, VIDEO_SUPPORT, VIDEO_LENGTH, VIDEO_ASPECT],
  },
  {
    label: 'Tokens and pricing',
    items: [TOKEN_METER, VIDEO_COST, FAILED_RENDERS, MONTHLY_TOKENS_ROLLOVER, TOPUP_TOKENS_EXPIRE, CANCEL],
  },
  {
    label: 'Shopify and accounts',
    items: [SHOPIFY_APP, CONNECT_SHOPIFY, WORKSPACES, DELETE_ACCOUNT],
  },
]

/** Shared FAQ in group order, omitting questions a landing page already asks. */
export function landingSharedFaqGroups(exclude: ReadonlySet<string>): FaqGroup[] {
  return FAQ_GROUPS.map((group) => ({
    label: group.label,
    items: group.items.filter((item) => SHARED_WITH_LANDING.has(item) && !exclude.has(item.q)),
  })).filter((group) => group.items.length > 0)
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#12121a] px-5 py-4 sm:px-6 sm:py-5">
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
      {items.map((item) => (
        <ScrollReveal key={item.q}>
          <FaqItem q={item.q} a={item.a} />
        </ScrollReveal>
      ))}
    </div>
  )
}

type FaqSectionProps = {
  /** Page-specific questions shown first, with no group label. */
  leadingItems?: FaqEntry[]
  /** Grouped questions. Defaults to the full homepage FAQ. */
  groups?: FaqGroup[]
  intro?: string
}

export function FaqSection({
  leadingItems = [],
  groups = FAQ_GROUPS,
  intro = "Tokens, canceling, and what's included — without the fine-print fog.",
}: FaqSectionProps) {
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
      </div>
    </section>
  )
}
