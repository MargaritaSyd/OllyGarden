type VideoFrameProps = {
  src?: string;
  poster?: string;
  label: string;
  variant?: "wide" | "step";
};

export function VideoFrame({
  src,
  poster,
  label,
  variant = "wide",
}: VideoFrameProps) {
  const frameClass =
    variant === "step"
      ? "overflow-hidden rounded-3xl border border-mist/12 bg-[#0b1a0f]"
      : "overflow-hidden rounded-[32px] border border-mist/14 bg-[#0b1a0f]";
  const mediaClass =
    variant === "step" ? "aspect-[53/30] w-full object-contain" : "aspect-video w-full object-contain";

  return (
    <div className={frameClass}>
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
