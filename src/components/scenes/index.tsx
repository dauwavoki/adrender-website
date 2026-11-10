import type { ComponentType } from 'react'
import { BatchScene } from './BatchScene'
import { BrandScene } from './BrandScene'
import { EasyScene } from './EasyScene'
import { LibraryScene } from './LibraryScene'
import { PlaygroundScene } from './PlaygroundScene'
import { SizesScene } from './SizesScene'
import { TemplatesScene } from './TemplatesScene'
import { WorkspacesScene } from './WorkspacesScene'
import type { SceneSize } from './sceneData'

const SCENES: Record<string, ComponentType<{ size: SceneSize }>> = {
  templates: TemplatesScene,
  'easy-to-use': EasyScene,
  brands: BrandScene,
  generation: BatchScene,
  sizes: SizesScene,
  library: LibraryScene,
  playground: PlaygroundScene,
  workspaces: WorkspacesScene,
}

export function SceneForAnchor({ anchor, size }: { anchor: string; size: SceneSize }) {
  const Scene = SCENES[anchor]
  if (!Scene) return null
  return <Scene size={size} />
}
