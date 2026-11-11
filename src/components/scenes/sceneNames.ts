/** Section ids used by the feature cards and the about page. */
export const SCENE_IDS = [
  'templates',
  'easy-to-use',
  'brands',
  'generation',
  'sizes',
  'library',
  'shopify',
  'playground',
  'workspaces',
] as const

export type SceneId = (typeof SCENE_IDS)[number]

/**
 * Component names accepted in blog frontmatter `coverScene`.
 * Each maps to the scene already drawn on the features and about pages.
 */
export const SCENE_COMPONENT_NAMES: Record<string, SceneId> = {
  TemplatesScene: 'templates',
  EasyScene: 'easy-to-use',
  BrandScene: 'brands',
  BatchScene: 'generation',
  SizesScene: 'sizes',
  LibraryScene: 'library',
  ShopifyScene: 'shopify',
  PlaygroundScene: 'playground',
  WorkspacesScene: 'workspaces',
}

export function resolveSceneId(name: string | undefined | null): SceneId | undefined {
  if (!name) return undefined
  const trimmed = name.trim()
  if ((SCENE_IDS as readonly string[]).includes(trimmed)) return trimmed as SceneId
  return SCENE_COMPONENT_NAMES[trimmed]
}

export function coverSceneChoices(): string[] {
  return [...Object.keys(SCENE_COMPONENT_NAMES), ...SCENE_IDS]
}
