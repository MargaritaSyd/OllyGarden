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
  const frameClass =
    variant === "step"
      ? "overflow-hidden rounded-3xl border border-mist/12 bg-[#0b1a0f]"
      : "overflow-hidden rounded-[32px] border border-mist/14 bg-[#0b1a0f]";
  const mediaClass =
    variant === "step"
      ? "aspect-[4/3] w-full object-contain md:aspect-[53/30]"
      : "aspect-video w-full object-contain";

  return (
    <div className={`${frameClass} ${className}`.trim()}>
      {src ? (
        <video
          className={mediaClass}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={label}
        />
      ) : (
        <div className={mediaClass} role="img" aria-label={label} />
      )}
    </div>
  );
}
