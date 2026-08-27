"use client";

import { useId, useState } from "react";
import { insightsScore } from "@/lib/insights";

export function InsightsScore() {
  const [open, setOpen] = useState(true);
  const detailsId = useId();
  const label = open ? insightsScore.hide : insightsScore.show;

  return (
    <div className="relative mx-auto w-full max-w-[48rem] aspect-[736/623] lg:mx-0">
      <div className="absolute top-0 left-0 z-0 h-[62%] w-[56%]">
        <section
          className="surface-grain flex size-full flex-col overflow-hidden rounded-3xl border border-[#e3e270]/40 bg-[#19321e]/90 shadow-[inset_0_1px_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.35)]"
          aria-label="Instrumentation Score summary"
        >
          <div className="flex items-center justify-between gap-4 px-6 pt-6">
            <h2 className="text-base font-bold tracking-[0.01em] text-mist">
              {insightsScore.title}
            </h2>
            <ToggleButton
              open={open}
              label={label}
              controls={detailsId}
              onToggle={() => setOpen((value) => !value)}
            />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center pb-6">
            <p className="text-[clamp(4.5rem,10vw,6.5rem)] leading-none font-bold tracking-[-0.04em] text-bitmap-highlight">
              {insightsScore.value}
            </p>
            <p className="mt-2 text-xl font-semibold text-bitmap-highlight">
              {insightsScore.verdict}
            </p>
          </div>
        </section>
      </div>

      {open ? (
        <div className="absolute top-[38%] left-[42%] z-10 h-[62%] w-[58%]">
          <section
            id={detailsId}
            className="surface-grain flex size-full flex-col overflow-hidden rounded-3xl border border-[#e3e270]/40 bg-[#19321e]/90 shadow-[inset_0_1px_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.35)]"
            aria-label="Instrumentation Score details"
          >
            <div className="flex items-center justify-between gap-4 px-6 pt-6">
              <h2 className="flex items-baseline gap-2.5 text-base font-bold tracking-[0.01em] text-mist">
                {insightsScore.title}
                <span className="text-lg font-bold text-bitmap-highlight">
                  {insightsScore.value}
                </span>
              </h2>
              <ToggleButton
                open={open}
                label={label}
                controls={detailsId}
                onToggle={() => setOpen((value) => !value)}
              />
            </div>
            <ul className="flex min-h-0 flex-1 flex-col justify-center gap-2.5 px-5 pb-5">
              {insightsScore.findings.map((finding) => (
                <li
                  key={finding.name}
                  className="rounded-[14px] border border-[#384038] bg-[#212421] px-3.5 py-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[13.5px] leading-snug font-semibold text-mist">
                      {finding.name}
                    </span>
                    <span className="shrink-0 text-sm text-mist/55">{finding.delta}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.06em] uppercase ${
                        finding.severity === "Critical"
                          ? "bg-[#d33f3f] text-white"
                          : "bg-[#e3b23c] text-[#2a1d05]"
                      }`}
                    >
                      {finding.severity}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.06em] text-mist/80 uppercase">
                      {finding.kind}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function ToggleButton({
  open,
  label,
  controls,
  onToggle,
}: {
  open: boolean;
  label: string;
  controls: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className="inline-flex h-[29px] shrink-0 items-center gap-2 rounded-full border border-white/55 px-3.5 text-[12px] font-semibold text-white/85 transition-colors hover:border-white/85 hover:text-white"
    >
      {label}
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
        <path
          d="M1 1l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
