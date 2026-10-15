"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { InView } from "@/components/in-view";
import { useIsClient, usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { homeReality } from "@/lib/home";

const stats = homeReality.stats;

function durationFor(end: number) {
  return 1200 + Math.min(400, end / 30);
}

export function HomeRealityStats() {
  const ref = useRef<HTMLUListElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hydrated = useIsClient();
  const [values, setValues] = useState(() => stats.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!started || prefersReducedMotion) {
      return;
    }

    const durations = stats.map((stat) => durationFor(stat.end));
    const longest = Math.max(...durations);
    const startedAt = performance.now();
    let frame = 0;

    function tick(now: number) {
      const elapsed = now - startedAt;
      setValues(
        stats.map((stat, index) => {
          const progress = Math.min(1, elapsed / durations[index]);
          const eased = 1 - (1 - progress) ** 3;
          return stat.end * eased;
        }),
      );
      if (elapsed < longest) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [prefersReducedMotion, started]);

  return (
    <ul
      ref={ref}
      className="mt-8 grid grid-cols-1 gap-5 min-[901px]:mt-12 min-[901px]:grid-cols-3 sm:gap-8"
    >
      {stats.map((stat, index) => {
        const final = `${stat.end}${stat.suffix}`;
        const shown =
          prefersReducedMotion || !hydrated
            ? stat.end
            : started
              ? values[index]
              : 0;

        return (
          <InView as="li" mark="rv-in" key={final}>
            <article
              className="home-reality-card surface-grain h-full rounded-3xl border border-bitmap-highlight/40 p-6 sm:p-8"
              style={{ "--i": index } as CSSProperties}
            >
              <p
                aria-label={final}
                className="mb-3 text-[clamp(3rem,4.72vw,4.25rem)] leading-[1.28] font-bold tracking-[-0.01em] text-sunflower tabular-nums"
              >
                {Math.round(shown ?? 0)}
                {stat.suffix}
              </p>
              <p className="text-base leading-normal text-mist/75 min-[901px]:max-w-[316px]">
                {stat.body}
              </p>
            </article>
          </InView>
        );
      })}
    </ul>
  );
}
