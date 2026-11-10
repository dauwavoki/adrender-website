import { CaretDown } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { RenderingDots } from './parts/RenderingDots'
import { Segmented } from './parts/Segmented'
import { Still } from './parts/Still'
import {
  BRAND,
  PLAYGROUND_PROMPT,
  QUALITY,
  RENDER_COST,
  RESOLUTIONS,
  RESULT_STILLS,
  formatTokens,
  type SceneSize,
} from './sceneData'
import { useHoldStep, useScenePhase } from './useSceneMotion'

const BEATS = 6

export function PlaygroundScene({ size }: { size: SceneSize }) {
  return (
    <SceneFrame size={size} label="Ad playground with a prompt, quality, and render button">
      <PlayBody size={size} />
    </SceneFrame>
  )
}

function PlayBody({ size }: { size: SceneSize }) {
  const phase = useScenePhase()
  const step = useHoldStep(phase, BEATS, 1000)
  const shown = step >= 3 ? PLAYGROUND_PROMPT.length : Math.ceil((PLAYGROUND_PROMPT.length * (step + 1)) / 4)
  const typed = PLAYGROUND_PROMPT.slice(0, shown)
  const pressed = step === 3
  const ready = step >= BEATS - 1
  const rates = RESOLUTIONS.map((row) => ({
    value: row.id,
    label: row.id,
    sub: formatTokens(row.standard),
  }))
  const refs = BRAND.products.slice(0, 2)

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
          <span className="scene-label">Prompt</span>
          <div className="play-prompt">
            <div className="sizer">{PLAYGROUND_PROMPT}</div>
            <div className="typed">{typed}</div>
          </div>
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
        {size === 'card' ? <Result still={RESULT_STILLS[0]} ready={ready} className="play-card-result" /> : null}
      </ScenePanel>
      {size === 'wide' ? (
        <ScenePanel className="play-results">
          {RESULT_STILLS.map((still, index) => (
            <Result key={still.src} still={still} ready={index === 0 ? ready : true} />
          ))}
        </ScenePanel>
      ) : null}
    </div>
  )
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
