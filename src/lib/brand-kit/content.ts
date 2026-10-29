export const brandKitMeta = {
  title: "OllyGarden Brand Kit — Logos, Colour, and Type",
  description:
    "Logos, colours, Space Grotesk, icons, and photography for the OllyGarden brand, with the rules for using each and files ready to download.",
  path: "/resources/brand-kit",
  reviewed: "1 October 2026",
} as const;

export const brandKitHero = {
  title: "The OllyGarden Brand Kit",
  lede: "Everything you need to use the OllyGarden brand: the guideline, the logos, the colours, the fonts, the icons and the photography, ready to download. Every rule below comes with something to try, so you can see it work before you take the files.",
} as const;

export const brandKitLinks = {
  guideline: "https://drive.google.com/file/d/1x1BeOCLWhpXUmky1-20mvYdFMyOgzHe9/view",
  logos: "https://drive.google.com/drive/folders/1JJFkDPgwdTp8MfTOyO_ZPJlqq21IFL6M",
  fonts: "https://drive.google.com/drive/folders/1hgZ4DpkRXV64vc12WfCvmxjkS9mAvE0L",
  icons: "https://claude.ai/artifact/PyAfco8XFhKr6W7MbvcwmY",
  photos: "https://claude.ai/artifact/Xgzs6HAqZWKKtaM69oJzQH",
  photoOriginals: "https://drive.google.com/drive/folders/1nFY2s2XPf3dm9sYZIpDxB0xKLxuUTbei",
} as const;

export type BrandDownload = {
  id: string;
  title: string;
  source: string;
  description: string;
  cta: string;
  url: string;
  art?: string;
  extra?: { label: string; url: string };
};

export const brandKitDownloads: readonly BrandDownload[] = [
  {
    id: "guideline",
    title: "Brand guideline",
    source: "PDF · Drive",
    description:
      "Logo, logo variations and construction, colour palette, typography, and the visual style: pixel pattern, icons, imagery. 15 pages, updated 19 February 2026.",
    cta: "Open the guideline",
    url: brandKitLinks.guideline,
    art: "/images/brand-kit/guideline-cover.jpg",
  },
  {
    id: "logos",
    title: "Logos",
    source: "SVG + PNG · Drive",
    description:
      "OllyGarden and every product, horizontal and vertical, full colour for dark or light backgrounds, and one-colour white or dark. SVG and PNG, ready to download.",
    cta: "Get the logos",
    url: brandKitLinks.logos,
  },
  {
    id: "fonts",
    title: "Fonts",
    source: "ZIP · Drive",
    description:
      "Space Grotesk for interface and text, five weights. Inconsolata for code, one variable file. One zip with the licence and a short readme. Both are free under the OFL, so you can pass them to agencies and partners.",
    cta: "Download the fonts",
    url: brandKitLinks.fonts,
  },
  {
    id: "icons",
    title: "Icon Library",
    source: "Library",
    description:
      "Every icon we use, in one place: the product set and the heavier marketing set, each one saying what it means. Search by meaning, then download the SVG or a PNG.",
    cta: "Open the Icon Library",
    url: brandKitLinks.icons,
    art: "/images/brand-kit/icon-pattern.jpg",
  },
  {
    id: "photos",
    title: "Photo Library",
    source: "Library",
    description:
      "All 22 photographs, already dithered in the OllyGarden greens and yellow. Search the scene, filter by who is in the frame and by shape, then download. Use these instead of stock photos; the treatment is baked in, so place them as they are.",
    cta: "Open the Photo Library",
    url: brandKitLinks.photos,
    art: "/images/brand-kit/photo-library.webp",
    extra: { label: "Originals in Drive", url: brandKitLinks.photoOriginals },
  },
];

export const brandKitJump = [
  { id: "logo", label: "Logo", icon: "target" },
  { id: "colour", label: "Colour", icon: "petals" },
  { id: "type", label: "Typography", icon: "list-bars" },
  { id: "pattern", label: "Pixel pattern", icon: "processor" },
  { id: "icons", label: "Icons", icon: "flower" },
  { id: "imagery", label: "Imagery", icon: "sun" },
] as const;

export const brandKitDock = [
  { id: "downloads", label: "Downloads", icon: "layers" },
  ...brandKitJump,
] as const;

export const sunflowerGlow = "#D1D100";
export const deepForest = "#00280E";
export const sproutGreen = "#0EAD47";
export const morningMist = "#FAF9F0";

/** Tiles scattered into the pixel pattern, besides the sunflower field. */
export const patternFill = [
  "#E3E270",
  "#E3E270",
  "#9DA704",
  "#9DA704",
  "#697D07",
  "#34520B",
  "#076B2B",
  sproutGreen,
] as const;

