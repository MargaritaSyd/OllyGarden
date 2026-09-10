"use client";

import { useEffect, useRef, useState } from "react";
import { useIsClient, usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { tulipDropin } from "@/lib/tulip";

const FULL_LINES: string[] = tulipDropin.lines.map((line) => line.text);
const EMPTY_LINES: string[] = FULL_LINES.map(() => "");

export function TulipDropin() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();
  const armed = isClient && !prefersReducedMotion;
  const [inView, setInView] = useState(false);
  const visible = prefersReducedMotion || inView;
  const [typed, setTyped] = useState<string[] | null>(null);
  const display = !armed ? FULL_LINES : (typed ?? EMPTY_LINES);
  const [cursorAt, setCursorAt] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);
  const [flashRm, setFlashRm] = useState(false);
  const [flashAdd, setFlashAdd] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setInView(true);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!armed || !visible) {
      return;
    }

    let cancelled = false;
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async function play() {
      setTyping(true);
      setFlashRm(false);
      setFlashAdd(false);
      setTyped(EMPTY_LINES);

      for (let index = 0; index < FULL_LINES.length; index++) {
        if (cancelled) {
          return;
        }

        const text = FULL_LINES[index] ?? "";
        const isImage = text.trim().startsWith("image:");
        setCursorAt(index);
        if (isImage) {
          await wait(80);
        }

        const step = Math.max(2, Math.ceil(text.length / 4));
        for (let cursor = 0; cursor < text.length; cursor += step) {
          if (cancelled) {
            return;
          }
          const next = text.slice(0, cursor + step);
          setTyped((current) =>
            (current ?? EMPTY_LINES).map((line, i) => (i === index ? next : line)),
          );
          await wait(16);
        }

        setTyped((current) =>
          (current ?? EMPTY_LINES).map((line, i) => (i === index ? text : line)),
        );
        await wait(isImage ? 60 : 18);
      }

      if (cancelled) {
        return;
      }

      setCursorAt(null);
      setTyping(false);
      setFlashRm(true);
      await wait(120);
      if (!cancelled) {
        setFlashAdd(true);
      }
    }

    void play();

    return () => {
      cancelled = true;
    };
  }, [armed, visible]);

  const classes = ["dropin", armed && "js-anim", visible && "in-view"]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="di-title"
      className={`${classes} px-6 py-16 sm:px-12 lg:px-[104px] lg:py-24`}
    >
      <div className="di-inner mx-auto max-w-[1328px]">
        <div className="di-head">
          <DropinMark />
          <p className="di-label mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {tulipDropin.eyebrow}
          </p>
          <h2
            id="di-title"
            className="mt-4 max-w-[860px] text-[clamp(2rem,3.4vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-mist"
          >
            {tulipDropin.title}
          </h2>
          <p className="di-body mt-5 max-w-[640px] text-base leading-[1.66] text-mist/75">
            {tulipDropin.body}
          </p>
        </div>

        <div className="di-codewrap relative mt-12 mb-[60px]">
          <div
            className={`di-code overflow-hidden rounded-3xl border border-white/10 bg-[#071008]${typing ? " typing" : ""}`}
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <i className="block size-2.5 rounded-full bg-[#ff5f57]" />
                <i className="block size-2.5 rounded-full bg-[#febc2e]" />
                <i className="block size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="text-sm text-mist/70">{tulipDropin.file}</span>
            </div>
            <pre
              className="di-pre overflow-x-auto p-5 font-mono text-[13px] leading-6 text-mist/80"
              tabIndex={0}
              aria-label="deployment.yaml — replace the collector image with the Tulip image"
            >
              {tulipDropin.lines.map((line, index) => (
                <span
                  key={index}
                  className={`cl${line.kind === "rm" ? " rm" : ""}${line.kind === "add" ? " add" : ""}${
                    line.kind === "rm" && flashRm ? " flash" : ""
                  }${line.kind === "add" && flashAdd ? " flash" : ""}`}
                >
                  <span className="gut">
                    {line.kind === "rm" ? "-" : line.kind === "add" ? "+" : ""}
                  </span>
                  <span className="txt">{display[index] ?? line.text}</span>
                  {cursorAt === index ? <span className="di-cursor" aria-hidden="true" /> : null}
                  {"\n"}
                </span>
              ))}
            </pre>
          </div>

          <aside className="di-tip absolute -right-8 -bottom-[60px] z-10 w-[min(494px,calc(100%+2rem))]">
            <div className="di-tip-inner surface-grain rounded-3xl border border-[#e3e270]/40 bg-[#19321e] p-8 shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
              <TipIcon />
              <p className="mt-4 text-[15px] leading-[1.5] text-mist/[0.92]">
                {tulipDropin.tip}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TipIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 69 69" fill="none" aria-hidden="true">
      <path
        d="M68.698 34.33C68.698 53.312 53.32 68.698 34.349 68.698C34.349 49.716 49.726 34.33 68.698 34.33Z"
        fill="#E3E270"
      />
      <path
        d="M0 34.33C0 53.312 15.378 68.698 34.349 68.698C34.349 49.716 18.972 34.33 0 34.33Z"
        fill="#E3E270"
      />
      <path
        d="M34.349 34.368C15.378 34.368 0 18.982 0 0h68.698C68.698 18.982 53.32 34.368 34.349 34.368Z"
        fill="#E3E270"
      />
    </svg>
  );
}

function DropinMark() {
  return (
    <svg
      className="di-mark"
      width="40"
      height="40"
      viewBox="0 0 69 69"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M68.698 34.33C68.698 53.312 53.32 68.698 34.349 68.698C34.349 49.716 49.726 34.33 68.698 34.33Z"
        fill="#9CA703"
      />
      <path
        d="M0 34.33C0 53.312 15.378 68.698 34.349 68.698C34.349 49.716 18.972 34.33 0 34.33Z"
        fill="#9CA703"
      />
      <path
        d="M34.349 34.368C15.378 34.368 0 18.982 0 0h68.698C68.698 18.982 53.32 34.368 34.349 34.368Z"
        fill="#9CA703"
      />
    </svg>
  );
}
