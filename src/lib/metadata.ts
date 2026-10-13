import type { Metadata } from "next";
import { ogCards, ogImageAlt, ogImageSize, ogImageUrl } from "@/lib/og-cards";
import { getAbsoluteUrl, getSiteUrl, siteConfig } from "@/lib/site";

type OpenGraphType = "website" | "article";

/** Search-result title and meta description, when a headline or summary runs past the limits. */
export type SeoOverride = { title?: string; description?: string };

/** The page's Open Graph card; noindex pages without an explicit card fall back to the site-wide one. */
function ogImages(path: string, noIndex: boolean) {
  if (!ogCards[path] && !noIndex) {
    throw new Error(`${path} has no Open Graph card; add one to src/lib/og-cards.ts`);
  }
  const cardPath = ogCards[path] ? path : "/";
  return [{ url: ogImageUrl(cardPath), alt: ogImageAlt(cardPath), ...ogImageSize }];
}

/** The page's Markdown version, served by the agent-content route. */
function markdownPath(path: string) {
  return `${path === "/" ? "/index" : path}.md`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: OpenGraphType;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  absoluteTitle?: boolean;
  /** Card key in og-cards.ts when it differs from `path`. */
  ogCard?: string;
};

const defaultOgImages = ogImages("/", true);

export const rootMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: getSiteUrl() }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  category: "technology",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": siteConfig.blogFeedPath,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: defaultOgImages,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const brandSuffix = ` — ${siteConfig.name}`;

/** Appends the brand when it fits in a 60-character search result title. */
function brandedTitle(title: string) {
  return title.includes(siteConfig.name) || title.length + brandSuffix.length > 60
    ? title
    : `${title}${brandSuffix}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
  absoluteTitle = false,
  ogCard,
}: PageMetadataInput): Metadata {
  const url = getAbsoluteUrl(path);
  const images = ogImages(ogCard ?? path, noIndex && !ogCard);

  return {
    title: { absolute: absoluteTitle ? title : brandedTitle(title) },
    description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": siteConfig.blogFeedPath,
        ...(noIndex ? {} : { "text/markdown": markdownPath(path) }),
      },
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors: authors ?? [siteConfig.author],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
