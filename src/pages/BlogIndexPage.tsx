import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageMeta } from '../components/PageMeta'
import { ScrollReveal } from '../components/ScrollReveal'
import { blogIndexPath, blogPostPath, blogPosts, formatPostDate, parseBlogTab } from '../data/blog'
import { comparisonPath, comparisons } from '../data/comparisons'

const TITLE = 'AdRender Blog — AI Ads & Shopify Creatives'
const DESCRIPTION =
  'Notes from the AdRender team on AI ad generation, Shopify creatives, and building better paid social ads — without the agency overhead.'

const TAB_CLASS =
  'rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]/40'

export function BlogIndexPage() {
  const [searchParams] = useSearchParams()
  const tab = parseBlogTab(searchParams.get('tab'))
  const isNotes = tab === 'notes'

  return (
    <div className="px-4 py-20 md:px-6 md:py-28">
      <PageMeta title={TITLE} description={DESCRIPTION} path="/blog" />
      <div className={`mx-auto ${isNotes ? 'max-w-2xl' : 'max-w-4xl'}`}>
        <ScrollReveal>
          <nav aria-label="Blog sections" className="inline-flex rounded-xl border border-white/[0.08] bg-[#12121a] p-1">
            <Link
              to={blogIndexPath('notes')}
              aria-current={isNotes ? 'page' : undefined}
              className={`${TAB_CLASS} ${
                isNotes ? 'bg-white/[0.08] text-white' : 'text-zinc-500 hover:text-[var(--accent-cyan)]'
              }`}
            >
              Notes
            </Link>
            <Link
              to={blogIndexPath('comparisons')}
              aria-current={!isNotes ? 'page' : undefined}
              className={`${TAB_CLASS} ${
                !isNotes ? 'bg-white/[0.08] text-white' : 'text-zinc-500 hover:text-[var(--accent-cyan)]'
              }`}
            >
              Comparisons
            </Link>
          </nav>

          <p className="mt-8 text-section-label text-xs font-semibold uppercase tracking-[0.2em]">
            {isNotes ? 'Notes' : 'Comparisons'}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            {isNotes ? 'From the AdRender team' : 'AdRender vs other tools'}
          </h1>
          <p className="mt-3 text-zinc-500">
            {isNotes
              ? 'Practical notes on AI ads, Shopify creatives, and what we\u2019re building.'
              : 'Honest side-by-sides with other AI ad tools. Each comparison is its own page.'}
          </p>
        </ScrollReveal>

        {isNotes ? (
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
        ) : (
          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {comparisons.map((comparison) => (
              <li key={comparison.slug}>
                <ScrollReveal>
                  <Link
                    to={comparisonPath(comparison.slug)}
                    className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[#12121a] p-6 transition hover:border-white/[0.12] hover:shadow-[0_0_36px_-14px_rgba(0,229,255,0.12)]"
                  >
                    <h2 className="font-heading text-lg font-semibold tracking-tight text-white transition group-hover:text-[var(--accent-cyan)] md:text-xl">
                      AdRender vs {comparison.competitor}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">{comparison.subheadline}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-cyan)]">
                      Read comparison
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
