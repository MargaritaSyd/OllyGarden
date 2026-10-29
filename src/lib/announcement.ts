/**
 * Home-page announcement bar above the header (Figma 2383:42299).
 *
 * `href` is the launch post. The Rose MVI section's "Read the Announcement"
 * button reuses it so both land on the same post; update it here only.
 */
export const announcement = {
  badge: "Event",
  text: "Meet us at KubeCon + CloudNativeCon North America in Salt Lake City, November 9–12, booth 356.",
  link: "See our talks",
  href: "/resources/events/kubecon-na-2026",
} as const;
