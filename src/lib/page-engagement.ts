export function createPageEngagement(now: number, visible: boolean) {
  let lastTime = now;
  let wasVisible = visible;
  let visibleMs = 0;
  let maxDepth = 0;
  let emitted = false;

  return (time: number, isVisible: boolean, depth: number) => {
    if (wasVisible) visibleMs += Math.max(0, time - lastTime);
    lastTime = time;
    wasVisible = isVisible;
    if (isVisible) maxDepth = Math.max(maxDepth, depth);
    if (emitted || !isVisible || visibleMs < 30_000 || maxDepth < 50) return null;
    emitted = true;
    return { engaged_seconds: Math.floor(visibleMs / 1000), max_scroll_percent: Math.round(maxDepth) };
  };
}

export function classifyLink(href: string, origin: string, download: boolean) {
  try {
    const url = new URL(href, origin);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    const properties = { destination_url: `${url.origin}${url.pathname}`, destination_host: url.hostname };
    if (download || /\.(pdf|zip|tgz|gz|csv|docx?|pptx?|xlsx?)$/i.test(url.pathname)) {
      return { event: "file_download_clicked", properties };
    }
    if (url.origin !== origin) return { event: "outbound_link_clicked", properties };
    return null;
  } catch {
    return null;
  }
}
