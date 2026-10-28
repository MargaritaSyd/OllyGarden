import fs from "node:fs";

const s = fs.readFileSync(".tmp-web/bk-chunk.js", "utf8");
const start = s.indexOf("function zc()");
const end = s.indexOf("function Bc()");
fs.writeFileSync(".tmp-web/downloads-fn.js", s.slice(start, end));
console.log("zc", end - start);

const data = fs.readFileSync(".tmp-web/bk-data.js", "utf8");
const dcStart = data.indexOf("dc=[");
const dcEnd = data.indexOf(",fc=");
fs.writeFileSync(".tmp-web/var-downloads.js", data.slice(dcStart, dcEnd));
const mcStart = data.indexOf("mc=[");
const mcEnd = data.indexOf(",hc=");
fs.writeFileSync(".tmp-web/var-logos.js", data.slice(mcStart, mcEnd));
console.log("dc", dcEnd - dcStart, "mc", mcEnd - mcStart);
