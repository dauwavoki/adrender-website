import type { ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { PageMeta } from '../components/PageMeta'
import { ScrollReveal } from '../components/ScrollReveal'
import { blogPostPath, formatPostDate, getPostBySlug } from '../data/blog'

const SHOPIFY_APP_STORE_URL = 'https://apps.shopify.com/adrender'
const SHOPIFY_APP_CTA_LABEL = 'Get the AdRender Shopify app'

function linkLabel(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map((child) => linkLabel(child)).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const props = (children as { props?: { children?: ReactNode } }).props
    return linkLabel(props?.children)
  }
  return ''
}

const markdownComponents: Components = {
  table: ({ children }) => (
    <div className="blog-table-wrap">
      <table>{children}</table>
    </div>
  ),
  a: ({ href, children }) => {
    const isAppStore = href === SHOPIFY_APP_STORE_URL
    if (isAppStore && linkLabel(children).trim() === SHOPIFY_APP_CTA_LABEL) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="blog-cta">
          {children}
        </a>
      )
    }
    if (isAppStore) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return <a href={href}>{children}</a>
  },
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const path = blogPostPath(post.slug)
  const title = `${post.title} — AdRender Blog`

  return (
    <article className="px-4 py-20 md:px-6 md:py-28">
      <PageMeta title={title} description={post.description} path={path} ogType="article" />
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">
            <Link to="/blog" className="transition hover:text-white">
              Blog
            </Link>
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">{post.title}</h1>
          <time dateTime={post.publishedDate} className="mt-4 block text-sm text-zinc-500">
            {formatPostDate(post.publishedDate)}
            {post.updatedDate && post.updatedDate !== post.publishedDate && (
              <span> · Updated {formatPostDate(post.updatedDate)}</span>
            )}
          </time>
        </ScrollReveal>

        <ScrollReveal>
          <div className="blog-prose mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>
        </ScrollReveal>

        <div className="mt-14 border-t border-white/[0.06] pt-8">
          <Link to="/blog" className="text-sm font-medium text-zinc-500 transition hover:text-[var(--accent-cyan)]">
            ← All posts
          </Link>
        </div>
      </div>
    </article>
  )
}
