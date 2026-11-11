import type { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { PageMeta } from '../components/PageMeta'
import { SceneByName } from '../components/scenes'
import { resolveSceneId } from '../components/scenes/sceneNames'
import { blogPostingJsonLd, blogPostPath, blogPosts, formatPostDate, getPostBySlug, isFeaturePost } from '../data/blog'
import { LinkTable } from '../components/site/LinkTable'
import { ClosingCta } from '../components/site/ClosingCta'
import { BlogCover } from '../components/site/BlogCover'
import { getSignupUrl } from '../lib/appUrl'

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
  const related = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 4)
    .map((item) => ({
      title: item.title,
      description: item.description,
      to: blogPostPath(item.slug),
    }))

  return (
    <>
      <PageMeta
        title={title}
        description={post.description}
        path={path}
        ogType="article"
        image={post.coverImage}
        imageAlt={post.title}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: blogPostingJsonLd(post) }} />
      <article className="site-section blog-post">
        <div className="site-column">
          {post.coverScene && resolveSceneId(post.coverScene) ? (
            <div className="blog-feature-scene">
              <SceneByName name={post.coverScene} size="wide" />
            </div>
          ) : null}
          <BlogCover
            slug={post.slug}
            variant="banner"
            title={post.title}
            dateTime={post.publishedDate}
            dateLabel={formatPostDate(post.publishedDate)}
            updatedLabel={
              post.updatedDate && post.updatedDate !== post.publishedDate ? formatPostDate(post.updatedDate) : undefined
            }
            feature={isFeaturePost(post)}
          />
        </div>
        <div className="site-blog-body">
          <div className="blog-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
      <section className="site-section">
        <div className="site-column">
          <h2 className="site-h3">More notes</h2>
          <div style={{ marginTop: 16 }}>
            <LinkTable rows={related} label="More notes" />
          </div>
        </div>
      </section>
      <ClosingCta
        lead="Stop stitching tools together."
        sentence="Your brand goes in. Hundreds of ads come out. Free to start, no card required."
        href={getSignupUrl()}
        label="Start free"
      />
    </>
  )
}
