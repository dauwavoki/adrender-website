/**
 * Read blog markdown for build-time RSS and llms.txt.
 * Sitemap route discovery stays in site-urls.mjs.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { ROOT } from './site-urls.mjs'

export const FEATURE_TAG = 'New feature'

/** @param {unknown} value */
function asDateString(value) {
  if (typeof value === 'string') return value.slice(0, 10)
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  return undefined
}

/** @param {unknown} value */
function asString(value) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed || undefined
}

/** @param {unknown} value */
function asTags(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

/**
 * @returns {{
 *   title: string,
 *   slug: string,
 *   description: string,
 *   publishedDate: string,
 *   updatedDate?: string,
 *   tags: string[],
 *   coverScene?: string,
 *   coverImage?: string,
 * }[]}
 */
export function readBlogPosts() {
  const dir = path.join(ROOT, 'src/content/blog')
  if (!fs.existsSync(dir)) return []

  const posts = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data } = matter(raw)
      const title = asString(data.title)
      const slug = asString(data.slug)
      const description = asString(data.description)
      const publishedDate = asDateString(data.publishedDate)
      const updatedDate = asDateString(data.updatedDate)
      if (!title || !slug || !description || !publishedDate) {
        throw new Error(`Blog post ${file} missing required frontmatter (title, slug, description, publishedDate)`)
      }
      return {
        title,
        slug,
        description,
        publishedDate,
        updatedDate,
        tags: asTags(data.tags),
        coverScene: asString(data.coverScene),
        coverImage: asString(data.coverImage),
      }
    })

  posts.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
  return posts
}

/** @param {{ tags: string[] }} post */
export function isNewFeature(post) {
  return post.tags.some((tag) => tag.toLowerCase() === FEATURE_TAG.toLowerCase())
}
