import { InView } from "@/components/in-view";
import { roseProblem } from "@/lib/rose";

const placeClass: Record<(typeof roseProblem.cards)[number]["place"], string> = {
  tl: "m-a",
  tr: "m-c",
  bl: "m-b",
  br: "m-d",
};

/** Figma 2371:31375 — centered head with four floating cards at the frame corners. */
export function RoseProblem() {
  return (
    <InView
      as="section"
      aria-labelledby="problem-title"
      className="relative overflow-hidden"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-5 py-24 sm:px-12 xl:px-[104px] min-[1140px]:min-h-[728px]">
        <div className="ov-stagger relative z-10 flex max-w-[642px] flex-col items-center text-center">
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {roseProblem.eyebrow}
          </p>
          <h2
            id="problem-title"
            className="mt-4 text-[clamp(2rem,3.4vw,3rem)] leading-[1.25] font-bold tracking-[-0.02em] text-mist"
          >
            {roseProblem.title}
          </h2>
          <p className="mt-4 max-w-[492px] text-base leading-[1.4] tracking-[0.02em] text-mist">
            {roseProblem.body}
          </p>
          <p className="mt-4 text-lg font-bold tracking-[-0.01em] text-bitmap-highlight">
            {roseProblem.highlight}
          </p>
        </div>

        <ul
          aria-label="Common instrumentation problems"
          className="mt-12 grid w-full max-w-[620px] grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[1140px]:pointer-events-none min-[1140px]:absolute min-[1140px]:inset-0 min-[1140px]:mt-0 min-[1140px]:block min-[1140px]:max-w-none"
        >
          {roseProblem.cards.map((card) => (
            <li
              key={card.title}
              className={`m-card ${placeClass[card.place]} min-[1140px]:pointer-events-auto min-[1140px]:absolute min-[1280px]:w-[287px]`}
            >
              {/* Figma card is the 24/32 standard card scaled to 80.7%: w 287, p 26, r 19.4. */}
              <article className="rose-card-float texture-grain paper-grain h-full rounded-[19.4px] border-[0.8px] border-bitmap-highlight/40 p-[26px]">
                <h3 className="text-[19.4px] leading-[1.25] font-medium tracking-[-0.02em] text-mist min-[1140px]:whitespace-nowrap">
                  {card.title}
                </h3>
                {/* Figma body is 11.3px; 12px is the legibility floor. */}
                <p className="mt-[13px] text-xs leading-[1.28] tracking-[-0.02em] text-mist">
                  {card.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}
