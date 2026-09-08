import { InView } from "@/components/in-view";
import { insightsVoices } from "@/lib/insights";

export function InsightsVoices() {
  return (
    <InView as="section" aria-labelledby="tst-title">
      <div className="mx-auto w-full max-w-[1328px] px-6 py-24 sm:px-12">
        <div className="voices-head mb-12 flex items-start gap-4">
          <VoicesMark />
          <h2
            id="tst-title"
            className="text-[clamp(1.875rem,3.4vw,2.875rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-mist"
          >
            {insightsVoices.title}
          </h2>
        </div>

        <ul className="grid gap-9 md:grid-cols-2">
          {insightsVoices.quotes.map((quote) => (
            <InView key={quote.name} as="li" mark="rv-in">
              <article className="voice-card flex h-full flex-col overflow-hidden bg-[#011407]">
                <div className="flex h-[165px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={quote.image}
                    alt={quote.imageAlt}
                    width={165}
                    height={165}
                    className="h-[165px] w-[165px] shrink-0 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col items-start justify-end">
                    <span className="flex w-[266px] max-w-full min-h-[52px] items-center bg-olive px-3 py-4 text-base leading-5 font-bold tracking-[0.01em] text-white max-md:w-60 max-sm:w-full">
                      {quote.name}
                    </span>
                    <span className="flex w-full min-h-[52px] items-center bg-[#d6d620] px-3 py-4 text-base leading-5 font-bold tracking-[0.01em] text-[#394813]">
                      {quote.role}
                    </span>
                  </div>
                </div>
                <blockquote className="flex flex-1 flex-col gap-3 px-6 py-6">
                  <QuoteMark />
                  <p className="text-xl leading-[1.3] text-mist">
                    {quote.quote}
                  </p>
                </blockquote>
              </article>
            </InView>
          ))}
        </ul>
      </div>
    </InView>
  );
}

function VoicesMark() {
  return (
    <svg className="mt-1 shrink-0" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16.0016 32H32V16.0033L16.0016 32Z" fill="#9CA703" />
      <path d="M16.0016 16.0033L32 16.0033L32 0.00488842L16.0016 16.0033Z" fill="#9CA703" />
      <path d="M16.0016 1.39891e-06L2.79753e-06 0L1.39876e-06 16L16.0016 1.39891e-06Z" fill="#9CA703" />
      <path d="M16.0016 16L1.39876e-06 16L0 32L16.0016 16Z" fill="#9CA703" />
    </svg>
  );
}

function QuoteMark() {
  return (
    <svg
      width="31"
      height="24"
      viewBox="0 0 31 24"
      fill="none"
      className="text-olive"
      aria-hidden="true"
    >
      <path d="M0 0 H13 V12 H5 L0 24 Z" fill="currentColor" />
      <path d="M18 0 H31 V12 H23 L18 24 Z" fill="currentColor" />
    </svg>
  );
}
