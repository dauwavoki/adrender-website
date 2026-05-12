import { ScrollReveal } from './ScrollReveal'

const logos = ['Northline', 'Velvet & Co.', 'Pulse Supply', 'Oak & Pixel', 'Meridian Goods']

export function SocialProof() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0c0c12] px-4 py-14 md:px-6">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-medium text-zinc-500">Trusted by Shopify merchants</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {logos.map((name) => (
              <div
                key={name}
                className="flex min-h-[52px] min-w-[140px] flex-1 items-center justify-center rounded-xl border border-white/[0.06] bg-[#12121a] px-6 py-4 sm:flex-none md:min-w-[160px]"
              >
                <span className="font-heading text-sm font-semibold tracking-wide text-zinc-500">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
