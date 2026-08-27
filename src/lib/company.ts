export const companyMeta = {
  title: "Our Company — OllyGarden",
  path: "/company",
} as const;

export const companyHero = {
  badge: "Our Company",
  title: ["Cultivating Clarity", "in Observability"],
  ledes: [
    "At OllyGarden, we believe reliable systems start with high-quality telemetry. Founded by OpenTelemetry contributors, OllyGarden helps engineering teams identify bad telemetry, improve instrumentation at the source, reduce unnecessary observability costs, and get more value from their data — no matter which backend they use.",
    "Our mission is to make telemetry cleaner, more trustworthy, and easier to use, so engineers, teams, and AI agents can work from reliable signals.",
  ],
  image: {
    src: "/images/company/img-company-hero.png",
    alt: "The OllyGarden team together in Budapest",
  },
} as const;

export const companyStory = {
  eyebrow: "How we started",
  title: "From Community Roots to Company Vision",
  lede: "OllyGarden was born from real-world experience in the OpenTelemetry ecosystem and a clear belief that telemetry should be useful, trustworthy, and efficient from the moment it is generated.",
  cards: [
    {
      icon: "wand",
      title: "Why we built OllyGarden",
      paragraphs: [
        "OllyGarden began with a simple observation: while OpenTelemetry felt intuitive to those deeply involved in the project, many teams still struggled to understand, implement, and maintain it effectively. This gap between powerful standards and practical adoption sparked the idea for a company dedicated to making telemetry easier to understand, improve, and trust — with products purpose-built for busy Observability Engineers.",
        "Because OllyGarden is not a traditional observability backend vendor, we can focus on a clear and unambiguous goal: improving the efficiency of your telemetry pipelines.",
      ],
    },
    {
      icon: "olly",
      title: "The Name “OllyGarden”",
      paragraphs: [
        "The name ‘OllyGarden’ reflects our connection to the observability (‘o11y’) and OpenTelemetry communities, as well as our belief that high-quality telemetry must be carefully cultivated. Just like a healthy garden, reliable observability depends on the quality of what is planted, maintained, and allowed to grow. At OllyGarden, we help teams nurture cleaner, more trustworthy telemetry so they can gain more value from their observability data.",
      ],
    },
  ],
} as const;

export const companyMission = {
  eyebrow: "What Moves Us",
  title: "Efficient telemetry starts at the source",
  lede: "Good observability begins with purposeful instrumentation. OllyGarden helps teams improve telemetry quality before data reaches the backend, so engineers and AI agents can work from cleaner, more reliable signals.",
  cards: [
    {
      eyebrow: "Our Mission",
      title: "To improve the efficiency of telemetry pipelines",
      body: "We strive to empower engineering teams by providing tools and insights that simplify the complexities of telemetry management, reduce waste, and make observability more accessible and cost-effective.",
    },
    {
      eyebrow: "Our Vision",
      title: "Companies confidently generating, collecting, and storing the telemetry they need, without excess",
      body: "We envision a future where ‘bad telemetry’ is a rarity, where instrumentation is purposeful, and where observability data consistently delivers profound value, driving better software and more resilient systems.",
    },
  ],
} as const;

export const companyPrinciples = {
  eyebrow: "Our Principles",
  title: "What We Stand For",
  lede: "These are the principles that guide how we build products, work as a team, and collaborate with the broader observability community.",
  cards: [
    {
      id: "a",
      title: "Efficiency",
      body: "We focus on making telemetry pipelines more efficient, reducing waste, and helping every signal serve a clear purpose.",
      className: "min-[1101px]:top-[122px] min-[1101px]:left-[58px]",
    },
    {
      id: "b",
      title: "Community & Collaboration",
      body: "We believe in collaboration within our team and with the broader open-source, OpenTelemetry, and observability communities.",
      className: "min-[1101px]:top-[84px] min-[1101px]:right-[43px] min-[1101px]:left-auto",
    },
    {
      id: "c",
      title: "Clarity & Transparency",
      body: "We believe in straightforward communication, open processes, and clear insights teams can understand and act on.",
      className: "min-[1101px]:top-[453px] min-[1101px]:left-[86px]",
    },
    {
      id: "d",
      title: "Continuous Learning",
      body: "Observability and OpenTelemetry are always evolving. We are committed to learning, improving, and adapting to meet new challenges.",
      className: "min-[1101px]:top-[473px] min-[1101px]:left-[720px]",
    },
    {
      id: "e",
      title: "Pragmatism & Actionability",
      body: "We focus on real-world telemetry problems and deliver practical, actionable solutions that make a measurable difference.",
      className: "min-[1101px]:top-[365px] min-[1101px]:right-[58px] min-[1101px]:left-auto",
    },
  ],
} as const;

export type CompanyMember = {
  name: string;
  role: string;
  img: string;
  bio: string;
  linkedin: string;
  github?: string;
};

