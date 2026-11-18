/**
 * The story, second by second. Each step patches the scene state at a time.
 * The player folds every step up to "now", so any moment can be shown exactly
 * (add ?showcase-t=12.5 to the URL to freeze the story at 12.5s).
 */

export type Screen = 'home' | 'brand' | 'browse' | 'library'
export type Mode = 'image' | 'video'

/** A named element (data-sc="name") or a point in window coordinates. */
export type Target = string | { x: number; y: number }

export type LibState = { rendering: number; ready: number; seen: boolean }

export type SceneState = {
  screen: Screen
  mode: Mode
  /** Home and brand page scroll, by element name or 0. */
  scroll: Target | 0
  scrollMs: number
  camera: { target: Target | null; zoom: number; ms: number }
  cursor: { target: Target; ms: number; down: boolean }
  /** Bumps on every click. The cursor draws the rings where it is. */
  click: number
  caption: number
  /** Whole-window fade at the loop seam. */
  dim: boolean

  // Home → brand
  urlFocus: boolean
  url: string
  scanBusy: boolean
  /** 0 none · 1 header + banner · 2 logo · 3–7 colors · 8 voice · 9–12 products · 13 done */
  brandStage: number

  // Cockpit
  cockpitOpen: boolean
  route: 'browse' | 'library' | null
  templates: { image: number; video: number }
  added: { text: string; key: number } | null
  hover: string | null
  brand: boolean
  pills: number
  pop: 'brand' | 'settings' | null
  sizes: number
  busy: boolean
  lib: { image: LibState; video: LibState }
  /** Which mode just got news, for the one-time wiggle. */
  wiggle: Mode | null
}

export const INITIAL: SceneState = {
  screen: 'home',
  mode: 'image',
  scroll: 0,
  scrollMs: 0,
  camera: { target: null, zoom: 1, ms: 0 },
  cursor: { target: { x: 700, y: 330 }, ms: 0, down: false },
  click: 0,
  caption: 0,
  dim: false,
  urlFocus: false,
  url: '',
  scanBusy: false,
  brandStage: 0,
  cockpitOpen: true,
  route: null,
  templates: { image: 0, video: 0 },
  added: null,
  hover: null,
  brand: false,
  pills: 0,
  pop: null,
  sizes: 0,
  busy: false,
  lib: {
    image: { rendering: 0, ready: 0, seen: true },
    video: { rendering: 0, ready: 0, seen: true },
  },
  wiggle: null,
}

type Patch = Partial<SceneState> | ((state: SceneState) => Partial<SceneState>)
export type Step = { at: number; patch: Patch }

const steps: Step[] = []
let clock = 0

/** Wait, then patch. Times are seconds from the previous step. */
function after(seconds: number, patch: Patch) {
  clock += seconds
  steps.push({ at: Math.round(clock * 1000) / 1000, patch })
}

function move(seconds: number, target: Target, ms: number) {
  after(seconds, (s) => ({ cursor: { ...s.cursor, target, ms } }))
}

/** Press, then release 120ms later. The rings start on press. */
function click(seconds: number, patch: Patch = {}) {
  after(seconds, (s) => ({ cursor: { ...s.cursor, down: true }, click: s.click + 1 }))
  after(0.12, (s) => ({ cursor: { ...s.cursor, down: false }, ...(typeof patch === 'function' ? patch(s) : patch) }))
}

function camera(seconds: number, target: Target | null, zoom: number, ms: number) {
  after(seconds, { camera: { target, zoom, ms } })
}

function type(seconds: number, text: string, perChar: number) {
  for (let i = 1; i <= text.length; i += 1) {
    after(i === 1 ? seconds : perChar, { url: text.slice(0, i) })
  }
}

function addTemplate(mode: Mode) {
  return (s: SceneState): Partial<SceneState> => {
    const count = s.templates[mode] + 1
    return {
      templates: { ...s.templates, [mode]: count },
      added: { text: `Added · ${count} ${count === 1 ? 'template' : 'templates'}`, key: s.click },
    }
  }
}

function setLib(mode: Mode, next: Partial<LibState>) {
  return (s: SceneState): Partial<SceneState> => ({ lib: { ...s.lib, [mode]: { ...s.lib[mode], ...next } } })
}

// ── Opening: Home ───────────────────────────────────────────────
after(0, {})
after(1.4, { scroll: 'sc-use-again', scrollMs: 1500, cockpitOpen: false })
after(3.1, { scroll: 'sc-inspired', scrollMs: 1100 })
after(3.0, { scroll: 0, scrollMs: 1400 })

