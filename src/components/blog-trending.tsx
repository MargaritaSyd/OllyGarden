import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { BlogEyebrow } from "@/components/blog-ui";
import { WebinarVideoCard } from "@/components/webinar-video-card";
import { blogTrending, blogVideos } from "@/lib/blog";

export function BlogTrending() {
  return (
    <section
      className="px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4rem,6.5vw,6rem)] max-[880px]:px-6"
      aria-labelledby="trending-title"
    >
      <div className="mx-auto max-w-[1232px]">
        <div className="mb-10 flex flex-col gap-6 min-[881px]:flex-row min-[881px]:items-end min-[881px]:justify-between">
          <div className="max-w-[720px]">
            <BlogEyebrow>{blogTrending.eyebrow}</BlogEyebrow>
            <h2
              id="trending-title"
              className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
            >
              {blogTrending.title}
            </h2>
            <p className="mt-4 text-base leading-[1.4] text-mist">{blogTrending.sub}</p>
          </div>
          <GetStartedLink href={blogTrending.ctaHref} className="shrink-0">
            {blogTrending.cta}
            <CtaArrow />
          </GetStartedLink>
        </div>

        <div className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {blogVideos.map((video) => (
            <WebinarVideoCard
              key={video.href}
              video={{
                date: video.date,
                title: video.title,
                href: video.href,
                image: video.image,
                alt: video.alt,
                venue: "YouTube",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
