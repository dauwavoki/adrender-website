import { INITIAL_KIT, bk, makeStory, noTag, tag, type KitState, type SceneState, type Script, type Tag } from '../engine/story'
import { DOC_NAME, SHOP_DOMAIN } from '../desktop/kit'

/** A brand-page patch plus any extra scene fields, as one step. */
export const K = (patch: Partial<KitState> | ((kit: KitState) => Partial<KitState>), extra: Partial<SceneState> = {}) =>
  (s: SceneState): Partial<SceneState> => ({ ...bk(patch)(s), ...extra })

/** A toast at the bottom of the window. */
export const toast = (text: string, busy = false) => K((kit) => ({ toast: { text, busy, key: (kit.toast?.key ?? 0) + 1 } }))
export const noToast = K({ toast: null })

/** Type into a field of the brand page, one character at a time. */
export function typeKit(s: Script, key: 'web' | 'shopDraft' | 'impUrl' | 'negDraft' | 'kwDraft' | 'nameDraft' | 'q', text: string, perChar: number) {
  for (let i = 1; i <= text.length; i += 1) {
    s.after(i === 1 ? 0.2 : perChar, K({ [key]: text.slice(0, i) } as Partial<KitState>))
  }
}

/** A brand that already went through the website scan. */
const FILLED: Partial<KitState> = { scan: 8, web: 'yourbrand.com' }

const desktopStart = (screen: 'kit' | 'kitlist') => ({
  screen,
  cockpitOpen: false,
  cursor: { target: { x: 70, y: 40 }, ms: 0, down: false },
})
const phoneStart = (screen: 'kit' | 'kitlist') => ({
  screen,
  cursor: { target: { x: 60, y: 120 }, ms: 0, down: false },
})

/** Shared moves: light up a control, label it, glide there and rest before the click. */
export function helpers(s: Script, phone: boolean) {
  const tap = phone ? 'Tap' : 'Click'
  const point = (anchor: string, side: Tag['side'], text: string, hold = 1.6, ms = 1000) => {
    s.after(0.15, { focus: anchor })
    s.after(0, tag(anchor, side, text))
    s.move(0.25, anchor, ms)
    s.after(hold, {})
  }
  const press = (patch: Parameters<Script['click']>[1] = {}) => s.click(0.1, patch)
  /** Show something without moving the cursor. */
  const note = (anchor: string, side: Tag['side'], text: string, hold = 3.2, focus = true) => {
    s.after(0.15, focus ? { focus: anchor } : {})
    s.after(0, tag(anchor, side, text))
    s.after(hold, {})
  }
  const scrollTo = (anchor: string | 0, ms = 1000) => s.after(0.1, { scroll: anchor, scrollMs: ms })
  return { tap, point, press, note, scrollTo }
}

/* ── Tutorial 1 · Automated ad copies ───────────────────────── */

