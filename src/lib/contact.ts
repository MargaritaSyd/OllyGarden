export const contactMeta = {
  title: "Contact Us — OllyGarden",
  path: "/contact",
} as const;

export const contactEmail = "contact@olly.garden";

export const contactHero = {
  badge: "Contact Us",
  title: ["Let’s Talk About", "Your Telemetry"],
  lede: "Whether you’re interested in learning more about OllyGarden Insights, the Instrumentation Score, potential partnerships, or have any other questions, our team is ready to connect. Please use the options below to reach out.",
  connect: {
    title: "Connect with us",
    body: "Follow our work and connect with us on social media:",
  },
  email: {
    title: "Direct Email",
    body: "For the fastest response to specific inquiries, please use our contact form. For general correspondence:",
  },
} as const;

export const contactForm = {
  title: "Get in Touch",
  fields: {
    name: {
      label: "Name",
      placeholder: "Ada Lovelace",
    },
    email: {
      label: "Work email",
      placeholder: "ada@observability.dev",
    },
    message: {
      label: "Message",
      placeholder: "Type your message",
    },
  },
  errors: {
    name: "Please enter your name.",
    emailRequired: "Please enter your work email.",
    emailInvalid: "Please enter a valid email address.",
  },
  submit: "Send Message",
  submitting: "Sending…",
  successTitle: "Thanks — your message is on its way.",
  successBody:
    "We’ve received your note and a member of our team will get back to you shortly. In the meantime, feel free to keep exploring.",
  successCta: "Back to Home",
  error:
    "Something went wrong sending your message. Please try again — your details are still here.",
} as const;

export const contactHelp = {
  eyebrow: "Solutions",
  title: "How Can We Help?",
  lede: "We’d love to hear from you.",
  cards: [
    {
      key: "insights",
      title: "Product Insights & Demos",
      body: "Learn more about OllyGarden Insights and how our Instrumentation Score can benefit your team.",
    },
    {
      key: "score",
      title: "Instrumentation Score Initiative",
      body: "Questions, feedback, or interest in collaborating on the open Instrumentation Score specification.",
    },
    {
      key: "partnership",
      title: "Partnership Opportunities",
      body: "Explore how we can work together to improve the observability ecosystem.",
    },
    {
      key: "press",
      title: "Press & Media",
      body: "For media inquiries, interviews, or press-related questions, please reach out.",
    },
  ],
  stripes: [
    {
      key: "team",
      title: "Join our Team",
      body: "Interested in joining our team? Visit our Careers page to see open positions.",
      cta: "View Open Positions",
      href: "/careers",
    },
    {
      key: "about",
      title: "About Our Company",
      body: "OllyGarden is a fully remote, post-geographic company, allowing us to work with the best talent and serve clients globally. Our distributed team approach enables us to provide round-the-clock support and diverse perspectives on observability challenges.",
      cta: "About Us",
      href: "/company",
    },
  ],
} as const;

