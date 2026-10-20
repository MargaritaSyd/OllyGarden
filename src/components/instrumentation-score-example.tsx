"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ImpactBadge, RuleText, categoryColor } from "@/components/instrumentation-score-ui";
import { useIsClient, usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { scoreCategories, scoreExample } from "@/lib/instrumentation-score";

type Example = Pick<typeof scoreExample, "service" | "ruleCount" | "findings" | "maxPoints" | "labels">;
type Category = (typeof scoreCategories)[number];

const EASE_MS = 900;
const POP_MS = 1400;
/** The arc spans 270°, from the bottom-left (score 0) to the bottom-right (score 100). */
const ARC = "M49.29 190.71 A100 100 0 1 1 190.71 190.71";

const displayScore = (score: number) => (score >= 99.95 ? "100" : score.toFixed(1));

function categoryFor(categories: readonly Category[], score: number) {
  return categories.find((category) => score >= category.min) ?? categories[categories.length - 1];
}

/** Eases toward `target`; returns `target` itself when motion is off, so the first render matches the HTML. */
function useEased(target: number, enabled: boolean) {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  if (!enabled && value !== target) setValue(target);

  useEffect(() => {
    if (!enabled) {
      current.current = target;
      return;
    }
    const from = current.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / EASE_MS);
      const next = from + (target - from) * (1 - (1 - t) ** 3);
      current.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled]);

  return enabled ? value : target;
}

const colorFade = "transition-[color,stroke] duration-500 motion-reduce:transition-none";

