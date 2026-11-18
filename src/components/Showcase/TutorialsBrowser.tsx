import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowsOut, Check, Clock, DeviceMobile, Desktop, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Player } from './engine/Player'
import { DesktopApp } from './desktop/DesktopApp'
import { PhoneApp } from './phone/PhoneApp'
import type { SceneState } from './engine/story'
import { CAPTIONS } from './showcaseData'
import { DESKTOP_APP, PHONE_APP, usePhoneWidth, useWarmStills } from './engine/hooks'
import { TUTORIALS, searchTutorials, type Tutorial } from './tutorials'
import { cx } from '../site/cx'
import './Showcase.css'

type View = 'desktop' | 'phone'

const VIEWS: { id: View; label: string; icon: typeof Desktop }[] = [
  { id: 'desktop', label: 'Desktop', icon: Desktop },
  { id: 'phone', label: 'Phone', icon: DeviceMobile },
]

const desktopApp = (state: SceneState) => <DesktopApp state={state} />
const phoneApp = (state: SceneState) => <PhoneApp state={state} />

const seconds = (value: number) => {
  const total = Math.round(value)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

function TutorialPlayer({ tutorial, view, contain }: { tutorial: Tutorial; view: View; contain: boolean }) {
  const label = `${tutorial.title}. ${tutorial.summary}`
  const stories = tutorial.stories
  if (!stories) return null
  if (view === 'phone') {
    return (
      <Player
        story={stories.phone}
        app={PHONE_APP}
        renderApp={phoneApp}
        captions={CAPTIONS}
        touch
        contain={contain}
        ariaLabel={label}
        className="is-phone"
      />
    )
  }
  return (
    <Player story={stories.desktop} app={DESKTOP_APP} renderApp={desktopApp} captions={CAPTIONS} contain={contain} ariaLabel={label} />
  )
}

/**
 * Tutorials page: player on the left, collection on the right (search on top),
 * Desktop/Phone switch and Full screen next to the video, info underneath.
 */
export function TutorialsBrowser() {
  const phone = usePhoneWidth()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [full, setFull] = useState(false)
  const [run, setRun] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  useWarmStills()

  const tutorial = TUTORIALS.find((t) => t.id === params.get('v')) ?? TUTORIALS[0]
  const wanted = params.get('view')
  const view: View = wanted === 'desktop' || wanted === 'phone' ? wanted : phone ? 'phone' : 'desktop'
  const results = useMemo(() => searchTutorials(query), [query])
  const ready = Boolean(tutorial.stories)
  const story = tutorial.stories?.[view]

  const update = useCallback(
    (next: { v?: string; view?: View }) => {
      const merged = new URLSearchParams(params)
      if (next.v !== undefined) {
        if (next.v === TUTORIALS[0].id) merged.delete('v')
        else merged.set('v', next.v)
      }
      if (next.view) merged.set('view', next.view)
      setParams(merged, { replace: true, preventScrollReset: true })
    },
    [params, setParams],
  )

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFull(false)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useEffect(() => {
    if (!full) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFull(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [full])

  const enterFull = useCallback(() => {
    setRun((value) => value + 1)
    setFull(true)
    const el = stageRef.current
    // iPhone Safari has no element full screen: the stage still fills the window.
    if (el?.requestFullscreen) void el.requestFullscreen().catch(() => undefined)
  }, [])

  const exitFull = useCallback(() => {
    setFull(false)
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined)
  }, [])

  return (
    <div className="sc-tv">
      <div className="sc-tv-main">
        <div className="sc-tutorial-bar">
          <div className="sc-tutorial-views" role="radiogroup" aria-label="Video size">
            {VIEWS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={view === id}
                className={cx('sc-tutorial-view', view === id && 'is-on')}
                onClick={() => update({ view: id })}
              >
                <Icon size={16} aria-hidden />
                {label}
              </button>
            ))}
          </div>
          {ready ? (
            <button type="button" className="sc-tutorial-full" onClick={enterFull}>
              <ArrowsOut size={16} aria-hidden />
              Full screen
            </button>
          ) : null}
        </div>

        {ready ? (
          <div ref={stageRef} className={cx('sc-tutorial-stage', `is-${view}`, full && 'is-full')}>
            {full ? (
              <button type="button" className="sc-tutorial-close" onClick={exitFull} aria-label="Close full screen">
                <X size={18} aria-hidden />
              </button>
            ) : null}
            <div className="sc-tutorial-frame">
              <TutorialPlayer key={`${tutorial.id}-${view}-${run}-${full ? 'full' : 'inline'}`} tutorial={tutorial} view={view} contain={full} />
            </div>
          </div>
        ) : (
          <div className={cx('sc-tv-soon', view === 'phone' && 'is-phone')}>
            <Clock size={28} aria-hidden />
            <p>This tutorial is being recorded.</p>
          </div>
        )}

        <div className="sc-tv-info">
          <h2 className="sc-tv-title">{tutorial.title}</h2>
          <p className="sc-tv-meta">
            {story ? `${seconds(story.duration)} · ${view === 'phone' ? 'Phone' : 'Desktop'} view` : 'Coming soon'}
          </p>
          <p className="sc-tv-summary">{tutorial.summary}</p>
          <h3 className="sc-tv-h">What you will learn</h3>
          <ul className="sc-tv-list">
            {tutorial.learn.map((item) => (
              <li key={item}>
                <Check size={14} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <h3 className="sc-tv-h">Steps</h3>
          <ol className="sc-tv-steps">
            {tutorial.steps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </div>

      <aside className="sc-tv-side" aria-label="All tutorials">
        <label className="sc-tv-search">
          <MagnifyingGlass size={16} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tutorials"
            aria-label="Search tutorials"
          />
        </label>
        <ul className="sc-tv-items">
          {results.map((item) => {
            const itemStory = item.stories?.[view]
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={cx('sc-tv-item', item.id === tutorial.id && 'is-on', !item.stories && 'is-soon')}
                  onClick={() => update({ v: item.id })}
                  aria-current={item.id === tutorial.id ? 'true' : undefined}
                >
                  <span className="sc-tv-item-title">{item.title}</span>
                  <span className="sc-tv-item-meta">{itemStory ? seconds(itemStory.duration) : 'Coming soon'}</span>
                </button>
              </li>
            )
          })}
          {results.length === 1 && query ? <li className="sc-tv-none">No other tutorials match “{query}”.</li> : null}
        </ul>
      </aside>
    </div>
  )
}
