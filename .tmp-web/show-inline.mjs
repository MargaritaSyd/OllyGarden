import { readFileSync } from "node:fs";
const html = readFileSync(".tmp-web/brand-kit.html", "utf8");
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
const big = scripts.find((match) => match[2].length > 1000 && !match[1].includes("ld+json"));
console.log(big[1]);
console.log(big[2].slice(0, 400));
console.log("---tail---");
console.log(big[2].slice(-200));
