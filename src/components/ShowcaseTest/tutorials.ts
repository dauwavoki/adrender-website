import { withBookends, type Story } from './engine/story'
import { AFFILIATES_CAPTIONS, AFFILIATES_DESKTOP, AFFILIATES_PHONE, WORKSPACES_CAPTIONS, WORKSPACES_DESKTOP, WORKSPACES_PHONE } from './stories/account'
import { SAVED_CAPTIONS, SAVED_DESKTOP, SAVED_PHONE } from './stories/saved'
import { SEARCH_DESKTOP, SEARCH_PHONE } from './stories/search'
import { PROMPTS_DESKTOP, PROMPTS_PHONE } from './stories/prompts'
import { ADSLIB_CAPTIONS, ADSLIB_DESKTOP, ADSLIB_PHONE } from './stories/adslib'
import { SPOT_CAPTIONS, SPOT_TALL, SPOT_WIDE } from './stories/spot'
import { AD_TALL, AD_WIDE, INTRO_DESKTOP, INTRO_PHONE } from './stories/intro'
import { BRANDSITE_DESKTOP, BRANDSITE_PHONE, COCKPIT_DESKTOP, COCKPIT_PHONE, MORE_CAPTIONS, MUSTDO_DESKTOP, MUSTDO_PHONE } from './stories/more'
import { ADCOPIES_DESKTOP, ADCOPIES_PHONE, BRANDS_DESKTOP, BRANDS_PHONE, KIT_CAPTIONS, ONEPRODUCT_DESKTOP, ONEPRODUCT_PHONE } from './stories/kit'

/**
 * The tutorials collection. The first entry is always the intro.
 * To add a tutorial: build its two stories (wide + phone), add `stories`, and it plays.
 * Entries without `stories` show as "Coming soon". `learn` and `steps` are shown only when written.
 */
export type Tutorial = {
  id: string
  category: string
  title: string
  summary: string
  tags: string[]
  /** Both sizes of the same video: `desktop` is wide, `phone` is tall. Missing = coming soon. */
  stories?: { desktop: Story; phone: Story }
  /** Ad-style video: hook, big captions and end card over the app. */
  ad?: boolean
  /** Creative ad drawn from scratch (SpotScene), not the app. */
  spot?: boolean
  /** Step captions shown over the video. */
  captions?: readonly string[]
  learn?: string[]
  steps?: string[]
  /** Opening line under the title (defaults to the summary). */
  opener?: string
  /** Link on the closing card. */
  link?: string
  /** Line on the closing card. */
  closer?: string
  /** Only on the admin test page (/tutorials-test) until it moves to /tutorials. */
  test?: boolean
  /**
   * Coded motion ad drawn on its own canvas page in /public/ads (not the app engine).
   * The page takes ?view=desktop|phone and plays in a frame; it also renders to MP4 frame by frame.
   */
  motion?: { src: string; seconds: number }
}

