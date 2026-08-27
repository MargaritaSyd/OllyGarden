import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { TulipAction } from "@/components/tulip-action";
import { TulipDropin } from "@/components/tulip-dropin";
import { TulipFaq } from "@/components/tulip-faq";
import { TulipHero } from "@/components/tulip-hero";
import { TulipLead } from "@/components/tulip-lead";
import { TulipPlans } from "@/components/tulip-plans";
import { TulipSupport } from "@/components/tulip-support";
import { createPageMetadata } from "@/lib/metadata";
import { tulipGraph } from "@/lib/structured-data";
import { tulipHero, tulipMeta } from "@/lib/tulip";

export const metadata = createPageMetadata({
  title: tulipMeta.title,
  description: tulipHero.lede,
  path: tulipMeta.path,
  absoluteTitle: true,
});

export default function TulipPage() {
  return (
    <>
      <JsonLd data={tulipGraph()} />
      <TulipHero />
      <div className="relative isolate">
        <div className="tulip-grid" aria-hidden="true" />
        <div className="relative z-10">
          <TulipAction />
          <TulipSupport />
        </div>
      </div>
      <TulipDropin />
      <TulipPlans />
      <TulipFaq />
      <TulipLead />
      <SiteCta />
    </>
  );
}
