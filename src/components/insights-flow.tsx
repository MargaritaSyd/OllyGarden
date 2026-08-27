"use client";

import { useState, type ReactNode } from "react";
import { insightsHow } from "@/lib/insights";

export function InsightsFlow() {
  const [play, setPlay] = useState(0);

  return (
    <div className="mt-14">
      <div key={play} className="insights-flow mx-auto w-full max-w-[1232px]">
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-stretch lg:gap-4">
          <FlowGroup label={insightsHow.infra} icon="stack" wide>
            <FlowCard icon="layers" label={insightsHow.apps} delay="0.05s" />
            <FlowArrow />
            <FlowCard icon="cube" label={insightsHow.collector} delay="0.18s" />
          </FlowGroup>
          <FlowArrow className="hidden self-center lg:flex" />
          <FlowGroup label={insightsHow.destinations} icon="send">
            <FlowCard icon="chart" label={insightsHow.backends} delay="0.32s" />
          </FlowGroup>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <p className="insights-flow-item text-[11px] font-bold tracking-[0.16em] text-bitmap-mid uppercase" style={{ animationDelay: "0.4s" }}>
            {insightsHow.bridge}
          </p>
          <span className="insights-flow-item my-2 text-bitmap-mid" style={{ animationDelay: "0.48s" }} aria-hidden="true">
            <DownArrow />
          </span>
        </div>

        <div
          className="insights-flow-item rounded-[28px] border border-[#d9e533]/45 bg-[#07150c] p-4 shadow-[0_0_48px_rgba(217,229,51,0.08)] sm:p-6"
          style={{ animationDelay: "0.56s" }}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] text-bitmap-mid uppercase">
              <PulseIcon />
              {insightsHow.engine}
            </p>
            <span className="rounded-full border border-[#d9e533]/40 px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-bitmap-highlight uppercase">
              {insightsHow.status}
            </span>
          </div>
          <div className="grid items-center gap-4 lg:grid-cols-[180px_auto_minmax(0,1fr)_auto_180px] lg:gap-6">
            <FlowCard icon="cube" label={insightsHow.ingestion} engine />
            <FlowArrow className="hidden justify-self-center lg:flex" />
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-bold tracking-[0.12em] text-bitmap-mid uppercase">
                  {insightsHow.rulesLabel}
                </p>
                <p className="text-[11px] font-bold tracking-[0.12em] text-bitmap-highlight uppercase">
                  {insightsHow.repairing}
                </p>
              </div>
              <ul className="space-y-2">
                {insightsHow.rules.map((rule, index) => (
                  <li
                    key={rule}
                    className="insights-flow-item flex items-center gap-3 rounded-full border border-[#d9e533]/18 bg-[#0d2414] px-4 py-2.5 text-[13.5px] text-mist"
                    style={{ animationDelay: `${0.7 + index * 0.08}s` }}
                  >
                    <ShieldIcon />
                    {rule}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-[12px] text-mist/55">
                {insightsHow.moreRules}
              </p>
            </div>
            <FlowArrow className="hidden justify-self-center lg:flex" />
            <FlowCard icon="bulb" label={insightsHow.insights} engine />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-sm font-semibold text-bitmap-highlight underline decoration-bitmap-highlight/40 underline-offset-4 hover:decoration-bitmap-highlight"
          onClick={() => setPlay((value) => value + 1)}
        >
          {insightsHow.replay}
        </button>
        <p className="mx-auto mt-8 max-w-[640px] text-[15px] leading-[1.6] text-bitmap-mid">
          {insightsHow.caption}
        </p>
      </div>
    </div>
  );
}

function FlowGroup({
  label,
  icon,
  children,
  wide = false,
}: {
  label: string;
  icon: "stack" | "send";
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`insights-flow-item relative flex min-h-[230px] items-center justify-center rounded-[20px] px-6 pt-14 pb-6 ${
        wide ? "flex-1" : "w-full lg:w-[240px] lg:shrink-0"
      }`}
      style={{ animationDelay: "0.08s" }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[20px] border-[1.5px] border-dashed border-[#34520b]/80"
        aria-hidden="true"
      />
      <p className="absolute top-6 left-6 mb-0 flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] text-bitmap-olive uppercase">
        {icon === "stack" ? <StackIcon /> : <SendIcon />}
        {label}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">{children}</div>
    </div>
  );
}

function FlowCard({
  icon,
  label,
  engine = false,
  delay,
}: {
  icon: "layers" | "cube" | "chart" | "bulb";
  label: string;
  engine?: boolean;
  delay?: string;
}) {
  return (
    <div
      className={`insights-flow-item flex h-[150px] w-[180px] flex-col items-center justify-center rounded-2xl border bg-[#0c2317] ${
        engine ? "border-[#e3e270] shadow-[0_0_24px_rgba(227,226,112,0.12)]" : "border-[#34520b]/80"
      }`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <span className="grid size-12 place-items-center rounded-xl border border-[#34520b]/80 bg-[#e3e270]/8 text-bitmap-highlight">
        {icon === "layers" ? <LayersIcon /> : null}
        {icon === "cube" ? <CubeIcon /> : null}
        {icon === "chart" ? <ChartIcon /> : null}
        {icon === "bulb" ? <BulbIcon /> : null}
      </span>
      <span className={`mt-3 text-center text-sm font-medium ${engine ? "text-bitmap-highlight" : "text-mist"}`}>
        {label}
      </span>
    </div>
  );
}

function FlowArrow({ className = "" }: { className?: string }) {
  return (
    <span className={`flex text-bitmap-mid ${className}`} aria-hidden="true">
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
        <path
          d="M1 8h18M13 2l7 6-7 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function DownArrow() {
  return (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
      <path
        d="M8 1v18M2 13l6 7 6-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="shrink-0 text-bitmap-highlight" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5 13 3v4.2c0 2.8-1.9 4.9-5 5.8-3.1-.9-5-3-5-5.8V3l5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8h3l2-4 3 8 2-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 3.5 7 1l6 2.5L7 6 1 3.5ZM1 7l6 2.5L13 7M1 10.5 7 13l6-2.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7 13 1 8 13 6.2 7.8 1 7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M3 9.5 14 4l11 5.5L14 15 3 9.5ZM3 14l11 5.5L25 14M3 18.5 14 24l11-5.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 3 25 9v10L14 25 3 19V9L14 3Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 25V13M3 9l11 4 11-4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M5 23V14M12 23V8M19 23v-7M24 23H4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 4a7 7 0 0 0-4.2 12.6c.5.4.8 1 .9 1.6V20h6.6v-1.8c.1-.6.4-1.2.9-1.6A7 7 0 0 0 14 4ZM11.6 21.6v1.4h4.8v-1.4h-4.8Zm.8 2.6v1.4h3.2v-1.4h-3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
