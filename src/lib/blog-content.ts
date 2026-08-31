import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getBlogHtml(slug: string) {
  try {
    return await readFile(
      path.join(process.cwd(), "content/blog", `${slug}.html`),
      "utf8",
    );
  } catch {
    return null;
  }
}
