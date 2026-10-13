import { InView } from "@/components/in-view";
import { VideoFrame } from "@/components/video-frame";
import { roseAction } from "@/lib/rose";

export function RoseAction() {
  return (
    <InView
      as="section"
      aria-labelledby="action-title"
      className="relative overflow-hidden"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1328px] px-5 py-[clamp(3.5rem,6.7vw,6rem)] sm:px-12">
        <div className="ov-stagger mb-12 flex max-w-[640px] flex-col items-start gap-4">
          <ActionMark />
          <p className="text-base leading-[normal] font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {roseAction.eyebrow}
          </p>
          <h2
            id="action-title"
            className="max-w-[593px] text-[clamp(2rem,3.4vw,3rem)] leading-[normal] font-bold tracking-[-0.02em] text-mist"
          >
            {roseAction.title}
          </h2>
          <p className="max-w-[516px] text-base leading-[1.4] tracking-[0.02em] text-mist">
            {roseAction.sub}
          </p>
        </div>
        <VideoFrame
          className="action-video rounded-[40px]! border-0"
          src={roseAction.video.src}
          label={roseAction.video.label}
        />
      </div>
    </InView>
  );
}

/** Figma 2371:31733 — tulip glyph, same fill as the eyebrow. */
function ActionMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      className="text-bitmap-mid"
      aria-hidden="true"
    >
      <path d="M32 0C27.072 0 22.664 2.346 19.729 5.837A16.6 16.6 0 0 0 16 0a16.6 16.6 0 0 0-3.728 5.837C9.336 2.344 4.928 0 0 0v16.062C0 24.865 7.163 32 16 32s16-7.135 16-15.938V0Z" />
    </svg>
  );
}
