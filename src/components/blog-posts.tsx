import { BlogMeta, BlogReadLink, BlogTags, PetalMark } from "@/components/blog-ui";
import {
  blogAll,
  blogAuthor,
  blogPostHref,
  blogPosts,
  formatBlogDate,
} from "@/lib/blog";

export function BlogPosts() {
  return (
    <section
      className="relative overflow-hidden px-[clamp(1.5rem,7.25vw,6.5rem)] py-16 max-[880px]:px-6"
      aria-labelledby="all-posts-title"
    >
      <div className="tulip-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-[1232px]">
        <header className="mb-10">
          <span className="mb-4 block text-bitmap-mid">
            <PetalMark />
          </span>
          <p className="text-base font-bold text-bitmap-mid">{blogAll.eyebrow}</p>
          <h2
            id="all-posts-title"
            className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {blogAll.title}
          </h2>
          <p className="mt-4 max-w-[784px] text-base leading-[1.4] text-mist">
            {blogAll.sub}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-3xl border border-sunflower/40 bg-[#00280e]"
            >
              <div className="h-[250px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={`Cover illustration for “${post.title}”`}
                  width={384}
                  height={250}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-5 p-6">
                <BlogMeta
                  date={formatBlogDate(post.date, "short")}
                  suffix={`Author: ${blogAuthor}`}
                />
                <h3 className="text-2xl leading-[1.29] font-bold tracking-[-0.02em] text-mist">
                  {post.title}
                </h3>
                <p className="text-base leading-[1.4] text-mist/85">{post.excerpt}</p>
                <BlogTags tags={post.tags} />
                <BlogReadLink href={blogPostHref(post.slug)}>Read Article</BlogReadLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
