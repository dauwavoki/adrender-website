import { ScrollReveal } from './ScrollReveal'

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 border-t border-white/[0.06] px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366f1]">About</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">Built for operators, not agencies</h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            AdRender is an AI-powered static ad creation platform for Shopify businesses and solo marketers. We combine a vast library of
            real-world creatives with your store data so you can ship on-brand ads at the speed your campaigns demand — without waiting
            on design queues.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
