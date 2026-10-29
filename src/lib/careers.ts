export const careersMeta = {
  title: "Careers at OllyGarden — Join the Team",
  description:
    "Join OllyGarden and help engineering teams get reliable OpenTelemetry data. See our open roles and how we work.",
  path: "/careers",
} as const;

export const careersHero = {
  badge: "OllyGarden Careers",
  title: ["Join Our Team"],
  lede: "Help us revolutionize telemetry pipelines and empower observability engineers worldwide. Join our mission to build the next generation of observability tools that make complex systems more transparent, reliable and easier to debug. We’re looking for passionate individuals who want to shape the future of distributed systems monitoring.",
  cta: "See Open Positions",
  ctaHref: "#open-positions",
  image: "/images/careers/img-careers-photo.svg",
} as const;

export const careersJoin = {
  eyebrow: "Become an OllyGardener",
  title: "Join OllyGarden",
  lede: "Join a remote-first team working on meaningful challenges in telemetry, observability, and OpenTelemetry®.",
  openApp: {
    title: "Don’t see a matching position?",
    body: "We’re always interested in connecting with talented people who care about observability, OpenTelemetry, and building better telemetry for engineering teams. If that sounds like you, send us an open application.",
    cta: "Submit Open Application",
  },
  empty: {
    title: "No open positions at this time",
    body: "We’re not actively hiring right now, but we’re always happy to hear from people who share our mission. Submit an open application, and we’ll keep you in mind for future opportunities.",
  },
} as const;

export const careersPositionUi = {
  applyLabel: "Apply Now",
  expandLabel: "View More",
  collapseLabel: "View Less",
  lookingForTitle: "What We’re Looking For",
  youWillDoTitle: "What You’ll Do",
  bonusPointsTitle: "Bonus Points",
} as const;

export type CareersPosition = {
  id: string;
  active: boolean;
  title: string;
  location: string;
  time: "Full-time" | "Part-time";
  description: string;
  lookingFor: string[];
  youWillDo: string[];
  bonusPoints: string[];
  href: string;
};

/** A role with its own page under `/careers/<id>`. */
export type CareersRole = CareersPosition & {
  datePosted: string;
  /** schema.org JobPosting employment types, e.g. FULL_TIME or PART_TIME. */
  employmentType: string[];
  /** Country applicants must be in; omit when the role is open to any location. */
  applicantCountry?: string;
  /** Location line in the page hero. */
  locationLine: string;
  intro: string;
  outcomes: string[];
  interviewTitle: string;
  interviewLede: string;
  interview: string[];
  closingTitle: string;
};

export const enterpriseAccountExecutive = {
  id: "founding-enterprise-account-executive",
  active: true,
  title: "Founding Enterprise Account Executive",
  location: "United States",
  time: "Full-time",
  description:
    "Build OllyGarden’s first enterprise sales motion, personally source and close technical deals, and turn what works into a repeatable playbook.",
  lookingFor: [
    "A quantified record of personally sourcing and closing complex B2B infrastructure or developer-tool deals",
    "Credibility with observability, SRE, platform, and engineering buyers",
    "Experience building pipeline without depending on a mature SDR, marketing, or RevOps organization",
    "US-based, with practical access to buyers and relevant observability and infrastructure communities",
  ],
  youWillDo: [
    "Own prospecting, discovery, technical evaluations, proof-of-value conversion, negotiation, procurement, and closing",
    "Refine our ICP, messaging, qualification criteria, forecasting, and objection handling with the founders",
    "Build the lightweight systems and operating rhythm that future sellers can reuse",
    "Hand closed customers cleanly to Customer Success while engineering owns deep technical implementation",
  ],
  bonusPoints: [
    "OpenTelemetry® familiarity and an existing network among observability or infrastructure buyers",
    "Experience working directly with a technical founder",
  ],
  href: "/careers/founding-enterprise-account-executive",
  datePosted: "2026-08-31",
  employmentType: ["FULL_TIME"],
  applicantCountry: "United States",
  locationLine: "United States · Remote · Full-time",
  intro:
    "This is a founding role with direct access to the CEO and broad ownership across the entire enterprise sales cycle. You will prove the motion yourself before helping us scale it.",
  outcomes: [
    "Build qualified pipeline with US observability, platform, SRE, and engineering leaders",
    "Lead technical discovery and evaluations that connect telemetry quality to measurable customer outcomes",
    "Close initial enterprise customers and document a repeatable, evidence-based sales playbook",
    "Establish trustworthy qualification, forecasting, procurement, and founder collaboration rhythms",
  ],
  interviewTitle: "Show us how you sell",
  interviewLede:
    "The process is practical and evidence-led. We want to understand how you create demand, earn technical trust, move complex deals, and learn with a small founding team.",
  interview: [
    "A conversation about the markets you know, the deals you personally sourced and closed, and why OllyGarden interests you",
    "A practical working session using a real account to show how you research, qualify, and open a technical enterprise opportunity",
    "A discovery and deal-strategy exercise with the founders, including how you handle technical proof, objections, and procurement",
    "Reference conversations focused on ownership, forecast accuracy, collaboration, and customer trust",
  ],
  closingTitle: "Ready to build the motion?",
} satisfies CareersRole;

