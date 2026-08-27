import { insightsVoices } from "@/lib/insights";

export function InsightsVoices() {
  return (
    <section aria-labelledby="tst-title">
      <div className="mx-auto w-full max-w-[1328px] px-6 py-24 sm:px-12">
        <div className="mb-12 flex items-start gap-4">
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
            <li key={quote.name}>
              <article className="flex h-full flex-col overflow-hidden bg-[#011407]">
                <div className="grid grid-cols-[165px_minmax(0,1fr)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={quote.image}
                    alt={quote.imageAlt}
                    width={165}
                    height={165}
                    className="h-[165px] w-[165px] object-cover"
                  />
                  <div className="flex min-w-0 flex-col justify-end">
                    <span className="flex min-h-[52px] items-center bg-olive px-5 text-[15px] font-semibold tracking-[0.01em] text-mist">
                      {quote.name}
                    </span>
                    <span className="flex min-h-[52px] w-[calc(100%+1.5rem)] max-w-none items-center bg-sunflower px-5 text-[14.5px] leading-snug font-semibold tracking-[0.01em] text-forest">
                      {quote.role}
                    </span>
                  </div>
                </div>
                <blockquote className="px-7 py-10">
                  <QuoteMark />
                  <p className="mt-[18px] text-[18.5px] leading-snug text-[#e9ece0]">
                    {quote.quote}
                  </p>
                </blockquote>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
