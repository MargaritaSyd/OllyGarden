import { Inconsolata, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "@/components/brand-kit.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-brand-kit",
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inconsolata",
  display: "swap",
});

export default function BrandKitLayout({ children }: { children: ReactNode }) {
  return <div className={`brand-kit ${spaceGrotesk.variable} ${inconsolata.variable}`}>{children}</div>;
}
