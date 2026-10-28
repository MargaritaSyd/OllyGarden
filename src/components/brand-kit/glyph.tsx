import { brandIconByName } from "@/lib/brand-kit/icons";

export function BrandGlyph({
  name,
  body,
  size = 24,
  className,
}: {
  name?: string;
  body?: string;
  size?: number;
  className?: string;
}) {
  const markup = body ?? (name ? brandIconByName(name)?.body : undefined);
  if (!markup) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
