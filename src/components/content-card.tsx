import type { ReactNode } from "react";

type ContentCardProps = {
  title: string;
  subtitle: string;
  image: ReactNode;
};

// Figma 1:247: a 480×132 card (the 174px in the frame is the tilted bounding
// box). The motif is pinned to the right edge and never adds height.
export function ContentCard({ title, subtitle, image }: ContentCardProps) {
  return (
    <article className="why-card surface-grain relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-mist/15 bg-[#19321e] pt-6 pr-[96px] pb-[26px] pl-7 sm:pr-[112px]">
      <h3 className="text-[22px] leading-[1.28] font-bold tracking-[-0.01em] text-mist">
        {title}
      </h3>
      <p className="mt-[7px] text-[14.5px] leading-[1.55] text-mist/75">{subtitle}</p>
      <div
        className="card-motif absolute inset-y-0 right-0 flex w-[90px] items-center justify-end text-bitmap-mid/40"
        aria-hidden="true"
      >
        {image}
      </div>
    </article>
  );
}
