import { bk, INITIAL_KIT, makeStory, type Script } from '../engine/story'
import { desktopTemplatesAndAds } from './desktopParts'
import { phoneTemplatesAndAds } from './phoneParts'
import { noteIndex, type NoteKey } from './adNotes'

/** The real brand page: type the website, Scan, and the profile and products fill in. */
function scanBrand(s: Script, phone: boolean, note?: (key: NoteKey) => void) {
  const say = (key: NoteKey) => note?.(key)
  say('start')
  s.move(phone ? 1.4 : 0.3, 'kit-add', phone ? 700 : 900)
  s.click(1.0, { screen: 'kit', bk: INITIAL_KIT, scroll: 0, scrollMs: 0 })
  say('web')
  s.move(0.5, 'kit-web-url', 800)
  s.click(0.8, {})
  for (let i = 1; i <= 'yourbrand.com'.length; i += 1) s.after(i === 1 ? 0.25 : 0.085, bk({ web: 'yourbrand.com'.slice(0, i) }))
  say('scan')
  s.move(0.3, 'kit-web-scan', 500)
  s.click(0.6, bk({ scan: 1 }))
  if (phone) s.hideCursor(0.2)
  s.after(0.9, bk({ scan: 2 }))
  if (note) {
    // Point at what is filling in, so the camera shows it.
    say('fill')
    s.move(0.1, 'kit-name', 800)
    s.after(0.6, bk({ scan: 3 }))
    s.move(0.1, 'kit-voice', 800)
    s.after(1.5, bk({ scan: 4 }))
    s.after(0.1, { scroll: 'sc-products', scrollMs: 1100 })
    say('products')
    s.move(0.3, 'sc-products', 900)
  } else {
    s.after(0.7, bk({ scan: 3 }))
    s.after(1.6, bk({ scan: 4 }))
    s.after(0.1, { scroll: 'sc-products', scrollMs: 1100 })
  }
  s.after(0.6, bk({ scan: 5 }))
  s.after(0.5, bk({ scan: 6 }))
  s.after(0.5, bk({ scan: 7 }))
  s.after(1.0, bk({ scan: 8 }))
  s.after(1.2, {})
}

/**
 * Desktop intro: Brands & Campaigns → add a brand → scan its website →
 * the profile fills in → templates → ads. `ad` adds the TikTok hook and end card.
 */
/** Ad windows show the 1280×800 app inside a smaller window; 1 app pixel = this many window pixels at camera zoom 1. */
export const AD_TALL_VIEW = { w: 540, h: 960 }
export const AD_WIDE_VIEW = { w: 960, h: 540 }

function introDesktop(s: Script, ad: boolean, tall = false) {
  if (ad) {
    s.after(0, { ad: 'hook' })
    s.after(2.6, { ad: null })
  } else {
    s.after(0, {})
    s.after(0.6, { caption: 1 })
  }
  const note = ad ? (key: NoteKey) => s.after(0, { caption: noteIndex(key) }) : undefined
  scanBrand(s, false, note)

  desktopTemplatesAndAds(s, { find: 2, get: 3 }, note, tall)

  if (ad) {
    s.after(5.2, { ad: 'cta', caption: 0 })
    s.after(4.2, { dim: true })
    s.after(0.6, {})
  } else {
    s.after(5.6, { dim: true })
    s.after(0.6, {})
  }
}

const desktopStart = {
  screen: 'kitlist' as const,
  cockpitOpen: false,
  cursor: { target: { x: 760, y: 360 }, ms: 0, down: false },
}

export const INTRO_DESKTOP = makeStory((s) => {
  s.pace = 1.45
  introDesktop(s, false)
}, {
  initial: desktopStart,
  stillWhen: (state) => state.screen === 'library',
})

/** Same story as the desktop intro, as an ad: hook, big captions, end card. The camera follows the cursor. */
export const AD_TALL = makeStory((s) => {
  s.pace = 1.45
  introDesktop(s, true, true)
}, {
  initial: { ...desktopStart, ad: 'hook' },
  stillWhen: (state) => state.screen === 'library',
})

export const AD_WIDE = makeStory((s) => {
  s.pace = 1.45
  introDesktop(s, true)
}, {
  initial: { ...desktopStart, ad: 'hook' },
  stillWhen: (state) => state.screen === 'library',
})

/** Phone intro: Brands tab → + Add → scan → profile fills in → templates → ads. */
export const INTRO_PHONE = makeStory(
  (s) => {
    s.pace = 1.45
    s.after(0, {})
    s.after(0.4, { caption: 1 })
    scanBrand(s, true)
    phoneTemplatesAndAds(s, { find: 2, get: 3 })
    s.after(5.4, { dim: true })
    s.after(0.6, {})
  },
  {
    initial: { screen: 'kitlist', cursor: { target: { x: 200, y: 420 }, ms: 0, down: false } },
    stillWhen: (state) => state.screen === 'library',
  },
)
