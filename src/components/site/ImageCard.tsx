import type { ReactNode } from 'react'
import { TextLink } from './Buttons'

type ImageCardProps = {
  media: ReactNode
  kicker?: string
  title: string
  sub?: string
  body: string
  href?: string
  linkLabel?: string
}

export function ImageCard({ media, kicker, title, sub, body, href, linkLabel = 'Learn more' }: ImageCardProps) {
  return (
    <article className="site-image-card">
      <div className="site-image-card-media">
        {media}
        {kicker ? <span className="site-image-card-label">{kicker}</span> : null}
      </div>
      {kicker ? <p className="site-kicker">{kicker}</p> : null}
      <h3 className="site-h3">{title}</h3>
      {sub ? <p className="site-image-card-sub">{sub}</p> : null}
      <p>{body}</p>
      {href ? <TextLink href={href}>{linkLabel}</TextLink> : null}
    </article>
  )
}
