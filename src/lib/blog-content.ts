import { readFile } from "node:fs/promises";
import path from "node:path";
import { decorateCodeBlocks } from "@/lib/blog-code";

/**
 * Article HTML for the rendered page: code blocks get their toolbar, and images load from the
 * page's own origin so previews show them before deploy. The file keeps absolute production URLs,
 * which the Markdown version uses.
 */
export async function getBlogHtml(slug: string) {
  try {
    const html = await readFile(
      path.join(process.cwd(), "content/blog", `${slug}.html`),
      "utf8",
    );
    return decorateCodeBlocks(html.replaceAll('src="https://ollygarden.com/', 'src="/'));
  } catch {
    return null;
  }
}
