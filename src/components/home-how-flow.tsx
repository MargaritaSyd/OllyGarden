"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const PLAY_MS = 8200;

export function HomeHowFlow({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        observer.disconnect();
        setPhase("playing");
        timer = window.setTimeout(() => setPhase("done"), PLAY_MS);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  const className = [
    "hh-flow",
    phase === "playing" && "is-playing",
    phase === "done" && "is-done",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={className} role="img" aria-label={label}>
      {children}
    </div>
  );
}