/** Toggle `active` to show/hide a role without deleting its copy. See doc/careers.md. */
export const careersOpenPositions: CareersPosition[] = [
  enterpriseAccountExecutive,
];

export function getActiveCareersPositions() {
  return careersOpenPositions.filter((position) => position.active);
}

export const careersInterview = {
  eyebrow: "What we are looking for",
  title: ["How to Have a", "Successful Interview"],
  lede: "At OllyGarden, we’re looking for thoughtful engineers who care about observability, OpenTelemetry, and building reliable systems. Here’s how to show us your experience, your process, and the way you think.",
  cards: [
    {
      key: "growth",
      title: "Show Us Your Growth",
      body: "Share how you approach projects, how your ideas evolve, and how you decide when something is ready. We want to understand your development process and how you learn over time.",
    },
    {
      key: "code",
      title: "Share Your Code",
      body: "We’d love to see examples of your work, especially projects you’re proud of. Open source contributions, pet projects, or B2B SaaS applications are all relevant.",
    },
    {
      key: "tools",
      title: "Demonstrate Your Tools",
      body: "Show us how you use tools, including AI, to improve productivity, quality, and collaboration. We’re interested in how you choose, use, and adapt your workflow.",
    },
    {
      key: "achievements",
      title: "Celebrate Achievements",
      body: "Tell us about work that made you proud. This is your opportunity to share accomplishments, lessons learned, and the impact you created.",
    },
    {
      key: "passion",
      title: "Express Your Passion",
      body: "Share what excites you about observability, OpenTelemetry, software engineering, or technology in general. Your curiosity and motivation matter as much as your skills.",
    },
    {
      key: "process",
      title: "Present Your Process",
      body: "Walk us through how you test, debug, refactor, and maintain code quality. We want to understand how you think through problems and improve your work.",
    },
  ],
  cta: {
    title: "In Short: Show Us How You Work",
    body: "Our interview process is an opportunity to understand how you think, build, learn, and collaborate. We want to see your code, your process, your passion, and the perspective you would bring to OllyGarden.",
    label: "Submit Application",
  },
} as const;

export const careersApplyForm = {
  title: "Submit an application",
  close: "Close",
  fields: {
    fullName: {
      label: "Full name",
      placeholder: "Ada Lovelace",
    },
    email: {
      label: "Email",
      placeholder: "ada@observability.dev",
    },
    linkedin: {
      label: "LinkedIn",
      placeholder: "https://www.linkedin.com/in/you",
    },
    github: {
      label: "GitHub",
      placeholder: "https://github.com/you",
    },
    coolProject: {
      label: "Tell us something cool you built:",
      placeholder: "A project, a tool, or anything you’re proud of.",
    },
    motivation: {
      label: "Why do you want to become an OllyGardener?",
      placeholder: "Tell us why you want to become a gardener",
    },
  },
  errors: {
    fullName: "Please enter your full name.",
    emailRequired: "Please enter your email.",
    emailInvalid: "Please enter a valid email address.",
  },
  submit: "Submit Application",
  submitting: "Sending…",
  successTitle: "Thanks — we received your application.",
  successBody:
    "A member of our team will get back to you if there’s a fit. In the meantime, feel free to keep exploring.",
  successCta: "Close",
  error:
    "Something went wrong sending your application. Please try again — your details are still here.",
} as const;

