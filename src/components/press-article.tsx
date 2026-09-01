import Link from "next/link";
import { InView } from "@/components/in-view";
import {
  formatPressDate,
  pressArticlePage,
  pressMeta,
  type PressBlock,
  type PressRelease,
} from "@/lib/press";

export function PressArticle({ release }: { release: PressRelease }) {
  return (
    <article className="pr-article relative">
      <div className="pr-grid-bg" aria-hidden="true" />
      <div className="pr-inner relative z-[1] mx-auto max-w-[1232px]">
        <InView className="pr-fx">
          <Link
            href={pressMeta.path}
            className="pr-back group inline-flex items-center gap-2 self-start text-base font-medium text-bitmap-highlight"
          >
            <span
              aria-hidden="true"
              className="pr-back-arrow inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            {pressArticlePage.back}
          </Link>
        </InView>

        {release.notice ? (
          <InView className="pr-fx">
            <aside
              className="pr-notice surface-grain mt-6 flex items-start gap-4 rounded-2xl border border-sunflower/40 bg-[#00280e] px-5 py-4 max-[767px]:gap-3 max-[767px]:px-4 max-[767px]:py-3.5"
              aria-label={release.notice.label}
            >
              <NoticeIcon />
              <p className="text-sm leading-[22px] text-[#cdcdcd]">
                {release.notice.text}
              </p>
            </aside>
          </InView>
        ) : null}

        <header className="pr-header mt-10 max-[767px]:mt-[30px]">
          <InView className="pr-fx">
            <p className="flex flex-wrap items-center gap-3 text-sm leading-5 text-[#9dafa3]">
              <time dateTime={release.date}>{formatPressDate(release.date)}</time>
              <span className="h-3.5 w-px bg-[#96a495]/25" aria-hidden="true" />
              <span>{release.location}</span>
            </p>
          </InView>

          {release.partner ? (
            <InView className="pr-fx mt-4 max-[991px]:mt-3">
              <span className="pr-partner inline-flex h-10 items-center justify-center rounded-full border-[1.66px] border-bitmap-mid bg-[rgba(91,114,53,0.2)] px-5 text-base leading-6 font-medium text-bitmap-highlight">
                {release.partner}
              </span>
            </InView>
          ) : null}

          <InView className="pr-fx">
            <h1 className="pr-title mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1.125] font-bold tracking-[-0.02em] text-mist">
              {release.title}
            </h1>
          </InView>

          <InView className="pr-fx">
            <p className="mt-6 text-[clamp(1.125rem,1.6vw,1.25rem)] leading-[1.4] tracking-[0.02em] text-[#cdcdcd]">
              {release.dek}
            </p>
          </InView>
        </header>

        <div className="pr-body mt-12 max-[767px]:mt-9">
          {release.body.map((block, index) => (
            <InView key={`${block.type}-${index}`} className="pr-fx">
              <PressBlockView block={block} />
            </InView>
          ))}
        </div>
      </div>
    </article>
  );
}

function PressBlockView({ block }: { block: PressBlock }) {
  switch (block.type) {
    case "lead":
      return <p className="pr-p pr-p-lead">{block.text}</p>;
    case "p":
      return <p className="pr-p">{block.text}</p>;
    case "h2":
      return <h2 className="pr-h2">{block.text}</h2>;
    case "quote":
      return (
        <figure className={`pr-quote${block.compact ? " pr-quote--compact" : ""}`}>
          <blockquote className="pr-quote-text">{block.quote}</blockquote>
          {block.attribution ? (
            <figcaption className="pr-quote-attr">
              <span aria-hidden="true">—&nbsp;</span>
              {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      );
    case "capabilities":
      return (
        <ul className="flex flex-col gap-4">
          {block.items.map((item) => (
            <li
              key={item.title}
              className="pr-cap surface-grain rounded-3xl border border-sunflower/40 bg-[#00280e] p-8 max-[767px]:rounded-2xl max-[767px]:p-5"
            >
              <h3 className="text-lg leading-[26px] font-bold text-mist">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-6 text-[#9dafa3]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      );
    case "list":
      return (
        <ul className="pr-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "about":
      return (
        <div className="flex flex-col gap-4">
          {block.kicker ? (
            <span className="text-sm leading-5 font-semibold tracking-[0.08em] text-bitmap-mid uppercase">
              {block.kicker}
            </span>
          ) : null}
          <h2 className="pr-h2">{block.title}</h2>
          <p className="pr-p">{block.body}</p>
        </div>
      );
    case "media":
      return (
        <aside className="pr-media surface-grain rounded-3xl border border-sunflower/40 bg-[#00280e] p-8 max-[767px]:rounded-2xl max-[767px]:p-5">
          <h2 className="text-lg leading-[26px] font-bold text-mist">
            {block.title}
          </h2>
          <p className="mt-2 text-base leading-6 text-[#9dafa3]">{block.sub}</p>
          <p className="pr-media-emails mt-4 text-base leading-6">
            {block.emails.map((email, index) => (
              <span key={email.address}>
                {index > 0 ? (
                  <span className="text-[#9dafa3]" aria-hidden="true">
                    {" | "}
                  </span>
                ) : null}
                <a href={`mailto:${email.address}`}>{email.label}</a>
              </span>
            ))}
          </p>
        </aside>
      );
  }
}

function NoticeIcon() {
  return (
    <svg
      className="mt-0.5 shrink-0 max-[767px]:size-6"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.5 3.5H7a2.5 2.5 0 0 0-2.5 2.5v12A2.5 2.5 0 0 0 7 20.5h5l7.5-7.5V6A2.5 2.5 0 0 0 17 3.5h-2.5Z"
        stroke="#D1D100"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 20.3V14a1 1 0 0 1 1-1h6.2"
        stroke="#D1D100"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
