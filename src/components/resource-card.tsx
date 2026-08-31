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

type EventHostLogo = {
  icon: "kubecon" | "cloudnativecon";
  label: string;
};

export function ResourceCardPoster({
  host,
  hostLogos,
  posterTitle,
  highlight,
  note,
}: {
  host: string;
  hostLogos?: readonly EventHostLogo[];
  posterTitle: string;
  highlight: string;
  note: string;
}) {
  return (
    <span className="@container flex h-[381px] flex-col overflow-hidden rounded-[20px] border border-sunflower/40 bg-[#00260d] p-[clamp(1.25rem,6.3cqw,1.875rem)] transition-[border-color] duration-200 ease-out group-hover:border-sunflower/65">
      <span className="flex items-start justify-between gap-3">
        {hostLogos?.length ? (
          <span className="flex items-start gap-3 text-mist">
            {hostLogos.map((logo) => (
              <span key={logo.label} className="flex flex-col items-center gap-1">
                <EventHostIcon icon={logo.icon} />
                <span className="text-[10px] leading-none font-medium tracking-[0.01em]">
                  {logo.label}
                </span>
              </span>
            ))}
          </span>
        ) : (
          <span className="max-w-[62%] truncate text-[clamp(12px,3.35cqw,15px)] font-bold tracking-[0.02em]">
            {host}
          </span>
        )}
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
        <span className="mt-4 inline-flex max-w-full rounded-[4px] bg-sunflower px-3 py-1.5 text-[clamp(0.8125rem,3.8cqw,0.9375rem)] leading-tight font-semibold tracking-[0.01em] text-forest">
          {highlight}
        </span>
        <span className="mt-2.5 text-[clamp(0.8125rem,3.8cqw,0.9375rem)] leading-[1.45] font-medium text-sunflower">
          {note}
        </span>
      </span>
    </span>
  );
}

function EventHostIcon({ icon }: { icon: EventHostLogo["icon"] }) {
  if (icon === "cloudnativecon") {
    return (
      <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-hidden="true">
        <path
          d="M11.2 21.5h14.4c4.1 0 7.4-3.1 7.4-7 0-3.6-2.8-6.6-6.4-6.9C25.7 4 22 1.2 17.6 1.2c-4.2 0-7.8 2.5-9.2 6.1C4.4 8 1.5 11.4 1.5 15.5c0 3.3 2.9 6 6.5 6h3.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  const spokes = Array.from({ length: 7 }, (_, i) => i * (360 / 7) - 90);

  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="8.2" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="24" cy="24" r="3.3" fill="currentColor" />
      {spokes.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 24 24)`}>
          <rect x="22.7" y="3.6" width="2.6" height="11.2" rx="0.6" fill="currentColor" />
          <rect x="19.1" y="3" width="9.8" height="3.1" rx="0.8" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
