import { createContext } from 'react'
import { ACCOUNT } from '../showcaseData'
import type { SceneState } from './story'

/** True while the showcase is on screen and allowed to move. Videos only play then. */
export const PlayingCtx = createContext(false)

/** Layout position of el inside ancestor. Ignores transforms, so camera zoom never skews it. */
export function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

/** Video render: two template clips (9s + 12s) at 8 tokens a second, Standard 720p. */
export const VIDEO_PRICE = 168

/** Token balance as the story spends it. */
export function balanceFor(state: SceneState) {
  let balance = ACCOUNT.tokens + state.bonus
  if (state.lib.video.rendering > 0 || state.lib.video.ready > 0) balance -= VIDEO_PRICE
  if (state.lib.image.rendering > 0 || state.lib.image.ready > 0) balance -= 4
  return balance
}