/** Click order for a pattern tile. */
export const patternPalette = [
  sunflowerGlow,
  morningMist,
  "#E3E270",
  "#9DA704",
  "#697D07",
  "#34520B",
  deepForest,
  "#076B2B",
  sproutGreen,
] as const;

export const patternRows = 16;

export const logoGrounds = [
  { id: "forest", label: "Deep Forest", color: deepForest, guide: sunflowerGlow },
  { id: "mist", label: "Morning Mist", color: morningMist, guide: "#697D07" },
  { id: "sunflower", label: "Sunflower", color: sunflowerGlow, guide: deepForest },
  { id: "sprout", label: "Sprout", color: sproutGreen, guide: deepForest },
] as const;

export type LogoGroundId = (typeof logoGrounds)[number]["id"];
export type LogoLayout = "horizontal" | "vertical";

export type BrandLogo = {
  id: "ollygarden" | "rose" | "insights";
  name: string;
  note: string;
  vertical: boolean;
  stage: Record<LogoGroundId, string>;
  files: readonly { label: string; file: string }[];
};

export const brandLogos: readonly BrandLogo[] = [
  {
    id: "ollygarden",
    name: "OllyGarden",
    note: "A large oval with a smaller circle inside, beside a wordmark set in Space Grotesk Bold: the balance between nature and technology, with a nod to observability.",
    vertical: false,
    stage: {
      forest: "ollygarden-logo-full-color-dark-bg.svg",
      mist: "ollygarden-logo-full-color-light-bg.svg",
      sunflower: "ollygarden-logo-monochrome-white.svg",
      sprout: "ollygarden-logo-monochrome-white.svg",
    },
    files: [
      { label: "Full colour, dark background", file: "ollygarden-logo-full-color-dark-bg.svg" },
      { label: "Full colour, light background", file: "ollygarden-logo-full-color-light-bg.svg" },
      { label: "One colour, white", file: "ollygarden-logo-monochrome-white.svg" },
      { label: "One colour, dark", file: "ollygarden-logo-monochrome-dark.svg" },
    ],
  },
  {
    id: "rose",
    name: "Rose",
    note: "OllyGarden Rose, the AI instrumentation agent that fixes instrumentation at the source.",
    vertical: true,
    stage: {
      forest: "rose-logo-{l}-full-color-dark-bg.svg",
      mist: "rose-logo-{l}-full-color-light-bg.svg",
      sunflower: "rose-logo-{l}-monochrome-dark.svg",
      sprout: "rose-logo-{l}-monochrome-white.svg",
    },
    files: [
      { label: "Full colour, dark background", file: "rose-logo-{l}-full-color-dark-bg.svg" },
      { label: "Full colour, light background", file: "rose-logo-{l}-full-color-light-bg.svg" },
      { label: "One colour, white", file: "rose-logo-{l}-monochrome-white.svg" },
      { label: "One colour, dark", file: "rose-logo-{l}-monochrome-dark.svg" },
    ],
  },
  {
    id: "insights",
    name: "Insights",
    note: "OllyGarden Insights, which analyzes and scores telemetry quality.",
    vertical: true,
    stage: {
      forest: "insights-logo-{l}-full-color-dark-bg.svg",
      mist: "insights-logo-{l}-full-color-light-bg.svg",
      sunflower: "insights-logo-{l}-dark-text-light-bg.svg",
      sprout: "insights-logo-{l}-monochrome-white.svg",
    },
    files: [
      { label: "Full colour, dark background", file: "insights-logo-{l}-full-color-dark-bg.svg" },
      { label: "Full colour, light background", file: "insights-logo-{l}-full-color-light-bg.svg" },
      { label: "One colour, white", file: "insights-logo-{l}-monochrome-white.svg" },
      { label: "One colour, dark", file: "insights-logo-{l}-dark-text-light-bg.svg" },
    ],
  },
];

export function logoSrc(file: string, layout: LogoLayout = "horizontal") {
  return `/images/brand-kit/logos/${file.replace("{l}", layout)}`;
}

export const logoVariations = [
  { title: "Full logo with wordmark", text: "The standard version, for most applications." },
  { title: "Symbol only", text: "For small-scale or limited-space uses, keeping it recognisable." },
  {
    title: "Gradient version",
    text: "Adds depth and dimension while keeping proportions and structure the same.",
  },
  {
    title: "Flat, full-colour version",
    text: "For simpler applications, or wherever a gradient does not suit.",
  },
] as const;