function adCopiesFlow(s: Script, phone: boolean) {
  const { tap, point, press, scrollTo } = helpers(s, phone)

  // Intro
  s.after(0.6, tag('sc-brand-top', 'bottom', 'Automated ad copies: AdRender writes the hooks, headlines and CTAs for every product'))
  s.after(3.6, {})
  s.after(0, noTag)

  // 1 · Website scan
  point('kit-web-url', 'bottom', 'Option 1: type your website and press Scan', 1.4)
  press({ focus: null })
  typeKit(s, 'web', 'yourbrand.com', 0.085)
  s.after(0.3, {})
  s.move(0.1, 'kit-web-scan', 600)
  press(K({ scan: 1 }, { tag: null }))
  s.after(0.9, K({ scan: 2 }))
  s.after(0.7, K({ scan: 3 }))
  s.after(0.6, tag('kit-banner', 'bottom', 'Brain AI reads the site: name, logo, voice, colors and audience fill in on their own'))
  s.after(3.4, K({ scan: 4 }, { tag: null }))
  scrollTo('sc-products', 1100)
  s.after(0.6, K({ scan: 5 }))
  s.after(0.6, K({ scan: 6 }))
  s.after(0.6, K({ scan: 7 }))
  s.after(1.4, K({ scan: 8 }))
  s.after(0.5, tag('kit-product-p1', 'right', 'Every product it finds gets its own ad copy, written for you'))
  s.after(3.4, noTag)

  // 2 · Open the ad copy
  point('kit-copy-p1', 'top', `${tap} Ad copy to see what was written`, 1.4)
  press(K({ open: 'p1' }, { focus: null }))
  s.after(0.8, { scroll: 'kit-copy-p1', scrollMs: 900 })
  s.after(0.9, tag('kit-copy-panel', phone ? 'top' : 'bottom', 'Four kinds of copy: hooks, headlines, CTAs and subject lines'))
  s.after(3.6, {})
  s.after(0, { focus: 'kit-line-h1' })
  s.after(0, tag('kit-line-h1', phone ? 'bottom' : 'right', 'Each line gets a performance score out of 100, so the strongest sit on top'))
  s.move(0.2, 'kit-line-h1', 900)
  s.after(3.6, { focus: 'kit-safe-h1' })
  s.after(0, tag('kit-safe-h1', phone ? 'bottom' : 'right', 'And a safety check, so nothing off-brand slips into an ad'))
  s.move(0.2, 'kit-safe-h1', 700)
  s.after(3.4, { focus: null, tag: null })
  s.after(0.2, K({ open: null }))

  // 3 · Shopify (a fresh brand)
  s.after(0.4, { dim: true })
  s.after(0.5, { bk: INITIAL_KIT, scroll: 0, scrollMs: 0 })
  s.after(0.3, { dim: false })
  s.after(0.7, tag('kit-shopify', 'bottom', 'Option 2: sell on Shopify? Connect your store and skip the typing'))
  s.after(3.4, noTag)
  point('kit-shop-url', 'bottom', 'Type your store address', 1.2)
  press({ focus: null })
  typeKit(s, 'shopDraft', SHOP_DOMAIN, 0.06)
  s.after(0.4, {})
  s.move(0.1, 'kit-shop-connect', 700)
  press(K({ shop: 1 }, { tag: null }))
  s.after(1.1, K({ shop: 2 }))
  s.after(0.6, tag('kit-approve-dlg', phone ? 'top' : 'left', 'Shopify asks you to approve read-only access to your products'))
  s.after(3.6, {})
  s.move(0.1, 'kit-approve', 700)
  s.after(0.6, {})
  press(K({ shop: 3 }, { tag: null }))
  s.after(0.1, toast('Syncing products from Shopify…', true))
  s.after(1.8, K({ shop: 4 }))
  s.after(0, toast('Imported 4, updated 0'))
  scrollTo('sc-products', 1100)
  s.after(2.0, noToast)
  s.after(0.4, K({ shop: 5 }))
  s.after(0.5, tag('kit-product-p1', 'right', 'Your real catalog arrives with ad copy already written for each product'))
  s.after(3.6, noTag)
  scrollTo(0, 800)
  s.after(0.9, tag('sc-brand-top', 'bottom', 'Missing brand details are filled in from your store. What you already typed is never overwritten'))
  s.after(3.8, noTag)

  // 4 · Documents
  scrollTo('kit-docs', 1100)
  s.after(0.8, tag('kit-docs', phone ? 'top' : 'right', 'Have a brand guide or product sheet? Upload it for even more copy'))
  s.after(3.4, noTag)
  s.after(0.1, K({ drag: true }))
  s.move(0.1, 'kit-drop', 1000)
  s.after(0.4, tag('kit-drop', 'top', phone ? 'Choose a PDF, DOCX or TXT' : 'Drag a PDF, DOCX or TXT onto the box'))
  s.after(1.6, {})
  press(K({ drag: false, docs: 1 }, { tag: null }))
  s.after(0.6, tag('kit-files', 'top', `${DOC_NAME} is saved with the brand`))
  s.after(2.2, noTag)
  point('kit-docs-scan', 'top', `${tap} Scan documents`, 1.2)
  press(K({ docScan: 1 }, { focus: null, tag: null }))
  s.after(0.1, toast('Scanning documents…', true))
  s.after(2.4, K({ docScan: 2 }))
  s.after(0, toast('Brand or Campaign updated — 4 new assets added.'))
  s.after(0.3, { scroll: 'sc-products', scrollMs: 1100 })
  s.after(1.4, noToast)
  s.after(0.2, K({ open: 'p1' }))
  s.after(0.9, { scroll: 'kit-copy-p1', scrollMs: 900 })
  s.after(0.9, { focus: 'kit-line-dh' })
  s.after(0, tag('kit-line-dh', phone ? 'bottom' : 'right', 'New lines from your document are marked, and the lines you already had stay'))
  s.after(4.2, { focus: null, tag: null })
  s.after(0.5, tag('kit-copy-panel', phone ? 'top' : 'bottom', 'More copy to choose from, with no prompt to write. The cockpit uses it for you'))
  s.after(4.2, noTag)
  s.after(2.2, { dim: true })
  s.after(0.6, {})
}