export const companyTeamMembers = {
  juraci: {
    name: "Juraci Paixão Kröhling",
    role: "Co-founder",
    img: "/images/company/team-juraci.jpg",
    bio: "A Brazilian software engineer based in Germany since 2011, Juraci brings extensive experience from open-source leaders like Red Hat and Grafana Labs. He is a highly respected OpenTelemetry project leader, serving on the Governance Committee, a CNCF Ambassador, and the creator of key OTel tools like the OTel Collector Builder, Operator, and OTel Collector load-balancer. With six patents in telemetry and security, Juraci is passionate about solving complex observability challenges and fostering the OTel community.",
    linkedin: "https://www.linkedin.com/in/jpkroehling/",
    github: "https://github.com/jpkrohling",
  },
  arianna: {
    name: "Arianna Vespri",
    role: "Founding Backend Engineer",
    img: "/images/company/team-arianna.jpg",
    bio: "Arianna is a talented backend engineer passionate about building robust distributed systems. At OllyGarden, she contributes to the development of our core platform services, helping deliver powerful observability capabilities to our customers.",
    linkedin: "https://www.linkedin.com/in/arianna-v-aa951b271/",
  },
  erika: {
    name: "Erika Kido Hahn",
    role: "Founding Marketing Lead",
    img: "/images/company/team-erika.jpg",
    bio: "Erika leads OllyGarden's marketing efforts, crafting strategies to build brand awareness and drive customer engagement. She develops content, supports community outreach, and collaborates with engineering and product teams on go-to-market initiatives.",
    linkedin: "https://www.linkedin.com/in/erika-kido-hahn/",
  },
  catalina: {
    name: "Catalina Syddall",
    role: "Founding Engineer",
    img: "/images/company/team-catalina.jpg",
    bio: "Catalina thrives on turning complex problems into clean, maintainable code—crafting delightful, performant user experiences. With hands-on experience across startups and scale-ups, she brings deep knowledge of modern frontend frameworks to help build OllyGarden's products.",
    linkedin: "https://www.linkedin.com/in/catalina-syddall-93647411b/",
  },
  lanay: {
    name: "Lanay Marques",
    role: "Founding Platform Engineer",
    img: "/images/company/team-lanay.jpg",
    bio: "Lanay builds and maintains the platform foundations that keep OllyGarden reliable and scalable. She focuses on infrastructure, developer experience, and the systems that let the team ship high-quality telemetry tooling with confidence.",
    linkedin: "https://www.linkedin.com/in/lanaymarques/",
  },
  nicolas: {
    name: "Nicolas Wörner",
    role: "Founding AI Engineer",
    img: "/images/company/team-nicolas.jpg",
    bio: "Nicolas works at the intersection of AI and observability, building intelligent tooling that helps teams make sense of their telemetry. He explores how machine learning can surface insights and improve the quality of instrumentation at scale.",
    linkedin: "https://www.linkedin.com/in/nicolas-woerner/",
  },
  jonathan: {
    name: "Jonathan Silva",
    role: "Founding Backend Engineer",
    img: "/images/company/team-jonathan.jpg",
    bio: "Jonathan is a backend engineer focused on building robust, high-performance services. At OllyGarden, he develops the core systems that power telemetry analysis, helping teams deliver reliable observability at scale.",
    linkedin: "https://www.linkedin.com/in/jjneno/",
    github: "https://github.com/perebaj",
  },
  leandro: {
    name: "Leandro Caracciolo",
    role: "Founding Designer",
    img: "/images/company/team-leandro.jpg",
    bio: "Leandro shapes the look and feel of OllyGarden, turning complex observability workflows into clear, intuitive experiences. He leads product and brand design, crafting interfaces that make high-quality telemetry approachable for every team.",
    linkedin: "https://www.linkedin.com/in/leandrocaracciolo/",
  },
  darby: {
    name: "Darby Huye",
    role: "Founding Software Engineer",
    img: "/images/company/team-darby.jpg",
    bio: "Darby moved into industry from academic research on distributed tracing and characterizing large distributed systems. At OllyGarden, she works on Rose, our AI code review agent, bringing that research perspective to the everyday problem of getting instrumentation right.",
    linkedin: "https://www.linkedin.com/in/darby-huye-a98b76160/",
  },
} as const satisfies Record<string, CompanyMember>;

export const companyTeamSlides = [
  { tall: "juraci", stack: ["arianna", "erika"] },
  { tall: "catalina", stack: ["lanay", "nicolas"] },
  { tall: "jonathan", stack: ["leandro", "darby"] },
] as const;

export const companyTeam = {
  eyebrow: "Our Team",
  title: "The OllyGardeners",
  lede: "OllyGarden is powered by a dedicated team of engineers and strategists with deep roots in OpenTelemetry and a shared passion for efficient observability.",
} as const;

export const companyOpenSource = {
  eyebrow: "Open Source",
  title: "Rooted in Open Source",
  lede: "Open source is at the heart of OllyGarden. We actively contribute to OpenTelemetry and believe in building observability through open, collaborative innovation.",
  cardTitle: "The Instrumentation Score Initiative",
  href: "https://github.com/instrumentation-score/spec",
  linkLabel: "Instrumentation Score",
  cta: "View on GitHub",
} as const;