export const logoConstruction = [
  {
    title: "Construction",
    text: "One large oval and one smaller circle. The inner circle aligns to the left, and the centre of the large oval lines up with the white space of the small circle.",
  },
  {
    title: "Gradient",
    text: "The large oval fades from 0% to 100% transparency at 45°, the small circle from 0% to 50% at 60°. Small adjustments that add depth and keep the harmony.",
  },
  {
    title: "Grid and clear space",
    text: "A modular grid aligns the symbol and the wordmark at any size. Around the logo, keep clear space equal to the diameter of the inner circle.",
  },
] as const;

export const brandColours = [
  {
    name: "Sunflower Glow",
    hex: sunflowerGlow,
    rgb: "209 209 0",
    ink: deepForest,
    role: "The vibrant yellow that makes the brand stand out in the tech market, giving OllyGarden energy and visibility.",
  },
  {
    name: "Deep Forest",
    hex: deepForest,
    rgb: "0 40 14",
    ink: morningMist,
    role: "The grounding dark. It carries hierarchy, readability and balance across every application.",
  },
  {
    name: "Sprout Green",
    hex: sproutGreen,
    rgb: "14 173 71",
    ink: morningMist,
    role: "Complements the yellow naturally and strengthens the botanical connection. Works as a base or as an accent.",
  },
  {
    name: "Morning Mist",
    hex: morningMist,
    rgb: "250 249 240",
    ink: deepForest,
    role: "The neutral partner to Deep Forest. Together they carry hierarchy, readability and balance across every application.",
  },
] as const;

export const intermediaryTones = ["#E3E270", "#9DA704", "#697D07", "#34520B", "#076B2B"] as const;

export const colourPairs = [
  { bg: morningMist, fg: deepForest, mark: sunflowerGlow, markFg: deepForest },
  { bg: "#34520B", fg: morningMist, mark: sproutGreen, markFg: morningMist },
  { bg: deepForest, fg: morningMist, mark: "#9DA704", markFg: morningMist },
  { bg: morningMist, fg: "#697D07", mark: "#E3E270", markFg: "#697D07" },
] as const;

export const typeWeights = [
  { label: "Light", value: "300" },
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "SemiBold", value: "600" },
  { label: "Bold", value: "700" },
] as const;

export const typeSample = "There’s a lot of bad telemetry out there.";

export const typeGlyphs =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

export const typeCode = `processors:
  batch:
    timeout: 5s
exporters:
  otlp:
    endpoint: collector:4317`;

export const patternRules = [
  {
    title: "8 or 16 tiles on the short side",
    text: "Size the pattern to each asset: put 8 or 16 square tiles along its short side, then repeat them across the whole asset with no gaps or overlaps.",
  },
  {
    title: "About 75% in one colour",
    text: "Colour each tile from the brand palette, keeping nearly three in four of them the same. With a partner, use their main colour for a few tiles.",
  },
  {
    title: "Text sits in solid zones",
    text: "Put text on solid colour, align text and images to the tile edges, and use the palette for maximum contrast.",
  },
] as const;

export const iconGrounds = [
  { value: "forest", label: "On Deep Forest", bg: deepForest, fg: sunflowerGlow },
  { value: "sunflower", label: "On Sunflower", bg: sunflowerGlow, fg: deepForest },
  { value: "mist", label: "On Morning Mist", bg: morningMist, fg: "#9DA704" },
] as const;

export const iconIntro =
  "OllyGarden icons reflect OpenTelemetry, modern technology and botanical elements. Work only with the icons shown here; every new one is reviewed carefully. Each pattern shape can turn or flip in 90° steps: hover one to see it, click to download its SVG.";

/** Highlight to shadow. Dithering walks the reversed ramp, darkest first. */
export const bitmapRamp = ["#E3E270", "#D1D100", "#9DA704", "#697D07", "#34520B", deepForest] as const;

export const imagerySample = "/images/brand-kit/sample.webp";

export const imageryRules = [
  {
    title: "Five or six greens",
    text: "Dither with the green brand palette, matching each shade's brightness to the lights and shadows of the image.",
  },
  {
    title: "Floyd–Steinberg, factor 70–90",
    text: "Floyd–Steinberg is the recommended method. A higher factor looks noisy and flat; a lower one adds contrast and hides small details.",
  },
  {
    title: "Size 40–50",
    text: "Size sets the level of detail: the bigger the asset, the higher the number. Too high on a small asset and the bitmap effect disappears.",
  },
] as const;

export const brandKitCta = {
  title: ["Need something", "that isn’t here?"],
  sub: "Writing about OllyGarden, planning an event with us or building something together? Tell us what you need and we will send the right files.",
  primary: { label: "Contact Us", href: "/contact" },
  secondary: { label: "Press Releases", href: "/resources/press-releases" },
};
