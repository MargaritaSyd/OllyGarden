"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { faqSections } from "@/lib/faq";

export function FaqSidenav() {
  const [active, setActive] = useState(faqSections[0]?.id ?? "general");

  useEffect(() => {
    const ids = faqSections.map((section) => section.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const next = visible[0]?.target.id;
        if (!next) {
          return;
        }
        setActive(next);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: [0, 0.15, 0.4] },
    );

    for (const node of nodes) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  function onJump(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    event.preventDefault();
    setActive(id);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  return (
    <nav
      className="max-[900px]:sticky max-[900px]:top-0 max-[900px]:z-20 max-[900px]:-mx-[clamp(1.5rem,7.25vw,6.5rem)] max-[900px]:mb-8 max-[900px]:border-b max-[900px]:border-white/[0.08] max-[900px]:bg-forest max-[900px]:py-3 max-[880px]:-mx-6"
      aria-label="FAQ topics"
    >
      <div className="sticky top-10 max-h-[calc(100svh-80px)] overflow-y-auto overscroll-contain max-[900px]:static max-[900px]:max-h-none max-[900px]:overflow-visible">
        <p
          id="faq-sidenav-label"
          className="mb-3 pl-[18px] text-xs font-semibold tracking-[0.08em] text-[#9dafa3] uppercase max-[900px]:hidden"
        >
          On this page
        </p>
        <ul
          className="border-l border-white/12 max-[900px]:flex max-[900px]:gap-2 max-[900px]:overflow-x-auto max-[900px]:border-l-0 max-[900px]:px-[clamp(1.5rem,7.25vw,6.5rem)] max-[900px]:[scrollbar-width:none] max-[900px]:[&::-webkit-scrollbar]:hidden max-[880px]:px-6"
          aria-labelledby="faq-sidenav-label"
        >
          {faqSections.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id} className="max-[900px]:shrink-0">
                <a
                  href={`#${section.id}`}
                  className={`block -ml-px border-l-2 py-[9px] pr-0 pl-[17px] text-sm leading-5 font-medium transition-colors duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] max-[900px]:ml-0 max-[900px]:rounded-full max-[900px]:border max-[900px]:py-[7px] max-[900px]:pr-3.5 max-[900px]:pl-3.5 max-[900px]:whitespace-nowrap ${
                    isActive
                      ? "border-sunflower text-bitmap-highlight max-[900px]:border-sunflower max-[900px]:bg-[#19321e]"
                      : "border-transparent text-[#9dafa3] hover:text-mist max-[900px]:border-white/14 max-[900px]:bg-[#19321e]"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => onJump(event, section.id)}
                >
                  {section.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
