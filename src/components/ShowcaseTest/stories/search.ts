import { addTemplate, bt, makeStory, noTag, tag, type BrowseState, type SceneState, type Script, type Tag } from '../engine/story'

/* ── Find winning templates: search and filters (Browse Templates) ── */

const B = (patch: Partial<BrowseState> | ((b: BrowseState) => Partial<BrowseState>), extra: Partial<SceneState> = {}) =>
  (s: SceneState): Partial<SceneState> => ({ ...bt(patch)(s), ...extra })

function helpers(s: Script, phone: boolean) {
  const tap = phone ? 'Tap' : 'Click'
  const point = (anchor: string, side: Tag['side'], text: string, hold = 1.6, ms = 1000) => {
    s.after(0.15, { focus: anchor })
    s.after(0, tag(anchor, side, text))
    s.move(0.25, anchor, ms)
    s.after(hold, {})
  }
  const press = (patch: Parameters<Script['click']>[1] = {}) => s.click(0.1, patch)
  /** Type a search, then press Enter (filter) or Shift+Enter (add). */
  const search = (word: string, add: boolean, perChar = 0.12) => {
    const shown = add ? `+${word}` : word
    for (let i = 1; i <= shown.length; i += 1) s.after(i === 1 ? 0.25 : perChar, B({ q: shown.slice(0, i), recent: false }))
    s.after(0.6, {})
    s.after(0, B((b) => ({ q: '', chips: [...b.chips, { w: word, add }] })))
  }
  return { tap, point, press, search }
}

function searchDesktop(s: Script) {
  const { point, press, search } = helpers(s, false)

  // 1 · Sort
  s.after(0.6, tag('sc-bt-grid-area', 'top', 'Browse Templates: winning ads from brands that are running right now'))
  s.after(3.4, noTag)
  point('sc-bt-sort', 'bottom', 'Sort by Newest, Longest running or Most relevant', 1.4)
  s.move(0.1, 'sc-bt-sort-1', 600)
  press(B({ sort: 1 }, { focus: null, tag: null }))
  s.after(0.9, tag('sc-bt-grid-area', 'top', 'Longest running first: ads that kept running usually work'))
  s.after(3.0, noTag)
  point('sc-bt-active', 'bottom', 'Active only hides ads that have stopped running', 1.4, 800)
  press(B({ active: true }, { focus: null, tag: null }))
  s.after(1.2, {})

  // 2 · Search: filter, narrow, add
  point('sc-bt-search', 'bottom', 'Type a word and press Enter to filter', 1.0)
  press({ focus: null, tag: null })
  search('shoes', false)
  s.after(0.5, tag('sc-bt-chip-0', 'bottom', 'Enter makes a filter. Only matching templates stay'))
  s.after(3.2, noTag)
  search('sale', false)
  s.after(0.5, tag('sc-bt-chip-1', 'bottom', 'Each new filter word narrows it further'))
  s.after(3.2, noTag)
  search('gym', true)
  s.after(0.5, tag('sc-bt-chip-2', 'bottom', 'Shift+Enter, or +word, adds more results mixed in, and they ignore your filters'))
  s.after(4.0, noTag)
  point('sc-bt-plus', 'bottom', 'The + button does the same as typing +', 1.6, 700)
  s.after(0, { focus: null, tag: null })

  // 3 · Recent searches
  s.after(0.3, B({ chips: [], active: false, sort: 0 }))
  s.after(0.6, {})
  point('sc-bt-search', 'bottom', 'Click into the empty box to see your recent searches', 1.0)
  press(B({ recent: true }, { focus: 'sc-bt-recent', tag: null }))
  s.after(0.3, tag('sc-bt-recent', 'bottom', 'Run one again with a click'))
  s.after(2.6, {})
  s.move(0.1, 'sc-bt-recent-sports', 700)
  press(B({ recent: false, chips: [{ w: 'sports', add: false }] }, { focus: null, tag: null }))
  s.after(2.4, {})
  s.after(0, B({ chips: [] }))
  s.after(0.6, {})

  // 4 · Filters
  point('sc-bt-niche', 'bottom', 'Niche narrows it to one kind of business', 1.0, 800)
  press(B({ drop: 'niche' }, { focus: 'sc-bt-niche-menu', tag: null }))
  s.move(0.5, 'sc-bt-niche-menu-fashion', 800)
  s.after(0.8, {})
  press(B({ drop: null, niche: 'Fashion' }, { focus: null }))
  s.after(1.4, {})
  point('sc-bt-run', 'bottom', 'Run time: only ads that ran at least this long', 1.0, 800)
  press(B({ drop: 'run' }, { focus: 'sc-bt-run-menu', tag: null }))
  s.move(0.5, 'sc-bt-run-menu-90days', 800)
  s.after(0.8, {})
  press(B({ drop: null, run: '90+ days' }, { focus: null }))
  s.after(1.6, {})
  point('sc-bt-lang', 'bottom', 'Language, platforms, sizes, and B2B or B2C work the same way', 1.0, 800)
  press(B({ drop: 'lang' }, { focus: 'sc-bt-lang-menu', tag: null }))
  s.after(2.4, B({ drop: null }, { focus: null }))
  s.after(0.4, B({ niche: null, run: null }))
  s.after(0.6, {})

  // 5 · Layout
  s.after(0.1, B({ tip: 6 }))
  point('sc-bt-cols-6', 'bottom', 'Cards per row: fewer for bigger previews, more to scan fast', 1.0, 800)
  press(B({ cols: 6, tip: 0 }, { focus: null, tag: null }))
  s.after(1.6, {})
  s.move(0.1, 'sc-bt-cols-4', 600)
  press(B({ cols: 4 }))
  s.after(1.4, {})
  point('sc-bt-list', 'bottom', 'Or switch to a list', 1.0, 800)
  press(B({ list: true }, { focus: null, tag: null }))
  s.after(2.4, {})
  s.move(0.1, 'sc-bt-grid', 600)
  press(B({ list: false, cols: 5 }))
  s.after(0.8, {})

  // 6 · Brands
  s.after(0.1, { hover: 'brand-i2' })
  point('sc-brand-i2', 'bottom', 'Click a brand name to see all of its ads', 1.2, 900)
  press(B({ feed: 'Sole Theory' }, { focus: null, tag: null, hover: null }))
  s.after(0.6, tag('sc-bt-feed', 'bottom', 'Every ad from that brand, in one place'))
  s.after(3.0, noTag)
  s.move(0.1, 'sc-bt-back', 600)
  press(B({ feed: null }))
  s.after(0.6, {})
  point('sc-bt-brands-tab', 'bottom', 'The Brands tab lists the brands behind the ads', 1.0, 800)
  press(B({ tab: 'brands' }, { focus: null, tag: null }))
  s.after(0.4, tag('sc-bt-directory', 'top', 'Find a brand you like and open its ads'))
  s.after(3.0, noTag)
  s.move(0.1, 'sc-bt-community', 700)
  press(B({ tab: 'community' }))
  s.after(0.8, {})

  // 7 · Details
  point('sc-media-i7', 'right', 'Click a template to open its details', 1.2, 900)
  press(B({ detail: 'i7' }, { focus: null, tag: null }))
  s.after(0.6, {})
  point('sc-bt-d-toggle', 'left', 'Template details: status, days running, niche, platforms and size', 1.0, 800)
  press(B({ dOpen: true }, { focus: 'sc-bt-d-list' }))
  s.after(3.2, { focus: null, tag: null })
  point('sc-bt-d-save', 'left', 'Save keeps it in Saved Templates', 1.2, 700)
  press(B((b) => ({ saved: [...b.saved, 'i7'] }), { focus: null, tag: null }))
  s.after(0.8, {})
  point('sc-bt-d-use', 'left', 'Use template sends it to the cockpit', 1.2, 700)
  press((st) => ({ ...bt({ detail: null, dOpen: false })(st), ...addTemplate('image')(st), focus: null, tag: null }))
  s.after(2.4, {})

  // 8 · Video: duration
  point('sc-nav-video', 'bottom', 'Video templates have one more filter', 1.0, 900)
  press({ mode: 'video', focus: null, tag: null, added: null })
  s.after(0.6, {})
  point('sc-bt-dur', 'bottom', 'Duration: set the shortest and longest clip you want', 1.0, 800)
  press(B({ drop: 'dur' }, { focus: 'sc-bt-dur-menu', tag: null }))
  s.after(3.2, B({ drop: null }, { focus: null }))
  s.after(0.6, { dim: true })
  s.after(0.6, {})
}

