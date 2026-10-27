import { TrustGame } from "@/components/trust-game";
import { trustGameBoothPath } from "@/lib/chrome";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Trust Your Telemetry? Booth",
  description: "Full-screen kiosk mode of OllyGarden's telemetry trust game for event booths.",
  path: trustGameBoothPath,
  noIndex: true,
});

/** Kiosk for event booths; chromeless, so it has no site header, footer, or analytics. */
export default function TrustGameBoothPage() {
  return <TrustGame mode="booth" />;
}
