export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] px-4 pb-24 pt-16 md:px-6 md:pb-32 md:pt-24">
      {/* Grid + subtle motion */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99,102,241,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99,102,241,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [animation:drift_22s_ease-in-out_infinite]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(99,102,241,0.12), transparent 45%),
            radial-gradient(circle at 80% 30%, rgba(99,102,241,0.08), transparent 40%)`,
        }}
      />
      <div className="grain-overlay" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">adrender.app</p>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl md:leading-[1.02]">
            Ship 50 Ads Before Lunch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            AdRender pulls real winning ad templates and generates brand-perfect static ads from your Shopify store — no designer
            needed.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-xl bg-[#6366f1] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-[#818cf8]"
            >
              Get Early Access
            </a>
          </div>
        </div>

        {/* Product placeholder */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12121a] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.65)]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <span className="ml-2 text-xs text-zinc-600">adrender — preview</span>
            </div>
            <div className="flex aspect-[16/9] items-center justify-center bg-[#0e0e14]">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#6366f1]/30 bg-[#6366f1]/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#6366f1]">
                    <path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-zinc-400">Product preview coming soon</p>
                <p className="mt-1 text-xs text-zinc-600">Your generated ads will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
