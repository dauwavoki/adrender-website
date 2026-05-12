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
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Be first when we hit the Shopify App Store.
          </h2>
          <p className="mt-4 text-zinc-400">Leave your email and we&apos;ll notify you when AdRender is listed.</p>
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
              className="focus-ring-brand min-h-12 flex-1 rounded-xl border border-white/[0.1] bg-[#0a0a0f] px-4 text-white outline-none transition placeholder:text-zinc-600"
            />
            <button type="submit" className="btn-cta min-h-12 rounded-xl px-6 text-sm font-semibold">
              Notify Me
            </button>
          </form>
        </div>
      </ScrollReveal>
    </section>
  )
}