// ── 1. Create your brand or campaign ────────────────────────────
after(1.5, { caption: 1 })
camera(0.1, 'sc-create', 1.75, 1100)
move(0.4, 'sc-url', 900)
click(1.0, { urlFocus: true })
type(0.25, 'yourbrand.com', 0.085)
move(0.3, 'sc-scan', 500)
click(0.6, { scanBusy: true })
after(0.7, {
  screen: 'brand',
  scroll: 0,
  scrollMs: 0,
  brandStage: 1,
  cockpitOpen: false,
  urlFocus: false,
  url: '',
  scanBusy: false,
  camera: { target: 'sc-banner', zoom: 1.3, ms: 0 },
  cursor: { target: { x: 1010, y: 300 }, ms: 0, down: false },
})
after(0.45, { brandStage: 2 })
for (let i = 3; i <= 7; i += 1) after(0.16, { brandStage: i })
after(0.3, { brandStage: 8 })
camera(0.35, null, 1, 1500)
for (let i = 9; i <= 12; i += 1) after(0.22, { brandStage: i })
after(0.5, { scroll: 'sc-products', scrollMs: 1000 })
after(1.0, { brandStage: 13 })

// ── 2. Find templates ───────────────────────────────────────────
after(0.6, { caption: 2 })
move(0.2, 'sc-dock-bar', 700)
click(0.85, { cockpitOpen: true })
move(0.4, 'sc-flap-video', 550)
click(0.65, { mode: 'video' })
move(0.3, 'sc-flap-browse', 550)
click(0.65, { screen: 'browse', route: 'browse', scroll: 0, scrollMs: 0 })

move(0.45, 'sc-card-v1', 550)
after(0.45, { hover: 'v1' })
move(0.2, 'sc-use-v1', 300)
click(0.45, addTemplate('video'))
after(0.3, { hover: null })
move(0.1, 'sc-card-v2', 550)
after(0.45, { hover: 'v2' })
move(0.2, 'sc-use-v2', 300)
click(0.45, addTemplate('video'))
after(0.3, { hover: null })

camera(0.2, 'sc-brand-switch', 1.4, 1000)
move(0.2, 'sc-brand-switch', 750)
click(0.95, { pop: 'brand' })
move(0.4, 'sc-brand-row', 450)
click(0.6, { brand: true, pop: null })
for (let i = 1; i <= 4; i += 1) after(0.24, { pills: i })
camera(0.35, 'sc-render', 1.4, 900)
move(0.1, 'sc-render', 800)
click(0.95, { busy: true })
after(0.45, (s) => ({ busy: false, ...setLib('video', { rendering: 2, seen: false })(s) }))

camera(0.5, null, 1, 1000)
move(0.1, 'sc-flap-image', 700)
click(0.85, { mode: 'image', added: null })
move(0.45, 'sc-card-i1', 550)
after(0.45, { hover: 'i1' })
move(0.2, 'sc-use-i1', 300)
click(0.45, addTemplate('image'))
after(0.3, { hover: null })
move(0.1, 'sc-card-i2', 550)
after(0.45, { hover: 'i2' })
move(0.2, 'sc-use-i2', 300)
click(0.45, addTemplate('image'))
after(0.3, { hover: null })

camera(0.2, 'sc-settings', 1.4, 1000)
move(0.2, 'sc-settings', 750)
click(0.95, { pop: 'settings' })
move(0.45, 'sc-size-45', 450)
click(0.6, { sizes: 1 })
move(0.25, 'sc-size-sq', 350)
click(0.5, { sizes: 2 })
camera(0.4, 'sc-render', 1.4, 900)
move(0.1, 'sc-render', 800)
click(0.95, { pop: null, busy: true })
after(0.45, (s) => ({ busy: false, ...setLib('image', { rendering: 4, seen: false })(s) }))

// ── 3. Get your ads ─────────────────────────────────────────────
camera(0.6, null, 1, 1000)
after(0.5, { caption: 3 })
after(0.9, (s) => ({ ...setLib('image', { rendering: 0, ready: 4, seen: false })(s), wiggle: null }))
move(0.5, 'sc-flap-library', 750)
click(1.1, (s) => ({ screen: 'library', route: 'library', ...setLib('image', { seen: true })(s) }))
after(1.6, (s) => ({ ...setLib('video', { rendering: 0, ready: 2, seen: false })(s), wiggle: 'video' }))
after(0.6, { wiggle: null })
move(0.5, 'sc-flap-video', 750)
click(1.0, (s) => ({ mode: 'video', ...setLib('video', { seen: true })(s) }))
after(3.6, {})
move(0, 'sc-home-orb', 900)
click(1.2, { screen: 'home', route: null, caption: 0 })
after(0.9, { dim: true })
after(0.6, {})

export const STEPS = steps
/** Loop length in seconds. The last step lands on the fade-out. */
export const DURATION = clock

/** Scene state at time t. */
export function stateAt(t: number): SceneState {
  let state = INITIAL
  for (const step of STEPS) {
    if (step.at > t) break
    const patch = typeof step.patch === 'function' ? step.patch(state) : step.patch
    state = { ...state, ...patch }
  }
  return state
}

/** Index of the first step after t. */
export function nextStepIndex(t: number): number {
  const index = STEPS.findIndex((step) => step.at > t)
  return index === -1 ? STEPS.length : index
}
