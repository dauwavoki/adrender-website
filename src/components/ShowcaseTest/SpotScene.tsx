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

/** The results: image ads with video ads mixed in. */
const VAD = (n: number) => `/showcase/vad-${String(n).padStart(2, '0')}.webp`
const RESULTS: { src: string; video?: string }[] = [
  { src: AD(1) },
  { src: VAD(1), video: '0:12' },
  { src: AD(2) },
  { src: AD(3) },
  { src: VAD(2), video: '0:09' },
  { src: AD(4) },
  { src: AD(5) },
  { src: VAD(3), video: '0:15' },
  { src: AD(6) },
  { src: AD(7) },
  { src: AD(8) },
  { src: VAD(4), video: '0:11' },
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
              <img src="/showcase/shoe-template.webp" alt="" />
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
              <img src="/showcase/shoe-template.webp" alt="" />
              <span className="sp-tag">Winning ad</span>
            </div>
            <div className="sp-mid">
              <span className="sp-fly f1">
                <img src="/showcase/shoe-product.webp" alt="" />
              </span>
              <span className="sp-fly f2">
                <img src="/showcase/shoe-logo.webp" alt="" />
              </span>
              <span className="sp-arrow">→</span>
            </div>
            <div className="sp-card sp-to">
              <img src="/showcase/shoe-output.webp" alt="" />
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
              One click. <em>Image and video ads.</em>
            </h2>
          </div>
          <div className="sp-grid">
            {RESULTS.map((item, i) => (
              <span key={i} className={cx('scv2-sp-tile', item.video && 'is-video')} style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
                <img src={item.src} alt="" />
                {item.video ? (
                  <>
                    <i className="scv2-sp-play" />
                    <b className="scv2-sp-time">{item.video}</b>
                    <i className="scv2-sp-bar" style={{ animationDelay: `${1.4 + i * 0.09}s` }} />
                  </>
                ) : null}
              </span>
            ))}
          </div>
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
