import { INITIAL_KIT, addTemplate, makeStory, noTag, setLib, tag } from '../engine/story'
import { K, helpers, typeKit } from './kit'

const kitStart = (phone: boolean) =>
  phone
    ? { screen: 'kit' as const, cursor: { target: { x: 60, y: 120 }, ms: 0, down: false } }
    : { screen: 'kit' as const, cockpitOpen: false, cursor: { target: { x: 70, y: 40 }, ms: 0, down: false } }

/** The brand-page scan, shared by "brand from website" and "must-do setup". Ends with products listed. */
function scanWebsite(s: import('../engine/story').Script, phone: boolean) {
  const { point, press, scrollTo } = helpers(s, phone)
  point('kit-web-url', 'bottom', 'Type your website address', 1.2)
  press({ focus: null })
  typeKit(s, 'web', 'yourbrand.com', 0.085)
  s.after(0.3, {})
  s.move(0.1, 'kit-web-scan', 600)
  press(K({ scan: 1 }, { tag: null }))
  s.after(0.9, K({ scan: 2 }))
  s.after(0.7, K({ scan: 3 }))
  s.after(0.6, tag('kit-banner', 'bottom', 'Name, logo, voice, colors and audience fill in on their own'))
  s.after(3.4, K({ scan: 4 }, { tag: null }))
  scrollTo('sc-products', 1100)
  s.after(0.6, K({ scan: 5 }))
  s.after(0.6, K({ scan: 6 }))
  s.after(0.6, K({ scan: 7 }))
  s.after(1.2, K({ scan: 8 }))
}

/* ── Create a brand from your website, fast ─────────────────── */

function brandFromWebsite(s: import('../engine/story').Script, phone: boolean) {
  const { point, note, scrollTo } = helpers(s, phone)
  s.after(0.6, tag('sc-brand-top', 'bottom', 'Create a full brand profile from one website address'))
  s.after(3.2, noTag)
  scanWebsite(s, phone)
  s.after(0.4, tag('kit-product-p1', 'right', 'Your products are found too, each with ad copy ready'))
  s.after(3.2, noTag)
  scrollTo('kit-name', 1000)
  s.after(0.8, {})
  point('kit-voice', phone ? 'top' : 'bottom', 'Check the voice. Edit any line you want to change', 1.6)
  note('kit-colors', phone ? 'top' : 'bottom', 'Your brand colors, picked from the site', 3.2)
  s.after(0.4, tag('sc-brand-top', 'bottom', 'You review and confirm before anything is saved. Changes save automatically'))
  s.after(3.6, noTag)
  s.after(0.4, { dim: true })
  s.after(0.6, {})
}

export const BRANDSITE_DESKTOP = makeStory((s) => brandFromWebsite(s, false), { initial: kitStart(false) })
export const BRANDSITE_PHONE = makeStory((s) => brandFromWebsite(s, true), { initial: kitStart(true) })

/* ── The cockpit ───────────────────────────────────────────── */

