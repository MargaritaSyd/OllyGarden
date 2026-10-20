"use client";

import { useEffect, useRef, useState } from "react";
import { QuizMark } from "@/components/quiz-mark";
import { quizTier } from "@/lib/quiz/score";

function useCountUp(value: number, delay: number) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (value === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const startTimer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 800);
        setShown(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setShown(0);
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(frame);
    };
  }, [value, delay]);

  return shown;
}

export function QuizCount({
  value,
  pad = false,
  delay = 0,
}: {
  value: number;
  pad?: boolean;
  delay?: number;
}) {
  const shown = useCountUp(value, delay);
  return pad ? String(shown).padStart(2, "0") : shown;
}

function ScoreCard({ score, delay }: { score: number; delay: number }) {
  const tier = quizTier(score);

  return (
    <div className="quiz-hero-card surface-grain">
      <p className="quiz-hero-card-kicker">OTel Knowledge Score</p>
      <div className="quiz-hero-card-row">
        <div className="quiz-hero-card-mark">
          <QuizMark stage={tier.stage} className="quiz-hero-card-plant" />
        </div>
        <div className="quiz-hero-card-copy">
          <p className="quiz-hero-card-level">
            {tier.name.charAt(0).toUpperCase() + tier.name.slice(1)}
          </p>
          <p className="quiz-hero-card-score">
            <span className="quiz-hero-card-num">
              <QuizCount value={score} pad delay={delay} />
            </span>
            <span className="quiz-hero-card-of">/10</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/** Decorative scores beside the quiz hero. They are not the visitor's result. */
export function QuizScoreCards() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    const hero = visual?.closest(".quiz-hero");
    if (!visual || !(hero instanceof HTMLElement)) return;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const wide = window.matchMedia("(min-width: 1024px)");
    const layers = [...visual.querySelectorAll<HTMLElement>(".quiz-hero-card-par")].map(
      (el, index) => ({
        el,
        fx: index === 0 ? -9 : -15,
        fy: index === 0 ? -7 : -12,
      }),
    );
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      const box = hero.getBoundingClientRect();
      targetX = (event.clientX - box.left) / box.width - 0.5;
      targetY = (event.clientY - box.top) / box.height - 0.5;
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    const tick = () => {
      if (wide.matches) {
        x += (targetX - x) * 0.06;
        y += (targetY - y) * 0.06;
        for (const layer of layers) {
          layer.el.style.transform = `translate3d(${(x * layer.fx).toFixed(2)}px, ${(y * layer.fy).toFixed(2)}px, 0)`;
        }
      } else {
        for (const layer of layers) layer.el.style.transform = "";
      }
      frame = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={visualRef} className="quiz-hero-visual" aria-hidden="true">
      <div className="quiz-hero-card-pos quiz-hero-card-pos-top">
        <div className="quiz-hero-card-par">
          <div className="quiz-hero-card-bob">
            <ScoreCard score={10} delay={700} />
          </div>
        </div>
      </div>
      <div className="quiz-hero-card-pos quiz-hero-card-pos-bottom">
        <div className="quiz-hero-card-par">
          <div className="quiz-hero-card-bob quiz-hero-card-bob-slow">
            <ScoreCard score={2} delay={900} />
          </div>
        </div>
      </div>
    </div>
  );
}
