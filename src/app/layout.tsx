import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AnalyticsConsentBanner } from "@/components/analytics-consent-banner";
import { AnnouncementBar } from "@/components/announcement-bar";
import { PageMotif } from "@/components/page-motif";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WebsiteAnalytics } from "@/components/website-analytics";
import { rootMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { tokens } from "@/lib/tokens";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Code panels in the Rose MVI section (Figma uses JetBrains Mono there).
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: tokens.forest,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="service-doc"
          type="text/markdown"
          title="OllyGarden API Documentation"
          href="/api-docs.md"
        />
        <link
          rel="sunset"
          type="text/markdown"
          title="OllyGarden API Versioning and Deprecation Policy"
          href="/api-versioning.md"
        />
        <link
          rel="service-desc"
          type="application/vnd.oai.openapi+json"
          title="OllyGarden REST API"
          href="/openapi.json"
        />
      </head>
      <body className="relative isolate flex min-h-full flex-col bg-forest font-sans text-mist">
        <AnnouncementBar />
        {/* The motif is absolute at the top of this wrapper. The header is fixed over the page. */}
        <div className="relative flex flex-1 flex-col">
          <PageMotif />
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
        <SiteFooter />
        <AnalyticsConsentBanner />
        <WebsiteAnalytics />
      </body>
    </html>
  );
}
