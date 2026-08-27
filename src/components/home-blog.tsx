import Link from "next/link";
import { BlogMeta, BlogReadLink } from "@/components/blog-ui";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import {
  blogAuthor,
  blogPostHref,
  featuredBlogPosts,
  formatBlogDate,
} from "@/lib/blog";
import { homeBlog } from "@/lib/home";

export function HomeBlog() {
  const posts = featuredBlogPosts.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:px-12 lg:px-[104px]"
      aria-labelledby="home-blog-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <div className="mb-12 flex flex-col gap-8 min-[881px]:flex-row min-[881px]:items-center min-[881px]:justify-between">
          <div className="flex max-w-[1010px] flex-col gap-4">
            <p className="text-base font-bold text-bitmap-mid">{homeBlog.eyebrow}</p>
            <h2
              id="home-blog-title"
              className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
            >
              {homeBlog.title}
            </h2>
            <p className="text-base leading-[1.4] text-mist">{homeBlog.sub}</p>
          </div>
          <GetStartedLink href={homeBlog.ctaHref} className="shrink-0">
            {homeBlog.cta}
            <CtaArrow />
          </GetStartedLink>
        </div>

        <div className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex h-full flex-col gap-6">
              <div className="aspect-video overflow-hidden rounded-2xl bg-[#00280e]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={`Cover illustration for “${post.title}”`}
                  width={384}
                  height={216}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <BlogMeta
                date={formatBlogDate(post.date, "short")}
                suffix={`Author: ${blogAuthor}`}
              />
              <h3 className="text-2xl leading-[1.29] font-bold tracking-[-0.02em] text-mist">
                <Link href={blogPostHref(post.slug)} className="hover:text-sunflower">
                  {post.title}
                </Link>
              </h3>
              <div className="mt-auto">
                <BlogReadLink
                  href={blogPostHref(post.slug)}
                  ariaLabel={`Read Article: ${post.title}`}
                >
                  Read Article
                </BlogReadLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