export const ADCOPIES_DESKTOP = makeStory((s) => adCopiesFlow(s, false), {
  initial: { ...desktopStart('kit'), bk: INITIAL_KIT },
  stillWhen: (st) => st.bk.docScan >= 2,
})

export const ADCOPIES_PHONE = makeStory((s) => adCopiesFlow(s, true), {
  initial: { ...phoneStart('kit'), bk: INITIAL_KIT },
  stillWhen: (st) => st.bk.docScan >= 2,
})

/* ── Tutorial 2 · Brands and campaigns: how it works ────────── */

function brandsFlow(s: Script, phone: boolean) {
  const { tap, point, press, note, scrollTo } = helpers(s, phone)

  // 1 · The list
  s.after(0.6, tag('kit-card-k1', 'bottom', 'Brands & Campaigns: everything you advertise lives here'))
  s.after(3.4, {})
  note('kit-card-k1', 'bottom', 'A brand is your whole business', 2.8)
  note('kit-card-k2', 'bottom', 'A campaign is one product, offer or season', 3.2)
  s.after(0, { focus: null, tag: null })

  // 2 · Filters and search
  point('kit-filter', 'bottom', 'Switch between everything, only brands, or only campaigns', 1.6)
  s.move(0.1, 'kit-filter-2', 600)
  press(K({ filter: 2 }, { focus: null }))
  s.after(2.2, {})
  s.move(0.1, 'kit-filter-1', 600)
  press(K({ filter: 1 }))
  s.after(1.8, {})
  s.move(0.1, 'kit-filter-0', 600)
  press(K({ filter: 0 }))
  s.after(0.8, {})
  point('kit-search', 'bottom', 'Or search by name', 1.2)
  press({ focus: null })
  typeKit(s, 'q', 'trail', 0.28)
  s.after(2.4, {})
  s.after(0, K({ q: '' }, noTag))
  s.after(0.8, {})

  // 3 · Open a brand
  point('kit-card-k1', 'bottom', `${tap} a brand to open its page`, 1.2)
  press(K({ ...FILLED }, { screen: 'kit', focus: null, tag: null, scroll: 0, scrollMs: 0 }))
  s.after(0.9, tag('sc-brand-top', 'bottom', 'One page holds everything about the brand. Changes save on their own'))
  s.after(3.6, noTag)

  // 4 · Brand or campaign
  scrollTo('kit-kind', 1000)
  s.after(0.8, {})
  point('kit-kind', 'bottom', 'The same page works for both. Pick what you are making', 1.8)
  s.move(0.1, 'kit-kind-campaign', 600)
  press(K({ kind: 'campaign' }))
  s.after(0.4, tag('kit-kind', 'bottom', 'Campaign info: a focused page for one product or offer'))
  s.after(3.0, {})
  s.move(0.1, 'kit-kind-brand', 600)
  press(K({ kind: 'brand' }, { tag: null, focus: null }))
  s.after(0.6, {})

  // 5 · Voice
  scrollTo('kit-voice', 1000)
  s.after(0.8, {})
  note('kit-voice', 'bottom', 'Voice: how your ads should sound. Brain AI writes it from your site, and you can edit it', 3.8)

  // 6 · Audience
  s.after(0, { focus: null, tag: null })
  scrollTo('kit-audience', 1000)
  s.after(0.8, {})
  note('kit-audience', phone ? 'top' : 'left', 'Target audience: who appears in your ad images. Pick as many as you need', 3.6)
  s.move(0.1, 'kit-aud-Women', 800)
  s.after(0.5, {})
  press(K((kit) => ({ aud: ['Women', 'Young adults (18–34)', ...kit.aud.filter((item) => item !== 'Women')] })))
  s.after(0.9, {})
  s.move(0.1, 'kit-aud-Hispanic / Latino', 800)
  s.after(0.5, {})
  press(K((kit) => ({ aud: [...kit.aud, 'Hispanic / Latino'] })))
  s.after(1.6, { focus: null, tag: null })

  // 7 · Colors
  scrollTo('kit-colors', 1000)
  s.after(0.8, {})
  note('kit-colors', 'bottom', 'Colors come from your logo and site, so ads match your brand', 3.2)

  // 8 · Keywords
  s.after(0, { focus: null, tag: null })
  scrollTo('kit-keywords', 1000)
  s.after(0.8, {})
  note('kit-keywords', 'top', 'Keywords: a shortcut when you search templates. Three or fewer works best', 3.4, false)
  s.move(0.1, 'kit-kw-input', 800)
  s.after(0.3, {})
  press({ focus: null })
  typeKit(s, 'kwDraft', 'running', 0.14)
  s.after(0.5, {})
  s.after(0, K((kit) => ({ kw: [kit.kwDraft], kwDraft: '' })))
  s.after(1.8, noTag)

  // 9 · Negative words
  scrollTo('kit-negatives', 1000)
  s.after(0.8, {})
  note('kit-negatives', 'top', 'Negative words: language your brand never uses, like cheap, guaranteed or a competitor', 4.0, false)
  s.move(0.1, 'kit-neg-input', 800)
  s.after(0.3, {})
  press({ focus: null })
  typeKit(s, 'negDraft', 'guaranteed', 0.11)
  s.after(0.5, {})
  s.move(0.1, 'kit-neg-add', 600)
  press(K((kit) => ({ neg: [...kit.neg, kit.negDraft], negDraft: '' })))
  s.after(1.4, noTag)

  // 10 · The safety check catches it
  scrollTo('sc-products', 1100)
  s.after(0.8, K({ open: 'p1' }))
  s.after(0.9, { scroll: 'kit-copy-p1', scrollMs: 900 })
  s.after(0.9, { focus: 'kit-line-h2' })
  s.after(0, tag('kit-line-h2', phone ? 'bottom' : 'right', 'A line that uses a banned word is flagged by the safety check'))
  s.after(4.6, { focus: null, tag: null })
  s.after(0.4, tag('kit-copy-panel', phone ? 'top' : 'bottom', 'Brand, audience and negative words guide every ad. Set them once and every render follows them'))
  s.after(4.6, noTag)
  s.after(2.2, { dim: true })
  s.after(0.6, {})
}