function searchPhone(s: Script) {
  const { point, press, search } = helpers(s, true)
  s.after(0.6, tag('sc-ph-search', 'bottom', 'Browse: winning ads from brands that are running now'))
  s.after(3.2, noTag)
  point('sc-ph-sort-1', 'bottom', 'Sort by Longest running, Newest or Active only', 1.4, 700)
  press(B({ sort: 1 }, { focus: null, tag: null }))
  s.after(1.4, {})
  point('sc-ph-search', 'bottom', 'Type a word and press Enter to filter', 1.0)
  press({ focus: null, tag: null })
  search('shoes', false)
  s.after(0.5, tag('sc-bt-chip-0', 'bottom', 'Only matching templates stay'))
  s.after(2.8, noTag)
  search('sale', false)
  s.after(0.5, tag('sc-bt-chip-1', 'bottom', 'Each filter word narrows it further'))
  s.after(2.8, noTag)
  search('gym', true)
  s.after(0.5, tag('sc-bt-chip-2', 'bottom', 'Start a word with + to add more results, mixed in'))
  s.after(3.6, noTag)
  s.after(0.3, B({ chips: [] }))
  s.after(0.4, {})
  point('sc-ph-funnel', 'bottom', 'The filter button holds niche, run time, language and more', 1.0, 800)
  press(B({ drop: 'niche' }, { focus: 'sc-bt-niche-menu', tag: null }))
  s.move(0.5, 'sc-bt-niche-menu-fashion', 800)
  s.after(0.8, {})
  press(B({ drop: null, niche: 'Fashion' }, { focus: null }))
  s.after(2.0, {})
  s.after(0, B({ niche: null }))
  s.after(0.6, {})
  point('sc-use-i1', 'top', 'Found one? Tap Use to send it to the cockpit', 1.2, 800)
  press((st) => ({ ...addTemplate('image')(st), focus: null, tag: null }))
  s.after(2.2, {})
  s.after(0.4, { dim: true })
  s.after(0.6, {})
}

const start = { screen: 'browse' as const, route: 'browse' as const, mode: 'image' as const }

export const SEARCH_DESKTOP = makeStory(searchDesktop, {
  initial: { ...start, cockpitOpen: false, cursor: { target: { x: 640, y: 300 }, ms: 0, down: false } },
})
export const SEARCH_PHONE = makeStory(searchPhone, {
  initial: { ...start, cursor: { target: { x: 200, y: 300 }, ms: 0, down: false } },
})
