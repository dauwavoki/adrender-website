/**
 * Shared route discovery for sitemap + SSG.
 * Sources of truth: static routes, src/data/comparisons.tsx slugs, src/content/blog/*.md
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '..')
export const SITE_ORIGIN = 'https://adrender.app'

/** @param {unknown} value */
function asDateString(value) {
  if (typeof value === 'string') return value.slice(0, 10)
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  return undefined
}

/** @returns {string[]} comparison URL slugs (e.g. 'canva') */
export function getComparisonSlugs() {
  const src = fs.readFileSync(path.join(ROOT, 'src/data/comparisons.tsx'), 'utf8')
  // Only top-level config entries use `slug: '...'` (helper functions use parameters).
  const slugs = [...src.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((m) => m[1])
  return [...new Set(slugs)]
}

/** @returns {{ slug: string, publishedDate: string, updatedDate?: string }[]} */
export function getBlogPostsMeta() {
  const dir = path.join(ROOT, 'src/content/blog')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data } = matter(raw)
      const slug = typeof data.slug === 'string' ? data.slug : undefined
      const publishedDate = asDateString(data.publishedDate)
      const updatedDate = asDateString(data.updatedDate)
      if (!slug || !publishedDate) {
        throw new Error(`Blog post ${file} missing required frontmatter (slug, publishedDate)`)
      }
      return { slug, publishedDate, updatedDate }
    })
}

/**
 * Every path prerendered / listed in the sitemap (leading slash, no trailing slash except home).
 * @returns {string[]}
 */
export function getAllRoutes() {
  const comparisonPaths = getComparisonSlugs().map((s) => `/vs-${s}`)
  const blogPaths = getBlogPostsMeta().map((p) => `/blog/${p.slug}`)
  return [
    '/',
    '/affiliates',
    '/contact',
    '/terms',
    '/privacy',
    ...comparisonPaths,
    '/blog',
    ...blogPaths,
  ]
}
