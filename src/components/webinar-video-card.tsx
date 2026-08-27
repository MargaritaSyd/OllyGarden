import { CtaArrow } from "@/components/cta-arrow";
import { BlogMeta } from "@/components/blog-ui";
import { formatBlogDate } from "@/lib/blog";

export type WebinarCardVideo = {
  date: string;
  title: string;
  href: string;
  image: string;
  alt: string;
  venue: string;
};

export function WebinarVideoCard({ video }: { video: WebinarCardVideo }) {
  return (
    <a
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-6"
      aria-label={`Watch “${video.title}” on YouTube (opens in a new tab)`}
    >
      <span className="block aspect-video overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.image}
          alt={video.alt}
          width={384}
          height={216}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </span>
      <BlogMeta date={formatBlogDate(video.date, "long")} suffix={video.venue} />
      <h3 className="line-clamp-3 text-2xl leading-[1.29] font-bold tracking-[-0.02em] text-mist">
        {video.title}
      </h3>
      <span className="inline-flex items-center gap-2 text-lg font-medium text-sunflower">
        <span className="underline underline-offset-2">Watch Now</span>
        <CtaArrow />
      </span>
    </a>
  );
}
