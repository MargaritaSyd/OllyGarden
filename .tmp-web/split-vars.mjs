import fs from "node:fs";

const s = fs.readFileSync(".tmp-web/bk-data.js", "utf8");
// Starts with `var lc=` ... comma-separated bindings until function Nc was cut.
// Find top-level `,name=` splits.
const bindings = [];
let i = 0;
if (s.startsWith("var ")) i = 4;
let start = i;
let depth = 0;
let quote = null;
let template = false;
let escape = false;

function isIdentStart(ch) {
  return /[A-Za-z_$]/.test(ch);
}

while (i < s.length) {
  const ch = s[i];
  if (quote) {
    if (escape) escape = false;
    else if (ch === "\\") escape = true;
    else if (ch === quote) quote = null;
    i++;
    continue;
  }
  if (template) {
    if (escape) escape = false;
    else if (ch === "\\") escape = true;
    else if (ch === "`") template = false;
    else if (ch === "$" && s[i + 1] === "{") {
      depth++;
      i += 2;
      continue;
    }
    i++;
    continue;
  }
  if (ch === "'" || ch === '"') {
    quote = ch;
    i++;
    continue;
  }
  if (ch === "`") {
    template = true;
    i++;
    continue;
  }
  if (ch === "{" || ch === "[" || ch === "(") depth++;
  else if (ch === "}" || ch === "]" || ch === ")") depth--;
  else if (ch === "," && depth === 0) {
    const rest = s.slice(i + 1);
    const m = rest.match(/^([A-Za-z_$][\w$]*)=/);
    if (m) {
      bindings.push(s.slice(start, i));
      start = i + 1;
      i += 1 + m[0].length;
      continue;
    }
  }
  i++;
}
bindings.push(s.slice(start));
console.log("bindings", bindings.length);
for (const b of bindings) {
  const name = b.match(/^([A-Za-z_$][\w$]*)=/)?.[1] ?? "unknown";
  const file = `.tmp-web/var-${name}.js`;
  fs.writeFileSync(file, b);
  console.log(name, b.length);
}
