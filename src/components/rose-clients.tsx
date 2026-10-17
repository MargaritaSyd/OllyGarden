"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type KeyboardEvent,
  type TransitionEvent,
} from "react";
import { InView } from "@/components/in-view";
import { roseClients } from "@/lib/rose";

const CAROUSEL_INTERVAL_MS = 6000;

const pagerButtonClass =
  "grid size-12 shrink-0 place-items-center rounded-full bg-olive text-mist transition-[background,transform] duration-150 hover:scale-[1.02] hover:bg-[#7f9410] active:scale-[0.98] active:bg-[#5e7006]";

export function RoseClients() {
  const quotes = roseClients.quotes;
  const count = quotes.length;
  const loopSlides =
    count > 1 ? [quotes[count - 1], ...quotes, quotes[0]] : [...quotes];

  const [index, setIndex] = useState(count > 1 ? 1 : 0);
  const [noAnim, setNoAnim] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const realIndex =
    count < 2
      ? 0
      : index === 0
        ? count - 1
        : index === count + 1
          ? 0
          : index - 1;
  const current = quotes[realIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || count < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((currentIndex) =>
        currentIndex >= count + 1 ? currentIndex : currentIndex + 1,
      );
    }, CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, count, timerKey]);

  useLayoutEffect(() => {
    if (!noAnim) {
      return;
    }

    const id = window.setTimeout(() => setNoAnim(false), 20);
    return () => window.clearTimeout(id);
  }, [noAnim]);

  if (!current) {
    return null;
  }

  function goPrev() {
    if (count < 2) {
      return;
    }
    setIndex((currentIndex) => Math.max(0, currentIndex - 1));
    setTimerKey((key) => key + 1);
  }

  function goNext() {
    if (count < 2) {
      return;
    }
    setIndex((currentIndex) => Math.min(count + 1, currentIndex + 1));
    setTimerKey((key) => key + 1);
  }

  function goToReal(page: number) {
    if (count < 2) {
      return;
    }
    setIndex(page + 1);
    setTimerKey((key) => key + 1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  }

  function onTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.propertyName !== "transform") {
      return;
    }
    if (index !== 0 && index !== count + 1) {
      return;
    }
    setNoAnim(true);
    setIndex(index === 0 ? count : 1);
  }

  return (
    <InView as="section" aria-labelledby="client-title">
      <div className="mx-auto w-full max-w-[1328px] px-5 py-[clamp(4.75rem,8vw,6rem)] sm:px-12">
        <div className="client-head ov-stagger mb-[clamp(2.5rem,5vw,4rem)]">
          <TulipMark />
          <h2
            id="client-title"
            className="mt-4 text-[clamp(2rem,3.4vw,3rem)] leading-[normal] font-bold tracking-[-0.02em] text-mist"
          >
            {roseClients.title}
          </h2>
        </div>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="overflow-hidden">
            <div
              className={`client-track ${noAnim || reduceMotion ? "is-snap" : ""}`}
              style={{ transform: `translateX(-${index * 100}%)` }}
              onTransitionEnd={onTransitionEnd}
            >
              {loopSlides.map((quote, slideIndex) => {
                const active = slideIndex === index;
                return (
                  <figure
                    key={`${quote.name}-${slideIndex}`}
                    className="client-slide grid w-full min-w-0 grid-cols-1 bg-[#011307] min-[900px]:grid-cols-[minmax(240px,398px)_minmax(0,1fr)] min-[900px]:items-stretch min-[900px]:gap-x-2"
                    aria-hidden={!active}
                    {...(!active ? { inert: true } : {})}
                  >
                    <div className="client-photo relative z-10 flex w-full max-w-[400px] flex-col justify-end min-[900px]:max-w-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={quote.image}
                        alt={quote.imageAlt}
                        width={398}
                        height={352}
                        loading={slideIndex <= 1 ? "eager" : "lazy"}
                        decoding="async"
                        className="aspect-[199/177] h-auto w-1/2 object-cover"
                      />
                      <p className="w-[66%] min-w-[200px] max-w-full bg-olive px-3 py-4 text-base font-bold whitespace-nowrap text-white">
                        {quote.name}
                      </p>
                      <p className="w-full bg-[#d6d620] px-3 py-4 text-base font-bold whitespace-nowrap text-[#394813]">
                        {quote.role}
                      </p>
                    </div>
                    <blockquote className="client-quote flex min-w-0 flex-col justify-center gap-3 px-10 py-6">
                      <QuoteMark />
                      <div className="space-y-2 text-[clamp(17px,1.39vw,20px)] leading-[1.28] text-mist">
                        {quote.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      <figcaption className="sr-only">
                        {quote.name}, {quote.role}
                      </figcaption>
                    </blockquote>
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="mt-[clamp(2.5rem,5vw,4rem)] flex items-center justify-between gap-4">
            <button
              type="button"
              className={pagerButtonClass}
              aria-label="Previous testimonial"
              onClick={goPrev}
            >
              <ArrowIcon />
            </button>
            <div className="flex items-center gap-3" role="group" aria-label="Choose testimonial">
              {quotes.map((quote, quoteIndex) => (
                <button
                  key={quote.name}
                  type="button"
                  aria-label={`Show testimonial ${quoteIndex + 1} of ${quotes.length}: ${quote.name}`}
                  aria-current={quoteIndex === realIndex ? "true" : undefined}
                  className={`h-2 rounded-full bg-[#d6d620] transition-[width,opacity,transform] duration-300 ${
                    quoteIndex === realIndex
                      ? "w-12 opacity-100"
                      : "w-2 opacity-60 hover:scale-110 hover:opacity-100"
                  }`}
                  onClick={() => goToReal(quoteIndex)}
                />
              ))}
            </div>
            <button
              type="button"
              className={pagerButtonClass}
              aria-label="Next testimonial"
              onClick={goNext}
            >
              <ArrowIcon className="-scale-x-100" />
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            Testimonial {realIndex + 1} of {count}: {current.name}, {current.role}
          </p>
        </div>
      </div>
    </InView>
  );
}

/* Figma 2371:31799 "flower - testimonials": same paths as the exported SVG. */
function TulipMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M32 15.99C32 24.832 24.837 32 16 32C16 23.157 23.163 15.99 32 15.99Z"
        fill="#9CA703"
      />
      <path
        d="M0 15.99C0 24.832 7.163 32 16 32C16 23.157 8.837 15.99 0 15.99Z"
        fill="#9CA703"
      />
      <path
        d="M16 16.009C7.163 16.009 0 8.842 0 0h32c0 8.842-7.163 16.009-16 16.009Z"
        fill="#9CA703"
      />
    </svg>
  );
}

function QuoteMark() {
  return (
    <svg
      width="31"
      height="25"
      viewBox="0 0 31 25"
      fill="currentColor"
      className="qmark text-olive"
      aria-hidden="true"
    >
      <path d="M28.842 0v5.148h-2.952c-2.322 0-3.482 1.16-3.482 3.482v2.422h1.287c2.019 0 3.684.606 4.996 1.817 1.363 1.211 2.044 2.75 2.044 4.618 0 2.019-.681 3.659-2.044 4.92-1.312 1.262-2.977 1.893-4.996 1.893-2.069 0-3.76-.631-5.072-1.893C16.31 21.095 15.654 19.354 15.654 17.184V8.479C15.654 2.826 18.48 0 24.133 0h4.709ZM12.188 0v5.148H9.236c-2.322 0-3.482 1.16-3.482 3.482v2.422h1.287c2.019 0 3.684.606 4.996 1.817 1.363 1.211 2.044 2.75 2.044 4.618 0 2.019-.681 3.659-2.044 4.92-1.312 1.262-2.977 1.893-4.996 1.893-2.069 0-3.76-.631-5.072-1.893C.656 21.095 0 19.354 0 17.184V8.479C0 2.826 2.826 0 8.479 0h3.709Z" />
    </svg>
  );
}

/* Arrow path from the Figma lucide/arrow-left export (2371:31818); the button draws the circle. */
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`size-full ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 12.3333L12.3333 24L24 35.6667M12.3333 24H35.6667"
        stroke="currentColor"
        strokeWidth="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
