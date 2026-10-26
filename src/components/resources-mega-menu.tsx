"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { isExternalHref, isPlainLeftClick } from "@/lib/dom";
import {
  featuredResources,
  headerResourceLinks,
  type FeaturedResource,
  type NavLink,
} from "@/lib/nav";
import { siteConfig } from "@/lib/site";

const CAROUSEL_INTERVAL_MS = 5000;

export function ResourcesMegaMenu() {
  return (
    <div
      id="mega-resources"
      className="hidden border-t border-mist/10 px-5 py-6 lg:block"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(240px,340px)] items-start gap-x-10">
        <div>
          <p className="px-3 text-sm font-bold text-mist">Resources</p>
          <div className="mt-5 grid grid-cols-3 gap-x-7 gap-y-2">
            {headerResourceLinks.map((item) => (
              <ResourceMenuLink key={item.label} item={item} />
            ))}
            <SocialsCell />
          </div>
        </div>

        <FeaturedResourceCarousel />
      </div>
    </div>
  );
}

function ResourceMenuLink({ item }: { item: NavLink }) {
  const pathname = usePathname();
  const router = useRouter();
  const active = pathname === item.href;
  const external = isExternalHref(item.href);

  const className = `group grid h-full w-full grid-cols-[20px_minmax(0,1fr)] items-start gap-x-2.5 rounded-lg px-3 pb-3 pt-2.5 text-left transition-colors hover:bg-mist/10 ${
    active ? "bg-mist/10" : ""
  }`;

  const content = (
    <>
      <span className="flex h-5 w-5 items-center justify-center text-sunflower">
        <ResourceLinkIcon href={item.href} />
      </span>
      <span
        className={`text-[15px] font-semibold leading-snug ${
          active ? "text-sunflower" : "text-mist group-hover:text-sunflower"
        }`}
      >
        {item.label}
      </span>
      {item.description ? (
        <span className="col-start-2 mt-0.5 text-[13px] font-light leading-snug text-mist/55">
          {item.description}
        </span>
      ) : null}
    </>
  );

  // Another origin: let the browser navigate rather than the App Router.
  if (external) {
    return (
      <a href={item.href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      onClick={(event) => {
        if (!isPlainLeftClick(event)) {
          return;
        }
        event.preventDefault();
        router.push(item.href);
      }}
    >
      {content}
    </Link>
  );
}

function FeaturedResourceCarousel() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = featuredResources.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || count < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [index, reduceMotion, count]);

  return (
    <div
      className="min-w-0"
      role="group"
      aria-roledescription="carousel"
      aria-label="Latest resources"
    >
      <div className="overflow-hidden">
        <div
          className={`flex ${
            reduceMotion
              ? ""
              : "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {featuredResources.map((slide, slideIndex) => (
            <div key={slide.href} className="w-full min-w-0 shrink-0 grow-0 basis-full">
              <FeaturedResourceSlide slide={slide} active={slideIndex === index} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="relative z-10 mt-4 flex items-center gap-1"
        role="tablist"
        aria-label="Featured resource"
      >
        {featuredResources.map((slide, slideIndex) => {
          const selected = slideIndex === index;

          return (
            <button
              key={slide.href}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`Show featured resource ${slideIndex + 1}`}
              className="flex h-6 w-6 items-center justify-center"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIndex(slideIndex);
              }}
            >
              <span
                className={
                  selected
                    ? "h-1.5 w-5 rounded-full bg-sunflower"
                    : "h-1.5 w-1.5 rounded-full bg-mist/35"
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeaturedResourceSlide({
  slide,
  active,
}: {
  slide: FeaturedResource;
  active: boolean;
}) {
  const router = useRouter();

  return (
    <Link
      href={slide.href}
      className="group block min-w-0"
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
      onClick={(event) => {
        if (!isPlainLeftClick(event)) {
          return;
        }
        event.preventDefault();
        router.push(slide.href);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image}
        alt={slide.imageAlt}
        width={2000}
        height={1142}
        className="block aspect-[2000/1142] h-auto w-full max-w-full rounded-xl object-cover"
      />
      <p className="mt-3 flex flex-wrap items-center gap-x-2 text-xs font-light tracking-wide text-mist/55">
        <span>{slide.category}</span>
        <span aria-hidden="true">|</span>
        <span>{slide.date}</span>
        <span aria-hidden="true">|</span>
        <span className="inline-flex items-center gap-1">
          {slide.sourceIcon === "youtube" ? (
            <span className="text-mist/70">
              <YouTubeIcon />
            </span>
          ) : null}
          {slide.source}
        </span>
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-mist transition-colors group-hover:text-sunflower">
        {slide.title}
      </h3>
    </Link>
  );
}

function SocialsCell() {
  return (
    <div className="mt-2.5 grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-2.5 px-3">
      <span className="flex h-5 w-5 items-center justify-center text-sunflower">
        <MonitorIcon />
      </span>
      <div>
        <p className="text-[15px] font-semibold text-mist">Socials</p>
        <ul className="mt-2 flex items-center gap-3.5">
          <li>
            <SocialIconLink href={siteConfig.social.linkedin} label="OllyGarden on LinkedIn">
              <LinkedInIcon />
            </SocialIconLink>
          </li>
          <li>
            <SocialIconLink href={siteConfig.social.github} label="OllyGarden on GitHub">
              <GitHubIcon />
            </SocialIconLink>
          </li>
          <li>
            <SocialIconLink href={siteConfig.social.youtube} label="OllyGarden on YouTube">
              <YouTubeIcon />
            </SocialIconLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      rel="noreferrer noopener"
      target="_blank"
      className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-mist/10 bg-mist/[0.06] text-mist transition-colors hover:border-sunflower hover:bg-sunflower hover:text-forest"
    >
      {children}
    </a>
  );
}

function ResourceLinkIcon({ href }: { href: string }) {
  switch (href) {
    case siteConfig.docsUrl:
      return <BookIcon />;
    case "/resources/blog":
      return <NewspaperIcon />;
    case "/resources/webinars-conferences":
      return <VideoIcon />;
    case "/resources/events":
      return <CalendarIcon />;
    case "/resources/press-releases":
      return <MegaphoneIcon />;
    case "/resources/case-studies":
      return <QuoteIcon />;
    case "/resources/telemetry-quality":
      return <SproutIcon />;
    case "/resources/instrumentation-score":
      return <GaugeIcon />;
    case "/resources/agent-skills":
      return <CodeIcon />;
    case "/resources/faq":
      return <HelpCircleIcon />;
    case "/otel-quiz":
      return <ListChecksIcon />;
    case "/resources/trust-game":
      return <ScanSearchIcon />;
    default:
      return null;
  }
}

function StrokeIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function BookIcon() {
  return (
    <StrokeIcon>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M9 7h7" />
      <path d="M9 11h5" />
    </StrokeIcon>
  );
}

function NewspaperIcon() {
  return (
    <StrokeIcon>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </StrokeIcon>
  );
}

function VideoIcon() {
  return (
    <StrokeIcon>
      <path d="m22 8-6 4 6 4V8Z" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </StrokeIcon>
  );
}

function CalendarIcon() {
  return (
    <StrokeIcon>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
    </StrokeIcon>
  );
}

function MegaphoneIcon() {
  return (
    <StrokeIcon>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </StrokeIcon>
  );
}

function QuoteIcon() {
  return (
    <StrokeIcon>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3c0 4-3 6-4 6" />
      <path d="M14 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3c0 4-3 6-4 6" />
    </StrokeIcon>
  );
}

function CodeIcon() {
  return (
    <StrokeIcon>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </StrokeIcon>
  );
}

function SproutIcon() {
  return (
    <StrokeIcon>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </StrokeIcon>
  );
}

function GaugeIcon() {
  return (
    <StrokeIcon>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </StrokeIcon>
  );
}

function HelpCircleIcon() {
  return (
    <StrokeIcon>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </StrokeIcon>
  );
}

function ListChecksIcon() {
  return (
    <StrokeIcon>
      <path d="m3 7 2 2 4-4" />
      <path d="m3 17 2 2 4-4" />
      <path d="M13 6h8" />
      <path d="M13 12h8" />
      <path d="M13 18h8" />
    </StrokeIcon>
  );
}

function ScanSearchIcon() {
  return (
    <StrokeIcon>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
      <path d="m16 16 2 2" />
    </StrokeIcon>
  );
}

function MonitorIcon() {
  return (
    <StrokeIcon>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </StrokeIcon>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.8 15.5v-7l6.2 3.5-6.2 3.5Z" />
    </svg>
  );
}
