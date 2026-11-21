import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowsOut,
  Check,
  Clock,
  Columns,
  DeviceMobile,
  Desktop,
  MagnifyingGlass,
  Rectangle,
  X,
} from "@phosphor-icons/react";
import { Player } from "./engine/Player";
import { DesktopApp } from "./desktop/DesktopApp";
import { PhoneApp } from "./phone/PhoneApp";
import type { SceneState } from "./engine/story";
import { CAPTIONS } from "./showcaseData";
import { SpotScene } from "./SpotScene";
import { AD_NOTE_LIST } from "./stories/adNotes";
import { AdOverlay } from "./AdOverlay";
import { AD_TALL_VIEW, AD_WIDE_VIEW } from "./stories/intro";
import {
  DESKTOP_APP,
  PHONE_APP,
  usePhoneWidth,
  useWarmStills,
} from "./engine/hooks";
import { LIVE_TUTORIALS, TEST_TUTORIALS, searchTutorials, type Tutorial } from "./tutorials";
import { cx } from "../site/cx";
import "../Showcase/Showcase.css";
import "./v2.css";

type View = "desktop" | "phone";

const VIEWS: { id: View; label: string; icon: typeof Desktop }[] = [
  { id: "desktop", label: "Desktop", icon: Desktop },
  { id: "phone", label: "Phone", icon: DeviceMobile },
];

const desktopApp = (state: SceneState) => <DesktopApp state={state} />;
const phoneApp = (state: SceneState) => <PhoneApp state={state} />;
const spotOverlay = () => (
  <div className="sc-ad-brandbar">
    <img src="/brand/icons/icon-color.svg" alt="" />
    <span>AdRender</span>
  </div>
);
const adOverlay = (state: SceneState) => <AdOverlay state={state} />;

const AD_CAPTIONS = [
  "Add your brand",
  "Pick winning ads",
  "Get your ads",
] as const;