function Gauge({ score, categories, kicker }: { score: number; categories: readonly Category[]; kicker: string }) {
  const category = categoryFor(categories, score);
  const bands = [...categories].reverse();

  return (
    <div
      className="relative w-[min(100%,300px)] max-lg:w-[220px] max-md:w-[min(100%,240px)]"
      style={{ "--c": categoryColor[category.name] } as CSSProperties}
    >
      <svg viewBox="0 0 240 240" className="block h-auto w-full overflow-visible" aria-hidden="true">
        {bands.map((band, index) => {
          const to = bands[index + 1]?.min ?? 101;
          return (
            <path
              key={band.name}
              d={ARC}
              pathLength={100}
              fill="none"
              strokeWidth={4}
              stroke={categoryColor[band.name]}
              opacity={0.4}
              strokeDasharray={`${to - band.min - 0.8} 100`}
              strokeDashoffset={-band.min}
            />
          );
        })}
        <path
          d={ARC}
          pathLength={100}
          fill="none"
          strokeWidth={14}
          className={`stroke-(--c) drop-shadow-[0_0_10px_color-mix(in_srgb,var(--c)_45%,transparent)] ${colorFade}`}
          strokeDasharray="100 100"
          strokeDashoffset={100 - score}
        />
        <g style={{ transform: `rotate(${2.7 * score}deg)`, transformOrigin: "120px 120px" }}>
          <rect x={43.29} y={184.71} width={12} height={12} strokeWidth={3} className={`fill-mist stroke-(--c) ${colorFade}`} />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 pt-1.5 text-center">
        <span className="text-[11px] font-bold tracking-[0.1em] text-mist/60 uppercase max-lg:text-[9px] max-lg:tracking-[0.06em]">
          {kicker}
        </span>
        <span
          className={`text-[68px] leading-[1.05] font-bold tracking-[-0.02em] text-(--c) tabular-nums max-lg:text-[50px] ${colorFade}`}
        >
          {displayScore(score)}
        </span>
        <span className={`text-lg font-bold text-(--c) max-lg:text-base ${colorFade}`}>{category.name}</span>
      </div>
    </div>
  );
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`grid size-[18px] place-items-center rounded-[5px] border-[1.5px] text-[#0b1f0f] transition-colors duration-200 motion-reduce:transition-none ${checked ? "border-[#9be07a] bg-[#9be07a]" : "border-mist/40"}`}
      aria-hidden="true"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-[opacity,transform] duration-300 motion-reduce:transition-none ${checked ? "opacity-100" : "scale-40 opacity-0"}`}
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

/** The worked example: fix each finding to see what it is worth. It starts at the computed score. */
export function ScoreExampleDemo({ example, categories }: { example: Example; categories: readonly Category[] }) {
  const { service, ruleCount, findings, maxPoints, labels } = example;
  const reducedMotion = usePrefersReducedMotion();
  const animated = useIsClient() && !reducedMotion;
  const scoreCard = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [fixed, setFixed] = useState<ReadonlySet<string>>(() => new Set());
  const [playing, setPlaying] = useState(false);
  const [pops, setPops] = useState<{ id: number; points: number }[]>([]);
  const timers = useRef<number[]>([]);
  const popTimers = useRef<number[]>([]);
  const popId = useRef(0);

  const lost = findings.filter((item) => !fixed.has(item.id)).reduce((sum, item) => sum + item.weight, 0);
  const score = ((maxPoints - lost) / maxPoints) * 100;
  // The HTML carries the real score; with motion on, the gauge sweeps up from 0 once it scrolls into view.
  const shown = useEased(animated && !seen ? 0 : score, animated && seen);
  const category = categoryFor(categories, score);
  const failing = findings.length - fixed.size;

  useEffect(() => {
    const node = scoreCard.current;
    if (!animated || !node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animated]);

  useEffect(() => {
    const play = timers.current;
    const popping = popTimers.current;
    return () => [...play, ...popping].forEach(window.clearTimeout);
  }, []);

  const pop = (points: number) => {
    if (reducedMotion) return;
    const id = ++popId.current;
    setPops((list) => [...list, { id, points }]);
    popTimers.current.push(window.setTimeout(() => setPops((list) => list.filter((item) => item.id !== id)), POP_MS));
  };

  const stop = () => {
    timers.current.splice(0).forEach(window.clearTimeout);
    setPlaying(false);
  };

  const reset = () => {
    stop();
    popTimers.current.splice(0).forEach(window.clearTimeout);
    setFixed(new Set());
    setPops([]);
  };

  const toggle = (item: Example["findings"][number]) => {
    stop();
    const next = new Set(fixed);
    if (next.has(item.id)) {
      next.delete(item.id);
      pop(-item.weight);
    } else {
      next.add(item.id);
      pop(item.weight);
    }
    setFixed(next);
  };

  const play = () => {
    reset();
    setPlaying(true);
    const step = reducedMotion ? 250 : 1100;
    findings.forEach((item, index) => {
      timers.current.push(
        window.setTimeout(() => {
          setFixed((current) => new Set(current).add(item.id));
          pop(item.weight);
          if (index === findings.length - 1) setPlaying(false);
        }, 350 + step * index),
      );
    });
  };

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,400px)] max-lg:gap-5">
      <div className="flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-bitmap-highlight/24 bg-[#092611]">
        <div className="flex items-center gap-4 border-b border-[#1d3d1d] bg-[#04160a] px-5 py-3.5 font-mono text-[13px] text-mist/60 max-md:gap-3 max-md:px-3.5 max-md:py-3">
          <span className="flex gap-1.5 max-md:hidden" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#fb2c36]/80" />
            <span className="size-3 rounded-full bg-[#f0b100]/80" />
            <span className="size-3 rounded-full bg-[#00c950]/80" />
          </span>
          <span>
            service.name = <span className="font-semibold text-sunflower">{service}</span>
          </span>
          <span
            className={`ml-auto rounded-full border px-2.5 py-[3px] text-xs whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none ${failing ? "border-[#e54b4b]/45 text-[#f08a8a]" : "border-[#9be07a]/50 text-[#9be07a]"}`}
          >
            {failing ? `${failing} of ${ruleCount} failing` : `All ${ruleCount} passing`}
          </span>
        </div>

        <ul className="flex flex-col gap-2.5 px-4 pt-4 pb-1.5 max-md:px-3 max-md:pt-3 max-md:pb-1">
          {findings.map((item) => {
            const isFixed = fixed.has(item.id);
            return (
              <li
                key={item.id}
                className={`grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 rounded-[14px] border py-4 pr-4 pl-[18px] transition-colors duration-300 motion-reduce:transition-none max-md:grid-cols-[minmax(0,1fr)_auto] max-md:gap-3 max-md:p-3.5 ${isFixed ? "border-[#9be07a]/45 bg-[#9be07a]/6" : "border-mist/10 bg-[#011407]/45"}`}
              >
                <div className="min-w-0 max-md:col-span-full">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a href={`#${item.id}`} className="font-mono text-sm font-semibold text-sunflower underline-offset-[3px] hover:underline">
                      {item.id}
                    </a>
                    <span className={isFixed ? "opacity-50" : undefined}>
                      <ImpactBadge impact={item.impact} />
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 text-[15px] leading-[1.45] line-through transition-colors duration-300 motion-reduce:transition-none ${isFixed ? "text-mist/50 decoration-[#9be07a]/70" : "text-mist decoration-transparent"}`}
                  >
                    <RuleText text={item.finding} />
                  </p>
                </div>
                <span
                  className={`font-mono text-[13px] whitespace-nowrap tabular-nums transition-colors duration-300 motion-reduce:transition-none max-md:row-start-2 ${isFixed ? "text-[#9be07a]" : "text-[#f08a8a]"}`}
                  aria-hidden="true"
                >
                  {isFixed ? "+" : "−"}
                  {item.weight} pts
                </span>
                <button
                  type="button"
                  aria-pressed={isFixed}
                  onClick={() => toggle(item)}
                  className={`inline-flex min-w-[92px] items-center gap-2 rounded-[10px] border px-3 py-2 text-[13px] font-semibold transition-[border-color,background-color,color,transform] duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight motion-reduce:transition-none max-md:row-start-2 max-md:justify-self-end ${isFixed ? "border-[#9be07a]/60 bg-[#9be07a]/10 text-[#c4f0ae]" : "border-mist/20 text-mist hover:border-bitmap-highlight/60"}`}
                >
                  <CheckBox checked={isFixed} />
                  {isFixed ? labels.fixed : labels.fix}
                  <span className="sr-only"> {item.id}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex items-center gap-5 px-4 pt-3 pb-[18px] max-md:flex-wrap max-md:gap-x-5 max-md:gap-y-3 max-md:px-3 max-md:pb-4">
          <button
            type="button"
            onClick={playing ? stop : play}
            className="inline-flex items-center gap-2.5 rounded-full border border-sunflower/50 bg-sunflower/10 px-[18px] py-2.5 text-sm font-semibold text-sunflower transition-[background-color,color,transform] duration-200 hover:bg-sunflower hover:text-[#0b1f0f] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight motion-reduce:transition-none"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              {playing ? (
                <>
                  <rect x="1" y="1" width="3" height="8" fill="currentColor" />
                  <rect x="6" y="1" width="3" height="8" fill="currentColor" />
                </>
              ) : (
                <path d="M2 1 9 5 2 9Z" fill="currentColor" />
              )}
            </svg>
            {playing ? labels.stop : labels.play}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={!fixed.size && !playing}
            className="rounded py-1 text-sm font-medium text-mist/70 underline decoration-mist/30 underline-offset-4 transition-[color,opacity] duration-200 hover:text-mist disabled:cursor-default disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bitmap-highlight"
          >
            {labels.reset}
          </button>
        </div>
      </div>

      <div
        ref={scoreCard}
        className="relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-bitmap-highlight/40 bg-[#19321e] bg-[linear-gradient(rgb(1_30_12/0.42),rgb(1_30_12/0.82)),url('/images/texture-grain.png')] bg-repeat [background-size:100%_100%,328px_140px] px-7 py-8 max-lg:order-first max-lg:flex-row max-lg:flex-wrap max-lg:gap-x-8 max-lg:gap-y-6 max-lg:p-6 max-md:flex-col max-md:px-4"
      >
        <Gauge score={shown} categories={categories} kicker={labels.scoreKicker} />
        <div className="pointer-events-none absolute top-[26%] right-[14%]" aria-hidden="true">
          {pops.map((item) => (
            <span
              key={item.id}
              className={`is-score-pop absolute right-0 font-mono text-lg font-bold ${item.points > 0 ? "text-[#9be07a]" : "text-[#f08a8a]"}`}
            >
              {item.points > 0 ? "+" : "−"}
              {Math.abs(item.points)}
            </span>
          ))}
        </div>
        <p className="text-center font-mono text-[13.5px] text-mist/60 tabular-nums">
          <span aria-hidden="true">
            ({maxPoints} − {lost}) ÷ {maxPoints} × 100 ={" "}
          </span>
          <strong className="text-mist">{displayScore(score)}</strong>
          <span className="sr-only">: {category.name}</span>
        </p>
        <span className="sr-only" aria-live="polite">
          Score {displayScore(score)}, {category.name}
        </span>
      </div>
    </div>
  );
}
