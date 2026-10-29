const languageLabels: Record<string, string> = {
  bash: "Shell",
  shell: "Shell",
  plaintext: "Text",
  yaml: "YAML",
  go: "Go",
  dockerfile: "Dockerfile",
};

/** The `language-*` class on a highlighted `<code>` element, if any. */
export function codeLanguage(attributes: string) {
  return /\blanguage-([\w-]+)/.exec(attributes)?.[1];
}

/** The filename or caption a `<pre data-title>` gives its code block, if any. */
export function codeTitle(attributes: string) {
  return /\bdata-title="([^"]+)"/.exec(attributes)?.[1];
}

/**
 * Wraps each article code block in a labelled frame with a copy button. The label comes from the
 * `<pre data-title>` (a filename) or the code language. The button starts hidden and
 * `BlogCodeCopy` reveals it where the Clipboard API exists, so no page shows a dead control.
 */
export function decorateCodeBlocks(html: string) {
  return html.replace(
    /<pre([^>]*)><code([^>]*)>([\s\S]*?)<\/code><\/pre>/gi,
    (_, preAttributes: string, codeAttributes: string, code: string) => {
      const language = codeLanguage(codeAttributes);
      const title = codeTitle(preAttributes);
      const label = title ?? languageLabels[language ?? ""] ?? language ?? "Code";
      return `<div class="post-code"><div class="post-code-bar"><span>${label}</span><button type="button" class="post-code-copy" aria-label="Copy ${label} code" hidden>Copy</button></div><pre${preAttributes} tabindex="0"><code${codeAttributes}>${code}</code></pre><span class="post-code-status" role="status"></span></div>`;
    },
  );
}
