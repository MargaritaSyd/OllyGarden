import { ComingSoon } from "@/components/coming-soon";
import { getStartedMeta, getStartedPage } from "@/lib/get-started";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: getStartedMeta.title,
  description: getStartedPage.description,
  path: getStartedMeta.path,
  absoluteTitle: true,
});

export default function GetStartedPage() {
  return (
    <ComingSoon
      badge={getStartedPage.badge}
      title={getStartedPage.title}
      soon={getStartedPage.soon}
      description={getStartedPage.description}
      homeLabel={getStartedPage.homeLabel}
      fillViewport
    />
  );
}
