import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { InView } from "@/components/in-view";
import { ResourceCard, ResourceCardImage } from "@/components/resource-card";
import {
  blogAuthor,
  blogCoverAlt,
  blogPostHref,
  featuredBlogPosts,
  formatBlogDate,
} from "@/lib/blog";
import { homeBlog } from "@/lib/home";

export function HomeBlog() {
  const posts = featuredBlogPosts.slice(0, 3);

  return (
    <InView
      as="section"
      className="relative overflow-hidden px-6 py-24 sm:px-12 lg:px-[104px]"
      aria-labelledby="home-blog-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="mb-12 flex flex-col gap-8 min-[881px]:flex-row min-[881px]:items-center min-[881px]:justify-between">
          <div className="home-blog-copy flex max-w-[1010px] flex-col gap-4">
            <p className="text-base font-bold text-bitmap-mid">{homeBlog.eyebrow}</p>
            <h2
              id="home-blog-title"
              className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
            >
              {homeBlog.title}
            </h2>
            <p className="text-base leading-[1.4] text-mist">{homeBlog.sub}</p>
          </div>
          <div className="home-blog-cta shrink-0">
            <GetStartedLink href={homeBlog.ctaHref}>
              {homeBlog.cta}
              <CtaArrow />
            </GetStartedLink>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {posts.map((post) => (
            <ResourceCard
              key={post.slug}
              className="home-blog-card"
              href={blogPostHref(post.slug)}
              ariaLabel={`Read Article: ${post.title}`}
              media={
                <ResourceCardImage src={post.image} alt={blogCoverAlt(post.title)} />
              }
              date={formatBlogDate(post.date, "short")}
              suffix={`Author: ${blogAuthor}`}
              title={post.title}
              cta="Read Article"
            />
          ))}
        </div>
      </div>
    </InView>
  );
}
