# Blog article markup

Article HTML in `content/blog/<slug>.html` is a fragment: no `<h1>` (the title comes from
`src/lib/blog.ts`), one `<!-- cta -->` marker where the post's call to action goes, and absolute
`https://ollygarden.com/...` links and image URLs (see `doc/seo.md`); the rendered page serves
those images from its own origin, so previews show them before deploy. Authors write Markdown in the
`jpkrohling/content` repository and convert it with `blog-posts/tools/to-wicket-html.mjs`, which
produces the markup below.

## Code blocks

- Every block is `<pre><code class="hljs language-<lang>">`, pre-highlighted with highlight.js 11.
  Name the language even for plain output (`language-plaintext`); the Markdown version keeps it on
  the fence.
- Distinguish what a reader runs, edits, and sees. Commands are `bash`; a configuration file the
  reader saves gets its filename in `<pre data-title="profiler.yaml">`; expected output gets a
  descriptive title such as `data-title="Profiler log"`. In Markdown, write
  ```` ```yaml title="profiler.yaml" ````.
- `decorateCodeBlocks` (`src/lib/blog-code.ts`) adds the toolbar at render time: the title, or the
  language label, and a copy button that `BlogCodeCopy` reveals once JavaScript runs in a secure context (HTTPS or localhost). Do not add
  toolbars, copy scripts, or screenshots of code to the article HTML.
- Token colors live under `.post-richtext .hljs-*` in `src/app/globals.css`: keys and tags in
  highlight yellow, keywords and built-ins in bold mist, strings in green, numbers and literals in
  coral, comments in dimmed italics. Adjust the palette there, never per post.
- Complete and runnable beats short. Long lines scroll inside the block; check multiline YAML on a
  390px viewport.

## Diagrams

- A left-to-right flow of components (pipelines, request paths) is a `post-flow` figure, not an
  image or ASCII art. It stacks vertically below 720px, and the Markdown version reads as a list:

  ```html
  <figure class="post-flow" aria-label="Profiling pipeline">
    <ol>
      <li><strong>kind node</strong> <span>Every process on the node</span></li>
      <li data-emphasis><strong>eBPF profiler</strong> <span>DaemonSet</span></li>
      <li><strong>Grafana</strong> <span>Renders flame graphs</span></li>
    </ol>
    <figcaption>One or two sentences that state the relationship in prose.</figcaption>
  </figure>
  ```

  Keep it to about five steps, each a bold name and a short role. `data-emphasis` marks the one
  step the article is about.
- Diagrams that are not a linear flow (architecture, comparisons) are PNGs in
  `public/blog-images/<slug>/` with alt text that states what the diagram shows, and the
  relationship repeated in the surrounding prose so the Markdown version keeps it.
- Screenshots (product UI, flame graphs) follow the same image rules.
