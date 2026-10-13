"use client";

import Link from "next/link";
import { CtaArrow } from "@/components/cta-arrow";
import { isExternalHref } from "@/lib/dom";
import type { NotFoundLink } from "@/lib/not-found";
import { capturePostHogEvent, urlWithoutQuery } from "@/lib/posthog";

const SECTION = "not_found";

const cardClassName =
  "group surface-grain flex h-full flex-col items-start gap-2 rounded-2xl border border-border bg-[#19321e] p-5 text-left transition-[border-color,transform] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-sunflower/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight motion-safe:hover:-translate-y-0.5";

export function NotFoundLinks({
  heading,
  links,
}: {
  heading: string;
  links: readonly NotFoundLink[];
}) {
  // A region rather than <nav>: the global click listener would otherwise
  // also count these cards as navigation_clicked.
  return (
    <section aria-labelledby="nf-links-heading" className="w-full">
      <h2 id="nf-links-heading" className="sr-only">
        {heading}
      </h2>
      <ul className="grid gap-4 min-[1024px]:grid-cols-3">
        {links.map((link) => (
          <li key={link.id} className="h-full">
            <NotFoundCard link={link} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function NotFoundCard({ link }: { link: NotFoundLink }) {
  const external = isExternalHref(link.href);

  const content = (
    <>
      <h3 className="inline-flex items-center gap-2 text-lg font-bold text-mist">
        {link.label}
        <CtaArrow className="text-sunflower" />
      </h3>
      <span className="text-sm leading-[1.5] text-mist/70">{link.description}</span>
    </>
  );

  function onClick() {
    // Cross-origin links unload the page immediately, so send by beacon.
    capturePostHogEvent(
      "cta_clicked",
      {
        button_id: link.id,
        button_text: link.label,
        section: SECTION,
        destination_url: urlWithoutQuery(link.href),
      },
      external ? { transport: "sendBeacon" } : undefined,
    );
  }

  // Cross-origin links (docs) stay out of the App Router, as in MegaMenuItem.
  if (external) {
    return (
      <a href={link.href} className={cardClassName} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={cardClassName} onClick={onClick}>
      {content}
    </Link>
  );
}
