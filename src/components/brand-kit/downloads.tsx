import { BrandSection } from "@/components/brand-kit/section";
import { ButtonArrow, ExternalMark } from "@/components/brand-kit/marks";
import { brandKitDownloads, logoSrc } from "@/lib/brand-kit/content";

function DownloadArt({ id, art }: { id: string; art?: string }) {
  if (art) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={art} alt="" />;
  }
  if (id === "logos") {
    return (
      <span className="bk-dl-art-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc("ollygarden-logo-full-color-dark-bg.svg")} alt="" />
      </span>
    );
  }
  return (
    <span className="bk-dl-art-type" aria-hidden="true">
      <span className="bk-dl-aa">Aa</span>
      <span className="bk-dl-mono">{"{ }"}</span>
    </span>
  );
}

export function BrandDownloads() {
  return (
    <BrandSection
      id="downloads"
      grid
      icon="layers"
      eyebrow="Downloads"
      title="Everything in the kit"
      lede="The brand guideline, the logos, the fonts, the icons and the photography. Read the guideline before you design anything with our name on it."
    >
      <div className="bk-dl-grid md:grid-cols-2 xl:grid-cols-6">
        {brandKitDownloads.map((item) => (
          <article
            key={item.id}
            className={`bk-card bk-dl bk-dl--${item.id} ${
              item.id === "icons" || item.id === "photos" ? "xl:col-span-3" : "xl:col-span-2"
            } ${item.id === "guideline" ? "md:col-span-2 xl:col-span-2" : ""}`}
            aria-labelledby={`bk-dl-${item.id}`}
          >
            <div className="bk-dl-art">
              <DownloadArt id={item.id} art={item.art} />
            </div>
            <span className="bk-pill w-fit">{item.source}</span>
            <h3 id={`bk-dl-${item.id}`} className="bk-card-title">
              {item.title}
            </h3>
            <p className="bk-card-desc">{item.description}</p>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
              <a className="bk-btn bk-btn--secondary bk-btn--compact" href={item.url} target="_blank" rel="noopener noreferrer">
                {item.cta}
                {item.id === "guideline" || item.id === "photos" ? <ButtonArrow /> : <ExternalMark />}
              </a>
              {item.extra ? (
                <a className="bk-textlink" href={item.extra.url} target="_blank" rel="noopener noreferrer">
                  {item.extra.label} <ExternalMark />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </BrandSection>
  );
}
