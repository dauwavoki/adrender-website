import { makeStory, noTag, lt, tag, addSaved, type LibTutState, type SceneState, type Script, type Tag } from '../engine/story'

const desktopStart = {
  screen: 'adslib' as const,
  route: 'library' as const,
  cockpitOpen: false,
  cursor: { target: { x: 70, y: 40 }, ms: 0, down: false },
}
const phoneStart = {
  screen: 'adslib' as const,
  route: 'library' as const,
  cursor: { target: { x: 60, y: 120 }, ms: 0, down: false },
}

/** A library-page patch plus any extra scene fields, as one step. */
const L = (patch: Partial<LibTutState> | ((lib: LibTutState) => Partial<LibTutState>), extra: Partial<SceneState> = {}) =>
  (s: SceneState): Partial<SceneState> => ({ ...lt(patch)(s), ...extra })

function typeQuery(s: Script, text: string, perChar: number) {
  for (let i = 1; i <= text.length; i += 1) {
    s.after(i === 1 ? 0.2 : perChar, lt({ q: text.slice(0, i) }))
  }
}

function libraryFlow(s: Script, phone: boolean) {
  const tap = phone ? 'Tap' : 'Click'
  const point = (anchor: string, side: Tag['side'], text: string, hold = 1.6, ms = 1000) => {
    s.after(0.15, { focus: anchor })
    s.after(0, tag(anchor, side, text))
    s.move(0.25, anchor, ms)
    s.after(hold, {})
  }
  const press = (patch: Parameters<Script['click']>[1] = {}) => s.click(0.1, patch)

  // 1 · The four tabs
  s.after(0.6, tag('sc-lb-title', 'bottom', 'My Ads Library: every ad you approve is kept here'))
  s.after(3.4, {})
  point('sc-lb-tab-library', 'bottom', 'Library holds your approved ads, ready to use', 1.6)
  press({ focus: null })
  point('sc-lb-tab-ready', 'bottom', `Ready: fresh renders wait here for your OK. ${tap} to open`, 1.2)
  press(L({ tab: 'ready' }, { focus: null }))
  s.after(0.5, tag('sc-lb-approve-a7', 'left', 'Approve sends an ad into your Library'))
  s.move(0.6, 'sc-lb-approve-a7', 1000)
  s.after(1.6, { focus: 'sc-lb-approve-a7' })
  s.after(0.5, {})
  press(L((lib) => ({ approved: [...lib.approved, 'a7'] }), { focus: null }))
  s.after(0.6, {})
  point('sc-lb-approve-all', 'bottom', 'Or approve everything waiting in one go with Approve all', 1.8, 900)
  press(L({ approved: ['a7', 'a8'] }, { focus: null, tag: null }))
  s.after(1.0, {})
  point('sc-lb-tab-rendering', 'bottom', 'Rendering: ads still being made. Stuck? Cancel & refund', 1.4)
  press(L({ tab: 'rendering' }, { focus: null }))
  s.after(3.2, {})
  point('sc-lb-tab-failed', 'bottom', 'Failed: renders that did not finish', 1.2)
  press(L({ tab: 'failed' }, { focus: null }))
  s.after(0.5, tag('sc-lb-banner', 'bottom', 'Failed alerts stay for 7 days, then clear on their own'))
  s.after(3.2, {})
  point('sc-lb-retry-all', 'bottom', 'Retry all sends them back to render', 1.4, 900)
  press(L({ retried: true }, { focus: null, tag: null }))
  s.after(1.4, {})
  point('sc-lb-tab-library', 'bottom', `${tap} Library to head back`, 1.0)
  press(L({ tab: 'library' }, { focus: null, tag: null }))
  s.after(0.9, {})

  // 2 · Collections
  point('sc-lb-title', 'bottom', `${tap} the title to open your collections`, 1.5)
  press(L({ menu: true }))
  s.after(0.5, { focus: 'sc-lb-menu' })
  s.after(0, tag('sc-lb-menu', phone ? 'bottom' : 'right', 'Your collection folders open from here. Create a new collection, or pick All ads to see everything at once.'))
  s.after(1.8, {})
  for (const row of ['sc-lb-new', 'sc-lb-coll-0', 'sc-lb-coll-1', 'sc-lb-coll-2']) {
    s.move(0.1, row, 700)
    s.after(1.0, {})
  }
  s.move(0.1, 'sc-lb-coll-1', 700)
  s.after(0.5, {})
  press(L({ menu: false, coll: 1 }, { focus: null, tag: null }))
  s.after(2.2, tag('sc-lb-grid', 'top', 'Only the ads in that collection'))
  s.after(2.4, {})
  point('sc-lb-title', 'bottom', 'Back to all your ads', 1.0)
  press(L({ menu: true }, { focus: null, tag: null }))
  s.move(0.3, 'sc-lb-coll-0', 700)
  s.after(0.6, {})
  press(L({ menu: false, coll: 0 }))
  s.after(0.8, {})

  // 3 · Search, sizes, grid
  point('sc-lb-search', 'bottom', 'Search by brand, product or ad copy', 1.4)
  press({ focus: null })
  typeQuery(s, 'runner', 0.3)
  s.after(0.4, tag('sc-lb-grid', 'top', 'Only matching ads stay on the page'))
  s.after(3.0, {})
  s.after(0, L({ q: '' }, { tag: null }))
  s.after(0.8, {})
  point('sc-lb-size', 'bottom', 'Filter by ad size', 1.2)
  press(L({ sizeOpen: true }, { focus: 'sc-lb-size-menu' }))
  s.after(0.6, tag('sc-lb-size-menu', phone ? 'top' : 'left', 'Pick a size, like Portrait 4:5, to see only those'))
  s.move(0.5, 'sc-lb-size-45', 900)
  s.after(1.8, {})
  press(L({ sizeOpen: false, size: 1 }, { focus: null }))
  s.after(2.2, {})
  s.after(0, { tag: null })
  s.move(0.1, 'sc-lb-size', 800)
  s.after(0.5, {})
  press(L({ sizeOpen: true }))
  s.move(0.4, 'sc-lb-size-all', 800)
  s.after(0.9, {})
  press(L({ sizeOpen: false, size: 0 }))
  s.after(0.8, {})
  if (!phone) {
    point('sc-lb-cols', 'bottom', 'Choose your grid: 3 across for bigger previews, 4 across to see more', 1.2)
    s.move(0.2, 'sc-lb-cols-3', 800)
    s.after(0.9, {})
    press(L({ cols: 3 }, { focus: null }))
    s.after(2.6, {})
    s.move(0.1, 'sc-lb-cols-4', 800)
    s.after(0.9, {})
    press(L({ cols: 4 }))
    s.after(0.9, { tag: null })
  }

  // 4 · Star
  point('sc-lb-star-a2', 'top', 'Star your best ads and they jump to the front', 1.6)
  press(L({ starred: true }, { focus: 'sc-lb-card-a2' }))
  s.after(0.4, tag('sc-lb-card-a2', 'bottom', 'Starred ads always show first'))
  s.after(3.2, { focus: null, tag: null })

  // 5 · Hover tools and selection
  s.after(0.2, { hover: 'a1' })
  s.move(0.2, 'sc-lb-media-a1', 1000)
  s.after(0.3, tag('sc-lb-media-a1', 'right', phone ? 'Every ad has three quick tools: select, download, move' : 'Hover an ad to see its quick tools: select, download and move'))
  s.after(3.6, {})
  point('sc-lb-mv-a1', 'right', 'Move: send this ad to another collection', 1.4, 800)
  press(L({ move: true }, { focus: null }))
  s.after(0.6, tag('sc-lb-move-dialog', 'right', 'Pick a collection, then Move'))
  s.after(2.6, {})
  s.move(0.1, 'sc-lb-move-cancel', 800)
  s.after(0.8, {})
  press(L({ move: false }, { tag: null }))
  s.after(0.5, { hover: 'a1' })
  point('sc-lb-dl-a1', 'right', 'Download: save just this one', 1.4, 900)
  press({})
  s.after(0.7, {})
  point('sc-lb-sel-a1', 'right', `${tap} the circle to select it`, 1.4, 800)
  press(L({ sel: ['a1'] }, { focus: null }))
  s.after(0.6, tag('sc-lb-selbar', 'bottom', 'Selecting reveals the toolbar at the top'))
  s.after(3.0, {})
  point('sc-lb-bar-move', 'bottom', 'Move: put everything you selected in one collection', 1.8, 800)
  point('sc-lb-bar-new', 'bottom', 'New collection: start a fresh folder from your selection', 1.8, 700)
  point('sc-lb-bar-dl', 'bottom', 'Download: all selected ads in one zip', 1.8, 700)
  s.after(0, { focus: null })
  s.move(0.1, 'sc-lb-sel-a3', 900)
  s.after(0.2, { hover: 'a3' })
  s.after(0.3, tag('sc-lb-sel-a3', 'right', 'Pick just a few…'))
  press(L((lib) => ({ sel: [...lib.sel, 'a3'] })))
  s.move(0.8, 'sc-lb-sel-a4', 800)
  s.after(0.1, { hover: 'a4' })
  press(L((lib) => ({ sel: [...lib.sel, 'a4'] })))
  s.after(1.6, { hover: null })
  point('sc-lb-bar-all', 'bottom', '…or select all to act on every ad on the page', 1.6, 900)
  press(L({ sel: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'] }, { focus: null }))
  s.after(2.4, {})
  point('sc-lb-bar-x', 'bottom', `${tap} X to clear the selection`, 1.4, 800)
  press(L({ sel: [] }, { focus: null, tag: null }))
  s.after(0.9, {})

  // 6 · Details: save as template, use
  point('sc-lb-media-a2', 'right', `${tap} an ad to open its details`, 1.4)
  press(L({ detail: 'a2' }, { focus: null }))
  s.after(0.6, tag('sc-lb-detail', 'left', 'Everything about the ad: brand, product, size and status'))
  s.after(3.4, {})
  point('sc-lb-d-dl', 'left', 'Download saves the finished ad to your computer', 1.4, 800)
  point('sc-lb-d-save', 'left', 'Save as template keeps a winning ad so you can reuse its look', 1.6, 800)
  press(L({ saveDlg: true }, { focus: null }))
  s.after(0.6, tag('sc-lb-save-dialog', 'right', 'Choose a collection for the new template'))
  s.move(0.5, 'sc-lb-save-coll-1', 900)
  s.after(0.6, {})
  press(L({ saveColl: 1 }))
  s.after(0.8, {})
  point('sc-lb-save-go', 'right', 'Save, and it appears in Saved Templates', 1.2, 700)
  press(L({ saveDlg: false }, { saved: 1, focus: null, tag: null }))
  s.after(2.6, { saved: 0 })
  point('sc-lb-d-use', 'left', 'Use sends this ad to the cockpit as your starting point', 1.6, 900)
  press(L({ detail: null }, { cockpitOpen: true, focus: null }))
  s.after(0, addSaved('a2'))
  s.after(0.6, tag('sc-stack', 'top', 'The cockpit opens with your ad added. Now make something new from it'))
  s.after(3.6, {})
  s.after(0, noTag)
  s.after(2.6, { dim: true })
  s.after(0.6, {})
}

export const ADSLIB_CAPTIONS = [] as const

export const ADSLIB_DESKTOP = makeStory((s) => libraryFlow(s, false), {
  initial: desktopStart,
  stillWhen: (st) => st.sv.used.length >= 1,
})

export const ADSLIB_PHONE = makeStory((s) => libraryFlow(s, true), {
  initial: phoneStart,
  stillWhen: (st) => st.sv.used.length >= 1,
})
