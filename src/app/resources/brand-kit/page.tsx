import { BrandColours } from "@/components/brand-kit/colours";
import { BrandDock } from "@/components/brand-kit/dock";
import { BrandDownloads } from "@/components/brand-kit/downloads";
import { BrandGlyph } from "@/components/brand-kit/glyph";
import { BrandIcons } from "@/components/brand-kit/icons";
import { BrandImagery } from "@/components/brand-kit/imagery";
import { BrandLogoStage } from "@/components/brand-kit/logo";
import { ExternalMark } from "@/components/brand-kit/marks";
import { BrandPattern } from "@/components/brand-kit/pattern";
import { BrandType } from "@/components/brand-kit/type";
import { GuideBlob } from "@/components/hero-blob";
import { JsonLd } from "@/components/json-ld";
import { PageBody, PageHero } from "@/components/page-hero";
import { SiteCta } from "@/components/site-cta";
import { brandKitCta, brandKitHero, brandKitJump, brandKitLinks, brandKitMeta } from "@/lib/brand-kit/content";
import { createPageMetadata } from "@/lib/metadata";
import { resourcesBrandKitGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: brandKitMeta.title,
  description: brandKitMeta.description,
  path: brandKitMeta.path,
  absoluteTitle: true,
});

export default function BrandKitPage() {
  return (
    <>
      <JsonLd data={resourcesBrandKitGraph()} />
      <PageHero
        className="bk-hero"
        titleId="brand-kit-title"
        decoration={<GuideBlob />}
        eyebrow={
          <>
            <BrandGlyph name="sprout" size={14} />
            {`Last reviewed · ${brandKitMeta.reviewed}`}
          </>
        }
        title={brandKitHero.title}
        lede={brandKitHero.lede}
      >
        <div className="bk-hero-actions">
          <div className="bk-hero-cta">
            <a className="bk-btn bk-btn--primary" href={brandKitLinks.guideline} target="_blank" rel="noopener noreferrer">
              Open the Brand Guideline <ExternalMark />
            </a>
            <a className="bk-btn bk-btn--secondary" href="#downloads">
              Get the Files
            </a>
          </div>
          <nav className="bk-jump" aria-label="On this page">
            {brandKitJump.map((item) => (
              <a key={item.id} className="bk-jump-link" href={`#${item.id}`}>
                <BrandGlyph name={item.icon} size={14} />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </PageHero>
      <PageBody wide>
        <div className="flex flex-col gap-24">
          <BrandDownloads />
          <BrandLogoStage />
          <BrandColours />
          <BrandType />
          <BrandPattern />
          <BrandIcons />
          <BrandImagery />
        </div>
      </PageBody>
      <BrandDock />
      <SiteCta content={brandKitCta} />
    </>
  );
}
