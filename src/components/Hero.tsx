export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] px-4 pb-24 pt-16 md:px-6 md:pb-32 md:pt-24">
      {/* Grid + subtle motion */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(123, 79, 212, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [animation:drift_22s_ease-in-out_infinite]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0, 229, 255, 0.1), transparent 45%),
            radial-gradient(circle at 80% 30%, rgba(123, 79, 212, 0.1), transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(255, 107, 43, 0.06), transparent 35%)`,
        }}
      />
      <div className="grain-overlay" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.05] lg:text-6xl">
            Ship More Ads Before Lunch Than Your Agency Does All Week.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            AdRender generates brand-perfect static ads using 100M+ real winning templates — no designer, no delays, no excuses. Got a
            Shopify store? Sync your products in one click.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="https://app.adrender.app" className="btn-cta inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-semibold">
              Start Free
            </a>
          </div>
        </div>

        {/* Product video placeholder — ~40% shorter than 16:9 (aspect 80/27 vs 16:9) */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="flex aspect-[80/27] items-center justify-center rounded-xl border border-white/[0.12] bg-[#0e0e14]">
            <p className="px-6 text-center text-sm font-medium tracking-wide text-zinc-500">Product video coming soon</p>
          </div>
        </div>
      </div>
    </section>
  )
}
