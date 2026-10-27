"use client";

import Link from "next/link";
import {
  createContext,
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { BrandLogo } from "@/components/brand-logo";
import { GetStartedLink } from "@/components/get-started-link";
import { ResultShare } from "@/components/result-share";
import { TelemetryScreen } from "@/components/trust-game-panels";
import { captureCtaClick, capturePostHogEvent } from "@/lib/posthog";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site";
import { registerOpenTelemetry } from "@/lib/trademarks";
import {
  type BoothStats,
  boothTotals,
  parseBoothStats,
  readBoothStats,
  recordBoothGame,
  saveBoothStats,
} from "@/lib/trust-game/booth-stats";
import { type TrustCase, trustGameCases } from "@/lib/trust-game/cases";
import { trustGameNotice, trustGamePitch, trustGameRule } from "@/lib/trust-game/content";
import {
  type TrustAnswer,
  dealTrustGame,
  trustGameFullDeckSize,
  trustGameMistakes,
} from "@/lib/trust-game/deck";
import {
  type TrustGameTier,
  trustGameDeckSize,
  trustGameResultPath,
  trustGameResultToken,
  trustGameTier,
  trustGameTierStops,
} from "@/lib/trust-game/score";
import "./trust-game.css";

/** The booth returns to its attract screen after this long without input. */
const BOOTH_IDLE_MS = 120_000;
/** The result screen returns on its own. Pointer moves do not reset it. */
const BOOTH_RESULT_MS = 60_000;
const BOOTH_WIDTH = 1920;
const BOOTH_HEIGHT = 1080;

const noSubscription = () => () => {};

type Stage = { zoom: number; width: number; height: number };

function percent(part: number, whole: number) {
  return Math.round((100 * part) / whole);
}

function signalLabel(signal: TrustCase["signal"]) {
  return signal === "trace map" ? "Trace map" : signal.charAt(0).toUpperCase() + signal.slice(1);
}

function splitChoice(label: string) {
  const [word, ...rest] = label.split(",");
  return { word: word.trim(), sub: rest.join(",").trim() };
}

function crowdPercent(stats: BoothStats, id: string) {
  const entry = stats.cases[id];
  if (!entry || entry.total < 5) return null;
  return percent(entry.correct, entry.total);
}

/**
 * The Trust Your Telemetry? game. `web` runs inside the site page and reports analytics after
 * consent; `booth` is the full-screen kiosk with keyboard controls, an idle reset, and only
 * device-local counters.
 */
export function TrustGame({ mode }: { mode: "web" | "booth" }) {
  const booth = mode === "booth";
  const [deck, setDeck] = useState<TrustCase[]>([]);
  const [answers, setAnswers] = useState<TrustAnswer[]>([]);
  // Equals deck.length once the last case is done, which shows the results.
  const [index, setIndex] = useState(0);
  const [staff, setStaff] = useState(false);
  const stats = parseBoothStats(useSyncExternalStore(noSubscription, readBoothStats, () => null));

  const active = deck.length > 0;
  const complete = active && index === deck.length;
  const current = deck[index];
  const answer = answers[index];
  const score = answers.filter((item) => item.correct).length;

  const track = (event: string, properties: Record<string, unknown>) => {
    if (!booth) capturePostHogEvent(event, properties);
  };

  function start(size: number) {
    const dealt = dealTrustGame(size);
    setDeck(dealt);
    setAnswers([]);
    setIndex(0);
    setStaff(false);
    track("trust_game_started", { case_count: dealt.length });
  }

  function home() {
    setDeck([]);
    setStaff(false);
  }

  function choose(trusted: boolean) {
    if (!current || answer) return;
    const correct = trusted === current.truth;
    setAnswers((previous) =>
      previous.length > index ? previous : [...previous, { id: current.id, trusted, correct }],
    );
    track("trust_game_case_answered", {
      case_id: current.id,
      case_truth: current.truth,
      verdict: trusted ? "trust" : "distrust",
      correct,
      case_number: index + 1,
    });
  }

  function next() {
    if (!answer) return;
    setIndex(index + 1);
    if (index < deck.length - 1) return;
    if (booth) saveBoothStats(recordBoothGame(parseBoothStats(readBoothStats()), answers));
    const { liesTrusted, truthsDoubted } = trustGameMistakes(answers);
    track("trust_game_completed", {
      score,
      case_count: deck.length,
      lies_trusted: liesTrusted,
      truths_doubted: truthsDoubted,
    });
  }

  function retake() {
    track("trust_game_retake", { previous_score: score });
    start(deck.length);
  }

  const round = useRef<HTMLDivElement>(null);
  const claim = useRef<HTMLQuoteElement>(null);
  useEffect(() => {
    if (booth) return;
    if ((round.current?.getBoundingClientRect().top ?? 0) < 0) round.current?.scrollIntoView();
    claim.current?.focus({ preventScroll: true });
  }, [booth, deck, index]);

  const onPageHide = useEffectEvent(() => {
    if (active && !complete) capturePostHogEvent("trust_game_abandoned", { case_number: index + 1 });
  });
  useEffect(() => {
    if (booth) return;
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [booth]);

  const onKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === "h") {
      home();
      return;
    }
    if (!active) {
      if (key === "s") setStaff((open) => !open);
      else if (key === "f") toggleFullscreen();
      else if (key === "a") start(trustGameFullDeckSize);
      else if (key === "enter" || key === " ") {
        event.preventDefault();
        start(trustGameDeckSize);
      }
      return;
    }
    if (key === trustGameRule.keys.holds.toLowerCase()) choose(true);
    else if (key === trustGameRule.keys.fails.toLowerCase()) choose(false);
    else if ((key === "enter" || key === " ") && (complete || answer)) {
      event.preventDefault();
      if (complete) retake();
      else next();
    }
  });
  useEffect(() => {
    if (!booth) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booth]);

  useEffect(() => {
    if (!booth || !active || complete) return;
    let timer = window.setTimeout(home, BOOTH_IDLE_MS);
    const bump = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(home, BOOTH_IDLE_MS);
    };
    window.addEventListener("keydown", bump);
    window.addEventListener("pointerdown", bump, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", bump);
      window.removeEventListener("pointerdown", bump);
    };
  }, [booth, active, complete]);

  if (booth) {
    return (
      <BoothFrame
        screen={!active ? "attract" : complete ? "result" : "case"}
        exitLabel={active ? "Exit" : "Full screen"}
        exitKey={active ? "H" : "F"}
        onExit={() => (active ? home() : toggleFullscreen())}
        progress={
          active && !complete ? (
            <BoothProgress deck={deck} answers={answers} index={index} score={score} />
          ) : null
        }
      >
        {!active ? (
          <BoothAttract staff={staff} stats={stats} onStart={start} />
        ) : complete ? (
          <BoothResults answers={answers} onRetake={retake} onHome={home} />
        ) : (
          <BoothCase
            item={current}
            number={index + 1}
            count={deck.length}
            answer={answer}
            last={index === deck.length - 1}
            crowd={crowdPercent(stats, current.id)}
            claimRef={claim}
            onChoose={choose}
            onNext={next}
          />
        )}
      </BoothFrame>
    );
  }

  if (!active) {
    return (
      <section className="tg-page" aria-labelledby="trust-start">
        <div className="tg-pitch">
          <p className="tg-label">Ready when you are</p>
          <h2 id="trust-start" className="tg-tier-name">
            {trustGameDeckSize} conclusions. Does the telemetry back them up?
          </h2>
          <p className="tg-pitch-lede">
            {trustGameRule.explainer} Half the conclusions hold. No timer and no sign-up.
          </p>
          <button type="button" className="tg-next" onClick={() => start(trustGameDeckSize)}>
            Start the game
          </button>
        </div>
      </section>
    );
  }

  if (complete) {
    return <WebResults answers={answers} onRetake={retake} />;
  }

  return (
    <div className="tg-page" ref={round}>
      <div className="tg-card tg-card--case">
        <Progress deck={deck} answers={answers} index={index} score={score} />
        <section className="tg-brief" aria-labelledby="trust-claim">
          <p className="tg-label">
            <span className="tg-chip">{signalLabel(current.signal)}</span>
            The situation
          </p>
          <p className="tg-situation">{current.situation}</p>
          <figure className="tg-claim">
            <figcaption>The conclusion</figcaption>
            <blockquote id="trust-claim" ref={claim} tabIndex={-1}>
              {current.claim}
            </blockquote>
          </figure>
        </section>
        <div className="tg-data">
          <TelemetryScreen
            key={current.id}
            caption={current.screen}
            panels={current.panels}
            revealed={Boolean(answer)}
          />
        </div>
        <Verdict
          item={current}
          answer={answer}
          last={index === deck.length - 1}
          onChoose={choose}
          onNext={next}
        />
      </div>
    </div>
  );
}

