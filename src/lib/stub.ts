import { createPageMetadata } from "@/lib/metadata";

export function stubMetadata(title: string, path: string, description?: string) {
  return createPageMetadata({
    title,
    description: description ?? `${title} is coming soon.`,
    path,
    noIndex: true,
  });
}