const LIST: Tutorial[] = [
  {
    id: 'intro',
    category: 'Getting started',
    title: 'Intro: from your website to finished ads',
    summary: 'Add your brand from its website, pick winning templates, render, and open your ads.',
    tags: ['getting started', 'brand', 'templates', 'render', 'library'],
    stories: { desktop: INTRO_DESKTOP, phone: INTRO_PHONE },
    learn: [
      'Add a brand by scanning its website: logo, colors, voice, audience and products fill in for you.',
      'Pick winning image and video templates and choose the brand to render them for.',
      'Find your finished ads in My Ads Library.',
    ],
    steps: [
      'Open Brands & Campaigns, press Add, type your website and press Scan.',
      'Review the profile AdRender builds: colors, voice, audience and products with ready ad copies.',
      'Open Templates and add two image and two video templates to the cockpit.',
      'Choose your brand, choose a skill such as Clone, and press Render.',
      'Open the Ready tab or My Ads Library to see and download your ads.',
    ],
  },
  {
    id: 'bf-3d',
    category: 'Black Friday',
    title: 'Ad: Black Friday, 3D',
    summary: 'Black Friday sale ad: 50% off your first month on every plan, one week only. Real app pieces flying through 3D space with one continuous camera.',
    tags: ['ad', 'black friday', 'sale', 'promo', '3d', 'social'],
    motion: { src: '/ads/bf-3d', seconds: 37 },
    ad: true,
    test: true,
    learn: [
      'Style: made with the saas-animation skill. Every shot turns into the next: logo, offer card, wall of ads, template, your version, results, offer, logo.',
      'Built from the AdRender logo and the YourBrand example ads already on the site.',
      'Captions are on. Ready for music.',
    ],
  },
  {
    id: 'bf-dither-lime',
    category: 'Black Friday',
    title: 'Ad: Black Friday, pixel dither (lime)',
    summary: 'Black Friday sale ad: 50% off your first month on every plan, one week only. Black and lime pixel dithering with a node-graph dashboard and a bento grid.',
    tags: ['ad', 'black friday', 'sale', 'promo', 'dither', 'pixel', 'social'],
    motion: { src: '/ads/bf-dither-lime', seconds: 36 },
    ad: true,
    test: true,
    learn: [
      'Style: ordered (Bayer) pixel dithering in black and lime, with pixel-dissolve transitions between shots.',
      'Influences: a node-graph AI dashboard, a bento stats grid, and procedural nature growth (a phyllotaxis spiral that forms the 50%).',
      'Captions are on. Ready for music.',
    ],
  },
  {
    id: 'bf-dither-orbit',
    category: 'Black Friday',
    title: 'Ad: Black Friday, pixel dither (orbit)',
    summary: 'Black Friday sale ad: 50% off your first month on every plan, one week only. A 3D orbit of ads, a segmented gauge, a flow chart and an AI prompt card over dithered magenta and navy.',
    tags: ['ad', 'black friday', 'sale', 'promo', 'dither', 'pixel', 'orbit', 'social'],
    motion: { src: '/ads/bf-dither-orbit', seconds: 37 },
    ad: true,
    test: true,
    learn: [
      'Style: ordered (Bayer) pixel dithering in navy and magenta with lime accents, opening and closing on warm paper.',
      'Influences: a 3D orbit portfolio hero, a tilted AI platform UI kit (gauge, prompt bar, orb), and full-screen data charts (Sankey).',
      'Captions are on. Ready for music.',
    ],
  },
  {
    id: 'ad-remix',
    category: 'Getting started',
    title: 'Ad: remix winning ads into your brand',
    summary: 'A short ad-style cut of the intro, with a hook, big captions and a closing call to action. Made for social.',
    tags: ['ad', 'promo', 'social', 'tiktok', 'instagram'],
    stories: { desktop: AD_WIDE, phone: AD_TALL },
    ad: true,
  },
  {
    id: 'spot-one-second',
    category: 'Getting started',
    title: 'Ad: you get one second',
    summary: 'A 38-second creative ad about why winning ads matter and how AdRender remixes them into your brand. Captions on, ready for music.',
    tags: ['ad', 'promo', 'creative', 'social', 'tiktok', 'instagram', 'youtube'],
    stories: { desktop: SPOT_WIDE, phone: SPOT_TALL },
    spot: true,
    ad: true,
    captions: SPOT_CAPTIONS,
  },
  {
    id: "must-do-setup",
    category: "Getting started",
    title: "Must-do setup when starting with AdRender",
    summary: "The few things to set up first so every ad comes out right.",
    tags: ["setup", "first", "steps"],
    stories: { desktop: MUSTDO_DESKTOP, phone: MUSTDO_PHONE },
    captions: MORE_CAPTIONS,
    learn: ['Four quick steps make every ad come out on brand.','Your website fills in the brand for you. You only check it.','Audience and negative words are set once and used every time.'],
    steps: ['Add your website to a new brand and press Scan.','Pick your audience.','Add words AdRender must never use.','Pick the brand in the cockpit before you render.'],
  },
  {
    id: "playground",
    category: "Getting started",
    title: "Exploring the Playground",
    summary: "Try ideas freely in the Playground.",
    tags: ["playground", "explore"],
  },
  {
    id: "brand-from-website",
    category: "Brands and campaigns",
    title: "Create a brand from your website, fast",
    summary: "Scan a website and get a full brand profile in seconds.",
    tags: ["brand", "website", "scan", "setup"],
    stories: { desktop: BRANDSITE_DESKTOP, phone: BRANDSITE_PHONE },
    captions: MORE_CAPTIONS,
    learn: ['One website address gives you a full brand profile.','Products are found too, with ad copy written for each.','Nothing is saved until you review it.'],
    steps: ['Open Brands & Campaigns and add a brand.','Type your website and press Scan.','Check the name, logo, voice and colors.','Edit anything you want to change. Changes save automatically.'],
  },
  {
    id: "brands-and-campaigns",
    category: "Brands and campaigns",
    title: "Brands and campaigns: how it works",
    summary: "Filter and search your list, then set voice, audience, colors, keywords and negative words on one page.",
    tags: ["brands", "campaigns", "targets", "negative", "words", "target", "marketing", "audience", "voice", "keywords", "colors"],
    stories: { desktop: BRANDS_DESKTOP, phone: BRANDS_PHONE },
    captions: KIT_CAPTIONS,
    learn: [
      'A brand is your whole business. A campaign is one product, offer or season.',
      'Voice, target audience, colors and keywords guide every ad you render.',
      'Negative words keep language you never use out of your ad copy, and the safety check flags any slip.',
    ],
    steps: [
      'Open Brands & Campaigns. Use All, Brands or Campaigns and the search box to find one.',
      'Open a brand and choose Brand info or Campaign info.',
      'Check the voice, pick your target audience and review the colors.',
      'Add keywords to find matching templates faster.',
      'Add negative words, then open Ad copy to see any flagged line.',
    ],
  },

  {
    id: "campaign-per-product",
    category: "Brands and campaigns",
    title: "One product per campaign",
    summary: "Give each product its own campaign, with its own ad copy, so you can see which product wins.",
    tags: ["campaigns", "products", "testing", "sets", "import", "one product"],
    stories: { desktop: ONEPRODUCT_DESKTOP, phone: ONEPRODUCT_PHONE },
    captions: KIT_CAPTIONS,
    learn: [
      'A campaign built around one product keeps its voice and ad copy focused on that product.',
      'Import a product from its page link: pick the images and the name comes with it.',
      'Make one campaign per product, render from each, and compare which product wins.',
    ],
    steps: [
      'Open Brands & Campaigns and press Add brand or campaign.',
      'Choose Campaign info and name the campaign after the product.',
      'Under Products, press Import from URL, paste the product page link and press Fetch images.',
      'Pick the images and press Import.',
      'Open Ad copy to read what was written for that one product. Repeat for each product.',
    ],
  },

  {
    id: "ad-copies",
    category: "Brands and campaigns",
    title: "Automated ad copies",
    summary: "Scan your website or connect Shopify and AdRender writes ad copy for every product. Upload a document for even more.",
    tags: ["ad", "copy", "docs", "voice", "shopify", "website", "scan", "documents", "hooks", "headlines"],
    stories: { desktop: ADCOPIES_DESKTOP, phone: ADCOPIES_PHONE },
    captions: KIT_CAPTIONS,
    learn: [
      'Scan your website or connect your Shopify store and every product gets ad copy written for it.',
      'Each line is a hook, headline, CTA or subject line with a performance score and a safety check.',
      'Upload a brand guide or product sheet and AdRender adds lines from it, keeping the ones you already have.',
    ],
    steps: [
      'Open Brands & Campaigns, add a brand or open one, and find Brand or campaign setup.',
      'Type your website and press Scan, or type your store address and press Connect Shopify Store.',
      'Open Ad copy on any product to read the hooks, headlines, CTAs and subject lines.',
      'Drop a PDF, DOCX or TXT into Documents and press Scan documents.',
      'Pick the brand in the cockpit. The copy is used for you, with no prompt to write.',
    ],
  },

  {
    id: "search-and-filters",
    category: "Templates and creating ads",
    title: "Find winning templates: search and filters",
    summary: "Sort, search with filter and add words, reuse recent searches, filter by niche and run time, and open a brand's ads.",
    tags: ["search", "filters", "templates", "niche", "run time", "brands", "sort"],
    stories: { desktop: SEARCH_DESKTOP, phone: SEARCH_PHONE },
    captions: [],
  },
  {
    id: "cockpit",
    category: "Templates and creating ads",
    title: "The cockpit: templates, brand, skill, render",
    summary: "Add templates, pick a brand and product, use a skill, improve your prompt, set sizes and variations, render, and see when ads are ready.",
    tags: ["cockpit", "render", "templates", "brand", "product", "skill", "settings", "variations", "prompt"],
    stories: { desktop: COCKPIT_DESKTOP, phone: COCKPIT_PHONE },
    captions: MORE_CAPTIONS,
    learn: ['The cockpit is the bar at the bottom of every page.','Picking a brand adds its colors, logo, ad copy and audience for you. The product you pick yourself.','While ads render, the My Ads Library tab, the folded bar and the icons at the top right all show it.'],
    steps: ['Open the cockpit and choose image or video.','Press Use on the templates you like.','Pick your brand, then your product.','Add a note if you want, and press Improve prompt to expand it.','Choose sizes and variations in Settings, then press Render.'],
  },
  {
    id: "refine-one-ad",
    category: "Templates and creating ads",
    title: "Keep refining one ad until it is perfect",
    summary: "Use the Ad button to rework the same ad, and save your ads as templates.",
    tags: ["ad", "button", "refine", "reuse", "templates"],
  },
  {
    id: "characters",
    category: "Templates and creating ads",
    title: "Campaigns with your own characters",
    summary: "Image and video campaigns that keep your characters, including UGC.",
    tags: ["characters", "ugc", "video", "image", "campaigns"],
  },
  {
    id: "prompts",
    category: "Templates and creating ads",
    title: "When to use prompts (and when not to)",
    summary: "Most ads need no prompt. Here is when a short note helps, how Improve prompt and Reset work, and where your past prompts live.",
    tags: ["prompts", "prompting", "improve prompt", "notes", "history"],
    stories: { desktop: PROMPTS_DESKTOP, phone: PROMPTS_PHONE },
    captions: [],
  },
  {
    id: "saved-templates",
    category: "Templates and creating ads",
    title: "Saved Templates",
    summary: "Collections, search, sizes, labels, stars, the details panel and the selection bar, then send templates to the cockpit.",
    tags: ["saved templates", "collections", "search", "labels", "star", "download", "move", "use"],
    stories: { desktop: SAVED_DESKTOP, phone: SAVED_PHONE },
    captions: SAVED_CAPTIONS,
  },
  {
    id: "library",
    category: "Templates and creating ads",
    title: "My Ads Library and folders",
    summary: "Approve new ads, check failed renders, group ads into collections, see how each ad was made, and reuse it.",
    tags: ["library", "folders", "collections", "saved templates", "download"],
    stories: { desktop: ADSLIB_DESKTOP, phone: ADSLIB_PHONE },
    captions: ADSLIB_CAPTIONS,
  },
  {
    id: "skills",
    category: "Skills",
    title: "How to use skills",
    summary: "What skills are and how to pick one.",
    tags: ["skills", "overview"],
  },
  {
    id: "carousel-gallery",
    category: "Skills",
    title: "Carousel Gallery skill",
    summary: "Make carousel and gallery ads with the Carousel Gallery skill.",
    tags: ["carousel", "gallery", "skill"],
  },
  {
    id: "workspaces-tokens-teams",
    category: "Account",
    title: "Workspaces, tokens and Teams",
    summary: "Create a workspace, top up tokens, invite your team and set a token cap.",
    tags: ["workspaces", "tokens", "teams", "invite", "top up"],
    stories: { desktop: WORKSPACES_DESKTOP, phone: WORKSPACES_PHONE },
    captions: WORKSPACES_CAPTIONS,
  },
  {
    id: "affiliates",
    category: "Make money with AdRender",
    title: "Affiliates: make money with AdRender",
    summary: "Apply to the affiliate program, connect payouts, then share your code and track what you earn.",
    tags: ["affiliate", "commission", "earn", "money"],
    stories: { desktop: AFFILIATES_DESKTOP, phone: AFFILIATES_PHONE },
    captions: AFFILIATES_CAPTIONS,
    link: "adrender.app/affiliates",
    closer: "Read the details and apply on the affiliates page.",
  },
  {
    id: "start-an-agency",
    category: "Make money with AdRender",
    title: "Start an ad agency for free",
    summary: "Build an agency portfolio in minutes and take on clients.",
    tags: ["ad", "agency", "portfolio", "start", "free"],
  },
  {
    id: "marketing-agencies",
    category: "Make money with AdRender",
    title: "Marketing agencies: use AdRender alongside your agency",
    summary: "Add AdRender to the way your agency already works.",
    tags: ["marketing", "agency", "alongside"],
  },
  {
    id: "freelancers",
    category: "Make money with AdRender",
    title: "Freelancers: take on more clients",
    summary: "Deliver more ads to more clients with AdRender.",
    tags: ["freelancers", "clients"],
  },
  {
    id: "ugc-creators",
    category: "Make money with AdRender",
    title: "UGC creators: scale brand deals",
    summary: "Scale brand deals with on-brand UGC.",
    tags: ["ugc", "creators", "brand", "deals"],
  },
  {
    id: "affiliate-marketers",
    category: "For your business",
    title: "Affiliate marketers: fast ad testing",
    summary: "Test many ads fast.",
    tags: ["affiliate", "marketers", "testing"],
  },
  {
    id: "media-buyers",
    category: "For your business",
    title: "Media buyers: why creative volume beats targeting",
    summary: "More creatives beat tighter targeting.",
    tags: ["media", "buyers", "creative", "volume", "targeting"],
  },
  {
    id: "app-game-marketers",
    category: "For your business",
    title: "App and game marketers",
    summary: "Ads for apps and games.",
    tags: ["app", "game", "marketers"],
  },
  {
    id: "beauty-skincare",
    category: "For your business",
    title: "Beauty and skincare brands",
    summary: "Ads for beauty and skincare.",
    tags: ["beauty", "skincare"],
  },
  {
    id: "course-creators",
    category: "For your business",
    title: "Course creators: launch ads",
    summary: "Launch ads for your course.",
    tags: ["course", "creators", "launch"],
  },
  {
    id: "funnel-ads",
    category: "For your business",
    title: "Funnel ads: storytelling",
    summary: "Tell a story from cold to warm to hot audiences.",
    tags: ["funnel", "ads", "storytelling"],
  },
  {
    id: "tips-and-tricks",
    category: "Compilations",
    title: "Tips and Tricks",
    summary: "Short clips of the best tricks.",
    tags: ["tips", "tricks"],
  },
  {
    id: "mistakes",
    category: "Compilations",
    title: "Mistakes you are making in AdRender",
    summary: "Common mistakes and how to avoid them.",
    tags: ["mistakes"],
  },
  {
    id: "full-course",
    category: "Compilations",
    title: "The full AdRender course",
    summary: "Every tutorial in order.",
    tags: ["course", "full"],
  },
]

/** Every walkthrough opens with what it covers and closes with thanks, the logo and a link. Ads have their own. */
export const TUTORIALS: Tutorial[] = LIST.map((t) =>
  t.stories && !t.ad ? { ...t, stories: { desktop: withBookends(t.stories.desktop), phone: withBookends(t.stories.phone) } } : t,
)

/** On /tutorials. */
export const LIVE_TUTORIALS = TUTORIALS.filter((t) => !t.test)
/** On the admin test page only: new or reworked tutorials not moved to /tutorials yet. */
export const TEST_TUTORIALS = TUTORIALS.filter((t) => t.test)

export function searchTutorials(query: string, list: Tutorial[] = LIVE_TUTORIALS): Tutorial[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return list
  return list.filter((t, index) => {
    if (index === 0) return true // the intro is always first
    const hay = `${t.title} ${t.summary} ${t.category} ${t.tags.join(' ')}`.toLowerCase()
    return words.every((w) => hay.includes(w))
  })
}
