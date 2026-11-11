import type { ComponentType } from 'react'
import { BatchScene } from './BatchScene'
import { BrandScene } from './BrandScene'
import { EasyScene } from './EasyScene'
import { LibraryScene } from './LibraryScene'
import { PlaygroundScene } from './PlaygroundScene'
import { ShopifyScene } from './ShopifyScene'
import { SizesScene } from './SizesScene'
import { TemplatesScene } from './TemplatesScene'
import { WorkspacesScene } from './WorkspacesScene'
import type { SceneSize } from './sceneData'
import { SCENE_IDS, resolveSceneId } from './sceneNames'

const SCENES: Record<string, ComponentType<{ size: SceneSize }>> = {
  templates: TemplatesScene,
  'easy-to-use': EasyScene,
  brands: BrandScene,
  generation: BatchScene,
  sizes: SizesScene,
  library: LibraryScene,
  shopify: ShopifyScene,
  playground: PlaygroundScene,
  workspaces: WorkspacesScene,
}

for (const id of SCENE_IDS) {
  if (!SCENES[id]) throw new Error(`Missing scene component for ${id}`)
}
for (const id of Object.keys(SCENES)) {
  if (!(SCENE_IDS as readonly string[]).includes(id)) throw new Error(`Scene ${id} is missing from SCENE_IDS`)
}

export function SceneForAnchor({ anchor, size }: { anchor: string; size: SceneSize }) {
  const Scene = SCENES[anchor]
  if (!Scene) return null
  return <Scene size={size} />
}

/** `name` is a scene component (`ShopifyScene`) or its section id (`shopify`). */
export function SceneByName({ name, size }: { name: string; size: SceneSize }) {
  const id = resolveSceneId(name)
  if (!id) return null
  return <SceneForAnchor anchor={id} size={size} />
}
