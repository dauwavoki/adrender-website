import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

const rows = [
  {
    label: 'Cost/mo',
    diy: '~$3,000/mo (20 ads/day × $150/day, 20 working days)',
    adrender: '$19–199/mo',
  },
  {
    label: 'Ads/mo',
    diy: '~400 ads',
    adrender: 'Hundreds to thousands of ads',
  },
  {
    label: 'Your time',
    diy: '~20 hours/mo',
    adrender: '~20 minutes/mo',
  },
] as const

export function SavingsCard() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-20" aria-labelledby="savings-heading">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0e1a22] via-[#12121a] to-[#1a1224] shadow-[0_0_50px_-28px_rgba(0,229,255,0.25)]">
            <div className="border-b border-white/[0.06] px-5 py-5 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-cyan)]">Savings</p>
              <h2 id="savings-heading" className="mt-2 font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
                How much does AdRender save you?
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-zinc-500">
                    <th className="px-5 py-3 font-medium sm:px-7" scope="col" />
                    <th className="px-4 py-3 font-medium" scope="col">
                      DIY (designer/agency)
                    </th>
                    <th className="px-5 py-3 font-semibold text-[var(--accent-cyan)] sm:px-7" scope="col">
                      AdRender
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-white/[0.05] last:border-0">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-5 py-4 font-medium text-zinc-300 sm:px-7"
                      >
                        {row.label}
                      </th>
                      <td className="px-4 py-4 text-zinc-500">{row.diy}</td>
                      <td className="px-5 py-4 font-medium text-zinc-100 sm:px-7">{row.adrender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-white/[0.06] px-5 py-4 sm:px-7">
              <Link
                to="/blog/how-much-does-adrender-actually-save-you"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-cyan)] transition hover:text-white"
              >
                See the full breakdown
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
