import { MagnifyingGlass } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { Badge } from './parts/Badge'
import { MiniCard } from './parts/MiniCard'
import { Segmented } from './parts/Segmented'
import { TEMPLATE_CARDS, type SceneSize } from './sceneData'

const SORTS = ['Newest', 'Longest running', 'Most relevant']

export function TemplatesScene({ size }: { size: SceneSize }) {
  const cards = size === 'wide' ? TEMPLATE_CARDS : TEMPLATE_CARDS.slice(0, 4)

  return (
    <SceneFrame size={size} label="Browse templates grid with filters for longest running and niche">
      <ScenePanel className="templates">
        <div className="scene-search">
          <MagnifyingGlass size={18} />
          <span>running shoes</span>
        </div>
        <div className="chip-row">
          <span className="scene-chip">
            <span className="scene-dot" />
            Longest running
          </span>
          <span className="scene-chip">
            <span className="scene-dot" />
            Niche: Fitness
          </span>
        </div>
        <Segmented options={SORTS} selected="Longest running" />
        <div className="tpl-grid">
          {cards.map((card) => (
            <MiniCard
              key={card.id}
              className="tpl-card"
              src={card.src}
              width={card.width}
              height={card.height}
              title={card.label}
              meta={<Badge>{`Running ${card.days} days`}</Badge>}
            />
          ))}
        </div>
      </ScenePanel>
    </SceneFrame>
  )
}
