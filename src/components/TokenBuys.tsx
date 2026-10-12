import type { CSSProperties, ReactNode } from 'react'
import { ScrollReveal } from './ScrollReveal'

type Accent = {
  from: string
  to: string
}

type RateColumns = {
  resolution: string
  standard: string
  pro: string
}

type RateRow = {
  resolution: string
  standard: number
  pro: number
}

type RateTable = {
  title: string
  accent: Accent
  columns: RateColumns
  unitLabel: string
  rows: RateRow[]
}

type TokenPack = {
  price: number
  tokens: number
  badge?: string
}

type TokenBuysContent = {
  heading: string
  subline: string
  imageAds: RateTable
  videoAds: RateTable & {
    example: {
      seconds: number
      resolution: string
      tier: 'standard' | 'pro'
    }
    duration: {
      standardMaxSeconds: number
      proMaxSeconds: number
      minSeconds: number
    }
  }
  topUps: {
    title: string
    accent: Accent
    packs: TokenPack[]
    notes: string[]
  }
}

/** Edit token rates, pack prices, and limits here. */
const TOKEN_BUYS: TokenBuysContent = {
  heading: 'What 1 token buys',
  subline: '1 token = one 1K image ad. Everything else scales from there.',
  imageAds: {
    title: 'Image ads',
    accent: { from: '#00e5ff', to: '#2f80ff' },
    columns: { resolution: 'Resolution', standard: 'Standard', pro: 'Pro' },
    unitLabel: '(tokens)',
    rows: [
      { resolution: '1K', standard: 1, pro: 2 },
      { resolution: '2K', standard: 2, pro: 4 },
      { resolution: '4K', standard: 4, pro: 8 },
    ],
  },
  videoAds: {
    title: 'Video ads',
    accent: { from: '#7b4fd4', to: '#e23d9b' },
    columns: { resolution: 'Resolution', standard: 'Standard', pro: 'Pro' },
    unitLabel: 'tokens per second',
    rows: [
      { resolution: '480p', standard: 5, pro: 7 },
      { resolution: '720p', standard: 8, pro: 11 },
      { resolution: '1080p', standard: 10, pro: 13 },
      { resolution: '4K', standard: 11, pro: 15 },
    ],
    example: { seconds: 5, resolution: '720p', tier: 'standard' },
    duration: { standardMaxSeconds: 15, proMaxSeconds: 30, minSeconds: 4 },
  },
  topUps: {
    title: 'Top-ups',
    accent: { from: '#f5b031', to: '#ff6b2b' },
    packs: [
      { price: 12, tokens: 100 },
      { price: 30, tokens: 300 },
      { price: 75, tokens: 900, badge: 'Popular' },
      { price: 180, tokens: 2400 },
      { price: 400, tokens: 6000, badge: 'Best value' },
      { price: 750, tokens: 12000, badge: 'Ultimate savings' },
    ],
    notes: ['Top-up tokens never expire.', 'Failed renders are refunded.'],
  },
}

function formatTokens(value: number) {
  return value.toLocaleString('en-US')
}

function formatPrice(amount: number) {
  return `$${amount.toLocaleString('en-US')}`
}

function accentStyle(accent: Accent): CSSProperties {
  return {
    '--token-from': accent.from,
    '--token-to': accent.to,
  } as CSSProperties
}

function exampleNote(video: TokenBuysContent['videoAds']) {
  const row = video.rows.find((entry) => entry.resolution === video.example.resolution)
  const rate = row ? (video.example.tier === 'pro' ? row.pro : row.standard) : 0
  const total = rate * video.example.seconds
  const tierLabel = video.columns[video.example.tier]
  return `Example: a ${video.example.seconds}-second ${video.example.resolution} ad = ${formatTokens(total)} tokens (${tierLabel}).`
}

function durationNote(video: TokenBuysContent['videoAds']) {
  const { columns, duration } = video
  return `${columns.standard} up to ${duration.standardMaxSeconds}s, ${columns.pro} up to ${duration.proMaxSeconds}s. ${duration.minSeconds}s minimum.`
}

