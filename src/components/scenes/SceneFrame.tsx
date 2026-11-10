import { useRef, type CSSProperties, type ReactNode } from 'react'
import { cx } from '../site/cx'
import type { SceneSize } from './sceneData'
import { ScenePhaseProvider, useSceneMotion } from './useSceneMotion'
import './scenes.css'

const DESIGN = {
  card: { w: 480, h: 600 },
  wide: { w: 800, h: 600 },
} as const

export function SceneFrame({ size, label, children }: { size: SceneSize; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const phase = useSceneMotion(ref)
  const design = DESIGN[size]
  const style = {
    '--scene-w': `${design.w}px`,
    '--scene-h': `${design.h}px`,
  } as CSSProperties

  return (
    <ScenePhaseProvider phase={phase}>
      <div
        ref={ref}
        className={cx('scene stage-fill', phase === 'play' && 'is-playing', phase !== 'off' && 'is-armed')}
        data-size={size}
        role="img"
        aria-label={label}
        style={style}
      >
        <div className="scene-slot">
          <div className="scene-frame">
            <div className="scene-pad" aria-hidden="true">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ScenePhaseProvider>
  )
}

export function ScenePanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('scene-panel', className)}>{children}</div>
}
