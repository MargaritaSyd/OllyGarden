import Link from "next/link";
import type { ReactNode } from "react";
import { BlogMeta } from "@/components/blog-ui";
import { CtaArrow } from "@/components/cta-arrow";

export const resourceCardCtaClassName =
  "mt-auto inline-flex h-8 shrink-0 items-center gap-2 text-lg font-medium tracking-[0.02em] text-sunflower";

type ResourceCardProps = {
  href: string;
  cta: string;
  title: string;
  media: ReactNode;
  date: string;
  suffix: string;
  description?: string;
  external?: boolean;
  ariaLabel?: string;
  className?: string;
  titleClassName?: string;
};

export function ResourceCard({
  href,
  cta,
  title,
  media,
  date,
  suffix,
  description,
  external = false,
  ariaLabel,
  className = "",
  titleClassName = "",
}: ResourceCardProps) {
  const cardClassName = `group flex h-full flex-col gap-6 text-mist ${className}`.trim();
  const content = (
    <>
      {media}
      <BlogMeta date={date} suffix={suffix} />
      <h3
        className={`text-2xl leading-[1.29] font-bold tracking-[-0.02em] transition-colors group-hover:text-sunflower ${titleClassName}`.trim()}
      >
        {title}
      </h3>
      {description ? (
        <p className="text-base leading-[1.2] text-[#cdcdcd]">{description}</p>
      ) : null}
      <span className={resourceCardCtaClassName}>
        <span className="underline underline-offset-2">{cta}</span>
        <CtaArrow />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClassName} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

export function ResourceCardImage({
  src,
  alt,
  width = 384,
  height = 216,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <span className="block aspect-video overflow-hidden rounded-2xl bg-[#00280e]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export function ResourceCardPoster({
  host,
  posterTitle,
  note,
}: {
  host: string;
  posterTitle: string;
  note: string;
}) {
  return (
    <span className="flex h-[381px] flex-col rounded-2xl border border-sunflower/40 bg-[#00260d] p-6">
      <span className="flex items-start justify-between gap-3">
        <span className="text-[13px] font-bold tracking-[0.02em]">{host}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-group.svg"
          alt=""
          width={110}
          height={17}
          className="mt-0.5 h-[17px] w-auto"
        />
      </span>
      <span className="mt-auto flex flex-col gap-1">
        <span className="text-[15px] font-medium text-sunflower">OllyGarden at</span>
        <span className="text-[clamp(1.25rem,1.7vw,1.675rem)] leading-[1.48] font-bold tracking-[0.01em] text-mist uppercase">
          {posterTitle}
        </span>
        <span className="text-[13px] leading-[1.5] font-medium text-[#cdcdcd]">{note}</span>
      </span>
    </span>
  );
}
