import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { tokens } from "@/lib/tokens";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: tokens.forest,
    theme_color: tokens.forest,
    lang: siteConfig.language,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
