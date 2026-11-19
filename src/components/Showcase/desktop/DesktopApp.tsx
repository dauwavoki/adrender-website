import type { SceneState } from '../engine/story'
import { Cockpit } from './Cockpit'
import { AccountMenu, ModalLayer, ProfileScreen } from './pages'
import { SavedScreen, ThumbPreview } from './saved'
import { BrandScreen, BrandsScreen, BrowseScreen, HomeScreen, LibraryScreen } from './screens'

/** The desktop client: one page at a time, the cockpit docked at the bottom. */
export function DesktopApp({ state }: { state: SceneState }) {
  return (
    <>
      <div className="sc-viewport">
        <div className="sc-scroller" data-sc-scroll="" key={state.screen}>
          {state.screen === 'home' ? <HomeScreen state={state} /> : null}
          {state.screen === 'brands' ? <BrandsScreen state={state} /> : null}
          {state.screen === 'brand' ? <BrandScreen state={state} /> : null}
          {state.screen === 'browse' ? <BrowseScreen state={state} /> : null}
          {state.screen === 'library' ? <LibraryScreen state={state} /> : null}
          {state.screen === 'saved' ? <SavedScreen state={state} /> : null}
          {state.screen === 'profile' ? <ProfileScreen state={state} /> : null}
        </div>
      </div>
      <Cockpit state={state} />
      {state.menu ? <AccountMenu state={state} /> : null}
      <ModalLayer state={state} />
      <ThumbPreview state={state} />
    </>
  )
}
