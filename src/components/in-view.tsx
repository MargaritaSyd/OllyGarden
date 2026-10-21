"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useIsClient, usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type InViewTag = "div" | "section" | "article" | "li";

type InViewProps = {
  as?: InViewTag;
  mark?: "in-view" | "rv-in";
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function InView({
  as: Tag = "div",
  mark = "in-view",
  once = true,
  threshold = 0.05,
  rootMargin = "0px",
  className = "",
  children,
  ...rest
}: InViewProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();
  const armed = isClient && !prefersReducedMotion;
  const [inView, setInView] = useState(false);
  const visible = prefersReducedMotion || inView;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }
    const target = node;

    let revealed = false;
    let observer: IntersectionObserver | undefined;
    let poll = 0;

    function reveal() {
      if (once) {
        if (revealed) {
          return;
        }
        revealed = true;
        observer?.disconnect();
        clearInterval(poll);
      }
      setInView(true);
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            reveal();
          }
        },
        { threshold, rootMargin },
      );
      observer.observe(target);
    }

    function pollOnce() {
      const box = target.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      if (box.top < viewport * 0.92 && box.bottom > 0) {
        reveal();
      }
    }

    pollOnce();
    poll = window.setInterval(pollOnce, 400);

    return () => {
      observer?.disconnect();
      clearInterval(poll);
    };
  }, [once, prefersReducedMotion, threshold, rootMargin]);

  const classes = [armed && "js-anim", visible && mark, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref as never} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
