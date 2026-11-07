import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export type LinkTableRow = {
  title: string
  description?: string
  to: string
}

export function LinkTable({ rows, label }: { rows: LinkTableRow[]; label?: string }) {
  return (
    <div className="site-link-table" role="list" aria-label={label}>
      {rows.map((row) => {
        const inner = (
          <>
            <span className="site-link-row-title">{row.title}</span>
            {row.description ? <span className="site-link-row-desc">{row.description}</span> : <span />}
            <ArrowRight size={16} aria-hidden />
          </>
        )
        if (/^https?:\/\//.test(row.to)) {
          return (
            <a key={row.to + row.title} href={row.to} className="site-link-row" role="listitem">
              {inner}
            </a>
          )
        }
        return (
          <Link key={row.to + row.title} to={row.to} className="site-link-row" role="listitem">
            {inner}
          </Link>
        )
      })}
    </div>
  )
}
