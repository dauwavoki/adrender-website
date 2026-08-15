import { ScrollReveal } from './ScrollReveal'

const ROWS: { tool: string; cost: string; emphasize?: boolean }[] = [
  { tool: 'Design tool (Figma / Photoshop)', cost: '$15–60' },
  { tool: 'Ad library / swipe file tool', cost: '$49–99' },
  { tool: 'AI ad generator', cost: '$39–249' },
  { tool: 'AI writing (ChatGPT / Claude)', cost: '$20' },
  { tool: 'AI image generation', cost: '$20–30' },
  { tool: 'Total', cost: '$143–458/mo across 5 tools', emphasize: true },
  { tool: 'Time for 20 ads', cost: '~3 hours', emphasize: true },
]

export function CostTable() {
  return (
    <section className="border-t border-white/[0.06] px-4 py-24 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            The stack you&apos;re paying for right now
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12121a]">
            <table className="w-full text-left text-sm">
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.tool}
                    className={`border-b border-white/[0.06] last:border-b-0 ${
                      row.emphasize ? 'bg-white/[0.03]' : ''
                    }`}
                  >
                    <th
                      scope="row"
                      className={`px-5 py-3.5 font-medium md:px-6 ${
                        row.emphasize ? 'text-zinc-200' : 'text-zinc-400'
                      }`}
                    >
                      {row.tool}
                    </th>
                    <td
                      className={`px-5 py-3.5 text-right tabular-nums md:px-6 ${
                        row.emphasize ? 'font-semibold text-white' : 'text-zinc-300'
                      }`}
                    >
                      {row.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-6 rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-cyan)_35%,transparent)] bg-gradient-to-br from-[#0e1a22] to-[#12121a] p-8 text-center shadow-[0_0_48px_-20px_rgba(0,229,255,0.25)] md:p-10">
            <p className="font-heading text-2xl font-bold text-white md:text-3xl">
              AdRender — <span className="text-gradient-accent">$19/mo</span>. One tool.
            </p>
            <p className="mt-3 text-lg text-zinc-300">Hundreds of ads in under 10 minutes</p>
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            No demo call. No sales rep. No &ldquo;contact us for pricing.&rdquo; The price is right there.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
