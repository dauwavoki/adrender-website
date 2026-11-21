import { makeStory } from '../engine/story'

/** The creative ad: five scenes, 29 seconds, no cursor. Same timeline for both sizes. */
const spot = makeStory(
  (s) => {
    s.after(0, { spot: 1, caption: 1, cursor: { target: { x: 0, y: 0 }, ms: 0, down: false, hidden: true } })
    s.after(4.5, { spot: 2, caption: 2 })
    s.after(5.5, { spot: 3, caption: 3 })
    s.after(6.5, { spot: 4, caption: 4 })
    s.after(6.5, { spot: 5, caption: 5 })
    s.after(5.5, { dim: true })
    s.after(0.6, {})
  },
  { initial: { spot: 1, caption: 1, cursor: { target: { x: 0, y: 0 }, ms: 0, down: false, hidden: true } }, stillWhen: (st) => st.spot === 3 },
)

export const SPOT_WIDE = spot
export const SPOT_TALL = spot
export const SPOT_CAPTIONS = [
  'Everyone is fighting for the same scroll',
  'Winning ads leave clues',
  'Swap in your brand and product',
  'Render a dozen versions at once',
  'Try it on your own brand today',
] as const
