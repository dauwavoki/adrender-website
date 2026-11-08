import type { ReactNode } from 'react'
import { SplitTitle } from './site/SplitTitle'
import { TextLink } from './site/Buttons'

type CostRow = { tool: string; cost: string; emphasize?: boolean }

/** Single source for the totals shown in the full table and the homepage summary. */
const STATIC_SUBTOTAL = '$104–278/mo'
const VIDEO_SUBTOTAL = '$133–448/mo'
const COMBINED_TOTAL = '$188–617/mo'
const ADRENDER_PRICE = '$19/mo'

const STATIC_ROWS: CostRow[] = [
  { tool: 'Design tool (Figma / Photoshop)', cost: '$15–60' },
  { tool: 'Ad research / swipe file tool', cost: '$49–99' },
  { tool: 'AI writing tool', cost: '$20' },
  { tool: 'AI image generator', cost: '$20–99' },
  { tool: 'Subtotal', cost: STATIC_SUBTOTAL, emphasize: true },
  { tool: 'Time for 100 ads', cost: '~15 hours', emphasize: true },
]

const VIDEO_ROWS: CostRow[] = [
  { tool: 'Ad research / swipe file tool', cost: '$49–99' },
  { tool: 'Video editing (CapCut / Premiere Pro)', cost: '$10–60' },
  { tool: 'AI video generator', cost: '$39–220' },
  { tool: 'Voice & sound tool', cost: '$15–49' },
  { tool: 'AI writing tool', cost: '$20' },
  { tool: 'Subtotal', cost: VIDEO_SUBTOTAL, emphasize: true },
  { tool: 'Time for 100 videos', cost: '~150 hours', emphasize: true },
]

const COMPACT_ROWS: CostRow[] = [
  { tool: 'Static ad stack', cost: STATIC_SUBTOTAL },
  { tool: 'Video ad stack', cost: VIDEO_SUBTOTAL },
]

function StackRows({ rows }: { rows: CostRow[] }) {
  return (
    <>
      {rows.map((row) => (
        <tr key={row.tool} className={row.emphasize ? 'is-quiet' : undefined}>
          <th scope="row">{row.tool}</th>
          <td className="num">{row.cost}</td>
        </tr>
      ))}
    </>
  )
}

function StackHeading({ label }: { label: string }) {
  return (
    <tr>
      <th colSpan={2} scope="colgroup">
        {label}
      </th>
    </tr>
  )
}

function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="site-table-wrap" style={{ marginTop: 28 }}>
      <table className="site-table">{children}</table>
    </div>
  )
}

type CostTableProps = {
  /** Homepage summary. The full breakdown lives on /about#stack. */
  variant?: 'full' | 'compact'
}

export function CostTable({ variant = 'full' }: CostTableProps) {
  if (variant === 'compact') {
    return (
      <section className="site-section">
        <div className="site-column site-narrow">
          <SplitTitle as="h2" lead="The stack you're paying for right now" />
          <TableWrap>
            <tbody>
              <StackRows rows={COMPACT_ROWS} />
              <tr>
                <th scope="row">Combined total</th>
                <td className="num">{COMBINED_TOTAL}</td>
              </tr>
              <tr className="is-inset">
                <td colSpan={2}>AdRender — from {ADRENDER_PRICE}. One tool.</td>
              </tr>
            </tbody>
          </TableWrap>
          <p style={{ marginTop: 20 }}>
            <TextLink href="/about#stack">See the full breakdown</TextLink>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="stack" className="site-section scroll-mt-28">
      <div className="site-column site-narrow">
        <SplitTitle as="h2" lead="The stack you're paying for right now" />
        <TableWrap>
          <tbody>
            <StackHeading label="Static ad stack" />
            <StackRows rows={STATIC_ROWS} />
          </tbody>
          <tbody>
            <StackHeading label="Video ad stack" />
            <StackRows rows={VIDEO_ROWS} />
          </tbody>
          <tbody>
            <tr>
              <th scope="row">Combined total</th>
              <td className="num">{COMBINED_TOTAL}</td>
            </tr>
            <tr className="is-inset">
              <td colSpan={2}>AdRender — starting from {ADRENDER_PRICE}. One tool.</td>
            </tr>
          </tbody>
        </TableWrap>
        <p className="site-body" style={{ marginTop: 20 }}>
          Hundreds of ads — static or video — in under 10 minutes.
        </p>
        <p className="site-meta" style={{ marginTop: 8 }}>
          No demo call. No sales rep. No &ldquo;contact us for pricing.&rdquo; The price is right there.
        </p>
      </div>
    </section>
  )
}
