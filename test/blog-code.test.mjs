import assert from "node:assert/strict";
import test from "node:test";

const { decorateCodeBlocks } = await import("../src/lib/blog-code.ts");
const { htmlToMarkdown } = await import("../src/lib/html-to-markdown.ts");

const yaml = `<pre data-title="profiler.yaml"><code class="hljs language-yaml"><span class="hljs-attr">receivers:</span></code></pre>`;

test("code blocks get a toolbar labelled by filename or language", () => {
  const titled = decorateCodeBlocks(yaml);
  assert.match(titled, /<div class="post-code"><div class="post-code-bar"><span>profiler\.yaml<\/span>/);
  assert.match(titled, /<button type="button" class="post-code-copy" aria-label="Copy profiler\.yaml code" hidden>/);
  assert.match(titled, /<span class="post-code-status" role="status"><\/span><\/div>$/);

  assert.match(decorateCodeBlocks(`<pre><code class="hljs language-bash">ls</code></pre>`), /<span>Shell<\/span>/);
  assert.match(decorateCodeBlocks(`<pre><code>tree</code></pre>`), /<span>Code<\/span>/);
});

test("the Markdown version keeps the code language and drops the toolbar", () => {
  const markdown = htmlToMarkdown(yaml);
  assert.match(markdown, /^```yaml title="profiler\.yaml"\nreceivers:\n```$/m);
  assert.doesNotMatch(markdown, /Copy/);
});
