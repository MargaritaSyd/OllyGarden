import { blogVideos } from "@/lib/blog";

export const communityMeta = {
  title: "Events — OllyGarden",
  path: "/resources/events",
} as const;

export const communityHero = {
  badge: "OllyGarden Events",
  title: "Next Events",
  lede: "Where to find us next — conferences, meetups, and community days.",
} as const;

export type CommunityEvent = {
  host: string;
  hostLogos?: readonly { icon: "kubecon" | "cloudnativecon"; label: string }[];
  posterTitle: string;
  highlight: string;
  note: string;
  date: string;
  place: string;
  title: string;
  summary: string;
  href: string;
};

export const communityEvents: readonly CommunityEvent[] = [
  {
    host: "Signals Conf",
    posterTitle: "Signals Berlin 2026",
    highlight: "Gold Sponsor",
    note: "Two days on reliability in the age of AI.",
    date: "September 10–11, 2026",
    place: "Berlin 🇩🇪",
    title: "Signals Berlin 2026",
    summary:
      "Two days on reliability in the age of AI — a single track of practitioner talks about what actually breaks in production.",
    href: "https://www.signalsconf.io/#tickets",
  },
  {
    host: "Code Europe",
    posterTitle: "Code Europe 2026",
    highlight: "Attending",
    note: "Three parallel tracks for senior engineers.",
    date: "September 15, 2026",
    place: "Warsaw 🇵🇱",
    title: "Code Europe 2026",
    summary:
      "Three parallel tracks for senior engineers — AI engineering and data, cloud and platform engineering, and software architecture.",
    href: "https://www.codeeurope.pl/tickets",
  },
  {
    host: "KubeCon + CloudNativeCon",
    hostLogos: [
      { icon: "kubecon", label: "KubeCon" },
      { icon: "cloudnativecon", label: "CloudNativeCon" },
    ],
    posterTitle: "KubeCon + CloudNativeCon NA 2026",
    highlight: "Sponsor",
    note: "Four days of keynotes, sessions and co-located events.",
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
