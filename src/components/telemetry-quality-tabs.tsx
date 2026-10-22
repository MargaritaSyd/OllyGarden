"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { CtaArrow } from "@/components/cta-arrow";
import { useIsClient, usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { QualityDimensionItem } from "@/lib/telemetry-quality";

/** Tab cards follow the reference: 32px padding, 24px below 768px, 24px radius. */
const tabCard =
  "rz-card flex flex-col rounded-3xl border border-bitmap-highlight/40 bg-[#19321e] bg-[url('/images/texture-grain.png')] bg-repeat [background-size:328px_140px] p-8 max-[767px]:p-6";

/** Renders `code` marks as the reference's attribute chips. */
function CodeText({ text }: { text: string }) {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={index}
        className="rounded-md border border-bitmap-highlight/22 bg-bitmap-highlight/10 px-[0.4em] py-px font-mono text-[0.86em] font-medium text-bitmap-highlight"
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}

function GuideLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group text-lg leading-[1.28] font-bold tracking-[-0.01em] text-sunflower ${className}`}
    >
      <span className="underline-offset-4 group-hover:underline">{label}</span>
      <CtaArrow className="ml-1.5 inline-block translate-y-px" />
    </Link>
  );
}

const statNumberClass =
  "text-[68px] leading-[1.27] font-bold tracking-[-0.01em] text-sunflower tabular-nums max-[767px]:text-[56px]";

/** Counts a `45%`-style stat once its tab is on screen. Other values, such as "1 in 6", stay put. */
function StatValue({ value, run }: { value: string; run: boolean }) {
  const match = /^(\d+)%$/.exec(value);
  if (!match) {
    return <p className={statNumberClass}>{value}</p>;
  }
  return <CountPercent end={Number(match[1])} run={run} />;
}

function CountPercent({ end, run }: { end: number; run: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const hydrated = useIsClient();
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    if (!run || prefersReducedMotion) return;

    const startedAt = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min(1, (now - startedAt) / 900);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, prefersReducedMotion, run]);

  const shown = prefersReducedMotion || !hydrated ? end : run ? value : 0;

  return (
    <p className={`${statNumberClass} ${hydrated ? "" : "motion-safe:invisible"}`} aria-label={`${end}%`}>
      {shown}%
    </p>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.5 6.5 9 12l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QualityDimensionTabs({
  items,
  signsTitle,
  learnTitle,
  learnIcon,
  caseStudyLabel,
}: {
  items: readonly QualityDimensionItem[];
  signsTitle: string;
  learnTitle: string;
  learnIcon: string;
  caseStudyLabel: string;
}) {
  const [active, setActive] = useState(items[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ x: 0, width: 0 });
  const [seen, setSeen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  function select(id: string) {
    setActive(id);
    const next = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.replaceState(null, "", next);
  }

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!items.some((item) => item.id === id) || id === items[0].id) return;
    setActive(id);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "nearest" });
    });
  }, [items]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const tab = list.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!tab) return;
      setBar({ x: tab.offsetLeft, width: tab.offsetWidth });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = items.findIndex((item) => item.id === active);
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % items.length
        : event.key === "ArrowLeft"
          ? (index - 1 + items.length) % items.length
          : event.key === "Home"
            ? 0
            : items.length - 1;
    const id = items[nextIndex].id;
    select(id);
    document.getElementById(`tq-tab-${id}`)?.focus();
  }

  function step(direction: -1 | 1) {
    const index = items.findIndex((item) => item.id === active);
    const next = (index + direction + items.length) % items.length;
    select(items[next].id);
  }

  return (
    <div className="flex flex-col gap-8 min-[1200px]:gap-12">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Dimensions"
        aria-orientation="horizontal"
        onKeyDown={onTabsKeyDown}
        className="relative flex scroll-mt-28 overflow-x-auto shadow-[inset_0_-4px_rgba(255,255,255,0.49)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={`tq-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={item.id}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(item.id)}
              className={`flex-[1_0_auto] cursor-pointer bg-transparent px-4 pt-1 pb-5 text-sm font-bold tracking-[0.1em] whitespace-nowrap uppercase transition-colors focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-bitmap-highlight min-[1200px]:px-8 min-[1200px]:pb-7 min-[1200px]:text-base ${
                selected ? "text-sunflower" : "text-white/50 hover:text-white/85"
              }`}
            >
              {item.name}
            </button>
          );
        })}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-1 bg-sunflower transition-[transform,width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ width: bar.width, transform: `translateX(${bar.x}px)` }}
        />
      </div>

      {items.map((item) => {
        const selected = item.id === active;
        return (
          <div
            key={item.id}
            id={item.id}
            role="tabpanel"
            aria-labelledby={`tq-tab-${item.id}`}
            hidden={!selected}
            tabIndex={selected ? 0 : undefined}
            className="grid scroll-mt-28 items-stretch gap-6 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bitmap-highlight min-[1200px]:grid-cols-[minmax(0,712fr)_minmax(0,472fr)] min-[1200px]:gap-12"
          >
            <div className="flex min-w-0 flex-col gap-8">
              <div className="flex flex-col gap-4 text-mist">
                <h3 className="text-[clamp(32px,2.78vw,40px)] leading-[1.27] font-bold tracking-[-0.02em]">
                  {item.name}
                </h3>
                <p className="text-xl leading-[1.4] font-bold tracking-[0.02em]">{item.question}</p>
                <p className="text-base leading-[1.4] tracking-[0.02em]">
                  <CodeText text={item.body} />
                </p>
              </div>
              <div className={`${tabCard} gap-2`}>
                <h4 className="text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">{signsTitle}</h4>
                <ul className="list-disc pl-6 text-base leading-[1.5] text-mist marker:text-mist/70">
                  {item.signs.map((sign) => (
                    <li key={sign} className="mt-2 first:mt-0">
                      <CodeText text={sign} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex min-h-full min-w-0 flex-col gap-6">
              <div className={`${tabCard} gap-1`}>
                <StatValue value={item.proof.value} run={seen && selected} />
                <p className="text-base leading-[1.5] text-mist">
                  {item.proof.label}{" "}
                  <GuideLink href={item.proofHref} label={caseStudyLabel} className="whitespace-nowrap" />
                </p>
              </div>
              <div className={`${tabCard} group flex-auto justify-center gap-4`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={learnIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 rotate-180 transition-transform duration-300 group-hover:rotate-[270deg] motion-reduce:transition-none motion-reduce:group-hover:rotate-180"
                />
                <h4 className="text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">{learnTitle}</h4>
                <ul className="flex flex-col gap-4">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <GuideLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-between min-[1200px]:hidden">
        <button
          type="button"
          className="grid size-12 cursor-pointer place-items-center rounded-full border-0 bg-[#697d07] text-mist transition-transform hover:bg-[#7f9410] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight active:scale-[0.98] motion-reduce:transition-none"
          aria-label="Previous dimension"
          onClick={() => step(-1)}
        >
          <Chevron />
        </button>
        <div className="flex items-center gap-3" role="group" aria-label="Dimensions">
          {items.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.name}
                aria-current={selected ? "true" : undefined}
                onClick={() => select(item.id)}
                className={`h-2 cursor-pointer rounded-full border-0 bg-[#d6d620] p-0 transition-[width,opacity] duration-300 motion-reduce:transition-none ${
                  selected ? "w-12 opacity-100" : "w-2 opacity-60 hover:opacity-100"
                }`}
              />
            );
          })}
        </div>
        <button
          type="button"
          className="grid size-12 cursor-pointer place-items-center rounded-full border-0 bg-[#697d07] text-mist transition-transform hover:bg-[#7f9410] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight active:scale-[0.98] motion-reduce:transition-none"
          aria-label="Next dimension"
          onClick={() => step(1)}
        >
          <Chevron className="scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
}
