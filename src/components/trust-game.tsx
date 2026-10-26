"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { QuizCount } from "@/components/quiz-score-cards";
import { onTrustGameStart } from "@/components/trust-game-cta";
import { TelemetryView } from "@/components/trust-game-telemetry";
import { dealTrustCases } from "@/lib/trust-game/deal";
import { trustCases } from "@/lib/trust-game/cases";
import { trustGameHow, trustGameIntro, trustGamePitch } from "@/lib/trust-game/copy";
import { dataVerdict, failsLabel, holdsLabel, signalLabels } from "@/lib/trust-game/present";
import {
  trustResultPath,
  trustResultToken,
  trustRoundSize,
  trustTier,
  trustTierRange,
  trustTiers,
} from "@/lib/trust-game/score";
import type { TrustCase } from "@/lib/trust-game/types";
import { capturePostHogEvent } from "@/lib/posthog";
import { getAbsoluteUrl } from "@/lib/site";

const pagePath = "/resources/trust-game";

const primaryButton =
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-mist px-8 text-base font-medium text-forest transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight";

const secondaryButton =
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-mist/50 bg-white/20 px-6 text-base font-medium text-mist transition-[color,background-color,transform] duration-300 hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight";

const chipButton =
  "rounded-xl border border-mist/30 px-5 py-2.5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight";

type Call = { trusted: boolean; correct: boolean };

function scrollStage() {
  requestAnimationFrame(() => {
    const stage = document.getElementById("trust-game-stage");
    if (!stage) return;
    const top = stage.getBoundingClientRect().top;
    if (top < 96 || top > window.innerHeight * 0.45) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stage.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  });
}

function showTell() {
  const tells = [...document.querySelectorAll<HTMLElement>("#trust-game-stage .is-tell")];
  if (!tells[0]) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  tells[0].scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  if (reduce || !tells[0].animate) return;
  for (const tell of tells) {
    tell.animate(
      [{ backgroundColor: "rgba(227, 226, 112, 0.4)" }, { backgroundColor: "rgba(227, 226, 112, 0.1)" }],
      { duration: 1200, delay: 350, easing: "ease-out", fill: "backwards" },
    );
  }
}

