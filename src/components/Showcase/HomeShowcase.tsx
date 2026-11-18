import { Player } from './engine/Player'
import { DESKTOP_APP, PHONE_APP, usePhoneWidth, useWarmStills } from './engine/hooks'
import type { SceneState } from './engine/story'
import { DesktopApp } from './desktop/DesktopApp'
import { PhoneApp } from './phone/PhoneApp'
import { HERO_DESKTOP } from './stories/heroDesktop'
import { HERO_PHONE } from './stories/heroPhone'
import { CAPTIONS } from './showcaseData'
import './Showcase.css'

const desktopApp = (state: SceneState) => <DesktopApp state={state} />
const phoneApp = (state: SceneState) => <PhoneApp state={state} />

const LABEL =
  'AdRender walkthrough: create a brand from a website, add templates in the cockpit, render, and open the finished image and video ads.'

/** Homepage hero: the desktop walkthrough, or the phone one on phones. No controls. */
export function HomeShowcase() {
  const phone = usePhoneWidth()
  useWarmStills()
  if (phone) {
    return (
      <Player
        key="phone"
        story={HERO_PHONE}
        app={PHONE_APP}
        renderApp={phoneApp}
        captions={CAPTIONS}
        touch
        ariaLabel={LABEL}
        className="is-phone"
      />
    )
  }
  return <Player key="desktop" story={HERO_DESKTOP} app={DESKTOP_APP} renderApp={desktopApp} captions={CAPTIONS} ariaLabel={LABEL} />
}
