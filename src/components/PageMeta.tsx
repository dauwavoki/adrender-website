import { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet-async'

type PageMetaProps = {
  title: string
  description: string
  path: string
  ogType?: string
}

const SITE_ORIGIN = 'https://adrender.app'

/** Client-side head tags via react-helmet-async (updates after hydration; not SSR). */
export function PageMeta({ title, description, path, ogType = 'website' }: PageMetaProps) {
  const url = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`

  // Strip static index.html fallbacks so Helmet owns a single description/og/canonical set.
  useLayoutEffect(() => {
    document.querySelectorAll('[data-static-fallback]').forEach((el) => el.remove())
  }, [])

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
