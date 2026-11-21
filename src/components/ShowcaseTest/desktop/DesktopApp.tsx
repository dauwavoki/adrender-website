import type { SceneState } from '../engine/story'
import { Cockpit } from './Cockpit'
import { swapKey } from './swapKey'
import { SiteOverlay } from '../SitePage'
import { AccountMenu, ModalLayer, ProfileScreen } from './pages'
import { AdsLibScreen as LibraryTutScreen, LibOverlays } from './adslib'
import { SavedOverlays, SavedScreen, ThumbPreview } from './saved'
import { KitListScreen, KitOverlay, KitScreen } from './kit'
import { BrandScreen, HomeScreen, LibraryScreen } from './screens'
import { BrowseDetail, BrowseScreen } from './browse'

/** The desktop client: one page at a time, the cockpit docked at the bottom. */
export function DesktopApp({ state }: { state: SceneState }) {
  return (
    <>
      <div className="sc-viewport">
        <div className="sc-scroller" data-sc-scroll="" key={state.screen}>
          <div className="scv2-swap" key={swapKey(state)}>
          {state.screen === 'home' ? <HomeScreen state={state} /> : null}
          {state.screen === 'brands' ? <KitListScreen state={state} /> : null}
          {state.screen === 'brand' ? <BrandScreen state={state} /> : null}
          {state.screen === 'browse' ? <BrowseScreen state={state} /> : null}
          {state.screen === 'library' ? <LibraryScreen state={state} /> : null}
          {state.screen === 'adslib' ? <LibraryTutScreen state={state} /> : null}
          {state.screen === 'saved' ? <SavedScreen state={state} /> : null}
          {state.screen === 'kit' ? <KitScreen state={state} /> : null}
          {state.screen === 'kitlist' ? <KitListScreen state={state} /> : null}
          {state.screen === 'profile' ? <ProfileScreen state={state} /> : null}
          </div>
        </div>
      </div>
      <Cockpit state={state} />
      {state.menu ? <AccountMenu state={state} /> : null}
      <ModalLayer state={state} />
      <SavedOverlays state={state} />
      <BrowseDetail state={state} />
      <LibOverlays state={state} />
      <ThumbPreview state={state} />
      <KitOverlay state={state} />
      <SiteOverlay state={state} />
    </>
  )
}
