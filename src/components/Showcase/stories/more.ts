import { INITIAL_KIT, addTemplate, makeStory, noTag, tag } from '../engine/story'
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
  const { point } = helpers(s, false)
  s.after(0.6, tag('sc-dock-bar', 'top', 'The cockpit: everything you need to make an ad, in one bar'))
  s.after(3.4, noTag)
  s.move(0.1, 'sc-dock-bar', 700)
  s.click(0.9, { cockpitOpen: true })
  point('sc-flap-video', 'top', 'Choose image or video', 1.6, 600)
  s.click(0.4, { mode: 'video' })
  point('sc-flap-browse', 'top', 'Browse templates to start from', 1.6, 600)
  s.click(0.4, { screen: 'browse', route: 'browse', scroll: 0, scrollMs: 0 })
  s.after(0.4, { focus: 'sc-card-v1' })
  s.after(0, tag('sc-card-v1', 'right', 'Hover a template and press Use. It lands in the cockpit'))
  s.move(0.3, 'sc-card-v1', 700)
  s.after(0.4, { hover: 'v1' })
  s.move(0.2, 'sc-use-v1', 300)
  s.click(0.5, addTemplate('video'))
  s.after(2.8, { focus: null, tag: null, hover: null, added: null })
  s.after(0.2, { focus: 'sc-brand-switch' })
  s.after(0, tag('sc-brand-switch', 'top', 'Pick the brand. Its logo, voice and copy are used for you'))
  s.move(0.3, 'sc-brand-switch', 800)
  s.click(1.4, { pop: 'brand', tag: null, focus: null })
  s.move(0.4, 'sc-brand-row', 450)
  s.click(0.6, { brand: true, pop: null })
  for (let i = 1; i <= 4; i += 1) s.after(0.24, { pills: i })
  point('sc-settings', 'top', 'Sizes live in Settings', 1.4, 700)
  s.click(0.9, { pop: 'settings', tag: null, focus: null })
  s.move(0.45, 'sc-size-45', 450)
  s.click(0.6, { sizes: 1 })
  s.after(0.6, {})
  point('sc-render', 'top', 'Press Render. Your ads appear in My Ads Library when ready', 2.4, 800)
  s.click(0.6, { pop: null, busy: true, tag: null, focus: null })
  s.after(0.9, { busy: false })
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
