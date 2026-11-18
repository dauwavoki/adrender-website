import { makeStory } from '../engine/story'
import { phoneTemplatesAndAds } from './phoneParts'

/** Homepage hero, phone. Same story as desktop in the phone web app. */
export const HERO_PHONE = makeStory(
  (s) => {
    s.after(0, {})
    s.after(1.3, { scroll: 'sc-use-again', scrollMs: 1400 })
    s.after(2.8, { scroll: 'sc-inspired', scrollMs: 1100 })
    s.after(2.8, { scroll: 'sc-create', scrollMs: 1100 })

    // ── 1. Create your brand or campaign ──
    s.after(1.0, { caption: 1 })
    s.move(0.2, 'sc-create-toggle', 700)
    s.click(0.85, { createOpen: true })
    s.move(0.4, 'sc-url', 500)
    s.click(0.6, { urlFocus: true })
    s.type(0.25, 'yourbrand.com', 0.085)
    s.move(0.3, 'sc-scan', 450)
    s.click(0.55, { scanBusy: true })
    s.after(0.7, {
      screen: 'brand',
      scroll: 0,
      scrollMs: 0,
      brandStage: 1,
      urlFocus: false,
      scanBusy: false,
      createOpen: false,
      cursor: { target: { x: 300, y: 520 }, ms: 0, down: false, hidden: true },
    })
    s.after(0.45, { brandStage: 2 })
    for (let i = 3; i <= 7; i += 1) s.after(0.16, { brandStage: i })
    s.after(0.3, { brandStage: 8, scroll: 'sc-setup', scrollMs: 900 })
    s.after(1.0, { scroll: 'sc-products', scrollMs: 1000 })
    for (let i = 9; i <= 12; i += 1) s.after(0.22, { brandStage: i })
    s.after(0.9, { brandStage: 13 })

    phoneTemplatesAndAds(s, { find: 2, get: 3 })

    s.after(3.4, { dim: true })
    s.after(0.6, {})
  },
  { initial: { cursor: { target: { x: 300, y: 520 }, ms: 0, down: false, hidden: true } }, stillWhen: (state) => state.screen === 'library' },
)
