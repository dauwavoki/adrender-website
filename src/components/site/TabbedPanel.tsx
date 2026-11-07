import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'

export type TabPanelItem = {
  id: string
  label: string
  body: ReactNode
  visual?: ReactNode
}

export function TabbedPanel({ tabs, label = 'Sections' }: { tabs: TabPanelItem[]; label?: string }) {
  const [active, setActive] = useState(0)
  const base = useId()

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1
    let next = index
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    setActive(next)
    const button = document.getElementById(`${base}-tab-${next}`)
    button?.focus()
  }

  return (
    <div>
      <div className="site-tabs" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => {
          const selected = index === active
          return (
            <button
              key={tab.id}
              id={`${base}-tab-${index}`}
              type="button"
              role="tab"
              className="site-tab"
              aria-selected={selected}
              aria-controls={`${base}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {String(index + 1).padStart(2, '0')} {tab.label}
            </button>
          )
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`${base}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${index}`}
          className="site-tab-panel"
          hidden={index !== active}
        >
          <div>{tab.body}</div>
          {tab.visual ? <div>{tab.visual}</div> : null}
        </div>
      ))}
    </div>
  )
}
