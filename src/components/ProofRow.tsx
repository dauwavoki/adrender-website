import { StatRow } from './site/StatRow'

const DEFAULT_STATS = [
  '100M+ proven ads benchmarked',
  'Hundreds of ads in under 10 minutes',
  '$19 to start',
] as const

type ProofRowProps = {
  stats?: readonly [string, string, string]
  /** Extra top space when the hero stage overlaps this row. */
  clearStage?: boolean
}

export function ProofRow({ stats = DEFAULT_STATS, clearStage = false }: ProofRowProps) {
  return (
    <section className={clearStage ? 'site-after-overlap' : 'site-proof'}>
      <div className="site-column">
        <StatRow variant="text" items={stats.map((value) => ({ value }))} />
      </div>
    </section>
  )
}
