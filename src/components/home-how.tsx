import { InView } from "@/components/in-view";
import { MediaStep } from "@/components/media-step";
import { MenuItemIcon } from "@/components/menu-icons";
import { VideoFrame } from "@/components/video-frame";
import { homeHow } from "@/lib/home";

export function HomeHow() {
  return (
    <section aria-labelledby="how-title">
      <div className="mx-auto w-full max-w-[1328px] px-6 py-24 sm:px-12 lg:pt-[140px] lg:pb-[150px]">
        <InView className="how-head mx-auto max-w-[780px] text-center">
          <HowMark />
          <p className="mt-[18px] text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {homeHow.eyebrow}
          </p>
          <h2
            id="how-title"
            className="mt-[18px] flex flex-wrap items-center justify-center gap-x-1 text-[clamp(2rem,4vw,3.375rem)] leading-[1.16] font-semibold tracking-[-0.02em] text-mist"
          >
            {homeHow.title.map((word, index) => (
              <span key={word} className="inline-flex items-center">
                {index > 0 ? <HowArrow /> : null}
                {word}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-[22px] max-w-[620px] text-[16.5px] leading-[1.68] text-mist/75">
            {homeHow.sub}
          </p>
        </InView>

        <InView mark="rv-in" className="mx-auto mt-[72px] mb-[120px] w-full max-w-[1232px]">
          <VideoFrame
            className="how-video"
            src={homeHow.video.src}
            label={homeHow.video.label}
          />
        </InView>

        <ol className="mx-auto flex max-w-[1232px] flex-col gap-14 md:gap-[72px] lg:gap-[130px]">
          {homeHow.steps.map((step) => (
            <li key={step.n}>
              <InView mark="rv-in" className={step.flip ? "how-step-flip" : undefined}>
                <MediaStep
                  n={step.n}
                  flip={step.flip}
                  icon={<MenuItemIcon name={step.icon} />}
                  label={step.label}
                  title={step.title}
                  body={step.body}
                  media={
                    <VideoFrame
                      variant="step"
                      className="how-visual"
                      src={step.video.src}
                      label={step.video.label}
                    />
                  }
                />
              </InView>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function HowMark() {
  return (
    <svg
      className="mx-auto"
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 16C0 24.8371 7.16294 32 16 32C16 23.163 8.83705 16 0 16Z"
        fill="#C9D32A"
      />
      <path
        d="M32 16C32 24.8371 24.837 32 16 32C16 23.163 23.1629 16 32 16Z"
        fill="#EFF2C0"
      />
      <path
        d="M2.00028e-05 0C2.00028e-05 8.83703 7.16296 16 16 16C16 7.16292 8.83707 0 2.00028e-05 0Z"
        fill="#EFF2C0"
      />
      <path
        d="M32 8.09724e-05C32 8.83711 24.8371 16 16 16C16 7.16292 23.1629 8.09724e-05 32 8.09724e-05Z"
        fill="#C9D32A"
      />
    </svg>
  );
}

function HowArrow() {
  return (
    <svg
      className="mx-[5px] h-6 w-[34px] text-sunflower"
      viewBox="0 0 34 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 12h29m0 0-9.2-9.2M31 12l-9.2 9.2"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
