// Imported by the root layout's chrome and src/instrumentation-client.ts on every page; keep it
// import-free so no feature code rides along.

/** The trust game's kiosk for event booths. */
export const trustGameBoothPath = "/resources/trust-your-telemetry/booth";

/**
 * Pages that render without site chrome and never start analytics: shared conference displays.
 * A second such surface would justify moving them into their own root layout (route group).
 */
export function isChromeless(pathname: string) {
  return pathname === trustGameBoothPath || pathname.startsWith(`${trustGameBoothPath}/`);
}
