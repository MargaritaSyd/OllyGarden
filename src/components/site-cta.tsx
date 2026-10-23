import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { MotifField } from "@/components/motif-field";
import { homeCta } from "@/lib/home";

export type SiteCtaAction = {
  label: string;
  href?: string;
  arrow?: boolean;
  className?: string;
};

export type SiteCtaContent = {
  title: string | readonly string[];
  titleAccent?: string;
  sub?: string;
  primary?: SiteCtaAction;
  secondary?: SiteCtaAction;
  /** Product pages in Figma use the 57px buttons. */
  buttonSize?: "md" | "lg";
  /** "product" follows the Rose page Figma (2371:32089). "scan" is the agent-skills closing band. */
  variant?: "default" | "product" | "scan";
  /** Drop the 48px gap above the panel; the home Figma (1:599) sits flush under the blog section. */
  flush?: boolean;
};

export function SiteCta({ content = homeCta }: { content?: SiteCtaContent }) {
  const titleLines = typeof content.title === "string" ? [content.title] : content.title;
  const primary = content.primary ?? { label: "Get Started" };
  const secondary = content.secondary;
  const product = content.variant === "product";
  const scan = content.variant === "scan";
  // Only a sub-line pulls the actions up into the head rhythm; a lone button row
  // keeps the 40px gap below the title (home Figma 2371:27246).
  const stacked = product ? Boolean(content.sub || secondary) : Boolean(content.sub);
  const largeButtons = content.buttonSize === "lg";

  return (
    <InView
      as="section"
      aria-labelledby="cta-title"
      className={`relative ${product || content.flush ? "" : "pt-12"}`}
    >
      <div className="relative isolate flex min-h-[411px] flex-col items-center justify-center overflow-hidden bg-[#00280e] px-6 py-24 text-center sm:px-12 lg:px-[104px]">
        <MotifField
          kind="sides"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
        />
        <div
          className={`relative flex flex-col items-center ${
            stacked ? (product ? "gap-4" : scan ? "gap-6" : "gap-[26px]") : ""
          }`}
        >
          <h2
            id="cta-title"
            className="cta-title text-[clamp(2rem,4vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-balance text-mist"
          >
            {titleLines.map((line) => (
              <span key={line} className="block">
                <CtaTitleLine text={line} accent={content.titleAccent} />
              </span>
            ))}
          </h2>
          {content.sub ? (
            <p
              className={`cta-sub ${
                product
                  ? "max-w-[496px] text-base leading-[1.4] tracking-[0.02em] text-mist"
                  : scan
                    ? "max-w-[560px] text-base leading-[1.5] tracking-[0.01em] text-mist/80"
                    : "max-w-[660px] text-base leading-[1.65] tracking-[0.01em] text-mist/80"
              }`}
            >
              {content.sub}
            </p>
          ) : null}
          <div
            className={`cta-action flex w-full flex-col flex-wrap items-center justify-center sm:flex-row ${
              product || largeButtons ? "gap-6" : "gap-4"
            } ${stacked && !product ? (scan ? "mt-2" : "") : product ? "mt-6" : "mt-10"}`}
          >
            <GetStartedLink
              href={primary.href}
              size={scan ? "og" : content.buttonSize}
              tone={scan ? "paper" : "default"}
              className={primary.className}
              analytics={{ id: "closing_cta_primary", section: "closing_cta" }}
            >
              {primary.label}
              {primary.arrow ? <CtaArrow /> : null}
            </GetStartedLink>
            {secondary ? (
              <GetStartedLink
                href={secondary.href ?? "/contact"}
                variant="secondary"
                size={scan ? "og" : content.buttonSize}
                tone={scan ? "paper" : "default"}
                analytics={{ id: "closing_cta_secondary", section: "closing_cta" }}
              >
                {secondary.label}
              </GetStartedLink>
            ) : null}
          </div>
        </div>
      </div>
    </InView>
  );
}

function CtaTitleLine({ text, accent }: { text: string; accent?: string }) {
  if (!accent || !text.includes(accent)) {
    return text;
  }

  const index = text.indexOf(accent);

  return (
    <>
      {text.slice(0, index)}
      <span className="text-sunflower">{accent}</span>
      {text.slice(index + accent.length)}
    </>
  );
}
