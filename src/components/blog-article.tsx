import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { BlogEyebrow, BlogMeta, BlogTags } from "@/components/blog-ui";
import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import {
  blogAuthor,
  blogCoverAlt,
  blogMeta,
  blogPostHref,
  blogPostPage,
  formatBlogDate,
  type BlogPost,
} from "@/lib/blog";

export function BlogArticle({
  post,
  html,
  prev,
  next,
  related,
}: {
  post: BlogPost;
  html: string;
  prev?: BlogPost;
  next?: BlogPost;
  related: readonly BlogPost[];
}) {
  return (
    <>
      <article className="px-[clamp(1.5rem,7.25vw,6.5rem)] pt-[clamp(8rem,15vw,13rem)] pb-[clamp(4.5rem,8vw,6rem)] max-[880px]:px-6">
        <div className="mx-auto flex max-w-[1232px] flex-col gap-[clamp(1.75rem,3.4vw,3rem)]">
          <Link
            href={blogMeta.path}
            className="group inline-flex items-center gap-2 self-start text-base font-medium text-sunflower hover:underline hover:underline-offset-[3px]"
          >
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-0.5">
              ←
            </span>
            {blogPostPage.back}
          </Link>

          <header className="flex flex-col gap-8">
            <BlogMeta
              date={formatBlogDate(post.date, "long")}
              suffix={`Author: ${blogAuthor}`}
            />
            <h1 className="text-[clamp(2rem,5.4vw,4rem)] leading-[1.125] font-bold tracking-[-0.02em] text-mist">
              {post.title}
            </h1>
            <BlogTags tags={post.tags} size="md" />
            <p className="text-[clamp(1.125rem,1.6vw,1.25rem)] leading-[1.4] tracking-[0.02em] text-[#cdcdcd]">
              {post.excerpt}
            </p>
          </header>

          <figure className="overflow-hidden rounded-2xl bg-[#00280e]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={blogCoverAlt(post.title)}
              width={1232}
              height={703}
              className="h-auto w-full"
            />
          </figure>

          <div className="post-richtext" dangerouslySetInnerHTML={{ __html: html }} />

          {prev || next ? (
            <nav className="mt-2 flex items-stretch justify-between gap-4" aria-label="Post navigation">
              {prev ? (
                <GetStartedLink
                  href={blogPostHref(prev.slug)}
                  className="!w-auto !max-w-none"
                  aria-label={`Previous post: ${prev.title}`}
                >
                  <span className="post-nav-arrow" aria-hidden="true">
                    ←
                  </span>
                  Previous
                </GetStartedLink>
              ) : (
                <span />
              )}
              {next ? (
                <GetStartedLink
                  href={blogPostHref(next.slug)}
                  className="!w-auto !max-w-none"
                  aria-label={`Next post: ${next.title}`}
                >
                  Next
                  <span className="post-nav-arrow" aria-hidden="true">
                    →
                  </span>
                </GetStartedLink>
              ) : null}
            </nav>
          ) : null}
        </div>
      </article>

      {related.length > 0 ? (
        <section
          className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-16 max-[880px]:px-6"
          aria-labelledby="featured-posts-title"
        >
          <div className="tulip-grid" aria-hidden="true" />
          <div className="relative z-[1] mx-auto max-w-[1232px]">
            <div className="mb-10 flex flex-col gap-8 min-[881px]:flex-row min-[881px]:items-start min-[881px]:justify-between">
              <div className="flex max-w-[1010px] flex-col">
                <BlogEyebrow>{blogPostPage.featuredEyebrow}</BlogEyebrow>
                <h2
                  id="featured-posts-title"
                  className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
                >
                  {blogPostPage.featuredTitle}
                </h2>
                <p className="mt-4 text-base leading-[1.4] text-mist">{blogPostPage.featuredSub}</p>
              </div>
              <GetStartedLink href={blogMeta.path} className="shrink-0">
                {blogPostPage.featuredCta}
                <CtaArrow />
              </GetStartedLink>
            </div>
            <div className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
