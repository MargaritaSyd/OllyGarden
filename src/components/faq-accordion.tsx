import Link from "next/link";
import type { CSSProperties } from "react";
import { InView } from "@/components/in-view";
import { RuleText } from "@/components/instrumentation-score-ui";
import type { FaqContent, FaqItem } from "@/lib/faq";

type FaqVariant = "default" | "rose";

/* "rose" follows the Rose page Figma (2371:32021); "default" is unchanged. */
const styles = {
  default: {
    section:
      "faq-accordion flex justify-center px-5 py-16 sm:px-8 lg:px-[104px] lg:pt-24 lg:pb-[140px]",
    column: "flex w-full max-w-[1232px] flex-col gap-8 lg:gap-12",
    head: "fq-head flex flex-col gap-4",
    title:
      "text-[44px] leading-[1.18] font-bold tracking-[-0.02em] text-mist max-[1279px]:text-[40px] max-[1279px]:leading-[1.2] max-[1023px]:text-[36px] max-[1023px]:leading-[1.22] max-[767px]:text-[28px] max-[767px]:leading-[1.29]",
    sub: "max-w-[500px] text-base leading-[1.45] tracking-[0.02em] text-[#9db4a0] max-[767px]:text-[15px] max-[767px]:leading-[1.47]",
    list: "flex flex-col gap-[18px] sm:gap-[26px]",
    row: "rounded-xl",
    summary: "px-[18px] py-5 sm:px-6 sm:py-[26px] focus-visible:rounded-xl",
    question:
      "text-lg leading-[1.3] font-semibold tracking-[-0.01em] text-mist max-[767px]:text-[17px]",
    answer:
      "max-w-[1160px] px-[18px] pb-5 text-[15px] leading-[1.5] tracking-[0.01em] text-mist/82 max-[767px]:text-sm sm:px-6 sm:pb-[26px]",
  },
  rose: {
    section:
      "faq-accordion relative flex justify-center px-5 py-16 sm:px-8 lg:px-[104px] lg:py-[120px]",
    column: "flex w-full max-w-[1232px] flex-col gap-6",
    head: "fq-head flex flex-col gap-2",
    title:
      "text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[normal] font-bold tracking-[-0.02em] text-mist",
    sub: "max-w-[521px] text-base leading-[1.4] tracking-[0.02em] text-mist/80",
    list: "flex flex-col gap-6",
    row: "rounded-2xl",
    summary: "p-5 sm:p-6 focus-visible:rounded-2xl",
    question: "text-lg leading-[1.3] font-medium tracking-[-0.02em] text-mist",
    answer:
      "-mt-2 px-5 pb-5 text-sm leading-[1.4] tracking-[-0.02em] text-mist/80 sm:-mt-3 sm:px-6 sm:pb-6",
  },
} as const satisfies Record<FaqVariant, Record<string, string>>;

/** Collapsible FAQ section; answers stay in the server-rendered HTML. */
export function FaqAccordion({
  content,
  variant = "default",
  inset = "faq",
  startClosed = false,
}: {
  content: FaqContent;
  variant?: FaqVariant;
  /** `guide` uses the same horizontal inset as the resource-guide sections. */
  inset?: "faq" | "guide";
  /** Leave every answer collapsed. The default variant otherwise opens the first item. */
  startClosed?: boolean;
}) {
  const s = styles[variant];
  const sectionClass =
    inset === "guide"
      ? "faq-accordion flex justify-center px-[clamp(1.5rem,7.25vw,6.5rem)] py-16 max-[880px]:px-6 lg:pt-24 lg:pb-[140px]"
      : s.section;

  return (
    <InView as="section" aria-labelledby="fq-title" className={sectionClass}>
      <div className={s.column}>
        <div className={s.head}>
          <h2 id="fq-title" className={s.title}>
            {content.title}
          </h2>
          <p className={s.sub}>{content.sub}</p>
        </div>

        <div className={s.list}>
          {content.items.map((item, index) => (
            <FaqRow
              key={item.q}
              item={item}
              index={index}
              variant={variant}
              startClosed={startClosed}
            />
          ))}
        </div>
      </div>
    </InView>
  );
}

function FaqRow({
  item,
  index,
  variant,
  startClosed,
}: {
  item: FaqItem;
  index: number;
  variant: FaqVariant;
  startClosed: boolean;
}) {
  const s = styles[variant];

  return (
    <details
      open={!startClosed && variant !== "rose" && index === 0}
      style={{ "--i": index } as CSSProperties}
      className={`faq-accordion-item fq-item overflow-hidden ${s.row} border border-sunflower/32 bg-[#002810] bg-[url('/images/texture-grain.png')] bg-repeat [background-size:328px_140px] transition-[border-color,box-shadow,opacity,transform] duration-200 ease-out hover:border-sunflower/55 hover:shadow-[0_14px_34px_rgba(0,0,0,0.26)]`}
    >
      <summary
        className={`flex cursor-pointer list-none items-center justify-between gap-4 ${s.summary} text-left select-none [&::-webkit-details-marker]:hidden marker:content-none focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-[#9ca703]/90`}
      >
        <h3 className={s.question}>{item.q}</h3>
        <svg
          className="size-5 shrink-0 text-bitmap-mid transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 7.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <p className={s.answer}>
        <RuleText text={item.a} />
        {item.link ? (
          <>
            {" "}
            <Link href={item.link.href} className="font-semibold text-sunflower underline-offset-2 hover:underline">
              {item.link.label} →
            </Link>
          </>
        ) : null}
      </p>
    </details>
  );
}
