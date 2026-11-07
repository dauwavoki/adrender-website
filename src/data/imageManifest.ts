export type PlaceholderId =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'

export type ImageManifestEntry = {
  id: PlaceholderId
  label: string
  where: string
  width: number
  height: number
  aspect: string
}

/** Source of truth for landing image slots — files live in /public/placeholders/img-XX.png. */
export const IMAGE_MANIFEST: ImageManifestEntry[] = [
  { id: '01', label: 'Hero: Templates tab', where: 'Homepage §2 Interactive App Preview', width: 1440, height: 900, aspect: '16:10' },
  { id: '02', label: 'Hero: Saved Templates tab', where: 'Homepage §2 Interactive App Preview', width: 1440, height: 900, aspect: '16:10' },
  { id: '03', label: 'Hero: My Ads Library tab', where: 'Homepage §2 Interactive App Preview', width: 1440, height: 900, aspect: '16:10' },
  { id: '04', label: 'Hero: Ad Playground tab', where: 'Homepage §2 Interactive App Preview', width: 1440, height: 900, aspect: '16:10' },
  { id: '05', label: 'Hero: Brands tab', where: 'Homepage §2 Interactive App Preview', width: 1440, height: 900, aspect: '16:10' },
  { id: '06', label: 'Founder story', where: 'Homepage §4 + /about intro', width: 960, height: 720, aspect: '4:3' },
  { id: '07', label: 'Feature card: Templates', where: 'Homepage §5 Feature Cards', width: 800, height: 560, aspect: '10:7' },
  { id: '08', label: 'Feature card: Template library', where: 'Homepage §5 Feature Cards', width: 800, height: 560, aspect: '10:7' },
  { id: '09', label: 'Feature card: Brands', where: 'Homepage §5 Feature Cards', width: 800, height: 560, aspect: '10:7' },
  { id: '10', label: 'Feature card: Batch generation', where: 'Homepage §5 Feature Cards', width: 800, height: 560, aspect: '10:7' },
  { id: '11', label: 'Feature card: Ad Playground', where: 'Homepage §5 Feature Cards', width: 800, height: 560, aspect: '10:7' },
  { id: '12', label: 'Feature card: Sizes', where: 'Homepage §5 Feature Cards', width: 800, height: 560, aspect: '10:7' },
  { id: '13', label: 'Feature card: Shopify sync', where: 'Homepage §5 Feature Cards', width: 800, height: 560, aspect: '10:7' },
  { id: '14', label: 'Feature card: Workspaces', where: 'Homepage §5 Feature Cards', width: 800, height: 560, aspect: '10:7' },
  { id: '15', label: 'About: Templates expanded', where: '/about#templates', width: 1280, height: 800, aspect: '8:5' },
  { id: '16', label: 'About: Library expanded', where: '/about#library', width: 1280, height: 800, aspect: '8:5' },
  { id: '17', label: 'About: Brands expanded', where: '/about#brands', width: 1280, height: 800, aspect: '8:5' },
  { id: '18', label: 'About: Generation expanded', where: '/about#generation', width: 1280, height: 800, aspect: '8:5' },
  { id: '19', label: 'About: Playground expanded', where: '/about#playground', width: 1280, height: 800, aspect: '8:5' },
  { id: '20', label: 'About: Sizes expanded', where: '/about#sizes', width: 1280, height: 800, aspect: '8:5' },
  { id: '21', label: 'About: Shopify expanded', where: '/about#shopify', width: 1280, height: 800, aspect: '8:5' },
  { id: '22', label: 'About: Workspaces expanded', where: '/about#workspaces', width: 1280, height: 800, aspect: '8:5' },
]

export function placeholderSrc(id: PlaceholderId): string {
  return `/placeholders/img-${id}.png`
}

export function getManifestEntry(id: PlaceholderId): ImageManifestEntry {
  const entry = IMAGE_MANIFEST.find((e) => e.id === id)
  if (!entry) throw new Error(`Unknown placeholder id: ${id}`)
  return entry
}

