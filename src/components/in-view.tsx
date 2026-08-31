"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

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
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) {
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const classes = [armed && "js-anim", visible && mark, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref as never} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
