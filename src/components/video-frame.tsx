"use client";

import { useEffect, useRef, useState } from "react";

type VideoFrameProps = {
  src?: string;
  poster?: string;
  label: string;
  variant?: "wide" | "step";
  className?: string;
};

export function VideoFrame({
  src,
  poster,
  label,
  variant = "wide",
  className = "",
}: VideoFrameProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || !src) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);
        if (visible) {
          setShouldLoad(true);
        }
      },
      { threshold: 0.2, rootMargin: "120px 0px 120px 0px" },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) {
      return;
    }

    if (reducedMotion || !inView) {
      video.pause();
      return;
    }

    void video.play().catch(() => {});
  }, [inView, reducedMotion, shouldLoad, src]);

  const frameClass =
    variant === "step"
      ? "overflow-hidden rounded-3xl border border-mist/12 bg-[#0b1a0f]"
      : "overflow-hidden rounded-[32px] border border-mist/14 bg-[#0b1a0f]";
  const mediaClass =
    variant === "step"
      ? "aspect-[4/3] w-full object-contain md:aspect-[53/30]"
      : "aspect-video w-full object-contain";

  return (
    <div ref={wrapRef} className={`${frameClass} ${className}`.trim()}>
      {src ? (
        <video
          ref={videoRef}
          className={mediaClass}
          src={shouldLoad ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload={reducedMotion ? "metadata" : "none"}
          aria-label={label}
        />
      ) : (
        <div className={mediaClass} role="img" aria-label={label} />
      )}
    </div>
  );
}
