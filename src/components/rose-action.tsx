import { InView } from "@/components/in-view";
import { VideoFrame } from "@/components/video-frame";
import { roseAction } from "@/lib/rose";

export function RoseAction() {
  return (
    <InView as="section" aria-labelledby="action-title">
      <div className="mx-auto w-full max-w-[1328px] px-5 py-[clamp(5.25rem,9vw,8.75rem)] sm:px-12">
        <div className="ov-stagger mb-[clamp(2.5rem,4.5vw,4rem)] max-w-[640px]">
          <ActionMark />
          <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {roseAction.eyebrow}
          </p>
          <h2
            id="action-title"
            className="mt-4 max-w-[560px] text-[clamp(2rem,3.8vw,3.375rem)] leading-[1.16] font-semibold tracking-[-0.02em] text-mist"
          >
            {roseAction.title}
          </h2>
          <p className="mt-5 max-w-[540px] text-[16.5px] leading-[1.68] text-mist/75">
            {roseAction.sub}
          </p>
        </div>
        <VideoFrame
          className="action-video"
          src={roseAction.video.src}
          label={roseAction.video.label}
        />
      </div>
    </InView>
  );
}

function ActionMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M32 0C27.072 0 22.664 2.346 19.729 5.837A16.6 16.6 0 0 0 16 0a16.6 16.6 0 0 0-3.728 5.837C9.336 2.344 4.928 0 0 0v16.062C0 24.865 7.163 32 16 32s16-7.135 16-15.938V0Z"
        fill="#C9D32A"
      />
    </svg>
  );
}
