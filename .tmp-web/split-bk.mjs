import fs from "node:fs";

const css = fs.readFileSync(process.env.TEMP + "/brand-kit.css", "utf8");
const parts = css.split("}");
const hits = [];
for (const part of parts) {
  if (/\.bk-/.test(part) || part.includes("bk-")) {
    hits.push(part.trim() + "}");
  }
}
fs.writeFileSync(".tmp-web/bk.css", hits.join("\n\n"));
console.log("rules", hits.length, "bytes", hits.join("\n").length);

const chunk = fs.readFileSync(".tmp-web/bk-chunk.js", "utf8");
// Light pretty print: newline after ; and { } at statement boundaries is messy.
// Split top-level-ish by function declarations we already know.
const names = [
  "var lc=",
  "function Nc",
  "function Pc",
  "function Fc",
  "function Rc",
  "function zc",
  "function Bc",
  "function Vc",
  "function Uc",
  "function Yc",
  "function Xc",
  "function Zc",
  "function el",
  "function rl",
  "function il",
  "function al",
  "function ol",
];
let rest = chunk;
const out = [];
for (let i = names.length - 1; i >= 1; i--) {
  const idx = rest.lastIndexOf(names[i]);
  if (idx < 0) {
    console.log("missing", names[i]);
    continue;
  }
  out.push({ name: names[i], code: rest.slice(idx) });
  rest = rest.slice(0, idx);
}
out.push({ name: "data", code: rest });
out.reverse();
for (const item of out) {
  const file = ".tmp-web/bk-" + item.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() + ".js";
  fs.writeFileSync(file, item.code);
  console.log(file, item.code.length);
}
