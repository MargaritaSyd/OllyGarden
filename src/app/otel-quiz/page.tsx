import { JsonLd } from "@/components/json-ld";
import { OtelQuiz } from "@/components/otel-quiz";
import { PageBody, PageHero } from "@/components/page-hero";
import { createPageMetadata } from "@/lib/metadata";
import { quizTopicGuide } from "@/lib/quiz/topics";
import { quizGraph } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  // The quiz keeps its "OTel Quiz" name on the page; the title spells out the mark for search.
  title: "OllyGarden Quiz: How Well Do You Know OpenTelemetry?",
  description:
    "Challenge your OpenTelemetry knowledge across semantic conventions, SDKs, signals, the Collector, OTTL, sampling, Weaver, and otelc.",
  path: "/otel-quiz",
});

export default function QuizPage() {
  return (
    <>
      <JsonLd data={quizGraph()} />
      <PageHero
        eyebrow="Ten questions · ten topics"
        titleId="quiz-title"
        title="How deep are your OpenTelemetry® roots?"
        lede="Answer ten questions, see an explanation after each one, and get a score you can share. No sign-up required."
      />
      <PageBody>
        <OtelQuiz />
        <section
          className="mx-auto mt-[clamp(3rem,6vw,5rem)] max-w-3xl"
          aria-labelledby="quiz-topics"
        >
          <h2 id="quiz-topics" className="text-3xl font-bold text-mist">
            {quizTopicGuide.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-mist/70">{quizTopicGuide.lede}</p>
          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {Object.entries(quizTopicGuide.topics).map(([topic, item]) => (
              <div key={topic}>
                <dt className="font-semibold text-mist">{item.label}</dt>
                <dd className="mt-1 leading-7 text-mist/70">{item.description}</dd>
              </div>
            ))}
          </dl>
        </section>
      </PageBody>
    </>
  );
}