function cockpitDesktop(s: import('../engine/story').Script) {
  const { point, press, note } = helpers(s, false)
  // 1 · One bar on every page
  s.after(0.6, tag('sc-dock-bar', 'top', 'The cockpit: everything you need to make an ad, in one bar on every page'))
  s.after(3.6, noTag)
  point('sc-dock-bar', 'top', 'Click it to open', 1.0, 700)
  press({ cockpitOpen: true, focus: null, tag: null })
  s.after(0.8, {})
  note('sc-flap-image', 'top', 'Image or video: pick what you are making', 2.6)
  note('sc-flap-browse', 'top', 'These tabs take you to Browse Templates, Brands & Campaigns, Saved Templates and My Ads Library', 3.4)
  s.after(0, { focus: null, tag: null })

  // 2 · Add templates
  s.move(0.1, 'sc-flap-browse', 700)
  press({ screen: 'browse', route: 'browse', scroll: 0, scrollMs: 0 })
  s.after(0.4, { hover: 'i1' })
  s.move(0.1, 'sc-card-i1', 700)
  s.after(0.3, { focus: 'sc-use-i1' })
  s.after(0, tag('sc-use-i1', 'right', 'Hover a template and press Use'))
  s.move(0.2, 'sc-use-i1', 500)
  s.after(1.2, {})
  press((st) => ({ ...addTemplate('image')(st), focus: null, tag: null }))
  s.after(0.4, tag('sc-added-toast', 'right', 'It lands in the cockpit'))
  s.after(2.2, { tag: null, hover: 'i2' })
  s.move(0.1, 'sc-use-i2', 800)
  s.after(0.3, tag('sc-use-i2', 'right', 'Use becomes + Use, so you can keep adding'))
  s.after(1.4, {})
  press(addTemplate('image'))
  s.after(1.6, { hover: null, tag: null, added: null })
  point('sc-add-tile', 'right', 'Or add from here: upload, Saved Templates, My Ads Library, plus up to 5 references', 1.0, 900)
  press({ pop: 'add', focus: null })
  s.after(0.3, { focus: 'sc-add-pop' })
  s.after(3.6, { pop: null, focus: null, tag: null })

  // 3 · Brand, product, save to
  point('sc-brand-switch', 'top', 'Pick the brand or campaign', 1.2, 800)
  press({ pop: 'brand', tag: null, focus: null })
  s.move(0.3, 'sc-brand-row', 450)
  press({ brand: true, pop: null })
  for (let i = 1; i <= 5; i += 1) s.after(0.22, { pills: i })
  s.after(0.3, tag('sc-cockpit', 'top', 'Its colors, logo, ad copy and audience are added for you, and Save to follows the brand'))
  s.after(3.8, { tag: null })
  point('sc-product-switch', 'top', 'The product you always pick yourself', 1.2, 800)
  press({ pop: 'product', tag: null, focus: null })
  s.move(0.3, 'sc-product-row', 450)
  s.after(0.5, {})
  press({ product: true, pop: null })
  s.after(0.8, {})

  // 4 · Skill
  point('sc-skills', 'top', 'Skills decide what the cockpit makes. Clone rebuilds a template for your brand', 1.6, 800)
  s.after(0, { hover: null })
  s.move(0.1, 'sc-skill-info', 700)
  press({ pop: 'info', focus: 'sc-skill-tip', tag: null })
  s.after(4.4, { pop: null, focus: null })

  // 5 · Notes and Improve prompt
  point('sc-note', 'top', 'No prompt needed. The template, your brand and your product do the work', 1.0, 900)
  s.after(2.8, tag('sc-note', 'top', 'You can still add a note to tweak the result'))
  s.after(2.4, {})
  press({ focus: null, tag: null })
  const text = 'Change my product shoe to full red.'
  for (let i = 1; i <= text.length; i += 1) s.after(i === 1 ? 0.2 : 0.06, { note: text.slice(0, i) })
  s.after(0.4, {})
  point('sc-improve', 'top', 'Improve prompt turns a short note into a full creative brief', 1.2, 700)
  press({ improve: 1, focus: null, tag: null })
  s.after(2.4, { improve: 2 })
  s.after(0.2, { focus: 'sc-note' })
  s.after(3.0, { focus: null })
  point('sc-note-reset', 'top', 'Reset puts it back', 1.0, 700)
  press({ improve: 0, note: '', focus: null, tag: null })
  s.after(0.4, {})
  point('sc-history', 'bottom', 'Prompt history keeps the notes you used before', 1.0, 700)
  press({ pop: 'history', focus: null, tag: null })
  s.after(2.6, { pop: null })

  // 6 · Settings
  point('sc-settings', 'top', 'Settings: quality, resolution, sizes and how many variations', 1.2, 800)
  press({ pop: 'settings', tag: null, focus: null })
  s.after(0.5, tag('sc-set-res', 'right', 'Each resolution shows its token cost'))
  s.after(2.6, { tag: null })
  s.move(0.1, 'sc-size-45', 600)
  press({ sizes: 1 })
  s.move(0.3, 'sc-size-sq', 400)
  press({ sizes: 2 })
  s.after(0.4, tag('sc-set-var', 'right', 'Pick how many variations. The total is worked out below'))
  s.after(3.0, { tag: null })
  s.after(0, tag('sc-set-topup', 'right', 'Running low? Top up lights up right here'))
  s.after(2.6, { tag: null, pop: null })

  // 7 · Reset and Render
  s.after(0.2, { hover: 'reset' })
  point('sc-reset', 'top', 'The broom clears the cockpit to start fresh', 1.6, 800)
  s.after(0, { hover: null })
  point('sc-render', 'top', 'Render lights up once everything it needs is filled in', 1.4, 800)
  press({ busy: true, focus: null, tag: null })
  s.after(0.6, (st) => ({ busy: false, ...setLib('image', { rendering: 4, seen: false })(st) }))
  s.after(0.4, tag('sc-flap-library', 'top', 'While it works, the My Ads Library tab shows Rendering'))
  s.after(3.0, { tag: null, cockpitOpen: false })
  s.after(0.4, tag('sc-bar-status', 'top', 'Folded, the bar tells you too'))
  s.after(2.6, (st) => ({ ...setLib('image', { rendering: 0, ready: 4, seen: false })(st), mode: 'video', screen: 'browse', route: 'browse', tag: null }))
  s.after(0.3, tag('sc-bar-status', 'top', 'Done, even if you moved on to video: 4 image ads ready'))
  s.after(3.0, { tag: null })
  s.after(0, { focus: 'sc-nav-image' })
  s.after(0, tag('sc-nav-image', 'bottom', 'A dot on the icons at the top right shows it too'))
  s.after(3.2, { focus: null, tag: null })
  s.move(0.1, 'sc-nav-image', 700)
  press((st) => ({ mode: 'image' as const, screen: 'library' as const, route: 'library' as const, ...setLib('image', { seen: true })(st) }))
  s.after(0.6, tag('sc-lib-tabs', 'bottom', 'Your new ads wait in Ready'))
  s.after(3.0, noTag)
  s.after(0.4, { dim: true })
  s.after(0.6, {})
}

