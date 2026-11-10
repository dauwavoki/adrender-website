import { CaretDown } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { RenderingDots } from './parts/RenderingDots'
import { Segmented } from './parts/Segmented'
import { Still } from './parts/Still'
import { BRAND, QUALITY, RENDER_COST, RESOLUTIONS, RESULT_STILLS, formatTokens, type SceneSize } from './sceneData'
import { useHoldStep, useScenePhase } from './useSceneMotion'

const BEATS = 9
const PROMPT_PLACEHOLDER = 'Optional. Your brand and template already set the direction.'

export function PlaygroundScene({ size }: { size: SceneSize }) {
  return (
    <SceneFrame size={size} label="Ad playground with an optional prompt and YourBrand results">
      <PlayBody size={size} />
    </SceneFrame>
  )
}

function PlayBody({ size }: { size: SceneSize }) {
  const phase = useScenePhase()
  const step = useHoldStep(phase, BEATS, 800)
  const pressed = step === 1
  const rates = RESOLUTIONS.map((row) => ({
    value: row.id,
    label: row.id,
    sub: formatTokens(row.standard),
  }))
  const refs = BRAND.products.slice(0, 2)
  const results = size === 'wide' ? RESULT_STILLS : RESULT_STILLS.slice(0, 1)

  return (
    <div className="play">
      <ScenePanel className="play-work">
        <div className="scene-field">
          <span className="scene-label">Brand or campaign</span>
          <div className="scene-select">
            <span>{BRAND.name}</span>
            <CaretDown size={16} />
          </div>
        </div>
        <div className="scene-field">
          <span className="scene-label">Reference images</span>
          <div className="ref-row">
            {refs.map((product) => (
              <Still key={product.id} src={product.imageSrc} width={571} height={1024} />
            ))}
          </div>
        </div>
        <div className="scene-field play-prompt-field">
          <span className="scene-label">Prompt (optional)</span>
          <div className="play-prompt is-empty">{PROMPT_PLACEHOLDER}</div>
        </div>
        <div className="scene-field">
          <span className="scene-label">Model</span>
          <Segmented options={[QUALITY.standard, QUALITY.pro]} selected={QUALITY.standard} />
        </div>
        <div className="scene-field">
          <span className="scene-label">Resolution</span>
          <Segmented options={rates} selected="1K" tall />
        </div>
        <div className="play-bar">
          <div className="scene-field">
            <span className="scene-label">Save to</span>
            <div className="scene-select">
              <span>Summer drop</span>
              <CaretDown size={16} />
            </div>
          </div>
          <div className="play-go">
            <div className="scene-cost">{RENDER_COST}</div>
            <div className={pressed ? 'scene-btn is-down' : 'scene-btn'}>Render</div>
          </div>
        </div>
        {size === 'card' ? <Result still={results[0]} ready={isReady(step, 0)} className="play-card-result" /> : null}
      </ScenePanel>
      {size === 'wide' ? (
        <ScenePanel className="play-results">
          {results.map((still, index) => (
            <Result key={still.src} still={still} ready={isReady(step, index)} />
          ))}
        </ScenePanel>
      ) : null}
    </div>
  )
}

/** Press, then dots, then each YourBrand result. The last step keeps every result finished. */
function isReady(step: number, index: number) {
  return step < 2 || step >= 4 + index
}

function Result({
  still,
  ready,
  className,
}: {
  still: (typeof RESULT_STILLS)[number] | undefined
  ready: boolean
  className?: string
}) {
  if (!still) return null
  return (
    <div className={className ? `result-tile ${className}` : 'result-tile'}>
      <div className={ready ? 'batch-skel is-hidden' : 'batch-skel'}>
        <RenderingDots />
      </div>
      <Still className={ready ? undefined : 'is-hidden'} src={still.src} width={still.width} height={still.height} />
    </div>
  )
}
