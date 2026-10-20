"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ImpactBadge, RuleText, impactDot } from "@/components/instrumentation-score-ui";
import { textLink } from "@/components/guide-ui";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { ScoreRule, ScoreTarget, scoreRulesSection } from "@/lib/instrumentation-score";
import type { ScoreImpact } from "@/lib/instrumentation-score-rules";

const FLASH_MS = 2400;

const chip =
  "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunflower";
const chipOff = "border-mist/20 text-mist/75 hover:border-sunflower/60 hover:text-mist";
const chipOn = "border-sunflower bg-sunflower/12 text-mist";

function ExternalIcon() {
  return (
    <svg className="inline-block size-3 opacity-70" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 10 10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={`${chip} ${pressed ? chipOn : chipOff}`}>
      {children}
    </button>
  );
}

const Count = ({ n }: { n: number }) => <span className="font-mono text-[12px] text-mist/55">{n}</span>;

/**
 * The rules table with impact and target filters. Every rule is in the server-rendered HTML;
 * a `#RULE-ID` link anywhere on the page clears the filters, scrolls to the rule, and highlights it.
 */
export function ScoreRulesTable({
  rules,
  impacts,
  targets,
  copy,
}: {
  rules: readonly ScoreRule[];
  impacts: readonly ScoreImpact[];
  targets: readonly ScoreTarget[];
  copy: Pick<typeof scoreRulesSection, "filters" | "pending" | "howTo" | "opensRule">;
}) {
  const [impact, setImpact] = useState<ScoreImpact | null>(null);
  const [target, setTarget] = useState<ScoreTarget | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { filters } = copy;

  const shown = rules.filter(
    (rule) => (!impact || rule.impact === impact) && (!target || rule.targets.includes(target)),
  );

  useEffect(() => {
    const ids = new Set(rules.map((rule) => rule.id));
    let timer: number | undefined;
    let frame: number | undefined;

    const show = (id: string) => {
      cancelAnimationFrame(frame!);
      frame = requestAnimationFrame(() => {
        setImpact(null);
        setTarget(null);
        setFlash(null);
        frame = requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
          setFlash(id);
          window.clearTimeout(timer);
          timer = window.setTimeout(() => setFlash(null), FLASH_MS);
        });
      });
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id || !ids.has(id)) return;
      event.preventDefault();
      window.history.replaceState(null, "", `#${id}`);
      show(id);
    };

    const initial = window.location.hash.slice(1);
    if (ids.has(initial)) show(initial);

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame!);
      window.clearTimeout(timer);
    };
  }, [rules, reducedMotion]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div role="group" aria-label={filters.impact} className="flex flex-wrap items-center gap-2">
          <span className="w-24 text-[12px] font-bold tracking-[0.08em] text-mist/55 uppercase" aria-hidden="true">
            {filters.impactLabel}
          </span>
          <FilterButton pressed={!impact} onClick={() => setImpact(null)}>
            {filters.all} <Count n={rules.length} />
          </FilterButton>
          {impacts.map((level) => (
            <FilterButton key={level} pressed={impact === level} onClick={() => setImpact(impact === level ? null : level)}>
              <span className={`size-2 rounded-full ${impactDot[level]}`} aria-hidden="true" />
              {level} <Count n={rules.filter((rule) => rule.impact === level).length} />
            </FilterButton>
          ))}
        </div>
        <div role="group" aria-label={filters.target} className="flex flex-wrap items-center gap-2">
          <span className="w-24 text-[12px] font-bold tracking-[0.08em] text-mist/55 uppercase" aria-hidden="true">
            {filters.targetLabel}
          </span>
          <FilterButton pressed={!target} onClick={() => setTarget(null)}>
            {filters.all}
          </FilterButton>
          {targets.map((name) => (
            <FilterButton key={name} pressed={target === name} onClick={() => setTarget(target === name ? null : name)}>
              {name} <Count n={rules.filter((rule) => rule.targets.includes(name)).length} />
            </FilterButton>
          ))}
        </div>
        <p className="text-sm text-mist/60" aria-live="polite">
          Showing <strong className="text-mist">{shown.length}</strong> of {rules.length} rules
        </p>
      </div>

      <div className="relative overflow-x-auto rounded-2xl border border-sunflower/25 bg-[#002810]">
        <table className="w-full min-w-[760px] text-left text-[15px] text-mist/80">
          <caption className="sr-only">
            Instrumentation Score rules with their target, impact level, weight, and rationale
          </caption>
          <thead>
            <tr className="border-b border-mist/12 text-[12px] tracking-[0.08em] text-mist/55 uppercase">
              <th scope="col" className="px-5 py-3 font-bold">Rule</th>
              <th scope="col" className="px-3 py-3 font-bold">Applies to</th>
              <th scope="col" className="px-3 py-3 font-bold">Impact</th>
              <th scope="col" className="px-5 py-3 font-bold">Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {shown.length ? (
              shown.map((rule) => (
                <tr
                  key={rule.id}
                  id={rule.id}
                  className={`scroll-mt-24 border-b border-mist/8 align-top transition-colors duration-700 last:border-0 motion-reduce:transition-none ${flash === rule.id ? "bg-sunflower/14" : ""}`}
                >
                  <th scope="row" className="w-[34%] px-5 py-4 font-normal">
                    <a
                      href={rule.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-sm font-bold text-sunflower underline-offset-2 hover:underline"
                    >
                      {rule.id}
                      <ExternalIcon />
                      <span className="sr-only"> {copy.opensRule}</span>
                    </a>
                    <span className="sr-only">: </span>
                    <span className="mt-1 block leading-[1.5] text-mist">
                      <RuleText text={rule.description} />
                    </span>
                    {rule.criteriaDefined ? null : (
                      <span className="mt-1 block text-[13px] text-mist/55">{copy.pending}</span>
                    )}
                  </th>
                  <td className="px-3 py-4">
                    <span className="flex flex-wrap gap-1.5">
                      {rule.targets.map((name) => (
                        <span key={name} className="rounded-full border border-mist/20 px-2 py-0.5 text-[12px] text-mist/80">
                          {name}
                        </span>
                      ))}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <ImpactBadge impact={rule.impact} />
                    <span className="mt-1 block font-mono text-[13px] whitespace-nowrap text-mist/55">
                      weight {rule.weight} pts
                    </span>
                  </td>
                  <td className="px-5 py-4 leading-[1.5]">
                    <RuleText text={rule.why} />
                    {rule.postHref ? (
                      <>
                        {" "}
                        <Link href={rule.postHref} className={`${textLink} whitespace-nowrap`}>
                          {copy.howTo} →
                        </Link>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center">
                  <p className="text-mist/75">{filters.empty}</p>
                  <button
                    type="button"
                    className={`${textLink} mt-2`}
                    onClick={() => {
                      setImpact(null);
                      setTarget(null);
                    }}
                  >
                    {filters.reset}
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
