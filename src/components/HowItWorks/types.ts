export interface Brand {
  id: string
  name: string
  url: string
  category: string
  tagline: string
  logoPlaceholder: string
  swatches: string[]
  products: {
    id: string
    name: string
    placeholderLabel: string
    statLabel: string
  }[]
  adCount: number
}

export interface Template {
  id: string
  name: string
  category: string
  badge: string
  placeholderLabel: string
  description: string
  aspectRatio: string
}

export interface FinalAd {
  id: string
  title: string
  headline: string
  ctaText: string
  bgGradient: string
  placeholderLabel: string
  resolution: string
  adSize: string
}

export type StepNumber = 1 | 2 | 3
