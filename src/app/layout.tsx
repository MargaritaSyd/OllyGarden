import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { PageMotif } from "@/components/page-motif";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { rootMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { tokens } from "@/lib/tokens";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
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
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="relative isolate flex min-h-full flex-col bg-forest font-sans text-mist">
        <PageMotif />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
