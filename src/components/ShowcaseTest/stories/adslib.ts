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
  s.after(0.6, tag('sc-lb-title', 'bottom', 'My Ads Library: every ad you make lands here'))
  s.after(3.4, {})
  point('sc-lb-tab-library', 'bottom', 'Library: the ads you have approved, ready to use', 1.6)
  press({ focus: null })
  point('sc-lb-tab-ready', 'bottom', `Ready: new renders wait here for your OK. ${tap} to open`, 1.2)
  press(L({ tab: 'ready' }, { focus: null }))
  s.after(0.5, tag('sc-lb-card-a7', phone ? 'bottom' : 'right', 'Fresh ads are marked Staged until you approve them'))
  s.after(3.0, {})
  point('sc-lb-approve-a7', phone ? 'top' : 'left', 'Approve moves an ad into your Library', 1.4, 900)
  press(L((lib) => ({ approved: [...lib.approved, 'a7'] }), { focus: null }))
  s.after(0.8, {})
  point('sc-lb-approve-all', 'bottom', 'Or approve everything waiting in one go with Approve all', 1.8, 900)
  press(L({ approved: ['a7', 'a8'] }, { focus: null, tag: null }))
  s.after(1.0, {})
  point('sc-lb-tab-rendering', 'bottom', 'Rendering: ads still being made. They move to Ready when done', 1.4)
  press(L({ tab: 'rendering' }, { focus: null }))
  s.after(3.0, {})
  point('sc-lb-tab-failed', 'bottom', 'Failed: renders that could not finish', 1.2)
  press(L({ tab: 'failed' }, { focus: null }))
  s.after(0.5, tag('sc-lb-banner', 'bottom', 'Failed alerts stay for 7 days, then clear on their own'))
  s.after(3.2, {})
  point('sc-lb-fail-f1', phone ? 'top' : 'right', 'Each alert shows when it failed. Your tokens are always refunded', 2.2, 900)
  point('sc-lb-made-f2', phone ? 'top' : 'right', 'Open What was being made? to see the brand, product, model and size', 1.2, 900)
  press(L({ made: 'f2' }, { focus: 'sc-lb-fail-f2' }))
  s.after(3.4, {})
  point('sc-lb-del-failed', 'bottom', 'Clear them all with Delete all failed, or one at a time with the bin', 1.6, 900)
  press(L({ cleared: true, made: null }, { focus: null, tag: null }))
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

  // 3 · Search, filters, grid
  point('sc-lb-search', 'bottom', 'Search by brand, product or ad copy', 1.4)
  press({ focus: null })
  typeQuery(s, 'runner', 0.3)
  s.after(0.4, tag('sc-lb-grid', 'top', 'Only matching ads stay on the page'))
  s.after(3.0, { tag: null })
  if (!phone) {
    point('sc-lb-res', 'bottom', 'Filter by resolution or size from these menus', 1.6, 900)
    s.after(0, { hover: 'reset' })
    point('sc-lb-reset', 'bottom', 'The broom (Reset view) clears your search and filters', 1.6, 900)
    press(L({ q: '' }, { focus: null, tag: null, hover: null }))
    s.after(0.8, {})
    point('sc-lb-cols', 'bottom', 'Pick how many cards sit in a row', 1.2)
    s.move(0.2, 'sc-lb-cols-3', 800)
    s.after(0.9, {})
    press(L({ cols: 3 }, { focus: null }))
    s.after(2.4, {})
    s.move(0.1, 'sc-lb-cols-4', 800)
    s.after(0.9, {})
    press(L({ cols: 4 }))
    s.after(0.9, { tag: null })
  } else {
    s.after(0, L({ q: '' }))
    s.after(0.8, {})
  }

  // 4 · Star
  point('sc-lb-star-a4', 'top', 'Star your best ads and they move to the front', 1.6)
  press(L({ starred: true }, { focus: null, tag: null }))
  s.after(1.4, { focus: 'sc-lb-card-a4' })
  s.after(0, tag('sc-lb-card-a4', phone ? 'bottom' : 'right', 'Starred ads always show first'))
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
  point('sc-lb-bar-move', 'bottom', 'Move to folder: put everything you selected in one collection', 1.8, 800)
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

  // 6 · Details: the settings it was made with, its copy, save as template, use
  point('sc-lb-media-a2', phone ? 'bottom' : 'right', `${tap} an ad to open its details`, 1.4)
  press(L({ detail: 'a2' }, { focus: null }))
  s.after(0.6, tag('sc-lb-detail', phone ? 'top' : 'left', 'Ad details shows exactly how this ad was made'))
  s.after(3.2, {})
  point('sc-lb-d-toggle', phone ? 'top' : 'left', 'Open it for the brand, product, resolution, model and sizes used', 1.4)
  press(L({ dOpen: true }, { focus: 'sc-lb-d-list' }))
  s.after(3.6, { focus: null, tag: null })
  point('sc-lb-d-copy', phone ? 'top' : 'left', 'The ad copy it used, ready to copy', 1.8, 900)
  point('sc-lb-d-save', phone ? 'top' : 'left', 'Save as template turns a winning ad into a template you can reuse', 2.0, 800)
  point('sc-lb-d-dl', phone ? 'top' : 'left', 'Download saves the finished ad to your computer', 1.6, 800)
  point('sc-lb-d-use', phone ? 'top' : 'left', 'Use sends this ad to the cockpit as your starting point', 1.6, 900)
  press(L({ detail: null, dOpen: false }, { cockpitOpen: true, focus: null }))
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
