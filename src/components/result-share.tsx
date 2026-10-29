"use client";

import { useState } from "react";

/** Share links for a finished quiz or game; `onShared` receives the channel used. */
export function ResultShare({
  text,
  url,
  align = "center",
  className = "",
  onShared,
}: {
  text: string;
  url: string;
  align?: "center" | "start";
  className?: string;
  onShared: (channel: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const withUrl = `${text}\n${url}`;

  async function copy() {
    await navigator.clipboard.writeText(withUrl);
    setCopied(true);
    onShared("copy");
  }

  async function shareNatively() {
    try {
      await navigator.share({ text, url });
      onShared("native");
    } catch {
      // The visitor closed the share sheet.
    }
  }

  const links = [
    {
      channel: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      channel: "x",
      label: "X",
      href: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      channel: "bluesky",
      label: "Bluesky",
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(withUrl)}`,
    },
  ];
  const button = "rounded-xl border border-mist/30 px-5 py-2.5 font-semibold";

  return (
    <div className={className || "mt-8"}>
      <p className="text-sm font-bold tracking-[.15em] text-bitmap-mid uppercase">
        Share your result
      </p>
      <div className={`mt-4 flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {links.map((link) => (
          <a
            key={link.channel}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => onShared(link.channel)}
            className={button}
          >
            {link.label}
          </a>
        ))}
        <button type="button" onClick={copy} className={button}>
          {copied ? "Copied" : "Copy result"}
        </button>
        {"share" in navigator ? (
          <button type="button" onClick={shareNatively} className={button}>
            More…
          </button>
        ) : null}
      </div>
    </div>
  );
}
