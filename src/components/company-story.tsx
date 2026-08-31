import { InView } from "@/components/in-view";
import { companyStory } from "@/lib/company";

export function CompanyStory() {
  return (
    <InView
      as="section"
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-labelledby="hw-title"
    >
      <div className="co-deco pointer-events-none absolute top-0 right-0" aria-hidden="true">
        <StoryDeco />
      </div>
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="flex max-w-[510px] flex-col items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/solutions/financial/glyph.svg"
            alt=""
            width={32}
            height={32}
            className="block h-8 w-8"
          />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {companyStory.eyebrow}
          </p>
          <h2
            id="hw-title"
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-mist"
          >
            {companyStory.title}
          </h2>
          <p className="text-base leading-[1.4] tracking-[0.02em] text-mist/75">
            {companyStory.lede}
          </p>
        </header>

        <div className="hw-cards flex flex-col gap-10">
          {companyStory.cards.map((card) => (
            <InView
              as="article"
              mark="rv-in"
              key={card.title}
              className="hw-rv group flex flex-col gap-3 rounded-3xl border border-bitmap-highlight/40 bg-[#00280e] p-8 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-[3px] hover:border-bitmap-highlight/55 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35),0_0_24px_rgba(217,229,51,0.08)]"
            >
              <TileIcon icon={card.icon} />
              <h3 className="text-xl leading-[1.3] font-bold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              {card.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-6 text-mist/75"
                >
                  {paragraph}
                </p>
              ))}
            </InView>
          ))}
        </div>
      </div>
    </InView>
  );
}

function TileIcon({ icon }: { icon: "wand" | "olly" }) {
  return (
    <div className="hw-tile grid size-12 place-items-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20 shadow-[0_4px_12px_rgba(0,40,14,0.1)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
      {icon === "olly" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/brand/logo.svg" alt="" width={30} height={25} className="h-[25px] w-[30px]" />
      ) : (
        <svg width="27" height="27" viewBox="18 15 34 34" fill="none" aria-hidden="true">
          <path
            d="M38.6666 25.3337L42.6666 29.3337M26.6666 24.0003V29.3337M45.3333 34.667V40.0003M33.3333 18.667V21.3337M29.3333 26.667H24M48 37.3337H42.6666M34.6666 20.0003H32M48.8533 20.8537L47.1466 19.147C46.9966 18.9954 46.818 18.8751 46.6212 18.793C46.4244 18.7108 46.2132 18.6686 46 18.6686C45.7867 18.6686 45.5756 18.7108 45.3787 18.793C45.1819 18.8751 45.0033 18.9954 44.8533 19.147L23.1466 40.8537C22.9951 41.0037 22.8747 41.1823 22.7926 41.3791C22.7105 41.5759 22.6682 41.7871 22.6682 42.0003C22.6682 42.2136 22.7105 42.4247 22.7926 42.6216C22.8747 42.8184 22.9951 42.997 23.1466 43.147L24.8533 44.8537C25.0024 45.0069 25.1807 45.1286 25.3776 45.2118C25.5746 45.295 25.7862 45.3378 26 45.3378C26.2138 45.3378 26.4254 45.295 26.6223 45.2118C26.8193 45.1286 26.9976 45.0069 27.1466 44.8537L48.8533 23.147C49.0065 22.9979 49.1283 22.8196 49.2115 22.6227C49.2946 22.4257 49.3374 22.2141 49.3374 22.0003C49.3374 21.7865 49.2946 21.5749 49.2115 21.378C49.1283 21.181 49.0065 21.0028 48.8533 20.8537Z"
            stroke="#9CA703"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

function StoryDeco() {
  return (
    <svg
      className="hw-deco"
      width="272"
      height="409"
      viewBox="0 0 272 409"
      fill="none"
      aria-hidden="true"
    >
      <rect width="68" height="68" fill="#9CA703" />
      <rect x="68" width="68" height="68" fill="#D1D100" />
      <rect x="136" y="68" width="68" height="68" fill="#D1D100" />
      <rect x="204" y="136" width="68" height="68" fill="#D1D100" />
      <rect y="204" width="68" height="68" fill="#34520B" />
      <rect x="68" y="136" width="68" height="68" fill="#D1D100" />
      <rect x="68" y="272" width="68" height="68" fill="#D1D100" />
      <rect y="340" width="68" height="68" fill="#D1D100" />
    </svg>
  );
}
