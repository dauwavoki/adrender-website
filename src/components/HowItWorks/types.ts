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

export type CarouselMediaKind = 'image' | 'video'

export interface CarouselItem {
  id: string
  src: string
  alt: string
  /** Defaults to `'image'` when omitted so existing PNG items stay unchanged. */
  kind?: CarouselMediaKind
}

export type StepNumber = 1 | 2 | 3
