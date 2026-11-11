import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { SplitHero } from '../components/site/SplitHero'
import { blogPostPath, featurePosts, formatPostDate } from '../data/blog'

const TITLE = 'Changelog — AdRender'
const DESCRIPTION = 'Every AdRender feature release, newest first.'

export function ChangelogPage() {
  const posts = featurePosts()

  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/changelog" />
      <SplitHero lead="Changelog" aside={<p className="site-lead">{DESCRIPTION}</p>} />
      <section className="site-section">
        <div className="site-column">
          {posts.length === 0 ? (
            <p className="site-lead">No feature releases yet.</p>
          ) : (
            <div className="site-link-table changelog-list" role="list" aria-label="Changelog">
              {posts.map((post) => (
                <Link key={post.slug} to={blogPostPath(post.slug)} className="site-link-row" role="listitem">
                  <span className="site-link-row-title">
                    <time className="site-meta changelog-date" dateTime={post.publishedDate}>
                      {formatPostDate(post.publishedDate)}
                    </time>
                    {post.title}
                  </span>
                  <span className="site-link-row-desc">{post.description}</span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
