import { addTemplate, makeStory, type Script } from '../engine/story'
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
  s.after(0.5, { caption: 2 })
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

export const AFFILIATES_DESKTOP = makeStory(
  (s) => {
    s.after(0.5, { caption: 1 })
    s.move(0.3, 'sc-profile-orb', 900)
    s.click(0.9, { menu: true })
    s.move(0.8, 'sc-menu-profile', 600)
    s.click(0.7, { menu: false, screen: 'profile', ptab: 'account', route: null, cockpitOpen: false })
    s.move(0.9, 'sc-ptab-affiliate', 800)
    s.click(0.7, { ptab: 'affiliate', aff: 0 })
    affiliateForm(s, false)
    s.after(0.5, { caption: 3 })
    s.after(2.4, { aff: 7 })
    s.move(1.0, 'sc-aff-connect', 800)
    s.click(0.9, { aff: 8 })
    s.after(0.4, { caption: 4 })
    s.move(1.2, 'sc-aff-copy', 800)
    s.click(0.8, {})
    s.after(1.4, { ptab: 'stats' })
    s.after(2.4, {})
    outro(s)
  },
  { initial: desktopStart, stillWhen: (st) => st.aff === 8 },
)

export const AFFILIATES_PHONE = makeStory(
  (s) => {
    s.after(0.5, { caption: 1 })
    s.move(0.8, 'sc-tab-profile', 800)
    s.click(0.9, { screen: 'profile', ptab: 'account' })
    s.move(0.8, 'sc-ptab-affiliate', 700)
    s.click(0.7, { ptab: 'affiliate', aff: 0 })
    affiliateForm(s, true)
    s.after(0.5, { caption: 3 })
    s.after(2.4, { aff: 7 })
    s.move(1.0, 'sc-aff-connect', 800)
    s.click(0.9, { aff: 8 })
    s.after(0.4, { caption: 4 })
    s.move(1.2, 'sc-aff-copy', 800)
    s.click(0.8, {})
    s.after(1.4, { ptab: 'stats' })
    s.after(2.4, {})
    outro(s)
  },
  { initial: phoneStart, stillWhen: (st) => st.aff === 8 },
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
  // 1 · Workspaces
  s.after(0.5, { caption: 1 })
  s.move(0.4, opener, 900)
  s.click(0.9, { menu: true })
  s.move(0.9, 'sc-create-ws', 650)
  s.after(0.1, { caption: 2 })
  s.click(0.7, { modal: 'workspace', menu: false, url: '' })
  s.type(0.8, 'Studio Team', 0.07)
  s.move(0.6, 'sc-ws-create', 600)
  s.click(0.7, { modal: null, ws: 1, url: '' })
  s.move(0.5, opener, 800)
  s.click(0.8, { menu: true })
  s.after(1.6, {})
  // 2 · Tokens
  s.after(0.1, { caption: 3 })
  if (phone) {
    s.after(0.2, { menu: false })
    s.move(0.4, topper, 700)
    s.click(0.7, { modal: 'tokens' })
  } else {
    s.move(0.6, 'sc-topup', 650)
    s.click(0.8, { menu: false, modal: 'tokens' })
  }
  s.move(0.9, 'sc-pack-3', 650)
  s.click(0.6, { pack: 3 })
  s.move(0.7, 'sc-add-tokens', 650)
  s.click(0.8, { modal: null, bonus: PACKS[3].tokens })
  s.after(1.4, {})
  // 3 · Teams
  s.after(0.1, { caption: 4 })
  if (phone) {
    s.move(0.4, 'sc-tab-profile', 700)
    s.click(0.8, { screen: 'profile', ptab: 'workspace', team: 0 })
  } else {
    s.move(0.5, 'sc-profile-orb', 700)
    s.click(0.8, { menu: true })
    s.move(0.7, 'sc-menu-profile', 600)
    s.click(0.7, { menu: false, screen: 'profile', ptab: 'workspace', team: 0, route: null, cockpitOpen: false })
  }
  s.after(1.0, {})
  s.move(0.5, 'sc-invite', 700)
  s.click(0.8, { team: 1 })
  s.after(2.0, { team: 2 })
  s.after(1.2, { caption: 5 })
  s.move(0.5, 'sc-cap-save', 800)
  s.after(0.4, { team: 3 })
  s.click(0.9, {})
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

export const AFFILIATES_CAPTIONS = ['Open your profile', 'Apply to the program', 'Get approved and connect payouts', 'Share your code and track earnings'] as const
export const LIBRARY_CAPTIONS = ['Open My Ads Library', 'Group ads into a collection', 'Save an ad as a template', 'Use them in the cockpit'] as const
export const WORKSPACES_CAPTIONS = ['Open the workspace menu', 'Create a workspace', 'Top up tokens', 'Invite your team', 'Set a token cap'] as const
