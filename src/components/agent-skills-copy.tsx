"use client";

import { useEffect, useState } from "react";

/** Copies one install command. The visible label is "Copy" or "Copied"; the command name stays for assistive tech. */
export function CopyCommand({ text, name }: { text: string; name: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`ml-auto inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-[5px] font-sans text-xs leading-4 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight ${
        copied
          ? "border-sunflower/60 bg-sunflower/8 text-sunflower"
          : "border-mist/16 text-mist/75 hover:border-bitmap-highlight/50 hover:text-bitmap-highlight"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2m-6 4h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" />
      </svg>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      <span className="sr-only"> the {name} command</span>
    </button>
  );
}
