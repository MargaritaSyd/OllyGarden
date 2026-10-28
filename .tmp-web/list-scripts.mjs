import { readFileSync } from "node:fs";
const html = readFileSync(".tmp-web/brand-kit.html", "utf8");
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
for (const match of scripts) {
  const attrs = match[1];
  const src = attrs.match(/src="([^"]+)"/)?.[1];
  const type = attrs.match(/type="([^"]+)"/)?.[1] || "";
  console.log(type.padEnd(24), String(match[2].length).padStart(6), src || attrs.slice(0, 80));
}
