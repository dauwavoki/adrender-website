import {
  Briefcase,
  CircleDollarSign,
  CreditCard,
  FlaskConical,
  Images,
  KeyboardOff,
  Layers,
  LayoutTemplate,
  Maximize2,
  MousePointerClick,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  User,
  Video,
  Wand2,
  type LucideIcon,
} from 'lucide-react'

export type LandingFeature = {
  heading: string
  body: string
  icon: LucideIcon
  accent: string
}

export type LandingPageConfig = {
  slug: string
  documentTitle: string
  metaDescription: string
  headline: string
  subhead: string
  stats: readonly [string, string, string]
  founderHeading: string
  founderParagraphs: string[]
  featuresHeading: string
  featuresSub: string
  features: LandingFeature[]
  faqIntro: string
  faq: { q: string; a: string }[]
  ctaHeading: string
  ctaSub: string
}

export function landingPath(slug: string) {
  return `/lp/${slug}`
}

export const CTA_NOTE = 'No credit card required. No watermarks. Ever.'

export const landingPages: LandingPageConfig[] = [
  {
    slug: 'easiest-ad-tool',
    documentTitle: 'The Easiest Way to Make On-Brand Ads | AdRender',
    metaDescription:
      'The easiest on-brand ad creative tool available. No marketing degree, no design skills, no learning curve. Just pick a template and go.',
    headline: "You don't need a marketing degree to make a great ad.",
    subhead: "The easiest on-brand ad creative tool available. Pick a template, your brand applies automatically. That's it.",
    stats: ['0 design skills required', '3 min to your first ad', '$19 to start'],
    founderHeading: 'I spent 20 years designing interfaces. Then I got tired of teaching people the tool.',
    founderParagraphs: [
      'After twenty years designing interfaces for a living, the thing I kept noticing was how much of "using a design tool" is really just learning the tool, not making the thing.',
      "AdRender is built so the learning curve is close to zero — because most people trying to make an ad aren't trying to become a designer, they just want a good ad.",
    ],
    featuresHeading: 'Simple on purpose.',
    featuresSub: 'If you can pick from a list, you can ship an ad.',
    features: [
      {
        heading: 'No blank canvas',
        body: 'Pick a proven template instead of starting from nothing.',
        icon: LayoutTemplate,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'No prompt to write',
        body: 'Your brand applies automatically — no prompt engineering required.',
        icon: Sparkles,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'No manual resizing',
        body: 'Every platform size is handled for you in the same generation.',
        icon: Maximize2,
        accent: 'text-[#5B9FFF]',
      },
      {
        heading: 'No tutorial required',
        body: 'If you can pick from a list, you can use AdRender.',
        icon: MousePointerClick,
        accent: 'text-[#FF8F5C]',
      },
    ],
    faqIntro: 'No design degree required — here are the usual first questions.',
    faq: [
      {
        q: 'Do I need any design experience?',
        a: "No. There's no canvas to learn, no layers, no design theory required. You're picking from real, working ad structures, not building one from scratch.",
      },
      {
        q: "What if I don't know what a good ad looks like?",
        a: "You don't have to know — the templates are pulled from ads that are already proven to work. You're recognizing what looks good, not deciding it from nothing.",
      },
      {
        q: 'How long does it actually take to make my first ad?',
        a: 'Most people get their first ad out in under 10 minutes, brand setup included.',
      },
    ],
    ctaHeading: 'Pick a template. Get an ad.',
    ctaSub: 'Your brand applies automatically. No design skills required.',
  },
  {
    slug: 'stop-the-tool-stack',
    documentTitle: 'One Tool Instead of Five | AdRender',
    metaDescription:
      'Stop paying for five subscriptions to make one ad. AdRender replaces the research tool, the design tool, and the copywriting tool with one flow.',
    headline: 'Cancel four subscriptions. Keep one.',
    subhead: 'Research tool, design tool, copywriting tool, resizing tool — replaced by one flow, one login, one bill.',
    stats: ['1 tool instead of 5', '100M+ real ads in one place', 'One flat monthly price'],
    founderHeading: 'I had the whole stack. The stack was the problem.',
    founderParagraphs: [
      'I had every tool in the stack — the swipe file app, the design tool, a separate copy tool, a resizing step by hand. Individually they were all fine.',
      'Together they were the whole problem: every handoff between them cost time, and every one of them was its own subscription.',
      'AdRender exists because the stitching, not any single tool, was what needed fixing.',
    ],
    featuresHeading: 'One flow instead of a pile of tabs.',
    featuresSub: 'Research, copy, design, and sizing — without the handoffs.',
    features: [
      {
        heading: 'Template research, in the same place',
        body: 'No separate ad-spy subscription — proven structures live next to generation.',
        icon: Layers,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Brand voice and copy, automatic',
        body: 'No separate copywriting tool. Your voice is applied when you generate.',
        icon: Wand2,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Every platform size, same flow',
        body: 'No separate resizing step after you finish the ad.',
        icon: Maximize2,
        accent: 'text-[#5B9FFF]',
      },
      {
        heading: 'One subscription',
        body: 'Not four or five stacked on top of each other.',
        icon: CreditCard,
        accent: 'text-[#FF8F5C]',
      },
    ],
    faqIntro: 'What you can cancel — and what you keep.',
    faq: [
      {
        q: 'What tools does AdRender actually replace?',
        a: 'Typically: an ad research/swipe-file tool, a design tool, a copywriting tool, and manual resizing across platforms — all in one flow.',
      },
      {
        q: 'Will I save money switching?',
        a: 'Most small teams running 3-4 separate tools for creative are paying more in total subscriptions than a single AdRender plan costs.',
      },
      {
        q: 'Do I still need Canva or Photoshop for anything?',
        a: 'Not for ad creative specifically — AdRender covers brand setup through finished, sized output in one flow.',
      },
    ],
    ctaHeading: 'One tool. One bill. One flow.',
    ctaSub: 'Cancel the rest of the stack. Keep the output.',
  },
  {
    slug: 'beat-creative-fatigue',
    documentTitle: 'Beat Creative Fatigue Before It Costs You | AdRender',
    metaDescription:
      'Refresh fading ad creative in minutes, not days. Generate fresh variants before creative fatigue costs you in CPA.',
    headline: 'Your CPA is climbing. Your creative is the reason.',
    subhead: 'Refresh before fatigue costs you, not after. Fresh, on-brand variants in minutes.',
    stats: ['Fresh variants in minutes', 'Test 10 angles for the cost of 1', 'No re-briefing a designer'],
    founderHeading: 'The fix was never a mystery. Speed was.',
    founderParagraphs: [
      "Every ad has a shelf life, and by the time CPA visibly climbs in your dashboard, you've usually already burned budget on a fading creative.",
      'The fix was never a mystery — refresh it — the problem was always speed.',
      'I built AdRender so refreshing creative takes minutes, not the days a briefing-and-waiting cycle usually takes.',
    ],
    featuresHeading: 'Refresh before the dip becomes a CPA problem.',
    featuresSub: 'Brand is already in. Variants are a few minutes away.',
    features: [
      {
        heading: 'Brand already set up',
        body: 'No re-briefing anyone when a creative starts fading.',
        icon: Paintbrush,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'A fresh batch in minutes',
        body: 'Generate from a different template without starting over.',
        icon: LayoutTemplate,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Test multiple new angles at once',
        body: "Don't guess at one replacement — ship several and let the data pick.",
        icon: FlaskConical,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Video and static both covered',
        body: "Fatigue doesn't force you into one format.",
        icon: Video,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'Speed, volume, and whether this covers video too.',
    faq: [
      {
        q: 'How fast can I actually get a replacement ad live?',
        a: "Minutes, not days — your brand is already set up, so generating a fresh variant is immediate.",
      },
      {
        q: 'Should I test one replacement or several?',
        a: "Several, ideally — generating multiple variants costs next to nothing, so you're not betting the refresh on a single guess.",
      },
      {
        q: 'Does this work for video ads too, or just static?',
        a: 'Both — fatigue hits video and static creative alike, and AdRender generates both from the same flow.',
      },
    ],
    ctaHeading: 'Refresh before CPA climbs.',
    ctaSub: 'Fresh, on-brand variants in minutes — not a briefing cycle.',
  },
  {
    slug: 'not-ai-slop',
    documentTitle: "Ads That Don't Look Like AI Slop | AdRender",
    metaDescription:
      'Ads that don\'t look AI-generated. AdRender starts from real running ads, not a generic prompt, so your creative doesn\'t scream "made by a bot."',
    headline: 'Your customers can spot an AI ad from a mile away.',
    subhead: "This one doesn't look like one. Real ad structures in, real ads out.",
    stats: ['100M+ real running ads as the source', 'Not a blank prompt', "Built from what's already working"],
    founderHeading: 'Most AI ad tools guess. This one starts from something real.',
    founderParagraphs: [
      'The AI-slop backlash in 2026 is real — that oversaturated, unmistakably-generated look people learn to scroll past.',
      'Most AI ad tools generate from a blank prompt guessing at what an ad "should" look like.',
      'I built AdRender to start from the opposite direction: real ad structures that are already proven, so the output looks directed, because it came from something that was.',
    ],
    featuresHeading: 'Directed output. Not a generic prompt.',
    featuresSub: 'The structure is already proven. Your brand fills it in.',
    features: [
      {
        heading: 'Sourced from real running ads',
        body: 'Every template comes from a currently-running ad — not a generic AI layout.',
        icon: Images,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Your brand, not an AI aesthetic',
        body: 'Actual brand voice and product imagery — not a generic generated look.',
        icon: Briefcase,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'No prompt-guessing',
        body: "The structure is already proven. You're not hoping the AI interprets you correctly.",
        icon: KeyboardOff,
        accent: 'text-[#00E5FF]',
      },
    ],
    faqIntro: "Why this doesn't look like every other AI generator.",
    faq: [
      {
        q: 'How is this different from just prompting ChatGPT or another AI generator?',
        a: 'Those generate from your description of what you want. AdRender generates from a real, proven ad structure and applies your brand to it — a fundamentally different starting point.',
      },
      {
        q: "Will my ads look 'AI-made'?",
        a: 'The goal is no — because the underlying structure came from a real human-directed ad, not a generic prompt interpretation.',
      },
      {
        q: 'Can I still customize the output?',
        a: 'Yes, everything generated can be edited further.',
      },
    ],
    ctaHeading: "Ads that don't look generated.",
    ctaSub: 'Real ad structures in. Real ads out.',
  },
  {
    slug: 'skip-the-agency',
    documentTitle: 'Skip the Agency Retainer | AdRender',
    metaDescription:
      'Agency-quality ad creative without the $5,000/month retainer or the multi-month contract. Transparent pricing, cancel anytime.',
    headline: 'The agency quote was $5,000 a month. For ads.',
    subhead: 'Get the creative output without the retainer, the contract, or the account manager.',
    stats: ['$19/mo vs. $2,500-$10K/mo retainers', 'No contract, cancel anytime', 'No account manager needed'],
    founderHeading: "Most of the retainer isn't the creative.",
    founderParagraphs: [
      "A real agency retainer runs $2,500 to $10,000+ a month, often with a multi-month contract, before you've tested whether the creative direction even works.",
      "Most of what you're paying for in that retainer is process and account management around the creative, not the creative itself.",
      'AdRender strips that down to just the output.',
    ],
    featuresHeading: 'The output. Not the overhead.',
    featuresSub: 'Flat monthly pricing. Cancel anytime. Generate directly.',
    features: [
      {
        heading: 'Flat monthly pricing',
        body: 'Unrelated to ad spend or the number of "campaigns."',
        icon: CircleDollarSign,
        accent: 'text-[#96F07A]',
      },
      {
        heading: 'No multi-month contract',
        body: 'Cancel anytime — no retainer lock-in while you test creative.',
        icon: ShieldCheck,
        accent: 'text-[#5B9FFF]',
      },
      {
        heading: 'No account manager needed',
        body: 'No status-call overhead — you generate directly.',
        icon: User,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Hundreds of ads per month',
        body: 'Not a capped monthly deliverable count.',
        icon: Images,
        accent: 'text-[#B894F0]',
      },
    ],
    faqIntro: 'Quality, what you give up, and whether you can leave.',
    faq: [
      {
        q: 'Is the quality really comparable to an agency?',
        a: 'Every template is sourced from real, currently-running ads — the same caliber of structure an agency would reference, without the markup.',
      },
      {
        q: 'What am I actually giving up by not using an agency?',
        a: "Mainly account management and strategy calls — if you already know your product and audience, that overhead often isn't buying you much.",
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes, no multi-month contract, cancel whenever.',
      },
    ],
    ctaHeading: 'Skip the retainer. Keep the output.',
    ctaSub: 'Agency-caliber creative. Flat monthly pricing. Cancel anytime.',
  },
]

export function getLandingPageBySlug(slug: string) {
  return landingPages.find((p) => p.slug === slug)
}
