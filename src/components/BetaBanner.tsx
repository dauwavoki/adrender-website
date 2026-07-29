import { useAppUrl } from '../hooks/useAppUrl'

export function BetaBanner() {
  const appUrl = useAppUrl()

  return (
    <div className="border-b border-white/[0.1] bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] px-4 py-3 text-center text-sm font-bold text-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)]">
      <a href={appUrl} className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 transition hover:opacity-95">
        <span>
          <span aria-hidden>🎨 </span>
          Generate on-brand ads in minutes — 20% off your first month
        </span>
        <span className="underline decoration-white/50 underline-offset-2">Start Free →</span>
      </a>
    </div>
  )
}
