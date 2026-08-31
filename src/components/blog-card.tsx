import { BlogMeta, BlogReadLink, BlogTags } from "@/components/blog-ui";
import {
  blogAuthor,
  blogCardTags,
  blogCoverAlt,
  blogPostHref,
  formatBlogDate,
  type BlogPost,
} from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-sunflower/40 bg-[#00280e]">
      <div className="h-[250px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={blogCoverAlt(post.title)}
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
        <BlogTags tags={blogCardTags(post)} />
        <BlogReadLink href={blogPostHref(post.slug)}>Read Article</BlogReadLink>
      </div>
    </article>
  );
}
