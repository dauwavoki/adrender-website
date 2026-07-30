import { getManifestEntry, placeholderSrc, type PlaceholderId } from '../data/imageManifest'

type PlaceholderImageProps = {
  id: PlaceholderId
  className?: string
  imgClassName?: string
  alt?: string
  /** Intrinsic width/height attributes for layout + retina hints */
  priority?: boolean
}

/**
 * Documented landing-image slot. Files live at `/public/placeholders/img-XX.png`
 * (see IMAGE_MANIFEST.md / imageManifest.ts).
 */
export function PlaceholderImage({
  id,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  alt,
  priority = false,
}: PlaceholderImageProps) {
  const entry = getManifestEntry(id)
  const src = placeholderSrc(id)
  const resolvedAlt = alt ?? `[IMAGE ${id}] ${entry.label}`

  return (
    <div className={`relative overflow-hidden bg-[#12121a] ${className}`}>
      <img
        src={src}
        alt={resolvedAlt}
        width={entry.width}
        height={entry.height}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        className={imgClassName}
      />
    </div>
  )
}
