import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import { PageMeta } from './PageMeta'
import { ProofRow } from './ProofRow'
import { useAppUrl } from '../hooks/useAppUrl'
import type { SolutionConfig } from '../data/solutions'
import { solutionPath } from '../data/solutions'

type SolutionPageProps = {
  config: SolutionConfig
}

/** Render *emphasis* spans from the source copy without a markdown parser. */
function EmphasizedText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <em key={i} className="italic text-zinc-200">
            {part.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

export function SolutionPage({ config }: SolutionPageProps) {
  const appUrl = useAppUrl()
  const path = solutionPath(config.slug)

  return (
    <div className="px-4 py-20 md:px-6 md:py-28">
      <PageMeta title={config.documentTitle} description={config.metaDescription} path={path} />

      {/* 1. HERO */}
      <section className="relative mx-auto max-w-4xl overflow-hidden text-center">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 229, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(123, 79, 212, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 55% at 50% 20%, black 15%, transparent 70%)',
          }}
        />
        <ScrollReveal>
          <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">Solutions</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl">
            {config.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            {config.subheadline}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <a
              href={appUrl}
              className="btn-cta inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. PROBLEM */}
      <section className="mx-auto mt-20 max-w-5xl md:mt-28">
        <ScrollReveal>
          <article className="relative overflow-hidden rounded-3xl bg-[#C45A2C] p-8 md:p-12">
            <span
              className="pointer-events-none absolute -left-1 -top-4 select-none font-heading text-[9rem] font-extrabold leading-none text-white/20"
              aria-hidden
            >
              1
            </span>
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">The problem</p>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/90 md:text-base">
                <EmphasizedText text={config.problem} />
              </p>
            </div>
          </article>
        </ScrollReveal>
      </section>

      {/* 3. SOLUTION — 3-step flow */}
      <section className="mx-auto mt-20 max-w-6xl md:mt-28">
        <ScrollReveal>
          <p className="text-center text-section-label text-xs font-semibold uppercase tracking-[0.2em]">
            How AdRender solves it
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-zinc-400 md:text-lg">
            {config.solution}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {config.steps.map(({ icon: Icon, title, body }, i) => {
            const surfaces = [
              'border-[#00E5FF]/22 bg-[#00E5FF]/08 text-[#00E5FF]',
              'border-[#7B4FD4]/25 bg-[#7B4FD4]/10 text-[#B894F0]',
              'border-[#FF6B2B]/22 bg-[#FF6B2B]/08 text-[#FF8F5C]',
            ]
            return (
              <ScrollReveal key={title}>
                <article className="relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#12121a] p-8 transition hover:border-white/[0.1] hover:shadow-[0_0_36px_-14px_rgba(0,229,255,0.12)]">
                  <span
                    className="pointer-events-none absolute right-5 top-3 select-none font-heading text-5xl font-extrabold text-white/[0.06]"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
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

      {/* 4. PROOF / DIFFERENTIATION */}
      <section className="mx-auto mt-20 max-w-3xl md:mt-28">
        <ScrollReveal>
          <div className="rounded-2xl border border-white/[0.08] bg-[#12121a] px-6 py-12 md:px-10">
            <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">Why this works</p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-300 md:text-xl">{config.proof}</p>
          </div>
        </ScrollReveal>
      </section>

      <div className="-mx-4 mt-20 md:-mx-6 md:mt-28">
        <ProofRow />
      </div>

      {/* 5. CTA */}
      <section className="mx-auto mt-20 max-w-3xl md:mt-28">
        <ScrollReveal>
          <div className="rounded-2xl border border-white/[0.08] bg-[#08080c] px-6 py-16 text-center md:px-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">Ready to switch?</h2>
            <div className="mt-8 flex justify-center">
              <a
                href={appUrl}
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
