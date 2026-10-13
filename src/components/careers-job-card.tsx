"use client";

import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";
import { CareersApplyCta } from "@/components/careers-apply-cta";
import { CareersCard } from "@/components/careers-card";
import { careersPositionUi, type CareersPosition } from "@/lib/careers";

export function CareersJobCard({
  position,
  style,
}: {
  position: CareersPosition;
  style?: CSSProperties;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <CareersCard
      className="rv max-[767px]:rounded-2xl max-[767px]:p-5"
      hover="tint"
      style={style}
    >
      <div className="flex flex-col">
        <div className="grid items-center gap-x-8 gap-y-5 [grid-template-areas:'headings_cta'_'summary_summary'] [grid-template-columns:minmax(0,1fr)_auto] max-[1023px]:gap-y-4 max-[1023px]:[grid-template-areas:'headings'_'summary'_'cta'] max-[1023px]:[grid-template-columns:minmax(0,1fr)]">
          <div className="min-w-0 [grid-area:headings]">
            <h3 className="text-2xl leading-[1.29] font-bold tracking-[-0.01em] text-mist max-[767px]:text-[clamp(1.125rem,5.2vw,1.375rem)]">
              {position.title}
            </h3>
            <ul className="mt-3 flex list-none flex-wrap items-center gap-3 p-0 text-[12px] leading-[1.34] font-normal tracking-[0.08em] text-[#b3bbae] uppercase">
              <li>{position.location}</li>
              <li className="flex items-center gap-3">
                <span
                  className="size-1 shrink-0 rotate-45 bg-[#b3bbae] opacity-70"
                  aria-hidden="true"
                />
                {position.time}
              </li>
            </ul>
          </div>
          <div className="justify-self-end max-[1023px]:justify-self-start [grid-area:cta]">
            <CareersApplyCta
              label={careersPositionUi.applyLabel}
              jobId={position.id}
              jobTitle={position.title}
            />
          </div>
          <p className="max-w-[900px] text-base leading-[1.5] tracking-[0.02em] text-mist max-[767px]:text-[15px] [grid-area:summary]">
            {position.description}
          </p>
        </div>

        <div
          className={`grid transition-[grid-template-rows] motion-reduce:transition-none ${
            expanded
              ? "grid-rows-[1fr] duration-[220ms] ease-out"
              : "grid-rows-[0fr] duration-200 ease-in"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              id={detailsId}
              className={`transition-[opacity,transform,visibility] motion-reduce:transform-none motion-reduce:transition-[opacity,visibility] ${
                expanded
                  ? "visible translate-y-0 opacity-100 delay-[120ms] duration-200 ease-out motion-reduce:delay-0"
                  : "invisible translate-y-2 opacity-0 duration-200 ease-in"
              }`}
            >
              <div
                className="mt-5 -mx-8 border-t border-[#5e6e35] max-[767px]:-mx-5"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-6 pt-6">
                <JobSection
                  title={careersPositionUi.lookingForTitle}
                  items={position.lookingFor}
                />
                <JobSection
                  title={careersPositionUi.youWillDoTitle}
                  items={position.youWillDo}
                />
                <JobSection
                  title={careersPositionUi.bonusPointsTitle}
                  items={position.bonusPoints}
                  highlight
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="group/toggle mt-5 inline-flex items-center gap-2 self-start text-base leading-[1.5] font-medium text-sunflower transition-colors duration-200 ease-out hover:underline hover:underline-offset-[3px] max-[767px]:mt-3 max-[767px]:min-h-11 max-[767px]:py-2"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded
            ? careersPositionUi.collapseLabel
            : careersPositionUi.expandLabel}
          <ChevronIcon expanded={expanded} />
        </button>
        <Link
          href={position.href}
          className="mt-2 inline-flex self-start text-sm font-semibold text-mist/70 hover:text-sunflower"
        >
          Read the full role →
        </Link>
      </div>
    </CareersCard>
  );
}

function JobSection({
  title,
  items,
  highlight = false,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div>
      <h4
        className={`mb-2 text-xl leading-[1.3] font-bold tracking-[-0.01em] max-[767px]:text-lg ${
          highlight ? "flex items-center gap-2 text-sunflower" : "text-mist"
        }`}
      >
        {highlight ? <BonusStar /> : null}
        {title}
      </h4>
      <ul className="m-0 list-disc space-y-1 py-0 pl-[22px] text-base leading-[1.5] tracking-[0.02em] text-mist/85 marker:text-mist/50 max-[767px]:text-[15px]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`block shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none motion-safe:group-hover/toggle:translate-y-0.5 motion-reduce:group-hover/toggle:translate-y-0 ${
        expanded ? "rotate-180" : ""
      }`}
    >
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BonusStar() {
  return (
    <svg
      className="block shrink-0"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.48517 12.0618C4.11378 12.8111 1.88054 14.1211 1.39876e-06 16C1.88054 17.8805 4.11216 19.1906 6.48517 19.9382C5.33605 22.1455 4.68753 24.6534 4.68753 27.3125C7.34824 27.3125 9.85453 26.6623 12.0618 25.5148C12.8111 27.8862 14.1211 30.1195 16 32C17.8805 30.1195 19.1906 27.8878 19.9382 25.5148C22.1455 26.664 24.6534 27.3125 27.3125 27.3125C27.3125 24.6518 26.6623 22.1455 25.5148 19.9382C27.8862 19.1889 30.1195 17.8789 32 16C30.1195 14.1195 27.8879 12.8094 25.5148 12.0618C26.664 9.85453 27.3125 7.34661 27.3125 4.68752C24.6518 4.68752 22.1455 5.33767 19.9382 6.48517C19.189 4.11378 17.8789 1.88054 16 -1.39876e-06C14.1195 1.88054 12.8094 4.11215 12.0618 6.48517C9.85454 5.33604 7.34662 4.68752 4.68753 4.68752C4.68753 7.34823 5.33767 9.85453 6.48517 12.0618Z"
        fill="#D1D100"
      />
    </svg>
  );
}
