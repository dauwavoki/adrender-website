import { getBlogCover } from '../../data/blogCovers'
import { cx } from './cx'

type BlogCoverProps = {
  slug: string
  variant: 'card' | 'banner'
  title?: string
  dateTime?: string
  dateLabel?: string
  updatedLabel?: string
}

/**
 * Code-built cover. Cards are decorative. The post banner carries the page's
 * only H1; the icon, mark and topic label stay aria-hidden.
 */
export function BlogCover({ slug, variant, title, dateTime, dateLabel, updatedLabel }: BlogCoverProps) {
  const cover = getBlogCover(slug)
  const Glyph = cover.icon
  const side = cover.side === 'left' ? 'is-left' : 'is-right'

  const art = (
    <>
      <span className="blog-cover-icon">
        <Glyph weight="regular" />
      </span>
      <img className="blog-cover-mark" src="/WebApp_Main_Logo.png" alt="" width={146} height={128} />
    </>
  )

  if (variant === 'card') {
    return (
      <div className={cx('blog-cover', 'is-card', side)} data-a={cover.toneA} data-b={cover.toneB} aria-hidden="true">
        {art}
        <p className="blog-cover-label">{cover.label}</p>
      </div>
    )
  }

  return (
    <header className={cx('blog-cover', 'is-banner', side)} data-a={cover.toneA} data-b={cover.toneB}>
      <div className="blog-cover-art" aria-hidden="true">
        {art}
      </div>
      <div className="blog-cover-copy">
        <nav className="site-breadcrumb blog-cover-crumb" aria-label="Breadcrumb">
          <a href="/blog">Blog</a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{title}</span>
        </nav>
        <div className="blog-cover-text">
          <p className="blog-cover-label" aria-hidden="true">
            {cover.label}
          </p>
          <h1 className="blog-cover-title">{title}</h1>
          {dateLabel ? (
            <p className="site-meta blog-cover-date">
              <time dateTime={dateTime}>{dateLabel}</time>
              {updatedLabel ? <span> · Updated {updatedLabel}</span> : null}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  )
}
