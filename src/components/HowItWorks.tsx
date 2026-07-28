import type { CSSProperties } from 'react'
import { ArrowRight, Layers, Palette, Sparkles } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

const steps = [
  {
    title: 'Your brand',
    body: 'Add your website or upload brand assets',
    icon: Palette,
    accent: 'from-[var(--accent-cyan)] to-[#3dd9ff]',
    glow: 'rgba(0, 229, 255, 0.35)',
    delay: '0ms',
  },
  {
    title: 'AdRender',
    body: 'Writes ad copy using proven, real templates',
    icon: Sparkles,
    accent: 'from-[var(--accent-purple)] to-[#a078ef]',
    glow: 'rgba(123, 79, 212, 0.4)',
    delay: '80ms',
  },
  {
    title: 'Hundreds of ads',
    body: 'Ready to test in minutes',
    icon: Layers,
    accent: 'from-[var(--accent-orange)] to-[#ff8f55]',
    glow: 'rgba(255, 107, 43, 0.35)',
    delay: '160ms',
  },
] as const

export function HowItWorks() {
  return (
    <div className="relative mt-16 px-0 py-4 md:mt-20 md:py-6" aria-label="How AdRender works">
      <div
        className="pointer-events-none absolute inset-0 -mx-4 opacity-80 md:-mx-6"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 50% at 15% 40%, rgba(0, 229, 255, 0.14), transparent 60%),
            radial-gradient(ellipse 50% 45% at 50% 50%, rgba(123, 79, 212, 0.16), transparent 55%),
            radial-gradient(ellipse 55% 50% at 85% 40%, rgba(255, 107, 43, 0.12), transparent 60%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
            How it works
          </p>
          <h2 className="mt-3 text-center font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Brand in. Ads out.
          </h2>
        </ScrollReveal>

        <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex flex-1 flex-col items-stretch md:flex-row md:items-center">
                <ScrollReveal className="w-full">
                  <article
                    className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.1] bg-[#12121a]/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-[0_20px_50px_-24px_var(--card-glow)]"
                    style={
                      {
                        '--card-glow': step.glow,
                        animationDelay: step.delay,
                      } as CSSProperties
                    }
                  >
                    <div
                      className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} text-white shadow-[0_8px_28px_-8px_var(--card-glow)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_12px_36px_-6px_var(--card-glow)]`}
                      style={{ '--card-glow': step.glow } as CSSProperties}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="font-heading text-xl font-bold tracking-tight text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-[0.95rem]">{step.body}</p>
                    <div
                      className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${step.accent} opacity-20 blur-2xl transition duration-300 group-hover:opacity-40`}
                      aria-hidden
                    />
                  </article>
                </ScrollReveal>

                {i < steps.length - 1 && (
                  <div
                    className="flex shrink-0 items-center justify-center py-1 text-[var(--accent-cyan)] md:px-2 md:py-0"
                    aria-hidden
                  >
                    <ArrowRight className="hidden h-6 w-6 opacity-70 md:block [animation:how-arrow-pulse_2.4s_ease-in-out_infinite]" />
                    <ArrowRight className="h-5 w-5 rotate-90 opacity-70 md:hidden" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
