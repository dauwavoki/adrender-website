import { addTemplate, setLib, type Script } from '../engine/story'

/**
 * Phone: templates and ads. Shared by the phone hero and the phone intro.
 * Starts on any page with the tab bar showing. Ends on Library, video Ready.
 */
export function phoneTemplatesAndAds(s: Script, caption: { find: number; get: number }) {
  s.after(0.5, { caption: caption.find })
  s.move(0.2, 'sc-tab-browse', 650)
  s.click(0.8, { screen: 'browse', route: 'browse', scroll: 0, scrollMs: 0 })
  s.move(1.0, 'sc-mode-video', 550)
  s.click(0.7, { mode: 'video', added: null })
  s.move(0.45, 'sc-use-v1', 550)
  s.click(0.7, addTemplate('video'))
  s.move(0.4, 'sc-use-v2', 450)
  s.click(0.6, addTemplate('video'))
  s.after(1.4, { added: null })

  s.move(-0.8, 'sc-pbar', 600)
  s.click(0.75, { sheet: 'cockpit' })
  s.move(0.6, 'sc-pbrand', 550)
  s.click(0.7, { sheet: 'brand' })
  s.move(0.45, 'sc-brand-row', 450)
  s.click(0.6, { sheet: 'cockpit', brand: true })
  for (let i = 1; i <= 4; i += 1) s.after(0.24, { pills: i })
  s.move(0.3, 'sc-prender', 600)
  s.click(0.8, { busy: true })
  s.after(0.45, (st) => ({ busy: false, sheet: null, ...setLib('video', { rendering: 2, seen: false })(st) }))

  s.move(0.6, 'sc-mode-image', 650)
  s.click(0.8, { mode: 'image', added: null })
  s.move(0.45, 'sc-use-i1', 550)
  s.click(0.7, addTemplate('image'))
  s.move(0.4, 'sc-use-i2', 450)
  s.click(0.6, addTemplate('image'))
  s.after(1.4, { added: null })
  s.move(-0.8, 'sc-pbar', 600)
  s.click(0.75, { sheet: 'cockpit' })
  s.move(0.6, 'sc-psettings', 600)
  s.click(0.75, { sheet: 'settings' })
  s.move(0.45, 'sc-psize-45', 450)
  s.click(0.6, { sizes: 1 })
  s.move(0.25, 'sc-psize-sq', 350)
  s.click(0.5, { sizes: 2 })
  s.move(0.3, 'sc-psettings-done', 450)
  s.click(0.6, { sheet: 'cockpit' })
  s.move(0.3, 'sc-prender', 550)
  s.click(0.75, { busy: true })
  s.after(0.45, (st) => ({ busy: false, sheet: null, ...setLib('image', { rendering: 4, seen: false })(st) }))

  s.after(0.9, { caption: caption.get })
  s.after(0.9, (st) => setLib('image', { rendering: 0, ready: 4, seen: false })(st))
  s.move(0.4, 'sc-tab-library', 700)
  s.click(1.0, (st) => ({ screen: 'library', route: 'library', ...setLib('image', { seen: true })(st) }))
  s.after(1.6, (st) => setLib('video', { rendering: 0, ready: 2, seen: false })(st))
  s.move(0.6, 'sc-mode-video', 700)
  s.click(0.9, (st) => ({ mode: 'video', ...setLib('video', { seen: true })(st) }))
}
