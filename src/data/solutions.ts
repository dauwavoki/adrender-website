import {
  Briefcase,
  CameraOff,
  CircleDollarSign,
  Clock,
  CreditCard,
  FlaskConical,
  Globe,
  Image as ImageIcon,
  Images,
  KeyboardOff,
  Layers,
  LayoutTemplate,
  MousePointerClick,
  Package,
  Paintbrush,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  User,
  Users,
  Video,
  Wand2,
  type LucideIcon,
} from 'lucide-react'

export type SolutionStep = {
  icon: LucideIcon
  title: string
  body: string
}

export type SolutionConfig = {
  slug: string
  navLabel: string
  indexBlurb: string
  documentTitle: string
  metaDescription: string
  headline: string
  subheadline: string
  problem: string
  solution: string
  steps: SolutionStep[]
  proof: string
}

export const solutions: SolutionConfig[] = [
  {
    slug: 'creative-fatigue',
    navLabel: 'Creative Fatigue',
    indexBlurb: 'Refresh before CPA climbs — fresh, on-brand variants in minutes.',
    documentTitle: 'Beat Creative Fatigue — Fresh Ad Variants in Minutes | AdRender',
    metaDescription:
      'Stop watching CPA climb because your ad ran too long. Generate fresh, on-brand variants in minutes and refresh before fatigue costs you.',
    headline: "Your best ad is dying. You just haven't noticed the CPA yet.",
    subheadline: 'Refresh before fatigue costs you, not after.',
    problem:
      "Every ad has a shelf life. The audience that once stopped scrolling for it has seen it a dozen times now, and the algorithm knows it before you do — CPA creeps up, CTR drifts down, and by the time it's obvious in your dashboard, you've already burned budget on a tired creative. The fix isn't a mystery: refresh the creative. The problem is *speed*. Briefing a designer, waiting on a freelancer, or rebuilding from scratch takes days you don't have while spend keeps flowing to a fading ad.",
    solution:
      "Your brand is already set up — colors, voice, product catalog, all pulled in once. When a creative starts fading, you don't start from zero: browse the template library for a fresh structure, generate a new batch in minutes, and get variants back into rotation before the dip turns into a real CPA problem. Static or video, generated from templates sourced from ads that are actually converting right now — not the same tired layout reskinned.",
    steps: [
      {
        icon: Paintbrush,
        title: 'Brand is already in',
        body: 'Colors, voice, and product catalog are pulled in once. Refreshing creative does not mean rebuilding your brand from scratch.',
      },
      {
        icon: LayoutTemplate,
        title: 'Pick a fresh structure',
        body: 'Browse templates sourced from ads that are actually converting right now — not the same tired layout reskinned.',
      },
      {
        icon: RefreshCw,
        title: 'Generate and rotate',
        body: 'A new batch in minutes, static or video, back into rotation before the dip turns into a real CPA problem.',
      },
    ],
    proof:
      'The bottleneck was never knowing you needed a new creative. It was the time between noticing and having one ready. AdRender collapses that gap from days to minutes, so refreshing creative becomes a habit you can actually keep up with instead of a fire drill you dread.',
  },
  {
    slug: 'too-many-tools',
    navLabel: 'Too Many Tools',
    indexBlurb: 'One flow. One subscription. Stop stitching five tools to make one ad.',
    documentTitle: 'One Tool Instead of Five — Stop the Subscription Stack | AdRender',
    metaDescription:
      'Stop stitching together five subscriptions to make one ad. AdRender replaces the research tool, the design tool, and the copywriting tool with one flow.',
    headline: 'You have six tabs open just to make one ad.',
    subheadline: 'One flow instead. One subscription instead of five.',
    problem:
      'A "simple" ad usually isn\'t. Find a reference in one tool. Generate a visual in another. Write copy in a third. Resize for every platform by hand. Track brand consistency across freelancers or a rotating cast of AI tools that don\'t talk to each other. Each tool in the stack is fine on its own — the stitching between them is where the hours actually go, and where the monthly subscription total quietly adds up to more than any single tool\'s price tag suggested.',
    solution:
      "Set your brand up once — from a URL, brand documents, or Shopify sync. From there, browsing templates, generating the creative, and getting sized, on-brand output happens in one flow, not five. You're not exporting from one tool and importing to the next. One login, one subscription, one place your brand voice actually lives.",
    steps: [
      {
        icon: Paintbrush,
        title: 'Set up once',
        body: 'Brand from a URL, documents, or Shopify sync. Colors, voice, and catalog live in one place.',
      },
      {
        icon: Layers,
        title: 'Create in one flow',
        body: 'Browse templates and generate the creative without exporting from one tool and importing to the next.',
      },
      {
        icon: Sparkles,
        title: 'Sized and on-brand',
        body: 'Output ready for every platform. One login, one subscription, one place your brand voice actually lives.',
      },
    ],
    proof:
      "The tools you're replacing each do their one job well. AdRender isn't claiming to out-design a design tool or out-write a copywriter — it's removing the handoffs between them, which is where the real time cost was hiding the whole time.",
  },
  {
    slug: 'no-design-skills',
    navLabel: 'No Design Skills',
    indexBlurb: 'Never opened Photoshop? Pick a working ad structure — no blank canvas.',
    documentTitle: 'Make Ads Without Design Skills | AdRender',
    metaDescription:
      'Never opened Photoshop? AdRender generates on-brand ads automatically — no drag-and-drop, no design degree, no learning curve.',
    headline: "I've never opened Photoshop. Can I still make a real ad?",
    subheadline: 'Yes. No drag-and-drop, no design degree required.',
    problem:
      'Most "easy" design tools still hand you a blank canvas and expect you to know what good looks like — where the logo goes, what font pairs with what, how much white space is too much. If you\'re not a designer, that blank canvas is the whole problem, not the solution. You end up with something that technically has your product in it and doesn\'t look like anything you\'d actually want to run.',
    solution:
      "There's no blank canvas here. Pick a template that's already a real, working ad structure, and your brand — colors, logo, product, voice — applies to it automatically. You're choosing from what's already good, not building from nothing. No prompt to write, no design theory to know, no manual layout decisions.",
    steps: [
      {
        icon: MousePointerClick,
        title: 'Skip the blank canvas',
        body: "Pick a template that's already a real, working ad structure — not an empty artboard waiting for you to guess.",
      },
      {
        icon: Paintbrush,
        title: 'Brand applies automatically',
        body: 'Colors, logo, product, and voice land on the template. No font pairing, no logo placement, no white-space theory.',
      },
      {
        icon: Sparkles,
        title: 'Choose what already works',
        body: "You're recognizing a good ad, not building one from nothing. No prompt, no design degree, no drag-and-drop.",
      },
    ],
    proof:
      "The skill you were missing wasn't Photoshop. It was knowing what a good ad structure looks like — and that's exactly what the template library already encodes, pulled from ads that are actually running and converting.",
  },
  {
    slug: 'not-ai-slop',
    navLabel: 'Not AI Slop',
    indexBlurb: 'Start from real running ads, not a generic prompt that screams "bot."',
    documentTitle: "Ads That Don't Look Like AI Slop | AdRender",
    metaDescription:
      'Ads that don\'t look AI-generated. AdRender starts from real running ads, not a generic prompt, so your creative doesn\'t scream "made by a bot."',
    headline: 'Your customers can tell when an ad is AI slop. So can you.',
    subheadline: 'Start from real ads. Not a generic prompt.',
    problem:
      '2026\'s AI ad backlash is real: oversaturated colors, that unmistakable "generated" sheen, copy that reads like it was written to satisfy an algorithm instead of a person. Shoppers have gotten good at spotting it, and once they do, trust drops before they\'ve even read what you\'re selling. Most AI ad tools optimize for "technically an ad, generated fast" — not for "doesn\'t look like every other AI ad in the feed."',
    solution:
      "The starting point matters. AdRender doesn't generate from a blank prompt guessing at what an ad \"should\" look like — it starts from a library of over 100 million ads that are actually running and converting right now, real creative structures that already work, then applies your brand to them. The output looks like an ad a human directed, because the structure came from one.",
    steps: [
      {
        icon: LayoutTemplate,
        title: 'Start from real ads',
        body: 'A library of 100M+ ads that are actually running and converting right now — not a blank prompt guessing at "an ad."',
      },
      {
        icon: ShieldCheck,
        title: 'Use proven structures',
        body: 'Real creative structures that already work in the feed, not generic layouts invented to look busy.',
      },
      {
        icon: Paintbrush,
        title: 'Dress it in your brand',
        body: 'Your brand applies to a human-directed structure. The output reads as intentional because it is.',
      },
    ],
    proof:
      'Generic AI output comes from generic starting points. Real, proven ad structures produce output that reads as intentional — because it is.',
  },
  {
    slug: 'no-prompt-engineering',
    navLabel: 'No Prompt Engineering',
    indexBlurb: 'No prompt box. Pick a template and your brand applies automatically.',
    documentTitle: 'No Prompt Engineering Required | AdRender',
    metaDescription:
      'Stop rewriting prompts hoping for a better result. AdRender skips the prompt box entirely — pick a template, your brand applies automatically.',
    headline: 'Stop rewriting the same prompt for the fifth time.',
    subheadline: 'No prompt box. Pick a template instead.',
    problem:
      "\"Just type what you want\" sounds simple until you're on your tenth attempt trying to describe a layout, a mood, and a product accurately enough that the AI stops getting it wrong. Prompt engineering is a real skill, and most people don't have it, don't want to develop it, and shouldn't have to just to get an ad made.",
    solution:
      "There's nothing to type. Browse real ad templates, pick the structure you want, and your brand — pulled automatically from your URL, documents, or Shopify catalog — applies to it. No prompt to write, no rewording, no guessing what phrase will finally get the AI to understand what you meant.",
    steps: [
      {
        icon: KeyboardOff,
        title: "Browse, don't type",
        body: "There's nothing to prompt. Real ad templates are already there — you're looking, not describing.",
      },
      {
        icon: LayoutTemplate,
        title: 'Pick the structure',
        body: "Choose the layout you want instead of trying to articulate it from scratch on the tenth rewrite.",
      },
      {
        icon: Wand2,
        title: 'Brand fills it in',
        body: 'URL, documents, or Shopify catalog — your brand applies automatically. No rewording, no lucky phrasing.',
      },
    ],
    proof:
      "A prompt box asks you to describe a solution you may not have language for. A template library shows you the solution directly — you're recognizing what you want, not trying to articulate it from scratch.",
  },
  {
    slug: 'no-filming',
    navLabel: 'No Filming',
    indexBlurb: 'Camera-shy? Generate video ads with no camera, talent booking, or shoot.',
    documentTitle: 'Make Video Ads Without Filming Anything | AdRender',
    metaDescription:
      'Camera-shy? AdRender generates video ads without filming anything — no camera, no talent booking, no shoot.',
    headline: "You don't have to be on camera to have a video ad.",
    subheadline: 'No filming. No talent booking. No shoot.',
    problem:
      "Video converts, everyone knows it, and everyone also knows what it takes to get one: booking talent or getting comfortable on camera yourself, finding a decent backdrop, filming multiple takes, editing it down, and doing that again every time the ad gets stale. For a solo founder who'd rather not be the face of the brand — or just doesn't have a studio, a camera operator, or the time — that whole pipeline is a wall before you even get to the ad itself.",
    solution:
      'Video generation is part of the same flow as static ads — no camera required. Your brand and product apply to a video template automatically, and you get finished, on-brand video output without filming a single frame. Same brand setup, same template library, just a different output format.',
    steps: [
      {
        icon: CameraOff,
        title: 'No camera required',
        body: 'Video lives in the same flow as static ads. No talent booking, no backdrop, no shoot.',
      },
      {
        icon: LayoutTemplate,
        title: 'Same templates, video out',
        body: 'Your brand and product apply to a video template automatically — same library, different output format.',
      },
      {
        icon: Video,
        title: 'Finished, on-brand video',
        body: 'You get finished video without filming a single frame. Refresh it the same way you refresh a static ad.',
      },
    ],
    proof:
      "The barrier to video was never the idea, it was the production. Removing the shoot doesn't just save time — it makes video actually achievable for the solo operator who was always going to skip it otherwise.",
  },
  {
    slug: 'replace-an-agency',
    navLabel: 'Replace an Agency',
    indexBlurb: 'Agency-quality creative without the $5K/month retainer or the contract.',
    documentTitle: 'Ad Creative Without the Agency Retainer | AdRender',
    metaDescription:
      'A $5K/month agency retainer buys creative you could generate yourself. AdRender gives you agency-quality output without the retainer.',
    headline: 'The agency quote was $5,000 a month. For ads.',
    subheadline: 'Agency-quality creative, without the retainer.',
    problem:
      "A real ad agency retainer runs anywhere from $2,500 to $10,000+ a month, often with a multi-month contract attached, before you've even tested whether the creative direction works. For a small business or solo marketer, that's not a marketing line item, that's most of the budget — and you're paying for account management and meetings as much as the actual creative output.",
    solution:
      'You get the creative output without the retainer, the contract, or the account manager. Set up your brand once, generate hundreds of on-brand ads from templates proven to work, and pay a flat monthly rate that has nothing to do with your ad spend or how many "campaigns" you\'re running. No multi-month commitment, cancel anytime.',
    steps: [
      {
        icon: Briefcase,
        title: 'Output, not overhead',
        body: 'Creative without the retainer, the contract, or the account manager. No multi-month commitment.',
      },
      {
        icon: LayoutTemplate,
        title: 'Brand once, generate hundreds',
        body: 'On-brand ads from templates proven to work — not a creative direction you wait months to test.',
      },
      {
        icon: CircleDollarSign,
        title: 'Flat monthly rate',
        body: 'Price has nothing to do with ad spend or how many campaigns you run. Cancel anytime.',
      },
    ],
    proof:
      'Most of what an agency retainer covers is process and overhead around getting the creative made. AdRender removes the process — you\'re left with just the output, at a fraction of the cost.',
  },
  {
    slug: 'fast-brand-setup',
    navLabel: 'Fast Brand Setup',
    indexBlurb: 'Onboard a new brand or client in under an hour from a URL, docs, or Shopify.',
    documentTitle: 'Spin Up a New Brand in Under an Hour | AdRender',
    metaDescription:
      'Onboard a new brand or client in under an hour. AdRender pulls colors, voice, and products automatically from a URL, docs, or Shopify sync.',
    headline: 'New client, no time. Brand-ready ads by end of day.',
    subheadline: 'Spin up a brand in under an hour, not a week.',
    problem:
      "Onboarding a new brand — whether it's your own new product line or a fresh client if you're an agency or freelancer — usually means a slow brand-brief back-and-forth before a single ad gets made: gathering assets, getting sign-off on voice and tone, building a brand kit by hand in whatever design tool you use. By the time you're actually producing creative, days have gone by and the client is already asking where the ads are.",
    solution:
      'Drop in a website URL, connect a Shopify store, or upload brand documents directly, and the brand profile builds itself — colors, logo, voice, product catalog, all pulled in automatically. From brand setup to a first batch of ads can happen in the same sitting, not across a week of back-and-forth.',
    steps: [
      {
        icon: Globe,
        title: 'Drop in a source',
        body: 'Website URL, Shopify store, or brand documents. The profile starts building itself from there.',
      },
      {
        icon: Paintbrush,
        title: 'Brand pulls in automatically',
        body: 'Colors, logo, voice, product catalog — no kit built by hand in a design tool.',
      },
      {
        icon: Clock,
        title: 'Ads in the same sitting',
        body: 'First batch the same day, not a week of back-and-forth while a client asks where the ads are.',
      },
    ],
    proof:
      'Speed to first output is often what actually earns trust with a new client or validates a new brand idea fast. AdRender collapses the slowest part of onboarding — building the brand profile — into a single step.',
  },
  {
    slug: 'solo-founder',
    navLabel: 'Solo Founder',
    indexBlurb: 'Built for one-person businesses doing their own marketing — no team required.',
    documentTitle: 'AI Ads Built for Solo Founders | AdRender',
    metaDescription:
      "Built for the 28 million one-person businesses running their own marketing. AdRender does the creative work you don't have time or budget to hire out.",
    headline: "It's just you. Your ad creative shouldn't need a whole team.",
    subheadline: 'Built for one-person businesses doing their own marketing.',
    problem:
      "There are roughly 28 million one-person businesses in the US alone — founders, freelancers, side-hustlers — who are the designer, the marketer, the copywriter, and everything else, all at once. Most marketing tools are quietly built assuming a team: someone to brief, someone to review, someone to hand things off to. When it's just you, every one of those assumptions becomes extra work you have to absorb yourself.",
    solution:
      "No handoffs, because there's no one to hand off to. Set up your brand once, generate ads directly, and skip the parts of the workflow that assume a team exists to manage. It's built for exactly this: one person, running their own ads, without hiring anyone else to make them.",
    steps: [
      {
        icon: User,
        title: 'No handoffs',
        body: "There's no one to brief or review. The flow assumes it's just you — because it is.",
      },
      {
        icon: MousePointerClick,
        title: 'Brand once, generate directly',
        body: 'Skip the parts of the workflow that assume a team exists to manage the process.',
      },
      {
        icon: Sparkles,
        title: 'Run ads without hiring',
        body: 'One person, own ads, without hiring anyone else to make them.',
      },
    ],
    proof:
      "Tools built for teams add coordination overhead that a solo operator doesn't need and shouldn't have to pay for. AdRender's flow assumes it's just you — because for a huge share of small businesses, it is.",
  },
  {
    slug: 'transparent-pricing',
    navLabel: 'Transparent Pricing',
    indexBlurb: 'See the price before you sign up. No sales call, no surprise charge after a trial.',
    documentTitle: 'Transparent AI Ad Pricing — No Surprises | AdRender',
    metaDescription:
      'See the price before you sign up. No sales call, no "contact us," no surprise charge after the trial ends.',
    headline: 'The price should be on the page. Not behind a sales call.',
    subheadline: 'No demo call. No surprise charge after the trial.',
    problem:
      'A frustrating pattern shows up across AI ad tools: pricing that\'s vague until you talk to sales, free trials that convert into an unexpected charge the moment they end, or credit systems complicated enough that the "$19/month" plan turns out to only cover a handful of real outputs once you do the math. You shouldn\'t need a calculator and a skeptical read of the fine print just to know what something costs.',
    solution:
      'The price is on the page. Free tier, paid tiers, what each one includes — all visible before you enter a card number, because the free tier doesn\'t require one. No sales call, no "contact us for pricing," no auto-charge surprise when a trial quietly ends.',
    steps: [
      {
        icon: CircleDollarSign,
        title: 'Price on the page',
        body: 'Free tier, paid tiers, what each includes — visible before you enter a card number.',
      },
      {
        icon: CreditCard,
        title: 'Free without a card',
        body: 'The free tier doesn\'t require a card. No sales call, no "contact us for pricing."',
      },
      {
        icon: ShieldCheck,
        title: 'No surprise charge',
        body: 'No auto-charge when a trial quietly ends. What you see is what you pay.',
      },
    ],
    proof:
      "Pricing clarity isn't a feature, it's just not hiding the ball. You should be able to decide if a tool is worth it from the pricing page alone, before you've committed anything.",
  },
  {
    slug: 'multi-client-agencies',
    navLabel: 'Multi-Client Agencies',
    indexBlurb: 'Unlimited brands on Scale. Separate voices, one login, one subscription.',
    documentTitle: 'AI Ads for Agencies Managing Multiple Clients | AdRender',
    metaDescription:
      "Manage every client's brand and ad creative in one place. AdRender supports unlimited brands on the Scale tier, built for agencies and freelancers.",
    headline: 'Six clients. Six brand voices. One tool.',
    subheadline: "Manage every client's ads without six separate logins.",
    problem:
      "Running creative for multiple clients usually means juggling separate brand kits, separate tool logins, and separate mental context-switches for every single account — client A's tone is playful, client B's is clinical, and mixing them up is an easy, embarrassing mistake. Most tools aren't built with more than one brand in mind, so agencies and freelancers end up stretching a single-brand tool across five or six accounts, or paying for five or six separate subscriptions.",
    solution:
      'Each client gets their own brand profile — colors, voice, product catalog, all set up independently and pulled in automatically per brand. Switch between client accounts without losing context, and generate creative for each one from templates matched to their specific niche. The Scale tier supports unlimited brands and campaigns under one subscription, built for exactly this use case.',
    steps: [
      {
        icon: Users,
        title: 'A profile per client',
        body: 'Colors, voice, and product catalog set up independently and pulled in automatically per brand.',
      },
      {
        icon: RefreshCw,
        title: 'Switch without losing context',
        body: 'Generate for each client from templates matched to their niche — not one voice stretched across six accounts.',
      },
      {
        icon: Layers,
        title: 'Unlimited on Scale',
        body: 'Brands and campaigns under one subscription. Built for agencies and freelancers running multiple clients.',
      },
    ],
    proof:
      "Agencies don't need six tools, they need one tool that respects that six different brands sound and look nothing alike. AdRender keeps that separation clean without multiplying your subscription costs per client.",
  },
  {
    slug: 'photo-to-full-ad',
    navLabel: 'Photo to Full Ad',
    indexBlurb: 'A nice product photo is a start. Get the layout, copy, and CTA too.',
    documentTitle: 'A Finished Ad, Not Just a Nice Product Photo | AdRender',
    metaDescription:
      "A nice product photo isn't a finished ad. AdRender adds the layout, copy, and CTA that photo tools leave for you to build yourself.",
    headline: "A pretty product photo isn't an ad. It's a start.",
    subheadline: 'Get the layout, copy, and CTA too. Not just the photo.',
    problem:
      "Product photography tools solve a real, narrow problem: turning a flat product shot into something that looks professionally lit. But a nice photo sitting alone on a page isn't an ad — you still need a headline, a CTA, sizing for the platform you're running on, and some sense of what layout is actually working right now. A lot of small business owners get a great photo from one of these tools and then hit a wall figuring out what to do with it next.",
    solution:
      'Skip the extra step. AdRender generates the complete ad — product imagery, layout, headline, and CTA — from a single template pulled from real ads that are actually running and converting. You\'re not left holding a nice photo and no ad around it.',
    steps: [
      {
        icon: ImageIcon,
        title: 'Skip the extra step',
        body: "A complete ad, not a nice photo sitting alone. Layout, headline, and CTA come with the image.",
      },
      {
        icon: LayoutTemplate,
        title: 'Start from a working ad',
        body: 'Templates pulled from real ads that are actually running and converting — not a photo with nowhere to go.',
      },
      {
        icon: MousePointerClick,
        title: 'Copy and CTA included',
        body: "You're not left holding a nice photo and no ad around it. The structure is already the finished dish.",
      },
    ],
    proof:
      'A photo is one ingredient. An ad is the finished dish. AdRender starts from the finished structure and fills it with your product, instead of stopping at the photo and leaving you to build the rest.',
  },
  {
    slug: 'full-catalog-scale',
    navLabel: 'Full Catalog Scale',
    indexBlurb: 'Sync your whole Shopify catalog and generate ads across every SKU.',
    documentTitle: 'Generate Ads Across Your Whole Catalog | AdRender',
    metaDescription:
      'Got 500 SKUs? AdRender syncs your entire Shopify catalog and generates ads across every product, not one at a time.',
    headline: '500 products. One ad each would take a month.',
    subheadline: 'Your whole catalog, synced and ready — not one product at a time.',
    problem:
      "A handful of products is manageable to advertise one at a time. A real, growing catalog isn't — 50, 200, 500 SKUs means one-ad-per-product simply doesn't scale by hand, and most tools still assume you're uploading a single image and working through a single workflow per ad, over and over, for every product you carry.",
    solution:
      'Connect your Shopify store once and the full catalog syncs automatically — every product, every image, every variant. Generate ads across your whole product line without re-uploading anything per SKU, and without repeating the same manual steps hundreds of times.',
    steps: [
      {
        icon: ShoppingBag,
        title: 'Connect Shopify once',
        body: 'The full catalog syncs automatically — every product, every image, every variant.',
      },
      {
        icon: Package,
        title: 'No re-upload per SKU',
        body: 'Generate across the whole product line without uploading a single image per product.',
      },
      {
        icon: Layers,
        title: 'Catalog scale, not one-at-a-time',
        body: "Skip repeating the same manual steps hundreds of times. The workflow doesn't assume a handful of SKUs.",
      },
    ],
    proof:
      "The tools weren't built for catalog scale, they were built for one product at a time and just never hit a ceiling for smaller stores. AdRender's Shopify sync exists specifically so a large catalog isn't a wall you run into as you grow.",
  },
  {
    slug: 'test-before-spending',
    navLabel: 'Test Before Spending',
    indexBlurb: 'Produce ten variants for pennies so testing is cheap, not the expensive part.',
    documentTitle: 'Test Ad Angles Before You Commit Real Spend | AdRender',
    metaDescription:
      "Generate enough variants to actually test cheaply. AdRender makes producing 10 versions of an ad cost almost nothing, so testing isn't the expensive part.",
    headline: "Don't guess which angle works. Test ten of them for pennies.",
    subheadline: "Producing variants shouldn't be the expensive part of testing.",
    problem:
      'Real testing means running multiple angles against each other, not just launching your best guess and hoping. But if producing each variant costs real time or money — a freelancer per version, hours of manual design per version — testing becomes the expensive part before you\'ve even spent a dollar on media. Most people end up testing two or three variants instead of ten, because ten was never realistically affordable to produce.',
    solution:
      'Generation is fast and cheap enough that producing ten versions of an ad costs close to nothing. Test the angle you weren\'t sure about, because trying it barely costs anything to find out — the expensive part of testing was never supposed to be making the ad, it was supposed to be running it.',
    steps: [
      {
        icon: FlaskConical,
        title: 'Produce enough to test',
        body: 'Ten versions, not two or three. Real testing means running multiple angles against each other.',
      },
      {
        icon: Sparkles,
        title: 'Variants cost close to nothing',
        body: 'Generation is fast and cheap enough that producing the test is no longer the expensive part.',
      },
      {
        icon: CircleDollarSign,
        title: 'Spend on media, not production',
        body: "The expensive part of testing was never supposed to be making the ad. It was supposed to be running it.",
      },
    ],
    proof:
      'Cheap production means real testing becomes affordable, not aspirational. You find out what works by actually trying more things, not by guessing right on the first attempt because a second attempt was too costly to make.',
  },
  {
    slug: 'tiktok-ad-maker',
    navLabel: 'TikTok Ad Maker',
    indexBlurb: 'TikTok-native static and video, sized correctly from templates that perform there.',
    documentTitle: 'TikTok Ad Maker — Static and Video, Sized Right | AdRender',
    metaDescription:
      'Generate TikTok-ready ads, static and video, sized correctly and built from formats that actually perform on TikTok.',
    headline: "TikTok has its own visual language. Generic ads don't speak it.",
    subheadline: 'Generate TikTok-native ads, static and video, sized correctly.',
    problem:
      "An ad that works on Facebook often falls flat on TikTok — the platform has its own pacing, its own visual style, its own sense of what looks native versus what looks like an obvious outside ad getting skipped past. Resizing a Facebook creative to fit TikTok's dimensions doesn't fix that; the format mismatch runs deeper than aspect ratio.",
    solution:
      'Generate ads specifically sized and structured for TikTok, static or video, from templates pulled from real ads that are actually running and performing on the platform, not repurposed from somewhere else. Your brand applies automatically, sized correctly from the start.',
    steps: [
      {
        icon: Smartphone,
        title: 'Built for TikTok',
        body: "Sized and structured for the platform — not a Facebook creative resized to fit the dimensions.",
      },
      {
        icon: Video,
        title: 'Static or video',
        body: 'Templates pulled from ads that are actually running and performing on TikTok, not repurposed from somewhere else.',
      },
      {
        icon: Paintbrush,
        title: 'Brand, sized from the start',
        body: 'Your brand applies automatically, correctly sized from the first frame — not cropped after the fact.',
      },
    ],
    proof:
      "Platform-native creative performs better because it's built for how people actually scroll and watch on that specific platform, not adapted from a different one after the fact.",
  },
  {
    slug: 'instagram-ad-maker',
    navLabel: 'Instagram Ad Maker',
    indexBlurb: 'Feed, Stories, and Reels — sized correctly from Instagram-proven templates.',
    documentTitle: 'Instagram Ad Maker — Feed, Stories, and Reels | AdRender',
    metaDescription:
      'Generate Instagram-ready ads for feed, Stories, and Reels, sized correctly and built from formats that actually perform.',
    headline: 'Feed, Stories, Reels — three different shapes, one product.',
    subheadline: 'Generate Instagram-native ads sized right for every placement.',
    problem:
      'Instagram alone has multiple ad placements with different dimensions and different visual expectations — a feed post, a Story, a Reel each want something a little different, and manually resizing and re-cropping one creative into all three formats eats time and often produces a worse version in at least one of them.',
    solution:
      'Generate ads sized correctly for feed, Stories, and Reels from the same brand setup, pulled from templates proven to work on Instagram specifically. No manual cropping or resizing per placement — the format is handled as part of generation.',
    steps: [
      {
        icon: Images,
        title: 'Every placement',
        body: 'Feed, Stories, and Reels from the same brand setup — three shapes, one product.',
      },
      {
        icon: LayoutTemplate,
        title: 'Instagram-proven templates',
        body: 'Pulled from formats that actually perform on Instagram, not a feed post squeezed into a Story.',
      },
      {
        icon: MousePointerClick,
        title: 'No manual cropping',
        body: 'Format is handled as part of generation. No re-cropping per placement after the fact.',
      },
    ],
    proof:
      "Getting the size right isn't just a technical requirement, it's part of what makes an ad feel native to where it's showing up instead of obviously squeezed into a shape it wasn't built for.",
  },
]

export function getSolutionBySlug(slug: string): SolutionConfig | undefined {
  return solutions.find((s) => s.slug === slug)
}

export function solutionPath(slug: string): string {
  return `/solutions/${slug}`
}