/** Redesign slots. `src` set means a real file replaces the labeled placeholder. */
export type SiteImageEntry = {
  id: string
  label: string
  where: string
  width: number
  height: number
  aspect: string
  /** Public path to save the real file, e.g. `/site/f1-proven-templates.webp`. */
  filename: string
  src?: string
  themeNote?: string
}

export const SITE_IMAGES: SiteImageEntry[] = [
  {
    id: 'H1',
    label: 'Hero app preview',
    where: 'Homepage hero poster',
    width: 2560,
    height: 1600,
    aspect: '16:10',
    filename: '/site/h1-hero-app-preview.webp',
    themeNote: 'Optional -light / -dark if the frame should not follow the live preview',
  },
  { id: 'F1', label: 'Feature: proven templates', where: 'Homepage features', width: 1200, height: 1500, aspect: '4:5', filename: '/site/f1-proven-templates.webp' },
  { id: 'F2', label: 'Feature: easy to use', where: 'Homepage features', width: 1200, height: 1500, aspect: '4:5', filename: '/site/f2-easy-to-use.webp' },
  { id: 'F3', label: 'Feature: brand intelligence', where: 'Homepage features', width: 1200, height: 1500, aspect: '4:5', filename: '/site/f3-brand-intelligence.webp' },
  { id: 'F4', label: 'Feature: batch rendering', where: 'Homepage features', width: 1200, height: 1500, aspect: '4:5', filename: '/site/f4-batch-rendering.webp' },
  { id: 'F5', label: 'Feature: every size', where: 'Homepage features', width: 1200, height: 1500, aspect: '4:5', filename: '/site/f5-every-size.webp' },
  { id: 'F6', label: 'Feature: template library', where: 'Homepage features', width: 1200, height: 1500, aspect: '4:5', filename: '/site/f6-template-library.webp' },
  { id: 'F7', label: 'Feature: ad playground', where: 'Homepage features', width: 1200, height: 1500, aspect: '4:5', filename: '/site/f7-ad-playground.webp' },
  { id: 'F8', label: 'Feature: team workspaces', where: 'Homepage features', width: 1200, height: 1500, aspect: '4:5', filename: '/site/f8-team-workspaces.webp' },
  { id: 'A1', label: 'About: founder', where: '/about#founder-story', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a1-founder.webp' },
  { id: 'A2', label: 'About: templates', where: '/about#templates', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a2-templates.webp' },
  { id: 'A3', label: 'About: easy to use', where: '/about#easy-to-use', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a3-easy-to-use.webp' },
  { id: 'A4', label: 'About: brands', where: '/about#brands', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a4-brands.webp' },
  { id: 'A5', label: 'About: generation', where: '/about#generation', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a5-generation.webp' },
  { id: 'A6', label: 'About: sizes', where: '/about#sizes', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a6-sizes.webp' },
  { id: 'A7', label: 'About: library', where: '/about#library', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a7-library.webp' },
  { id: 'A8', label: 'About: playground', where: '/about#playground', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a8-playground.webp' },
  { id: 'A9', label: 'About: workspaces', where: '/about#workspaces', width: 1600, height: 1200, aspect: '4:3', filename: '/site/a9-workspaces.webp' },
  { id: 'C1', label: 'Contact side image', where: '/contact', width: 1200, height: 1500, aspect: '4:5', filename: '/site/c1-contact.webp', themeNote: 'Optional' },
  { id: 'OG', label: 'Social share image', where: 'Open Graph', width: 1200, height: 630, aspect: '1.91:1', filename: '/site/og-share.webp' },
]

const siteImageById = new Map(SITE_IMAGES.map((entry) => [entry.id, entry]))

export function getSiteImage(id: string): SiteImageEntry {
  const entry = siteImageById.get(id)
  if (!entry) throw new Error(`Unknown site image id: ${id}`)
  return entry
}

/** Register a solution or blog placeholder the first time a page needs one. */
export function ensureSiteImage(entry: SiteImageEntry): SiteImageEntry {
  const existing = siteImageById.get(entry.id)
  if (existing) return existing
  SITE_IMAGES.push(entry)
  siteImageById.set(entry.id, entry)
  return entry
}
