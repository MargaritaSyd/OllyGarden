import { VideoFrame } from "@/components/video-frame";
import { insightsAction } from "@/lib/insights";

export function InsightsAction() {
  return (
    <section aria-labelledby="insights-action-title">
      <div className="mx-auto w-full max-w-[1328px] px-5 py-[clamp(5.25rem,9vw,8.75rem)] sm:px-12">
        <div className="mb-[clamp(2.5rem,4.5vw,4rem)] max-w-[640px]">
          <ActionMark />
          <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {insightsAction.eyebrow}
          </p>
          <h2
            id="insights-action-title"
            className="mt-4 max-w-[560px] text-[clamp(2rem,3.8vw,3.375rem)] leading-[1.16] font-semibold tracking-[-0.02em] text-mist"
          >
            {insightsAction.title}
          </h2>
          <p className="mt-5 max-w-[540px] text-[16.5px] leading-[1.68] text-mist/75">
            {insightsAction.sub}
          </p>
        </div>
        <VideoFrame src={insightsAction.video.src} label={insightsAction.video.label} />
      </div>
    </section>
  );
}

function ActionMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M0 16.0325C-7.70974e-07 24.8514 7.16354 32 16.0008 32L16.0008 16.0325L0 16.0325Z" fill="#9CA703" />
      <path d="M1.5293e-07 0C-6.18044e-07 8.81891 7.16354 15.9675 16.0008 15.9675L16.0008 1.39884e-06L1.5293e-07 0Z" fill="#9CA703" />
      <path d="M15.9992 16.0325C15.9992 24.8514 23.1627 32 32 32V16.0325L15.9992 16.0325Z" fill="#9CA703" />
      <path d="M15.9992 1.50017e-07C15.9992 8.81891 23.1627 15.9675 32 15.9675V1.54886e-06L15.9992 1.50017e-07Z" fill="#9CA703" />
    </svg>
  );
}
