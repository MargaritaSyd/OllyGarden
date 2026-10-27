import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  height?: number;
  width?: number;
  /** False for kiosk pages, where the logo must not navigate away. */
  linked?: boolean;
};

export function BrandLogo({ className, height = 32, width, linked = true }: BrandLogoProps) {
  const resolvedWidth = width ?? Math.round((height * 556) / 87);
  const resolvedHeight = width === undefined ? height : Math.round((width * 87) / 556);
  const classes = `inline-flex min-w-0 ${className ?? "h-8"}`;
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-group.svg"
      alt={linked ? "" : "OllyGarden"}
      width={resolvedWidth}
      height={resolvedHeight}
      className={width === undefined ? "h-full w-auto max-w-full" : "h-auto w-full"}
    />
  );

  return linked ? (
    <Link href="/" className={classes} aria-label="OllyGarden home">
      {image}
    </Link>
  ) : (
    <span className={classes}>{image}</span>
  );
}
