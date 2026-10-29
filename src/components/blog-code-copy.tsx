"use client";

import { useEffect } from "react";

/** Reveals and wires the copy buttons that `decorateCodeBlocks` renders into article HTML. */
export function BlogCodeCopy() {
  useEffect(() => {
    // The Clipboard API exists only in secure contexts; elsewhere the buttons stay hidden.
    if (!navigator.clipboard) return;
    const controller = new AbortController();
    for (const button of document.querySelectorAll<HTMLButtonElement>(".post-code-copy")) {
      const block = button.closest(".post-code");
      const code = block?.querySelector("pre code");
      const status = block?.querySelector(".post-code-status");
      if (!code || !status) continue;
      let reset: ReturnType<typeof setTimeout>;
      button.hidden = false;
      button.addEventListener(
        "click",
        async () => {
          clearTimeout(reset);
          try {
            await navigator.clipboard.writeText(code.textContent ?? "");
            button.textContent = "Copied";
            status.textContent = "Code copied to the clipboard.";
          } catch {
            status.textContent = "Copy failed. Select the code and copy it manually.";
          }
          reset = setTimeout(() => {
            button.textContent = "Copy";
            status.textContent = "";
          }, 2500);
        },
        { signal: controller.signal },
      );
    }
    return () => controller.abort();
  }, []);

  return null;
}
