import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageMeta } from '../components/PageMeta'
import { ScrollReveal } from '../components/ScrollReveal'
import { solutions, solutionPath } from '../data/solutions'

const TITLE = 'Solutions — AI Ads for Fatigue, Catalogs, TikTok & More | AdRender'
const DESCRIPTION =
  'Problem-first pages for the reasons ads stall: creative fatigue, catalog scale, agencies, TikTok, Instagram, and more. See how AdRender fixes each.'

export function SolutionsIndexPage() {
  return (
    <div className="px-4 py-20 md:px-6 md:py-28">
      <PageMeta title={TITLE} description={DESCRIPTION} path="/solutions" />
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">Solutions</p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            The problem you have, not the tool you&apos;re comparing.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Creative fatigue, a 500-SKU catalog, six client brands, a platform that needs its own format. Each of these
            is a page — pick the one that sounds like your week.
          </p>
        </ScrollReveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <ScrollReveal>
                <Link
                  to={solutionPath(solution.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[#12121a] p-6 transition hover:border-white/[0.12] hover:shadow-[0_0_36px_-14px_rgba(0,229,255,0.12)]"
                >
                  <h2 className="font-heading text-lg font-semibold tracking-tight text-white transition group-hover:text-[var(--accent-cyan)] md:text-xl">
                    {solution.navLabel}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">{solution.indexBlurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-cyan)]">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
