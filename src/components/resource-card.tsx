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
    <span className="@container flex h-[381px] flex-col overflow-hidden rounded-[20px] border border-sunflower/40 bg-[#00260d] p-[clamp(1.25rem,6.3cqw,1.875rem)] transition-[border-color] duration-200 ease-out group-hover:border-sunflower/65">
      <span className="flex items-start justify-between gap-3">
        <span className="max-w-[62%] truncate text-[clamp(12px,3.35cqw,15px)] font-bold tracking-[0.02em]">
          {host}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-group.svg"
          alt=""
          width={124}
          height={19}
          className="mt-0.5 h-auto w-[clamp(88px,28.7cqw,124px)] shrink-0"
        />
      </span>
      <span className="mt-auto flex flex-col items-start">
        <span className="text-[clamp(0.9375rem,4.2cqw,1.0625rem)] leading-[1.3] font-medium text-sunflower">
          OllyGarden at
        </span>
        <span className="mt-3 line-clamp-3 text-[clamp(1.5rem,9cqw,1.875rem)] leading-[1.2] font-bold tracking-[0.01em] text-mist uppercase">
          {posterTitle}
        </span>
        <span className="mt-4 text-[clamp(0.8125rem,3.8cqw,0.9375rem)] leading-[1.45] font-medium text-sunflower">
          {note}
        </span>
      </span>
    </span>
  );
}
