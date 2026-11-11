import { parseFrontmatter } from '../lib/parseFrontmatter'
import { absoluteSiteUrl, DEFAULT_SHARE_IMAGE } from '../lib/site'

/** Changelog tag. One comma-separated `tags` line in frontmatter. */
export const FEATURE_TAG = 'New feature'

export type BlogPost = {
  title: string
  slug: string
  description: string
  publishedDate: string
  updatedDate?: string
  tags: string[]
  coverScene?: string
  coverImage?: string
  content: string
}

const rawModules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function optional(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function parseTags(value: string | undefined): string[] {
  if (!value) return []
  return value.split(',').map((tag) => tag.trim()).filter(Boolean)
}

function parsePost(raw: string, source: string): BlogPost {
  const { data, content } = parseFrontmatter(raw)
  const title = data.title ?? ''
  const slug = data.slug ?? ''
  const description = data.description ?? ''
  const publishedDate = data.publishedDate ?? ''
  const updatedDate = optional(data.updatedDate)

  if (!title || !slug || !description || !publishedDate) {
    throw new Error(`Invalid blog frontmatter in ${source}: title, slug, description, and publishedDate are required`)
  }

  return {
    title,
    slug,
    description,
    publishedDate,
    updatedDate,
    tags: parseTags(data.tags),
    coverScene: optional(data.coverScene),
    coverImage: optional(data.coverImage),
    content,
  }
}

export const blogPosts: BlogPost[] = Object.entries(rawModules)
  .map(([path, raw]) => parsePost(raw, path))
  .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function isFeaturePost(post: Pick<BlogPost, 'tags'>): boolean {
  return post.tags.some((tag) => tag.toLowerCase() === FEATURE_TAG.toLowerCase())
}

/** Feature posts, newest first (same order as `blogPosts`). */
export function featurePosts(): BlogPost[] {
  return blogPosts.filter(isFeaturePost)
}

export function blogPostingJsonLd(post: BlogPost): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    url: absoluteSiteUrl(blogPostPath(post.slug)),
    image: post.coverImage ? absoluteSiteUrl(post.coverImage) : DEFAULT_SHARE_IMAGE,
    publisher: {
      '@type': 'Organization',
      name: 'AdRender',
    },
  }
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export type BlogIndexTab = 'notes' | 'comparisons'

export function blogIndexPath(tab: BlogIndexTab = 'notes'): string {
  return tab === 'comparisons' ? '/blog#comparisons' : '/blog'
}

export function parseBlogTab(hash: string | null | undefined): BlogIndexTab {
  return hash?.replace(/^#/, '').toLowerCase() === 'comparisons' ? 'comparisons' : 'notes'
}

export function blogPostPath(slug: string): string {
  return `/blog/${slug}`
}

export function formatPostDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00Z`)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
