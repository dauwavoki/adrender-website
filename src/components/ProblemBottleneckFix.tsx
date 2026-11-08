import {
  CheckCircle,
  Hourglass,
  Images,
  Stack,
  Target,
} from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { IconWeight } from '@phosphor-icons/react'
import { SplitTitle } from './site/SplitTitle'
import { Stage } from './site/Stage'
import { TextLink } from './site/Buttons'

type TileIcon = ComponentType<{ className?: string; weight?: IconWeight; size?: number }>

const WITHOUT: { icon: TileIcon; caption: string }[] = [
  { icon: Images, caption: 'Every test needs a finished creative.' },
  { icon: Hourglass, caption: 'Hiring means briefs, waiting and revisions.' },
  { icon: Stack, caption: 'Doing it yourself means six or more apps.' },
]

const WITH: { icon: TileIcon; caption: string }[] = [
  { icon: CheckCircle, caption: 'On-brand ads from proven formats.' },
  { icon: Images, caption: 'Hundreds of ads in under 10 minutes.' },
  { icon: Target, caption: 'Test every angle.' },
]

function Tiles({
  items,
  tone,
}: {
  items: { icon: TileIcon; caption: string }[]
  tone: 'without' | 'with'
}) {
  return (
    <div className="ww-tiles">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.caption} className={tone === 'without' ? 'ww-tile' : 'ww-tile is-with'}>
            <Icon size={22} aria-hidden />
            <p>{item.caption}</p>
          </div>
        )
      })}
    </div>
  )
}

export function ProblemBottleneckFix() {
  return (
    <section className="site-section">
      <div className="site-column">
        <SplitTitle
          as="h2"
          lead="Finding a winner means testing losers."
          rest="Make testing cheap enough to actually do it."
        />

        <div className="ww-row">
          <p className="ww-label">Without AdRender</p>
          <Tiles items={WITHOUT} tone="without" />
        </div>

        <div className="ww-row">
          <p className="ww-label">With AdRender</p>
          <Stage padding="md">
            <Tiles items={WITH} tone="with" />
          </Stage>
        </div>

        <p className="site-body" style={{ marginTop: 28, maxWidth: 680 }}>
          You won&apos;t know which ad wins until it&apos;s live. Finding it means testing many angles, hooks
          and formats, and every test needs a finished creative. Skip the volume and you&apos;re guessing.
          Your creative budget is the real limit. By the time you have enough creative, the window&apos;s
          closing. AdRender drops the cost of a static or video creative to near nothing, built on formats
          already proven to work.
        </p>

        <div style={{ marginTop: 20 }}>
          <TextLink href="/about#founder-story">Why I built AdRender</TextLink>
        </div>
      </div>
    </section>
  )
}
