import fs from "node:fs";

function load(file, name) {
  const code = fs.readFileSync(file, "utf8");
  const value = code.slice(code.indexOf("=") + 1);
  return Function(`"use strict"; return (${value});`)();
}

const patternIcons = load(".tmp-web/var-Tc.js");
const marketingIcons = load(".tmp-web/var-Ec.js");
const pixelFont = load(".tmp-web/var-Cc.js");

const iconType = `export type BrandIcon = {
  name: string;
  means: string;
  body: string;
};
`;

fs.mkdirSync("src/lib/brand-kit", { recursive: true });
fs.writeFileSync(
  "src/lib/brand-kit/icons.ts",
  `${iconType}
/** Pattern shapes from the brand guideline. Each \`body\` is the inner markup of a 24×24 SVG. */
export const patternIcons: readonly BrandIcon[] = ${JSON.stringify(patternIcons, null, 2)};

/** Marketing icons from the brand guideline. */
export const marketingIcons: readonly BrandIcon[] = ${JSON.stringify(marketingIcons, null, 2)};

export function brandIconByName(name: string) {
  return patternIcons.find((icon) => icon.name === name) ?? marketingIcons.find((icon) => icon.name === name);
}
`,
);

fs.writeFileSync(
  "src/lib/brand-kit/pixel-font.ts",
  `/** 5×5 pixel alphabet used by the brand pattern maker. \`1\` is an ink cell. */
export const pixelFont: Record<string, readonly string[]> = ${JSON.stringify(pixelFont, null, 2)};
`,
);

console.log("icons", patternIcons.length, marketingIcons.length, "font", Object.keys(pixelFont).length);
