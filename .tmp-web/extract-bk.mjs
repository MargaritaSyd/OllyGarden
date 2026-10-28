import fs from "node:fs";

const s = fs.readFileSync(process.env.TEMP + "/brand-kit.js", "utf8");
const needle = "var lc=`1 October 2026`";
const start = s.indexOf(needle);
console.log("start", start);

const markers = [
  "Everything in the kit",
  "One mark, on every ground",
  "Four colours",
  "Space Grotesk, from Light",
  "Type a word",
  "Botanical shapes",
  "Dither any photo",
  "/resources/brand-kit",
  "bk-page",
];
for (const m of markers) {
  let p = 0;
  let c = 0;
  while ((p = s.indexOf(m, p)) !== -1 && c < 4) {
    console.log(m, p);
    p += m.length;
    c++;
  }
}

let p = start;
let n = 0;
while ((p = s.indexOf("function ", p)) !== -1 && p < start + 250000 && n < 50) {
  console.log("fn", p, JSON.stringify(s.slice(p, p + 90)));
  p += 9;
  n++;
}

const assets = new Set();
const re = /\/images\/brand-kit\/[^`"'\s)]+/g;
let m;
while ((m = re.exec(s))) assets.add(m[0]);
console.log("--- assets", assets.size);
for (const a of [...assets].sort()) console.log(a);
