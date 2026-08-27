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
    <article className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)] lg:gap-x-10">
      <div
        className={`flex max-w-[480px] flex-col justify-center ${
          flip ? "lg:order-3 lg:ml-auto" : "lg:order-1"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <p className="text-[13px] font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {label}
          </p>
        </div>
        <h3 className="mt-3 text-[30px] leading-[1.22] font-semibold tracking-[-0.015em] text-mist">
          {title}
        </h3>
        <p className="mt-[14px] text-[15.5px] leading-[1.66] text-mist/75">{body}</p>
      </div>

      <div className="relative order-2 flex h-10 items-center justify-center self-stretch lg:h-auto">
        <span
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,var(--color-mist)_0_5px,transparent_5px_12px)] opacity-35 max-lg:inset-x-0 max-lg:inset-y-auto max-lg:top-1/2 max-lg:h-px max-lg:w-full max-lg:translate-x-0 max-lg:bg-[repeating-linear-gradient(to_right,var(--color-mist)_0_5px,transparent_5px_12px)]"
          aria-hidden="true"
        />
        <span className="relative z-10 flex size-[46px] items-center justify-center rounded-xl bg-mist text-[19px] font-semibold text-forest shadow-[0_8px_24px_rgba(1,30,12,0.35)]">
          {n}
        </span>
      </div>

      <div className={flip ? "order-3 lg:order-1" : "order-3"}>{media}</div>
    </article>
  );
}
