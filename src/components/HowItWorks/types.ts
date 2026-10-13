export interface DemoBrand {
  name: string
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
}

export type CarouselMediaKind = 'image' | 'video'

interface CarouselItemBase {
  id: string
  alt: string
}

export interface CarouselImageItem extends CarouselItemBase {
  /** Omitted on the existing stills. */
  kind?: 'image'
  src: string
}

export interface CarouselVideoItem extends CarouselItemBase {
  kind: 'video'
  src: string
  /** First-frame still. Always shown until the clip is playing. */
  poster: string
}

export type CarouselItem = CarouselImageItem | CarouselVideoItem

export type StepNumber = 1 | 2 | 3
