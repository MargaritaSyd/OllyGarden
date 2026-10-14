import { HomeBlog } from "@/components/home-blog";
import { HomeHero } from "@/components/home-hero";
import { HomeHow } from "@/components/home-how";
import { HomeReality } from "@/components/home-reality";
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
      <HomeReality />
      <HomeVoices />
      <HomeSecurity />
      <HomeHow />
      <HomeBlog />
      {/* Preview closing CTA is Get Started only. The quiz stays on homeCta for every other page. */}
      <SiteCta
        content={{
          title: homeCta.title,
          buttonSize: homeCta.buttonSize,
          flush: true,
        }}
      />
    </>
  );
}
