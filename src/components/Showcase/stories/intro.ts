import { makeStory, type Script } from '../engine/story'
import { desktopTemplatesAndAds } from './desktopParts'
import { phoneTemplatesAndAds } from './phoneParts'

/** Brand page fill, shared by desktop and phone. Starts right after Scan is pressed. */
function fillBrand(s: Script, scrollTo: (s: Script) => void) {
  s.after(0.45, { brandStage: 2 })
  for (let i = 3; i <= 7; i += 1) s.after(0.18, { brandStage: i })
  s.after(0.35, { brandStage: 8 })
  scrollTo(s)
  for (let i = 9; i <= 12; i += 1) s.after(0.24, { brandStage: i })
  s.after(0.9, { brandStage: 13 })
}

/**
 * Desktop intro: Brands & Campaigns → add a brand → scan its website →
 * the profile fills in → templates → ads. `ad` adds the TikTok hook and end card.
 */
/** Ad windows show the 1280×800 app inside a smaller window; 1 app pixel = this many window pixels at camera zoom 1. */
export const AD_TALL_VIEW = { w: 540, h: 960 }
export const AD_WIDE_VIEW = { w: 960, h: 540 }
const baseFor = (view: { w: number; h: number }) => Math.min(view.w / 1280, view.h / 800)

function introDesktop(s: Script, ad: boolean, view = AD_TALL_VIEW) {
  const TIKTOK_BASE = baseFor(view)
  /** Desktop gets its zooms; the ad gets tighter framing on the left-aligned fields. */
  const adCam = (seconds: number, target: string | null, scale: number, ms: number) =>
    ad ? s.camera(seconds, target, scale / TIKTOK_BASE, ms) : s.after(seconds, {})
  if (ad) {
    s.after(0, { ad: 'hook' })
    s.after(2.6, { ad: null })
  } else {
    s.after(0, {})
  }
  s.after(ad ? 0.2 : 0.6, { caption: 1 })
  s.move(0.3, 'sc-add-brand', 900)
  s.click(1.1, { screen: 'brand', brandStage: 0, scroll: 0, scrollMs: 0, url: '' })
  if (ad) adCam(0.4, 'sc-scan-icon', 1.15, 900)
  else s.camera(0.4, 'sc-setup', 1.35, 1000)
  s.move(0.2, 'sc-brand-url', 800)
  s.click(1.0, { urlFocus: true })
  s.type(0.25, 'yourbrand.com', 0.085)
  adCam(0.1, 'sc-brand-scan', 1.15, 600)
  s.move(ad ? 0.2 : 0.3, 'sc-brand-scan', 500)
  s.click(0.6, { brandStage: 1, urlFocus: false })
  adCam(0.2, 'sc-name', 1.15, 700)
  s.after(-0.2, {})
  fillBrand(s, (sc) => {
    if (ad) {
      sc.camera(-1.0, 'sc-colors', 1.15 / TIKTOK_BASE, 600)
      sc.camera(1.0, 'sc-voice', 1.15 / TIKTOK_BASE, 700)
      sc.after(0.9, { scroll: 'sc-products', scrollMs: 1000 })
      sc.camera(0.1, 'sc-products', 1.0 / TIKTOK_BASE, 1000)
    } else {
      sc.camera(0.4, null, 1, 1200)
      sc.after(0.3, { scroll: 'sc-products', scrollMs: 1000 })
      sc.camera(0.1, 'sc-products', 1.2, 1000)
    }
  })
  s.camera(0.6, null, 1, 900)

  desktopTemplatesAndAds(s, { find: 2, get: 3 })

  if (ad) {
    s.after(2.6, { ad: 'cta', caption: 0 })
    s.after(4.2, { dim: true })
    s.after(0.6, {})
  } else {
    s.after(3.8, { dim: true })
    s.after(0.6, {})
  }
}

const desktopStart = {
  screen: 'brands' as const,
  cockpitOpen: false,
  cursor: { target: { x: 760, y: 360 }, ms: 0, down: false },
}

export const INTRO_DESKTOP = makeStory((s) => introDesktop(s, false), {
  initial: desktopStart,
  stillWhen: (state) => state.screen === 'library',
})

/** Same story as the desktop intro, as an ad: hook, big captions, end card. The camera follows the cursor. */
export const AD_TALL = makeStory((s) => introDesktop(s, true, AD_TALL_VIEW), {
  initial: { ...desktopStart, ad: 'hook' },
  stillWhen: (state) => state.screen === 'library',
})

export const AD_WIDE = makeStory((s) => introDesktop(s, true, AD_WIDE_VIEW), {
  initial: { ...desktopStart, ad: 'hook' },
  stillWhen: (state) => state.screen === 'library',
})

/** Phone intro: Brands tab → + Add → scan → profile fills in → templates → ads. */
export const INTRO_PHONE = makeStory(
  (s) => {
    s.after(0, {})
    s.after(0.4, { caption: 1 })
    s.move(1.6, 'sc-ph-add', 700)
    s.click(1.0, { screen: 'brand', brandStage: 0, scroll: 0, scrollMs: 0, url: '' })
    s.move(0.5, 'sc-brand-url', 600)
    s.click(0.8, { urlFocus: true })
    s.type(0.25, 'yourbrand.com', 0.085)
    s.move(0.3, 'sc-brand-scan', 450)
    s.click(0.55, { brandStage: 1, urlFocus: false })
    s.hideCursor(0.3)
    fillBrand(s, (sc) => {
      sc.after(0.2, { scroll: 'sc-setup', scrollMs: 900 })
      sc.after(1.0, { scroll: 'sc-products', scrollMs: 1000 })
    })
    phoneTemplatesAndAds(s, { find: 2, get: 3 })
    s.after(3.6, { dim: true })
    s.after(0.6, {})
  },
  {
    initial: { screen: 'brands', cursor: { target: { x: 200, y: 420 }, ms: 0, down: false } },
    stillWhen: (state) => state.screen === 'library',
  },
)
