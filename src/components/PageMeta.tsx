import { absoluteSiteUrl } from '../lib/site'

type PageMetaProps = {
  title: string
  description: string
  path: string
  ogType?: string
  /** Public path or absolute URL. When omitted, the site logo in index.html stays the preview image. */
  image?: string
  imageAlt?: string
}

/**
 * Per-route head tags via React 19 native document metadata.
 * Tags hoist to <head> in the browser; during SSG they are extracted from the
 * renderToString output and written into each static HTML file's <head>.
 */
export function PageMeta({ title, description, path, ogType = 'website', image, imageAlt }: PageMetaProps) {
  const url = absoluteSiteUrl(path)
  const imageUrl = image ? absoluteSiteUrl(image) : undefined

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl ? (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={imageAlt ?? title} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      ) : null}
    </>
  )
}
