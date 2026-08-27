"use client";

import { useState, type KeyboardEvent } from "react";
import {
  companyTeam,
  companyTeamMembers,
  companyTeamSlides,
  type CompanyMember,
} from "@/lib/company";

export function CompanyTeam() {
  const [index, setIndex] = useState(0);
  const count = companyTeamSlides.length;

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
      aria-labelledby="team-title"
    >
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="flex max-w-[720px] flex-col items-start gap-4">
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
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {companyTeam.title}
          </h2>
          <p className="text-base leading-[1.4] text-mist">{companyTeam.lede}</p>
        </header>

        <div
          className="overflow-hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="OllyGarden team members"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {companyTeamSlides.map((slide, pageIndex) => {
              const tall = companyTeamMembers[slide.tall];
              const stack = slide.stack.map((id) => companyTeamMembers[id]);
              return (
                <div
                  key={slide.tall}
                  className="grid w-full shrink-0 basis-full grid-cols-1 gap-10 min-[881px]:grid-cols-[minmax(0,454px)_minmax(0,1fr)]"
                  aria-hidden={pageIndex !== index}
                  {...(pageIndex !== index ? { inert: true } : {})}
                >
                  <MemberCard member={tall} size="tall" eager={pageIndex === 0} />
                  <div className="flex flex-col gap-10">
                    {stack.map((member) => (
                      <MemberCard key={member.name} member={member} size="med" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between" aria-label="Team pages">
          <ArrowButton label="Previous team members" onClick={() => goTo(index - 1)} />
          <div className="flex items-center gap-3" role="tablist" aria-label="Select team slide">
            {companyTeamSlides.map((slide, pageIndex) => {
              const active = pageIndex === index;
              return (
                <button
                  key={slide.tall}
                  type="button"
                  role="tab"
                  aria-label={`Go to slide ${pageIndex + 1} of ${count}`}
                  aria-selected={active}
                  onClick={() => goTo(pageIndex)}
                  className={`h-2 rounded-full bg-[#d6d620] transition-[width,opacity] ${
                    active ? "w-12 opacity-100" : "w-2 opacity-60"
                  }`}
                />
              );
            })}
          </div>
          <ArrowButton label="Next team members" onClick={() => goTo(index + 1)} flipped />
        </div>
        <p className="sr-only" aria-live="polite">
          Page {index + 1} of {count}
        </p>
      </div>
    </section>
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
  return (
    <article
      className={`flex flex-col rounded-3xl border border-bitmap-highlight/40 bg-[#0b2f16] p-8 ${
        tall ? "min-[881px]:min-h-[678px]" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.img}
        alt={`Portrait of ${member.name}`}
        width={tall ? 158 : 118}
        height={tall ? 158 : 118}
        loading={eager ? "eager" : "lazy"}
        className={`rounded-lg object-cover ${tall ? "size-[158px]" : "size-[118px]"}`}
      />
      <p className="mt-6 mb-2 text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
        {member.role}
      </p>
      <h3 className="mb-4 text-xl font-bold tracking-[-0.01em] text-mist">{member.name}</h3>
      <p className="mb-6 text-base leading-6 text-mist/75">{member.bio}</p>
      <div className="mt-auto flex gap-3">
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
      className="grid size-12 place-items-center rounded-xl border border-white/50 bg-white/20 text-mist transition-colors hover:bg-white/30"
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
