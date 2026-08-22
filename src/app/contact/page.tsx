import { ComingSoon } from "@/components/coming-soon";
import { stubMetadata } from "@/lib/stub";

export const metadata = stubMetadata("Contact", "/contact");

export default function ContactPage() {
  return <ComingSoon title="Contact" />;
}
