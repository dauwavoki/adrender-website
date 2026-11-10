import { Check } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { Still } from './parts/Still'
import { BRAND, RENDER_COST, TEMPLATE_CARDS, type SceneSize } from './sceneData'

export function EasyScene({ size }: { size: SceneSize }) {
  const swatches = BRAND.swatches.slice(0, 4)
  const template = TEMPLATE_CARDS[0]

  return (
    <SceneFrame size={size} label="Three steps: add your brand, choose a template, and render">
      <ScenePanel className="easy">
        <div className="easy-line" />
        <div className="easy-step" data-step="1">
          <div className="easy-num">1</div>
          <div className="easy-body">
            <strong>Add your brand</strong>
            <div className="easy-brand">
              <div className="logo-tile">
                <img src={BRAND.logoSrc} alt="" width={1024} height={1022} loading="lazy" decoding="async" />
              </div>
              <div>
                <div className="brand-name">{BRAND.name}</div>
                <div className="swatches">
                  {swatches.map((color) => (
                    <span key={color} className="swatch" style={{ background: color }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="easy-step" data-step="2">
          <div className="easy-num">2</div>
          <div className="easy-body">
            <strong>Choose a template</strong>
            {template ? (
              <div className="easy-thumb">
                <Still src={template.src} width={template.width} height={template.height} />
                <span className="easy-check">
                  <Check size={14} weight="bold" />
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="easy-step" data-step="3">
          <div className="easy-num">3</div>
          <div className="easy-body">
            <strong>Render</strong>
            <div className="easy-action">
              <div className="easy-render">
                <div className="scene-btn">Render</div>
                <div className="scene-cost">{RENDER_COST}</div>
              </div>
              <div className="easy-ready">
                <div className="easy-ready-badge">
                  <Check size={16} weight="bold" />
                  Ready
                </div>
                <div className="scene-cost">{RENDER_COST}</div>
              </div>
            </div>
          </div>
        </div>
      </ScenePanel>
    </SceneFrame>
  )
}
