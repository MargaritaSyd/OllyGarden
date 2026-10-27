"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type RefObject } from "react";
import { QuizCount } from "@/components/quiz-score-cards";
import { TelemetryView } from "@/components/trust-game-telemetry";
import {
  boothBeatPercent,
  boothCrowdPercent,
  boothCursorMs,
  boothIdleMs,
  boothPercent,
  boothResultMs,
  boothStage,
  boothTier,
  boothTierRange,
  emptyBoothStats,
  getBoothStatsServerSnapshot,
  getBoothStatsSnapshot,
  recordBoothGame,
  setBoothStats,
  subscribeBoothStats,
  type BoothStats,
} from "@/lib/trust-game/booth";
import { trustCases } from "@/lib/trust-game/cases";
import { trustGamePitch } from "@/lib/trust-game/copy";
import { dealAllTrustCases, dealTrustCases } from "@/lib/trust-game/deal";
import { dataVerdict, failsLabel, holdsLabel, signalLabels } from "@/lib/trust-game/present";
import { trustTiers } from "@/lib/trust-game/score";
import type { TrustCase } from "@/lib/trust-game/types";
import { registerOpenTelemetry } from "@/lib/trademarks";

const sampleMs = 6_000;
const advanceGuardMs = 500;

type Screen = "start" | "case" | "result";
type Call = { trusted: boolean; correct: boolean };
type Stage = { zoom: number; width: number; height: number };

function blurFocus() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) active.blur();
}

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen?.();
  else void document.documentElement.requestFullscreen?.().catch(() => undefined);
}

