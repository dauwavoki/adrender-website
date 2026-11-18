import type { Story } from './engine/story'
import { INTRO_DESKTOP, INTRO_PHONE } from './stories/intro'

/**
 * The tutorials collection. The first entry is always the intro.
 * To add a tutorial: build its two stories (wide + phone), add an entry here with
 * `stories` filled in. Entries without `stories` show as "Coming soon".
 */
export type Tutorial = {
  id: string
  title: string
  summary: string
  tags: string[]
  /** Both views of the same walkthrough. Missing = coming soon. */
  stories?: { desktop: Story; phone: Story }
  learn: string[]
  steps: string[]
}

export const TUTORIALS: Tutorial[] = [
  {
    id: 'intro',
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
    id: 'brand-from-website',
    title: 'Create a brand from your website, fast',
    summary: 'The setup that makes every ad on-brand: scan, check, fix, save.',
    tags: ['brand', 'setup', 'website scan', 'colors', 'audience'],
    learn: ['What the scan fills in and what to double-check.', 'How to edit colors, voice, audience and products.'],
    steps: ['Scan your website.', 'Check the profile.', 'Edit anything that looks off.', 'Add more products.'],
  },
  {
    id: 'brands-and-campaigns',
    title: 'Brands vs campaigns: one product per campaign',
    summary: 'Keep tests tidy: a brand for the company, a campaign for each product or set.',
    tags: ['campaigns', 'brand', 'testing', 'products'],
    learn: ['When to make a brand and when to make a campaign.', 'How to test one product per set.'],
    steps: ['Create a brand.', 'Create a campaign from a product.', 'Render a set per campaign.', 'Compare results.'],
  },
  {
    id: 'search-and-filters',
    title: 'Find winning templates: search and filters',
    summary: 'Search by niche, add more words, use related words and filters to narrow thousands of ads.',
    tags: ['search', 'filters', 'templates', 'related words', 'niche'],
    learn: ['How to search and narrow templates.', 'How related words widen a search.'],
    steps: ['Search a niche.', 'Add more words.', 'Use related words.', 'Filter and add to the cockpit.'],
  },
  {
    id: 'cockpit',
    title: 'The cockpit: templates, brand, skill, render',
    summary: 'Everything you need to render, in one place, for image and video.',
    tags: ['cockpit', 'render', 'skills', 'sizes', 'video', 'image'],
    learn: ['Add and remove templates.', 'Pick a brand and skill.', 'Choose sizes and render.'],
    steps: ['Add templates.', 'Choose a brand.', 'Choose a skill.', 'Pick sizes.', 'Render.'],
  },
  {
    id: 'skills',
    title: 'How to use skills',
    summary: 'Skills decide what AdRender does with a template. Pick one and render.',
    tags: ['skills', 'clone', 'templates'],
    learn: ['What each skill does.', 'Which skill to use when.'],
    steps: ['Open the skills list.', 'Pick a skill.', 'Render and compare.'],
  },
  {
    id: 'refine-one-template',
    title: 'Keep refining one ad until it is perfect',
    summary: 'Use the Ad button to rework the same ad again and again, and save good ads as templates.',
    tags: ['ad button', 'refine', 'reuse', 'templates'],
    learn: ['How to rework a finished ad.', 'How to save your own ads as templates.'],
    steps: ['Open a finished ad.', 'Use the Ad button.', 'Change and render again.', 'Save it as a template.'],
  },
  {
    id: 'characters',
    title: 'Campaigns with your own characters (image and video)',
    summary: 'Upload your characters and AdRender uses them every time, in images and in UGC-style video.',
    tags: ['characters', 'UGC', 'campaigns', 'video', 'image'],
    learn: ['How to upload a character.', 'How to keep the same character across a campaign.'],
    steps: ['Upload a character.', 'Add it to a campaign.', 'Render image and video.', 'Review the set.'],
  },
  {
    id: 'ad-copies',
    title: 'Automated ad copies',
    summary: 'Start from your ad copies and let AdRender write more in the same voice.',
    tags: ['ad copy', 'docs', 'brand voice'],
    learn: ['Where ad copies live.', 'How AdRender creates more from the ones you have.'],
    steps: ['Open a product.', 'Add or review ad copies.', 'Generate more.', 'Use them in renders.'],
  },
  {
    id: 'library',
    title: 'My Ads Library and folders',
    summary: 'Find, group, download and reuse every ad you have made.',
    tags: ['library', 'folders', 'download', 'ads'],
    learn: ['How folders work.', 'How to open, download and reuse ads.'],
    steps: ['Open My Ads Library.', 'Make a folder.', 'Move ads in.', 'Download.'],
  },
  {
    id: 'affiliate',
    title: 'Affiliate program: get approved and earn 50%',
    summary: 'How to apply, get approved fast, and start earning commission.',
    tags: ['affiliate', 'commission', 'earn', 'make money'],
    learn: ['What the program pays.', 'What helps you get approved quickly.'],
    steps: ['Apply.', 'Share your link.', 'Track earnings.'],
  },
]

export function searchTutorials(query: string): Tutorial[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return TUTORIALS
  return TUTORIALS.filter((t, index) => {
    if (index === 0) return true // the intro is always first
    const hay = `${t.title} ${t.summary} ${t.tags.join(' ')}`.toLowerCase()
    return words.every((w) => hay.includes(w))
  })
}
