import type { ReactNode } from "react";
import type {
  ChartPanel,
  LogsPanel,
  MapPanel,
  Panel,
  PanelFooter,
  Severity,
  SpanPanel,
  TablePanel,
  TracePanel,
} from "@/lib/trust-game/cases";

export const mono = "font-[family-name:var(--font-jetbrains-mono)]";
const line = "border-b border-white/8";

/** Marks the element that holds the tell; it lights up once the case is revealed. */
function hl(marked: boolean | undefined, revealed: boolean) {
  return marked && revealed ? "is-tell" : "";
}

/** The highlight's text equivalent for screen readers; goes first inside the marked element. */
function Tell({ marked, revealed }: { marked?: boolean; revealed: boolean }) {
  return marked && revealed ? <span className="sr-only">The tell: </span> : null;
}

export function TelemetryScreen({
  caption,
  panels,
  revealed,
}: {
  caption: string;
  panels: readonly Panel[];
  revealed: boolean;
}) {
  return (
    <section
      aria-label="Telemetry"
      className={`tgp-window min-w-0 rounded-2xl border border-white/10 bg-forest ${mono} text-[12.5px]`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3 text-mist/55">
        <span className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <i key={dot} className="block size-2 rounded-full bg-white/15" />
          ))}
        </span>
        <span>{caption}</span>
      </div>
      <div className="tgp-scroll flex flex-col gap-6 overflow-x-auto p-5 [scrollbar-color:rgb(255_255_255/0.15)_transparent]">
        {panels.map((panel, index) => (
          <div key={index}>
            <PanelBody panel={panel} revealed={revealed} />
            <Footer footer={panel.footer} revealed={revealed} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PanelBody({ panel, revealed }: { panel: Panel; revealed: boolean }) {
  switch (panel.type) {
    case "trace":
      return <Trace panel={panel} revealed={revealed} />;
    case "logs":
      return <Logs panel={panel} revealed={revealed} />;
    case "table":
      return <Table panel={panel} revealed={revealed} />;
    case "span":
      return <Span panel={panel} revealed={revealed} />;
    case "chart":
      return <Chart panel={panel} revealed={revealed} />;
    case "map":
      return <ServiceMap panel={panel} />;
  }
}

function Footer({ footer, revealed }: { footer?: PanelFooter; revealed: boolean }) {
  if (!footer) return null;
  const text = typeof footer === "string" ? footer : footer.text;
  const marked = typeof footer !== "string" && footer.hl;
  return (
    <p className={`mt-3 px-1.5 py-1 text-mist/70 ${hl(marked, revealed)}`}>
      <Tell marked={marked} revealed={revealed} />
      {text}
    </p>
  );
}

function PanelTitle({ children }: { children: ReactNode }) {
  return <p className="mb-2 font-semibold text-mist">{children}</p>;
}

function formatDuration(ms: number) {
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)} s`;
  if (ms >= 10) return `${ms.toFixed(1)} ms`;
  if (ms >= 1) return `${ms.toFixed(2)} ms`;
  return `${(ms * 1000).toFixed(0)} µs`;
}

function Trace({ panel, revealed }: { panel: TracePanel; revealed: boolean }) {
  return (
    <div className="min-w-[560px]" role="table" aria-label="Trace waterfall">
      <div className="grid grid-cols-[52%_48%] pb-1 text-[10px] text-mist/45" role="row">
        <span role="columnheader">Span</span>
        <span role="columnheader" className="flex justify-between">
          <span>0</span>
          <span aria-hidden="true">{formatDuration(panel.total / 2)}</span>
          <span aria-hidden="true">{formatDuration(panel.total)}</span>
        </span>
      </div>
      {panel.rows.map((row, index) => {
        const left = (100 * row.start) / panel.total;
        const width = Math.max((100 * row.dur) / panel.total, 0.3);
        const labelInside = left + width > 78;
        const outbound = row.kind === "CLIENT" || row.kind === "PRODUCER";
        return (
          <div
            key={index}
            role="row"
            className={`grid min-h-[34px] grid-cols-[52%_48%] items-center ${line} ${hl(row.hl, revealed)}`}
          >
            <span
              role="cell"
              className="flex min-w-0 items-center gap-1.5 overflow-hidden pr-2.5 whitespace-nowrap"
              style={{ paddingLeft: row.depth * 16 + 4 }}
            >
              <Tell marked={row.hl} revealed={revealed} />
              {row.ghost ? (
                <span className="flex-none text-sunflower" title="Parent span missing">
                  ↳?<span className="sr-only">parent span missing,</span>
                </span>
              ) : null}
              {row.err ? (
                <i className="block size-2 flex-none rounded-full bg-wrong">
                  <span className="sr-only">error,</span>
                </i>
              ) : null}
              <span className="text-mist/50">{row.svc}</span>
              <span className="truncate text-mist">{row.name}</span>
              <span className="flex-none border border-white/15 px-1 text-[10px] text-mist/55">
                {row.kind}
              </span>
            </span>
            <span role="cell" className="relative h-[18px]">
              <span
                aria-hidden="true"
                className={`absolute top-[3px] h-3 min-w-0.5 ${row.err ? "bg-wrong" : outbound ? "bg-olive" : "bg-sprout"}`}
                style={{ left: `${left}%`, width: `${width}%` }}
              />
              <span
                className={`absolute top-px text-[11px] whitespace-nowrap ${labelInside ? "font-semibold text-forest" : "text-mist/70"}`}
                style={
                  labelInside
                    ? { right: `calc(${100 - left - width}% + 5px)` }
                    : { left: `calc(${left + width}% + 6px)` }
                }
              >
                {formatDuration(row.dur)}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

const severityColor: Record<Severity, string> = {
  ERROR: "text-wrong",
  WARN: "text-sunflower",
  INFO: "text-sprout",
  UNSET: "text-mist/45",
};

function Logs({ panel, revealed }: { panel: LogsPanel; revealed: boolean }) {
  return (
    <div className="min-w-[520px]">
      {panel.query ? (
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2.5 rounded-md border border-white/10 bg-card px-2.5 py-2">
          <code className="text-mist">{panel.query.text}</code>
          <span className="text-sunflower">{panel.query.result}</span>
        </div>
      ) : null}
      {panel.rows.map((row, index) =>
        "divider" in row ? (
          <p key={index} className="px-1 pt-3 pb-1.5 text-mist/45">
            {row.divider}
          </p>
        ) : (
          <div
            key={index}
            className={`grid grid-cols-[96px_52px_112px_minmax(0,1fr)] items-start gap-2.5 px-1 py-1.5 ${line} ${hl(row.hl, revealed)}`}
          >
            <span className="text-mist/45">
              <Tell marked={row.hl} revealed={revealed} />
              {row.ts}
            </span>
            <span className={`font-semibold ${severityColor[row.sev]}`}>{row.sev}</span>
            <span className="truncate text-mist/70">{row.svc}</span>
            <span className="break-words text-mist">
              {row.body}
              {row.count ? <span className="text-mist/45"> {row.count}</span> : null}
            </span>
          </div>
        ),
      )}
    </div>
  );
}

function Table({ panel, revealed }: { panel: TablePanel; revealed: boolean }) {
  return (
    <>
      <PanelTitle>{panel.title}</PanelTitle>
      <table className="w-full border-collapse text-[12.5px] tabular-nums">
        <thead>
          <tr>
            {panel.cols.map((col) => (
              <th
                key={col.label}
                aria-hidden={col.bar}
                className={`border-b border-white/15 px-2 py-1.5 font-normal whitespace-nowrap text-mist/50 ${col.num ? "text-right" : "text-left"} ${col.bar ? "w-[30%]" : ""}`}
              >
                {col.bar ? null : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {panel.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={hl(row.hl, revealed)}>
              {row.cells.map((cell, index) => {
                if (typeof cell === "object" && "bar" in cell) {
                  return (
                    <td key={index} className={`px-2 py-2 ${line}`} aria-hidden="true">
                      <span
                        className={`block h-2.5 ${cell.err ? "bg-wrong" : "bg-sprout"}`}
                        style={{ width: `${cell.bar}%` }}
                      />
                    </td>
                  );
                }
                const text = typeof cell === "string" ? cell : cell.text;
                const err = typeof cell === "object" && cell.err;
                return (
                  <td
                    key={index}
                    className={`px-2 py-2 ${line} ${panel.cols[index].num ? "text-right" : ""} ${err ? "text-wrong" : "text-mist"}`}
                  >
                    {index === 0 ? <Tell marked={row.hl} revealed={revealed} /> : null}
                    {text}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Attributes({
  attrs,
  revealed,
}: {
  attrs: SpanPanel["attrs"];
  revealed: boolean;
}) {
  return (
    <dl className="grid grid-cols-[minmax(150px,max-content)_minmax(0,1fr)] text-[12.5px]">
      {attrs.map((attr) => (
        <div key={attr.key} className={`col-span-2 grid grid-cols-subgrid ${hl(attr.hl, revealed)}`}>
          <dt className={`min-w-0 px-2 py-1.5 text-mist/50 ${line}`}>
            <Tell marked={attr.hl} revealed={revealed} />
            {attr.key}
          </dt>
          <dd
            className={`min-w-0 px-2 py-1.5 break-words ${line} ${attr.err ? "text-wrong" : "text-mist"}`}
          >
            {attr.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Span({ panel, revealed }: { panel: SpanPanel; revealed: boolean }) {
  return (
    <>
      <PanelTitle>{panel.title}</PanelTitle>
      <Attributes attrs={panel.attrs} revealed={revealed} />
      {panel.events?.map((event, index) => (
        <div
          key={index}
          className={`mt-2 rounded-md border border-white/10 p-2.5 ${hl(event.hl, revealed)}`}
        >
          <p className="mb-1.5 text-sunflower">
            <Tell marked={event.hl} revealed={revealed} />
            event: {event.name}
          </p>
          <Attributes attrs={event.attrs} revealed={revealed} />
          {event.stack ? (
            <pre className="mt-1.5 text-[11.5px] whitespace-pre-wrap text-mist/70">{event.stack}</pre>
          ) : null}
        </div>
      ))}
    </>
  );
}

function Chart({ panel, revealed }: { panel: ChartPanel; revealed: boolean }) {
  const [width, height, left, right, top, bottom] = [640, 240, 42, 12, 14, 30];
  const sx = (fraction: number) => left + (width - left - right) * fraction;
  const x = (index: number) => sx(index / (panel.series.length - 1));
  const y = (value: number) => top + (height - top - bottom) * (1 - value / panel.max);
  const points = panel.series.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(" ");
  const lastLabel = panel.xlabels.length - 1;
  const lastPoint = panel.series.length - 1;

  return (
    <>
      <PanelTitle>{panel.title}</PanelTitle>
      <div className={hl(panel.hl, revealed)}>
        <Tell marked={panel.hl} revealed={revealed} />
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${panel.title}: between ${Math.min(...panel.series)}${panel.unit} and ${Math.max(...panel.series)}${panel.unit} across ${panel.xlabels[0]} to ${panel.xlabels[lastLabel]}`}
          className="block h-auto w-full fill-mist/45 text-[10px]"
        >
          {panel.ticks.map((tick) => (
            <g key={tick}>
              <line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} className="stroke-white/10" />
              <text x={left - 8} y={y(tick) + 3} textAnchor="end">
                {tick}
                {panel.unit}
              </text>
            </g>
          ))}
          {panel.xlabels.map((label, index) => (
            <text
              key={label}
              x={sx(index / lastLabel)}
              y={height - 8}
              textAnchor={index === 0 ? "start" : index === lastLabel ? "end" : "middle"}
            >
              {label}
            </text>
          ))}
          <polygon
            points={`${left},${y(0)} ${points} ${width - right},${y(0)}`}
            className="fill-sprout/15"
          />
          <polyline points={points} strokeWidth={2.5} className="fill-none stroke-sprout" />
          <circle cx={x(lastPoint)} cy={y(panel.series[lastPoint])} r={4} className="fill-sunflower" />
        </svg>
      </div>
    </>
  );
}

