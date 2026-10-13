"use client";

import { useEffect, useRef, useState } from "react";
import { useIsClient, usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type FinancialStatProps = {
  end: number;
  suffix: string;
  sep: boolean;
  prefix?: string;
};

function formatStat(value: number, sep: boolean, suffix: string, prefix = "") {
  const rounded = Math.round(value);
  const digits = sep ? rounded.toLocaleString("en-US") : String(rounded);
  return `${prefix}${digits}${suffix}`;
}

export function FinancialStat({ end, suffix, sep, prefix = "" }: FinancialStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const hydrated = useIsClient();

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
  }, [end, prefersReducedMotion]);

  useEffect(() => {
    if (!started || prefersReducedMotion) {
      return;
    }

    const duration = 1200 + Math.min(400, end / 30);
    const startedAt = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(end * eased);
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [end, prefersReducedMotion, started]);

  // Server HTML carries the final value so crawlers read the real number;
  // the browser resets it to zero until the count-up starts.
  const shown = prefersReducedMotion || !hydrated ? end : started ? value : 0;

  return (
    <div
      ref={ref}
      className="mb-[22px] text-[clamp(3rem,5vw,4.5rem)] leading-none font-bold tracking-[-0.02em] text-sunflower"
    >
      {formatStat(shown, sep, suffix, prefix)}
    </div>
  );
}
