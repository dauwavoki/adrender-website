import type { SceneState } from '../engine/story'

/** Big page changes (page, mode, tab, brand feed, list view) fade and lift in. */
export function swapKey(state: SceneState) {
  const { bt, lt, sv } = state
  return [state.screen, state.mode, bt.tab, bt.feed ?? '', bt.list ? 'list' : 'grid', lt.tab, lt.coll, sv.coll, state.ptab].join('|')
}
