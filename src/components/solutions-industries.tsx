import Link from "next/link";
import { solutionIndustries } from "@/lib/solutions";

const decoPixels = [
  { className: "top-6 right-0 size-11 bg-bitmap-shadow" },
  { className: "top-[68px] right-11 size-11 bg-sunflower" },
  { className: "top-28 right-0 size-11 bg-bitmap-highlight" },
  { className: "top-[168px] right-24 size-[30px] bg-bitmap-mid" },
  { className: "top-[348px] right-0 size-11 bg-bitmap-mid" },
  { className: "top-[396px] right-11 size-[30px] bg-sunflower" },
  { className: "bottom-11 left-0 size-11 bg-sunflower" },
  { className: "bottom-0 left-11 size-11 bg-bitmap-shadow" },
  { className: "bottom-[132px] left-11 size-11 bg-bitmap-mid" },
  { className: "bottom-[180px] left-0 size-[30px] bg-bitmap-highlight" },
  { className: "bottom-[268px] left-[88px] size-[30px] bg-sunflower" },
  { className: "bottom-[312px] left-0 size-11 bg-bitmap-mid" },
] as const;

export function SolutionsIndustries() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[120px] max-[1100px]:px-[clamp(1.5rem,5vw,3.5rem)] max-[1100px]:py-[88px] max-[880px]:px-6 max-[880px]:py-20"
      aria-label="Industries OllyGarden serves"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {decoPixels.map((pixel) => (
          <div
            key={pixel.className}
            className={`absolute opacity-30 max-[880px]:size-7 ${pixel.className}`}
          />
        ))}
      </div>

      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-16 max-[1100px]:gap-12 max-[880px]:gap-8">
        {solutionIndustries.map((industry) => (
          <article key={industry.href}>
            <Link
              href={industry.href}
              aria-label={`${industry.title} — learn more`}
              className={`group surface-grain relative grid min-h-[271px] grid-cols-1 overflow-hidden rounded-2xl border border-white/8 bg-[#19321e] shadow-[0_14px_36px_rgba(0,0,0,0.32),inset_0_1px_rgba(255,255,255,0.05)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.008] hover:shadow-[0_30px_64px_rgba(0,0,0,0.5),0_0_0_1.5px_rgba(211,222,60,0.35),0_0_36px_rgba(217,229,51,0.16),inset_0_1px_rgba(255,255,255,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight ${
                industry.flip
                  ? "min-[881px]:grid-cols-[620fr_460fr] min-[1101px]:grid-cols-[713fr_519fr]"
                  : "min-[881px]:grid-cols-[460fr_620fr] min-[1101px]:grid-cols-[519fr_713fr]"
              }`}
            >
              <div
                className={`relative overflow-hidden bg-[#0a2a12] max-[880px]:h-[260px] ${
                  industry.flip ? "min-[881px]:order-2" : ""
                }`}
              >
                <div className="absolute inset-x-0 -inset-y-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={industry.image}
                    alt=""
                    width={industry.imageWidth}
                    height={industry.imageHeight}
                    loading="lazy"
                    className="h-full w-full scale-[1.02] object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-105"
                  />
                </div>
                <span className="absolute bottom-[63px] left-0 z-[2] inline-flex h-[52px] items-center bg-[#c8d99b] px-6 text-base font-bold tracking-[0.01em] whitespace-nowrap text-[#00280e] max-[1100px]:bottom-[58px] max-[1100px]:h-12">
                  {industry.badge}
                </span>
                <div className="absolute inset-x-0 bottom-0 z-[2] flex h-[63px] items-center bg-[#3f5b0a] px-6 text-2xl font-bold tracking-[-0.01em] text-white max-[1100px]:h-[58px] max-[1100px]:text-[21px]">
                  {industry.title}
                </div>
              </div>

              <div className="relative flex flex-col items-start justify-center gap-6 px-[clamp(1.5rem,3.3vw,3rem)] py-8 max-[880px]:gap-5 max-[880px]:px-6 max-[880px]:pt-6 max-[880px]:pb-7">
                <p className="max-w-[62ch] text-[20px] leading-[26px] text-mist/90 max-[1100px]:text-lg max-[1100px]:leading-[25px] max-[880px]:text-[17px] max-[880px]:leading-6">
                  {industry.body}
                </p>
                <span className="inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-mist px-[30px] text-base font-semibold text-black max-[880px]:w-full">
                  Learn More
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-[3px]"
                  >
                    <path
                      d="M1 6h13M9.5 1.5 14 6l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
