export function BetaBanner() {
  return (
    <div className="border-b border-white/[0.1] bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] px-4 py-3 text-center text-sm font-bold text-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)]">
      <span aria-hidden>🚀 </span>
      <strong className="font-bold">Now Live in Beta</strong>
      <span className="font-bold"> — Subscribe today. Pricing locked for your first 6 months.</span>
    </div>
  )
}
