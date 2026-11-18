/**
 * Scene state and the story builder shared by every showcase.
 * A story is a list of timed patches. The player folds every patch up to
 * "now", so any moment can be shown exactly (?showcase-t=12.5 freezes it).
 */

export type Screen = 'home' | 'brands' | 'brand' | 'browse' | 'library'
export type Mode = 'image' | 'video'

/** A named element (data-sc="name") or a point in app coordinates. */
export type Target = string | { x: number; y: number }

export type LibState = { rendering: number; ready: number; seen: boolean }

/** Phone bottom sheets. */
export type Sheet = 'cockpit' | 'brand' | 'settings' | null

/** Ad overlays (TikTok version only). */
export type AdCard = 'hook' | 'step' | 'cta' | null

export type SceneState = {
  screen: Screen
  mode: Mode
  /** Page scroll, by element name or 0. */
  scroll: Target | 0
  scrollMs: number
  camera: { target: Target | null; zoom: number; ms: number }
  cursor: { target: Target; ms: number; down: boolean; hidden?: boolean }
  /** Bumps on every click. The cursor draws the rings where it is. */
  click: number
  caption: number
  /** Whole-window fade at the loop seam. */
  dim: boolean

  // Brand creation
  /** Phone Home: the folded "Create a brand or campaign" card is open. */
  createOpen: boolean
  urlFocus: boolean
  url: string
  scanBusy: boolean
  /** 0 empty · 1 scanning · 2 name + logo · 3–7 colors · 8 voice + audience · 9–12 products · 13 done */
  brandStage: number

  // Cockpit
  cockpitOpen: boolean
  sheet: Sheet
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

  // Ad overlays
  ad: AdCard
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
  createOpen: false,
  urlFocus: false,
  url: '',
  scanBusy: false,
  brandStage: 0,
  cockpitOpen: true,
  sheet: null,
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
  ad: null,
}

export type Patch = Partial<SceneState> | ((state: SceneState) => Partial<SceneState>)
export type Step = { at: number; patch: Patch }

export type Story = {
  steps: Step[]
  initial: SceneState
  /** Loop length in seconds. */
  duration: number
  /** Frame shown to visitors who prefer reduced motion. */
  stillAt: number
  stateAt: (t: number) => SceneState
}

/** Builds a story. Times are seconds from the previous step; a negative wait schedules ahead. */
export class Script {
  clock = 0
  steps: Step[] = []

  after(seconds: number, patch: Patch) {
    this.clock += seconds
    this.steps.push({ at: Math.round(this.clock * 1000) / 1000, patch })
  }

  move(seconds: number, target: Target, ms: number) {
    this.after(seconds, (s) => ({ cursor: { ...s.cursor, target, ms, hidden: false } }))
  }

  /** Press, then release 120ms later. The rings start on press. */
  click(seconds: number, patch: Patch = {}) {
    this.after(seconds, (s) => ({ cursor: { ...s.cursor, down: true }, click: s.click + 1 }))
    this.after(0.12, (s) => ({ cursor: { ...s.cursor, down: false }, ...(typeof patch === 'function' ? patch(s) : patch) }))
  }

  camera(seconds: number, target: Target | null, zoom: number, ms: number) {
    this.after(seconds, { camera: { target, zoom, ms } })
  }

  type(seconds: number, text: string, perChar: number) {
    for (let i = 1; i <= text.length; i += 1) {
      this.after(i === 1 ? seconds : perChar, { url: text.slice(0, i) })
    }
  }

  hideCursor(seconds: number) {
    this.after(seconds, (s) => ({ cursor: { ...s.cursor, hidden: true } }))
  }
}

export function addTemplate(mode: Mode) {
  return (s: SceneState): Partial<SceneState> => {
    const count = s.templates[mode] + 1
    return {
      templates: { ...s.templates, [mode]: count },
      added: { text: `Added · ${count} ${count === 1 ? 'template' : 'templates'}`, key: s.click },
    }
  }
}

export function setLib(mode: Mode, next: Partial<LibState>) {
  return (s: SceneState): Partial<SceneState> => ({ lib: { ...s.lib, [mode]: { ...s.lib[mode], ...next } } })
}

export function fold(initial: SceneState, steps: Step[], t: number): SceneState {
  let state = initial
  for (const step of steps) {
    if (step.at > t) break
    const patch = typeof step.patch === 'function' ? step.patch(state) : step.patch
    state = { ...state, ...patch }
  }
  return state
}

/**
 * Make a story. `stillWhen` picks the reduced-motion frame: the first step
 * where it is true, plus 1.5 seconds.
 */
export function makeStory(
  build: (script: Script) => void,
  options: { initial?: Partial<SceneState>; stillWhen?: (state: SceneState) => boolean } = {},
): Story {
  const script = new Script()
  build(script)
  const initial = { ...INITIAL, ...options.initial }
  // A negative wait schedules a step ahead of later ones, so order by time (stable).
  const steps = [...script.steps].sort((a, b) => a.at - b.at)
  const stateAt = (t: number) => fold(initial, steps, t)
  const when = options.stillWhen
  const still = when ? steps.find((step) => when(stateAt(step.at))) : undefined
  return {
    steps,
    initial,
    duration: Math.max(script.clock, steps[steps.length - 1]?.at ?? 0),
    stillAt: still ? still.at + 1.5 : 0,
    stateAt,
  }
}
