import type { Story } from './engine/story'
import { AFFILIATES_CAPTIONS, AFFILIATES_DESKTOP, AFFILIATES_PHONE, WORKSPACES_CAPTIONS, WORKSPACES_DESKTOP, WORKSPACES_PHONE } from './stories/account'
import { SPOT_CAPTIONS, SPOT_TALL, SPOT_WIDE } from './stories/spot'
import { AD_TALL, AD_WIDE, INTRO_DESKTOP, INTRO_PHONE } from './stories/intro'

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
}

export const TUTORIALS: Tutorial[] = [
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
    summary: 'A 29-second creative ad about why winning ads matter and how AdRender remixes them into your brand. Captions on, ready for music.',
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
  },
  {
    id: "brands-and-campaigns",
    category: "Brands and campaigns",
    title: "Brands and campaigns: how it works",
    summary: "Every feature in Brands & Campaigns, including targets and negative words.",
    tags: ["brands", "campaigns", "targets", "negative", "words", "target", "marketing", "audience"],
  },
  {
    id: "campaign-per-product",
    category: "Brands and campaigns",
    title: "One product per campaign",
    summary: "Test each product as its own campaign, one set per product.",
    tags: ["campaigns", "products", "testing", "sets"],
  },
  {
    id: "ad-copies",
    category: "Brands and campaigns",
    title: "Automated ad copies",
    summary: "AdRender takes your ad copies and creates more.",
    tags: ["ad", "copy", "docs", "voice"],
  },
  {
    id: "search-and-filters",
    category: "Templates and creating ads",
    title: "Find winning templates: search and filters",
    summary: "Search, add more words, use related words, and filter.",
    tags: ["search", "filters", "templates", "related", "words", "niche"],
  },
  {
    id: "cockpit",
    category: "Templates and creating ads",
    title: "The cockpit: templates, brand, skill, render",
    summary: "Add templates, choose a brand and skill, and render image and video.",
    tags: ["cockpit", "render", "templates", "brand", "skill"],
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
    summary: "Most ads need no prompt. Here is when one helps.",
    tags: ["prompts", "prompting"],
  },
  {
    id: "library",
    category: "Templates and creating ads",
    title: "My Ads Library and folders",
    summary: "Group your ads into collections, save an ad as a template, and use saved templates and past ads in the cockpit.",
    tags: ["library", "folders", "collections", "saved templates", "download"],
    // Being redone against the new selection bar; shows "Coming soon" until then.
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

export function searchTutorials(query: string): Tutorial[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return TUTORIALS
  return TUTORIALS.filter((t, index) => {
    if (index === 0) return true // the intro is always first
    const hay = `${t.title} ${t.summary} ${t.category} ${t.tags.join(' ')}`.toLowerCase()
    return words.every((w) => hay.includes(w))
  })
}
