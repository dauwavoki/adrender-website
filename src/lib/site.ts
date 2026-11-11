export const SITE_ORIGIN = 'https://adrender.app'

/** Default link-preview image. A post with coverImage replaces it. */
export const DEFAULT_SHARE_IMAGE = `${SITE_ORIGIN}/og-image.png`

export function absoluteSiteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  if (pathOrUrl === '/') return `${SITE_ORIGIN}/`
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_ORIGIN}${path}`
}
