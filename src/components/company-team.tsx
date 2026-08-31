"use client";

import {
  useLayoutEffect,
  useState,
  type KeyboardEvent,
  type TransitionEvent,
} from "react";
import { InView } from "@/components/in-view";
import {
  companyTeam,
  companyTeamMembers,
  companyTeamSlides,
  type CompanyMember,
} from "@/lib/company";

const count = companyTeamSlides.length;
const loopSlides = [
  companyTeamSlides[count - 1],
  ...companyTeamSlides,
  companyTeamSlides[0],
];

const rightPixels = [
  { className: "top-0 left-0 bg-bitmap-shadow" },
  { className: "top-0 left-[204px] bg-[#46600f]" },
  { className: "top-[68px] left-[68px] bg-[#2c4108]" },
  { className: "top-[68px] left-[136px] bg-[#46600f]" },
  { className: "top-[68px] left-[272px] bg-bitmap-shadow" },
  { className: "top-0 left-[340px] bg-bitmap-shadow" },
  { className: "top-[136px] left-[340px] bg-[#46600f]" },
] as const;

const leftPixels = [
  { className: "top-0 left-0 bg-[#46600f]" },
  { className: "top-[68px] left-[68px] bg-bitmap-shadow" },
  { className: "top-[136px] left-0 bg-[#46600f]" },
  { className: "top-[136px] left-[68px] bg-[#2c4108]" },
  { className: "top-[204px] left-[68px] bg-[#46600f]" },
  { className: "top-[272px] left-0 bg-bitmap-shadow" },
] as const;

