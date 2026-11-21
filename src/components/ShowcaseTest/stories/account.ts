import { addTemplate, makeStory, noTag, tag, type Script } from '../engine/story'
import { PACKS } from '../desktop/pagesData'

/**
 * Account tutorials: Affiliates, My Ads Library and folders, Workspaces + tokens + Teams.
 * Each exists in two sizes. Desktop starts on Home with the cockpit open. Phone starts on Home.
 */

const desktopStart = { screen: 'home' as const, cockpitOpen: true, cursor: { target: { x: 760, y: 360 }, ms: 0, down: false } }
const phoneStart = { screen: 'home' as const, cursor: { target: { x: 200, y: 420 }, ms: 0, down: false } }

const outro = (s: Script) => {
  s.after(3.2, { dim: true })
  s.after(0.6, {})
}

/* ── 1 · Affiliates ─────────────────────────────────────────────── */

function affiliateForm(s: Script, phone: boolean) {
  const zoom = (target: string) => (phone ? s.after(0, {}) : s.camera(0.2, target, 1.25, 800))
  s.after(0.5, { caption: 3 })
  zoom('sc-aff-name')
  s.move(0.5, 'sc-aff-name', 700)
  s.click(0.6, { aff: 1 })
  s.move(0.7, 'sc-aff-platforms', 650)
  s.click(0.6, { aff: 2 })
  s.move(0.7, 'sc-aff-fit', 650)
  s.click(0.6, { aff: 3 })
  s.move(0.8, 'sc-aff-terms', 650)
  s.click(0.6, { aff: 4 })
  s.move(0.4, 'sc-aff-submit', 550)
  s.click(0.6, { aff: 5 })
  s.after(1.3, { aff: 6 })
  if (!phone) s.camera(0.2, null, 1, 800)
}


/** Open on the website's affiliates page, then go into the app to apply. */
function websiteTour(s: Script, phone: boolean) {
  s.after(0.4, { caption: 1 })
  s.after(0.2, tag('sc-site-url', 'bottom', 'The affiliate program lives at adrender.app/affiliates'))
  s.move(0.1, 'sc-site-url', 900)
  s.after(2.6, {})
  s.move(0, 'sc-site-hero', 900)
  s.after(0.3, tag('sc-site-hero', phone ? 'bottom' : 'right', 'Earn a share of the profit on every subscriber you refer'))
  s.after(3.0, { ...noTag, site: 1 })
  s.after(1.3, tag('sc-site-card-2', 'bottom', 'No earnings cap, a live dashboard, a private Discord and prizes'))
  s.move(0, 'sc-site-features', 900)
  s.after(3.4, { ...noTag, site: 2 })
  s.after(1.3, tag('sc-site-step-3', 'bottom', 'Three steps: create an account, apply in your profile, get approved'))
  s.move(0, 'sc-site-step-2', 900)
  s.after(3.4, { ...noTag, site: 0 })
  s.after(1.3, {})
  s.move(0, 'sc-site-apply', 900)
  s.after(0.3, tag('sc-site-apply', 'bottom', 'Already have an account? Apply inside the app'))
  s.after(2.6, { ...noTag, site: null })
  s.after(0.7, {})
}

