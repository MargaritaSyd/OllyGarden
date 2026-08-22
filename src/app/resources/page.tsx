import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

export const metadata = stubMetadata(
  "Resources",
  "/resources",
  "Full resources page coming soon.",
);

export default function ResourcesPage() {
  return (
    <ComingSoon
      title="Resources"
      description="Full resources page coming soon."
    />
  );
}
