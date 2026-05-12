import { ScrollReveal } from './ScrollReveal'

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 border-t border-white/[0.06] px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className="text-section-label text-xs font-semibold uppercase tracking-[0.2em]">About</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Built for Shopify merchants, solo marketers, and anyone tired of waiting on a designer.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            No bloat. No complexity. Just great ads, fast. Built by designers with over 20 years in the industry — for designers and
            non-designers alike.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