export const AFFILIATES_DESKTOP = makeStory(
  (s) => {
    websiteTour(s, false)
    s.after(0.2, { caption: 2 })
    s.after(0.2, { focus: 'sc-profile-orb' })
    s.move(0.3, 'sc-profile-orb', 1000)
    s.after(1.0, {})
    s.click(0.2, { menu: true })
    s.after(0.4, { focus: 'sc-menu-profile' })
    s.move(0.2, 'sc-menu-profile', 800)
    s.after(1.0, {})
    s.click(0.2, { menu: false, screen: 'profile', ptab: 'account', route: null, cockpitOpen: false, focus: null })
    s.after(0.9, {})
    s.after(0.1, { focus: 'sc-ptab-affiliate' })
    s.move(0.3, 'sc-ptab-affiliate', 900)
    s.after(1.1, {})
    s.click(0.2, { ptab: 'affiliate', aff: 0, focus: null })
    s.after(0.8, {})
    affiliateForm(s, false)
    s.after(0.5, { caption: 4 })
    s.after(2.4, { aff: 7 })
    s.move(1.0, 'sc-aff-connect', 800)
    s.click(0.9, { aff: 8 })
    s.after(0.4, { caption: 5 })
    s.move(1.2, 'sc-aff-copy', 800)
    s.click(0.8, {})
    s.after(1.4, { ptab: 'stats' })
    s.after(2.4, {})
    outro(s)
  },
  { initial: { ...desktopStart, site: 0 }, stillWhen: (st) => st.aff === 8 },
)

export const AFFILIATES_PHONE = makeStory(
  (s) => {
    websiteTour(s, true)
    s.after(0.2, { caption: 2 })
    s.after(0.2, { focus: 'sc-tab-profile' })
    s.move(0.3, 'sc-tab-profile', 900)
    s.after(1.0, {})
    s.click(0.2, { screen: 'profile', ptab: 'account', focus: null })
    s.after(0.9, {})
    s.after(0.1, { focus: 'sc-ptab-affiliate' })
    s.move(0.3, 'sc-ptab-affiliate', 900)
    s.after(1.1, {})
    s.click(0.2, { ptab: 'affiliate', aff: 0, focus: null })
    s.after(0.8, {})
    affiliateForm(s, true)
    s.after(0.5, { caption: 4 })
    s.after(2.4, { aff: 7 })
    s.move(1.0, 'sc-aff-connect', 800)
    s.click(0.9, { aff: 8 })
    s.after(0.4, { caption: 5 })
    s.move(1.2, 'sc-aff-copy', 800)
    s.click(0.8, {})
    s.after(1.4, { ptab: 'stats' })
    s.after(2.4, {})
    outro(s)
  },
  { initial: { ...phoneStart, site: 0 }, stillWhen: (st) => st.aff === 8 },
)

/* ── 2 · My Ads Library and folders ──────────────────────────────── */

function libraryFlow(s: Script, phone: boolean) {
  const openSaved = phone ? 'sc-tab-saved' : 'sc-flap-saved'
  const openLibrary = phone ? 'sc-tab-library' : 'sc-flap-library'
  // 1 · Collections
  s.after(0.6, { caption: 1 })
  s.move(0.5, 'sc-ad-1', 800)
  s.after(1.2, {})
  s.after(0.1, { caption: 2 })
  s.move(0.4, 'sc-new-collection', 800)
  s.click(0.8, { shelf: 1, url: '' })
  s.type(0.6, 'Summer launch', 0.07)
  s.move(0.5, 'sc-coll-create', 600)
  s.click(0.7, { shelf: 2, url: '' })
  s.move(0.8, 'sc-ad-0', 700)
  s.click(0.6, { picks: 1 })
  s.move(0.4, 'sc-ad-1', 500)
  s.click(0.6, { picks: 2 })
  s.move(0.6, 'sc-save-to', 600)
  s.click(0.8, { shelf: 3, picks: 0 })
  s.move(0.7, 'sc-coll-2', 600)
  s.click(0.7, { folder: 2 })
  s.after(1.6, {})
  s.move(0.4, 'sc-coll-0', 600)
  s.click(0.6, { folder: 0 })
  // 2 · Save as a template
  s.after(0.4, { caption: 3 })
  s.move(0.7, 'sc-save-tpl-0', 800)
  s.click(0.7, { saved: 1 })
  s.after(1.8, { saved: 2 })
  s.move(0.3, openSaved, 800)
  s.click(0.9, { screen: 'saved', route: 'saved' })
  s.after(1.6, {})
  // 3 · Use them in the cockpit
  s.after(0.2, { caption: 4 })
  s.move(0.6, 'sc-card-saved-new', 800)
  s.after(0.4, { hover: 'saved-new' })
  s.move(0.3, 'sc-use-saved-new', 400)
  s.click(0.6, addTemplate('image'))
  s.after(0.3, { hover: null })
  s.after(1.5, { added: null })
  s.move(0.4, openLibrary, 800)
  s.click(0.8, { screen: 'library', route: 'library' })
  s.move(0.8, 'sc-use-ad-2', 800)
  s.click(0.7, addTemplate('image'))
  s.after(2.2, {})
  outro(s)
}

