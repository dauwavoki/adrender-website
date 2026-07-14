import { Link } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { ScrollReveal } from '../components/ScrollReveal'
import { blogPostPath, blogPosts, formatPostDate } from '../data/blog'

const TITLE = 'AdRender Blog — AI Ads & Shopify Creatives'
const DESCRIPTION =
  'Notes from the AdRender team on AI ad generation, Shopify creatives, and building better paid social ads — without the agency overhead.'

export function BlogIndexPage() {
  return (
    <div className="px-4 py-20 md:px-6 md:py-28">
      <PageMeta title={TITLE} description={DESCRIPTION} path="/blog" />
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">Blog</p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            From the AdRender team
          </h1>
          <p className="mt-3 text-zinc-500">Practical notes on AI ads, Shopify creatives, and what we&apos;re building.</p>
        </ScrollReveal>

        <ul className="mt-14 space-y-10">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <ScrollReveal>
                <article>
                  <time dateTime={post.publishedDate} className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                    {formatPostDate(post.publishedDate)}
                  </time>
                  <h2 className="mt-2 font-heading text-xl font-semibold tracking-tight text-white md:text-2xl">
                    <Link to={blogPostPath(post.slug)} className="transition hover:text-[var(--accent-cyan)]">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500 md:text-base">{post.description}</p>
                  <Link
                    to={blogPostPath(post.slug)}
                    className="mt-3 inline-block text-sm font-medium text-[var(--accent-cyan)] transition hover:underline"
                  >
                    Read post
                  </Link>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
