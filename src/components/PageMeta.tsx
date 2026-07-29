type PageMetaProps = {
  title: string
  description: string
  path: string
  ogType?: string
}

const SITE_ORIGIN = 'https://adrender.app'

/**
 * Per-route head tags via React 19 native document metadata.
 * Tags hoist to <head> in the browser; during SSG they are extracted from the
 * renderToString output and written into each static HTML file's <head>.
 */
export function PageMeta({ title, description, path, ogType = 'website' }: PageMetaProps) {
  const url = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`

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
    </>
  )
}
