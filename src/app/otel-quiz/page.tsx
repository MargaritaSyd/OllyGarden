import { JsonLd } from "@/components/json-ld";
import { QuizLanding } from "@/components/quiz-landing";
import { createPageMetadata } from "@/lib/metadata";
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
      <QuizLanding />
    </>
  );
}
