import { Inter } from "next/font/google";
import { TrustGameBooth } from "@/components/trust-game-booth";
import { createPageMetadata } from "@/lib/metadata";
import { trustGameBoothMeta } from "@/lib/trust-game/copy";
import "./booth.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-booth-body",
});

export const metadata = createPageMetadata({
  title: trustGameBoothMeta.title,
  description: trustGameBoothMeta.description,
  path: trustGameBoothMeta.path,
  noIndex: true,
});

export default function TrustGameBoothPage() {
  return <TrustGameBooth fontVariable={inter.variable} />;
}
