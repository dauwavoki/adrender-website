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

/** Source of truth for placeholder slots — replace SVGs in /public/placeholders/ with final assets. */
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
  return `/placeholders/img-${id}.svg`
}

export function getManifestEntry(id: PlaceholderId): ImageManifestEntry {
  const entry = IMAGE_MANIFEST.find((e) => e.id === id)
  if (!entry) throw new Error(`Unknown placeholder id: ${id}`)
  return entry
}
