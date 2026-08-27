import { ContactHelp } from "@/components/contact-help";
import { ContactHero } from "@/components/contact-hero";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { contactHero, contactMeta } from "@/lib/contact";
import { createPageMetadata } from "@/lib/metadata";
import { contactGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: contactMeta.title,
  description: contactHero.lede,
  path: contactMeta.path,
  absoluteTitle: true,
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactGraph()} />
      <ContactHero />
      <ContactHelp />
      <SiteCta />
    </>
  );
}
