import { trustGameMeta } from "@/lib/trust-game/content";

export const kubeconNa2026Meta = {
  title: "OllyGarden at KubeCon + CloudNativeCon North America 2026",
  description:
    "Meet OllyGarden at KubeCon + CloudNativeCon North America 2026 in Salt Lake City: booth 356, two talks, and Observability Day, November 9–12.",
  path: "/resources/events/kubecon-na-2026",
  name: "KubeCon + CloudNativeCon North America 2026",
  startDate: "2026-11-09",
  endDate: "2026-11-12",
  venue: "Salt Palace Convention Center",
  city: "Salt Lake City",
  region: "UT",
  country: "US",
  scheduleHref: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/program/schedule/",
  registerHref: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/register/",
} as const;

export const kubeconNa2026Hero = {
  eyebrow: "Salt Lake City · November 9–12, 2026 · Booth 356",
  title: "OllyGarden at KubeCon® + CloudNativeCon® North America 2026",
  lede: "Two talks, a co-chaired Observability Day, and a booth where you can test whether you would trust your own telemetry. Come say hi.",
  cta: "View the schedule",
} as const;

type KubeconSpeaker = { name: string; company: string };

export type KubeconTalk = {
  title: string;
  event: string;
  speakers: readonly KubeconSpeaker[];
  startsAt: string;
  endsAt: string;
  time: string;
  room: string;
  href: string;
  summary: string;
};

type KubeconDay = { date: string; label: string; talks: readonly KubeconTalk[] };

const og = (name: string): KubeconSpeaker => ({ name, company: "OllyGarden" });

export const kubeconNa2026Schedule: readonly KubeconDay[] = [
  {
    date: "Monday, November 9",
    label: "Co-located events",
    talks: [
      {
        title: "Agents Are Not Microservices: Operating Autonomous AI on Kubernetes",
        event: "Cloud Native AI + Inference Day",
        speakers: [og("Lanay Marques"), { name: "Henrique Santana", company: "AWS" }],
        startsAt: "2026-11-09T14:05:00-07:00",
        endsAt: "2026-11-09T14:30:00-07:00",
        time: "2:05–2:30 PM MST",
        room: "Level 2, 251 D-F",
        href: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/co-located-events/cncf-hosted-co-located-schedule/?id=1237691",
        summary:
          "Where Kubernetes primitives fall short for agentic workloads, from probes and autoscaling to graceful shutdown, and the patterns that work with today's Kubernetes and CNCF projects.",
      },
    ],
  },
  {
    date: "Tuesday, November 10",
    label: "Main conference",
    talks: [
      {
        title: "Agents on the Platform: Four Perspectives on the Conversation We're Already Having in Private",
        event: "Panel",
        speakers: [
          { name: "Kasper Borg Nissen", company: "Dash0" },
          og("Juraci Paixão Kröhling"),
          { name: "Joseph Sandoval", company: "Adobe" },
          { name: "Jed Salazar", company: "Edera" },
          { name: "Alexa Griffith", company: "Red Hat" },
        ],
        startsAt: "2026-11-10T16:40:00-07:00",
        endsAt: "2026-11-10T17:10:00-07:00",
        time: "4:40–5:10 PM MST",
        room: "Level 1, Grand Ballroom GI",
        href: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/program/schedule/?id=1248218",
        summary:
          "A platform practitioner, an OpenTelemetry maintainer, a security practitioner, and an AI infrastructure engineer on what platforms must guarantee as AI agents become production workloads: identity, observability, policy, and accountability.",
      },
    ],
  },
];

export const kubeconNa2026Talks = kubeconNa2026Schedule.flatMap((day) => day.talks);

export const kubeconNa2026Highlights = {
  title: "Also at KubeCon",
  items: [
    {
      title: "Observability Day",
      body: "Juraci Paixão Kröhling co-chairs the Observability Day program committee. The day opens on Monday, November 9, at 9:00 AM MST in Salt Palace 250 A-C, with updates from the CNCF observability projects.",
      href: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/co-located-events/observability-day/",
      link: "Observability Day schedule",
    },
    {
      title: "Trust Your Telemetry?",
      body: "Play our game at the booth: real, anonymized OpenTelemetry cases, each with a conclusion that may or may not hold up. You can practice online before you come.",
      href: trustGameMeta.path,
      link: "Play online",
    },
  ],
} as const;

export const kubeconNa2026Booth = {
  title: "Visit us at booth 356",
  body: "Find us in the expo hall from Tuesday to Thursday. Bring your questions about OpenTelemetry instrumentation, telemetry quality, or how OllyGarden Insights and Rose can help your team. If you can't make it to the booth, book time with us instead.",
  cta: "Get in touch",
  ctaHref: "/contact",
} as const;
