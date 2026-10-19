import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { QuizLanding } from "@/components/quiz-landing";
import { createPageMetadata } from "@/lib/metadata";
import {
  quizCardPath,
  quizPitch,
  quizQuestionCount,
  quizResultPath,
  quizScoreFromToken,
  quizTier,
} from "@/lib/quiz/score";
import { quizGraph } from "@/lib/structured-data";

type Params = Promise<{ token: string }>;

function scoreFrom(token: string) {
  const score = quizScoreFromToken(token);
  if (score === null) notFound();
  return score;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { token } = await params;
  const score = scoreFrom(token);
  return createPageMetadata({
    title: `${score}/${quizQuestionCount} on the OpenTelemetry Quiz`,
    description: `Someone scored ${score}/${quizQuestionCount}, ${quizTier(score).name}. ${quizPitch}`,
    path: quizResultPath(token),
    ogCard: quizCardPath(score),
    noIndex: true,
  });
}

/** Landing page for shared quiz results; it carries the score's card and sends visitors to the quiz. */
export default async function QuizResultPage({ params }: { params: Params }) {
  const score = scoreFrom((await params).token);

  return (
    <>
      <JsonLd data={quizGraph()} />
      <QuizLanding sharedScore={score} />
    </>
  );
}