function TokenFigure({ value, minWidth }: { value: number; minWidth: string }) {
  return (
    <span
      className="token-buy-gradient-text inline-block text-right font-heading text-3xl font-bold leading-none tracking-tight tabular-nums lg:text-2xl xl:text-3xl"
      style={{ minWidth }}
    >
      {formatTokens(value)}
    </span>
  )
}

function BuyCard({ accent, title, children }: { accent: Accent; title: string; children: ReactNode }) {
  return (
    <article
      className="token-buy-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.06]"
      style={accentStyle(accent)}
    >
      <span className="token-buy-edge" aria-hidden="true" />
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <h4 className="token-buy-gradient-text font-heading text-xl font-bold tracking-tight">{title}</h4>
        {children}
      </div>
    </article>
  )
}

function RateCard({ table, notes }: { table: RateTable; notes?: string[] }) {
  return (
    <BuyCard accent={table.accent} title={table.title}>
      <div className="mt-5 min-w-0">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{`${table.title} by resolution, ${table.unitLabel}`}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500"
              >
                {table.columns.resolution}
              </th>
              <th
                scope="col"
                className="pb-1 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500"
              >
                {table.columns.standard}
              </th>
              <th
                scope="col"
                className="pb-1 pl-3 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500"
              >
                {table.columns.pro}
              </th>
            </tr>
            <tr>
              <td />
              <th
                scope="colgroup"
                colSpan={2}
                className="pb-1 text-right text-[11px] font-medium tracking-normal text-zinc-500 normal-case"
              >
                {table.unitLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.resolution} className="border-t border-white/[0.06]">
                <th scope="row" className="py-3 pr-3 text-sm font-medium text-zinc-300">
                  {row.resolution}
                </th>
                <td className="py-3 text-right align-baseline">
                  <TokenFigure value={row.standard} minWidth="2.5ch" />
                </td>
                <td className="py-3 pl-3 text-right align-baseline">
                  <TokenFigure value={row.pro} minWidth="2.5ch" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {notes && notes.length > 0 ? (
        <div className="mt-auto space-y-1.5 pt-4">
          {notes.map((note) => (
            <p key={note} className="text-sm leading-relaxed text-zinc-500">
              {note}
            </p>
          ))}
        </div>
      ) : null}
    </BuyCard>
  )
}

function TopUpsCard({ topUps }: { topUps: TokenBuysContent['topUps'] }) {
  return (
    <BuyCard accent={topUps.accent} title={topUps.title}>
      <ul className="mt-5 min-w-0">
        {topUps.packs.map((pack) => (
          <li
            key={pack.price}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-white/[0.06] py-3 last:border-b-0"
          >
            <span className="min-w-0">
              <span className="text-sm font-medium tabular-nums text-zinc-300">
                {formatPrice(pack.price)} =
              </span>
              {pack.badge ? (
                <span className="mt-1 inline-block max-w-full rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.08em] text-zinc-200">
                  {pack.badge}
                </span>
              ) : null}
            </span>
            <span className="text-right">
              <TokenFigure value={pack.tokens} minWidth="6.5ch" />
              <span className="mt-1 block text-[11px] font-medium leading-none text-zinc-500">tokens</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto space-y-1.5 pt-4">
        {topUps.notes.map((note) => (
          <p key={note} className="text-sm leading-relaxed text-zinc-500">
            {note}
          </p>
        ))}
      </div>
    </BuyCard>
  )
}

export function TokenBuys() {
  const videoNotes = [exampleNote(TOKEN_BUYS.videoAds), durationNote(TOKEN_BUYS.videoAds)]

  return (
    <ScrollReveal>
      <div className="mt-16 min-w-0 md:mt-20">
        <h3 className="text-center font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
          {TOKEN_BUYS.heading}
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-center text-zinc-500">{TOKEN_BUYS.subline}</p>
        <div className="mt-10 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
          <RateCard table={TOKEN_BUYS.imageAds} />
          <RateCard table={TOKEN_BUYS.videoAds} notes={videoNotes} />
          <TopUpsCard topUps={TOKEN_BUYS.topUps} />
        </div>
      </div>
    </ScrollReveal>
  )
}
