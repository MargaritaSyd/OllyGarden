import { ResourceCard, ResourceCardImage } from "@/components/resource-card";
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
    <ResourceCard
      href={video.href}
      external
      ariaLabel={`Watch “${video.title}” on YouTube (opens in a new tab)`}
      media={<ResourceCardImage src={video.image} alt={video.alt} />}
      date={formatBlogDate(video.date, "long")}
      suffix={video.venue}
      title={video.title}
      titleClassName="line-clamp-3"
      cta="Watch Now"
    />
  );
}
