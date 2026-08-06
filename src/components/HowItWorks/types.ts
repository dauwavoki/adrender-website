export interface DemoBrand {
  name: string
  url: string
  category: string
  logoPlaceholder: string
  swatches: string[]
  products: {
    id: string
    name: string
    placeholderLabel: string
  }[]
  documentCount: number
}

export interface CarouselPlaceholder {
  id: string
  label: string
  /** Tailwind gradient classes for the placeholder face */
  tone: string
}

export type StepNumber = 1 | 2 | 3
