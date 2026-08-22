import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { FooterMadeIn } from "@/components/footer-made-in";
import { footerColumns, type NavLink } from "@/lib/nav";
import { siteConfig } from "@/lib/site";

const STRIP_REPEAT_IDS = [1, 2, 3, 4, 5] as const;
const STRIP_COPIES = 16;

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto grid w-full max-w-7xl gap-y-14 px-6 pt-16 pb-20 sm:px-8 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)] lg:gap-x-[clamp(3rem,6.5vw,6.875rem)] lg:px-12 lg:pt-[88px] lg:pb-24">
        <div>
          <BrandLogo className="h-8" height={32} />
          <p className="mt-6 max-w-[300px] text-[15.5px] leading-[1.7] text-mist/55">
            {siteConfig.tagline}
          </p>
          <ul className="mt-7 flex items-center gap-5 text-mist/55">
            <li>
              <SocialLink href={siteConfig.social.github} label="GitHub">
                <GitHubIcon />
              </SocialLink>
            </li>
            <li>
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
            </li>
            <li>
              <SocialLink href={siteConfig.social.email} label="Email">
                <MailIcon />
              </SocialLink>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-11 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8 lg:pt-1.5">
            {footerColumns.map((column) => (
              <li key={column.id}>
                <p className="text-base font-bold text-mist">{column.label}</p>
                <ul className="mt-[18px] space-y-3">
                  {column.items.map((item) => (
                    <li key={`${column.id}-${item.href}-${item.label}`}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-sm leading-normal text-mist/55 lg:col-span-2">
          <p>©2026 OllyGarden, Inc. All rights reserved.</p>
          <FooterMadeIn />
        </div>
      </div>

      <FooterStrip />
    </footer>
  );
}

function FooterStrip() {
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className="flex w-max">
        <StripTile id={0} />
        {Array.from({ length: STRIP_COPIES }, (_, copy) => (
          <div key={copy} className="flex shrink-0">
            {STRIP_REPEAT_IDS.map((id) => (
              <StripTile key={id} id={id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StripTile({ id }: { id: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/footer-strips/strip-${id}.svg`}
      alt=""
      width={id === 0 ? 48 : 64}
      height={29}
      className="block h-[29px] w-auto shrink-0"
    />
  );
}

function FooterLink({ item }: { item: NavLink }) {
  const className =
    "block text-[15.5px] leading-snug text-mist/55 transition-colors hover:text-sunflower";

  if (item.hash) {
    return (
      <a href={item.href} className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

function SocialLink({
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
      className="inline-flex transition-colors hover:text-sunflower"
      aria-label={label}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m3.5 6.5 8.5 6.5 8.5-6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
