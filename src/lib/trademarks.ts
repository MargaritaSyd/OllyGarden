// Follows OllyGarden's summary of The Linux Foundation Trademark Usage Guidelines in
// https://github.com/ollygarden/codex/blob/main/marketing/trademarks.md

export const trademarkNotice =
  "OpenTelemetry, Cloud Native Computing Foundation, CNCF, KubeCon + CloudNativeCon, Kubernetes, and Prometheus are registered trademarks, and Jaeger is a trademark, of The Linux Foundation. OllyGarden products are not endorsed by The Linux Foundation, the Cloud Native Computing Foundation, or the OpenTelemetry project.";

/** Adds the ® notice to the first OpenTelemetry mention outside HTML tags. */
export function registerOpenTelemetry(text: string) {
  return text.replace(/(^|>)([^<]*?)OpenTelemetry(?!®)/, "$1$2OpenTelemetry®");
}

/** Marks the first mention across item titles given in reading order. */
export function registerFirstTitle<T extends { title: string }>(items: readonly T[]) {
  const titles = registerFirstOpenTelemetry(...items.map((item) => item.title));
  return items.map((item, index) => ({ ...item, title: titles[index] }));
}

/** Marks the first mention across copy blocks given in reading order. */
export function registerFirstOpenTelemetry(...copy: string[]) {
  const first = copy.findIndex((text) => registerOpenTelemetry(text) !== text);
  return copy.map((text, index) => (index === first ? registerOpenTelemetry(text) : text));
}
