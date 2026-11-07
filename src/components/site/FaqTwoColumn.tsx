import { useState } from 'react'
import { Plus, X } from '@phosphor-icons/react'
import type { FaqEntry } from '../../data/faq'
import { faqAnchorId } from '../../data/faq'
import { SplitTitle } from './SplitTitle'

type FaqTwoColumnProps = {
  items: FaqEntry[]
  lead?: string
  rest?: string
  title?: string
}

export function FaqTwoColumn({ items, lead, rest, title }: FaqTwoColumnProps) {
  const first = items[0] ? faqAnchorId(items[0]) : ''
  const [openId, setOpenId] = useState(first)

  return (
    <div className="site-faq">
      <div className="site-faq-title">
        {title ? <h2 className="site-h2">{title}</h2> : <SplitTitle as="h2" lead={lead ?? ''} rest={rest} />}
      </div>
      <div>
        {items.map((item) => {
          const id = faqAnchorId(item)
          const open = openId === id
          const panelId = `${id}-panel`
          return (
            <div key={id} id={id} className="site-faq-item site-anchor">
              <h3 style={{ margin: 0 }}>
                <button
                  type="button"
                  className="site-faq-q"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? '' : id)}
                >
                  <span>{item.q}</span>
                  {open ? <X size={20} aria-hidden /> : <Plus size={20} aria-hidden />}
                </button>
              </h3>
              <div id={panelId} role="region" hidden={!open}>
                <p className="site-faq-a">{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
