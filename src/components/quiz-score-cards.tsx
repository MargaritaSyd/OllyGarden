"use client";

import { useEffect, useState } from "react";
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
  return (
    <div className="quiz-hero-visual" aria-hidden="true">
      <div className="quiz-bob absolute top-0 left-0 w-[24.41em]">
        <ScoreCard score={10} delay={700} />
      </div>
      <div className="quiz-bob-slow absolute right-0 bottom-0 w-[24.41em]">
        <ScoreCard score={2} delay={900} />
      </div>
    </div>
  );
}
