"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { ImpactBadge, RuleText, impactDot } from "@/components/instrumentation-score-ui";
import { textLink } from "@/components/guide-ui";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { ScoreRule, ScoreTarget, scoreRulesSection } from "@/lib/instrumentation-score";
import type { ScoreImpact } from "@/lib/instrumentation-score-rules";

const FLASH_MS = 2400;

const chip =
  "inline-flex items-center gap-2 rounded-full border px-3.5 py-[7px] text-sm leading-[18px] font-medium transition-[color,border-color,background-color,transform] duration-200 active:scale-96 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight motion-reduce:transition-none max-md:px-3 max-md:py-1.5 max-md:text-[13px]";
const chipOff =
  "border-mist/16 bg-[#011407]/40 text-mist/85 hover:border-bitmap-highlight/55 hover:text-bitmap-highlight";
const chipOn = "border-sunflower bg-sunflower text-[#0b1f0f]";

/** A pressed impact filter takes its level's color. */
const impactOn: Record<ScoreImpact, string> = {
  Critical: "border-[#e54b4b] bg-[#e54b4b] text-[#0b1f0f]",
  Important: "border-[#f1b530] bg-[#f1b530] text-[#0b1f0f]",
  Normal: "border-[#a7b93b] bg-[#a7b93b] text-[#0b1f0f]",
  Low: "border-mist bg-mist text-[#0b1f0f]",
};

const impactBar: Record<ScoreImpact, string> = {
  Critical: "#e54b4b",
  Important: "#f1b530",
  Normal: "#a7b93b",
  Low: "#faf9f08c",
};

function ExternalIcon() {
  return (
    <svg className="is-ext size-3" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 10 10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterButton({
  pressed,
  onClick,
  on = chipOn,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  on?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={`${chip} ${pressed ? on : chipOff}`}>
      {children}
    </button>
  );
}

const Count = ({ n }: { n: number }) => <span className="text-xs tabular-nums opacity-60">{n}</span>;

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
            <FilterButton
              key={level}
              pressed={impact === level}
              on={impactOn[level]}
              onClick={() => setImpact(impact === level ? null : level)}
            >
              <span
                className={`size-2 transition-colors duration-200 ${impact === level ? "bg-[#0b1f0f]" : impactDot[level]}`}
                aria-hidden="true"
              />
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

      <div className="is-rule-wrap">
        <ul
          className="is-rule-list"
          aria-label="Instrumentation Score rules with their target, impact level, weight, and rationale"
        >
          <li className="is-rule is-rule--head" aria-hidden="true">
            <span>Rule</span>
            <span>Applies to</span>
            <span>Impact</span>
            <span>Why it matters</span>
          </li>
          {shown.length ? (
            shown.map((rule) => (
              <li
                key={rule.id}
                id={rule.id}
                className={`is-rule${flash === rule.id ? " is-flash" : ""}`}
                style={{ "--c": impactBar[rule.impact] } as CSSProperties}
              >
                <div className="is-rule-main">
                  <a
                    href={rule.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="is-rule-id font-mono"
                  >
                    {rule.id}
                    <ExternalIcon />
                    <span className="sr-only"> {copy.opensRule}</span>
                  </a>
                  <p className="mt-1 mb-0 leading-[1.5] text-mist">
                    <RuleText text={rule.description} />
                  </p>
                  {rule.criteriaDefined ? null : (
                    <p className="mt-1 mb-0 text-[13px] text-mist/55">{copy.pending}</p>
                  )}
                </div>
                <div className="is-rule-targets">
                  {rule.targets.map((name) => (
                    <span key={name} className="is-target">
                      {name}
                    </span>
                  ))}
                </div>
                <div className="is-rule-impact">
                  <ImpactBadge impact={rule.impact} />
                  <span className="is-pts">weight {rule.weight} pts</span>
                </div>
                <div className="is-rule-why">
                  <p>
                    <RuleText text={rule.why} />
                  </p>
                  {rule.postHref ? (
                    <Link href={rule.postHref} className={`${textLink} is-howto`}>
                      {copy.howTo} →
                    </Link>
                  ) : null}
                </div>
              </li>
            ))
          ) : (
            <li className="is-empty">
              <p className="m-0">{filters.empty}</p>
              <button
                type="button"
                className={textLink}
                onClick={() => {
                  setImpact(null);
                  setTarget(null);
                }}
              >
                {filters.reset}
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
