import fs from 'node:fs'
import path from 'node:path'
import { SITE_ORIGIN, ROOT, getAllRoutes, getBlogPostsMeta, getComparisonSlugs } from './site-urls.mjs'

/**
 * @param {string} route
 * @returns {{ changefreq: string, priority: string, lastmod?: string }}
 */
function metaForRoute(route) {
  if (route === '/') return { changefreq: 'weekly', priority: '1.0' }
  if (route === '/affiliates') return { changefreq: 'monthly', priority: '0.7' }
  if (route === '/contact') return { changefreq: 'monthly', priority: '0.5' }
  if (route === '/blog') return { changefreq: 'weekly', priority: '0.7' }
  if (route.startsWith('/blog/')) {
    const slug = route.slice('/blog/'.length)
    const post = getBlogPostsMeta().find((p) => p.slug === slug)
    const lastmod = post?.updatedDate ?? post?.publishedDate
    return { changefreq: 'monthly', priority: '0.6', lastmod }
  }
  if (getComparisonSlugs().some((s) => route === `/vs-${s}`)) {
    return { changefreq: 'monthly', priority: '0.9' }
  }
  return { changefreq: 'monthly', priority: '0.5' }
}

export function generateSitemap(outDir = path.join(ROOT, 'dist')) {
  const routes = getAllRoutes()
  const urls = routes
    .map((route) => {
      const loc = route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`
      const { changefreq, priority, lastmod } = metaForRoute(route)
      const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
      return `  <url>
    <loc>${loc}</loc>${lastmodLine}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'sitemap.xml')
  fs.writeFileSync(outPath, xml)
  console.log(`[sitemap] Wrote ${routes.length} URLs → ${outPath}`)
  return outPath
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-sitemap.mjs')) {
  generateSitemap()
}
