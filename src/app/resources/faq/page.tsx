import { FaqHero } from "@/components/faq-hero";
import { FaqTopics } from "@/components/faq-topics";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { faqCta, faqHero, faqMeta } from "@/lib/faq";
import { createPageMetadata } from "@/lib/metadata";
import { resourcesFaqGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: faqMeta.title,
  description: faqHero.lede,
  path: faqMeta.path,
  absoluteTitle: true,
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={resourcesFaqGraph()} />
      <FaqHero />
      <FaqTopics />
      <SiteCta content={faqCta} />
    </>
  );
}
