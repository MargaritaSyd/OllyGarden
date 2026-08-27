import { RoseMascot } from "@/components/rose-mascot";
import { roseContext } from "@/lib/rose";

const nodePlace: Record<(typeof roseContext.nodes)[number]["id"], string> = {
  tl: "top-[8%] left-[12%] max-md:left-[7%]",
  tr: "top-[8%] right-[12%] max-md:right-[7%]",
  bl: "bottom-[8%] left-[12%] max-md:left-[7%]",
  br: "bottom-[8%] right-[12%] max-md:right-[7%]",
};

export function RoseContext() {
  return (
    <section aria-labelledby="context-title">
      <div className="mx-auto grid w-full max-w-[1408px] items-center gap-[clamp(3rem,6vw,6rem)] px-5 py-[clamp(5.25rem,9vw,8.75rem)] sm:px-12 lg:grid-cols-[minmax(0,32.5rem)_minmax(0,1fr)]">
        <div>
          <ContextMark />
          <p className="mt-4 text-sm font-bold tracking-[0.14em] text-bitmap-mid uppercase">
            {roseContext.eyebrow}
          </p>
          <h2
            id="context-title"
            className="mt-4 text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.18] font-semibold tracking-[-0.02em] text-mist"
          >
            {roseContext.titleLead}
            <br />
            {roseContext.titleRest}
          </h2>
          <div className="mt-5 max-w-[560px] space-y-4 text-[16.5px] leading-[1.68] text-mist/75">
            {roseContext.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          className="relative aspect-[689/465] max-w-[689px] overflow-hidden rounded-[40px] border border-white/10 bg-[#0d1117]"
          role="img"
          aria-label="Rose connects the OllyGarden knowledge base, OTel specs, your codebase, and your organization"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="rose-context-line-a" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D1D100" stopOpacity="0.4" />
                <stop offset="45%" stopColor="#D1D100" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#D1D100" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="rose-context-line-b" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D1D100" stopOpacity="0.4" />
                <stop offset="45%" stopColor="#D1D100" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#D1D100" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <path
              className="rose-context-line"
              d="M 18 15 Q 30 30, 50 50"
              fill="none"
              stroke="url(#rose-context-line-a)"
              strokeDasharray="2 2"
              strokeWidth="0.55"
            />
            <path
              className="rose-context-line [animation-delay:0.4s]"
              d="M 82 15 Q 70 30, 50 50"
              fill="none"
              stroke="url(#rose-context-line-b)"
              strokeDasharray="2 2"
              strokeWidth="0.55"
            />
            <path
              className="rose-context-line [animation-delay:0.8s]"
              d="M 18 78 Q 30 70, 50 50"
              fill="none"
              stroke="url(#rose-context-line-b)"
              strokeDasharray="2 2"
              strokeWidth="0.55"
            />
            <path
              className="rose-context-line [animation-delay:1.2s]"
              d="M 82 78 Q 70 70, 50 50"
              fill="none"
              stroke="url(#rose-context-line-a)"
              strokeDasharray="2 2"
              strokeWidth="0.55"
            />
          </svg>

          {roseContext.nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute flex flex-col items-center gap-2.5 text-center ${nodePlace[node.id]}`}
            >
              <span className="flex size-[clamp(3.25rem,6vw,4rem)] items-center justify-center rounded-full border-2 border-[#8b949e]/40 bg-[#161b22]/70 text-bitmap-mid">
                <NodeIcon id={node.id} />
              </span>
              <span className="block">
                <span className="block text-[13px] leading-tight font-semibold text-mist">
                  {node.title}
                </span>
                <span className="block text-[11.5px] leading-tight text-mist/55">{node.sub}</span>
              </span>
            </div>
          ))}

          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span className="rose-context-pulse absolute size-[clamp(5rem,10vw,6rem)] rounded-full bg-sunflower/20 blur-xl" />
            <span className="relative z-10 flex size-[clamp(4.25rem,8.4vw,5.25rem)] items-center justify-center rounded-full bg-[#0a0b0a] text-bitmap-mid drop-shadow-[0_0_20px_rgba(209,209,0,0.35)]">
              <RoseMascot className="h-[62%] w-[62%]" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContextMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M8 16c0 8.836 1.791 16 4.002 16S16.003 24.836 16.003 16H8Z" fill="#9CA703" />
      <path d="M8 16C8 7.164 6.21 0 4 0S0 7.164 0 16h8Z" fill="#9CA703" />
      <path d="M24 16c0 8.836 1.791 16 4.001 16S32 24.836 32 16H24Z" fill="#9CA703" />
      <path d="M24 16C24 7.164 22.209 0 20 0S16 7.164 16 16h8Z" fill="#9CA703" />
    </svg>
  );
}

function NodeIcon({ id }: { id: (typeof roseContext.nodes)[number]["id"] }) {
  const className = "h-[60%] w-[60%]";

  switch (id) {
    case "tl":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 5h16v3H4V5Zm0 5.5h16V14H4v-3.5Zm0 5.5h10v3H4v-3Z" />
        </svg>
      );
    case "tr":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 3h8l5 5v13H7V3Zm8 1.5V9h4.5L15 4.5Z" />
        </svg>
      );
    case "bl":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8.2 4 4 12l4.2 8h2.4L6.6 12 10.6 4H8.2Zm7.6 0L12.2 12l3.6 8h2.4L16.4 12 20.2 4h-4.4Z" />
        </svg>
      );
    case "br":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 20V8l8-5 8 5v12h-5v-6H9v6H4Z" />
        </svg>
      );
  }
}
