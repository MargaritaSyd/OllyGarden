"use client";

import { useState, type KeyboardEvent } from "react";
import { BlogMeta, BlogReadLink, BlogTags, PetalMark } from "@/components/blog-ui";
import {
  blogAuthor,
  blogPostHref,
  featuredBlogPosts,
  formatBlogDate,
  type BlogPost,
} from "@/lib/blog";

export function BlogFeatured() {
  const slides = featuredBlogPosts;
  const [index, setIndex] = useState(0);
  const count = slides.length;

  function goTo(next: number) {
    setIndex((next + count) % count);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  return (
    <section
      className="relative px-[clamp(1.5rem,7.25vw,6.5rem)] pb-[clamp(4rem,8vw,7rem)] max-[880px]:px-6"
      aria-label="Featured posts"
    >
      <div className="mx-auto max-w-[1232px]">
        <div
          className="relative overflow-hidden rounded-3xl border border-sunflower/40 bg-[#00280e]"
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured posts"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="overflow-hidden">
            <div
              className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((post, slideIndex) => (
                <article
                  key={post.slug}
                  className="flex w-full shrink-0 basis-full flex-col min-[881px]:h-[492px] min-[881px]:flex-row"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${slideIndex + 1} of ${count}`}
                  aria-hidden={slideIndex !== index}
                  inert={slideIndex !== index}
                >
                  <FeaturedMedia post={post} priority={slideIndex === 0} />
                  <div className="flex flex-1 flex-col justify-center gap-5 px-6 py-8 min-[881px]:px-11 min-[881px]:py-10">
                    <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.28] font-bold tracking-[-0.02em] text-mist">
                      {post.title}
                    </h2>
                    <p className="text-base leading-[1.4] text-mist/85">{post.excerpt}</p>
                    <BlogMeta
                      date={formatBlogDate(post.date, "long")}
                      suffix={`Author: ${blogAuthor}`}
                    />
                    <BlogTags tags={post.featuredTags ?? post.tags} />
                    <BlogReadLink href={blogPostHref(post.slug)}>Read Article</BlogReadLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex items-center justify-between"
          aria-label="Carousel controls"
        >
          <ArrowButton label="Previous slide" onClick={() => goTo(index - 1)} />
          <div className="flex items-center gap-3" role="tablist">
            {slides.map((post, slideIndex) => {
              const active = slideIndex === index;
              return (
                <button
                  key={post.slug}
                  type="button"
                  role="tab"
                  aria-label={`Go to slide ${slideIndex + 1}`}
                  aria-selected={active}
                  onClick={() => goTo(slideIndex)}
                  className={`h-2 rounded-full bg-[#d6d620] transition-[width,opacity] ${
                    active ? "w-12 opacity-100" : "w-2 opacity-60"
                  }`}
                />
              );
            })}
          </div>
          <ArrowButton label="Next slide" onClick={() => goTo(index + 1)} flipped />
        </div>
      </div>
    </section>
  );
}

function FeaturedMedia({ post, priority }: { post: BlogPost; priority: boolean }) {
  return (
    <div className="relative h-[220px] shrink-0 overflow-hidden min-[881px]:h-auto min-[881px]:w-[50.7%]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.image}
        alt={`Cover illustration for “${post.title}”`}
        width={624}
        height={492}
        fetchPriority={priority ? "high" : undefined}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 flex flex-col">
        {post.ribbon ? (
          <span className="inline-flex h-[52px] items-center bg-[#c8d99b] px-4 text-[15px] font-bold text-[#0f2a0b]">
            {post.ribbon}
          </span>
        ) : null}
        <span className="inline-flex h-[52px] items-center gap-2 bg-bitmap-mid px-4 text-[15px] font-bold text-[#0f2a0b]">
          <PetalMark size={18} />
          Featuring in OpenTelemetry
        </span>
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  onClick,
  flipped = false,
}: {
  label: string;
  onClick: () => void;
  flipped?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-12 place-items-center rounded-full bg-olive text-mist transition-colors hover:bg-[#7a9210]"
    >
      <svg
        viewBox="0 0 48 48"
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        className={flipped ? "-scale-x-100" : undefined}
      >
        <path
          d="M23.9987 12.334L12.332 24.0007L23.9987 35.6673M12.332 24.0007H35.6654"
          stroke="currentColor"
          strokeWidth="3.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
