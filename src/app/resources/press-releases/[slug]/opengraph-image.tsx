import { ImageResponse } from "next/og";
import { getPressRelease, pressReleases } from "@/lib/press";
import { siteConfig } from "@/lib/site";
import { tokens } from "@/lib/tokens";

export const alt = "Press release share image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return pressReleases.map((release) => ({ slug: release.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = getPressRelease(slug);
  const title = release?.title ?? "Press release not found";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: tokens.forest,
          color: tokens.mist,
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: -0.5, color: tokens.sunflower }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>
    ),
    size,
  );
}
