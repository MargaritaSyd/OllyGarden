"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CtaArrow } from "@/components/cta-arrow";
import { onQuizStart } from "@/components/quiz-hero-cta";
import { QuizMark } from "@/components/quiz-mark";
import { QuizCount } from "@/components/quiz-score-cards";
import { capturePostHogEvent } from "@/lib/posthog";
import { quizTopics, selectQuizQuestions } from "@/lib/quiz/questions";
import {
  quizLadder,
  quizQuestionCount,
  quizResultPath,
  quizResultToken,
  quizTier,
} from "@/lib/quiz/score";
import { quizTopicGuide } from "@/lib/quiz/topics";
import type { QuizQuestion, QuizTopic } from "@/lib/quiz/types";
import { getAbsoluteUrl } from "@/lib/site";

const primaryButton =
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-mist px-8 text-base font-medium text-forest transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_0_28px_rgba(227,226,112,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight";

const secondaryButton =
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-mist/50 bg-white/20 px-6 text-base font-medium text-mist transition-[color,background-color,transform] duration-300 hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight";

const chipButton =
  "rounded-xl border border-mist/30 px-5 py-2.5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight";

function tierLabel(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function scrollStage() {
  requestAnimationFrame(() => {
    const stage = document.getElementById("quiz-stage");
    if (!stage) return;
    const top = stage.getBoundingClientRect().top;
    if (top < 96 || top > window.innerHeight * 0.45) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stage.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  });
}

export function OtelQuiz({ sharedScore }: { sharedScore?: number }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const active = questions.length > 0;
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [complete, setComplete] = useState(false);

  const score = questions.reduce(
    (total, question, questionIndex) =>
      total + (picks[questionIndex] === question.correctIndex ? 1 : 0),
    0,
  );
  const question = questions[index];
  const pick = picks[index] ?? null;
  const answered = pick !== null;

  const begin = useCallback(() => {
    if (complete) {
      capturePostHogEvent("quiz_retake", {
        previous_score: score,
        page_path: "/otel-quiz",
      });
    }
    const selected = selectQuizQuestions();
    setQuestions(selected);
    setIndex(0);
    setPicks([]);
    setComplete(false);
    capturePostHogEvent("quiz_started", {
      question_count: selected.length,
      page_path: "/otel-quiz",
    });
    scrollStage();
  }, [complete, score]);

  const choose = useCallback(
    (option: number) => {
      if (answered || !question || option < 0 || option >= question.options.length) return;
      setPicks((current) => {
        const nextPicks = [...current];
        nextPicks[index] = option;
        return nextPicks;
      });
      const correct = option === question.correctIndex;
      capturePostHogEvent("quiz_question_answered", {
        question_id: question.id,
        topic: question.topic,
        correct,
        question_number: index + 1,
        page_path: "/otel-quiz",
      });
      capturePostHogEvent("quiz_explanation_viewed", {
        question_id: question.id,
        topic: question.topic,
        page_path: "/otel-quiz",
      });
    },
    [answered, question, index],
  );

  const next = useCallback(() => {
    if (!answered) return;
    if (index === questions.length - 1) {
      setComplete(true);
      capturePostHogEvent("quiz_completed", {
        score,
        question_count: questions.length,
        page_path: "/otel-quiz",
      });
      capturePostHogEvent("quiz_results_viewed", {
        score,
        question_count: questions.length,
        page_path: "/otel-quiz",
      });
      scrollStage();
      return;
    }
    setIndex((current) => current + 1);
    scrollStage();
  }, [answered, index, questions.length, score]);

  useEffect(() => {
    const abandon = () => {
      if (active && !complete)
        capturePostHogEvent("quiz_abandoned", {
          question_number: index + 1,
          page_path: "/otel-quiz",
        });
    };
    window.addEventListener("pagehide", abandon);
    return () => window.removeEventListener("pagehide", abandon);
  }, [active, complete, index]);

  useEffect(
    () =>
      onQuizStart(() => {
        if (!active) begin();
      }),
    [active, begin],
  );

  useEffect(() => {
    if (!active || complete) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const key = event.key.toLowerCase();
      const letter = "abcd".indexOf(key);
      const digit = "1234".indexOf(key);
      const choice = letter >= 0 ? letter : digit;
      if (choice >= 0 && key.length === 1 && pick === null) {
        event.preventDefault();
        choose(choice);
        return;
      }
      if (key === "enter" && pick !== null && tag !== "BUTTON" && tag !== "A") {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, complete, pick, index, question, questions.length, score, choose, next]);

  const sharedTier = sharedScore == null ? null : quizTier(sharedScore);

  return (
    <section
      id="quiz-stage"
      data-active={active ? "true" : "false"}
      className="surface-grain scroll-mt-28 rounded-3xl border border-sunflower/30 bg-[#082312]"
      aria-label="The quiz"
    >
      {complete ? (
        <Result
          score={score}
          questions={questions}
          picks={picks}
          onRetake={begin}
        />
      ) : active && question ? (
        <QuestionPane
          question={question}
          questions={questions}
          index={index}
          picks={picks}
          score={score}
          onChoose={choose}
          onNext={next}
        />
      ) : (
        <Intro sharedScore={sharedScore} sharedTier={sharedTier} onStart={begin} />
      )}
    </section>
  );
}

function Intro({
  sharedScore,
  sharedTier,
  onStart,
}: {
  sharedScore?: number;
  sharedTier: ReturnType<typeof quizTier> | null;
  onStart: () => void;
}) {
  return (
    <div className="grid min-[992px]:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
      <div className="p-[clamp(1.5rem,4vw,3rem)]">
        <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">
          {sharedTier ? "A shared result" : "Ready when you are"}
        </p>
        <h2 className="mt-4 text-3xl font-bold text-mist">
          {sharedTier && sharedScore != null
            ? `Someone scored ${sharedScore}/10: ${sharedTier.name}. Your turn.`
            : "Ten questions. Immediate explanations."}
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-8 text-mist/70">
          One question per topic, written to challenge SREs, software engineers, and
          OpenTelemetry maintainers alike.
        </p>
        <button type="button" onClick={onStart} className={`${primaryButton} mt-8`}>
          Start the quiz
          <CtaArrow />
        </button>
        <p className="mt-4 text-sm text-mist/50 max-[767px]:hidden">
          Answer with the keys A–D, then Enter for the next question.
        </p>
      </div>
      <div className="border-t border-white/10 p-[clamp(1.5rem,4vw,3rem)] min-[992px]:border-t-0 min-[992px]:border-l">
        <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">
          Where will you land?
        </p>
        <ol className="mt-4">
          {quizLadder.map((tier) => {
            const current = sharedTier?.stage === tier.stage;
            const range = tier.min === tier.max ? `${tier.min}` : `${tier.min}–${tier.max}`;
            return (
              <li
                key={tier.name}
                className={`flex items-center gap-3 border-t border-white/10 py-3 first:border-t-0 ${current ? "text-sunflower" : "text-mist"}`}
              >
                <QuizMark stage={tier.stage} size={36} className="shrink-0" />
                <span className="font-medium">{tierLabel(tier.name)}</span>
                <span className={`ml-auto text-sm font-semibold ${current ? "text-sunflower" : "text-mist/60"}`}>
                  {range}/10
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function QuestionPane({
  question,
  questions,
  index,
  picks,
  score,
  onChoose,
  onNext,
}: {
  question: QuizQuestion;
  questions: QuizQuestion[];
  index: number;
  picks: (number | null)[];
  score: number;
  onChoose: (option: number) => void;
  onNext: () => void;
}) {
  const pick = picks[index] ?? null;
  const answered = pick !== null;

  return (
    <div className="grid min-[992px]:grid-cols-2">
      <div className="p-[clamp(1.25rem,4vw,3rem)]">
        <div className="flex items-center justify-between text-sm text-mist/60">
          <span>
            Question {index + 1} of {questions.length}
          </span>
          <span>{score} correct</span>
        </div>
        <ol className="mt-3 flex gap-1.5" aria-hidden="true">
          {questions.map((item, step) => {
            const chosen = picks[step];
            const tone =
              chosen == null
                ? step === index
                  ? "bg-sunflower"
                  : "bg-white/15"
                : chosen === item.correctIndex
                  ? "bg-sprout"
                  : "bg-[#e98b7d]";
            return <li key={item.id} className={`h-1 flex-1 rounded-full ${tone}`} />;
          })}
        </ol>
        <p className="mt-8 text-xs font-bold tracking-[.13em] text-bitmap-mid uppercase">
          {quizTopicGuide.topics[question.topic].label}
        </p>
        <h2
          id="quiz-question"
          className="mt-3 text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold leading-tight"
        >
          <QuizText text={question.question} />
        </h2>
      </div>
      <div className="p-[clamp(1.25rem,4vw,3rem)] pt-0 min-[992px]:border-l min-[992px]:border-white/10 min-[992px]:pt-[clamp(1.25rem,4vw,3rem)]">
        <div className="grid gap-3" role="radiogroup" aria-labelledby="quiz-question">
          {question.options.map((option, optionIndex) => {
            const correct = answered && optionIndex === question.correctIndex;
            const wrong = pick === optionIndex && !correct;
            const dim = answered && !correct && !wrong;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={pick === optionIndex}
                disabled={answered}
                onClick={() => onChoose(optionIndex)}
                className={`grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight disabled:cursor-default ${correct ? "border-sprout bg-sprout/15" : wrong ? "border-[#e98b7d] bg-[#e98b7d]/10" : "border-white/12 bg-forest/45 hover:border-sunflower/60"} ${dim ? "opacity-45" : ""}`}
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-lg border text-sm font-semibold ${correct ? "border-sprout text-sprout" : wrong ? "border-[#e98b7d] text-[#e98b7d]" : "border-white/15 text-mist/70"}`}
                >
                  {correct ? <CheckIcon /> : wrong ? <CrossIcon /> : String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="pt-1">
                  <QuizText text={option} />
                </span>
              </button>
            );
          })}
        </div>
        {answered ? (
          <div
            className={`mt-4 rounded-2xl border p-5 ${pick === question.correctIndex ? "border-sprout/40 bg-sprout/10" : "border-[#e98b7d]/40 bg-[#e98b7d]/10"}`}
            role="status"
          >
            <p className={`font-semibold ${pick === question.correctIndex ? "text-sprout" : "text-[#e98b7d]"}`}>
              {pick === question.correctIndex ? "Correct" : "Not quite"}
            </p>
            <p className="mt-2 leading-7 text-mist/75">
              <QuizText text={question.explanation} />
            </p>
            <button type="button" onClick={onNext} className={`${primaryButton} mt-5`}>
              {index === questions.length - 1 ? "See results" : "Next question"}
              <CtaArrow />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Result({
  score,
  questions,
  picks,
  onRetake,
}: {
  score: number;
  questions: QuizQuestion[];
  picks: (number | null)[];
  onRetake: () => void;
}) {
  const tier = quizTier(score);
  const results = Object.fromEntries(
    questions.map((item, itemIndex) => [item.topic, picks[itemIndex] === item.correctIndex]),
  ) as Partial<Record<QuizTopic, boolean>>;

  return (
    <div className="grid min-[992px]:grid-cols-2">
      <div className="p-[clamp(1.5rem,4vw,3rem)]">
        <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">
          Your result
        </p>
        <div className="mt-4 flex items-center gap-4">
          <QuizMark stage={tier.stage} size={88} className="shrink-0" />
          <h2 id="quiz-result" className="text-[clamp(3rem,7vw,4.5rem)] leading-none font-bold text-mist">
            <QuizCount value={score} />
            <span className="text-mist/40">/{quizQuestionCount}</span>
          </h2>
        </div>
        <p className="mt-4 text-xl font-semibold text-sunflower">{tierLabel(tier.name)}</p>
        <p className="mt-3 max-w-xl text-lg leading-8 text-mist/75">{tier.message}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={onRetake} className={primaryButton}>
            Retake the quiz
          </button>
          <Link
            href="/products/insights"
            onClick={() =>
              capturePostHogEvent("quiz_product_cta_clicked", {
                product: "insights",
                score,
                page_path: "/otel-quiz",
              })
            }
            className={secondaryButton}
          >
            Explore OllyGarden Insights
            <CtaArrow />
          </Link>
        </div>
        <QuizShare score={score} results={results} />
      </div>
      <div className="border-t border-white/10 p-[clamp(1.5rem,4vw,3rem)] min-[992px]:border-t-0 min-[992px]:border-l">
        <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">
          Topic by topic
        </p>
        <ul className="mt-2">
          {questions.map((item, itemIndex) => {
            const correct = picks[itemIndex] === item.correctIndex;
            return (
              <li key={item.id} className="border-t border-white/10 first:border-t-0">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-3 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bitmap-highlight [&::-webkit-details-marker]:hidden">
                    <span className={correct ? "text-sprout" : "text-[#e98b7d]"} aria-hidden="true">
                      {correct ? <CheckIcon /> : <CrossIcon />}
                    </span>
                    <span className="font-medium text-mist">
                      {quizTopicGuide.topics[item.topic].label}
                    </span>
                    <span className={`ml-auto text-sm max-[767px]:hidden ${correct ? "text-sprout" : "text-[#e98b7d]"}`}>
                      {correct ? "Correct" : "Missed"}
                    </span>
                    <Caret />
                  </summary>
                  <div className="pb-4 pl-7 text-sm leading-6 text-mist/75">
                    <p>
                      <QuizText text={item.question} />
                    </p>
                    {correct ? null : (
                      <p className="mt-3">
                        <span className="font-semibold text-[#e98b7d]">Your answer </span>
                        <QuizText text={item.options[picks[itemIndex] ?? 0]} />
                      </p>
                    )}
                    <p className="mt-2">
                      <span className="font-semibold text-sprout">
                        {correct ? "Your answer " : "Correct answer "}
                      </span>
                      <QuizText text={item.options[item.correctIndex]} />
                    </p>
                    <p className="mt-2">
                      <QuizText text={item.explanation} />
                    </p>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** Share links for a finished quiz; each points at the score's result page. */
function QuizShare({
  score,
  results,
}: {
  score: number;
  results: Partial<Record<QuizTopic, boolean>>;
}) {
  const [copied, setCopied] = useState(false);
  const [url] = useState(() => getAbsoluteUrl(quizResultPath(quizResultToken(score))));
  const tier = quizTier(score);
  const text = [
    `I scored ${score}/${quizQuestionCount} on the OpenTelemetry quiz: ${tier.name} ${tier.emoji}`,
    quizTopics.map((topic) => (results[topic] ? "🟩" : "🟥")).join(""),
  ].join("\n");
  const withUrl = `${text}\n${url}`;

  function shared(channel: string) {
    capturePostHogEvent("quiz_shared", {
      channel,
      score,
      page_path: "/otel-quiz",
    });
  }

  async function copy() {
    await navigator.clipboard.writeText(withUrl);
    setCopied(true);
    shared("copy");
  }

  async function shareNatively() {
    try {
      await navigator.share({ text, url });
      shared("native");
    } catch {
      // The visitor closed the share sheet.
    }
  }

  const links = [
    {
      channel: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      channel: "x",
      label: "X",
      href: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      channel: "bluesky",
      label: "Bluesky",
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(withUrl)}`,
    },
  ];

  return (
    <div className="mt-8">
      <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">
        Share your result
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.channel}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => shared(link.channel)}
            className={chipButton}
          >
            {link.label}
          </a>
        ))}
        <button type="button" onClick={copy} className={chipButton}>
          {copied ? "Copied" : "Copy result"}
        </button>
        {"share" in navigator ? (
          <button type="button" onClick={shareNatively} className={chipButton}>
            More…
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3 8.5 3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Caret() {
  return (
    <svg
      className="text-mist/50 transition-transform group-open:rotate-180"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Renders backtick-delimited segments of quiz copy as inline code. */
function QuizText({ text }: { text: string }) {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className="inline-code">
        {part}
      </code>
    ) : (
      part
    ),
  );
}
