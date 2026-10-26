export type TrustSignal = "trace" | "logs" | "table" | "span" | "metric" | "trace map";

export type TrustFlaw = "reading" | "data";

export type PanelFooter = string | { text: string; hl?: boolean };

export type TraceRow = {
  svc: string;
  name: string;
  kind: string;
  start: number;
  dur: number;
  depth: number;
  err?: boolean;
  hl?: boolean;
  ghost?: boolean;
};

export type TracePanel = {
  type: "trace";
  total: number;
  rows: TraceRow[];
  footer?: PanelFooter;
};

export type LogDivider = { divider: string };

export type LogRow = {
  ts: string;
  sev: string;
  svc: string;
  body: string;
  hl?: boolean;
  count?: string;
};

export type LogsPanel = {
  type: "logs";
  query?: { text: string; result: string };
  rows: (LogDivider | LogRow)[];
  footer?: PanelFooter;
};

export type TableCell = string | { text: string; err?: boolean } | { bar: number; err?: boolean };

export type TablePanel = {
  type: "table";
  title: string;
  cols: { label: string; num?: boolean; bar?: boolean }[];
  rows: { cells: TableCell[]; hl?: boolean }[];
  footer?: PanelFooter;
};

export type SpanAttr = { key: string; value: string; hl?: boolean; err?: boolean };

export type SpanPanel = {
  type: "span";
  title: string;
  attrs: SpanAttr[];
  events?: { name: string; attrs: SpanAttr[]; stack?: string; hl?: boolean }[];
  footer?: PanelFooter;
};

export type ChartPanel = {
  type: "chart";
  title: string;
  unit: string;
  max: number;
  ticks: number[];
  series: number[];
  xlabels: string[];
  hl?: boolean;
  footer?: PanelFooter;
};

export type MapPanel = {
  type: "map";
  center: string;
  caption: string;
  footer?: PanelFooter;
};

export type TrustPanel = TracePanel | LogsPanel | TablePanel | SpanPanel | ChartPanel | MapPanel;

type TrustCaseBase = {
  id: string;
  signal: TrustSignal;
  situation: string;
  claim: string;
  screen: string;
  panels: TrustPanel[];
  headline: string;
  explain: string;
  tell: string;
  source: string;
  detector?: string;
};

/** A conclusion the telemetry supports, or one it does not. */
export type TrustCase =
  | (TrustCaseBase & { truth: true })
  | (TrustCaseBase & { truth: false; flaw: TrustFlaw; fix: string });