export function CompanyTeam() {
  const [index, setIndex] = useState(1);
  const [noAnim, setNoAnim] = useState(false);

  const realIndex =
    index === 0 ? count - 1 : index === count + 1 ? 0 : index - 1;

  function goPrev() {
    if (noAnim) return;
    setIndex((current) => Math.max(0, current - 1));
  }

  function goNext() {
    if (noAnim) return;
    setIndex((current) => Math.min(count + 1, current + 1));
  }

  function goToReal(page: number) {
    if (noAnim) return;
    setIndex(page + 1);
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
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;
    if (index !== 0 && index !== count + 1) return;
    setNoAnim(true);
    setIndex(index === 0 ? count : 1);
  }

  useLayoutEffect(() => {
    if (!noAnim) return;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setNoAnim(false);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [noAnim]);

  return (
    <InView
      as="section"
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(3.5rem,6.7vw,6rem)] max-[767px]:px-6 max-[767px]:py-14"
      aria-labelledby="team-title"
    >
      <div
        className="tm-sq pointer-events-none absolute top-0 right-0 z-0 h-[204px] w-[408px] origin-top-right max-[767px]:scale-[0.6]"
        aria-hidden="true"
      >
        {rightPixels.map((pixel) => (
          <div
            key={pixel.className}
            className={`ipx absolute size-[68px] opacity-30 ${pixel.className}`}
          />
        ))}
      </div>
      <div
        className="tm-sq pointer-events-none absolute top-[clamp(360px,34vw,470px)] left-0 z-0 h-[340px] w-[136px] max-[767px]:hidden"
        aria-hidden="true"
      >
        {leftPixels.map((pixel) => (
          <div
            key={pixel.className}
            className={`ipx absolute size-[68px] opacity-30 ${pixel.className}`}
          />
        ))}
      </div>

      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="team-head flex flex-col items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/company/ic-mission.svg"
            alt=""
            width={32}
            height={32}
            className="block h-8 w-8"
          />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {companyTeam.eyebrow}
          </p>
          <h2
            id="team-title"
            className="text-[clamp(2rem,3.34vw,3rem)] leading-[1.1] font-bold tracking-[-0.02em] text-mist"
          >
            {companyTeam.title}
          </h2>
          <p className="mt-1 max-w-[474px] text-base leading-[1.4] tracking-[0.02em] text-mist">
            {companyTeam.lede}
          </p>
        </header>

        <div
          className="tm-viewport w-full [container-type:inline-size] focus-visible:rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-bitmap-highlight"
          role="group"
          aria-roledescription="carousel"
          aria-label="OllyGarden team members"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className={`flex w-max will-change-transform [--tm-gap:1.5rem] max-xl:[--tm-slide:100cqw] lg:[--tm-gap:2rem] xl:[--tm-gap:2.5rem] xl:[--tm-slide:1175px] motion-reduce:transition-none ${
              noAnim
                ? "transition-none"
                : "transition-transform duration-[550ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            }`}
            style={{
              transform: `translateX(calc(-1 * ${index} * (var(--tm-slide) + var(--tm-gap))))`,
              gap: "var(--tm-gap)",
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {loopSlides.map((slide, pageIndex) => {
              const tall = companyTeamMembers[slide.tall];
              const stack = slide.stack.map((id) => companyTeamMembers[id]);
              const active = pageIndex === index;
              return (
                <div
                  key={`${slide.tall}-${pageIndex}`}
                  className={`flex w-[var(--tm-slide)] flex-none flex-col gap-6 transition-opacity duration-[400ms] lg:flex-row lg:gap-8 xl:gap-10 ${
                    active ? "opacity-100" : "opacity-50"
                  }`}
                  aria-hidden={!active}
                  {...(!active ? { inert: true } : {})}
                >
                  <div className="flex w-full lg:w-[40%] lg:flex-none xl:w-[454px]">
                    <MemberCard
                      member={tall}
                      size="tall"
                      eager={pageIndex <= 1}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-6 lg:flex-1 lg:gap-8 xl:w-[681px] xl:flex-none xl:gap-10">
                    {stack.map((member) => (
                      <MemberCard
                        key={member.name}
                        member={member}
                        size="med"
                        eager={pageIndex <= 1}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="tm-tagline flex min-h-[54px] items-center justify-center overflow-hidden rounded-2xl border border-bitmap-highlight/40 bg-[rgba(0,40,14,0.6)] bg-[url('/images/texture-grain.png')] bg-repeat px-6 py-3 text-center text-base leading-[1.4] tracking-[0.02em] text-[#c9cb65] shadow-[inset_0_1px_rgba(255,255,255,0.05)] [background-size:328px_140px] max-[767px]:text-sm">
          {companyTeam.tagline}
        </div>

        <div
          className="tm-controls mt-2 grid grid-cols-[1fr_auto_1fr] items-center"
          aria-label="Team pages"
        >
          <ArrowButton label="Previous team members" onClick={goPrev} />
          <div
            className="flex items-center gap-2.5"
            role="tablist"
            aria-label="Select team slide"
          >
            {companyTeamSlides.map((slide, pageIndex) => {
              const active = pageIndex === realIndex;
              return (
                <button
                  key={slide.tall}
                  type="button"
                  role="tab"
                  aria-label={`Go to slide ${pageIndex + 1} of ${count}`}
                  aria-selected={active}
                  onClick={() => goToReal(pageIndex)}
                  className={`h-2 rounded-full bg-[#d6d620] transition-[width,opacity] ${
                    active ? "w-12 opacity-100" : "w-2 opacity-60 hover:opacity-100"
                  }`}
                />
              );
            })}
          </div>
          <ArrowButton
            label="Next team members"
            onClick={goNext}
            flipped
            className="justify-self-end"
          />
        </div>
        <p className="sr-only" aria-live="polite">
          Page {realIndex + 1} of {count}
        </p>
      </div>
    </InView>
  );
}

function MemberCard({
  member,
  size,
  eager = false,
}: {
  member: CompanyMember;
  size: "tall" | "med";
  eager?: boolean;
}) {
  const tall = size === "tall";
  const socials = (
    <div className={`flex gap-3 ${tall ? "mt-auto" : "order-3 mt-1"}`}>
      <SocialLink
        href={member.linkedin}
        label={`Open LinkedIn profile for ${member.name}`}
        kind="linkedin"
      />
      {member.github ? (
        <SocialLink
          href={member.github}
          label={`Open GitHub profile for ${member.name}`}
          kind="github"
        />
      ) : null}
    </div>
  );

  return (
    <article
      className={`flex flex-1 flex-col rounded-3xl border border-bitmap-highlight/40 bg-[#0b2f16] bg-repeat p-8 [background-image:linear-gradient(rgba(1,30,12,0.5),rgba(1,30,12,0.5)),url('/images/texture-grain.png')] [background-size:auto,328px_140px] transition-[transform,box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-[3px] hover:border-bitmap-highlight/70 hover:shadow-[0_18px_40px_rgba(0,0,0,0.4),0_0_26px_rgba(214,214,32,0.14)] motion-reduce:hover:translate-y-0 max-[767px]:px-5 max-[767px]:py-6 ${
        tall ? "xl:min-h-[678px]" : ""
      }`}
    >
      {tall ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.img}
            alt={`Portrait of ${member.name}`}
            width={158}
            height={158}
            loading={eager ? "eager" : "lazy"}
            className="mb-6 size-[158px] rounded-lg bg-[#1b2b1f] object-cover max-[767px]:size-[120px]"
          />
          <p className="mb-2 text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {member.role}
          </p>
          <h3 className="mb-4 text-xl font-bold tracking-[-0.01em] text-mist">
            {member.name}
          </h3>
          <p className="mb-6 text-base leading-[1.5] text-mist/75">{member.bio}</p>
          {socials}
        </>
      ) : (
        <>
          <div className="mb-4 flex items-start gap-5 max-[767px]:gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.img}
              alt={`Portrait of ${member.name}`}
              width={118}
              height={118}
              loading={eager ? "eager" : "lazy"}
              className="size-[118px] shrink-0 rounded-lg bg-[#1b2b1f] object-cover max-[767px]:size-24"
            />
            <div className="flex flex-col gap-2 pt-1">
              <h3 className="order-1 text-xl font-bold tracking-[-0.01em] text-mist">
                {member.name}
              </h3>
              <p className="order-2 text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
                {member.role}
              </p>
              {socials}
            </div>
          </div>
          <p className="text-base leading-[1.5] text-mist/75">{member.bio}</p>
        </>
      )}
    </article>
  );
}

function SocialLink({
  href,
  label,
  kind,
}: {
  href: string;
  label: string;
  kind: "linkedin" | "github";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-12 items-center justify-center rounded-xl border border-white/50 bg-white/20 text-mist transition-[background,border-color,transform] duration-200 hover:-translate-y-px hover:border-white/70 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight"
    >
      {kind === "linkedin" ? <LinkedInIcon /> : <GitHubIcon />}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="13 13 22 22" fill="none" aria-hidden="true">
      <path
        d="M20 23V28M20 20V20.01M24 28V23M28 28V25C28 24.4696 27.7893 23.9609 27.4142 23.5858C27.0391 23.2107 26.5304 23 26 23C25.4696 23 24.9609 23.2107 24.5858 23.5858C24.2107 23.9609 24 24.4696 24 25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 19C15 17.9391 15.4214 16.9217 16.1716 16.1716C16.9217 15.4214 17.9391 15 19 15H29C30.0609 15 31.0783 15.4214 31.8284 16.1716C32.5786 16.9217 33 17.9391 33 19V29C33 30.0609 32.5786 31.0783 31.8284 31.8284C31.0783 32.5786 30.0609 33 29 33H19C17.9391 33 16.9217 32.5786 16.1716 31.8284C15.4214 31.0783 15 30.0609 15 29V19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="24" height="24" viewBox="13 13 22 22" fill="none" aria-hidden="true">
      <path
        d="M24 14C22.6868 14 21.3864 14.2587 20.1732 14.7612C18.9599 15.2638 17.8575 16.0003 16.9289 16.9289C15.0536 18.8043 14 21.3478 14 24C14 28.42 16.87 32.17 20.84 33.5C21.34 33.58 21.5 33.27 21.5 33V31.31C18.73 31.91 18.14 29.97 18.14 29.97C17.68 28.81 17.03 28.5 17.03 28.5C16.12 27.88 17.1 27.9 17.1 27.9C18.1 27.97 18.63 28.93 18.63 28.93C19.5 30.45 20.97 30 21.54 29.76C21.63 29.11 21.89 28.67 22.17 28.42C19.95 28.17 17.62 27.31 17.62 23.5C17.62 22.39 18 21.5 18.65 20.79C18.55 20.54 18.2 19.5 18.75 18.15C18.75 18.15 19.59 17.88 21.5 19.17C22.29 18.95 23.15 18.84 24 18.84C24.85 18.84 25.71 18.95 26.5 19.17C28.41 17.88 29.25 18.15 29.25 18.15C29.8 19.5 29.45 20.54 29.35 20.79C30 21.5 30.38 22.39 30.38 23.5C30.38 27.32 28.04 28.16 25.81 28.41C26.17 28.72 26.5 29.33 26.5 30.26V33C26.5 33.27 26.66 33.59 27.17 33.5C31.14 32.16 34 28.42 34 24C34 22.6868 33.7413 21.3864 33.2388 20.1732C32.7362 18.9599 31.9997 17.8575 31.0711 16.9289C30.1425 16.0003 29.0401 15.2638 27.8268 14.7612C26.6136 14.2587 25.3132 14 24 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowButton({
  label,
  onClick,
  flipped = false,
  className,
}: {
  label: string;
  onClick: () => void;
  flipped?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex size-12 items-center justify-center rounded-full bg-olive text-mist transition-[background,transform] duration-200 hover:bg-[#7f9511] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight active:bg-[#5e7106] ${className ?? ""}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={flipped ? "-scale-x-100" : undefined}
      >
        <path
          d="M15 5l-7 7 7 7"
          stroke="#FAF9F0"
          strokeWidth="3.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