export function TrustGame({ sharedScore }: { sharedScore?: number }) {
  const [rounds, setRounds] = useState<TrustCase[]>([]);
  const [index, setIndex] = useState(0);
  const [calls, setCalls] = useState<(Call | null)[]>([]);
  const [done, setDone] = useState(false);
  const choicesRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [dock, setDock] = useState(false);

  const playing = rounds.length > 0 && !done;
  const round = rounds[index];
  const call = calls[index] ?? null;
  const answered = call !== null;
  const score = calls.filter((item) => item?.correct).length;
  const accepted = calls.filter((item) => item && !item.correct && item.trusted).length;
  const rejected = calls.filter((item) => item && !item.correct && !item.trusted).length;
  const sharedTier = sharedScore == null ? null : trustTier(sharedScore);

  const begin = useCallback(() => {
    if (done) {
      capturePostHogEvent("trust_game_retake", { previous_score: score, page_path: pagePath });
    }
    const dealt = dealTrustCases(trustCases);
    setRounds(dealt);
    setIndex(0);
    setCalls([]);
    setDone(false);
    setDock(false);
    capturePostHogEvent("trust_game_started", { case_count: dealt.length, page_path: pagePath });
    scrollStage();
  }, [done, score]);

  const choose = useCallback(
    (trusted: boolean) => {
      if (answered || !round) return;
      const correct = trusted === round.truth;
      setCalls((current) => {
        const next = [...current];
        next[index] = { trusted, correct };
        return next;
      });
      capturePostHogEvent("trust_game_answered", {
        case_id: round.id,
        signal: round.signal,
        correct,
        case_number: index + 1,
        page_path: pagePath,
      });
    },
    [answered, round, index],
  );

  const advance = useCallback(() => {
    if (!answered) return;
    if (index === rounds.length - 1) {
      setDone(true);
      capturePostHogEvent("trust_game_completed", { score, page_path: pagePath });
      capturePostHogEvent("trust_game_results_viewed", { score, page_path: pagePath });
      scrollStage();
      return;
    }
    setIndex((current) => current + 1);
    scrollStage();
  }, [answered, index, rounds.length, score]);

  useEffect(() => onTrustGameStart(() => (playing || done ? scrollStage() : begin())), [playing, done, begin]);

  useEffect(() => {
    if (!playing) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const key = event.key.toLowerCase();
      if (!answered && (key === "y" || key === "1")) {
        event.preventDefault();
        choose(true);
        return;
      }
      if (!answered && (key === "n" || key === "2")) {
        event.preventDefault();
        choose(false);
        return;
      }
      if (key === "enter" && answered && tag !== "BUTTON" && tag !== "A") {
        event.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, answered, choose, advance]);

  useEffect(() => {
    if (!playing || !answered) return;
    nextRef.current?.focus({ preventScroll: true });
  }, [playing, answered, index]);

  useEffect(() => {
    if (!playing) return;
    const stage = document.getElementById("trust-game-stage");
    const target = answered ? nextRef.current : choicesRef.current;
    if (!stage || !target) return;
    let stageSeen = false;
    let targetSeen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === stage) stageSeen = entry.isIntersecting;
          else targetSeen = entry.intersectionRatio > 0.6;
        }
        setDock(stageSeen && !targetSeen);
      },
      { rootMargin: "0px 0px -88px 0px", threshold: [0, 0.6, 1] },
    );
    observer.observe(stage);
    observer.observe(target);
    return () => observer.disconnect();
  }, [playing, answered, index]);

  useEffect(() => {
    const abandon = () => {
      if (playing) {
        capturePostHogEvent("trust_game_abandoned", {
          case_number: index + 1,
          page_path: pagePath,
        });
      }
    };
    window.addEventListener("pagehide", abandon);
    return () => window.removeEventListener("pagehide", abandon);
  }, [playing, index]);

  return (
    <>
      <section
        id="trust-game-stage"
        data-active={rounds.length > 0 ? "true" : "false"}
        className="surface-grain scroll-mt-28 rounded-3xl border border-sunflower/30 bg-[#082312]"
        aria-label="The game"
      >
        {done ? (
          <Result
            score={score}
            rounds={rounds}
            calls={calls}
            accepted={accepted}
            rejected={rejected}
            onReplay={begin}
          />
        ) : playing && round ? (
          <CasePane
            round={round}
            index={index}
            total={rounds.length}
            score={score}
            calls={calls}
            call={call}
            choicesRef={choicesRef}
            nextRef={nextRef}
            onChoose={choose}
            onAdvance={advance}
          />
        ) : (
          <Intro sharedScore={sharedScore} sharedTierName={sharedTier?.name} sharedEmoji={sharedTier?.emoji} onStart={begin} />
        )}
      </section>
      {playing && dock ? (
        <div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-sunflower/30 bg-forest/95 p-3 backdrop-blur min-[768px]:hidden"
        >
          {answered ? (
            <button type="button" onClick={advance} className={`${primaryButton} w-full`}>
              {index === rounds.length - 1 ? "See my score" : "Next case"}
              <CtaArrow />
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Does the telemetry back this up?">
              <button type="button" onClick={() => choose(true)} className={`${primaryButton} px-3`}>
                <b>Yes</b> it holds
              </button>
              <button type="button" onClick={() => choose(false)} className={`${secondaryButton} px-3`}>
                <b>No</b> something&apos;s off
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

function Intro({
  sharedScore,
  sharedTierName,
  sharedEmoji,
  onStart,
}: {
  sharedScore?: number;
  sharedTierName?: string;
  sharedEmoji?: string;
  onStart: () => void;
}) {
  const shared = sharedScore != null && sharedTierName;
  return (
    <div className="grid min-[992px]:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
      <div className="p-[clamp(1.5rem,4vw,3rem)]">
        <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">
          {shared ? "A shared result" : trustGameIntro.kicker}
        </p>
        <h2 className="mt-4 text-3xl font-bold text-mist">
          {shared
            ? `Someone called ${sharedScore}/${trustRoundSize} right: ${sharedTierName} ${sharedEmoji} Your turn.`
            : trustGameIntro.title}
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-8 text-mist/70">{trustGameIntro.lede}</p>
        <button type="button" onClick={onStart} className={`${primaryButton} mt-8`}>
          {trustGameIntro.start}
          <CtaArrow />
        </button>
        <p className="mt-4 text-sm text-mist/50 max-[767px]:hidden">{trustGameIntro.hint}</p>
      </div>
      <div className="border-t border-white/10 p-[clamp(1.5rem,4vw,3rem)] min-[992px]:border-t-0 min-[992px]:border-l">
        <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">How it works</p>
        <ol className="mt-4">
          {trustGameHow.map((step, stepIndex) => (
            <li key={step.title} className="flex gap-4 border-t border-white/10 py-4 first:border-t-0">
              <span className="text-sm font-bold text-sunflower">{String(stepIndex + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-semibold text-mist">{step.title}</span>
                <span className="mt-1 block text-sm leading-6 text-mist/70">{step.description}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function CasePane({
  round,
  index,
  total,
  score,
  calls,
  call,
  choicesRef,
  nextRef,
  onChoose,
  onAdvance,
}: {
  round: TrustCase;
  index: number;
  total: number;
  score: number;
  calls: (Call | null)[];
  call: Call | null;
  choicesRef: RefObject<HTMLDivElement | null>;
  nextRef: RefObject<HTMLButtonElement | null>;
  onChoose: (trusted: boolean) => void;
  onAdvance: () => void;
}) {
  const answered = call !== null;
  return (
    <div className="p-[clamp(1.25rem,3vw,2.5rem)]">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-mist/70">
          <span>Case {index + 1} of {total}</span>
          <span className="mx-2 text-mist/30">·</span>
          <span>{score} correct</span>
        </p>
        <ol className="flex gap-1" aria-hidden="true">
          {Array.from({ length: total }, (_, step) => {
            const stepCall = calls[step];
            const tone = stepCall == null ? (step === index ? "bg-sunflower" : "bg-mist/20") : stepCall.correct ? "bg-sprout" : "bg-[#e98b7d]";
            return <li key={step} className={`h-1.5 flex-1 rounded-full ${tone}`} />;
          })}
        </ol>
      </div>

      <p className="mt-6 text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">
        {signalLabels[round.signal]} · The situation
      </p>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-mist/80">{round.situation}</p>
      <figure className="mt-5 max-w-3xl rounded-2xl border border-sunflower/25 bg-forest/40 p-5">
        <figcaption className="text-xs font-bold tracking-[.14em] text-bitmap-mid uppercase">The conclusion</figcaption>
        <blockquote id="trust-claim" className="mt-2 text-xl leading-8 font-semibold text-mist">
          {round.claim}
        </blockquote>
      </figure>

      <div className="mt-6">
        <TelemetryView caption={round.screen} panels={round.panels} revealed={answered} />
      </div>

      <div className="mt-6">
        <p className="text-lg font-semibold text-mist">Does the telemetry back this up?</p>
        <div ref={choicesRef} className="mt-4 flex flex-col gap-3 sm:flex-row" role="group" aria-labelledby="trust-claim">
          {[true, false].map((trusted) => {
            const picked = call?.trusted === trusted;
            return (
              <button
                key={String(trusted)}
                type="button"
                disabled={answered}
                aria-pressed={answered ? picked : undefined}
                onClick={() => onChoose(trusted)}
                className={`flex flex-1 items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight ${
                  answered
                    ? picked
                      ? "border-sunflower bg-sunflower/15 text-mist"
                      : "border-mist/15 text-mist/35"
                    : trusted
                      ? "border-sprout/50 text-mist hover:border-sprout"
                      : "border-[#e98b7d]/50 text-mist hover:border-[#e98b7d]"
                }`}
              >
                <span className="font-semibold">{trusted ? "Yes, it holds" : "No, something's off"}</span>
                <span className="font-mono text-sm text-mist/50" aria-hidden="true">
                  {trusted ? "Y" : "N"}
                </span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-5">
          {call ? (
            <div className={`rounded-2xl border p-5 ${call.correct ? "border-sprout/40" : "border-[#e98b7d]/40"}`}>
              <div className="flex flex-wrap items-center gap-3">
                <Verdict holds={round.truth} />
                <span className={`inline-flex items-center gap-2 font-semibold ${call.correct ? "text-sprout" : "text-[#e98b7d]"}`}>
                  {call.correct ? <CheckIcon /> : <CrossIcon />}
                  {call.correct ? "You got it." : "Fooled you."}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-mist">{round.headline}</h3>
              <p className="mt-3 max-w-3xl leading-7 text-mist/75">{round.explain}</p>
              <dl className="mt-5 grid gap-3 text-sm leading-6">
                <RevealRow label="The data">{dataVerdict(round)}</RevealRow>
                <RevealRow label="The tell">
                  {round.tell}{" "}
                  <button type="button" onClick={showTell} className="font-semibold text-sunflower underline-offset-2 hover:underline">
                    Show me in the data <span aria-hidden="true">↑</span>
                  </button>
                </RevealRow>
                {round.truth ? null : <RevealRow label="The fix">{round.fix}</RevealRow>}
                {round.detector ? <RevealRow label="OllyGarden">Flagged by the {round.detector} insight.</RevealRow> : null}
                <RevealRow label="Source">{round.source}</RevealRow>
              </dl>
              <button ref={nextRef} type="button" onClick={onAdvance} className={`${primaryButton} mt-6`}>
                {index === total - 1 ? "See my score" : "Next case"}
                <CtaArrow />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Result({
  score,
  rounds,
  calls,
  accepted,
  rejected,
  onReplay,
}: {
  score: number;
  rounds: TrustCase[];
  calls: (Call | null)[];
  accepted: number;
  rejected: number;
  onReplay: () => void;
}) {
  const tier = trustTier(score);
  const tierIndex = trustTiers.findIndex((item) => item.name === tier.name);

  return (
    <div>
      <div className="grid min-[992px]:grid-cols-2">
        <div className="p-[clamp(1.5rem,4vw,3rem)]">
          <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">Your result</p>
          <h2 id="trust-result" className="mt-4 text-[clamp(3rem,7vw,4.5rem)] leading-none font-bold text-mist" aria-label={`${score} out of ${trustRoundSize}`}>
            <QuizCount value={score} />
            <span className="text-mist/40">/{trustRoundSize}</span>
          </h2>
          <p className="mt-4 text-xl font-semibold text-sunflower">
            {tier.name} {tier.emoji}
          </p>
          <p className="mt-3 max-w-xl text-lg leading-8 text-mist/75">{tier.message}</p>
          <div className="mt-5 flex flex-wrap gap-6 text-sm text-mist/70">
            <p>
              <b className="mr-2 text-lg text-mist">{accepted}</b>
              bad calls you accepted
            </p>
            <p>
              <b className="mr-2 text-lg text-mist">{rejected}</b>
              good calls you rejected
            </p>
          </div>
          <button type="button" onClick={onReplay} className={`${primaryButton} mt-8`}>
            Play again
          </button>
          <Share score={score} calls={calls} />
        </div>
        <div className="border-t border-white/10 p-[clamp(1.5rem,4vw,3rem)] min-[992px]:border-t-0 min-[992px]:border-l">
          <h2 className="text-2xl font-bold text-mist">{trustGamePitch.title}</h2>
          <p className="mt-4 leading-7 text-mist/75">{trustGamePitch.lede}</p>
          <ul className="mt-4 space-y-2">
            {trustGamePitch.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-mist">
                <span className="mt-1 text-sprout">
                  <CheckIcon />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-7 text-mist/75">{trustGamePitch.close}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <GetStartedLink analytics={{ id: "trust_game_get_started", section: "trust-game-result" }}>
              Get Started Free
              <CtaArrow />
            </GetStartedLink>
            <Link
              href="/products/insights"
              onClick={() =>
                capturePostHogEvent("trust_game_product_cta_clicked", {
                  product: "insights",
                  score,
                  page_path: pagePath,
                })
              }
              className={secondaryButton}
            >
              Explore OllyGarden Insights
              <CtaArrow />
            </Link>
          </div>
          <p className="mt-8 text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">Where you landed</p>
          <ol className="mt-3">
            {trustTiers.map((item, itemIndex) => {
              const current = itemIndex === tierIndex;
              return (
                <li
                  key={item.name}
                  className={`flex items-center gap-3 border-t border-white/10 py-2.5 first:border-t-0 ${current ? "text-sunflower" : "text-mist/70"}`}
                  aria-current={current || undefined}
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-auto text-sm font-semibold tabular-nums">
                    {trustTierRange(itemIndex)}/{trustRoundSize}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className="border-t border-white/10 p-[clamp(1.5rem,4vw,3rem)]">
        <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">Case by case</p>
        <ul className="mt-2">
          {rounds.map((item, itemIndex) => {
            const itemCall = calls[itemIndex];
            const correct = Boolean(itemCall?.correct);
            return (
              <li key={item.id} className="border-t border-white/10 first:border-t-0">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-3 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight [&::-webkit-details-marker]:hidden">
                    <span className={correct ? "text-sprout" : "text-[#e98b7d]"} aria-hidden="true">
                      {correct ? <CheckIcon /> : <CrossIcon />}
                    </span>
                    <span className="font-medium text-mist">{item.headline}</span>
                    <span className={`ml-auto text-sm max-[767px]:hidden ${correct ? "text-sprout" : "text-[#e98b7d]"}`}>
                      {correct ? "Right" : "Missed"}
                    </span>
                    <Caret />
                  </summary>
                  <div className="pb-4 pl-7 text-sm leading-6 text-mist/75">
                    <p>“{item.claim}”</p>
                    <p className="mt-2">
                      <span className="font-semibold text-mist">Your call </span>
                      {itemCall?.trusted ? "Yes, it holds" : "No, something's off"}
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold text-sprout">The verdict </span>
                      {item.truth ? holdsLabel : failsLabel}. {dataVerdict(item)}
                    </p>
                    <p className="mt-2">
                      <b>The tell: </b>
                      {item.tell}
                    </p>
                    {item.truth ? null : (
                      <p className="mt-2">
                        <b>The fix: </b>
                        {item.fix}
                      </p>
                    )}
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Share({ score, calls }: { score: number; calls: (Call | null)[] }) {
  const [copied, setCopied] = useState(false);
  const [url] = useState(() => getAbsoluteUrl(trustResultPath(trustResultToken(score))));
  const tier = trustTier(score);
  const grid = calls.map((item) => (item?.correct ? "🟩" : "🟥")).join("");
  const text = `I called ${score}/${trustRoundSize} telemetry conclusions right: ${tier.name} ${tier.emoji}\n${grid}`;
  const withUrl = `${text}\n${url}`;

  function shared(channel: string) {
    capturePostHogEvent("trust_game_shared", { channel, score, page_path: pagePath });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(withUrl);
      setCopied(true);
      shared("copy");
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard can be denied; the share links still work.
    }
  }

  async function shareNatively() {
    try {
      await navigator.share({ text, url });
      shared("native");
    } catch {
      // The visitor closed the share sheet.
    }
  }

  const links = [
    { channel: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { channel: "x", label: "X", href: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
    { channel: "bluesky", label: "Bluesky", href: `https://bsky.app/intent/compose?text=${encodeURIComponent(withUrl)}` },
  ];

  return (
    <div className="mt-8">
      <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">Share your result</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <a key={link.channel} href={link.href} target="_blank" rel="noreferrer" onClick={() => shared(link.channel)} className={chipButton}>
            {link.label}
          </a>
        ))}
        <button type="button" onClick={copy} className={chipButton} aria-live="polite">
          {copied ? "Copied" : "Copy result"}
        </button>
        {"share" in navigator ? (
          <button type="button" onClick={shareNatively} className={chipButton}>
            More…
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Verdict({ holds }: { holds: boolean }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase ${holds ? "border-sprout/50 text-sprout" : "border-[#e98b7d]/50 text-[#e98b7d]"}`}>
      {holds ? holdsLabel : failsLabel}
    </span>
  );
}

function RevealRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-white/10 pt-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
      <dt className="font-semibold text-mist/50">{label}</dt>
      <dd className="text-mist/85">{children}</dd>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3 8.5 3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Caret() {
  return (
    <svg className="text-mist/50 transition-transform group-open:rotate-180" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
