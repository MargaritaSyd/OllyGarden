"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { capturePostHogEvent } from "@/lib/posthog";
import { quizTopics, selectQuizQuestions } from "@/lib/quiz/questions";
import {
  quizQuestionCount,
  quizResultPath,
  quizResultToken,
  quizTier,
} from "@/lib/quiz/score";
import type { QuizQuestion, QuizTopic } from "@/lib/quiz/types";
import { getAbsoluteUrl } from "@/lib/site";

export function OtelQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const active = questions.length > 0;
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [results, setResults] = useState<Partial<Record<QuizTopic, boolean>>>(
    {},
  );
  const [complete, setComplete] = useState(false);

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

  const score = Object.values(results).filter(Boolean).length;
  const question = questions[index];
  const answered = answer !== null;

  function start() {
    const selected = selectQuizQuestions();
    setQuestions(selected);
    capturePostHogEvent("quiz_started", {
      question_count: selected.length,
      page_path: "/otel-quiz",
    });
  }

  function choose(option: number) {
    if (answered) return;
    setAnswer(option);
    const correct = option === question.correctIndex;
    setResults((current) => ({ ...current, [question.topic]: correct }));
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
  }

  function next() {
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
      return;
    }
    setIndex((current) => current + 1);
    setAnswer(null);
  }

  function retake() {
    capturePostHogEvent("quiz_retake", {
      previous_score: score,
      page_path: "/otel-quiz",
    });
    setQuestions([]);
    setIndex(0);
    setAnswer(null);
    setResults({});
    setComplete(false);
  }

  if (!active) {
    return (
      <section
        className="mx-auto max-w-3xl rounded-3xl border border-sunflower/30 bg-[#082312] p-[clamp(1.5rem,5vw,4rem)]"
        aria-labelledby="quiz-start"
      >
        <p className="text-sm font-bold tracking-[.15em] text-bitmap-mid uppercase">
          Ready when you are
        </p>
        <h2 id="quiz-start" className="mt-4 text-3xl font-bold text-mist">
          Ten questions. Immediate explanations.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-8 text-mist/70">
          One question per topic, written to challenge SREs, software engineers,
          and OpenTelemetry maintainers alike.
        </p>
        <button
          type="button"
          onClick={start}
          className="mt-8 rounded-xl bg-sunflower px-6 py-3 font-semibold text-forest"
        >
          Start the quiz
        </button>
      </section>
    );
  }

  if (complete) {
    const tier = quizTier(score);
    return (
      <section
        className="mx-auto max-w-3xl rounded-3xl border border-sunflower/30 bg-[#082312] p-[clamp(1.5rem,5vw,4rem)] text-center"
        aria-labelledby="quiz-result"
      >
        <p className="text-sm font-bold tracking-[.15em] text-bitmap-mid uppercase">
          Your result
        </p>
        <h2
          id="quiz-result"
          className="mt-4 text-[clamp(2.5rem,8vw,5rem)] font-bold text-mist"
        >
          {score}
          <span className="text-mist/40">/{quizQuestionCount}</span>
        </h2>
        <p className="mt-2 text-xl font-semibold text-sunflower">
          {tier.name} {tier.emoji}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-lg text-mist/75">
          {tier.message}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={retake}
            className="rounded-xl bg-mist px-6 py-3 font-semibold text-forest"
          >
            Retake quiz
          </button>
        </div>
        <QuizShare score={score} results={results} />
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-mist/70">
            Turn OpenTelemetry knowledge into better instrumentation.
          </p>
          <Link
            href="/products/insights"
            onClick={() =>
              capturePostHogEvent("quiz_product_cta_clicked", {
                product: "insights",
                score,
                page_path: "/otel-quiz",
              })
            }
            className="mt-4 inline-flex font-semibold text-sunflower hover:underline"
          >
            Explore OllyGarden Insights →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#082312] p-[clamp(1.25rem,4vw,3rem)]"
      aria-labelledby="quiz-question"
    >
      <div className="flex items-center justify-between text-sm text-mist/60">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span>{score} correct</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-sunflower transition-[width] motion-reduce:transition-none"
          style={{
            width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>
      <p className="mt-8 text-xs font-bold tracking-[.13em] text-bitmap-mid uppercase">
        {question.topic.replaceAll("-", " ")}
      </p>
      <h2
        id="quiz-question"
        className="mt-3 text-[clamp(1.35rem,3.2vw,2rem)] font-semibold leading-tight"
      >
        <QuizText text={question.question} />
      </h2>
      <div
        className="mt-7 grid gap-3"
        role="radiogroup"
        aria-labelledby="quiz-question"
      >
        {question.options.map((option, optionIndex) => {
          const correct = answered && optionIndex === question.correctIndex;
          const wrong = answer === optionIndex && !correct;
          return (
            <button
              key={option}
              role="radio"
              aria-checked={answer === optionIndex}
              disabled={answered}
              onClick={() => choose(optionIndex)}
              className={`rounded-2xl border px-5 py-4 text-left transition-colors ${correct ? "border-sprout bg-sprout/15" : wrong ? "border-[#e98b7d] bg-[#e98b7d]/10" : "border-white/12 bg-forest/45 hover:border-sunflower/60"}`}
            >
              <span className="mr-3 text-mist/45">
                {String.fromCharCode(65 + optionIndex)}.
              </span>
              <QuizText text={option} />
            </button>
          );
        })}
      </div>
      {answered ? (
        <div
          className="mt-6 rounded-2xl border border-sunflower/20 bg-sunflower/[.06] p-5"
          role="status"
        >
          <p className="font-semibold text-sunflower">
            {answer === question.correctIndex ? "Correct" : "Not quite"}
          </p>
          <p className="mt-2 leading-7 text-mist/75">
            <QuizText text={question.explanation} />
          </p>
          <button
            onClick={next}
            className="mt-5 rounded-xl bg-mist px-6 py-3 font-semibold text-forest"
          >
            {index === questions.length - 1 ? "See results" : "Next question"}
          </button>
        </div>
      ) : null}
    </section>
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
  const [url] = useState(() =>
    getAbsoluteUrl(quizResultPath(quizResultToken(score))),
  );
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
  const button = "rounded-xl border border-mist/30 px-5 py-2.5 font-semibold";

  return (
    <div className="mt-8">
      <p className="text-sm font-bold tracking-[.15em] text-bitmap-mid uppercase">
        Share your result
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.channel}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => shared(link.channel)}
            className={button}
          >
            {link.label}
          </a>
        ))}
        <button type="button" onClick={copy} className={button}>
          {copied ? "Copied" : "Copy result"}
        </button>
        {"share" in navigator ? (
          <button type="button" onClick={shareNatively} className={button}>
            More…
          </button>
        ) : null}
      </div>
    </div>
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
