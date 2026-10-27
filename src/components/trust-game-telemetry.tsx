import type {
  ChartPanel,
  LogRow,
  LogsPanel,
  MapPanel,
  PanelFooter,
  SpanPanel,
  TableCell,
  TablePanel,
  TracePanel,
  TrustPanel,
} from "@/lib/trust-game/types";

function formatDuration(ms: number) {
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)} s`;
  if (ms >= 10) return `${ms.toFixed(1)} ms`;
  if (ms >= 1) return `${ms.toFixed(2)} ms`;
  return `${(ms * 1000).toFixed(0)} µs`;
}

function tellClass(highlight: boolean | undefined, revealed: boolean) {
  return highlight && revealed ? "is-tell rounded-md bg-sunflower/20" : "";
}

function TellMark({ highlight, revealed }: { highlight?: boolean; revealed: boolean }) {
  if (!highlight || !revealed) return null;
  return <span className="sr-only">The tell: </span>;
}

function footerText(footer: PanelFooter) {
  return typeof footer === "string" ? footer : footer.text;
}

function footerHighlight(footer: PanelFooter) {
  return typeof footer === "string" ? false : Boolean(footer.hl);
}

function PanelNote({ footer, revealed }: { footer?: PanelFooter; revealed: boolean }) {
  if (!footer) return null;
  return (
    <p className={`mt-3 font-mono text-xs leading-5 text-mist/60 ${tellClass(footerHighlight(footer), revealed)}`}>
      <TellMark highlight={footerHighlight(footer)} revealed={revealed} />
      {footerText(footer)}
    </p>
  );
}

function severityClass(severity: string) {
  const key = severity.toLowerCase();
  if (key === "error") return "text-[#e98b7d]";
  if (key === "warn" || key === "warning") return "text-sunflower";
  if (key === "info" || key === "ok") return "text-sprout";
  return "text-mist/45";
}

function isLogRow(row: LogsPanel["rows"][number]): row is LogRow {
  return !("divider" in row);
}

function TraceView({ panel, revealed }: { panel: TracePanel; revealed: boolean }) {
  return (
    <div className="min-w-[40rem]" role="table" aria-label="Trace waterfall">
      <div className="grid grid-cols-[minmax(16rem,1.1fr)_minmax(18rem,1fr)] gap-3 border-b border-mist/10 pb-2 font-mono text-[11px] tracking-wide text-mist/45 uppercase" role="row">
        <span role="columnheader">Span</span>
        <span className="flex justify-between" role="columnheader">
          <span>0</span>
          <span aria-hidden="true">{formatDuration(panel.total / 2)}</span>
          <span aria-hidden="true">{formatDuration(panel.total)}</span>
        </span>
      </div>
      {panel.rows.map((row, index) => {
        const left = (100 * row.start) / panel.total;
        const width = Math.max((100 * row.dur) / panel.total, 0.6);
        const inside = left + width > 78;
        const outbound = row.kind === "CLIENT" || row.kind === "PRODUCER";
        return (
          <div
            key={`${row.svc}-${row.name}-${index}`}
            className={`grid grid-cols-[minmax(16rem,1.1fr)_minmax(18rem,1fr)] gap-3 border-b border-mist/8 py-1.5 font-mono text-xs ${tellClass(row.hl, revealed)}`}
            role="row"
          >
            <span className="flex min-w-0 items-baseline gap-2" role="cell" style={{ paddingLeft: row.depth * 14 }}>
              <TellMark highlight={row.hl} revealed={revealed} />
              {row.ghost ? (
                <span className="text-mist/40" title="Parent span missing">
                  ↳?
                  <span className="sr-only">parent span missing, </span>
                </span>
              ) : null}
              {row.err ? (
                <i className="inline-block size-1.5 shrink-0 translate-y-[-1px] rounded-full bg-[#e98b7d]">
                  <span className="sr-only">error, </span>
                </i>
              ) : null}
              <span className="shrink-0 text-bitmap-highlight">{row.svc}</span>
              <span className="truncate text-mist">{row.name}</span>
              <span className="shrink-0 text-mist/40">{row.kind}</span>
            </span>
            <span className="relative block h-5" role="cell">
              <span
                aria-hidden="true"
                className={`absolute top-0.5 h-4 rounded-sm ${row.err ? "bg-[#e98b7d]" : outbound ? "bg-bitmap-mid" : "bg-sprout"}`}
                style={{ left: `${left}%`, width: `${width}%` }}
              />
              <span
                className="absolute top-0.5 text-[11px] text-mist/70"
                style={inside ? { right: `calc(${100 - left - width}% + 6px)` } : { left: `calc(${left + width}% + 6px)` }}
              >
                {formatDuration(row.dur)}
              </span>
            </span>
          </div>
        );
      })}
      <PanelNote footer={panel.footer} revealed={revealed} />
    </div>
  );
}

function LogsView({ panel, revealed }: { panel: LogsPanel; revealed: boolean }) {
  return (
    <div className="font-mono text-xs leading-5">
      {panel.query ? (
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-mist/10 bg-black/20 px-3 py-2">
          <code className="text-mist/80">{panel.query.text}</code>
          <span className="text-bitmap-highlight">{panel.query.result}</span>
        </div>
      ) : null}
      {panel.rows.map((row, index) =>
        isLogRow(row) ? (
          <div key={`${row.ts}-${index}`} className={`grid grid-cols-[7.5rem_4.5rem_9rem_minmax(0,1fr)] gap-3 border-b border-mist/8 py-1.5 ${tellClass(row.hl, revealed)}`}>
            <span className="text-mist/45">
              <TellMark highlight={row.hl} revealed={revealed} />
              {row.ts}
            </span>
            <span className={`font-bold ${severityClass(row.sev)}`}>{row.sev}</span>
            <span className="truncate text-bitmap-highlight">{row.svc}</span>
            <span className="text-mist">
              {row.body}
              {row.count ? <span className="ml-2 text-bitmap-highlight">{row.count}</span> : null}
            </span>
          </div>
        ) : (
          <p key={row.divider} className="py-2 text-mist/50">
            {row.divider}
          </p>
        ),
      )}
      <PanelNote footer={panel.footer} revealed={revealed} />
    </div>
  );
}

function cellText(cell: TableCell) {
  if (typeof cell === "string") return cell;
  return "text" in cell ? cell.text : "";
}

function cellError(cell: TableCell) {
  return typeof cell === "object" && "err" in cell && cell.err;
}

function TableView({ panel, revealed }: { panel: TablePanel; revealed: boolean }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-mist">{panel.title}</p>
      <div className="overflow-x-auto">
        <table className="tg-table w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-mist/15 text-xs tracking-wide text-mist/45 uppercase">
              {panel.cols.map((column) => (
                <th
                  key={column.label}
                  className={`px-2 py-2 font-semibold ${column.num || column.bar ? "text-right" : ""}`}
                  aria-hidden={column.bar || undefined}
                >
                  {column.bar ? null : column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {panel.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={`border-b border-mist/8 ${tellClass(row.hl, revealed)}`}>
                {row.cells.map((cell, cellIndex) => {
                  if (typeof cell === "object" && "bar" in cell) {
                    return (
                      <td key={cellIndex} aria-hidden="true" className="tg-bar px-2 py-2">
                        <span
                          className={`block h-2 rounded-full ${cell.err ? "bg-[#e98b7d]" : "bg-sprout"}`}
                          style={{ width: `${cell.bar}%` }}
                        />
                      </td>
                    );
                  }
                  return (
                    <td
                      key={cellIndex}
                      data-label={panel.cols[cellIndex]?.label}
                      className={`px-2 py-2 ${panel.cols[cellIndex]?.num ? "text-right tabular-nums" : ""} ${cellError(cell) ? "text-[#e98b7d]" : "text-mist"}`}
                    >
                      {cellIndex === 0 ? <TellMark highlight={row.hl} revealed={revealed} /> : null}
                      {cellText(cell)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PanelNote footer={panel.footer} revealed={revealed} />
    </div>
  );
}

function AttrList({ attrs, revealed }: { attrs: SpanPanel["attrs"]; revealed: boolean }) {
  return (
    <dl className="font-mono text-xs">
      {attrs.map((attr) => (
        <div key={attr.key} className={`grid grid-cols-[minmax(8rem,14rem)_minmax(0,1fr)] gap-x-4 py-1 ${tellClass(attr.hl, revealed)}`}>
          <dt className="text-mist/50">
            <TellMark highlight={attr.hl} revealed={revealed} />
            {attr.key}
          </dt>
          <dd className={attr.err ? "text-[#e98b7d]" : "text-mist"}>{attr.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SpanView({ panel, revealed }: { panel: SpanPanel; revealed: boolean }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-mist">{panel.title}</p>
      <AttrList attrs={panel.attrs} revealed={revealed} />
      {panel.events?.map((event) => (
        <div key={event.name} className={`mt-4 rounded-xl border border-mist/10 p-3 ${tellClass(event.hl, revealed)}`}>
          <p className="mb-2 font-mono text-xs text-bitmap-highlight">
            <TellMark highlight={event.hl} revealed={revealed} />
            event: {event.name}
          </p>
          <AttrList attrs={event.attrs} revealed={revealed} />
          {event.stack ? (
            <pre className="mt-3 overflow-x-auto font-mono text-[11px] leading-5 whitespace-pre text-mist/60">{event.stack}</pre>
          ) : null}
        </div>
      ))}
      <PanelNote footer={panel.footer} revealed={revealed} />
    </div>
  );
}

function ChartView({ panel, revealed }: { panel: ChartPanel; revealed: boolean }) {
  const width = 640;
  const height = 220;
  const padLeft = 42;
  const padRight = 12;
  const padTop = 14;
  const padBottom = 28;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const x = (index: number) => padLeft + (plotWidth * index) / (panel.series.length - 1);
  const y = (value: number) => padTop + plotHeight * (1 - value / panel.max);
  const points = panel.series.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(" ");
  const last = panel.series.length - 1;
  const labelCount = panel.xlabels.length - 1;
  const summary = `${panel.title}: between ${Math.min(...panel.series)}${panel.unit} and ${Math.max(...panel.series)}${panel.unit} across ${panel.xlabels[0]} to ${panel.xlabels[labelCount]}`;

  return (
    <div className={`tgp-chart ${tellClass(panel.hl, revealed)}`}>
      <TellMark highlight={panel.hl} revealed={revealed} />
      <p className="mb-3 text-sm font-semibold text-mist">{panel.title}</p>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={summary} className="w-full text-mist/40">
        {panel.ticks.map((tick) => (
          <g key={tick}>
            <line className="stroke-mist/15" x1={padLeft} x2={width - padRight} y1={y(tick)} y2={y(tick)} />
            <text x={padLeft - 8} y={y(tick) + 4} textAnchor="end" className="fill-mist/45 text-[11px]">
              {tick}
              {panel.unit}
            </text>
          </g>
        ))}
        {panel.xlabels.map((label, index) => (
          <text
            key={label}
            x={padLeft + (plotWidth * index) / labelCount}
            y={height - 8}
            textAnchor={index === 0 ? "start" : index === labelCount ? "end" : "middle"}
            className="fill-mist/45 text-[11px]"
          >
            {label}
          </text>
        ))}
        <polygon className="fill-sunflower/15" points={`${padLeft},${y(0)} ${points} ${width - padRight},${y(0)}`} />
        <polyline className="fill-none stroke-sunflower" strokeWidth="2" points={points} />
        <circle className="fill-sunflower" cx={x(last)} cy={y(panel.series[last]!)} r="4" />
      </svg>
      <PanelNote footer={panel.footer} revealed={revealed} />
    </div>
  );
}

const mapGhosts = [
  [110, 60],
  [530, 60],
  [110, 220],
  [530, 220],
] as const;

function MapView({ panel, revealed }: { panel: MapPanel; revealed: boolean }) {
  const label = `Service map: ${panel.center} has no edges. ${panel.caption}`;
  return (
    <div>
      <div className="mb-2 flex flex-wrap justify-between gap-2 text-xs text-mist/55">
        <span>Dependencies of {panel.center}</span>
        <span>0 upstream · 0 downstream</span>
      </div>
      <svg viewBox="0 0 640 280" role="img" aria-label={label} className="w-full">
        {mapGhosts.map(([x, y]) => (
          <g key={`${x}-${y}`} className="stroke-mist/25">
            <line x1="320" y1="140" x2={x} y2={y} strokeDasharray="3 6" />
            <circle cx={x} cy={y} r="20" fill="none" strokeDasharray="3 5" />
          </g>
        ))}
        <rect x="180" y="112" width="280" height="56" rx="12" className="fill-[#082312] stroke-sunflower/50" />
        <text x="320" y="136" textAnchor="middle" className="fill-mist text-sm font-semibold">
          {panel.center}
        </text>
        <text x="320" y="154" textAnchor="middle" className="fill-mist/55 text-[11px]">
          {panel.caption}
        </text>
      </svg>
      <PanelNote footer={panel.footer} revealed={revealed} />
    </div>
  );
}

function PanelBody({ panel, revealed }: { panel: TrustPanel; revealed: boolean }) {
  switch (panel.type) {
    case "trace":
      return <TraceView panel={panel} revealed={revealed} />;
    case "logs":
      return <LogsView panel={panel} revealed={revealed} />;
    case "table":
      return <TableView panel={panel} revealed={revealed} />;
    case "span":
      return <SpanView panel={panel} revealed={revealed} />;
    case "chart":
      return <ChartView panel={panel} revealed={revealed} />;
    case "map":
      return <MapView panel={panel} revealed={revealed} />;
  }
}

export function TelemetryView({
  caption,
  panels,
  revealed,
}: {
  caption: string;
  panels: readonly TrustPanel[];
  revealed: boolean;
}) {
  return (
    <section className="tgp-window overflow-hidden rounded-2xl border border-mist/15 bg-[#011407]" aria-label="Telemetry">
      <div className="flex items-center gap-3 border-b border-mist/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-[#e98b7d]" />
          <i className="size-2.5 rounded-full bg-sunflower" />
          <i className="size-2.5 rounded-full bg-sprout" />
        </span>
        <span className="truncate font-mono text-xs text-mist/65">{caption}</span>
      </div>
      <div className="tgp-scroll overflow-x-auto p-4">
        {panels.map((panel, index) => (
          <div key={`${panel.type}-${index}`} className={index > 0 ? "mt-6 border-t border-mist/10 pt-6" : undefined}>
            <PanelBody panel={panel} revealed={revealed} />
          </div>
        ))}
      </div>
    </section>
  );
}
