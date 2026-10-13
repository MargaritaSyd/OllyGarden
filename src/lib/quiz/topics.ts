import type { QuizTopic } from "./types";

export const quizMeta = {
  title: "OTel Quiz",
} as const;

/** What each quiz topic covers, rendered on the quiz page for readers and crawlers. */
export const quizTopicGuide: {
  title: string;
  lede: string;
  topics: Record<QuizTopic, { label: string; description: string }>;
} = {
  title: "What the quiz covers",
  lede: "Each run draws one question from each of these ten topics, from the conventions that make telemetry comparable to the tools that build and transform it.",
  topics: {
    "semantic-conventions": {
      label: "Semantic conventions",
      description: "Attribute and span names, and the stability rules that make telemetry comparable across services.",
    },
    "sdk-and-zero-code": {
      label: "SDKs and zero-code instrumentation",
      description: "Configuring providers, processors, and exporters, and what agents and automatic instrumentation add.",
    },
    "traces-and-context": {
      label: "Traces and context",
      description: "Spans, span kinds, and how context propagates across process boundaries.",
    },
    "metrics": {
      label: "Metrics",
      description: "Instruments, temporality, aggregation, and views.",
    },
    "logs": {
      label: "Logs",
      description: "The log data model, bridges from existing logging libraries, and correlation with traces.",
    },
    "collector": {
      label: "The Collector",
      description: "Receivers, processors, exporters, and how pipelines move data through them.",
    },
    "ottl": {
      label: "OTTL",
      description: "The OpenTelemetry Transformation Language for filtering and reshaping telemetry in the Collector.",
    },
    "sampling": {
      label: "Sampling",
      description: "Head and tail sampling, and what each one trades away.",
    },
    "weaver": {
      label: "Weaver",
      description: "Defining, validating, and generating code from semantic convention registries.",
    },
    "otelc": {
      label: "otelc",
      description: "Compile-time, zero-code instrumentation for Go.",
    },
  },
};
