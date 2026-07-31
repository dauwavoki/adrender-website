import { ScrollReveal } from './ScrollReveal'

const CARDS = [
  {
    n: '1',
    title: 'The Problem',
    heading: 'Finding a winner means testing losers.',
    body: "You don't know which ad works until you run it. That means testing many angles at ~$20 a piece and keeping the few that convert. It's the only reliable way to find a winner — and every test needs its own creative.",
    accent: {
      bg: 'bg-[#C45A2C]',
      ghost: 'text-white/20',
      label: 'text-white',
    },
  },
  {
    n: '2',
    title: 'The Bottleneck',
    heading: "Your testing budget isn't the limit. Your creative budget is.",
    body: "A designer runs $150/day for maybe 20 ads — about $3,000/month, and you wait days for each batch. Do it yourself and you're stitching Figma, an ad library, ChatGPT, and an image generator into a three-hour session for the same 20. So you test fewer angles than you should, and winners take longer to find.",
    accent: {
      bg: 'bg-[#5B3FA8]',
      ghost: 'text-white/20',
      label: 'text-[#E8D9FF]',
    },
  },
  {
    n: '3',
    title: 'The Fix',
    heading: 'Make testing cheap enough to actually do it.',
    body: 'AdRender drops the cost of a creative to near nothing. 200 ads in three minutes, on-brand, built on formats already proven in the wild. Test the angle you weren\'t sure about — because now it costs you almost nothing to find out.',
    accent: {
      bg: 'bg-[#2F8F5B]',
      ghost: 'text-white/20',
      label: 'text-[#D4F5E4]',
    },
  },
] as const

export function ProblemBottleneckFix() {
  return (
    <section className="relative border-t border-white/[0.06] bg-[#08080c] px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {CARDS.map((card) => (
              <article
                key={card.n}
                className={`relative overflow-hidden rounded-3xl ${card.accent.bg} p-8 md:min-h-[22rem] md:p-9`}
              >
                <span
                  className={`pointer-events-none absolute -left-1 -top-4 font-heading text-[9rem] font-extrabold leading-none ${card.accent.ghost} select-none`}
                  aria-hidden
                >
                  {card.n}
                </span>
                <div className="relative">
                  <p
                    className={`text-sm font-bold uppercase tracking-[0.16em] ${card.accent.label}`}
                  >
                    {card.title}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
                    {card.heading}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/90">{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
