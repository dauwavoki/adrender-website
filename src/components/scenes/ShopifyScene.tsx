import { Storefront } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { Still } from './parts/Still'
import { BRAND, type SceneSize } from './sceneData'
import { useHoldStep, useScenePhase } from './useSceneMotion'

export function ShopifyScene({ size }: { size: SceneSize }) {
  return (
    <SceneFrame size={size} label="YourBrand Shopify store connected, with four products synced">
      <ShopifyBody />
    </SceneFrame>
  )
}

function ShopifyBody() {
  const phase = useScenePhase()
  const products = BRAND.products
  const step = useHoldStep(phase, products.length + 2, 700)
  const connected = step >= 1
  const shown = Math.max(0, Math.min(products.length, step - 1))

  return (
    <ScenePanel className="shopify">
      <div className="shop-top">
        <div className="brand-kicker">Brands & Campaigns</div>
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
      <div className="shop-card">
        <div className="brand-kicker">Connect Shopify store</div>
        <div className="scene-search">
          <Storefront size={18} />
          <span>yourbrand.myshopify.com</span>
        </div>
        <div className="shop-action">
          <div className={connected ? 'scene-btn is-hidden' : step === 0 ? 'scene-btn is-down' : 'scene-btn'}>Connect</div>
          <span className={connected ? 'scene-badge is-success' : 'scene-badge is-success is-hidden'}>
            <Storefront size={14} />
            Connected
          </span>
        </div>
      </div>
      <div className="brand-block shop-products">
        <div className="brand-kicker">{`Products synced · ${shown}`}</div>
        <div className="brand-products">
          {products.map((product, index) => {
            const on = index < shown
            return (
              <div
                key={product.id}
                className="brand-product scene-reveal"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? 'none' : 'translateY(6px)',
                }}
              >
                <Still src={product.imageSrc} width={571} height={1024} />
                <span>{product.name}</span>
              </div>
            )
          })}
        </div>
      </div>
      <p className="shop-note">Available on every plan, including Free.</p>
    </ScenePanel>
  )
}
