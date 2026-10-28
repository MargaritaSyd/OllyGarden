import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const port = 9348;
const outDir = `${process.env.TEMP}\\brand-kit-shots2`;
mkdirSync(outDir, { recursive: true });
const chrome = spawn(
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${process.env.TEMP}\\olly-bk-chrome-9`,
    "about:blank",
  ],
  { stdio: ["ignore", "pipe", "pipe"] },
);
chrome.stdout.on("data", (chunk) => process.stdout.write(chunk));
chrome.stderr.on("data", (chunk) => process.stderr.write(chunk));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const timer = setTimeout(() => {
  console.error("timed out");
  chrome.kill();
  process.exit(1);
}, 40000);

let version;
for (let attempt = 0; attempt < 50; attempt += 1) {
  try {
    version = await fetch(`http://127.0.0.1:${port}/json/version`).then((response) => response.json());
    if (version.webSocketDebuggerUrl) break;
  } catch {
    version = null;
  }
  await sleep(200);
}
if (!version?.webSocketDebuggerUrl) {
  chrome.kill();
  throw new Error("no debugger");
}

const socket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
let id = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  }
});
function send(method, params = {}, sessionId) {
  const messageId = ++id;
  return new Promise((resolve, reject) => {
    pending.set(messageId, { resolve, reject });
    socket.send(JSON.stringify({ id: messageId, method, params, sessionId }));
  });
}
async function evaluate(sessionId, expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }
  return result.result.value;
}

const { targetId } = await send("Target.createTarget", { url: "http://localhost:3010/resources/brand-kit" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
for (let attempt = 0; attempt < 40; attempt += 1) {
  if (await evaluate(sessionId, "Boolean(document.querySelector('#downloads h2'))")) break;
  await sleep(200);
}
await sleep(600);

const layout = await evaluate(
  sessionId,
  `({
    scrollHeight: document.documentElement.scrollHeight,
    innerHeight: window.innerHeight,
    overflowY: getComputedStyle(document.documentElement).overflowY,
    bodyOverflow: getComputedStyle(document.body).overflowY,
  })`,
);
console.log("layout", JSON.stringify(layout));

async function shot(name, sectionId) {
  const moved = await evaluate(
    sessionId,
    `(() => {
      const node = document.getElementById(${JSON.stringify(sectionId)});
      const top = node.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo(0, top);
      return { scrollY: window.scrollY, heading: node.querySelector("h2")?.textContent };
    })()`,
  );
  await sleep(200);
  const { data } = await send("Page.captureScreenshot", { format: "png" }, sessionId);
  writeFileSync(`${outDir}/${name}.png`, Buffer.from(data, "base64"));
  console.log(name, JSON.stringify(moved));
}

for (const sectionId of ["downloads", "logo", "type", "pattern", "imagery"]) {
  await shot(sectionId, sectionId);
}

await evaluate(
  sessionId,
  `document.querySelector(".bk-dl-grid").scrollIntoView({ block: "center", behavior: "instant" })`,
);
await sleep(300);
{
  const { data } = await send("Page.captureScreenshot", { format: "png" }, sessionId);
  writeFileSync(`${outDir}/download-cards.png`, Buffer.from(data, "base64"));
  console.log("download-cards");
}
await evaluate(sessionId, `document.querySelector("#logo [aria-label='Logo'] button:nth-child(2)").click()`);
await sleep(400);
const logo = await evaluate(sessionId, `document.querySelector(".bk-stage-logo").getAttribute("src")`);
console.log("rose", logo);
await shot("rose", "logo");

clearTimeout(timer);
socket.close();
chrome.kill();
