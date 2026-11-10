import { SceneFrame, ScenePanel } from './SceneFrame'
import { ReadyRing } from './parts/ReadyRing'
import { RenderingDots } from './parts/RenderingDots'
import { Still } from './parts/Still'
import { AD_STILLS, BATCH_READY, BATCH_TOTAL, type SceneSize } from './sceneData'
import { useHoldStep, useScenePhase } from './useSceneMotion'

export function BatchScene({ size }: { size: SceneSize }) {
  return (
    <SceneFrame size={size} label="Ad library with renders finishing and a ready count">
      <BatchBody size={size} />
    </SceneFrame>
  )
}

function BatchBody({ size }: { size: SceneSize }) {
  const phase = useScenePhase()
  const tiles = size === 'wide' ? AD_STILLS : AD_STILLS.slice(0, 9)
  const beats = tiles.length + 2
  const step = useHoldStep(phase, beats, 400)
  const revealed = Math.min(step, tiles.length)
  const ready = BATCH_READY - tiles.length + revealed
  const rendering = BATCH_TOTAL - ready
  const done = step >= tiles.length

  return (
    <ScenePanel className="batch">
      <div className="batch-head">
        <div className="scene-segment">
          <span>
            <b>Library</b>
            <em>{BATCH_TOTAL}</em>
          </span>
          <ReadyRing on={done} className={done ? 'is-on' : undefined}>
            <b>Ready</b>
            <em className="is-success">{ready}</em>
          </ReadyRing>
          <span className={!done ? 'is-on' : undefined}>
            <b>Rendering</b>
            <em>{rendering}</em>
          </span>
          <span>
            <b>Failed</b>
            <em>0</em>
          </span>
        </div>
        <div className="batch-count">
          <b>{ready}</b>
          {` / ${BATCH_TOTAL} ready`}
        </div>
      </div>
      <div className="batch-grid">
        {tiles.map((tile, index) => {
          const show = index < revealed
          return (
            <div className="batch-tile" key={tile.src}>
              <div className={show ? 'batch-skel is-hidden' : 'batch-skel'}>
                <RenderingDots />
              </div>
              <Still className={show ? undefined : 'is-hidden'} src={tile.src} width={tile.width} height={tile.height} />
            </div>
          )
        })}
      </div>
    </ScenePanel>
  )
}