const libraryInitial = { screen: 'library' as const, lib: { image: { rendering: 0, ready: 4, seen: true }, video: { rendering: 0, ready: 2, seen: true } } }

export const LIBRARY_DESKTOP = makeStory((s) => libraryFlow(s, false), {
  initial: { ...desktopStart, ...libraryInitial, route: 'library' },
  stillWhen: (st) => st.shelf >= 3,
})

export const LIBRARY_PHONE = makeStory((s) => libraryFlow(s, true), {
  initial: { ...phoneStart, ...libraryInitial },
  stillWhen: (st) => st.shelf >= 3,
})

/* ── 3 · Workspaces, tokens and Teams ────────────────────────────── */

function workspaceFlow(s: Script, phone: boolean) {
  const opener = phone ? 'sc-ph-workspace' : 'sc-profile-orb'
  const topper = phone ? 'sc-ph-tokens' : 'sc-profile-orb'
  // 1 · Create a workspace. Everything else darkens so the choice is obvious.
  s.after(0.5, { caption: 1 })
  s.after(0.2, { focus: opener })
  s.move(0.3, opener, 1000)
  s.click(1.2, { menu: true })
  s.after(0.5, { focus: 'sc-create-ws' })
  s.move(0.3, 'sc-create-ws', 1200)
  s.after(1.7, { caption: 2 })
  s.click(0.6, { modal: 'workspace', menu: false, url: '', focus: null })
  s.after(1.4, {})
  s.type(0.2, 'Studio Team', 0.09)
  s.after(0.5, { focus: 'sc-ws-create' })
  s.move(0.3, 'sc-ws-create', 900)
  s.after(1.2, {})
  s.click(0.2, { modal: null, ws: 1, wsCur: 1, url: '', focus: null })
  s.after(1.2, {})
  // 2 · Switch: home title, cockpit chip (desktop), workspace menu (phone)
  s.after(0.3, { caption: 3 })
  s.after(0.2, { focus: 'sc-home-ws' })
  s.move(0.3, 'sc-home-ws', 1000)
  s.after(1.1, {})
  s.click(0.2, { wsPick: 'home' })
  s.after(0.4, { focus: 'sc-ws-personal' })
  s.move(0.2, 'sc-ws-personal', 800)
  s.after(1.0, {})
  s.click(0.2, { wsPick: null, wsCur: 0, focus: null })
  s.after(1.3, {})
  if (phone) {
    s.after(0.2, { focus: opener })
    s.move(0.3, opener, 900)
    s.after(0.9, {})
    s.click(0.2, { menu: true })
    s.after(0.4, { focus: 'sc-ws-team' })
    s.move(0.2, 'sc-ws-team', 800)
    s.after(1.0, {})
    s.click(0.2, { menu: false, wsCur: 1, focus: null })
  } else {
    s.after(0.2, { focus: 'sc-cockpit-ws' })
    s.move(0.3, 'sc-cockpit-ws', 1000)
    s.after(1.0, {})
    s.click(0.2, { wsPick: 'cockpit' })
    s.after(0.4, { focus: 'sc-ws-team' })
    s.move(0.2, 'sc-ws-team', 800)
    s.after(1.0, {})
    s.click(0.2, { wsPick: null, wsCur: 1, focus: null })
  }
  s.after(1.4, {})
  // 3 · Tokens
  s.after(0.1, { caption: 4 })
  if (phone) {
    s.after(0.2, { focus: topper })
    s.move(0.3, topper, 900)
    s.after(1.0, {})
    s.click(0.2, { modal: 'tokens', focus: null })
  } else {
    s.after(0.2, { focus: opener })
    s.move(0.3, opener, 900)
    s.after(0.9, {})
    s.click(0.2, { menu: true })
    s.after(0.4, { focus: 'sc-topup' })
    s.move(0.2, 'sc-topup', 900)
    s.after(1.2, {})
    s.click(0.2, { menu: false, modal: 'tokens', focus: null })
  }
  s.after(1.0, {})
  s.after(0.1, { focus: 'sc-pack-3' })
  s.move(0.2, 'sc-pack-3', 900)
  s.after(1.0, {})
  s.click(0.2, { pack: 3 })
  s.after(0.4, { focus: 'sc-add-tokens' })
  s.move(0.3, 'sc-add-tokens', 800)
  s.after(1.0, {})
  s.click(0.2, { modal: null, bonus: PACKS[3].tokens, focus: null })
  s.after(1.6, {})
  // 4 · Teams: profile -> Workspace tab -> invite link
  s.after(0.1, { caption: 5 })
  if (phone) {
    s.after(0.2, { focus: 'sc-tab-profile' })
    s.move(0.3, 'sc-tab-profile', 800)
    s.after(1.0, {})
    s.click(0.2, { screen: 'profile', ptab: 'account', team: 0, focus: null })
  } else {
    s.after(0.2, { focus: opener })
    s.move(0.3, opener, 800)
    s.after(0.9, {})
    s.click(0.2, { menu: true })
    s.after(0.4, { focus: 'sc-menu-profile' })
    s.move(0.2, 'sc-menu-profile', 800)
    s.after(1.0, {})
    s.click(0.2, { menu: false, screen: 'profile', ptab: 'account', team: 0, route: null, cockpitOpen: false, focus: null })
  }
  s.after(0.8, {})
  s.after(0.1, { focus: 'sc-ptab-workspace' })
  s.move(0.3, 'sc-ptab-workspace', 900)
  s.after(1.0, {})
  s.click(0.2, { ptab: 'workspace', focus: null })
  s.after(1.2, {})
  s.after(0.1, { focus: 'sc-invite' })
  s.move(0.3, 'sc-invite', 800)
  s.after(1.0, {})
  s.click(0.2, { team: 1, focus: null })
  s.after(2.0, { team: 2 })
  s.after(1.2, { caption: 6 })
  s.after(0.1, { focus: 'sc-cap-save' })
  s.move(0.3, 'sc-cap-save', 800)
  s.after(0.4, { team: 3 })
  s.after(0.8, {})
  s.click(0.2, { focus: null })
  s.after(2.4, {})
  outro(s)
}

export const WORKSPACES_DESKTOP = makeStory((s) => workspaceFlow(s, false), {
  initial: desktopStart,
  stillWhen: (st) => st.team >= 2,
})

export const WORKSPACES_PHONE = makeStory((s) => workspaceFlow(s, true), {
  initial: phoneStart,
  stillWhen: (st) => st.team >= 2,
})

export const AFFILIATES_CAPTIONS = ['See the program on the website', 'Open your profile', 'Apply to the program', 'Get approved and connect payouts', 'Share your code and track earnings'] as const
export const LIBRARY_CAPTIONS = ['Open My Ads Library', 'Group ads into a collection', 'Save an ad as a template', 'Use them in the cockpit'] as const
export const WORKSPACES_CAPTIONS = ['Open the workspace menu', 'Create a workspace', 'Switch workspaces from the home page and the cockpit', 'Top up tokens', 'Open your profile, then Workspace to invite your team', 'Set a token cap'] as const
