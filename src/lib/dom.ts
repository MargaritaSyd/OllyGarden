import type { MouseEvent } from "react";

// Modifier and non-primary clicks belong to the browser: let them through so
// open-in-new-tab keeps working on anything that hijacks a plain click.
export function isPlainLeftClick(event: MouseEvent) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

// Links to another origin (docs.ollygarden.com, the app) must not go through
// the App Router: `router.push` is for routes this build owns. Callers render a
// plain anchor instead and let the browser navigate.
export function isExternalHref(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");
}
