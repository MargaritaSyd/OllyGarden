"use client";

import Link from "next/link";
import {
  type ReactNode,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { GetStartedLink } from "@/components/get-started-link";
import { ResultShare } from "@/components/result-share";
import { TelemetryScreen, mono } from "@/components/trust-game-panels";
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
} from "@/lib/trust-game/score";

/** The booth returns to its attract screen after this long without input. */
const BOOTH_IDLE_MS = 120_000;

const noSubscription = () => () => {};

function percent(part: number, whole: number) {
  return Math.round((100 * part) / whole);
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

  // Each new case, including the first of a new deal, starts at its top with focus on the claim.
  const round = useRef<HTMLDivElement>(null);
  const claim = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if ((round.current?.getBoundingClientRect().top ?? 0) < 0) round.current?.scrollIntoView();
    claim.current?.focus({ preventScroll: true });
  }, [deck, index]);

  const onPageHide = useEffectEvent(() => {
    if (active && !complete) capturePostHogEvent("trust_game_abandoned", { case_number: index + 1 });
  });
  useEffect(() => {
    if (booth) return;
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [booth]);

  // Booth keys: Y it holds, N something's off, Enter or Space next, Esc home, S staff counters.
  const onKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === "escape") {
      home();
      setStaff(false);
    } else if (!active && key === "s") setStaff((open) => !open);
    else if (active && key === trustGameRule.keys.holds.toLowerCase()) choose(true);
    else if (active && key === trustGameRule.keys.fails.toLowerCase()) choose(false);
    else if (answer && (key === "enter" || key === " ")) {
      // The focused Next button already handles its own Enter and Space.
      if (document.activeElement instanceof HTMLButtonElement) return;
      event.preventDefault();
      next();
    }
  });
  useEffect(() => {
    if (!booth) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booth]);

  useEffect(() => {
    if (!booth || !active) return;
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
  }, [booth, active]);

  if (!active) {
    return booth ? (
      <BoothAttract staff={staff} onStart={start} />
    ) : (
      <section
        className="mx-auto max-w-3xl rounded-3xl border border-sunflower/30 bg-card p-[clamp(1.5rem,5vw,4rem)]"
        aria-labelledby="trust-start"
      >
        <p className="text-sm font-bold tracking-[.15em] text-bitmap-mid uppercase">
          Ready when you are
        </p>
        <h2 id="trust-start" className="mt-4 text-3xl font-bold text-mist">
          {trustGameDeckSize} conclusions. Does the telemetry back them up?
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-8 text-mist/70">
          {trustGameRule.explainer} Half the conclusions hold. No timer and no sign-up.
        </p>
        <button
          type="button"
          onClick={() => start(trustGameDeckSize)}
          className="mt-8 rounded-xl bg-sunflower px-6 py-3 font-semibold text-forest"
        >
          Start the game
        </button>
      </section>
    );
  }

  if (complete) {
    return <Results booth={booth} answers={answers} onRetake={retake} onHome={home} />;
  }

  return (
    <div
      ref={round}
      className={`scroll-mt-6 ${booth ? "flex flex-1 flex-col" : "rounded-3xl border border-white/10 bg-card p-[clamp(1.25rem,3.5vw,3rem)]"}`}
    >
      <Progress deck={deck} answers={answers} index={index} score={score} onExit={booth ? home : undefined} />
      <div
        className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-x-12"
      >
        <section aria-labelledby="trust-claim" className="flex flex-col gap-5">
          <p className={`flex items-center gap-2.5 text-xs tracking-[.12em] text-mist/55 uppercase ${mono}`}>
            <span className="bg-sprout px-2 py-0.5 tracking-[.08em] text-forest">{current.signal}</span>
            The situation
          </p>
          <p className={`leading-relaxed text-mist/75 ${booth ? "text-[clamp(1.05rem,1.45vw,1.25rem)]" : "text-lg"}`}>
            {current.situation}
          </p>
          <div className="border-l-4 border-sunflower py-1 pl-4">
            <p className={`mb-2 text-xs tracking-[.12em] text-sunflower uppercase ${mono}`}>
              The conclusion
            </p>
            <p
              id="trust-claim"
              ref={claim}
              tabIndex={-1}
              className={`font-bold leading-[1.12] tracking-[-.02em] text-mist text-balance outline-none ${booth ? "text-[clamp(1.5rem,2.5vw,2.25rem)]" : "text-[clamp(1.35rem,3vw,1.85rem)]"}`}
            >
              {current.claim}
            </p>
          </div>
        </section>
        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <TelemetryScreen key={current.id} caption={current.screen} panels={current.panels} revealed={Boolean(answer)} />
        </div>
        <Verdict
          key={current.id}
          booth={booth}
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
  onExit,
}: {
  deck: readonly TrustCase[];
  answers: readonly TrustAnswer[];
  index: number;
  score: number;
  onExit?: () => void;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mist/60 ${mono}`}>
      <span>
        Case {index + 1} of {deck.length}
      </span>
      <span className="flex flex-wrap gap-1" aria-hidden="true">
        {deck.map((item, position) => {
          const result = answers[position];
          const state = result
            ? result.correct
              ? "border-sprout bg-sprout"
              : "border-wrong bg-wrong"
            : position === index
              ? "border-sunflower"
              : "border-white/20";
          return <i key={item.id} className={`block size-3 border-[1.5px] ${state}`} />;
        })}
      </span>
      <span className="text-mist tabular-nums">{score} correct</span>
      {onExit ? (
        <button
          type="button"
          onClick={onExit}
          className="ml-auto rounded-lg border border-white/15 px-3 py-1.5 text-mist/70"
        >
          Exit
        </button>
      ) : null}
    </div>
  );
}

function Verdict({
  booth,
  item,
  answer,
  last,
  onChoose,
  onNext,
}: {
  booth: boolean;
  item: TrustCase;
  answer?: TrustAnswer;
  last: boolean;
  onChoose: (trusted: boolean) => void;
  onNext: () => void;
}) {
  const nextButton = useRef<HTMLButtonElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!answer) return;
    // Keep the highlighted telemetry in view; only bring the reveal up when it starts off-screen.
    nextButton.current?.focus({ preventScroll: true });
    if ((reveal.current?.getBoundingClientRect().top ?? 0) > window.innerHeight * 0.75) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      reveal.current?.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "auto" });
    }
  }, [answer]);

  const button = `flex flex-col items-center gap-0.5 rounded-xl px-3 font-bold tracking-[-.01em] text-forest transition-[filter,transform] motion-safe:hover:-translate-y-0.5 enabled:hover:brightness-110 disabled:cursor-default disabled:brightness-50 disabled:saturate-[.25] ${booth ? "py-6 text-[clamp(1.4rem,2.2vw,1.9rem)]" : "py-4 text-xl"}`;
  const picked = "!brightness-100 !saturate-100 outline-3 outline-offset-3 outline-mist";

  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg font-semibold text-mist">{trustGameRule.question}</p>
      <div className="grid grid-cols-2 gap-3">
        {([true, false] as const).map((trusted) => (
          <button
            key={String(trusted)}
            type="button"
            disabled={Boolean(answer)}
            aria-pressed={answer ? answer.trusted === trusted : undefined}
            onClick={() => onChoose(trusted)}
            className={`${button} ${trusted ? "bg-sprout" : "bg-sunflower"} ${answer?.trusted === trusted ? picked : ""}`}
          >
            {trusted ? trustGameRule.holds : trustGameRule.fails}
            {booth ? (
              <span className={`text-[11px] font-normal tracking-[.1em] opacity-70 ${mono}`}>
                [{trusted ? trustGameRule.keys.holds : trustGameRule.keys.fails}]
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div ref={reveal} aria-live="polite" className="scroll-mt-6">
        {answer ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-sunflower/20 bg-card p-5 motion-safe:animate-[trust-rise_.35s_ease_both]">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`-rotate-3 border-2 px-2.5 py-1 text-[13px] font-semibold tracking-[.14em] uppercase ${mono} ${item.truth ? "text-sprout" : "text-sunflower"}`}
              >
                {trustGameRule.verdict[item.truth ? "holds" : "fails"]}
              </span>
              <span className={`text-xl font-bold ${answer.correct ? "text-sprout" : "text-wrong"}`}>
                {answer.correct ? "You got it." : "Fooled you."}
              </span>
            </div>
            <h3 className="text-xl leading-tight font-bold text-balance text-mist">{item.headline}</h3>
            <p className="max-w-[62ch] leading-7 text-mist/75">{item.explain}</p>
            <dl className="grid gap-2 text-[15px]">
              <RevealRow label="The data">{trustGameRule.data[item.truth ? "holds" : item.flaw]}</RevealRow>
              <RevealRow label="The tell">{item.tell}</RevealRow>
              {item.truth ? null : <RevealRow label="The fix">{item.fix}</RevealRow>}
              {item.detector ? (
                <RevealRow label="OllyGarden">Flagged by the {item.detector} insight.</RevealRow>
              ) : null}
              <RevealRow label="Source">{item.source}</RevealRow>
            </dl>
            <button
              ref={nextButton}
              type="button"
              onClick={onNext}
              className="mt-1 self-start rounded-xl bg-mist px-6 py-3 font-semibold text-forest"
            >
              {last ? "See my score" : "Next case"} →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RevealRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-2.5">
      <dt className={`pt-0.5 text-[11px] tracking-[.1em] text-mist/50 uppercase ${mono}`}>{label}</dt>
      <dd className="min-w-0 text-mist">{children}</dd>
    </div>
  );
}

function Results({
  booth,
  answers,
  onRetake,
  onHome,
}: {
  booth: boolean;
  answers: readonly TrustAnswer[];
  onRetake: () => void;
  onHome: () => void;
}) {
  const score = answers.filter((answer) => answer.correct).length;
  const total = answers.length;
  const tier = trustGameTier(score, total);
  const { liesTrusted, truthsDoubted } = trustGameMistakes(answers);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);

  return (
    <section
      aria-labelledby="trust-result"
      className={`grid items-center gap-[clamp(1.5rem,4vw,4rem)] ${booth ? "flex-1 lg:grid-cols-2" : "rounded-3xl border border-sunflower/30 bg-card p-[clamp(1.5rem,5vw,4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"}`}
    >
      <div>
        <p className="text-sm font-bold tracking-[.15em] text-bitmap-mid uppercase">Your result</p>
        <h2
          id="trust-result"
          ref={heading}
          tabIndex={-1}
          className={`mt-4 font-bold leading-[.85] tracking-[-.05em] text-mist tabular-nums outline-none ${booth ? "text-[clamp(5.5rem,14vw,12.5rem)]" : "text-[clamp(3.5rem,10vw,6rem)]"}`}
        >
          {score}
          <span className="text-[.4em] tracking-[-.02em] text-mist/40">/{total}</span>
        </h2>
        <p className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-sunflower">
          {tier.name} {tier.emoji}
        </p>
        <p className="mt-2 max-w-xl text-lg text-mist/75">{tier.message}</p>
        <div className="mt-6 grid max-w-md gap-3 sm:grid-cols-2">
          {[
            [liesTrusted, "bad calls you accepted"],
            [truthsDoubted, "good calls you rejected"],
          ].map(([count, label]) => (
            <p key={label} className="rounded-xl border border-white/10 p-4 text-mist/70">
              <b className="block text-3xl text-mist tabular-nums">{count}</b>
              {label}
            </p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={onRetake} className="rounded-xl bg-mist px-6 py-3 font-semibold text-forest">
            Play again
          </button>
          {booth ? (
            <button type="button" onClick={onHome} className="rounded-xl border border-mist/30 px-6 py-3 font-semibold">
              Home
            </button>
          ) : null}
        </div>
        {booth ? null : <TrustShare score={score} tier={tier} answers={answers} />}
        <TrustNotice className="mt-6 max-w-[60ch]" />
      </div>
      <Pitch booth={booth} score={score} />
    </section>
  );
}

function Pitch({ booth, score }: { booth: boolean; score: number }) {
  return (
    <aside className="rounded-2xl bg-mist p-[clamp(1.4rem,3vw,2.25rem)] text-forest">
      <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.05] font-bold tracking-[-.02em] text-balance">
        {trustGamePitch.title}
      </h2>
      <p className="mt-4 text-[17px]">{trustGamePitch.lede}</p>
      <ul className="mt-3 list-disc pl-5">
        {trustGamePitch.points.map((point) => (
          <li key={point} className="mb-1">
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[17px]">{trustGamePitch.close}</p>
      {booth ? (
        <p className={`mt-5 inline-block bg-sunflower px-3 py-1.5 text-xl font-semibold ${mono}`}>
          {getSiteUrl().host}
        </p>
      ) : (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <GetStartedLink
            variant="inverse"
            analytics={{ id: "trust_game_get_started", section: "trust_game_results" }}
          >
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
      )}
    </aside>
  );
}

/** Share links for a finished web game; each points at the score's result page. */
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

function BoothAttract({
  staff,
  onStart,
}: {
  staff: boolean;
  onStart: (size: number) => void;
}) {
  const stats = parseBoothStats(useSyncExternalStore(noSubscription, readBoothStats, () => null));
  const totals = boothTotals(stats);

  return (
    <div className="grid flex-1 items-center gap-[clamp(1.5rem,4vw,4rem)] py-[4vh] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div>
        <p className={`mb-5 text-[13px] tracking-[.14em] text-sunflower uppercase ${mono}`}>
          A telemetry trust game · {trustGameCases.length} real cases
        </p>
        <h1 className="text-[clamp(2.75rem,7.4vw,7rem)] leading-[.92] font-bold tracking-[-.035em] text-balance text-mist">
          Would you <span className="text-sunflower">trust</span> this telemetry?
        </h1>
        <p className="mt-6 mb-8 max-w-[34ch] text-[clamp(1.1rem,1.7vw,1.45rem)] font-light text-mist/75">
          {registerOpenTelemetry(
            "Each case is real OpenTelemetry data from production systems, anonymized, and a conclusion someone drew from it. Some hold up. Some don't. You make the call.",
          )}
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <button
            type="button"
            onClick={() => onStart(trustGameDeckSize)}
            className="rounded-xl bg-sunflower px-8 py-4 text-[22px] font-bold text-forest"
          >
            Play {trustGameDeckSize} cases
          </button>
          <button
            type="button"
            onClick={() => onStart(trustGameFullDeckSize)}
            className="rounded-xl border-[1.5px] border-mist/30 px-6 py-4 text-[17px] font-medium text-mist"
          >
            All {trustGameFullDeckSize}
          </button>
        </div>
        <p className={`mt-5 text-xs text-mist/45 ${mono}`}>
          Keys: {trustGameRule.keys.holds} / {trustGameRule.keys.fails} answer · Enter next · Esc home
        </p>
        {stats.games ? (
          <div className={`mt-7 flex gap-7 text-xs text-mist/45 ${mono}`}>
            <p>
              <b className="block font-sans text-[26px] text-mist tabular-nums">{stats.games}</b>
              games at this booth
            </p>
            <p>
              <b className="block font-sans text-[26px] text-mist tabular-nums">
                {percent(totals.correct, totals.total)}%
              </b>
              average accuracy
            </p>
          </div>
        ) : null}
        <TrustNotice className="mt-7 max-w-[60ch]" />
      </div>
      {staff ? (
        <StaffTable stats={stats} />
      ) : (
        <div
          aria-hidden="true"
          className={`rotate-[1.2deg] rounded-2xl border border-white/10 bg-card p-6 text-[13px] shadow-[14px_14px_0_color-mix(in_srgb,var(--color-sprout)_18%,transparent)] motion-reduce:rotate-0 ${mono}`}
        >
          {[
            ["span.name", "LogsService/Export"],
            ["http.status_code", "200"],
            ["grpc.status_code", "8", true],
            ["severity", "UNSET"],
            ["timestamp", "1970-01-01T00:00:00Z", true],
            ["service.name", "unknown_service:java"],
          ].map(([key, value, warn]) => (
            <p key={String(key)}>
              <span className="text-mist/45">{key} </span>
              <span className={warn ? "text-sunflower" : "text-mist"}>{value}</span>
            </p>
          ))}
          <p className="mt-4 font-sans text-[22px] font-bold text-mist">Is everything fine?</p>
        </div>
      )}
    </div>
  );
}

/** Per-case accuracy for staff, opened with S on the attract screen. */
function StaffTable({ stats }: { stats: BoothStats }) {
  return (
    <div className={`rounded-2xl border border-sunflower/30 bg-card p-5 text-[13px] ${mono}`}>
      <p className="mb-3 text-sunflower">Per-case accuracy · {stats.games} games · S to close</p>
      <table className="w-full tabular-nums">
        <thead className="text-left text-mist/50">
          <tr>
            <th className="font-normal">Case</th>
            <th className="text-right font-normal">Correct</th>
            <th className="text-right font-normal">Played</th>
            <th className="text-right font-normal">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {trustGameCases.map(({ id }) => {
            const entry = stats.cases[id] ?? { correct: 0, total: 0 };
            return (
              <tr key={id} className="border-t border-white/8">
                <td className="py-0.5">{id}</td>
                <td className="text-right">{entry.correct}</td>
                <td className="text-right">{entry.total}</td>
                <td className="text-right">
                  {entry.total ? `${percent(entry.correct, entry.total)}%` : "–"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** The anonymized notice; the game page, the booth attract screen, and the results show it. */
export function TrustNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-6 text-mist/60 ${className}`}>
      <strong className="text-mist/80">{trustGameNotice.label}.</strong> {trustGameNotice.text}
    </p>
  );
}
