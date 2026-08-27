import { blogVideos } from "@/lib/blog";

export const webinarsMeta = {
  title: "Webinars & Conferences — OllyGarden",
  path: "/resources/webinars-conferences",
} as const;

export const webinarsHero = {
  badge: "OllyGarden Videos",
  title: "Webinars & Conferences",
  lede: "Deep dives, demos, and conference talks from the OllyGarden team.",
} as const;

export const webinarsYoutubeHref = "https://www.youtube.com/@OllyGardenInc";

export const webinarsSessions = {
  eyebrow: "Videos & Webinars Sessions",
  title: "OllyGarden Webinars",
  sub: "Our live sessions, streamed and archived on our YouTube channel.",
  cta: "Check our YouTube",
  youtubeHref: webinarsYoutubeHref,
  videos: blogVideos,
  featured: {
    eyebrow: "New event",
    title: "Event Name",
    date: "July 30, 2026",
    suffix: "YouTube",
    description: "[description of the event]",
    cta: "Set a Reminder",
    href: webinarsYoutubeHref,
  },
} as const;

export type StageTalk = {
  date: string;
  title: string;
  href: string;
  image: string;
  alt: string;
  venue: string;
};

export const webinarsStage = {
  eyebrow: "Conferences",
  title: "OllyGarden on Stage",
  sub: "Our talks from KubeCon and other community events.",
  pageSize: 3,
} as const;

export const stageTalks: readonly StageTalk[] = [
  {
    date: "2026-07-03",
    title: "WWC26 — The OpenTelemetry mistakes I keep seeing (and how to stop making them)",
    href: "https://www.youtube.com/live/zpVC4O14DiA",
    image: "/images/youtube/zpVC4O14DiA.jpg",
    alt: "WeAreDevelopers talk: The OpenTelemetry mistakes I keep seeing (and how to stop making them)",
    venue: "WeAreDevelopers",
  },
  {
    date: "2026-04-13",
    title:
      "Let Me Be Your OpenTelemetry Champ — Pavol Loffay, Red Hat & Nicolas Wörner, OllyGarden",
    href: "https://www.youtube.com/watch?v=pdKemf65KGc",
    image: "/images/youtube/pdKemf65KGc.jpg",
    alt: "KubeCon Amsterdam talk: Let Me Be Your OpenTelemetry Champ",
    venue: "KubeCon Amsterdam",
  },
  {
    date: "2026-04-13",
    title:
      "OpenTelemetry Gateways: Enforce, Transform, Route — Juraci Paixão Kröhling & Natalie Ujuk",
    href: "https://www.youtube.com/watch?v=S6z2gd666qg",
    image: "/images/youtube/S6z2gd666qg.jpg",
    alt: "KubeCon Amsterdam talk: OpenTelemetry Gateways — Enforce, Transform, Route",
    venue: "KubeCon Amsterdam",
  },
  {
    date: "2026-04-08",
    title:
      "Day-2 Reality Check: Taming Wasteful Telemetry — Juraci Paixão Kröhling & Elena Kovalenko",
    href: "https://www.youtube.com/watch?v=cpB5NTtUdwQ",
    image: "/images/youtube/cpB5NTtUdwQ.jpg",
    alt: "KubeCon Amsterdam talk: Day-2 Reality Check — Taming Wasteful Telemetry",
    venue: "KubeCon Amsterdam",
  },
  {
    date: "2025-11-24",
    title:
      "There's a Lot of Bad Telemetry Out There — Dan Gomez Blanco, New Relic & Juraci Paixão Kröhling",
    href: "https://www.youtube.com/watch?v=06U2_PIZ0S4",
    image: "/images/youtube/06U2_PIZ0S4.jpg",
    alt: "KubeCon Salt Lake City talk: There's a Lot of Bad Telemetry Out There",
    venue: "KubeCon Salt Lake City",
  },
  {
    date: "2025-11-24",
    title:
      "Instrumentation Score: The Difference Between Telemetry and Good Telemetry — Juraci Paixão Kröhling & Michele Mancioppi",
    href: "https://www.youtube.com/watch?v=kdzeUiMI_t4",
    image: "/images/youtube/kdzeUiMI_t4.jpg",
    alt: "KubeCon Salt Lake City talk: Instrumentation Score — The Difference Between Telemetry and Good Telemetry",
    venue: "KubeCon Salt Lake City",
  },
];
