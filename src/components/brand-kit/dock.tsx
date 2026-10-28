"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { BrandGlyph } from "@/components/brand-kit/glyph";
import { brandKitDock } from "@/lib/brand-kit/content";

export function BrandDock() {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const hero = document.querySelector(".bk-hero");
      const closing = document.getElementById("cta-title")?.closest("section");
      const pastHero = !hero || hero.getBoundingClientRect().bottom < height * 0.4;
      const beforeClose = !closing || closing.getBoundingClientRect().top > height * 0.75;
      setShown(pastHero && beforeClose);
      let current: string | null = null;
      for (const section of brandKitDock) {
        const node = document.getElementById(section.id);
        if (node && node.getBoundingClientRect().top <= height * 0.4) current = section.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const placePill = useCallback(() => {
    const list = listRef.current;
    const link = active ? links.current[active] : null;
    if (!list) return;
    if (!link) {
      list.style.setProperty("--pill-w", "0px");
      return;
    }
    list.style.setProperty("--pill-x", `${link.offsetLeft}px`);
    list.style.setProperty("--pill-w", `${link.offsetWidth}px`);
  }, [active]);

  useLayoutEffect(() => {
    placePill();
  }, [placePill]);

  useEffect(() => {
    window.addEventListener("resize", placePill);
    document.fonts?.ready.then(placePill);
    return () => window.removeEventListener("resize", placePill);
  }, [placePill]);

  function jump(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <nav className={`bk-dock${shown ? " is-on" : ""}`} aria-label="Brand Kit sections" inert={!shown}>
      <ul className="bk-dock-list" ref={listRef}>
        <li className="bk-dock-pill" aria-hidden="true" />
        {brandKitDock.map((section) => (
          <li key={section.id}>
            <a
              ref={(node) => {
                links.current[section.id] = node;
              }}
              className={`bk-dock-link${active === section.id ? " is-active" : ""}`}
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              title={section.label}
              onClick={(event) => jump(event, section.id)}
            >
              <BrandGlyph name={section.icon} size={16} />
              <span className="bk-dock-label">{section.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
