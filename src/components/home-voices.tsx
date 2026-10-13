import { InView } from "@/components/in-view";
import { homeVoices } from "@/lib/home";

export function HomeVoices() {
  const quotes = homeVoices.quotes;
  const lead = quotes.filter((quote) => !quote.wide);
  const wide = quotes.filter((quote) => quote.wide);

  return (
    <InView as="section" aria-labelledby="voices-title">
      <div className="mx-auto w-full max-w-[1328px] px-6 py-24 sm:px-12 lg:pt-[116px] lg:pb-[108px]">
        <div className="voices-head mb-[70px] text-center">
          <TulipMark />
          <h2
            id="voices-title"
            className="mt-5 text-[clamp(2rem,4vw,2.875rem)] leading-[1.15] font-bold tracking-[-0.02em] text-mist"
          >
            {homeVoices.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15.5px] leading-[1.62] text-mist/75">
            {homeVoices.sub}
          </p>
        </div>

        <div className="grid gap-9 md:grid-cols-3 md:gap-x-[39px] md:gap-y-9">
          {lead.map((quote) => (
            <InView key={quote.name} mark="rv-in">
              <VoiceCard quote={quote} />
            </InView>
          ))}
          {wide.map((quote) => (
            <InView key={quote.name} mark="rv-in" className="md:col-span-3">
              <VoiceCard quote={quote} wide />
            </InView>
          ))}
        </div>
      </div>
    </InView>
  );
}

function VoiceCard({
  quote,
  wide = false,
}: {
  quote: (typeof homeVoices.quotes)[number];
  wide?: boolean;
}) {
  return (
    <article
      className={
        wide
          ? "voice-card voice-wide overflow-hidden bg-[#011407] md:grid md:grid-cols-[auto_minmax(0,1fr)] md:items-center"
          : "voice-card flex flex-col overflow-hidden bg-[#011407]"
      }
    >
      <div
        className={
          wide
            ? "vc-head grid justify-items-start [grid-template-areas:'img'_'name'_'role'] [grid-template-rows:101px_52px_52px]"
            : "vc-head grid [grid-template-areas:'img_name'_'img_role'] [grid-template-columns:84px_minmax(0,1fr)] [grid-template-rows:52px_52px]"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={quote.image}
          alt={quote.imageAlt}
          width={wide ? 105 : 84}
          height={wide ? 101 : 104}
          className={
            wide
              ? "[grid-area:img] block h-[101px] w-[105px] object-cover"
              : "[grid-area:img] block h-[104px] w-[84px] object-cover"
          }
        />
        <span
          className={
            wide
              ? "vc-name flex min-w-[260px] items-center justify-self-start bg-olive px-[26px] text-[15px] font-semibold tracking-[0.01em] whitespace-nowrap text-mist max-md:min-w-0 max-md:whitespace-normal max-sm:px-3.5 max-sm:text-[13.5px]"
              : "vc-name flex min-w-[77%] items-center justify-self-start bg-olive px-5 text-[15px] font-semibold tracking-[0.01em] whitespace-nowrap text-mist max-md:whitespace-normal max-sm:px-3.5 max-sm:text-[13.5px]"
          }
        >
          {quote.name}
        </span>
        <span
          className={
            wide
              ? "vc-role flex min-w-[396px] items-center justify-self-start bg-[#d9e533] px-[26px] text-[14.5px] leading-snug font-semibold tracking-[0.01em] whitespace-nowrap text-[#0b2410] max-md:min-w-0 max-md:whitespace-normal max-sm:px-3.5 max-sm:text-[13.5px]"
              : "vc-role flex items-center bg-[#d9e533] px-5 text-[14.5px] leading-snug font-semibold tracking-[0.01em] whitespace-nowrap text-[#0b2410] max-md:whitespace-normal max-sm:px-3.5 max-sm:text-[13.5px]"
          }
        >
          {quote.role}
        </span>
      </div>
      <blockquote
        className={
          wide
            ? "vc-quote px-7 pt-4 pb-[46px] md:px-16 md:pt-[34px] md:pb-[38px]"
            : "vc-quote px-7 pt-16 pb-[60px]"
        }
      >
        <QuoteMark />
        <p
          className={
            wide
              ? "mt-[18px] max-w-[56ch] text-[20px] leading-snug text-[#e9ece0] max-sm:text-[17.5px]"
              : "mt-[18px] text-[18.5px] leading-snug text-[#e9ece0]"
          }
        >
          {quote.quote}
        </p>
      </blockquote>
    </article>
  );
}

function TulipMark() {
  return (
    <svg
      className="mx-auto"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 15.9912C32 24.8332 24.8371 32.0002 16.0001 32.0002C16.0001 23.1582 23.163 15.9912 32 15.9912Z"
        fill="#9CA703"
      />
      <path
        d="M6.36606e-05 15.9912C6.36606e-05 24.8332 7.16298 32.0002 16 32.0002C16 23.1582 8.83708 15.9912 6.36606e-05 15.9912Z"
        fill="#9CA703"
      />
      <path
        d="M16.0001 16.009C7.16307 16.009 0.000147162 8.84201 0.000147162 0L32 0C32 8.84201 24.8371 16.009 16.0001 16.009Z"
        fill="#9CA703"
      />
    </svg>
  );
}

function QuoteMark() {
  return (
    <svg
      width="27"
      height="19"
      viewBox="0 0 27 19"
      fill="currentColor"
      className="text-olive"
      aria-hidden="true"
    >
      <path d="M0 19V11.2C0 5 3.5 1.3 9.4 0l1.3 2.9C7.9 4 6.2 6 5.9 8.5h5.5V19H0Z" />
      <path d="M15.6 19V11.2C15.6 5 19.1 1.3 25 0l1.3 2.9c-2.8 1.1-4.5 3.1-4.8 5.6H27V19H15.6Z" />
    </svg>
  );
}
