import type { ReactNode } from 'react'
import {
  ChartBar,
  Check,
  CheckCircle,
  CircleNotch,
  Coins,
  CreditCard,
  Copy,
  FolderSimple,
  Handshake,
  LinkSimple,
  Moon,
  Plus,
  Shield,
  SignOut,
  SquaresFour,
  TrendUp,
  UserCircle,
  UserCircleCheck,
  UsersFour,
  Users,
  X,
} from '@phosphor-icons/react'
import { ACCOUNT } from '../showcaseData'
import type { ProfileTab, SceneState } from '../engine/story'
import { balanceFor } from '../engine/layout'
import { cx } from '../../site/cx'
import { Badge, Segmented } from './screens'
import { COLLECTIONS, PACKS, collectionCount } from './pagesData'


const ME = { name: 'Jordan Lee', email: 'jordan@yourbrand.com' }
const TEAM_NAME = 'Studio Team'
const CODE = 'JORDAN'

/* ── Account menu (desktop profile orb, phone workspace menu) ───────── */

function Row({ icon, children, sc, trailing }: { icon: ReactNode; children: ReactNode; sc?: string; trailing?: ReactNode }) {
  return (
    <span className="sc-menu-row" data-sc={sc}>
      {icon}
      <span className="sc-menu-label">{children}</span>
      {trailing}
    </span>
  )
}

/** Small picker that drops from the home title or the cockpit's workspace chip. */
export function WsDropdown({ state, where }: { state: SceneState; where: 'home' | 'cockpit' }) {
  if (state.wsPick !== where) return null
  return (
    <div className={cx('sc-ws-drop', where === 'cockpit' && 'is-up')} data-sc="sc-ws-drop">
      <span className={cx('sc-menu-ws', state.wsCur === 0 && 'is-on')} data-sc="sc-ws-personal">
        <UserCircleCheck size={16} />
        <span className="sc-menu-ws-text">
          <span>Personal</span>
          <small>Workspace</small>
        </span>
        {state.wsCur === 0 ? <Check size={16} /> : null}
      </span>
      {state.ws >= 1 ? (
        <span className={cx('sc-menu-ws', state.wsCur === 1 && 'is-on')} data-sc="sc-ws-team">
          <UsersFour size={16} />
          <span className="sc-menu-ws-text">
            <span>{TEAM_NAME}</span>
            <small>Owner</small>
          </span>
          {state.wsCur === 1 ? <Check size={16} /> : null}
        </span>
      ) : null}
    </div>
  )
}

function WorkspaceRows({ state }: { state: SceneState }) {
  return (
    <>
      <span className="sc-menu-ws is-on">
        <UserCircleCheck size={16} />
        <span className="sc-menu-ws-text">
          <span>Personal</span>
          <small>Workspace</small>
        </span>
        {state.wsCur === 0 ? <Check size={16} /> : null}
      </span>
      {state.ws >= 1 ? (
        <span className="sc-menu-ws rise" data-sc="sc-ws-team">
          <UsersFour size={16} />
          <span className="sc-menu-ws-text">
            <span>{TEAM_NAME}</span>
            <small>Owner</small>
          </span>
          {state.wsCur === 1 ? <Check size={16} /> : null}
        </span>
      ) : null}
      <Row icon={<Plus size={16} />} sc="sc-create-ws">
        Create workspace
      </Row>
    </>
  )
}

/** Desktop: opens from the profile orb in the dock. */
export function AccountMenu({ state }: { state: SceneState }) {
  const approved = state.aff >= 8
  return (
    <div className="sc-account-menu" data-sc="sc-account-menu">
      <div className="sc-menu-head">
        <span className="sc-menu-avatar">{ACCOUNT.initial}</span>
        <span className="sc-menu-ws-text">
          <span>{ME.name}</span>
          <small>{ME.email}</small>
        </span>
      </div>
      <span className="sc-menu-div" />
      <WorkspaceRows state={state} />
      <span className="sc-menu-div" />
      <Row icon={<UserCircle size={16} />} sc="sc-menu-profile">
        Profile &amp; account
      </Row>
      <Row icon={<CreditCard size={16} />}>Plans &amp; billing</Row>
      {approved ? <Row icon={<Handshake size={16} />}>Affiliate</Row> : null}
      <span className="sc-menu-row">
        <Moon size={16} />
        <span className="sc-menu-label">Appearance</span>
        <Segmented options={['Light', 'Dark']} value={1} />
      </span>
      <div className="sc-menu-plan">
        <p>{ACCOUNT.plan.name} Plan</p>
        <div>
          <span className="tabular-nums">
            {balanceFor(state)} <small>tokens</small>
          </span>
          <span className="sc-btn is-secondary is-sm" data-sc="sc-topup">
            <Plus size={14} />
            Top up
          </span>
        </div>
      </div>
      <span className="sc-menu-div" />
      <Row icon={<SignOut size={16} />}>Sign out</Row>
    </div>
  )
}

