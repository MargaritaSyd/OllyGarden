import { spawn } from "node:child_process";

const port = 9342;
const chrome = spawn(
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${process.env.TEMP}\\olly-bk-chrome-3`,
    "about:blank",
  ],
  { stdio: ["ignore", "pipe", "pipe"] },
);
const timer = setTimeout(() => {
  chrome.kill();
  process.exit(1);
}, 30000);
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let version;
for (let attempt = 0; attempt < 50 && !version?.webSocketDebuggerUrl; attempt += 1) {
  try {
    version = await fetch(`http://127.0.0.1:${port}/json/version`).then((response) => response.json());
  } catch {
    version = null;
  }
  await sleep(200);
}
const socket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
let id = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(JSON.stringify(message.error)));
  else resolve(message.result);
});
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, { resolve, reject });
    socket.send(JSON.stringify({ id: messageId, method, params, sessionId }));
  });
async function evaluate(sessionId, expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
const { targetId } = await send("Target.createTarget", { url: "http://localhost:3010/resources/brand-kit#imagery" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Runtime.enable", {}, sessionId);
for (let attempt = 0; attempt < 40; attempt += 1) {
  const ready = await evaluate(sessionId, "Boolean(document.querySelector('.bk-compare-out'))");
  if (ready) break;
  await sleep(200);
}
await sleep(1200);
const sample = await evaluate(
  sessionId,
  `(() => {
    const canvas = document.querySelector(".bk-compare-out");
    const image = document.querySelector(".bk-compare-in");
    const context = canvas.getContext("2d");
    const data = context.getImageData(0, 0, Math.min(canvas.width, 8), 1).data;
    return {
      canvas: { width: canvas.width, height: canvas.height, client: [canvas.clientWidth, canvas.clientHeight] },
      image: { complete: image.complete, natural: [image.naturalWidth, image.naturalHeight], src: image.currentSrc },
      pixels: [...data].slice(0, 16),
    };
  })()`,
);
console.log(JSON.stringify(sample));
clearTimeout(timer);
socket.close();
chrome.kill();
