const DEFAULT_STATS = [
  '100M+ proven ads benchmarked',
  'Hundreds of ads in under 10 minutes',
  '$19 to start',
] as const

type ProofRowProps = {
  stats?: readonly [string, string, string]
}

export function ProofRow({ stats = DEFAULT_STATS }: ProofRowProps) {
  return (
    <section className="border-y border-white/[0.06] bg-[#0e0e14] px-4 py-8 md:px-6">
      <p className="mx-auto max-w-5xl text-center text-sm font-medium tracking-wide text-zinc-400 md:text-base">
        {stats.map((stat, i) => (
          <span key={stat}>
            {i > 0 && (
              <span className="mx-3 text-zinc-700" aria-hidden>
                ·
              </span>
            )}
            <span className="text-zinc-200">{stat}</span>
          </span>
        ))}
      </p>
    </section>
  )
}
