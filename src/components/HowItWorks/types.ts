export interface DemoBrand {
  name: string
  url: string
  category: string
  logoSrc: string
  brandVoice: string
  swatches: string[]
  products: {
    id: string
    name: string
    imageSrc: string
    adCopyCount: number
  }[]
  documentCount: number
}

export interface CarouselItem {
  id: string
  src: string
  alt: string
}

export type StepNumber = 1 | 2 | 3
