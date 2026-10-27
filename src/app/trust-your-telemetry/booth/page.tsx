import { BrandLogo } from "@/components/brand-logo";
import { TrustGame } from "@/components/trust-game";
import { createPageMetadata } from "@/lib/metadata";
import { trustGameBoothPath } from "@/lib/chrome";

export const metadata = createPageMetadata({
  title: "Trust Your Telemetry? Booth",
  description: "Full-screen kiosk mode of OllyGarden's telemetry trust game for event booths.",
  path: trustGameBoothPath,
  noIndex: true,
});

/** Kiosk for event booths; chromeless, so it has no site header, footer, or analytics. */
export default function TrustGameBoothPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-[clamp(1rem,3vw,2.5rem)] pt-4 pb-5">
      <BrandLogo className="mb-4 h-[30px] self-start" height={30} linked={false} />
      <TrustGame mode="booth" />
    </div>
  );
}
