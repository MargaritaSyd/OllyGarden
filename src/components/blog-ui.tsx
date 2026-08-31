import Link from "next/link";
import { CtaArrow } from "@/components/cta-arrow";

export function BlogTags({
  tags,
  size = "sm",
}: {
  tags: readonly string[];
  size?: "sm" | "md";
}) {
  const pill =
    size === "md"
      ? "h-7 px-3.5 text-[13px] leading-4"
      : "h-[26px] px-3 text-[11px] leading-none";

  return (
    <ul className={`flex flex-wrap ${size === "md" ? "gap-3" : "gap-2"}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className={`inline-flex items-center rounded-full border border-bitmap-mid bg-[rgba(91,114,53,0.2)] text-bitmap-highlight ${pill}`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function BlogEyebrow({ children }: { children: string }) {
  return (
    <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
      {children}
    </p>
  );
}

export function BlogMeta({ date, suffix }: { date: string; suffix: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-sm text-mist">
      <span>{date}</span>
      <span className="h-3.5 w-px bg-mist" aria-hidden="true" />
      <span>{suffix}</span>
    </div>
  );
}

export function BlogReadLink({
  href,
  children,
  external = false,
  ariaLabel,
}: {
  href: string;
  children: string;
  external?: boolean;
  ariaLabel?: string;
}) {
  const className =
    "group inline-flex h-8 shrink-0 items-center gap-2 text-lg font-medium tracking-[0.02em] text-sunflower";
  const inner = (
    <>
      <span className="underline underline-offset-2">{children}</span>
      <CtaArrow />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

export function PetalMark({
  className = "",
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4.05323 7.5386C2.57111 8.00691 1.17533 8.82568 0 10c1.17533 1.1753 2.5701 1.9941 4.05323 2.4614C3.33503 13.8409 2.92971 15.4084 2.9297 17.0703C4.59265 17.0703 6.15908 16.664 7.5386 15.9468C8.00691 17.4289 8.82568 18.8247 10 20C11.1753 18.8247 11.9941 17.4299 12.4614 15.9468C13.8409 16.665 15.4084 17.0703 17.0703 17.0703C17.0703 15.4074 16.664 13.8409 15.9468 12.4614C17.4289 11.9931 18.8247 11.1743 20 10C18.8247 8.82467 17.4299 8.00589 15.9468 7.5386C16.665 6.15908 17.0703 4.59163 17.0703 2.9297C15.4074 2.9297 13.8409 3.33604 12.4614 4.05323C11.9931 2.57111 11.1743 1.17534 10 0C8.82467 1.17534 8.00589 2.57009 7.5386 4.05323C6.15908 3.33503 4.59163 2.9297 2.92971 2.9297C2.92971 4.59264 3.33605 6.15908 4.05323 7.5386Z"
        fill="currentColor"
      />
    </svg>
  );
}
