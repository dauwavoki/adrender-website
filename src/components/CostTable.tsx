import { ScrollReveal } from './ScrollReveal'

type CostRow = { tool: string; cost: string; emphasize?: boolean }

const STATIC_ROWS: CostRow[] = [
  { tool: 'Design tool (Figma / Photoshop)', cost: '$15–60' },
  { tool: 'Ad research / swipe file tool', cost: '$49–99' },
  { tool: 'AI writing (ChatGPT / Claude)', cost: '$20' },
  { tool: 'AI image generator', cost: '$20–99' },
  { tool: 'Subtotal', cost: '$104–278/mo', emphasize: true },
  { tool: 'Time for 100 ads', cost: '~15 hours', emphasize: true },
]

const VIDEO_ROWS: CostRow[] = [
  { tool: 'Ad research / swipe file tool', cost: '$49–99' },
  { tool: 'Video editing (CapCut / Premiere Pro)', cost: '$10–60' },
  { tool: 'AI video generator', cost: '$39–220' },
  { tool: 'Voice & sound tool', cost: '$15–49' },
  { tool: 'AI writing (ChatGPT / Claude)', cost: '$20' },
  { tool: 'Subtotal', cost: '$133–448/mo', emphasize: true },
  { tool: 'Time for 100 videos', cost: '~150 hours', emphasize: true },
]

function StackRows({ rows }: { rows: CostRow[] }) {
  return (
    <>
      {rows.map((row) => (
        <tr
          key={row.tool}
          className={`border-b border-white/[0.06] ${row.emphasize ? 'bg-white/[0.03]' : ''}`}
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
    </>
  )
}

function StackHeading({ label }: { label: string }) {
  return (
    <tr>
      <th
        colSpan={2}
        scope="colgroup"
        className="border-b border-white/[0.06] bg-white/[0.02] px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-section-label md:px-6"
      >
        {label}
      </th>
    </tr>
  )
}

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
                <StackHeading label="Static Ad Stack" />
                <StackRows rows={STATIC_ROWS} />
              </tbody>
              <tbody>
                <StackHeading label="Video Ad Stack" />
                <StackRows rows={VIDEO_ROWS} />
              </tbody>
              <tbody>
                <tr className="bg-white/[0.04]">
                  <th scope="row" className="px-5 py-4 font-heading font-semibold text-white md:px-6">
                    Combined total
                  </th>
                  <td className="px-5 py-4 text-right font-heading font-semibold tabular-nums text-white md:px-6">
                    $188–617/mo
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-6 rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-cyan)_35%,transparent)] bg-gradient-to-br from-[#0e1a22] to-[#12121a] p-8 text-center shadow-[0_0_48px_-20px_rgba(0,229,255,0.25)] md:p-10">
            <p className="font-heading text-2xl font-bold text-white md:text-3xl">
              AdRender — Starting from <span className="text-gradient-accent">$19/mo</span>. One tool.
            </p>
            <p className="mt-3 text-lg text-zinc-300">
              Hundreds of ads — static or video — in under 10 minutes.
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            No demo call. No sales rep. No &ldquo;contact us for pricing.&rdquo; The price is right there.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
