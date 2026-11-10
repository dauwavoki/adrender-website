import { Folder, Stack, Star } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { MiniCard } from './parts/MiniCard'
import { LIBRARY_FOLDERS, LIBRARY_SELECTED, TEMPLATE_CARDS, type SceneSize } from './sceneData'

export function LibraryScene({ size }: { size: SceneSize }) {
  const cards = (size === 'wide' ? TEMPLATE_CARDS : TEMPLATE_CARDS.slice(0, 4)).map((card, index) => ({
    ...card,
    starred: index < 2,
    mover: index === 0,
    shift: index === 1,
  }))

  return (
    <SceneFrame size={size} label="Saved templates with collections and starred cards">
      <ScenePanel className="library">
        <div className="lib-side">
          {LIBRARY_FOLDERS.map((folder) => {
            const selected = folder.id === LIBRARY_SELECTED
            const Icon = folder.icon === 'stack' ? Stack : Folder
            return (
              <div key={folder.id} className={selected ? 'lib-row is-on' : 'lib-row'}>
                <Icon size={18} weight={selected ? 'fill' : 'regular'} />
                <span>{folder.label}</span>
              </div>
            )
          })}
        </div>
        <div className="lib-main">
          <h3>Saved templates</h3>
          <div className="lib-grid">
            {cards.map((card) => (
              <MiniCard
                key={card.id}
                className={['lib-card', card.starred ? 'is-starred' : '', card.mover ? 'is-mover' : '', card.shift ? 'is-shift' : '']
                  .filter(Boolean)
                  .join(' ')}
                src={card.src}
                width={card.width}
                height={card.height}
                title={card.label}
                corner={
                  <span className="lib-star">
                    <Star size={18} />
                    <Star className="is-fill" size={18} weight="fill" />
                  </span>
                }
              />
            ))}
          </div>
        </div>
      </ScenePanel>
    </SceneFrame>
  )
}
