function decodeHtml(value: string) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, decimal: string) =>
      String.fromCodePoint(Number.parseInt(decimal, 10)),
    );
}

export function htmlTextContent(html: string) {
  return decodeHtml(html.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

export function htmlToMarkdown(html: string) {
  const blocks: string[] = [];
  const preserve = (value: string) => {
    const index = blocks.push(value) - 1;
    return `\u0000BLOCK${index}\u0000`;
  };

  const markdown = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(
      /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
      (_, code: string) =>
        preserve(
          `\n\n\`\`\`\n${decodeHtml(code.replace(/<[^>]+>/g, ""))}\n\`\`\`\n\n`,
        ),
    )
    .replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, table: string) => {
      const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
        .map(([, row]) =>
          [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(
            ([, cell]) => htmlTextContent(cell).replaceAll("|", "\\|"),
          ),
        )
        .filter((row) => row.length > 0);
      if (!rows.length) return "";
      const width = Math.max(...rows.map((row) => row.length));
      const lines = rows.map(
        (row) =>
          `| ${[...row, ...Array(width - row.length).fill("")].join(" | ")} |`,
      );
      lines.splice(1, 0, `| ${Array(width).fill("---").join(" | ")} |`);
      return preserve(`\n\n${lines.join("\n")}\n\n`);
    })
    // Decorative images (empty alt) carry no content for agents; drop them.
    .replace(
      /<img\b(?=[^>]*\balt=["']([^"']*)["'])(?=[^>]*\bsrc=["']([^"']+)["'])[^>]*>/gi,
      (_, alt: string, src: string) => (alt.trim() ? `![${alt}](${src})` : ""),
    )
    // Headlines split into stacked spans or <br> lines read as one line.
    .replace(/<\/span><span\b/gi, "</span> <span")
    .replace(
      /<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi,
      (_, level: string, text: string) =>
        `\n\n${"#".repeat(Number(level))} ${text.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim()}\n\n`,
    )
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*")
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
    .replace(/<br\s*\/?>/gi, "\n")
    // A definition term and its description read as one "Term: description" line.
    .replace(/<\/dt>\s*<dd\b[^>]*>/gi, ": ")
    .replace(/<\/p>/gi, "\n\n")
    // Captions start a new block too, so an image and its caption never run together.
    .replace(/<figcaption\b[^>]*>/gi, "\n\n")
    .replace(/<\/(?:article|aside|blockquote|dd|div|dl|figcaption|figure|header|section)>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/(\S)[ \t]{2,}/g, "$1 ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return decodeHtml(markdown).replace(
    /\u0000BLOCK(\d+)\u0000/g,
    (_, index: string) => blocks[Number(index)],
  );
}