function cockpitPhone(s: import('../engine/story').Script) {
  const { point } = helpers(s, true)
  s.after(0.6, tag('sc-pbar', 'top', 'The cockpit: everything you need to make an ad'))
  s.after(3.2, noTag)
  s.move(0.1, 'sc-tab-browse', 650)
  s.click(0.8, { screen: 'browse', route: 'browse', scroll: 0, scrollMs: 0, tag: null })
  point('sc-mode-video', 'bottom', 'Choose image or video', 1.6, 600)
  s.click(0.5, { mode: 'video' })
  point('sc-use-v1', 'bottom', 'Tap Use on a template to add it', 1.8, 600)
  s.click(0.6, (st) => ({ ...addTemplate('video')(st), tag: null, focus: null }))
  s.after(1.6, { added: null })
  s.move(0.2, 'sc-pbar', 600)
  s.click(0.8, { sheet: 'cockpit' })
  point('sc-pbrand', 'top', 'Pick the brand. Its voice and copy are used for you', 2.0, 600)
  s.click(0.6, { sheet: 'brand', tag: null, focus: null })
  s.move(0.45, 'sc-brand-row', 450)
  s.click(0.6, { sheet: 'cockpit', brand: true })
  for (let i = 1; i <= 4; i += 1) s.after(0.24, { pills: i })
  point('sc-psettings', 'top', 'Sizes live in Settings', 1.4, 600)
  s.click(0.8, { sheet: 'settings', tag: null, focus: null })
  s.move(0.45, 'sc-psize-45', 450)
  s.click(0.6, { sizes: 1 })
  s.move(0.3, 'sc-psettings-done', 450)
  s.click(0.6, { sheet: 'cockpit' })
  point('sc-prender', 'top', 'Press Render. Your ads appear in My Ads Library when ready', 2.4, 700)
  s.click(0.6, { busy: true, tag: null, focus: null })
  s.after(0.9, { busy: false, sheet: null })
  s.after(0.4, { dim: true })
  s.after(0.6, {})
}

