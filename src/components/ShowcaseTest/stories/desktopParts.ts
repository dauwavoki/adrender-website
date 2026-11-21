import type { NoteKey } from './adNotes'
import { addTemplate, setLib, type Script } from '../engine/story'

/**
 * Desktop: templates and ads. Shared by the homepage hero and the intro.
 * Starts with the cockpit folded, on any page. Ends on My Ads Library, video Ready.
 */
export function desktopTemplatesAndAds(
  s: Script,
  caption: { find: number; get: number },
  /** Ads: a caption that says what each click does. */
  note?: (key: NoteKey) => void,
  /** Tall ad: zoom out only part way, so the finished ads stay big enough to see. */
  tall = false,
) {
  const say = (key: NoteKey) => note?.(key)
  // ── Find templates ──
  if (note) s.after(0.6, {})
  else s.after(0.6, { caption: caption.find })
  say('open')
  s.move(0.2, 'sc-dock-bar', 700)
  s.click(0.85, { cockpitOpen: true })
  say('video')
  s.move(0.4, 'sc-flap-video', 550)
  s.click(0.65, { mode: 'video' })
  say('browse')
  s.move(0.3, 'sc-flap-browse', 550)
  s.click(0.65, { screen: 'browse', route: 'browse', scroll: 0, scrollMs: 0 })

  s.move(0.45, 'sc-card-v1', 550)
  say('use')
  s.after(0.45, { hover: 'v1' })
  s.move(0.2, 'sc-use-v1', 300)
  s.click(0.45, addTemplate('video'))
  s.after(0.3, { hover: null })
  s.move(0.1, 'sc-card-v2', 550)
  s.after(0.45, { hover: 'v2' })
  s.move(0.2, 'sc-use-v2', 300)
  s.click(0.45, addTemplate('video'))
  s.after(0.3, { hover: null })
  s.after(1.6, { added: null })

  if (!note) s.camera(-1.4, 'sc-brand-switch', 1.4, 1000)
  say('brand')
  s.move(0.2, 'sc-brand-switch', 750)
  s.click(0.95, { pop: 'brand' })
  s.move(0.4, 'sc-brand-row', 450)
  s.click(0.6, { brand: true, pop: null })
  for (let i = 1; i <= 4; i += 1) s.after(0.24, { pills: i })
  if (!note) s.camera(0.35, 'sc-render', 1.4, 900)
  else s.after(0.35, {})
  say('render')
  s.move(0.1, 'sc-render', 800)
  s.click(0.95, { busy: true })
  s.after(0.45, (st) => ({ busy: false, ...setLib('video', { rendering: 2, seen: false })(st) }))

  if (!note) s.camera(0.5, null, 1, 1000)
  else s.after(0.5, {})
  say('image')
  s.move(0.1, 'sc-flap-image', 700)
  s.click(0.85, { mode: 'image', added: null })
  s.move(0.45, 'sc-card-i1', 550)
  s.after(0.45, { hover: 'i1' })
  s.move(0.2, 'sc-use-i1', 300)
  s.click(0.45, addTemplate('image'))
  s.after(0.3, { hover: null })
  s.move(0.1, 'sc-card-i2', 550)
  s.after(0.45, { hover: 'i2' })
  s.move(0.2, 'sc-use-i2', 300)
  s.click(0.45, addTemplate('image'))
  s.after(0.3, { hover: null })
  s.after(1.6, { added: null })

  if (!note) s.camera(-1.4, 'sc-settings', 1.4, 1000)
  say('sizes')
  s.move(0.2, 'sc-settings', 750)
  s.click(0.95, { pop: 'settings' })
  s.move(0.45, 'sc-size-45', 450)
  s.click(0.6, { sizes: 1 })
  s.move(0.25, 'sc-size-sq', 350)
  s.click(0.5, { sizes: 2 })
  if (!note) s.camera(0.4, 'sc-render', 1.4, 900)
  else s.after(0.4, {})
  say('renderImage')
  s.move(0.1, 'sc-render', 800)
  s.click(0.95, { pop: null, busy: true })
  s.after(0.45, (st) => ({ busy: false, ...setLib('image', { rendering: 4, seen: false })(st) }))

  // ── Get your ads ──
  if (!note) {
    s.camera(0.6, null, 1, 1000)
    s.after(0.5, { caption: caption.get })
  } else s.after(1.1, {})
  s.after(0.9, (st) => ({ ...setLib('image', { rendering: 0, ready: 4, seen: false })(st), wiggle: null }))
  say('library')
  s.move(0.5, 'sc-flap-library', 750)
  // Ads zoom out here so all the finished ads are in view.
  s.click(1.1, (st) => ({ screen: 'library', route: 'library', wide: !!note, ...setLib('image', { seen: true })(st) }))
  if (note && tall) s.camera(0, 'sc-lib-grid', 1.55, 1000)
  s.after(1.6, (st) => ({ ...setLib('video', { rendering: 0, ready: 2, seen: false })(st), wiggle: 'video' }))
  s.after(0.6, { wiggle: null })
  say('libVideo')
  s.move(0.5, 'sc-flap-video', 750)
  s.click(1.0, (st) => ({ mode: 'video', ...setLib('video', { seen: true })(st) }))
  // Fold the cockpit away so the finished video ads have the whole page.
  s.after(0.9, { cockpitOpen: false })
  s.move(0.3, 'sc-ad-0', 900)
}
