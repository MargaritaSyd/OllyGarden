"use client";

import { useState, type KeyboardEvent } from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { WebinarVideoCard } from "@/components/webinar-video-card";
import { communityWebinars } from "@/lib/community";
import { registerFirstTitle } from "@/lib/trademarks";

const pageSize = communityWebinars.pageSize;

function chunkVideos() {
  const videos = registerFirstTitle(communityWebinars.videos);
  const pages = [];
  for (let i = 0; i < videos.length; i += pageSize) {
    pages.push(videos.slice(i, i + pageSize));
  }
  return pages;
}

export function CommunityWebinars() {
  const { eyebrow, title, sub, cta, youtubeHref } = communityWebinars;
  const pages = chunkVideos();
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
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4rem,6.5vw,6rem)] max-[880px]:px-6"
      aria-labelledby="community-webinars-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-10">
        <div className="flex flex-col gap-6 min-[881px]:flex-row min-[881px]:items-end min-[881px]:justify-between">
          <div className="max-w-[720px]">
            <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
              {eyebrow}
            </p>
            <h2
              id="community-webinars-title"
              className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
            >
              {title}
            </h2>
            <p className="mt-4 text-base leading-[1.4] text-mist">{sub}</p>
          </div>
          <a
            href={youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 w-full max-w-[340px] shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-mist px-[30px] text-base font-semibold text-forest transition-colors hover:bg-sunflower sm:w-auto"
          >
            {cta}
            <CtaArrow />
          </a>
        </div>

        <div
          className="overflow-hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="OllyGarden Webinars"
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
                aria-label={`OllyGarden Webinars, ${pageIndex + 1} of ${count}`}
                aria-hidden={pageIndex !== index}
                inert={pageIndex !== index}
              >
                {page.map((video) => (
                  <li key={video.href} className="h-full">
                    <WebinarVideoCard
                      video={{
                        date: video.date,
                        title: video.title,
                        href: video.href,
                        image: video.image,
                        alt: video.alt,
                        venue: "YouTube",
                      }}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {count > 1 ? (
          <>
            <div className="flex items-center justify-between" aria-label="Video pages">
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
          </>
        ) : null}
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
