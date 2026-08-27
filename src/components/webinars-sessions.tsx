import { CtaArrow } from "@/components/cta-arrow";
import { BlogMeta } from "@/components/blog-ui";
import { WebinarVideoCard } from "@/components/webinar-video-card";
import { webinarsSessions } from "@/lib/webinars";

export function WebinarsSessions() {
  const { eyebrow, title, sub, cta, youtubeHref, videos, featured } = webinarsSessions;

  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6"
      aria-labelledby="webinars-sessions-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex max-w-[1232px] flex-col gap-10">
        <div className="flex flex-col gap-6 min-[881px]:flex-row min-[881px]:items-end min-[881px]:justify-between">
          <div className="max-w-[720px]">
            <p className="text-base font-bold tracking-[0.1em] text-bitmap-mid uppercase">
              {eyebrow}
            </p>
            <h2
              id="webinars-sessions-title"
              className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
            >
              {title}
            </h2>
            <p className="mt-4 text-base leading-[1.4] text-mist">{sub}</p>
          </div>
          <a
            href={youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 w-full max-w-[340px] shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-mist px-[30px] text-base font-semibold text-forest transition-colors hover:bg-sunflower sm:w-auto"
          >
            {cta}
            <CtaArrow />
          </a>
        </div>

        <ul
          className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3"
          aria-label="OllyGarden Webinars"
        >
          {videos.map((video) => (
            <li key={video.href}>
              <WebinarVideoCard
                video={{
                  date: video.date,
                  title: video.title,
                  href: video.href,
                  image: video.image,
                  alt: video.alt,
                  venue: "YouTube",
                }}
              />
            </li>
          ))}
        </ul>

        <article className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-sunflower/40 bg-[#00280e] p-6 min-[881px]:flex-row min-[881px]:items-center">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-[0.1em] text-bitmap-mid uppercase">
              {featured.eyebrow}
            </p>
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-mist">{featured.title}</h3>
            <BlogMeta date={featured.date} suffix={featured.suffix} />
            <p className="text-base text-mist">{featured.description}</p>
          </div>
          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full max-w-[340px] shrink-0 items-center justify-center rounded-2xl bg-mist px-[30px] text-base font-semibold text-forest transition-colors hover:bg-sunflower sm:w-auto"
            aria-label={`${featured.cta}: ${featured.title} (opens in a new tab)`}
          >
            {featured.cta}
          </a>
        </article>
      </div>
    </section>
  );
}
