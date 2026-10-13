import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { BlogReadLink, PetalMark } from "@/components/blog-ui";
import { linkedCardClassName } from "@/components/case-studies";
import { CtaArrow } from "@/components/cta-arrow";
import { HeroBlob } from "@/components/hero-blob";
import { blogMeta, blogPosts } from "@/lib/blog";
import { isExternalHref } from "@/lib/dom";
import {
  resourceGroups,
  resourcesHero,
  resourcesLatest,
  type ResourceLink,
} from "@/lib/resources";
import { registerOpenTelemetry } from "@/lib/trademarks";

const sectionInset = "px-[clamp(1.5rem,7.25vw,6.5rem)] max-[880px]:px-6";

export function ResourcesHero() {
  return (
    <section
      className={`relative overflow-hidden ${sectionInset} pt-[clamp(7.5rem,13vw,11rem)] pb-[clamp(2.5rem,5vw,4rem)] max-[880px]:pt-[132px] max-[880px]:pb-12`}
      aria-labelledby="resources-title"
    >
      <HeroBlob />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="ov-fade-up surface-grain inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#19321e] px-4 py-1 text-[13px] font-medium tracking-[0.01em] whitespace-nowrap text-bitmap-highlight [animation-delay:0.15s]">
          <PetalMark size={14} className="text-sunflower" />
          {resourcesHero.badge}
        </div>
        <h1
          id="resources-title"
          className="ov-blur-rise mt-5 max-w-[820px] text-[clamp(2.25rem,6vw,4rem)] leading-[1.06] font-bold tracking-[-0.02em] text-mist max-[880px]:text-[clamp(2.25rem,9.5vw,2.75rem)] [animation-delay:0.25s]"
        >
          {resourcesHero.title}
        </h1>
        <p className="ov-fade-up mt-3 max-w-[704px] text-base leading-[1.4] tracking-[0.02em] text-mist [animation-delay:0.7s]">
          {registerOpenTelemetry(resourcesHero.lede)}
        </p>
      </div>
    </section>
  );
}

export function ResourcesGroups() {
  return (
    <div className={`relative ${sectionInset} pb-[clamp(2rem,4vw,3rem)]`}>
      <div className="mx-auto flex max-w-[1232px] flex-col gap-[clamp(2.5rem,5vw,4rem)]">
        {resourceGroups.map((group) => (
          <section key={group.id} aria-labelledby={`resources-${group.id}`}>
            <h2
              id={`resources-${group.id}`}
              className="mb-5 text-sm leading-5 font-semibold tracking-[0.08em] text-bitmap-mid uppercase"
            >
              {group.title}
            </h2>
            <ul className="grid grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <ResourceHubCard item={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function ResourceHubCard({ item }: { item: ResourceLink }) {
  const className = `flex h-full flex-col ${linkedCardClassName}`;
  const content = (
    <>
      <h3 className="text-[clamp(1.25rem,2.4vw,1.5rem)] leading-[1.29] font-bold tracking-[-0.02em] text-mist">
        {item.label}
      </h3>
      <p className="mt-3 text-base leading-[1.4] text-mist/80">
        {item.description}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-lg leading-[25px] font-medium text-sunflower transition-colors group-hover:text-bitmap-highlight">
        <span className="underline underline-offset-2">{item.cta}</span>
        <CtaArrow />
      </span>
    </>
  );

  return isExternalHref(item.href) ? (
    <a href={item.href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

export function ResourcesLatest() {
  return (
    <section
      className={`relative ${sectionInset} pt-[clamp(1.5rem,3vw,3rem)] pb-[clamp(4.5rem,8vw,6rem)]`}
      aria-labelledby="resources-latest"
    >
      <div className="mx-auto max-w-[1232px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2
            id="resources-latest"
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {resourcesLatest.title}
          </h2>
          <BlogReadLink href={blogMeta.path}>
            {resourcesLatest.cta}
          </BlogReadLink>
        </div>
        <div className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {blogPosts.slice(0, resourcesLatest.count).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
