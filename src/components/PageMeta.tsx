import { useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet-async'

type PageMetaProps = {
  title: string
  description: string
  path: string
  ogType?: string
}

const SITE_ORIGIN = 'https://adrender.app'

function keepOne(nodes: Element[], predicate: (el: Element) => boolean) {
  const matches = nodes.filter(predicate)
  const keep = matches.at(-1) ?? nodes.at(-1)
  nodes.forEach((el) => {
    if (el !== keep) el.remove()
  })
}

/**
 * Per-route head tags. React 19 + react-helmet-async hoist new tags into <head>
 * alongside the static index.html fallbacks — so we actively dedupe after apply.
 */
export function PageMeta({ title, description, path, ogType = 'website' }: PageMetaProps) {
  const url = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`

  useLayoutEffect(() => {
    const head = document.head
    head.querySelectorAll('[data-static-fallback]').forEach((el) => el.remove())

    const titles = [...head.querySelectorAll('title')]
    keepOne(titles, (el) => el.textContent === title)

    keepOne(
      [...head.querySelectorAll('meta[name="description"]')],
      (el) => el.getAttribute('content') === description,
    )
    keepOne(
      [...head.querySelectorAll('link[rel="canonical"]')],
      (el) => el.getAttribute('href') === url,
    )
    keepOne(
      [...head.querySelectorAll('meta[property="og:type"]')],
      (el) => el.getAttribute('content') === ogType,
    )
    keepOne(
      [...head.querySelectorAll('meta[property="og:url"]')],
      (el) => el.getAttribute('content') === url,
    )
    keepOne(
      [...head.querySelectorAll('meta[property="og:title"]')],
      (el) => el.getAttribute('content') === title,
    )
    keepOne(
      [...head.querySelectorAll('meta[property="og:description"]')],
      (el) => el.getAttribute('content') === description,
    )
    keepOne(
      [...head.querySelectorAll('meta[name="twitter:title"]')],
      (el) => el.getAttribute('content') === title,
    )
    keepOne(
      [...head.querySelectorAll('meta[name="twitter:description"]')],
      (el) => el.getAttribute('content') === description,
    )
  }, [title, description, url, ogType])

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
