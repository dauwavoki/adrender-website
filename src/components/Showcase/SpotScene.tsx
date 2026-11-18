import type { SceneState } from './engine/story'
import { cx } from '../site/cx'

/** A creative ad, drawn in code. Five short scenes, driven by `state.spot`. */
const AD = (n: number) => `/showcase/ad-${String(n).padStart(2, '0')}.webp`
const COLUMNS = [
  [1, 5, 9, 3, 7, 11],
  [6, 2, 10, 4, 12, 8],
  [3, 8, 1, 11, 5, 9],
  [12, 4, 7, 2, 6, 10],
  [9, 1, 6, 12, 3, 8],
  [5, 11, 2, 7, 10, 4],
]

function Feed({ tall }: { tall: boolean }) {
  const cols = tall ? COLUMNS.slice(0, 3) : COLUMNS
  return (
    <div className="sp-feed" aria-hidden>
      {cols.map((col, index) => (
        <div key={index} className={cx('sp-col', index % 2 === 1 && 'is-up')} style={{ animationDuration: `${9 + index * 1.7}s` }}>
          {[...col, ...col].map((n, i) => (
            <img key={i} src={AD(n)} alt="" />
          ))}
        </div>
      ))}
    </div>
  )
}

function Scene({ state, tall }: { state: SceneState; tall: boolean }) {
  switch (state.spot) {
    case 1:
      return (
        <div className="sp-scene is-feed">
          <Feed tall={tall} />
          <div className="sp-shade" />
          <div className="sp-title is-center">
            <h2>
              You get <em>one second.</em>
            </h2>
            <p>Your ad is one of thousands in the feed.</p>
          </div>
        </div>
      )
    case 2:
      return (
        <div className="sp-scene is-clues">
          <div className="sp-stage">
            <div className="sp-card sp-hero">
              <img src="/showcase/tpl-01.webp" alt="" />
              <span className="sp-ring" />
            </div>
            <span className="sp-chip c1">Hook that stops the scroll</span>
            <span className="sp-chip c2">Layout that converts</span>
            <span className="sp-chip c3">Offer that works</span>
            <span className="sp-chip c4">214 days running</span>
          </div>
          <div className="sp-title is-bottom">
            <h2>
              Winners leave <em>clues.</em>
            </h2>
          </div>
        </div>
      )
    case 3:
      return (
        <div className="sp-scene is-yours">
          <div className="sp-flow">
            <div className="sp-card sp-from">
              <img src="/showcase/tpl-01.webp" alt="" />
              <span className="sp-tag">Winning ad</span>
            </div>
            <div className="sp-mid">
              <span className="sp-fly f1">
                <img src="/showcase/ultra-light-runner.webp" alt="" />
              </span>
              <span className="sp-fly f2">
                <img src="/showcase/yourbrand-logo.webp" alt="" />
              </span>
              <span className="sp-arrow">→</span>
            </div>
            <div className="sp-card sp-to">
              <img src={AD(4)} alt="" />
              <span className="sp-tag is-brand">Your ad</span>
            </div>
          </div>
          <div className="sp-title is-bottom">
            <h2>
              Now make it <em>yours.</em>
            </h2>
          </div>
        </div>
      )
    case 4:
      return (
        <div className="sp-scene is-scale">
          <div className="sp-title is-top">
            <h2>
              One click. <em>A dozen ads.</em>
            </h2>
          </div>
          <div className="sp-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <img key={i} src={AD(i + 1)} alt="" style={{ animationDelay: `${0.15 + i * 0.09}s` }} />
            ))}
          </div>
          <span className="sp-ready">12 ads ready</span>
        </div>
      )
    case 5:
      return (
        <div className="sp-scene is-end">
          <img src="/brand/icons/icon-color.svg" alt="" className="sp-logo" />
          <h2>
            Ads that already work. <em>Made yours.</em>
          </h2>
          <span className="sp-button">Start free at adrender.app</span>
        </div>
      )
    default:
      return <div className="sp-scene" />
  }
}

export function SpotScene({ state, tall }: { state: SceneState; tall: boolean }) {
  return (
    <div className={cx('sc-spot', tall && 'is-tall')}>
      <Scene key={state.spot} state={state} tall={tall} />
    </div>
  )
}
