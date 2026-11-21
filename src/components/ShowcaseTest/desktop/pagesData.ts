import { BRAND, IMAGE_RESULTS, type Media } from '../showcaseData'
import type { SceneState } from '../engine/story'

/** The real top-up packs (same as the Pricing page). */
export const PACKS = [
  { price: 12, tokens: 100, badge: 'Smart Start' },
  { price: 30, tokens: 300, badge: '' },
  { price: 75, tokens: 900, badge: 'Popular' },
  { price: 180, tokens: 2400, badge: '' },
  { price: 400, tokens: 6000, badge: 'Best Value' },
  { price: 750, tokens: 12000, badge: 'Ultimate Savings' },
]

export const SAVED_NEW: Media = {
  id: 'saved-new',
  src: IMAGE_RESULTS[0].src,
  title: 'YourBrand · Image ad',
  niche: BRAND.name,
  days: 0,
  tint: '#7b4fd4',
  brand: BRAND.name,
}

export const COLLECTIONS = ['All ads', BRAND.name, 'Summer launch']

export function collectionCount(state: SceneState, index: number, total: number) {
  if (index === 0) return total
  if (index === 1) return total - (state.shelf >= 3 ? 2 : 0)
  return state.shelf >= 3 ? 2 : 0
}

