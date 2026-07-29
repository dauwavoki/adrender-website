import { useAppUrl } from '../hooks/useAppUrl'

type ClosingCtaProps = {
  className?: string
}

export function ClosingCta({ className = '' }: ClosingCtaProps) {
  const appUrl = useAppUrl()

  return (
    <section className={`px-4 py-24 md:px-6 md:py-28 ${className}`}>
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#12121a] px-8 py-14 text-center md:px-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 0%, rgba(123,79,212,0.2), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(0,229,255,0.08), transparent 40%)',
          }}
        />
        <div className="relative">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Stop stitching tools together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Your brand goes in. Hundreds of ads come out. Free to start, no card required.
          </p>
          <a
            href={appUrl}
            className="btn-cta mt-8 inline-flex items-center justify-center rounded-xl px-9 py-3.5 text-base font-semibold"
          >
            Start Free
          </a>
        </div>
      </div>
    </section>
  )
}
