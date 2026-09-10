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
  threshold = 0.16,
  rootMargin = "0px 0px -10% 0px",
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);

    return () => observer.disconnect();
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
