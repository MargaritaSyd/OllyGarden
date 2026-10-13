import { blogVideos } from "@/lib/blog";

export const communityMeta = {
  title: "Upcoming Events & Conferences — OllyGarden",
  description:
    "Where to meet the OllyGarden team next: OpenTelemetry and observability conferences, meetups, and community days.",
  path: "/resources/events",
} as const;

export const communityHero = {
  badge: "OllyGarden Events",
  title: "Next Events",
  lede: "Where to find us next — conferences, meetups, and community days.",
} as const;

export type CommunityEvent = {
  host: string;
  posterTitle: string;
  note: string;
  date: string;
  place: string;
  title: string;
  summary: string;
  href: string;
};

export const communityEvents: readonly CommunityEvent[] = [
  {
    host: "KubeCon + CloudNativeCon",
    posterTitle: "KubeCon® + CloudNativeCon® North America 2026",
    note: "OllyGarden will be there as a sponsor.",
    date: "November 9–12, 2026",
    place: "Salt Lake City 🇺🇸",
    title: "KubeCon + CloudNativeCon North America 2026",
    summary:
      "The CNCF's flagship cloud native conference — four days of keynotes, maintainer sessions and co-located events.",
    href: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/register/",
  },
];

export const communityWebinars = {
  eyebrow: "Webinars",
  title: "OllyGarden Webinars",
  sub: "Our live sessions and educational videos for you.",
  cta: "Check our YouTube",
  youtubeHref: "https://www.youtube.com/@OllyGardenInc",
  pageSize: 3,
  videos: blogVideos,
} as const;

export const communityJoin = {
  eyebrow: "Join Us",
  title: "Become an OllyGardener",
  paragraphs: [
    "At OllyGarden, we’re building a remote-first culture where talented people can thrive while solving meaningful challenges in observability and OpenTelemetry.",
    "We value open source, neutrality, simplicity, and a sustainable way of working. Here, your work helps engineering teams improve telemetry quality, reduce waste, and build more efficient observability pipelines.",
    "If you’re passionate about OpenTelemetry, telemetry efficiency, and making a real impact with a growing team, we’d love to hear from you.",
  ],
  primary: { label: "Explore Open Positions", href: "/careers" },
  secondary: { label: "Read Our Blog", href: "/resources/blog" },
  image: {
    src: "/images/community/team.png",
    alt: "The OllyGarden team together in Budapest",
  },
} as const;
