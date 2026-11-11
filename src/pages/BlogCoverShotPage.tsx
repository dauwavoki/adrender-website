import { useLayoutEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SceneByName } from '../components/scenes'
import { coverSceneChoices, resolveSceneId } from '../components/scenes/sceneNames'

/**
 * Dev-only stage for `npm run blog:cover`. Renders one feature scene at the
 * Open Graph size. Not linked, not prerendered, and absent from production routes.
 */
export function BlogCoverShotPage() {
  const [params] = useSearchParams()
  const scene = params.get('scene')?.trim() ?? ''
  const sceneId = resolveSceneId(scene)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.add('light', 'blog-cover-shot-page')
    root.classList.remove('dark')
    return () => {
      root.classList.remove('blog-cover-shot-page')
    }
  }, [])

  if (!sceneId) {
    return (
      <p data-cover-error>
        Unknown coverScene &quot;{scene || '(missing)'}&quot;. Expected one of: {coverSceneChoices().join(', ')}
      </p>
    )
  }

  return (
    <div className="blog-cover-shot" data-cover-ready="true">
      <div className="blog-cover-shot-scene blog-feature-scene">
        <SceneByName name={scene} size="wide" />
      </div>
    </div>
  )
}
