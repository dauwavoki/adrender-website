import { ScrollReveal } from './ScrollReveal'

const features = [
  {
    title: '100M+ Real Ad Templates',
    body: 'Start from proven creatives across niches — not generic placeholders.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Shopify Auto-Sync',
    body: 'Products, imagery, and offers stay in sync so every export matches your catalog.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10h18M3 14h18M10 3v18M14 3v18" strokeLinecap="round" />
        <rect x="6" y="6" width="12" height="12" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Brand AI Memory',
    body: 'Voice, colors, and guardrails persist — consistent campaigns without a style guide lecture.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6v12M9 9h6M9 15h6M5 12H3M21 12h-2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: 'Multi-Provider Reliability',
    body: 'Model routing and fallbacks keep renders moving when APIs hiccup.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-28 px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#6366f1]">Features</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Everything a solo founder needs. Nothing they don&apos;t.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <ScrollReveal key={f.title}>
              <article className="h-full rounded-2xl border border-white/[0.06] bg-[#12121a] p-6 transition hover:border-[#6366f1]/25">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#6366f1]/20 bg-[#6366f1]/10 text-[#6366f1]">
                  {f.icon}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{f.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
