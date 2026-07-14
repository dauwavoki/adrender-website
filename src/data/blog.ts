import { parseFrontmatter } from '../lib/parseFrontmatter'

export type BlogPost = {
  title: string
  slug: string
  description: string
  publishedDate: string
  updatedDate?: string
  content: string
}

const rawModules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function parsePost(raw: string, source: string): BlogPost {
  const { data, content } = parseFrontmatter(raw)
  const title = data.title ?? ''
  const slug = data.slug ?? ''
  const description = data.description ?? ''
  const publishedDate = data.publishedDate ?? ''
  const updatedDate = data.updatedDate

  if (!title || !slug || !description || !publishedDate) {
    throw new Error(`Invalid blog frontmatter in ${source}: title, slug, description, and publishedDate are required`)
  }

  return {
    title,
    slug,
    description,
    publishedDate,
    updatedDate,
    content,
  }
}

export const blogPosts: BlogPost[] = Object.entries(rawModules)
  .map(([path, raw]) => parsePost(raw, path))
  .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
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
