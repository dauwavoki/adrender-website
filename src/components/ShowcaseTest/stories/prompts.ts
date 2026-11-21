import { addTemplate, makeStory, noTag, tag, type SceneState, type Script, type Tag } from '../engine/story'

/* ── When to use prompts (and when not to) ── */

function helpers(s: Script) {
  const point = (anchor: string, side: Tag['side'], text: string, hold = 1.6, ms = 1000) => {
    s.after(0.15, { focus: anchor })
    s.after(0, tag(anchor, side, text))
    s.move(0.25, anchor, ms)
    s.after(hold, {})
  }
  const press = (patch: Parameters<Script['click']>[1] = {}) => s.click(0.1, patch)
  const note = (anchor: string, side: Tag['side'], text: string, hold = 3.2) => {
    s.after(0.15, { focus: anchor })
    s.after(0, tag(anchor, side, text))
    s.after(hold, {})
  }
  const type = (text: string, perChar = 0.06) => {
    for (let i = 1; i <= text.length; i += 1) s.after(i === 1 ? 0.2 : perChar, { note: text.slice(0, i) })
  }
  return { point, press, note, type }
}

function promptsFlow(s: Script, phone: boolean) {
  const { point, press, note, type } = helpers(s)
  const a = phone
    ? { note: 'sc-p-note', improve: 'sc-p-improve', reset: 'sc-p-note-reset', history: 'sc-p-history', render: 'sc-prender', box: 'sc-psheet' }
    : { note: 'sc-note', improve: 'sc-improve', reset: 'sc-note-reset', history: 'sc-history', render: 'sc-render', box: 'sc-cockpit' }
  const up: Tag['side'] = phone ? 'bottom' : 'top'

  // 1 · Most ads need no prompt
  note(a.box, 'top', 'Most ads need no prompt. The template, your brand and your product do the work', 4.0)
  s.after(0, { focus: null, tag: null })
  note(a.note, up, 'Leave this empty and press Render. That is the normal way', 3.2)
  s.after(0, { focus: null, tag: null })

  // 2 · When a note helps
  point(a.note, up, 'Add a note when you want something the template does not show: a season, an offer, a mood', 1.4, 900)
  press({ focus: null, tag: null })
  type('Make it a winter sale, 30% off, snowy street.')
  s.after(0.8, {})
  note(a.note, up, 'Keep it short and plain. Say what to change, not how to draw it', 3.4)
  s.after(0, { focus: null, tag: null })

  // 3 · Improve prompt
  s.after(0.3, { note: '' })
  type('Make it a reaction video.')
  s.after(0.4, {})
  point(a.improve, phone ? 'bottom' : 'top', 'Short note? Improve prompt turns it into a full creative brief', 1.4, 800)
  press({ improve: 1, focus: null, tag: null })
  s.after(2.4, { improve: 2 })
  s.after(0.3, { focus: a.note })
  s.after(0, tag(a.note, up, 'Read it, then keep it or change any line'))
  s.after(3.6, { focus: null, tag: null })
  point(a.reset, up, 'Not what you meant? Reset puts your note back', 1.2, 700)
  press({ improve: 0, note: '', focus: null, tag: null })
  s.after(0.6, {})

  // 4 · History
  point(a.history, phone ? 'bottom' : 'bottom', 'Prompt history keeps the notes you used before, so a good one is one click away', 1.2, 700)
  press(phone ? { focus: null, tag: null } : { pop: 'history', focus: null, tag: null })
  s.after(2.8, { pop: null })

  // 5 · When not to
  note(a.render, 'top', 'Skip the prompt when the template already looks right. Fewer words, fewer surprises', 3.6)
  s.after(0, noTag)
  s.after(0.4, { dim: true })
  s.after(0.6, {})
}

const withTemplates = (st: SceneState): Partial<SceneState> => {
  const one = addTemplate('image')(st)
  const two = addTemplate('image')({ ...st, ...one } as SceneState)
  return { ...one, ...two, added: null }
}

export const PROMPTS_DESKTOP = makeStory(
  (s) => {
    s.after(0, withTemplates)
    s.after(0.1, { brand: true, pills: 5, product: true })
    promptsFlow(s, false)
  },
  {
    initial: { screen: 'browse', route: 'browse', mode: 'image', cockpitOpen: true, sizes: 1, cursor: { target: { x: 900, y: 360 }, ms: 0, down: false } },
  },
)

export const PROMPTS_PHONE = makeStory(
  (s) => {
    s.after(0, withTemplates)
    s.after(0.1, { brand: true, pills: 4, sizes: 1, sheet: 'cockpit' })
    promptsFlow(s, true)
  },
  {
    initial: { screen: 'browse', route: 'browse', mode: 'image', cursor: { target: { x: 200, y: 400 }, ms: 0, down: false } },
  },
)
