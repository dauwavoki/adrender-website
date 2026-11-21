import type { SceneState } from './engine/story'
import { cx } from '../site/cx'

/** Ad hook, logo bar and end card, drawn over the app for the ad-style videos. */
export function AdOverlay({ state }: { state: SceneState }) {
  return (
    <>
      <div className="sc-ad-brandbar">
        <img src="/brand/icons/icon-color.svg" alt="" />
        <span>AdRender</span>
      </div>
      <div className={cx('sc-ad-hook', state.ad === 'hook' && 'is-on')}>
        <p className="sc-ad-hook-title">Remix winning ads into your brand.</p>
        <p className="sc-ad-hook-sub">Here&apos;s how it works.</p>
      </div>
      <div className={cx('sc-ad-cta', state.ad === 'cta' && 'is-on')}>
        <img src="/brand/icons/icon-color.svg" alt="" className="sc-ad-cta-logo" />
        <p className="sc-ad-cta-title">Hundreds of ads in under 10 minutes.</p>
        <p className="sc-ad-cta-sub">Remix 100M+ real image and video ads into your brand.</p>
        <span className="sc-ad-cta-button">Start free at adrender.app</span>
      </div>
    </>
  )
}
