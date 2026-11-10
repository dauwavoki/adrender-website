import { getSiteImage } from '../../data/imageManifest'
import { cx } from './cx'

type SitePlaceholderProps = {
  id: string
  className?: string
  alt?: string
  priority?: boolean
}

export function SitePlaceholder({ id, className, alt, priority = false }: SitePlaceholderProps) {
  const entry = getSiteImage(id)
  if (entry.src) {
    return (
      <img
        src={entry.src}
        alt={alt ?? ''}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={cx('site-media-photo', className)}
        style={{ aspectRatio: `${entry.width} / ${entry.height}` }}
      />
    )
  }

  return (
    <div
      className={cx('site-placeholder stage-fill', className)}
      style={{ aspectRatio: `${entry.width} / ${entry.height}` }}
    >
      <span>
        Image {entry.id} · {entry.label} · {entry.width}×{entry.height}
      </span>
    </div>
  )
}
