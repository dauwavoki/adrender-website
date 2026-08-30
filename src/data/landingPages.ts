import {
  ArrowLeftRight,
  BarChart3,
  Briefcase,
  CameraOff,
  CircleDollarSign,
  Clapperboard,
  CreditCard,
  Crop,
  EyeOff,
  Film,
  FlaskConical,
  Gamepad2,
  Handshake,
  Images,
  KeyboardOff,
  Layers,
  LayoutGrid,
  LayoutTemplate,
  Maximize2,
  Megaphone,
  Monitor,
  MousePointerClick,
  Music2,
  Package,
  Paintbrush,
  Palette,
  PenTool,
  RectangleHorizontal,
  RectangleVertical,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Store,
  Timer,
  User,
  UserRound,
  Users,
  Video,
  Wand2,
  Zap,
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
  {
    slug: 'no-filming',
    documentTitle: 'Video Ads Without Filming Anything | AdRender',
    metaDescription:
      'Camera-shy? AdRender generates video ads without filming anything — no camera, no talent booking, no shoot.',
    headline: "You don't have to be on camera to have a video ad.",
    subhead: 'No filming. No talent booking. No shoot. Video generated the same way your static ads are.',
    stats: ['0 filming required', 'Video + static, same flow', 'Minutes, not a shoot day'],
    founderHeading: 'Video converts. Getting one made is the wall.',
    founderParagraphs: [
      'Video converts, everyone knows it — and everyone also knows what it costs to get one: booking talent, finding a backdrop, filming takes, editing it down.',
      "For a solo founder who'd rather not be the face of the brand, or just doesn't have a studio, that whole pipeline is a wall before the ad even exists.",
      "I built video generation into the same flow as static ads specifically so that wall doesn't have to be there.",
    ],
    featuresHeading: 'No camera. No crew. No shoot day.',
    featuresSub: 'The same brand setup that powers your static ads powers video.',
    features: [
      {
        heading: 'Nothing to film',
        body: 'No camera, no crew, no talent booking. Video is generated — not shot.',
        icon: CameraOff,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Same brand setup, both formats',
        body: 'One brand profile powers static and video output. You do not set anything up twice.',
        icon: Layers,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Minutes, not a shoot day',
        body: 'Finished video ads in the same timeframe as static — not a half-day of takes.',
        icon: Timer,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Stay off camera',
        body: 'Full creative control without appearing in the ad yourself.',
        icon: EyeOff,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'No equipment, no talent, no on-camera requirement.',
    faq: [
      {
        q: 'Do I need any video equipment at all?',
        a: 'No — nothing to film, nothing to record. Video is generated the same way static ads are.',
      },
      {
        q: 'Can I still be in my ads if I want to?',
        a: "The point is you don't have to be — if you prefer to stay off-camera, this removes that requirement entirely.",
      },
      {
        q: 'Is the video quality actually usable for real ad spend?',
        a: "Yes — output is generated from real video ad structures, sized correctly for the platform you're running on.",
      },
    ],
    ctaHeading: 'Video ads. Zero filming.',
    ctaSub: 'Same flow as static. No camera, no talent, no shoot.',
  },
  {
    slug: 'solo-founder',
    documentTitle: 'AI Ads Built for Solo Founders | AdRender',
    metaDescription:
      "Built for the 28 million one-person businesses running their own marketing. AdRender does the creative work you don't have time to hire out.",
    headline: "It's just you. Your ad creative shouldn't need a whole team.",
    subhead: 'Built for the one-person businesses doing their own marketing — no team to hand things off to, none required.',
    stats: ['28M+ one-person businesses in the US', 'No team required', 'One person, full ad workflow'],
    founderHeading: 'Most tools assume a team exists. This one assumes the opposite.',
    founderParagraphs: [
      'There are roughly 28 million one-person businesses in the US — founders and freelancers who are the designer, the marketer, and everything else, all at once.',
      'Most tools are quietly built assuming a team exists to brief and review.',
      "I built AdRender assuming the opposite: it's just you, and every step should work that way.",
    ],
    featuresHeading: 'Built for a team of one.',
    featuresSub: 'No handoffs. No review layer. No briefing cycle.',
    features: [
      {
        heading: 'No one to hand off to',
        body: "There's no designer waiting on a brief — and the product doesn't pretend there is.",
        icon: UserRound,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Minutes, not a briefing cycle',
        body: 'Brand setup takes minutes. You are not writing a creative brief for someone else.',
        icon: Timer,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Generate and approve yourself',
        body: "No review layer built in that you don't need. You generate, you ship.",
        icon: MousePointerClick,
        accent: 'text-[#B894F0]',
      },
      {
        heading: "Priced for a solo operator",
        body: "A solo founder's budget, not a team's. Start at $19/mo.",
        icon: CircleDollarSign,
        accent: 'text-[#96F07A]',
      },
    ],
    faqIntro: 'Usable alone, expandable later, and actually faster.',
    faq: [
      {
        q: 'Is this actually usable by one person with no design background?',
        a: "Yes — that's specifically who it's built for. No design skills or team required.",
      },
      {
        q: 'What if I scale up and need to add people later?',
        a: 'Team workspaces are available on paid tiers whenever you need them — nothing about starting solo locks you out of growing.',
      },
      {
        q: 'How much time does this actually save a solo operator?',
        a: 'Most people go from brand setup to a finished batch of ads in under 10 minutes total.',
      },
    ],
    ctaHeading: "It's just you. That's enough.",
    ctaSub: 'The full ad workflow, sized for a team of one.',
  },
  {
    slug: 'agencies-multi-client',
    documentTitle: 'AI Ads for Agencies Managing Multiple Clients | AdRender',
    metaDescription:
      "Manage every client's ad creative in one place. AdRender supports unlimited brands on the Scale tier, built for agencies and freelancers.",
    headline: 'Six clients. Six brand voices. One tool.',
    subhead: 'Manage every client\'s ads without six separate logins or six separate subscriptions.',
    stats: ['Unlimited brands on Scale', 'One login, every client', 'No per-client subscription stacking'],
    founderHeading: "Most tools weren't built with more than one brand in mind.",
    founderParagraphs: [
      'Running creative for multiple clients usually means separate brand kits, separate tool logins, constant context-switching between accounts that sound nothing alike.',
      "Most tools weren't built with more than one brand in mind.",
      "AdRender was, specifically so agencies and freelancers aren't stretching a single-brand tool across six accounts or paying for six subscriptions to do it.",
    ],
    featuresHeading: 'Every client. One account.',
    featuresSub: 'Independent brand profiles. One subscription. No stacking.',
    features: [
      {
        heading: 'Independent brand profiles',
        body: 'Each client gets their own colors, voice, and catalog — kept separate automatically.',
        icon: Briefcase,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Switch without losing context',
        body: 'Move between client accounts without one brand bleeding into the next.',
        icon: ArrowLeftRight,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Unlimited brands on Scale',
        body: 'Unlimited brands and campaigns under one account — built for a multi-client roster.',
        icon: Layers,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'One subscription, every client',
        body: 'Not one subscription per client. One flat plan covers the whole roster.',
        icon: CreditCard,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'How many brands, how separate they stay, and what it costs.',
    faq: [
      {
        q: 'How many client brands can I manage?',
        a: 'The Scale tier supports unlimited brands and campaigns under one account.',
      },
      {
        q: "Can each client's brand voice stay genuinely separate?",
        a: "Yes — each brand profile is independent, so switching between clients doesn't bleed one brand's tone into another's.",
      },
      {
        q: 'Is this cheaper than paying per client elsewhere?',
        a: 'For most agencies managing several accounts, yes — one flat subscription instead of stacking per-client tool costs.',
      },
    ],
    ctaHeading: 'Every client. One login.',
    ctaSub: 'Unlimited brands on Scale. No per-client stacking.',
  },
  {
    slug: 'tiktok-ad-maker',
    documentTitle: 'TikTok Ad Maker — Static and Video, Sized Right | AdRender',
    metaDescription:
      'Generate TikTok-ready ads, static and video, sized correctly and built from formats that actually perform on TikTok.',
    headline: "TikTok has its own visual language. Generic ads don't speak it.",
    subhead: 'Generate TikTok-native ads, static and video, sized correctly from real formats that perform on the platform.',
    stats: ['Sized correctly for TikTok', 'Static + video', 'Built from real TikTok-performing ads'],
    founderHeading: 'Resizing a Facebook ad does not make it a TikTok ad.',
    founderParagraphs: [
      'An ad that works on Facebook often falls flat on TikTok — the platform has its own pacing and its own sense of what looks native versus what looks like an obvious outside ad getting skipped past.',
      "Resizing something built for a different platform doesn't fix that gap.",
      'AdRender generates from templates pulled from ads actually performing on TikTok specifically, not adapted from somewhere else.',
    ],
    featuresHeading: 'TikTok-native from generation. Not resized later.',
    featuresSub: 'Real TikTok ads as the source. Correct size from the start.',
    features: [
      {
        heading: 'Sourced from real TikTok ads',
        body: 'Templates pulled from currently-running TikTok ads — not repurposed Facebook creative.',
        icon: Music2,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Sized correctly from the start',
        body: 'Correct sizing and format at generation, not cropped or stretched after the fact.',
        icon: Maximize2,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Static and video, both TikTok',
        body: 'Both formats covered for TikTok specifically — not one format stretched to fit.',
        icon: Video,
        accent: 'text-[#5B9FFF]',
      },
      {
        heading: 'Same brand, this platform',
        body: 'Your brand applies automatically, the same way it does on every other platform.',
        icon: Wand2,
        accent: 'text-[#FF8F5C]',
      },
    ],
    faqIntro: 'Where the templates come from, and whether video is actually TikTok-native.',
    faq: [
      {
        q: 'Are these templates actually from TikTok, or just resized from elsewhere?',
        a: 'Sourced from real ads running on TikTok specifically — not repurposed Facebook or Instagram creative.',
      },
      {
        q: "Does AdRender handle TikTok's video format requirements?",
        a: "Yes — video output is sized and structured for TikTok's native format.",
      },
      {
        q: 'Can I use the same brand setup for TikTok and other platforms?',
        a: "Yes — one brand setup, generate for any platform you're running on.",
      },
    ],
    ctaHeading: 'Make ads that look like they belong on TikTok.',
    ctaSub: 'Native sizing. Real TikTok structures. Static and video.',
  },
  {
    slug: 'instagram-ad-maker',
    documentTitle: 'Instagram Ad Maker — Feed, Stories, and Reels | AdRender',
    metaDescription:
      'Generate Instagram-ready ads for feed, Stories, and Reels, sized correctly and built from formats that actually perform.',
    headline: 'Feed, Stories, Reels — three shapes, one product.',
    subhead: 'Generate Instagram-native ads sized right for every placement, without manually resizing anything.',
    stats: ['3 placements, correctly sized', 'Static + video', 'Built from real Instagram-performing ads'],
    founderHeading: 'Three placements. Manually resizing one creative usually fails at least one of them.',
    founderParagraphs: [
      'Instagram alone has multiple placements with different dimensions and different visual expectations — feed, Story, Reel each want something a little different, and manually resizing one creative into all three usually produces a worse version in at least one of them.',
      'AdRender generates each placement correctly from the start, from templates pulled from real Instagram ads.',
    ],
    featuresHeading: 'Every Instagram placement, sized right.',
    featuresSub: 'Feed, Stories, and Reels — generated correctly, not cropped later.',
    features: [
      {
        heading: 'All three placements',
        body: 'Feed, Stories, and Reels sizing handled automatically from the same brand setup.',
        icon: RectangleVertical,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Sourced from real Instagram ads',
        body: 'Templates pulled from currently-running Instagram ads — not adapted from elsewhere.',
        icon: Images,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'No manual cropping',
        body: 'No resizing per placement after the fact. Each shape is generated correctly.',
        icon: Crop,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Static and video covered',
        body: "Both formats, including Reels' native vertical video.",
        icon: Video,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'Placements, template source, and whether Reels video is covered.',
    faq: [
      {
        q: 'Do I need to generate separately for feed vs. Stories vs. Reels?',
        a: "No — each placement's sizing is handled as part of generation from the same brand setup.",
      },
      {
        q: 'Are these templates actually from Instagram?',
        a: 'Yes — sourced from real ads currently running on the platform, not adapted from elsewhere.',
      },
      {
        q: 'Does this work for Reels specifically, including video?',
        a: "Yes — video output is sized and structured for Reels' native vertical format.",
      },
    ],
    ctaHeading: 'Every Instagram placement. Sized correctly.',
    ctaSub: 'Feed, Stories, and Reels — no manual resizing.',
  },
  {
    slug: 'shopify-ad-maker',
    documentTitle: 'Shopify Ad Maker — Your Catalog, Automatically | AdRender',
    metaDescription:
      'Connect your Shopify store and generate ads across your entire catalog automatically — every product, every variant, no manual uploads.',
    headline: 'Your whole Shopify catalog. Ad-ready, automatically.',
    subhead:
      'Connect your store once. Every product, image, and variant syncs in — no manual uploads, no re-exporting when you add a SKU.',
    stats: ['Full catalog sync, one connection', '500 SKUs or 5, same effort', 'No re-upload per product'],
    founderHeading: 'A handful of products is manageable. A real catalog is a wall.',
    founderParagraphs: [
      "A handful of products is manageable to advertise by hand. A real, growing Shopify catalog isn't — most tools still assume you're uploading one image and working through one flow per product, over and over, for every SKU you carry.",
      'I built the Shopify integration specifically so a large catalog stops being a wall you hit as you grow.',
    ],
    featuresHeading: 'Connect once. Generate the whole catalog.',
    featuresSub: 'Products, images, variants, and branding — in from your store, not uploaded by hand.',
    features: [
      {
        heading: 'Full catalog sync',
        body: 'One connection pulls in products, images, variants, and pricing.',
        icon: Store,
        accent: 'text-[#96F07A]',
      },
      {
        heading: 'New SKUs flow in automatically',
        body: 'Add a product to your store and it shows up here — no re-export, no re-upload.',
        icon: RefreshCw,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Generate across the line',
        body: 'Ads for your whole product catalog, not one SKU at a time.',
        icon: Package,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Brand pulled from the store',
        body: 'Voice and colors come in alongside the catalog for the initial setup.',
        icon: Palette,
        accent: 'text-[#FF8F5C]',
      },
    ],
    faqIntro: 'Sync, catalog size, and what actually comes over from Shopify.',
    faq: [
      {
        q: 'Do I have to re-upload products every time I add a new one?',
        a: 'No — new products sync automatically once your store is connected.',
      },
      {
        q: 'Does this work for stores with hundreds of SKUs?',
        a: 'Yes — the sync and generation flow are built to handle large catalogs, not just a handful of products.',
      },
      {
        q: 'What exactly syncs from Shopify?',
        a: "Products, images, variants, and pricing, plus your store's colors and branding for the initial setup.",
      },
    ],
    ctaHeading: 'Connect the store. Generate the catalog.',
    ctaSub: 'Every product, image, and variant — no manual uploads.',
  },
  {
    slug: 'meta-ads-maker',
    documentTitle: 'Meta Ad Maker — Facebook and Instagram, Sized Right | AdRender',
    metaDescription:
      'Generate Meta-ready ads for Facebook and Instagram, sized correctly for every placement, from formats that actually perform.',
    headline: "Meta has more placements than you're probably designing for.",
    subhead:
      'Feed, Stories, Reels, right column — generate ads sized correctly across Facebook and Instagram, without resizing anything by hand.',
    stats: ['Every Meta placement covered', 'Static + video', 'Built from real Meta-performing ads'],
    founderHeading: 'Hand-resizing one creative usually means one placement gets the worse version.',
    founderParagraphs: [
      "Meta's ad ecosystem spans more placements than most people design for individually — Feed, Stories, Reels, and the older right-column format all want different dimensions, and hand-resizing one creative across all of them usually means at least one placement gets a worse version.",
      'AdRender generates each one correctly from the same brand setup, from templates pulled from real Meta ads.',
    ],
    featuresHeading: 'Every Meta placement. Sized correctly. From one setup.',
    featuresSub: 'Facebook and Instagram, static and video — generated, not resized by hand.',
    features: [
      {
        heading: 'Every major placement',
        body: 'Feed, Stories, Reels, and right column — each sized correctly at generation.',
        icon: LayoutGrid,
        accent: 'text-[#5B9FFF]',
      },
      {
        heading: 'Sourced from real Meta ads',
        body: 'Templates pulled from currently-running Facebook and Instagram ads — not generic layouts.',
        icon: LayoutTemplate,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Static and video covered',
        body: 'Both formats, across Meta placements, from the same generation flow.',
        icon: Video,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'One brand setup, every placement',
        body: 'Generate for every Meta placement at once — not a separate pass per size.',
        icon: Wand2,
        accent: 'text-[#FF8F5C]',
      },
    ],
    faqIntro: 'Facebook vs. Instagram, placements, and where the templates come from.',
    faq: [
      {
        q: 'Does this cover both Facebook and Instagram, or just one?',
        a: "Both — Meta's placements across both platforms are handled from the same generation flow.",
      },
      {
        q: 'Do I need to generate separately for each placement?',
        a: 'No — placement sizing is handled as part of generation, not a separate manual step.',
      },
      {
        q: 'Are these templates actually pulled from real Meta ads?',
        a: 'Yes — sourced from ads currently running on Facebook and Instagram, not generic templates.',
      },
    ],
    ctaHeading: 'Cover every Meta placement.',
    ctaSub: 'Sized correctly from generation. Static and video.',
  },
  {
    slug: 'built-for-designers-too',
    documentTitle: 'Built for Designers Too — Not Just Beginners | AdRender',
    metaDescription:
      'You know good design when you see it. AdRender still saves you real time — no blank canvas, no rebuilding the same layout from scratch every time.',
    headline: "You don't need AdRender because you can't design. You'll want it because you're tired of starting from scratch.",
    subhead:
      "Twenty years of UX taught me good tools remove decisions that shouldn't be yours to make every single time — even for people who already know how to make them.",
    stats: ['Skip the blank canvas, every time', 'Real ad structures, not raw layers', 'Minutes instead of hours, still on-brand'],
    founderHeading: 'The friction was never a skill gap.',
    founderParagraphs: [
      'I spent twenty years designing interfaces before building this — Figma, Photoshop, every tool in that world, fluently. The friction was never a skill gap for me.',
      'It was rebuilding a proven layout by hand for the fifth time this month, resizing it across platforms, and doing it all again next week.',
      "AdRender isn't for people who can't design. It's for anyone, designer included, who's tired of solving the same layout problem repeatedly instead of once.",
    ],
    featuresHeading: 'This removes repetition. Not judgment.',
    featuresSub: 'Start from a proven structure. Keep full creative control of the finish.',
    features: [
      {
        heading: 'Skip the blank canvas',
        body: 'Start from a proven structure instead of a blank frame, every time.',
        icon: LayoutTemplate,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Brand consistency, automatic',
        body: 'Handled for you instead of manually rebuilt per file.',
        icon: Palette,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Resizing done for you',
        body: 'Across platforms, not a manual export pass after you finish the layout.',
        icon: Maximize2,
        accent: 'text-[#5B9FFF]',
      },
      {
        heading: 'Full creative control still available',
        body: 'This removes the repetition, not the judgment. Generation is a starting point.',
        icon: PenTool,
        accent: 'text-[#00E5FF]',
      },
    ],
    faqIntro: 'For people who already know Figma, Canva, and the rest.',
    faq: [
      {
        q: 'I already know how to use Figma and Canva — why would I need this?',
        a: "Because knowing the tools doesn't remove the repetition — rebuilding a proven layout and resizing it across platforms takes real time even when you're fast at it.",
      },
      {
        q: 'Can I still customize the output with real design control?',
        a: 'Yes — generation gives you a strong starting point, not a locked final file.',
      },
      {
        q: 'Is this replacing my design tool, or working alongside it?',
        a: 'For ad creative specifically, most designers use it to replace the repetitive part of the workflow — the blank-canvas rebuild — not their broader design work.',
      },
    ],
    ctaHeading: 'Skip the blank canvas.',
    ctaSub: 'Start from a proven structure. Stay in control of the finish.',
  },
  {
    slug: 'every-ad-size',
    documentTitle: 'Every Ad Size, Done Right | AdRender',
    metaDescription:
      'Medium Rectangle, Leaderboard, Skyscraper, and every other odd ad size — generated correctly, not stretched or cropped badly like most tools produce.',
    headline: 'The ad sizes everyone else gets wrong.',
    subhead:
      'Medium Rectangle, Half Page, Leaderboard, Wide Skyscraper, Mobile Banner — generated cleanly, not stretched, cropped, or pixelated.',
    stats: ['Every odd size supported', 'No stretching or bad crops', 'Google, LinkedIn, display sizes covered'],
    founderHeading: 'Standard sizes are easy. The odd ones took real work.',
    founderParagraphs: [
      "Most ad tools handle standard social sizes fine and fall apart on the odd ones — the display banner formats, the awkward Google and LinkedIn dimensions that don't map cleanly to a square or a 9:16 vertical.",
      "Getting those sizes to render cleanly instead of stretched or badly cropped took real engineering work most tools clearly haven't done.",
      'AdRender handles them properly, not as an afterthought.',
    ],
    featuresHeading: 'The sizes most tools treat as an afterthought.',
    featuresSub: 'Odd display dimensions, generated cleanly — not stretched or cropped into place.',
    features: [
      {
        heading: 'Every odd size supported',
        body: 'Medium Rectangle, Half Page, Leaderboard, Wide Skyscraper, Mobile Banner, and more.',
        icon: RectangleHorizontal,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Clean output at every size',
        body: 'No stretching, no bad crops, no pixelation — each size is generated and processed properly.',
        icon: Crop,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Google and LinkedIn covered',
        body: 'Display Network and LinkedIn sizing, not just social platforms.',
        icon: Monitor,
        accent: 'text-[#5B9FFF]',
      },
      {
        heading: 'Same brand, every size',
        body: 'One brand setup generates every size automatically.',
        icon: Wand2,
        accent: 'text-[#00E5FF]',
      },
    ],
    faqIntro: 'Why odd sizes look bad, and which ones AdRender actually covers.',
    faq: [
      {
        q: 'Why do odd ad sizes usually look bad from AI tools?',
        a: 'Most tools crop or stretch a standard-shaped image into the odd dimension, which distorts or cuts off the content. AdRender generates and processes each size properly instead of forcing a mismatched crop.',
      },
      {
        q: 'Does this cover Google Display Network sizes?',
        a: 'Yes — Medium Rectangle, Leaderboard, Skyscraper, and other standard Display Network sizes are supported.',
      },
      {
        q: 'What about LinkedIn ad sizes specifically?',
        a: "Yes — LinkedIn's ad dimensions are covered alongside the broader display and social size set.",
      },
    ],
    ctaHeading: 'Every size. Done properly.',
    ctaSub: 'No stretching. No bad crops. No pixelation.',
  },
  {
    slug: 'freelance-designers',
    documentTitle: 'AI Ad Generator for Freelance Designers | AdRender',
    metaDescription:
      'Deliver more ad variations per client without working more hours. AdRender helps freelance ad designers scale output and take on more gigs.',
    headline: 'More clients. Same hours.',
    subhead: 'Deliver 5x the ad variations per gig without working 5x the hours. Take on more work without burning out.',
    stats: ['5x output, same hours', 'Client-ready in minutes', 'Static + video for every gig'],
    founderHeading: 'The ceiling was production speed. Never skill.',
    founderParagraphs: [
      "After ten years designing app interfaces, I know what it's like to be capped by production speed, not skill.",
      'Freelance ad designers face the same wall — clients always want more variations to test, and manual production is what limits how many gigs you can actually take.',
      'AdRender exists to remove that ceiling.',
    ],
    featuresHeading: 'More gigs. Same hours. Same quality bar.',
    featuresSub: 'Client brand in. Variations out. You stay on direction and finish.',
    features: [
      {
        heading: 'Client brand, applied automatically',
        body: "Pick a proven template, then pull their colors, logo, and product shots from their site or Shopify store — no rebuilding a kit by hand each gig.",
        icon: Palette,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Client-ready in minutes',
        body: 'Static and video variations from the same flow, no prompting — ready to send, not a rough you still have to rebuild.',
        icon: Timer,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Concept before you commit hours',
        body: 'Generate direction options first so the client can pick a path before you spend a day on a full build.',
        icon: Images,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Take more clients without more hours',
        body: 'Production volume stops being the cap on how many gigs you can actually take.',
        icon: Users,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'Client work, your skills, and whether the output looks generated.',
    faq: [
      {
        q: 'Can I use this for client work, not just my own brand?',
        a: 'Yes, set up a brand profile per client and generate on-brand variations for each one.',
      },
      {
        q: 'Does this replace my design skills?',
        a: "No, it removes the production ceiling so your skills go further — you're still choosing, directing, and refining the output.",
      },
      {
        q: "Can clients tell it's AI-assisted?",
        a: 'Templates come from real, currently-running ads, not a generic AI look — output is built to read as intentional, client-ready work.',
      },
    ],
    ctaHeading: 'Take the next gig without adding hours.',
    ctaSub: 'More variations per client. Same week. Same quality bar.',
  },
  {
    slug: 'ugc-creator-scale',
    documentTitle: 'Scale Your UGC Business | AdRender',
    metaDescription:
      'Scale your brand deals without more filming hours. AdRender helps UGC creators draft video concepts fast, keeping filmed content for what matters most.',
    headline: "You can only film so much. Your income shouldn't be capped by that.",
    subhead: 'Draft video concepts fast, pitch more brands, keep filmed content for your premium work.',
    stats: ['More brand deals, same shoot schedule', 'Draft concepts in minutes', 'Static + video generation'],
    founderHeading: 'The ceiling nobody talks about is the shoot schedule.',
    founderParagraphs: [
      "UGC creators face a hard ceiling most people don't think about — you can only physically film so much.",
      "AdRender doesn't replace filmed work, it gives you a way to draft concepts, test hooks, and pitch brands faster, so your camera time goes to what actually pays best.",
    ],
    featuresHeading: 'Keep the camera for the work that pays.',
    featuresSub: 'Draft, pitch, and test without booking another shoot day.',
    features: [
      {
        heading: 'Draft concepts before you film',
        body: 'Generate multiple video angles from proven ad structures so the shoot day is spent on the one that already has a pulse.',
        icon: Clapperboard,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Pitch with something finished-looking',
        body: 'Send brands a real concept instead of describing an idea in an email and hoping they can picture it.',
        icon: Megaphone,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Filmed stays the premium offer',
        body: 'Use generated drafts for testing and lower-stakes rounds. Camera time goes to the work brands pay a creator rate for.',
        icon: Film,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Build the portfolio between shoots',
        body: 'Fill gaps on the calendar with concept work instead of waiting on the next brand day to show range.',
        icon: Images,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'What this replaces, what to tell brands, and using your own look.',
    faq: [
      {
        q: 'Does this replace filmed UGC content?',
        a: "No — it's built for concept testing, pitching, and volume, while filmed work stays your premium offering.",
      },
      {
        q: "Should I tell brands what's AI-assisted?",
        a: "Yes, being upfront about what's generated versus filmed builds trust and matches where disclosure expectations are heading.",
      },
      {
        q: 'Can I use my own likeness or characters?',
        a: 'Upload reference images for more control over how your concepts look.',
      },
    ],
    ctaHeading: 'Pitch more brands. Film what matters.',
    ctaSub: 'Draft the volume. Keep the shoot day for the premium work.',
  },
  {
    slug: 'affiliate-marketers',
    documentTitle: 'AI Ad Generator for Affiliate Marketers | AdRender',
    metaDescription:
      'Endless ad variations for offer testing. AdRender generates from proven ad structures — no brand kit, no design team, no waiting.',
    headline: 'Winning ads decay fast. Have the next one already made.',
    subhead: 'Generate endless variations from proven ad structures. Keep testing without waiting on a designer.',
    stats: ['No brand constraints', 'Batch generation for testing', 'Static + video, fast'],
    founderHeading: 'No brand kit. No creative team. Just what converts.',
    founderParagraphs: [
      'Affiliate marketing runs on pure testing velocity — no brand kit, no creative team, just constant iteration on what converts.',
      "AdRender's core mechanic, picking a proven ad structure and applying your offer, maps directly onto that workflow.",
    ],
    featuresHeading: 'Built for offer testing, not brand polish.',
    featuresSub: 'Pick a structure. Apply the offer. Generate the next batch.',
    features: [
      {
        heading: 'Dozens of variations per offer',
        body: 'Generate a full test set in minutes — not one polished ad while the rest of the angles wait.',
        icon: Layers,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'No brand constraints slowing you down',
        body: 'Apply the offer directly to proven templates. You are optimizing for conversion, not a locked brand kit.',
        icon: Zap,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Batch generation for real volume',
        body: 'Built for the kind of testing schedule affiliates actually run — many variations, same offer, same session.',
        icon: FlaskConical,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Static and video, same flow',
        body: 'Both formats from the same generation pass, so a winning static angle can become a video test without a second pipeline.',
        icon: Video,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'Brand setup, speed to first test, and batch volume.',
    faq: [
      {
        q: 'Do I need a brand profile set up to use this?',
        a: "A minimal one works fine — you're optimizing for conversion, not brand consistency.",
      },
      {
        q: 'How fast can I test a new offer?',
        a: 'Minutes from picking a template to a finished, ready-to-run variation.',
      },
      {
        q: 'Can I generate many variations of the same offer at once?',
        a: 'Yes, batch generation is built for exactly this kind of volume testing.',
      },
    ],
    ctaHeading: 'Have the next ad already made.',
    ctaSub: 'Winning ads decay. Your next variation should already be queued.',
  },
  {
    slug: 'win-with-volume',
    documentTitle: 'Win With Creative Volume | AdRender',
    metaDescription:
      'Targeting is automated now. Creative variety is the lever left. AdRender generates the variation volume modern ad platforms actually reward.',
    headline: 'Targeting is automated now. Creative variety is the lever left.',
    subhead: 'Only 6-7 of every 100 ads actually win. AdRender generates the volume it takes to find them.',
    stats: ['10-20+ active creatives, made easy', 'Weekly refresh, achievable', 'Batch generation'],
    founderHeading: 'The problem was never knowing you needed more ads.',
    founderParagraphs: [
      'The algorithm shifted — creative variety now outperforms targeting precision. Most teams know this.',
      'The problem was never knowing they needed more variations, it was producing them fast enough.',
      'AdRender closes that gap.',
    ],
    featuresHeading: 'The volume modern platforms actually reward.',
    featuresSub: 'Full creative sets, weekly refresh, no bigger team required.',
    features: [
      {
        heading: 'Full creative sets in one batch',
        body: 'Ship a complete test set in one pass instead of trickling out one ad at a time and waiting on the next brief.',
        icon: Layers,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Weekly refresh, actually achievable',
        body: 'The cadence platforms reward stops being aspirational when generation takes minutes, not a production cycle.',
        icon: RefreshCw,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: '90% net-new, same headcount',
        body: 'Match a modern creative-refresh mix — mostly new creative, not slight recrops — without hiring a bigger team.',
        icon: BarChart3,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Static and video from the same flow',
        body: 'Both formats in the same batch, so volume is not limited to whichever pipeline your team can staff this week.',
        icon: Video,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'Batch size, Advantage+ volume, and multi-account use.',
    faq: [
      {
        q: 'How many variations can I generate at once?',
        a: 'Batches scale with your tier, from a handful up to hundreds at once on higher plans.',
      },
      {
        q: 'Does this work for Advantage+ style campaigns?',
        a: 'Yes, generating 15+ active ads per account is exactly the volume this is built for.',
      },
      {
        q: 'Can I generate for multiple accounts or clients?',
        a: 'Yes, multiple brand profiles are supported depending on your plan.',
      },
    ],
    ctaHeading: 'Find the 6-7 that win.',
    ctaSub: 'Generate the volume it takes. Weekly. Without a bigger team.',
  },
  {
    slug: 'course-creators',
    documentTitle: 'AI Ad Generator for Course Creators | AdRender',
    metaDescription:
      'Fresh ads for every course launch, without an agency budget. AdRender generates on-brand static and video ads for your info-product funnel.',
    headline: "Your funnel needs fresh ads constantly. Your budget doesn't need an agency.",
    subhead: 'Generate on-brand ads for every launch and relaunch, without hiring a designer.',
    stats: ['Testimonial-style video, no shoot', 'Fresh ads per launch', 'Solo-creator friendly pricing'],
    founderHeading: 'Course creators run funnels, not creative departments.',
    founderParagraphs: [
      'Course creators run funnels, not creative departments.',
      "Every launch and relaunch needs new ad creative, and most solo creators don't have production capacity to match.",
      'AdRender gives a one-person operation the creative volume usually reserved for a team.',
    ],
    featuresHeading: 'Fresh ads for every launch. No agency required.',
    featuresSub: 'Hook tests, testimonial-style video, and relaunch batches — priced for a solo creator.',
    features: [
      {
        heading: 'Test hook variations first',
        body: 'Generate multiple angles before you spend on ads, so the funnel launches on a tested hook, not a guess.',
        icon: FlaskConical,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Testimonial-style video, no shoot',
        body: 'Video ads generated from proven templates — no filming, no talent booking, no studio day.',
        icon: Video,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Fresh batches every relaunch',
        body: "New creative for every launch cycle so the funnel doesn't keep running last quarter's ads.",
        icon: RefreshCw,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: "Built for a solo creator's budget",
        body: 'Workflow and pricing that fit a one-person operation — not a retainer built for a team.',
        icon: CircleDollarSign,
        accent: 'text-[#96F07A]',
      },
    ],
    faqIntro: 'Testimonial video, design skills, and ads per offer.',
    faq: [
      {
        q: 'Can this generate testimonial-style ads?',
        a: 'Yes, video generation can produce testimonial-style creative from proven templates.',
      },
      {
        q: 'Do I need design experience to use this for my course?',
        a: 'No, pick a template and your brand applies automatically.',
      },
      {
        q: 'Can I generate different ads for different course modules or offers?',
        a: "Yes, generate variations matched to whatever you're promoting.",
      },
    ],
    ctaHeading: 'Fresh ads for every launch.',
    ctaSub: 'On-brand static and video — no designer, no agency retainer.',
  },
  {
    slug: 'beauty-skincare-ads',
    documentTitle: 'AI Ad Generator for Beauty & Skincare Brands | AdRender',
    metaDescription:
      'Beauty CPMs run 30-40% above average. AdRender generates on-brand static and video ads from real, currently-running beauty and skincare templates.',
    headline: 'The most competitive vertical on Meta needs the most creative volume.',
    subhead: 'Generate ads from real, currently-running beauty templates — not generic AI output.',
    stats: ['UGC-style video, no shoot', 'Full catalog sync via Shopify', 'Fresh variants to beat fatigue'],
    founderHeading: 'Highest CPMs. Fastest fatigue. Generic AI makes it worse.',
    founderParagraphs: [
      'Beauty and skincare is the most ad-saturated, highest-CPM category on Meta — creative fatigue hits fast, and generic AI output stands out for the wrong reasons.',
      "AdRender's templates are sourced from real, currently-running beauty ads, so what you start from is already proven in your exact category.",
    ],
    featuresHeading: 'Proven beauty templates. Your whole catalog. Fast refresh.',
    featuresSub: 'Shopify sync, UGC-style video, and variants that do not look generic.',
    features: [
      {
        heading: 'Full catalog sync via Shopify',
        body: 'Connect the store once and generate ads across your entire beauty line — products, images, and variants stay current automatically.',
        icon: Store,
        accent: 'text-[#96F07A]',
      },
      {
        heading: 'UGC-style video, no shoot',
        body: 'Testimonial-style video from proven beauty templates — no filming, no creator booking, no wait.',
        icon: Video,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Refresh fatigued creative in minutes',
        body: 'When performance starts to dip, generate a new batch instead of waiting on the next production cycle.',
        icon: RefreshCw,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Audience-matched, not one-size-fits-all',
        body: 'Creative from real beauty ads already running in-category — not generic layouts stretched to fit skincare.',
        icon: Users,
        accent: 'text-[#B894F0]',
      },
    ],
    faqIntro: 'Template source, Shopify sync, and launch-ready video.',
    faq: [
      {
        q: 'Are these templates actually from beauty/skincare ads?',
        a: 'Yes, sourced from real ads currently running in the beauty and skincare category.',
      },
      {
        q: 'Does this sync with my Shopify beauty store?',
        a: 'Yes, full catalog sync — products, images, and variants stay current automatically.',
      },
      {
        q: 'Can I generate video ads for product launches?',
        a: 'Yes, static and video from the same flow, ready when a new SKU launches.',
      },
    ],
    ctaHeading: 'Beat beauty fatigue with real templates.',
    ctaSub: 'On-brand static and video from ads already running in your category.',
  },
  {
    slug: 'app-game-marketers',
    documentTitle: 'AI Ad Generator for App & Game Marketers | AdRender',
    metaDescription:
      'Top gaming advertisers ship 2,400+ creative variations a quarter. AdRender generates the volume app and game marketing actually requires.',
    headline: 'Top gaming advertisers ship 2,400+ ad variations a quarter. Can your team keep up?',
    subhead: 'Generate the creative volume app-install and UA campaigns actually require.',
    stats: ['Batch generation at UA scale', 'Static + video for installs', 'Fast refresh cycles'],
    founderHeading: 'Install creative burns out fastest. Volume is the job.',
    founderParagraphs: [
      'App and game marketing has the highest structural need for creative volume of any category — install-driving creative burns out fast, and top advertisers are already producing thousands of variations per quarter.',
      "AdRender's batch generation is built to match that pace without scaling a creative team.",
    ],
    featuresHeading: 'UA-scale volume. Without a UA-scale team.',
    featuresSub: 'Batches sized for install campaigns. Static and video. Fast refresh.',
    features: [
      {
        heading: 'Batches sized for every network',
        body: "Generate ad batches sized and formatted for whatever network you're running install campaigns on.",
        icon: Maximize2,
        accent: 'text-[#5B9FFF]',
      },
      {
        heading: 'Static and video app ads',
        body: 'Both formats from the same flow — install-driving static and video without a second pipeline.',
        icon: Video,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Refresh install creative fast',
        body: 'When performance starts to fade, generate the next set in minutes instead of waiting on a production cycle.',
        icon: RefreshCw,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Built for UA testing volume',
        body: 'The volume app-install and game marketing actually require — not a handful of polished ads per quarter.',
        icon: Gamepad2,
        accent: 'text-[#B894F0]',
      },
    ],
    faqIntro: 'Install-style creative, batch size, and app vs. game coverage.',
    faq: [
      {
        q: 'Can this generate app-store or install-style creative?',
        a: 'Yes, templates cover app and UA-focused formats alongside general ad structures.',
      },
      {
        q: 'How many variations can I generate for a single campaign?',
        a: 'Batches scale with your tier, built for high-volume testing.',
      },
      {
        q: 'Does this cover both app and game marketing use cases?',
        a: 'Yes, templates span both categories.',
      },
    ],
    ctaHeading: 'Match the volume UA actually requires.',
    ctaSub: 'Batch generation for app-install and game marketing — static and video.',
  },
  {
    slug: 'works-with-your-agency',
    documentTitle: 'Works Alongside Your Freelancer or Agency | AdRender',
    metaDescription:
      'Already work with a freelancer or agency? AdRender fills the gaps, speeds up testing, and helps you brief the people you hire — not replace them.',
    headline: "You don't have to choose between your agency and AI.",
    subhead: 'Test cheap variations yourself, brief better, fill the gaps between engagements.',
    stats: ['Test before you commission', 'Brief with real concepts', "Fill gaps, don't wait"],
    founderHeading: 'This fills the gap. It does not replace the people you hired.',
    founderParagraphs: [
      "Hiring a freelancer or agency and using AI aren't in competition — the real problem is the gap between needing ten more ideas this week and your team's actual turnaround time.",
      "AdRender exists to fill that gap, not replace the people you've already hired.",
    ],
    featuresHeading: 'Test, brief, and fill gaps — alongside your team.',
    featuresSub: 'Volume here. Strategy and polish with the people you already work with.',
    features: [
      {
        heading: 'Test before you commission',
        body: 'Run cheap variations yourself first, so billable time goes to what already tested well — not a first-guess brief.',
        icon: FlaskConical,
        accent: 'text-[#B894F0]',
      },
      {
        heading: 'Brief with real concepts',
        body: 'Pull visual options from proven ads and show your designer a direction, not a paragraph describing one.',
        icon: Images,
        accent: 'text-[#00E5FF]',
      },
      {
        heading: 'Fill urgent gaps',
        body: "Generate what your retainer doesn't cover this week, instead of waiting on the next available slot.",
        icon: Timer,
        accent: 'text-[#FF8F5C]',
      },
      {
        heading: 'Keep your team for strategy and polish',
        body: 'Use AdRender for volume. Keep the people you hired for the work that actually needs them.',
        icon: Handshake,
        accent: 'text-[#5B9FFF]',
      },
    ],
    faqIntro: 'Replacement, briefing, and urgent requests your retainer does not cover.',
    faq: [
      {
        q: 'Is this meant to replace my agency or freelancer?',
        a: "No, it's built to fill gaps and speed up testing alongside whoever you already work with.",
      },
      {
        q: 'Can I use this to brief my designer more clearly?',
        a: 'Yes, generate visual concepts to show direction instead of describing it in words.',
      },
      {
        q: "What if my agency's retainer doesn't cover an urgent request?",
        a: 'Generate what you need directly instead of waiting on their next available slot.',
      },
    ],
    ctaHeading: 'Keep your agency. Fill the gaps.',
    ctaSub: 'Test cheap, brief better, ship the urgent work without waiting.',
  },
]

export function getLandingPageBySlug(slug: string) {
  return landingPages.find((p) => p.slug === slug)
}
