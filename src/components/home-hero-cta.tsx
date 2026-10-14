"use client";

import type { MouseEvent } from "react";
import { GetStartedLink } from "@/components/get-started-link";
import { homeHero } from "@/lib/home";

const HOW_ID = "how";

let scrollRun = 0;
let scrollAbort: AbortController | null = null;

export function HomeHeroCta() {
  function onClick(event: MouseEvent<HTMLDivElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = document.getElementById(HOW_ID);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    event.preventDefault();
    if (window.location.hash !== `#${HOW_ID}`) {
      window.history.pushState(null, "", `#${HOW_ID}`);
    }
    scrollToSection(target);
  }

  return (
    <div className="ov-fade-up-slow [animation-delay:1.35s]" onClick={onClick}>
      <GetStartedLink
        href={homeHero.ctaHref}
        analytics={{ id: "home_hero_primary", section: "hero" }}
      >
        {homeHero.cta}
      </GetStartedLink>
    </div>
  );
}

function scrollToSection(target: HTMLElement) {
  scrollAbort?.abort();
  const run = ++scrollRun;
  const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - margin);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, top);
    return;
  }

  const start = window.scrollY;
  const distance = top - start;
  if (Math.abs(distance) < 2) {
    return;
  }

  // Long enough to see the page pass, short enough to feel like a quick jump.
  const duration = Math.min(760, Math.max(320, Math.abs(distance) / 7));
  const started = performance.now();
  const controller = new AbortController();
  scrollAbort = controller;

  function stop() {
    if (scrollRun === run) {
      scrollRun += 1;
    }
    controller.abort();
  }

  window.addEventListener("wheel", stop, { passive: true, signal: controller.signal });
  window.addEventListener("touchmove", stop, { passive: true, signal: controller.signal });

  function tick(now: number) {
    if (scrollRun !== run) {
      return;
    }

    const progress = Math.min(1, (now - started) / duration);
    const eased = 1 - (1 - progress) ** 3;
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }
    controller.abort();
  }

  requestAnimationFrame(tick);
}
