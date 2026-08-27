import { companyMission } from "@/lib/company";

const decoPixels = [
  { className: "top-0 left-0 bg-sunflower" },
  { className: "top-0 left-[205px] bg-sunflower" },
  { className: "top-[68px] left-[68px] bg-bitmap-highlight" },
  { className: "top-[68px] left-[137px] bg-sunflower" },
  { className: "top-[68px] left-[273px] bg-sunflower" },
  { className: "top-0 left-[341px] bg-sunflower" },
  { className: "top-[136px] left-[341px] bg-sunflower" },
] as const;

export function CompanyMission() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-labelledby="mv-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-0 opacity-30" aria-hidden="true">
        {decoPixels.map((pixel) => (
          <div key={pixel.className} className={`absolute size-[68px] ${pixel.className}`} />
        ))}
      </div>
      <div className="relative z-[1] mx-auto grid max-w-[1232px] items-center gap-10 min-[1101px]:grid-cols-[minmax(0,507px)_minmax(0,661px)] min-[1101px]:gap-16">
        <div className="flex max-w-[507px] flex-col items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/company/ic-mission.svg"
            alt=""
            width={32}
            height={32}
            className="block h-8 w-8"
          />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {companyMission.eyebrow}
          </p>
          <h2
            id="mv-title"
            className="max-w-[443px] text-[clamp(2rem,4vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-mist"
          >
            {companyMission.title}
          </h2>
          <p className="max-w-[400px] text-base leading-[1.4] tracking-[0.02em] text-mist">
            {companyMission.lede}
          </p>
        </div>
        <div className="flex flex-col gap-8">
          {companyMission.cards.map((card) => (
            <article
              key={card.eyebrow}
              className="flex flex-col gap-4 rounded-3xl border border-bitmap-highlight/40 bg-[#00280e] p-8"
            >
              <div className="grid size-12 place-items-center rounded-lg border border-bitmap-shadow/15 bg-bitmap-mid/20">
                <FileSwapIcon />
              </div>
              <p className="text-sm font-bold tracking-[0.1em] text-bitmap-mid uppercase">
                {card.eyebrow}
              </p>
              <h3 className="text-[22px] leading-[1.28] font-bold tracking-[-0.01em] text-mist">
                {card.title}
              </h3>
              <p className="text-base leading-[1.4] text-mist/75">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FileSwapIcon() {
  return (
    <svg width="26" height="26" viewBox="18 16 32 32" fill="none" aria-hidden="true">
      <path
        d="M25.3333 32.2003V21.3337C25.3333 20.6264 25.6142 19.9481 26.1143 19.4481C26.6144 18.948 27.2927 18.667 28 18.667H38.6666M38.6666 18.667C39.0891 18.666 39.5077 18.7486 39.8981 18.9102C40.2885 19.0717 40.6431 19.309 40.9413 19.6083L45.7253 24.3923C46.0246 24.6906 46.2619 25.0451 46.4234 25.4355C46.585 25.8259 46.6677 26.2445 46.6666 26.667M38.6666 18.667V25.3337C38.6666 25.6873 38.8071 26.0264 39.0571 26.2765C39.3072 26.5265 39.6463 26.667 40 26.667H46.6666M46.6666 26.667V42.667C46.6666 43.3742 46.3857 44.0525 45.8856 44.5526C45.3855 45.0527 44.7072 45.3337 44 45.3337H39.5333M26.6666 37.3337L22.6666 41.3337L26.6666 45.3337M32 45.3337L36 41.3337L32 37.3337"
        stroke="#9CA703"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