/** Phone: drops down from the workspace button in the header. */
export function PhoneWorkspaceMenu({ state }: { state: SceneState }) {
  return (
    <div className="sc-account-menu is-phone" data-sc="sc-account-menu">
      <WorkspaceRows state={state} />
    </div>
  )
}

/* ── Modals ─────────────────────────────────────────────────────────── */

export function ModalLayer({ state }: { state: SceneState }) {
  if (!state.modal) return null
  return (
    <div className="sc-modal-scrim">
      {state.modal === 'workspace' ? (
        <div className="sc-modal" data-sc="sc-modal">
          <div className="sc-modal-head">
            <span>Create workspace</span>
            <X size={16} />
          </div>
          <div className="sc-modal-body">
            <p className="sc-modal-label">Workspace name</p>
            <div className="sc-modal-row">
              <span className="sc-pg-iconbtn">
                <UsersFour size={18} />
              </span>
              <span className={cx('sc-input', 'is-grow', state.url && 'is-focus')} data-sc="sc-ws-name">
                {state.url ? <span className="sc-input-text">{state.url}</span> : <span className="sc-input-ph">e.g. Client work</span>}
              </span>
            </div>
            <p className="sc-modal-note">Teammates you invite share this workspace&apos;s brands, templates and ads.</p>
            <div className="sc-modal-foot">
              <span className="sc-btn is-secondary">Cancel</span>
              <span className={cx('sc-btn is-primary', !state.url && 'is-disabled')} data-sc="sc-ws-create">
                Create
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="sc-modal" data-sc="sc-modal">
          <div className="sc-modal-head">
            <span className="sc-modal-title">
              <Coins size={18} />
              Add tokens
            </span>
            <X size={16} />
          </div>
          <div className="sc-modal-body">
            <div className="sc-modal-balance">
              <span>Current balance</span>
              <b className="tabular-nums">
                <Coins size={16} />
                {balanceFor(state)} tokens
              </b>
            </div>
            <div className="sc-pack-grid">
              {PACKS.map((pack, index) => (
                <span key={pack.price} className={cx('sc-pack', state.pack === index && 'is-on')} data-sc={`sc-pack-${index}`}>
                  {pack.badge ? <i>{pack.badge}</i> : null}
                  {state.pack === index ? <Check size={12} weight="bold" className="sc-pack-check" /> : null}
                  <b>${pack.price}</b>
                  <small>{pack.tokens.toLocaleString()} tokens</small>
                </span>
              ))}
            </div>
            <span className="sc-btn is-primary sc-modal-wide" data-sc="sc-add-tokens">
              Add {PACKS[state.pack].tokens.toLocaleString()} tokens for ${PACKS[state.pack].price}.00
            </span>
            <p className="sc-modal-note is-center">Top-up tokens never expire.</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Profile page ───────────────────────────────────────────────────── */

const TABS: { id: ProfileTab; label: string; icon: ReactNode }[] = [
  { id: 'account', label: 'My account', icon: <ChartBar size={16} /> },
  { id: 'billing', label: 'Plans and billing', icon: <CreditCard size={16} /> },
  { id: 'workspace', label: 'Workspace', icon: <Users size={16} /> },
  { id: 'affiliate', label: 'Affiliate', icon: <Handshake size={16} /> },
  { id: 'stats', label: 'Affiliate stats', icon: <TrendUp size={16} /> },
]

function Field({ label, required, value, tall, sc }: { label: string; required?: boolean; value: string; tall?: boolean; sc: string }) {
  return (
    <div className="sc-field" data-sc={sc}>
      <p className="sc-field-label">
        {label} {required ? <span className="sc-req">*</span> : <span className="sc-muted-xs">(optional)</span>}
      </p>
      <span className={cx('sc-input', tall && 'is-tall')}>
        {value ? <span className="sc-input-text sc-rise-in">{value}</span> : <span className="sc-input-ph">&nbsp;</span>}
      </span>
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="sc-stat">
      <span>{label}</span>
      <b className="tabular-nums">{value}</b>
      {sub ? <small>{sub}</small> : null}
    </div>
  )
}

function AffiliateForm({ state }: { state: SceneState }) {
  const aff = state.aff
  return (
    <div className="sc-pg-cols">
      <div className="sc-card sc-pg-card">
        <Field sc="sc-aff-name" label="Your name" required value={aff >= 1 ? ME.name : ''} />
        <Field
          sc="sc-aff-platforms"
          label="Platforms & audience"
          required
          tall
          value={aff >= 2 ? 'TikTok and Instagram, 48K followers. I cover fitness and DTC brands.' : ''}
        />
        <Field
          sc="sc-aff-fit"
          label="Why would you be a good fit?"
          required
          tall
          value={aff >= 3 ? 'I break down winning ads for small brands every week and test new creatives constantly.' : ''}
        />
        <Field sc="sc-aff-links" label="Links to past work" value="" />
      </div>
      <div className="sc-card sc-pg-card">
        <p className="sc-pg-h">
          Affiliate program terms <span className="sc-req">*</span>
        </p>
        <div className="sc-terms">
          <p>Commission is paid on the profit from each payment a referred subscriber makes. Payouts run every 2 weeks.</p>
        </div>
        <span className="sc-check-row" data-sc="sc-aff-terms">
          <span className={cx('sc-checkbox', aff >= 4 && 'is-on')}>{aff >= 4 ? <Check size={12} weight="bold" /> : null}</span>I agree to the affiliate program terms
        </span>
        <span className={cx('sc-btn is-primary', aff < 4 && 'is-disabled')} data-sc="sc-aff-submit">
          {aff === 5 ? <CircleNotch size={16} className="sc-spin" /> : <Handshake size={16} />}
          {aff === 5 ? 'Sending…' : 'Apply'}
        </span>
      </div>
    </div>
  )
}

function AffiliateTab({ state }: { state: SceneState }) {
  const aff = state.aff
  if (aff <= 5) return <AffiliateForm state={state} />
  if (aff === 6) {
    return (
      <div className="sc-card sc-pg-card sc-rise-in" data-sc="sc-aff-received">
        <p className="sc-pg-h">
          <CheckCircle size={18} className="sc-text-success" />
          Application received
        </p>
        <p className="sc-pg-p">We&apos;ll email you when it&apos;s reviewed. Approval usually takes less than a day.</p>
        <Badge>Pending review</Badge>
      </div>
    )
  }
  if (aff === 7) {
    return (
      <div className="sc-pg-stack">
        <div className="sc-card sc-pg-card sc-rise-in">
          <p className="sc-pg-h">
            <CheckCircle size={18} className="sc-text-success" />
            You&apos;re approved
          </p>
          <p className="sc-pg-p">One last step: tell us where to send your payouts.</p>
        </div>
        <div className="sc-card sc-pg-card">
          <p className="sc-pg-h">Where should we send your payouts?</p>
          <div className="sc-field">
            <p className="sc-field-label">
              Country <span className="sc-req">*</span>
            </p>
            <span className="sc-input">
              <span className="sc-input-text">United States</span>
            </span>
          </div>
          <span className="sc-btn is-primary" data-sc="sc-aff-connect">
            Connect payouts
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className="sc-pg-stack">
      <div className="sc-card sc-pg-card sc-rise-in" data-sc="sc-aff-code">
        <div className="sc-pg-row">
          <p className="sc-pg-h">Your referral code</p>
          <Badge tone="success">Approved</Badge>
        </div>
        <div className="sc-pg-row">
          <span className="sc-code">{CODE}</span>
          <span className="sc-btn is-secondary is-sm" data-sc="sc-aff-copy">
            <Copy size={14} />
            Copy code
          </span>
          <span className="sc-btn is-secondary is-sm">
            <LinkSimple size={14} />
            Copy link
          </span>
        </div>
        <p className="sc-pg-p">Share your code or link. Payouts run every 2 weeks.</p>
      </div>
      <div className="sc-card sc-pg-card sc-rise-in">
        <p className="sc-pg-h">Make your promos with AdRender</p>
        <p className="sc-pg-p">Render UGC-style videos and ads that promote your link, with the same renderer you recommend.</p>
      </div>
    </div>
  )
}

const REFERRALS = [
  { who: 'm***@gmail.com', status: 'Subscribed', earned: '$14.20' },
  { who: 'a***@studio.co', status: 'Subscribed', earned: '$9.60' },
  { who: 'k***@brand.io', status: 'Trial', earned: '—' },
]

function StatsTab() {
  return (
    <div className="sc-pg-stack">
      <div className="sc-stat-row">
        <Stat label="Clicks" value="128" />
        <Stat label="Signups" value="21" />
        <Stat label="Subscribers" value="6" />
        <Stat label="Earned" value="$47.80" sub="Next payout in 9 days" />
      </div>
      <div className="sc-card sc-pg-table">
        <p className="sc-pg-h">Recent referrals</p>
        {REFERRALS.map((row) => (
          <div key={row.who} className="sc-pg-tr">
            <span>{row.who}</span>
            <Badge tone={row.status === 'Subscribed' ? 'success' : undefined}>{row.status}</Badge>
            <b className="tabular-nums">{row.earned}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkspaceTab({ state }: { state: SceneState }) {
  const team = state.ws >= 1
  return (
    <div className="sc-pg-stack">
      {team ? (
        <div className="sc-card sc-pg-card">
          <p className="sc-pg-h">Workspace settings</p>
          <div className="sc-field">
            <p className="sc-field-label">Workspace name</p>
            <div className="sc-modal-row">
              <span className="sc-pg-iconbtn">
                <UsersFour size={18} />
              </span>
              <span className="sc-input is-grow">
                <span className="sc-input-text">{TEAM_NAME}</span>
              </span>
              <span className="sc-btn is-secondary">Save name</span>
            </div>
          </div>
        </div>
      ) : null}
      {team ? (
        <div className="sc-card sc-pg-card" data-sc="sc-cap">
          <p className="sc-pg-h">
            <Coins size={16} className="sc-text-accent" />
            Monthly token cap
          </p>
          <p className="sc-pg-p">Limit how much of your shared token pool this workspace can use each billing cycle.</p>
          <div className="sc-pg-row">
            <Segmented options={['Unlimited', 'Percentage']} value={state.team >= 3 ? 1 : 0} />
            {state.team >= 3 ? (
              <span className="sc-input is-small">
                <span className="sc-input-text">30</span>
              </span>
            ) : null}
            {state.team >= 3 ? <span className="sc-muted-xs">%</span> : null}
            <span className="sc-btn is-secondary" data-sc="sc-cap-save">
              Save cap
            </span>
          </div>
        </div>
      ) : null}
      <div className="sc-card sc-pg-table" data-sc="sc-members">
        <div className="sc-pg-row sc-pg-members-head">
          <p className="sc-pg-h">Members</p>
          <span className="sc-pg-row">
            <span className="sc-link-btn" data-sc="sc-invite">
              <LinkSimple size={14} />
              Invite
            </span>
            <span className="sc-link-btn is-muted">
              <Shield size={14} />
              Invite admin
            </span>
          </span>
        </div>
        <div className="sc-pg-tr">
          <span>{ME.name} (You)</span>
          <Badge>Owner</Badge>
        </div>
        {state.team >= 2 ? (
          <div className="sc-pg-tr sc-rise-in" data-sc="sc-member-new">
            <span>Alex Rivera</span>
            <Badge>Member</Badge>
          </div>
        ) : null}
        {state.team >= 1 ? (
          <div className="sc-pg-invite sc-rise-in" data-sc="sc-invite-link">
            <small>Latest invite link</small>
            <span className="sc-input">
              <span className="sc-input-text">adrender.app/join/x7Kq…</span>
            </span>
            <span className="sc-btn is-secondary is-sm">
              <Copy size={14} />
              Copy
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function AccountTab() {
  return (
    <div className="sc-stat-row">
      <Stat label="Ads generated" value={ACCOUNT.stats.ads.toLocaleString()} />
      <Stat label="Templates saved" value={String(ACCOUNT.stats.saved)} />
      <Stat label="Brands" value={String(ACCOUNT.stats.brands)} />
    </div>
  )
}

export function ProfileScreen({ state, phone = false }: { state: SceneState; phone?: boolean }) {
  const tabs = TABS.filter((tab) => (tab.id === 'stats' ? state.aff >= 8 : true))
  return (
    <div className={cx('sc-profile', phone && 'is-phone')}>
      <header className="sc-page-header">
        <div className="sc-page-row">
          <p className="cockpit-page-title">
            <UserCircle size={16} />
            <span className="cockpit-page-title-name">Profile</span>
          </p>
        </div>
        <div className="sc-pg-tabs">
          {tabs.map((tab) => (
            <span key={tab.id} className={cx('sc-pg-tab', state.ptab === tab.id && 'is-on')} data-sc={`sc-ptab-${tab.id}`}>
              {tab.icon}
              <span className="sc-pg-tab-label">{tab.label}</span>
            </span>
          ))}
        </div>
      </header>
      <div className="sc-pg-body">
        {state.ptab === 'account' ? <AccountTab /> : null}
        {state.ptab === 'workspace' ? <WorkspaceTab state={state} /> : null}
        {state.ptab === 'affiliate' ? <AffiliateTab state={state} /> : null}
        {state.ptab === 'stats' ? <StatsTab /> : null}
        {state.ptab === 'billing' ? <AccountTab /> : null}
      </div>
    </div>
  )
}

/* ── Saved Templates ────────────────────────────────────────────────── */


/* ── Library collections ────────────────────────────────────────────── */

export function CollectionNav({ state, total }: { state: SceneState; total: number }) {
  const list = COLLECTIONS.slice(0, state.shelf >= 2 ? 3 : 2)
  return (
    <nav className="sc-collections" aria-label="Collections" data-sc="sc-collections">
      {list.map((name, index) => (
        <span key={name} className={cx('sc-coll', state.folder === index && 'is-on', index === 2 && 'sc-rise-in')} data-sc={`sc-coll-${index}`}>
          {index === 0 ? <SquaresFour size={16} /> : <FolderSimple size={16} />}
          {name}
          <b>{collectionCount(state, index, total)}</b>
        </span>
      ))}
      <span className="sc-coll is-new" data-sc="sc-new-collection">
        <Plus size={16} />
        New collection
      </span>
    </nav>
  )
}

export function SelectionBar({ state }: { state: SceneState }) {
  if (state.picks === 0 || state.shelf >= 3) return null
  return (
    <div className="sc-selbar sc-rise-in" data-sc="sc-selbar">
      <b>{state.picks} selected</b>
      <span className="sc-btn is-secondary is-sm" data-sc="sc-save-to">
        <FolderSimple size={14} />
        Save to collection
      </span>
      <span className="sc-btn is-secondary is-sm">Download</span>
    </div>
  )
}

export function NewCollectionDialog({ state }: { state: SceneState }) {
  if (state.shelf !== 1) return null
  return (
    <div className="sc-modal-scrim">
      <div className="sc-modal is-small" data-sc="sc-modal">
        <div className="sc-modal-head">
          <span>New collection</span>
          <X size={16} />
        </div>
        <div className="sc-modal-body">
          <span className={cx('sc-input', state.url && 'is-focus')} data-sc="sc-coll-name">
            {state.url ? <span className="sc-input-text">{state.url}</span> : <span className="sc-input-ph">Collection name</span>}
          </span>
          <div className="sc-modal-foot">
            <span className="sc-btn is-secondary">Cancel</span>
            <span className={cx('sc-btn is-primary', !state.url && 'is-disabled')} data-sc="sc-coll-create">
              Create
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Toast({ state }: { state: SceneState }) {
  if (state.saved !== 1) return null
  return (
    <div className="sc-toast sc-rise-in">
      <CheckCircle size={16} className="sc-text-success" />
      Saved to Saved Templates
    </div>
  )
}

