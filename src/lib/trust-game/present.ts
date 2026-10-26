import type { TrustCase, TrustSignal } from "./types";

export const signalLabels: Record<TrustSignal, string> = {
  trace: "Trace",
  logs: "Logs",
  table: "Spans",
  span: "Span",
  metric: "Metric",
  "trace map": "Service map",
};

export const holdsLabel = "Holds up";
export const failsLabel = "Doesn't hold up";

export function dataVerdict(item: TrustCase) {
  if (item.truth) return "Accurate.";
  return item.flaw === "reading" ? "Accurate, but misread." : "Misleading: the data itself is wrong.";
}
