import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { communityJoin } from "@/lib/community";

export function CommunityJoin() {
  return (
    <section
      className="overflow-hidden py-[clamp(4rem,6.5vw,6rem)] pl-[clamp(1.5rem,7.25vw,6.5rem)] max-[880px]:px-6"
      id="join-us"
      aria-labelledby="ju-title"
    >
      <div className="grid items-center gap-10 min-[1101px]:grid-cols-[minmax(0,563px)_minmax(0,1fr)] min-[1101px]:gap-16">
        <div className="flex max-w-[563px] flex-col items-start gap-4">
          <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
            {communityJoin.eyebrow}
          </p>
          <h2
            id="ju-title"
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.27] font-bold tracking-[-0.02em] text-mist"
          >
            {communityJoin.title}
          </h2>
          {communityJoin.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="max-w-[510px] text-base leading-[1.4] tracking-[0.02em] text-mist"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <GetStartedLink href={communityJoin.primary.href}>
              {communityJoin.primary.label}
              <CtaArrow />
            </GetStartedLink>
            <GetStartedLink href={communityJoin.secondary.href} variant="secondary">
              {communityJoin.secondary.label}
            </GetStartedLink>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={communityJoin.image.src}
          alt={communityJoin.image.alt}
          width={1438}
          height={804}
          loading="lazy"
          className="h-auto w-full min-[1101px]:h-[388px] min-[1101px]:object-cover min-[1101px]:object-left"
        />
      </div>
    </section>
  );
}
