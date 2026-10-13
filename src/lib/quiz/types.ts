export type QuizTopic =
  | "semantic-conventions"
  | "sdk-and-zero-code"
  | "traces-and-context"
  | "metrics"
  | "logs"
  | "collector"
  | "ottl"
  | "sampling"
  | "weaver"
  | "otelc";

export type QuizQuestion = {
  id: string;
  topic: QuizTopic;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};
