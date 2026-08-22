import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

export const metadata = stubMetadata("Careers", "/careers");

export default function CareersPage() {
  return <ComingSoon title="Careers" />;
}
