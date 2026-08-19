import { useAppUrl } from '../hooks/useAppUrl'

export function Hero() {
  const appUrl = useAppUrl()

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
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
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] [animation:drift_22s_ease-in-out_infinite]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(123, 79, 212, 0.22), transparent 45%),
            radial-gradient(circle at 20% 30%, rgba(0, 229, 255, 0.08), transparent 40%),
            radial-gradient(circle at 80% 25%, rgba(255, 107, 43, 0.06), transparent 35%)`,
        }}
      />
      <div className="grain-overlay" aria-hidden />

      <div className="relative mx-auto max-w-5xl text-center">
        <h1 className="font-heading text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.02] lg:text-[4.25rem]">
          Create more ads. Launch more tests. Find more winners.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
          AdRender pulls from 100M+ real image and video ads running right now and remixes the winners into your
          brand. Hundreds of ads in under 10 minutes.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={appUrl}
            className="btn-cta inline-flex items-center justify-center rounded-xl px-9 py-3.5 text-base font-semibold"
          >
            Start Free
          </a>
          <p className="text-sm text-zinc-500">No credit card. No demo call. No sales rep.</p>
        </div>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-600">
          Built for anyone spending $500 to $50K+ a month on ads — whether that&apos;s your whole budget or your
          testing budget. Shopify sync included.
        </p>
      </div>
    </section>
  )
}
