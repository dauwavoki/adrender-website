import { ScrollReveal } from './ScrollReveal'

const features = [
  {
    title: '100M+ Real Ad Templates',
    body: 'Start from proven creatives across niches — not generic placeholders.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Shopify Auto-Sync',
    body: 'Products, imagery, and offers stay in sync so every export matches your catalog.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10h18M3 14h18M10 3v18M14 3v18" strokeLinecap="round" />
        <rect x="6" y="6" width="12" height="12" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Brand AI Memory',
    body: 'Voice, colors, and guardrails persist — consistent campaigns without a style guide lecture.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6v12M9 9h6M9 15h6M5 12H3M21 12h-2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: 'Multi-Provider Reliability',
    body: 'Model routing and fallbacks keep renders moving when APIs hiccup.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

/** Rotate cyan → purple → orange across cards; 4th repeats cyan */
const iconSurfaces = [
  'border-[#00E5FF]/22 bg-[#00E5FF]/08 text-[#00E5FF]',
  'border-[#7B4FD4]/25 bg-[#7B4FD4]/10 text-[#B894F0]',
  'border-[#FF6B2B]/22 bg-[#FF6B2B]/08 text-[#FF8F5C]',
  'border-[#00E5FF]/22 bg-[#00E5FF]/08 text-[#00E5FF]',
] as const

const featurePreviews = [
  { label: 'Ad Template Browser' },
  { label: 'Brand AI Setup' },
  { label: 'Shopify Sync' },
  { label: 'Ad Generator' },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-28 px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-section-label text-center text-xs font-semibold uppercase tracking-[0.2em]">Features</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Everything a solo founder needs. Nothing they don&apos;t.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <ScrollReveal key={f.title}>
              <article className="h-full rounded-2xl border border-white/[0.06] bg-[#12121a] p-8 transition hover:border-white/[0.1] hover:shadow-[0_0_36px_-14px_rgba(0,229,255,0.12)] md:p-9">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${iconSurfaces[i] ?? iconSurfaces[0]}`}
                >
                  {f.icon}
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-white">{f.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-500">{f.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {featurePreviews.map((item) => (
              <div
                key={item.label}
                className="flex min-h-[200px] flex-col justify-end rounded-2xl border border-white/[0.08] bg-[#0e0e14] p-5 transition hover:border-[color:color-mix(in_srgb,var(--accent-purple)_22%,transparent)] md:min-h-[220px] md:p-6"
              >
                <p className="text-sm font-medium text-zinc-500">{item.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
