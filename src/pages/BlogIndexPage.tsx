import { Link, useLocation } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { blogIndexPath, blogPostPath, blogPosts, formatPostDate, parseBlogTab } from '../data/blog'
import { comparisonPath, comparisons } from '../data/comparisons'
import { SplitHero } from '../components/site/SplitHero'
import { LinkTable } from '../components/site/LinkTable'
import { SitePlaceholder } from '../components/site/SitePlaceholder'
import { ensureSiteImage } from '../data/imageManifest'

const TITLE = 'AdRender Blog — AI Ads & Shopify Creatives'
const DESCRIPTION =
  'Notes from the AdRender team on AI ad generation, Shopify creatives, and building better paid social ads — without the agency overhead.'

export function BlogIndexPage() {
  const { hash } = useLocation()
  const tab = parseBlogTab(hash)
  const isNotes = tab === 'notes'

  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/blog" />
      <SplitHero
        lead={isNotes ? 'From the AdRender team' : 'AdRender vs other tools'}
        aside={
          <p className="site-lead">
            {isNotes
              ? 'Practical notes on AI ads, Shopify creatives, and what we’re building.'
              : 'Honest side-by-sides with other AI ad tools. Each comparison is its own page.'}
          </p>
        }
      />
      <div className="site-column">
        <nav className="site-pills" aria-label="Blog sections">
          <Link to={blogIndexPath('notes')} className={isNotes ? 'site-pill is-selected' : 'site-pill'} aria-current={isNotes ? 'page' : undefined}>
            Notes
          </Link>
          <Link
            to={blogIndexPath('comparisons')}
            className={!isNotes ? 'site-pill is-selected' : 'site-pill'}
            aria-current={!isNotes ? 'page' : undefined}
          >
            Comparisons
          </Link>
        </nav>
      </div>

      <div className="blog-panels">
        <section className="site-section blog-notes" hidden={!isNotes} suppressHydrationWarning>
          <div className="site-column">
            <div className="site-card-grid cols-3">
              {blogPosts.map((post) => {
                const id = `B-${post.slug}`
                ensureSiteImage({
                  id,
                  label: post.title,
                  where: blogPostPath(post.slug),
                  width: 1600,
                  height: 900,
                  aspect: '16:9',
                  filename: `/site/b-${post.slug}.webp`,
                })
                return (
                  <Link key={post.slug} to={blogPostPath(post.slug)} className="site-post-card">
                    <SitePlaceholder id={id} />
                    <div className="copy">
                      <time dateTime={post.publishedDate} className="site-meta">
                        {formatPostDate(post.publishedDate)}
                      </time>
                      <h2>{post.title}</h2>
                      <p>{post.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
        <section id="comparisons" className="site-section site-anchor" hidden={isNotes} suppressHydrationWarning>
          <div className="site-column">
            <LinkTable
              label="Comparisons"
              rows={comparisons.map((comparison) => ({
                title: `AdRender vs ${comparison.competitor}`,
                description: comparison.subheadline,
                to: comparisonPath(comparison.slug),
              }))}
            />
          </div>
        </section>
      </div>
    </>
  )
}
