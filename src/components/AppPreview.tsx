import { useEffect, useState, type ReactNode } from 'react'
import {
  Briefcase,
  Building2,
  ChevronDown,
  ChevronsLeft,
  CreditCard,
  FolderHeart,
  LayoutGrid,
  Library,
  LogOut,
  Wand2,
} from 'lucide-react'
import { placeholderSrc, type PlaceholderId } from '../data/imageManifest'

type TabId = 'templates' | 'saved' | 'library' | 'playground' | 'brands'

type Tab = {
  id: TabId
  label: string
  imageId: PlaceholderId
  icon: ReactNode
}

const TABS: Tab[] = [
  {
    id: 'templates',
    label: 'Templates',
    imageId: '01',
    icon: <LayoutGrid className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: 'saved',
    label: 'Saved Templates',
    imageId: '02',
    icon: <FolderHeart className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: 'library',
    label: 'My Ads Library',
    imageId: '03',
    icon: <Library className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: 'playground',
    label: 'Ad Playground',
    imageId: '04',
    icon: <Wand2 className="h-4 w-4" strokeWidth={1.75} />,
  },
  {
    id: 'brands',
    label: 'Brands',
    imageId: '05',
    icon: <Briefcase className="h-4 w-4" strokeWidth={1.75} />,
  },
]

const DEFAULT_TAB = TABS[0]
const TAB_HINT_STORAGE_KEY = 'adrender_hero_tab_clicked'
const TAB_HINT_AUTO_DISMISS_MS = 18_000

function markHeroTabClicked() {
  try {
    localStorage.setItem(TAB_HINT_STORAGE_KEY, '1')
  } catch {
    // private mode / blocked storage — ignore
  }
}

