import fs from "node:fs";

const s = fs.readFileSync(process.env.TEMP + "/brand-kit.js", "utf8");
const start = s.indexOf("var lc=`1 October 2026`");
const end = s.indexOf("function hl()", start);
const chunk = s.slice(start, end);
fs.writeFileSync(".tmp-web/bk-chunk.js", chunk);
console.log("chunk", chunk.length, "end", end);

const cssUrl = "https://ollygarden-website.pages.dev/assets/index-BSw1uLI0.css";
const css = fs.readFileSync(process.env.TEMP + "/brand-kit.css", "utf8");
console.log("css", css.length);
