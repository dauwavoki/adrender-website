/**
 * Write dist/blog/rss.xml from src/content/blog. Not a prerendered route.
 */
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, SITE_ORIGIN } from './site-urls.mjs'
import { readBlogPosts } from './blog-source.mjs'

/** @param {string} value */
function xml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** @param {string} isoDate */
function rfc822(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid blog date: ${isoDate}`)
  }
  return date.toUTCString()
}

/** @param {string} [outDir] */
export function generateRss(outDir = path.join(ROOT, 'dist')) {
  const posts = readBlogPosts()
  const self = `${SITE_ORIGIN}/blog/rss.xml`
  const description =
    'Notes from the AdRender team on image and video ads, Shopify creatives, and building better paid social ads.'

  const items = posts
    .map((post) => {
      const url = `${SITE_ORIGIN}/blog/${post.slug}`
      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${xml(url)}</link>
      <guid isPermaLink="true">${xml(url)}</guid>
      <pubDate>${rfc822(post.publishedDate)}</pubDate>
      <description>${xml(post.description)}</description>
    </item>`
    })
    .join('\n')

  const newest = posts[0]?.publishedDate
  const lastBuild = newest ? `\n    <lastBuildDate>${rfc822(newest)}</lastBuildDate>` : ''

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AdRender Blog</title>
    <link>${SITE_ORIGIN}/blog</link>
    <description>${xml(description)}</description>
    <language>en-us</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />${lastBuild}
${items}
  </channel>
</rss>
`

  const outPath = path.join(outDir, 'blog/rss.xml')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, rss)
  console.log(`[rss] Wrote ${posts.length} posts → ${outPath}`)
  return outPath
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-rss.mjs')) {
  generateRss()
}
