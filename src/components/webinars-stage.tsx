"use client";

import { useState, type KeyboardEvent } from "react";
import { WebinarVideoCard } from "@/components/webinar-video-card";
import { stageTalks, webinarsStage } from "@/lib/webinars";

const pageSize = webinarsStage.pageSize;

function chunkTalks() {
  const pages = [];
  for (let i = 0; i < stageTalks.length; i += pageSize) {
    pages.push(stageTalks.slice(i, i + pageSize));
  }
  return pages;
}

export function WebinarsStage() {
  const pages = chunkTalks();
  const [index, setIndex] = useState(0);
  const count = pages.length;

  function goTo(next: number) {
    setIndex((next + count) % count);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-labelledby="webinars-stage-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-10">
        <header>
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {webinarsStage.eyebrow}
          </p>
          <h2
            id="webinars-stage-title"
            className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {webinarsStage.title}
          </h2>
          <p className="mt-4 max-w-[720px] text-base leading-[1.4] text-mist">
            {webinarsStage.sub}
          </p>
        </header>

        <div
          className="overflow-hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="Conference talks"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {pages.map((page, pageIndex) => (
              <ul
                key={page[0]?.href ?? pageIndex}
                className="grid w-full shrink-0 basis-full grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3"
                aria-hidden={pageIndex !== index}
                inert={pageIndex !== index}
              >
                {page.map((talk) => (
                  <li key={talk.href}>
                    <WebinarVideoCard video={talk} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between" aria-label="Talk pages">
          <ArrowButton label="Previous videos" onClick={() => goTo(index - 1)} />
          <div className="flex items-center gap-3">
            {pages.map((page, pageIndex) => {
              const active = pageIndex === index;
              return (
                <button
                  key={page[0]?.href ?? pageIndex}
                  type="button"
                  aria-label={`Show page ${pageIndex + 1} of ${count}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => goTo(pageIndex)}
                  className={`h-2 rounded-full bg-[#d6d620] transition-[width,opacity] ${
                    active ? "w-12 opacity-100" : "w-2 opacity-60"
                  }`}
                />
              );
            })}
          </div>
          <ArrowButton label="Next videos" onClick={() => goTo(index + 1)} flipped />
        </div>
        <p className="sr-only" aria-live="polite">
          Page {index + 1} of {count}
        </p>
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  onClick,
  flipped = false,
}: {
  label: string;
  onClick: () => void;
  flipped?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-12 place-items-center rounded-full bg-olive text-mist transition-colors hover:bg-[#7a9210]"
    >
      <svg
        viewBox="0 0 48 48"
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        className={flipped ? "-scale-x-100" : undefined}
      >
        <path
          d="M23.9987 12.334L12.332 24.0007L23.9987 35.6673M12.332 24.0007H35.6654"
          stroke="currentColor"
          strokeWidth="3.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
