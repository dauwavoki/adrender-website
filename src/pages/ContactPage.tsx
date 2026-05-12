import { useState, type FormEvent } from 'react'
import { ScrollReveal } from '../components/ScrollReveal'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    console.log('contact:', { name: name.trim(), email: email.trim(), message: message.trim() })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-lg">
        <ScrollReveal>
          <h1 className="text-center font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">Contact</h1>
          <p className="mt-3 text-center text-zinc-500">Questions about beta access, Shopify setup, or partnerships — send a note.</p>
        </ScrollReveal>

        <ScrollReveal>
          <form onSubmit={onSubmit} className="mt-12 space-y-5 rounded-2xl border border-white/[0.06] bg-[#12121a] p-6 md:p-8">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-zinc-300">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus-ring-brand w-full rounded-xl border border-white/[0.1] bg-[#0a0a0f] px-4 py-3 text-white outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring-brand w-full rounded-xl border border-white/[0.1] bg-[#0a0a0f] px-4 py-3 text-white outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-zinc-300">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="focus-ring-brand w-full resize-y rounded-xl border border-white/[0.1] bg-[#0a0a0f] px-4 py-3 text-white outline-none transition"
              />
            </div>
            <button type="submit" className="btn-cta w-full rounded-xl py-3.5 text-sm font-semibold">
              Submit
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  )
}
