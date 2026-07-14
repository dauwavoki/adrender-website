import { Check, X, ArrowRight, ExternalLink, type LucideIcon } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import { PageMeta } from './PageMeta'

export type ComparisonRow = {
  label: string
  adrender: string
  competitor: string
}

export type ComparisonCard = {
  icon: LucideIcon
  title: string
  body: string
}

export type ComparisonPageProps = {
  competitor: string
  competitorUrl: string
  subheadline: string
  rows: ComparisonRow[]
  cards: ComparisonCard[]
  /** Browser / OG title */
  documentTitle: string
  metaDescription: string
  /** Canonical path, e.g. `/vs-adcreative` */
  path: string
}

const APP_URL = 'https://app.adrender.app'

/** Render a ✅ / ❌ / plain-text cell value. Leading emoji becomes a lucide icon. */
function CellValue({ value, accent }: { value: string; accent?: boolean }) {
  if (value === '✅' || value.startsWith('✅ ')) {
    const rest = value === '✅' ? '' : value.slice(2)
    return (
      <span className="inline-flex items-start gap-2">
        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accent ? 'text-[var(--accent-cyan)]' : 'text-emerald-400/80'}`} />
        {rest && <span>{rest}</span>}
      </span>
    )
  }
  if (value === '❌' || value.startsWith('❌ ')) {
    const rest = value === '❌' ? '' : value.slice(2)
    return (
      <span className="inline-flex items-start gap-2">
        <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500/80" />
        {rest && <span>{rest}</span>}
      </span>
    )
  }
  return <span>{value}</span>
}

export function ComparisonPage({
  competitor,
  competitorUrl,
  subheadline,
  rows,
  cards,
  documentTitle,
  metaDescription,
  path,
}: ComparisonPageProps) {
  return (
    <div className="px-4 py-20 md:px-6 md:py-28">
      <PageMeta title={documentTitle} description={metaDescription} path={path} />

      {/* 1. HERO */}
      <section className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">Comparison</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl">
            AdRender <span className="text-zinc-500">vs</span> {competitor}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">{subheadline}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={APP_URL}
              className="btn-cta inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
            >
              Start Free on AdRender
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={competitorUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline-accent inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
            >
              {competitor} website
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. COMPARISON TABLE */}
      <section className="mx-auto mt-20 max-w-5xl md:mt-28">
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12121a]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="w-1/3 px-5 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Feature
                    </th>
                    <th className="w-1/3 px-5 py-5">
                      <span className="text-gradient-accent font-heading text-base font-bold">AdRender</span>
                    </th>
                    <th className="w-1/3 px-5 py-5 font-heading text-base font-semibold text-zinc-300">{competitor}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`align-top ${i % 2 === 1 ? 'bg-white/[0.015]' : ''} border-b border-white/[0.05] last:border-b-0`}
                    >
                      <td className="px-5 py-4 font-medium text-zinc-300">{row.label}</td>
                      <td className="border-l border-[color:color-mix(in_srgb,var(--accent-cyan)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-cyan)_5%,transparent)] px-5 py-4 text-zinc-100">
                        <CellValue value={row.adrender} accent />
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        <CellValue value={row.competitor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. FEATURE CALLOUT CARDS */}
      <section className="mx-auto mt-20 max-w-6xl md:mt-28">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, body }, i) => {
            const surfaces = [
              'border-[#00E5FF]/22 bg-[#00E5FF]/08 text-[#00E5FF]',
              'border-[#7B4FD4]/25 bg-[#7B4FD4]/10 text-[#B894F0]',
              'border-[#FF6B2B]/22 bg-[#FF6B2B]/08 text-[#FF8F5C]',
            ]
            return (
              <ScrollReveal key={title}>
                <article className="h-full rounded-2xl border border-white/[0.06] bg-[#12121a] p-8 transition hover:border-white/[0.1] hover:shadow-[0_0_36px_-14px_rgba(0,229,255,0.12)]">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${surfaces[i % 3]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-500">{body}</p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="mx-auto mt-20 max-w-3xl md:mt-28">
        <ScrollReveal>
          <div className="rounded-2xl border border-white/[0.08] bg-[#08080c] px-6 py-16 text-center md:px-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">Ready to switch?</h2>
            <div className="mt-8 flex justify-center">
              <a
                href={APP_URL}
                className="btn-cta inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
              >
                Start Free
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-sm text-zinc-500">No credit card required. No watermarks. Ever.</p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