export const contactIcons = {
  insights:
    "M32 26.6667H41.3333M30.6667 32H38.6667M34.6667 37.3333H41.3333M26.6667 20H45.3333C46.8061 20 48 21.1939 48 22.6667V41.3333C48 42.8061 46.8061 44 45.3333 44H26.6667C25.1939 44 24 42.8061 24 41.3333V22.6667C24 21.1939 25.1939 20 26.6667 20Z",
  score:
    "M33.4667 18.9089C35.1401 18.5851 36.86 18.5851 38.5334 18.9089M38.5334 45.0902C36.86 45.4141 35.1401 45.4141 33.4667 45.0902M43.4787 20.9596C44.894 21.9185 46.1117 23.1407 47.0654 24.5596M22.9094 34.5329C22.5855 32.8595 22.5855 31.1396 22.9094 29.4662M47.0401 39.4796C46.0811 40.8949 44.8589 42.1125 43.4401 43.0662M49.0907 29.4662C49.4146 31.1396 49.4146 32.8595 49.0907 34.5329M24.9614 24.5209C25.9203 23.1056 27.1425 21.8879 28.5614 20.9342M28.2174 44.1556L24.3427 45.2889C24.1231 45.3472 23.8922 45.3485 23.6719 45.2925C23.4516 45.2365 23.2493 45.1251 23.0842 44.9689C22.9191 44.8128 22.7967 44.617 22.7285 44.4002C22.6603 44.1834 22.6487 43.9528 22.6947 43.7302L23.9814 39.7569",
  partnership:
    "M34.6667 38.6664L37.3334 41.333C37.5961 41.5957 37.9079 41.804 38.251 41.9462C38.5942 42.0883 38.962 42.1615 39.3334 42.1615C39.7049 42.1615 40.0726 42.0883 40.4158 41.9462C40.759 41.804 41.0708 41.5957 41.3334 41.333C41.5961 41.0704 41.8044 40.7586 41.9465 40.4154C42.0887 40.0723 42.1618 39.7045 42.1618 39.333C42.1618 38.9616 42.0887 38.5938 41.9465 38.2506C41.8044 37.9075 41.5961 37.5957 41.3334 37.333M38.6667 34.6664L42.0001 37.9997C42.5305 38.5301 43.2499 38.8281 44.0001 38.8281C44.7502 38.8281 45.4697 38.5301 46.0001 37.9997C46.5305 37.4693 46.8285 36.7498 46.8285 35.9997C46.8285 35.2495 46.5305 34.5301 46.0001 33.9997L40.8267 28.8264C40.0767 28.0773 39.0601 27.6565 38.0001 27.6565C36.9401 27.6565 35.9234 28.0773 35.1734 28.8264L34.0001 29.9997C33.4696 30.5301 32.7502 30.8281 32.0001 30.8281C31.2499 30.8281 30.5305 30.5301 30.0001 29.9997C29.4696 29.4693 29.1717 28.7498 29.1717 27.9997C29.1717 27.2495 29.4696 26.5301 30.0001 25.9997L33.7467 22.253C34.9631 21.0399 36.5493 20.2671 38.2543 20.057C39.9593 19.8469 41.6856 20.2115 43.1601 21.093L43.7868 21.4664C44.3545 21.809 45.0295 21.9279 45.6801 21.7997L48.0001 21.333M48.0001 19.9997L49.3334 34.6664H46.6667M24.0001 19.9997L22.6667 34.6664L31.3334 43.333C31.8638 43.8635 32.5833 44.1615 33.3334 44.1615C34.0836 44.1615 34.803 43.8635 35.3334 43.333C35.8638 42.8026 36.1618 42.0832 36.1618 41.333C36.1618 40.5829 35.8638 39.8635 35.3334 39.333M24.0001 21.333H34.6667",
  press:
    "M40.0001 40.0003H33.3334M44.0001 34.667H33.3334M25.3334 45.3337H46.6667C47.374 45.3337 48.0523 45.0527 48.5524 44.5526C49.0525 44.0525 49.3334 43.3742 49.3334 42.667V21.3337C49.3334 20.6264 49.0525 19.9481 48.5524 19.448C48.0523 18.9479 47.374 18.667 46.6667 18.667H30.6667C29.9595 18.667 29.2812 18.9479 28.7811 19.448C28.281 19.9481 28.0001 20.6264 28.0001 21.3337V28.0003M25.3334 45.3337C26.0407 45.3337 26.7189 45.0527 27.219 44.5526C27.7191 44.0525 28.0001 43.3742 28.0001 42.667V28.0003M25.3334 45.3337C24.6262 45.3337 23.9479 45.0527 23.4478 44.5526C22.9477 44.0525 22.6667 43.3742 22.6667 42.667V30.667C22.6667 29.9597 22.9477 29.2815 23.4478 28.7814C23.9479 28.2813 24.6262 28.0003 25.3334 28.0003H28.0001M34.6667 24.0003H42.6667C43.4031 24.0003 44.0001 24.5973 44.0001 25.3337V28.0003C44.0001 28.7367 43.4031 29.3337 42.6667 29.3337H34.6667C33.9304 29.3337 33.3334 28.7367 33.3334 28.0003V25.3337C33.3334 24.5973 33.9304 24.0003 34.6667 24.0003Z",
  team: "M44.0001 44C44.0001 41.171 42.8763 38.4579 40.8759 36.4575C38.8755 34.4571 36.1624 33.3333 33.3334 33.3333M33.3334 33.3333C30.5044 33.3333 27.7913 34.4571 25.7909 36.4575C23.7906 38.4579 22.6667 41.171 22.6667 44M33.3334 33.3333C37.0153 33.3333 40.0001 30.3486 40.0001 26.6667C40.0001 22.9848 37.0153 20 33.3334 20C29.6515 20 26.6667 22.9848 26.6667 26.6667C26.6667 30.3486 29.6515 33.3333 33.3334 33.3333ZM49.3334 42.6667C49.3334 38.1733 46.6667 34 44.0001 32C44.8766 31.3424 45.5776 30.4788 46.0408 29.4857C46.5041 28.4926 46.7154 27.4006 46.6561 26.3064C46.5968 25.2122 46.2686 24.1494 45.7007 23.2123C45.1328 22.2751 44.3426 21.4923 43.4001 20.9333",
} as const;

export type ContactHelpIcon = keyof typeof contactIcons;
