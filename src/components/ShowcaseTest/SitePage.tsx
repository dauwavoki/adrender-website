import { ArrowRight, ChartLineUp, ChatsCircle, Infinity as InfinityIcon, LinkSimple, Trophy, VideoCamera } from '@phosphor-icons/react'
import type { SceneState } from './engine/story'
import { cx } from '../site/cx'

/** The AdRender website's affiliates page, drawn over the app. Words follow adrender.app/affiliates, without rates. */
const FEATURES = [
  { icon: InfinityIcon, title: 'No earnings cap', text: 'No limit on referrals or how much you can earn.' },
  { icon: ChartLineUp, title: 'Real-time dashboard', text: 'Track clicks, signups, and earnings as they happen.' },
  { icon: ChatsCircle, title: 'Private Discord', text: 'Access a private community built for AdRender affiliates.' },
  { icon: Trophy, title: 'Leaderboard prizes', text: 'Top performers earn prizes on top of standard commission.' },
  { icon: LinkSimple, title: 'Simple tracking', text: 'Share your unique referral code or link.' },
  { icon: VideoCamera, title: 'Make your promos with AdRender', text: 'Render videos and ads promoting your link, at no extra cost.' },
]
const STEPS = [
  { title: 'Create an account', text: 'Go to adrender.app and create an account.' },
  { title: 'Apply in your profile', text: 'Go to Profile → Affiliates and submit your application.' },
  { title: 'Get approved and start sharing', text: 'Approval usually takes less than a day. Your affiliate dashboard is then in the app.' },
]
const OFFSET = [0, 470, 850]
const OFFSET_PHONE = [0, 500, 1440]

export function SiteOverlay({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const on = state.site !== null
  const at = state.site ?? 0
  const y = (phone ? OFFSET_PHONE : OFFSET)[at] ?? 0
  return (
    <div className={cx('scv2-site', on && 'is-on', phone && 'is-phone')} aria-hidden={!on}>
      <div className="scv2-site-bar">
        <span className="scv2-site-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="scv2-site-url" data-sc="sc-site-url">
          adrender.app/affiliates
        </span>
      </div>
      <div className="scv2-site-view">
        <div className="scv2-site-page" data-sc-scroll="" data-scroll-y={y} style={{ transform: `translateY(${-y}px)` }}>
          <nav className="scv2-site-nav">
            <span className="scv2-site-logo">
              <img src="/brand/icons/icon-color.svg" alt="" />
              AdRender
            </span>
            {phone ? null : (
              <span className="scv2-site-links">
                <span>Product</span>
                <span>Pricing</span>
                <span>Blog</span>
                <span>Tutorials</span>
              </span>
            )}
            <span className="scv2-site-start">Start free</span>
          </nav>
          <section className="scv2-site-hero" data-sc="sc-site-hero">
            <h1>Earn with AdRender</h1>
            <p>Refer subscribers and earn a share of the profit. You also get the tool: use AdRender itself to render on-brand ads and videos promoting your link.</p>
            <span className="scv2-site-cta" data-sc="sc-site-cta">
              <ArrowRight size={14} weight="bold" />
              Sign up to become an affiliate
            </span>
            <small data-sc="sc-site-apply">Already have an account? Apply under Profile → Affiliates in the app.</small>
          </section>
          <section className="scv2-site-sec" data-sc="sc-site-features">
            <h2>Built for serious affiliates</h2>
            <div className="scv2-site-grid">
              {FEATURES.map(({ icon: Icon, title, text }, index) => (
                <div key={title} className="scv2-site-card" data-sc={`sc-site-card-${index + 1}`}>
                  <Icon size={18} />
                  <b>{title}</b>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="scv2-site-sec" data-sc="sc-site-steps">
            <h2>Three steps to get started</h2>
            {STEPS.map((step, index) => (
              <div key={step.title} className="scv2-site-step" data-sc={`sc-site-step-${index + 1}`}>
                <small>0{index + 1}</small>
                <b>{step.title}</b>
                <span>{step.text}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}