function Key({ children }: { children: string }) {
  return (
    <kbd className="tb-key" aria-hidden="true">
      {children}
    </kbd>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3 8.5 3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useBoothStage() {
  const [stage, setStage] = useState<Stage>({ zoom: 1, width: 1920, height: 1080 });

  useLayoutEffect(() => {
    const measure = () => {
      setStage(boothStage(document.documentElement.clientWidth, document.documentElement.clientHeight));
    };
    measure();
    window.addEventListener("resize", measure);
    document.addEventListener("fullscreenchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      document.removeEventListener("fullscreenchange", measure);
    };
  }, []);

  return stage;
}

function useFit(
  frameRef: RefObject<HTMLDivElement | null>,
  innerRef: RefObject<HTMLDivElement | null>,
  startZoom: number,
  stage: Stage,
  caseKey: string,
  answered: boolean,
) {
  useLayoutEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
    let cancelled = false;

    const fit = () => {
      if (cancelled) return;
      const frameWidth = frame.clientWidth;
      const frameHeight = frame.clientHeight;
      if (frameWidth === 0 || frameHeight === 0) return;
      inner.style.minHeight = "0px";
      let zoom = startZoom;
      let applied = zoom;
      while (zoom > 0.5) {
        inner.style.zoom = String(zoom);
        inner.style.width = `${frameWidth / zoom}px`;
        const overflows = [...inner.querySelectorAll<HTMLElement>(".tgp-scroll")].some(
          (node) => node.scrollWidth > node.clientWidth + 1,
        );
        applied = zoom;
        if (!overflows && inner.offsetHeight * zoom <= frameHeight) break;
        zoom = Math.round((zoom - 0.05) * 100) / 100;
      }
      inner.style.minHeight = `${frameHeight / applied}px`;
    };

    fit();
    void document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [frameRef, innerRef, startZoom, stage.width, stage.height, caseKey, answered]);
}

export function TrustGameBooth({ fontVariable }: { fontVariable: string }) {
  const stage = useBoothStage();
  const [screen, setScreen] = useState<Screen>("start");
  const [rounds, setRounds] = useState<TrustCase[]>([]);
  const [index, setIndex] = useState(0);
  const [calls, setCalls] = useState<(Call | null)[]>([]);
  const [roundLength, setRoundLength] = useState(10);
  const stats = useSyncExternalStore(subscribeBoothStats, getBoothStatsSnapshot, getBoothStatsServerSnapshot);
  const [notice, setNotice] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [beat, setBeat] = useState(0);
  const [resultEpoch, setResultEpoch] = useState(0);
  const [cursorHidden, setCursorHidden] = useState(false);
  const answeredAt = useRef(0);
  const noticeTimer = useRef(0);

  const round = rounds[index];
  const call = calls[index] ?? null;
  const answered = call !== null;
  const correctCount = calls.filter((item) => item?.correct).length;

  const goHome = useCallback(() => {
    setScreen("start");
    setRounds([]);
    setCalls([]);
    setIndex(0);
    blurFocus();
  }, []);

  const play = useCallback((count: 10 | 0) => {
    const dealt = count ? dealTrustCases(trustCases) : dealAllTrustCases(trustCases);
    setRounds(dealt);
    setRoundLength(dealt.length);
    setCalls([]);
    setIndex(0);
    setScreen("case");
    blurFocus();
  }, []);

  const resetStats = useCallback(() => {
    setBoothStats(emptyBoothStats());
    setNotice("Booth stats reset");
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 2500);
  }, []);

  const choose = useCallback(
    (trusted: boolean) => {
      if (answered || !round) return;
      answeredAt.current = performance.now();
      setCalls((current) => {
        const next = [...current];
        next[index] = { trusted, correct: trusted === round.truth };
        return next;
      });
      blurFocus();
    },
    [answered, round, index],
  );

  const finish = useCallback(() => {
    const previous = getBoothStatsSnapshot();
    const correct = calls.filter((item) => item?.correct).length;
    setScore(correct);
    setBeat(boothBeatPercent(previous.results, correct / rounds.length));
    setBoothStats(
      recordBoothGame(
        previous,
        rounds,
        calls.map((item) => ({ correct: Boolean(item?.correct) })),
      ),
    );
    setResultEpoch((value) => value + 1);
    setScreen("result");
    blurFocus();
  }, [calls, rounds]);

  const advance = useCallback(() => {
    if (!call || performance.now() - answeredAt.current < advanceGuardMs) return;
    blurFocus();
    if (index < rounds.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    finish();
  }, [call, index, rounds.length, finish]);

  useEffect(() => {
    document.documentElement.classList.add("tb-lock");
    return () => {
      document.documentElement.classList.remove("tb-lock");
      window.clearTimeout(noticeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key;
      const lower = key.toLowerCase();
      let handled = true;
      if (lower === "f") toggleFullscreen();
      else if (key === "Escape" || lower === "h") goHome();
      else if (screen === "start") {
        if (key === "Enter" || key === " ") play(10);
        else if (lower === "a") play(0);
        else if (key === "R" && event.shiftKey) resetStats();
        else handled = false;
      } else if (screen === "case") {
        if (!answered && ["y", "1", "arrowleft", "pageup"].includes(lower)) choose(true);
        else if (!answered && ["n", "2", "arrowright", "pagedown"].includes(lower)) choose(false);
        else if (answered && ["enter", " ", "arrowright", "pagedown"].includes(lower)) advance();
        else handled = false;
      } else if (screen === "result" && (key === "Enter" || key === " ")) play(roundLength === 10 ? 10 : 0);
      else handled = false;
      if (handled) event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, answered, choose, advance, play, goHome, resetStats, roundLength]);

  useEffect(() => {
    if (screen === "start") return;
    const delay = screen === "result" ? boothResultMs : boothIdleMs;
    let timer = window.setTimeout(goHome, delay);
    const bump = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(goHome, delay);
    };
    const events = screen === "result" ? (["keydown", "pointerdown"] as const) : (["keydown", "pointerdown", "pointermove"] as const);
    for (const event of events) window.addEventListener(event, bump);
    return () => {
      window.clearTimeout(timer);
      for (const event of events) window.removeEventListener(event, bump);
    };
  }, [screen, goHome, resultEpoch]);

  useEffect(() => {
    let timer = window.setTimeout(() => setCursorHidden(true), boothCursorMs);
    const move = () => {
      setCursorHidden(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setCursorHidden(true), boothCursorMs);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div className={`tb-page ${fontVariable}${cursorHidden ? " is-cursor-hidden" : ""}`}>
      <div className={`tb-stage tb-stage--${screen}`} style={{ zoom: stage.zoom, width: stage.width, height: stage.height }}>
        <header className="tb-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tb-logo" src="/brand/logo-group.svg" alt="OllyGarden" width="270" height="42" />
          {screen === "case" ? (
            <div className="tb-top-game">
              <p className="tb-count">
                Case <b>{index + 1}</b> of {rounds.length}
              </p>
              <ol className="tb-progress" aria-hidden="true">
                {rounds.map((item, itemIndex) => {
                  const itemCall = calls[itemIndex];
                  const mark = itemCall ? (itemCall.correct ? " is-right" : " is-wrong") : itemIndex === index ? " is-now" : "";
                  return <li key={item.id} className={`tb-progress-step${mark}`} />;
                })}
              </ol>
              <p className="tb-count">
                <b>{correctCount}</b> correct
              </p>
            </div>
          ) : null}
          {screen === "start" ? (
            <button type="button" className="tb-exit" onClick={toggleFullscreen}>
              Full screen <Key>F</Key>
            </button>
          ) : (
            <button type="button" className="tb-exit" onClick={goHome}>
              Exit <Key>Esc</Key>
            </button>
          )}
        </header>
        {screen === "start" ? <StartScreen stats={stats} notice={notice} onPlay={play} /> : null}
        {screen === "case" && round ? (
          <CaseScreen
            key={round.id}
            item={round}
            number={index + 1}
            count={rounds.length}
            answer={call}
            crowd={boothCrowdPercent(stats.cases[round.id])}
            stage={stage}
            last={index === rounds.length - 1}
            onChoose={choose}
            onNext={advance}
          />
        ) : null}
        {screen === "result" ? (
          <ResultScreen
            key={resultEpoch}
            score={score}
            total={roundLength}
            beat={beat}
            games={stats.games}
            onAgain={() => play(roundLength === 10 ? 10 : 0)}
            onHome={goHome}
          />
        ) : null}
      </div>
    </div>
  );
}

function StartScreen({
  stats,
  notice,
  onPlay,
}: {
  stats: BoothStats;
  notice: string | null;
  onPlay: (count: 10 | 0) => void;
}) {
  const [sample, setSample] = useState(0);
  const shown = trustCases[sample];

  useEffect(() => {
    const timer = window.setInterval(() => setSample((current) => (current + 1) % trustCases.length), sampleMs);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="tb-screen tb-start" aria-labelledby="tb-title">
      <div className="tb-start-copy">
        <p className="tb-kicker">A telemetry trust game · 20 real cases</p>
        <h1 className="tb-title" id="tb-title">
          Would you <em>trust</em> this telemetry?
        </h1>
        <p className="tb-start-sub">
          Real production telemetry, and the conclusion someone drew from it. Some hold up. Some don’t. You make the call.
        </p>
        <div className="tb-start-actions">
          <button type="button" className="tb-btn tb-btn--primary" onClick={() => onPlay(10)}>
            Play 10 cases <Key>Enter</Key>
          </button>
          <button type="button" className="tb-btn tb-btn--ghost" onClick={() => onPlay(0)}>
            All 20 <Key>A</Key>
          </button>
        </div>
      </div>
      <div className="tb-start-side">
        {shown ? (
          <div className="tb-sample" key={shown.id}>
            <div className="tb-sample-head">
              <span className="tb-chip">{signalLabels[shown.signal]}</span>
              <span className="tb-sample-q">Holds up?</span>
            </div>
            <p className="tb-sample-claim">“{shown.claim}”</p>
            <div className="tb-sample-data">
              <TelemetryView caption={shown.screen} panels={shown.panels} revealed={false} />
            </div>
          </div>
        ) : null}
        <p className="tb-provenance">
          <b>Anonymized, but real.</b> Every service, host, endpoint and ID name is invented. Status codes, span structure and ratios are as measured.
        </p>
      </div>
      <footer className="tb-start-foot">
        {stats.games > 0 ? (
          <dl className="tb-booth-stats">
            <div>
              <dt>Games at this booth</dt>
              <dd>{stats.games}</dd>
            </div>
            <div>
              <dt>Average accuracy</dt>
              <dd>{boothPercent(stats.correct, stats.total)}%</dd>
            </div>
          </dl>
        ) : (
          <p className="tb-booth-first">Be the first to play at this booth.</p>
        )}
      </footer>
      {notice ? (
        <p className="tb-notice" role="status">
          {notice}
        </p>
      ) : null}
    </section>
  );
}

function CaseScreen({
  item,
  number,
  count,
  answer,
  crowd,
  stage,
  last,
  onChoose,
  onNext,
}: {
  item: TrustCase;
  number: number;
  count: number;
  answer: Call | null;
  crowd: number | null;
  stage: Stage;
  last: boolean;
  onChoose: (trusted: boolean) => void;
  onNext: () => void;
}) {
  const answered = answer !== null;
  const briefRef = useRef<HTMLDivElement>(null);
  const briefInnerRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const dataInnerRef = useRef<HTMLDivElement>(null);
  useFit(briefRef, briefInnerRef, 1, stage, item.id, answered);
  useFit(dataRef, dataInnerRef, 1.9, stage, item.id, answered);

  return (
    <section className={`tb-screen tb-case${answered ? " is-answered" : ""}`} aria-label={`Case ${number} of ${count}`}>
      <div className="tb-brief" ref={briefRef}>
        <div className="tb-brief-inner" ref={briefInnerRef}>
          <p className="tb-label">
            <span className="tb-chip">{signalLabels[item.signal]}</span>
            The situation
          </p>
          <p className="tb-situation">{item.situation}</p>
          <figure className="tb-claim">
            <figcaption className="tb-label tb-label--lime">The conclusion</figcaption>
            <blockquote>{item.claim}</blockquote>
          </figure>
          {answer ? (
            <div className={`tb-reveal${answer.correct ? " is-right" : " is-wrong"}`} role="status">
              <div className="tb-reveal-top">
                <span className={`tg-stamp tb-stamp ${item.truth ? "is-holds" : "is-fails"}`}>{item.truth ? holdsLabel : failsLabel}</span>
                <p className="tb-reveal-verdict">{answer.correct ? "You got it." : "Fooled you."}</p>
              </div>
              <h2 className="tb-reveal-head">{item.headline}</h2>
              <p className="tb-reveal-explain">{item.explain}</p>
              <dl className="tb-reveal-rows">
                <div>
                  <dt>The data</dt>
                  <dd>{dataVerdict(item)}</dd>
                </div>
                <div>
                  <dt>The tell</dt>
                  <dd>{item.tell}</dd>
                </div>
                {item.truth ? null : (
                  <div>
                    <dt>The fix</dt>
                    <dd>{item.fix}</dd>
                  </div>
                )}
              </dl>
              <div className="tb-reveal-foot">
                <button type="button" className="tb-btn tb-btn--primary" onClick={onNext}>
                  {last ? "See my score" : "Next case"} <Key>Enter</Key>
                </button>
                {crowd ? (
                  <p className="tb-crowd">
                    <b>{crowd}%</b> of players at this booth got this one right
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="tb-call">
              <p className="tb-call-q">Does the telemetry back this up?</p>
              <div className="tb-choices">
                <button type="button" className="tb-choice is-yes" onClick={() => onChoose(true)}>
                  <span className="tb-choice-word">Yes</span>
                  <span className="tb-choice-sub">it holds</span>
                  <Key>Y</Key>
                </button>
                <button type="button" className="tb-choice is-no" onClick={() => onChoose(false)}>
                  <span className="tb-choice-word">No</span>
                  <span className="tb-choice-sub">something’s off</span>
                  <Key>N</Key>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tb-data" ref={dataRef}>
        <div className="tb-data-inner" ref={dataInnerRef}>
          <TelemetryView caption={item.screen} panels={item.panels} revealed={answered} />
        </div>
      </div>
    </section>
  );
}

function ResultScreen({
  score,
  total,
  beat,
  games,
  onAgain,
  onHome,
}: {
  score: number;
  total: number;
  beat: number;
  games: number;
  onAgain: () => void;
  onHome: () => void;
}) {
  const tier = boothTier(score, total);
  const [left, setLeft] = useState(boothResultMs / 1000);

  useEffect(() => {
    const timer = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="tb-screen tb-result" aria-labelledby="tb-result-title">
      <div className="tb-result-main">
        <p className="tb-kicker" id="tb-result-title">
          Your result
        </p>
        <p className="tb-score">
          <span className="tb-score-num">
            <QuizCount value={score} />
          </span>
          <span className="tb-score-of">/{total}</span>
        </p>
        <p className="tb-tier">
          {tier.name} <span aria-hidden="true">{tier.emoji}</span>
        </p>
        <p className="tb-tier-msg">{tier.message}</p>
        <div className="tb-result-actions">
          <button type="button" className="tb-btn tb-btn--primary" onClick={onAgain}>
            Play again <Key>Enter</Key>
          </button>
          <button type="button" className="tb-btn tb-btn--ghost" onClick={onHome}>
            Home <Key>Esc</Key>
          </button>
        </div>
      </div>
      <div className="tb-landed">
        <LandedTrack tierName={tier.name} total={total} />
      </div>
      <div className="tb-result-side">
        <aside className="tb-pitch" aria-labelledby="tb-pitch-title">
          <h2 className="tb-pitch-title" id="tb-pitch-title">
            {trustGamePitch.title}
          </h2>
          <p className="tb-pitch-lede">{registerOpenTelemetry(trustGamePitch.lede)}</p>
          <ul className="tb-pitch-list">
            {trustGamePitch.points.map((point) => (
              <li key={point}>
                <span className="tb-pitch-check">
                  <CheckIcon />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <p className="tb-pitch-lede">{trustGamePitch.close}</p>
          <div className="tb-pitch-cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="tb-qr" src="/images/qr-ollygarden.svg" alt="QR code for ollygarden.com" width="160" height="160" />
            <div>
              <p className="tb-pitch-scan">Scan to try it, or visit</p>
              <p className="tb-pitch-url">ollygarden.com</p>
            </div>
          </div>
        </aside>
        <div className="tb-result-meta">
          {games >= 3 ? (
            <p className="tb-beat">
              You beat <b>{beat}%</b> of players at this booth
            </p>
          ) : (
            <span />
          )}
          <p className="tb-countdown" aria-hidden="true">
            Back to the start in {left}s
            <span className="tb-countdown-bar" style={{ "--ms": `${boothResultMs}ms` } as CSSProperties} />
          </p>
        </div>
      </div>
    </section>
  );
}

function LandedTrack({ tierName, total }: { tierName: string; total: number }) {
  const [on, setOn] = useState(false);
  const current = trustTiers.findIndex((tier) => tier.name === tierName);

  useEffect(() => {
    const timer = window.setTimeout(() => setOn(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const stops = trustTiers.map((tier, index) => ({ tier, index })).reverse();

  return (
    <ol
      className={`tg-landed-track${on ? " is-on" : ""}`}
      style={{ "--reach": trustTiers.length - 1 - current } as CSSProperties}
    >
      {stops.map(({ tier, index }, position) => {
        const state = index === current ? "is-current" : index > current ? "is-passed" : "is-ahead";
        return (
          <li key={tier.name} className={`tg-stop ${state}`} style={{ "--n": position } as CSSProperties} aria-current={index === current ? "step" : undefined}>
            {index === current ? <span className="tg-stop-you">You</span> : null}
            <span className="tg-stop-node" aria-hidden="true" />
            <span className="tg-stop-emoji" aria-hidden="true">
              {tier.emoji}
            </span>
            <span className="tg-stop-range">
              {boothTierRange(index, total)}
              <span aria-hidden="true">/{total}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