export const careersWhy = {
  eyebrow: "Why us",
  title: "Why Join OllyGarden?",
  lede: "Like any healthy garden, we believe people thrive when they have the right environment, trust, and flexibility. At OllyGarden, we’re building a remote-first team where people can do meaningful work on observability, OpenTelemetry, and telemetry quality.",
  cards: [
    {
      key: "remote",
      title: "Remote-First, Equal Benefits",
      body: "Work from wherever you do your best work. Employees and contractors receive exactly the same benefits.",
    },
    {
      key: "timeOff",
      title: "30 Days of Paid Time Off",
      body: "Thirty business days a year on top of your local public holidays, plus your birthday off. We recommend at least five days off every quarter, and sick leave never counts against your PTO.",
    },
    {
      key: "comp",
      title: "Competitive Compensation",
      body: "We offer competitive salary and equity options.",
    },
    {
      key: "learning",
      title: "$1,500 Yearly Learning Budget",
      body: "Spend it on courses, certifications, workshops, books, or conference tickets. OpenTelemetry training from Telemetry Drops and Dose de Telemetria is covered separately.",
    },
    {
      key: "speaking",
      title: "Conference Speaking, Covered",
      body: "Get a talk accepted at KubeCon + CloudNativeCon, Open Source Summit, or OTel Community Day, or become an OpenTelemetry approver, and we cover flights, hotel, tickets, and time to prepare.",
    },
    {
      key: "setup",
      title: "$3,000 Home-Office Setup",
      body: "Choose the laptop, monitor, desk, and chair that work for you, and use a company card for the tools you want to try.",
    },
  ],
} as const;

