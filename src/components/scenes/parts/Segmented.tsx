import { cx } from '../../site/cx'

type Option = string | { value: string; label: string; sub?: string }

export function Segmented({
  options,
  selected,
  tall = false,
  className,
}: {
  options: readonly Option[]
  selected: string
  tall?: boolean
  className?: string
}) {
  return (
    <div className={cx('scene-segment', tall && 'is-tall', className)}>
      {options.map((option) => {
        const value = typeof option === 'string' ? option : option.value
        const label = typeof option === 'string' ? option : option.label
        const sub = typeof option === 'string' ? undefined : option.sub
        return (
          <span key={value} className={cx(value === selected && 'is-on')}>
            <b>{label}</b>
            {sub ? <small>{sub}</small> : null}
          </span>
        )
      })}
    </div>
  )
}