export const BRANDS_DESKTOP = makeStory((s) => brandsFlow(s, false), {
  initial: { ...desktopStart('kitlist'), bk: INITIAL_KIT },
  stillWhen: (st) => st.bk.neg.length > 0,
})

export const BRANDS_PHONE = makeStory((s) => brandsFlow(s, true), {
  initial: { ...phoneStart('kitlist'), bk: INITIAL_KIT },
  stillWhen: (st) => st.bk.neg.length > 0,
})

/* ── Tutorial 3 · One product per campaign ──────────────────── */

function oneProductFlow(s: Script, phone: boolean) {
  const { tap, point, press, note, scrollTo } = helpers(s, phone)

  // 1 · Why
  s.after(0.6, tag('kit-card-k1', 'bottom', 'Want to know which product wins? Give each product its own campaign'))
  s.after(3.8, {})
  note('kit-card-k2', 'bottom', 'Each campaign keeps its own product, voice and ad copy', 3.4)
  s.after(0, { focus: null, tag: null })

  // 2 · Add a campaign
  point('kit-add', 'bottom', `${tap} Add to start a new one`, 1.4)
  press(K({ only: 'p4', kind: 'brand', web: '', scan: 0 }, { screen: 'kit', focus: null, tag: null, scroll: 0, scrollMs: 0 }))
  s.after(0.9, {})
  scrollTo('kit-kind', 1000)
  s.after(0.8, {})
  point('kit-kind-campaign', 'bottom', 'Choose Campaign info', 1.4, 900)
  press(K({ kind: 'campaign' }, { focus: null }))
  s.after(0.4, tag('kit-kind', 'bottom', 'A campaign is built around one product or offer'))
  s.after(3.0, noTag)

  // 3 · Name it
  scrollTo('kit-name', 900)
  s.after(0.7, {})
  point('kit-name', 'bottom', 'Name it after the product', 1.2)
  press({ focus: null })
  typeKit(s, 'nameDraft', 'Recovery Slides', 0.1)
  s.after(0.7, {})
  s.after(0, K((kit) => ({ name: kit.nameDraft, nameDraft: '' }), noTag))
  s.after(0.8, {})

  // 4 · Import the product
  scrollTo('sc-products', 1000)
  s.after(0.8, {})
  point('kit-import', 'bottom', 'Import the one product from its page link', 1.4)
  press(K({ imp: 1 }, { focus: null, tag: null }))
  s.after(0.7, {})
  s.move(0.1, 'kit-imp-url', 700)
  s.after(0.3, {})
  typeKit(s, 'impUrl', 'store.com/products/recovery-slides', 0.04)
  s.after(0.4, {})
  s.move(0.1, 'kit-fetch', 600)
  press(K({ imp: 2 }))
  s.after(1.5, K({ imp: 3 }))
  s.after(0.5, tag('kit-imgs', 'top', 'Pick the images to keep. The name comes from the page'))
  s.after(3.4, noTag)
  s.move(0.1, 'kit-import-go', 800)
  s.after(0.4, {})
  press(K({ imp: 4 }))
  s.after(1.0, K({ imp: 5 }))
  s.after(0.5, tag('kit-product-p4', 'bottom', 'The campaign now holds this one product'))
  s.after(2.8, K({ imp: 6 }, noTag))
  s.after(0.4, tag('kit-product-p4', 'bottom', 'Its ad copy was written just for it'))
  s.after(3.0, noTag)

  // 5 · The copy
  point('kit-copy-p4', 'top', `${tap} Ad copy to read it`, 1.2)
  press(K({ open: 'p4' }, { focus: null }))
  s.after(0.8, { scroll: 'kit-copy-p4', scrollMs: 900 })
  s.after(0.9, tag('kit-copy-panel', phone ? 'top' : 'bottom', 'Hooks, headlines, CTAs and subject lines about Recovery Slides, and nothing else'))
  s.after(4.4, noTag)
  s.after(0.2, K({ open: null }))

  // 6 · Back to the list: one campaign per product
  scrollTo(0, 800)
  s.after(0.8, {})
  s.move(0.1, 'sc-brand-top', 800)
  press(K({ made: 1, filter: 2 }, { screen: 'kitlist', scroll: 0, scrollMs: 0 }))
  s.after(0.9, tag('kit-card-m1', 'bottom', 'Your first one-product campaign'))
  s.after(2.8, noTag)
  s.after(0.4, K({ made: 2 }))
  s.after(0.8, K({ made: 3 }))
  s.after(0.7, tag('kit-card-m3', 'top', 'Repeat for every product. One campaign each'))
  s.after(3.6, {})
  s.after(0, tag(phone ? 'kit-card-m3' : 'kit-card-m1', 'bottom', 'Render ads from each campaign, then compare which product wins'))
  s.after(4.4, noTag)
  s.after(2.2, { dim: true })
  s.after(0.6, {})
}

export const ONEPRODUCT_DESKTOP = makeStory((s) => oneProductFlow(s, false), {
  initial: { ...desktopStart('kitlist'), bk: INITIAL_KIT },
  stillWhen: (st) => st.bk.made >= 3,
})

export const ONEPRODUCT_PHONE = makeStory((s) => oneProductFlow(s, true), {
  initial: { ...phoneStart('kitlist'), bk: INITIAL_KIT },
  stillWhen: (st) => st.bk.made >= 3,
})

export const KIT_CAPTIONS = [] as const
