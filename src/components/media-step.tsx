import type { ReactNode } from "react";

type MediaStepProps = {
  n: string;
  icon: ReactNode;
  label: string;
  title: string;
  body: string;
  media: ReactNode;
  flip?: boolean;
};

export function MediaStep({
  n,
  icon,
  label,
  title,
  body,
  media,
  flip = false,
}: MediaStepProps) {
  return (
    <article className="grid items-center justify-items-start gap-y-[26px] lg:grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)] lg:justify-items-stretch lg:gap-x-10 lg:gap-y-8">
      <div className="relative flex lg:order-2 lg:items-center lg:justify-center lg:self-stretch">
        <span
          className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,var(--color-mist)_0_5px,transparent_5px_12px)] opacity-35 lg:block"
          aria-hidden="true"
        />
        <span className="how-badge relative z-10 flex size-[46px] items-center justify-center rounded-xl bg-mist text-[19px] font-semibold text-forest shadow-[0_8px_24px_rgba(1,30,12,0.35)]">
          {n}
        </span>
      </div>

      <div
        className={`how-copy flex max-w-[480px] flex-col justify-center ${
          flip ? "lg:order-3 lg:ml-auto" : "lg:order-1"
        }`}
      >
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-3">
          {icon}
          <p className="text-[13px] font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {label}
          </p>
        </div>
        <h3 className="mt-3 text-2xl leading-[1.22] font-semibold tracking-[-0.015em] text-mist lg:text-[30px]">
          {title}
        </h3>
        <p className="mt-[14px] text-[15.5px] leading-[1.66] text-mist/75">{body}</p>
      </div>

      <div className={`w-full max-w-[640px] ${flip ? "lg:order-1 lg:max-w-none" : "lg:order-3 lg:max-w-none"}`}>
        {media}
      </div>
    </article>
  );
}
