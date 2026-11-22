import { Player } from './engine/Player'
import { DESKTOP_APP, PHONE_APP, usePhoneWidth, useWarmStills } from './engine/hooks'
import type { SceneState } from './engine/story'
import { DesktopApp } from './desktop/DesktopApp'
import { PhoneApp } from './phone/PhoneApp'
import { INTRO_DESKTOP, INTRO_PHONE } from './stories/intro'
import { CAPTIONS } from './showcaseData'
import '../Showcase/Showcase.css'
import './v2.css'

const desktopApp = (state: SceneState) => <DesktopApp state={state} />
const phoneApp = (state: SceneState) => <PhoneApp state={state} />

const LABEL =
  'AdRender walkthrough: create a brand from a website, add templates in the cockpit, render, and open the finished image and video ads.'

/**
 * Homepage hero: the current-app intro walkthrough (same story as the /tutorials intro),
 * desktop or phone by screen width. No controls.
 */
export function HomeShowcase() {
  const phone = usePhoneWidth()
  useWarmStills()
  return (
    <div className="sc-v2 sc-home-v2">
      {phone ? (
        <Player
          key="phone"
          story={INTRO_PHONE}
          app={PHONE_APP}
          renderApp={phoneApp}
          captions={CAPTIONS}
          touch
          ariaLabel={LABEL}
          className="is-phone"
        />
      ) : (
        <Player key="desktop" story={INTRO_DESKTOP} app={DESKTOP_APP} renderApp={desktopApp} captions={CAPTIONS} ariaLabel={LABEL} />
      )}
    </div>
  )
}
