import { siteConfig } from "@/lib/site";

export const notFoundMeta = {
  title: "Page not found",
  description: "The page you requested does not exist.",
  path: "/404",
} as const;

export type NotFoundLink = {
  id: string;
  href: string;
  label: string;
  description: string;
};

export const notFoundCopy = {
  badge: "Error 404",
  title: ["Nothing grows", "at this address"],
  lede: "We couldn't find that page. Its link may be broken, or it moved during a recent reorganization. Try one of these instead.",
  primary: "Go to homepage",
  secondary: "Contact us",
  linksHeading: "More places to look",
  links: [
    {
      id: "not_found_rose",
      href: "/products/rose",
      label: "Rose",
      description: "Catch bad instrumentation early.",
    },
    {
      id: "not_found_blog",
      href: "/resources/blog",
      label: "Blog",
      description: "Field notes on OpenTelemetry®.",
    },
    {
      id: "not_found_docs",
      href: siteConfig.docsUrl,
      label: "Docs",
      description: "Product guides and API reference.",
    },
  ] satisfies NotFoundLink[],
} as const;
