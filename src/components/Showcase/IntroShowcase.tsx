import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowsOut, DeviceMobile, Desktop, TiktokLogo, X } from '@phosphor-icons/react'
import { Player } from './engine/Player'
import type { SceneState } from './engine/story'
import { DesktopApp } from './desktop/DesktopApp'
import { PhoneApp } from './phone/PhoneApp'
import { INTRO_DESKTOP, INTRO_PHONE, INTRO_TIKTOK } from './stories/intro'
import { CAPTIONS } from './showcaseData'
import { DESKTOP_APP, PHONE_APP, usePhoneWidth, useWarmStills } from './engine/hooks'
import { cx } from '../site/cx'
import './Showcase.css'

type View = 'desktop' | 'phone' | 'tiktok'

const VIEWS: { id: View; label: string; icon: typeof Desktop }[] = [
  { id: 'desktop', label: 'Desktop', icon: Desktop },
  { id: 'phone', label: 'Phone', icon: DeviceMobile },
  { id: 'tiktok', label: 'TikTok ad', icon: TiktokLogo },
]

/** 9:16 ad view. Half of 1080×1920; it scales up crisp for recording. */
const TIKTOK_VIEW = { w: 540, h: 960 }

const AD_CAPTIONS = ['Add your brand', 'Pick winning ads', 'Get your ads'] as const

const adOverlay = (state: SceneState) => <AdOverlay state={state} />
const desktopApp = (state: SceneState) => <DesktopApp state={state} />
const phoneApp = (state: SceneState) => <PhoneApp state={state} />

const LABEL =
  'AdRender intro: add a brand from its website, watch its profile fill in, add templates in the cockpit, render, and open the finished ads.'

/** Ad hook, logo bar and end card for the TikTok version. */
function AdOverlay({ state }: { state: SceneState }) {
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

function IntroPlayer({ view, contain }: { view: View; contain: boolean }) {
  if (view === 'phone') {
    return (
      <Player
        story={INTRO_PHONE}
        app={PHONE_APP}
        renderApp={phoneApp}
        captions={CAPTIONS}
        touch
        contain={contain}
        ariaLabel={LABEL}
        className="is-phone"
      />
    )
  }
  if (view === 'tiktok') {
    return (
      <Player
        story={INTRO_TIKTOK}
        app={DESKTOP_APP}
        view={TIKTOK_VIEW}
        renderApp={desktopApp}
        overlay={adOverlay}
        captions={AD_CAPTIONS}
        captionVariant="ad"
        follow={1.05}
        contain={contain}
        ariaLabel={LABEL}
        className="is-tiktok"
      />
    )
  }
  return <Player story={INTRO_DESKTOP} app={DESKTOP_APP} renderApp={desktopApp} captions={CAPTIONS} contain={contain} ariaLabel={LABEL} />
}

/**
 * The intro tutorial: one story in three views (desktop, phone, 9:16 ad),
 * picked for the device on load, with a full-screen button for recording.
 * Full screen always starts the story from the beginning.
 */
export function IntroShowcase() {
  const phone = usePhoneWidth()
  const [picked, setPicked] = useState<View | null>(null)
  const view: View = picked ?? (phone ? 'phone' : 'desktop')
  const [full, setFull] = useState(false)
  const [run, setRun] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  useWarmStills()

  // ?view=desktop|phone|tiktok opens that view (handy for recording).
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('view')
    if (wanted !== 'desktop' && wanted !== 'phone' && wanted !== 'tiktok') return
    const timer = window.setTimeout(() => setPicked(wanted), 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFull(false)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useEffect(() => {
    if (!full) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFull(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [full])

  const enterFull = useCallback(() => {
    setRun((value) => value + 1)
    setFull(true)
    const el = stageRef.current
    // iPhone Safari has no element full screen: the stage still fills the window.
    if (el?.requestFullscreen) void el.requestFullscreen().catch(() => undefined)
  }, [])

  const exitFull = useCallback(() => {
    setFull(false)
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined)
  }, [])

  return (
    <div className="sc-tutorial">
      <div className="sc-tutorial-bar">
        <div className="sc-tutorial-views" role="radiogroup" aria-label="View">
          {VIEWS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={view === id}
              className={cx('sc-tutorial-view', view === id && 'is-on')}
              onClick={() => setPicked(id)}
            >
              <Icon size={16} aria-hidden />
              {label}
            </button>
          ))}
        </div>
        <button type="button" className="sc-tutorial-full" onClick={enterFull}>
          <ArrowsOut size={16} aria-hidden />
          Full screen
        </button>
      </div>
      <div ref={stageRef} className={cx('sc-tutorial-stage', `is-${view}`, full && 'is-full')}>
        {full ? (
          <button type="button" className="sc-tutorial-close" onClick={exitFull} aria-label="Close full screen">
            <X size={18} aria-hidden />
          </button>
        ) : null}
        <div className="sc-tutorial-frame">
          <IntroPlayer key={`${view}-${run}-${full ? 'full' : 'inline'}`} view={view} contain={full} />
        </div>
      </div>
    </div>
  )
}
