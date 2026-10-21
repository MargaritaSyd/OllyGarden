import type { scoreCategories } from "@/lib/instrumentation-score";
import type { ScoreImpact } from "@/lib/instrumentation-score-rules";

/** One color per score category, shared by the scale and the worked example's gauge. */
export const categoryColor: Record<(typeof scoreCategories)[number]["name"], string> = {
  Poor: "#e54b4b",
  "Needs Improvement": "#f1b530",
  Good: "#e3e270",
  Excellent: "#9be07a",
};

const impactBadge: Record<ScoreImpact, string> = {
  Critical: "bg-[#e54b4b] text-[#1c0b0b]",
  Important: "bg-[#f1b530] text-[#1f1600]",
  Normal: "border border-[#a7b93b]/50 bg-[#a7b93b]/16 text-[#d2dd6e]",
  Low: "border border-mist/30 text-mist/80",
};

export const impactDot: Record<ScoreImpact, string> = {
  Critical: "bg-[#e54b4b]",
  Important: "bg-[#f1b530]",
  Normal: "bg-[#a7b93b]",
  Low: "bg-mist/55",
};

/** Renders the specification's `code` marks as code spans. */
export function RuleText({ text }: { text: string }) {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className="tq-code">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

export function ImpactBadge({ impact }: { impact: ScoreImpact }) {
  return (
    <span
      className={`inline-flex h-[22px] items-center rounded-full px-2.5 text-[11px] leading-none font-bold tracking-[0.08em] whitespace-nowrap uppercase ${impactBadge[impact]}`}
    >
      {impact}
    </span>
  );
}
