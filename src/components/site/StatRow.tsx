import { cx } from './cx'

export type StatItem = {
  value: string
  label?: string
}

export function StatRow({ items, variant = 'serif' }: { items: StatItem[]; variant?: 'serif' | 'text' }) {
  const cols = items.length >= 4 ? 'cols-4' : 'cols-3'
  return (
    <div className={cx('site-stat-row', cols, variant === 'text' && 'is-text')}>
      {items.map((item) => (
        <div key={`${item.value}-${item.label ?? ''}`} className="site-stat-cell">
          <p className="site-stat-num">{item.value}</p>
          {item.label ? <p className="site-stat-label">{item.label}</p> : null}
        </div>
      ))}
    </div>
  )
}
