import { InView } from "@/components/in-view";
import { companyOpenSource } from "@/lib/company";

export function CompanyOpenSource() {
  const before = "A prime example of our commitment is the ";
  const after =
    " specification. We are spearheading this as an open, community-driven effort to standardize telemetry quality assessment, aiming for its eventual adoption within a neutral foundation like the CNCF or an OpenTelemetry SIG.";

  return (
    <InView
      as="section"
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-labelledby="os-title"
    >
      <div className="os-sq pointer-events-none absolute top-0 right-0" aria-hidden="true">
        <OpenSourceDeco />
      </div>
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-12">
        <header className="os-head flex max-w-[720px] flex-col items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.svg" alt="" width={30} height={24} className="block h-6 w-[30px]" />
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {companyOpenSource.eyebrow}
          </p>
          <h2
            id="os-title"
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {companyOpenSource.title}
          </h2>
          <p className="text-base leading-[1.4] text-mist">{companyOpenSource.lede}</p>
        </header>

        <article className="os-card flex flex-col items-start justify-between gap-8 rounded-2xl border border-sunflower/32 bg-[#002810] p-8 min-[881px]:flex-row min-[881px]:items-center">
          <div className="max-w-[820px]">
            <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist">
              {companyOpenSource.cardTitle}
            </h3>
            <p className="mt-3 text-base leading-[1.4] tracking-[0.02em] text-mist/80">
              {before}
              <a
                className="font-bold text-sunflower underline-offset-2 hover:underline"
                href={companyOpenSource.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {companyOpenSource.linkLabel}
              </a>
              {after}
            </p>
          </div>
          <a
            href={companyOpenSource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-mist px-6 text-base font-semibold text-forest transition-colors hover:bg-sunflower sm:w-auto"
          >
            <GitHubMark />
            {companyOpenSource.cta}
          </a>
        </article>
      </div>
    </InView>
  );
}

function GitHubMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19V17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26V19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function OpenSourceDeco() {
  return (
    <svg
      className="opacity-30"
      width="458"
      height="262"
      viewBox="0 0 458.22 261.84"
      fill="none"
      aria-hidden="true"
    >
      <rect x="261.84" y="0" width="65.46" height="65.46" fill="#D1D100" />
      <rect x="327.3" y="0" width="65.46" height="65.46" fill="#D1D100" />
      <rect x="392.76" y="0" width="65.46" height="65.46" fill="#D1D100" />
      <rect x="196.38" y="65.46" width="65.46" height="65.46" fill="#D1D100" />
      <rect x="261.84" y="65.46" width="65.46" height="65.46" fill="#D1D100" />
      <rect x="65.46" y="130.92" width="65.46" height="65.46" fill="#9CA703" />
      <rect x="196.38" y="130.92" width="65.46" height="65.46" fill="#D1D100" />
      <rect x="0" y="196.38" width="65.46" height="65.46" fill="#9CA703" />
      <rect x="130.92" y="196.38" width="65.46" height="65.46" fill="#E3E270" />
    </svg>
  );
}
