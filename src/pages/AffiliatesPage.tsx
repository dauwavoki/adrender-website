import { ChartBar, ChatCircle, Gift, Infinity, Link as LinkIcon, VideoCamera } from '@phosphor-icons/react'
import { PageMeta } from '../components/PageMeta'
import { APP_BASE, getSignupUrl } from '../lib/appUrl'
import { useAppUrl } from '../hooks/useAppUrl'
import { SplitHero } from '../components/site/SplitHero'
import { StatRow } from '../components/site/StatRow'
import { NumberedStory } from '../components/site/NumberedStory'
import { CheckCaption } from '../components/site/CheckCaption'
import { FaqTwoColumn } from '../components/site/FaqTwoColumn'
import { ClosingCta } from '../components/site/ClosingCta'
import { PrimaryLink } from '../components/site/Buttons'
import { IconTile, toneAt } from '../components/site/IconTile'
import type { ComponentType } from 'react'
import type { IconWeight } from '@phosphor-icons/react'

const SITE_URL = 'https://adrender.app'

const TITLE = 'AdRender Affiliate Program — Earn 50% Commission'
const DESCRIPTION =
  'Join the AdRender affiliate program — 50% commission on referred subscribers before Oct 31, 2026. Real-time dashboard, biweekly payouts, no cap.'

const PERKS: {
  icon: ComponentType<{ className?: string; weight?: IconWeight; size?: number }>
  title: string
  body: string
}[] = [
  { icon: Infinity, title: 'No earnings cap', body: 'No limit on referrals or how much you can earn.' },
  { icon: ChartBar, title: 'Real-time dashboard', body: 'Track clicks, signups, and earnings as they happen.' },
  { icon: ChatCircle, title: 'Private Discord', body: 'Access a private community built for AdRender affiliates.' },
  { icon: Gift, title: 'Leaderboard prizes', body: 'Top performers earn prizes on top of standard commission.' },
  { icon: LinkIcon, title: 'Simple tracking', body: 'Share your unique referral code or link — that’s it.' },
  {
    icon: VideoCamera,
    title: 'Make your promos with AdRender',
    body: 'Use the platform itself to render UGC-style videos promoting your link — no separate video tool, no extra cost.',
  },
]

const PAYOUTS = [
  'Commission is calculated on the profit from each payment the referred subscriber makes.',
  'Monthly subscribers: commission paid every billing cycle, for up to 12 months per referral.',
  'Yearly subscribers: commission paid once, on that single yearly payment (it already covers 12 months).',
  'Payouts run every 2 weeks.',
  'First payout begins after the subscriber’s first month is complete.',
]

const FAQ = [
  {
    q: 'How is commission calculated?',
    a: 'Commission is calculated on the profit from each payment the referred subscriber makes — not on the full list price.',
  },
  {
    q: 'How long do I earn on a referral?',
    a: 'For monthly subscribers, commission is paid every billing cycle for up to 12 months per referral. For yearly subscribers, commission is paid once on that single yearly payment, since it already covers 12 months.',
  },
  {
    q: 'When do payouts start?',
    a: 'Payouts run every 2 weeks. Your first payout begins after the subscriber’s first month is complete.',
  },
  {
    q: 'What happens after October 31, 2026?',
    a: 'New campaigns will vary after that date, but no standard campaign will ever pay less than 20% commission. You can also negotiate a custom rate through our Split-Share program.',
  },
]

export function AffiliatesPage() {
  const appUrl = useAppUrl()
  const signupUrl = getSignupUrl()

  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} path="/affiliates" />
      <SplitHero
        lead="Earn with AdRender"
        aside={
          <p className="site-lead">
            Refer subscribers and earn a share of the profit — up to 50% when you join before October 31, 2026.
            You&apos;re not just earning commission — you&apos;re getting the tool. Use AdRender itself to render
            on-brand UGC-style videos and ads promoting your link, in minutes, with the exact same renderer
            you&apos;re recommending to everyone else.
          </p>
        }
        actions={<PrimaryLink href={signupUrl}>Sign up to become an affiliate</PrimaryLink>}
        note={<p className="site-meta">Already have an account? Apply under Profile → Affiliates in the app.</p>}
      />

      <section className="site-section">
        <div className="site-column">
          <h2 className="site-h2">Clear rates. No fine print surprises.</h2>
          <div style={{ marginTop: 28 }}>
            <StatRow
              items={[
                { value: '50%', label: 'of profit on every referred subscriber. Sign up before October 31, 2026 to lock in the 50% rate.' },
                { value: '20%+', label: 'minimum on standard campaigns after that date. Negotiate a custom rate through Split-Share.' },
              ]}
            />
          </div>
          <h3 className="site-h3" style={{ marginTop: 36 }}>
            Payout terms
          </h3>
          <div className="site-checks" style={{ marginTop: 12 }}>
            {PAYOUTS.map((item) => (
              <CheckCaption key={item} lead={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-column">
          <h2 className="site-h2">Built for serious affiliates</h2>
          <div className="site-card-grid cols-3" style={{ marginTop: 28 }}>
            {PERKS.map((perk, index) => {
              const Icon = perk.icon
              return (
                <article key={perk.title} className="site-plan">
                  <IconTile tone={toneAt(index)} size={32}>
                    <Icon size={16} />
                  </IconTile>
                  <h3>{perk.title}</h3>
                  <p className="site-body">{perk.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-column">
          <h2 className="site-h2">Three steps to get started</h2>
          <div style={{ marginTop: 28 }}>
            <NumberedStory
              sticky={false}
              steps={[
                {
                  id: 'affiliate-account',
                  indexLabel: 'Create an account',
                  title: 'Create an account',
                  body: (
                    <>
                      Go to <a href={appUrl}>{APP_BASE}</a> (or <a href={SITE_URL}>{SITE_URL}</a>) and create an
                      account.
                    </>
                  ),
                },
                {
                  id: 'affiliate-apply',
                  indexLabel: 'Apply in your profile',
                  title: 'Apply in your profile',
                  body: 'Go to Profile → Affiliates and submit your application.',
                },
                {
                  id: 'affiliate-share',
                  indexLabel: 'Get approved and start sharing',
                  title: 'Get approved and start sharing',
                  body: (
                    <>
                      Approval usually takes less than a day. Once approved, your affiliate dashboard is available
                      inside <a href={appUrl}>app.adrender.app</a>. Check your spam folder for the approval email, or
                      just log back in to confirm.
                    </>
                  ),
                },
              ]}
            />
          </div>
          <div style={{ marginTop: 24 }}>
            <PrimaryLink href={signupUrl}>Create your account</PrimaryLink>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-column">
          <FaqTwoColumn items={FAQ} title="Common questions" />
        </div>
      </section>

      <ClosingCta
        lead="Ready to start earning?"
        sentence="Create an account at app.adrender.app, then apply under Profile → Affiliates. Early enrollment for 50% commission closes October 31, 2026."
        href={signupUrl}
        label="Sign up at app.adrender.app"
        note="Prefer the marketing site first? Visit adrender.app."
      />
    </>
  )
}