function hasClickedHeroTab(): boolean {
  try {
    return localStorage.getItem(TAB_HINT_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/** Sketchy curved arrow + label pointing at the sidebar tabs. md+ only. */
function TabExploreCue() {
  return (
    <div
      className="pointer-events-none absolute -left-1 top-[8.5rem] z-30 hidden w-[7.5rem] select-none md:block lg:-left-2 lg:w-32"
      aria-hidden
    >
      <div className="tab-cue-bob flex flex-col items-end gap-0.5">
        <span className="font-hand text-right text-[1.4rem] leading-none tracking-wide text-[#00e5ff] drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
          click to explore
        </span>
        <svg
          width="88"
          height="56"
          viewBox="0 0 88 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 text-[#00e5ff] drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
        >
          {/* Loose hand-drawn curve pointing right into the tab column */}
          <path
            d="M8 10c12.5 2.5 24 4 36 10 10.5 5.2 19 14.5 24.5 24"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 12c11 2 22.5 3.8 33.5 9.2 9.5 4.7 17 12.8 22 21.5"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.35"
          />
          {/* Sketchy arrowhead */}
          <path
            d="M58 40c3.5 2.2 7.2 4.8 9.5 8.2M58 40c-1.2 3.8-1.8 7.4-1.5 11"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

/**
 * Interactive AdRender app window. Templates tab is the default active state so SSG
 * HTML always includes a visible hero screenshot (opacity-100) even without JS.
 */
export function AppPreview() {
  const [activeId, setActiveId] = useState<TabId>(DEFAULT_TAB.id)
  // Start hidden to avoid flash for returning visitors during hydrate.
  const [showCue, setShowCue] = useState(false)

  useEffect(() => {
    for (const tab of TABS) {
      const img = new Image()
      img.src = placeholderSrc(tab.imageId)
    }
  }, [])

  useEffect(() => {
    if (hasClickedHeroTab()) return
    setShowCue(true)
    const timer = window.setTimeout(() => setShowCue(false), TAB_HINT_AUTO_DISMISS_MS)
    return () => window.clearTimeout(timer)
  }, [])

  function handleTabClick(tabId: TabId) {
    setActiveId(tabId)
    markHeroTabClicked()
    setShowCue(false)
  }

  return (
    <section className="relative px-4 md:px-6" aria-label="AdRender product preview">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(123,79,212,0.18),transparent_65%)]"
        aria-hidden
      />

      {/* Mobile: static product screenshot — interactive demo is too dense on small screens */}
      <div className="relative mx-auto max-w-6xl md:hidden">
        <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c0c12] shadow-[0_-20px_80px_-30px_rgba(123,79,212,0.35)]">
          <img
            src="/hero-mobile.png"
            alt="AdRender Templates dashboard"
            width={1024}
            height={590}
            decoding="async"
            loading="eager"
            className="h-auto w-full object-cover object-left-top"
          />
        </div>
      </div>

      {/* Desktop: interactive app preview with clickable sidebar tabs */}
      <div className="relative mx-auto hidden max-w-6xl md:block md:px-8 lg:px-10">
        <div className="relative">
          {showCue ? <TabExploreCue /> : null}

          <div className="overflow-hidden rounded-t-2xl border border-b-0 border-white/[0.12] bg-[#0c0c12] shadow-[0_-20px_80px_-30px_rgba(123,79,212,0.35)]">
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0a0f] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 truncate text-xs text-zinc-600">app.adrender.app</span>
          </div>

          <div className="flex min-h-[26rem] sm:min-h-[30rem] md:min-h-[34rem] lg:min-h-[38rem]">
            <aside className="flex w-[10.5rem] shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0a0f] sm:w-[13rem] md:w-[15rem]">
              <div className="flex items-start justify-between gap-2 px-3 pb-2 pt-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <img
                      src="/WebApp_Main_Logo.png"
                      alt=""
                      className="h-7 w-7 rounded-md object-contain"
                      width={28}
                      height={28}
                    />
                    <span className="truncate font-heading text-sm font-semibold text-white">AdRender</span>
                  </div>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#5B9FFF]">
                    <CreditCard className="h-3 w-3" />
                    Start a plan
                  </span>
                </div>
                <ChevronsLeft className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
              </div>

              <div className="mx-3 mb-3 flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-black/40 px-2.5 py-1 text-[10px] text-zinc-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>0</span>
                <span className="text-zinc-700">/</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>0</span>
                <span className="ml-0.5 truncate">rendering / staging</span>
              </div>

              <nav className="flex flex-1 flex-col gap-0.5 px-2" aria-label="App preview navigation">
                {TABS.map((tab) => {
                  const isActive = tab.id === activeId
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabClick(tab.id)}
                      aria-pressed={isActive}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                        isActive
                          ? 'bg-[#152038] font-medium text-[#5B9FFF]'
                          : 'text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200'
                      }`}
                    >
                      <span className={isActive ? 'text-[#5B9FFF]' : 'text-zinc-500'}>{tab.icon}</span>
                      <span className="truncate">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="mt-auto space-y-2 border-t border-white/[0.06] p-2.5">
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#12121a] px-2.5 py-2">
                  <Building2 className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-zinc-200">AdRender Team</p>
                    <p className="text-[10px] text-zinc-600">Workspace</p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-600" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-amber-900/40 bg-gradient-to-br from-[#2a2118] to-[#1a1510] px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] leading-none text-amber-500/80" aria-hidden>
                      ◯◯
                    </span>
                    <div>
                      <p className="text-[10px] text-zinc-500">Tokens</p>
                      <p className="text-sm font-semibold text-white">71</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-amber-500/90">Top up →</span>
                </div>
                <div className="flex items-center gap-2 px-1 pt-1">
                  <img
                    src="/WebApp_Main_Logo.png"
                    alt=""
                    className="h-6 w-6 rounded object-contain"
                    width={24}
                    height={24}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-zinc-200">AdRender</p>
                    <p className="truncate text-[10px] text-zinc-600">adrender.admin@gma...</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-1 pb-1 text-[11px] text-zinc-600">
                  <LogOut className="h-3 w-3" />
                  Sign out
                </div>
              </div>
            </aside>

            <div className="relative min-w-0 flex-1 overflow-hidden bg-[#0e0e14]">
              <div className="relative aspect-[16/10] h-full min-h-full w-full">
                {TABS.map((tab) => {
                  const isActive = tab.id === activeId
                  const isDefault = tab.id === DEFAULT_TAB.id
                  return (
                    <img
                      key={tab.id}
                      src={placeholderSrc(tab.imageId)}
                      alt={`AdRender ${tab.label} view — [IMAGE ${tab.imageId}]`}
                      width={1440}
                      height={900}
                      decoding="async"
                      loading={isDefault ? 'eager' : 'lazy'}
                      className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-150 ease-out ${
                        isActive ? 'z-[1] opacity-100' : 'z-0 opacity-0'
                      }`}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
