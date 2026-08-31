import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { MotifField } from "@/components/motif-field";
import { homeCta } from "@/lib/home";

export type SiteCtaAction = {
  label: string;
  href?: string;
  arrow?: boolean;
};

export type SiteCtaContent = {
  title: string | readonly string[];
  titleAccent?: string;
  sub?: string;
  primary?: SiteCtaAction;
  secondary?: SiteCtaAction;
};

export function SiteCta({ content = homeCta }: { content?: SiteCtaContent }) {
  const titleLines = typeof content.title === "string" ? [content.title] : content.title;
  const primary = content.primary ?? { label: "Get Started" };
  const secondary = content.secondary;
  const stacked = Boolean(content.sub || secondary);

  return (
    <InView as="section" aria-labelledby="cta-title" className="relative pt-12">
      <div className="relative isolate flex min-h-[411px] flex-col items-center justify-center overflow-hidden bg-[#00280e] px-6 py-24 text-center sm:px-12 lg:px-[104px]">
        <MotifField
          kind="sides"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
        />
        <div
          className={`relative flex flex-col items-center ${stacked ? "gap-[26px]" : ""}`}
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
            <p className="cta-sub max-w-[660px] text-base leading-[1.65] tracking-[0.01em] text-mist/80">
              {content.sub}
            </p>
          ) : null}
          <div
            className={`cta-action flex w-full flex-col flex-wrap items-center justify-center gap-4 sm:flex-row ${
              stacked ? "" : "mt-10"
            }`}
          >
            <GetStartedLink href={primary.href}>
              {primary.label}
              {primary.arrow ? <CtaArrow /> : null}
            </GetStartedLink>
            {secondary ? (
              <GetStartedLink href={secondary.href ?? "/contact"} variant="secondary">
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