const seconds = (value: number) => {
  const total = Math.round(value);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

/** Coded motion ad: its own canvas page, shown in a frame with its own small player bar. */
function MotionPlayer({ tutorial, view, contain }: { tutorial: Tutorial; view: View; contain: boolean }) {
  const motion = tutorial.motion;
  if (!motion) return null;
  const tall = view === "phone";
  return (
    <iframe
      title={`${tutorial.title}. ${tutorial.summary}`}
      src={`${motion.src}?view=${view}&controls=1`}
      className={cx("sc-motion-frame", tall && "is-tall", contain && "is-contain")}
      allow="fullscreen"
      loading="lazy"
    />
  );
}

/** Length shown in the list and under the player. */
const lengthOf = (t: Tutorial, view: View) => t.motion?.seconds ?? t.stories?.[view]?.duration;

function TutorialPlayer({
  tutorial,
  view,
  contain,
}: {
  tutorial: Tutorial;
  view: View;
  contain: boolean;
}) {
  const label = `${tutorial.title}. ${tutorial.summary}`;
  if (tutorial.motion) return <MotionPlayer tutorial={tutorial} view={view} contain={contain} />;
  const stories = tutorial.stories;
  if (!stories) return null;
  if (tutorial.spot) {
    const tall = view === "phone";
    const size = tall ? AD_TALL_VIEW : AD_WIDE_VIEW;
    return (
      <Player
        story={tall ? stories.phone : stories.desktop}
        app={size}
        renderApp={(state) => <SpotScene state={state} tall={tall} />}
        overlay={spotOverlay}
        captions={tutorial.captions ?? AD_CAPTIONS}
        captionVariant="ad"
        contain={contain}
        upscale
        controls
        ariaLabel={label}
        className={tall ? "is-tiktok" : "is-ad-wide"}
      />
    );
  }
  if (tutorial.ad) {
    const tall = view === "phone";
    return (
      <Player
        story={tall ? stories.phone : stories.desktop}
        app={DESKTOP_APP}
        view={tall ? AD_TALL_VIEW : AD_WIDE_VIEW}
        renderApp={desktopApp}
        overlay={adOverlay}
        captions={AD_NOTE_LIST}
        captionVariant="note"
        follow={1.05}
        contain={contain}
        upscale
        controls
        ariaLabel={label}
        className={tall ? "is-tiktok" : "is-ad-wide"}
      />
    );
  }
  const bookend = {
    title: tutorial.title,
    line: tutorial.opener ?? tutorial.summary,
    link: tutorial.link ?? "adrender.app",
    closer: tutorial.closer,
  };
  if (view === "phone") {
    return (
      <Player
        bookend={bookend}
        story={stories.phone}
        app={PHONE_APP}
        renderApp={phoneApp}
        captions={tutorial.captions ?? CAPTIONS}
        touch
        contain={contain}
        upscale
        controls
        ariaLabel={label}
        className="is-phone"
      />
    );
  }
  return (
    <Player
      bookend={bookend}
      story={stories.desktop}
      app={DESKTOP_APP}
      renderApp={desktopApp}
      captions={tutorial.captions ?? CAPTIONS}
      contain={contain}
      upscale
      controls
      ariaLabel={label}
    />
  );
}

/**
 * Tutorials page: player on the left, collection on the right (search on top),
 * Desktop/Phone switch and Full screen next to the video, info underneath.
 */
const ADS = "Advertisements";

/** /tutorials shows the live tutorials; the admin test page shows only the ones still being tested. */
export function TutorialsBrowser({ test = false }: { test?: boolean }) {
  const list = test ? TEST_TUTORIALS : LIVE_TUTORIALS;
  if (!list.length) {
    return (
      <div className="sc-tv sc-v2 scv2-tv-empty">
        <Clock size={28} aria-hidden />
        <p>Nothing in testing right now. New and reworked tutorials show up here before they move to /tutorials.</p>
      </div>
    );
  }
  return <Browser list={list} />;
}

function Browser({ list }: { list: Tutorial[] }) {
  const phone = usePhoneWidth();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [full, setFull] = useState(false);
  const [theater, setTheater] = useState(false);
  const [run, setRun] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  useWarmStills();

  const tutorial =
    list.find((t) => t.id === params.get("v")) ?? list[0];
  const wanted = params.get("view");
  const view: View =
    wanted === "desktop" || wanted === "phone"
      ? wanted
      : phone
        ? "phone"
        : "desktop";
  const [genre, setGenre] = useState("All");
  const genres = useMemo(
    () => [
      "All",
      ...(list.some((t) => t.ad) ? [ADS] : []),
      ...Array.from(new Set(list.map((t) => t.category))),
    ],
    [list],
  );
  // Finished tutorials first (in catalog order), "coming soon" after them.
  const results = useMemo(() => {
    const found = searchTutorials(query, list).filter((t, i) =>
      genre === ADS
        ? t.ad
        : i === 0 || genre === "All" || t.category === genre,
    );
    return [
      ...found.filter((t) => t.stories || t.motion),
      ...found.filter((t) => !t.stories && !t.motion),
    ];
  }, [query, genre, list]);
  const ready = Boolean(tutorial.stories || tutorial.motion);
  const length = lengthOf(tutorial, view);

  const update = useCallback(
    (next: { v?: string; view?: View }) => {
      const merged = new URLSearchParams(params);
      if (next.v !== undefined) {
        if (next.v === list[0].id) merged.delete("v");
        else merged.set("v", next.v);
      }
      if (next.view) merged.set("view", next.view);
      setParams(merged, { replace: true, preventScrollReset: true });
    },
    [params, setParams, list],
  );

  // Theater mode hides the discount banner (CSS on body) to give the video more room.
  useEffect(() => {
    document.body.classList.toggle("tv-theater", theater);
    return () => document.body.classList.remove("tv-theater");
  }, [theater]);

  // "t" toggles theater mode, like YouTube.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (event.metaKey || event.ctrlKey || event.altKey || event.key.toLowerCase() !== 't') return
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      setTheater((value) => !value)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFull(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (!full) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFull(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full]);

  const enterFull = useCallback(() => {
    setRun((value) => value + 1);
    setFull(true);
    const el = stageRef.current;
    // iPhone Safari has no element full screen: the stage still fills the window.
    if (el?.requestFullscreen)
      void el.requestFullscreen().catch(() => undefined);
  }, []);

  const exitFull = useCallback(() => {
    setFull(false);
    if (document.fullscreenElement)
      void document.exitFullscreen().catch(() => undefined);
  }, []);

  return (
    <div className={cx("sc-tv sc-v2", theater && "is-theater", `is-view-${view}`)}>
      <div className="sc-tv-main">
        <div className="sc-tutorial-bar">
          <div
            className="sc-tutorial-views"
            role="radiogroup"
            aria-label="Video size"
          >
            {VIEWS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={view === id}
                className={cx("sc-tutorial-view", view === id && "is-on")}
                onClick={() => update({ view: id })}
              >
                <Icon size={16} aria-hidden />
                {label}
              </button>
            ))}
          </div>
          <div className="sc-tv-actions">
            <button
              type="button"
              className="sc-tutorial-full sc-tv-theater"
              onClick={() => setTheater((value) => !value)}
              aria-pressed={theater}
            >
              {theater ? (
                <Columns size={16} aria-hidden />
              ) : (
                <Rectangle size={16} aria-hidden />
              )}
              {theater ? "Default view" : "Theater mode"}
            </button>
            {ready ? (
              <button
                type="button"
                className="sc-tutorial-full"
                onClick={enterFull}
              >
                <ArrowsOut size={16} aria-hidden />
                Full screen
              </button>
            ) : null}
          </div>
        </div>

        {ready ? (
          <div
            ref={stageRef}
            className={cx("sc-tutorial-stage", `is-${view}`, full && "is-full")}
          >
            {full ? (
              <button
                type="button"
                className="sc-tutorial-close"
                onClick={exitFull}
                aria-label="Close full screen"
              >
                <X size={18} aria-hidden />
              </button>
            ) : null}
            <div className="sc-tutorial-frame">
              <TutorialPlayer
                key={`${tutorial.id}-${view}-${run}-${full ? "full" : "inline"}`}
                tutorial={tutorial}
                view={view}
                contain={full}
              />
            </div>
          </div>
        ) : (
          <div className={cx("sc-tv-soon", view === "phone" && "is-phone")}>
            <Clock size={28} aria-hidden />
            <p>This tutorial is being recorded.</p>
          </div>
        )}

        <div className="sc-tv-info">
          <h2 className="sc-tv-title">{tutorial.title}</h2>
          <p className="sc-tv-meta">
            {length
              ? `${seconds(length)} · ${view === "phone" ? "Phone" : "Desktop"} view`
              : "Coming soon"}
          </p>
          <p className="sc-tv-summary">{tutorial.summary}</p>
          {tutorial.learn ? (
            <>
              <h3 className="sc-tv-h">What you will learn</h3>
              <ul className="sc-tv-list">
                {tutorial.learn.map((item) => (
                  <li key={item}>
                    <Check size={14} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {tutorial.steps ? (
            <>
              <h3 className="sc-tv-h">Steps</h3>
              <ol className="sc-tv-steps">
                {tutorial.steps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </>
          ) : null}
        </div>
      </div>

      <aside className="sc-tv-side" aria-label="All tutorials">
        <div className="sc-tv-genres" role="tablist" aria-label="Tutorial groups">
          {genres.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={genre === name}
              className={cx("sc-tv-genre", genre === name && "is-on")}
              onClick={() => setGenre(name)}
            >
              {name}
            </button>
          ))}
        </div>
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
            const itemLength = lengthOf(item, view);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={cx(
                    "sc-tv-item",
                    item.id === tutorial.id && "is-on",
                    !item.stories && !item.motion && "is-soon",
                  )}
                  onClick={() => update({ v: item.id })}
                  aria-current={item.id === tutorial.id ? "true" : undefined}
                >
                  <span className="sc-tv-item-title">{item.title}</span>
                  <span className="sc-tv-item-meta">
                    {itemLength
                      ? `${seconds(itemLength)} · ${item.category}`
                      : `Coming soon · ${item.category}`}
                  </span>
                </button>
              </li>
            );
          })}
          {results.length === 1 && query ? (
            <li className="sc-tv-none">No other tutorials match “{query}”.</li>
          ) : null}
        </ul>
      </aside>
    </div>
  );
}
