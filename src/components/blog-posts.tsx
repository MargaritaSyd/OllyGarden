import { BlogCard } from "@/components/blog-card";
import { BlogEyebrow, PetalMark } from "@/components/blog-ui";
import { blogAll, blogPosts } from "@/lib/blog";

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
          <BlogEyebrow>{blogAll.eyebrow}</BlogEyebrow>
          <h2
            id="all-posts-title"
            className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.08] font-bold tracking-[-0.02em] text-mist"
          >
            {blogAll.title}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-10 max-[720px]:mx-auto max-[720px]:max-w-[400px] min-[721px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
