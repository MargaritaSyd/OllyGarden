import { PageBody, PageHero } from "@/components/page-hero";
import { QuizHeroCta } from "@/components/quiz-hero-cta";
import { OtelQuiz } from "@/components/otel-quiz";
import { QuizHeroDeco } from "@/components/quiz-hero-deco";
import { QuizScoreCards } from "@/components/quiz-score-cards";
import { SiteCta } from "@/components/site-cta";
import { quizTopicGuide } from "@/lib/quiz/topics";

const quizCta = {
  title: ["Turn OpenTelemetry knowledge", "into better instrumentation"],
  sub: "OllyGarden Insights scores the telemetry you already send, and Rose fixes it at the source.",
  primary: {
    label: "Explore OllyGarden Insights",
    href: "/products/insights",
    // GetStartedLink paints sunflower on hover. This button stays mist and only glows.
    className: "hover:!bg-mist",
  },
  secondary: { label: "Meet OllyGarden Rose", href: "/products/rose" },
} as const;

export function QuizLanding({ sharedScore }: { sharedScore?: number }) {
  return (
    <>
      <PageHero
        className="quiz-hero"
        decoration={<QuizHeroDeco />}
        aside={<QuizScoreCards />}
        eyebrow={<QuizEyebrow />}
        titleId="quiz-title"
        title="How deep are your OpenTelemetry® roots?"
        lede="Answer ten questions, see an explanation after each one, and get a score you can share. No sign-up required."
      >
        <QuizHeroCta />
      </PageHero>
      <PageBody width="wide">
        <OtelQuiz sharedScore={sharedScore} />
        <section
          className="mx-auto mt-[clamp(3rem,6vw,5rem)]"
          aria-labelledby="quiz-topics"
        >
          <p className="text-xs font-bold tracking-[.15em] text-bitmap-mid uppercase">
            Ten topics
          </p>
          <h2 id="quiz-topics" className="mt-3 text-3xl font-bold text-mist">
            {quizTopicGuide.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-mist/70">{quizTopicGuide.lede}</p>
          <ul className="mt-8 grid grid-cols-1 gap-4 min-[576px]:grid-cols-2 min-[1200px]:grid-cols-5">
            {Object.entries(quizTopicGuide.topics).map(([topic, item], index) => (
              <li
                key={topic}
                className="surface-grain rounded-2xl border border-sunflower/32 bg-[#002810] p-6 transition-colors hover:border-sunflower/60"
              >
                <span className="text-sm font-bold text-sunflower">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg leading-snug font-bold text-mist">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-mist/70">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </PageBody>
      <SiteCta content={quizCta} />
    </>
  );
}

function QuizEyebrow() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-sunflower/35 bg-[#082312]/80 px-3 py-1 text-xs font-bold tracking-[0.14em] text-bitmap-highlight normal-case">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
        <path
          d="M1 1l3 5-3 5M5.5 1l3 5-3 5M10 1l3 5-3 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      OTel Quiz
    </span>
  );
}