function Progress({
  deck,
  answers,
  index,
  score,
}: {
  deck: readonly TrustCase[];
  answers: readonly TrustAnswer[];
  index: number;
  score: number;
}) {
  return (
    <div className="tg-case-bar">
      <span>
        Case {index + 1} of {deck.length}
      </span>
      <ol className="tg-pips" aria-hidden="true">
        {deck.map((item, position) => {
          const result = answers[position];
          const state = result ? (result.correct ? "is-right" : "is-wrong") : position === index ? "is-now" : "";
          return <li key={item.id} className={`tg-pip ${state}`} />;
        })}
      </ol>
      <span className="ml-auto">{score} correct</span>
    </div>
  );
}

function Verdict({
  item,
  answer,
  last,
  onChoose,
  onNext,
}: {
  item: TrustCase;
  answer?: TrustAnswer;
  last: boolean;
  onChoose: (trusted: boolean) => void;
  onNext: () => void;
}) {
  const nextButton = useRef<HTMLButtonElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const call = useRef<HTMLDivElement>(null);
  const [dock, setDock] = useState(false);
  useEffect(() => {
    if (!answer) return;
    nextButton.current?.focus({ preventScroll: true });
    if ((reveal.current?.getBoundingClientRect().top ?? 0) > window.innerHeight * 0.75) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      reveal.current?.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "auto" });
    }
  }, [answer]);

  useEffect(() => {
    const node = call.current;
    if (!node || answer) return;
    const observer = new IntersectionObserver(([entry]) => setDock(!entry.isIntersecting), { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [answer, item.id]);

  return (
    <>
      <div className={`tg-call${answer ? " is-answered" : ""}`} ref={call}>
        <p className="tg-ask">{trustGameRule.question}</p>
        <div className="tg-choices">
          {([true, false] as const).map((trusted) => (
            <button
              key={String(trusted)}
              type="button"
              disabled={Boolean(answer)}
              aria-pressed={answer ? answer.trusted === trusted : undefined}
              onClick={() => onChoose(trusted)}
              className={`tg-choice ${trusted ? "is-yes" : "is-no"} ${
                answer?.trusted === trusted ? "is-picked" : answer ? "is-dim" : ""
              }`}
            >
              {trusted ? trustGameRule.holds : trustGameRule.fails}
              <span className="tg-choice-key">{trusted ? trustGameRule.keys.holds : trustGameRule.keys.fails}</span>
            </button>
          ))}
        </div>
        <div ref={reveal}>
          {answer ? <Reveal item={item} answer={answer} last={last} nextRef={nextButton} onNext={onNext} /> : null}
        </div>
      </div>
      {answer ? null : (
        <div className={`tg-dock${dock ? " is-on" : ""}`}>
          <div className="tg-dock-choices">
            {([true, false] as const).map((trusted) => {
              const parts = splitChoice(trusted ? trustGameRule.holds : trustGameRule.fails);
              return (
                <button
                  key={String(trusted)}
                  type="button"
                  className={`tg-dock-choice ${trusted ? "is-yes" : "is-no"}`}
                  onClick={() => onChoose(trusted)}
                >
                  <b>{parts.word}</b>
                  <span>{parts.sub}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

function Reveal({
  item,
  answer,
  last,
  nextRef,
  onNext,
  crowd,
  booth = false,
}: {
  item: TrustCase;
  answer: TrustAnswer;
  last: boolean;
  nextRef?: RefObject<HTMLButtonElement | null>;
  onNext: () => void;
  crowd?: number | null;
  booth?: boolean;
}) {
  const holds = item.truth;
  return (
    <div className={`${booth ? "tb-reveal" : "tg-reveal"}${answer.correct ? "" : " is-wrong"}`} role="status">
      <div className={booth ? "tb-reveal-top" : "tg-reveal-top"}>
        <span className={`tg-stamp ${booth ? "tb-stamp" : ""} ${holds ? "is-holds" : "is-fails"}`}>
          {trustGameRule.verdict[holds ? "holds" : "fails"]}
        </span>
        <p className={booth ? "tb-reveal-verdict" : "tg-reveal-verdict"}>
          {answer.correct ? "You got it." : "Fooled you."}
        </p>
      </div>
      <h3 className={booth ? "tb-reveal-head" : "tg-reveal-head"}>{item.headline}</h3>
      <p className={booth ? "tb-reveal-explain" : "tg-reveal-text"}>{item.explain}</p>
      <dl className={booth ? "tb-reveal-rows" : "tg-reveal-rows"}>
        <RevealRow label="The data" booth={booth}>
          {trustGameRule.data[holds ? "holds" : item.flaw]}
        </RevealRow>
        <RevealRow label="The tell" booth={booth}>
          {item.tell}
        </RevealRow>
        {holds ? null : (
          <RevealRow label="The fix" booth={booth}>
            {item.fix}
          </RevealRow>
        )}
        {item.detector ? (
          <RevealRow label="OllyGarden" booth={booth}>
            Flagged by the {item.detector} insight.
          </RevealRow>
        ) : null}
        <RevealRow label="Source" booth={booth}>
          {item.source}
        </RevealRow>
      </dl>
      <div className={booth ? "tb-reveal-foot" : undefined}>
        <button
          ref={nextRef}
          type="button"
          onClick={onNext}
          className={booth ? "tb-btn tb-btn--primary" : "tg-next"}
        >
          {last ? "See my score" : "Next case"}
          {booth ? <BoothKey>Enter</BoothKey> : " →"}
        </button>
        {booth && crowd != null ? (
          <p className="tb-crowd">
            <b>{crowd}%</b> at this booth got it right
          </p>
        ) : null}
      </div>
    </div>
  );
}

function RevealRow({ label, children, booth }: { label: string; children: ReactNode; booth: boolean }) {
  return (
    <div className={booth ? undefined : "tg-reveal-row"}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function WebResults({ answers, onRetake }: { answers: readonly TrustAnswer[]; onRetake: () => void }) {
  const score = answers.filter((answer) => answer.correct).length;
  const total = answers.length;
  const tier = trustGameTier(score, total);
  const { liesTrusted, truthsDoubted } = trustGameMistakes(answers);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);

  return (
    <section className="tg-page tg-results" aria-labelledby="trust-result">
      <div>
        <p className="tg-label">Your result</p>
        <h2 id="trust-result" ref={heading} tabIndex={-1} className="tg-score">
          {score}
          <span>/{total}</span>
        </h2>
        <p className="tg-tier-name">
          {tier.name} {tier.emoji}
        </p>
        <p className="tg-tier-msg">{tier.message}</p>
        <div className="tg-stats">
          <p className="tg-stat">
            <b>{liesTrusted}</b>
            bad calls you accepted
          </p>
          <p className="tg-stat">
            <b>{truthsDoubted}</b>
            good calls you rejected
          </p>
        </div>
        <div className="tg-actions">
          <button type="button" className="tg-next" onClick={onRetake}>
            Play again
          </button>
        </div>
        <TrustShare score={score} tier={tier} answers={answers} />
        <TrustNotice className="tg-provenance" />
      </div>
      <Pitch score={score} />
      <LandedTrack score={score} total={total} />
    </section>
  );
}

function Pitch({ score }: { score: number }) {
  return (
    <aside className="tg-pitch" aria-labelledby="trust-pitch">
      <h2 id="trust-pitch">{trustGamePitch.title}</h2>
      <p className="tg-pitch-lede">{trustGamePitch.lede}</p>
      <ul className="tg-pitch-list">
        {trustGamePitch.points.map((point) => (
          <li key={point}>
            <Check />
            {point}
          </li>
        ))}
      </ul>
      <p className="tg-pitch-lede">{trustGamePitch.close}</p>
      <div className="tg-pitch-links">
        <GetStartedLink analytics={{ id: "trust_game_get_started", section: "trust_game_results" }}>
          Get Started Free
        </GetStartedLink>
        <Link
          href="/products/insights"
          onClick={(event) => {
            captureCtaClick({
              buttonId: "trust_game_explore_insights",
              buttonText: event.currentTarget.textContent?.trim() ?? "",
              section: "trust_game_results",
              destination: "/products/insights",
            });
            capturePostHogEvent("trust_game_product_cta_clicked", {
              button_id: "trust_game_explore_insights",
              score,
            });
          }}
          className="font-semibold underline-offset-2 hover:underline"
        >
          Explore OllyGarden Insights →
        </Link>
      </div>
    </aside>
  );
}

function Check({ booth = false }: { booth?: boolean }) {
  return (
    <span className={booth ? "tb-pitch-check" : "tg-pitch-check"} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.5 7.2 5.4 10 11.5 3.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function LandedTrack({ score, total, booth = false }: { score: number; total: number; booth?: boolean }) {
  const stops = trustGameTierStops(total);
  const current = Math.max(
    0,
    stops.findIndex((stop) => score >= stop.low && score <= stop.high),
  );
  const [on, setOn] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const track = (
    <ol
      className={`tg-landed-track${on ? " is-on" : ""}`}
      style={{ "--reach": current } as CSSProperties}
    >
      {stops.map((stop, index) => {
        const state = index < current ? "is-passed" : index === current ? "is-current" : "is-ahead";
        return (
          <li key={stop.tier.id} className={`tg-stop ${state}`} style={{ "--n": index } as CSSProperties}>
            {index === current ? <span className="tg-stop-you">You</span> : null}
            <span className="tg-stop-node" />
            <span className="tg-stop-emoji" aria-hidden="true">
              {stop.tier.emoji}
            </span>
            <span className="tg-stop-range">
              {stop.low === stop.high ? stop.low : `${stop.low}–${stop.high}`}
              <span>/{total}</span>
            </span>
            <span className="tg-stop-tip">
              <b>{stop.tier.name}</b>
              {stop.tier.message}
            </span>
          </li>
        );
      })}
    </ol>
  );

  return booth ? <div className="tb-landed">{track}</div> : <div className="tg-landed">{track}</div>;
}

function TrustShare({
  score,
  tier,
  answers,
}: {
  score: number;
  tier: TrustGameTier;
  answers: readonly TrustAnswer[];
}) {
  const [url] = useState(() => getAbsoluteUrl(trustGameResultPath(trustGameResultToken(score))));
  const text = [
    `I called ${score}/${answers.length} telemetry conclusions right: ${tier.name} ${tier.emoji}`,
    answers.map((answer) => (answer.correct ? "🟩" : "🟥")).join(""),
  ].join("\n");

  return (
    <ResultShare
      text={text}
      url={url}
      align="start"
      onShared={(channel) => capturePostHogEvent("trust_game_shared", { channel, score })}
    />
  );
}

function useBoothStage() {
  const [stage, setStage] = useState<Stage>({ zoom: 1, width: BOOTH_WIDTH, height: BOOTH_HEIGHT });
  useEffect(() => {
    const fit = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      const zoom = Math.min(width / BOOTH_WIDTH, height / BOOTH_HEIGHT);
      setStage({ zoom, width: width / zoom, height: height / zoom });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return stage;
}

function useCursorHidden() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let timer = window.setTimeout(() => setHidden(true), 2500);
    const show = () => {
      setHidden(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setHidden(true), 2500);
    };
    window.addEventListener("pointermove", show);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", show);
    };
  }, []);
  return hidden;
}

function useFit(
  frameRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
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

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void document.documentElement.requestFullscreen?.();
}

function BoothFrame({
  screen,
  exitLabel,
  exitKey,
  onExit,
  progress,
  children,
}: {
  screen: "attract" | "case" | "result";
  exitLabel: string;
  exitKey?: string;
  onExit: () => void;
  progress?: ReactNode;
  children: ReactNode;
}) {
  const stage = useBoothStage();
  const cursorHidden = useCursorHidden();
  useEffect(() => {
    document.documentElement.classList.add("tb-lock");
    return () => document.documentElement.classList.remove("tb-lock");
  }, []);

  return (
    <div className={`tg-page tb-page${cursorHidden ? " is-cursor-hidden" : ""}`}>
      <div
        className={`tb-stage tb-stage--${screen}`}
        style={{ zoom: stage.zoom, width: stage.width, height: stage.height }}
      >
        <div className="tb-top">
          <BrandLogo linked={false} width={270} className="tb-logo" />
          {progress}
          <button type="button" className="tb-exit" onClick={onExit}>
            {exitLabel}
            {exitKey ? <BoothKey>{exitKey}</BoothKey> : null}
          </button>
        </div>
        <BoothStageContext.Provider value={stage}>{children}</BoothStageContext.Provider>
      </div>
    </div>
  );
}

const BoothStageContext = createContext<Stage>({ zoom: 1, width: BOOTH_WIDTH, height: BOOTH_HEIGHT });

function BoothProgress({
  deck,
  answers,
  index,
  score,
}: {
  deck: readonly TrustCase[];
  answers: readonly TrustAnswer[];
  index: number;
  score: number;
}) {
  return (
    <div className="tb-top-game">
      <p className="tb-count">
        Case <b>{index + 1}</b> of {deck.length}
      </p>
      <ol className="tb-progress" aria-hidden="true">
        {deck.map((item, position) => {
          const result = answers[position];
          const state = result ? (result.correct ? "is-right" : "is-wrong") : position === index ? "is-now" : "";
          return <li key={item.id} className={`tb-progress-step ${state}`} />;
        })}
      </ol>
      <p className="tb-count">
        <b>{score}</b> correct
      </p>
    </div>
  );
}

function BoothAttract({
  staff,
  stats,
  onStart,
}: {
  staff: boolean;
  stats: BoothStats;
  onStart: (size: number) => void;
}) {
  const sampleIndex = useSample(true);
  const sample = trustGameCases[sampleIndex];
  const totals = boothTotals(stats);

  return (
    <section className="tb-screen tb-start" aria-labelledby="tb-title">
      <div className="tb-start-copy">
        <p className="tb-kicker">
          A telemetry trust game · {trustGameCases.length} real cases
        </p>
        <h1 className="tb-title" id="tb-title">
          Would you <em>trust</em> this telemetry?
        </h1>
        <p className="tb-start-sub">
          Real production telemetry, and the conclusion someone drew from it. Some hold up. Some don’t. You make
          the call.
        </p>
        <div className="tb-start-actions">
          <button type="button" className="tb-btn tb-btn--primary" onClick={() => onStart(trustGameDeckSize)}>
            Play {trustGameDeckSize} cases
            <BoothKey>Enter</BoothKey>
          </button>
          <button type="button" className="tb-btn tb-btn--ghost" onClick={() => onStart(trustGameFullDeckSize)}>
            All {trustGameFullDeckSize}
            <BoothKey>A</BoothKey>
          </button>
        </div>
      </div>
      <div className="tb-start-side">
        {staff ? (
          <StaffTable stats={stats} />
        ) : (
          <div className="tb-sample" key={sample.id}>
            <div className="tb-sample-head">
              <span className="tb-chip tg-chip">{signalLabel(sample.signal)}</span>
              <span className="tb-sample-q">Holds up?</span>
            </div>
            <p className="tb-sample-claim">“{sample.claim}”</p>
            <div className="tb-sample-data">
              <TelemetryScreen caption={sample.screen} panels={sample.panels} revealed={false} />
            </div>
          </div>
        )}
        <p className="tb-provenance">
          <b>Anonymized, but real.</b> Every service, host, endpoint and ID name is invented. Status codes, span
          structure and ratios are as measured.
        </p>
      </div>
      <div className="tb-start-foot">
        {stats.games ? (
          <dl className="tb-booth-stats">
            <div>
              <dt>Games at this booth</dt>
              <dd>{stats.games}</dd>
            </div>
            <div>
              <dt>Average accuracy</dt>
              <dd>{percent(totals.correct, totals.total)}%</dd>
            </div>
          </dl>
        ) : (
          <p className="tb-booth-first">Be the first to play at this booth.</p>
        )}
      </div>
    </section>
  );
}

function BoothKey({ children }: { children: string }) {
  return (
    <kbd className="tb-key" aria-hidden="true">
      {children}
    </kbd>
  );
}

function useSample(active: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % trustGameCases.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [active]);
  return index;
}

function StaffTable({ stats }: { stats: BoothStats }) {
  return (
    <div className="tb-staff">
      <p className="tb-kicker" style={{ fontSize: 18, marginBottom: 12 }}>
        Per-case accuracy · {stats.games} games · S to close
      </p>
      <table>
        <thead>
          <tr>
            <th>Case</th>
            <th style={{ textAlign: "right" }}>Correct</th>
            <th style={{ textAlign: "right" }}>Played</th>
            <th style={{ textAlign: "right" }}>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {trustGameCases.map(({ id }) => {
            const entry = stats.cases[id] ?? { correct: 0, total: 0 };
            return (
              <tr key={id}>
                <td>{id}</td>
                <td style={{ textAlign: "right" }}>{entry.correct}</td>
                <td style={{ textAlign: "right" }}>{entry.total}</td>
                <td style={{ textAlign: "right" }}>{entry.total ? `${percent(entry.correct, entry.total)}%` : "–"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BoothCase({
  item,
  number,
  count,
  answer,
  last,
  crowd,
  claimRef,
  onChoose,
  onNext,
}: {
  item: TrustCase;
  number: number;
  count: number;
  answer?: TrustAnswer;
  last: boolean;
  crowd: number | null;
  claimRef: RefObject<HTMLQuoteElement | null>;
  onChoose: (trusted: boolean) => void;
  onNext: () => void;
}) {
  const stage = useContext(BoothStageContext);
  const briefRef = useRef<HTMLDivElement>(null);
  const briefInnerRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const dataInnerRef = useRef<HTMLDivElement>(null);
  const answered = Boolean(answer);
  useFit(briefRef, briefInnerRef, 1, stage, item.id, answered);
  useFit(dataRef, dataInnerRef, 1.9, stage, item.id, answered);

  return (
    <section className={`tb-screen tb-case${answered ? " is-answered" : ""}`} aria-label={`Case ${number} of ${count}`}>
      <div className="tb-brief" ref={briefRef}>
        <div className="tb-brief-inner" ref={briefInnerRef}>
          <p className="tb-label">
            <span className="tb-chip tg-chip">{signalLabel(item.signal)}</span>
            The situation
          </p>
          <p className="tb-situation">{item.situation}</p>
          <figure className="tb-claim">
            <figcaption className="tb-label tb-label--lime">The conclusion</figcaption>
            <blockquote ref={claimRef} tabIndex={-1}>
              {item.claim}
            </blockquote>
          </figure>
          {answer ? (
            <Reveal item={item} answer={answer} last={last} onNext={onNext} crowd={crowd} booth />
          ) : (
            <div className="tb-call">
              <p className="tb-call-q">{trustGameRule.question}</p>
              <div className="tb-choices">
                {([true, false] as const).map((trusted) => {
                  const parts = splitChoice(trusted ? trustGameRule.holds : trustGameRule.fails);
                  return (
                    <button
                      key={String(trusted)}
                      type="button"
                      className={`tb-choice ${trusted ? "is-yes" : "is-no"}`}
                      onClick={() => onChoose(trusted)}
                    >
                      <span className="tb-key">{trusted ? trustGameRule.keys.holds : trustGameRule.keys.fails}</span>
                      <span className="tb-choice-word">{parts.word}</span>
                      <span className="tb-choice-sub">{parts.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tb-data" ref={dataRef}>
        <div className="tb-data-inner" ref={dataInnerRef}>
          <TelemetryScreen caption={item.screen} panels={item.panels} revealed={answered} />
        </div>
      </div>
    </section>
  );
}

function BoothResults({
  answers,
  onRetake,
  onHome,
}: {
  answers: readonly TrustAnswer[];
  onRetake: () => void;
  onHome: () => void;
}) {
  const score = answers.filter((answer) => answer.correct).length;
  const total = answers.length;
  const tier = trustGameTier(score, total);
  const [left, setLeft] = useState(BOOTH_RESULT_MS / 1000);
  const finish = useEffectEvent(onHome);
  useEffect(() => {
    const started = Date.now();
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((BOOTH_RESULT_MS - (Date.now() - started)) / 1000));
      setLeft(remaining);
      if (Date.now() - started >= BOOTH_RESULT_MS) {
        window.clearInterval(timer);
        finish();
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="tb-screen tb-result" aria-labelledby="tb-result-title">
      <div className="tb-result-main">
        <p className="tb-kicker" id="tb-result-title">
          Your result
        </p>
        <p className="tb-score">
          <span className="tb-score-num">{score}</span>
          <span className="tb-score-of">/{total}</span>
        </p>
        <p className="tb-tier">
          {tier.emoji} {tier.name}
        </p>
        <p className="tb-tier-msg">{tier.message}</p>
        <div className="tb-result-actions">
          <button type="button" className="tb-btn tb-btn--primary" onClick={onRetake}>
            Play again
            <BoothKey>Enter</BoothKey>
          </button>
          <button type="button" className="tb-btn tb-btn--ghost" onClick={onHome}>
            Home
            <BoothKey>H</BoothKey>
          </button>
        </div>
      </div>
      <LandedTrack score={score} total={total} booth />
      <div className="tb-result-side">
        <aside className="tb-pitch" aria-labelledby="tb-pitch-title">
          <h2 className="tb-pitch-title" id="tb-pitch-title">
            {trustGamePitch.title}
          </h2>
          <p className="tb-pitch-lede">{registerOpenTelemetry(trustGamePitch.lede)}</p>
          <ul className="tb-pitch-list">
            {trustGamePitch.points.map((point) => (
              <li key={point}>
                <Check booth />
                {point}
              </li>
            ))}
          </ul>
          <p className="tb-pitch-lede">{trustGamePitch.close}</p>
          <div className="tb-pitch-cta">
            {/* The booth QR is a fixed SVG, not a content image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="tb-qr" src="/images/qr-ollygarden.svg" alt="" />
            <div>
              <p className="tb-pitch-scan">Scan to play on your phone</p>
              <p className="tb-pitch-url">{getSiteUrl().host}</p>
            </div>
          </div>
        </aside>
        <p className="tb-countdown">
          Back to the start in {left}s
          <span className="tb-countdown-bar" style={{ "--ms": `${BOOTH_RESULT_MS}ms` } as CSSProperties} />
        </p>
      </div>
    </section>
  );
}

/** The anonymized notice; the game page, the booth attract screen, and the results show it. */
export function TrustNotice({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      <b>{trustGameNotice.label}.</b> {trustGameNotice.text}
    </p>
  );
}
