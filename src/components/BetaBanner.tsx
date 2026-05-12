export function BetaBanner() {
  return (
    <div className="border-b border-white/[0.06] bg-[#0d0d14] px-4 py-2.5 text-center text-sm text-zinc-300">
      <span className="text-zinc-500" aria-hidden>
        🚀
      </span>{' '}
      <span className="font-medium text-zinc-200">Now in Beta</span>
      <span className="text-zinc-500"> — pricing locked for your first 6 months</span>
    </div>
  )
}
