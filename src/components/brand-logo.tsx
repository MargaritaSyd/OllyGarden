import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  height?: number;
};

export function BrandLogo({ className, height = 32 }: BrandLogoProps) {
  const width = Math.round((height * 556) / 87);

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
        width={width}
        height={height}
        className="h-full w-auto max-w-full"
      />
    </Link>
  );
}