const cockDeskStart = { screen: 'brands' as const, cockpitOpen: false, cursor: { target: { x: 760, y: 360 }, ms: 0, down: false } }
export const COCKPIT_DESKTOP = makeStory(cockpitDesktop, { initial: cockDeskStart })
export const COCKPIT_PHONE = makeStory(cockpitPhone, {
  initial: { screen: 'brands', cursor: { target: { x: 200, y: 420 }, ms: 0, down: false } },
})

/* ── Must-do setup ─────────────────────────────────────────── */

function mustDo(s: import('../engine/story').Script, phone: boolean) {
  const { press, scrollTo, tap } = helpers(s, phone)
  s.after(0.6, tag('sc-brand-top', 'bottom', 'Four quick steps set you up so every ad comes out on brand'))
  s.after(3.4, noTag)
  s.after(0.2, tag('sc-brand-top', 'bottom', 'Step 1: add your website, then press Scan'))
  s.after(2.4, noTag)
  scanWebsite(s, phone)
  scrollTo('kit-audience', 1100)
  s.after(0.7, tag('kit-audience', phone ? 'top' : 'left', 'Step 2: pick your audience'))
  s.after(0.3, { focus: 'kit-audience' })
  s.move(0.2, 'kit-aud-Women', 800)
  s.after(1.0, {})
  press(K((k) => ({ aud: [...k.aud, 'Women'] })))
  s.move(0.2, 'kit-aud-Young adults (18–34)', 600)
  press(K((k) => ({ aud: [...k.aud, 'Young adults (18–34)'] })))
  s.after(1.6, { tag: null, focus: null })
  scrollTo('kit-negatives', 1000)
  s.after(0.8, tag('kit-negatives', phone ? 'top' : 'left', 'Step 3: add words AdRender must never use'))
  s.move(0.2, 'kit-neg-input', 800)
  s.after(1.4, { tag: null })
  press({ focus: null })
  typeKit(s, 'negDraft', 'cheap', 0.1)
  s.move(0.3, 'kit-neg-add', 500)
  press(K((k) => ({ neg: [...k.neg, 'cheap'], negDraft: '' })))
  s.after(1.8, {})
  s.after(0.4, { dim: true })
  s.after(0.5, phone
    ? { screen: 'browse', route: 'browse', mode: 'image', bk: INITIAL_KIT, scroll: 0, scrollMs: 0, sheet: null, dim: false }
    : { screen: 'browse', route: 'browse', mode: 'image', bk: INITIAL_KIT, scroll: 0, scrollMs: 0, cockpitOpen: true, dim: false })
  if (phone) {
    s.move(0.3, 'sc-pbar', 600)
    s.click(0.8, { sheet: 'cockpit' })
    s.after(0, tag('sc-pbrand', 'top', `Step 4: ${tap.toLowerCase()} the brand in the cockpit`))
    s.move(0.4, 'sc-pbrand', 600)
    s.click(1.8, { sheet: 'brand', tag: null })
    s.move(0.4, 'sc-brand-row', 450)
    s.click(0.6, { sheet: 'cockpit', brand: true })
  } else {
    s.after(0.2, tag('sc-brand-switch', 'top', 'Step 4: pick the brand in the cockpit'))
    s.move(0.4, 'sc-brand-switch', 800)
    s.click(1.8, { pop: 'brand', tag: null })
    s.move(0.4, 'sc-brand-row', 450)
    s.click(0.6, { brand: true, pop: null })
  }
  for (let i = 1; i <= 4; i += 1) s.after(0.24, { pills: i })
  s.after(0.4, tag(phone ? 'sc-pbar' : 'sc-cockpit', 'top', 'Voice, colors, audience and copy are now used for you'))
  s.after(3.6, noTag)
  s.after(0.4, { dim: true })
  s.after(0.6, {})
}

export const MUSTDO_DESKTOP = makeStory((s) => mustDo(s, false), { initial: kitStart(false) })
export const MUSTDO_PHONE = makeStory((s) => mustDo(s, true), { initial: kitStart(true) })
export const MORE_CAPTIONS = [] as const
