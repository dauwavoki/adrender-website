import { useState, type FormEvent } from 'react'
import { ChatCircle, EnvelopeSimple, Storefront } from '@phosphor-icons/react'
import { PageMeta } from '../components/PageMeta'
import { SplitTitle } from '../components/site/SplitTitle'
import { Stage } from '../components/site/Stage'
import { IconTile } from '../components/site/IconTile'

const MARKETING_CONTACT_URL =
  'https://oxxsgplmsqajhvjveact.supabase.co/functions/v1/marketing-contact'

const TITLE = 'Contact AdRender — Beta, Shopify & Partnerships'
const DESCRIPTION =
  'Questions about beta access, catalog sync, Shopify, or partnerships? Contact the AdRender team — we typically reply within 24 hours.'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const BULLETS = [
  { icon: ChatCircle, tone: 'blue' as const, text: 'Beta access' },
  { icon: Storefront, tone: 'amber' as const, text: 'Catalog sync and Shopify' },
  { icon: EnvelopeSimple, tone: 'violet' as const, text: 'Partnerships' },
]

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(MARKETING_CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          email: email.trim(),
          name: name.trim(),
          message: message.trim(),
        }),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="site-section">
      <PageMeta title={TITLE} description={DESCRIPTION} path="/contact" />
      <div className="site-column contact-split">
        <div>
          <SplitTitle as="h1" lead="Contact" />
          <p className="site-lead" style={{ marginTop: 12 }}>
            Questions about beta access, catalog sync, Shopify, or partnerships — send a note.
          </p>
          <ul className="contact-bullets">
            {BULLETS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.text}>
                  <IconTile tone={item.tone} size={32}>
                    <Icon size={16} />
                  </IconTile>
                  <span>{item.text}</span>
                </li>
              )
            })}
          </ul>
          <p className="site-body" style={{ marginTop: 20 }}>
            Talk to us through the customer service chat or send us an email at{' '}
            <a href="mailto:info@adrender.app">info@adrender.app</a>.
          </p>
          <address className="site-meta" style={{ marginTop: 24, fontStyle: 'normal' }}>
            ADRENDER LLC
            <br />
            1065 SW 8th Street, Suite 2325
            <br />
            Miami, FL 33130
          </address>
        </div>

        <Stage>
          <form onSubmit={onSubmit} className="contact-form">
            <div className="site-field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="site-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="site-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="site-btn site-btn-primary site-btn-block" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Submit'}
            </button>
            {status === 'success' ? (
              <p className="site-meta" role="status">
                Message sent. We&apos;ll get back to you within 24 hours.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="site-meta" role="alert">
                Something went wrong — please try again.
              </p>
            ) : null}
          </form>
        </Stage>
      </div>
    </section>
  )
}
