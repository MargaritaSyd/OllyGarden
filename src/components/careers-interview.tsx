import { CtaArrow } from "@/components/cta-arrow";
import {
  CareersCard,
  CareersIconTile,
  CareersMailLink,
  CareersStrokeIcon,
} from "@/components/careers-card";
import { careersIcons, careersInterview } from "@/lib/careers";

const decoPixels = [
  { className: "top-0 left-0 bg-sunflower" },
  { className: "top-0 left-[205px] bg-sunflower" },
  { className: "top-[68px] left-[68px] bg-bitmap-highlight" },
  { className: "top-[68px] left-[137px] bg-sunflower" },
  { className: "top-[68px] left-[273px] bg-sunflower" },
  { className: "top-0 left-[341px] bg-sunflower" },
  { className: "top-[136px] left-[341px] bg-sunflower" },
] as const;

export function CareersInterview() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-labelledby="iv-title"
    >
      <div
        className="pointer-events-none absolute top-0 left-0 opacity-30"
        aria-hidden="true"
      >
        {decoPixels.map((pixel) => (
          <div key={pixel.className} className={`absolute size-[68px] ${pixel.className}`} />
        ))}
      </div>
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="flex max-w-[760px] flex-col items-start gap-4">
          <InterviewMotif />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {careersInterview.eyebrow}
          </p>
          <h2
            id="iv-title"
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {careersInterview.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="text-base leading-[1.4] text-mist">{careersInterview.lede}</p>
        </header>

        <div className="grid gap-8 min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {careersInterview.cards.map((card) => (
            <CareersCard key={card.key}>
              <div className="flex flex-col gap-4">
                <CareersIconTile>
                  <CareersStrokeIcon d={careersIcons[card.key]} />
                </CareersIconTile>
                <h3 className="text-[22px] leading-[1.28] font-bold tracking-[-0.01em] text-mist">
                  {card.title}
                </h3>
                <p className="text-base leading-[1.4] text-mist/75">{card.body}</p>
              </div>
            </CareersCard>
          ))}
        </div>

        <CareersCard>
          <div className="flex flex-col items-start justify-between gap-8 min-[881px]:flex-row min-[881px]:items-center">
            <div className="flex max-w-[820px] flex-col items-start gap-4">
              <CareersIconTile>
                <CareersStrokeIcon d={careersIcons.atom} />
              </CareersIconTile>
              <h3 className="text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist">
                {careersInterview.cta.title}
              </h3>
              <p className="text-base leading-[1.4] tracking-[0.02em] text-mist/80">
                {careersInterview.cta.body}
              </p>
            </div>
            <CareersMailLink href={careersInterview.cta.href}>
              {careersInterview.cta.label}
              <CtaArrow />
            </CareersMailLink>
          </div>
        </CareersCard>
      </div>
    </section>
  );
}

function InterviewMotif() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M8.0008 15.9992C8.0008 24.8356 9.79159 32 12.002 32C14.2125 32 16.0032 24.8356 16.0032 15.9992H8.0008Z"
        fill="#D1D100"
      />
      <path
        d="M8.00081 16.0008C8.00081 7.16442 6.21002 0 4.00122 0C1.79079 0 0 7.16442 0 16.0008H8.00081Z"
        fill="#D1D100"
      />
      <path
        d="M23.9976 15.9992C23.9976 24.8356 25.7884 32 27.9988 32C30.2092 32 32 24.8356 32 15.9992H23.9976Z"
        fill="#D1D100"
      />
      <path
        d="M23.9976 16.0008C23.9976 7.16442 22.2068 0 19.998 0C17.7892 0 15.9968 7.16442 15.9968 16.0008H23.9976Z"
        fill="#D1D100"
      />
    </svg>
  );
}
