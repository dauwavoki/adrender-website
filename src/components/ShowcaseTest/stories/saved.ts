import { makeStory, noTag, sv, tag, addSaved, type SavedState, type SceneState, type Script, type Tag } from '../engine/story'

const desktopStart = {
  screen: 'saved' as const,
  route: 'saved' as const,
  cockpitOpen: false,
  cursor: { target: { x: 70, y: 40 }, ms: 0, down: false },
}
const phoneStart = {
  screen: 'saved' as const,
  route: 'saved' as const,
  cursor: { target: { x: 60, y: 120 }, ms: 0, down: false },
}

/** A saved-page patch plus any extra scene fields, as one step. */
const P = (patch: Partial<SavedState> | ((saved: SavedState) => Partial<SavedState>), extra: Partial<SceneState> = {}) =>
  (s: SceneState): Partial<SceneState> => ({ ...sv(patch)(s), ...extra })

/** Type into a field in the saved state, one character at a time. */
function typeInto(s: Script, key: 'q' | 'draft', text: string, perChar: number) {
  for (let i = 1; i <= text.length; i += 1) {
    s.after(i === 1 ? 0.2 : perChar, sv({ [key]: text.slice(0, i) } as Partial<SavedState>))
  }
}

function savedFlow(s: Script, phone: boolean) {
  const tap = phone ? 'Tap' : 'Click'
  /** Light up a control, label it, glide there slowly and rest before the click. */
  const point = (anchor: string, side: Tag['side'], text: string, hold = 1.6, ms = 1000) => {
    s.after(0.15, { focus: anchor })
    s.after(0, tag(anchor, side, text))
    s.move(0.25, anchor, ms)
    s.after(hold, {})
  }
  const press = (patch: Parameters<Script['click']>[1] = {}) => s.click(0.1, patch)

  // 1 · Collections
  s.after(0.6, tag('sc-sv-title', 'bottom', 'Saved Templates: every template you save lives here'))
  s.after(3.4, {})
  point('sc-sv-title', 'bottom', `${tap} the title to open your collections`, 1.5)
  press(P({ menu: true }))
  s.after(0.5, { focus: 'sc-sv-menu' })
  s.after(0, tag('sc-sv-menu', phone ? 'bottom' : 'right', 'Your collection folders open from here. Create a new collection, or pick All templates to see everything at once.'))
  s.after(1.8, {})
  for (const row of ['sc-sv-new', 'sc-sv-coll-0', 'sc-sv-coll-1', 'sc-sv-coll-2']) {
    s.move(0.1, row, 700)
    s.after(1.0, {})
  }
  s.move(0.1, 'sc-sv-coll-0', 700)
  s.after(0.7, {})
  press(P({ menu: false, coll: 0 }, { focus: null, tag: null }))
  s.after(0.8, {})

  // 2 · Search
  point('sc-sv-search', 'bottom', 'Search your saved templates by brand, category or your own label', 1.4)
  press({ focus: null })
  typeInto(s, 'q', 'shoes', 0.3)
  s.after(0.4, tag('sc-sv-grid', 'top', 'Only matching templates stay on the page'))
  s.after(3.0, {})
  s.after(0, { tag: null })
  s.after(0.6, {})

  // 3 · Sizes
  point('sc-sv-size', 'bottom', 'Filter by ad size', 1.2)
  press(P({ sizeOpen: true }, { focus: 'sc-sv-size-menu' }))
  s.after(0.6, tag('sc-sv-size-menu', phone ? 'top' : 'left', 'Pick a size, like Portrait 4:5, to see only those'))
  s.move(0.5, 'sc-sv-size-45', 900)
  s.after(1.8, {})
  press(P({ sizeOpen: false, size: 1 }, { focus: null }))
  s.after(2.4, {})
  s.after(0, { tag: null })
  if (phone) {
    s.move(0.1, 'sc-sv-size', 800)
    s.after(0.5, {})
    press(P({ sizeOpen: true }))
    s.move(0.4, 'sc-sv-size-all', 800)
    s.after(0.9, {})
    press(P({ sizeOpen: false, size: 0, q: '' }))
    s.after(0.8, {})
  } else {
    // The broom puts search and filters back in one click.
    s.after(0, { hover: 'reset' })
    point('sc-sv-reset', 'bottom', 'The broom (Reset view) clears the search and filters in one click', 1.8, 1000)
    press(P({ size: 0, q: '' }, { focus: null, hover: null }))
    s.after(1.2, { tag: null })
  }

  // 4 · Grid (desktop only)
  if (!phone) {
    point('sc-sv-cols', 'bottom', 'Pick how many cards sit in a row: fewer for bigger previews, more to see more at once', 1.4)
    s.move(0.2, 'sc-sv-cols-3', 800)
    s.after(0.9, {})
    press(P({ cols: 3 }, { focus: null }))
    s.after(2.2, {})
    s.move(0.1, 'sc-sv-cols-5', 800)
    s.after(0.9, {})
    press(P({ cols: 5 }))
    s.after(2.2, {})
    s.move(0.1, 'sc-sv-cols-4', 800)
    s.after(0.9, {})
    press(P({ cols: 4 }))
    s.after(0.9, { tag: null })
  }

  // 5 · Label a template
  point('sc-sv-label-i3', 'top', `${tap} Add label to give a template your own label. You can search by it too`, 1.6)
  press(P({ editId: 'i3', editIn: 'card', draft: '' }, { focus: null }))
  typeInto(s, 'draft', 'Summer hook', 0.12)
  s.after(0.9, {})
  s.after(0, P((saved) => ({ labels: { ...saved.labels, i3: saved.draft }, editId: null, editIn: null, draft: '' })))
  s.after(2.2, { tag: null })

  // 6 · Star: the card slides to the front
  point('sc-sv-star-i4', 'top', 'Star a template and it moves to the front of the page', 1.6)
  press(P({ starred: true }, { focus: null, tag: null }))
  s.after(1.4, { focus: 'sc-sv-card-i4' })
  s.after(0, tag('sc-sv-card-i4', phone ? 'bottom' : 'right', 'Starred templates always show first'))
  s.after(3.0, { focus: null, tag: null })

  // 7 · Details
  point('sc-sv-media-i4', phone ? 'bottom' : 'right', `${tap} a template to open its details`, 1.4)
  press(P({ detail: 'i4' }, { focus: null }))
  s.after(0.6, tag('sc-sv-detail', phone ? 'top' : 'left', 'Ad details: the brand, the day you saved it, and your label'))
  s.after(3.4, {})
  point('sc-sv-d-label', phone ? 'top' : 'left', `${tap} the label to change it right here`, 1.2)
  press(P({ editId: 'i4', editIn: 'detail', draft: '' }, { focus: null }))
  typeInto(s, 'draft', 'Top winner', 0.12)
  s.after(0.8, {})
  s.after(0, P((saved) => ({ labels: { ...saved.labels, i4: saved.draft }, editId: null, editIn: null, draft: '' })))
  s.after(1.0, {})
  point('sc-sv-d-toggle', phone ? 'top' : 'left', 'Open Template details for status, days running, niche, platforms and size', 1.4)
  press(P({ dOpen: true }, { focus: 'sc-sv-d-list' }))
  s.after(3.2, { focus: null, tag: null })
  point('sc-sv-d-dl', phone ? 'top' : 'left', 'Download saves the image. Share sends a link', 1.6, 800)
  point('sc-sv-d-use', phone ? 'top' : 'left', 'Use template sends it straight to the cockpit', 1.6, 700)
  point('sc-sv-d-close', 'bottom', `${tap} X to close the details`, 1.2)
  press(P({ detail: null, dOpen: false }, { focus: null, tag: null }))
  s.after(0.9, {})

  // 8 · Select, download, move
  s.after(0.2, { hover: 'i1' })
  s.move(0.2, 'sc-sv-media-i1', 1000)
  s.after(0.3, tag('sc-sv-media-i1', 'right', phone ? 'Every template has three quick tools: select, download, move' : 'Hover a template to see its quick tools: select, download and move'))
  s.after(3.6, {})
  point('sc-sv-mv-i1', 'right', 'Move: send this template to another collection', 1.4, 800)
  press(P({ move: true }, { focus: null }))
  s.after(0.6, tag('sc-sv-move-dialog', 'right', 'Pick a collection, then Move'))
  s.after(2.6, {})
  s.move(0.1, 'sc-sv-move-cancel', 800)
  s.after(0.8, {})
  press(P({ move: false }, { tag: null }))
  s.after(0.5, { hover: 'i1' })
  point('sc-sv-dl-i1', 'right', 'Download: save just this one', 1.4, 900)
  press({})
  s.after(0.7, {})
  point('sc-sv-sel-i1', 'right', `${tap} the circle to ${phone ? 'select' : 'select'} it`, 1.4, 800)
  press(P({ sel: ['i1'] }, { focus: null }))
  s.after(0.6, tag('sc-sv-selbar', 'bottom', 'Selecting reveals the toolbar at the top'))
  s.after(3.0, {})
  point('sc-sv-bar-move', 'bottom', 'Move: put everything you selected in one collection', 1.8, 800)
  point('sc-sv-bar-new', 'bottom', 'New collection: start a fresh folder from your selection', 1.4, 700)
  press(P({ newDlg: true, collName: '' }, { focus: null }))
  s.after(0.5, tag('sc-sv-new-dialog', phone ? 'top' : 'right', 'Name it and press Create'))
  for (let i = 1; i <= 'Holiday promos'.length; i += 1) s.after(i === 1 ? 0.4 : 0.09, sv({ collName: 'Holiday promos'.slice(0, i) }))
  s.move(0.3, 'sc-sv-new-go', 800)
  s.after(0.6, {})
  press(P({ newDlg: false }, { tag: null }))
  s.after(0.6, {})
  point('sc-sv-bar-dl', 'bottom', 'Download: all selected templates in one zip', 1.8, 700)
  s.after(0, { focus: null })
  s.move(0.1, 'sc-sv-sel-i3', 900)
  s.after(0.2, { hover: 'i3' })
  s.after(0.3, tag('sc-sv-sel-i3', 'right', 'Pick just a few…'))
  press(P((saved) => ({ sel: [...saved.sel, 'i3'] })))
  s.move(0.8, 'sc-sv-sel-i4', 800)
  s.after(0.1, { hover: 'i4' })
  press(P((saved) => ({ sel: [...saved.sel, 'i4'] })))
  s.after(1.6, { hover: null })
  point('sc-sv-bar-all', 'bottom', '…or select all to act on the whole page at once', 1.6, 900)
  press(P({ sel: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'] }, { focus: null }))
  s.after(2.4, {})
  point('sc-sv-bar-x', 'bottom', `${tap} X to clear the selection`, 1.4, 800)
  press(P({ sel: [] }, { focus: null, tag: null }))
  s.after(0.9, {})

  // 9 · Use
  s.after(0.1, { hover: 'i1' })
  s.move(0.3, 'sc-sv-media-i1', 900)
  point('sc-sv-use-i1', 'top', 'Use adds the template to your cockpit', 1.4, 800)
  press(P({}, { cockpitOpen: true, focus: null }))
  s.after(0, addSaved('i1'))
  s.after(0.6, tag('sc-stack', 'top', 'The cockpit opens and your template is added'))
  s.after(3.0, { hover: 'i3' })
  s.move(0.1, 'sc-sv-use-i3', 900)
  s.after(0.4, { focus: 'sc-sv-use-i3' })
  s.after(0.9, {})
  press({ focus: null })
  s.after(0, addSaved('i3'))
  s.after(0.4, { hover: 'i4' })
  s.move(0.1, 'sc-sv-use-i4', 700)
  s.after(0.4, { focus: 'sc-sv-use-i4' })
  s.after(0.9, {})
  press({ focus: null })
  s.after(0, addSaved('i4'))
  s.after(0.4, tag('sc-stack', 'top', 'Add as many as you like'))
  s.after(2.8, { hover: null })

  // 10 · Stays in the cockpit while you browse
  const toBrowse = phone ? 'sc-tab-browse' : 'sc-flap-browse'
  point(toBrowse, 'top', 'Your templates stay in the cockpit while you move around, even in Browse Templates', 1.6)
  press({ screen: 'browse', route: 'browse', scroll: 0, scrollMs: 0, focus: null })
  s.after(2.6, { tag: null })
  s.after(0.1, { hover: 'i5' })
  s.move(0.3, 'sc-card-i5', 900)
  point('sc-use-i5', 'top', 'Add a few more from here too', 1.2, 700)
  press({ focus: null })
  s.after(0, addSaved('i5'))
  s.after(0.8, { hover: 'i6' })
  s.move(0.2, 'sc-use-i6', 800)
  s.after(0.6, { focus: 'sc-use-i6' })
  s.after(0.8, {})
  press({ focus: null })
  s.after(0, addSaved('i6'))
  s.after(1.2, { hover: null })

  // 11 · Thumbnails: side by side, then a large preview
  point('sc-stack', 'top', phone ? 'Tap the thumbnails to open them side by side' : 'Hover the thumbnails to open them side by side', 1.4, 1000)
  press(P({ stack: true }, { focus: null }))
  s.after(0.5, tag('sc-thumbstrip', 'top', 'All your templates, side by side'))
  s.after(2.8, {})
  point('sc-thumb-i3', 'top', `${tap} one for a larger preview`, 1.4, 900)
  press(P({ preview: 'i3' }, { focus: null, tag: null }))
  s.after(3.4, {})
  s.after(0, P({ preview: null, stack: false }, noTag))
  s.after(1.0, {})
  s.after(2.6, { dim: true })
  s.after(0.6, {})
}

export const SAVED_CAPTIONS = [] as const

export const SAVED_DESKTOP = makeStory((s) => savedFlow(s, false), {
  initial: desktopStart,
  stillWhen: (st) => st.sv.used.length >= 3,
})

export const SAVED_PHONE = makeStory((s) => savedFlow(s, true), {
  initial: phoneStart,
  stillWhen: (st) => st.sv.used.length >= 3,
})
