import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

export const metadata = stubMetadata("Company", "/company");

export default function CompanyPage() {
  return <ComingSoon title="Company" />;
}
