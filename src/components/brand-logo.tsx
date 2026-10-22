import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  height?: number;
  width?: number;
};

export function BrandLogo({ className, height = 32, width }: BrandLogoProps) {
  const resolvedWidth = width ?? Math.round((height * 556) / 87);
  const resolvedHeight = width === undefined ? height : Math.round((width * 87) / 556);

  return (
    <Link
      href="/"
      className={`inline-flex min-w-0 ${className ?? "h-8"}`}
      aria-label="OllyGarden home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-group.svg"
        alt=""
        width={resolvedWidth}
        height={resolvedHeight}
        className={width === undefined ? "h-full w-auto max-w-full" : "h-auto w-full"}
      />
    </Link>
  );
}