export const careersIcons = {
  growth:
    "M24 20V41.3333C24 42.0406 24.281 42.7189 24.781 43.219C25.2811 43.719 25.9594 44 26.6667 44H48M29.3333 37.3333C30 34.6667 31.3333 28 34.6667 28C37.3333 28 37.3333 32 40 32C43.3333 32 46 25.3333 46.6667 22.6667",
  code: "M43.9998 37.333L49.3332 31.9997L43.9998 26.6663M27.9998 26.6663L22.6665 31.9997L27.9998 37.333M39.3332 21.333L32.6665 42.6663",
  tools:
    "M35.9998 26.6663V21.333H30.6665M22.6665 34.6663H25.3332M46.6665 34.6663H49.3332M39.9998 33.333V35.9997M31.9998 33.333V35.9997M27.9998 26.6663H43.9998C45.4726 26.6663 46.6665 27.8602 46.6665 29.333V39.9997C46.6665 41.4724 45.4726 42.6663 43.9998 42.6663H27.9998C26.5271 42.6663 25.3332 41.4724 25.3332 39.9997V29.333C25.3332 27.8602 26.5271 26.6663 27.9998 26.6663Z",
  achievements:
    "M29.6131 36.0003L23.5464 25.5203C23.2848 25.0682 23.1618 24.5491 23.1926 24.0276C23.2234 23.5062 23.4067 23.0052 23.7198 22.587L25.8664 19.7337C26.1148 19.4025 26.4369 19.1337 26.8072 18.9485C27.1775 18.7634 27.5858 18.667 27.9998 18.667H43.9998C44.4138 18.667 44.8221 18.7634 45.1923 18.9485C45.5626 19.1337 45.8847 19.4025 46.1331 19.7337L48.2664 22.587C48.5815 23.0039 48.7672 23.5041 48.8004 24.0256C48.8336 24.5471 48.7128 25.0669 48.4531 25.5203L42.3864 36.0003M34.6664 32.0003L26.8264 18.9337M37.3331 32.0003L45.1731 18.9337M30.6664 25.3337H41.3331M35.9998 40.0003V37.3337H35.3331M42.6664 38.667C42.6664 42.3489 39.6817 45.3337 35.9998 45.3337C32.3179 45.3337 29.3331 42.3489 29.3331 38.667C29.3331 34.9851 32.3179 32.0003 35.9998 32.0003C39.6817 32.0003 42.6664 34.9851 42.6664 38.667Z",
  passion:
    "M34.6665 34.6665H37.3332C38.0404 34.6665 38.7187 34.3856 39.2188 33.8855C39.7189 33.3854 39.9998 32.7071 39.9998 31.9999C39.9998 31.2926 39.7189 30.6143 39.2188 30.1142C38.7187 29.6141 38.0404 29.3332 37.3332 29.3332H33.3332C32.5332 29.3332 31.8665 29.5999 31.4665 30.1332L23.9998 37.3332M39.2665 33.8532L41.3326 31.9327M41.3326 31.9327L45.9998 27.5945C46.9278 26.6665 47.9998 25.1332 47.9998 23.6665C48 22.9243 47.7749 22.1995 47.3544 21.588C46.9338 20.9765 46.3376 20.5069 45.6445 20.2415C44.9513 19.9761 44.194 19.9273 43.4725 20.1015C42.7511 20.2757 42.0995 20.6647 41.6038 21.2172C41.5694 21.2546 41.5275 21.2845 41.4809 21.3049C41.4344 21.3253 41.384 21.3359 41.3332 21.3359C41.2823 21.3359 41.232 21.3253 41.1854 21.3049C41.1388 21.2845 41.097 21.2546 41.0625 21.2172C40.5669 20.6647 39.9153 20.2757 39.1938 20.1015C38.4723 19.9273 37.715 19.9761 37.0219 20.2415C36.3288 20.5069 35.7325 20.9765 35.312 21.588C34.8914 22.1995 34.6663 22.9243 34.6665 23.6665C34.6665 25.2665 35.7358 26.6639 36.6665 27.5945L41.3326 31.9327ZM22.6665 35.9999L30.6665 43.9999M29.3332 42.6665L31.4665 40.7999C31.8665 40.2665 32.5332 39.9999 33.3332 39.9999H38.6665C40.1332 39.9999 41.4665 39.4665 42.3998 38.3999L48.5332 32.5332C49.0477 32.047 49.348 31.3762 49.368 30.6686C49.388 29.961 49.1261 29.2744 48.6398 28.7599C48.1536 28.2453 47.4829 27.945 46.7753 27.925C46.0676 27.905 45.381 28.167 44.8665 28.6532",
  process:
    "M22.6665 33.3337C23.3737 33.3337 24.052 33.0527 24.5521 32.5526C25.0522 32.0525 25.3332 31.3742 25.3332 30.667V25.3337C25.3332 24.6264 25.6141 23.9481 26.1142 23.448C26.6143 22.9479 27.2926 22.667 27.9998 22.667C28.7071 22.667 29.3854 22.9479 29.8855 23.448C30.3856 23.9481 30.6665 24.6264 30.6665 25.3337V42.667C30.6665 43.3742 30.9475 44.0525 31.4476 44.5526C31.9476 45.0527 32.6259 45.3337 33.3332 45.3337C34.0404 45.3337 34.7187 45.0527 35.2188 44.5526C35.7189 44.0525 35.9998 43.3742 35.9998 42.667V21.3337C35.9998 20.6264 36.2808 19.9481 36.7809 19.448C37.281 18.9479 37.9593 18.667 38.6665 18.667C39.3737 18.667 40.052 18.9479 40.5521 19.448C41.0522 19.9481 41.3332 20.6264 41.3332 21.3337V38.667C41.3332 39.3742 41.6141 40.0525 42.1142 40.5526C42.6143 41.0527 43.2926 41.3337 43.9998 41.3337C44.7071 41.3337 45.3854 41.0527 45.8855 40.5526C46.3856 40.0525 46.6665 39.3742 46.6665 38.667V33.3337C46.6665 32.6264 46.9475 31.9481 47.4476 31.448C47.9477 30.9479 48.6259 30.667 49.3332 30.667",
  atom: "M40 32C40 34.2091 38.2091 36 36 36M40 32C40 29.7909 38.2091 28 36 28M36 26C36 24.8133 36.3519 23.6533 37.0112 22.6666C37.6705 21.6799 38.6075 20.9109 39.7039 20.4567C40.8003 20.0026 42.0067 19.8838 43.1705 20.1153C44.3344 20.3468 45.4035 20.9182 46.2426 21.7574C47.0818 22.5965 47.6532 23.6656 47.8847 24.8295C48.1162 25.9933 47.9974 27.1997 47.5433 28.2961C47.0892 29.3925 46.3201 30.3295 45.3334 30.9888C44.3467 31.6481 43.1867 32 42 32H40M36 36C33.7909 36 32 34.2091 32 32M36 36V38M32 32C32 29.7909 33.7909 28 36 28M32 32H30M30 32C28.8133 32 27.6533 31.6481 26.6666 30.9888C25.6799 30.3295 24.9109 29.3925 24.4567 28.2961C24.0026 27.1997 23.8838 25.9933 24.1153 24.8295C24.3468 23.6656 24.9182 22.5965 25.7574 21.7574C26.5965 20.9182 27.6656 20.3468 28.8295 20.1153C29.9933 19.8838 31.1997 20.0026 32.2961 20.4567C33.3925 20.9109 34.3295 21.6799 34.9888 22.6666C35.6481 23.6533 36 24.8133 36 26V28M36 38C36 39.1867 35.6481 40.3467 34.9888 41.3334C34.3295 42.3201 33.3925 43.0892 32.2961 43.5433C31.1997 43.9974 29.9933 44.1162 28.8295 43.8847C27.6656 43.6532 26.5965 43.0818 25.7574 42.2426C24.9182 41.4035 24.3468 40.3344 24.1153 39.1705C23.8838 38.0067 24.0026 36.8003 24.4567 35.7039C24.9109 34.6075 25.6799 33.6705 26.6666 33.0112C27.6533 32.3519 28.8133 32 30 32M36 38C36 39.1867 36.3519 40.3467 37.0112 41.3334C37.6705 42.3201 38.6075 43.0892 39.7039 43.5433C40.8003 43.9974 42.0067 44.1162 43.1705 43.8847C44.3344 43.6532 45.4035 43.0818 46.2426 42.2426C47.0818 41.4035 47.6532 40.3344 47.8847 39.1705C48.1162 38.0067 47.9974 36.8003 47.5433 35.7039C47.0892 34.6075 46.3201 33.6705 45.3334 33.0112C44.3467 32.3519 43.1867 32 42 32M30.6667 26.6667L33.1733 29.1733M38.8267 29.1733L41.3333 26.6667M30.6667 37.3333L33.1733 34.8267M38.8267 34.8267L41.3333 37.3333",
  remote:
    "M41.3332 33.3333L48.2972 37.976C48.3976 38.0428 48.5142 38.0811 48.6347 38.0869C48.7551 38.0927 48.8749 38.0656 48.9812 38.0087C49.0875 37.9518 49.1764 37.8671 49.2384 37.7637C49.3003 37.6602 49.3331 37.5419 49.3332 37.4213V26.4933C49.3332 26.376 49.3023 26.2608 49.2435 26.1593C49.1848 26.0577 49.1003 25.9735 48.9986 25.9151C48.8969 25.8566 48.7815 25.8261 48.6642 25.8265C48.5469 25.8269 48.4318 25.8582 48.3305 25.9173L41.3332 30M25.3332 24H38.6665C40.1393 24 41.3332 25.1939 41.3332 26.6667V37.3333C41.3332 38.8061 40.1393 40 38.6665 40H25.3332C23.8604 40 22.6665 38.8061 22.6665 37.3333V26.6667C22.6665 25.1939 23.8604 24 25.3332 24Z",
  tech: "M35.9998 42.667V45.3337M35.9998 18.667V21.3337M42.6665 42.667V45.3337M42.6665 18.667V21.3337M22.6665 32.0003H25.3332M22.6665 38.667H25.3332M22.6665 25.3337H25.3332M46.6665 32.0003H49.3332M46.6665 38.667H49.3332M46.6665 25.3337H49.3332M29.3332 42.667V45.3337M29.3332 18.667V21.3337M27.9998 21.3337H43.9998C45.4726 21.3337 46.6665 22.5276 46.6665 24.0003V40.0003C46.6665 41.4731 45.4726 42.667 43.9998 42.667H27.9998C26.5271 42.667 25.3332 41.4731 25.3332 40.0003V24.0003C25.3332 22.5276 26.5271 21.3337 27.9998 21.3337ZM31.9998 26.667H39.9998C40.7362 26.667 41.3332 27.2639 41.3332 28.0003V36.0003C41.3332 36.7367 40.7362 37.3337 39.9998 37.3337H31.9998C31.2635 37.3337 30.6665 36.7367 30.6665 36.0003V28.0003C30.6665 27.2639 31.2635 26.667 31.9998 26.667Z",
  comp: "M35.9998 40H25.3332C24.6259 40 23.9476 39.719 23.4476 39.219C22.9475 38.7189 22.6665 38.0406 22.6665 37.3333V26.6667C22.6665 25.9594 22.9475 25.2811 23.4476 24.781C23.9476 24.281 24.6259 24 25.3332 24H46.6665C47.3737 24 48.052 24.281 48.5521 24.781C49.0522 25.2811 49.3332 25.9594 49.3332 26.6667V33.3333M43.9998 32H44.0132M45.3332 45.3333V37.3333M41.3332 41.3333L45.3332 37.3333L49.3332 41.3333M27.9998 32H28.0132M38.6665 32C38.6665 33.4728 37.4726 34.6667 35.9998 34.6667C34.5271 34.6667 33.3332 33.4728 33.3332 32C33.3332 30.5272 34.5271 29.3333 35.9998 29.3333C37.4726 29.3333 38.6665 30.5272 38.6665 32Z",
  balance:
    "M36.6668 30.8454L44.2614 44.0001M48.0001 44.0001H24.0001M47.2334 23.0654C45.1892 20.7966 42.4281 19.2984 39.4117 18.8211C36.3954 18.3438 33.3066 18.9165 30.6618 20.4433C28.0169 21.9702 25.9764 24.3586 24.8813 27.2094C23.7863 30.0602 23.703 33.2006 24.6454 36.1054C24.8894 36.8561 25.7694 37.1374 26.4521 36.7427L46.8801 24.9481C47.5628 24.5534 47.7614 23.6521 47.2334 23.0654Z",
  proGrowth:
    "M41.3335 21.3337H44.0002C44.7074 21.3337 45.3857 21.6146 45.8858 22.1147C46.3859 22.6148 46.6668 23.2931 46.6668 24.0003V42.667C46.6668 43.3742 46.3859 44.0525 45.8858 44.5526C45.3857 45.0527 44.7074 45.3337 44.0002 45.3337H28.0002C27.2929 45.3337 26.6146 45.0527 26.1145 44.5526C25.6144 44.0525 25.3335 43.3742 25.3335 42.667V24.0003C25.3335 23.2931 25.6144 22.6148 26.1145 22.1147C26.6146 21.6146 27.2929 21.3337 28.0002 21.3337H30.6668M32.0002 34.667L34.6668 37.3337L40.0002 32.0003M32.0002 18.667H40.0002C40.7365 18.667 41.3335 19.2639 41.3335 20.0003V22.667C41.3335 23.4034 40.7365 24.0003 40.0002 24.0003H32.0002C31.2638 24.0003 30.6668 23.4034 30.6668 22.667V20.0003C30.6668 19.2639 31.2638 18.667 32.0002 18.667Z",
} as const;
