import { HomeHero } from "@/components/home-hero";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { homeGraph } from "@/lib/structured-data";

const description =
  "OllyGarden helps teams find and fix bad telemetry before it reaches any observability backend, giving engineers and AI agents data they can rely on — from pull request to production.";

export const metadata = createPageMetadata({
  title: `${siteConfig.name} — Observability starts with good telemetry`,
  description,
  path: "/",
});

export default function Home() {
  return (
    <>
    <JsonLd data={homeGraph()} />
    <HomeHero />
    </>
  );
}