const ghostNodes = [
  [110, 60],
  [530, 60],
  [110, 220],
  [530, 220],
] as const;

function ServiceMap({ panel }: { panel: MapPanel }) {
  return (
    <>
      <p className="mb-2 flex flex-wrap justify-between gap-3">
        <span className="font-semibold text-mist">Dependencies of {panel.center}</span>
        <span className="text-mist/55">0 upstream · 0 downstream</span>
      </p>
      <svg
        viewBox="0 0 640 280"
        role="img"
        aria-label={`Service map: ${panel.center} has no edges. ${panel.caption}`}
        className="block h-auto w-full max-w-[640px] min-w-[480px]"
      >
        {ghostNodes.map(([gx, gy]) => (
          <g key={`${gx}-${gy}`} className="fill-none stroke-white/20" strokeWidth={1.5}>
            <line x1={320} y1={140} x2={gx} y2={gy} strokeDasharray="3 6" />
            <circle cx={gx} cy={gy} r={20} strokeDasharray="3 5" />
          </g>
        ))}
        <rect x={180} y={112} width={280} height={56} strokeWidth={2} className="fill-card stroke-sprout" />
        <text x={320} y={137} textAnchor="middle" fontSize={14} className="fill-mist font-semibold">
          {panel.center}
        </text>
        <text x={320} y={156} textAnchor="middle" fontSize={11} className="fill-mist/55">
          {panel.caption}
        </text>
      </svg>
    </>
  );
}
