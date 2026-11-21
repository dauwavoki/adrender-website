import { makeStory } from '../engine/story'
import { desktopTemplatesAndAds } from './desktopParts'

/** Homepage hero, desktop. Home → scan a URL → templates → ads → Home. About 55 seconds. */
export const HERO_DESKTOP = makeStory(
  (s) => {
    // ── Opening: Home ──
    s.after(0, {})
    s.after(1.4, { scroll: 'sc-use-again', scrollMs: 1500, cockpitOpen: false })
    s.after(3.1, { scroll: 'sc-inspired', scrollMs: 1100 })
    s.after(3.0, { scroll: 0, scrollMs: 1400 })

    // ── 1. Create your brand or campaign ──
    s.after(1.5, { caption: 1 })
    s.camera(0.1, 'sc-create', 1.75, 1100)
    s.move(0.4, 'sc-url', 900)
    s.click(1.0, { urlFocus: true })
    s.type(0.25, 'yourbrand.com', 0.085)
    s.move(0.3, 'sc-scan', 500)
    s.click(0.6, { scanBusy: true })
    s.after(0.7, {
      screen: 'brand',
      scroll: 0,
      scrollMs: 0,
      brandStage: 1,
      cockpitOpen: false,
      urlFocus: false,
      url: 'yourbrand.com',
      scanBusy: false,
      camera: { target: 'sc-banner', zoom: 1.3, ms: 0 },
      cursor: { target: { x: 1010, y: 300 }, ms: 0, down: false },
    })
    s.after(0.45, { brandStage: 2 })
    for (let i = 3; i <= 7; i += 1) s.after(0.16, { brandStage: i })
    s.after(0.3, { brandStage: 8 })
    s.camera(0.35, null, 1, 1500)
    for (let i = 9; i <= 12; i += 1) s.after(0.22, { brandStage: i })
    s.after(0.5, { scroll: 'sc-products', scrollMs: 1000 })
    s.after(1.0, { brandStage: 13 })

    // ── 2 and 3 ──
    desktopTemplatesAndAds(s, { find: 2, get: 3 })

    s.after(3.6, {})
    s.move(0, 'sc-home-orb', 900)
    s.click(1.2, { screen: 'home', route: null, caption: 0, url: '' })
    s.after(0.9, { dim: true })
    s.after(0.6, {})
  },
  { stillWhen: (state) => state.screen === 'library' },
)
