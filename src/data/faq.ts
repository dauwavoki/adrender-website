/** Hash target for the annual token carry-over note in Pricing. */
export const FAQ_TOKEN_ROLLOVER_ID = 'faq-token-rollover'

export type FaqEntry = { q: string; a: string; id?: string }

export function faqAnchorId(entry: Pick<FaqEntry, 'q' | 'id'>): string {
  return entry.id ?? faqSlug(entry.q)
}

export type FaqGroup = { label: string; items: FaqEntry[] }

function faqSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function item(q: string, a: string, id?: string): FaqEntry {
  return { q, a, id: id ?? faqSlug(q) }
}

const DELETE_ACCOUNT = item(
  'What if I delete my account?',
  "You have 30 days to recover it. Need it gone immediately? Email info@adrender.app from your account's email after deleting.",
)

const VIDEO_SUPPORT = item(
  'Do you support video ads?',
  'Yes. AdRender renders static and video ads from real winning templates, converted into your brand — included on every tier, right from Free.',
)

const VIDEO_LENGTH = item(
  'How long can my video ads be?',
  "Video renders up to 30 seconds today, matched exactly to your reference clip's length — longer videos are coming soon.",
)

const VIDEO_ASPECT = item(
  'What aspect ratio do my videos come out in?',
  "Whatever you upload. Output always matches your reference video's exact aspect ratio — no cropping, no distortion, no guessing what the frame will look like.",
)

const VIDEO_COST = item(
  'Do videos cost more tokens than images?',
  "Yes — video is priced per second and genuinely costs more to produce than a still, so it draws tokens down faster. Exact costs by resolution are shown before you render, so there's no surprise mid-render.",
)

const CONNECT_SHOPIFY = item(
  'Can I connect my Shopify store if I have a Direct account?',
  'Yes — from Brands & Campaigns, enter your store domain (your-store.myshopify.com), click Connect Shopify Store, and approve read_products access on Shopify. Your catalog syncs into that brand. This is separate from installing AdRender through the Shopify App Store — billing stays on your Direct account.',
)

const SHOPIFY_APP = item(
  'Is there a Shopify app?',
  'Yes. AdRender is also available as a native app on the Shopify App Store — install directly from your Shopify admin, billed through Shopify. Search AdRender in the Shopify App Store.',
)

const MONTHLY_TOKENS_ROLLOVER = item(
  'Do my monthly tokens roll over?',
  "Not on the web app's monthly plans: monthly plan tokens reset every billing cycle. Annual subscribers can carry unused plan tokens forward, up to two times their monthly amount, and anything above that is trimmed when the next monthly tokens are added. On the AdRender Shopify app, unused plan tokens roll over on paid monthly plans too, up to two times your monthly amount.",
  FAQ_TOKEN_ROLLOVER_ID,
)

const TOPUP_TOKENS_EXPIRE = item(
  'Do top-up tokens expire?',
  'No. Top-up tokens stay on your account until you use them. Your monthly plan tokens are always spent first, so your top-ups are used last.',
)

const WHAT_IS_ADRENDER = item(
  'What is AdRender?',
  'We turn your brand and proven, real ad templates into on-brand static and video ads — hundreds of ads in under 10 minutes, no agency, no designer, no waiting.',
)

const TOKEN_METER = item(
  "What's a token, and what happens if I run out mid-render?",
  'Tokens meter AI rendering. The cost is calculated from what you pick before you render, so you never run out mid-render. If you do not have enough tokens to start, you are prompted to buy a top-up pack.',
)

const CANCEL = item(
  'What happens if I cancel?',
  "You drop to the Free plan and keep every ad and brand library you've built, forever. You can top up anytime for exactly the tokens you need — those top-ups never expire.",
)

const WORKSPACES = item(
  'What are workspaces?',
  'Subscribed accounts can create multiple workspaces and invite other users into them by email. Where your plan includes team seats, the account owner may invite members and assign role-based permissions.',
)

const FAILED_RENDERS = item(
  'Are failed renders refunded?',
  'Yes, always. If a render fails, the tokens are returned to your account.',
)

const WATERMARK = item(
  'Is there a watermark?',
  'No. All outputs are clean, with no watermarks, on every plan including Free.',
)

const CREDIT_CARD = item(
  'Do I need a credit card to start?',
  'No. You can start for free with no credit card. You get 10 free tokens each month to test AdRender with, so you can try it for yourself before choosing a plan.',
)

const SIZES = item(
  'What sizes can I create?',
  'AdRender offers 11 ad sizes covering Facebook, Instagram, LinkedIn, Google, TikTok and more. You pick the size and your ad comes out at that size.',
)

const STORE_TO_START = item(
  'Do I need a Shopify store or website to start?',
  "No. A store or website URL works and lets AdRender pull in your brand automatically, but you don't need any assets to start. You can begin with neither.",
)

const UPLOADS = item(
  'Can I upload my own product images and marketing documents?',
  'Yes. Upload your own product photos, reference images and marketing documents. AdRender can pull ready-written ad copy from your documents and write new ad copy based on your content.',
)

const DESIGN_SKILLS = item(
  'Do I need design or prompting skills?',
  'No. You only need to know how to click. You can still write your own prompt whenever you want to.',
)

const LEARNING_CURVE = item(
  'How hard is it to learn AdRender?',
  "It's simple by design. It takes three easy steps: Add your brand — scan your URL, upload assets, or connect your Shopify store. Choose winning templates — Browse what's working, then render at scale. See your ads — Finished creatives, ready to launch. It's self-explanatory, so there is nothing to learn up front and nothing technical to set up.",
)

const COMPETITORS = item(
  'Can I see what my competitors are advertising?',
  'Yes. Search through 100M+ real ads by niche and platform to see what competitors are running.',
)

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

export const FAQ_GROUPS: FaqGroup[] = [
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

/** The six questions that stay on the homepage, in display order. */
export const HOME_FAQ_ITEMS: FaqEntry[] = [
  WHAT_IS_ADRENDER,
  CREDIT_CARD,
  DESIGN_SKILLS,
  VIDEO_SUPPORT,
  MONTHLY_TOKENS_ROLLOVER,
  FAILED_RENDERS,
]

export function allFaqEntries(): FaqEntry[] {
  return FAQ_GROUPS.flatMap((group) => group.items)
}

/** Shared FAQ in group order, omitting questions a landing page already asks. */
export function landingSharedFaqGroups(exclude: ReadonlySet<string>): FaqGroup[] {
  return FAQ_GROUPS.map((group) => ({
    label: group.label,
    items: group.items.filter((entry) => SHARED_WITH_LANDING.has(entry) && !exclude.has(entry.q)),
  })).filter((group) => group.items.length > 0)
}

export function faqPageJsonLd(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqEntries().map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.a,
      },
    })),
  }
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
