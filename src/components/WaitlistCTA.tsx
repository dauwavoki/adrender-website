import { useState, type FormEvent } from 'react'
import { ScrollReveal } from './ScrollReveal'

export function WaitlistCTA() {
  const [email, setEmail] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    console.log('waitlist:', email.trim())
    setEmail('')
  }

  return (
    <section id="waitlist" className="scroll-mt-28 border-y border-white/[0.06] bg-[#08080c] px-4 py-20 md:px-6 md:py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">Get in before the feed gets crowded</h2>
          <p className="mt-4 text-zinc-400">Join the waitlist — we&apos;ll email you when your workspace is ready.</p>
          <form onSubmit={onSubmit} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch">
            <label htmlFor="waitlist-email" className="sr-only">
              Email
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@store.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-12 flex-1 rounded-xl border border-white/[0.1] bg-[#0a0a0f] px-4 text-white outline-none ring-[#6366f1]/0 transition placeholder:text-zinc-600 focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/15"
            />
            <button
              type="submit"
              className="min-h-12 rounded-xl bg-[#6366f1] px-6 text-sm font-semibold text-white transition hover:bg-[#818cf8]"
            >
              Join waitlist
            </button>
          </form>
        </div>
      </ScrollReveal>
    </section>
  )
}
