import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

export const metadata = stubMetadata("Blog", "/resources/blog");

export default function BlogIndexStubPage() {
  return <ComingSoon title="Blog" />;
}
