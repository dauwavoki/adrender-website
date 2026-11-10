import { SceneFrame, ScenePanel } from './SceneFrame'
import { IconTile } from './parts/IconTile'
import { Still } from './parts/Still'
import { BRAND, BRAND_SOURCES, type SceneSize } from './sceneData'
import { useHoldStep, useScenePhase } from './useSceneMotion'

export function BrandScene({ size }: { size: SceneSize }) {
  return (
    <SceneFrame size={size} label="YourBrand profile with colors, voice, and four products">
      <BrandBody size={size} />
    </SceneFrame>
  )
}

function BrandBody({ size }: { size: SceneSize }) {
  const phase = useScenePhase()
  const swatches = BRAND.swatches
  const products = BRAND.products
  const steps = swatches.length + products.length + 1
  const step = useHoldStep(phase, steps, 520)
  const scanning = phase !== 'off' && step > 0 && step < steps - 1

  return (
      <ScenePanel className="brand">
        <div
          className="brand-scan"
          style={{
            opacity: scanning ? 1 : 0,
            top: `${Math.min(96, (step / Math.max(1, steps - 1)) * 100)}%`,
            transition: 'top 420ms ease-out, opacity 420ms ease-out',
          }}
        />
        {size === 'wide' ? (
          <div className="brand-sources">
            {BRAND_SOURCES.map(({ label, detail, icon: Icon, tone }) => (
              <div key={label} className="brand-source">
                <IconTile tone={tone}>
                  <Icon size={18} />
                </IconTile>
                <span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
              </div>
            ))}
          </div>
        ) : null}
        <div className="brand-top">
          <div className="brand-head">
            <div className="logo-tile">
              <img src={BRAND.logoSrc} alt="" width={1024} height={1022} loading="lazy" decoding="async" />
            </div>
            <div>
              <div className="brand-name">{BRAND.name}</div>
              <div className="brand-cat">{BRAND.category}</div>
            </div>
          </div>
        </div>
        <div className="brand-block">
          <div className="brand-kicker">Brand colors</div>
          <div className="swatches">
            {swatches.map((color, index) => (
              <span
                key={color}
                className="swatch scene-reveal"
                style={{
                  background: color,
                  opacity: step > index ? 1 : 0,
                  transform: step > index ? 'none' : 'translateY(6px)',
                }}
              />
            ))}
          </div>
        </div>
        <div className="brand-block">
          <div className="brand-kicker">Brand voice</div>
          <p className="brand-voice">{BRAND.brandVoice}</p>
        </div>
        <div className="brand-block">
          <div className="brand-kicker">{`Products found · ${products.length} items`}</div>
          <div className="brand-products">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="brand-product scene-reveal"
                style={{
                  opacity: step > swatches.length + index ? 1 : 0,
                  transform: step > swatches.length + index ? 'none' : 'translateY(6px)',
                }}
              >
                <Still src={product.imageSrc} width={571} height={1024} />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        </div>
      </ScenePanel>
  )
}
