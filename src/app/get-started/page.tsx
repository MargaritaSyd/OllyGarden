import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

export const metadata = stubMetadata(
  "Get Started",
  "/get-started",
  "Full get-started page coming soon.",
);

export default function GetStartedPage() {
  return (
    <ComingSoon
      title="Get Started"
      description="Full get-started page coming soon."
    />
  );
}
