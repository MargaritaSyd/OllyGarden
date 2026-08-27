import type { ReactNode } from "react";

type ContentCardProps = {
  title: string;
  subtitle: string;
  image: ReactNode;
};

export function ContentCard({ title, subtitle, image }: ContentCardProps) {
  return (
    <article className="surface-grain flex flex-row items-center overflow-hidden rounded-2xl border border-mist/15 bg-[#19321e] py-[26px] pr-4 pl-7">
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[22px] leading-snug font-semibold tracking-[-0.01em] text-mist">
          {title}
        </h3>
        <p className="mt-2 text-[14.5px] leading-[1.55] text-mist/75">{subtitle}</p>
      </div>
      <div
        className="flex h-[140px] w-24 shrink-0 items-center justify-end text-bitmap-mid/40"
        aria-hidden="true"
      >
        {image}
      </div>
    </article>
  );
}
