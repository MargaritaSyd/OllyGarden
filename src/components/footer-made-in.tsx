"use client";

import { useEffect, useState } from "react";
import { madeInCountries } from "@/lib/site";

const REEL_ITEMS = [...madeInCountries, madeInCountries[0]];
const DWELL_MS = 3000;

export function FooterMadeIn() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(query.matches);
      // A mode change can cancel the slide onto the duplicate item, so fold the
      // index back into range rather than waiting for a transitionend.
      setIndex((current) => current % madeInCountries.length);
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The country keeps changing under reduced motion; only the slide is dropped.
  // Without the slide there is no transitionend to loop on, so wrap directly.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (reducedMotion) {
          return (current + 1) % madeInCountries.length;
        }

        return current >= madeInCountries.length ? current : current + 1;
      });
    }, DWELL_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (animate) {
      return;
    }

    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  const settle = (event: React.TransitionEvent<HTMLSpanElement>) => {
    if (event.propertyName !== "transform") {
      return;
    }

    if (event.target !== event.currentTarget) {
      return;
    }

    if (index >= madeInCountries.length) {
      setAnimate(false);
      setIndex(0);
    }
  };

  return (
    <p className="inline-flex items-center gap-[5px]">
      Made with ❤️ in
      <span className="block h-5 overflow-hidden" aria-hidden="true">
        <span
          className={`flex flex-col items-start will-change-transform ${
            animate && !reducedMotion
              ? "transition-transform duration-[620ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              : ""
          }`}
          style={{ transform: `translateY(${index * -20}px)` }}
          onTransitionEnd={settle}
          onTransitionCancel={settle}
        >
          {REEL_ITEMS.map((country, itemIndex) => (
            <span
              key={`${country.name}-${itemIndex}`}
              className="h-5 leading-5 whitespace-nowrap"
            >
              {country.flag} {country.name}
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only">
        {madeInCountries.map((country) => country.name).join(", ")}
      </span>
    </p>
  );
}
