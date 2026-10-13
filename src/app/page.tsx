import { HomeBlog } from "@/components/home-blog";
import { HomeHero } from "@/components/home-hero";
import { HomeHow } from "@/components/home-how";
import { HomeSecurity } from "@/components/home-security";
import { HomeVoices } from "@/components/home-voices";
import { HomeWhy } from "@/components/home-why";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { homeCta } from "@/lib/home";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { homeGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: `${siteConfig.name} — Observability starts with good telemetry`,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <HomeHero />
      <HomeWhy />
      <HomeVoices />
      <HomeSecurity />
      <HomeHow />
      <HomeBlog />
      {/* Figma 1:599: the closing panel sits flush under the blog section on home only. */}
      <SiteCta content={{ ...homeCta, flush: true }} />
    </>
  );
}
