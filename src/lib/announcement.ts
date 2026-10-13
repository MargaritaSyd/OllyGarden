/**
 * Site-wide announcement bar above the header (Figma 2383:42299).
 *
 * `href` is the launch post. The Rose MVI section's "Read the Announcement"
 * button reuses it so both land on the same post; update it here only.
 */
export const announcement = {
  badge: "New",
  text: "OllyGarden raises $4M Seed round and launches Minimum Viable Instrumentation.",
  link: "Read the announcement",
  href: "/resources/press-releases/ollygarden-raises-4m-launches-minimum-viable-instrumentation",
} as const;
